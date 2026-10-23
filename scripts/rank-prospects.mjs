#!/usr/bin/env node
// Local, read-only prioritization of explicitly provided TSV. Never emails a prospect.
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const weights = { problem: 25, urgency: 15, budget: 15, delivery_fit: 15, buyer_access: 10, repeat_potential: 10, source_evidence: 10 };
const geoStates = ['CONFIRMED', 'VERIFY', 'INCOMPATIBLE'];
const contractStates = ['CONFIRMED_B2B', 'VERIFY', 'NOT_B2B'];
const salesStates = ['DISCOVERED', 'QUALIFIED', 'CONTACTED', 'REPLIED', 'DISCOVERY', 'PROPOSED', 'WON', 'LOST', 'LATER', 'DO_NOT_CONTACT'];
const required = ['account_id', 'company', 'website', 'channel', 'source_url', 'signal_date', 'signal_summary', 'offer',
  'status', 'thailand', 'contract', 'suppressed', ...Object.keys(weights),
  'proposal_ht', 'signed_ht', 'collected_ht', 'next_action', 'next_action_date'];

function readTsv(src) {
  const lines = src.replace(/^\uFEFF/, '').trimEnd().split(/\r?\n/);
  if (lines.length < 2) return [];
  const keys = lines.shift().split('\t');
  for (const key of required) if (!keys.includes(key)) throw new Error('Missing column: ' + key);
  return lines.filter(x => x.trim() && !x.startsWith('#')).map((line, index) => {
    const values = line.split('\t');
    if (values.length !== keys.length) throw new Error('Row ' + (index + 2) + ': TSV columns mismatch');
    return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
  });
}

function classify(l) {
  const id = l.account_id?.trim();
  if (!id || !l.company?.trim() || !l.offer?.trim()) throw new Error('Missing lead identity, company or offer');
  if (!salesStates.includes(l.status)) throw new Error(id + ': invalid status');
  if (!geoStates.includes(l.thailand) || !contractStates.includes(l.contract)) throw new Error(id + ': invalid country/contract');
  if (!['YES', 'NO'].includes(l.suppressed)) throw new Error(id + ': invalid suppression');
  let score = 0;
  for (const [key, weight] of Object.entries(weights)) {
    if (!/^[0-5]$/.test(l[key])) throw new Error(id + ': ' + key + ' must be 0-5');
    score += weight * Number(l[key]) / 5;
  }
  const amounts = {};
  for (const key of ['proposal_ht', 'signed_ht', 'collected_ht']) {
    if (l[key] && (!/^(0|[1-9]\d*)(\.\d{1,2})?$/.test(l[key]) || Number(l[key]) > 1e9)) {
      throw new Error(id + ': invalid amount ' + key);
    }
    amounts[key] = l[key] ? Number(l[key]) : null;
  }
  if (amounts.collected_ht != null && amounts.signed_ht == null) throw new Error(id + ': collected requires signed amount');
  if (l.status === 'WON' && amounts.signed_ht == null) throw new Error(id + ': WON requires signed amount');
  let recommendation = 'VERIFY';
  if (l.suppressed === 'YES' || l.status === 'DO_NOT_CONTACT') recommendation = 'DO_NOT_CONTACT';
  else if (l.thailand === 'INCOMPATIBLE' || l.contract === 'NOT_B2B') recommendation = 'REJECT';
  else if (['LOST', 'LATER'].includes(l.status)) recommendation = 'PARKED';
  else if (l.status === 'WON') recommendation = 'WON';
  else if (l.thailand === 'CONFIRMED' && l.contract === 'CONFIRMED_B2B'
      && Number(l.source_evidence) >= 2 && score >= 70) recommendation = 'READY_FOR_HUMAN_REVIEW';
  return { ...l, ...amounts, score: Math.round(score * 10) / 10, recommendation };
}

export function analyzeTsv(src) {
  const ids = new Set(), duplicates = new Set(), channels = {};
  const leads = readTsv(src).map(row => {
    const l = classify(row);
    if (ids.has(l.account_id)) throw new Error('Duplicate account_id: ' + l.account_id);
    ids.add(l.account_id);
    const key = (l.website || l.company).toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '') + '|' + l.offer.toLowerCase();
    if (duplicates.has(key)) throw new Error('Duplicate company/offer: ' + l.company + ' / ' + l.offer);
    duplicates.add(key);
    return l;
  }).sort((a, b) => b.score - a.score);
  for (const l of leads) {
    const c = channels[l.channel] ??= { total: 0, contacted: 0, engaged_threads: 0, proposals: 0, won: 0, signed_ht: 0, collected_ht: 0 };
    c.total++;
    if (['CONTACTED', 'REPLIED', 'DISCOVERY', 'PROPOSED', 'WON', 'LOST', 'LATER'].includes(l.status)) c.contacted++;
    if (['REPLIED', 'DISCOVERY', 'PROPOSED', 'WON'].includes(l.status)) c.engaged_threads++;
    if (['PROPOSED', 'WON'].includes(l.status)) c.proposals++;
    if (l.status === 'WON') c.won++;
    c.signed_ht += l.signed_ht || 0;
    c.collected_ht += l.collected_ht || 0;
  }
  return { leads, channels };
}

export function markdownReport(data) {
  const safe = val => String(val ?? '').replace(/\|/g, '/').replace(/[\r\n]/g, ' ');
  const out = ['# Qualification commerciale, informations déclarées', '',
    '**IMPORTANT : le score ne représente pas une probabilité de signature. READY_FOR_HUMAN_REVIEW ne signifie ni contact envoyé ni contrat signé. La confirmation Thaïlande exige un accord écrit du client.**', '',
    '| Entreprise | Canal | Score | Décision | État déclaré | Action suivante |',
    '|---|---|---:|---|---|---|'];
  for (const l of data.leads) out.push(`| ${safe(l.company)} | ${safe(l.channel)} | ${l.score} | ${l.recommendation} | ${l.status} | ${safe(l.next_action)} |`);
  out.push('', '## Faits saisis par canal', '',
    '| Canal | Leads | Contactés | Fils engagés* | Devis | Signés | Signé HT | Encaissé HT |',
    '|---|---:|---:|---:|---:|---:|---:|---:|');
  for (const [channel, c] of Object.entries(data.channels)) {
    out.push(`| ${safe(channel)} | ${c.total} | ${c.contacted} | ${c.engaged_threads} | ${c.proposals} | ${c.won} | ${c.signed_ht} € | ${c.collected_ht} € |`);
  }
  out.push('', '*Les « fils engagés » ne sont pas des réponses positives garanties : l’état REPLIED doit être vérifié dans la conversation. Aucune métrique ne provient automatiquement de Gmail, GitHub ou ~/jobs. Ne remplir des statuts et montants qu’avec preuve.*');
  return out.join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (!process.argv[2]) {
    console.error('Usage: node scripts/rank-prospects.mjs <private.tsv> [--json]');
    process.exitCode = 2;
  } else {
    try {
      const data = analyzeTsv(readFileSync(process.argv[2], 'utf8'));
      console.log(process.argv.includes('--json') ? JSON.stringify(data, null, 2) : markdownReport(data));
    } catch (e) {
      console.error('Qualification error: ' + e.message);
      process.exitCode = 1;
    }
  }
}

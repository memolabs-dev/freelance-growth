import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const text = readFileSync(new URL('../data/buyer-intent-signals-2026-10-19.tsv', import.meta.url), 'utf8');
const [first, ...data] = text.trimEnd().split('\n');
const keys = first.split('\t');
const rows = data.map((line, idx) => {
  const values = line.split('\t');
  assert.equal(values.length, keys.length, 'TSV fields row ' + (idx + 2));
  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
});

test('25 source listings, URLs and canonical grouping exist', () => {
  assert.equal(rows.length, 25);
  assert.ok(rows.every(x => x.source_url.startsWith('https://')));
  const unique = new Set(rows.map(x => x.canonical_client_group));
  assert.equal(unique.size, 21);
});

test('duplicate Techunt/Beyond Skills client is kept tentative and not referred twice', () => {
  const group = rows.filter(x => x.canonical_client_group === 'STATION_F_ONPREM');
  assert.equal(group.length, 3);
  assert.ok(group.every(x => x.action === 'POSSIBLE_DUPLICATE'));
  const study = readFileSync(new URL('../docs/research/BMAD-2026-buying-intent-audit.md', import.meta.url), 'utf8');
  assert.match(study, /Identité du client final \*\*non vérifiée\*\*/);
});

test('restricted or vanished sources do not appear as Thailand-valid active leads', () => {
  const excluded = rows.filter(x => ['FRANCE_ONLY', 'EU_EEA_ONLY', 'EUROPE_ONLY',
    'POLAND_ONLY', 'LATAM_ONLY', 'USA_ONLY', 'INDIA_ONLY'].includes(x.geography));
  assert.ok(excluded.length >= 7);
  assert.ok(excluded.every(x => x.action === 'REJECT'));
  const removed = rows.filter(x => x.verification === 'source_removed');
  assert.equal(removed.length, 2);
  assert.ok(removed.every(x => x.action === 'HOLD_REMOVED'));
});

test('same paying client cannot count as two independent high-fit prospects', () => {
  const ai = rows.filter(x => x.canonical_client_group === 'AI_SCALING');
  assert.equal(ai.length, 3);
  assert.equal(ai.filter(x => x.action === 'VERIFY').length, 2);
  assert.equal(ai.filter(x => x.action === 'REJECT').length, 1);
  assert.ok(ai.filter(x => x.action === 'VERIFY').every(x => x.qualification_notes.includes('four hours')));
});

test('commercial report includes validation of hours, contract and geography', () => {
  const body = readFileSync(new URL('../docs/research/BMAD-2026-buying-intent-audit.md', import.meta.url), 'utf8');
  for (const phrase of ['Thaïlande', 'quatre heures', 'KatchMe', 'contrat', 'brouillon de candidature', 'source directe']) {
    assert.ok(body.includes(phrase), 'Missing: ' + phrase);
  }
});

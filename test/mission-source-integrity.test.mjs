import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('commercial mission scan distinguishes published facts from eligibility and avoids invented five qualified leads', () => {
 const [head,...lines]=readFileSync(new URL('../data/missions_screened_2026-10-23.tsv',import.meta.url),'utf8').trimEnd().split('\n');
 const fields=head.split('\t');
 const rows=lines.map(s=>{const parts=s.split('\t'); assert.equal(parts.length,fields.length,'TSV malformed'); return Object.fromEntries(fields.map((f,i)=>[f,parts[i]]));});
 assert.ok(rows.length>=8);
 assert.equal(new Set(rows.map(r=>r.url)).size,rows.length,'same opportunity repeated');
 assert.ok(rows.every(r=>r.url.startsWith('https://')));
 assert.ok(rows.some(r=>r.status==='QUALIFY_FIRST'));
 assert.ok(rows.some(r=>r.status==='HOLD_POSSIBLE_DUPLICATE'));
 assert.ok(rows.some(r=>r.status==='EXCLUDE_NOT_FREELANCE'));
 assert.ok(rows.some(r=>r.status==='EXCLUDE_CLOSED'));
 assert.ok(rows.every(r=>!['APPLIED','CONTACTED','CONTRACT_SIGNED','READY_TO_SEND'].includes(r.status)));
 assert.ok(!rows.some(r=>/Medsharing|Symbyoz|Adriver Group/i.test(r.mission)));
 const w=rows.find(r=>r.mission.includes('Webnet'));assert.equal(w.contract,'CDI');assert.equal(w.remote_france,'HYBRID');
 const codeur=rows.filter(r=>r.url.includes('codeur.com'));assert.ok(codeur.every(r=>r.budget_type==='CLIENT_FIXED_BUDGET'));
 const alt=rows.find(r=>r.mission.includes('Station F'));assert.match(alt.prior_history,/KATCHME/);
});

test('source audit refuses pretending that platform estimates are real client budgets',()=>{
 const report=readFileSync(new URL('../docs/M2-MISSIONS-QUALIFICATION-2026-10-23.md',import.meta.url),'utf8');
 assert.match(report,/aucune candidature ni message envoyé/);
 assert.match(report,/Aucune cohorte de cinq opportunités pleinement vérifiées/);
 assert.match(report,/100 % remote depuis la France/);
 assert.match(report,/Medsharing.*déjà traité.*Symbyoz et Adriver Group.*exclus/);
 assert.match(report,/recruteur.*B2B/);
 assert.match(report,/Codeur exige un abonnement/);
});

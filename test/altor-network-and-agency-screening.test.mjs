import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('Altor talent pool is not counted as a signed or confirmed contract', () => {
  const content = readFileSync(new URL('../data/relationship_pipeline_2026-10-19.tsv', import.meta.url), 'utf8');
  const [header, ...rows] = content.trim().split('\n');
  const columns = header.split('\t');
  const entries = rows.map((line) => Object.fromEntries(columns.map((key,i) => [key, line.split('\t')[i]])));
  const altor = entries.filter(row => row.company === 'Altor');
  assert.equal(altor.length,1);
  assert.equal(altor[0].classification,'TALENT_POOL_SUBMISSION_REPORTED_UNCONFIRMED');
  assert.match(altor[0].outbound_state,/NO_RECEIPT/);
  assert.doesNotMatch(altor[0].classification,/CONTRACT_SIGNED|MISSION_CONFIRMED/);
});

test('agency screening warns against treating directory listings as buying signals', () => {
  const doc=readFileSync(new URL('../docs/M2-AGENCY-SCREENING-2026-10-23.md', import.meta.url), 'utf8');
  assert.match(doc,/9x/);
  assert.match(doc,/pivoté/);
  assert.match(doc,/EXCLUDE \/ STOP/);
  assert.match(doc,/jamais READY_TO_SEND/);
  assert.match(doc,/aucun message envoyé/i);
});

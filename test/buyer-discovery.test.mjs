import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('BMAD buyer discovery identifies 10 distinct companies with source URLs', () => {
  const data = readFileSync(new URL('../data/bmad-buyer-accounts-2026-10-19.tsv', import.meta.url),'utf8').trim().split('\n');
  const rows = data.slice(1).map(x=>x.split('\t'));
  assert.equal(rows.length,10);
  assert.equal(new Set(rows.map(x=>x[0])).size,10);
  assert.ok(rows.every(row=>row[1].startsWith('https://')));
  assert.ok(rows.every(row=>row[9]==='NOT_ESTABLISHED'));
  assert.ok(rows.every(row=>row[10]==='VERIFY'));
});

test('buyer research separates public case studies from current paid demand',()=>{
  const text=readFileSync(new URL('../docs/research/BMAD-BUYER-DISCOVERY-2026-10-19.md',import.meta.url),'utf8');
  assert.match(text,/aucune des dix entreprises n'est à ce niveau de preuve/);
  assert.match(text,/THAILAND UNVERIFIED/);
  assert.match(text,/Oudini/);
  assert.match(text,/Together/);
});

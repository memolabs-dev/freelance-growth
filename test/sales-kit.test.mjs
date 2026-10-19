import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (filename) => readFileSync(new URL('../docs/sales/' + filename, import.meta.url), 'utf8');

test('commercial one-pager separates offers, pricing tests, Thailand conditions and prototypes', () => {
  const doc = read('OFFER_ONE_PAGER_FR_EN.md');
  for (const term of ['Product engineering', 'Thaïlande', 'Memo Bridge', 'Drop', 'English', '500 à 650']) {
    assert.ok(doc.toLowerCase().includes(term.toLowerCase()), 'Missing: ' + term);
  }
});

test('proofs cite official repos and disclose prototype limitations', () => {
  const doc = read('VERIFIABLE_CASE_STUDIES.md');
  for (const term of ['https://github.com/memolabs-dev/memo-bridge', 'https://github.com/memolabs-dev/drop', 'prototype sans utilisateur réel', 'pas de missions clients']) {
    assert.ok(doc.toLowerCase().includes(term.toLowerCase()), 'Missing: ' + term);
  }
});

test('discovery and proposal protect contract geography and confidentiality', () => {
  const doc = read('DISCOVERY_AND_PROPOSAL.md');
  for (const term of ['Thaïlande', "pays d'exécution", 'critères de recette', 'budget', 'relecture juridique', 'devis-memo-labs.md']) {
    assert.ok(doc.toLowerCase().includes(term.toLowerCase()), 'Missing: ' + term);
  }
});

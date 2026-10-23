import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('unbuilt design concepts cannot masquerade as shipped case studies', () => {
  for (const file of ['docs/CASE_STUDY_AI.md', 'docs/CASE_STUDY_FULLSTACK.md']) {
    const content = read(file);
    assert.match(content, /CONCEPT NON RÉALISÉ, NON TESTÉ, NON PUBLIÉ/);
    assert.match(content, /ni une (?:étude de cas livrée ni une référence client|démo livrée ni une référence client)/i);
    assert.doesNotMatch(content, /git clone |npm run test:all|✅ vert/i);
  }
});

test('outbound drafts are never send-ready and mention only public proof', () => {
  const log = read('data/outreach_log.tsv');
  assert.doesNotMatch(log, /rag-doc-search|subscription-demo|READY_TO_SEND|\tQUEUED\s*$/m);
  assert.doesNotMatch(log, /from Thailand|depuis la Thaïlande|2000\+ commits|CI green|50-question golden set/i);
  assert.equal((log.match(/\tHOLD_FOR_QUALIFICATION\s*$/gm) ?? []).length, 9);
  assert.equal((log.match(/\tBLOCKED_DUPLICATE\s*$/gm) ?? []).length, 2);
  assert.equal((log.match(/\tSCREENED_OUT\s*$/gm) ?? []).length, 1);
  assert.match(log, /NO SEND/);
});

test('public commercial offer states actual geography and verified-only claims', () => {
  const offer = read('docs/OFFER_ONE_PAGER.md');
  assert.match(offer, /depuis la France/);
  assert.match(offer, /Thaïlande.*accord écrit|Thaïlande.*accord.*écrit/i);
  assert.match(offer, /Drop.*prototype|Drop.*\*\*.*prototype/i);
  assert.doesNotMatch(offer, /rag-doc-search|subscription-demo|production-ready|CI green/);
  const ledger = read('docs/SALES_PROOF_STATUS_2026-10-23.md');
  assert.match(ledger, /HTTP 404|404/);
  assert.match(ledger, /validation individuelle|validation.*destinataire/i);
});

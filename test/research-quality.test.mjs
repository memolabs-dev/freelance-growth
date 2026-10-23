import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('Deep Recon acquisition report contains decisions, sources, buyer segments and experiments', () => {
  const source = readFileSync(new URL('../docs/research/RECON-2026-acquisition-et-positionnement.md', import.meta.url), 'utf8');
  for (const criterion of [
    'Décisions BMAD',
    'EXP-A',
    'EXP-B',
    'EXP-C',
    'THAILAND_CONFIRMED',
    'NO-GO',
    'CNIL',
    'SaaS B2B'
  ]) {
    assert.ok(source.includes(criterion), `Missing research criterion: ${criterion}`);
  }
  assert.ok((source.match(/https:\/\//g) ?? []).length >= 18, 'Too few retrievable sources');
});

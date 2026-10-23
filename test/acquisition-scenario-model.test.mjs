import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {config,validate,runPortfolio,buildReport} from '../scripts/simulate-acquisition.mjs';

test('portfolio budget and commercial probabilities cannot be exceeded',()=>{
  assert.doesNotThrow(validate);
  for(const policy of Object.values(config.portfolios)){
    const hours=policy.proofHours+Object.entries(policy.mix).reduce((a,[ch,n])=>a+config.channels[ch].hoursPerDossier*n,0);
    assert.equal(hours,40);
    assert.equal(policy.totalHours,40);
  }
  assert.equal(Object.keys(config.portfolios).length,8);
  assert.equal(Object.keys(config.regimes).length,3);
});
test('scenario model deterministic and respects cash vs signed contract distinction',()=>{
  const a=runPortfolio('balanced','central','base',2000);
  const b=runPortfolio('balanced','central','base',2000);
  assert.deepEqual(a,b);
  assert.ok(a.pSignedWithin90>=0&&a.pSignedWithin90<=100);
  assert.ok(a.pFirstCashWithin90>=0&&a.pFirstCashWithin90<=100);
  assert.ok(a.pFirstCashWithin90<=a.pSignedWithin90);
  assert.ok(a.expectedFirstCashEUR<=a.expectedSignedFaceEUR);
  assert.ok(a.medianSignedFaceEUR===0||a.medianSignedFaceEUR>0);
});
test('stress test has measurable adverse vs favorable contrast and plausible cash delays',()=>{
  const weak=runPortfolio('direct_heavy','adverse','base',5000);
  const strong=runPortfolio('direct_heavy','favorable','base',5000);
  assert.ok(weak.pSignedWithin90<strong.pSignedWithin90);
  assert.ok(weak.pFirstCashWithin90<=strong.pFirstCashWithin90);
  const central=runPortfolio('partner_heavy','central','base',5000);
  const delayed=runPortfolio('partner_heavy','central','late_payments',5000);
  assert.ok(delayed.pFirstCashWithin90<central.pFirstCashWithin90);
});
test('all conversion inputs explicitly marked as fabricated assumptions not source rates',()=>{
  assert.match(config.meta.evidence,/ASSUMPTIONS NOT EMPIRICALLY ESTIMATED/);
  for(const c of Object.values(config.channels)){
    assert.match(c.description,/indicatif|théorique|theorique|illustrative|proxy|hypoth/i);
  }
  const report=readFileSync(new URL('../docs/M3-STRESS-TESTS-ACQUISITION-2026-10-23.md',import.meta.url),'utf8');
  assert.match(report,/probabilités.*hypothèses.*inventées/i);
  assert.match(report,/pas une prédiction statistique/i);
  assert.match(report,/30 jours/);
  assert.match(report,/pas une nouvelle démo/);
});
test('report includes all policies and primary source limitations',()=>{
  const report=buildReport().markdown;
  for(const policy of Object.values(config.portfolios))assert.ok(report.includes(policy.label));
  for(const term of ['2 %','13 %','0,84 %','0,29 %','indépendance','cash','commission','Malt','Upwork'])assert.ok(report.toLowerCase().includes(term.toLowerCase()),term);
});

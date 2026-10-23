import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {strategies,score} from '../scripts/benchmark-strategies.mjs';

const read=f=>readFileSync(new URL('../'+f,import.meta.url),'utf8');
test('benchmark enumerates precisely 216 different tactics across 18 meaningful families',()=>{
  assert.equal(strategies.length,216);
  assert.equal(new Set(strategies.map(s=>s.id)).size,216);
  assert.equal(new Set(strategies.map(s=>s.tactique.toLowerCase().trim())).size,216);
  const families=[...new Set(strategies.map(s=>s.famille))];
  assert.equal(families.length,18);
  for(const family of families)assert.equal(strategies.filter(s=>s.famille===family).length,12);
  assert.ok(strategies.some(s=>s.phase==='DISCOVERY'));
  assert.ok(strategies.some(s=>s.phase==='CONVERSION'));
  assert.ok(strategies.some(s=>s.phase==='ENABLEMENT'));
  assert.ok(strategies.some(s=>s.phase==='RETENTION'));
});
test('every tactic has explicit provisional grade, source family and hard eligibility',()=>{
  for(const s of strategies){
    assert.equal(s.niveau_preuve_tactique,'NON_TESTEE_INDIVIDUELLEMENT');
    assert.match(s.sources_famille,/S\d\d/);
    assert.ok(s.mesure_resultat.length>15);
    for(const metric of ['achat_intention','compatibilite_profil','delai_valeur','remote_france','cout_avantage','differentation']){
      assert.ok(Number.isInteger(Number(s[metric]))&&Number(s[metric])>=1&&Number(s[metric])<=5, s.id+': '+metric);
    }
    for(const scenario of ['principal','revenu_rapide','premium_long_terme','zero_depense'])assert.ok(score(s,scenario)>=20&&score(s,scenario)<=100);
    assert.doesNotMatch(s.tactique,/un mandat déjà gagné pour Memo Labs/i);
    if(/Medsharing|Symbyoz|Adriver/.test(s.tactique)) assert.equal(s.statut,'NO_GO');
  }
});
test('risky automation and invented references are never labelled GO',()=>{
  for(const s of strategies.filter(s=>/scraper LinkedIn|automatisés|Fausse référence|ROI inventé|malgré refus/i.test(s.tactique)))assert.equal(s.statut,'NO_GO',s.id);
});
test('source manifest is auditable and not mistaken for experimental tactics',()=>{
 const rows=read('data/strategies_sources_2026-10-23.tsv').trimEnd().split('\n');
 assert.ok(rows.length>=26);
 for(const r of rows.slice(1)){
   const cells=r.split('\t');
   assert.equal(cells.length,8);
   assert.ok(/^S\d\d$/.test(cells[0]));
   assert.ok(/^https:\/\//.test(cells[7]));
   assert.ok(['A','B','C'].includes(cells[5]));
 }
});
test('generated benchmark states ranking is hypothetical and prohibits submissions',()=>{
 const s=read('docs/M2-216-STRATEGIES-BENCHMARK-2026-10-23.md');
 assert.match(s,/216 tactiques/);
 assert.match(s,/18 familles/);
 assert.match(s,/NON|hypothétique|hypothétiques/i);
 assert.match(s,/pas des probabilités de signer/);
 assert.match(s,/pas de taux de signature/i);
 assert.match(s,/NO_GO/);
 assert.match(s,/Missions directes/);
 assert.match(s,/Alliances de freelances/);
 assert.match(s,/Aucune|aucun contact envoyé/i);
 assert.match(s,/0,84 %/);
 assert.match(s,/0,48 %/);
});

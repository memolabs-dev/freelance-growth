import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const load=(file)=>readFileSync(new URL('../'+file,import.meta.url),'utf8');

test('single operative strategy preserves owner exclusions and France-first geography',()=>{
 const s=load('docs/STRATEGY.md');
 assert.match(s,/France/);
 assert.match(s,/Thaïlande.*autorisation écrite/);
 assert.match(s,/Medsharing déjà traité/);
 assert.match(s,/Symbyoz et Adriver Group exclus/);
 assert.match(s,/500–650 € HT\/j/);
 assert.match(s,/budget\/échéance/);
 assert.match(s,/approbation par le propriétaire/);
 assert.match(s,/50 %.*25 %.*15 %.*10 %/);
});

test('reconciled research distinguishes evidence from mandates and false leads',()=>{
 const s=load('docs/M2-STRATEGY-DECISIONS-2026-10-23.md');
 for(const link of [
  'https://app.freelancemention.fr/blog/freelance-informatique/',
  'https://barometre.freeland.com/marche',
  'https://www.upwork.com/research/ai-generated-work-is-creating-more-work-for-humans',
  'https://ir.gitlab.com/news/news-details/2026/',
 ]) assert.ok(s.includes(link),link);
 assert.match(s,/BountyOS.*Source du chiffre non confirmée/);
 assert.match(s,/9x pivot formation = exclu/);
 assert.match(s,/Aucun message, formulaire, relance ou abonnement non autorisé/);
 assert.match(s,/3 appels diagnostic sans budget/);
 assert.match(s,/0 message envoyé/);
 assert.match(s,/3–6 mois/);
 assert.match(s,/pas une référence client|pas annoncés comme références clients/i);
});

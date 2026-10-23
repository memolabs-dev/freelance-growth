import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = f => readFileSync(new URL('../'+f,import.meta.url),'utf8');
const audit = read('docs/M2-STRATEGY-REDTEAM-2026-10-23.md');

test('strategy is explicitly provisional, no prospecting or success inferred', () => {
 const strategy=read('docs/STRATEGY.md');
 assert.match(strategy,/STRATÉGIE CANDIDATE, GO CONDITIONNEL UNIQUEMENT/);
 assert.match(strategy,/M2-STRATEGY-REDTEAM-2026-10-23.md/);
 assert.match(strategy,/Pas de nouvelle prospection sans approbation individuelle explicite/);
 assert.match(audit,/Aucune.*signature/);
 assert.match(audit,/HOLD.*toute nouvelle démarche commerciale/);
});

test('methodological red-team corrects invalid transfers from enterprise and platform samples', () => {
 for (const phrase of [
  '200 000–300 000 USD',
  '9 319 annonces',
  '642 avec prix',
  '33 %',
  '23 %',
  '16 %',
  '14 %',
  '3 571 vs 3 751',
  '300 décideurs',
  '125 entreprises',
  '8,3×',
  '83 600 €',
 ]) assert.ok(audit.includes(phrase), 'Missing methodology check: '+phrase);
 for (const url of [
  'https://www.freelancermap.com/files/survey/freelancer-study-2025.pdf',
  'https://www.malt.fr/t/barometre-tarifs/tech/developpeur-backend/developpeur-fullstack',
  'https://app.freelancemention.fr/blog/freelance-informatique/',
  'https://6sense.com/science-of-b2b/buyer-experience-report-2025/',
  'https://www.upwork.com/research/ai-generated-work-is-creating-more-work-for-humans',
  'https://entreprendre.service-public.gouv.fr/actualites/A18813',
 ]) assert.ok(audit.includes(url), 'Missing primary source: '+url);
});

test('rescue competitors, exclusions and approval gates remain visible', () => {
 for (const name of ['RESCUE / Firme','Etherlabz','Hestia','CodeRescue','Fiverr']) assert.ok(audit.includes(name));
 for (const company of ['Medsharing','Symbyoz','Adriver','KatchMe','Nextcloud','Oudini']) assert.ok(audit.includes(company));
 assert.match(audit,/aucun.*envoi/i);
 assert.match(audit,/source primaire active/i);
 assert.match(audit,/approbation explicite par le propriétaire/i);
 assert.match(audit,/projet interne, pas projet client/);
 assert.match(audit,/NO-GO comme offre principale/);
 assert.match(audit,/Aucun CA annuel anticipé n'est un salaire net/);
});

test('historical strategy is marked superseded for commercial decisions',()=>{
 const historical=read('docs/M2-STRATEGY-DECISIONS-2026-10-23.md');
 assert.match(historical.slice(0,500),/M2-STRATEGY-REDTEAM-2026-10-23.md/);
 assert.match(historical.slice(0,500),/commercialement validées/);
});

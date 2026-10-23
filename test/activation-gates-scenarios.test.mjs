import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=f=>readFileSync(new URL('../'+f,import.meta.url),'utf8');
const short=read('docs/M3-PILOTE-CONCRET-2026-10-23.md');
test('current real lead review does not invent eligible contracts',()=>{
 assert.match(short,/aucun nouvel acheteur pleinement qualifié/);
 assert.match(short,/HOLD — revalider annonce source/);
 assert.match(short,/minimum 5 ans/);
 assert.match(short,/6–8 ans minimum/);
 assert.match(short,/séniorité/);
 assert.match(short,/2 jours.*sur site|mardi et jeudi sur site/i);
 assert.match(short,/1 500 €\/mois/);
 assert.match(short,/n'a pas|aucune candidature, email, DM ou achat émis/i);
});
test('duplicate client group is treated as blocked not three leads',()=>{
 assert.match(short,/Beyond Skills/);
 assert.match(short,/Techunt/);
 assert.match(short,/KatchMe/);
 assert.match(short,/BLOCK_POSSIBLE_DUPLICATE/);
 assert.match(short,/22\/09\/2026/);
});
test('no-contact owner exclusions persist into live activation playbook',()=>{
 for(const name of ['Medsharing','Symbyoz','Adriver Group','Nextcloud','Oudini','symbolist.','Askable'])assert.ok(short.includes(name));
 assert.match(short,/présenter destinataire \+ texte \+ canal/);
 assert.match(short,/approbation explicite/);
 const strategy=read('docs/STRATEGY.md');
 assert.match(strategy.slice(0,700),/8 portefeuilles, 3 régimes de marché/);
 assert.match(strategy.slice(0,700),/probabilités.*hypothèses simulées/);
});

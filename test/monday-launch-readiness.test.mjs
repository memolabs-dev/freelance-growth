import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runDemo,startMockApi,naiveAgent,verifiedAgent,getState} from '../scripts/demo-proof-to-production.mjs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const titles=[
 'docs/launch/2026-10-26-MONDAY-READINESS.md',
 'docs/launch/2026-10-26-CLIENT-DOSSIERS.md',
 'docs/launch/2026-10-26-SALES-PLAYBOOK.md',
 'docs/launch/2026-10-26-OFFERS-AND-SOW.md',
 'docs/launch/2026-10-26-PROOF-READINESS.md',
 'docs/launch/2026-10-26-SYNTHETIC-DEMO-RESULTS.md'
];
test('Monday kit has six coherent, nonempty source-linked documents',()=>{
 for(const file of titles){
  const s=read(file);assert.ok(s.length>600,file);
  assert.match(s,/client|mission|achat|preuve|readiness|démonstration/i,file);
 }
 const board=read(titles[0]);
 assert.match(board,/26 octobre 2026/);
 assert.match(board,/NOT_VERIFIED|NOT VERIFIED/);
 assert.match(board,/pas.*100|PAS.*100/);
});
test('six unique potential buyer dossiers keep hard NO_SEND status and real URLs',()=>{
 const [head,...records]=read('data/launch_2026-10-26_targets.tsv').trim().split('\n');
 const cols=head.split('\t');
 assert.equal(records.length,6);
 const ids=new Set(),urls=new Set();
 for(const row of records){
  const values=row.split('\t');assert.equal(values.length,cols.length);
  const x=Object.fromEntries(cols.map((k,i)=>[k,values[i]]));
  assert.ok(!ids.has(x.id));ids.add(x.id);
  assert.ok(!urls.has(x.source));urls.add(x.source);
  assert.ok(x.source.startsWith('https://'));
  assert.equal(x.outreach,'NO_SEND');
  assert.ok(/HOLD|QUALIFY_FIRST/.test(x.status));
  assert.ok(x.hard_gates_missing.length>15);
 }
 const cel=records.find(x=>x.includes('Celaneo'));assert.match(cel,/HYBRID_REMOTE_AMBIGUOUS/);
 const juwa=records.find(x=>x.includes('JUWA'));assert.match(juwa,/UNKNOWN_FIXED_BUDGET/);
});
test('reference client and HDS claims remain limited and honest',()=>{
 const docs=titles.map(read).join('\n');
 for(const key of ['JUWA','Celaneo','Gamme solutions','ADDIXWARE','Medsharing','Symbyoz','Adriver','KatchMe','Nextcloud'])assert.ok(docs.includes(key),key);
 assert.match(docs,/NOT_VERIFIED/);
 assert.match(docs,/DPA|article 28|art.28/);
 assert.match(docs,/PAS.*certif|pas.*certif/i);
 assert.match(docs,/pas.*client|PAS.*client/i);
 assert.match(docs,/aucun envoi|pas d.envoi|NON ENVOY/i);
});
test('a real loopback HTTP demo shows false success and 403, 503, 200 safely',async()=>{
 const result=await runDemo();
 assert.equal(result.result,'PASS');assert.equal(result.cases.length,4);
 assert.ok(result.cases.every(c=>c.pass));
 for(const code of [403,503,200])assert.ok(result.events.some(e=>e.http===code));
 assert.equal(result.kind,'synthetic localhost API only');
 assert.match(result.limitations.join(' '),/no browser/i);
});
test('permission errors cannot mutate mock data',async()=>{
 const api=await startMockApi();
 try{
  const unsafe=await naiveAgent(api.url);
  assert.equal(unsafe.claimedSuccess,true);
  assert.equal(await getState(api.url),'pending');
  const fail=await verifiedAgent(api.url);
  assert.equal(fail.http,403);assert.equal(fail.claimedSuccess,false);
  const outage=await verifiedAgent(api.url,{role:'editor',outage:true});
  assert.equal(outage.http,503);assert.equal(await getState(api.url),'pending');
  const success=await verifiedAgent(api.url,{role:'editor'});
  assert.equal(success.http,200);assert.equal(await getState(api.url),'approved');
 }finally{await api.close();}
});
test('stored demo results represent only locally tested synthetic API',()=>{
 const s=read('docs/launch/2026-10-26-SYNTHETIC-DEMO-RESULTS.md');
 assert.match(s,/PASS/);
 assert.match(s,/fictive|synthetic|synthétique/i);
 assert.match(s,/aucun client|client/i);
 assert.match(s,/no browser|navigateur|React/i);
});

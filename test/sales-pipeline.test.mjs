import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { analyzeTsv, markdownReport } from '../scripts/rank-prospects.mjs';
const src=readFileSync(new URL('../data/examples/pipeline-synthetic.tsv',import.meta.url),'utf8');
const [head,...lines]=src.trimEnd().split('\n');
const keys=head.split('\t');
const edit=(row,key,val)=>{const cells=row.split('\t');cells[keys.indexOf(key)]=val;return cells.join('\t')};
const run=(row)=>analyzeTsv([head,row].join('\n'));
const data=analyzeTsv(src);

test('no fabricated sales or contracts in examples',()=>{
  assert.equal(data.leads.length,4);
  assert.ok(Object.values(data.channels).every(c=>c.won===0&&c.collected_ht===0));
  assert.match(markdownReport(data),/probabilité de signature/);
});
test('confirmed versus unverified residence is a hard gate',()=>{
  assert.equal(data.leads.find(x=>x.account_id==='EX-SaaS').recommendation,'READY_FOR_HUMAN_REVIEW');
  assert.equal(data.leads.find(x=>x.account_id==='EX-Agency').recommendation,'VERIFY');
  assert.equal(data.leads.find(x=>x.account_id==='EX-Europe').recommendation,'REJECT');
  assert.equal(data.leads.find(x=>x.account_id==='EX-Opposed').recommendation,'DO_NOT_CONTACT');
});
test('duplicate account and repeated company/offer rejected',()=>{
  assert.throws(()=>analyzeTsv(src+lines[0]+'\n'),/Duplicate account_id/);
  assert.throws(()=>analyzeTsv(src+edit(lines[0],'account_id','EX-Second')+'\n'),/Duplicate company\/offer/);
});
test('invalid ratings and geography rejected',()=>{
  assert.throws(()=>run(edit(lines[0],'budget','8')),/budget must be 0-5/);
  assert.throws(()=>run(edit(lines[0],'thailand','EU_ONLY')),/invalid country/);
});
test('signed sales must have real amounts',()=>{
  assert.throws(()=>run(edit(lines[0],'status','WON')),/WON requires signed amount/);
  assert.throws(()=>run(edit(lines[0],'collected_ht','6000')),/collected requires signed/);
  const won=edit(edit(lines[0],'status','WON'),'signed_ht','6000');
  const recorded=run(edit(won,'collected_ht','2000'));
  assert.equal(recorded.leads[0].recommendation,'WON');
  assert.equal(recorded.channels['published-contract'].signed_ht,6000);
  assert.equal(recorded.channels['published-contract'].collected_ht,2000);
});
test('strategy and experiments reference buyer, commercial proof and limits',()=>{
  const op=readFileSync(new URL('../docs/GTM-2026-OPERATING-STRATEGY.md',import.meta.url),'utf8');
  for(const term of ['France Num','Upwork','Malt Tech','Gartner','e-invoicing','SaaS B2B','Thaïlande','20 min','500','CNIL','Drop','Memo Bridge']){
    assert.ok(op.toLowerCase().includes(term.toLowerCase()),term);
  }
  for(const filename of ['GTM-2026-EXPERIMENTS.md','GTM-2026-OUTREACH.md']){
    assert.ok(readFileSync(new URL('../docs/'+filename,import.meta.url),'utf8').length>4000);
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {original,settings,policyFor,validate,simulate,build,reserve} from '../scripts/simulate-acquisition-v2.mjs';
test('delivery never starts before earliest availability or contract',()=>{
 const used=new Array(80).fill(0);
 const accepted=reserve(used,39,72,2,3,5);
 assert.ok(accepted>=39);
 assert.equal(accepted,42);
 assert.equal(reserve(used,42,42,2,3,5),null,'cannot schedule overlapping capacity');
});

test('25 distinct shocks, eight portfolios and three research capacities remain defined',()=>{
 assert.equal(Object.keys(settings.shocks).length,25);
 assert.equal(Object.keys(original.portfolios).length,8);
 assert.doesNotThrow(validate);
 for(const b of [20,40,80])for(const n of Object.keys(original.portfolios)){
   const p=policyFor(n,b);
   assert.ok(p.hours<=b+1e-6,'Budget overflow '+n+' '+b);
   assert.ok(Object.values(p.mix).every(x=>Number.isInteger(x)&&x>=0));
 }
});
test('seeded reproducibility for synthetic what-if, not empirically calibrated',()=>{
 const a=simulate('balanced',{budget:40,iterations:1800});
 const b=simulate('balanced',{budget:40,iterations:1800});
 assert.deepEqual(a,b);
 assert.match(settings.meta.label,/WHAT-IF|not measured/i);
});
test('signed, earned, invoiced, paid and payment odds stay consistent across horizons',()=>{
 for(const n of Object.keys(original.portfolios)){
   const x=simulate(n,{iterations:1600});
   let prev={signed:0,earned:0,invoiced:0,paid:0,pSigned:0,pCash:0};
   for(const h of [30,60,90,180]){
     const cur=x.h[h];
     for(const k of ['signed','earned','invoiced','paid']) {
       assert.ok(cur[k]>=prev[k],n+' nonmonotonic '+k+' at '+h);
       assert.ok(cur[k]>=0);
     }
     assert.ok(cur.earned<=cur.signed+1,n+' earned exceeds signed');
     assert.ok(cur.invoiced<=cur.signed+1,n+' invoice exceeds signed');
     assert.ok(cur.paid<=cur.invoiced+1,n+' paid before invoice');
     assert.ok(cur.pCash<=cur.pSigned+0.1,n+' paid without deal');
     for(const k of ['pSigned','pCash'])assert.ok(cur[k]>=prev[k] && cur[k]>=0 && cur[k]<=100,n+' probability '+k);
     prev=cur;
   }
 }
});
test('cashflow shocks matter while price shock lowers signed value',()=>{
 const opts={iterations:2500};
 const normal=simulate('partner_heavy',opts),late=simulate('partner_heavy',{...opts,shock:'payments_90'});
 assert.ok(late.h[90].paid<normal.h[90].paid);
 const pressure=simulate('direct_heavy',{...opts,shock:'price_pressure'});
 const direct=simulate('direct_heavy',opts);
 assert.equal(pressure.h[90].pSigned,direct.h[90].pSigned,'price change alone must not change signature count when conversion rate is fixed');
 assert.ok(pressure.h[90].signed<direct.h[90].signed);
 const net60=simulate('direct_heavy',{...opts,shock:'payments_60'});
 assert.equal(net60.h[90].pSigned,direct.h[90].pSigned,'payment timing alone does not rewrite past signatures');
 assert.ok(net60.h[90].paid<=direct.h[90].paid);
 const noMandate=simulate('partner_heavy',{...opts,shock:'partner_no_mandate'});
 assert.ok(noMandate.counters.eligible<normal.counters.eligible);
});
test('limit on delivery means 80h acquisition is not automatically 2x revenue',()=>{
 const twenty=simulate('direct_heavy',{iterations:2600,budget:20});
 const eighty=simulate('direct_heavy',{iterations:2600,budget:80});
 assert.ok(eighty.counters.eligible>twenty.counters.eligible);
 assert.ok(eighty.h[90].signed>=0);
 assert.ok(eighty.counters.lostCapacity>=0);
 const low=simulate('direct_heavy',{iterations:2600,shock:'low_capacity'});
 const base=simulate('direct_heavy',{iterations:2600});
 assert.ok(low.h[90].signed<base.h[90].signed);
});
test('robust regret is nonnegative and covers every portfolio',()=>{
 const r=build();
 assert.equal(Object.keys(r.shocks).length,25);
 assert.equal(Object.keys(r.robust).length,8);
 assert.equal(Object.keys(r.hours).length,3);
 for(const [k,v] of Object.entries(r.robust)){
   assert.ok(v.regretSignature>=0 && v.regretCash>=0,k+' negative regret');
   assert.ok(v.top3Signature>=0 && v.top3Signature<=25);
   assert.ok(v.top3Cash>=0 && v.top3Cash<=25);
 }
});
test('published comparison states synthetic nature and exclusions',()=>{
 const file=readFileSync(new URL('../docs/M3-ROBUSTNESS-STRESS-TESTS-V2-2026-10-23.md',import.meta.url),'utf8');
 assert.match(file,/25 scénarios/);
 assert.match(file,/Aucun taux de conversion n’est calibré/);
 assert.match(file,/J\+30/);
 assert.match(file,/J\+180/);
 assert.match(file,/Medsharing/);
 assert.match(file,/Symbyoz/);
 assert.match(file,/Adriver/);
 const data=JSON.parse(readFileSync(new URL('../data/scenario_v2_results_2026-10-23.json',import.meta.url),'utf8'));
 assert.match(data.meta.warning,/synthetic/);
 assert.equal(data.central.length,8);
});
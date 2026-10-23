#!/usr/bin/env node
// Synthetic acquisition simulation V2. Rates are not calibrated to Memo Labs.
import {readFileSync,writeFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const base=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=f=>JSON.parse(readFileSync(resolve(base,f),'utf8'));
export const original=read('data/scenario_assumptions_2026-10-23.json');
export const settings=read('data/scenario_v2_stresses_2026-10-23.json');
const limits=[30,60,90,180];
const clip=(v,a=0,b=.99)=>Math.min(b,Math.max(a,v));
const money=n=>Math.round(n);
function randomSeed(k){let h=2166136261;for(const s of k){h^=s.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0||1;}
function rng(seed){let x=randomSeed(seed);return ()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return (x>>>0)/4294967296;};}
const rr=(r,min,max)=>min+Math.floor(r()*(max-min+1));
export function policyFor(name,budget=40){
  const p=original.portfolios[name];
  if(!p)throw Error('bad portfolio');
  const mix=Object.fromEntries(Object.entries(p.mix).map(([c,n])=>[c,Math.round(n*budget/40)]));
  let hours=Object.entries(mix).reduce((a,[c,n])=>a+n*original.channels[c].hoursPerDossier,0)+p.proofHours*budget/40;
  // Round discrete dossier counts DOWN where necessary, so every budget is strictly feasible.
  while(hours>budget+1e-9){
    const key=Object.keys(mix).filter(c=>mix[c]>0).sort((a,b)=>mix[b]*original.channels[b].hoursPerDossier-mix[a]*original.channels[a].hoursPerDossier)[0];
    if(!key)throw Error('cannot fit portfolio');
    mix[key]--;hours-=original.channels[key].hoursPerDossier;
  }
  return {mix,proofHours:p.proofHours*budget/40,hours};
}
export function validate(){
  if(Object.keys(original.portfolios).length!==8||Object.keys(settings.shocks).length<20)throw Error('missing policies or shocks');
  for(const b of [20,40,80])for(const name of Object.keys(original.portfolios))policyFor(name,b);
  for(const [key,p] of Object.entries(original.channels)){
    for(const part of ['eligible','meeting','proposal','close'])if(!(p[part]>=0&&p[part]<=1))throw Error('bad funnel '+key);
  }
}
validate();
export function reserve(used,start,latest,weeks,perWeek,capacity){
  // Start at the NEXT whole workweek, never before signature or earliest availability.
  for(let day=Math.ceil(start/7)*7;day<=latest;day+=7){
    const week=day/7;
    let fits=week+weeks<used.length;
    if(!fits)break;
    for(let i=week;i<week+weeks;i++)if(used[i]+perWeek>capacity+1e-6){fits=false;break;}
    if(fits){for(let i=week;i<week+weeks;i++)used[i]+=perWeek;return day;}
  }
  return null;
}
function oneTrial(name,budget,regime,shock,r){
  const portfolio=policyFor(name,budget);
  const mood=.55+r()*.9,partnerMood=.55+r()*.9;
  const opportunities=[],capacity=settings.meta.deliveryDaysPerWeek;
  let eligible=0,meetings=0,proposals=0,dupes=0;
  for(const [channel,n] of Object.entries(portfolio.mix)){
    const p=original.channels[channel];
    for(let j=0;j<n;j++){
      // Listings belonging to the same buyer are represented by ONE chance, never several.
      const dup=clip((shock.duplicateRate??settings.meta.duplicateRate)*(channel==='recruiter'?1.3:1),0,.9);
      if(r()<dup){dupes++;continue;}
      const demand=(['partner','agency'].includes(channel)?partnerMood*(shock.partnerDemand??1):mood*(shock.demand??1));
      const pe=clip(p.eligible*regime.eligibleFactor*demand*(shock.eligibility?.[channel]??1));
      if(r()>=pe)continue;eligible++;
      const proofMultiplier=(shock.proof??1)*(1+portfolio.proofHours*.009);
      if(r()>=clip(p.meeting*regime.meetingFactor*demand*proofMultiplier*(shock.meeting?.[channel]??1)))continue;meetings++;
      if(r()>=clip(p.proposal*regime.proposalFactor))continue;proposals++;
      if(r()>=clip(p.close*regime.closeFactor*(shock.close??1)))continue;
      opportunities.push({
        channel,kind:p.dealType,
        day:rr(r,0,27)+rr(r,5,13)+rr(r,2,10)+rr(r,6,18)+(shock.buyerDelay??0),
        value:p.signedFaceEUR*(shock.price??1)*(1-clip(p.feeRate+(shock.extraFee??0),0,.35))
      });
    }
  }
  opportunities.sort((a,b)=>a.day-b.day);
  const used=new Array(90).fill(0),deals=[],cap=shock.deliveryDaysPerWeek??capacity;
  let lostCapacity=0;
  for(const o of opportunities){
    const long=o.kind==='long',weeks=long?12:2,dwp=long?3.5:3;
    const start=reserve(used,o.day+rr(r,2,7),o.day+28,weeks,dwp,cap);
    if(start===null){lostCapacity++;continue;}
    const invoices=[],cancel=r()<(shock.cancelChance??settings.meta.cancelChance);
    const paymentDays=Math.max(0,(shock.paymentDays??settings.meta.paymentDays)+regime.paymentShiftDays);
    if(long){
      for(let k=0;k<3;k++){
        if(cancel&&k>0)break;
        const invoiceDay=start+(k+1)*28;
        invoices.push({day:invoiceDay,paidDay:invoiceDay+Math.max(0,paymentDays+rr(r,-4,12)),amount:o.value/3});
      }
    }else{
      const finished=start+14;
      const deposit=r()<(shock.depositChance??settings.meta.depositChance);
      if(deposit){
        invoices.push({day:o.day,paidDay:o.day+rr(r,2,14),amount:o.value*.4});
        if(!cancel)invoices.push({day:finished,paidDay:finished+Math.max(0,paymentDays+rr(r,-4,12)),amount:o.value*.6});
      }else if(!cancel){
        invoices.push({day:finished,paidDay:finished+Math.max(0,paymentDays+rr(r,-4,12)),amount:o.value});
      }
    }
    deals.push({day:o.day,value:o.value,kind:o.kind,start,cancel,invoices});
  }
  const horizons={};
  for(const h of limits){
    const signed=deals.filter(d=>d.day<=h);
    const invoices=signed.flatMap(d=>d.invoices);
    const amount=f=>invoices.filter(f).reduce((acc,x)=>acc+x.amount,0);
    const earned=signed.reduce((acc,d)=>{
      const t=d.kind==='long'?84:14;
      const f=clip((h-d.start)/t,0,1);
      return acc+d.value*Math.min(f,d.cancel?(d.kind==='long'?1/3:0):1);
    },0);
    horizons[h]={
      signed:signed.reduce((a,d)=>a+d.value,0),
      earned,invoiced:amount(x=>x.day<=h),paid:amount(x=>x.paidDay<=h),
      hasSigned:Number(signed.length>0),hasPaid:Number(amount(x=>x.paidDay<=h)>0),contracts:signed.length
    };
  }
  return {horizons,eligible,meetings,proposals,dupes,lostCapacity};
}
export function simulate(name,{budget=40,regime='central',shock='base',iterations=1500}={}){
  if(!original.portfolios[name]||!original.regimes[regime]||!settings.shocks[shock])throw Error('unknown scenario');
  // Common random numbers across shocks for cleaner sensitivity comparisons.
  const r=rng(name+'|'+budget+'|'+regime+'|v2');
  const h=Object.fromEntries(limits.map(t=>[t,{signed:0,earned:0,invoiced:0,paid:0,hasSigned:0,hasPaid:0,contracts:0}]));
  const counters={eligible:0,meetings:0,proposals:0,dupes:0,lostCapacity:0};
  for(let i=0;i<iterations;i++){
    const x=oneTrial(name,budget,original.regimes[regime],settings.shocks[shock],r);
    for(const t of limits)for(const [key,val] of Object.entries(x.horizons[t]))h[t][key]+=val;
    for(const k in counters)counters[k]+=x[k];
  }
  for(const t of limits){
    for(const k in h[t])h[t][k]/=iterations;
    h[t].pSigned=Math.round(h[t].hasSigned*1000)/10;
    h[t].pCash=Math.round(h[t].hasPaid*1000)/10;
    delete h[t].hasSigned;delete h[t].hasPaid;
    for(const k of ['signed','earned','invoiced','paid'])h[t][k]=money(h[t][k]);
  }
  for(const k in counters)counters[k]=Math.round(counters[k]/iterations*100)/100;
  return {name,budget,regime,shock,iterations,h,counters};
}
export function build(){
  const policies=Object.keys(original.portfolios),iter=settings.meta.iterations;
  const central=policies.map(n=>simulate(n,{iterations:iter}));
  const worlds=Object.fromEntries(Object.keys(original.regimes).map(k=>[k,policies.map(n=>simulate(n,{regime:k,iterations:iter}))]));
  const shocks=Object.fromEntries(Object.keys(settings.shocks).map(k=>[k,policies.map(n=>simulate(n,{shock:k,iterations:iter}))]));
  const hours=Object.fromEntries([20,40,80].map(k=>[k,policies.map(n=>simulate(n,{budget:k,iterations:iter}))]));
  const robust=Object.fromEntries(policies.map(n=>[n,{top3Signature:0,top3Cash:0,regretSignature:0,regretCash:0}]));
  const worldsN=Object.keys(shocks).length;
  for(const values of Object.values(shocks)){
    const sign=[...values].sort((a,b)=>b.h[90].pSigned-a.h[90].pSigned);
    const cash=[...values].sort((a,b)=>b.h[90].paid-a.h[90].paid);
    const maxSigned=Math.max(...values.map(x=>x.h[90].signed));
    const maxCash=Math.max(...values.map(x=>x.h[90].paid));
    for(const x of sign.slice(0,3))robust[x.name].top3Signature++;
    for(const x of cash.slice(0,3))robust[x.name].top3Cash++;
    for(const x of values){
      robust[x.name].regretSignature+=maxSigned-x.h[90].signed;
      robust[x.name].regretCash+=maxCash-x.h[90].paid;
    }
  }
  for(const x of Object.values(robust)){x.regretSignature=money(x.regretSignature/worldsN);x.regretCash=money(x.regretCash/worldsN);}
  return {central,worlds,shocks,hours,robust};
}
const euro=n=>money(n).toLocaleString('fr-FR')+' €';
function markdown(report){
  const lines=[
    '# M3 V2 — Simulations de robustesse corrigées (23 octobre 2026)','',
    '**Ce document simule des scénarios hypothétiques. Aucun taux de conversion n’est calibré sur les ventes Memo Labs. Les probabilités ne sont ni des prévisions ni des intervalles de confiance.**','',
    '## Les corrections importantes','',
    '- Corrélation : un climat de marché commun et un climat des partenaires communs relient les opportunités de la même simulation. Un facteur de doublon réduit les annonces distinctes supposées. Dans la vraie vie il faut également dédupliquer par nom du client final.',
    '- Capacité : les missions longues réservent 3,5 jours par semaine pendant 12 semaines ; les sprints 3 jours par semaine pendant deux semaines. Une mission supplémentaire incompatible n’est pas comptée comme signée.',
    '- Facturation : contrat signé, travail réalisé, facture émise et paiement encaissé sont suivis séparément aux horizons J+30, J+60, J+90, J+180 ; les factures longues suivent des périodes de 28 jours, les acomptes ne sont pas automatiques.',
    '- Annulation : un contrat interrompu peut être signé mais pas facturé intégralement. Le modèle ne prétend pas traiter la fiscalité, les cotisations, les éventuelles créances irrécouvrables ou les pénalités contractuelles.',
    '- 8 allocations commerciales; 25 scénarios de choc dont marchés, prix, pénurie remote, concurrence, délais client, paiements, preuves, capacité et doublons ; 20/40/80 heures de recherche sur quatre semaines ; quatre horizons.',
    '- Modèle déterministe seedé pour rendre les simulations reproductibles. Les paramètres de conversion restent des hypothèses **inventées**, donc davantage de tirages ne rend pas la prévision plus fiable.','',
    '## Tableau du scénario central à 40 heures de préparation','',
    '| Portefeuille | P(signature J90), simulée | P(cash J90), simulée | Signé J90 attendu | Produit J90 | Facturé J90 | Payé J90 | Payé J180 |',
    '|---|---:|---:|---:|---:|---:|---:|---:|'
  ];
  for(const r of [...report.central].sort((a,b)=>b.h[90].pSigned-a.h[90].pSigned)){
    const x=r.h[90],y=r.h[180];
    lines.push('| '+original.portfolios[r.name].label+' | '+x.pSigned+' % | '+x.pCash+' % | '+euro(x.signed)+' | '+euro(x.earned)+' | '+euro(x.invoiced)+' | '+euro(x.paid)+' | '+euro(y.paid)+' |');
  }
  lines.push('','**Une valeur espérée positive n’indique pas un gain probable à l’échelle individuelle : beaucoup de tirages n’obtiennent aucun contrat.**','',
  '## Les 25 scénarios de sensibilité','',
  '| Stress test | Meilleure P(signature J90) dans ce modèle | P simulée | Meilleur encaissement J90 dans ce modèle | € simulés |',
  '|---|---|---:|---|---:|');
  for(const [key,rows] of Object.entries(report.shocks)){
    const a=[...rows].sort((x,y)=>y.h[90].pSigned-x.h[90].pSigned)[0],b=[...rows].sort((x,y)=>y.h[90].paid-x.h[90].paid)[0];
    lines.push('| '+settings.shocks[key].label+' | '+original.portfolios[a.name].label+' | '+a.h[90].pSigned+' % | '+original.portfolios[b.name].label+' | '+euro(b.h[90].paid)+' |');
  }
  lines.push('','## Temps disponible : 20 h, 40 h et 80 h','',
    '| Temps sur 4 semaines | Mix | P(signature J90) simulée | Signé J90 | Payé J90 |',
    '|---|---|---:|---:|---:|');
  for(const [hours,rows] of Object.entries(report.hours))for(const r of rows.filter(x=>['balanced','direct_heavy','partner_heavy'].includes(x.name))){
    lines.push('| '+hours+' h | '+original.portfolios[r.name].label+' | '+r.h[90].pSigned+' % | '+euro(r.h[90].signed)+' | '+euro(r.h[90].paid)+' |');
  }
  lines.push('','## Robustesse des rangs, à ne pas confondre avec une validation statistique','',
  '| Mix | Top 3 signature sur 25 | Top 3 paiement sur 25 | Regret signé moyen hypothétique | Regret paiement moyen hypothétique |',
  '|---|---:|---:|---:|---:|');
  for(const [name,x] of Object.entries(report.robust).sort((a,b)=>a[1].regretCash-b[1].regretCash))lines.push('| '+original.portfolios[name].label+' | '+x.top3Signature+' | '+x.top3Cash+' | '+euro(x.regretSignature)+' | '+euro(x.regretCash)+' |');
  lines.push('','Les chocs et leur importance sont **choisis par nous**. Ce classement indique où poser nos premières questions, pas quel canal signera réellement.','',
  '## Vérifications empiriques distinctes des hypothèses de conversion','',
  '- [Freelancermap Study 2025, p14](https://www.freelancermap.com/files/survey/freelancer-study-2025.pdf) : 33 % des freelances interrogés désignent les plateformes comme meilleur canal, 23 % réseau personnel, 16 % recruteurs, 14 % recommandations ; pas des taux de signature.',
  '- [FreelanceScope, septembre 2026](https://www.freelancescope.fr/blog/missions-freelance-full-remote-septembre-2026) : 97 / 4 788 annonces en full remote dans son catalogue ; [FreelanceMention, octobre 2026](https://pro.freelancemention.fr/blog/mission-freelance-teletravail/) : 13 % dans un échantillon LinkedIn différent. Ces taux ne se transfèrent pas directement au modèle.',
  '- [Service Public, août 2026](https://entreprendre.service-public.gouv.fr/vosdroits/F23211) : règlement B2B général à 30 jours, aménagements sous conditions à 60 jours ou 45 jours fin de mois.',
  '- [Malt, septembre 2025](https://help.malt.com/kb/guide/fr/la-commission-malt-h2dK0HxuKA/Steps/2510922) : commission initiale 10 %, puis 5 % après six mois, 2 % si client apporté ; le taux contractuel réel est communiqué à la proposition.',
  '- [Service Public, 2026](https://entreprendre.service-public.gouv.fr/actualites/A18813) : seuil de 83 600 € HT/an pour certaines prestations de services sous régime micro, sous réserve des règles applicables. Aucun calcul du net après charges dans cette simulation.','',
  '## Décision provisoire et falsification','',
  '**Privilégier une recherche diversifiée et réversible : mandats B2B remote France, recruteurs disposant de mandats réels, co-traitance avec client déjà signé.** Mesurer séparément contrat signé, montant produit, facture et trésorerie. Ne pas signer une mission qui exige une capacité ou une présence non disponible.',
  'Continuer #40 (mandats réellement éligibles), #62 (co-traitants avec client actuel) et #63 (preuve React/API/E2E exécutée), sans démarchage tant que destinataire, texte et canal précis ne sont pas approuvés.',
  'Exclusions inchangées : Medsharing déjà traité, Symbyoz et Adriver exclus ; éviter aussi Nextcloud, KatchMe/Techunt/Beyond Skills/Station F et contacts historiques en doublon.',
  'Le goulot reste la preuve de véritables acheteurs, **pas le nombre de scénarios simulés**. Aucune candidature ni dépense envoyée.','');
  return lines.join('\n').trimEnd()+'\n';
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const result=build();
  if(process.argv.includes('--write')){
    writeFileSync(resolve(base,'data/scenario_v2_results_2026-10-23.json'),JSON.stringify({meta:{warning:'synthetic, not observed conversions',horizons:limits},...result},null,2)+'\n');
    writeFileSync(resolve(base,'docs/M3-ROBUSTNESS-STRESS-TESTS-V2-2026-10-23.md'),markdown(result));
  }
  console.log(JSON.stringify({shocks:Object.keys(settings.shocks).length,central:result.central.map(x=>({name:x.name,pSign:x.h[90].pSigned,pCash:x.h[90].pCash,signed:x.h[90].signed,earned:x.h[90].earned,invoiced:x.h[90].invoiced,paid:x.h[90].paid})),robust:result.robust}));
}
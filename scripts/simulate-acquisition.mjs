#!/usr/bin/env node
// Commercial acquisition stress-test. Not a forecast, not empirically fitted.
import { readFileSync,writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname,resolve } from 'node:path';

const here=resolve(dirname(fileURLToPath(import.meta.url)),'..');
export const config=JSON.parse(readFileSync(resolve(here,'data/scenario_assumptions_2026-10-23.json'),'utf8'));
export const scenarios=[
  {id:'base',label:'Central'},
  {id:'remote_scarce',label:'Remote France rare',eligibilityOverride:{direct:0.55,recruiter:0.55,marketplace:0.55}},
  {id:'partner_scarce',label:'Pas assez de partenaires avec clients',eligibilityOverride:{partner:0.4,agency:0.4}},
  {id:'proof_null',label:'La preuve ne change pas la conversion',proofFactor:0},
  {id:'proof_strong',label:'Preuve technique très persuasive (hypothèse)',proofFactor:3},
  {id:'late_payments',label:'Paiements décalés de 30 jours',paymentExtra:30},
  {id:'outbound_weak',label:'Prospection directe peu réactive',meetingOverride:{trigger:0.3}}
];
function rng(seed) {
  let x=seed>>>0;
  return ()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return (x>>>0)/4294967296;};
}
const clamp=p=>Math.max(0,Math.min(0.98,p));
const randRange=(r,a,b)=>a+Math.floor(r()*(b-a+1));
const round=(n,k=0)=>Math.round(n*10**k)/10**k;
function hash(str) {let h=2166136261;for(const c of str){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
const avg=xs=>xs.reduce((a,b)=>a+b,0)/xs.length;
export function validate(){
  const c=config;
  if(!Number.isInteger(c.meta.iterations)||c.meta.iterations<1000)throw Error('iterations');
  if(Object.keys(c.channels).length<6||Object.keys(c.portfolios).length<6)throw Error('need alternatives');
  for(const [name,p] of Object.entries(c.portfolios)){
    const hrs=p.proofHours+Object.entries(p.mix).reduce((sum,[k,n])=>{
      if(!c.channels[k]||!Number.isInteger(n)||n<0)throw Error('bad mix '+name);
      return sum+c.channels[k].hoursPerDossier*n;
    },0);
    if(hrs>c.meta.budgetHours+1e-6||hrs<25)throw Error('unfair hours '+name+':'+hrs);
    if(Math.abs(p.totalHours-hrs)>1e-6)throw Error('stored hours mismatch '+name);
  }
  for(const p of Object.values(c.channels)){
    for(const k of ['eligible','meeting','proposal','close'])if(!(p[k]>=0&&p[k]<=1))throw Error('bad p '+k);
    if(!['long','sprint'].includes(p.dealType))throw Error('type');
    if(p.firstInvoiceEUR>p.signedFaceEUR)throw Error('invalid economic value');
  }
}
validate();
export function runPortfolio(policyId,regimeId='central',scenarioId='base',iters=config.meta.iterations){
  const c=config;const portfolio=c.portfolios[policyId],regime=c.regimes[regimeId],s=scenarios.find(x=>x.id===scenarioId);
  if(!portfolio||!regime||!s)throw Error('unknown portfolio, market regime or sensitivity');
  const random=rng(hash(policyId+'|'+regimeId+'|'+scenarioId+'|v1'));
  const values=[]; const cashVals=[];
  let numDeals=0,totalMeetings=0,totalProposals=0,totalEligible=0;
  let firstDealDays=[],firstCashDays=[],anyDeal=0,anyCash=0;
  for(let j=0;j<iters;j++){
    let eligible=0,meetings=0,proposals=0,contracts=0,face=0,cash=0,firstSigned=Infinity,firstPaid=Infinity;
    // Simplification: opportunities are independent, shared buyer and duplicate checks are EXTERNAL hard gates.
    for(const [channelId,count] of Object.entries(portfolio.mix)){
      const ch=c.channels[channelId];
      const pEligible=clamp(ch.eligible*regime.eligibleFactor*(s.eligibilityOverride?.[channelId]??1));
      const proofBoost=1+Math.max(0,portfolio.proofHours-4)*0.012*(s.proofFactor??1);
      const pMeeting=clamp(ch.meeting*regime.meetingFactor*proofBoost*(s.meetingOverride?.[channelId]??1));
      const pProposal=clamp(ch.proposal*regime.proposalFactor);
      const pClose=clamp(ch.close*regime.closeFactor*(1+Math.max(0,portfolio.proofHours-4)*0.006*(s.proofFactor??1)));
      for(let k=0;k<count;k++){
        const seenDay=randRange(random,0,27);
        if(random()>=pEligible)continue;
        eligible++;
        if(random()>=pMeeting)continue;
        meetings++;
        if(random()>=pProposal)continue;
        proposals++;
        if(random()>=pClose)continue;
        const contractDay=seenDay+randRange(random,3,12)+randRange(random,2,10)+randRange(random,5,18);
        if(contractDay>c.meta.horizonDays)continue;
        contracts++;
        const signedAmount=ch.signedFaceEUR*(1-ch.feeRate);
        face+=signedAmount;
        firstSigned=Math.min(firstSigned,contractDay);
        let receiptDay,firstReceipt;
        if(ch.dealType==='long'){
          receiptDay=contractDay+randRange(random,7,21)+28+randRange(random,20,45);
          firstReceipt=ch.firstInvoiceEUR*(1-ch.feeRate);
        }else{
          // Some agreements feature an agreed 40% deposit; others net 30 after delivery.
          const deposit=random()<0.45;
          receiptDay=contractDay+(deposit?randRange(random,2,14):14+randRange(random,20,40));
          firstReceipt=ch.firstInvoiceEUR*(1-ch.feeRate)*(deposit?0.4:1);
        }
        receiptDay+=regime.paymentShiftDays+(s.paymentExtra??0);
        if(receiptDay<=c.meta.horizonDays){
          cash+=firstReceipt;
          firstPaid=Math.min(firstPaid,receiptDay);
        }
      }
    }
    if(contracts>0){anyDeal++;firstDealDays.push(firstSigned);}
    if(cash>0){anyCash++;firstCashDays.push(firstPaid);}
    values.push(face);cashVals.push(cash);
    numDeals+=contracts;totalEligible+=eligible;totalMeetings+=meetings;totalProposals+=proposals;
  }
  const med=v=>{const copy=[...v].sort((a,b)=>a-b);return copy[Math.floor(copy.length/2)]};
  return {
    policy:policyId,regime:regimeId,scenario:scenarioId,iterations:iters,hours:portfolio.totalHours,
    dossiers:Object.values(portfolio.mix).reduce((a,b)=>a+b,0),
    expectedEligible:round(totalEligible/iters,1),
    expectedMeetings:round(totalMeetings/iters,2),
    expectedProposals:round(totalProposals/iters,2),
    expectedSignedDeals:round(numDeals/iters,3),
    pSignedWithin90:round(100*anyDeal/iters,1),
    pFirstCashWithin90:round(100*anyCash/iters,1),
    expectedSignedFaceEUR:round(avg(values)),
    expectedFirstCashEUR:round(avg(cashVals)),
    medianSignedFaceEUR:med(values),
    medianFirstCashEUR:med(cashVals),
    medianFirstSignatureDay:firstDealDays.length?med(firstDealDays):null,
    medianFirstCashDay:firstCashDays.length?med(firstCashDays):null
  };
}
export function buildReport(){
  const policies=Object.keys(config.portfolios);
  const table={};
  for(const regime of Object.keys(config.regimes))table[regime]=policies.map(p=>runPortfolio(p,regime));
  const stress=scenarios.filter(x=>x.id!=='base').map(s=>({
    scenario:s.id,label:s.label,
    results:policies.map(p=>runPortfolio(p,'central',s.id,5000))
  }));
  // "Winner" means maximum in this synthetic model alone. It is not a winner in the real market.
  const fmtpct=x=>round(x)+' %', euro=x=>Math.round(x).toLocaleString('fr-FR')+' €';
  const md=[];
  md.push('# Stress tests de portefeuilles freelance — 23 octobre 2026','');
  md.push('**Ceci est une SIMULATION CONDITIONNELLE, pas une prédiction statistique de signature.** Toutes les probabilités du modèle sont des **hypothèses de travail inventées pour comparer les mécanismes**. Aucune n’a été estimée sur les ventes Memo Labs. Le catalogue de 216 tactiques n’a pas été A/B testé. Les valeurs de contrat sont des hypothèses, jamais des budgets clients vérifiés.','');
  md.push('## Protocole et unités','');
  md.push('- Tous les plans disposent de **40 heures de prospection/qualification et preuve au total sur 4 semaines** ; scénarios évalués sur 90 jours. La disponibilité réelle du propriétaire est **à confirmer**, ces 40 h sont un étalon, non un agenda réservé.');
  md.push('- Pour chaque **dossier d’opportunité** trouvé après recherche, on simule : éligibilité (B2B, remote France, buyer, stack, absence de doublon), rendez-vous, proposition, contrat signé, puis premier encaissement conditionnel. Un même client à travers trois recruteurs ne constitue qu’un dossier, non trois chances.');
  md.push('- Monte Carlo **20 000 itérations seedées par portefeuille/régime**; chaque événement et délai est tiré selon les distributions assumées. Indépendance entre dossiers et absence de capacité de livraison simultanée sont des simplifications **favorables** ; corrélation et indisponibilités réelles réduiraient probablement les résultats.');
  md.push('- Le montant **signé** est une valeur faciale indicative de mission et peut ne jamais être complètement facturé. Le montant **encaissé avant J+90** est seulement une première facture ou un acompte hypothétique, après commission et délais simulés. Ni l’un ni l’autre ne sont du revenu net après cotisations, impôts et coûts personnels.');
  md.push('- Les commissions de 5–10% sur co-traitance/ESN sont des **proxies de friction économique** (pas des barèmes réglementaires, ni des commissions facturées au prestataire) ; le 10% plateforme reflète seulement un exemple d’entrée Malt. Le vrai pourcentage Upwork dépend du contrat, 0–15%.');
  md.push('- Une conversation avec un CTO sans budget ne vaut pas un contrat. Une inscription au vivier Altor ne vaut pas une mission. Aucun contact n’a été envoyé pour la simulation.','');
  md.push('## 1. Politiques comparées à budget d’heures identique','');
  md.push('| Portefeuille | Dossiers théoriques | Répartition / preuve | Heures |');
  md.push('|---|---:|---|---:|');
  for(const [id,p] of Object.entries(config.portfolios)){
    md.push('| '+p.label+' | '+Object.values(p.mix).reduce((a,b)=>a+b,0)+' | '+Object.entries(p.mix).map(([c,n])=>n+' '+c).join(', ')+' ; preuve '+p.proofHours+' h | '+p.totalHours+' |');
  }
  md.push('','**Attention :** « dossier » = capacité simulée à examiner une piste, pas un acheteur identifié. Le modèle n’a créé, réservé ni soumis aucun lead.','');
  md.push('## 2. Résultats du régime central (probabilités hypothétiques)','');
  md.push('| Portefeuille | Dossiers admissibles moyens | Entretiens moyens | Devis moyens | P(≥1 signature J+90) | P(1er encaissement J+90) | CA facial signé moyen | Cash J+90 moyen | Médiane signée |');
  md.push('|---|---:|---:|---:|---:|---:|---:|---:|---:|');
  for(const r of [...table.central].sort((a,b)=>b.pSignedWithin90-a.pSignedWithin90)){
    md.push('| '+config.portfolios[r.policy].label+' | '+r.expectedEligible+' | '+r.expectedMeetings+' | '+r.expectedProposals+' | '+fmtpct(r.pSignedWithin90)+' | '+fmtpct(r.pFirstCashWithin90)+' | '+euro(r.expectedSignedFaceEUR)+' | '+euro(r.expectedFirstCashEUR)+' | '+euro(r.medianSignedFaceEUR)+' |');
  }
  md.push('','**Lecture correcte :** si la médiane des montants signés est **0 €**, ce n’est pas un bug : dans plus de la moitié des simulations, aucun contrat n’est signé sous ces hypothèses. P(≥1 signature) ne vient pas d’une étude client, et n’est **pas** une probabilité réelle de signer.','');
  md.push('## 3. Résilience au marché : adverse / central / favorable','');
  md.push('| Portefeuille | Adverse P(≥1 signé) | Central | Favorable | Adverse P(cash J+90) | Central | Favorable |');
  md.push('|---|---:|---:|---:|---:|---:|---:|');
  for(const id of policies){
    const rows=Object.keys(config.regimes).map(k=>table[k].find(x=>x.policy===id));
    md.push('| '+config.portfolios[id].label+' | '+rows.map(r=>fmtpct(r.pSignedWithin90)).join(' | ')+' | '+rows.map(r=>fmtpct(r.pFirstCashWithin90)).join(' | ')+' |');
  }
  md.push('','**Les mondes adverse, central et favorable ne sont PAS des intervalles de confiance** : ils changent arbitrairement l’éligibilité, les rendez-vous, la conversion et les délais de paiement.','');
  md.push('## 4. Stress tests de dépendance critique');
  md.push('| Choc | Mix maximisant P(≥1 signature) | P(signature) synthétique | Mix maximisant P(cash J+90) | P(cash) synthétique |');
  md.push('|---|---|---:|---|---:|');
  for(const s of stress){
    const sign=[...s.results].sort((a,b)=>b.pSignedWithin90-a.pSignedWithin90)[0];
    const cash=[...s.results].sort((a,b)=>b.pFirstCashWithin90-a.pFirstCashWithin90)[0];
    md.push('| '+s.label+' | '+config.portfolios[sign.policy].label+' | '+fmtpct(sign.pSignedWithin90)+' | '+config.portfolios[cash.policy].label+' | '+fmtpct(cash.pFirstCashWithin90)+' |');
  }
  md.push('','**Interprétation clé :** l’optimisation du montant facial signé favorise les missions longues, alors que le premier encaissement peut favoriser un petit lot signé rapidement et facturé avec acompte. Un faible cash J+90 ne prouve pas l’absence de contrats, mais oblige à vérifier la trésorerie.','');
  md.push('## 5. Données empiriques ET limites, indépendantes des probabilités choisies','');
  md.push('- [Freelancermap 2025, page 14](https://www.freelancermap.com/files/survey/freelancer-study-2025.pdf) : canaux cités comme les plus efficaces par les répondants : plateformes 33 %, réseau personnel 23 %, recrutement 16 %, recommandations 14 %. Ce n’est pas un taux de signature.');
  md.push('- [FreelanceMention octobre 2026](https://app.freelancemention.fr/blog/freelance-informatique/) : environ 13 % full remote parmi 9 319 annonces LinkedIn IT/Data détectées sur sa période ; [FreelanceScope, septembre 2026](https://www.freelancescope.fr/blog/missions-freelance-full-remote-septembre-2026) : seulement 2 % sur 4 788 missions de son catalogue. Les échantillons et définitions ne sont pas interchangeables.');
  md.push('- [Sales.co, octobre 2026](https://sales.co/research/cold-email-conversion-rate-benchmarks) : 0,84 % réponses humaines par contact et 0,29 % réponses positives parmi 336 257 contacts de 20 campagnes. Cette donnée sur du cold email massif **n’étalonne pas** la probabilité de rendez-vous d’une approche ultra-personnalisée.');
  md.push('- [Malt, commissions](https://help.malt.com/kb/guide/fr/la-commission-malt-h2dK0HxuKA/Steps/2510922) : 10 % initial puis 5 % après six mois, 2 % si client apporté ; [Upwork](https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee) : 0–15 % suivant contrat. Les montants exacts doivent être demandés.');
  md.push('- [Service Public (août 2026)](https://entreprendre.service-public.gouv.fr/vosdroits/F23211) : 30 jours par défaut pour paiements entre professionnels, sous conditions 60 jours ou 45 jours fin de mois. Un contrat signé ne vaut pas un paiement instantané.');
  md.push('- [Malt Tech Trends 2026](https://www.malt.fr/resources/trends/malt-tech-trends) : n8n et agents IA progressent sur la plateforme, mais cela ne prouve ni budget du prospect ni mission viable pour Memo Labs.');
  md.push('','## 6. Arbitrage avant passage au concret','');
  md.push('**La recherche ne permet PAS de sélectionner un unique vainqueur statistique.** Choix *minimax/pragmatique* recommandé : **équilibre mandats directs + recruteurs mandatés + co-traitants réels**, et seulement une preuve courte existante, pas une nouvelle démo à construire durant deux semaines.');
  md.push('','**Falsification dès le premier cycle, avant envoi :**');
  md.push('- Si aucun mandat actif B2B remote France à prix défendable n’est repérable après 6–8 dossiers correctement vérifiés, le sous-canal est en HOLD et on mesure ce manque au lieu d’inventer des leads.');
  md.push('- Si aucun freelance complémentaire n’a de client en cours ni besoin de renfort, stop « co-traitance » pour ce cycle : un partenaire potentiel sans mandat = 0 acheteur.');
  md.push('- Si la preuve de fiabilisation ne peut pas être exécutée de bout en bout devant un tiers, ne pas vendre « E2E validé » ou « production ready ». Des projets personnels peuvent démontrer l’architecture mais pas l’adoption client.');
  md.push('- Si un intermédiaire refuse le 100 % remote depuis France, stop ; Thaïlande future exige contrat écrit distinct. Si plusieurs annonces désignent le même client Station F, compter 1 buyer, pas plusieurs opportunités.');
  md.push('','**Pilotage d’expérimentation limité :** 40 heures / 4 semaines est un scénario, pas un engagement. Avant toute candidature demander validation du destinataire et texte final. Mesurer dès lors le funnel réel par canal : dossiers examinés, réellement éligibles, approbations, candidatures effectivement envoyées, réponses, entretiens, offres, contrats, factures, encaissements et heures consommées.');
  return {table,stress,markdown:md.join('\n')+'\n'};
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const result=buildReport();
  if(process.argv.includes('--write'))writeFileSync(resolve(here,'docs/M3-STRESS-TESTS-ACQUISITION-2026-10-23.md'),result.markdown,'utf8');
  console.log(JSON.stringify({
   iterations:config.meta.iterations,regimes:Object.keys(config.regimes),portfolios:Object.keys(config.portfolios).length,
   central:result.table.central.map(x=>({policy:x.policy,pSign:x.pSignedWithin90,pCash:x.pFirstCashWithin90,expectedFace:x.expectedSignedFaceEUR,expectedCash:x.expectedFirstCashEUR})),
   fileWritten:process.argv.includes('--write')
  },null,2));
}
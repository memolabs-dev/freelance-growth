#!/usr/bin/env node
// Benchmark documentaire, pas une estimation de probabilite de signature.
// Usage: node scripts/benchmark-strategies.mjs [--write]
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = f => readFileSync(resolve(project, f),'utf8');
function parseCsv(source) {
  const lines=[];let row=[],field='',quoted=false;
  for(let i=0;i<source.length;i++){
    const c=source[i];
    if(c==='"'){if(quoted&&source[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}
    else if(c===','&&!quoted){row.push(field);field='';}
    else if(c==='\n'&&!quoted){row.push(field);lines.push(row);row=[];field='';}
    else if(c!=='\r'||quoted)field+=c;
  }
  if(quoted)throw Error('CSV unterminated quoted field');
  if(field||row.length){row.push(field);lines.push(row);}
  const header=lines.shift();
  return lines.filter(r=>r.length).map((cells,i)=>{if(cells.length!==header.length)throw Error('CSV invalid row '+i);return Object.fromEntries(header.map((h,j)=>[h,cells[j]]));});
}
export const strategies=parseCsv(read('data/strategies_216_2026-10-23.csv'));
const sourceRecords=read('data/strategies_sources_2026-10-23.tsv').trimEnd().split('\n').slice(1).map(s=>{const [id,title,date,population,result,grade,limitation,url]=s.split('\t');return {id,title,date,population,result,grade,limitation,url};});
const sources=sourceRecords.map(s=>s.id);
if(strategies.length!==216)throw Error('Catalog count is not 216');
if(new Set(strategies.map(s=>s.id)).size!==216)throw Error('Duplicate strategy ID');
if(new Set(strategies.map(s=>s.famille)).size!==18)throw Error('Family count mismatch');
if(sources.length<25)throw Error('Insufficient source registry');
for(const s of strategies){
  for(const ref of s.sources_famille.split(';')) if(!sources.includes(ref))throw Error('Missing source '+ref);
  if(/Medsharing|Symbyoz|Adriver/.test(s.tactique)&&s.statut!=='NO_GO')throw Error('Owner exclusion not enforced '+s.id);
}
const dims=['achat_intention','compatibilite_profil','delai_valeur','remote_france','cout_avantage','differentation'];
const weights={
  principal:[25,20,20,15,10,10],
  revenu_rapide:[30,20,25,10,10,5],
  premium_long_terme:[20,15,5,15,10,35],
  zero_depense:[20,20,15,15,25,5]
};
for(const [name,w] of Object.entries(weights))if(w.reduce((a,b)=>a+b,0)!==100)throw Error('weight error '+name);
const round=n=>Math.round(n*10)/10;
export const score=(s,k='principal')=>round(dims.reduce((sum,dim,i)=>sum+Number(s[dim])*weights[k][i],0)/5);
const eligible=s=>!['NO_GO','APRES_PREMIER_CLIENT'].includes(s.statut)&&s.phase==='DISCOVERY';
const active=strategies.filter(eligible);
const fams=[...new Set(strategies.map(s=>s.famille))];
const byGroup=fams.map(f=>{
  const rows=active.filter(s=>s.famille===f);
  const mean=k=>rows.length?round(rows.reduce((tot,s)=>tot+score(s,k),0)/rows.length):null;
  return {name:f,n:rows.length,scores:Object.fromEntries(Object.keys(weights).map(k=>[k,mean(k)])),top:rows.slice().sort((a,b)=>score(b)-score(a))[0]};
});
const ranks=key=>byGroup.filter(g=>g.n).sort((a,b)=>b.scores[key]-a.scores[key]||a.name.localeCompare(b.name));
const winnerCount=new Map();
for(const key of Object.keys(weights))for(const f of ranks(key).slice(0,5))winnerCount.set(f.name,(winnerCount.get(f.name)||0)+1);
const header=(arr)=>'| '+arr.join(' | ')+' |\n| '+arr.map(()=>'---').join(' | ')+' |';
const lines=[];
lines.push('# Benchmark reproductible de 216 stratégies — 23 octobre 2026','');
lines.push('**Analyse hypothétique, pas essai randomisé ni observation de 216 contrats.** 18 familles × 12 tactiques distinctes. La littérature est reliée aux **familles**, jamais présentée comme preuve que chaque tactique marche chez ce freelance. Les notes (1–5 par critère) sont des jugements exploratoires qui servent à ordonner les validations, **pas des probabilités de signer**. Les contraintes B2B, France 100 % remote, historique de contact, statut et véracité prévalent sur toutes les notes. Aucun contact envoyé.','');
lines.push('## Méthode et garde-fous','');
lines.push('- Source : `data/strategies_216_2026-10-23.csv` + `data/strategies_sources_2026-10-23.tsv` ; résultat calculé par `node scripts/benchmark-strategies.mjs --write`.','- 216 tactiques **conçues et examinées**, aucune n’a fait l’objet de 216 essais A/B observés.','- 18 familles dont recherche, conversion, preuve et rétention : **seules les tactiques DISCOVERY admissibles participent au classement de découverte**. Les autres familles sont des compléments nécessaires, pas des concurrents de Free-Work pour « trouver un lead ».','- Les critères : intention d’achat, adéquation technique, délai probable vers une opportunité, compatibilité remote France, avantage de coût, différenciation. Chaque score 1–5 est **subjectif** et peut être contredit par le terrain.','- Les exclusions de l’utilisateur, refus et doublons priment même sur un score élevé : Medsharing déjà traité, Symbyoz et Adriver exclus ; ne pas recontacter Nextcloud, KatchMe/Techunt/Beyond Skills/Station F en doublon, Oudini/symbolist., Askable screened_out.','- `NO_GO` exclu et `APRES_PREMIER_CLIENT` hors classement initial. Une stratégie `HOLD_CONDITIONS` n’est pas prête à déclencher une démarche, même si son score est haut.','');
lines.push('## Pondérations et analyse de sensibilité','');
lines.push(header(['Scénario','Intention','Profil','Délai','Remote','Coût','Différenciation']));
for(const [name,w] of Object.entries(weights))lines.push('| '+[name,...w.map(x=>x+' %')].join(' | ')+' |');
lines.push('','Les scénarios représentent **des préférences arbitraires explicites**, pas des statistiques de ventes. Scores agrégés = moyenne des tactiques non NO_GO de chaque famille en phase DISCOVERY. Familles de preuve/closing/retenue absentes du tableau d’acquisition volontairement.','');
lines.push('## Classement des familles de découverte admissibles','');
lines.push(header(['Famille','Tactiques étudiées','Admissibles','Score principal /100','Revenu rapide','Premium long terme','Zéro dépense','Dans Top 5 / 4 scénarios']));
for(const f of ranks('principal')){
  const total=strategies.filter(s=>s.famille===f.name).length;
  lines.push('| '+[f.name,total,f.n,...Object.keys(weights).map(k=>f.scores[k]),winnerCount.get(f.name)||0].join(' | ')+' |');
}
lines.push('','**Interprétation** : un résultat élevé signale une *hypothèse à vérifier d’abord*, pas « cette tactique convertit à X % ». Les rangs proches sont indiscernables compte tenu de l’incertitude et de la subjectivité des critères.','');
lines.push('## Top familles par scénario (robustesse)','');
for(const k of Object.keys(weights))lines.push('**'+k+'** : '+ranks(k).slice(0,5).map((r,i)=>(i+1)+'. '+r.name+' ('+r.scores[k]+'/100)').join(' ; ')+'.  ');
lines.push('','## Échantillon des actions représentatives par famille','');
lines.push(header(['Famille','Exemple de tactique','Statut','Score principal (heuristique)']));
for(const f of ranks('principal'))lines.push('| '+[f.name,f.top.tactique,f.top.statut,score(f.top)].join(' | ')+' |');
lines.push('','## Pourquoi ces données ne fournissent pas un taux de signature','');
lines.push('- Freelancermap 2025, page 14 : **33 % plateformes de projets, 23 % réseaux personnels, 16 % recrutement, 14 % recommandations** parmi les canaux déclarés les plus efficaces ; **pas de taux de signature**, enquête multi pays et effectifs divergents 3 571/3 751. S01.','- FreelanceMention 2026 : **13 %** de missions IT/data classées full remote dans un échantillon LinkedIn de 9 319 missions. Ni répartition par stack ni droit contractuel à travailler depuis la France/Thaïlande. S02.','- LinkedIn/Ipsos 2026 : **41 % des petites entreprises interrogées** jugent les recommandations première source de leads, sur **300 PME US**. Différent des freelances interrogés, pas contradiction statistique directe. S09.','- Hinge 2026 : répartition des leads chez des **sociétés de services** (outreach 27,2 %, referrals 23,8 %, événements 12,4 %), pas performances freelance solo. S10.','- Sales.co 2026 : **0,84 %** réponses **humaines par contact** ; **0,29 %** réponses positives sur 336 257 contacts. RevenueFlow : **0,48 %** réponses humaines **par email** sur 1 413 405 envois. **Dénominateurs et portefeuilles différents : ne pas moyenner ni transférer à 3 emails personnalisés.** S11/S23.','- 6sense 2025 : échantillon d’achats B2B de **200 000 à 300 000 USD annuels médians**, n’est pas un benchmark des missions de freelance 3–6 mois. S22.','- Upwork 2026 : **AI Integration +178 %** selon revenus 2025 aux USA (S04) ; nettoyage de travail IA **+70 %** des annonces dans un panel propriétaire (S17) ; croissance ≠ budget du client ni salaire premium.','- DORA/Gartner/Gong : sources sur la qualité, la confiance et la découverte commerciale ; aucune ne mesure directement l’efficacité de 216 tactiques chez Memo Labs. S18/S19/S20.','');
lines.push('## Décision à ce stade','');
lines.push('**GO recherche** pour mandats réels B2B remote France, intermédiaires mandatés, partenaires avec client signé. **HOLD prospection** tant que buyer/budget/contrat et message précis non approuvés. **NO-GO** mass outreach, bots/scraping LinkedIn, fausses références, anciennes cibles exclues, formation ou offre AI App Rescue générique sans client solvable.','');
lines.push('Le benchmark est un outil de **priorisation d’expériences réelles**. Il ne peut pas garantir une signature ; pour départager deux familles proches il faudra des événements observés : sources qualifiées, vrais appels, propositions, contrat, facture et encaissement. Toute dépense, candidature et sollicitation réclame validation distincte.','');
lines.push('## Bibliographie contrôlable (26 références)','');
lines.push(header(['ID','Source et date','Périmètre et limite']));
for(const s of sourceRecords)lines.push('| '+[s.id,'['+s.title+']('+s.url+') ('+s.date+')',s.population+' ; '+s.limitation].join(' | ')+' |');
lines.push('','**Important** : ce sont 26 références source/famille, **pas 26 essais de la stratégie**, et certaines sont des règles officielles ou des annuaires, non des mesures de conversion.');
const markdown=lines.join('\n')+'\n';
if(process.argv.includes('--write'))writeFileSync(resolve(project,'docs/M2-216-STRATEGIES-BENCHMARK-2026-10-23.md'),markdown,'utf8');
console.log(JSON.stringify({count:strategies.length,families:fams.length,ranked:active.length,sourceCount:sources.length,top:ranks('principal').slice(0,8).map(x=>({name:x.name,score:x.scores.principal})),winnerCounts:[...winnerCount.entries()],wrote:process.argv.includes('--write')},null,2));

#!/usr/bin/env node
// Real local HTTP request-response simulation. NO client data, NO external network.
// Deliberate false-success bug shown for education; not a browser/product E2E.
import http from 'node:http';
import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const caseId='SIM-1024';
function send(res,status,obj){res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(obj));}
export async function startMockApi(){
 const state={status:'pending'},events=[];
 const server=http.createServer(async(req,res)=>{
   const traceId='synthetic-'+String(events.length+1).padStart(3,'0');
   if(req.url!=='/cases/'+caseId+'/status')return send(res,404,{error:'not_found'});
   if(req.method==='GET'){events.push({traceId,method:'GET',http:200});return send(res,200,{status:state.status});}
   if(req.method!=='PATCH')return send(res,405,{error:'method_not_allowed'});
   const chunks=[];for await(const c of req)chunks.push(c);
   let body;try{body=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{return send(res,400,{error:'invalid_json'});}
   if(req.headers.authorization!=='Bearer editor'){events.push({traceId,method:'PATCH',http:403});return send(res,403,{error:'forbidden',traceId});}
   if(req.headers['x-mock-outage']==='yes'){events.push({traceId,method:'PATCH',http:503});return send(res,503,{error:'dependency_unavailable',traceId});}
   if(body.status!=='approved'){events.push({traceId,method:'PATCH',http:422});return send(res,422,{error:'bad_state',traceId});}
   state.status='approved';events.push({traceId,method:'PATCH',http:200});return send(res,200,{status:state.status,traceId});
 });
 await new Promise((ok,no)=>{server.once('error',no);server.listen(0,'127.0.0.1',ok);});
 return {url:'http://127.0.0.1:'+server.address().port,state,events,close:()=>new Promise(ok=>server.close(ok))};
}
export async function getState(url){const r=await fetch(url+'/cases/'+caseId+'/status');assert.equal(r.status,200);return (await r.json()).status;}
// Intentionally buggy pattern: treats completion of an HTTP request as successful business execution.
export async function naiveAgent(url){
 const r=await fetch(url+'/cases/'+caseId+'/status',{method:'PATCH',headers:{Authorization:'Bearer viewer','Content-Type':'application/json'},body:JSON.stringify({status:'approved'})});
 await r.json();return {claimedSuccess:true,message:'Opération réussie'};
}
export async function verifiedAgent(url,{role='viewer',outage=false}={}){
 const r=await fetch(url+'/cases/'+caseId+'/status',{
   method:'PATCH',
   headers:{Authorization:'Bearer '+role,'Content-Type':'application/json',...(outage?{'X-Mock-Outage':'yes'}:{})},
   body:JSON.stringify({status:'approved'})
 });
 const body=await r.json();
 if(!r.ok)return {claimedSuccess:false,http:r.status,error:body.error,traceId:body.traceId};
 if((await getState(url))!=='approved')return {claimedSuccess:false,http:409,error:'unconfirmed_state'};
 return {claimedSuccess:true,http:200,traceId:body.traceId};
}
export async function runDemo(){
 const api=await startMockApi();
 try{
  const initial=await getState(api.url);
  const naive=await naiveAgent(api.url);
  const afterNaive=await getState(api.url);
  const forbidden=await verifiedAgent(api.url);
  const outage=await verifiedAgent(api.url,{role:'editor',outage:true});
  const afterOutage=await getState(api.url);
  const authorized=await verifiedAgent(api.url,{role:'editor'});
  const final=await getState(api.url);
  const cases=[
   {name:'False success of naive agent reproduced',pass:initial==='pending'&&naive.claimedSuccess&&afterNaive==='pending'},
   {name:'403 authorization refused without false confirmation',pass:!forbidden.claimedSuccess&&forbidden.http===403},
   {name:'503 dependency outage refused without mutation',pass:!outage.claimedSuccess&&outage.http===503&&afterOutage==='pending'},
   {name:'200 authorized operation confirmed by state readback',pass:authorized.claimedSuccess&&authorized.http===200&&final==='approved'}
  ];
  return {kind:'synthetic localhost API only',result:cases.every(x=>x.pass)?'PASS':'FAIL',cases,events:api.events,limitations:['no customer product','no browser or React E2E','no real health data or client PII','no deployment and no certification','no proof of production-grade reliability']};
 }finally{await api.close();}
}
export function render(r){
 const lines=['# Proof-to-Production — démonstration API synthétique','','**'+r.result+' sur une API HTTP locale fictive. Aucun client, aucune application React, aucune certification ou production validée.**','','Commande : node scripts/demo-proof-to-production.mjs --write. Réseau local 127.0.0.1 seulement, cas fictif SIM-1024.','','## Résultats observés','','| Scénario | Résultat |','|---|---|'];
 for(const c of r.cases)lines.push('| '+c.name+' | '+(c.pass?'PASS':'FAIL')+' |');
 lines.push('','## Traces de la simulation','','| ID synthétique | Méthode | HTTP |','|---|---|---|');
 for(const x of r.events)lines.push('| '+x.traceId+' | '+x.method+' | '+x.http+' |');
 lines.push('','**Sens pédagogique :** la version volontairement naïve annonce succès malgré HTTP 403 et statut pending. La version vérifiée n’annonce succès qu’après statut 200 et lecture de approved. Le 503 reste un échec explicite.','','## Limites');
 for(const x of r.limitations)lines.push('- '+x);
 lines.push('','La preuve exigible avant une mission client comporte séparément des tests sur le parcours React, la préproduction, les permissions, la recette utilisateur et l’autorisation d’accès. Les scénarios ci-dessus sont de la mécanique de démonstration, pas des tests du produit du prospect.','');
 return lines.join('\n');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const r=await runDemo();
 if(process.argv.includes('--write'))writeFileSync(resolve(root,'docs/launch/2026-10-26-SYNTHETIC-DEMO-RESULTS.md'),render(r),'utf8');
 console.log(JSON.stringify(r,null,2));
 if(r.result!=='PASS')process.exitCode=1;
}
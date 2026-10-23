import test from 'node:test';
import assert from 'node:assert/strict';
import {initialize,advance,fingerprint} from '../scripts/pilot-state.mjs';

const msg={recipient:'role@example.org',subject:'TypeScript API integration request',body:'I could help deliver a scoped API integration with tests. Is a B2B contractor needed?'};
const qualify={type:'qualify',source_url:'https://example.org/role',source_date:'2026-10-23',source_checked:true,prior_history_checked:true,buyer_role:'Technical buyer',geo:'FRANCE_CONFIRMED',contract:'B2B_CONFIRMED'};
const reviewed={status:'READY_FOR_HUMAN_REVIEW',errors:[]};
test('missing explicit suppression check cannot pass review',()=>{
 let s=advance(initialize({company:'Example SaaS',kind:'agency_intro'}),qualify);
 s=advance(s,{type:'draft',message:msg});
 assert.throws(()=>advance(s,{type:'review',review_result:reviewed,live_duplicate_checked:true}),/live_duplicate_check_required/);
});
function draft() {
 const a=advance(initialize({company:'Example SaaS',kind:'agency_intro'}),qualify);
 const b=advance(a,{type:'draft',message:msg});
 return advance(b,{type:'review',review_result:reviewed,live_duplicate_checked:true,no_opt_out:true});
}

test('hard owner exclusions and previous introductions prevent new prospecting',()=>{
 for(const company of ['Medsharing','Symbyoz','Adriver Group','Nextcloud']) assert.throws(()=>initialize({company,kind:'agency_intro'}),/owner_excluded_company/);
 for(const company of ['Oudini','symbolist.','KatchMe Consulting','Altor']) assert.throws(()=>initialize({company,kind:'agency_intro'}),/prior_contact_no_new_intro/);
});
test('qualification blocks unverified source, geography and B2B',()=>{
 let s=initialize({company:'Example SaaS',kind:'job_application'});
 assert.throws(()=>advance(s,{type:'qualify',source_url:'https://example.org'}),/qualification_evidence_missing/);
 s=advance(s,{...qualify,geo:'FRANCE_TO_VERIFY'});
 assert.throws(()=>advance(s,{type:'draft',message:msg}),/application_requires_confirmed_geo_and_b2b/);
});
test('human review is not approval; message fingerprint protects exact text and recipient',()=>{
 let s=draft();
 assert.equal(s.state,'READY_FOR_HUMAN_REVIEW');
 assert.throws(()=>advance(s,{type:'observed_delivery',provider_message_ref:'id'}),/invalid_transition/);
 assert.throws(()=>advance(s,{type:'owner_approval',owner_approved:true,approved_hash:fingerprint({...msg,body:'changed'}),approval_reference:'owner-review'}),/explicit_exact_message_approval_required/);
 s=advance(s,{type:'owner_approval',owner_approved:true,approved_hash:fingerprint(msg),approval_reference:'human-review-ref'});
 assert.equal(s.state,'APPROVED_FOR_SPECIFIC_MESSAGE');
 assert.throws(()=>advance(s,{type:'observed_delivery',delivered_hash:fingerprint(msg),observed_at:'2026-10-23T18:00',provider_message_ref:'external-id'}),/external_delivery_evidence_required/);
 assert.throws(()=>advance(s,{type:'observed_delivery',delivered_hash:fingerprint({...msg,recipient:'other@example.org'}),observed_at:'2026-10-23T18:00',provider_message_ref:'external-id',external_delivery_verified:true}),/external_delivery_evidence_required/);
 s=advance(s,{type:'observed_delivery',delivered_hash:fingerprint(msg),observed_at:'2026-10-23T18:00',provider_message_ref:'external-id',external_delivery_verified:true});
 assert.equal(s.state,'SENT_CONFIRMED');
 assert.throws(()=>advance(s,{type:'observed_reply'}),/external_reply_evidence_required/);
 s=advance(s,{type:'observed_reply',provider_reply_ref:'reply-id',external_reply_verified:true});
 assert.equal(s.state,'REPLIED');
});
test('application and profile are not outreach emails; confirmation needs external evidence',()=>{
 let s=advance(initialize({company:'Example Employer',kind:'job_application'}),qualify);
 s=advance(s,{type:'draft',message:msg});
 s=advance(s,{type:'review',review_result:reviewed,live_duplicate_checked:true,no_opt_out:true});
 s=advance(s,{type:'owner_approval',owner_approved:true,approved_hash:fingerprint(msg),approval_reference:'human-confirmation'});
 s=advance(s,{type:'observed_delivery',delivered_hash:fingerprint(msg),external_delivery_verified:true,provider_message_ref:'ats-confirmation',observed_at:'2026-10-23T18:00'});
 assert.equal(s.state,'APPLIED_CONFIRMED');
});
test('opt-out is terminal and cleared of message/approval data',()=>{
 const s=advance(draft(),{type:'opt_out'});
 assert.equal(s.state,'DO_NOT_CONTACT');
 assert.equal(s.message,null);
 assert.throws(()=>advance(s,{type:'qualify'}),/terminal_state/);
});

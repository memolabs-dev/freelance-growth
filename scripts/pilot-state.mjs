// Read-only commercial workflow guard. This file NEVER sends emails or submits forms.
// Personal recipients, message bodies and provider IDs belong outside public Git.
import {createHash} from 'node:crypto';

const DENY_COMPANIES = new Set(['medsharing','symbyoz','adriver group','nextcloud']);
const KNOWN_PRIOR_CONTACTS = new Set(['oudini','symbolist.','katchme consulting','katchme','altor','ai scaling']);
const states = new Set(['DISCOVERED','QUALIFIED','DRAFT','READY_FOR_HUMAN_REVIEW','APPROVED_FOR_SPECIFIC_MESSAGE','SENT_CONFIRMED','APPLIED_CONFIRMED','REPLIED','CLOSED','DO_NOT_CONTACT']);
const allowedKinds = new Set(['agency_intro','warm_reconnect','job_application','platform_profile']);
const normalized = name => String(name || '').trim().toLocaleLowerCase();
const present = value => typeof value === 'string' && value.trim().length > 0;
const fail = reason => {throw new Error(reason);};
export function fingerprint(message) {
  if (!message || !present(message.recipient) || !present(message.subject) || !present(message.body)) fail('incomplete_message');
  return createHash('sha256').update(JSON.stringify([message.recipient.trim().toLowerCase(),message.subject, message.body])).digest('hex');
}
export function initialize({company,kind,already_contacted=false}) {
  if (!present(company) || !allowedKinds.has(kind)) fail('invalid_lead');
  if (DENY_COMPANIES.has(normalized(company))) fail('owner_excluded_company');
  if (kind==='agency_intro' && (already_contacted || KNOWN_PRIOR_CONTACTS.has(normalized(company)))) fail('prior_contact_no_new_intro');
  return {company,kind,already_contacted,state:'DISCOVERED',source:null,message:null,hash:null,approval:null,evidence:null};
}
export function advance(record,event) {
  if (!record || !states.has(record.state) || !event?.type) fail('invalid_transition_request');
  const c=normalized(record.company);
  if (DENY_COMPANIES.has(c)) fail('owner_excluded_company');
  if (record.state==='CLOSED' || record.state==='DO_NOT_CONTACT') fail('terminal_state');
  if (event.type==='opt_out') return {...record,state:'DO_NOT_CONTACT',message:null,hash:null,approval:null,evidence:null};
  if (event.type==='close') {
    if (!present(event.reason)) fail('close_reason_required');
    return {...record,state:'CLOSED',message:null,hash:null,approval:null,close_reason:event.reason};
  }
  if (record.state==='DISCOVERED' && event.type==='qualify') {
    if (!/^https:\/\//.test(event.source_url||'') || !/^\d{4}-\d{2}-\d{2}$/.test(event.source_date||'') || event.source_checked!==true || event.prior_history_checked!==true || !present(event.buyer_role)) fail('qualification_evidence_missing');
    if (!['FRANCE_CONFIRMED','FRANCE_TO_VERIFY'].includes(event.geo)) fail('geography_unassessed');
    if (!['B2B_CONFIRMED','B2B_TO_VERIFY'].includes(event.contract)) fail('contract_unassessed');
    return {...record,state:'QUALIFIED',source:{source_url:event.source_url,source_date:event.source_date,geo:event.geo,contract:event.contract,buyer_role:event.buyer_role}};
  }
  if (record.state==='QUALIFIED' && event.type==='draft') {
    if (!event.message) fail('draft_missing');
    const hash=fingerprint(event.message);
    if (record.kind==='job_application' && (record.source.geo!=='FRANCE_CONFIRMED' || record.source.contract!=='B2B_CONFIRMED')) fail('application_requires_confirmed_geo_and_b2b');
    return {...record,state:'DRAFT',message:event.message,hash,approval:null,evidence:null};
  }
  if (record.state==='DRAFT' && event.type==='review') {
    if (event.review_result?.status!=='READY_FOR_HUMAN_REVIEW' || (event.review_result.errors||[]).length) fail('quality_gate_not_passed');
    if (event.live_duplicate_checked!==true || event.no_opt_out!==true) fail('live_duplicate_check_required');
    return {...record,state:'READY_FOR_HUMAN_REVIEW'};
  }
  if (record.state==='READY_FOR_HUMAN_REVIEW' && event.type==='owner_approval') {
    if (event.owner_approved!==true || event.approved_hash!==record.hash || !present(event.approval_reference)) fail('explicit_exact_message_approval_required');
    // A local event is NOT proof of consent: operator must independently establish that the
    // reference is a real owner approval in a trusted UI/chat, not agent-authored text.
    return {...record,state:'APPROVED_FOR_SPECIFIC_MESSAGE',approval:{hash:record.hash,reference:event.approval_reference}};
  }
  if (record.state==='APPROVED_FOR_SPECIFIC_MESSAGE' && event.type==='observed_delivery') {
    if (event.delivered_hash!==record.approval?.hash || !present(event.provider_message_ref) || event.external_delivery_verified!==true || !present(event.observed_at)) fail('external_delivery_evidence_required');
    return {...record,state:record.kind==='job_application'||record.kind==='platform_profile'?'APPLIED_CONFIRMED':'SENT_CONFIRMED',evidence:{kind:'provider_delivery',reference:event.provider_message_ref,observed_at:event.observed_at}};
  }
  if (['SENT_CONFIRMED','APPLIED_CONFIRMED'].includes(record.state) && event.type==='observed_reply') {
    if (!present(event.provider_reply_ref) || event.external_reply_verified!==true) fail('external_reply_evidence_required');
    return {...record,state:'REPLIED',reply_reference:event.provider_reply_ref};
  }
  fail('invalid_transition');
}

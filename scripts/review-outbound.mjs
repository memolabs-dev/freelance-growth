#!/usr/bin/env node
// Read-only quality review of an outbound email or job application.
// It NEVER sends an email or submits an application.
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const URL_RE = /^https:\/\/[a-z0-9.-]+(?:\/\S*)?$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KINDS = ['agency_intro', 'warm_reconnect', 'job_application'];
const GEO = ['CONFIRMED', 'VERIFY', 'INCOMPATIBLE'];

export function reviewOutbound(draft) {
  const errors = [];
  const warnings = [];
  const missing = (cond, key) => { if (!cond) errors.push(key); };
  const value = v => typeof v === 'string' ? v.trim() : '';
  const text = value(draft?.body);
  const subject = value(draft?.subject);
  const kind = draft?.kind;
  const identity = draft?.identity ?? {};
  const buyer = draft?.buyer ?? {};
  const proof = draft?.proof ?? {};
  const checks = draft?.checks ?? {};
  const includes = phrase => !!value(phrase) && text.toLocaleLowerCase().includes(value(phrase).toLocaleLowerCase());
  const url = v => URL_RE.test(value(v));
  const stamp = v => /^\d{4}-\d{2}-\d{2}$/.test(value(v)) && !Number.isNaN(Date.parse(v + 'T00:00:00Z'));
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  missing(KINDS.includes(kind), 'unsupported_kind');
  missing(subject.length >= 8 && subject.length <= 100, 'subject_not_specific');
  missing(EMAIL_RE.test(value(buyer.recipient)), 'recipient_missing');
  missing(value(buyer.company).length >= 3, 'company_missing');
  missing(value(buyer.role).length >= 3, 'buyer_role_missing');
  missing(url(buyer.public_source_url) && stamp(buyer.public_source_date), 'source_unverified');
  missing(value(buyer.observed_fact).length >= 12 && includes(buyer.observed_fact), 'specific_observation_missing');
  missing(value(draft.value_statement).length >= 20 && includes(draft.value_statement), 'buyer_value_missing');
  missing(value(draft.cta).length >= 12 && includes(draft.cta), 'clear_cta_missing');
  missing(value(identity.name).length >= 5 && includes(identity.name), 'identity_name_missing');
  missing(value(identity.positioning).length >= 10 && includes(identity.positioning), 'identity_role_missing');
  missing(/^https:\/\/www\.linkedin\.com\/in\/[\w-]+\/?$/i.test(value(identity.linkedin))
    && includes(identity.linkedin), 'linkedin_missing_in_body');
  missing(/^https:\/\/github\.com\/[\w-]+\/?$/i.test(value(identity.github))
    && includes(identity.github), 'github_missing_in_body');
  missing(url(proof.public_url) && includes(proof.public_url), 'public_proof_missing_in_body');
  missing(value(proof.why_relevant).length >= 25 && includes(proof.why_relevant), 'buyer_specific_proof_missing');
  missing(checks.recipient_verified === true, 'recipient_not_verified');
  missing(checks.fact_checked === true, 'source_not_checked');
  missing(stamp(checks.gmail_duplicate_checked_on), 'duplicate_check_missing');
  missing(checks.no_outreach_opt_out === true, 'suppression_check_missing');

  if (kind === 'agency_intro') {
    missing(value(buyer.role).length >= 3, 'role_not_verified');
    missing(/(?:si vous préférez|si vous ne souhaitez|n'hésitez pas à me dire|let me know if you'd prefer)/i.test(text),
      'simple_opposition_missing');
    if (/tha[iï]lande|thailand/i.test(text)) warnings.push('Discuss residence after interest; do not use it as the cold pitch.');
  }
  if (kind === 'job_application') {
    missing(value(draft.cv_file).toLowerCase().endsWith('.pdf') && /Guillaume-Flambard-CV/i.test(value(draft.cv_file)),
      'tailored_cv_missing');
    missing(checks.cv_read_for_role === true, 'cv_not_reviewed_for_role');
    missing(url(buyer.job_post_url), 'official_job_link_missing');
    missing(value(draft.experience_assertion_source).length >= 12, 'experience_not_grounded');
    missing(GEO.includes(draft.geography), 'geography_unassessed');
    if (draft.geography !== 'CONFIRMED') errors.push('geography_not_contractually_confirmed');
  }
  if (kind === 'warm_reconnect') {
    missing(value(buyer.prior_exchange).length >= 12, 'prior_relationship_unverified');
  }
  if (words < 70) warnings.push('Potentially too little context to establish credibility; expand only if it adds value.');
  if (words > 200) warnings.push('Consider reducing text, but do not remove crucial evidence.');
  if (/[\u2014\u2013]|&mdash;|&ndash;/i.test(text)) errors.push('forbidden_long_dash_style');
  if (/(?:99[.,]9+%|100% (?:secure|fiable|reliable)|guaranteed roi|garanti.*(?:roi|gain))/i.test(text)) errors.push('unsupported_guarantee');
  if (checks.no_video_required !== true && kind === 'job_application') errors.push('video_policy_not_verified');

  return {
    status: errors.length ? 'BLOCKED' : 'READY_FOR_HUMAN_REVIEW',
    errors, warnings, word_count: words,
    note: 'Not an authorization to send. Human review, live inbox duplicate check, data-protection compliance and actual attachments are required. The checker has no sending capability.'
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: node scripts/review-outbound.mjs <local-campaign-record.json>');
    process.exitCode = 2;
  } else {
    try {
      const result = reviewOutbound(JSON.parse(readFileSync(file, 'utf8')));
      console.log(JSON.stringify(result, null, 2));
      if (result.errors.length) process.exitCode = 1;
    } catch (e) {
      console.error('Invalid campaign record: ' + e.message);
      process.exitCode = 2;
    }
  }
}

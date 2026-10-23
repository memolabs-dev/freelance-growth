import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { reviewOutbound } from '../scripts/review-outbound.mjs';

const sample = () => ({
  kind: 'agency_intro',
  subject: 'Renfort pour vos intégrations API',
  buyer: {
    company: 'Studio Exemple', role: 'Delivery Manager',
    recipient: 'delivery@example.org',
    public_source_url: 'https://example.org/integrations',
    public_source_date: '2026-10-19',
    observed_fact: 'vos intégrations API métier'
  },
  identity: {
    name: 'Test Developer', positioning: 'Ingénieur full-stack et intégrations',
    linkedin: 'https://www.linkedin.com/in/example-developer',
    github: 'https://github.com/example-developer'
  },
  proof: {
    public_url: 'https://github.com/example-org/example-repo',
    why_relevant: 'les tests automatisés et les autorisations côté serveur'
  },
  value_statement: 'livrer un module TypeScript relié aux API et aux données',
  cta: 'Est-ce un besoin qui existe sur vos projets actuels ?',
  body: [
    'Bonjour,',
    'J\'ai découvert vos intégrations API métier.',
    'Je suis Test Developer, Ingénieur full-stack et intégrations.',
    'Je peux livrer un module TypeScript relié aux API et aux données,',
    'avec un résultat testé et documenté.',
    'Une réalisation que je peux montrer concerne les tests automatisés et les autorisations côté serveur :',
    'https://github.com/example-org/example-repo',
    'Est-ce un besoin qui existe sur vos projets actuels ?',
    'Test Developer',
    'https://www.linkedin.com/in/example-developer',
    'https://github.com/example-developer',
    'Si vous préférez ne pas être recontacté, dites-le-moi simplement.'
  ].join('\n'),
  checks: {
    recipient_verified: true, fact_checked: true,
    gmail_duplicate_checked_on: '2026-10-19',
    no_outreach_opt_out: true
  }
});

test('complete buyer-specific proof and identity passes only to human review', () => {
  const result=reviewOutbound(sample());
  assert.deepEqual(result.errors,[]);
  assert.equal(result.status,'READY_FOR_HUMAN_REVIEW');
  assert.match(result.note,/Not an authorization to send/);
});

test('lack of proof, links or buyer source blocks the draft', () => {
  const x=sample();
  x.body='Bonjour, je suis disponible pour vos projets. Merci.';
  x.buyer.public_source_url='unverified';
  const {errors,status}=reviewOutbound(x);
  assert.equal(status,'BLOCKED');
  assert.ok(errors.includes('source_unverified'));
  assert.ok(errors.includes('linkedin_missing_in_body'));
  assert.ok(errors.includes('github_missing_in_body'));
  assert.ok(errors.includes('public_proof_missing_in_body'));
});

test('opt-out, duplicate history and recipient checks block',()=>{
  const x=sample();
  x.checks.gmail_duplicate_checked_on='';
  x.checks.no_outreach_opt_out=false;
  x.body=x.body.replace('Si vous préférez ne pas être recontacté, dites-le-moi simplement.','');
  const {errors}=reviewOutbound(x);
  assert.ok(errors.includes('duplicate_check_missing'));
  assert.ok(errors.includes('suppression_check_missing'));
  assert.ok(errors.includes('simple_opposition_missing'));
});

test('application needs adapted CV and verified country plus video check',()=>{
  const x=sample();
  x.kind='job_application';
  x.buyer.job_post_url='https://example.org/jobs/contractor';
  x.geography='VERIFY';
  x.experience_assertion_source='CV validated with original source';
  x.cv_file='Guillaume-Flambard-CV-Agentic-Systems.pdf';
  x.checks.cv_read_for_role=true;
  x.checks.no_video_required=true;
  assert.ok(reviewOutbound(x).errors.includes('geography_not_contractually_confirmed'));
  x.geography='CONFIRMED';
  assert.equal(reviewOutbound(x).status,'READY_FOR_HUMAN_REVIEW');
  x.cv_file='';
  assert.ok(reviewOutbound(x).errors.includes('tailored_cv_missing'));
});

test('relationship introductions require prior exchange and no false guarantee',()=>{
  const x=sample();
  x.kind='warm_reconnect';
  assert.ok(reviewOutbound(x).errors.includes('prior_relationship_unverified'));
  x.buyer.prior_exchange='Prior conversation with professional 2026-09-18';
  x.body += '\nNous garantissons 100% reliable.';
  assert.ok(reviewOutbound(x).errors.includes('unsupported_guarantee'));
});

test('quality docs preserve professional identity, existing CVs and sources',()=>{
  const doc=readFileSync(new URL('../docs/OUTBOUND-QUALITY-GATE.md',import.meta.url),'utf8');
  for(const x of ['Guillaume-Flambard-CV-Fullstack-AI.pdf',
    'Guillaume-Flambard-CV-Agentic-Systems.pdf',
    'linkedin.com/in/guillaume-flambard',
    'github.com/guillaume-flambard',
    'humanizer',
    'CNIL',
    'READY_FOR_HUMAN_REVIEW']) {
    assert.ok(doc.includes(x),x);
  }
});

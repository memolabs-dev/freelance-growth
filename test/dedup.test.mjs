import test from 'node:test';
import assert from 'node:assert/strict';

// Deduplication statuses defined per issue #37.
// Only anonymized/aggregate company IDs in Git — Gmail content and
// personal coordinates stay outside the repo.
const DEDUP_STATUS = {
  BLOCKED_DUPLICATE: 'BLOCKED_DUPLICATE',
  DO_NOT_CONTACT: 'DO_NOT_CONTACT',
  SCREENED_OUT: 'SCREENED_OUT',
  FOLLOW_UP_EXISTING_THREAD: 'FOLLOW_UP_EXISTING_THREAD',
  READY_FOR_HUMAN_REVIEW: 'READY_FOR_HUMAN_REVIEW',
};

// Deduplication verdict for each existing outreach draft.
// Source: docs/DEDUCTION_REPORT.md, docs/OUTBOUND-QUALITY-GATE.md,
// docs/APPLICATION_AUDIT_2026-10-19.md, ~/jobs/_db/jobs.db (read-only).
// No personal data or Gmail content committed here.
const DEDUP_VERDICTS = {
  Oudini: DEDUP_STATUS.BLOCKED_DUPLICATE,
  'symbolist.': DEDUP_STATUS.BLOCKED_DUPLICATE,
  Askable: DEDUP_STATUS.SCREENED_OUT,
  '9x': DEDUP_STATUS.READY_FOR_HUMAN_REVIEW,
  Operative: DEDUP_STATUS.READY_FOR_HUMAN_REVIEW,
  Together: DEDUP_STATUS.READY_FOR_HUMAN_REVIEW,
  'Lemon.io': DEDUP_STATUS.READY_FOR_HUMAN_REVIEW,
  'A.Team': DEDUP_STATUS.READY_FOR_HUMAN_REVIEW,
  Blazity: DEDUP_STATUS.READY_FOR_HUMAN_REVIEW,
  Azurally: DEDUP_STATUS.READY_FOR_HUMAN_REVIEW,
  Monogram: DEDUP_STATUS.READY_FOR_HUMAN_REVIEW,
  'TrueHorizon AI': DEDUP_STATUS.READY_FOR_HUMAN_REVIEW,
};

// Companies already contacted by email on 19/10/2026 (per OUTBOUND-QUALITY-GATE.md).
// No new introduction should be proposed for these.
const ALREADY_CONTACTED = ['Oudini', 'symbolist.', 'Altor', 'AI Scaling'];

function verdictFor(company) {
  return DEDUP_VERDICTS[company];
}

function isBlocked(company) {
  const v = verdictFor(company);
  return v === DEDUP_STATUS.BLOCKED_DUPLICATE ||
         v === DEDUP_STATUS.DO_NOT_CONTACT ||
         v === DEDUP_STATUS.SCREENED_OUT;
}

test('oudini is blocked duplicate (already contacted 19/10/2026)', () => {
  assert.equal(verdictFor('Oudini'), DEDUP_STATUS.BLOCKED_DUPLICATE);
  assert.ok(isBlocked('Oudini'));
});

test('symbolist. is blocked duplicate (already contacted 19/10/2026)', () => {
  assert.equal(verdictFor('symbolist.'), DEDUP_STATUS.BLOCKED_DUPLICATE);
  assert.ok(isBlocked('symbolist.'));
});

test('askable is screened out (screened_out antecedent in ~/jobs)', () => {
  assert.equal(verdictFor('Askable'), DEDUP_STATUS.SCREENED_OUT);
  assert.ok(isBlocked('Askable'));
});

test('no duplicate outreach for blocked companies', () => {
  for (const [company, verdict] of Object.entries(DEDUP_VERDICTS)) {
    if (isBlocked(company)) {
      assert.ok(
        ALREADY_CONTACTED.includes(company) || verdict === DEDUP_STATUS.SCREENED_OUT,
        `${company} is blocked but not in already-contacted or screened-out lists`
      );
    }
  }
});

test('all dedup statuses are valid', () => {
  const validStatuses = Object.values(DEDUP_STATUS);
  for (const [company, verdict] of Object.entries(DEDUP_VERDICTS)) {
    assert.ok(
      validStatuses.includes(verdict),
      `Invalid dedup status for ${company}: ${verdict}`
    );
  }
});

test('ready-for-human-review companies are not blocked', () => {
  for (const [company, verdict] of Object.entries(DEDUP_VERDICTS)) {
    if (verdict === DEDUP_STATUS.READY_FOR_HUMAN_REVIEW) {
      assert.ok(!isBlocked(company), `${company} should not be blocked`);
    }
  }
});

test('already-contacted list includes oudini and symbolist', () => {
  assert.ok(ALREADY_CONTACTED.includes('Oudini'));
  assert.ok(ALREADY_CONTACTED.includes('symbolist.'));
});

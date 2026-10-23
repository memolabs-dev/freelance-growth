import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function readTable(file) {
  const [header, ...lines] = readFileSync(new URL(file, import.meta.url), 'utf8')
    .trimEnd().split('\n');
  const keys = header.split('\t');
  return lines.map((line) => {
    const values = line.split('\t');
    assert.equal(values.length, keys.length, `Malformed TSV in ${file}`);
    return Object.fromEntries(keys.map((key, index) => [key, values[index]]));
  });
}

test('outreach does not queue new introductions to previously contacted companies', () => {
  const prospects = readTable('../data/prospects_shortlist.tsv');
  const outreach = readTable('../data/outreach_log.tsv');
  const contacts = new Map(prospects.map((p) => [p.company.toLowerCase(), p]));
  assert.equal(contacts.size, prospects.length, 'duplicate companies in shortlist');
  for (const draft of outreach) {
    const target = contacts.get(draft.company.toLowerCase());
    assert.ok(target, `Draft target absent from shortlist: ${draft.company}`);
    assert.notEqual(
      target.status === 'CONTACTED' && draft.status === 'QUEUED',
      true,
      `Already contacted prospect queued again: ${draft.company}`
    );
  }
});

test('known 19 October contacts are explicitly blocked for a second introduction', () => {
  const log = readTable('../data/outreach_log.tsv');
  for (const name of ['Oudini', 'symbolist.']) {
    const entry = log.find((item) => item.company === name);
    assert.ok(entry, `Missing history: ${name}`);
    assert.equal(entry.status, 'BLOCKED_DUPLICATE');
    assert.match(entry.notes, /2026-10-19/);
  }
});

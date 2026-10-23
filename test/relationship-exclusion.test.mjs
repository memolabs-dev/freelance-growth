import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
test('owner exclusions stop relationship outreach and proposals', () => {
  const [header, ...lines] = read('data/relationship_pipeline_2026-10-19.tsv').trimEnd().split('\n');
  const columns = header.split('\t');
  const byName = new Map(lines.map(line => {
    const fields = line.split('\t');
    assert.equal(fields.length,columns.length);
    const record = Object.fromEntries(columns.map((key,index) => [key,fields[index]]));
    return [record.company,record];
  }));
  assert.equal(byName.get('Medsharing')?.classification,'PREVIOUSLY_HANDLED_NO_NEW_OUTREACH');
  for (const company of ['Symbyoz','Adriver Group']) {
    assert.equal(byName.get(company)?.classification,'OWNER_EXCLUDED_DO_NOT_CONTACT');
  }
  for (const company of ['Medsharing','Symbyoz','Adriver Group']) {
    const row = byName.get(company);
    assert.equal(row?.outbound_state,'DO_NOT_CONTACT_THIS_PIPELINE');
    assert.equal(row?.possible_offer,'NONE');
    assert.equal(row?.priority,'EXCLUDED');
    assert.match(row?.next_step ?? '',/STOP/);
  }
});

test('historical network document superseded by explicit owner instruction', () => {
  const doc=read('docs/NETWORK_PLAN_2026-10-19.md');
  assert.match(doc.slice(0,900),/historique/i);
  assert.match(doc.slice(0,900),/Medsharing déjà traité/);
  assert.match(doc.slice(0,900),/Symbyoz et Adriver Group explicitement exclus/);
  assert.match(doc.slice(0,900),/issue #42 a été clôturée/);
});

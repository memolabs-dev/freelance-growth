import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function parseTsv(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const rows = [];
  let i = 0;
  const len = content.length;

  while (i < len) {
    const fields = [];
    while (true) {
      let field = '';
      if (i < len && content[i] === '"') {
        // Champ entre guillemets
        i++; // skip opening quote
        while (i < len) {
          if (content[i] === '"') {
            if (i + 1 < len && content[i + 1] === '"') {
              field += '"';
              i += 2;
            } else {
              i++; // skip closing quote
              break;
            }
          } else {
            field += content[i];
            i++;
          }
        }
      } else {
        // Champ non entre guillemets
        while (i < len && content[i] !== '\t' && content[i] !== '\n' && content[i] !== '\r') {
          field += content[i];
          i++;
        }
      }
      fields.push(field);

      if (i >= len) break;
      if (content[i] === '\t') {
        i++;
        continue;
      }
      // Saut de ligne
      if (content[i] === '\r') {
        i++;
        if (i < len && content[i] === '\n') i++;
      } else if (content[i] === '\n') {
        i++;
      }
      break;
    }
    if (fields.length > 0 || i < len) {
      rows.push(fields);
    }
  }

  if (rows.length === 0) {
    throw new Error(`File ${filePath} is empty`);
  }
  const header = rows[0];
  const dataRows = rows.slice(1).filter((r) => r.some((f) => f.trim().length > 0));
  return { header, rows: dataRows };
}

function readTable(file) {
  const { header, rows } = parseTsv(new URL(file, import.meta.url));
  return rows.map((fields) => {
    assert.equal(fields.length, header.length, `Malformed TSV in ${file}`);
    return Object.fromEntries(header.map((key, index) => [key, fields[index]]));
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

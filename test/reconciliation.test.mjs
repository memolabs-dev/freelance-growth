import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/**
 * Parse un TSV en gérant les champs entre guillemets contenant des sauts de
 * ligne intégrés (RFC 4180-like, délimiteur tabulation).
 */
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

test('prospects_shortlist.tsv is valid TSV with 36 data rows and 14 columns', () => {
  const { header, rows } = parseTsv(
    new URL('../data/prospects_shortlist.tsv', import.meta.url)
  );
  assert.equal(header.length, 14, `Expected 14 columns, got ${header.length}`);
  assert.equal(rows.length, 36, `Expected 36 data rows, got ${rows.length}`);
  for (const row of rows) {
    assert.equal(row.length, 14, `Row has ${row.length} fields, expected 14`);
  }
});

test('outreach_log.tsv is valid TSV with 12 data rows and 15 columns (main)', () => {
  const { header, rows } = parseTsv(
    new URL('../data/outreach_log.tsv', import.meta.url)
  );
  assert.equal(header.length, 15, `Expected 15 columns, got ${header.length}`);
  assert.equal(rows.length, 12, `Expected 12 data rows on main, got ${rows.length}`);
  for (const row of rows) {
    assert.equal(row.length, 15, `Row has ${row.length} fields, expected 15`);
  }
});

test('no duplicate prospects on (company + source + channel)', () => {
  const { rows } = parseTsv(
    new URL('../data/prospects_shortlist.tsv', import.meta.url)
  );
  const seen = new Set();
  for (const row of rows) {
    const key = `${row[0]}|${row[2]}|${row[4]}`;
    assert.ok(!seen.has(key), `Duplicate prospect key: ${key}`);
    seen.add(key);
  }
});

test('no duplicate outreach messages on (company + template_id)', () => {
  const { rows } = parseTsv(
    new URL('../data/outreach_log.tsv', import.meta.url)
  );
  const seen = new Set();
  for (const row of rows) {
    const key = `${row[1]}|${row[4]}`;
    assert.ok(!seen.has(key), `Duplicate outreach key: ${key}`);
    seen.add(key);
  }
});

test('no CONTACTED status derived from a draft', () => {
  const { rows } = parseTsv(
    new URL('../data/outreach_log.tsv', import.meta.url)
  );
  for (const row of rows) {
    assert.notEqual(
      row[14],
      'CONTACTED',
      `Row for ${row[1]} has CONTACTED status derived from draft`
    );
  }
});

test('all outreach messages have non-empty subject and body', () => {
  const { rows } = parseTsv(
    new URL('../data/outreach_log.tsv', import.meta.url)
  );
  for (const row of rows) {
    assert.ok(row[5].trim().length > 0, `Empty subject for ${row[1]}`);
    assert.ok(row[6].trim().length > 0, `Empty body for ${row[1]}`);
  }
});

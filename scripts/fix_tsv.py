#!/usr/bin/env python3
"""Corriger le format TSV de outreach_log.tsv.

Problèmes identifiés :
1. Le corps du message (col 7) est multiline et s'étend sur plusieurs lignes,
   chacune étant traitée comme un enregistrement séparé.
2. Des colonnes sont dupliquées à la fin de chaque ligne (next_due, notes,
   status apparaissent deux fois).
3. Les guillemets autour du corps ne délimitent pas correctement le champ.

Approche : identifier les enregistrements par leur date de début (YYYY-MM-DD),
extraire les 15 champs en utilisant la structure connue, et réécrire avec un
format TSV valide (corps encapsulé entre guillemets doubles).
"""

import csv
import re
import sys
from pathlib import Path

file_path = Path('data/outreach_log.tsv')
content = file_path.read_text(encoding='utf-8')

# Known values for personalization_thailand (column 8)
KNOWN_THAILAND = [
    'THAILAND_CONFIRMED (announced)',
    'VERIFY - ask in discovery',
    'VERIFY (worldwide)',
    'VERIFY',
]

# Split into records: each record starts with a line matching YYYY-MM-DD\t
date_re = re.compile(r'^(\d{4}-\d{2}-\d{2})\t', re.MULTILINE)
positions = [m.start() for m in date_re.finditer(content)]
positions.append(len(content))  # sentinel

records = []
for i in range(len(positions) - 1):
    record_text = content[positions[i]:positions[i + 1]]
    records.append(record_text)

print(f'Found {len(records)} records')

output_lines = []
header = 'date\tcompany\tcontact_role\tchannel\tmessage_template_id\tsubject\tbody\tpersonalization_thailand\tproof_attached\tresponse_received\tresponse_date\tnext_action\tnext_due\tnotes\tstatus'
output_lines.append(header)

for record_text in records:
    # Split first line to get fields 1-6 (date through subject)
    first_newline = record_text.find('\n')
    if first_newline == -1:
        first_line = record_text
        rest_of_record = ''
    else:
        first_line = record_text[:first_newline]
        rest_of_record = record_text[first_newline + 1:]

    first_fields = first_line.split('\t')
    if len(first_fields) < 6:
        print(f'ERROR: First line has only {len(first_fields)} fields: {first_line[:80]}')
        sys.exit(1)

    date = first_fields[0]
    company = first_fields[1]
    contact_role = first_fields[2]
    channel = first_fields[3]
    message_template_id = first_fields[4]
    subject = first_fields[5]

    # The body starts after the 6th tab on the first line.
    # Find where field 6 (subject) ends on the first line.
    tab_count = 0
    body_start_on_first_line = 0
    for i, ch in enumerate(first_line):
        if ch == '\t':
            tab_count += 1
            if tab_count == 6:
                body_start_on_first_line = i + 1
                break

    body_first_part = first_line[body_start_on_first_line:]

    # Combine body first part with rest of record
    full_body_text = body_first_part + '\n' + rest_of_record if rest_of_record else body_first_part

    # The body is enclosed in quotes: starts with " and ends with "
    # followed by \t then a known thailand value then \t
    if not full_body_text.startswith('"'):
        print(f'ERROR: Body does not start with quote for {date} {company}')
        print(f'  Body starts with: {full_body_text[:80]}')
        sys.exit(1)

    # Remove opening quote
    body_content = full_body_text[1:]

    # Find closing quote: look for "\t<known_thailand_value>\t
    body_end = -1
    matched_thailand = None
    for thailand in KNOWN_THAILAND:
        pattern = f'"\t{thailand}\t'
        idx = body_content.find(pattern)
        if idx != -1:
            if body_end == -1 or idx < body_end:
                body_end = idx
                matched_thailand = thailand

    if body_end == -1:
        print(f'ERROR: Cannot find body end for {date} {company}')
        print(f'  Body content end: {body_content[-100:]}')
        sys.exit(1)

    body = body_content[:body_end]

    # After the closing quote and \t<thailand>\t, we have the remaining 8 fields
    after_body = body_content[body_end + 2:]  # skip " and \t
    # Skip the thailand value and its tab
    after_body = after_body[len(matched_thailand) + 1:]

    remaining_fields = after_body.split('\t')
    # Should be: proof_attached, response_received, response_date, next_action, next_due, notes, status
    # That's 7 fields, but there might be trailing empty fields or extra tabs
    # Take only the first 7 remaining fields (ignore duplicated trailing columns)
    remaining_fields = remaining_fields[:7]

    print(f'Record {date} {company}: {len(remaining_fields)} fields taken')

    if len(remaining_fields) < 7:
        print(f'ERROR: Expected at least 7 remaining fields, got {len(remaining_fields)}')
        print(f'  Fields: {remaining_fields}')
        sys.exit(1)

    proof_attached = remaining_fields[0]
    response_received = remaining_fields[1]
    response_date = remaining_fields[2]
    next_action = remaining_fields[3]
    next_due = remaining_fields[4]
    notes = remaining_fields[5]
    status = remaining_fields[6]

    # Build output row: escape body by doubling quotes and wrapping in quotes
    body_escaped = body.replace('"', '""')
    row = [
        date, company, contact_role, channel, message_template_id, subject,
        f'"{body_escaped}"', matched_thailand, proof_attached,
        response_received, response_date, next_action, next_due, notes, status,
    ]
    output_lines.append('\t'.join(row))

output = '\n'.join(output_lines) + '\n'
file_path.write_text(output, encoding='utf-8')
print(f'Written {len(output_lines) - 1} records to {file_path}')

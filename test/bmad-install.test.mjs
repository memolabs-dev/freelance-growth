import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const root = process.cwd();
const fromRoot = (...parts) => join(root, ...parts);

test('BMAD stable version and modules are installed', () => {
  const manifest = readFileSync(fromRoot('_bmad', '_config', 'manifest.yaml'), 'utf8');
  assert.match(manifest, /version:\s*6\.12\.4/);
  assert.match(manifest, /name:\s*bmm/);
  assert.match(manifest, /name:\s*cis/);
  assert.match(manifest, /claude-code/);
  assert.match(manifest, /opencode/);
  assert.match(manifest, /codex/);
});

test('BMAD skills are available to Claude, OpenCode and Codex', () => {
  for (const path of [
    '.claude/skills/bmad-deep-recon/SKILL.md',
    '.agents/skills/bmad-deep-recon/SKILL.md',
    '.agents/skills/bmad-cis-innovation-strategy/SKILL.md',
    '.opencode/commands/bmad-deep-recon.md'
  ]) {
    assert.ok(existsSync(fromRoot(path)), `Missing BMAD skill: ${path}`);
  }
});

test('commercial research is decision-driven and source-linked', () => {
  const strategy = readFileSync(fromRoot('docs', 'BMAD-GTM-PLAYBOOK.md'), 'utf8');
  const research = readFileSync(fromRoot('docs', 'research', 'BMAD-2026-freelance-acquisition.md'), 'utf8');
  assert.match(strategy, /Memo Bridge/);
  assert.match(strategy, /bmad-deep-recon/);
  assert.match(research, /Expérience E1/);
  assert.match(research, /Expérience E2/);
  assert.match(research, /Expérience E3/);
  assert.ok((research.match(/https:\/\//g) ?? []).length >= 12, 'Primary research sources are missing');
});

test('personal BMAD settings and outputs stay untracked', () => {
  const ignore = readFileSync(fromRoot('.gitignore'), 'utf8');
  for (const path of ['_bmad/config.user.toml', '_bmad/custom/config.user.toml', '_bmad-output/']) {
    assert.ok(ignore.includes(path), `Not ignored: ${path}`);
  }
});

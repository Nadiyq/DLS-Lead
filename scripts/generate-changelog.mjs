#!/usr/bin/env node
/**
 * generate-changelog.mjs
 * Reads git log and generates changelog.json grouped by month.
 *
 * Usage:
 *   node scripts/generate-changelog.mjs > changelog.json
 *   node scripts/generate-changelog.mjs --write   # writes to /changelog.json
 *
 * Output format:
 * [
 *   { "month": "March 2026", "commits": [
 *       { "hash": "abc1234", "date": "2026-03-17", "message": "clean up" }
 *   ]}
 * ]
 */

import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function run() {
  const raw = execSync('git log --format="%H|%ai|%s" --all', { cwd: ROOT, encoding: 'utf8' });
  const commits = raw.trim().split('\n').filter(Boolean).map(line => {
    const [hash, date, ...msgParts] = line.split('|');
    return { hash: hash.slice(0, 7), date: date.split(' ')[0], message: msgParts.join('|') };
  });

  // Group by month
  const groups = {};
  for (const c of commits) {
    const [y, m] = c.date.split('-');
    const key = `${MONTHS[parseInt(m, 10) - 1]} ${y}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(c);
  }

  const result = Object.entries(groups).map(([month, commits]) => ({
    month,
    commits: commits.sort((a, b) => b.date.localeCompare(a.date)),
  }));

  if (process.argv.includes('--write')) {
    const outPath = resolve(ROOT, 'changelog.json');
    writeFileSync(outPath, JSON.stringify(result, null, 2));
    console.log('Wrote %d months (%d commits) to %s', result.length, commits.length, outPath);
  } else {
    process.stdout.write(JSON.stringify(result, null, 2));
  }
}

run();

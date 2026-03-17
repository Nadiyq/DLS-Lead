#!/usr/bin/env node
/**
 * sync-components.mjs
 * Scans storybook stories and outputs component metadata for the docs site.
 *
 * Usage:
 *   node scripts/sync-components.mjs          # Print component list as JSON
 *   node scripts/sync-components.mjs --check   # Verify docs site is in sync
 *
 * This script reads all *.stories.tsx files from apps/storybook/src/stories/
 * and extracts the component titles (from Meta.title). It then compares
 * against the COMPONENTS array in index.html.
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, basename } from 'node:path';

const STORIES_DIR = new URL('../apps/storybook/src/stories', import.meta.url).pathname;
const INDEX_HTML = new URL('../index.html', import.meta.url).pathname;

async function findStoryFiles(dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await findStoryFiles(full));
    } else if (entry.name.endsWith('.stories.tsx')) {
      results.push(full);
    }
  }
  return results;
}

async function extractTitle(filePath) {
  const content = await readFile(filePath, 'utf8');
  // Match: title: 'Components/Alert' or title: "Components/Alert"
  const m = content.match(/title:\s*['"](?:Components\/)?([^'"]+)['"]/);
  if (m) return m[1];
  // Fallback: derive from filename
  const name = basename(filePath, '.stories.tsx');
  return name;
}

async function getDocComponents() {
  const html = await readFile(INDEX_HTML, 'utf8');
  const m = html.match(/const COMPONENTS=\[([^\]]+)\]/);
  if (!m) return [];
  return m[1].match(/'([^']+)'/g).map(s => s.replace(/'/g, ''));
}

async function main() {
  const storyFiles = await findStoryFiles(STORIES_DIR);
  const titles = new Set();

  for (const f of storyFiles) {
    const title = await extractTitle(f);
    titles.add(title);
  }

  const sorted = [...titles].sort((a, b) => a.localeCompare(b));

  if (process.argv.includes('--check')) {
    const docComponents = await getDocComponents();
    const missing = sorted.filter(t => !docComponents.some(d => d.toLowerCase() === t.toLowerCase()));
    const extra = docComponents.filter(d => !sorted.some(t => t.toLowerCase() === d.toLowerCase()));

    if (missing.length === 0 && extra.length === 0) {
      console.log('✓ Docs site is in sync with storybook (%d components)', sorted.length);
      process.exit(0);
    }

    if (missing.length > 0) {
      console.log('Components in storybook but missing from docs:');
      missing.forEach(c => console.log('  + ' + c));
    }
    if (extra.length > 0) {
      console.log('Components in docs but not in storybook:');
      extra.forEach(c => console.log('  - ' + c));
    }
    process.exit(1);
  }

  console.log(JSON.stringify(sorted, null, 2));
  console.log('\nTotal: %d components', sorted.length);
}

main().catch(e => { console.error(e); process.exit(1); });

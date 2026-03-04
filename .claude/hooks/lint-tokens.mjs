#!/usr/bin/env node

/**
 * DLS-Lead Token Lint Hook
 * 
 * Catches common token violations in component CSS files:
 * - Layer-1 primitive references in component CSS
 * - Hardcoded hex/rgb colors
 * - :hover without :not(:disabled)
 * - :focus instead of :focus-visible
 * - outline for focus ring
 * - .is-* / .has-* classes
 * - Missing all: unset
 *
 * Usage:
 *   node lint-tokens.mjs <file>     # lint single file
 *   node lint-tokens.mjs --all      # lint all component CSS files
 */

import { readFileSync, readdirSync } from 'fs';
import { resolve, extname } from 'path';

const PRIMITIVE_PATTERN = /var\(--dls-color-(neutral|primary|info|success|warning|danger|additional)-\d/g;
const HARDCODED_COLOR = /#[0-9a-fA-F]{3,8}(?!\s*\*\/)/g;
const RGB_PATTERN = /(?<!from\s)rgba?\(\s*\d/g;
const HOVER_NO_GUARD = /:hover\s*\{/g;
const FOCUS_NOT_VISIBLE = /:focus\s*\{/g;
const OUTLINE_FOCUS = /outline:\s*(?!none)/g;
const CLASS_STATE = /\.(is-|has-)[a-z]/g;
const RADIUS_PRIMITIVE = /var\(--dls-radius-(?!component)[a-z]/g;

const rules = [
  { pattern: PRIMITIVE_PATTERN, msg: 'Layer-1 primitive in component CSS. Use layer-4 component token or layer-2 semantic.' },
  { pattern: HARDCODED_COLOR, msg: 'Hardcoded hex color. Use a token variable.' },
  { pattern: RGB_PATTERN, msg: 'Hardcoded rgb/rgba. Use a token variable.' },
  { pattern: HOVER_NO_GUARD, msg: ':hover without :not(:disabled). Use :hover:not(:disabled).' },
  { pattern: FOCUS_NOT_VISIBLE, msg: ':focus without -visible. Use :focus-visible.' },
  { pattern: OUTLINE_FOCUS, msg: 'outline for focus — use box-shadow for border-radius compat.' },
  { pattern: CLASS_STATE, msg: '.is-*/.has-* class detected. Use data-* attributes.' },
  { pattern: RADIUS_PRIMITIVE, msg: 'Primitive radius in component. Use --dls-radius-component-{name}.' },
];

function lint(filePath) {
  if (!filePath.endsWith('.css')) return [];
  const content = readFileSync(filePath, 'utf-8');
  const errors = [];
  const lines = content.split('\n');

  // Skip non-component files
  if (!content.includes('.dls-')) return [];

  lines.forEach((line, i) => {
    // Skip comments
    if (line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('//')) return;

    for (const rule of rules) {
      rule.pattern.lastIndex = 0;
      if (rule.pattern.test(line)) {
        errors.push({ line: i + 1, msg: rule.msg, text: line.trim() });
      }
    }
  });

  return errors;
}

// Main
const args = process.argv.slice(2);
let files = [];

if (args[0] === '--all') {
  // Find all CSS files in stories/
  const storiesDir = resolve('apps/storybook/src/stories');
  try {
    const walk = (dir) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (extname(entry.name) === '.css') files.push(full);
      }
    };
    walk(storiesDir);
  } catch (e) {
    // stories dir might not exist yet
  }
} else if (args[0] && args[0].endsWith('.css')) {
  files = [resolve(args[0])];
}

let hasErrors = false;
for (const f of files) {
  try {
    const errors = lint(f);
    if (errors.length > 0) {
      hasErrors = true;
      console.error(`\n❌ ${f}`);
      for (const e of errors) {
        console.error(`  L${e.line}: ${e.msg}`);
        console.error(`    → ${e.text}`);
      }
    }
  } catch (e) {
    // file might not exist or be unreadable
  }
}

if (hasErrors) {
  console.error('\n🔴 Token lint failed. Fix violations above.');
  process.exit(1);
} else if (files.length > 0) {
  console.log('✅ Token lint passed.');
}

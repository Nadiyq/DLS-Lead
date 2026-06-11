#!/usr/bin/env node

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const TOKENS_PATH = new URL('../tokens/tokens.json', import.meta.url);
const MANIFESTS_DIR = new URL('../specs/components/manifests', import.meta.url).pathname;
const STORIES_DIR = new URL('../apps/storybook/src/stories', import.meta.url).pathname;
const DESCRIPTIONS_DIR = new URL('../specs/figma-descriptions', import.meta.url).pathname;
const REFERENCE_RE = /\{([^}]+)\}/g;

function printUsage() {
  console.log(`
Figma sync audit for DLS-Lead

Usage:
  node scripts/figma-sync-audit.mjs --token <token-name>
  node scripts/figma-sync-audit.mjs --prefix <token-prefix>
  node scripts/figma-sync-audit.mjs --compare <figma-vars.json>
  node scripts/figma-sync-audit.mjs --components              # Audit all component manifests
  node scripts/figma-sync-audit.mjs --components --ci          # Exit 1 on errors
  node scripts/figma-sync-audit.mjs --component <kebab-name>   # Audit one component

Accepted token formats:
  color.intent.primary.base
  color/intent/primary/base
  --dls-color-intent-primary-base

Compare file formats:
  { "color/intent/primary/base": "#6941C6" }
  [{ "name": "color/intent/primary/base", "value": "#6941C6" }]
`);
}

function normalizeTokenName(input) {
  if (!input) return '';
  const trimmed = input.trim();
  if (!trimmed) return '';

  if (trimmed.startsWith('--dls-')) {
    return trimmed
      .replace(/^--dls-/, '')
      .replace(/-/g, '.')
      .replace(/\.on\.base/g, '.on-base');
  }

  return trimmed
    .replace(/^dls[./-]/, '')
    .replace(/[\\/]/g, '.')
    .replace(/\.on\.base/g, '.on-base');
}

function cssVarName(tokenPath) {
  return `--dls-${tokenPath.replaceAll('.', '-')}`;
}

function formatScalar(value) {
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
}

function parseReference(value) {
  if (typeof value !== 'string') return null;
  const exact = value.match(/^\{([^}]+)\}$/);
  return exact ? exact[1] : null;
}

function replaceInlineReferences(value) {
  if (typeof value !== 'string') return value;
  return value.replaceAll(REFERENCE_RE, (_, ref) => cssVarName(ref));
}

function normalizeTypographyValue(value) {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return value;
  }

  const next = {};
  for (const [key, inner] of Object.entries(value)) {
    next[key] = replaceInlineReferences(inner);
  }
  return next;
}

function collectTokens(node, currentPath = [], bucket = []) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) {
    return bucket;
  }

  if ('$value' in node) {
    const tokenPath = currentPath.join('.');
    const type = node.$type ?? 'unknown';
    const rawValue = node.$value;
    const reference = parseReference(rawValue);

    bucket.push({
      path: tokenPath,
      type,
      rawValue,
      reference,
      cssVar: cssVarName(tokenPath),
    });

    if (type === 'typography' && typeof rawValue === 'object' && rawValue !== null) {
      for (const [key, value] of Object.entries(rawValue)) {
        bucket.push({
          path: `${tokenPath}.${key}`,
          type: `${type}.${key}`,
          rawValue: value,
          reference: parseReference(value),
          cssVar: cssVarName(`${tokenPath}.${key}`),
        });
      }
    }

    return bucket;
  }

  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    collectTokens(value, [...currentPath, key], bucket);
  }

  return bucket;
}

function buildTokenIndex(tokens) {
  const byPath = new Map();
  for (const token of tokens) {
    byPath.set(token.path, token);
  }
  return byPath;
}

function resolveTokenValue(token, byPath, seen = new Set()) {
  if (!token) return null;

  if (seen.has(token.path)) {
    throw new Error(`Circular token reference detected at ${token.path}`);
  }

  if (!token.reference) {
    return normalizeTypographyValue(token.rawValue);
  }

  const target = byPath.get(token.reference);
  if (!target) {
    return token.rawValue;
  }

  seen.add(token.path);
  const resolved = resolveTokenValue(target, byPath, seen);
  seen.delete(token.path);
  return resolved;
}

function normalizeCompareEntries(payload) {
  if (Array.isArray(payload)) {
    return payload.map((entry, index) => {
      if (!entry || typeof entry !== 'object') {
        throw new Error(`Invalid array item at index ${index}`);
      }
      const name = entry.name ?? entry.token ?? entry.variable ?? entry.path;
      if (!name) {
        throw new Error(`Missing "name" field at index ${index}`);
      }
      return {
        originalName: String(name),
        normalizedName: normalizeTokenName(String(name)),
        value: entry.value ?? entry.resolvedValue ?? entry.cssValue ?? null,
      };
    });
  }

  if (payload && typeof payload === 'object') {
    return Object.entries(payload).map(([name, value]) => ({
      originalName: name,
      normalizedName: normalizeTokenName(name),
      value,
    }));
  }

  throw new Error('Compare payload must be an object or an array.');
}

function findToken(tokenInput, byPath) {
  const normalized = normalizeTokenName(tokenInput);
  return byPath.get(normalized) ?? null;
}

function compareValue(figmaValue, resolvedValue) {
  if (figmaValue == null) return { matches: true, reason: 'missing-value' };

  const left = typeof figmaValue === 'string' ? figmaValue.trim() : JSON.stringify(figmaValue);
  const right = typeof resolvedValue === 'string' ? resolvedValue.trim() : JSON.stringify(resolvedValue);

  return {
    matches: left === right,
    reason: left === right ? 'exact' : 'mismatch',
  };
}

function isPrimitiveLayer(tokenPath) {
  return /^(color\.(neutral|primary|info|success|warning|danger|additional|opacity)|font\.|spacing\.|radius\.(?!component)|icon\.|shadow\.raw)/.test(tokenPath);
}

function formatTokenDetails(token, byPath) {
  const resolvedValue = resolveTokenValue(token, byPath);
  const lines = [
    `Token: ${token.path}`,
    `CSS var: ${token.cssVar}`,
    `Type: ${token.type}`,
    `Layer: ${isPrimitiveLayer(token.path) ? 'L1 primitive' : token.path.startsWith('state.') ? 'L3 state' : token.path.includes('.component.') ? 'L4 component' : 'L2 semantic / shared'}`,
  ];

  if (token.reference) {
    lines.push(`Reference: ${token.reference}`);
  }

  lines.push(`Resolved: ${formatScalar(resolvedValue)}`);
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Component / variant drift audit
// ---------------------------------------------------------------------------

function kebabToPascal(s) {
  return s.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
}

async function fileExists(p) {
  try { await readFile(p); return true; } catch { return false; }
}

async function findFileRecursive(dir, filename) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isFile() && entry.name === filename) return full;
    if (entry.isDirectory() && !entry.name.startsWith('_') && entry.name !== 'node_modules') {
      const found = await findFileRecursive(full, filename);
      if (found) return found;
    }
  }
  return null;
}

async function auditComponent(manifestPath) {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const report = { name: manifest.name, kebab: manifest.kebabName, errors: [], warnings: [], info: [] };

  // 1. Check Figma URL is present
  if (!manifest.figma?.componentSetUrl || manifest.figma.componentSetUrl === 'TODO') {
    report.errors.push('Missing figma.componentSetUrl');
  }

  // 2. Check Figma property mapping exists
  if (!manifest.figma?.propertyMapping || manifest.figma.propertyMapping.length === 0) {
    if (!manifest.figma?.componentSets || manifest.figma.componentSets.length === 0) {
      report.warnings.push('No figma.propertyMapping — Figma↔Code prop mapping undocumented');
    }
  } else {
    // Check each mapping has either reactProp or a note explaining why null
    for (const mapping of manifest.figma.propertyMapping) {
      if (mapping.reactProp === null && !mapping.note) {
        report.warnings.push(`Figma property "${mapping.figmaProperty}" mapped to null with no explanatory note`);
      }
    }

    // Check mapped react props actually exist in props array
    const HTML_ATTRS = new Set(['value', 'placeholder', 'disabled', 'checked', 'type', 'name', 'id', 'children', 'className', 'style', 'onChange', 'onClick', 'onFocus', 'onBlur']);
    const propNames = new Set((manifest.props || []).map(p => p.name));
    for (const mapping of manifest.figma.propertyMapping) {
      if (mapping.reactProp && !propNames.has(mapping.reactProp)) {
        if (HTML_ATTRS.has(mapping.reactProp)) {
          report.warnings.push(`Figma mapping references "${mapping.reactProp}" — inherited HTML attribute, not in explicit props`);
        } else {
          report.errors.push(`Figma mapping references reactProp "${mapping.reactProp}" which is not in props array`);
        }
      }
    }
  }

  // 3. Check variant/intent/size coverage in Figma mapping
  const mappedFigmaProps = new Set((manifest.figma?.propertyMapping || []).map(m => m.reactProp).filter(Boolean));
  if (manifest.variants?.length > 0 && !mappedFigmaProps.has('variant')) {
    report.warnings.push('Component has variants but no Figma mapping for "variant"');
  }
  if (manifest.intents?.length > 0 && !mappedFigmaProps.has('intent')) {
    report.warnings.push('Component has intents but no Figma mapping for "intent"');
  }
  if (manifest.sizes?.length > 0 && !mappedFigmaProps.has('size')) {
    report.warnings.push('Component has sizes but no Figma mapping for "size"');
  }

  // 4. Check TSX file exists (search recursively for sub-components)
  const kebab = manifest.kebabName;
  const pascal = manifest.name;
  const tsxPath = await findFileRecursive(STORIES_DIR, `${pascal}.tsx`);
  if (!tsxPath) {
    report.errors.push(`Component TSX file not found: ${pascal}.tsx`);
  }

  // 5. Check CSS file exists
  const cssPath = await findFileRecursive(STORIES_DIR, `${kebab}.css`);
  if (!cssPath) {
    report.warnings.push(`No CSS file found for ${kebab} (may use parent component styles)`);
  }

  // 6. Check stories file exists
  const storiesPath = await findFileRecursive(STORIES_DIR, `${pascal}.stories.tsx`);
  if (!storiesPath) {
    report.warnings.push(`No stories file found for ${pascal}`);
  }

  // 7. Check Figma description exists
  const descPath = path.join(DESCRIPTIONS_DIR, `${kebab}.md`);
  if (!await fileExists(descPath)) {
    report.warnings.push(`No Figma description file: specs/figma-descriptions/${kebab}.md`);
  }

  // 8. Check accessibility contract
  if (!manifest.accessibility?.semanticElement || manifest.accessibility.semanticElement === 'TODO') {
    report.warnings.push('accessibility.semanticElement is missing or TODO');
  }

  // 9. Check state model
  if (manifest.states?.implementation && manifest.states.implementation !== 'none') {
    if (!manifest.states.tokens || manifest.states.tokens.length === 0) {
      report.warnings.push(`states.implementation is "${manifest.states.implementation}" but no state tokens listed`);
    }
  }

  // 10. Check _meta completeness
  if (!manifest._meta?.generatedAt) report.warnings.push('Missing _meta.generatedAt');
  if (!manifest._meta?.sourceHash || !/^[0-9a-f]{16}$/.test(manifest._meta.sourceHash)) {
    report.errors.push(`Invalid or missing _meta.sourceHash: "${manifest._meta?.sourceHash}"`);
  }

  // 11. Check knownDeviations format
  if (manifest.knownDeviations) {
    for (const dev of manifest.knownDeviations) {
      if (typeof dev === 'string') {
        report.errors.push(`knownDeviation is a plain string: "${dev.slice(0, 60)}..."`);
      }
    }
  }

  return report;
}

async function auditAllComponents(targetKebab = null) {
  let files;
  try {
    files = (await readdir(MANIFESTS_DIR)).filter(f => f.endsWith('.json'));
  } catch {
    console.error('No manifests directory found at', MANIFESTS_DIR);
    process.exit(1);
  }

  if (targetKebab) {
    const target = `${targetKebab}.json`;
    if (!files.includes(target)) {
      console.error(`Manifest not found: ${target}`);
      process.exit(1);
    }
    files = [target];
  }

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const file of files.sort()) {
    const report = await auditComponent(path.join(MANIFESTS_DIR, file));
    const hasIssues = report.errors.length > 0 || report.warnings.length > 0;

    if (!hasIssues && !targetKebab) continue;

    const icon = report.errors.length > 0 ? '✗' : report.warnings.length > 0 ? '⚠' : '✓';
    console.log(`\n${icon} ${report.name} (${report.kebab})`);
    for (const e of report.errors) console.log(`  ERROR: ${e}`);
    for (const w of report.warnings) console.log(`  WARN:  ${w}`);
    for (const i of report.info) console.log(`  INFO:  ${i}`);

    totalErrors += report.errors.length;
    totalWarnings += report.warnings.length;
  }

  console.log(`\n--- Component sync: ${files.length} manifests, ${totalErrors} errors, ${totalWarnings} warnings ---`);
  return totalErrors;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printUsage();
    return;
  }

  const tokenFile = JSON.parse(await readFile(TOKENS_PATH, 'utf8'));
  const tokens = collectTokens(tokenFile);
  const byPath = buildTokenIndex(tokens);

  if (args[0] === '--token') {
    const name = args[1];
    if (!name) {
      throw new Error('Missing token name after --token');
    }
    const token = findToken(name, byPath);
    if (!token) {
      throw new Error(`Token not found: ${name}`);
    }
    console.log(formatTokenDetails(token, byPath));
    return;
  }

  if (args[0] === '--prefix') {
    const prefixInput = args[1];
    if (!prefixInput) {
      throw new Error('Missing prefix after --prefix');
    }
    const prefix = normalizeTokenName(prefixInput);
    const matches = tokens
      .filter((token) => token.path.startsWith(prefix))
      .sort((a, b) => a.path.localeCompare(b.path));

    if (matches.length === 0) {
      throw new Error(`No tokens found with prefix: ${prefixInput}`);
    }

    for (const token of matches) {
      console.log(`${token.path} -> ${token.cssVar}`);
    }
    return;
  }

  if (args[0] === '--compare') {
    const comparePath = args[1];
    if (!comparePath) {
      throw new Error('Missing JSON path after --compare');
    }

    const rawCompare = JSON.parse(await readFile(comparePath, 'utf8'));
    const entries = normalizeCompareEntries(rawCompare);
    const missing = [];
    const mismatched = [];
    const matched = [];

    for (const entry of entries) {
      const token = byPath.get(entry.normalizedName);
      if (!token) {
        missing.push(entry);
        continue;
      }

      const resolvedValue = resolveTokenValue(token, byPath);
      const valueCheck = compareValue(entry.value, resolvedValue);
      const target = {
        figma: entry,
        token,
        resolvedValue,
      };

      if (valueCheck.matches) {
        matched.push(target);
      } else {
        mismatched.push(target);
      }
    }

    console.log(`Compared ${entries.length} Figma variables against ${tokens.length} token entries.`);
    console.log(`Matched: ${matched.length}`);
    console.log(`Missing in tokens.json: ${missing.length}`);
    console.log(`Value mismatches: ${mismatched.length}`);

    if (missing.length > 0) {
      console.log('\nMissing tokens:');
      for (const entry of missing) {
        console.log(`- ${entry.originalName}`);
      }
    }

    if (mismatched.length > 0) {
      console.log('\nValue mismatches:');
      for (const item of mismatched) {
        console.log(`- ${item.figma.originalName}`);
        console.log(`  token: ${item.token.path}`);
        console.log(`  css:   ${item.token.cssVar}`);
        console.log(`  figma: ${formatScalar(item.figma.value)}`);
        console.log(`  dls:   ${formatScalar(item.resolvedValue)}`);
      }
    }

    return;
  }

  if (args[0] === '--components') {
    const ci = args.includes('--ci');
    const errors = await auditAllComponents();
    if (ci && errors > 0) process.exit(1);
    return;
  }

  if (args[0] === '--component') {
    const name = args[1];
    if (!name) throw new Error('Missing component name after --component');
    const ci = args.includes('--ci');
    const errors = await auditAllComponents(name);
    if (ci && errors > 0) process.exit(1);
    return;
  }

  throw new Error(`Unknown argument: ${args[0]}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';

const TOKENS_PATH = new URL('../tokens/tokens.json', import.meta.url);
const REFERENCE_RE = /\{([^}]+)\}/g;

function printUsage() {
  console.log(`
Figma token audit for DLS-Lead

Usage:
  node scripts/figma-sync-audit.mjs --token <token-name>
  node scripts/figma-sync-audit.mjs --prefix <token-prefix>
  node scripts/figma-sync-audit.mjs --compare <figma-vars.json>

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

  throw new Error(`Unknown argument: ${args[0]}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

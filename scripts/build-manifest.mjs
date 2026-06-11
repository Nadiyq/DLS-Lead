#!/usr/bin/env node
/**
 * build-manifest.mjs
 *
 * Reads TSX (props), stories (variants/intents/sizes), CSS (tokens),
 * and tokens.json (L4 by prefix match) to validate or scaffold component manifests.
 *
 * Usage:
 *   node scripts/build-manifest.mjs --all              # Validate all manifests
 *   node scripts/build-manifest.mjs --component badge   # Validate one manifest
 *   node scripts/build-manifest.mjs --component badge --emit  # Scaffold stub manifest
 *   node scripts/build-manifest.mjs --all --ci          # CI mode: exit 1 on any error
 */

import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, basename, dirname } from 'node:path';
import { createHash } from 'node:crypto';

const ROOT = new URL('..', import.meta.url).pathname;
const STORIES_DIR = join(ROOT, 'apps/storybook/src/stories');
const MANIFESTS_DIR = join(ROOT, 'specs/components/manifests');
const TOKENS_PATH = join(ROOT, 'tokens/tokens.json');
const SCHEMA_PATH = join(ROOT, 'specs/schemas/component.v1.json');

// ---------------------------------------------------------------------------
// Token loading
// ---------------------------------------------------------------------------

function normalizeTokenKey(key) {
  return key
    .replace(/\./g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function flattenTokens(obj, prefix = '--dls-') {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const normalized = normalizeTokenKey(k);
    if (v.$value !== undefined) keys.push(prefix + normalized);
    else if (typeof v === 'object' && v !== null) keys.push(...flattenTokens(v, prefix + normalized + '-'));
  }
  return keys;
}

async function loadTokenSet() {
  const raw = await readFile(TOKENS_PATH, 'utf8');
  return new Set(flattenTokens(JSON.parse(raw)));
}

// ---------------------------------------------------------------------------
// Component discovery
// ---------------------------------------------------------------------------

function kebabToPascal(s) {
  return s.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
}

function pascalToKebab(s) {
  return s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

async function discoverComponents() {
  const components = new Map();

  const entries = await readdir(STORIES_DIR, { withFileTypes: true });

  for (const entry of entries) {
    const full = join(STORIES_DIR, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith('_') || entry.name === 'assets' || entry.name === 'foundations' || entry.name === 'dls-smoke') continue;
      const kebab = entry.name;
      const pascal = kebabToPascal(kebab);
      const subEntries = await readdir(full);
      const tsx = subEntries.find(f => f === `${pascal}.tsx`);
      const stories = subEntries.find(f => f === `${pascal}.stories.tsx`);
      const css = subEntries.find(f => f === `${kebab}.css`);

      if (tsx) {
        components.set(kebab, {
          name: pascal,
          kebabName: kebab,
          tsxPath: join(full, tsx),
          storiesPath: stories ? join(full, stories) : null,
          cssPath: css ? join(full, css) : null,
        });
      }
    } else if (entry.name.endsWith('.tsx') && !entry.name.endsWith('.stories.tsx')) {
      if (['Header.tsx', 'Page.tsx'].includes(entry.name)) continue;
      const pascal = basename(entry.name, '.tsx');
      const kebab = pascalToKebab(pascal);
      const storiesFile = `${pascal}.stories.tsx`;
      const cssFile = `${kebab}.css`;

      const storiesPath = entries.find(e => e.name === storiesFile) ? join(STORIES_DIR, storiesFile) : null;
      const cssPath = entries.find(e => e.name === cssFile) ? join(STORIES_DIR, cssFile) : null;

      components.set(kebab, {
        name: pascal,
        kebabName: kebab,
        tsxPath: full,
        storiesPath,
        cssPath,
      });
    }
  }

  return components;
}

// ---------------------------------------------------------------------------
// TSX prop extraction
// ---------------------------------------------------------------------------

function extractProps(tsxContent, componentName) {
  const props = [];

  const interfaceRe = new RegExp(
    `(?:export\\s+)?interface\\s+${componentName}Props[^{]*\\{([\\s\\S]*?)^\\}`,
    'm'
  );
  const match = tsxContent.match(interfaceRe);
  if (!match) return props;

  const body = match[1];
  const propRe = /(?:\/\*\*\s*([\s\S]*?)\s*\*\/\s*)?([\w]+)(\?)?:\s*([^;]+);/g;
  let m;

  while ((m = propRe.exec(body)) !== null) {
    const [, jsdoc, name, optional, rawType] = m;
    if (name === 'children' && rawType.includes('ReactNode')) {
      props.push({ name, type: 'React.ReactNode', required: !optional, description: jsdoc?.trim() || undefined });
      continue;
    }

    const type = rawType.trim();
    const prop = { name, type, required: !optional };

    if (jsdoc) prop.description = jsdoc.replace(/\s+/g, ' ').trim();

    const unionMatch = type.match(/^'([^']+)'(?:\s*\|\s*'([^']+)')+$/);
    if (unionMatch) {
      prop.enum = type.split(/\s*\|\s*/).map(s => s.replace(/'/g, ''));
    }

    props.push(prop);
  }

  // Extract defaults from destructuring
  const destructRe = /\(\s*\{([^}]+)\}/;
  const destructMatch = tsxContent.match(destructRe);
  if (destructMatch) {
    const assignments = destructMatch[1];
    const defaultRe = /(\w+)\s*=\s*(?:'([^']*)'|"([^"]*)"|(\d+(?:\.\d+)?)|(\w+))/g;
    let dm;
    while ((dm = defaultRe.exec(assignments)) !== null) {
      const propName = dm[1];
      const val = dm[2] ?? dm[3] ?? dm[4] ?? dm[5];
      const prop = props.find(p => p.name === propName);
      if (prop && val !== undefined) {
        if (val === 'true') prop.default = true;
        else if (val === 'false') prop.default = false;
        else if (val === 'undefined' || val === 'null') { /* skip */ }
        else if (/^\d+$/.test(val)) prop.default = val;
        else prop.default = val;
      }
    }
  }

  // Resolve type aliases to enums
  for (const prop of props) {
    if (prop.enum || !prop.type || /[^a-zA-Z0-9_]/.test(prop.type)) continue;
    const aliasRe = new RegExp(`type\\s+${prop.type}\\s*=\\s*([^;]+);`);
    const aliasMatch = tsxContent.match(aliasRe);
    if (aliasMatch) {
      const vals = aliasMatch[1].match(/'([^']+)'/g);
      if (vals) {
        prop.enum = vals.map(v => v.replace(/'/g, ''));
      }
    }
  }

  return props;
}

function extractVariantsIntentsSizes(props) {
  const variants = props.find(p => p.name === 'variant')?.enum || [];
  const intents = props.find(p => p.name === 'intent')?.enum || [];
  const sizes = props.find(p => p.name === 'size')?.enum || [];
  return { variants, intents, sizes };
}

// ---------------------------------------------------------------------------
// Stories extraction
// ---------------------------------------------------------------------------

function extractFromStories(storiesContent) {
  const result = { variants: [], intents: [], sizes: [], title: null };

  const titleMatch = storiesContent.match(/title:\s*['"](?:Components\/)?([^'"]+)['"]/);
  if (titleMatch) result.title = titleMatch[1];

  const argTypesRe = /argTypes:\s*\{([\s\S]*?)\n\s*\}/;
  const argTypesMatch = storiesContent.match(argTypesRe);
  if (!argTypesMatch) return result;

  const body = argTypesMatch[1];

  for (const key of ['variant', 'intent', 'size']) {
    const re = new RegExp(`${key}:\\s*\\{[^}]*options:\\s*\\[([^\\]]+)\\]`);
    const m = body.match(re);
    if (m) {
      result[key === 'variant' ? 'variants' : key === 'intent' ? 'intents' : 'sizes'] =
        m[1].match(/'([^']+)'/g)?.map(s => s.replace(/'/g, '')) || [];
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// CSS token extraction
// ---------------------------------------------------------------------------

function extractCssTokens(cssContent) {
  const tokens = new Set();
  const re = /var\(--dls-([^),]+)/g;
  let m;
  while ((m = re.exec(cssContent)) !== null) {
    tokens.add('--dls-' + m[1]);
  }
  return [...tokens].sort();
}

// ---------------------------------------------------------------------------
// Source hash
// ---------------------------------------------------------------------------

function computeSourceHash(tsx, stories, css) {
  const h = createHash('sha256');
  h.update(tsx || '');
  h.update(stories || '');
  h.update(css || '');
  return h.digest('hex').slice(0, 16);
}

// ---------------------------------------------------------------------------
// Schema validation (lightweight — checks required fields + patterns)
// ---------------------------------------------------------------------------

async function loadSchema() {
  const raw = await readFile(SCHEMA_PATH, 'utf8');
  return JSON.parse(raw);
}

function validateManifestSchema(manifest, schema) {
  const errors = [];

  for (const field of schema.required || []) {
    if (manifest[field] === undefined) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (manifest.kebabName && !/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(manifest.kebabName)) {
    errors.push(`kebabName "${manifest.kebabName}" doesn't match pattern ^[a-z][a-z0-9]*(-[a-z0-9]+)*$`);
  }

  if (manifest._meta) {
    for (const field of ['generatedAt', 'generator', 'sourceHash']) {
      if (manifest._meta[field] === undefined) {
        errors.push(`Missing _meta.${field}`);
      }
    }
    if (manifest._meta.sourceHash && !/^[0-9a-f]{16}$/.test(manifest._meta.sourceHash)) {
      errors.push(`_meta.sourceHash "${manifest._meta.sourceHash}" doesn't match ^[0-9a-f]{16}$`);
    }
  }

  if (manifest.tokens) {
    for (const token of manifest.tokens) {
      if (!token.startsWith('--dls-')) {
        errors.push(`Token "${token}" doesn't start with --dls-`);
      }
    }
  }

  if (manifest.props) {
    for (const prop of manifest.props) {
      if (!prop.name || prop.required === undefined) {
        errors.push(`Prop missing required fields: ${JSON.stringify(prop)}`);
      }
    }
  }

  if (manifest.knownDeviations) {
    for (const dev of manifest.knownDeviations) {
      if (typeof dev === 'string') {
        errors.push(`knownDeviation is a plain string, expected {area, description}: "${dev}"`);
      } else if (!dev.area || !dev.description) {
        errors.push(`knownDeviation missing area or description: ${JSON.stringify(dev)}`);
      }
    }
  }

  const allowed = new Set(Object.keys(schema.properties || {}));
  for (const key of Object.keys(manifest)) {
    if (!allowed.has(key)) {
      errors.push(`Unknown field: ${key}`);
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Drift detection
// ---------------------------------------------------------------------------

function detectPropDrift(sourceProps, manifestProps) {
  const drift = [];
  const sourceNames = new Set(sourceProps.map(p => p.name));
  const manifestNames = new Set(manifestProps.map(p => p.name));

  for (const name of sourceNames) {
    if (!manifestNames.has(name)) {
      drift.push({ type: 'missing-in-manifest', prop: name });
    }
  }

  for (const name of manifestNames) {
    if (!sourceNames.has(name)) {
      drift.push({ type: 'missing-in-source', prop: name });
    }
  }

  for (const sp of sourceProps) {
    const mp = manifestProps.find(p => p.name === sp.name);
    if (!mp) continue;

    if (sp.required !== mp.required) {
      drift.push({ type: 'required-mismatch', prop: sp.name, source: sp.required, manifest: mp.required });
    }

    if (sp.default !== undefined && mp.default !== undefined && String(sp.default) !== String(mp.default)) {
      drift.push({ type: 'default-mismatch', prop: sp.name, source: sp.default, manifest: mp.default });
    }

    if (sp.enum && mp.enum) {
      const sourceEnum = new Set(sp.enum);
      const manifestEnum = new Set(mp.enum);
      for (const v of sourceEnum) {
        if (!manifestEnum.has(v)) drift.push({ type: 'enum-missing-in-manifest', prop: sp.name, value: v });
      }
      for (const v of manifestEnum) {
        if (!sourceEnum.has(v)) drift.push({ type: 'enum-missing-in-source', prop: sp.name, value: v });
      }
    }
  }

  return drift;
}

function detectTokenDrift(cssTokens, manifestTokens, allTokens) {
  const drift = [];
  const manifestSet = new Set(manifestTokens);

  for (const token of cssTokens) {
    if (!manifestSet.has(token)) {
      drift.push({ type: 'token-missing-in-manifest', token });
    }
  }

  for (const token of manifestTokens) {
    if (!allTokens.has(token)) {
      drift.push({ type: 'token-not-in-tokens-json', token });
    }
  }

  return drift;
}

// ---------------------------------------------------------------------------
// Stub manifest generation
// ---------------------------------------------------------------------------

function generateStub(component, sourceProps, vis, cssTokens) {
  return {
    name: component.name,
    kebabName: component.kebabName,
    category: 'TODO',
    description: 'TODO',
    variants: vis.variants,
    intents: vis.intents,
    sizes: vis.sizes,
    props: sourceProps.map(p => {
      const out = { name: p.name, type: p.type, required: p.required };
      if (p.default !== undefined) out.default = p.default;
      if (p.enum) out.enum = p.enum;
      if (p.description) out.description = p.description;
      return out;
    }),
    tokens: cssTokens,
    states: {
      available: []
    },
    accessibility: {
      semanticElement: 'TODO'
    },
    figma: {
      componentSetUrl: 'TODO'
    },
    _meta: {
      generatedAt: new Date().toISOString(),
      generator: 'build-manifest@1.0.0',
      sourceHash: '0000000000000000'
    }
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function processComponent(component, allTokens, schema, { emit = false } = {}) {
  const report = { name: component.name, kebab: component.kebabName, errors: [], warnings: [], info: [] };

  // Read source files
  const tsx = await readFile(component.tsxPath, 'utf8');
  const stories = component.storiesPath ? await readFile(component.storiesPath, 'utf8') : null;
  const css = component.cssPath ? await readFile(component.cssPath, 'utf8') : null;

  // Extract from source
  const sourceProps = extractProps(tsx, component.name);
  const vis = extractVariantsIntentsSizes(sourceProps);
  const storiesData = stories ? extractFromStories(stories) : null;
  const cssTokens = css ? extractCssTokens(css) : [];
  const sourceHash = computeSourceHash(tsx, stories, css);

  // Cross-check stories vs TSX
  if (storiesData) {
    for (const key of ['variants', 'intents', 'sizes']) {
      const storyVals = new Set(storiesData[key]);
      const tsxVals = new Set(vis[key]);
      for (const v of storyVals) {
        if (!tsxVals.has(v)) report.warnings.push(`Stories ${key} value "${v}" not in TSX type`);
      }
      for (const v of tsxVals) {
        if (!storyVals.has(v) && storyVals.size > 0) report.warnings.push(`TSX ${key} value "${v}" not in stories argTypes`);
      }
    }
  }

  // Check manifest
  const manifestPath = join(MANIFESTS_DIR, `${component.kebabName}.json`);
  let manifest = null;
  try {
    manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  } catch {
    if (emit) {
      const stub = generateStub(component, sourceProps, vis, cssTokens);
      stub._meta.sourceHash = sourceHash;
      await writeFile(manifestPath, JSON.stringify(stub, null, 2) + '\n');
      report.info.push(`Emitted stub manifest → ${manifestPath}`);
      return report;
    }
    report.info.push('No manifest found (use --emit to scaffold)');
    return report;
  }

  // Schema validation
  const schemaErrors = validateManifestSchema(manifest, schema);
  report.errors.push(...schemaErrors);

  // Prop drift
  if (sourceProps.length > 0 && manifest.props) {
    const propDrift = detectPropDrift(sourceProps, manifest.props);
    for (const d of propDrift) {
      if (d.type === 'missing-in-manifest') report.errors.push(`Prop "${d.prop}" in TSX but missing from manifest`);
      else if (d.type === 'missing-in-source') report.warnings.push(`Prop "${d.prop}" in manifest but not in TSX (may be from extended interface)`);
      else if (d.type === 'required-mismatch') report.warnings.push(`Prop "${d.prop}" required: TSX=${d.source}, manifest=${d.manifest}`);
      else if (d.type === 'default-mismatch') report.warnings.push(`Prop "${d.prop}" default: TSX="${d.source}", manifest="${d.manifest}"`);
      else if (d.type === 'enum-missing-in-manifest') report.warnings.push(`Prop "${d.prop}" enum value "${d.value}" in TSX but not in manifest`);
      else if (d.type === 'enum-missing-in-source') report.warnings.push(`Prop "${d.prop}" enum value "${d.value}" in manifest but not in TSX`);
    }
  }

  // Token drift
  if (cssTokens.length > 0 && manifest.tokens) {
    const tokenDrift = detectTokenDrift(cssTokens, manifest.tokens, allTokens);
    for (const d of tokenDrift) {
      if (d.type === 'token-missing-in-manifest') report.warnings.push(`CSS token "${d.token}" not listed in manifest`);
      else if (d.type === 'token-not-in-tokens-json') report.warnings.push(`Manifest token "${d.token}" not found in tokens.json`);
    }
  }

  // Variants/intents/sizes drift
  for (const [key, sourceVals] of [['variants', vis.variants], ['intents', vis.intents], ['sizes', vis.sizes]]) {
    const manifestVals = manifest[key] || [];
    const srcSet = new Set(sourceVals);
    const manSet = new Set(manifestVals);
    for (const v of srcSet) {
      if (!manSet.has(v)) report.warnings.push(`${key} value "${v}" in TSX but missing from manifest`);
    }
    for (const v of manSet) {
      if (!srcSet.has(v)) report.warnings.push(`${key} value "${v}" in manifest but not in TSX type`);
    }
  }

  // Source hash staleness
  if (manifest._meta?.sourceHash && /^[0-9a-f]{16}$/.test(manifest._meta.sourceHash)) {
    if (manifest._meta.sourceHash !== sourceHash) {
      report.info.push(`Source hash changed (manifest: ${manifest._meta.sourceHash}, current: ${sourceHash})`);
    }
  }

  return report;
}

async function main() {
  const args = process.argv.slice(2);
  const all = args.includes('--all');
  const ci = args.includes('--ci');
  const emit = args.includes('--emit');
  const componentIdx = args.indexOf('--component');
  const targetKebab = componentIdx >= 0 ? args[componentIdx + 1] : null;

  if (!all && !targetKebab) {
    console.log('Usage:');
    console.log('  node scripts/build-manifest.mjs --all              # Validate all');
    console.log('  node scripts/build-manifest.mjs --component badge  # Validate one');
    console.log('  node scripts/build-manifest.mjs --component badge --emit  # Scaffold stub');
    console.log('  node scripts/build-manifest.mjs --all --ci         # CI mode (exit 1 on errors)');
    process.exit(0);
  }

  const [allTokens, schema, components] = await Promise.all([
    loadTokenSet(),
    loadSchema(),
    discoverComponents(),
  ]);

  const targets = all ? [...components.values()] : [components.get(targetKebab)].filter(Boolean);

  if (targets.length === 0) {
    console.error(`Component "${targetKebab}" not found in ${STORIES_DIR}`);
    process.exit(1);
  }

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const component of targets) {
    const report = await processComponent(component, allTokens, schema, { emit });

    const hasIssues = report.errors.length > 0 || report.warnings.length > 0;
    if (!hasIssues && !report.info.length && all) continue;

    const icon = report.errors.length > 0 ? '✗' : report.warnings.length > 0 ? '⚠' : '✓';
    console.log(`\n${icon} ${report.name} (${report.kebab})`);

    for (const e of report.errors) console.log(`  ERROR: ${e}`);
    for (const w of report.warnings) console.log(`  WARN:  ${w}`);
    for (const i of report.info) console.log(`  INFO:  ${i}`);

    totalErrors += report.errors.length;
    totalWarnings += report.warnings.length;
  }

  console.log(`\n--- Summary: ${targets.length} components, ${totalErrors} errors, ${totalWarnings} warnings ---`);

  if (ci && totalErrors > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * usage-tracker.mjs
 *
 * Scans DLS component files for cross-imports and builds a dependency graph.
 * Reports: who uses whom, orphan components, most-imported components,
 * and composition chains.
 *
 * Usage:
 *   node scripts/usage-tracker.mjs                    # Full report
 *   node scripts/usage-tracker.mjs --component badge  # Single component
 *   node scripts/usage-tracker.mjs --json             # Machine-readable output
 *   node scripts/usage-tracker.mjs --orphans           # Only show unused components
 *   node scripts/usage-tracker.mjs --ci               # Exit 1 if manifest composition drifts
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, basename, dirname, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const STORIES_DIR = join(ROOT, 'apps/storybook/src/stories');
const MANIFESTS_DIR = join(ROOT, 'specs/components/manifests');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function kebabToPascal(s) {
  return s.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
}

function pascalToKebab(s) {
  return s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// ---------------------------------------------------------------------------
// Component discovery
// ---------------------------------------------------------------------------

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

      for (const sub of subEntries) {
        if (!sub.endsWith('.tsx')) continue;
        const subPascal = basename(sub, '.tsx');
        components.set(subPascal, {
          pascal: subPascal,
          kebab: pascalToKebab(subPascal),
          dir: kebab,
          path: join(full, sub),
          isStory: sub.endsWith('.stories.tsx'),
        });
      }
    } else if (entry.name.endsWith('.tsx')) {
      const pascal = basename(entry.name, '.tsx');
      if (entry.name.endsWith('.stories.tsx')) {
        const compPascal = basename(entry.name, '.stories.tsx');
        components.set(`${compPascal}.stories`, {
          pascal: compPascal,
          kebab: pascalToKebab(compPascal),
          dir: null,
          path: full,
          isStory: true,
        });
      } else {
        components.set(pascal, {
          pascal,
          kebab: pascalToKebab(pascal),
          dir: null,
          path: full,
          isStory: false,
        });
      }
    }
  }

  return components;
}

// ---------------------------------------------------------------------------
// Import scanning
// ---------------------------------------------------------------------------

async function scanImports(filePath) {
  const content = await readFile(filePath, 'utf8');
  const imports = [];

  const importRe = /import\s+\{([^}]+)\}\s+from\s+['"](\.[^'"]+)['"]/g;
  let m;
  while ((m = importRe.exec(content)) !== null) {
    const names = m[1].split(',').map(s => {
      const trimmed = s.trim();
      const asMatch = trimmed.match(/^(\w+)\s+as\s+(\w+)$/);
      return asMatch ? asMatch[1] : trimmed;
    }).filter(s => s && /^[A-Z]/.test(s));

    const importPath = m[2];
    imports.push({ names, importPath, sourcePath: filePath });
  }

  const defaultImportRe = /import\s+(\w+)\s+from\s+['"](\.[^'"]+)['"]/g;
  while ((m = defaultImportRe.exec(content)) !== null) {
    if (/^[A-Z]/.test(m[1])) {
      imports.push({ names: [m[1]], importPath: m[2], sourcePath: filePath });
    }
  }

  return imports;
}

// ---------------------------------------------------------------------------
// Graph building
// ---------------------------------------------------------------------------

async function buildDependencyGraph() {
  const components = await discoverComponents();
  const graph = {
    nodes: new Map(),
    edges: [],
  };

  const sourceComponents = new Map();
  for (const [key, comp] of components) {
    if (!comp.isStory && !['Header', 'Page'].includes(comp.pascal)) {
      sourceComponents.set(comp.pascal, comp);
      graph.nodes.set(comp.pascal, { ...comp, usedBy: [], uses: [] });
    }
  }

  const allFiles = [...components.values()].filter(c => !['Header', 'Page'].includes(c.pascal));

  for (const comp of allFiles) {
    const imports = await scanImports(comp.path);
    const consumer = comp.isStory ? comp.pascal : comp.pascal;

    for (const imp of imports) {
      if (!imp.importPath.startsWith('../') && !imp.importPath.startsWith('./')) continue;
      if (imp.importPath.includes('_helpers') || imp.importPath.includes('_fixtures') || imp.importPath.includes('assets/')) continue;

      for (const name of imp.names) {
        const node = graph.nodes.get(name);
        if (!node) continue;

        const consumerNode = graph.nodes.get(consumer);
        const edgeType = comp.isStory ? 'story' : 'component';

        if (consumer !== name) {
          graph.edges.push({ from: consumer, to: name, type: edgeType, file: relative(STORIES_DIR, comp.path) });

          node.usedBy.push({ name: consumer, type: edgeType });
          if (consumerNode) consumerNode.uses.push({ name, type: edgeType });
        }
      }
    }
  }

  return graph;
}

// ---------------------------------------------------------------------------
// Manifest composition check
// ---------------------------------------------------------------------------

async function loadManifestComposition() {
  const compositions = new Map();
  let entries;
  try {
    entries = await readdir(MANIFESTS_DIR);
  } catch {
    return compositions;
  }

  for (const file of entries) {
    if (!file.endsWith('.json')) continue;
    const manifest = JSON.parse(await readFile(join(MANIFESTS_DIR, file), 'utf8'));
    if (manifest.composition?.allowedChildren) {
      compositions.set(manifest.name, {
        allowedChildren: new Set(manifest.composition.allowedChildren),
        forbiddenChildren: new Set(manifest.composition.forbiddenChildren || []),
      });
    }
  }

  return compositions;
}

function detectCompositionDrift(graph, compositions) {
  const drift = [];

  for (const [parent, rules] of compositions) {
    const node = graph.nodes.get(parent);
    if (!node) continue;

    const actualChildren = new Set(
      node.uses.filter(u => u.type === 'component').map(u => u.name)
    );

    for (const child of actualChildren) {
      if (rules.forbiddenChildren.has(child)) {
        drift.push({ type: 'forbidden-child-used', parent, child });
      }
    }

    for (const allowed of rules.allowedChildren) {
      if (!graph.nodes.has(allowed)) continue;
      // Not an error if an allowed child isn't used — it's just allowed, not required
    }

    for (const child of actualChildren) {
      if (rules.allowedChildren.size > 0 && !rules.allowedChildren.has(child)) {
        drift.push({ type: 'unlisted-child', parent, child });
      }
    }
  }

  return drift;
}

// ---------------------------------------------------------------------------
// Reporting
// ---------------------------------------------------------------------------

function printFullReport(graph) {
  const nodes = [...graph.nodes.values()].filter(n => !n.isStory);

  // Most imported
  const byUsage = nodes
    .map(n => ({ name: n.pascal, componentUses: n.usedBy.filter(u => u.type === 'component').length, storyUses: n.usedBy.filter(u => u.type === 'story').length }))
    .sort((a, b) => b.componentUses - a.componentUses);

  console.log('=== Most-used components (by other components) ===\n');
  const top = byUsage.filter(n => n.componentUses > 0);
  if (top.length === 0) {
    console.log('  (no cross-component imports found)\n');
  } else {
    for (const n of top) {
      console.log(`  ${n.name}: ${n.componentUses} component${n.componentUses === 1 ? '' : 's'}, ${n.storyUses} stor${n.storyUses === 1 ? 'y' : 'ies'}`);
    }
    console.log();
  }

  // Orphans — not imported by any other component
  const orphans = nodes.filter(n => n.usedBy.filter(u => u.type === 'component').length === 0);
  console.log(`=== Leaf components (${orphans.length} — not imported by other components) ===\n`);
  for (const n of orphans.sort((a, b) => a.pascal.localeCompare(b.pascal))) {
    const storyCount = n.usedBy.filter(u => u.type === 'story').length;
    console.log(`  ${n.pascal}${storyCount > 0 ? ` (${storyCount} stor${storyCount === 1 ? 'y' : 'ies'})` : ' (no stories)'}`);
  }
  console.log();

  // Summary
  console.log(`--- Summary: ${nodes.length} components, ${graph.edges.filter(e => e.type === 'component').length} component edges, ${graph.edges.filter(e => e.type === 'story').length} story edges ---`);
}

function printComponentReport(graph, componentName) {
  const node = graph.nodes.get(componentName);
  if (!node) {
    console.error(`Component "${componentName}" not found.`);
    const suggestions = [...graph.nodes.keys()].filter(k => k.toLowerCase().includes(componentName.toLowerCase()));
    if (suggestions.length > 0) console.error(`Did you mean: ${suggestions.join(', ')}?`);
    process.exit(1);
  }

  console.log(`\n${node.pascal} (${node.kebab})`);
  console.log(`Path: ${relative(ROOT, node.path)}\n`);

  const compUsers = node.usedBy.filter(u => u.type === 'component');
  const storyUsers = node.usedBy.filter(u => u.type === 'story');

  if (compUsers.length > 0) {
    console.log('Used by components:');
    for (const u of compUsers) console.log(`  ← ${u.name}`);
  } else {
    console.log('Used by components: (none — leaf component)');
  }

  if (storyUsers.length > 0) {
    console.log('Used in stories:');
    for (const u of storyUsers) console.log(`  ← ${u.name}`);
  }

  const compDeps = node.uses.filter(u => u.type === 'component');
  if (compDeps.length > 0) {
    console.log('Depends on:');
    for (const u of compDeps) console.log(`  → ${u.name}`);
  } else {
    console.log('Depends on: (none — standalone)');
  }

  console.log();
}

function printJsonReport(graph) {
  const nodes = [...graph.nodes.values()].filter(n => !n.isStory);
  const output = {
    components: nodes.map(n => ({
      name: n.pascal,
      kebab: n.kebab,
      usedBy: n.usedBy.filter(u => u.type === 'component').map(u => u.name),
      uses: n.uses.filter(u => u.type === 'component').map(u => u.name),
      storyImports: n.usedBy.filter(u => u.type === 'story').map(u => u.name),
    })),
    edges: graph.edges.filter(e => e.type === 'component').map(e => ({ from: e.from, to: e.to })),
    summary: {
      totalComponents: nodes.length,
      componentEdges: graph.edges.filter(e => e.type === 'component').length,
      storyEdges: graph.edges.filter(e => e.type === 'story').length,
      orphans: nodes.filter(n => n.usedBy.filter(u => u.type === 'component').length === 0).map(n => n.pascal),
    },
  };
  console.log(JSON.stringify(output, null, 2));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const ci = args.includes('--ci');
  const json = args.includes('--json');
  const orphansOnly = args.includes('--orphans');
  const componentIdx = args.indexOf('--component');
  const targetName = componentIdx >= 0 ? args[componentIdx + 1] : null;

  const graph = await buildDependencyGraph();

  if (targetName) {
    const pascal = kebabToPascal(targetName);
    const found = graph.nodes.has(pascal) ? pascal : graph.nodes.has(targetName) ? targetName : null;
    if (!found) {
      console.error(`Component "${targetName}" not found.`);
      process.exit(1);
    }
    printComponentReport(graph, found);
    return;
  }

  if (json) {
    printJsonReport(graph);
    return;
  }

  if (orphansOnly) {
    const nodes = [...graph.nodes.values()].filter(n => !n.isStory);
    const orphans = nodes.filter(n => n.usedBy.filter(u => u.type === 'component').length === 0);
    for (const n of orphans.sort((a, b) => a.pascal.localeCompare(b.pascal))) {
      console.log(n.pascal);
    }
    return;
  }

  printFullReport(graph);

  // Composition drift check
  const compositions = await loadManifestComposition();
  const drift = detectCompositionDrift(graph, compositions);
  if (drift.length > 0) {
    console.log('\n=== Composition drift ===\n');
    for (const d of drift) {
      if (d.type === 'forbidden-child-used') {
        console.log(`  ERROR: ${d.parent} uses forbidden child ${d.child}`);
      } else if (d.type === 'unlisted-child') {
        console.log(`  WARN:  ${d.parent} uses ${d.child} but it's not in allowedChildren`);
      }
    }
    console.log();
  }

  if (ci && drift.some(d => d.type === 'forbidden-child-used')) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

/**
 * DLS-Lead: Figma 4-layer variable sync
 *
 * Three operations in one file — run any of them via Figma Console MCP
 * (figma_execute) or paste into Figma DevTools console.
 *
 * Usage (pick one):
 *   addVariables()    — create 4-layer semantic variables aliased to primitives
 *   cleanup()         — remove deprecated names, verify/fix aliases
 *   rebindComponents() — walk nodes and rebind fills/strokes to 4-layer variables
 */

/* ─── Shared data ──────────────────────────────────────────────────────── */

const SEMANTIC_VARS = [
  { name: 'surface/base',     desc: 'Primary app surface',      default: 'neutral/0',   dark: 'neutral/950' },
  { name: 'surface/subtle',   desc: 'Secondary surface',        default: 'neutral/50',  dark: 'neutral/900' },
  { name: 'surface/muted',    desc: 'Tertiary surface',         default: 'neutral/100', dark: 'neutral/800' },
  { name: 'surface/strong',   desc: 'Strong surface',           default: 'neutral/300', dark: 'neutral/700' },
  { name: 'surface/inverse',  desc: 'Inverted surface',         default: 'neutral/900', dark: 'neutral/0' },
  { name: 'surface/disabled', desc: 'Disabled surface',         default: 'neutral/50',  dark: 'neutral/800' },

  { name: 'text/primary',     desc: 'Primary text and icons',   default: 'neutral/900', dark: 'neutral/0' },
  { name: 'text/secondary',   desc: 'Secondary text',           default: 'neutral/700', dark: 'neutral/200' },
  { name: 'text/inverse',     desc: 'Text on inverse surfaces', default: 'neutral/0',   dark: 'neutral/950' },
  { name: 'text/disabled',    desc: 'Disabled text',            default: 'neutral/500', dark: 'neutral/500' },
  { name: 'text/placeholder', desc: 'Placeholder text',         default: 'neutral/600', dark: 'neutral/400' },

  { name: 'border/base',      desc: 'Default border',               default: 'neutral/300', dark: 'neutral/600' },
  { name: 'border/subtle',    desc: 'Subtle border',                default: 'neutral/200', dark: 'neutral/700' },
  { name: 'border/strong',    desc: 'Strong border',                default: 'neutral/500', dark: 'neutral/400' },
  { name: 'border/focus',     desc: 'Focus border',                 default: 'neutral/700', dark: 'neutral/100' },
  { name: 'border/disabled',  desc: 'Disabled border',              default: 'neutral/200', dark: 'neutral/700' },
  { name: 'border/inverse',   desc: 'Border on inverse/dark surfaces', default: 'neutral/0', dark: 'neutral/950' },

  { name: 'intent/primary/base',    desc: 'Primary intent filled',       default: 'primary/700', dark: 'primary/600' },
  { name: 'intent/primary/on-base', desc: 'Foreground on primary base',  default: 'neutral/0',   dark: 'neutral/0' },
  { name: 'intent/primary/subtle',  desc: 'Primary subtle bg',           default: 'primary/50',  dark: 'primary/900' },
  { name: 'intent/primary/strong',  desc: 'Primary strong',              default: 'primary/800', dark: 'primary/500' },
  { name: 'intent/primary/text',    desc: 'Primary text',                default: 'primary/900', dark: 'primary/300' },
  { name: 'intent/primary/border',  desc: 'Primary border',              default: 'primary/200', dark: 'primary/600' },

  { name: 'intent/success/base',    desc: 'Success filled',              default: 'success/700', dark: 'success/500' },
  { name: 'intent/success/on-base', desc: 'Foreground on success base',  default: 'neutral/0',   dark: 'neutral/950' },
  { name: 'intent/success/subtle',  desc: 'Success subtle',              default: 'success/50',  dark: 'success/900' },
  { name: 'intent/success/strong',  desc: 'Success strong',              default: 'success/800', dark: 'success/400' },
  { name: 'intent/success/text',    desc: 'Success text',                default: 'success/900', dark: 'success/300' },
  { name: 'intent/success/border',  desc: 'Success border',              default: 'success/200', dark: 'success/600' },

  { name: 'intent/warning/base',    desc: 'Warning filled',              default: 'warning/700', dark: 'warning/500' },
  { name: 'intent/warning/on-base', desc: 'Foreground on warning base',  default: 'neutral/0',   dark: 'neutral/950' },
  { name: 'intent/warning/subtle',  desc: 'Warning subtle',              default: 'warning/50',  dark: 'warning/900' },
  { name: 'intent/warning/strong',  desc: 'Warning strong',              default: 'warning/800', dark: 'warning/400' },
  { name: 'intent/warning/text',    desc: 'Warning text',                default: 'warning/900', dark: 'warning/300' },
  { name: 'intent/warning/border',  desc: 'Warning border',              default: 'warning/200', dark: 'warning/600' },

  { name: 'intent/danger/base',    desc: 'Danger filled',               default: 'danger/600', dark: 'danger/600' },
  { name: 'intent/danger/on-base', desc: 'Foreground on danger base',   default: 'neutral/0',  dark: 'neutral/0' },
  { name: 'intent/danger/subtle',  desc: 'Danger subtle',               default: 'danger/50',  dark: 'danger/900' },
  { name: 'intent/danger/strong',  desc: 'Danger strong',               default: 'danger/700', dark: 'danger/500' },
  { name: 'intent/danger/text',    desc: 'Danger text',                 default: 'danger/900', dark: 'danger/300' },
  { name: 'intent/danger/border',  desc: 'Danger border',               default: 'danger/200', dark: 'danger/600' },

  { name: 'intent/info/base',    desc: 'Info filled',               default: 'info/700', dark: 'info/600' },
  { name: 'intent/info/on-base', desc: 'Foreground on info base',   default: 'neutral/0', dark: 'neutral/0' },
  { name: 'intent/info/subtle',  desc: 'Info subtle',               default: 'info/50',  dark: 'info/900' },
  { name: 'intent/info/strong',  desc: 'Info strong',               default: 'info/800', dark: 'info/500' },
  { name: 'intent/info/text',    desc: 'Info text',                 default: 'info/900', dark: 'info/300' },
  { name: 'intent/info/border',  desc: 'Info border',               default: 'info/200', dark: 'info/600' },

  { name: 'intent/neutral/base',    desc: 'Neutral filled',              default: 'neutral/800', dark: 'neutral/50' },
  { name: 'intent/neutral/on-base', desc: 'Foreground on neutral base',  default: 'neutral/0',   dark: 'neutral/950' },
  { name: 'intent/neutral/subtle',  desc: 'Neutral subtle',              default: 'neutral/50',  dark: 'neutral/800' },
  { name: 'intent/neutral/strong',  desc: 'Neutral strong',              default: 'neutral/900', dark: 'neutral/100' },
  { name: 'intent/neutral/text',    desc: 'Neutral text',                default: 'neutral/900', dark: 'neutral/200' },
  { name: 'intent/neutral/border',  desc: 'Neutral border',              default: 'neutral/200', dark: 'neutral/700' },

  { name: 'state/focus/ring', desc: 'Focus ring color', default: 'info/300', dark: 'info/400' },
];

const OVERLAY_VARS = [
  {
    name: 'overlay/scrim',
    desc: 'Scrim behind modals and overlays.',
    defaultRgba: { r: 0, g: 0, b: 0, a: 0.5 },
    darkRgba:    { r: 0, g: 0, b: 0, a: 0.5 },
  },
  {
    name: 'overlay/backdrop',
    desc: 'Lighter backdrop for non-blocking overlays.',
    defaultRgba: { r: 0, g: 0, b: 0, a: 0.3 },
    darkRgba:    { r: 0, g: 0, b: 0, a: 0.3 },
  },
  {
    name: 'state/hover-overlay',
    desc: 'Opacity overlay for hover state. Apply as second fill layer in Figma.',
    defaultRgba: { r: 0, g: 0, b: 0, a: 0.05 },
    darkRgba:    { r: 1, g: 1, b: 1, a: 0.08 },
  },
  {
    name: 'state/pressed-overlay',
    desc: 'Opacity overlay for pressed state. Apply as second fill layer in Figma.',
    defaultRgba: { r: 0, g: 0, b: 0, a: 0.10 },
    darkRgba:    { r: 1, g: 1, b: 1, a: 0.15 },
  },
];

const DEPRECATED_NAMES = {
  'bg/white':        'surface/base',
  'bg/light':        'surface/subtle',
  'bg/pale':         'surface/muted',
  'text/dark':       'text/primary',
  'text/muted':      'text/secondary',
  'border/light':    'border/subtle',
  'border/default':  'border/base',
};

const LEGACY_TO_4LAYER = {
  'border/normal':  'border/default',
  'border/base':    'border/default',
  'border/default': 'border/default',
  'border/light':   'border/subtle',
  'border/dark':    'border/strong',

  'bg/white':  'surface/base',
  'bg/light':  'surface/subtle',
  'bg/medium': 'surface/muted',
  'bg/heavy':  'surface/strong',
  'bg/dark':   'surface/inverse',

  'fg/primary':   'text/primary',
  'fg/secondary': 'text/secondary',
  'fg/white':     'text/inverse',

  'primary/default':       'intent/primary/bg-base',
  'primary/light':         'intent/primary/bg-subtle',
  'primary/dark':          'intent/primary/bg-strong',
  'primary/border':        'intent/primary/border',
  'intent/primary/base':   'intent/primary/bg-base',
  'intent/primary/subtle': 'intent/primary/bg-subtle',
  'intent/primary/strong': 'intent/primary/bg-strong',

  'success/default':       'intent/success/bg-base',
  'success/light':         'intent/success/bg-subtle',
  'success/dark':          'intent/success/bg-strong',
  'success/border':        'intent/success/border',
  'intent/success/base':   'intent/success/bg-base',
  'intent/success/subtle': 'intent/success/bg-subtle',
  'intent/success/strong': 'intent/success/bg-strong',

  'warning/default':       'intent/warning/bg-base',
  'warning/light':         'intent/warning/bg-subtle',
  'warning/dark':          'intent/warning/bg-strong',
  'warning/border':        'intent/warning/border',
  'intent/warning/base':   'intent/warning/bg-base',
  'intent/warning/subtle': 'intent/warning/bg-subtle',
  'intent/warning/strong': 'intent/warning/bg-strong',

  'danger/default':       'intent/danger/bg-base',
  'danger/light':         'intent/danger/bg-subtle',
  'danger/dark':          'intent/danger/bg-strong',
  'danger/border':        'intent/danger/border',
  'intent/danger/base':   'intent/danger/bg-base',
  'intent/danger/subtle': 'intent/danger/bg-subtle',
  'intent/danger/strong': 'intent/danger/bg-strong',

  'info/default':       'intent/info/bg-base',
  'info/light':         'intent/info/bg-subtle',
  'info/dark':          'intent/info/bg-strong',
  'info/border':        'intent/info/border',
  'intent/info/base':   'intent/info/bg-base',
  'intent/info/subtle': 'intent/info/bg-subtle',
  'intent/info/strong': 'intent/info/bg-strong',

  'intent/neutral/base':   'intent/neutral/bg-base',
  'intent/neutral/subtle': 'intent/neutral/bg-subtle',
  'intent/neutral/strong': 'intent/neutral/bg-strong',
};

/* ─── Helpers ──────────────────────────────────────────────────────────── */

async function getCollections() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const semantic   = collections.find((c) => c.name === 'color-semantic');
  const primitives = collections.find((c) => c.name === 'color-primitives');
  if (!semantic || !primitives) {
    throw new Error('Need both color-semantic and color-primitives collections.');
  }
  return { semantic, primitives };
}

async function buildPrimitiveMap(primitivesColl) {
  const map = {};
  for (const id of primitivesColl.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v) map[v.name] = v;
  }
  return map;
}

function makeAlias(primByName, name) {
  const p = primByName[name];
  return p ? figma.variables.createVariableAlias(p) : null;
}

async function buildExistingMap(semanticColl) {
  const byName = {};
  const idByName = {};
  for (const id of semanticColl.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v) { byName[v.name] = v; idByName[v.name] = id; }
  }
  return { byName, idByName };
}

/* ─── 1. Add variables ─────────────────────────────────────────────────── */

async function addVariables() {
  const { semantic, primitives } = await getCollections();
  const modeDefault = semantic.modes[0].modeId;
  const modeDark    = semantic.modes[1].modeId;
  const primByName  = await buildPrimitiveMap(primitives);
  const { byName }  = await buildExistingMap(semantic);
  const existing    = new Set(Object.keys(byName));

  let created = 0;
  const missing = [];

  for (const def of SEMANTIC_VARS) {
    if (existing.has(def.name)) continue;
    const aDefault = makeAlias(primByName, def.default);
    const aDark    = makeAlias(primByName, def.dark);
    if (!aDefault || !aDark) {
      missing.push(def.name + ' (need ' + def.default + ', ' + def.dark + ')');
      continue;
    }
    try {
      const v = figma.variables.createVariable(def.name, semantic, 'COLOR');
      v.setValueForMode(modeDefault, aDefault);
      v.setValueForMode(modeDark, aDark);
      if (def.desc) v.description = def.desc;
      created++;
    } catch (e) {
      missing.push(def.name + ': ' + e.message);
    }
  }

  for (const def of OVERLAY_VARS) {
    if (existing.has(def.name)) continue;
    try {
      const v = figma.variables.createVariable(def.name, semantic, 'COLOR');
      v.setValueForMode(modeDefault, def.defaultRgba);
      v.setValueForMode(modeDark, def.darkRgba);
      if (def.desc) v.description = def.desc;
      created++;
    } catch (e) {
      missing.push(def.name + ': ' + e.message);
    }
  }

  console.log('addVariables: created ' + created + ', skipped/missing ' + missing.length);
  if (missing.length) console.log('Missing:', missing);
  return { created, missing };
}

/* ─── 2. Cleanup ───────────────────────────────────────────────────────── */

async function cleanup() {
  const { semantic, primitives } = await getCollections();
  const modeDefault = semantic.modes[0].modeId;
  const modeDark    = semantic.modes[1]?.modeId;
  const primByName  = await buildPrimitiveMap(primitives);
  const { byName, idByName } = await buildExistingMap(semantic);

  let removed = 0;
  let created = 0;
  const issues = [];

  for (const oldName of Object.keys(DEPRECATED_NAMES)) {
    if (!byName[oldName]) continue;
    try {
      const v = await figma.variables.getVariableByIdAsync(idByName[oldName]);
      if (v) { await figma.variables.deleteVariable(v); removed++; console.log('  removed: ' + oldName); }
    } catch (e) {
      issues.push('remove ' + oldName + ': ' + e.message);
    }
  }

  for (const def of SEMANTIC_VARS) {
    const existing = byName[def.name];
    if (existing) {
      try {
        const expectedDefault = makeAlias(primByName, def.default);
        const expectedDark    = modeDark ? makeAlias(primByName, def.dark) : null;
        const currentDefault  = await existing.getValueForMode(modeDefault);
        const currentDark     = modeDark ? await existing.getValueForMode(modeDark) : null;
        if (JSON.stringify(currentDefault) !== JSON.stringify(expectedDefault) ||
            (modeDark && JSON.stringify(currentDark) !== JSON.stringify(expectedDark))) {
          existing.setValueForMode(modeDefault, expectedDefault);
          if (modeDark && expectedDark) existing.setValueForMode(modeDark, expectedDark);
          console.log('  fixed: ' + def.name);
        }
      } catch (e) { issues.push(def.name + ': ' + e.message); }
    } else {
      const aDefault = makeAlias(primByName, def.default);
      const aDark    = modeDark ? makeAlias(primByName, def.dark) : null;
      if (!aDefault || (modeDark && !aDark)) { issues.push(def.name + ' (missing primitives)'); continue; }
      try {
        const v = figma.variables.createVariable(def.name, semantic, 'COLOR');
        v.setValueForMode(modeDefault, aDefault);
        if (modeDark && aDark) v.setValueForMode(modeDark, aDark);
        created++;
        console.log('  created: ' + def.name);
      } catch (e) { issues.push(def.name + ': ' + e.message); }
    }
  }

  for (const def of OVERLAY_VARS) {
    const existing = byName[def.name];
    if (existing) {
      try {
        existing.setValueForMode(modeDefault, def.defaultRgba);
        if (modeDark) existing.setValueForMode(modeDark, def.darkRgba);
      } catch (e) { issues.push(def.name + ': ' + e.message); }
    } else {
      try {
        const v = figma.variables.createVariable(def.name, semantic, 'COLOR');
        v.setValueForMode(modeDefault, def.defaultRgba);
        if (modeDark) v.setValueForMode(modeDark, def.darkRgba);
        if (def.desc) v.description = def.desc;
        created++;
      } catch (e) { issues.push(def.name + ': ' + e.message); }
    }
  }

  console.log('cleanup: removed ' + removed + ', created ' + created + ', issues ' + issues.length);
  if (issues.length) console.log('Issues:', issues);
  return { removed, created, issues };
}

/* ─── 3. Rebind components ─────────────────────────────────────────────── */

async function rebindComponents(currentPageOnly) {
  const { semantic } = await getCollections();
  if (!currentPageOnly) await figma.loadAllPagesAsync();

  const variableById   = new Map();
  const variableByName = new Map();
  for (const id of semantic.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v) { variableById.set(v.id, v); variableByName.set(v.name, v); }
  }

  let fillsUpdated   = 0;
  let strokesUpdated = 0;
  const updatedNodes  = [];

  function getNewVariable(legacyName) {
    const newName = LEGACY_TO_4LAYER[legacyName];
    return newName ? variableByName.get(newName) : null;
  }

  function processPaints(paints, isStroke) {
    if (!paints || !Array.isArray(paints)) return paints;
    let changed = false;
    const next = paints.map((p) => {
      if (p.type !== 'SOLID') return p;
      const bound = p.boundVariables && p.boundVariables.color;
      if (!bound || !bound.id) return p;
      const v = variableById.get(bound.id);
      if (!v) return p;
      const newVar = getNewVariable(v.name);
      if (!newVar) return p;
      changed = true;
      if (isStroke) strokesUpdated++; else fillsUpdated++;
      return figma.variables.setBoundVariableForPaint(p, 'color', newVar);
    });
    return changed ? next : paints;
  }

  function walk(node) {
    if (!node) return;
    if ('fills' in node && node.fills !== figma.mixed) {
      const next = processPaints(Array.isArray(node.fills) ? node.fills : [], false);
      if (next !== node.fills) { node.fills = next; updatedNodes.push({ id: node.id, name: node.name, type: 'fills' }); }
    }
    if ('strokes' in node && node.strokes !== figma.mixed) {
      const next = processPaints(Array.isArray(node.strokes) ? node.strokes : [], true);
      if (next !== node.strokes) { node.strokes = next; updatedNodes.push({ id: node.id, name: node.name, type: 'strokes' }); }
    }
    if ('effects' in node && node.effects && node.effects.length > 0) {
      for (let i = 0; i < node.effects.length; i++) {
        const e = node.effects[i];
        if (e.type !== 'DROP_SHADOW' && e.type !== 'INNER_SHADOW') continue;
        const bound = e.boundVariables && e.boundVariables.color;
        if (!bound || !bound.id) continue;
        const v = variableById.get(bound.id);
        if (!v) continue;
        const newVar = getNewVariable(v.name);
        if (!newVar) continue;
        const nextEffects = [...node.effects];
        nextEffects[i] = figma.variables.setBoundVariableForEffect(e, 'color', newVar);
        node.effects = nextEffects;
        updatedNodes.push({ id: node.id, name: node.name, type: 'effects' });
      }
    }
    if ('children' in node) {
      for (const child of node.children) walk(child);
    }
  }

  if (currentPageOnly) {
    walk(figma.currentPage);
  } else {
    for (const page of figma.root.children) {
      if (page.type === 'PAGE') walk(page);
    }
  }

  console.log('rebind: fills=' + fillsUpdated + ', strokes=' + strokesUpdated +
    ', nodes=' + updatedNodes.length + (currentPageOnly ? ' (current page)' : ' (all pages)'));
  if (updatedNodes.length) console.log('Updated (first 20):', updatedNodes.slice(0, 20));
  return { fillsUpdated, strokesUpdated, updatedCount: updatedNodes.length };
}

/* ─── Entry point — uncomment the operation you need ───────────────────── */

// addVariables();
// cleanup();
// rebindComponents(false);  // pass true for current page only

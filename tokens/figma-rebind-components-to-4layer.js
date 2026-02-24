/**
 * DLS-Lead: Rebind component fills and strokes from legacy variables to 4-layer variables
 *
 * Run in Figma: Plugins → Development → Open console, then paste and run this script.
 * Run AFTER figma-add-4layer-variables.js so the new variables exist.
 *
 * Set CURRENT_PAGE_ONLY = true below to rebind only the current page (faster on large files).
 */

const CURRENT_PAGE_ONLY = false; // set true to run on current page only

(async function () {
  const LEGACY_TO_4LAYER = {
    // Border
    'border/normal': 'border/default',
    'border/base': 'border/default',
    'border/default': 'border/default',
    'border/light': 'border/subtle',
    'border/dark': 'border/strong',
    // Surface / background
    'bg/white': 'surface/base',
    'bg/light': 'surface/subtle',
    'bg/medium': 'surface/muted',
    'bg/heavy': 'surface/strong',
    'bg/dark': 'surface/inverse',
    // Text / foreground
    'fg/primary': 'text/primary',
    'fg/secondary': 'text/secondary',
    'fg/white': 'text/inverse',
    // Intent (primary, etc.) — old base/subtle/strong → bg-base, bg-subtle, bg-strong
    'primary/default': 'intent/primary/bg-base',
    'primary/light': 'intent/primary/bg-subtle',
    'primary/dark': 'intent/primary/bg-strong',
    'primary/border': 'intent/primary/border',
    'intent/primary/base': 'intent/primary/bg-base',
    'intent/primary/subtle': 'intent/primary/bg-subtle',
    'intent/primary/strong': 'intent/primary/bg-strong',
    'success/default': 'intent/success/bg-base',
    'success/light': 'intent/success/bg-subtle',
    'success/dark': 'intent/success/bg-strong',
    'success/border': 'intent/success/border',
    'intent/success/base': 'intent/success/bg-base',
    'intent/success/subtle': 'intent/success/bg-subtle',
    'intent/success/strong': 'intent/success/bg-strong',
    'warning/default': 'intent/warning/bg-base',
    'warning/light': 'intent/warning/bg-subtle',
    'warning/dark': 'intent/warning/bg-strong',
    'warning/border': 'intent/warning/border',
    'intent/warning/base': 'intent/warning/bg-base',
    'intent/warning/subtle': 'intent/warning/bg-subtle',
    'intent/warning/strong': 'intent/warning/bg-strong',
    'danger/default': 'intent/danger/bg-base',
    'danger/light': 'intent/danger/bg-subtle',
    'danger/dark': 'intent/danger/bg-strong',
    'danger/border': 'intent/danger/border',
    'intent/danger/base': 'intent/danger/bg-base',
    'intent/danger/subtle': 'intent/danger/bg-subtle',
    'intent/danger/strong': 'intent/danger/bg-strong',
    'info/default': 'intent/info/bg-base',
    'info/light': 'intent/info/bg-subtle',
    'info/dark': 'intent/info/bg-strong',
    'info/border': 'intent/info/border',
    'intent/info/base': 'intent/info/bg-base',
    'intent/info/subtle': 'intent/info/bg-subtle',
    'intent/info/strong': 'intent/info/bg-strong',
    'intent/neutral/base': 'intent/neutral/bg-base',
    'intent/neutral/subtle': 'intent/neutral/bg-subtle',
    'intent/neutral/strong': 'intent/neutral/bg-strong',
  };

  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const semanticColl = collections.find((c) => c.name === 'color-semantic');
  if (!semanticColl) {
    console.error('DLS-Lead: color-semantic collection not found.');
    return { error: 'Missing color-semantic' };
  }

  if (!CURRENT_PAGE_ONLY) await figma.loadAllPagesAsync();

  const variableById = new Map();
  const variableByName = new Map();
  for (const id of semanticColl.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v) {
      variableById.set(v.id, v);
      variableByName.set(v.name, v);
    }
  }

  function getVariableNameForId(id) {
    const v = variableById.get(id);
    return v ? v.name : null;
  }

  function getNewVariable(legacyName) {
    const newName = LEGACY_TO_4LAYER[legacyName];
    return newName ? variableByName.get(newName) : null;
  }

  let fillsUpdated = 0;
  let strokesUpdated = 0;
  const updatedNodes = [];

  function processPaints(paints, isStroke) {
    if (!paints || !Array.isArray(paints)) return paints;
    let changed = false;
    const next = paints.map((p) => {
      if (p.type !== 'SOLID') return p;
      const bound = p.boundVariables && p.boundVariables.color;
      if (!bound || !bound.id) return p;
      const currentName = getVariableNameForId(bound.id);
      if (!currentName) return p;
      const newVar = getNewVariable(currentName);
      if (!newVar) return p;
      changed = true;
      if (isStroke) strokesUpdated++;
      else fillsUpdated++;
      return figma.variables.setBoundVariableForPaint(p, 'color', newVar);
    });
    return changed ? next : paints;
  }

  function walk(node) {
    if (!node) return;
    if ('fills' in node && node.fills !== figma.mixed) {
      const nextFills = processPaints(Array.isArray(node.fills) ? node.fills : [], false);
      if (nextFills !== node.fills) {
        node.fills = nextFills;
        updatedNodes.push({ id: node.id, name: node.name, type: 'fills' });
      }
    }
    if ('strokes' in node && node.strokes !== figma.mixed) {
      const nextStrokes = processPaints(Array.isArray(node.strokes) ? node.strokes : [], true);
      if (nextStrokes !== node.strokes) {
        node.strokes = nextStrokes;
        updatedNodes.push({ id: node.id, name: node.name, type: 'strokes' });
      }
    }
    if ('effects' in node && node.effects && node.effects.length > 0) {
      for (let i = 0; i < node.effects.length; i++) {
        const e = node.effects[i];
        if (e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW') {
          const bound = e.boundVariables && e.boundVariables.color;
          if (bound && bound.id) {
            const currentName = getVariableNameForId(bound.id);
            const newVar = currentName ? getNewVariable(currentName) : null;
            if (newVar) {
              const nextEffects = [...node.effects];
              nextEffects[i] = figma.variables.setBoundVariableForEffect(e, 'color', newVar);
              node.effects = nextEffects;
              updatedNodes.push({ id: node.id, name: node.name, type: 'effects' });
            }
          }
        }
      }
    }
    if ('children' in node) {
      for (const child of node.children) walk(child);
    }
  }

  if (CURRENT_PAGE_ONLY) {
    walk(figma.currentPage);
  } else {
    for (const page of figma.root.children) {
      if (page.type === 'PAGE') walk(page);
    }
  }
  console.log('DLS-Lead rebind: fills=' + fillsUpdated + ', strokes=' + strokesUpdated + ', nodes touched=' + updatedNodes.length + (CURRENT_PAGE_ONLY ? ' (current page only)' : ''));
  if (updatedNodes.length > 0) console.log('Updated nodes (first 20):', updatedNodes.slice(0, 20));
  return { fillsUpdated, strokesUpdated, updatedCount: updatedNodes.length };
})();

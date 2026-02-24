/**
 * DLS-Lead: Clean up and audit 4-layer semantic variables in Figma
 * 
 * Run in Figma: Plugins → Development → Open console, then paste and run this script.
 * This script:
 * 1. Audits existing variables in color-semantic collection
 * 2. Identifies duplicates (e.g., both 'bg/white' and 'surface/vbase')
 * 3. Removes old naming patterns that should be replaced
 * 4. Ensures all semantic variables are properly aliased to primitives
 * 5. Applies the 4-layer structure: Primitives → System Semantics → State → Component
 */

(async function () {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const semanticColl = collections.find((c) => c.name === 'color-semantic');
  const primitivesColl = collections.find((c) => c.name === 'color-primitives');
  
  if (!semanticColl || !primitivesColl) {
    console.error('DLS-Lead Cleanup: Need both color-semantic and color-primitives collections.');
    return;
  }

  const modeDefault = semanticColl.modes[0].modeId;
  const modeDark = semanticColl.modes[1]?.modeId;
  
  // Map of primitive names for easy lookup
  const primByName = {};
  for (const id of primitivesColl.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v) primByName[v.name] = v;
  }

  function alias(primitiveName) {
    const p = primByName[primitiveName];
    return p ? figma.variables.createVariableAlias(p) : null;
  }

  // Define the canonical 4-layer semantic variables (same as add script)
  const canonicalVars = [
    // Surface tokens
    { name: 'surface/base', default: 'neutral/0', dark: 'neutral/950' },
    { name: 'surface/subtle', default: 'neutral/50', dark: 'neutral/900' },
    { name: 'surface/muted', default: 'neutral/100', dark: 'neutral/800' },
    { name: 'surface/strong', default: 'neutral/300', dark: 'neutral/700' },
    { name: 'surface/inverse', default: 'neutral/900', dark: 'neutral/0' },
    { name: 'surface/disabled', default: 'neutral/50', dark: 'neutral/800' },
    // Text tokens
    { name: 'text/primary', default: 'neutral/900', dark: 'neutral/0' },
    { name: 'text/secondary', default: 'neutral/700', dark: 'neutral/200' },
    { name: 'text/inverse', default: 'neutral/0', dark: 'neutral/950' },
    { name: 'text/disabled', default: 'neutral/500', dark: 'neutral/500' },
    { name: 'text/placeholder', default: 'neutral/600', dark: 'neutral/400' },
    // Border tokens
    { name: 'border/base', default: 'neutral/300', dark: 'neutral/600' },
    { name: 'border/subtle', default: 'neutral/200', dark: 'neutral/700' },
    { name: 'border/strong', default: 'neutral/500', dark: 'neutral/400' },
    { name: 'border/focus', default: 'neutral/700', dark: 'neutral/100' },
    { name: 'border/disabled', default: 'neutral/200', dark: 'neutral/700' },
    { name: 'border/inverse', default: 'neutral/0', dark: 'neutral/950' },
    // Intent tokens - primary
    { name: 'intent/primary/base', default: 'primary/700', dark: 'primary/600' },
    { name: 'intent/primary/subtle', default: 'primary/50', dark: 'primary/900' },
    { name: 'intent/primary/strong', default: 'primary/800', dark: 'primary/500' },
    { name: 'intent/primary/text', default: 'primary/900', dark: 'primary/300' },
    { name: 'intent/primary/border', default: 'primary/200', dark: 'primary/600' },
    // Intent tokens - success
    { name: 'intent/success/base', default: 'success/700', dark: 'success/500' },
    { name: 'intent/success/subtle', default: 'success/50', dark: 'success/900' },
    { name: 'intent/success/strong', default: 'success/800', dark: 'success/400' },
    { name: 'intent/success/text', default: 'success/900', dark: 'success/300' },
    { name: 'intent/success/border', default: 'success/200', dark: 'success/600' },
    // Intent tokens - warning
    { name: 'intent/warning/base', default: 'warning/700', dark: 'warning/500' },
    { name: 'intent/warning/subtle', default: 'warning/50', dark: 'warning/900' },
    { name: 'intent/warning/strong', default: 'warning/800', dark: 'warning/400' },
    { name: 'intent/warning/text', default: 'warning/900', dark: 'warning/300' },
    { name: 'intent/warning/border', default: 'warning/200', dark: 'warning/600' },
    // Intent tokens - danger
    { name: 'intent/danger/base', default: 'danger/600', dark: 'danger/600' },
    { name: 'intent/danger/subtle', default: 'danger/50', dark: 'danger/900' },
    { name: 'intent/danger/strong', default: 'danger/700', dark: 'danger/500' },
    { name: 'intent/danger/text', default: 'danger/900', dark: 'danger/300' },
    { name: 'intent/danger/border', default: 'danger/200', dark: 'danger/600' },
    // Intent tokens - info
    { name: 'intent/info/base', default: 'info/600', dark: 'info/600' },
    { name: 'intent/info/subtle', default: 'info/50', dark: 'info/900' },
    { name: 'intent/info/strong', default: 'info/700', dark: 'info/500' },
    { name: 'intent/info/text', default: 'info/900', dark: 'info/300' },
    { name: 'intent/info/border', default: 'info/200', dark: 'info/600' },
    // Intent tokens - neutral
    { name: 'intent/neutral/base', default: 'neutral/800', dark: 'neutral/50' },
    { name: 'intent/neutral/subtle', default: 'neutral/50', dark: 'neutral/800' },
    { name: 'intent/neutral/strong', default: 'neutral/900', dark: 'neutral/100' },
    { name: 'intent/neutral/text', default: 'neutral/900', dark: 'neutral/200' },
    { name: 'intent/neutral/border', default: 'neutral/200', dark: 'neutral/700' },
    // State tokens
    { name: 'state/focus/ring', default: 'info/300', dark: 'info/400' },
  ];

  // Raw RGBA variables — not primitive aliases; same value in both modes unless noted
  const overlayVars = [
    // color.overlay — semantic overlay colors (scrim, backdrop)
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
    // state overlays — Light: dark overlay to darken; Dark: light overlay to brighten
    {
      name: 'state/hover-overlay',
      desc: 'Opacity overlay for hover state. Apply as second fill layer in Figma.',
      defaultRgba: { r: 0, g: 0, b: 0, a: 0.05 },
      darkRgba: { r: 1, g: 1, b: 1, a: 0.08 },
    },
    {
      name: 'state/pressed-overlay',
      desc: 'Opacity overlay for pressed state. Apply as second fill layer in Figma.',
      defaultRgba: { r: 0, g: 0, b: 0, a: 0.10 },
      darkRgba: { r: 1, g: 1, b: 1, a: 0.15 },
    },
  ];

  // Map old naming patterns to new canonical names (for deduplication)
  const deprecatedPatterns = {
    'bg/white': 'surface/base',
    'bg/light': 'surface/subtle',
    'bg/pale': 'surface/muted',
    'text/dark': 'text/primary',
    'text/muted': 'text/secondary',
    'border/light': 'border/subtle',
    'border/default': 'border/base',  // renamed: default → base to match code conventions
  };

  // Audit: get all existing variables
  const existingVars = {};
  const existingIds = {};
  for (const id of semanticColl.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v) {
      existingVars[v.name] = v;
      existingIds[v.name] = id;
    }
  }

  console.log('=== DLS-Lead Variable Cleanup ===');
  console.log('Existing variables:', Object.keys(existingVars).length);

  // Step 1: Identify deprecated/duplicate variables
  const toRemove = [];
  for (const oldName of Object.keys(deprecatedPatterns)) {
    if (existingVars[oldName]) {
      toRemove.push({
        oldName,
        newName: deprecatedPatterns[oldName],
        id: existingIds[oldName],
      });
    }
  }

  console.log(`Found ${toRemove.length} deprecated/duplicate variables to remove:`, toRemove.map(d => d.oldName));

  // Step 2: Remove deprecated variables
  let removedCount = 0;
  for (const item of toRemove) {
    try {
      const v = await figma.variables.getVariableByIdAsync(item.id);
      if (v) {
        await figma.variables.deleteVariable(v);
        removedCount++;
        console.log(`  ✓ Removed: ${item.oldName}`);
      }
    } catch (e) {
      console.log(`  ✗ Failed to remove ${item.oldName}: ${e.message}`);
    }
  }

  // Step 3: Ensure all canonical variables exist with correct mappings
  let createdCount = 0;
  const issues = [];
  
  for (const def of canonicalVars) {
    const existing = existingVars[def.name];
    
    if (existing) {
      // Variable exists, verify its aliases are correct
      try {
        const defaultValue = await existing.getValueForMode(modeDefault);
        const darkValue = modeDark ? await existing.getValueForMode(modeDark) : null;
        
        // Check if aliases are correct; if not, update them
        const expectedDefaultAlias = alias(def.default);
        const expectedDarkAlias = modeDark ? alias(def.dark) : null;
        
        if (JSON.stringify(defaultValue) !== JSON.stringify(expectedDefaultAlias) ||
            (modeDark && JSON.stringify(darkValue) !== JSON.stringify(expectedDarkAlias))) {
          existing.setValueForMode(modeDefault, expectedDefaultAlias);
          if (modeDark && expectedDarkAlias) {
            existing.setValueForMode(modeDark, expectedDarkAlias);
          }
          console.log(`  ✓ Fixed aliases: ${def.name}`);
        }
      } catch (e) {
        issues.push(`${def.name}: ${e.message}`);
      }
    } else {
      // Variable doesn't exist, create it
      try {
        const aDefault = alias(def.default);
        const aDark = modeDark ? alias(def.dark) : null;
        
        if (!aDefault || (modeDark && !aDark)) {
          issues.push(`${def.name} (missing primitives: ${def.default}, ${def.dark})`);
          continue;
        }
        
        const newVar = figma.variables.createVariable(def.name, semanticColl, 'COLOR');
        newVar.setValueForMode(modeDefault, aDefault);
        if (modeDark && aDark) {
          newVar.setValueForMode(modeDark, aDark);
        }
        createdCount++;
        console.log(`  ✓ Created: ${def.name}`);
      } catch (e) {
        issues.push(`${def.name}: ${e.message}`);
      }
    }
  }

  // Step 4: Ensure overlay variables exist with correct raw RGBA values
  for (const def of overlayVars) {
    const existing = existingVars[def.name];
    if (existing) {
      // Re-apply values to ensure they're correct
      try {
        existing.setValueForMode(modeDefault, def.defaultRgba);
        if (modeDark) existing.setValueForMode(modeDark, def.darkRgba);
        console.log(`  ✓ Verified overlay: ${def.name}`);
      } catch (e) {
        issues.push(`${def.name}: ${e.message}`);
      }
    } else {
      try {
        const v = figma.variables.createVariable(def.name, semanticColl, 'COLOR');
        v.setValueForMode(modeDefault, def.defaultRgba);
        if (modeDark) v.setValueForMode(modeDark, def.darkRgba);
        if (def.desc) v.description = def.desc;
        createdCount++;
        console.log(`  ✓ Created overlay: ${def.name}`);
      } catch (e) {
        issues.push(`${def.name}: ${e.message}`);
      }
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Removed deprecated variables: ${removedCount}`);
  console.log(`Created new variables: ${createdCount}`);
  console.log(`Issues encountered: ${issues.length}`);
  if (issues.length) {
    console.log('Issues:', issues);
  }

  return {
    removed: removedCount,
    created: createdCount,
    issues,
  };
})();

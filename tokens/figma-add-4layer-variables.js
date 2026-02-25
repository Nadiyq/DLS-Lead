/**
 * DLS-Lead: Add 4-layer semantic variables to Figma color-semantic collection
 *
 * Run in Figma: Plugins → Development → Open console, then paste and run this script.
 * Requires the DLS-Lead file open with color-primitives and color-semantic collections.
 *
 * New variables (aliased to primitives):
 *   surface/base, surface/subtle, surface/muted, surface/strong, surface/inverse, surface/disabled
 *   text/primary, text/secondary, text/inverse, text/disabled, text/placeholder
 *   border/base, border/subtle, border/strong, border/focus, border/disabled, border/inverse
 *   intent/primary|success|warning|danger|info|neutral with .base, .on-base, .subtle, .strong, .text, .border
 *   overlay/scrim, overlay/backdrop (raw RGBA, fixed for both modes)
 *   state/hover-overlay, state/pressed-overlay (raw RGBA, not aliases), state/focus/ring
 */

(async function () {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const semanticColl = collections.find((c) => c.name === 'color-semantic');
  const primitivesColl = collections.find((c) => c.name === 'color-primitives');
  if (!semanticColl || !primitivesColl) {
    console.error('DLS-Lead: Need both color-semantic and color-primitives collections.');
    return;
  }
  const modeDefault = semanticColl.modes[0].modeId;
  const modeDark = semanticColl.modes[1].modeId;
  const primByName = {};
  for (const id of primitivesColl.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v) primByName[v.name] = v;
  }
  function alias(name) {
    const p = primByName[name];
    return p ? figma.variables.createVariableAlias(p) : null;
  }
  const newVars = [
    { name: 'surface/base', desc: 'Primary app surface', default: 'neutral/0', dark: 'neutral/950' },
    { name: 'surface/subtle', desc: 'Secondary surface', default: 'neutral/50', dark: 'neutral/900' },
    { name: 'surface/muted', desc: 'Tertiary surface', default: 'neutral/100', dark: 'neutral/800' },
    { name: 'surface/strong', desc: 'Strong surface', default: 'neutral/300', dark: 'neutral/700' },
    { name: 'surface/inverse', desc: 'Inverted surface', default: 'neutral/900', dark: 'neutral/0' },
    { name: 'surface/disabled', desc: 'Disabled surface', default: 'neutral/50', dark: 'neutral/800' },
    { name: 'text/primary', desc: 'Primary text and icons', default: 'neutral/900', dark: 'neutral/0' },
    { name: 'text/secondary', desc: 'Secondary text', default: 'neutral/700', dark: 'neutral/200' },
    { name: 'text/inverse', desc: 'Text on inverse surfaces', default: 'neutral/0', dark: 'neutral/950' },
    { name: 'text/disabled', desc: 'Disabled text', default: 'neutral/500', dark: 'neutral/500' },
    { name: 'text/placeholder', desc: 'Placeholder text', default: 'neutral/600', dark: 'neutral/400' },
    { name: 'border/base', desc: 'Default border', default: 'neutral/300', dark: 'neutral/600' },
    { name: 'border/subtle', desc: 'Subtle border', default: 'neutral/200', dark: 'neutral/700' },
    { name: 'border/strong', desc: 'Strong border', default: 'neutral/500', dark: 'neutral/400' },
    { name: 'border/focus', desc: 'Focus border', default: 'neutral/700', dark: 'neutral/100' },
    { name: 'border/disabled', desc: 'Disabled border', default: 'neutral/200', dark: 'neutral/700' },
    { name: 'border/inverse', desc: 'Border on inverse/dark surfaces', default: 'neutral/0', dark: 'neutral/950' },
    { name: 'intent/primary/base', desc: 'Primary intent filled', default: 'primary/700', dark: 'primary/600' },
    { name: 'intent/primary/on-base', desc: 'Foreground on primary base', default: 'neutral/0', dark: 'neutral/0' },
    { name: 'intent/primary/subtle', desc: 'Primary subtle bg', default: 'primary/50', dark: 'primary/900' },
    { name: 'intent/primary/strong', desc: 'Primary strong', default: 'primary/800', dark: 'primary/500' },
    { name: 'intent/primary/text', desc: 'Primary text', default: 'primary/900', dark: 'primary/300' },
    { name: 'intent/primary/border', desc: 'Primary border', default: 'primary/200', dark: 'primary/600' },
    { name: 'intent/success/base', desc: 'Success filled', default: 'success/700', dark: 'success/500' },
    { name: 'intent/success/on-base', desc: 'Foreground on success base', default: 'neutral/0', dark: 'neutral/950' },
    { name: 'intent/success/subtle', desc: 'Success subtle', default: 'success/50', dark: 'success/900' },
    { name: 'intent/success/strong', desc: 'Success strong', default: 'success/800', dark: 'success/400' },
    { name: 'intent/success/text', desc: 'Success text', default: 'success/900', dark: 'success/300' },
    { name: 'intent/success/border', desc: 'Success border', default: 'success/200', dark: 'success/600' },
    { name: 'intent/warning/base', desc: 'Warning filled', default: 'warning/700', dark: 'warning/500' },
    { name: 'intent/warning/on-base', desc: 'Foreground on warning base', default: 'neutral/0', dark: 'neutral/950' },
    { name: 'intent/warning/subtle', desc: 'Warning subtle', default: 'warning/50', dark: 'warning/900' },
    { name: 'intent/warning/strong', desc: 'Warning strong', default: 'warning/800', dark: 'warning/400' },
    { name: 'intent/warning/text', desc: 'Warning text', default: 'warning/900', dark: 'warning/300' },
    { name: 'intent/warning/border', desc: 'Warning border', default: 'warning/200', dark: 'warning/600' },
    { name: 'intent/danger/base', desc: 'Danger filled', default: 'danger/600', dark: 'danger/600' },
    { name: 'intent/danger/on-base', desc: 'Foreground on danger base', default: 'neutral/0', dark: 'neutral/0' },
    { name: 'intent/danger/subtle', desc: 'Danger subtle', default: 'danger/50', dark: 'danger/900' },
    { name: 'intent/danger/strong', desc: 'Danger strong', default: 'danger/700', dark: 'danger/500' },
    { name: 'intent/danger/text', desc: 'Danger text', default: 'danger/900', dark: 'danger/300' },
    { name: 'intent/danger/border', desc: 'Danger border', default: 'danger/200', dark: 'danger/600' },
    { name: 'intent/info/base', desc: 'Info filled', default: 'info/700', dark: 'info/600' },
    { name: 'intent/info/on-base', desc: 'Foreground on info base', default: 'neutral/0', dark: 'neutral/0' },
    { name: 'intent/info/subtle', desc: 'Info subtle', default: 'info/50', dark: 'info/900' },
    { name: 'intent/info/strong', desc: 'Info strong', default: 'info/800', dark: 'info/500' },
    { name: 'intent/info/text', desc: 'Info text', default: 'info/900', dark: 'info/300' },
    { name: 'intent/info/border', desc: 'Info border', default: 'info/200', dark: 'info/600' },
    { name: 'intent/neutral/base', desc: 'Neutral filled', default: 'neutral/800', dark: 'neutral/50' },
    { name: 'intent/neutral/on-base', desc: 'Foreground on neutral base', default: 'neutral/0', dark: 'neutral/950' },
    { name: 'intent/neutral/subtle', desc: 'Neutral subtle', default: 'neutral/50', dark: 'neutral/800' },
    { name: 'intent/neutral/strong', desc: 'Neutral strong', default: 'neutral/900', dark: 'neutral/100' },
    { name: 'intent/neutral/text', desc: 'Neutral text', default: 'neutral/900', dark: 'neutral/200' },
    { name: 'intent/neutral/border', desc: 'Neutral border', default: 'neutral/200', dark: 'neutral/700' },
    { name: 'state/focus/ring', desc: 'Focus ring color', default: 'info/300', dark: 'info/400' },
  ];
  // Raw RGBA variables — not aliases to primitives; same value in both modes unless noted
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
  const existingNames = new Set();
  for (const id of semanticColl.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v) existingNames.add(v.name);
  }
  let created = 0;
  const missing = [];
  for (const def of newVars) {
    if (existingNames.has(def.name)) continue;
    const aDefault = alias(def.default);
    const aDark = alias(def.dark);
    if (!aDefault || !aDark) {
      missing.push(def.name + ' (need ' + def.default + ', ' + def.dark + ')');
      continue;
    }
    try {
      const v = figma.variables.createVariable(def.name, semanticColl, 'COLOR');
      v.setValueForMode(modeDefault, aDefault);
      v.setValueForMode(modeDark, aDark);
      if (def.desc) v.description = def.desc;
      created++;
      existingNames.add(def.name);
    } catch (e) {
      missing.push(def.name + ': ' + e.message);
    }
  }
  // Create overlay variables with raw RGBA values
  for (const def of overlayVars) {
    if (existingNames.has(def.name)) continue;
    try {
      const v = figma.variables.createVariable(def.name, semanticColl, 'COLOR');
      v.setValueForMode(modeDefault, def.defaultRgba);
      v.setValueForMode(modeDark, def.darkRgba);
      if (def.desc) v.description = def.desc;
      created++;
      existingNames.add(def.name);
    } catch (e) {
      missing.push(def.name + ': ' + e.message);
    }
  }

  console.log('DLS-Lead 4-layer variables: created ' + created + ', skipped (existing or missing primitives): ' + missing.length);
  if (missing.length) console.log('Missing/skipped:', missing);
  return { created, missing };
})();

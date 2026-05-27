# Button / button-soft

Category: action
Figma component set: button-soft
React: <Button variant="soft">
Spec: specs/components/button.md
TSX: apps/storybook/src/stories/Button.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-button--docs

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays. This is a
SIMULATION of code behavior for filled or tinted surfaces, not the
exact implementation.

In code, pick the mechanism by surface type:
- Base fill present (filled, soft, any tinted bg)
  -> OKLCH L-shift: oklch(from <base> calc(l + <delta>) c h)
- Transparent surface (outline, dotted, ghost, link, or
  ghost-surface components like Accordion, ListItem, MenuItem)
  -> overlay tokens.

This Figma component set uses: SOFT BUTTON.
Code mapping is fixed to `variant="soft"`, so hover/pressed use
OKLCH L-shift in code.

See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose
Low-emphasis tonal direct action control with a subtle intent
surface, intent-colored label/icon, and intent-colored border.
Use it for supporting, contextual, or repeated actions that need to
remain visible without becoming the primary or secondary action
treatment in a row.

## Use when
- The action should be visible but quieter than filled or outline.
- The action is supporting, contextual, or repeated in a dense area.
- The action benefits from a tonal intent surface, such as an
  informational, success, warning, or danger supporting action.
- The action is not the primary or secondary action in a
  primary/secondary row.
- You need a compact action with optional leading or trailing icons.

## Do NOT use for
- Primary actions in a row, group, dialog footer, or toolbar -> use filled.
- Secondary actions paired with a primary action -> use outline.
- Primary/secondary action rows where hierarchy should be expressed
  as filled + outline.
- Rows where two soft buttons are used to represent primary and
  secondary actions.
- Very low-emphasis tertiary actions -> use ghost or link.
- Passive status, labels, or tags -> use Badge or a text label.
- Navigation lists -> use SidebarItem, Tabs, Breadcrumbs, or links.
- Menu rows -> use ListItem inside the relevant dropdown/menu component.

## Figma -> Code mapping
| Figma property | React prop | Values |
|----------------|------------|--------|
| size | size | M -> m, S -> s |
| intent | intent | neutral / primary / info / success / warning / danger |
| state | (native CSS) | normal / hover / focus / pressed |
| disabled | disabled | false / true |
| icon-left | icon | false -> omitted, true -> ReactNode |
| change-left | icon | icon instance, default Plus |
| icon-right | iconEnd | false -> omitted, true -> ReactNode |
| change-right | iconEnd | icon instance, default ChevronDown |
| text | children | string / ReactNode |
| component set | variant | fixed: soft |

Notes:
- `state` in Figma is visual only. In code, states come from
  native pseudo-classes and the disabled attribute.
- `intent` maps directly to React `intent`.
- `icon-left` and `icon-right` are visibility toggles. `change-*`
  selects the actual nested icon instance.
- This Figma component set covers soft buttons only.
- Icon-only soft buttons should use the dedicated icon-soft Figma
  component set and must set an accessible name in code.
- Icons come from lucide-react and inherit size/color from the
  Button slot; do not draw custom SVGs in the component.

## Anatomy
1. Root button - native <button>, inline-flex.
2. Leading icon slot - optional, lucide-react icon.
3. Label content - visible text or ReactNode.
4. Trailing icon slot - optional, lucide-react icon.
5. Tonal surface - subtle intent background with intent border.

## Props / API
- variant  fixed for this set: soft.
- intent   optional. Default: neutral.
- size     optional. Default: m.
- icon     optional. ReactNode leading icon.
- iconEnd  optional. ReactNode trailing icon.
- iconOnly supported in code, but represented by the dedicated
  icon-only Figma sets.
- children optional. Visible label unless iconOnly=true.
- disabled and other standard button HTML attributes.

## Tokens used
- --dls-radius-component-button
- --dls-color-intent-*-subtle
- --dls-color-intent-*-text
- --dls-color-intent-*-border
- --dls-color-border-base
- --dls-state-l-delta-hover
- --dls-state-l-delta-pressed
- --dls-state-hover-overlay
- --dls-state-pressed-overlay
- --dls-state-focus-ring-color
- --dls-color-surface-base
- --dls-color-surface-disabled
- --dls-color-text-disabled
- --dls-color-border-disabled
- --dls-spacing-*
- --dls-text-*

Lookup order: L4 component -> L2 semantic -> L3 state.
Never reference L1 primitive colors or radii in component CSS.

## States

### Figma representation
Figma uses subtle intent fills and may represent hover and pressed
with state overlay layers over the tonal surface.

### Code implementation
- normal -> subtle intent background, intent text/icon, intent border.
- hover -> OKLCH L-shift from the subtle background.
- pressed -> stronger OKLCH L-shift from the subtle background.
- focus-visible -> surface base background plus focus ring.
- disabled -> native disabled attribute plus disabled surface,
  text, and border tokens.

### Per-state behavior
- normal -> variant, intent, and size define the visual surface.
- hover -> :hover:not(:disabled).
- pressed -> :active:not(:disabled).
- focus-visible -> box-shadow focus ring. Never plain :focus.
- disabled -> native [disabled], not aria-disabled alone.

## Accessibility contract
- Root MUST be a native <button>.
- Button text provides the accessible name for normal buttons.
- Icon-only buttons MUST provide aria-label or aria-labelledby.
- Decorative icons inside the button are hidden from assistive tech.
- Keyboard: Enter and Space activate the native button.
- Focus: visible focus ring via :focus-visible and DLS tokens.
- prefers-reduced-motion disables Button transitions.

## Composition rules
- Soft is a tonal supporting-action treatment.
- Use filled + outline for explicit primary/secondary action rows.
- Do not pair soft + soft when one action is primary and the other
  is secondary.
- Intent communicates semantic meaning; variant communicates hierarchy.
- Do not place interactive descendants inside Button.
- Do not pass inline size or color to lucide icons; the slot owns
  icon dimensions and color.
- Use ButtonGroup when buttons form a segmented set.
- Use ButtonInputGroup when an input and button are coupled.

## Known deviations from system rules
Known Figma/code state deviation:
- Figma hover/pressed overlays visually simulate the code-side
  OKLCH L-shift used by soft buttons.

Known token-layer deviation:
- Button CSS still uses L2 intent tokens directly. L4 Button color
  tokens exist in tokens.json but do not yet cover every variant and
  intent combination.

Resolved code deviations after Phase 2 cleanup:
- prefers-reduced-motion media query is present.
- Button icon slots are hidden from assistive tech.
- Storybook icon-only examples include accessible names.

## Code example
<Button
  variant="soft"
  intent="info"
  size="m"
  icon={<PlusIcon />}
>
  Add note
</Button>

<div role="group" aria-label="Form actions">
  <Button variant="filled" intent="primary" size="m">
    Save
  </Button>
  <Button variant="outline" intent="neutral" size="m">
    Cancel
  </Button>
</div>

## Cross-references
- specs/figma-descriptions/button-filled.md
- specs/figma-descriptions/button-outline.md
- specs/figma-descriptions/button-icon-soft.md
- specs/foundations/motion.md
- specs/foundations/accessibility.md
- specs/tokens/motion-tokens.md
- specs/components/button.md
- specs/components/button-group.md
- specs/components/button-input-group.md

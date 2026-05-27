# Button / button-outline

Category: action
Figma component set: button-outline
React: <Button variant="outline">
Spec: specs/components/button.md
TSX: apps/storybook/src/stories/Button.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-button--docs

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays. This is a
SIMULATION of code behavior for some surfaces, and the exact code
implementation for transparent surfaces.

In code, pick the mechanism by surface type:
- Base fill present (filled, soft, any tinted bg)
  -> OKLCH L-shift: oklch(from <base> calc(l + <delta>) c h)
- Transparent surface (outline, dotted, ghost, link, or
  ghost-surface components like Accordion, ListItem, MenuItem)
  -> overlay tokens.

This Figma component set uses: OUTLINE BUTTON.
Code mapping is fixed to `variant="outline"`, so hover/pressed
use overlay tokens in code.

See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose
Secondary direct action control with transparent background,
intent-colored border, and intent-colored label/icon. The outline
variant is the secondary-action treatment, regardless of intent.

## Use when
- The action should be visible but lower emphasis than a filled CTA.
- The action is secondary in its row, group, dialog footer, or toolbar.
- Pairing with a filled primary action, such as
  `Do something` + `Cancel`.
- The surface behind the button should remain visible.
- You need a bordered action in a toolbar, table row, form footer, or
  dense control cluster.
- You need optional leading or trailing icons with the normal Button API.

## Do NOT use for
- Primary CTAs when the action must dominate the view -> use filled.
- Rows where another outline button already represents the secondary
  action and one action is meant to be primary. Do not create
  outline + outline primary/secondary pairs.
- Rows where both actions have equal hierarchy but one action is
  clearly primary and the other is secondary; express the hierarchy
  with filled + outline.
- Subtle tertiary actions -> use ghost or link.
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
| component set | variant | fixed: outline |

Notes:
- `state` in Figma is visual only. In code, states come from
  native pseudo-classes and the disabled attribute.
- `intent` maps directly to React `intent`.
- `icon-left` and `icon-right` are visibility toggles. `change-*`
  selects the actual nested icon instance.
- This Figma component set covers outline buttons only.
- Icon-only buttons should use the icon-only Figma set and must set
  an accessible name in code with `aria-label` or `aria-labelledby`.
- Icons come from lucide-react and inherit size/color from the
  Button slot; do not draw custom SVGs in the component.

## Anatomy
1. Root button - native <button>, inline-flex.
2. Leading icon slot - optional, lucide-react icon.
3. Label content - visible text or ReactNode.
4. Trailing icon slot - optional, lucide-react icon.
5. Border - intent-colored outline.

## Props / API
- variant  fixed for this set: outline.
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
- --dls-color-intent-*-base
- --dls-color-intent-*-text
- --dls-state-hover-overlay
- --dls-state-pressed-overlay
- --dls-state-focus-ring-color
- --dls-color-surface-base
- --dls-color-text-disabled
- --dls-color-border-disabled
- --dls-spacing-*
- --dls-text-*

Lookup order: L4 component -> L2 semantic -> L3 state.
Never reference L1 primitive colors or radii in component CSS.

## States

### Figma representation
Figma uses opacity overlays for hover and pressed states.
For outline buttons, this matches the code-side state model.

### Code implementation
- normal -> transparent background, intent text/icon, intent border.
- hover -> state hover overlay.
- pressed -> state pressed overlay.
- focus-visible -> surface base background plus focus ring.
- disabled -> native disabled attribute plus disabled text/border tokens.

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
- Label copy should be concise and action-oriented.
- In a primary/secondary action row, use one filled Button for the
  primary action and one outline Button for the secondary action.
- Do not pair filled + filled or outline + outline when one action is
  primary and the other is secondary.
- Intent communicates semantic meaning; variant communicates hierarchy.
- Do not place interactive descendants inside Button.
- Do not pass inline size or color to lucide icons; the slot owns
  icon dimensions and color.
- Use ButtonGroup when buttons form a segmented set.
- Use ButtonInputGroup when an input and button are coupled.

## Known deviations from system rules
Known Figma/code naming deviations:
- Figma properties `icon-left` / `icon-right` map to whether
  `icon` / `iconEnd` are provided.
- Figma properties `change-left` / `change-right` map to the
  actual icon slots, not standalone React props.
- Figma `state` maps to native CSS states, not a React prop.

Known token-layer deviation:
- Button CSS still uses L2 intent tokens directly. L4 Button color
  tokens exist in tokens.json but do not yet cover every variant and
  intent combination.

Resolved code deviations after Phase 2 cleanup:
- prefers-reduced-motion media query is present.
- Button icon slots are hidden from assistive tech.
- Storybook icon-only examples include accessible names.

## Code example
<div role="group" aria-label="Form actions">
  <Button variant="filled" intent="primary" size="m">
    Save
  </Button>
  <Button variant="outline" intent="neutral" size="m">
    Cancel
  </Button>
</div>

<Button
  variant="outline"
  intent="neutral"
  size="s"
  icon={<PlusIcon />}
>
  Add
</Button>

## Cross-references
- specs/figma-descriptions/button-filled.md
- specs/figma-descriptions/button-icon-filled.md
- specs/foundations/motion.md
- specs/foundations/accessibility.md
- specs/tokens/motion-tokens.md
- specs/components/button.md
- specs/components/button-group.md
- specs/components/button-input-group.md

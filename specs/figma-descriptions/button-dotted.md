# Button / button-dotted

Category: action
Figma component set: button-dotted
React: <Button variant="dotted">
Spec: specs/components/button.md
TSX: apps/storybook/src/stories/Button.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-button--docs

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays. This is the exact
code-side state model for transparent Button variants.

In code, pick the mechanism by surface type:
- Base fill present (filled, soft, any tinted bg)
  -> OKLCH L-shift: oklch(from <base> calc(l + <delta>) c h)
- Transparent surface (outline, dotted, ghost, link, or
  ghost-surface components like Accordion, ListItem, MenuItem)
  -> overlay tokens.

This Figma component set uses: DOTTED BUTTON.
Code mapping is fixed to `variant="dotted"`, so hover/pressed use
overlay tokens in code.

See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose
Low-emphasis dashed-border direct action control. Use it for
optional, additive, placeholder-like, or tentative actions that need
to stay visible while reading quieter than filled, outline, or soft
button treatments.

## Use when
- The action is optional or supporting rather than primary or secondary.
- A dashed boundary helps communicate an add, configure, empty-slot,
  or tentative action.
- The surface behind the button should remain visible.
- You need a compact dashed action in a toolbar, table row, form
  section, or dense control cluster.
- You need optional leading or trailing icons with the normal Button API.

## Do NOT use for
- Primary actions in a row, group, dialog footer, or toolbar -> use filled.
- Secondary actions paired with a primary action -> use outline.
- Primary/secondary action rows where hierarchy should be expressed
  as filled + outline.
- Rows where two dotted buttons are used to represent primary and
  secondary actions.
- Stronger tonal supporting actions -> use soft.
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
| change-left | icon | icon instance |
| icon-right | iconEnd | false -> omitted, true -> ReactNode |
| change-right | iconEnd | icon instance |
| text | children | string / ReactNode |
| component set | variant | fixed: dotted |

Notes:
- `state` in Figma is visual only. In code, states come from
  native pseudo-classes and the disabled attribute.
- `intent` maps directly to React `intent`.
- `icon-left` and `icon-right` are visibility toggles. `change-*`
  selects the actual nested icon instance.
- This Figma component set covers dotted buttons only.
- Icon-only dotted buttons should use the dedicated icon-dotted
  Figma component set and must set an accessible name in code.
- Icons come from lucide-react and inherit size/color from the
  Button slot; do not draw custom SVGs in the component.

## Anatomy
1. Root button - native <button>, inline-flex.
2. Leading icon slot - optional, lucide-react icon.
3. Label content - visible text or ReactNode.
4. Trailing icon slot - optional, lucide-react icon.
5. Dashed border - intent-colored dashed outline.

## Props / API
- variant  fixed for this set: dotted.
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
For dotted buttons, this matches the code-side state model.

### Code implementation
- normal -> transparent background, intent text/icon, dashed intent border.
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
- Dotted is a dashed supporting or optional-action treatment.
- Use filled + outline for explicit primary/secondary action rows.
- Do not pair dotted + dotted when one action is primary and the
  other is secondary.
- Intent communicates semantic meaning; variant communicates hierarchy.
- Do not place interactive descendants inside Button.
- Do not pass inline size or color to lucide icons; the slot owns
  icon dimensions and color.
- Use ButtonGroup when buttons form a segmented set.
- Use ButtonInputGroup when an input and button are coupled.

## Known deviations from system rules
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
  variant="dotted"
  intent="neutral"
  size="m"
  icon={<PlusIcon />}
>
  Add item
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
- specs/figma-descriptions/button-soft.md
- specs/figma-descriptions/button-icon-dotted.md
- specs/foundations/motion.md
- specs/foundations/accessibility.md
- specs/tokens/motion-tokens.md
- specs/components/button.md
- specs/components/button-group.md
- specs/components/button-input-group.md

# Button / icon-filled


Category: action
Figma component set: icon-filled
React: <Button variant="filled" iconOnly>
Spec: specs/components/button.md
TSX: apps/storybook/src/stories/Button.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-button--docs


--------------------------------------------
## State implementation contract (applies to all DLS components)


Figma shows hover/pressed as opacity overlays. This is a
SIMULATION of code behavior, not always the implementation.


In code, pick the mechanism by surface type:
- Base fill present (filled, soft, any tinted bg)
  -> OKLCH L-shift: oklch(from <base> calc(l + <delta>) c h)
- Transparent surface (outline, dotted, ghost, link, or
  ghost-surface components like Accordion, ListItem, MenuItem)
  -> overlay tokens.


This Figma component set uses: FILLED ICON-ONLY BUTTON.
Code mapping is fixed to `variant="filled"` and `iconOnly={true}`,
so hover/pressed use OKLCH L-shift in code.


See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------


## Purpose
Compact square primary action button containing only an icon.
Use for space-constrained toolbars, table row actions, dense
controls, and repeated action surfaces where the icon meaning is
already supported by context or an accessible name.


## Use when
- The action must fit in a compact square control.
- The icon-only action is primary in its action group or toolbar.
- Pairing with an outline icon-only secondary action.
- The visible icon is enough for sighted users in context.
- The consuming code can provide a required `aria-label` or
  `aria-labelledby`.
- The action is equivalent to a normal Button, only without a
  visible text label.


## Do NOT use for
- Ambiguous actions without a text label or tooltip.
- Secondary icon-only actions in a primary/secondary pair -> use
  icon-outline.
- Rows or toolbars where another filled icon-only button already
  represents the primary action. Do not create filled + filled
  icon action pairs when one action is primary and one is secondary.
- Primary page CTAs where a visible label is expected.
- Navigation items -> use SidebarItem, Tabs, Breadcrumbs, or links.
- Passive indicators -> use IconShape or Badge.
- Menu rows -> use ListItem inside the relevant menu/dropdown.


## Figma -> Code mapping
| Figma property | React prop | Values |
|----------------|------------|--------|
| size | size | M -> m, S -> s |
| intent | intent | neutral / primary / info / success / warning / danger |
| state | (native CSS) | normal / hover / focus / pressed |
| disabled | disabled | false / true |
| change | icon | icon instance, default Plus |
| component set | variant | fixed: filled |
| component set | iconOnly | fixed: true |
| component set | children | omitted |


Notes:
- `state` in Figma is visual only. In code, states come from
  native pseudo-classes and the disabled attribute.
- `change` selects the nested icon instance. In React, pass the
  equivalent lucide-react icon to `icon`.
- This component set covers filled icon-only buttons only.
- Icon-only buttons MUST have an accessible name in code. Figma
  has no visible `text` property here, so consuming code must set
  `aria-label` or `aria-labelledby`.
- Icons come from lucide-react and inherit size/color from the
  Button slot; do not draw custom SVGs in the component.


## Anatomy
1. Root button — native <button>, square hit target.
2. Icon slot — required, lucide-react icon.
3. No visible label — accessible name is provided by ARIA in code.


## Props / API
- variant  fixed for this set: filled.
- intent   optional. Default: neutral.
- size     optional. Default: m.
- icon     required for meaningful icon-only usage.
- iconOnly fixed for this set: true.
- children omitted.
- disabled and other standard button HTML attributes.
- aria-label or aria-labelledby required at usage sites.


## Tokens used
- --dls-radius-component-button
- --dls-color-intent-*
- --dls-state-l-delta-hover
- --dls-state-l-delta-pressed
- --dls-state-focus-ring-color
- --dls-color-surface-disabled
- --dls-color-text-disabled
- --dls-spacing-2
- --dls-spacing-1-5

Lookup order: L4 component -> L2 semantic -> L3 state.
Never reference L1 primitive colors or radii in component CSS.


## States

### Figma representation
Figma may use overlay layers for hover and pressed states. This
is only a tooling-compatible representation.

### Code implementation
- filled icon-only -> background and border shift with OKLCH
  L-delta tokens.
- focus-visible -> box-shadow ring with focus-ring color.
- disabled -> disabled semantic colors and native disabled
  attribute.

### Per-state behavior
- normal -> intent and size define the visual surface.
- hover -> :hover:not(:disabled).
- pressed -> :active:not(:disabled).
- focus-visible -> box-shadow focus ring. Never plain :focus.
- disabled -> native [disabled], not aria-disabled alone.


## Accessibility contract
- Root MUST be a native <button>.
- Icon-only buttons MUST provide aria-label or aria-labelledby.
- The icon is visual only; the accessible name comes from ARIA.
- Keyboard: Enter and Space activate the native button.
- Focus: visible focus ring via :focus-visible and DLS tokens.
- prefers-reduced-motion disables Button transitions.


## Composition rules
- Filled icon-only is the primary icon-action treatment.
- In a primary/secondary icon action pair, use one filled icon-only
  Button for the primary action and one outline icon-only Button for
  the secondary action.
- Do not pair filled + filled or outline + outline icon buttons when
  one action is primary and the other is secondary.
- Intent communicates semantic meaning; variant communicates hierarchy.
- Do not use iconOnly without an accessible name.
- Do not place interactive descendants inside Button.
- Do not pass inline size or color to lucide icons; the slot owns
  icon dimensions and color.
- Use Tooltip only as supplemental help. Tooltip text must not be
  the only accessible name unless it is wired to the button.


## Known deviations from system rules
Known Figma/code naming deviations:
- Figma property `change` maps to React prop `icon`.
- Figma `state` maps to native CSS states, not a React prop.
- This set has no visible `text` property. Accessible naming is a
  code-side requirement via `aria-label` or `aria-labelledby`.

Resolved code deviations after Phase 2 cleanup:
- prefers-reduced-motion media query added.
- Storybook icon-only examples now include accessible names.


## Code example
<div role="group" aria-label="Item actions">
  <Button
    variant="filled"
    intent="primary"
    size="m"
    icon={<CheckIcon />}
    iconOnly
    aria-label="Apply changes"
  />
  <Button
    variant="outline"
    intent="neutral"
    size="m"
    icon={<XIcon />}
    iconOnly
    aria-label="Cancel changes"
  />
</div>


## Cross-references
- specs/figma-descriptions/button-filled.md
- specs/figma-descriptions/button-icon-outline.md
- specs/foundations/motion.md
- specs/foundations/accessibility.md
- specs/tokens/motion-tokens.md
- specs/components/button.md

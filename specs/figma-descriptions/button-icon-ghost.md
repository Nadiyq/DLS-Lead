# Button / icon-ghost

Category: action
Figma component set: icon-ghost
React: <Button variant="ghost" iconOnly>
Spec: specs/components/button.md
TSX: apps/storybook/src/stories/Button.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-button--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6459-3368

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

This Figma component set uses: GHOST ICON-ONLY BUTTON.
Code mapping is fixed to `variant="ghost"` and `iconOnly={true}`,
so hover/pressed use overlay tokens in code.

See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose
Compact square borderless action button containing only an icon. Use
for tertiary, inline, toolbar, or contextual icon actions where the
icon meaning is clear in context and code provides an accessible name.

## Use when
- The action must fit in a compact square control.
- The icon-only action is tertiary or supporting rather than the
  primary or secondary action in a primary/secondary pair.
- The surrounding layout already provides enough structure and the
  control should stay borderless at rest.
- The visible icon is enough for sighted users in context.
- The consuming code can provide a required `aria-label` or
  `aria-labelledby`.
- The action is equivalent to a normal Button, only without a
  visible text label.

## Do NOT use for
- Ambiguous actions without a text label or tooltip.
- Primary icon-only actions in a primary/secondary pair -> use
  icon-filled.
- Secondary icon-only actions paired with a primary action -> use
  icon-outline.
- Rows where ghost + ghost icon buttons represent primary and
  secondary actions.
- Supporting icon-only actions that need a visible tonal surface -> use icon-soft.
- Optional placeholder-like icon actions that need a dashed boundary -> use icon-dotted.
- Primary page CTAs where a visible label is expected.
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
| component set | variant | fixed: ghost |
| component set | iconOnly | fixed: true |
| component set | children | omitted |

Notes:
- `state` in Figma is visual only. In code, states come from
  native pseudo-classes and the disabled attribute.
- `change` selects the nested icon instance. In React, pass the
  equivalent lucide-react icon to `icon`.
- This component set covers ghost icon-only buttons only.
- Icon-only buttons MUST have an accessible name in code. Figma
  has no visible `text` property here, so consuming code must set
  `aria-label` or `aria-labelledby`.
- Icons come from lucide-react and inherit size/color from the
  Button slot; do not draw custom SVGs in the component.

## Anatomy
1. Root button - native <button>, square hit target.
2. Icon slot - required, lucide-react icon.
3. Borderless rest state - transparent background and border.
4. No visible label - accessible name is provided by ARIA in code.

## Props / API
- variant  fixed for this set: ghost.
- intent   optional. Default: neutral.
- size     optional. Default: m.
- icon     required for meaningful icon-only usage.
- iconOnly fixed for this set: true.
- children omitted.
- disabled and other standard button HTML attributes.
- aria-label or aria-labelledby required at usage sites.

## Tokens used
- --dls-radius-component-button
- --dls-color-intent-*-text
- --dls-state-hover-overlay
- --dls-state-pressed-overlay
- --dls-state-focus-ring-color
- --dls-color-surface-base
- --dls-color-text-disabled
- --dls-spacing-2
- --dls-spacing-1-5

Lookup order: L4 component -> L2 semantic -> L3 state.
Never reference L1 primitive colors or radii in component CSS.

## States

### Figma representation
Figma uses opacity overlays for hover and pressed states.
For ghost icon-only buttons, this matches the code-side state model.

### Code implementation
- normal -> transparent background, transparent border, intent icon.
- hover -> state hover overlay.
- pressed -> state pressed overlay.
- focus-visible -> surface base background plus focus ring.
- disabled -> native disabled attribute plus disabled text token.

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
- Ghost icon-only is a borderless tertiary/supporting icon-action treatment.
- Use filled icon-only + outline icon-only for explicit
  primary/secondary icon action pairs.
- Do not pair ghost + ghost icon buttons when one action is primary
  and the other is secondary.
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
  variant="ghost"
  intent="neutral"
  size="m"
  icon={<PlusIcon />}
  iconOnly
  aria-label="Add item"
/>

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
- specs/figma-descriptions/button-ghost.md
- specs/figma-descriptions/button-icon-filled.md
- specs/figma-descriptions/button-icon-outline.md
- specs/figma-descriptions/button-icon-soft.md
- specs/figma-descriptions/button-icon-dotted.md
- specs/foundations/motion.md
- specs/foundations/accessibility.md
- specs/tokens/motion-tokens.md
- specs/components/button.md

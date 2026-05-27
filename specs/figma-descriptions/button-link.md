# Button / link

Category: action
Figma component set: link
Local rollout name: button-link
React: <Button variant="link">
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

This Figma component set uses: LINK BUTTON.
Code mapping is fixed to `variant="link"`, so hover/pressed use
overlay tokens in code. Hover, pressed, and focus states underline the
visible label.

See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose
Inline text-style direct action control. Use it when the action should
look lighter than ghost and read like a link, while still behaving as a
native button action instead of navigation.

## Use when
- The control triggers an action in the current context.
- The action should have the lowest visual emphasis among Button
  variants.
- A visible text label is required and optional leading or trailing
  icons can clarify the action.
- The surrounding text, toolbar, or dense layout already provides
  enough structure.
- The action should underline in interactive states.

## Do NOT use for
- Navigation to another URL or route -> use a semantic link or anchor.
- Primary actions in a row, group, dialog footer, or toolbar -> use filled.
- Secondary actions paired with a primary action -> use outline.
- Primary/secondary action rows where hierarchy should be expressed
  as filled + outline.
- Rows where two link buttons are used to represent primary and
  secondary actions.
- Icon-only buttons. There is no icon-only link Figma component set.
- Borderless tertiary actions that need a button-shaped target at rest
  but not a link-style underline -> use ghost.
- Passive status, labels, or tags -> use Badge or a text label.
- Menu rows -> use ListItem inside the relevant dropdown/menu component.

## Figma -> Code mapping
| Figma property | React prop | Values |
|----------------|------------|--------|
| size | size | M -> m, S -> s |
| intent | intent | neutral / primary / info / success / warning / danger |
| state | (native CSS) | normal / hover / focus / pressed |
| state=disabled | disabled | disabled state -> true |
| icon-left | icon | false -> omitted, true -> ReactNode |
| change-left | icon | icon instance, default Plus |
| icon-right | iconEnd | false -> omitted, true -> ReactNode |
| change-right | iconEnd | icon instance, default ChevronDown |
| text | children | string / ReactNode |
| component set | variant | fixed: link |

Notes:
- `state` in Figma is visual only for normal, hover, focus, and
  pressed. The disabled Figma state maps to the native `disabled`
  attribute in code.
- `intent` maps directly to React `intent`.
- `icon-left` and `icon-right` are visibility toggles. `change-*`
  selects the actual nested icon instance.
- This Figma component set covers text link buttons only.
- There is no icon-only link Figma component set. Do not generate
  `variant="link" iconOnly` from Figma.
- Icons come from lucide-react and inherit size/color from the
  Button slot; do not draw custom SVGs in the component.

## Anatomy
1. Root button - native <button>, inline-flex.
2. Leading icon slot - optional, lucide-react icon.
3. Label content - visible text or ReactNode.
4. Trailing icon slot - optional, lucide-react icon.
5. Link treatment - transparent background/border with intent text.

## Props / API
- variant  fixed for this set: link.
- intent   optional. Default: neutral.
- size     optional. Default: m.
- icon     optional. ReactNode leading icon.
- iconEnd  optional. ReactNode trailing icon.
- iconOnly not represented by this Figma set.
- children required for link-style usage; it provides the visible
  label and accessible name.
- disabled and other standard button HTML attributes.

## Tokens used
- --dls-radius-component-button
- --dls-color-intent-*-text
- --dls-state-hover-overlay
- --dls-state-pressed-overlay
- --dls-state-focus-ring-color
- --dls-color-surface-base
- --dls-color-text-disabled
- --dls-spacing-*
- --dls-text-*
- --dls-text-link-*

Lookup order: L4 component -> L2 semantic -> L3 state.
Never reference L1 primitive colors or radii in component CSS.

## States

### Figma representation
Figma uses opacity overlays for hover and pressed states.
For link buttons, this matches the code-side transparent variant model.

### Code implementation
- normal -> transparent background, transparent border, intent text/icon.
- hover -> state hover overlay plus underlined visible label.
- pressed -> state pressed overlay plus underlined visible label.
- focus-visible -> surface base background, focus ring, and underlined
  visible label.
- disabled -> native disabled attribute plus disabled text token.

### Per-state behavior
- normal -> variant, intent, and size define the visual surface.
- hover -> :hover:not(:disabled).
- pressed -> :active:not(:disabled).
- focus-visible -> box-shadow focus ring. Never plain :focus.
- disabled -> native [disabled], not aria-disabled alone.

## Accessibility contract
- Root MUST be a native <button>.
- Button text provides the accessible name.
- Use a semantic link or anchor for navigation instead of Button link.
- Decorative icons inside the button are hidden from assistive tech.
- Keyboard: Enter and Space activate the native button.
- Focus: visible focus ring via :focus-visible and DLS tokens.
- prefers-reduced-motion disables Button transitions.

## Composition rules
- Link is the lowest-emphasis Button treatment for actions.
- Use filled + outline for explicit primary/secondary action rows.
- Do not pair link + link when one action is primary and the other is
  secondary.
- Intent communicates semantic meaning; variant communicates hierarchy.
- Do not use link Button without visible text.
- Do not place interactive descendants inside Button.
- Do not pass inline size or color to lucide icons; the slot owns
  icon dimensions and color.

## Known deviations from system rules
Known Figma/code naming deviations:
- Figma property `state=disabled` maps to the React `disabled` prop.
- Figma `state` maps to native CSS states, not a React prop.
- This set has no icon-only equivalent. React can technically receive
  `iconOnly`, but the Figma contract for link buttons requires a
  visible text label.

Known token-layer deviation:
- Button CSS still uses L2 intent tokens directly. L4 Button color
  tokens exist in tokens.json but do not yet cover every variant and
  intent combination.

Resolved code deviations after Phase 2 cleanup:
- prefers-reduced-motion media query is present.
- Button icon slots are hidden from assistive tech.
- Storybook icon-only examples intentionally exclude the link variant.

## Code example
<Button
  variant="link"
  intent="primary"
  size="m"
  icon={<PlusIcon />}
>
  Add item
</Button>

## Cross-references
- specs/figma-descriptions/button-filled.md
- specs/figma-descriptions/button-outline.md
- specs/figma-descriptions/button-soft.md
- specs/figma-descriptions/button-dotted.md
- specs/figma-descriptions/button-ghost.md
- specs/foundations/motion.md
- specs/foundations/accessibility.md
- specs/tokens/motion-tokens.md
- specs/components/button.md

# ChipRegular / regular

Category: interactive chip / action
Figma component set: regular
React: <ChipRegular>
Spec: specs/components/chip-regular.md
TSX: apps/storybook/src/stories/chip/ChipRegular.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-chipregular--docs

--------------------------------------------
## State implementation contract

`ChipRegular` is the selectable/editable/removable chip component.
It composes a `Chip` content part and an optional action part.

In code:
- Filled, outline, soft, and dot variants use overlay tokens for hover
  and pressed states.
- Focus uses `:focus-visible` and the DLS focus ring token.
- Disabled uses semantic disabled surface, text, and border tokens.
- Reduced motion disables ChipRegular transitions.
--------------------------------------------

## Purpose
Interactive chip for compact editable values: row statuses that open an
inline editor, filter values that open a dropdown, and removable tags in
token/tag inputs.

## Use when
- A compact value is clickable, removable, selectable, or editable.
- A row status can be changed inline from a chevron action.
- A token/tag value can be removed with a cross action.
- A filter value opens a dropdown/editor from the action part.

## Do NOT use for
- Passive status or metadata -> use Badge or a text label.
- Standalone content/action parts -> use Chip only inside chip-family
  components.
- Table/data-view filter label + value pairs -> use FilterChip.
- Primary or secondary actions -> use Button.
- Navigation.

## Figma -> Code mapping
| Figma property | React prop | Values |
|----------------|------------|--------|
| size | size | M -> m, S -> s, XS -> xs |
| type | variant | filled / outline / soft / dot |
| status | intent | neutral / info / success / warning / danger |
| state | (native CSS) | normal / hover / focus / pressed / disabled |
| disabled? | disabled | false / true |
| text | label | string |
| component set | (React component) | fixed: ChipRegular |

Notes:
- `state` in Figma is visual only. In code, states come from CSS
  pseudo-classes and the disabled data attribute.
- Figma `type` maps to React `variant`.
- Figma `status` maps to React `intent`.
- The React API chooses the action part with `chevron` or `onRemove`.
  Figma represents the regular chip family as composed chip parts.
- `ChipRegular` uses `Chip` internally; consuming code should not
  manually compose the internal parts.

## Anatomy
1. Root interactive chip.
2. Content part: embedded Chip with label, optional icon/avatar/dot.
3. Optional action part: chevron or remove cross.
4. Divider between content and action parts when applicable.

## Props / API
- label required.
- variant optional. Default: outline.
- intent optional. Default: neutral.
- size optional. Default: m.
- leadingIcon optional.
- avatar optional.
- chevron optional.
- onRemove optional. Shows remove action and requires accessible remove name.
- onClick optional. Makes root keyboard-clickable.
- disabled optional. Default: false.
- className optional.

## Tokens used
- --dls-radius-component-chip
- --dls-color-intent-*-base
- --dls-color-intent-*-on-base
- --dls-color-intent-*-subtle
- --dls-color-intent-*-text
- --dls-color-intent-*-border
- --dls-color-surface-base
- --dls-color-surface-disabled
- --dls-color-border-base
- --dls-color-border-subtle
- --dls-color-border-disabled
- --dls-color-component-chip-fg-disabled
- --dls-state-hover-overlay
- --dls-state-pressed-overlay
- --dls-state-focus-ring-color
- --dls-spacing-*
- --dls-text-m-*
- --dls-font-*

Lookup order: L4 component -> L2 semantic -> L3 state.
Never reference L1 primitive colors or radii in component CSS.

## States
- normal -> variant and intent surface.
- hover -> state hover overlay.
- pressed -> state pressed overlay.
- focus-visible -> focus ring.
- disabled -> disabled surface/text/border and no pointer action.

## Accessibility contract
- Root exposes `role="button"` and keyboard activation only when
  `onClick` is provided.
- Remove action is a native button with `aria-label="Remove {label}"`.
- Chevron action is a native button with `aria-label="Open {label}"` when
  `onClick` is provided. Without `onClick`, the chevron is decorative.
- Keyboard: Enter and Space activate clickable root chips.
- Focus: visible focus ring via `:focus-visible`.
- Reduced motion disables transitions.

## Composition rules
- `ChipRegular` composes `Chip`; do not recreate its internals in app UI.
- Use one content part and at most one action part.
- Use `FilterChip` when the UI needs a separate filter label part.
- Do not use ChipRegular as a passive badge.

## Known deviations from system rules
Resolved in this rollout:
- ChipRegular CSS now includes `prefers-reduced-motion`.
- Hover selectors now use the standard disabled guard shape.
- Chevron actions now have accessible names and avoid nested interactive
  controls.

## Code example
<ChipRegular
  label="Active"
  variant="soft"
  intent="success"
  size="m"
  chevron
  onClick={openStatusEditor}
/>

<ChipRegular
  label="Design"
  variant="outline"
  intent="neutral"
  onRemove={handleRemove}
/>

## Cross-references
- specs/components/chip.md
- specs/components/filter-chip.md
- specs/components/chip-input.md
- specs/components/badge.md
- specs/foundations/accessibility.md
- specs/foundations/motion.md

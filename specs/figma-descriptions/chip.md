# Chip / chip

Category: component part / chip building block
Figma component set: chip
React: <Chip>
Spec: specs/components/chip.md
TSX: apps/storybook/src/stories/chip/Chip.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-chip--docs

--------------------------------------------
## State implementation contract

`Chip` is not an interactive product component. It is a visual building
block used inside `ChipRegular` and `FilterChip`.

State belongs to the parent component:
- `ChipRegular` owns hover, pressed, focus-visible, disabled, and
  variant/intent surfaces.
- `FilterChip` owns visible/hidden, open/closed, hover, pressed,
  focus-visible, and disabled behavior.

Do not generate standalone interactive behavior on `Chip`.
--------------------------------------------

## Purpose
Part-level chip primitive for composing content and action pieces. It
can render text, icon + text, avatar + text, stacked avatars + text,
flag + text, dot + text, icon + two text values, cross, or chevron.

## Use when
- Building the content part inside `ChipRegular`.
- Building the action part inside `ChipRegular`.
- Building the label part inside `FilterChip`.
- A parent chip component owns the interaction and state.

## Do NOT use for
- Standalone product UI.
- Passive status, labels, or tags -> use Badge or a text label.
- Removable, selectable, or editable values -> use ChipRegular.
- Table/data-view filter controls -> use FilterChip.
- Buttons, menu rows, or navigation.

## Figma -> Code mapping
| Figma property | React prop | Values |
|----------------|------------|--------|
| size | size | M -> m, S -> s, XS -> xs |
| text | label | string |
| text | secondaryLabel | used for icon+two-text when a secondary value is needed |
| type | leadingIcon | icon+text / icon+two-text -> ReactNode |
| type | avatar | avatar -> ChipAvatar |
| type | stackedAvatars | stacked -> ChipAvatar[] |
| type | flag | flag -> string |
| type | dot | dot -> DotIntent |
| type | cross | cross -> true |
| type | chevron | chevron -> true |
| part | (composition role) | content / action |
| component set | (React component) | fixed: Chip |

Notes:
- `part` is a Figma composition role, not a React prop. In code, the
  role is inferred from which content/action props are passed.
- The base Figma `chip` set does not expose a dot intent property.
  In code, `dot` accepts the DLS dot intents.
- Cross and chevron are visual parts. Interactive behavior belongs to
  the parent component.
- Icons come from lucide-react; do not draw custom SVGs in stories or
  component code.

## Anatomy
1. Root visual part.
2. Optional leading content: dot, flag, icon, avatar, or stacked avatars.
3. Primary label.
4. Optional secondary label.
5. Optional action icon: cross or chevron.

## Props / API
- label optional. Primary text.
- secondaryLabel optional. Secondary text for icon+two-text.
- leadingIcon optional. ReactNode.
- avatar optional. Single ChipAvatar.
- stackedAvatars optional. ChipAvatar[].
- flag optional. String flag content.
- dot optional. DotIntent.
- chevron optional. Boolean trailing chevron.
- cross optional. Boolean trailing cross.
- size optional. Default: m.
- className optional.

## Tokens used
- --dls-color-component-chip-fg-base
- --dls-color-text-secondary
- --dls-color-surface-base
- --dls-color-intent-*-base
- --dls-spacing-*
- --dls-text-m-*
- --dls-font-*

Lookup order: L4 component -> L2 semantic -> L3 state.
Never reference L1 primitive colors or radii in component CSS.

## States
- Static only.
- Parent controls visual state.

## Accessibility contract
- Root is a non-interactive `div`.
- Do not attach click handlers or keyboard behavior to `Chip`.
- Parent components provide any interactive semantics and accessible
  names.
- Decorative icons are visual only when used inside parent controls.

## Composition rules
- `Chip` is allowed inside ChipRegular and FilterChip.
- Do not use `Chip` alone in product UI.
- Do not nest interactive children inside `Chip`.
- Use lucide-react for icons.

## Known deviations from system rules
Known Figma/code mapping deviations:
- Figma exposes `part`, but React derives part behavior from props.
- Figma exposes `type`, while React exposes individual props such as
  `leadingIcon`, `avatar`, `dot`, `cross`, and `chevron`.
- Figma does not expose a dot intent selector on the base `chip` set.

Resolved in this rollout:
- Chip story inline SVG was replaced with lucide-react Eye.
- Passive status guidance no longer points agents to standalone Chip.

## Code example
<ChipRegular label="Active" variant="dot" intent="success" size="m" />

<FilterChip
  label="Status"
  isVisible
  valueSummary={<span className="dls-filter-chip__value-text">Active</span>}
/>

## Cross-references
- specs/components/chip-regular.md
- specs/components/filter-chip.md
- specs/components/badge.md
- specs/patterns/component-selection.md

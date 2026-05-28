# FilterChip / filter

Category: filter / control
Figma component set: filter
React: <FilterChip>
Spec: specs/components/filter-chip.md
TSX: apps/storybook/src/stories/filter-chip/FilterChip.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-filterchip--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6455-7661

--------------------------------------------
## State implementation contract

`FilterChip` is the chip-family control for table and data-view filters.
It composes a label part and a value/editor part.

In code:
- Label and chevron actions are native buttons.
- Visible/hidden state is controlled by `isVisible`.
- Open/closed editor state is controlled by `open` / `onOpenChange`
  or internal state.
- Hover and pressed states use overlay tokens.
- Focus uses `:focus-visible` and the DLS focus ring token.
- Chevron rotation respects `prefers-reduced-motion`.
--------------------------------------------

## Purpose
Filter control that shows a filter label, visibility state, current
value summary, and optional dropdown/editor action.

## Use when
- A table or data-view filter must stay visible as a chip.
- Clicking the label part toggles whether the filter affects the view.
- Clicking the value chevron opens a filter editor.
- The filter value summary must remain visible in a toolbar or filter row.
- Sorting/filter chips need a label part that reflects state, such as
  eye/eye-off or sort direction.

## Do NOT use for
- Passive status or metadata -> use Badge or a text label.
- Removable tags or editable row values -> use ChipRegular.
- Standalone chip content/action parts -> use Chip only inside
  chip-family components.
- Primary or secondary actions -> use Button.
- Navigation.

## Figma -> Code mapping
| Figma property | React prop | Values |
|----------------|------------|--------|
| size | size | M -> m, S -> s |
| hidden | isVisible | false -> true, true -> false |
| hidden | labelIcon | false -> Eye, true -> EyeOff |
| component set | (React component) | fixed: FilterChip |

Notes:
- Figma names the visibility property `hidden`; React exposes the
  positive state as `isVisible`.
- Figma only represents M and S sizes for FilterChip.
- The React API is richer than the Figma set: `label`, `valueSummary`,
  `children`, `open`, and callbacks provide real filter behavior.
- The value part behaves like a chip-regular value with a chevron
  action, but consuming code should use `FilterChip` instead of
  manually combining Chip and ChipRegular.

## Anatomy
1. Wrapper.
2. Outline bar.
3. Label part: button containing Chip icon + label.
4. Value content part: summary text or custom summary.
5. Chevron action button.
6. Optional dropdown/editor panel.

## Props / API
- label required.
- labelIcon optional. Defaults to Eye/EyeOff based on visibility.
- isVisible optional. Default: true.
- onVisibilityChange optional.
- valueSummary optional.
- children optional. Dropdown/editor content.
- size optional. Default: m.
- disabled optional. Default: false.
- open optional. Controlled open state.
- onOpenChange optional.
- className optional.

## Tokens used
- --dls-radius-component-chip
- --dls-color-surface-base
- --dls-color-surface-disabled
- --dls-color-border-base
- --dls-color-border-subtle
- --dls-color-border-disabled
- --dls-color-component-chip-fg-disabled
- --dls-color-text-secondary
- --dls-color-intent-neutral-text
- --dls-color-component-input-bg-base
- --dls-color-component-input-fg-base
- --dls-color-component-input-fg-placeholder
- --dls-color-component-input-border-base
- --dls-color-component-input-border-focus
- --dls-radius-component-input
- --dls-state-hover-overlay
- --dls-state-pressed-overlay
- --dls-state-focus-ring-color
- --dls-shadow-surface-md
- --dls-spacing-*
- --dls-text-m-*
- --dls-font-*

Lookup order: L4 component -> L2 semantic -> L3 state.
Never reference L1 primitive colors or radii in component CSS.

## States
- visible -> Eye label icon, active filter behavior.
- hidden -> EyeOff label icon and disabled-looking chip surface.
- open -> dropdown/editor rendered and chevron rotated.
- closed -> dropdown/editor hidden.
- hover -> overlay token on label/action buttons.
- pressed -> pressed overlay token.
- focus-visible -> focus ring on label/action buttons.
- disabled -> disables label/action buttons and uses disabled tokens.

## Accessibility contract
- Label part is a native button with `aria-pressed`.
- Label part has an accessible name: Hide/Show `{label}` filter.
- Chevron action is a native button with `aria-expanded` and
  `aria-haspopup="dialog"`.
- Escape closes the open editor.
- Outside click closes the open editor.
- Focus uses visible `:focus-visible` rings.
- Reduced motion disables chevron rotation transition.

## Composition rules
- Use `FilterChip` inside filter rows, table top bars, and data-view
  filter toolbars.
- Dropdown/editor content should be composed from DLS List/ListItem,
  Checkbox, SearchField, CalendarRange, Button, and related documented
  controls.
- Do not use FilterChip as a generic action button or passive badge.
- Do not manually compose the label/value/action strip in app code.

## Known deviations from system rules
Resolved in this rollout:
- FilterChip API and docs now match Figma sizes M/S only.
- FilterChip CSS now includes `prefers-reduced-motion` for chevron
  rotation.

Known Figma/code mapping deviations:
- Figma exposes only `hidden` and `size`; React exposes the real filter
  behavior props needed by product code.

## Code example
<FilterChip
  label="Status"
  isVisible
  valueSummary={<span className="dls-filter-chip__value-text">Active</span>}
>
  <List className="dls-filter-chip__enum-list">
    <ListItem type="text" text="Active" />
    <ListItem type="text" text="Paused" />
  </List>
</FilterChip>

## Cross-references
- specs/components/chip.md
- specs/components/chip-regular.md
- specs/components/filters.md
- specs/components/dropdown-filters.md
- specs/components/list.md
- specs/components/list-item.md
- specs/patterns/data-table.md

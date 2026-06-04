# DropdownSorting

Category: menu / table-utility
React: <DropdownSorting>
Spec: specs/components/dropdown-sorting.md
TSX: apps/storybook/src/stories/dropdown-sorting/DropdownSorting.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-dropdownsorting--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6123-17316

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a SIMULATION
of the code behavior, not the implementation.

This component uses: NONE on the panel itself (passive floating
surface). Interactive states live on the two composed `<Dropdown>`
selects (each has its own input + listbox popover with overlay
hover, focus-visible ring, and full keyboard contract).
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Sort-settings panel that opens **from the Sort chip** in the
`Filters` row of a `TableTopBar` (clicking the value-side chevron
on the Sort FilterChip opens this dropdown).

Two side-by-side selects:
1. **Column** — pick the sortable parameter (typically a table
   column name).
2. **Sort** — pick the direction (`Ascending` / `Descending`).

The component is purely a state-staging surface — it reports
changes via `onColumnChange` / `onDirectionChange` callbacks and
the parent (typically the Sort chip + table data layer) commits
them.

## Use when

- Inside the value-side popover of the `Sort` `FilterChip` in the
  `Filters` row of a `TableTopBar`.
- Any place a user needs to pick "sort by column + direction" in
  a single compact surface.

## Do NOT use for

- Multi-column / multi-direction sorting (e.g. "sort by name asc,
  then by date desc") → use a custom multi-sort UI (not currently
  available in DLS).
- Filter management → use `DropdownFilters`.
- Column visibility / order → use `DropdownColumns`.
- Export → use `DropdownExport`.

## Figma → Code mapping

| Figma property      | React prop      | Values / Notes                                  |
|---------------------|-----------------|--------------------------------------------------|
| (Column input)      | columns + column + onColumnChange | Left select: `Column` label, value=current column. Driven by the `columns` array `{ value, label }[]`. |
| (Sort input)        | direction + onDirectionChange | Right select: `Sort` label, value=current direction (`"Ascending"` / `"Descending"`). |
| —                   | className       | Root class extension.                            |

## Anatomy

- Root — `.dls-dropdown-sorting` with `role="dialog"` and
  `aria-label="Sort settings"`.
- Two side-by-side `<Dropdown>` instances:
  - Column dropdown — `label="Column"`, options derived from
    `columns` prop, value bound to `column` state.
  - Direction dropdown — `label="Sort"`, fixed two-option list
    (`Ascending` / `Descending`), value bound to `direction` state.

## Props / API

```ts
export type SortDirection = 'ascending' | 'descending';

export interface SortColumn {
  value: string;
  label: string;
}

export interface DropdownSortingProps {
  columns: SortColumn[];
  column?: string;                    // defaults to columns[0].value
  direction?: SortDirection;          // default 'ascending'
  onColumnChange?: (value: string) => void;
  onDirectionChange?: (value: SortDirection) => void;
  className?: string;
}
```

## Tokens used

- `--dls-color-surface-base` (panel background)
- `--dls-color-border-subtle` (panel border)
- `--dls-shadow-surface-md` (panel shadow)
- `--dls-radius-component-list` (panel radius)
- `--dls-spacing-2` (panel padding + inter-Dropdown gap)
- `--dls-font-family`
- All composed `Dropdown` (input + listbox + ListItem) tokens

## States

| State                | Figma representation     | Code implementation                       |
|----------------------|--------------------------|--------------------------------------------|
| default              | (Ascending + first column) | `column=columns[0].value`, `direction='ascending'` |
| different column     | (Column field shows label) | `column={value}` via onColumnChange       |
| different direction  | (Sort field shows label)   | `direction='descending'` via onDirectionChange |

No spatial motion. Each composed `Dropdown` has its own
hover/focus/open states — DropdownSorting just lays them out.

## Accessibility contract

- Root is `<div role="dialog" aria-label="Sort settings">`. Used
  when this dropdown is mounted into the Sort FilterChip's value
  popover — the parent FilterChip provides the trigger contract.
- Each `<Dropdown>` carries its own ARIA contract:
  - Trigger is a native `<button>` with `aria-haspopup="listbox"`
    and `aria-expanded` tracking open state.
  - Options panel has `role="listbox"`; each option is a real
    `<li>`/`<button>` with `aria-selected`.
  - Keyboard: Arrow keys move highlight, Enter selects, Escape
    closes.
- The two Dropdowns are tab-navigated in their visual order
  (Column → Direction).

## Composition rules

- Always mount `DropdownSorting` as the value-side popover of the
  Sort FilterChip in a `Filters` row. The TableTopBar
  `WithFilters` / `Interactive` stories are the canonical example.
- Don't mount it standalone or in a `DropdownOptions` overflow
  menu — sort UI belongs inline with the other filter chips.
- Don't add additional fields beyond Column + Direction — the
  contract is two selects.
- The `Direction` Dropdown's two options (`Ascending` /
  `Descending`) are hard-coded — don't customize them.

## Known deviations

- The component spec mentions
  `--dls-color-component-dropdown-sorting-*` tokens but those do
  not exist in `tokens.json`. The CSS uses semantic surface/border
  tokens directly and the composed Dropdowns carry their own
  token references. (Low severity.)
- The Figma frame shows the two inputs as `Dropdown` selects
  styled identically to the DLS `Dropdown` component — same
  contract, same tokens. The React component uses `<Dropdown>`
  directly. (Confirms 1:1 mapping.)

## Code example

```tsx
import { DropdownSorting } from './dropdown-sorting/DropdownSorting';
import { FilterChip } from './filter-chip/FilterChip';
import { ArrowDown as ArrowDownIcon, ArrowUp as ArrowUpIcon } from 'lucide-react';

function SortChip({ columns, sort, setSort }) {
  const SortIcon = sort.direction === 'ascending' ? ArrowDownIcon : ArrowUpIcon;
  const label = columns.find(c => c.value === sort.column)?.label ?? sort.column;

  return (
    <FilterChip
      label="Sort"
      labelIcon={<SortIcon />}
      isVisible
      size="m"
      valueSummary={<span className="dls-filter-chip__value-text">{label}</span>}
    >
      <DropdownSorting
        columns={columns}
        column={sort.column}
        direction={sort.direction}
        onColumnChange={(value) => setSort(s => ({ ...s, column: value }))}
        onDirectionChange={(value) => setSort(s => ({ ...s, direction: value }))}
      />
    </FilterChip>
  );
}
```

## Cross-references

- [filter-chip.md](../components/filter-chip.md)
- [filters.md](filters.md)
- [dropdown.md](../components/dropdown.md)
- [dropdown-filters.md](dropdown-filters.md)
- [dropdown-columns.md](dropdown-columns.md)
- [dropdown-export.md](dropdown-export.md)
- [table-top-bar.md](table-top-bar.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)
- [../foundations/motion.md](../foundations/motion.md)

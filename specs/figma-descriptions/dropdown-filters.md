# DropdownFilters

Category: menu / table-utility
React: <DropdownFilters>
Spec: specs/components/dropdown-filters.md
TSX: apps/storybook/src/stories/dropdown-filters/DropdownFilters.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-dropdownfilters--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=7311-4843

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a SIMULATION
of the code behavior, not the implementation.

This component uses: NONE on the panel itself (passive floating
surface). Interactive states live on the composed `FilterChip`
children (chip-level overlay hover + focus ring on the value-side
chevron Button).
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Read-only "active filters" mini-panel that opens adjacent to the
main `DropdownOptions` (the **Filters** row in the table top-bar
options menu opens this dropdown as a sibling, never overlapping
the parent).

The panel shows the SAME filters that are pinned to the
`TableTopBar` filter row — it does not let you *add* a filter from
here; it only lets you *jump to* an existing filter. Clicking a
chip:
1. Focuses the corresponding `FilterChip` in the top-bar filter row.
2. Opens that chip's value-side dropdown so the user can change
   the value.
3. If the top-bar filter row is currently hidden, it opens first.

To **add** a new filter, use the Plus button at the end of the
top-bar filter row (which opens a different popover — see
`Filters.addMenu`).

## Use when

- Adjacent to the main `DropdownOptions` panel, opened from its
  "Filters" row.
- As a quick way to inspect / jump to active filters when the
  top-bar filter row is not currently visible or scrolled out of
  view.

## Do NOT use for

- Adding a new filter → use the Plus button at the end of the
  `Filters` row (driven by `Filters.addMenu`).
- Choosing a sort column / direction → use `DropdownSorting`.
- Column visibility / order → use `DropdownColumns`.
- Export → use `DropdownExport`.
- Selection / multi-choice value lists → use `Dropdown` /
  `DropdownAutocomplete`.

## Figma → Code mapping

| Figma property | React prop | Values / Notes                                  |
|----------------|------------|--------------------------------------------------|
| empty          | (derived)  | Figma boolean — `true` renders an empty-state message instead of chips. In code, this is derived from whether the consumer passed `children` (FilterChips) or non-empty `options`. When neither is present, the panel renders a `<ListItem type="empty-state" text="No filters selected" />`. |
| (chips slot)   | children   | Custom FilterChip instances. When provided, `options` is ignored. Use this when each chip needs stateful behavior (its own value, isVisible toggle, value-side dropdown). |
| —              | options    | Convenience: `{ id, label }[]` rendered as size-S `<FilterChip>` chips with `"All"` as the value summary. Useful for static demos. |
| —              | onSelect   | Called with the option id when a chip's chevron is clicked (only used by the `options` code path). |
| —              | className  | Root class extension.                            |

## Anatomy

- Root — `.dls-dropdown-filters` with `role="dialog"` and
  `aria-label="Filters"`.
- Body — a `<List>` containing:
  - `<ListItem type="label" text="Filters" />` — header row.
  - `<ListItem type="chips">{filterChips}</ListItem>` — wraps the
    FilterChips inline. OR
  - `<ListItem type="empty-state" text="No filters selected" />`
    when there are no chips to show.

## Props / API

```ts
export interface FilterOption {
  id: string;
  label: string;
}

export interface DropdownFiltersProps {
  /** Custom filter chip content. When provided, `options` is ignored. */
  children?: React.ReactNode;
  /** Convenience: simple filter options rendered as FilterChip (size=S). */
  options?: FilterOption[];
  /** Called when a simple option chip's chevron is clicked. */
  onSelect?: (id: string) => void;
  className?: string;
}
```

## Tokens used

- `--dls-color-surface-base` (panel background — via List)
- `--dls-color-border-subtle` (panel border — via List)
- `--dls-shadow-surface-md` (panel shadow — via List)
- `--dls-radius-component-list` (panel radius — via List)
- `--dls-spacing-2` (panel padding — via List)
- `--dls-font-family`
- All `FilterChip` + `List` + `ListItem` tokens (composed)

## States

| State    | Figma representation | Code implementation                          |
|----------|----------------------|----------------------------------------------|
| default  | `empty=false`        | Renders the chips list                       |
| empty    | `empty=true`         | Renders `<ListItem type="empty-state" text="No filters selected" />` |

No interactive state on the panel itself. No motion. Color
transitions on composed FilterChips carry their own contracts.

## Accessibility contract

- Root is `<div role="dialog" aria-label="Filters">`. The dialog
  role is used (instead of `menu`) because the panel hosts
  interactive `FilterChip` content with its own value-side
  popovers — not a flat menu list.
- The "Filters" header is a non-interactive `<ListItem type="label">`
  rendering as a `<button>` per the ListItem implementation, but
  carries no `onClick` and is visually styled as a label.
- Empty state renders an `<ListItem type="empty-state">` with the
  text "No filters selected". Screen readers announce the empty
  state alongside the dialog's aria-label.
- Each FilterChip child carries its own ARIA contract (label part
  is a `<button aria-pressed={isVisible}>`; chevron part opens a
  value-side popover with its own focus management).

## Composition rules

- Always render `DropdownFilters` as a SIBLING of the main
  `DropdownOptions` panel — never nested — so the parent menu
  stays visible. The TableTopBar `OptionsMenu` helper is the
  canonical example.
- The chip children should mirror the active filters in the
  top-bar `Filters` row. Sync state between the two surfaces; do
  NOT allow adding new filters from here.
- Do not nest a `DropdownFilters` inside another `DropdownFilters`.
- Do not place full forms, inputs, or Dialogs inside the panel.

### Cross-surface handoff (canonical pattern)

The wiring is fully supported via the controlled-`open` API on
both `DropdownOptions` and `FilterChip`. The consumer lifts these
pieces of state into a single source of truth:

- `optionsOpen: boolean` — whether the parent `DropdownOptions`
  panel (the 3-dot kebab) is open.
- `openFilterId: string | null` — which `FilterChip` value popover
  is open (this is the SAME id across both the top-bar row and
  the DropdownFilters mirror).
- `showFilters: boolean` — whether the `TableTopBar` filter row is
  visible.

The mirror chip inside DropdownFilters is rendered with
`open={false}` (it never opens its own popover); its
`onOpenChange(true)` fires the handoff:

```ts
const jumpToTopbarFilter = (id: string) => {
  setShowFilters(true);     // 1. reveal the filter row if hidden
  setOptionsOpen(false);    // 2. close the parent OptionsMenu (and DropdownFilters with it)
  setOpenFilterId(id);      // 3. open the matching top-bar chip's value popover
};
```

The top-bar chip is rendered with
`open={openFilterId === f.id}` and the matching `onOpenChange` —
so when the user clicks outside or hits Escape, `openFilterId`
becomes `null` and the chip closes naturally.

This produces the exact behavior the Figma spec calls for: the
mirror panel is read-only, the click jumps focus to the top-bar
chip, the row appears if hidden, the overflow menu dismisses
itself, and the chip's value editor is open and ready.

## Known deviations

- The component spec mentions
  `--dls-color-component-dropdown-filters-*` tokens but those do
  not exist in `tokens.json`. The CSS uses semantic surface/border
  tokens directly via the composed `<List>`. (Low severity.)
- The Figma `empty` boolean is **derived** in code (it follows
  whether chips/options were passed) — there is no `empty` prop on
  the React component. (Low severity, intentional.)

(The previous "behavior-coordination" deviation is resolved.
`DropdownOptions` now exposes a controlled `open` / `onOpenChange`
API, and `FilterChip` already supports controlled `open` /
`onOpenChange`. Together, these give the consumer everything
needed to wire the full cross-surface handoff: clicking a mirror
chip closes the parent OptionsMenu, reveals the filter row if
hidden, and opens the matching top-bar chip's value popover. The
canonical wiring lives in the `Interactive` story of TableTopBar.)

## Code example

```tsx
import { DropdownFilters } from './dropdown-filters/DropdownFilters';
import { FilterChip } from './filter-chip/FilterChip';
import { List } from './list-item/List';
import { ListItem } from './list-item/ListItem';
import { Checkbox } from './checkbox/Checkbox';

// 1) Mirror the top-bar active filters as chips inside DropdownFilters.
function FiltersOverflowPanel({ activeFilters, jumpToTopbarFilter }) {
  if (activeFilters.length === 0) {
    return <DropdownFilters />;  // renders empty state
  }
  return (
    <DropdownFilters>
      {activeFilters.map(f => (
        <FilterChip
          key={f.id}
          label={f.label}
          isVisible={f.isVisible}
          size="s"
          valueSummary={
            <span className="dls-filter-chip__value-text">
              {f.values.size === 0 ? 'All' : [...f.values].join(', ')}
            </span>
          }
          // Clicking the value-side chevron jumps focus to the top-bar chip.
          onClick={() => jumpToTopbarFilter(f.id)}
        >
          {/* Same value list as in the top-bar chip's dropdown. */}
          <List className="dls-filter-chip__enum-list">
            {/* ... value items ... */}
          </List>
        </FilterChip>
      ))}
    </DropdownFilters>
  );
}

// 2) Simpler API: just the names + an onSelect callback.
<DropdownFilters
  options={[
    { id: 'status', label: 'Status' },
    { id: 'role',   label: 'Role'   },
  ]}
  onSelect={(id) => jumpToTopbarFilter(id)}
/>
```

## Cross-references

- [dropdown-options.md](dropdown-options.md)
- [filters.md](filters.md)
- [filter-chip.md](../components/filter-chip.md)
- [table-top-bar.md](table-top-bar.md)
- [list.md](../components/list.md)
- [list-item.md](../components/list-item.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)
- [../foundations/motion.md](../foundations/motion.md)

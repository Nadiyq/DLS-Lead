# Filters

Category: layout / table-control
React: <Filters>
Spec: specs/components/filters.md
TSX: apps/storybook/src/stories/filters/Filters.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-filters--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6115-13366

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a SIMULATION
of the code behavior, not the implementation.

This component uses: HYBRID.
- The Filters root itself is a passive layout container — no
  hover/pressed/focus on the bar.
- The trailing Plus add-filter Button has a tinted `intent-neutral-subtle`
  fill, so its hover/pressed states use **OKLCH L-shift** on that fill.
- Composed children (Sort chip, FilterChips, dividers, popover lists)
  carry their own state contracts.
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Dedicated filter row that sits between a table toolbar and the
table content. Hosts:
1. A **Sort** chip (column + direction).
2. A separator between sort and filters.
3. One or more **FilterChip** groups (label + value).
4. An **add-filter Plus button** that opens a popover listing the
   columns that are still available to filter by.

Filters refines what's visible in the table — never acts on the data
(no destructive or non-filtering actions). Keep filter behavior
consistent across every table in the product.

## Use when

- Between a `TableTopBar` and the table body for sort + filter
  controls (the canonical placement).
- Inside any view that combines sort + multi-criteria filtering
  in a single horizontal bar.

## Do NOT use for

- Primary action buttons → use the right slot of `TableTopBar`.
- Search → use `SearchField` in the left slot of `TableTopBar`.
- Column visibility / management → use `DropdownColumns`.
- Bulk row actions → use a toolbar row anchored to selection.

## Figma → Code mapping

| Figma property      | React prop  | Values / Notes                                     |
|---------------------|-------------|-----------------------------------------------------|
| size                | size        | `M` → `m` (default), `S` → `s`                      |
| selected            | (composition) | Figma-only structural toggle. `selected=true` means the slot contains Sort + FilterChips + Plus; `selected=false` means Sort + Plus only. In code, presence/absence of FilterChip groups in `groups` drives this. |
| (slot content)      | groups      | Array of `{ id, children }` groups. Each `children` is typically one or more `FilterChip` instances. Dividers between groups are auto-rendered by Filters. |
| —                   | showAdd     | Whether to render the trailing Plus add-filter button. Defaults to `true`. |
| —                   | onAdd       | Click handler for the Plus button when `addMenu` is NOT provided — direct-fire callback (used for simple "add the next available filter" flows). |
| —                   | addMenu     | Optional menu attached to the Plus button. Accepts a `ReactNode` or a `(close) => ReactNode` render-prop. When provided, the Plus becomes a popover trigger instead of a direct-fire button. |
| —                   | disabled    | Disable the Plus button (and apply disabled styling). |
| —                   | className   | Root class extension.                               |

## Anatomy

- Root — `.dls-filters` with `data-size="m | s"` and `role="toolbar"`,
  `aria-label="Table filters"`.
- Filter groups — each `groups[i].children` rendered in order.
- Dividers — `.dls-filters__divider` auto-inserted between groups.
- Add-filter button — `.dls-filters__add` (when `showAdd=true`).
  - When `addMenu` is provided: wrapped in `.dls-filters__add-wrapper`
    (position: relative). Plus becomes a trigger with
    `aria-haspopup="menu"` and `aria-expanded` tracking open state.
  - The popover — `.dls-filters__add-menu` (absolute, anchored below
    the Plus button, z-index 20).

## Props / API

```ts
export type FiltersSize = 'm' | 's';

export interface FilterGroup {
  id: string;
  children: React.ReactNode;
}

export type FiltersAddMenu =
  | React.ReactNode
  | ((close: () => void) => React.ReactNode);

export interface FiltersProps {
  groups: FilterGroup[];
  size?: FiltersSize;          // default 'm'
  showAdd?: boolean;           // default true
  onAdd?: () => void;          // ignored when addMenu is provided
  addMenu?: FiltersAddMenu;
  disabled?: boolean;
  className?: string;
}
```

## Tokens used

- `--dls-color-intent-neutral-subtle` (Plus button background)
- `--dls-color-border-base` (Plus button border, divider)
- `--dls-color-border-disabled`
- `--dls-color-text-secondary`, `--dls-color-text-disabled`
- `--dls-color-surface-disabled`
- `--dls-radius-component-button`
- `--dls-spacing-1`, `--dls-spacing-2`
- `--dls-state-l-delta-hover`, `--dls-state-l-delta-pressed`
- `--dls-state-focus-ring-color`
- `--dls-font-family`

## States

| State              | Figma representation       | Code implementation                                         |
|--------------------|----------------------------|--------------------------------------------------------------|
| default            | `selected=false`           | Sort + Plus only (no FilterChip groups in the `groups` array besides the sort group) |
| with filters       | `selected=true`            | Sort + FilterChips + Plus                                    |
| size M / S         | `size=M` / `size=S`        | `data-size="m"` or `"s"` — controls Plus size (32 vs 24px) and icon size |
| Plus hover         | (n/a in Figma variants)    | `:hover:not(:disabled):not([data-disabled])` → OKLCH L-shift on `--dls-color-intent-neutral-subtle` |
| Plus pressed       | (n/a)                      | `:active:not(:disabled):not([data-disabled])` → OKLCH L-shift (deeper) |
| Plus focus-visible | (n/a)                      | `:focus-visible` → 3px box-shadow focus ring                  |
| Plus disabled      | (n/a)                      | `disabled` + `[data-disabled]` → disabled surface, border, text + cursor not-allowed |
| Plus menu open     | n/a                        | `aria-expanded="true"` on the trigger; menu rendered at `top: 100% + spacing-1`, `z-index: 20` |

No spatial motion. Transitions are color-only (`background-color
150ms ease`) — no `prefers-reduced-motion` guard required.

## Accessibility contract

- Root is `<div role="toolbar">` with `aria-label="Table filters"`.
  Consumers can pass a more specific label via `aria-label` when the
  filters row binds to a named entity (e.g. "Invoices filters").
- Dividers between groups are decorative — `aria-hidden="true"`.
- Plus button: when `addMenu` is provided, exposes
  `aria-haspopup="menu"` + `aria-expanded={open}`.
- Popover wrapper: `role="menu"`. Each child `<ListItem>` carries its
  own keyboard / focus contract via the ListItem component.
- Popover closes on:
  - **Click outside** the wrapper (mousedown listener)
  - **Escape**
  - **Click on any `<ListItem>`** inside (via `onClickCapture` safety
    net — also explicit `close()` calls in render-prop callbacks)
- The Plus button itself remains keyboard-activatable via Space/Enter
  (native `<button>`).
- All composed children (FilterChip, Sort chip, DropdownSorting, etc.)
  carry their own ARIA contracts — Filters does not interfere.

## Composition rules

- **Sort group** (first): a `FilterChip` with a `labelIcon` (arrow up
  / arrow down) and a value showing the sort column; the chip's
  value-side popover is a `DropdownSorting`.
- **Filter groups** (after the separator): one or more `FilterChip`s
  per group. Each chip has:
  - Label part: filter parameter (column name) + an eye icon to
    toggle the filter's "active" / "muted" state (kept visible but
    not applied).
  - Value part: selected value summary + chevron that opens a
    `Dropdown` of possible values (list-items or math controls).
  - Each value-side dropdown ends with a `<ListItem type="with-slots"
    iconStart={<TrashIcon />} text="Remove filter">` for full removal.
- **Add-filter Plus button** (last): pass `addMenu={(close) => …}`
  rendering a `<List>` of available columns. Each `<ListItem>`'s
  onClick should add the filter to state, then call `close()` to
  dismiss the popover. Filter the available list to exclude columns
  that are already active.

## Known deviations

- The component spec mentions `--dls-color-component-filters-*`
  tokens but those do not exist in `tokens.json`. The CSS uses
  semantic surface / border / state tokens directly. Backfilling a
  dedicated filters token group is deferred. (Low severity.)
- The Figma `selected` boolean is a *structural* toggle — Figma
  shows two different default slot contents (with vs without filter
  chips). In code, `selected` does not exist; the consumer drives
  the same effect by passing more or fewer entries in `groups`.
  (Low severity — intentional.)

## Code example

```tsx
import { Filters } from './filters/Filters';
import { FilterChip } from './filter-chip/FilterChip';
import { DropdownSorting } from './dropdown-sorting/DropdownSorting';
import { List } from './list-item/List';
import { ListItem } from './list-item/ListItem';
import { Checkbox } from './checkbox/Checkbox';
import { ArrowDown, ArrowUp, Trash2 as TrashIcon } from 'lucide-react';

function TableFilters() {
  const [sort, setSort] = useState({ col: 'name', dir: 'ascending' as const });
  const [active, setActive] = useState([
    { id: 'status', label: 'Status', values: new Set(['Active']) },
  ]);
  const SortIcon = sort.dir === 'ascending' ? ArrowDown : ArrowUp;
  const available = ['Status', 'Role', 'Date', 'Department'];

  return (
    <Filters
      size="m"
      groups={[
        {
          id: 'sort',
          children: (
            <FilterChip label="Sort" labelIcon={<SortIcon />} isVisible size="m"
              valueSummary={<span className="dls-filter-chip__value-text">{sort.col}</span>}
            >
              <DropdownSorting columns={…} column={sort.col} direction={sort.dir} onColumnChange={…} onDirectionChange={…} />
            </FilterChip>
          ),
        },
        {
          id: 'filters',
          children: active.map(f => (
            <FilterChip
              key={f.id}
              label={f.label}
              isVisible
              size="m"
              valueSummary={<span className="dls-filter-chip__value-text">{f.values.size === 0 ? 'All' : [...f.values].join(', ')}</span>}
            >
              <List className="dls-filter-chip__enum-list">
                {/* value checkboxes */}
                <ListItem type="divider" />
                <ListItem
                  type="with-slots"
                  text="Remove filter"
                  iconStart={<TrashIcon />}
                  onClick={() => setActive(prev => prev.filter(x => x.id !== f.id))}
                />
              </List>
            </FilterChip>
          )),
        },
      ]}
      addMenu={(close) => {
        const used = new Set(active.map(f => f.label));
        const remaining = available.filter(label => !used.has(label));
        if (remaining.length === 0) {
          return <List><ListItem type="empty-state" text="No more filters" /></List>;
        }
        return (
          <List>
            {remaining.map(label => (
              <ListItem
                key={label}
                type="text"
                text={label}
                onClick={() => {
                  setActive(prev => [...prev, { id: label.toLowerCase(), label, values: new Set() }]);
                  close();
                }}
              />
            ))}
          </List>
        );
      }}
    />
  );
}
```

## Cross-references

- [table-top-bar.md](table-top-bar.md)
- [filter-chip.md](../components/filter-chip.md)
- [dropdown-sorting.md](../components/dropdown-sorting.md)
- [list.md](../components/list.md)
- [list-item.md](../components/list-item.md)
- [button.md](../components/button.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)
- [../foundations/motion.md](../foundations/motion.md)

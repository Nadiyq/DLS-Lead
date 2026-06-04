# DropdownColumnActions

Category: menu / table-utility
React: <DropdownColumnActions>
Spec: specs/components/dropdown-column-actions.md
TSX: apps/storybook/src/stories/dropdown-column-actions/DropdownColumnActions.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-dropdowncolumnactions--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6123-16882

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a SIMULATION
of the code behavior, not the implementation.

This component uses: HYBRID inherited from ListItem.
- The panel itself is passive — no panel-level hover/pressed/focus.
- Each composed `<ListItem type="with-slots">` carries the standard
  hybrid contract: overlay hover, info-subtle fill when selected
  (`selected={true}` paints `--dls-color-intent-info-subtle`),
  OKLCH L-shift on selected+hover.
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Per-column action menu that opens when the user clicks the on-hover
chevron in a `TableHeaderCell`. The menu surfaces seven column-scoped
actions:

1. **Sort ascending** — sets this column as the table's sort column,
   direction `asc`. Reflected in `DropdownSorting` (the Sort
   FilterChip's value popover).
2. **Sort descending** — same, direction `desc`.
3. **Filter** — opens / focuses the matching `FilterChip` in the
   `Filters` row. If no filter is active for this column yet, one is
   auto-created with the default value (e.g. "All") and shown in
   the Filters row.
4. **Pin column** / **Unpin column** — toggles pinned state.
   Reflected in `DropdownColumns` (the column's Pin Button state).
5. **Move left** — reorders the column one position to the left.
   Reflected in `DropdownColumns` (Shown section order).
6. **Move right** — reorders one position to the right. Same sync.
7. **Hide column** — moves the column to the Hidden section.
   Reflected in `DropdownColumns`.

Cross-surface sync: every mutation here must round-trip through the
consumer's shared table state so the matching `DropdownSorting`,
`DropdownColumns`, and `Filters` row surfaces stay in sync.

### Locked columns

Locked columns (primary identifier, first content column, or any
column flagged `ColumnItem.locked=true` in `DropdownColumns`) show
a REDUCED menu — only the **Sort ascending**, **Sort descending**,
and **Filter** rows render. Pin, Move left, Move right, and Hide
are forbidden by the locked contract and are omitted entirely.

## Use when

- As the on-hover column-actions menu in a `TableHeaderCell`
  (triggered by the cell's `onMenuClick` → chevron Button).
- Any place a user needs per-column sort + filter + reorder + hide
  controls in one compact popover.

## Do NOT use for

- Functional / utility columns (checkbox selection, row expansion,
  drag handle) — those columns shouldn't have a column-actions menu
  at all. The TableHeaderCell's `onMenuClick` prop is opt-in.
- Multi-column sort settings → use `DropdownSorting`.
- Bulk column visibility / order management → use `DropdownColumns`.
- Filter values → use `DropdownFilters` / the FilterChip value popover.

## Figma → Code mapping

| Figma row              | React behavior                                       |
|------------------------|-------------------------------------------------------|
| Sort ascending         | `onSortAsc()`; row is `selected={sortState === 'asc'}` → info-subtle fill. |
| Sort descending        | `onSortDesc()`; `selected={sortState === 'desc'}`.    |
| Filter                 | `onFilter()` (consumer should focus the matching FilterChip; auto-create one if absent). |
| (divider)              | Auto-rendered between Sort and Column management.     |
| Pin column / Unpin column | `onPin()`; text flips based on `pinned`; `selected={pinned}` paints info-subtle. |
| Move left              | `onMoveLeft()`; gated by `canMoveLeft` (omits onClick when false, disabling activation). |
| Move right             | `onMoveRight()`; gated by `canMoveRight`.             |
| (divider)              | Auto-rendered between Column management and Visibility. |
| Hide column            | `onHide()`.                                           |

When `locked=true`: only the first 3 rows render (no dividers, no
Pin/Move/Hide).

## Anatomy

- Root — `.dls-dropdown-column-actions` with `role="listbox"` and
  optional `data-locked` attribute.
- 7 `<ListItem type="with-slots">` rows (3 when locked) — each with
  a lucide `iconStart` and an `onClick` callback. Sort rows and
  Pin row use the `selected` prop for the info-subtle active fill.
- 2 `<ListItem type="divider">` rows (0 when locked).

## Props / API

```ts
export type SortState = 'asc' | 'desc' | 'none';

export interface DropdownColumnActionsProps {
  sortState?: SortState;       // default 'none'
  pinned?: boolean;            // default false
  canMoveLeft?: boolean;       // default true
  canMoveRight?: boolean;      // default true
  locked?: boolean;            // default false — true hides Pin/Move/Hide
  onSortAsc?: () => void;
  onSortDesc?: () => void;
  onFilter?: () => void;
  onPin?: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  onHide?: () => void;
  className?: string;
}
```

## Tokens used

- All composed `ListItem` token families (overlay hover, info-subtle
  selected, focus-visible ring, neutral-text foreground).
- `--dls-spacing-2` (panel padding via the consumer / wrapping panel)
- `--dls-font-family`

The component itself has no surface chrome — the consumer wraps it
in the panel surface they want (typically the
`TableHeaderCell.floatingMenu` slot which renders inside a `<List>`-styled
container, or directly inside `DropdownOptions`-style portal).

## States

| State                  | Figma representation       | Code implementation                          |
|------------------------|----------------------------|----------------------------------------------|
| default                | (no row pressed)           | All callbacks present; no `selected` rows.   |
| sort ascending active  | `state=pressed` on row 1   | `sortState='asc'` → row 1 `selected={true}` |
| sort descending active | `state=pressed` on row 2   | `sortState='desc'` → row 2 `selected={true}`|
| pinned                 | (Unpin column text)        | `pinned={true}` → text flips, `selected={true}` paints info-subtle |
| move left disabled     | (n/a in Figma variants)    | `canMoveLeft={false}` → row's onClick is undefined, no activation |
| move right disabled    | (n/a)                      | `canMoveRight={false}` → same                |
| locked                 | (reduced 3-row variant)    | `locked={true}` → only Sort×2 + Filter render |

No spatial motion. Color transitions on ListItem rows carry their
own contracts.

## Accessibility contract

- Root is `<div role="listbox">`.
- Each action row is a `<ListItem type="with-slots">` which renders
  as a native `<button>` (the `with-slots` variant auto-interactive).
- Lucide icons are decorative (`aria-hidden` is handled by the
  ListItem icon slot).
- Selected rows expose `aria-selected="true"` via the ListItem
  `selected` prop.
- Disabled **Move left** / **Move right** rows carry
  `aria-disabled="true"` + `data-disabled=""`. The `<button>` is
  still focusable and tabbable (so screen-reader users hear it
  announced as disabled rather than skipping past it silently),
  but its `onClick` is omitted so Enter / Space / mouse activation
  is a no-op. The visual treatment uses
  `--dls-color-text-disabled` on the row + icon + text, the
  `not-allowed` cursor, and a suppressed hover overlay.
- Locked-column menu (3 rows) is the same `role="listbox"` — there's
  no separate ARIA treatment for the reduced variant.

## Composition rules

- Always render inside a `TableHeaderCell` `floatingMenu` slot, OR
  inside a `DropdownOptions`-style portal anchored to the column
  header's chevron button. The TableHeaderCell `onMenuClick` callback
  is the canonical trigger.
- Do not render this for functional columns (checkbox, expansion,
  drag handle). The `TableHeaderCell.onMenuClick` prop is opt-in
  per column.
- When `locked={true}`, do not also disable individual Sort/Filter
  rows — those are always available regardless of locked status.

### Cross-surface sync (canonical pattern)

Every mutation must round-trip through shared table state so the
matching `DropdownSorting`, `DropdownColumns`, and `Filters` row
surfaces stay coherent:

| Action               | Synced with                                          |
|----------------------|------------------------------------------------------|
| Sort ascending/desc  | `DropdownSorting` value (column + direction)         |
| Filter               | `Filters` row — focus the matching FilterChip; auto-create if absent |
| Pin / Unpin          | `DropdownColumns` Shown row's Pin Button state       |
| Move left / right    | `DropdownColumns` Shown array order                  |
| Hide column          | `DropdownColumns` — moves the column from Shown to Hidden |

The component itself doesn't reach into other surfaces — it just
fires callbacks and the consumer's state layer applies them
everywhere.

## Known deviations

- The component spec mentions
  `--dls-color-component-dropdown-column-actions-*` tokens but those
  do not exist in `tokens.json`. The CSS uses semantic / ListItem
  tokens directly. (Low severity.)
- `Move left` / `Move right` rows in the disabled state currently
  omit their `onClick` (no activation) but do NOT carry
  `aria-disabled` or visual disabled styling. Future enhancement:
  add disabled visual + aria-disabled. (Low-medium severity.)

## Code example

```tsx
import { DropdownColumnActions } from './dropdown-column-actions/DropdownColumnActions';
import { TableHeaderCell } from './table-header-cell/TableHeaderCell';

function NameHeader({ column, sort, columns, onSort, onFilter, onPin, onMove, onHide }) {
  const idx = columns.findIndex(c => c.id === column.id);
  return (
    <TableHeaderCell
      type="text"
      text={column.label}
      sortable
      sortDirection={sort.col === column.id ? sort.dir : 'none'}
      onSort={() => onSort(column.id, sort.col === column.id && sort.dir === 'asc' ? 'desc' : 'asc')}
      onMenuClick={() => setActiveColumnMenu(column.id)}
      floatingMenu={
        activeColumnMenu === column.id ? (
          <DropdownColumnActions
            sortState={sort.col === column.id ? sort.dir : 'none'}
            pinned={column.pinned}
            canMoveLeft={idx > 0}
            canMoveRight={idx < columns.length - 1}
            locked={column.locked}
            onSortAsc={()  => { onSort(column.id, 'asc');  setActiveColumnMenu(null); }}
            onSortDesc={() => { onSort(column.id, 'desc'); setActiveColumnMenu(null); }}
            onFilter={()   => { onFilter(column.id);       setActiveColumnMenu(null); }}
            onPin={()      => { onPin(column.id);          setActiveColumnMenu(null); }}
            onMoveLeft={() => { onMove(column.id, -1);     setActiveColumnMenu(null); }}
            onMoveRight={()=> { onMove(column.id,  1);     setActiveColumnMenu(null); }}
            onHide={()     => { onHide(column.id);         setActiveColumnMenu(null); }}
          />
        ) : null
      }
    />
  );
}
```

## Cross-references

- [table-header-cell.md](table-header-cell.md)
- [dropdown-sorting.md](dropdown-sorting.md)
- [dropdown-columns.md](dropdown-columns.md)
- [dropdown-filters.md](dropdown-filters.md)
- [filter-chip.md](../components/filter-chip.md)
- [list-item.md](../components/list-item.md)
- [table-top-bar.md](table-top-bar.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)
- [../foundations/motion.md](../foundations/motion.md)

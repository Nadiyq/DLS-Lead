# TableHeaderCell

Category: table / data display
React: <TableHeaderCell>
Spec: specs/components/table-header-cell.md
TSX: apps/storybook/src/stories/table-header-cell/TableHeaderCell.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-tableheadercell--docs

Figma component sets (one React component → 3 Figma sets):
- text    → https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6481-5725
- empty   → https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6481-5807
- control → https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6481-5691

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a SIMULATION
of the code behavior, not the implementation.

This component uses: OKLCH L-SHIFT (on the muted header background).
The header surface has a tinted fill (`--dls-color-intent-neutral-subtle`),
so hover is a perceptual OKLCH shift on that fill — applied only when
the cell is `sortable`. Non-sortable headers have no hover state.
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Column header cell for data tables. Three `type` presets cover the
common header patterns:
- **text** — sortable column with a label, sort indicator, and an
  on-hover column-actions chevron (rename, hide, pin, etc.).
- **empty** — minimal 18px filler at the start/end of a header row
  (alignment with row-leading checkboxes, drag handles, etc.).
- **control** — checkbox slot for select-all behavior.

The cell handles alignment, padding, sortability, the focus contract
for keyboard sort toggling, and the resize-handle / floating-menu
slots. Row-level layout and selection live on the parent Table.

## Use when

- Rendering the first row of a data table.
- Need sortable columns with directional indicators.
- Need a select-all checkbox at the leading column.
- Need an alignment-only filler cell (e.g. leading drag-handle or
  trailing actions column).

## Do NOT use for

- Body rows → use `TableCell`.
- Non-table headers → use semantic `<h2>` / `<h3>` or a different
  layout primitive.
- Form labels → use `FormField` or `<label>`.

## Figma → Code mapping

All 3 Figma sets map to one React component via the `type` prop.

### Shared properties (across all variants)

| Figma property | React prop | Values / Notes                              |
|----------------|------------|---------------------------------------------|
| (set name)     | type       | `text` / `empty` / `control` (1:1 with the Figma component set name) |
| padding        | padding    | Figma boolean → `padding=true` (default) renders 8px horizontal padding; `false` strips it. (Not present on `empty`.) |
| hover          | —          | Figma-only visual state. In code, hover is driven by CSS `:hover:not(:disabled)` and is gated by `data-sortable`. |

### `text` (6481:5725) → `type="text"`

| Figma property | React prop      | Values / Notes                              |
|----------------|-----------------|---------------------------------------------|
| align          | align           | `left` / `center` / `right` (default `left`) |
| text           | text            | Column label string                          |
| slotSorting    | sortable        | Figma boolean toggles the sort icon. In code, set `sortable=true`; pair with `sortDirection` and `onSort`. |
| (children)     | onSort + sortDirection | `sortDirection: "none" | "asc" | "desc"` drives which lucide icon renders (ArrowUpDown / ArrowUp / ArrowDown). |
| —              | onMenuClick     | Code-only. Renders an on-hover chevron at the trailing edge of the cell that opens a column-actions menu. |
| —              | floatingMenu    | Code-only. Anchored absolute-positioned menu (column filters, etc.). |
| —              | resizeHandle    | Code-only. `<Resizable />` handle at the right edge for column resize. |

### `empty` (6481:5807) → `type="empty"`

| Figma property | React prop | Values / Notes                              |
|----------------|------------|---------------------------------------------|
| —              | —          | Empty type renders only the background bar — no text, no icon, no slot. Use to keep header alignment with leading/trailing row cells. |

### `control` (6481:5691) → `type="control"`

| Figma property | React prop  | Values / Notes                              |
|----------------|-------------|---------------------------------------------|
| padding        | padding     | true / false                                 |
| (children)     | children    | Pass a `<Checkbox>` (select-all) or another compact control. Avoid full controls (buttons, dropdowns) here. |

## Anatomy

- Root — `.dls-table-header-cell` with optional `data-type` (text is
  default and has no attribute), `data-align`, `data-padding="false"`,
  `data-sortable`. Role `columnheader`. `aria-sort` set to
  `ascending` / `descending` / `none` when sortable.
- Sort icon — `.dls-table-header-cell__sort` (lucide ArrowUp /
  ArrowDown / ArrowUpDown), `data-active` when sorted.
- Text label — `.dls-table-header-cell__text` (ellipsis-truncated).
- Slot — `.dls-table-header-cell__slot` (for the control type).
- Menu trigger — `.dls-table-header-cell__menu-trigger` (hover-visible
  chevron + button at the trailing edge; opacity 0 → 1 on cell hover
  / focus-within).
- Floating menu — `.dls-table-header-cell__floating-menu` (absolute,
  positioned below the cell; right-aligned when `align="right"`).
- Resize handle — `.dls-table-header-cell__resize` (absolute, right
  edge; opacity 0 → 1 on cell hover or active resize).

## Props / API

```ts
export type TableHeaderCellType = 'text' | 'control' | 'empty';
export type TableHeaderCellAlign = 'left' | 'center' | 'right';
export type SortDirection = 'asc' | 'desc' | 'none';

export interface TableHeaderCellProps {
  type?: TableHeaderCellType;        // default 'text'
  align?: TableHeaderCellAlign;      // default 'left'
  padding?: boolean;                 // default true
  text?: string;                     // text type only
  sortable?: boolean;                // default false
  sortDirection?: SortDirection;     // default 'none'
  onSort?: () => void;
  onMenuClick?: () => void;          // adds the column-actions chevron
  children?: React.ReactNode;        // control type slot
  floatingMenu?: React.ReactNode;
  resizeHandle?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
```

## Tokens used

- `--dls-color-intent-neutral-subtle` (header background)
- `--dls-color-border-subtle` (bottom border)
- `--dls-color-text-primary` (label, active sort icon)
- `--dls-color-text-secondary` (idle sort icon, menu chevron)
- `--dls-radius-component-button` (menu-trigger hit area radius)
- `--dls-state-l-delta-hover` (sortable hover — OKLCH shift on neutral-subtle)
- `--dls-state-hover-overlay` (menu-trigger hover)
- `--dls-state-focus-ring-color` (focus ring on menu trigger)
- `--dls-spacing-1`, `--dls-spacing-2`, `--dls-spacing-3`
- `--dls-text-m-font-size`, `--dls-text-m-line-height`
- `--dls-font-weight-normal`
- `--dls-font-family`

## States

| State        | Figma representation     | Code implementation                                       |
|--------------|--------------------------|-----------------------------------------------------------|
| default      | All three variants       | Passive render                                            |
| hover        | Figma `hover=true` overlay | `:hover:not(:disabled)` — sortable-only OKLCH L-shift on neutral-subtle. Also reveals the resize handle and menu trigger via opacity transition. |
| sortable     | text `slotSorting=true`  | `sortable=true` → `tabIndex=0`, click + Enter/Space toggle |
| asc          | n/a in Figma             | `sortDirection="asc"` → ArrowUp icon + `data-active`       |
| desc         | n/a in Figma             | `sortDirection="desc"` → ArrowDown icon + `data-active`    |
| focus-visible | n/a in Figma            | `:focus-visible` on the cell when sortable; menu trigger has its own focus ring |

Transitions on `opacity` and `background-color` are 150ms ease.
These are not spatial motion, so no `prefers-reduced-motion` guard
is required.

## Accessibility contract

- Root is `<div role="columnheader">`.
- `aria-sort` is set to `ascending` / `descending` / `none` when
  `sortable=true`; absent when the cell is not sortable.
- Sortable cells get `tabIndex={0}` and accept **Enter** / **Space**
  to toggle sort via `onSort`.
- The column-actions trigger (`onMenuClick`) is a native `<button>`
  with `aria-label="Column menu for {text}"`. It stops propagation
  so clicking it never toggles sort.
- The select-all checkbox (`type="control"`) is a child Checkbox
  component — its own native semantics apply.
- The empty type renders only a background filler; it is not
  focusable and contributes no accessible name. Provide a sibling
  header with a real `aria-label` when the row's leading cell
  represents a meaningful column (e.g. selection).

## Composition rules

- Always render inside a Table's header row context.
- Within a single header row, the **first** cell is typically
  `type="control"` with a select-all `<Checkbox>` (or `type="empty"`
  to align with a leading drag-handle column).
- Sortable cells should be `type="text"` with `sortable={true}`. The
  parent table or column model owns the controlled `sortDirection`
  and `onSort` callback so only one column is sorted at a time.
- The on-hover chevron (`onMenuClick`) is the canonical place for
  column-level actions (rename, hide, pin left, pin right, etc.) —
  not the sort affordance.

## Known deviations

- The component spec mentions `--dls-color-component-table-header-cell-*`
  tokens but those do not exist in `tokens.json`. The CSS uses
  semantic surface / border / text tokens directly. Backfilling a
  dedicated header-cell token group is deferred. (Low severity.)
- The Figma `text` set exposes a `hover` boolean as a variant; in
  code, hover is driven by CSS pseudo-classes and is gated by
  `data-sortable` (non-sortable headers do not show a hover state).
  (Low severity — intentional.)

## Code example

```tsx
import { TableHeaderCell } from './table-header-cell/TableHeaderCell';
import { Checkbox } from './checkbox/Checkbox';

function TableHeader() {
  const [sort, setSort] = React.useState<{ col: string; dir: 'asc' | 'desc' }>(
    { col: 'name', dir: 'asc' }
  );
  const toggle = (col: string) =>
    setSort((s) => ({
      col,
      dir: s.col === col && s.dir === 'asc' ? 'desc' : 'asc',
    }));

  return (
    <div role="row">
      {/* Leading control column with select-all */}
      <TableHeaderCell type="control"><Checkbox /></TableHeaderCell>

      {/* Sortable text column with column-actions chevron */}
      <TableHeaderCell
        type="text"
        text="Name"
        sortable
        sortDirection={sort.col === 'name' ? sort.dir : 'none'}
        onSort={() => toggle('name')}
        onMenuClick={() => openColumnMenu('name')}
      />

      <TableHeaderCell
        type="text"
        align="right"
        text="Amount"
        sortable
        sortDirection={sort.col === 'amount' ? sort.dir : 'none'}
        onSort={() => toggle('amount')}
      />

      {/* Trailing alignment filler */}
      <TableHeaderCell type="empty" />
    </div>
  );
}
```

## Cross-references

- [table.md](../components/table.md)
- [table-cell.md](../components/table-cell.md)
- [table-column.md](../components/table-column.md)
- [checkbox.md](../components/checkbox.md)
- [resizable.md](../components/resizable.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)
- [../foundations/motion.md](../foundations/motion.md)

# TableColumn

Category: table / data display
React: <TableColumn>
Spec: specs/components/table-column.md
TSX: apps/storybook/src/stories/table-column/TableColumn.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-tablecolumn--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6123-18069

The Figma frame at this node contains the 12 column-type symbols
shown below — each maps 1:1 to a value of the React `type` prop:

| Figma symbol            | Node ID    | React type           |
|-------------------------|------------|-----------------------|
| type=text               | 6123:18068 | `text`               |
| type=number             | 6123:18070 | `number`             |
| type=checkbox           | 6123:18199 | `checkbox`           |
| type=date               | 6123:18342 | `date`               |
| type=badge              | 6123:18438 | `badge`              |
| type=user               | 6123:19898 | `user`               |
| type=users-stacked      | 6123:19475 | `users-stacked`      |
| type=two-line           | 6123:19060 | `two-line`           |
| type=two-line+avatar    | 6123:20371 | `two-line+avatar`    |
| type=icon-shape         | 6124:21428 | `icon-shape`         |
| type=card               | 6123:19267 | `card`               |
| type=actions            | 6123:18642 | `actions`            |

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a SIMULATION
of the code behavior, not the implementation.

This component uses: NONE on the TableColumn wrapper itself. All
interactive states (row hover, selection, focus) live on the parent
`Table` / row layer. The TableColumn just lays out a `TableHeaderCell`
plus repeated typed `TableCell`s.
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

A typed column primitive for `Table`. One `TableColumn` defines:
- The **header** — auto-derived from the column type's default
  (`Text`, `Number`, `Date`, etc.) or overridden via `header`.
- The repeated **cells** — one `TableCell` per row, rendered with
  the type-appropriate content shape (`text`, `two-line`, `badge`,
  `actions`, etc.).

The 12 types map directly to the TableCell types documented in
`table-cell.md` — TableColumn just chooses the right TableCell
variant + populates it from each `rows[i]` entry.

## Use when

- Composing a `Table` from typed column primitives instead of
  hand-rolling per-row markup.
- Need a consistent column-type vocabulary across many tables in
  the app (text/number/date/badge/user/etc.).
- Demo / Storybook context for showing column-type patterns.

## Do NOT use for

- Header-row-only surfaces → use `TableHeaderCell` directly.
- Single cells in a custom row → use `TableCell` directly.
- The full table chrome (toolbar + filter row + body + footer) →
  compose `Table` + `TableTopBar` + `Filters` + columns.

## Figma → Code mapping

| Figma property | React prop | Values / Notes                                  |
|----------------|------------|--------------------------------------------------|
| (variant name) | type       | One of the 12 type-* symbols (1:1 with React enum values listed above). |
| (header text)  | header     | Override the default header. Omit to inherit per-type default ("Text", "Number", "Checkbox" rendered as a Checkbox in the header cell, etc.). |
| (row data)     | rows       | Array of `TableColumnRow` — shape varies by `type`. See Props/API for the union. |
| —              | sortable   | Whether the header is sortable (renders the sort glyph + makes the header cell `aria-sort`-aware). Defaults false. |
| —              | className  | Root class extension.                            |

## Anatomy

- Root — `.dls-table-column` (a vertical stack of one
  `TableHeaderCell` and one `TableCell` per row).
- Header — `<TableHeaderCell>` configured by type:
  - `type="checkbox"` → `<TableHeaderCell type="control"><Checkbox /></TableHeaderCell>`
  - All other types → `<TableHeaderCell text={headerText} align={...} sortable={...} />`
- Cells — `<TableCell>` per row, rendered via `renderCell(type, row)`
  using the type-appropriate variant:
  - `text`, `date` → `<TableCell type="text">`
  - `number` → `<TableCell type="text" align="right">`
  - `checkbox` → `<TableCell type="slot" align="center"><Checkbox /></TableCell>`
  - `badge` → `<TableCell type="badge"><StatusBadge /></TableCell>`
  - `user` → `<TableCell type="text" slotLeft={<Avatar />} />`
  - `users-stacked` → `<TableCell type="slot"><AvatarStack /></TableCell>`
  - `two-line` → `<TableCell type="two-line">`
  - `two-line+avatar` → `<TableCell type="two-line" slotLeft={<Avatar />} />`
  - `icon-shape` → `<TableCell type="slot"><IconShape /></TableCell>`
  - `card` → `<TableCell type="slot">{cardMarkup}</TableCell>` (Mastercard logo + masked digits)
  - `actions` → `<TableCell type="actions" align="center"><Button.../><Button.../></TableCell>`

## Props / API

```ts
export type TableColumnType =
  | 'text'
  | 'number'
  | 'checkbox'
  | 'date'
  | 'badge'
  | 'user'
  | 'users-stacked'
  | 'two-line'
  | 'two-line+avatar'
  | 'icon-shape'
  | 'card'
  | 'actions';

export interface TableColumnRow {
  text?: string;
  secondaryText?: string;
  badgeLabel?: string;
  badgeIntent?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  initials?: string;
  avatarSrc?: string;
  stackedCount?: number;        // legacy — use users[] for the full list
  users?: { name: string; initials?: string; src?: string }[];
  cardLast4?: string;
  checked?: boolean;
  render?: React.ReactNode;     // generic escape hatch
}

export interface TableColumnProps {
  type: TableColumnType;
  header?: string;
  rows: TableColumnRow[];
  sortable?: boolean;
  className?: string;
}
```

## Tokens used

- All token families inherited from composed components:
  - `TableHeaderCell` (header)
  - `TableCell` (rows)
  - `Avatar`, `AvatarStack` (user, users-stacked, two-line+avatar)
  - `Badge` (badge — currently a thin local helper using
    intent-{intent}-subtle/text/border)
  - `Button` (actions, icon-only ghost with aria-label)
  - `Checkbox` (checkbox column)
  - `IconShape` (icon-shape column)
- `--dls-spacing-*` and `--dls-font-family` via the wrapper.

The TableColumn root itself has no surface chrome — it's a layout
container that delegates everything to its composed cells.

## States

| State                | Figma representation       | Code implementation                  |
|----------------------|----------------------------|--------------------------------------|
| default              | All 12 type-* symbols       | Static column render                 |
| sortable header      | (sort glyph visible)        | `sortable={true}` → TableHeaderCell renders the sort glyph + accepts onSort |
| ascending/descending | n/a in the column variants  | `sortable` only — direction is owned by the parent Table (passed to TableHeaderCell.sortDirection) |

Row-level hover / selection are owned by the parent Table / row
primitive — TableColumn doesn't render those affordances.

## Accessibility contract

- The TableColumn root is a plain `<div>` — semantic table grouping
  is the responsibility of the parent `Table` component (which
  should provide the `role="table"` / `role="grid"` and row
  primitives).
- The composed `TableHeaderCell` carries `role="columnheader"` +
  `aria-sort` when sortable.
- Each composed `TableCell` carries `role="cell"`.
- `actions` cell uses native icon-only `<Button>`s with `aria-label`
  ("Edit", "Delete" by default).
- `checkbox` column renders a real `<Checkbox>` in both the header
  (select-all) and each cell, each carrying its native `<input
  type="checkbox">` + `<label>` semantics.
- `user` / `users-stacked` / `two-line+avatar` cells render real
  `Avatar` / `AvatarStack` components that carry their own alt /
  initials accessibility contract.
- The local `StatusBadge` helper (used by `badge` columns) is a
  passive `<span>` — its text provides the accessible name.

## Composition rules

- Render `TableColumn`s as siblings inside a `Table` row container
  (the parent table provides the row layout — typically a CSS grid
  with one column per `TableColumn`).
- Use the type that matches your data: don't render numeric data
  with `type="text"` (the alignment will be wrong).
- For one-off cell shapes not covered by the 12 types, use
  `type="actions"` or `type="icon-shape"` with the `render` escape
  hatch on individual rows, OR drop down to composing `TableCell`
  directly.
- Bulk row selection: use the `checkbox` column as the first
  column. The header renders a select-all Checkbox; each cell
  renders the row's own Checkbox (controlled by `rows[i].checked`).
- Don't compose `TableColumn` inside a `Button`, `ListItem`, or
  other interactive ancestor.

## Known deviations

- The `card` type's masked digits use a small inline composition
  (`••••` + last 4) rather than a dedicated DLS primitive. The
  Mastercard logo comes from the `brand-logos` asset module.
  Future enhancement: extract a `<CardNumber>` helper if used in
  more than ~3 places. (Low severity.)
- **Architecture boundary — TableColumn intentionally does not own
  `pinned` / `locked` flags.** This is a design decision, not a TODO.
  - `locked` has **zero render implication** on the column itself.
    It's a UI-state flag the *management surfaces* consume to gate
    user actions: `DropdownColumns` hides the Pin Button and skips
    the row from the drop hit-test for locked columns;
    `DropdownColumnActions` hides Pin / Move-left / Move-right /
    Hide rows for locked columns. A locked column **looks identical**
    to a non-locked one when rendered. Adding `locked` to TableColumn
    would be a no-op prop.
  - `pinned` has a real visual implication (`position: sticky` on
    cells) but **cannot be implemented correctly at the TableColumn
    level alone**. Each pinned column's `left` offset depends on the
    cumulative width of pinned columns *before* it — math that
    requires Table-level coordination. Doing it partially at
    TableColumn would render multiple pinned columns stacked at
    `left: 0`, which is silently broken.
  - **The proper fix** is to lift a `ColumnModel` into the parent
    `Table` (`columns: ColumnModel[]` + `onColumnsChange`) where the
    model owns pinned/locked/hidden/order. Today the consumer
    derives the rendered TableColumn props from their own column
    state (typically driven by `DropdownColumns` +
    `DropdownColumnActions`). This works correctly until a real
    consumer needs horizontally-scrolling tables with sticky pinned
    columns, at which point the proper fix is the ColumnModel
    refactor — not adding props piecemeal to TableColumn.

(The previous "no DLS text-only Badge primitive exists" deviation
was wrong. The DLS `<Badge>` component IS the text-only badge —
takes the label as `children`, 4 variants × 5 intents × 3 sizes,
plus optional icons and a dot. TableColumn now composes `<Badge>`
directly instead of duplicating it with a local helper.)

## Code example

```tsx
import { TableColumn } from './table-column/TableColumn';

<TableColumn
  type="user"
  header="Owner"
  rows={[
    { text: 'Nadiia Abrosimova', initials: 'NA' },
    { text: 'Anthony Bricks',    initials: 'AB' },
  ]}
/>

<TableColumn
  type="actions"
  header=""
  rows={[
    { /* default Edit + Delete buttons */ },
    { render: <CustomActions /> },
  ]}
/>

<TableColumn
  type="badge"
  header="Status"
  sortable
  rows={[
    { badgeLabel: 'Active',   badgeIntent: 'success' },
    { badgeLabel: 'Pending',  badgeIntent: 'warning' },
    { badgeLabel: 'Archived', badgeIntent: 'neutral' },
  ]}
/>
```

## Cross-references

- [table.md](../components/table.md)
- [table-cell.md](table-cell.md)
- [table-header-cell.md](table-header-cell.md)
- [table-top-bar.md](table-top-bar.md)
- [dropdown-columns.md](dropdown-columns.md)
- [dropdown-column-actions.md](dropdown-column-actions.md)
- [avatar.md](../components/avatar.md)
- [avatar-stack.md](../components/avatar-stack.md)
- [button.md](../components/button.md)
- [checkbox.md](../components/checkbox.md)
- [icon-shape.md](../components/icon-shape.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)
- [../foundations/motion.md](../foundations/motion.md)

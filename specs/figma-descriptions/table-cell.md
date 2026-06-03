# TableCell

Category: table / data display
React: <TableCell>
Spec: specs/components/table-cell.md
TSX: apps/storybook/src/stories/table-cell/TableCell.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-tablecell--docs

Figma component sets (one React component → 9 Figma component sets):
- text          → https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6097-25506
- actions       → https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6108-9131
- users-stacked → https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6478-6615
- credit-card   → https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6478-6649
- slot          → https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6478-5051
- two-line      → https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6481-3990
- badge         → https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6478-6508
- trend         → https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6812-61070
- button        → https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6478-6530

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a SIMULATION
of the code behavior, not the implementation.

This component uses: NONE. TableCell is a passive layout container.
Row hover, selection, focus, and disabled all live on the parent
Table / TableRow surface; TableCell only positions content.
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Single content cell for a data table row. Nine `type` presets cover
the common data patterns (plain text, two-line entity, badge, trend
percentage, primary button, action icon group, free slot, stacked
avatars, credit card mark). Each cell handles alignment, padding,
and content slots — but state, selection, and interactive surface
treatment live on the parent Table / TableRow.

## Use when

- Rendering individual content cells inside data tables.
- Need one of the 9 canonical patterns (text, two-line, badge,
  trend, button, actions, slot, users-stacked, credit-card).
- Need consistent alignment, padding, and bottom-border across
  a row of cells.

## Do NOT use for

- Header rows → use `TableHeaderCell`.
- Whole-row containers → use the table row primitive.
- Non-tabular content → use `Item` (stand-alone), `Card`, or
  `ListItem` (in a listbox).
- Action grids outside tables → use `ButtonGroup`.

## Figma → Code mapping

All 9 Figma component sets map to one React component via the
`type` prop. Shared Figma properties exist across the variants;
the cell-specific properties are listed per variant below.

### Shared properties (every variant)

| Figma property | React prop | Values / Notes                                  |
|----------------|------------|--------------------------------------------------|
| align          | align      | `left` / `center` / `right` (default `left`)     |
| padding        | padding    | Figma boolean → `padding=true` (default) renders 8px horizontal padding; `false` strips horizontal padding. |
| (variant set name) | type   | Figma component set name maps 1:1 to the `type` prop value. |

### `text` (6097:25506) → `type="text"`

| Figma property      | React prop  | Notes                              |
|---------------------|-------------|-------------------------------------|
| type (sub-variant)  | —           | `text` / `with slots` / `with checkbox` / `with icon` — collapsed in code into the same `text` type; just pass `slotLeft`, `slotRight`, or `icon` instead of switching variants. |
| text                | text        | Primary string.                     |
| slotLeft + slotLeftContent  | slotLeft  | Pass a checkbox, avatar, or icon. |
| slotRight + slotRightContent | slotRight| Pass a chevron, badge dot, etc.   |

### `two-line` (6481:3990) → `type="two-line"`

| Figma property      | React prop      | Notes                          |
|---------------------|-----------------|---------------------------------|
| text                | text            | Primary line.                   |
| secondary           | secondaryText   | Secondary line beneath primary. |
| slotLeft            | slotLeft        | Avatar / checkbox typical.      |

### `badge` (6478:6508) → `type="badge"`

| Figma property | React prop | Notes                                  |
|----------------|------------|----------------------------------------|
| (badge slot)   | children   | Compose `<Badge>` directly as the child. |

### `trend` (6812:61070) → `type="trend"`

| Figma property | React prop | Notes                                  |
|----------------|------------|----------------------------------------|
| direction      | children   | Render a trend visualization as the child — a lucide `TrendingUp`/`TrendingDown` icon paired with a value, using `--dls-color-intent-success-text` for up and `--dls-color-intent-danger-text` for down. |

### `button` (6478:6530) → `type="button"`

| Figma property | React prop | Notes                                  |
|----------------|------------|----------------------------------------|
| (button slot)  | children   | Compose `<Button variant="soft|ghost" size="m">` as the child. |

### `actions` (6108:9131) → `type="actions"`

| Figma property | React prop | Notes                                  |
|----------------|------------|----------------------------------------|
| (actions slot) | children   | Compose a row of ghost icon-only `<Button>`s (Edit, Copy, Delete, More, etc.) with `aria-label`. |

### `slot` (6478:5051) → `type="slot"`

| Figma property | React prop | Notes                                  |
|----------------|------------|----------------------------------------|
| (slot)         | children   | Free slot for any component (chips, progress, etc.). Reserve for patterns not covered by the other 8 types. |

### `users-stacked` (6478:6615) → `type="users-stacked"`

| Figma property | React prop | Notes                                  |
|----------------|------------|----------------------------------------|
| (avatar group) | children   | Compose `<AvatarStack>` as the child.   |

### `credit-card` (6478:6649) → `type="credit-card"`

| Figma property | React prop | Notes                                  |
|----------------|------------|----------------------------------------|
| (brand mark)   | children   | Compose the card brand mark (Mastercard, Visa, etc.) followed by the masked card digits (e.g. `•••• 1234`). |

## Anatomy

- Root — `.dls-table-cell` with `data-type`, `data-align`, optional
  `data-padding="false"` to strip horizontal padding; role="cell".
- Slot left — `.dls-table-cell__slot`
- Icon — `.dls-table-cell__icon` (16×16)
- Text — `.dls-table-cell__text` (ellipsis-truncated)
- Text group (two-line) — `.dls-table-cell__text-group`
  - Primary — `.dls-table-cell__text`
  - Secondary — `.dls-table-cell__secondary`
- Slot right — `.dls-table-cell__slot`
- Children — for `badge`, `trend`, `button`, `actions`, `slot`,
  `users-stacked`, and `credit-card`, the consumer renders the
  child component directly.

## Props / API

```ts
export type TableCellAlign = 'left' | 'center' | 'right';

export type TableCellType =
  | 'text'
  | 'two-line'
  | 'badge'
  | 'trend'
  | 'button'
  | 'actions'
  | 'slot'
  | 'users-stacked'
  | 'credit-card';

export interface TableCellProps {
  type?: TableCellType;         // default 'text'
  align?: TableCellAlign;       // default 'left'
  padding?: boolean;            // default true
  text?: string;
  secondaryText?: string;       // two-line only
  icon?: React.ReactNode;       // text type leading icon
  slotLeft?: React.ReactNode;
  slotRight?: React.ReactNode;
  children?: React.ReactNode;   // for badge / trend / button / actions / slot / users-stacked / credit-card
  className?: string;
  style?: React.CSSProperties;
}
```

## Tokens used

- `--dls-color-text-primary` (primary text)
- `--dls-color-text-placeholder` (two-line secondary)
- `--dls-color-text-secondary` (leading icon color)
- `--dls-color-border-subtle` (bottom border)
- `--dls-color-intent-success-text` / `--dls-color-intent-danger-text`
  (trend up / down — applied by the consumer when composing the
  Trend child)
- `--dls-spacing-1`, `--dls-spacing-1-5`, `--dls-spacing-2`
- `--dls-text-m-font-size`, `--dls-text-m-line-height`
- `--dls-text-s-font-size`, `--dls-text-s-line-height` (secondary)
- `--dls-font-weight-normal`
- `--dls-font-family`

## States

| State    | Figma representation         | Code implementation       |
|----------|------------------------------|---------------------------|
| default  | All variants                 | Passive render            |

Row-level hover, selection, focus, and disabled all live on the
parent Table / TableRow surface — TableCell itself has no
interactive states. No motion, so no `prefers-reduced-motion` guard
required.

## Accessibility contract

- Root is `<div role="cell">`. Consumers compose cells inside a
  parent `<div role="row">` (provided by the Table component).
- Primary text uses `text-overflow: ellipsis` with `white-space: nowrap`
  for safe truncation in narrow columns. Provide a tooltip or full
  text in `aria-label` when content is likely to be truncated.
- Cells with checkboxes (`type="text"` + `slotLeft={<Checkbox/>}`)
  rely on the Checkbox component for its own keyboard and ARIA
  semantics — TableCell does not interfere.
- Action button rows (`type="actions"`) use icon-only `<Button>`
  children with `aria-label` for each action.
- Trend cells use color + an icon to indicate direction so the
  signal is not color-only.

## Composition rules

- TableCell is always rendered inside a Table row context.
  Standalone usage is not supported.
- Within a single column, use the same `type` and `align` across all
  rows so the column scans consistently.
- For two-line entity cells (user / product / record + secondary
  metadata), prefer `type="two-line"` over hand-rolling stacked text.
- The `slot` type is the catch-all for patterns not covered by the
  other 8 types — when you find yourself reaching for it twice for
  the same pattern, add a new dedicated type to the React component
  and the Figma component set.

## Known deviations

- The component spec references `--dls-color-component-table-cell-*`
  tokens but they do not exist in `tokens.json`. The CSS uses
  semantic text / border / spacing tokens directly. Backfilling a
  dedicated table-cell token group is deferred until consumers need
  it. (Low severity.)
- Figma defines `text` as a single component set with sub-variants
  for `type=text|with slots|with checkbox|with icon`. The React
  component collapses these into one `type="text"` and exposes
  `icon` / `slotLeft` / `slotRight` props instead of switching
  variants. (Low severity — intentional simplification.)

## Code example

```tsx
import { TableCell } from './table-cell/TableCell';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Button } from './Button';
import { Checkbox } from './checkbox/Checkbox';
import { Pencil as PencilIcon, Trash2 as TrashIcon, TrendingUp as TrendingUpIcon } from 'lucide-react';

// Plain text with leading checkbox
<TableCell type="text" text="Acme Corp" slotLeft={<Checkbox />} />

// Two-line entity
<TableCell
  type="two-line"
  text="Nadiia Abrosimova"
  secondaryText="Designer"
  slotLeft={<Avatar size="32" initials="NA" />}
/>

// Badge cell
<TableCell type="badge">
  <Badge intent="success">Active</Badge>
</TableCell>

// Trend cell
<TableCell type="trend" align="right">
  <span style={{ color: 'var(--dls-color-intent-success-text)' }}>
    <TrendingUpIcon /> +12.4%
  </span>
</TableCell>

// Actions cell
<TableCell type="actions" align="right">
  <Button variant="ghost" size="m" iconOnly icon={<PencilIcon />} aria-label="Edit" />
  <Button variant="ghost" size="m" iconOnly icon={<TrashIcon />}  aria-label="Delete" />
</TableCell>
```

## Cross-references

- [table.md](../components/table.md)
- [table-header-cell.md](../components/table-header-cell.md)
- [table-column.md](../components/table-column.md)
- [avatar.md](../components/avatar.md)
- [avatar-stack.md](../components/avatar-stack.md)
- [badge.md](../components/badge.md)
- [button.md](../components/button.md)
- [checkbox.md](../components/checkbox.md)

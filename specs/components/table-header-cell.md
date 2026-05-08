---
name: TableHeaderCell
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/table-header-cell/TableHeaderCell.tsx
  - apps/storybook/src/stories/table-header-cell/table-header-cell.css
  - tokens/tokens.json
---

# TableHeaderCell

## Metadata

- Category: table / data display
- Types: `text | control | empty`

## Overview

Use `TableHeaderCell` for column headers in a table grid. Supports sortable columns with directional indicators.

## Anatomy

- Root (role="columnheader")
- Sort icon (ArrowUp / ArrowDown / ArrowUpDown)
- Header text
- Slot (control type for checkboxes etc.)

## Tokens Used

- `--dls-color-component-table-header-cell-*`
- `--dls-spacing-*`

## Props / API

- `type` — `text | control | empty`
- `align` — `left | center | right`
- `padding`
- `text`
- `sortable`, `sortDirection` — `asc | desc | none`
- `onSort`
- `children` (for control type)

## States

- default
- sortable (idle)
- sort ascending
- sort descending
- focus-visible (keyboard sort toggle)

## Code Example

```tsx
<TableHeaderCell text="Name" sortable sortDirection="asc" onSort={toggleSort} />
<TableHeaderCell type="control"><Checkbox /></TableHeaderCell>
```

## Cross-References

- [table-cell.md](table-cell.md)
- [table.md](table.md)

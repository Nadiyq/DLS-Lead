---
name: TableCell
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/table-cell/TableCell.tsx
  - apps/storybook/src/stories/table-cell/table-cell.css
  - tokens/tokens.json
---

# TableCell

## Metadata

- Category: table / data display
- Types: `text | two-line | badge | trend | button | actions | slot | users-stacked | credit-card`

## Overview

Use `TableCell` for individual data cells inside table rows. Nine type presets handle common data patterns.

## Anatomy

- Root (role="cell")
- Slot left (avatar, checkbox)
- Icon (optional)
- Text or text group (primary + secondary for two-line)
- Slot right
- Children (badge, button, actions, slot types)

## Tokens Used

- `--dls-color-component-table-cell-*`
- `--dls-spacing-*`

## Props / API

- `type`
- `align` — `left | center | right`
- `padding` — include horizontal padding
- `text`, `secondaryText`
- `icon`
- `slotLeft`, `slotRight`
- `children`

## States

- static (layout only, no interactive states)

## Code Example

```tsx
<TableCell type="two-line" text="Nadiia Abrosimova" secondaryText="Designer"
  slotLeft={<Avatar size="32" initials="NA" />} />
```

## Cross-References

- [table-header-cell.md](table-header-cell.md)
- [table-column.md](table-column.md)
- [table.md](table.md)

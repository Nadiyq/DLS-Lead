---
name: Table Column
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/table-column/TableColumn.tsx
  - apps/storybook/src/stories/table-header-cell/TableHeaderCell.tsx
---

# Table Column

## Metadata

- Category: data display
- Parent: `Table`
- Types:
  - `text`
  - `number`
  - `checkbox`
  - `date`
  - `badge`
  - `user`
  - `users-stacked`
  - `two-line`
  - `two-line+avatar`
  - `icon-shape`
  - `card`
  - `actions`

## Overview

Use `TableColumn` to define one typed column inside `Table`. The type determines header and cell rendering.

## Anatomy

- Column wrapper
- Header cell
- Repeated typed row cells

## Tokens Used

- table header and row token families
- child component tokens from `Badge`, `Avatar`, `Button`, `Checkbox`, `IconShape`

## Props / API

- `type`
- `header`
- `rows`
- `sortable`
- `className`

Row data can include:

- `text`
- `secondaryText`
- `badgeLabel`
- `badgeIntent`
- `initials`
- `avatarSrc`
- `stackedCount`
- `cardLast4`
- `checked`
- `render`

## States

- sortable vs non-sortable
- selected row content when child cell type supports it

## Code Example

```tsx
<TableColumn
  type="user"
  header="Owner"
  rows={[
    { text: "Nadiia Abrosimova", initials: "NA" }
  ]}
/>
```

## Cross-References

- [table.md](table.md)
- [badge.md](badge.md)
- [button.md](button.md)

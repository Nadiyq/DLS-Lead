---
name: Table
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/table/Table.tsx
  - apps/storybook/src/stories/table-column/TableColumn.tsx
  - tokens/tokens.json
---

# Table

## Metadata

- Category: data display
- Composes: `TableColumn`

## Overview

Use `Table` for dense, structured, multi-row data with headers and optional pagination.

`Table` is the layout shell. Individual columns are modeled with `TableColumn`.

## Anatomy

- Root table wrapper
- Optional top bar
- Grid-based column area
- Optional pagination area

## Tokens Used

- `color.component.table.*`
- `--dls-radius-component-table`
- surface and border semantic tokens

## Props / API

- `topBar`
- `children`
- `columns`
- `layout` — `columns` for legacy column composition, `rows` for interactive row-based table stories
- `rowCount`
- `mobileRows` — compact two-column mobile row list
- `showPagination`
- `totalItems`
- `itemsPerPage`
- `itemsPerPageOptions`
- `currentPage`
- `totalPages`
- `onPageChange`
- `onItemsPerPageChange`

## States

- default
- paginated
- horizontally scrollable
- mobile row-list layout
- selected-row styling through child columns and cells

## Code Example

```tsx
<Table columns="2fr 1fr 120px" rowCount={3}>
  <TableColumn type="text" header="Name" rows={[{ text: "Acme" }]} />
  <TableColumn type="badge" header="Status" rows={[{ badgeLabel: "Active", badgeIntent: "success" }]} />
  <TableColumn type="actions" rows={[{}]} />
</Table>
```

## Cross-References

- [table-column.md](table-column.md)
- [card.md](card.md)
- [empty-state.md](empty-state.md)

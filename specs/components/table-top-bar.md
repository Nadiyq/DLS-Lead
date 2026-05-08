---
name: TableTopBar
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/table-top-bar/TableTopBar.tsx
  - apps/storybook/src/stories/table-top-bar/table-top-bar.css
  - tokens/tokens.json
---

# TableTopBar

## Metadata

- Category: table toolbar

## Overview

Use `TableTopBar` above a table for search, action buttons, and an optional filter row. Slot-based composition.

## Anatomy

- Root (role="toolbar")
- Main row: left slot + right slot
- Filters row (optional, toggled by `showFilters`)

## Tokens Used

- `--dls-color-component-table-top-bar-*`
- `--dls-spacing-*`

## Props / API

- `slotLeft` — search, filter trigger
- `slotRight` — action buttons
- `showFilters` — toggle filters row
- `filters` — filter content (Filters component)

## States

- without filters
- with filters visible

## Code Example

```tsx
<TableTopBar
  slotLeft={<SearchField placeholder="Search..." />}
  slotRight={<Button variant="filled">Add new</Button>}
  showFilters
  filters={<Filters groups={filterGroups} />}
/>
```

## Cross-References

- [table.md](table.md)
- [filters.md](filters.md)
- [search-field.md](search-field.md)

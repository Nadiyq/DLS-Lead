---
name: DropdownColumnActions
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/dropdown-column-actions/DropdownColumnActions.tsx
  - apps/storybook/src/stories/dropdown-column-actions/dropdown-column-actions.css
  - tokens/tokens.json
---

# DropdownColumnActions

## Metadata

- Category: table utilities

## Overview

Use `DropdownColumnActions` for the per-column action menu in a table header — sort, filter, pin, reorder, and hide.

## Anatomy

- Root (role="listbox")
- Sort section: ascending, descending, filter
- Divider
- Column management: pin/unpin, move left, move right
- Divider
- Visibility: hide column

## Tokens Used

- `--dls-color-component-dropdown-column-actions-*`
- list-item token families

## Props / API

- `sortState` — `asc | desc | none`
- `pinned`
- `canMoveLeft`, `canMoveRight`
- `onSortAsc`, `onSortDesc`
- `onFilter`, `onPin`
- `onMoveLeft`, `onMoveRight`
- `onHide`

## States

- sort active (asc or desc selected)
- pinned
- move disabled (first/last column)

## Code Example

```tsx
<DropdownColumnActions sortState="asc" pinned={false} canMoveLeft canMoveRight
  onSortAsc={handleSortAsc} onHide={handleHide} />
```

## Cross-References

- [table-header-cell.md](table-header-cell.md)
- [table.md](table.md)

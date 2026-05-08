---
name: DropdownColumns
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/dropdown-columns/DropdownColumns.tsx
  - apps/storybook/src/stories/dropdown-columns/dropdown-columns.css
  - tokens/tokens.json
---

# DropdownColumns

## Metadata

- Category: table utilities

## Overview

Use `DropdownColumns` for the column visibility/reorder panel in a table. Users drag to reorder, toggle pin state, and show/hide columns. Changes apply on confirm.

## Anatomy

- Root (role="listbox")
- Title: "Show columns"
- Shown section: draggable rows with pin toggle
- Hidden section: rows that can be re-shown
- Footer: Cancel + Apply buttons

## Tokens Used

- `--dls-color-component-dropdown-columns-*`
- list-item token families

## Props / API

- `shown` — visible columns `{ id, label, pinned? }[]`
- `hidden` — hidden columns `{ id, label }[]`
- `onChange` — live reorder callback
- `onApply` — confirm callback
- `onCancel`

## States

- dragging row
- drag-over target
- pinned columns

## Code Example

```tsx
<DropdownColumns
  shown={[{ id: "name", label: "Name" }, { id: "status", label: "Status", pinned: true }]}
  hidden={[{ id: "email", label: "Email" }]}
  onApply={handleApply} onCancel={handleCancel} />
```

## Cross-References

- [table.md](table.md)
- [dropdown-column-actions.md](dropdown-column-actions.md)

---
name: DropdownSorting
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/dropdown-sorting/DropdownSorting.tsx
  - apps/storybook/src/stories/dropdown-sorting/dropdown-sorting.css
  - tokens/tokens.json
---

# DropdownSorting

## Metadata

- Category: table utilities
- Directions: `ascending | descending`

## Overview

Use `DropdownSorting` for a table sort settings panel — choose which column and which direction. Uses two `Dropdown` selects internally.

## Anatomy

- Root (role="dialog")
- Column dropdown (label="Column")
- Direction dropdown (label="Sort")

## Tokens Used

- `--dls-color-component-dropdown-sorting-*`
- dropdown token families

## Props / API

- `columns` — `{ value, label }[]`
- `column` — selected column value
- `direction` — `ascending | descending`
- `onColumnChange`, `onDirectionChange`

## States

- column selected
- direction selected

## Code Example

```tsx
<DropdownSorting columns={[{ value: "name", label: "Name" }, { value: "date", label: "Date" }]}
  column="name" direction="ascending" onColumnChange={setColumn} onDirectionChange={setDir} />
```

## Cross-References

- [table.md](table.md)
- [dropdown.md](dropdown.md)

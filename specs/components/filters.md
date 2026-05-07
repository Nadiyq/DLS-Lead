---
name: Filters
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/filters/Filters.tsx
  - apps/storybook/src/stories/filters/filters.css
  - tokens/tokens.json
---

# Filters

## Metadata

- Category: layout / control
- Sizes: `m | s`

## Overview

Use `Filters` as the container for a row of `FilterChip` groups. Provides consistent spacing, sizing, and an optional "Add filter" button.

## Anatomy

- Root
- FilterChip groups
- Add-filter button (optional)

## Tokens Used

- `--dls-color-component-filters-*`
- `--dls-spacing-*`

## Props / API

- `groups` — array of `{ id, children }` filter groups
- `size` — `m | s`
- `showAdd`, `onAdd`
- `disabled`

## States

- with selected filters
- empty (unselected)
- with/without add button

## Code Example

```tsx
<Filters size="m" showAdd onAdd={handleAdd} groups={[
  { id: "status", children: <FilterChip label="Status" isVisible /> },
]} />
```

## Cross-References

- [filter-chip.md](filter-chip.md)
- [table.md](table.md)

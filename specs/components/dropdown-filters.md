---
name: DropdownFilters
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/dropdown-filters/DropdownFilters.tsx
  - apps/storybook/src/stories/dropdown-filters/dropdown-filters.css
  - tokens/tokens.json
---

# DropdownFilters

## Metadata

- Category: table utilities

## Overview

Use `DropdownFilters` for the "Add filter" picker — a panel of selectable filter options rendered as `ChipRegular` chips.

## Anatomy

- Root (role="listbox")
- "Filters" label
- Row of ChipRegular chips (outline, neutral, size s, with chevron)

## Tokens Used

- `--dls-color-component-dropdown-filters-*`
- chip-regular token families

## Props / API

- `options` — `{ id, label }[]`
- `onSelect` — callback with selected option id

## States

- default (all options available)

## Code Example

```tsx
<DropdownFilters options={[{ id: "status", label: "Status" }, { id: "date", label: "Date" }]} onSelect={handleSelect} />
```

## Cross-References

- [filters.md](filters.md)
- [filter-chip.md](filter-chip.md)
- [chip-regular.md](chip-regular.md)

---
name: Filter Chip
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/filter-chip/FilterChip.tsx
  - apps/storybook/src/stories/filter-chip/filter-chip.css
---

# Filter Chip

## Metadata

- Category: filter / control
- Sizes: `xs | s | m`

## Overview

Use `FilterChip` for table and data-view filters where the chip both communicates visibility and optionally opens a filter editor panel.

Do not use it as a generic badge or generic action button.

## Anatomy

- Wrapper
- Outline bar
- Label part
- Value summary part
- Action chevron
- Optional dropdown/editor panel

## Tokens Used

- `--dls-radius-component-chip`
- `--dls-color-surface-base`
- `--dls-color-border-base`
- `--dls-color-border-subtle`
- `--dls-state-hover-overlay`
- `--dls-state-pressed-overlay`
- `--dls-state-focus-ring-color`

## Props / API

- `label`
- `labelIcon`
- `isVisible`
- `onVisibilityChange`
- `valueSummary`
- `children`
- `size`
- `disabled`
- `open`
- `onOpenChange`

## States

- visible vs hidden
- open vs closed
- hover
- pressed
- focus-visible
- disabled

## Code Example

```tsx
<FilterChip
  label="Status"
  isVisible
  valueSummary={<span>Active</span>}
>
  <List>
    <ListItem type="text" text="Active" />
    <ListItem type="text" text="Paused" />
  </List>
</FilterChip>
```

## Cross-References

- [badge.md](badge.md)
- [dropdown.md](dropdown.md)
- [list.md](list.md)

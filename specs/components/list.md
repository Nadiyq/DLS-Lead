---
name: List
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/list-item/List.tsx
  - apps/storybook/src/stories/list-item/list.css
---

# List

## Metadata

- Category: structure
- Role: listbox container

## Overview

Use `List` as the container for grouped menu rows, selection rows, popover rows, and other list-based content.

Its children should usually be `ListItem` components.

## Anatomy

- Root container only

## Tokens Used

- `--dls-radius-component-list`
- `--dls-color-surface-base`
- `--dls-color-border-subtle`
- `--dls-shadow-surface-md`

## Props / API

- `children`
- `className`

## States

- default container only

## Code Example

```tsx
<List>
  <ListItem type="text" text="Profile" />
  <ListItem type="text" text="Billing" />
</List>
```

## Cross-References

- [list-item.md](list-item.md)
- [dropdown.md](dropdown.md)
- [../patterns/composition.md](../patterns/composition.md)

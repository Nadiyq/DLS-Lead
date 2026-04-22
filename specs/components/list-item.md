---
name: List Item
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/list-item/ListItem.tsx
  - apps/storybook/src/stories/list-item/list-item.css
---

# List Item

## Metadata

- Category: structure / row
- Types:
  - `text`
  - `label`
  - `with-slots`
  - `two-line`
  - `two-line-slots`
  - `buttons`
  - `search`
  - `empty-state`
  - `chips`
  - `divider`

## Overview

Use `ListItem` for every visible row inside dropdowns, menus, popovers, command lists, and similar list surfaces.

Do not replace it with custom row markup inside DLS list-based components.

## Anatomy

- Root row element
- Optional leading icon
- Optional left slot
- Text or two-line content
- Optional right slot
- Optional trailing icon

## Tokens Used

- `--dls-radius-component-list-item`
- surface, border, and text semantic tokens
- state overlay and focus tokens for interactive rows

## Props / API

- `type`
- `text`
- `secondaryText`
- `secondaryContent`
- `iconStart`
- `iconEnd`
- `slotLeft`
- `slotRight`
- `children`
- `selected`
- `onClick`
- `interactive`

## States

- default
- selected
- interactive vs non-interactive
- hover / focus-visible for interactive types

Interactive behavior is automatic for `text`, `with-slots`, `two-line`, and `two-line-slots` unless overridden.

## Code Example

```tsx
<ListItem
  type="with-slots"
  text="Assigned to"
  slotLeft={<Avatar size="24" initials="NA" />}
  slotRight={<Badge size="xs">Owner</Badge>}
/>
```

## Cross-References

- [list.md](list.md)
- [dropdown.md](dropdown.md)
- [../patterns/composition.md](../patterns/composition.md)

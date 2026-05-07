---
name: AvatarStack
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/AvatarStack.tsx
  - apps/storybook/src/stories/avatar-stack.css
  - tokens/tokens.json
---

# AvatarStack

## Metadata

- Category: data display
- Sizes: `88 | 80 | 72 | 48 | 40 | 32 | 28 | 24 | 20 | 18`

## Overview

Use `AvatarStack` to show a group of users as overlapping avatars with an optional +N counter and overflow dropdown.

## Anatomy

- Root
- Avatar children (overlapping)
- Counter button (+N, optional)
- Overflow dropdown (List of ListItem, optional)

## Tokens Used

- `--dls-color-component-avatar-*`
- `--dls-spacing-*`

## Props / API

- `size`
- `children` — Avatar elements
- `max` — max visible before counter
- `total` — total count for counter label
- `overflowUsers` — info for dropdown entries
- `selectedIndex`
- `onCounterClick`
- `onOverflowUserClick`

## States

- default
- with counter
- overflow dropdown open

## Code Example

```tsx
<AvatarStack size="32" max={3} total={8}>
  <Avatar initials="NA" />
  <Avatar initials="JD" />
  <Avatar initials="KL" />
</AvatarStack>
```

## Cross-References

- [avatar.md](avatar.md)

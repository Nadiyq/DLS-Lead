---
name: Avatar
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/Avatar.tsx
  - apps/storybook/src/stories/avatar.css
  - tokens/tokens.json
---

# Avatar

## Metadata

- Category: data display
- Shapes: square (default), circle
- Sizes: `144 | 88 | 80 | 72 | 48 | 40 | 32 | 28 | 24 | 20 | 18`
- Content types: image, initials, icon

## Overview

Use `Avatar` for user or entity representations. Content priority: image > initials > icon.

Do not use it for decorative icons; use `IconShape` for that.

## Anatomy

- Root
- Content: image, initials text, or icon
- Status dot (optional)
- Remove button (optional, on hover)

## Tokens Used

- `--dls-color-component-avatar-*`
- `--dls-radius-component-avatar`
- `--dls-spacing-*`

## Props / API

- `size`
- `circle`
- `src`, `alt`
- `initials`
- `icon`
- `dot`
- `onRemove`

## States

- default
- hover (shows remove button if `onRemove`)
- with dot indicator

## Code Example

```tsx
<Avatar size="48" src="/photo.jpg" alt="Nadiia" dot />
<Avatar size="32" circle initials="NA" />
```

## Cross-References

- [avatar-stack.md](avatar-stack.md)
- [icon-shape.md](icon-shape.md)

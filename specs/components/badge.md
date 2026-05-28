---
name: Badge
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/Badge.tsx
  - tokens/tokens.json
---

# Badge

## Metadata

- Category: status / metadata
- Variants: `outline | soft | filled | ghost`
- Intents: `neutral | info | success | warning | danger`
- Sizes: `m | s | xs`

## Overview

Use `Badge` for compact status, counts, and categorical labels.
Use `dot={false}` on ghost badges when color-coded status text is
enough on its own, especially in dense table cells.

Do not use it as a button replacement or as a full filter editor trigger.

## Anatomy

- Root badge container
- Optional ghost dot
- Optional leading icon
- Label text
- Optional trailing icon

## Tokens Used

- `color.component.badge.*`
- `--dls-radius-component-badge`
- `--dls-color-intent-*`

## Props / API

- `variant`
- `intent`
- `size`
- `dot`
- `iconStart`
- `iconEnd`
- `children`

## States

- default
- visual variant state

`Badge` is informational; it does not define the richer interaction states of `Button`.

## Code Example

```tsx
<Badge variant="soft" intent="success" size="s">
  Active
</Badge>
```

```tsx
<Badge variant="ghost" intent="warning" size="s" dot={false}>
  Pending
</Badge>
```

## Cross-References

- [badge-indicator.md](badge-indicator.md)
- [badge-number.md](badge-number.md)
- [button.md](button.md)
- [filter-chip.md](filter-chip.md)

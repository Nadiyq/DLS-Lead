---
name: Separator
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/separator/Separator.tsx
  - apps/storybook/src/stories/separator/separator.css
  - tokens/tokens.json
---

# Separator

## Metadata

- Category: layout / visual divider
- Orientations: `horizontal | vertical`

## Overview

Use `Separator` for visual dividers between content sections, list items, or toolbar groups.

## Anatomy

- Root (role="separator")

## Tokens Used

- `--dls-color-component-separator-*`

## Props / API

- `orientation` — `horizontal | vertical`

## States

- static (display only)

## Code Example

```tsx
<Separator orientation="horizontal" />
```

## Cross-References

- [resizable.md](resizable.md)

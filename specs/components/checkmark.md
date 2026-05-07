---
name: Checkmark
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/checkmark/Checkmark.tsx
  - apps/storybook/src/stories/checkmark/checkmark.css
  - tokens/tokens.json
---

# Checkmark

## Metadata

- Category: icon / indicator
- Sizes: `m | s | xs`

## Overview

Use `Checkmark` for a standalone success/completion indicator — a circled check icon. Sizes map to 32px, 24px, and 16px.

## Anatomy

- Root circle container
- SVG check icon (stroke width varies by size)

## Tokens Used

- `--dls-color-component-checkmark-*`

## Props / API

- `size` — `m | s | xs` (default: `m`)

## States

- static (display only)

## Code Example

```tsx
<Checkmark size="m" />
```

## Cross-References

- [icon-shape.md](icon-shape.md)

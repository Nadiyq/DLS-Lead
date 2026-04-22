---
name: Text
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/text/Text.tsx
  - tokens/tokens.json
---

# Text

## Metadata

- Category: content
- Sizes: `m | s | xs`

## Overview

`Text` is a paired text block for a title plus a description, or a description alone. Use it when the design calls for a compact stacked text treatment.

Do not treat it as a universal typography primitive for every text node in the app.

## Anatomy

- Root container
- Optional title
- Description

## Tokens Used

- semantic text sizing from the text token scale
- text color tokens from the component CSS

## Props / API

- `size`
- `title`
- `description`
- `className`

## States

- default only

## Code Example

```tsx
<Text
  size="s"
  title="Storage"
  description="Used 42% of available space."
/>
```

## Cross-References

- [card.md](card.md)
- [empty-state.md](empty-state.md)
- [../foundations/typography.md](../foundations/typography.md)

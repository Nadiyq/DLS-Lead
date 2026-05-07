---
name: ButtonInputGroup
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/button-input-group/ButtonInputGroup.tsx
  - apps/storybook/src/stories/button-input-group/button-input-group.css
  - tokens/tokens.json
---

# ButtonInputGroup

## Metadata

- Category: input
- Locations: `start | end | both`
- Sizes: `m | s`

## Overview

Use `ButtonInputGroup` for an input field with attached action buttons (e.g., increment/decrement, copy, apply).

## Anatomy

- Root container
- Start button (optional)
- Divider
- Input field
- Divider
- End button (optional)

## Tokens Used

- `--dls-color-component-input-*`
- `--dls-radius-component-input`
- `--dls-spacing-*`

## Props / API

- `buttonLabel` — string or `[startLabel, endLabel]`
- `location` — button placement
- `size`
- `onStartClick`, `onEndClick`
- `startDisabled`, `endDisabled`
- standard input HTML attributes

## States

- default
- disabled (fully or per-button)
- focus-within

## Code Example

```tsx
<ButtonInputGroup buttonLabel="Apply" location="end" size="m" placeholder="Enter code" />
```

## Cross-References

- [input-field.md](input-field.md)
- [button.md](button.md)

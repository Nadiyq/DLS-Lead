---
name: ButtonGroup
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/button-group/ButtonGroup.tsx
  - apps/storybook/src/stories/button-group/button-group.css
  - tokens/tokens.json
---

# ButtonGroup

## Metadata

- Category: action
- Variants: `filled | outline | soft | ghost`
- Orientations: `horizontal | vertical`
- Sizes: `m | s`

## Overview

Use `ButtonGroup` for a set of related actions presented as a segmented control. All buttons share the same variant and size.

Do not use it for unrelated actions or mixed variants; use standalone Buttons for that.

## Anatomy

- Root container
- Button children (adjacent, no gaps)

## Tokens Used

- `--dls-radius-component-button`
- `--dls-color-intent-*`
- `--dls-spacing-*`

## Props / API

- `variant`
- `orientation`
- `size`
- `children` — Button elements

## States

- default
- hover / focus on individual buttons
- supports icon-only buttons

## Code Example

```tsx
<ButtonGroup variant="outline" size="m">
  <Button>Left</Button>
  <Button>Center</Button>
  <Button>Right</Button>
</ButtonGroup>
```

## Cross-References

- [button.md](button.md)

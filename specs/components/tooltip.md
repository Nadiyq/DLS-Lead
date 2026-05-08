---
name: Tooltip
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/tooltip/Tooltip.tsx
  - apps/storybook/src/stories/tooltip/tooltip.css
  - tokens/tokens.json
---

# Tooltip

## Metadata

- Category: overlay / informational
- Types: `general | error`
- Orientations: `top-left | top-center | top-right | bottom-left | bottom-center | bottom-right | left | right`

## Overview

Use `Tooltip` for hover/focus hints. General type for informational text; error type for validation messages. Supports trailing slot content like keyboard shortcuts.

## Anatomy

- Root (role="tooltip")
- Body: text + optional slot content
- Arrow (SVG, positioned by orientation)

## Tokens Used

- `--dls-color-component-tooltip-*`
- `--dls-radius-component-tooltip`

## Props / API

- `type` — `general | error`
- `orientation`
- `text`
- `slotContent` — trailing content (e.g., Kbd shortcuts)

## States

- general (dark background)
- error (danger background)

## Code Example

```tsx
<Tooltip text="Save changes" orientation="top-center"
  slotContent={<KbdGroup type="separated"><Kbd>⌘</Kbd><Kbd>S</Kbd></KbdGroup>} />
```

## Cross-References

- [kbd.md](kbd.md)

---
name: Kbd
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/kbd/Kbd.tsx
  - apps/storybook/src/stories/kbd/kbd.css
  - tokens/tokens.json
---

# Kbd

## Metadata

- Category: typography / display
- Group types: `regular | separated`

## Overview

Use `Kbd` for keyboard key indicators. Use `KbdGroup` to combine multiple keys — `regular` for adjacent keys, `separated` for keys joined by "+".

## Anatomy

- `Kbd`: `<kbd>` element with optional leading/trailing icons
- `KbdGroup`: container for multiple `Kbd` elements with optional separators

## Tokens Used

- `--dls-color-component-kbd-*`
- `--dls-radius-component-kbd`

## Props / API

Kbd:
- `children` — key label
- `iconStart`, `iconEnd`

KbdGroup:
- `type` — `regular | separated`
- `children` — Kbd elements

## States

- static (display only)

## Code Example

```tsx
<KbdGroup type="separated">
  <Kbd>⌘</Kbd>
  <Kbd>S</Kbd>
</KbdGroup>
```

## Cross-References

- [tooltip.md](tooltip.md)

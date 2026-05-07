---
name: Scroll
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/scroll/Scroll.tsx
  - apps/storybook/src/stories/scroll/scroll.css
  - tokens/tokens.json
---

# Scroll

## Metadata

- Category: display / indicator
- Orientations: `vertical | horizontal`

## Overview

Use `Scroll` as a display-only scrollbar indicator. It renders a thumb at a given position and size — it does not handle scroll events itself.

## Anatomy

- Root (role="scrollbar")
- Thumb element (positioned via percentage)

## Tokens Used

- `--dls-color-component-scroll-*`
- `--dls-radius-component-scroll`

## Props / API

- `orientation` — `vertical | horizontal`
- `thumbSize` — 0–100 percentage
- `thumbPosition` — 0–100 percentage

## States

- static (display only)

## Code Example

```tsx
<Scroll orientation="vertical" thumbSize={30} thumbPosition={50} />
```

## Cross-References

- [separator.md](separator.md)

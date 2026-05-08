---
name: Spinner
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/spinner/Spinner.tsx
  - apps/storybook/src/stories/spinner/spinner.css
  - tokens/tokens.json
---

# Spinner

## Metadata

- Category: loading / feedback
- Sizes: `12 | 16 | 20 | 24 | 32`

## Overview

Use `Spinner` for indeterminate loading states. SVG-based with CSS animation. Five sizes (in pixels); stroke width scales with size.

## Anatomy

- Root (role="status")
- Animated SVG circle

## Tokens Used

- `--dls-color-component-spinner-*`

## Props / API

- `size` — `12 | 16 | 20 | 24 | 32` (default: `24`)
- `aria-label` — accessible label (default: "Loading")

## States

- animated (always)

## Code Example

```tsx
<Spinner size="24" />
<Button disabled><Spinner size="16" /> Saving…</Button>
```

## Cross-References

- [skeleton.md](skeleton.md)
- [progress-bar.md](progress-bar.md)

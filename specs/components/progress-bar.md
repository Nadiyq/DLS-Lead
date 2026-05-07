---
name: ProgressBar
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/progress-bar/ProgressBar.tsx
  - apps/storybook/src/stories/progress-bar/progress-bar.css
  - tokens/tokens.json
---

# ProgressBar

## Metadata

- Category: feedback / display
- Types: `continuous | segmented`
- Sizes: `m | s | xs`

## Overview

Use `ProgressBar` to indicate completion or progress. Continuous fills proportionally; segmented shows discrete steps.

## Anatomy

- Root (role="progressbar")
- Bar track
- Fill (continuous) or segments (segmented)
- Label showing percentage (optional, continuous only)
- Hint text with optional info icon (optional, segmented only)

## Tokens Used

- `--dls-color-component-progress-bar-*`
- `--dls-radius-component-progress-bar`

## Props / API

- `type` — `continuous | segmented`
- `value` — 0–100 percentage
- `segments` — segment count (default: 4)
- `showLabel` — show percentage (continuous)
- `hintLabel` — hint text (segmented)
- `showHintIcon`
- `size`

## States

- empty (0%)
- partial
- complete (100%)

## Code Example

```tsx
<ProgressBar type="continuous" value={65} showLabel size="m" />
<ProgressBar type="segmented" value={50} segments={4} />
```

## Cross-References

- [spinner.md](spinner.md)

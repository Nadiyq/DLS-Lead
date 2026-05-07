---
name: Slider
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/slider/Slider.tsx
  - apps/storybook/src/stories/slider/slider.css
  - tokens/tokens.json
---

# Slider

## Metadata

- Category: form input / control
- Modes: single value, range

## Overview

Use `Slider` for numeric value selection via dragging. Supports single-value mode and range mode (two thumbs). Keyboard arrow keys supported.

## Anatomy

- Root
- Bar (background track)
- Track (filled portion)
- Thumb(s) — `SliderItem` subcomponent (role="slider")

## Tokens Used

- `--dls-color-component-slider-*`
- `--dls-radius-component-slider`

## Props / API

- `value` — single mode value
- `range` — `[min, max]` for range mode
- `min`, `max` — bounds (default: 0–100)
- `step` — increment (default: 1)
- `disabled`
- `onChange` (single), `onRangeChange` (range)

## States

- default
- active (dragging)
- disabled
- keyboard focus

## Code Example

```tsx
<Slider value={50} min={0} max={100} onChange={setValue} />
<Slider range={[20, 80]} onRangeChange={setRange} />
```

## Cross-References

- [progress-bar.md](progress-bar.md)

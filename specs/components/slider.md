---
name: Slider
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/slider/Slider.tsx
  - apps/storybook/src/stories/slider/slider.css
  - apps/storybook/src/stories/slider/Slider.stories.tsx
  - tokens/tokens.json
---

# Slider

## Metadata

- Category: form input / control
- Modes: single value, range
- Figma property: `range?`
- Thumb subcomponent: `SliderItem`

## Overview

Use `Slider` for numeric value selection by dragging or keyboard
adjustment. It supports a single value thumb and a range mode with two
thumbs. The track, filled range, pointer math, and keyboard value
updates live in `Slider`; thumb visuals and slider role semantics are
provided by `SliderItem`. Disabled Slider thumbs use
`<SliderItem disabled />`, matching the related Figma
`SliderItem state=disabled` variant.

## Anatomy

- Root - `.dls-slider`
- Bar - `.dls-slider__bar`, the full background track
- Track - `.dls-slider__track`, the filled value/range section
- Thumb wrapper - `.dls-slider__thumb`, positions each thumb
- Thumb - `SliderItem` subcomponent with `role="slider"`

## Tokens Used

Track tokens:

- `--dls-font-family`
- `--dls-radius-component-slider-item`
- `--dls-color-surface-strong`
- `--dls-color-intent-neutral-base`
- `--dls-color-surface-disabled`

Thumb tokens are owned by `SliderItem`; see
[slider-item.md](slider-item.md). Disabled thumb surface, border, and
shadow treatment are also owned by `SliderItem`.

## Props / API

- `value` - current value in single mode
- `range` - `[min, max]` pair for range mode
- `min` - minimum value, default `0`
- `max` - maximum value, default `100`
- `step` - increment, default `1`
- `disabled` - disabled state, default `false`
- `onChange` - called with the next value in single mode
- `onRangeChange` - called with the next `[min, max]` pair in range mode
- `aria-label` - accessible label prefix
- `className` - additional CSS class on the root

## States

- Single - one thumb, track fills from 0 to `value`
- Range - two thumbs, track fills between `range[0]` and `range[1]`
- Disabled - root blocks pointer interaction; track uses disabled
  treatment and thumbs pass `disabled` to `SliderItem`
- Keyboard focus - focus ring appears on the active `SliderItem`
- Dragging / pressed - value changes by pointer position

## Figma Representation

The Figma component set at node `6618:3459` exposes a single boolean
variant property:

- `range?=false` - single value visual
- `range?=true` - two-thumb range visual

Code maps this to the presence of the `range` tuple. Figma shows static
example values; code accepts any numeric value within `min` and `max`.

The Slider Figma component set does not expose a separate disabled
variant. Disabled thumb visuals are represented by the related
`SliderItem` component set at node `6618:12103` with `state=disabled`;
the Slider code applies the disabled track token and passes `disabled`
to each thumb.

## Accessibility Contract

- Each enabled thumb is a `SliderItem` with `role="slider"`.
- Each thumb has an accessible name:
  - single: `aria-label` or `Value`
  - range start: `${aria-label} minimum` or `Minimum`
  - range end: `${aria-label} maximum` or `Maximum`
- Each thumb exposes `aria-valuenow`, `aria-valuemin`, and
  `aria-valuemax`.
- Disabled thumbs set `aria-disabled` and are removed from tab order.
- Arrow keys decrement/increment by `step`.
- PageUp/PageDown decrement/increment by `step * 10`.
- Home and End move to the lower and upper bounds.
- Range thumbs cannot move past each other.
- No spatial animation is used in Slider. Thumb color/shadow
  transitions are guarded in `SliderItem`.

## Composition Rules

- Use as a controlled component with `value`/`onChange` or
  `range`/`onRangeChange` for interactive use.
- Use only one mode at a time: single mode with `value`, range mode
  with `range`.
- Do not nest arbitrary children inside `Slider`.
- Do not use for passive progress - use `ProgressBar`.
- Do not use for binary choices - use `Switcher`.

## Known Deviations

- No L4 Slider color tokens exist in `tokens.json`. Track uses L2
  semantic and intent tokens; radius uses the shared SliderItem radius
  token.
- Figma `range?` is a boolean visual variant. Code uses the richer
  `range?: [number, number]` tuple, because range mode also needs
  concrete values.
- Figma Slider has no whole-component disabled variant. Disabled thumb
  coverage lives in `SliderItem state=disabled`; disabled track styling
  remains code/documentation-owned for Slider.
- Figma examples are fixed-width 400px compositions. Code fills the
  available width; Storybook constrains examples to 400px.

## Code Example

```tsx
<Slider value={50} min={0} max={100} onChange={setValue} />

<Slider
  range={[20, 80]}
  min={0}
  max={100}
  onRangeChange={setRange}
  aria-label="Price"
/>
```

## Cross-References

- [slider-item.md](slider-item.md)
- [progress-bar.md](progress-bar.md)
- [switcher.md](switcher.md)

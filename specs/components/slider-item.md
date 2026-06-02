---
name: SliderItem
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/slider-item/SliderItem.tsx
  - apps/storybook/src/stories/slider-item/slider-item.css
  - apps/storybook/src/stories/slider-item/SliderItem.stories.tsx
  - tokens/tokens.json
---

# SliderItem

## Metadata

- Category: form input / control
- Type: slider thumb primitive
- Figma states: `normal | hover | focus | disabled`
- Code states: normal, hover, focus-visible, pressed, disabled

## Overview

Use `SliderItem` as the draggable thumb/handle inside `Slider`. It
provides the visual thumb, semantic slider role, aria value metadata,
focusability, and disabled state styling. Range math, pointer dragging,
and value updates live in the parent `Slider` composition.

## Anatomy

- Root - `<div class="dls-slider-item" role="slider">`
- Thumb surface - 16 by 16 circular handle
- Focus ring - tokenized ring on `:focus-visible`

## Tokens Used

- `--dls-radius-component-slider-item`
- `--dls-color-surface-base`
- `--dls-color-border-focus`
- `--dls-shadow-surface-sm`
- `--dls-color-surface-muted`
- `--dls-shadow-surface-md`
- `--dls-state-focus-ring-color`
- `--dls-color-surface-disabled`
- `--dls-color-border-disabled`

## Props / API

- `disabled` - disabled state, default `false`
- `value` - current value for `aria-valuenow`
- `min` - lower bound for `aria-valuemin`
- `max` - upper bound for `aria-valuemax`
- `aria-label` - accessible name for the thumb
- `className` - additional CSS class on the root

## States

- Normal - base surface, focus border, small surface shadow
- Hover - muted surface and medium surface shadow
- Focus-visible - focus ring token, no layout shift
- Pressed / active - grabbing cursor and muted surface
- Disabled - disabled surface and border, no shadow, not focusable

## Figma Representation

The Figma component set at node `6618:12103` exposes a single
`state` property:

- `normal`
- `hover`
- `focus`
- `disabled`

Pressed is a code-supported state, but it is not a separate Figma
variant in the current component set.

## Accessibility Contract

- Root uses `role="slider"`.
- Root must have an accessible name with `aria-label`.
- Root forwards `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
- Disabled thumbs set `aria-disabled` and `tabIndex={-1}`.
- Enabled thumbs use natural tab order with `tabIndex={0}`.
- Keyboard value changes are owned by the parent slider behavior, not
  the visual thumb primitive.
- CSS transitions are removed under `prefers-reduced-motion: reduce`.

## Composition Rules

- Use only as a thumb inside `Slider` or slider-like track examples.
- Do not place children inside `SliderItem`.
- Do not use as a standalone form control without a parent slider
  behavior that updates values.
- For user-facing range input, prefer the full `Slider` component.

## Known Deviations

- No L4 color tokens exist for SliderItem surfaces, borders, or
  shadows. Code uses L2 semantic tokens directly, with an L4 radius
  token.
- Figma exposes normal, hover, focus, and disabled states. Code also
  supports active/pressed, which is not a separate Figma variant.
- `SliderItem` is a semantic thumb primitive; standalone keyboard value
  adjustment is not implemented here.

## Code Example

```tsx
<SliderItem value={50} min={0} max={100} aria-label="Volume" />

<SliderItem disabled value={50} min={0} max={100} aria-label="Volume" />
```

## Cross-References

- [slider.md](slider.md)

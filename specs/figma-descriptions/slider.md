# Slider

Category: form input / control
React: <Slider>
Spec: specs/components/slider.md
TSX: apps/storybook/src/stories/slider/Slider.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-slider--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6618-3459

--------------------------------------------
## State implementation contract

Slider is a controlled range input for selecting one value or a
two-value range. Track math, pointer dragging, and keyboard value
changes live in `Slider`; thumb visuals and role semantics are provided
by `SliderItem`.

- Background bar: bg -> `--dls-color-surface-strong`
- Filled track: bg -> `--dls-color-intent-neutral-base`
- Disabled filled track: bg -> `--dls-color-surface-disabled`
- Track radius: `--dls-radius-component-slider-item`
- Thumb: `SliderItem` token contract
- Disabled thumb: `SliderItem state=disabled` -> disabled surface,
  disabled border, no shadow
- Motion: no Slider track transition; SliderItem handles its own
  reduced-motion guard
--------------------------------------------

## Purpose

Lets users choose a numeric value or range by dragging thumb controls
along a horizontal track. Use it for settings, thresholds, pricing
ranges, volume, brightness, or similar values where visual adjustment is
faster than typing.

## Use when

- Selecting a bounded numeric value.
- Selecting a bounded numeric range with two thumbs.
- Users benefit from quick visual fine-tuning.
- The exact number can be shown nearby or stored in controlled state.

## Do NOT use for

- Passive completion or loading progress - use `ProgressBar`.
- Binary on/off choices - use `Switcher`.
- Precise numeric entry where typing is required - use an input field.
- Unbounded values or values without clear min/max.

## Figma -> Code mapping

### Figma component set: slider (6618:3459)

| Figma property | React prop | Values / Notes |
|---|---|---|
| range? | range | false -> omit `range` and use `value`; true -> provide `range={[min, max]}`. Figma boolean controls visual mode; code tuple controls both mode and values. |
| - | value | Code-only current value for single mode. |
| - | min | Code-only lower bound, default `0`. |
| - | max | Code-only upper bound, default `100`. |
| - | step | Code-only increment, default `1`. |
| - | disabled | Code-only on the Slider Figma set. Disabled thumb visuals use `SliderItem state=disabled`. |
| - | onChange | Code-only single-value callback. |
| - | onRangeChange | Code-only range callback. |
| - | aria-label | Code-only accessible label prefix. |
| - | className | Code-only root class extension. |

Notes:
- Figma shows fixed visual examples for single and range mode.
- Code accepts arbitrary values within `min` and `max`.
- Code fills available width; Storybook constrains examples to 400px
  to match the Figma composition.
- Thumb visuals are delegated to `SliderItem`.
- Disabled thumb visuals are represented by `SliderItem` node
  `6618:12103`, `state=disabled`.

## Anatomy

1. Root - `<div class="dls-slider">` with optional `data-disabled`.
2. Bar - `<div class="dls-slider__bar">`, the full background track.
3. Track - `<div class="dls-slider__track">`, positioned and sized
   from `value` or `range`.
4. Thumb wrapper - `<div class="dls-slider__thumb">`, positions each
   thumb and catches keyboard events bubbling from the thumb.
5. Thumb - `<SliderItem>`, exposes `role="slider"` and aria values.

## Props / API

- value          number, optional. Single mode value.
- range          [number, number], optional. Enables range mode.
- min            number, default 0.
- max            number, default 100.
- step           number, default 1.
- disabled       boolean, default false.
- onChange       `(value: number) => void`, single mode callback.
- onRangeChange  `(range: [number, number]) => void`, range callback.
- aria-label     string, optional. Used as thumb label prefix.
- className      string, optional.
- Ref forwarded to root `<div>`.

## Tokens used

Track/root tokens:
- --dls-font-family
- --dls-radius-component-slider-item
- --dls-color-surface-strong
- --dls-color-intent-neutral-base
- --dls-color-surface-disabled

Thumb tokens:
- See `SliderItem` for surface, border, shadow, focus, hover, active,
  and disabled thumb tokens.

## States

### Figma representation

- range?: false / true
- No Slider-level disabled variant; disabled thumb visuals are covered
  by related `SliderItem state=disabled`.

### Code implementation

- Single mode: omit `range`; one thumb uses `value`.
- Range mode: provide `range`; start and end thumbs use the tuple.
- Values are clamped to `min` and `max`.
- Pointer down chooses the nearest range thumb or the single thumb.
- Pointer move updates the active thumb while dragging.
- Disabled mode blocks pointer interaction, applies the disabled track
  token, and passes `disabled` to each `SliderItem`.
- Keyboard updates:
  - ArrowLeft / ArrowDown: subtract `step`
  - ArrowRight / ArrowUp: add `step`
  - PageDown / PageUp: subtract/add `step * 10`
  - Home / End: move to min/max
  - Range thumbs cannot cross each other

## Accessibility contract

- Each thumb is a `SliderItem` with `role="slider"`.
- Each thumb has an accessible name:
  - single: `aria-label` or "Value"
  - range start: `${aria-label} minimum` or "Minimum"
  - range end: `${aria-label} maximum` or "Maximum"
- Each thumb sets `aria-valuenow`, `aria-valuemin`, and
  `aria-valuemax`.
- Disabled thumbs set `aria-disabled` and are removed from tab order
  by `SliderItem`.
- Focus ring appears on the focused `SliderItem`.
- Keyboard operation follows slider expectations for arrows,
  PageUp/PageDown, Home, and End.
- Slider itself has no spatial animation.

## Composition rules

- Use as a controlled component for interactive product UI.
- Pair with visible value text when users need exact values.
- Use `value` + `onChange` for single mode.
- Use `range` + `onRangeChange` for range mode.
- Do not place arbitrary children inside Slider.
- Do not use without min/max bounds.

## Known deviations

- No L4 Slider color tokens in tokens.json. Track uses L2 semantic and
  intent tokens directly. Severity: low.
- Figma `range?` is a boolean visual variant, while React `range` is a
  numeric tuple. Severity: low.
- Figma examples are fixed at 400px. Code is fluid width and relies on
  its parent container for sizing. Severity: low.
- Figma Slider has no whole-component disabled variant. Disabled thumb
  coverage lives in `SliderItem state=disabled`; disabled track styling
  remains Slider code/documentation. Severity: low.

## Code example

```tsx
<Slider value={50} min={0} max={100} onChange={setValue} />

<Slider
  range={[20, 80]}
  min={0}
  max={100}
  step={5}
  onRangeChange={setRange}
  aria-label="Price"
/>
```

## Cross-references

- SliderItem (thumb primitive)
- ProgressBar (passive progress)
- Switcher (binary toggle)
- InputField (precise typed numeric entry)
- specs/components/slider.md

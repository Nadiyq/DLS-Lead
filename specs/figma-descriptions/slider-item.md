# SliderItem

Category: form input / control
React: <SliderItem>
Spec: specs/components/slider-item.md
TSX: apps/storybook/src/stories/slider-item/SliderItem.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-slideritem--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6618-12103

--------------------------------------------
## State implementation contract

SliderItem is the draggable thumb/handle primitive used by Slider. It
is not a complete standalone range input; parent Slider owns track math,
dragging, and value changes.

- Normal: bg -> `--dls-color-surface-base`; border ->
  `--dls-color-border-focus`; shadow -> `--dls-shadow-surface-sm`
- Hover: bg -> `--dls-color-surface-muted`; shadow ->
  `--dls-shadow-surface-md`
- Focus-visible: ring -> `0 0 0 3px var(--dls-state-focus-ring-color)`
- Pressed / active: cursor -> `grabbing`; bg ->
  `--dls-color-surface-muted`
- Disabled: bg -> `--dls-color-surface-disabled`; border ->
  `--dls-color-border-disabled`; shadow -> none
- Motion: background and shadow transition for 150ms ease, disabled by
  `@media (prefers-reduced-motion: reduce)`
--------------------------------------------

## Purpose

Provides the visual and semantic slider thumb. Use it inside `Slider`
or slider-track examples where a 16 by 16 circular handle represents
the current value.

## Use when

- Building the thumb primitive inside a `Slider`.
- Showing normal, hover, focus, or disabled thumb states in Figma.
- Demonstrating a single-thumb or two-thumb range track composition.

## Do NOT use for

- A full user-editable range control by itself - use `Slider`.
- Progress or completion indicators - use `ProgressBar`.
- Toggle or binary choices - use `Switcher`.
- Any control without an accessible name and value bounds.

## Figma -> Code mapping

### Figma component set: slider-item (6618:12103)

| Figma property | React prop | Values / Notes |
|---|---|---|
| state | disabled | normal -> false/base CSS, hover -> false/:hover, focus -> false/:focus-visible, disabled -> true. Figma combines visual state variants with the disabled prop mapping. |
| - | value | Code-only value for `aria-valuenow`. |
| - | min | Code-only value for `aria-valuemin`. |
| - | max | Code-only value for `aria-valuemax`. |
| - | aria-label | Code-only accessible name. Required for the semantic thumb. |
| - | className | Code-only root class extension. |

Notes:
- Figma `state=normal` maps to base `.dls-slider-item`.
- Figma `state=hover` maps to `.dls-slider-item:hover:not(:disabled):not([data-disabled])`.
- Figma `state=focus` maps to `.dls-slider-item:focus-visible`.
- Figma `state=disabled` maps to `<SliderItem disabled />`.
- Code also supports pressed/active.

## Anatomy

1. Root - `<div class="dls-slider-item" role="slider">`
   with optional `data-disabled`.
2. Thumb surface - 16 by 16 circular surface.
3. Border - focus border token.
4. Focus ring - tokenized 3px focus ring on `:focus-visible`.

## Props / API

- disabled       boolean, default false.
- value          number, optional. Forwarded to `aria-valuenow`.
- min            number, optional. Forwarded to `aria-valuemin`.
- max            number, optional. Forwarded to `aria-valuemax`.
- aria-label     string, optional in TypeScript but required for
                 accessible usage.
- className      string, optional.
- Ref forwarded to root `<div>`.

## Tokens used

L4 component token:
- --dls-radius-component-slider-item

L2 semantic / shadow tokens:
- --dls-color-surface-base
- --dls-color-border-focus
- --dls-shadow-surface-sm
- --dls-color-surface-muted
- --dls-shadow-surface-md
- --dls-color-surface-disabled
- --dls-color-border-disabled

State token:
- --dls-state-focus-ring-color

## States

### Figma representation

- state: normal / hover / focus / disabled

### Code implementation

- Base thumb is 16 by 16, circular, and focusable when enabled.
- Hover uses muted surface and medium shadow.
- Focus-visible replaces the surface shadow with a focus ring.
- Active uses grabbing cursor and muted surface.
- Disabled uses disabled surface and border tokens, removes shadow,
  sets `pointer-events: none`, and removes the thumb from tab order.
- Reduced motion removes the background and shadow transition.

## Accessibility contract

- Root uses `role="slider"`.
- Requires an accessible name via `aria-label`.
- For meaningful slider semantics, provide `value`, `min`, and `max`.
- Disabled state sets `aria-disabled`.
- Enabled thumbs are focusable with `tabIndex={0}`; disabled thumbs use
  `tabIndex={-1}`.
- Keyboard value changes are a parent `Slider` behavior concern; this
  primitive only exposes the semantic thumb.

## Composition rules

- Use as a child/thumb in `Slider`.
- Do not nest content inside the thumb.
- Do not use without parent slider behavior in production forms.
- For range sliders, render one SliderItem for each thumb.

## Known deviations

- No L4 color tokens in tokens.json for SliderItem color/shadow
  states. Only the radius token is component-scoped.
- Figma has normal, hover, focus, and disabled variants. Active/pressed
  remains code-supported without a separate Figma variant.
- The thumb primitive exposes slider semantics but does not implement
  standalone keyboard value changes.

## Code example

```tsx
<SliderItem value={50} min={0} max={100} aria-label="Volume" />

<SliderItem disabled value={50} min={0} max={100} aria-label="Volume" />
```

## Cross-references

- Slider (full range input)
- ProgressBar (passive completion indicator)
- Switcher (binary toggle)
- specs/components/slider-item.md

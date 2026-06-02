# ProgressBar Small

Category: feedback / display
React: <ProgressBar>
Spec: specs/components/progress-bar.md
TSX: apps/storybook/src/stories/progress-bar/ProgressBar.tsx
Storybook: https://storybook.dlslead.com/?path=/story/components-progressbar--small
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6950-14102
Base Figma set: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6604-9728

--------------------------------------------
## State implementation contract

Small ProgressBar is a compact, bar-only use of the same
ProgressBar React component. It has no hover, pressed, selected,
disabled, or focus-visible visual state.

- Track: bg -> `--dls-color-surface-muted`
- Fill: bg -> `--dls-color-intent-neutral-base`
- Radius: `--dls-radius-component-progress-bar`
- Width transition: 300ms ease, disabled by
  `@media (prefers-reduced-motion: reduce)`
--------------------------------------------

## Purpose

Shows compact inline progress where a full-width bar or visible
percentage label would be too visually heavy. This is not a separate
React component; it maps to ProgressBar with size xs, s, or m.

## Use when

- Inline progress needs to fit inside dense UI.
- A table cell, compact card, or summary row needs a small visual
  progress cue.
- The exact percentage is available elsewhere or does not need a
  visible label.

## Do NOT use for

- Full-width progress with visible percentage - use regular
  ProgressBar without `size`.
- Step completion - use `type="segmented"`.
- Indeterminate loading - use Spinner or Skeleton.
- User-editable ranges - use Slider.

## Figma -> Code mapping

### Figma component set: small (6950:14102)

| Figma property | React prop | Values / Notes |
|---|---|---|
| size | size | M -> "m", S -> "s", XS -> "xs". |
| - | type | Code-only. Use `type="continuous"` for this Figma set. |
| - | value | Code-only required number. |

### Code-only props

| React prop | Notes |
|---|---|
| value | number, required. Clamped to 0-100. |
| type | Use "continuous" for this set. |
| size | "xs", "s", or "m". |
| className | string, optional. |

Notes:
- The small Figma set does not expose a percent/value property.
  Consumers must pass `value` in code.
- Code hides the continuous label automatically when `size` is set.
- Fixed widths are xs = 32px, s = 40px, m = 48px.

## Anatomy

1. Root - `<div class="dls-progress-bar" role="progressbar">`
   with `data-type="continuous"` and `data-size`.
2. Bar - `<div class="dls-progress-bar__bar">`, fixed-width
   track.
3. Fill - `<div class="dls-progress-bar__fill">`, width derived
   from `value`.

## Props / API

- value      number, required. Clamped to 0-100.
- type       "continuous" or "segmented", default "continuous".
             Use "continuous" for this Figma set.
- size       "xs", "s", or "m".
- className  string, optional.

## Tokens used

L4 component token:
- --dls-radius-component-progress-bar

L2 semantic / intent tokens:
- --dls-color-surface-muted (track)
- --dls-color-intent-neutral-base (fill)

Spacing:
- --dls-spacing-2
- --dls-spacing-3
- --dls-spacing-4

## States

### Figma representation (small 6950:14102)

- size: M / S / XS

### Code implementation

- `value` is clamped to 0-100.
- Fill width is derived from `value`.
- Continuous label is not rendered while `size` is set.
- Small widths are fixed by `data-size`.
- No interactive state tokens are used.
- Reduced motion removes the fill width transition.

## Accessibility contract

- Root uses `role="progressbar"`.
- Root has the accessible name "Progress".
- Sets `aria-valuenow`, `aria-valuemin="0"`, and
  `aria-valuemax="100"`.
- Not keyboard focusable; this is a passive status indicator.
- Pair with nearby visible text when the compact bar needs context.
- Respects prefers-reduced-motion for width transition.

## Composition rules

- Use only as a compact inline progress cue.
- Do not place labels, icons, or controls inside the bar.
- Pair with external table/card text when the meaning is not obvious.
- Use regular ProgressBar for full-width or labeled progress.

## Known deviations

- No L4 color tokens in tokens.json. Uses L2 semantic and intent
  tokens directly. Only `--dls-radius-component-progress-bar` exists
  as L4. Severity: low.
- Figma small is a separate component set, while code uses the same
  `ProgressBar` component with `size` set. Severity: low.
- Figma small does not expose a value property; code requires `value`.
  Severity: low.

## Code example

```tsx
<ProgressBar type="continuous" value={70} size="m" />
<ProgressBar type="continuous" value={50} size="s" />
<ProgressBar type="continuous" value={25} size="xs" />
```

## Cross-references

- ProgressBar regular (full-width continuous and segmented)
- Spinner (indeterminate loading)
- Skeleton (loading placeholder)
- Slider (user-editable range)
- specs/components/progress-bar.md

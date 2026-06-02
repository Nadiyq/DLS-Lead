# ProgressBar

Category: feedback / display
React: <ProgressBar>
Spec: specs/components/progress-bar.md
TSX: apps/storybook/src/stories/progress-bar/ProgressBar.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-progressbar--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6604-9728
Related Figma set: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6950-14102

--------------------------------------------
## State implementation contract

ProgressBar is a passive status indicator. It has no hover,
pressed, selected, disabled, or focus-visible visual state.

- Continuous track: bg -> `--dls-color-surface-muted`
- Continuous fill: bg -> `--dls-color-intent-neutral-base`
- Segmented unfilled segment: bg -> `--dls-color-surface-muted`
- Segmented filled segment: bg -> `--dls-color-intent-neutral-base`
- Continuous 0% label: text -> `--dls-color-text-disabled`
- Other labels/hints: text -> `--dls-color-text-primary`
- Fill width transition: 300ms ease, disabled by
  `@media (prefers-reduced-motion: reduce)`
--------------------------------------------

## Purpose

Shows completion or progress. Continuous bars fill proportionally
from 0 to 100. Segmented bars show progress across a fixed number
of discrete steps.

## Use when

- Showing task, upload, form, onboarding, or workflow progress.
- Showing percent completion with a compact visual indicator.
- Showing step completion where discrete segments are clearer than
  a continuous fill.

## Do NOT use for

- Indeterminate loading - use Spinner or Skeleton.
- Numeric values that are not completion/progress.
- User-editable ranges - use Slider.
- Status labels without measurable progress - use Badge or Text.

## Figma -> Code mapping

### Figma component set: regular (6604:9728)

| Figma property | React prop | Values / Notes |
|---|---|---|
| percent | value | 0% -> 0, 25% -> 25, 50% -> 50, 75% -> 75, 100% -> 100. Code accepts any number 0-100. |
| divided? | type | false -> "continuous"; true -> "segmented". |
| label#6891:33 | - | Boolean visibility toggle in Figma. Continuous code uses `showLabel`; segmented code uses presence of `hintLabel` and `showHintIcon`. |

### Related Figma component set: small (6950:14102)

| Figma property | React prop | Values / Notes |
|---|---|---|
| size | size | M -> "m", S -> "s", XS -> "xs". |
| - | type | Code-only. Small maps to `type="continuous"`. |
| - | value | Code-only required number. |

### Code-only props

| React prop | Notes |
|---|---|
| type | "continuous" or "segmented", default "continuous". |
| value | number, required. Clamped to 0-100. |
| segments | number, default 4. Used only for `type="segmented"`. |
| showLabel | boolean, default true. Continuous only; hidden for small sizes. |
| hintLabel | string, optional. Segmented only. |
| showHintIcon | boolean, default false. Segmented only. |
| size | "xs" or "s" or "m". Fixed-width small variant; omit for full width. |
| className | string, optional. |

Notes:
- Figma uses `divided?` to represent segmented progress. Code uses
  the clearer `type="segmented"`.
- The regular Figma set exposes percent as preset variants. Code
  accepts any numeric percentage.
- The small Figma set is not a separate React component. It maps to
  the same `ProgressBar` with the `size` prop.

## Anatomy

1. Root - `<div class="dls-progress-bar" role="progressbar">`
   with `data-type` and optional `data-size`.
2. Bar - `<div class="dls-progress-bar__bar">`, the track or
   segment container.
3. Fill - `<div class="dls-progress-bar__fill">`, continuous
   only. Width is derived from `value`.
4. Segment - `<div class="dls-progress-bar__segment">`,
   segmented only. Filled segments use `data-filled="true"`.
5. Label - `<span class="dls-progress-bar__label">`,
   continuous only when `showLabel` is true and no `size` is set.
6. Hint - `<div class="dls-progress-bar__hint">`, segmented only
   when `hintLabel` or `showHintIcon` is present.
7. Hint icon - lucide `Info` icon, decorative unless the consuming
   context adds external explanation.

## Props / API

- type            "continuous" | "segmented", default "continuous".
- value           number, required. Clamped to 0-100.
- segments        number, default 4.
- showLabel       boolean, default true. Continuous only.
- hintLabel       string, optional. Segmented only.
- showHintIcon    boolean, default false. Segmented only.
- size            "xs" | "s" | "m", optional.
- className       string, optional.
- Ref forwarded to root `<div>`.

## Tokens used

L4 component token:
- --dls-radius-component-progress-bar

L2 semantic / intent tokens:
- --dls-color-surface-muted (track and unfilled segments)
- --dls-color-intent-neutral-base (fill and filled segments)
- --dls-color-text-primary (label and hint)
- --dls-color-text-disabled (0% continuous label)

Spacing/typography:
- --dls-spacing-1
- --dls-spacing-1-5
- --dls-spacing-2
- --dls-font-family
- --dls-text-s-font-size
- --dls-text-s-line-height
- --dls-font-weight-normal
- --dls-font-weight-medium

## States

### Figma representation (regular 6604:9728)

- percent: 0% / 25% / 50% / 75% / 100%
- divided?: false / true
- label: false / true

### Figma representation (small 6950:14102)

- size: M / S / XS

### Code implementation

- `value` is clamped to 0-100.
- Continuous: fill width is derived from `value`, with a minimum
  visible 2% fill for an empty bar.
- Segmented: filled segment count is
  `Math.round((value / 100) * segments)`.
- Small sizes set fixed widths: xs = 32px, s = 40px, m = 48px.
- Small sizes render bar-only; continuous labels are not rendered
  when `size` is set.
- No interactive state tokens are used.
- Reduced motion removes the fill width transition.

## Accessibility contract

- Root uses `role="progressbar"`.
- Root has an accessible name. Segmented bars use `hintLabel` when
  present; otherwise the default accessible name is "Progress".
- Sets `aria-valuenow`, `aria-valuemin="0"`, and
  `aria-valuemax="100"`.
- Not keyboard focusable; this is a passive status indicator.
- Visible label/hint is optional.
- Respects prefers-reduced-motion for width transition.

## Composition rules

- Use as a standalone progress indicator.
- Do not nest interactive controls inside ProgressBar.
- For uploads, pair with file name/status text outside the component.
- For step flows, use `type="segmented"` and set `segments` to match
  the number of steps.
- Use the `size` prop only for compact inline progress; omit it for
  full-width bars.

## Known deviations

- No L4 color tokens in tokens.json. Uses L2 semantic and intent
  tokens directly. Only `--dls-radius-component-progress-bar` exists
  as L4. Severity: low.
- Figma regular percent variants cover only 0/25/50/75/100, while
  code accepts any numeric value from 0 to 100. Severity: low.
- Figma has a separate small component set. In code, small progress
  is the same `ProgressBar` component with `size` set. Severity: low.

## Code example

```tsx
<ProgressBar type="continuous" value={65} showLabel />

<ProgressBar
  type="segmented"
  value={50}
  segments={4}
  hintLabel="2 of 4 complete"
  showHintIcon
/>

<ProgressBar type="continuous" value={70} size="s" />
```

## Cross-references

- Spinner (indeterminate loading)
- Skeleton (loading placeholder)
- Slider (user-editable range)
- Text (external labels and status copy)
- specs/components/progress-bar.md

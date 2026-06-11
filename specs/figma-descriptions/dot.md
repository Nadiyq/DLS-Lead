# Dot

Category: data display / chart
React: `<Dot>`
Spec: (none — new component)
TSX: apps/storybook/src/stories/dot/Dot.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-dot--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6635-5557

--------------------------------------------
## State implementation contract

This component has NO interactive states on itself. It is a
passive chart marker that appears on hover — the hover trigger
belongs to the charting code, not this component.

--------------------------------------------

## Purpose

Chart data point marker for trend diagrams. A filled circle with
white ring border, shadow, and an optional numeric label above.
Appears on hover to highlight a specific data point on a graph,
usually paired with a TooltipGroup.

## Use when

- Highlighting a hovered data point on a line/area/trend chart.
- Showing a value label above a chart data point on hover.
- Marking specific data points with intent-colored dots.

## Do NOT use for

- Status indicators → use BadgeIndicator.
- Legend swatches → use LegendItem.
- Notification dots → use BadgeIndicator with no label.

## Figma → Code mapping

| Figma property | React prop | Values / Notes                                      |
|----------------|------------|-----------------------------------------------------|
| size           | size       | XS → "xs" (8px), S → "s" (10px), M → "m" (12px)   |
| label          | label      | Boolean — show/hide numeric label                   |
| text           | text       | Numeric label string (e.g. "120")                  |

Notes:
- Figma uses uppercase sizes (XS/S/M); code uses lowercase (xs/s/m).
- Figma's dot color is set per-instance. In code, the `intent` prop
  drives the color via `--dls-color-intent-{intent}-base`.
- The white ring and shadow grow with size in both Figma and code.

## Anatomy

1. Root — `<span>.dls-dot` with `data-size` and `data-intent`.
2. Label — `span.dls-dot__label` (optional, above the marker).
   Text s/light 12/16, tabular-nums.
3. Marker — `span.dls-dot__marker` with `::before` pseudo-element.
   Filled circle with white border ring and shadow.

## Props / API

- `size` — `'xs' | 's' | 'm'`, default `'xs'`.
- `label` — `boolean`, default `true`.
- `text` — `string`, default `'120'`.
- `intent` — `DotIntent`, default `'danger'`.
  `'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger'`.
- `className` — `string`, optional.

## Tokens used

- `--dls-spacing-2` — gap between label and marker; xs dot size (8px)
- `--dls-spacing-2-5` — s dot size (10px); ring width base
- `--dls-spacing-3` — m dot size (12px)
- `--dls-spacing-0-5` — ring width calc base (2px)
- `--dls-color-intent-{intent}-base` — marker fill color (6 intents)
- `--dls-color-surface-base` — white ring border color
- `--dls-radius-component-badge` — marker border-radius (circle)
- `--dls-shadow-surface-sm` — xs shadow
- `--dls-shadow-surface-md` — s/m shadow
- `--dls-color-text-primary` — label text color
- `--dls-text-paragraph-s-*` — label typography

## States

No interactive states. Visibility controlled by charting code.

## Accessibility contract

- Root element: `<span>` (inline, passive).
- Marker has `aria-hidden="true"` — decorative.
- Not focusable, not interactive.

## Composition rules

- Positioned absolutely by charting code over a graph.
- Paired with TooltipGroup on hover for full data context.
- The white ring prevents the dot from blending into the chart line.
- Shadow provides elevation above the chart surface.

## Known deviations

None.

## Code example

```tsx
<Dot size="xs" text="120" intent="danger" />
<Dot size="s" text="85" intent="success" label={false} />
<Dot size="m" text="200" intent="primary" />
```

## Cross-references

- specs/figma-descriptions/tooltip-group.md
- specs/figma-descriptions/legend-item.md

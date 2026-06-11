# LegendItem

Category: data display / chart
React: `<LegendItem>`
Spec: (none — new component)
TSX: apps/storybook/src/stories/legend-item/LegendItem.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-legenditem--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6635-5501

--------------------------------------------
## State implementation contract

This component has NO interactive states. It is a passive
data-display element showing a colored swatch + label + optional
value for chart legends.

--------------------------------------------

## Purpose

Individual chart legend row showing a colored swatch dot, a
category label, and an optional numeric value. Used inside
LegendGroup to describe chart data series.

## Use when

- Displaying a single legend entry for a chart, graph, or data visualization.
- Labeling chart data series with color-coded categories.
- Showing category name and optional percentage/value in a legend.

## Do NOT use for

- Badge indicators → use BadgeIndicator.
- Status dots → use Badge with intent.
- List items → use ListItem.

## Figma → Code mapping

| Figma property | React prop | Values / Notes                          |
|----------------|------------|-----------------------------------------|
| text           | label      | Category label string                   |
| value          | —          | Boolean toggle for value visibility     |
| valueText      | value      | Metric/value string (shown when value=true in Figma) |

Notes:
- In Figma, `value` is a boolean toggle; `valueText` is the
  string content. In code, a single `value` prop controls both
  (truthy string = visible).
- The swatch color in Figma uses `additional/{color}/{tone}` variables.
  In code, this maps to `color` + `tone` data-attributes driving
  L4 component tokens.

## Anatomy

1. Root — `div.dls-legend-item` with `data-color` and `data-tone`.
2. Swatch — `span.dls-legend-item__swatch` (10×10px circle,
   `aria-hidden="true"`).
3. Label — `span.dls-legend-item__label`.
4. Value — `span.dls-legend-item__value` (optional, semibold,
   tabular-nums, right-aligned).

## Props / API

- `label` — `string`, default `'Item 1'`. Category label text.
- `value` — `string`, optional. Metric/value shown after label.
- `color` — `LegendItemColor`, default `'green'`. Palette hue
  (`purple | violet | pink | blue | teal | yellow | green | gold | cinnamon | orange | danger`).
  `danger` maps to the semantic danger intent token for chart series that use
  `--dls-color-intent-danger-base`.
- `tone` — `LegendItemTone`, default `'500'`. Palette tone
  (`100 | 300 | 500 | 700`).
- `className` — `string`, optional.

## Tokens used

- `--dls-spacing-2` — gap between swatch, label, value
- `--dls-spacing-2-5` — swatch width/height (10px)
- `--dls-radius-component-legend-item-swatch` — swatch border-radius
- `--dls-color-component-legend-item-swatch-{color}-{tone}` — 40 L4 swatch color tokens
- `--dls-color-text-primary` — label and value text color
- `--dls-text-paragraph-m-font-size` / `--dls-text-paragraph-m-line-height` — text size
- `--dls-text-paragraph-m-light-font-weight` — label weight (normal)
- `--dls-text-paragraph-m-heavy-font-weight` — value weight (semibold)

## States

No interactive states. Passive display.

## Accessibility contract

- Root element: `div` (no role — passive display).
- Swatch has `aria-hidden="true"` — decorative.
- Not focusable, not interactive.

## Composition rules

- Typically used inside LegendGroup, not standalone.
- Each LegendItem maps to one chart data series.
- Color+tone combinations should be unique within a group.

## Known deviations

None.

## Code example

```tsx
<LegendItem label="Pipeline" value="42%" color="green" tone="500" />
<LegendItem label="Expansion" color="blue" tone="500" />
```

## Cross-references

- specs/figma-descriptions/legend-group.md

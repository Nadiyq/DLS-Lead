# PieChart

Category: data display / chart
React: `<PieChart>`
Spec: specs/components/manifests/pie-chart.json
TSX: apps/storybook/src/stories/pie-chart/PieChart.tsx
Storybook: http://localhost:6006/?path=/docs/components-piechart--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6644-18688

--------------------------------------------
## State implementation contract

This component has no interactive states. It is a passive chart
composition. Figma booleans map to layer visibility and legend
placement: `legend`, `legendBottom`, `stroke`, and `labelStroke`.

--------------------------------------------
## Purpose

Pie chart composition matching the DLS Figma chart component set. It
centers the existing Pie primitive inside the PieChartLabels overlay and
renders the documented LegendGroup beside or below the chart.

## Use when

- Rendering the fixed DLS pie chart composition from Figma.
- Showing a passive pie chart with value callouts and a legend.
- Demonstrating side and bottom legend placement in Storybook or docs.

## Do NOT use for

- Dynamic production analytics charts -> use a charting library and DLS
  tokens.
- Pie graphic alone -> use Pie.
- Pie value callouts alone -> use PieChartLabels.
- Standalone chart legends -> use LegendGroup.
- Chart hover details -> use TooltipGroup.

## Figma -> Code mapping

| Figma property | React prop | Values / Notes |
|----------------|------------|----------------|
| legend         | legend     | Boolean. Shows LegendGroup. |
| legend bottom? | legendBottom | false -> side legend, true -> bottom legend. |
| pie.stroke     | stroke     | Boolean. Shows white segment borders. |
| pie-labels.stroke | labelStroke | Boolean. Shows label leader strokes. |

Notes:
- Figma composes Pie, PieChartLabels, and LegendGroup instances. Code
  does the same with documented DLS components.
- The Figma pie chart uses value callouts without category labels by
  default. In code this is `labelCategories={false}`.

## Anatomy

1. Root - `<div>.dls-pie-chart` with `role="group"` and a generated
   accessible name.
2. Plot - `.dls-pie-chart__plot` with `role="img"` and a generated data
   summary.
3. Pie - `<Pie className="dls-pie-chart__pie" />`, centered in the label
   layer.
4. Labels - `<PieChartLabels className="dls-pie-chart__labels" />` when
   `labels` is true.
5. Legend - `<LegendGroup className="dls-pie-chart__legend" />` when
   `legend` is true.

## Props / API

- `stroke` - `boolean`, default `true`.
- `labels` - `boolean`, default `true`.
- `labelCategories` - `boolean`, default `false`.
- `labelStroke` - `boolean`, default `true`.
- `labelItems` - `PieChartLabelItem[]`, optional.
- `legend` - `boolean`, default `true`.
- `legendBottom` - `boolean`, default `false`.
- `legendItems` - `LegendGroupItem[]`, optional.
- `className` - `string`, optional.
- Native `div` attributes including `role` and `aria-label`.

## Tokens used

- `--dls-color-text-primary`
- `--dls-font-family`
- `--dls-spacing-0`
- `--dls-spacing-0-5`
- `--dls-spacing-1`
- `--dls-spacing-1-5`
- `--dls-spacing-2`
- `--dls-spacing-4`
- `--dls-spacing-6`
- `--dls-spacing-16`

Child components provide their own segment, leader, swatch, typography,
and border tokens.

## States

- `[data-legend-bottom="false"]` - side legend layout.
- `[data-legend-bottom="true"]` - bottom legend layout.
- `[data-labels="false" | "true"]` - label layer visibility marker.

## Accessibility contract

- Root defaults to `role="group"` with a generated label.
- Plot uses `role="img"` with a generated summary of label/value pairs.
- Pie and visual label layer are hidden inside the plot image to avoid
  duplicate announcements.
- Legend remains a semantic list with `aria-label="Chart legend"`.
- No keyboard focus or interaction.

## Composition rules

- Uses Pie for the chart graphic.
- Uses PieChartLabels for fixed value callouts.
- Uses LegendGroup for side and bottom legends.
- Keep the chart passive. Tooltips and hover interactions belong to a
  chart wrapper that composes TooltipGroup.

## Known deviations

The Figma MCP output used temporary PNG/SVG asset URLs for segment and
leader drawings. The code uses durable DLS SVG/CSS primitives instead.

## Code example

```tsx
<PieChart />
<PieChart legendBottom />
<PieChart legend={false} labels={false} />
```

## Cross-references

- specs/figma-descriptions/pie.md
- specs/figma-descriptions/pie-chart-labels.md
- specs/figma-descriptions/legend-group.md

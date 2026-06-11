# DonutChart

Category: data display / chart
React: `<DonutChart>`
Spec: specs/components/manifests/donut-chart.json
TSX: apps/storybook/src/stories/donut-chart/DonutChart.tsx
Storybook: http://localhost:6006/?path=/docs/components-donutchart--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6644-18708

--------------------------------------------
## State implementation contract

This component has no interactive behavior. It is a passive chart
composition. Figma booleans map to static visibility and variant props:
`hover`, `legend`, `legendBottom`, and `text`.

--------------------------------------------
## Purpose

Donut chart composition matching the DLS Figma chart component set. It
renders a five-segment donut with a centered total metric and composes
the documented LegendGroup beside or below the chart.

## Use when

- Rendering the fixed DLS donut chart composition from Figma.
- Showing a passive donut chart with a center total and legend.
- Demonstrating side, bottom, and hovered chart states in Storybook.

## Do NOT use for

- Dynamic production analytics charts -> use a charting library and DLS
  tokens.
- Pie chart value callouts -> use PieChartLabels.
- Standalone chart legends -> use LegendGroup.
- Chart hover details -> use TooltipGroup.

## Figma -> Code mapping

| Figma property | React prop | Values / Notes |
|----------------|------------|----------------|
| hover?         | hover      | Boolean. Renders the static hovered segment state. |
| legend         | legend     | Boolean. Shows LegendGroup. |
| legend bottom? | legendBottom | false -> side legend, true -> bottom legend. |
| text           | text       | Boolean. Shows center total and unit text. |
| totalText      | totalText  | String shown as the central metric. |
| unitText       | unitText   | String shown below the metric. |

## Anatomy

1. Root - `<div>.dls-donut-chart` with `role="group"` and a generated
   accessible name.
2. Plot - `.dls-donut-chart__plot` with `role="img"` and a generated
   data summary.
3. SVG - `.dls-donut-chart__svg`, hidden from assistive technology.
4. Segments - five `.dls-donut-chart__segment` paths using the same
   DLS chart segment tokens as Pie.
5. Center text - `.dls-donut-chart__text` containing total and unit when
   `text` is true.
6. Legend - `<LegendGroup className="dls-donut-chart__legend" />` when
   `legend` is true.

## Props / API

- `hover` - `boolean`, default `false`.
- `legend` - `boolean`, default `true`.
- `legendBottom` - `boolean`, default `false`.
- `text` - `boolean`, default `true`.
- `totalText` - `string`, default `"1000"`.
- `unitText` - `string`, default `"Unit"`.
- `legendItems` - `LegendGroupItem[]`, optional.
- `className` - `string`, optional.
- Native `div` attributes including `role` and `aria-label`.

## Tokens used

- `--dls-color-component-pie-segment-pink`
- `--dls-color-component-pie-segment-teal`
- `--dls-color-component-pie-segment-cinnamon`
- `--dls-color-component-pie-segment-blue`
- `--dls-color-component-pie-segment-yellow`
- `--dls-color-component-pie-segment-border`
- `--dls-color-text-primary`
- `--dls-color-text-secondary`
- `--dls-font-family`
- `--dls-spacing-*` for chart size, center text offsets, gaps, and the
  static hover offset
- `--dls-text-heading-h1-*`
- `--dls-text-paragraph-s-*`

## States

- `[data-hover="false" | "true"]` - default vs hovered segment state.
- `[data-legend-bottom="false" | "true"]` - side vs bottom legend.
- `[data-text="false" | "true"]` - center text visibility marker.

## Accessibility contract

- Root defaults to `role="group"` with a generated label.
- Plot uses `role="img"` with total and segment summary.
- SVG and center text are decorative inside the plot image.
- Legend remains a semantic list with `aria-label="Chart legend"`.
- No keyboard focus or interaction.

## Composition rules

- Uses durable SVG paths for donut segments instead of temporary Figma
  asset URLs.
- Uses LegendGroup for side and bottom legends.
- Keep the chart passive. Runtime tooltip or hover interaction belongs
  in a wrapper that composes TooltipGroup.

## Known deviations

The Figma MCP output used temporary image asset URLs for segment slices.
The code uses durable SVG paths and DLS tokens instead. Figma hover is
implemented as a prop-driven static state rather than a browser hover
selector because the component set exposes it as a variant.

## Code example

```tsx
<DonutChart />
<DonutChart hover />
<DonutChart legendBottom />
<DonutChart legend={false} text={false} />
```

## Cross-references

- specs/figma-descriptions/legend-group.md
- specs/figma-descriptions/pie.md
- specs/figma-descriptions/pie-chart.md

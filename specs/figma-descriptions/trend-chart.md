# TrendChart

Category: data display / chart
React: `<TrendChart>`
Spec: specs/components/manifests/trend-chart.json
TSX: apps/storybook/src/stories/trend-chart/TrendChart.tsx
Storybook: http://localhost:6006/?path=/docs/components-trendchart--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6644-18552

--------------------------------------------
## State implementation contract

This component has no interactive states. It is a passive chart
composition. Figma booleans map directly to visibility props:
`dot`, `grid`, and `legend`. `smooth` selects curved path geometry.
`type` selects single or multiple line series.

--------------------------------------------

## Purpose

Trend line chart composition matching the DLS Figma chart component.
It layers line geometry and optional markers over the existing Grid
component and renders a passive legend below the chart.

## Use when

- Rendering the fixed DLS trend chart composition from Figma.
- Showing a passive single or two-series trend over the DLS chart grid.
- Demonstrating chart states in Storybook or design-system examples.

## Do NOT use for

- Dynamic production analytics charts -> use a charting library and DLS tokens.
- Standalone data point markers -> use Dot.
- Standalone chart background axes -> use Grid.
- Standalone legends -> use LegendGroup.

## Figma -> Code mapping

| Figma property | React prop | Values / Notes |
|----------------|------------|----------------|
| dot            | dot        | Boolean. Shows highlighted marker(s). |
| grid           | grid       | Boolean. Shows Grid background. |
| legend         | legend     | Boolean. Shows legend list. |
| smooth         | smooth     | Boolean. Curved vs straight line geometry. |
| type           | type       | `single` or `multiple`. |

## Anatomy

1. Root - `<div>.dls-trend-chart` with `role="group"` and a generated
   accessible name.
2. Chart area - `.dls-trend-chart__chart` with `role="img"`.
3. Grid - `<Grid className="dls-trend-chart__grid" />` when `grid`.
4. Lines - `.dls-trend-chart__lines` inline SVG with one or two paths.
5. Dots - `.dls-trend-chart__dot` marker callouts when `dot`.
6. Legend - semantic `<ul>.dls-trend-chart__legend` when `legend`.

## Props / API

- `dot` - `boolean`, default `true`.
- `grid` - `boolean`, default `true`.
- `legend` - `boolean`, default `true`.
- `smooth` - `boolean`, default `false`.
- `type` - `'single' | 'multiple'`, default `'single'`.
- `className` - `string`, optional.
- Native `div` attributes including `role` and `aria-label`.

## Tokens used

- `--dls-color-component-trend-chart-series-danger`
- `--dls-color-component-trend-chart-series-green`
- `--dls-color-component-trend-chart-series-yellow`
- `--dls-color-component-trend-chart-series-blue`
- `--dls-color-component-trend-chart-series-pink`
- `--dls-color-component-trend-chart-series-violet`
- `--dls-color-text-primary`
- `--dls-color-surface-base`
- `--dls-radius-component-legend-item-swatch`
- `--dls-shadow-surface-md`
- `--dls-spacing-*` for chart dimensions, gaps, marker size, and offsets
- `--dls-text-paragraph-s-*` for marker labels
- `--dls-text-paragraph-m-*` for legend labels
- `--dls-font-family`

## States

- `[data-type="single"]` / `[data-type="multiple"]`.
- `[data-smooth="false"]` / `[data-smooth="true"]`.

## Accessibility contract

- Root defaults to `role="group"` with a generated label.
- Chart drawing area uses `role="img"` with a generated plot label.
- SVG lines and marker callouts are decorative and hidden from
  assistive technology.
- Legend is a semantic list with `aria-label="Trend chart legend"`.
- No keyboard focus or interaction.

## Composition rules

- Uses Grid as the chart background layer.
- Marker and legend paint are internal because the existing Dot and
  LegendItem APIs do not expose the red danger swatch and additional
  green chart color required by this Figma node.
- Pair with TooltipGroup in higher-level chart wrappers when hover
  details are needed.

## Known deviations

The Figma MCP output used temporary SVG asset URLs for trend paths.
The code embeds the extracted path data directly so the component is
durable and token-driven.

## Code example

```tsx
<TrendChart type="multiple" smooth />
<TrendChart grid={false} legend={false} />
```

# BarChart

Category: data display / chart
React: `<BarChart>`
Spec: specs/components/manifests/bar-chart.json
TSX: apps/storybook/src/stories/bar-chart/BarChart.tsx
Storybook: http://localhost:6006/?path=/docs/components-barchart--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6644-18592

--------------------------------------------
## State implementation contract

This component has no interactive states. It is a passive chart
composition. Figma booleans map directly to visibility/layout props:
`grid`, `legend`, and `horizontal`. `type` selects the chart geometry.

--------------------------------------------

## Purpose

Bar chart composition matching the DLS Figma chart component set. It
layers fixed bar fixtures over the existing Grid component and renders a
passive legend below the chart.

## Use when

- Rendering the fixed DLS bar chart composition from Figma.
- Showing passive default, multiple, stacked, or negative bar-chart examples.
- Demonstrating chart states in Storybook or design-system examples.

## Do NOT use for

- Dynamic production analytics charts -> use a charting library and DLS tokens.
- Single grouped bar primitives -> use Bar.
- Standalone bar chart items -> use BarChartItem.
- Standalone chart background axes -> use Grid.
- Standalone legends -> use LegendGroup.

## Figma -> Code mapping

| Figma property | React prop | Values / Notes |
|----------------|------------|----------------|
| grid           | grid       | Boolean. Shows Grid background. |
| horizontal?    | horizontal | Boolean. Horizontal vs vertical layout. |
| legend         | legend     | Boolean. Shows legend list. |
| type           | type       | `default`, `multiple`, `stacked`, or `negative`. |

## Anatomy

1. Root - `<div>.dls-bar-chart` with `role="group"` and a generated
   accessible name.
2. Chart area - `.dls-bar-chart__chart` with `role="img"`.
3. Grid - `<Grid className="dls-bar-chart__grid" />` when `grid`.
4. Bars - fixed internal bar fixture, composed from BarChartItem where
   the documented primitive fits the Figma geometry.
5. Legend - LegendGroup for documented additional-palette swatches or an
   internal semantic list for negative charts that need a danger swatch.

## Props / API

- `grid` - `boolean`, default `true`.
- `horizontal` - `boolean`, default `true`.
- `legend` - `boolean`, default `true`.
- `type` - `'default' | 'multiple' | 'stacked' | 'negative'`, default `'negative'`.
- `className` - `string`, optional.
- Native `div` attributes including `role` and `aria-label`.

## Tokens used

- `--dls-color-component-bar-chart-item-bar-positive`
- `--dls-color-component-bar-chart-item-bar-negative`
- `--dls-color-component-bar-chart-item-bar-default`
- `--dls-color-component-legend-item-swatch-*`
- `--dls-color-text-primary`
- `--dls-radius-component-bar-chart-item`
- `--dls-radius-component-legend-item-swatch`
- `--dls-spacing-*` for chart dimensions, gaps, bar sizes, and offsets
- `--dls-text-paragraph-m-*` for internal negative legend labels
- `--dls-font-family`

## States

- `[data-type="default" | "multiple" | "stacked" | "negative"]`.
- `[data-orientation="horizontal" | "vertical"]`.

## Accessibility contract

- Root defaults to `role="group"` with a generated label.
- Chart drawing area uses `role="img"` with a generated plot label.
- Bars and grid are decorative inside the chart image.
- Legend is a semantic list with `aria-label="Chart legend"`.
- No keyboard focus or interaction.

## Composition rules

- Uses Grid as the chart background layer.
- Uses BarChartItem for simple, stacked, and multiple bar marks where the
  primitive API covers the Figma geometry.
- Uses an internal negative mark and legend swatch because the existing
  primitives do not expose all danger-red geometry and legend paint
  required by the Figma component set.

## Known deviations

The Figma MCP output used temporary SVG/image asset URLs for grid and
legend color assets. The code uses existing DLS components and tokens
instead so the component is durable.

## Code example

```tsx
<BarChart type="multiple" />
<BarChart type="stacked" horizontal={false} />
<BarChart grid={false} legend={false} />
```

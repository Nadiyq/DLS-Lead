# Pie

Category: data display / chart
React: `<Pie>`
Spec: specs/components/manifests/pie.json
TSX: apps/storybook/src/stories/pie/Pie.tsx
Storybook: http://localhost:6006/?path=/docs/components-pie--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6644-7567

--------------------------------------------
## State implementation contract

This component has no interactive states. It is a passive chart
graphic. The `stroke` prop maps to `[data-stroke]` and controls
whether white segment borders are visible.

--------------------------------------------

## Purpose

Five-segment pie chart primitive matching the DLS pie chart Figma
component. The visual segments use the Pink, Teal, Cinnamon, Blue,
and Yellow additional palette hues.

## Use when

- Rendering the actual pie graphic for a pie chart.
- Showing the fixed DLS five-segment pie shape.
- Pairing with PieChartLabels for value callouts and category labels.

## Do NOT use for

- Pie chart value callouts or category labels -> use PieChartLabels.
- Chart legends -> use LegendGroup.
- Chart tooltips -> use TooltipGroup.
- Dynamic production analytics charts -> use a charting library and
  DLS tokens.

## Figma -> Code mapping

| Figma property | React prop | Values / Notes |
|----------------|------------|----------------|
| stroke         | stroke     | Boolean. Shows white segment borders. |

## Anatomy

1. Root - `<div>.dls-pie` with `role="img"` and an accessible name.
2. SVG - `.dls-pie__svg`, hidden from assistive technology.
3. Segment paths - five `.dls-pie__segment` elements with
   `[data-segment]` values of pink, teal, cinnamon, blue, yellow.

## Props / API

- `stroke` - `boolean`, default `false`.
- `className` - `string`, optional.
- Native `div` attributes including `role` and `aria-label`.

## Tokens used

- `--dls-color-component-pie-segment-pink`
- `--dls-color-component-pie-segment-teal`
- `--dls-color-component-pie-segment-cinnamon`
- `--dls-color-component-pie-segment-blue`
- `--dls-color-component-pie-segment-yellow`
- `--dls-color-component-pie-segment-border`
- `--dls-spacing-0`
- `--dls-spacing-0-5`
- `--dls-spacing-1`
- `--dls-spacing-6`
- `--dls-spacing-16`
- `--dls-font-family`

## States

- `[data-stroke="false"]` - no visible segment borders.
- `[data-stroke="true"]` - white segment borders.

## Accessibility contract

- Root defaults to `role="img"`.
- Root receives a generated `aria-label` describing segment labels and
  values unless one is provided.
- Internal SVG is `aria-hidden="true"` and not focusable.
- The component is not keyboard focusable and has no interaction.

## Composition rules

- Compose with PieChartLabels for the labeled overlay.
- Compose with LegendGroup for category legends.
- Compose with TooltipGroup for chart hover details owned by a chart
  wrapper.

## Known deviations

None. The implementation uses durable SVG paths instead of expiring
Figma asset URLs.

## Code example

```tsx
<Pie stroke aria-label="Lead source distribution" />
```

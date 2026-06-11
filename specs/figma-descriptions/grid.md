# Grid

Category: data display / chart
React: `<Grid>`
Spec: (none — new component)
TSX: apps/storybook/src/stories/grid/Grid.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-grid--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6635-5352

--------------------------------------------
## State implementation contract

This component has NO interactive states on itself. It is a
passive chart background — axis visibility is controlled via
props, not user interaction.

--------------------------------------------

## Purpose

Chart grid background for line charts, bar charts, area charts,
and diagrams. Renders dashed guide lines with axis labels to
provide a visual reference frame for data visualization.
Supports vertical (default) and horizontal orientations.

## Use when

- Providing the background grid for a line chart or area chart.
- Rendering axis labels and dashed guide lines for a bar chart.
- Creating a reference grid for any data visualization or diagram.

## Do NOT use for

- CSS grid page layouts — use layout tokens and flexbox/grid.
- Data tables — use Table components.
- Calendar grids — use Calendar component.

## Figma → Code mapping

| Figma property | React prop        | Values / Notes                                       |
|----------------|-------------------|------------------------------------------------------|
| horizontal?    | horizontal        | "false" → false (default), "true" → true             |
| y-axis         | showPrimaryAxis   | Boolean — show/hide y-axis labels (vertical mode)    |
| x-axis         | showSecondaryAxis | Boolean — show/hide x-axis labels (vertical mode)    |

Notes:
- Figma's `y-axis` maps to `showPrimaryAxis` in vertical mode and
  `showSecondaryAxis` in horizontal mode (physical axis stays the same).
- Figma's `x-axis` maps to `showSecondaryAxis` in vertical mode and
  `showPrimaryAxis` in horizontal mode.
- Label content is passed as string arrays (`labels`, `secondaryLabels`),
  not fixed in Figma — the Figma sample shows placeholder values.

## Anatomy

1. Root — `<div>.dls-grid` with `role="presentation"`,
   optional `data-horizontal`, `data-x-axis`, `data-y-axis`.
2. Body — `div.dls-grid__body` — flex container for grid rows/columns.
3. Row — `div.dls-grid__row` — one grid line + optional label.
   Horizontal layout in vertical mode, vertical layout in horizontal mode.
4. Label — `span.dls-grid__label` — axis value label.
   Text s/medium 12/16, tabular-nums, text-secondary.
5. Line — `hr.dls-grid__line` — dashed guide line.
   1px dashed border-base.
6. X-Axis — `div.dls-grid__x-axis` — secondary axis label row.
   Padding-left aligns with grid area when y-axis labels are visible.
7. X-Axis Label — `span.dls-grid__x-axis-label` — secondary axis label.
   Text s/normal 12/16, text-secondary.

## Props / API

- `labels` — `string[]`, default `['70','60','50','40','30','20','10','0']`.
  Labels for the primary axis.
- `secondaryLabels` — `string[]`, default `['1 Jan','7 Jan','14 Jan','21 Jan','28 Jan']`.
  Labels for the secondary axis.
- `showPrimaryAxis` — `boolean`, default `true`.
  Show the grid line labels.
- `showSecondaryAxis` — `boolean`, default `true`.
  Show the secondary axis labels.
- `horizontal` — `boolean`, default `false`.
  Horizontal bar chart layout.
- `className` — `string`, optional.

## Tokens used

- `--dls-spacing-2` — gap between label and line; gap between grid rows
- `--dls-spacing-14` — x-axis padding-left to align past y-axis labels (56px)
- `--dls-color-text-secondary` — label text color
- `--dls-color-border-base` — dashed grid line stroke color
- `--dls-text-s-font-size` — label font size (12px)
- `--dls-text-s-line-height` — label line height (16px)
- `--dls-font-weight-medium` — primary axis label weight (500)
- `--dls-font-weight-normal` — secondary axis label weight (400)
- `--dls-font-family` — font family (Inter)

## States

No interactive states. Axis visibility controlled via `showPrimaryAxis`
and `showSecondaryAxis` props, reflected as `data-y-axis` and `data-x-axis`
attributes.

## Accessibility contract

- Root element: `<div>` with `role="presentation"` — decorative chart background.
- Grid lines use `<hr>` elements (semantic separators).
- Not focusable, not interactive.

## Composition rules

- Placed as the background layer of a chart container.
- Chart data elements (Dot, lines, bars) are overlaid on top.
- Paired with TooltipGroup for hover data display.
- Paired with LegendGroup for series identification.
- The grid fills its container width/height via flex.

## Known deviations

None.

## Code example

```tsx
<Grid />

<Grid
  labels={['100', '80', '60', '40', '20', '0']}
  secondaryLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
/>

<Grid
  horizontal
  labels={['0', '25', '50', '75', '100']}
  showSecondaryAxis={false}
/>

<Grid showPrimaryAxis={false} showSecondaryAxis={false} />
```

## Cross-references

- specs/figma-descriptions/dot.md
- specs/figma-descriptions/tooltip-group.md
- specs/figma-descriptions/legend-group.md
- specs/figma-descriptions/pie-chart-labels.md

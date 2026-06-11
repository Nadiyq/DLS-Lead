# Bar

Figma node: `6641:4570`

`Bar` is a passive grouped bar chart primitive. It renders one to three simple bars with value labels and an optional axis label, usually a period such as `Jan`.

Supported Figma properties:

- `bars`: `1`, `2`, or `3`.
- `horizontal`: toggles between horizontal and vertical grouped layouts.
- `axis`: toggles the axis label.
- `axisText`: text content for the axis label.

The component composes `BarChartItem` internally for each simple bar. Color order follows the Figma component:

- `3` bars: pink, orange, teal.
- `2` bars: orange, teal.
- `1` bar: teal.

Use `Grid` for chart grid lines and axes around the grouped bar.

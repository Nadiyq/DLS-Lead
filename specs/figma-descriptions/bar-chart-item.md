# BarChartItem

Figma node: `6636:4506`

`BarChartItem` is a passive chart primitive for three bar shapes:

- `default`: one orange bar.
- `stacked`: two equal chart segments using teal and orange.
- `negative`: positive teal segment plus danger negative segment.

The component supports vertical and horizontal orientations. The `active` state adds an inverse border and a light overlay to the bar fill. The Figma `value` property maps to the React boolean `value`; visible labels are controlled through `valueText` and `negativeValueText`.

Use this component inside chart layouts that provide the surrounding axis, grid, labels, and tooltip behavior.

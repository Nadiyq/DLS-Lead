# TooltipItem

Category: data display / chart
React: `<TooltipItem>`
Spec: (none — new component)
TSX: apps/storybook/src/stories/tooltip-item/TooltipItem.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-tooltipitem--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6635-5581

--------------------------------------------
## State implementation contract

This component has NO interactive states. It is a passive
data-display row used inside chart tooltips.

--------------------------------------------

## Purpose

Individual data row inside a chart tooltip showing a colored swatch,
category label, numeric value, and optional unit. Composes LegendItem
for the swatch+label portion.

## Use when

- Displaying a data series row inside a chart tooltip (TooltipGroup).
- Showing label + value + unit for a chart data point on hover.
- Displaying a total row without swatch in chart tooltips.

## Do NOT use for

- Chart legends → use LegendItem / LegendGroup.
- General tooltips → use the existing DLS Tooltip component.
- List items → use ListItem.

## Figma → Code mapping

| Figma property | React prop | Values / Notes                          |
|----------------|------------|-----------------------------------------|
| text           | label      | Category label string                   |
| value          | —          | Boolean toggle for value visibility     |
| valueText      | value      | Metric/value string                     |
| unit           | —          | Boolean toggle for unit visibility      |
| unitText       | unit       | Unit string (e.g. "kcal")              |

Notes:
- Figma separates boolean toggles from text values. In code,
  presence of a truthy string controls visibility.
- The swatch color is inherited from LegendItem via `color`
  and `tone` props. `danger` is used for chart marks that are painted with the
  semantic danger intent token instead of the additional palette.

## Anatomy

1. Root — `div.dls-tooltip-item` with `data-layout` and `data-swatch`.
2. Legend (when showSwatch) — embedded `LegendItem` for swatch + label.
3. Label (when !showSwatch) — `span.dls-tooltip-item__label` (for total rows).
4. Metric — `span.dls-tooltip-item__metric` containing value + unit.
5. Value — `span.dls-tooltip-item__value` (semibold, tabular-nums).
6. Unit — `span.dls-tooltip-item__unit` (secondary text, smaller).

## Props / API

- `label` — `string`, default `'Item 1'`.
- `value` — `string | null`, default `'50%'`.
- `unit` — `string | null`, default `'kcal'`.
- `color` — `LegendItemColor`, default `'green'`.
- `tone` — `LegendItemTone`, default `'500'`.
- `showSwatch` — `boolean`, default `true`.
- `layout` — `'inline' | 'split'`, default `'inline'`.
- `className` — `string`, optional.

## Tokens used

- `--dls-spacing-2` — gap between name and metric
- `--dls-spacing-0-5` — gap between value and unit
- `--dls-color-text-primary` — label and value text
- `--dls-color-text-secondary` — unit text
- `--dls-text-paragraph-m-font-size` / `line-height` / `font-weight` — label/value typography
- `--dls-text-paragraph-s-font-size` / `line-height` / `font-weight` — unit typography

## States

No interactive states. Passive display row.

## Accessibility contract

- Root element: `div` (no role — passive display).
- Not focusable, not interactive.

## Composition rules

- Used inside TooltipGroup, not standalone.
- Set `layout="split"` inside TooltipGroup for proper space-between.
- Set `showSwatch={false}` for total/summary rows.
- Composes LegendItem for the swatch+label portion.

## Known deviations

None.

## Code example

```tsx
<TooltipItem label="Pipeline" value="42%" unit="kcal" color="green" />
<TooltipItem label="Total" value="150%" unit="kcal" showSwatch={false} layout="split" />
```

## Cross-references

- specs/figma-descriptions/tooltip-group.md
- specs/figma-descriptions/legend-item.md

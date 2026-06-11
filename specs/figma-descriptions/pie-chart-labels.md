# PieChartLabels

Category: data display / chart
React: `<PieChartLabels>`
Spec: (none — new component)
TSX: apps/storybook/src/stories/pie-chart-labels/PieChartLabels.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-piechartlabels--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6644-8228

--------------------------------------------
## State implementation contract

This component has NO interactive states. It is a passive label
overlay for pie charts, positioned with fixed percentage offsets
matching the Figma layout.

--------------------------------------------

## Purpose

Value callouts and category labels for pie charts. Each of 5 fixed
label slots shows a numeric value, a colored L-shaped leader stroke,
and a category name. Designed to overlay a pie chart SVG as an
absolutely-positioned label layer.

## Use when

- Labeling segments of a pie/donut chart with value and category.
- Overlaying a pie chart with colored leader strokes to segments.
- Static pie chart label rendering matching the Figma layout.

## Do NOT use for

- Chart tooltips → use TooltipGroup.
- Chart legends → use LegendGroup.
- Dynamic chart annotations (use charting library labels instead).

## Figma → Code mapping

| Figma property | React prop   | Values / Notes                          |
|----------------|--------------|----------------------------------------|
| categories     | categories   | Boolean — show/hide category labels    |
| stroke         | stroke       | Boolean — show/hide leader strokes     |
| label1–label5  | items[].visible | Boolean toggles per label slot     |
| label1Text–5   | items[].value | Value text per label slot             |

Notes:
- Figma has 5 individual boolean + text pairs. In code, a single
  `items` array drives all slots with structured objects.
- Label positions are fixed percentage offsets from Figma, matching
  the 329×262 aspect-ratio container.

## Anatomy

1. Root — `<ul>.dls-pie-chart-labels` with 329×262 aspect ratio,
   `role="list"`, `aria-label="Pie chart labels"`.
2. Item — `<li>.dls-pie-chart-labels__item` with `data-slot`,
   `data-color`, `data-tone`. Absolutely positioned.
3. Value — `span.dls-pie-chart-labels__value`. Numeric callout.
4. Leader — `span.dls-pie-chart-labels__leader`. L-shaped stroke
   via `::before` (vertical) + `::after` (horizontal) pseudo-elements.
5. Category — `span.dls-pie-chart-labels__category`. Text label.

## Props / API

- `items` — `PieChartLabelItem[]`, default: 5 items (Pink/Teal/Cinnamon/Blue/Yellow).
  `{ id?, label, value?, slot?, color?, tone?, visible? }`.
- `categories` — `boolean`, default `true`.
- `stroke` — `boolean`, default `true`.
- `tone` — `PieChartLabelTone`, default `'700'`.
- `className` — `string`, optional.

## Tokens used

- `--dls-color-text-primary` — value and category text
- `--dls-text-paragraph-s-font-size` / `line-height` / `medium-font-weight` — typography
- `--dls-color-component-legend-item-swatch-{color}-{tone}` — leader stroke colors
- `--dls-spacing-0` — resets and positioning base
- `--dls-spacing-0-5` — stroke width calc base
- `--dls-spacing-4` — leader default height
- `--dls-spacing-6` — leader default width
- `--dls-spacing-16` / `--dls-spacing-2` — container width calc

## States

No interactive states. Passive label overlay.

## Accessibility contract

- Root: `<ul>` with `role="list"`, `aria-label="Pie chart labels"`.
- Each item: `<li>` with `aria-label` combining label + value.
- Leader strokes: `aria-hidden="true"`.
- Not focusable, not interactive.

## Composition rules

- Overlaid on top of a pie chart SVG in the same positioned container.
- Maximum 5 label slots (matching the Figma component).
- Colors use the same legend-item-swatch tokens as LegendItem.
- Items beyond 5 are silently clipped.

## Known deviations

None.

## Code example

```tsx
<PieChartLabels
  items={[
    { label: "Pink", value: "65", color: "pink" },
    { label: "Teal", value: "60", color: "teal" },
    { label: "Cinnamon", value: "90", color: "cinnamon" },
    { label: "Blue", value: "20", color: "blue" },
    { label: "Yellow", value: "65", color: "yellow" },
  ]}
  categories
  stroke
/>
```

## Cross-references

- specs/figma-descriptions/legend-item.md
- specs/figma-descriptions/legend-group.md

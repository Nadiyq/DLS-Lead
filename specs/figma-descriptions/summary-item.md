# SummaryItem

Category: data display / dashboard
React: `<SummaryItem>`
Spec: (none — new component)
TSX: apps/storybook/src/stories/summary-item/SummaryItem.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-summaryitem--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6812-60986

--------------------------------------------
## State implementation contract

This component has NO interactive states. It is a passive
data-display element for dashboard metrics.

--------------------------------------------

## Purpose

Dashboard/table summary metric showing a primary value, a trend
indicator with direction icon and change amount, and an optional
label. Three trend types: positive (green up-arrow), negative
(amber down-arrow), and no-changes (grey dash).

## Use when

- Displaying KPI summary cards above tables or dashboards.
- Showing a metric value with trend direction and percentage change.
- Compact trend-only display without the primary value.

## Do NOT use for

- Chart legend items → use LegendItem.
- Badge/status indicators → use Badge.
- Progress bars → use ProgressBar.

## Figma → Code mapping

| Figma property | React prop | Values / Notes                          |
|----------------|------------|-----------------------------------------|
| type           | type       | positive \| negative \| no-changes      |
| value          | —          | Boolean toggle for value visibility     |
| valueText      | value      | Primary metric string (e.g. "50%")     |
| label          | —          | Boolean toggle for label visibility     |
| labelText      | label      | Label string (e.g. "Label")            |
| trend          | —          | Boolean toggle for trend visibility     |
| trendText      | trendValue | Trend change string (e.g. "5%")        |
| onlyTrend      | onlyTrend  | Boolean — show only trend, hide value+label |

## Anatomy

1. Root — `div.dls-summary-item` with `data-type` and `data-only-trend`.
2. Top row — `div.dls-summary-item__top`: value + trend side by side.
3. Value — `span.dls-summary-item__value`: H2 semibold 24/32.
4. Trend — `span.dls-summary-item__trend`: icon + text, colored by type.
5. Trend icon — lucide-react `TrendingUp`, `TrendingDown`, or `Minus`.
6. Trend text — `span.dls-summary-item__trend-text`: s/medium 12/16.
7. Label — `span.dls-summary-item__label`: paragraph-m/light, secondary.

## Props / API

- `value` — `string | null`, default `'50%'`.
- `label` — `string | null`, default `'Label'`.
- `trendValue` — `string | null`, optional. Defaults to `'5%'` for positive/negative, `'0%'` for no-changes.
- `type` — `'positive' | 'negative' | 'no-changes'`, default `'positive'`.
- `onlyTrend` — `boolean`, default `false`.
- `className` — `string`, optional.

## Tokens used

- `--dls-spacing-1` — root gap (4px)
- `--dls-spacing-0` — root gap in onlyTrend mode (0px)
- `--dls-spacing-2` — top row gap (value ↔ trend)
- `--dls-color-text-primary` — value text
- `--dls-color-text-secondary` — label text
- `--dls-color-text-placeholder` — no-changes trend text
- `--dls-color-intent-success-base` — positive trend color (#027a48)
- `--dls-color-intent-warning-base` — negative trend color (#b54708)
- `--dls-text-heading-h2-*` — value typography (24/32 semibold)
- `--dls-text-paragraph-m-*` — label typography
- `--dls-text-paragraph-s-*` — trend text typography
- `--dls-spacing-4` — trend icon size (16px)
- `--dls-icon-stroke-16` — trend icon stroke width

## States

No interactive states. Trend color driven by `data-type` attribute.

## Accessibility contract

- Root element: `div` (no role — passive display).
- Trend icon: `aria-hidden="true"`.
- Not focusable, not interactive.

## Composition rules

- Used inside dashboard summary cards or table top bars.
- Can be grouped horizontally for multi-metric displays.
- `onlyTrend` mode for compact trend indicators without the main value.
- Icons from lucide-react only (TrendingUp, TrendingDown, Minus).

## Known deviations

None.

## Code example

```tsx
<SummaryItem value="50%" label="Revenue" trendValue="5%" type="positive" />
<SummaryItem value="50%" label="Churn" trendValue="5%" type="negative" />
<SummaryItem value="50%" label="Users" type="no-changes" />
<SummaryItem onlyTrend trendValue="5%" type="positive" />
```

## Cross-references

- specs/components/card.md
- specs/components/table-top-bar.md

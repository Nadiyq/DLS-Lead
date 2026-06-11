# TooltipGroup

Category: data display / chart
React: `<TooltipGroup>`
Spec: (none — new component)
TSX: apps/storybook/src/stories/tooltip-group/TooltipGroup.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-tooltipgroup--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6635-6750

--------------------------------------------
## State implementation contract

This component has NO interactive states on itself. It is a passive
tooltip surface positioned by charting code. Pointer-events are
disabled via `pointer-events: none`.

--------------------------------------------

## Purpose

Chart tooltip surface showing a date header, data series rows
(TooltipItem), and an optional total row. Appears on hover of
chart points/areas. Features a decorative pointer arrow that can sit
above or below the tooltip body depending on chart placement.

## Use when

- Displaying data values on chart hover (line, bar, pie, area charts).
- Showing multi-series data at a single point in time.
- Presenting a total/summary row below series data.

## Do NOT use for

- General UI tooltips → use the existing DLS Tooltip component.
- Dropdown menus → use Dropdown.
- Popovers → use a popover pattern.

## Figma → Code mapping

| Figma property | React prop   | Values / Notes                          |
|----------------|--------------|----------------------------------------|
| date           | date         | Boolean toggle → string in code         |
| dateText       | date         | Date header string                      |
| pointer        | showPointer  | Arrow visibility                        |
| total          | total        | Boolean toggle → TooltipGroupItem in code |
| children       | items        | Slot → array of TooltipGroupItem        |

Notes:
- Figma uses slots for tooltip item children. In code, a structured
  `items` array drives the rows.
- The `total` in Figma is a boolean toggle. In code, it's a
  TooltipGroupItem object or null.
- `pointerPlacement` is a code-side prop (`top` by default,
  `bottom` for chart overlays placed above a hovered mark). Figma
  exposes pointer visibility, not pointer placement.

## Anatomy

1. Root — `div.dls-tooltip-group` with `role="tooltip"`,
   `aria-label="Chart tooltip"`, `pointer-events: none`.
2. Pointer — `span.dls-tooltip-group__pointer` with CSS triangle arrow.
3. Body — `div.dls-tooltip-group__body`: surface-base bg, subtle border,
   tooltip radius, md shadow.
4. Date — `div.dls-tooltip-group__date`: date header text.
5. Content — `ul.dls-tooltip-group__content[role="list"]`: series rows.
6. Row — `li.dls-tooltip-group__row[role="listitem"]`: wrapping each TooltipItem.
7. Total — `div.dls-tooltip-group__total`: total row with top border divider.

## Props / API

- `date` — `string | null`, default `'1 Jan, 2026'`.
- `items` — `TooltipGroupItem[]`, default: 3 default items.
- `total` — `TooltipGroupItem | null`, default: Total row.
- `showPointer` — `boolean`, default `true`.
- `pointerPlacement` — `'top' | 'bottom'`, default `'top'`.
- `className` — `string`, optional.
- `role` — `string`, default `'tooltip'`.
- `aria-label` — `string`, default `'Chart tooltip'`.

## Tokens used

- `--dls-color-surface-base` — body background + arrow inner
- `--dls-color-border-subtle` — body border, arrow outer, total divider
- `--dls-radius-component-tooltip` — body border-radius
- `--dls-shadow-surface-md` — body shadow
- `--dls-spacing-3` — date/content/total padding
- `--dls-spacing-2` — content row gap
- `--dls-spacing-4` — arrow width
- `--dls-spacing-2-5` — arrow height
- `--dls-spacing-10` / `--dls-spacing-1` — body width calc
- `--dls-color-text-primary` — date text
- `--dls-text-paragraph-m-*` — date typography

## States

No interactive states. `pointer-events: none` on root.

## Accessibility contract

- Root element: `div[role="tooltip"]` with `aria-label="Chart tooltip"`.
- Content list: `ul[role="list"]` with `aria-label="Tooltip values"`.
- Each row: `li[role="listitem"]`.
- Pointer arrow: `aria-hidden="true"`.
- Not focusable — tooltip is positioned and shown by charting code.

## Composition rules

- All data rows are TooltipItem components with `layout="split"`.
- Total row uses TooltipItem with `showSwatch={false}`.
- Positioned by chart library code — this component only provides the surface.
- Date is optional — pass `null` to hide.
- Total is optional — pass `null` to hide.

## Known deviations

None.

## Code example

```tsx
<TooltipGroup
  date="1 Jan, 2026"
  items={[
    { label: "Pipeline", value: "42%", unit: "kcal", color: "green" },
    { label: "Expansion", value: "28%", unit: "kcal", color: "blue" },
  ]}
  total={{ label: "Total", value: "70%", unit: "kcal" }}
  showPointer
/>
```

## Cross-references

- specs/figma-descriptions/tooltip-item.md
- specs/figma-descriptions/legend-item.md
- specs/components/tooltip.md

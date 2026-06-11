# LegendGroup

Category: data display / chart
React: `<LegendGroup>`
Spec: (none — new component)
TSX: apps/storybook/src/stories/legend-group/LegendGroup.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-legendgroup--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6635-5292

--------------------------------------------
## State implementation contract

This component has NO interactive states. It is a passive
layout container for LegendItem children.

--------------------------------------------

## Purpose

Groups LegendItem rows into a vertical or horizontal list for
chart/data visualization legends. Renders as a semantic `<ul>`
list with proper ARIA labeling.

## Use when

- Displaying a chart legend with multiple data series.
- Laying out legend items vertically (default) or horizontally.
- Providing accessible list semantics for chart legend data.

## Do NOT use for

- Navigation lists → use List + ListItem.
- Chip groups → use ChipInput or FilterChip.
- Tag lists → use Badge components.

## Figma → Code mapping

| Figma property  | React prop   | Values / Notes                         |
|-----------------|--------------|----------------------------------------|
| horizontal      | orientation  | false → "vertical", true → "horizontal" |
| slotHorizontal  | items        | Slot for vertical legend items (data-driven in code) |
| slotVertical    | items        | Slot for horizontal legend items (data-driven in code) |

Notes:
- Figma has two slot properties for the two orientations. In code,
  a single `items` array + `orientation` prop replaces both.
- Figma's slot naming is inverted — `slotHorizontal` contains
  vertical items and vice versa. Code normalizes this.

## Anatomy

1. Root — `<ul>` with `dls-legend-group` class, `role="list"`,
   `aria-label="Chart legend"`, `data-orientation`.
2. List items — `<li>` with `dls-legend-group__item` class,
   `role="listitem"`, each containing a LegendItem.

## Props / API

- `items` — `LegendGroupItem[]`, default: 5 default items.
  `{ id?, label, value?, color?, tone? }`.
- `orientation` — `'vertical' | 'horizontal'`, default `'vertical'`.
- `tone` — `LegendItemTone`, default `'500'`. Default tone for items
  that don't specify one.
- `className` — `string`, optional.
- `role` — `string`, default `'list'`.
- `aria-label` — `string`, default `'Chart legend'`.

## Tokens used

- `--dls-spacing-0` — margin/padding reset
- `--dls-spacing-3` — gap between items (12px)

## States

No interactive states. Passive layout container.

## Accessibility contract

- Root element: `<ul>` with `role="list"` and `aria-label="Chart legend"`.
- Each item: `<li>` with `role="listitem"`.
- Not focusable, not interactive.
- Custom `aria-label` can be provided for context-specific legends.

## Composition rules

- Children are always LegendItem components rendered from the `items` array.
- Horizontal orientation wraps when space is constrained.
- Color+tone combinations should be unique across items.
- Override `aria-label` for specific chart contexts (e.g., "Regional revenue legend").

## Known deviations

None.

## Code example

```tsx
<LegendGroup
  orientation="vertical"
  items={[
    { label: "Pipeline", value: "42%", color: "green" },
    { label: "Expansion", value: "28%", color: "blue" },
    { label: "Renewals", value: "18%", color: "violet" },
  ]}
/>

<LegendGroup
  orientation="horizontal"
  items={[
    { label: "Item 1", color: "green" },
    { label: "Item 2", color: "yellow" },
    { label: "Item 3", color: "blue" },
  ]}
  aria-label="Revenue breakdown"
/>
```

## Cross-references

- specs/figma-descriptions/legend-item.md

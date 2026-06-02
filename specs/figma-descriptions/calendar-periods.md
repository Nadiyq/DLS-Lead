# CalendarPeriods

Category: input / date picker
React: `<CalendarPeriods>`
Spec: `specs/components/calendar-periods.md`
TSX: `apps/storybook/src/stories/calendar/CalendarPeriods.tsx`
CSS: `apps/storybook/src/stories/calendar/calendar-periods.css`
Storybook: https://storybook.dlslead.com/?path=/docs/components-calendarperiods--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=143-12036

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays -- this is a
SIMULATION of the code behavior, not the implementation.

In code, pick the mechanism by surface type:
- Base fill present (filled, soft, any tinted bg)
  -> OKLCH L-shift: oklch(from <base> calc(l + <delta>) c h)
- Transparent surface (outline, dotted, ghost, link, or
  ghost-surface components like ListItem, CalendarDay)
  -> overlay tokens.

This component: NONE on the container. Interactive behavior is
fully delegated to child components:
- CalendarDay cells -> OVERLAY TOKENS (transparent surface)
- ListItem period rows -> OVERLAY TOKENS (transparent surface)
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Preset date-range picker with a sidebar of quick-pick periods
(e.g. "Last 7 days", "Last 30 days") alongside two consecutive
month calendars for custom range selection.

## Use when

- Offering predefined date ranges alongside custom selection.
- Analytics dashboards with common time filters.
- Reports where users frequently pick "Last N days" or "All time".
- Date range filtering with known preset options.

## Do NOT use for

- Single date selection -> use Calendar.
- Date range without presets -> use CalendarRange.
- Date text input only -> use DateInput or DateRangeInput.
- Time-only selection -> use time picker components.

## Figma -> Code mapping

| Figma property | React prop | Values |
|----------------|------------|--------|
| footer         | footer     | Figma: boolean on/off -> React: ReactNode (truthy = visible) |

## Anatomy

```
Root (.dls-calendar-periods)
+-- Sidebar (.dls-calendar-periods__sidebar)
|   +-- ListItem (type="text") x N  -- period presets
+-- Right panel (.dls-calendar-periods__right)
    +-- Dates area (.dls-calendar-periods__dates)
    |   +-- Weekday header (.dls-calendar-periods__weekdays)
    |   |   +-- Weekday label x 7
    |   +-- Month 1 (.dls-calendar-periods__month)
    |   |   +-- Month header + title
    |   |   +-- Grid (.dls-calendar-periods__grid)
    |   |       +-- CalendarDay x 42
    |   +-- Month 2 (.dls-calendar-periods__month)
    |       +-- Month header + title
    |       +-- Grid (.dls-calendar-periods__grid)
    |           +-- CalendarDay x 42
    +-- Footer (.dls-calendar-periods__footer) [optional]
        +-- Separator
        +-- Actions area (consumer-provided via footer prop)
```

## Props / API

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| periods | PeriodOption[] | yes | -- | Preset period options. Each: { value, label, startDate?, endDate? } |
| selectedPeriod | string | no | -- | Currently selected period value |
| onPeriodChange | (value, start?, end?) => void | no | -- | Called when a period is selected |
| startDate | Date \| null | no | -- | Range start date (for custom selection) |
| endDate | Date \| null | no | -- | Range end date |
| onRangeChange | (start, end) => void | no | -- | Called when date range changes via calendar click |
| today | Date | no | new Date() | Today override |
| weekStartsOn | 0 \| 1 | no | 0 | First day of week: 0 = Sunday, 1 = Monday |
| footer | React.ReactNode | no | -- | Footer content (e.g. Cancel/Confirm buttons) |
| className | string | no | -- | Additional CSS class |

### PeriodOption interface

```ts
interface PeriodOption {
  value: string;     // unique key
  label: string;     // display label
  startDate?: Date;  // start date for this period
  endDate?: Date;    // end date for this period
}
```

## Tokens used

### Layout

| Token | Use |
|-------|-----|
| `--dls-radius-component-calendar` | Container border-radius |
| `--dls-font-family` | Container, headers |
| `--dls-spacing-1` | Sidebar padding-x |
| `--dls-spacing-1-5` | Sidebar padding-y |
| `--dls-spacing-2` | Footer actions gap |
| `--dls-spacing-3` | Right panel padding, dates gap, footer gap |

### Color

| Token | Use |
|-------|-----|
| `--dls-color-surface-base` | Container background |
| `--dls-color-border-subtle` | Container border |
| `--dls-color-border-base` | Sidebar right border, footer separator |
| `--dls-shadow-surface-lg` | Container shadow |
| `--dls-color-text-secondary` | Weekday labels, month titles |

### Typography

| Token | Use |
|-------|-----|
| `--dls-text-s-font-size` | Weekday labels |
| `--dls-text-s-line-height` | Weekday labels |
| `--dls-text-m-font-size` | Month titles |
| `--dls-text-m-line-height` | Month titles |
| `--dls-font-weight-medium` | Weekday labels, month titles |

### Delegated tokens (via CalendarDay)

| Token | Use |
|-------|-----|
| `--dls-radius-component-calendar-day` | Day cell border-radius |
| `--dls-color-intent-neutral-text` | Normal day text |
| `--dls-color-intent-neutral-base` | Selected day bg |
| `--dls-color-intent-neutral-on-base` | Selected day text |
| `--dls-color-intent-primary-subtle` | Today bg |
| `--dls-color-intent-primary-border` | Today border |
| `--dls-color-intent-primary-text` | Today text |
| `--dls-color-text-placeholder` | Outside-month day text |
| `--dls-state-hover-overlay` | Day hover bg, range highlight bg |
| `--dls-state-focus-ring-color` | Day focus ring |

## States

### Container
No interactive states. All interactivity is delegated to children.

### Period sidebar (via ListItem)
| State | Visual |
|-------|--------|
| Normal | Surface base bg, neutral text |
| Hover | Overlay hover bg |
| Selected/Pressed | `intent/info/subtle` bg (info blue tint) |

### Day cells (via CalendarDay)
| State | Visual |
|-------|--------|
| Normal | Transparent bg, neutral text |
| Today | Primary subtle bg + primary border |
| Hover | Overlay hover bg |
| Selected (start/end) | Neutral base fill, on-base text |
| Highlight (in range) | Overlay hover bg, no border-radius |
| Outside month | Placeholder text color |
| Disabled | Surface disabled bg, text disabled |
| Focus-visible | Focus ring shadow |

## Accessibility contract

- Root: `div` (non-interactive compound container).
- Sidebar period items: `ListItem` provides button semantics. Selected period uses `selected` prop which applies visual selected state.
- Day cells: native `<button>` elements via `CalendarDay`. Text is day number.
- Keyboard: Tab navigates between interactive elements (ListItem rows, CalendarDay buttons). Enter/Space activates.
- Focus: `:focus-visible` ring on CalendarDay buttons via `--dls-state-focus-ring-color`.
- No modal trapping. No `prefers-reduced-motion` needed (no CSS transitions/animations in calendar-periods.css).

## Composition rules

- Sidebar rows MUST be `ListItem` (type="text").
- Day cells MUST be `CalendarDay`.
- Footer content is consumer-provided via `footer` prop. Typical: Cancel + Confirm `Button` components.
- Do not nest CalendarPeriods inside another CalendarPeriods.
- Do not mix with CalendarRange -- CalendarPeriods already includes two month grids.

## Known deviations

- **token-layer**: No L4 color tokens for calendar-periods in `tokens.json`. Uses semantic and intent tokens directly. Only radius tokens (`--dls-radius-component-calendar`, `--dls-radius-component-calendar-day`) exist as L4.
- **figma-coverage**: Figma footer includes time picker (hour/minute dropdowns + AM/PM tabs) which is not implemented in CalendarPeriods. The code footer is a simple ReactNode slot. Time picker is a future feature.

## Code example

```tsx
const periods = [
  { value: '7d', label: 'Last 7 days', startDate: weekAgo, endDate: today },
  { value: '30d', label: 'Last 30 days', startDate: monthAgo, endDate: today },
  { value: 'all', label: 'All time' },
  { value: 'custom', label: 'Custom' },
];

<CalendarPeriods
  periods={periods}
  selectedPeriod={selectedPeriod}
  onPeriodChange={(val, start, end) => {
    setSelectedPeriod(val);
    if (start && end) setRange(start, end);
  }}
  startDate={rangeStart}
  endDate={rangeEnd}
  onRangeChange={(start, end) => {
    setRange(start, end);
    setSelectedPeriod('custom');
  }}
  footer={
    <>
      <Button variant="outline" size="m">Cancel</Button>
      <Button variant="filled" size="m">Confirm</Button>
    </>
  }
/>
```

## Cross-references

- [calendar.md](../components/calendar.md) -- base Calendar
- [calendar-range.md](../components/calendar-range.md) -- dual-panel range
- [calendar-day.md](../figma-descriptions/calendar-day.md) -- day cell sub-component
- [list-item.md](../components/list-item.md) -- sidebar period rows
- [button.md](../components/button.md) -- footer actions

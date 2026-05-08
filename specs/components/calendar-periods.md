---
name: CalendarPeriods
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/calendar/CalendarPeriods.tsx
  - apps/storybook/src/stories/calendar/calendar-periods.css
  - tokens/tokens.json
---

# CalendarPeriods

## Metadata

- Category: date picker

## Overview

Use `CalendarPeriods` for preset date-range selection — a sidebar of quick-pick periods (e.g., "Last 7 days") alongside a two-month calendar for custom ranges.

## Anatomy

- Root
- Sidebar: ListItem rows for preset periods
- Right panel: two month grids with weekday headers
- Footer (optional)

## Tokens Used

- `--dls-color-component-calendar-*`
- `--dls-radius-component-calendar`
- list-item token families

## Props / API

- `periods` — `{ value, label, startDate?, endDate? }[]`
- `selectedPeriod`, `onPeriodChange`
- `startDate`, `endDate`, `onRangeChange`
- `today` — override for today
- `weekStartsOn` — `0` (Sunday) or `1` (Monday)
- `footer`

## States

- preset period selected
- custom range picking (start, end)
- range highlighted
- today marker

## Code Example

```tsx
<CalendarPeriods
  periods={[{ value: "7d", label: "Last 7 days", startDate: weekAgo, endDate: today }]}
  selectedPeriod="7d" onPeriodChange={handlePeriod} />
```

## Cross-References

- [calendar.md](calendar.md)
- [calendar-range.md](calendar-range.md)

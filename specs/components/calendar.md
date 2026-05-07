---
name: Calendar
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/calendar/Calendar.tsx
  - apps/storybook/src/stories/calendar/calendar.css
  - tokens/tokens.json
---

# Calendar

## Metadata

- Category: input / date picker
- Views: `date | month | year`

## Overview

Use `Calendar` for date selection. It supports single date, date range highlighting, and min/max constraints. Used internally by `DateInput` and `CalendarRange`.

## Anatomy

- Root
- Header: nav arrows + view title button
- Date view: weekday headers + day grid
- Month view: month grid
- Year view: year grid

## Tokens Used

- `--dls-color-component-calendar-*`
- `--dls-radius-component-calendar`
- `--dls-spacing-*`

## Props / API

- `value` — selected date
- `valueEnd` — range end date
- `onSelect`
- `month` — displayed month (controlled)
- `onMonthChange`
- `min`, `max`
- `view`, `onViewChange`

## States

- default
- selected date
- in-range (between start and end)
- today indicator
- outside-month days
- disabled dates (min/max)

## Code Example

```tsx
<Calendar value={selectedDate} onSelect={setSelectedDate} />
```

## Cross-References

- [date-input.md](date-input.md)
- [date-range-input.md](date-range-input.md)

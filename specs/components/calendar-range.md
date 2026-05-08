---
name: CalendarRange
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/calendar/CalendarRange.tsx
  - apps/storybook/src/stories/calendar/calendar-range.css
  - tokens/tokens.json
---

# CalendarRange

## Metadata

- Category: date picker
- Layouts: `horizontal | vertical`

## Overview

Use `CalendarRange` for a two-month date range picker. Supports horizontal/vertical layout, min/max constraints, optional time picker, and a footer actions slot.

## Anatomy

- Root
- Two month panels with nav arrows and day grids
- Footer (optional): time picker + action buttons
  - Time picker: hour dropdown, minute dropdown, AM/PM tabs

## Tokens Used

- `--dls-color-component-calendar-*`
- `--dls-radius-component-calendar`

## Props / API

- `startDate`, `endDate`, `onRangeChange`
- `today`
- `minDate`, `maxDate`
- `layout` — `horizontal | vertical`
- `weekStartsOn` — `0` or `1`
- `showTimePicker`
- `hour`, `minute`, `period` — time values
- `onTimeChange`
- `footer`

## States

- no selection
- start selected (picking end)
- range selected with highlight
- time picker active

## Code Example

```tsx
<CalendarRange layout="horizontal" startDate={start} endDate={end} onRangeChange={setRange}
  footer={<><Button variant="outline">Cancel</Button><Button variant="filled">Apply</Button></>} />
```

## Cross-References

- [calendar.md](calendar.md)
- [calendar-periods.md](calendar-periods.md)
- [date-range-input.md](date-range-input.md)

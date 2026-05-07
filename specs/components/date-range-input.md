---
name: DateRangeInput
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/date-range-input/DateRangeInput.tsx
  - apps/storybook/src/stories/date-range-input/date-range-input.css
  - tokens/tokens.json
---

# DateRangeInput

## Metadata

- Category: form input / date range picker

## Overview

Use `DateRangeInput` for selecting a start–end date range. Composed of two `DateInput` triggers with a shared calendar dropdown.

## Anatomy

- Root
- Label (optional)
- Row: start DateInput + separator + end DateInput
- Calendar dropdown (when a field is active)
- Hint / error row (optional)

## Tokens Used

- `--dls-color-component-input-*`
- `--dls-radius-component-input`
- `--dls-color-intent-danger-*`

## Props / API

- `startValue`, `endValue` — display strings
- `startDate`, `endDate` — Date objects
- `onStartDateSelect`, `onEndDateSelect`
- `startPlaceholder`, `endPlaceholder`
- `label`, `hint`, `error`
- `min`, `max`
- `disabled`

## States

- empty
- partially filled (one date set)
- filled
- field-active (start or end focused)
- error
- disabled

## Code Example

```tsx
<DateRangeInput label="Period" startValue="Mar 1, 2026" endValue="Mar 31, 2026" />
```

## Cross-References

- [date-input.md](date-input.md)
- [calendar.md](calendar.md)

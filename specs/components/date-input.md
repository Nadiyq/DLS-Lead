---
name: DateInput
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/date-input/DateInput.tsx
  - apps/storybook/src/stories/date-input/date-input.css
  - tokens/tokens.json
---

# DateInput

## Metadata

- Category: form input / date picker

## Overview

Use `DateInput` for single-date selection with a calendar dropdown. Supports label, hint, error, clearable, and min/max constraints.

## Anatomy

- Root
- Label (optional)
- Trigger button: calendar icon + value text + clear button + chevron
- Calendar dropdown (when open)
- Hint / error row (optional)

## Tokens Used

- `--dls-color-component-input-*`
- `--dls-radius-component-input`
- `--dls-state-focus-ring-color`
- `--dls-color-intent-danger-*`

## Props / API

- `value` — display string
- `selectedDate` — Date object for calendar
- `onDateSelect`
- `placeholder`
- `label`, `hint`, `error`
- `clearable`, `onClear`
- `min`, `max`
- `disabled`

## States

- empty (placeholder)
- filled
- open (calendar visible)
- error
- disabled

## Code Example

```tsx
<DateInput label="Start date" value="Mar 18, 2026" selectedDate={date} onDateSelect={setDate} clearable />
```

## Cross-References

- [calendar.md](calendar.md)
- [date-range-input.md](date-range-input.md)
- [input-field.md](input-field.md)

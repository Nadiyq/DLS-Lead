---
name: Input Field
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/input-field/InputField.tsx
  - apps/storybook/src/stories/input-field/input-field.css
  - tokens/tokens.json
---

# Input Field

## Metadata

- Category: input
- Type: single-line text field

## Overview

Use `InputField` for labeled single-line text entry with optional hint, error, clear action, and leading/trailing icons.

Do not use it for option selection; use `Dropdown` for that.

## Anatomy

- Label
- Bordered field wrapper
- Optional leading icon
- Input
- Optional clear button or trailing icon
- Hint or error row

## Tokens Used

- `--dls-color-component-input-*`
- `--dls-radius-component-input`
- `--dls-state-focus-ring-color`
- `--dls-color-intent-danger-*`
- `--dls-spacing-*`

## Props / API

- `label`
- `hint`
- `error`
- `clearable`
- `onClear`
- `iconStart`
- `iconEnd`
- standard input HTML attributes except native `size`

## States

- default
- hover
- focus-within
- error
- disabled
- clearable-with-value

## Code Example

```tsx
<InputField
  label="Email"
  placeholder="name@company.com"
  hint="We will only use this for account access."
  clearable
/>
```

## Cross-References

- [dropdown.md](dropdown.md)
- [../foundations/typography.md](../foundations/typography.md)

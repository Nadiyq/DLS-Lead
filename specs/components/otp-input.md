---
name: OtpInput
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/otp-input/OtpInput.tsx
  - apps/storybook/src/stories/otp-input/otp-input.css
  - tokens/tokens.json
---

# OtpInput

## Metadata

- Category: form input
- Types: `spacing | no-spacing | 1-separator | 2-separator`

## Overview

Use `OtpInput` for one-time-password or verification code entry. Configurable digit count and visual grouping.

## Anatomy

- Root
- Label (optional)
- Field: individual digit slots, optional separators
- Hint / error row (optional)

## Tokens Used

- `--dls-color-component-input-*`
- `--dls-radius-component-input`
- `--dls-state-focus-ring-color`
- `--dls-color-intent-danger-*`

## Props / API

- `length` — digit count (default: 6)
- `type` — layout format
- `value`, `onChange`
- `label`, `hint`, `error`
- `disabled`

## States

- empty
- partially filled
- filled
- error
- disabled
- focus (active slot)

## Code Example

```tsx
<OtpInput length={6} type="1-separator" label="Enter code" />
```

## Cross-References

- [input-field.md](input-field.md)

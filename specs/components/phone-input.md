---
name: PhoneInput
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/phone-input/PhoneInput.tsx
  - apps/storybook/src/stories/phone-input/phone-input.css
  - tokens/tokens.json
---

# PhoneInput

## Metadata

- Category: form input

## Overview

Use `PhoneInput` for international phone number entry with a country selector showing flag, dial code, and a clear button.

## Anatomy

- Root
- Label (optional)
- Field box: country button (flag + dial code + chevron) + input + clear button
- Hint / error row (optional)

## Tokens Used

- `--dls-color-component-input-*`
- `--dls-radius-component-input`
- `--dls-state-focus-ring-color`
- `--dls-color-intent-danger-*`

## Props / API

- `country` — `{ code, dialCode, flag, name }`
- `onCountryClick`
- `onClear`
- `label`, `hint`, `error`
- `disabled`
- standard input HTML attributes

## States

- empty
- filled
- error
- disabled
- focus-within

## Code Example

```tsx
<PhoneInput label="Phone" country={{ code: "US", dialCode: "+1", flag: "🇺🇸", name: "United States" }} />
```

## Cross-References

- [input-field.md](input-field.md)

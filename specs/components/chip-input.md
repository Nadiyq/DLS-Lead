---
name: ChipInput
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/chip-input/ChipInput.tsx
  - apps/storybook/src/stories/chip-input/chip-input.css
  - tokens/tokens.json
---

# ChipInput

## Metadata

- Category: form input / multi-select

## Overview

Use `ChipInput` for multi-value entry — selecting from a list or typing free-text tokens. Each value renders as a removable `ChipRegular`.

## Anatomy

- Root
- Label (optional)
- Field box
  - Chip tokens
  - Text input (combobox role)
- Listbox dropdown (when open)
  - ListItem options
- Hint / error row (optional)

## Tokens Used

- `--dls-color-component-input-*`
- `--dls-radius-component-input`
- `--dls-state-focus-ring-color`
- `--dls-color-intent-danger-*`

## Props / API

- `options` — available choices
- `values` — selected values
- `onValuesChange`
- `allowFreeText`
- `label`, `hint`, `error`
- `placeholder`
- `disabled`

## States

- empty
- filled (with chips)
- open (listbox visible)
- error
- disabled

## Code Example

```tsx
<ChipInput
  label="Tags"
  options={[{ value: "ui", label: "UI" }, { value: "api", label: "API" }]}
  values={["ui"]}
  onValuesChange={setTags}
/>
```

## Cross-References

- [chip-regular.md](chip-regular.md)
- [dropdown.md](dropdown.md)

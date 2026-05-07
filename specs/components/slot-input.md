---
name: SlotInput
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/slot-input/SlotInput.tsx
  - apps/storybook/src/stories/slot-input/slot-input.css
  - tokens/tokens.json
---

# SlotInput

## Metadata

- Category: form input

## Overview

Use `SlotInput` for text inputs with flexible leading/trailing slots — icons, buttons, labels, or custom elements on either side.

## Anatomy

- Root
- Label (optional)
- Field: iconStart + slotLeft + input + clear button + iconEnd + slotRight
- Hint / error row (optional)

## Tokens Used

- `--dls-color-component-input-*`
- `--dls-radius-component-input`
- `--dls-state-focus-ring-color`
- `--dls-color-intent-danger-*`

## Props / API

- `label`, `hint`, `error`
- `iconStart`, `iconEnd`
- `slotLeft`, `slotRight`
- `clearable`, `onClear`
- `disabled`
- standard input HTML attributes

## States

- empty
- filled
- error
- disabled
- clearable (clear button visible when value)

## Code Example

```tsx
<SlotInput label="URL" iconStart={<LinkIcon />} slotLeft={<span>https://</span>} placeholder="example.com" clearable />
```

## Cross-References

- [input-field.md](input-field.md)

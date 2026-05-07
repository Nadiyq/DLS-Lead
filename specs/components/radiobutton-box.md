---
name: RadiobuttonBox
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/radiobutton/RadiobuttonBox.tsx
  - apps/storybook/src/stories/radiobutton/radiobutton-box.css
  - tokens/tokens.json
---

# RadiobuttonBox

## Metadata

- Category: form control / card

## Overview

Use `RadiobuttonBox` for card-style radio selections — a bordered box wrapping a `Radiobutton` with label and description.

## Anatomy

- Root (role="radio")
- Embedded Radiobutton
- Text block: label + description

## Tokens Used

- `--dls-color-component-radiobutton-box-*`
- `--dls-radius-component-radiobutton-box`
- `--dls-state-focus-ring-color`

## Props / API

- `checked`
- `disabled`
- `label`
- `description`
- `textOrientation` — `right | left`
- `onChange`
- `name`, `value`

## States

- unselected
- selected
- disabled
- focus-visible

## Code Example

```tsx
<RadiobuttonBox label="Annual" description="Save 20%" checked={billing === 'annual'} onChange={() => setBilling('annual')} />
```

## Cross-References

- [radiobutton.md](radiobutton.md)
- [checkbox-box.md](checkbox-box.md)
- [switcher-box.md](switcher-box.md)

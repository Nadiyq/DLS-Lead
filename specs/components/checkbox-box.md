---
name: CheckboxBox
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/checkbox/CheckboxBox.tsx
  - apps/storybook/src/stories/checkbox/checkbox-box.css
  - tokens/tokens.json
---

# CheckboxBox

## Metadata

- Category: form control / card

## Overview

Use `CheckboxBox` for card-style checkbox selections — a bordered box wrapping a `Checkbox` with label and description.

## Anatomy

- Root (role="checkbox")
- Embedded Checkbox
- Text block: label + description

## Tokens Used

- `--dls-color-component-checkbox-box-*`
- `--dls-radius-component-checkbox-box`
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
<CheckboxBox label="Email alerts" description="Get notified on new activity" checked={emailAlerts} onChange={setEmailAlerts} />
```

## Cross-References

- [checkbox.md](checkbox.md)
- [radiobutton-box.md](radiobutton-box.md)
- [switcher-box.md](switcher-box.md)

---
name: SwitcherBox
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/switcher/SwitcherBox.tsx
  - apps/storybook/src/stories/switcher/switcher-box.css
  - tokens/tokens.json
---

# SwitcherBox

## Metadata

- Category: form control / card

## Overview

Use `SwitcherBox` for card-style toggle selections — a bordered box wrapping a `Switcher` with label and description.

## Anatomy

- Root (role="switch")
- Embedded Switcher
- Text block: label + description

## Tokens Used

- `--dls-color-component-switcher-box-*`
- `--dls-radius-component-switcher-box`
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
<SwitcherBox label="Dark mode" description="Use dark theme" checked={darkMode} onChange={setDarkMode} />
```

## Cross-References

- [switcher.md](switcher.md)
- [radiobutton-box.md](radiobutton-box.md)
- [checkbox-box.md](checkbox-box.md)

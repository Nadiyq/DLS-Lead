---
name: Switcher
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/switcher/Switcher.tsx
  - apps/storybook/src/stories/switcher/switcher.css
  - tokens/tokens.json
---

# Switcher

## Metadata

- Category: form control

## Overview

Use `Switcher` for on/off toggles. Renders as a native checkbox with `role="switch"`. Supports label, description, and text orientation.

Do not use it for multi-option selection; use `Checkbox` or `Radiobutton` for that.

## Anatomy

- Root (label)
- Hidden native input (role="switch")
- Track with sliding toggle circle
- Text block: label + optional description

## Tokens Used

- `--dls-color-component-switcher-*`
- `--dls-radius-component-switcher`
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

- unchecked
- checked
- disabled
- hover
- focus-visible

## Code Example

```tsx
<Switcher label="Notifications" checked={enabled} onChange={setEnabled} />
```

## Cross-References

- [switcher-box.md](switcher-box.md)
- [checkbox.md](checkbox.md)

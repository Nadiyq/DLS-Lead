---
name: Checkbox
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/checkbox/Checkbox.tsx
  - apps/storybook/src/stories/checkbox/checkbox.css
  - tokens/tokens.json
---

# Checkbox

## Metadata

- Category: form control
- Variants: none
- Intents: none
- Sizes: none

## Overview

Use `Checkbox` for binary or indeterminate selections. Supports label, description, and text orientation.

Do not use it for mutually exclusive choices; use `Radiobutton` for that.

## Anatomy

- Root (label)
- Hidden native input
- Visual box with check/minus icon
- Text block: label + optional description

## Tokens Used

- `--dls-color-component-checkbox-*`
- `--dls-radius-component-checkbox`
- `--dls-state-focus-ring-color`

## Props / API

- `checked`
- `indeterminate`
- `disabled`
- `label`
- `description`
- `textOrientation` — `right | left`
- `onChange`
- `name`, `value`

## States

- unchecked
- checked
- indeterminate
- disabled
- hover
- focus-visible

## Code Example

```tsx
<Checkbox label="Accept terms" checked={accepted} onChange={setAccepted} />
```

## Cross-References

- [radiobutton.md](radiobutton.md)
- [switcher.md](switcher.md)

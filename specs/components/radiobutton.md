---
name: Radiobutton
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/radiobutton/Radiobutton.tsx
  - apps/storybook/src/stories/radiobutton/radiobutton.css
  - tokens/tokens.json
---

# Radiobutton

## Metadata

- Category: form control

## Overview

Use `Radiobutton` for mutually exclusive single-selection within a group. Supports label, description, and text orientation.

Do not use it for binary toggles; use `Checkbox` or `Switcher` for that.

## Anatomy

- Root (label)
- Hidden native input (type="radio")
- Visual circle with inner dot
- Text block: label + optional description

## Tokens Used

- `--dls-color-component-radiobutton-*`
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
<Radiobutton name="plan" value="pro" label="Pro" description="$29/mo" checked={plan === 'pro'} onChange={() => setPlan('pro')} />
```

## Cross-References

- [radiobutton-box.md](radiobutton-box.md)
- [checkbox.md](checkbox.md)

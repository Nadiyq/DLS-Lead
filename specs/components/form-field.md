---
name: FormField
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/form-field/FormField.tsx
  - apps/storybook/src/stories/form-field/form-field.css
  - tokens/tokens.json
---

# FormField

## Metadata

- Category: form wrapper / layout
- Orientations: `vertical | horizontal`

## Overview

Use `FormField` to wrap any input component with a consistent label, hint, and optional info icon. It handles layout and accessibility linking.

## Anatomy

- Root
- Label row: label text + optional info icon button
- Input container (children)
- Hint text (optional)

Vertical: label → input → hint stacked.
Horizontal: label+hint on the left, input on the right.

## Tokens Used

- `--dls-color-component-form-field-*`
- `--dls-spacing-*`

## Props / API

- `label`
- `hint`
- `showInfo`, `onInfoClick`
- `orientation` — `vertical | horizontal`
- `htmlFor` — links label to input
- `disabled`
- `children` — the input component

## States

- default
- disabled
- with info icon

## Code Example

```tsx
<FormField label="Email" hint="We'll never share this." orientation="vertical">
  <InputField placeholder="name@company.com" />
</FormField>
```

## Cross-References

- [input-field.md](input-field.md)
- [dropdown.md](dropdown.md)

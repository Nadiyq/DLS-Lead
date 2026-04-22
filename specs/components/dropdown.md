---
name: Dropdown
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/dropdown/Dropdown.tsx
  - apps/storybook/src/stories/dropdown/dropdown.css
  - tokens/tokens.json
---

# Dropdown

## Metadata

- Category: input / selection
- Supports: plain select, autocomplete, clearable select

## Overview

Use `Dropdown` when the user is choosing from a list of predefined options.

It composes input-like field styling with a listbox made of `ListItem` rows.

## Anatomy

- Label
- Trigger field
- Optional leading icon or avatar
- Value text or autocomplete input
- Optional clear button
- Chevron
- Listbox
- Hint or error row

## Tokens Used

- `--dls-color-component-input-*`
- `--dls-radius-component-input`
- `--dls-state-focus-ring-color`
- `--dls-color-intent-danger-*`
- list and list-item token families

## Props / API

- `options`
- `value`
- `onChange`
- `autocomplete`
- `placeholder`
- `label`
- `hint`
- `error`
- `leadingIcon`
- `disabled`
- `clearable`
- `id`

Option shape:

- `value`
- `label`
- optional `icon`
- optional `avatarSrc`
- optional `avatarInitials`

## States

- default
- open
- hover
- focus / focus-visible
- autocomplete filtering
- error
- disabled
- empty-results

## Code Example

```tsx
<Dropdown
  label="Owner"
  placeholder="Select owner"
  autocomplete
  clearable
  options={[
    { value: "nadia", label: "Nadiia Abrosimova", avatarInitials: "NA" },
    { value: "team", label: "Design team" }
  ]}
/>
```

## Cross-References

- [input-field.md](input-field.md)
- [list-item.md](list-item.md)
- [../patterns/component-selection.md](../patterns/component-selection.md)

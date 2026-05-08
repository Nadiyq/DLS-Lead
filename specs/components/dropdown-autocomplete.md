---
name: DropdownAutocomplete
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/dropdown-autocomplete/DropdownAutocomplete.tsx
  - apps/storybook/src/stories/dropdown-autocomplete/dropdown-autocomplete.css
  - tokens/tokens.json
---

# DropdownAutocomplete

## Metadata

- Category: form input / selection

## Overview

Use `DropdownAutocomplete` for a searchable select — the user types to filter, then picks from the filtered list. Supports leading icons, avatars, label, hint, and error.

## Anatomy

- Root
- Label (optional)
- Trigger: leading icon/avatar + text input + clear button + chevron
- Listbox dropdown with highlighted option
- Hint / error row (optional)

## Tokens Used

- `--dls-color-component-input-*`
- `--dls-radius-component-input`
- `--dls-state-focus-ring-color`
- `--dls-color-intent-danger-*`

## Props / API

- `options` — option array `{ value, label, icon?, avatarSrc?, avatarInitials? }[]`
- `value`, `onChange`
- `placeholder`
- `label`, `hint`, `error`
- `leadingIcon`
- `disabled`

## States

- empty
- filled
- open (filtering)
- highlighted option
- error
- disabled

## Code Example

```tsx
<DropdownAutocomplete label="Assignee" placeholder="Search..."
  options={[{ value: "na", label: "Nadiia", avatarInitials: "NA" }]} />
```

## Cross-References

- [dropdown.md](dropdown.md)
- [input-field.md](input-field.md)

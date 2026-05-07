---
name: SearchField
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/search-field/SearchField.tsx
  - apps/storybook/src/stories/search-field/search-field.css
  - tokens/tokens.json
---

# SearchField

## Metadata

- Category: form input

## Overview

Use `SearchField` for search inputs with a leading search icon and an optional clear button. Simpler than `InputField` — purpose-built for search.

## Anatomy

- Root
- Label (optional)
- Field box: search icon + input + clear button
- Clear button appears when value is present

## Tokens Used

- `--dls-color-component-input-*`
- `--dls-radius-component-input`
- `--dls-state-focus-ring-color`

## Props / API

- `label`
- `onClear`
- `placeholder` (default: "Search")
- `disabled`
- standard input HTML attributes

## States

- empty
- filled (clear button visible)
- disabled
- focus-within

## Code Example

```tsx
<SearchField placeholder="Search users..." value={query} onChange={e => setQuery(e.target.value)} onClear={() => setQuery('')} />
```

## Cross-References

- [input-field.md](input-field.md)

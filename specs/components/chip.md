---
name: Chip
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/chip/Chip.tsx
  - apps/storybook/src/stories/chip/chip.css
  - tokens/tokens.json
---

# Chip

## Metadata

- Category: data display / building block
- Dot intents: `neutral | primary | info | success | warning | danger`
- Sizes: `m | s | xs`

## Overview

Use `Chip` as an internal building block for chip-like controls. It
provides the content and action parts used by `ChipRegular` and
`FilterChip`.

Do not use `Chip` alone in product UI. For passive status or metadata,
use `Badge` or a text label. For removable, selectable, or editable
tag-like UI, use `ChipRegular`. For table/data-view filters, use
`FilterChip`.

## Anatomy

- Root
- Dot (optional, colored by intent)
- Flag (optional)
- Leading icon or avatar (optional)
- Stacked avatars (optional)
- Label text
- Secondary label (optional)
- Trailing icon: chevron or cross (optional)

## Tokens Used

- `--dls-color-component-chip-fg-base`
- `--dls-color-text-secondary`
- `--dls-color-surface-base`
- `--dls-color-intent-*-base`
- `--dls-spacing-*`
- `--dls-text-m-*`

## Props / API

- `label`
- `secondaryLabel`
- `leadingIcon`
- `avatar`, `stackedAvatars`
- `flag`
- `dot` — intent for colored dot
- `chevron`, `cross`
- `size`

## States

- static content/action part only
- visual state is controlled by the parent component

## Code Example

```tsx
<ChipRegular label="Active" variant="dot" intent="success" size="m" />
<FilterChip label="Status" isVisible valueSummary={<span>Active</span>} />
```

## Cross-References

- [chip-regular.md](chip-regular.md)
- [badge.md](badge.md)

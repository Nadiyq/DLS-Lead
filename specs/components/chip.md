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

Use `Chip` as the base building block for read-only tags and labels. It supports leading content (icon, avatar, stacked avatars, flag, dot) and trailing content (chevron, cross).

For interactive chips with click/remove behavior, use `ChipRegular`.

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

- `--dls-color-component-chip-*`
- `--dls-radius-component-chip`
- `--dls-spacing-*`

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

- static (display only)

## Code Example

```tsx
<Chip label="Active" dot="success" size="m" />
<Chip label="Nadiia" avatar={{ initials: "NA" }} cross />
```

## Cross-References

- [chip-regular.md](chip-regular.md)
- [badge.md](badge.md)

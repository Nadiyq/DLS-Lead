---
name: ChipRegular
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/chip/ChipRegular.tsx
  - apps/storybook/src/stories/chip/chip-regular.css
  - tokens/tokens.json
---

# ChipRegular

## Metadata

- Category: interactive chip / action
- Variants: `filled | outline | soft | dot`
- Intents: `neutral | info | success | warning | danger`
- Sizes: `m | s | xs`

## Overview

Use `ChipRegular` for interactive tags, editable status values, and
removable values. It composes one `Chip` content part with one optional
action part: chevron for opening a dropdown/editor, or cross for
removing the value.

Use it for table-row status values that can be changed inline, compact
filter values that open a dropdown, and token/tag rows where values can
be removed.

Do not use it for passive status or metadata that only needs to be
read. Use `Badge` or a text label for passive display.

## Anatomy

- Root (role="button")
- Embedded Chip content (label, icon, avatar)
- Action slot: remove button (cross) or chevron

## Tokens Used

- `--dls-color-component-chip-regular-*`
- `--dls-color-component-chip-fg-disabled`
- `--dls-color-intent-*`
- `--dls-radius-component-chip`

## Props / API

- `label`
- `variant`
- `intent`
- `size`
- `leadingIcon`
- `avatar`
- `chevron`
- `onRemove`
- `onClick`
- `disabled`

## States

- default
- hover
- focus-visible
- pressed
- disabled

Hover and pressed states use overlay tokens over the variant surface.
Reduced motion disables ChipRegular transitions.

## Code Example

```tsx
<ChipRegular label="Design" variant="outline" intent="neutral" onRemove={handleRemove} />
```

## Cross-References

- [chip.md](chip.md)
- [filter-chip.md](filter-chip.md)

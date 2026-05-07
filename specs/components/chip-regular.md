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

Use `ChipRegular` for interactive tags — clickable, removable, or selectable. Wraps the `Chip` building block with interactive behavior.

## Anatomy

- Root (role="button")
- Embedded Chip content (label, icon, avatar)
- Action slot: remove button (cross) or chevron

## Tokens Used

- `--dls-color-component-chip-regular-*`
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

## Code Example

```tsx
<ChipRegular label="Design" variant="outline" intent="neutral" onRemove={handleRemove} />
```

## Cross-References

- [chip.md](chip.md)
- [filter-chip.md](filter-chip.md)

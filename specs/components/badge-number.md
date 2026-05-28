---
name: BadgeNumber
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/badge/number/BadgeNumber.tsx
  - tokens/tokens.json
---

# BadgeNumber

## Metadata

- Category: status / metadata
- Variants: `filled | soft | outline | text`
- Intents: `neutral | primary | info | success | warning | danger`
- Sizes: `m | s | xs`

## Overview

Use `BadgeNumber` for compact numeric counters in navigation, tabs,
sidebar menu items, notification indicators, and data-total summaries.

Do not use it for passive text labels, editable filters, or status text.
Use `Badge` for labels, `BadgeIndicator` for dot-only status, and
`ChipRegular` or `FilterChip` for interactive pills.

## Anatomy

- Root numeric badge container
- Numeric text derived from `value`

## Tokens Used

- `color.component.badge.*`
- `--dls-color-intent-*`
- `--dls-radius-component-badge-number`
- `--dls-spacing-*`
- `--dls-text-*`
- `--dls-font-*`

## Props / API

- `value`
- `max`
- `variant`
- `intent`
- `size`
- `className`
- Standard span attributes such as `aria-label`, `title`, and `aria-live`

## States

- default
- visual variant state

`BadgeNumber` is informational; it does not define hover, pressed,
disabled, selected, or focus states.

## Figma Mapping

- `intent` maps to `intent`.
- Figma `style` maps to React `variant`.
- Figma `style=text` maps to React `variant="text"`.
- Figma `text` maps to React `value`.
- React `max` has no Figma counterpart; it controls overflow display
  such as `99+`.

The current Figma node shows the 20px number badge. In React, use
`size="s"` for that footprint.

## Accessibility

- Root is a `<span>` and is not keyboard focusable.
- Visible numeric text is read as plain text by default.
- Add `aria-label` when the count needs context, for example
  `aria-label="5 unread messages"`.
- Dynamic count updates should be announced by the consuming surface
  with `aria-live="polite"` when needed.

## Code Example

```tsx
<BadgeNumber value={5} intent="danger" variant="filled" size="s" />
```

```tsx
<BadgeNumber
  value={128}
  max={99}
  intent="info"
  variant="text"
  size="s"
  aria-label="99 or more unread updates"
/>
```

## Cross-References

- [badge-indicator.md](badge-indicator.md)
- [badge.md](badge.md)
- [sidebar-item.md](sidebar-item.md)
- [tabs.md](tabs.md)

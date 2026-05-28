---
name: BadgeIndicator
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/badge/indicator/BadgeIndicator.tsx
  - tokens/tokens.json
---

# BadgeIndicator

## Metadata

- Category: status / notification
- Variants: always filled
- Intents: `neutral | primary | info | success | warning | danger`
- Sizes: `xs | s | m | l`

## Overview

Use `BadgeIndicator` for high-attention notification markers, especially
when positioned on the top-right corner of an icon button, notification
button, avatar, or compact control.

Use `BadgeNumber` for ordinary numeric counters and totals. Use `Badge`
for passive status labels.

## Anatomy

- Root circular indicator
- Optional numeric text for `s`, `m`, and `l`

## Tokens Used

- `--dls-color-intent-*`
- `--dls-radius-component-badge`
- `--dls-spacing-*`
- `--dls-text-avatar-*`
- `--dls-font-*`

## Props / API

- `value`
- `max`
- `intent`
- `size`
- `className`
- Standard span attributes such as `title` and `aria-live`

## States

- default
- visual intent state

`BadgeIndicator` is informational; it does not define hover, pressed,
disabled, selected, or focus states.

## Figma Mapping

- Figma `size` maps to React `size`: `XS -> xs`, `S -> s`,
  `M -> m`, `L -> l`.
- Figma `text` maps to React `value`.
- The Figma node is fixed to danger intent. React keeps an `intent`
  prop for Storybook-supported code reuse.
- React `max` has no Figma counterpart. It controls overflow display
  such as `99+`.

## Accessibility

- Root is a `<span>` and is not keyboard focusable.
- `xs` is dot-only; if the dot communicates state, the consuming control
  must provide the accessible context, for example
  `aria-label="2 unread notifications"` on the notification button.
- Dynamic count updates should be announced by the consuming surface
  with `aria-live="polite"` when needed.

## Code Example

```tsx
<BadgeIndicator size="xs" intent="danger" />
```

```tsx
<BadgeIndicator
  size="m"
  intent="danger"
  value={2}
/>
```

## Cross-References

- [badge.md](badge.md)
- [badge-number.md](badge-number.md)

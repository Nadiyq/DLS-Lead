---
name: AvatarStack
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/AvatarStack.tsx
  - apps/storybook/src/stories/avatar-stack.css
  - apps/storybook/src/stories/AvatarStack.stories.tsx
  - tokens/tokens.json
---

# AvatarStack

## Metadata

- Category: data display / identity group
- Sizes: `88 | 80 | 72 | 48 | 40 | 32 | 28 | 24 | 20 | 18`
- Composition: `Avatar` children, optional counter, optional overflow
  list

## Overview

Use `AvatarStack` to show a compact group of users or entities as
overlapping circular avatars. It can show an overflow counter such as
`+20`; when hidden users are available, the counter reveals a `List`
with `ListItem` rows on hover or keyboard focus.

Use `Avatar` for a single identity and `AvatarStack` only when the group
relationship matters.

## Figma Mapping

- Figma `size` maps to React `size`.
- Figma `avatar1`, `avatar2`, `avatar3`, and `avatar4` map to the
  number and content of React `children`.
- Figma `counter` maps to React overflow behavior from `max` and
  `total`.
- Figma counter text such as `+20` is derived from
  `total - visibleCount`.
- Figma `hovered` maps to an `Avatar` child with `onRemove`, not to an
  `AvatarStack` prop.
- Figma's hover overflow list maps to React `overflowUsers`.
- Figma's optional second line in overflow rows maps to
  `overflowUsers[].secondaryText`.

## Anatomy

1. Root stack container.
2. Visible `Avatar` children, forced to circle and shared size.
3. Optional counter button.
4. Optional overflow `List`.
5. Optional overflow `ListItem` rows with avatar and name or two-line
   detail.

## Tokens Used

- `--dls-color-component-avatar-stack-border`
- `--dls-color-component-avatar-counter-bg`
- `--dls-color-component-avatar-counter-fg`
- `--dls-radius-component-avatar-circle`
- `--dls-text-avatar-*`
- `--dls-spacing-0-5`
- `--dls-state-l-delta-hover`
- `--dls-state-l-delta-pressed`
- `--dls-shadow-focus-ring`
- `--dls-shadow-surface-md`
- `--dls-font-family`

## Props / API

- `size` AvatarStackSize, optional. Default: `48`.
  Values: `88 | 80 | 72 | 48 | 40 | 32 | 28 | 24 | 20 | 18`.
- `children` ReactNode, required. Avatar elements to render.
- `max` number, optional. Maximum visible avatars before overflow.
- `total` number, optional. Total count used for counter text.
- `overflowUsers` OverflowUser[], optional. Hidden users shown in the
  overflow list.
- `selectedIndex` number, optional. Selected overflow row index.
- `onCounterClick` function, optional. Called when the counter button is
  clicked.
- `onOverflowUserClick` function, optional. Called when an overflow user
  row is clicked.
- `className` string, optional. Additional root class.
- Standard div attributes such as `title`, `aria-label`, and data
  attributes may be passed to the root.

## OverflowUser

- `name` string, required. Primary overflow row text.
- `secondaryText` string, optional. Secondary row text such as email,
  date of birth, or supporting metadata.
- `src` string, optional. Avatar image URL.
- `initials` string, optional. Avatar initials fallback.

## States

AvatarStack exposes:

- `data-size="88 | 80 | 72 | 48 | 40 | 32 | 28 | 24 | 20 | 18"`
- counter default, hover, active, and focus-visible states
- `data-open="true"` on the counter wrapper while the overflow list is
  open
- selected overflow rows through composed `ListItem`

The root stack itself has no hover, pressed, selected, disabled, or
active color state.

## Accessibility

- Root is a `<div>` and is not keyboard focusable.
- The counter is a native `<button>` with an accessible name such as
  `20 more users`.
- When overflow rows exist, the counter exposes `aria-haspopup="listbox"`
  and `aria-expanded`.
- The overflow list is composed with `List` and `ListItem`.
- The overflow list opens on mouse hover, keyboard focus, and counter
  click, and closes on blur, mouse leave, Escape, or overflow row click.
- Child avatars are visual identity marks; pair the stack with nearby
  visible group context when the people represented must be announced.
- Do not rely on the compact stack alone as the only accessible list of
  participants when exact names are critical.

## Composition Rules

- Children should be `Avatar` elements.
- Do not place arbitrary interactive children in the stack.
- Use `overflowUsers` when `max` hides users and the hidden people need
  to be inspectable.
- Use `ListItem` detail rows for email, date of birth, role, or similar
  second-line metadata.
- Use AvatarStack in `TableCell`, `Card`, `Item`, `TopBar`, `Sidebar`,
  and compact summary regions.
- Use a full list or table when users need to compare many names or
  perform multi-step actions.

## Known Deviations

- Figma exposes avatar visibility booleans (`avatar1` through
  `avatar4`). React uses explicit `children` instead.
- Figma exposes `counter` as a boolean. React derives counter visibility
  from `max`, `total`, and hidden child count.
- Figma exposes `hovered` as a component property. React maps this to a
  removable child `Avatar` through `onRemove`.

## Code Example

```tsx
<AvatarStack size="32" max={3} total={8}>
  <Avatar initials="NA" />
  <Avatar initials="JD" />
  <Avatar initials="KL" />
</AvatarStack>
```

```tsx
<AvatarStack
  size="48"
  max={2}
  total={7}
  overflowUsers={[
    { name: 'Malik Roberson', secondaryText: 'malik@example.com' },
  ]}
>
  <Avatar src="/avatar-1.jpg" alt="User 1" />
  <Avatar src="/avatar-2.jpg" alt="User 2" />
</AvatarStack>
```

## Cross-References

- [avatar.md](avatar.md)
- [list.md](list.md)
- [list-item.md](list-item.md)
- [table-cell.md](table-cell.md)
- [accessibility.md](../foundations/accessibility.md)
- [token-reference.md](../tokens/token-reference.md)

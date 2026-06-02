---
name: Avatar
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/Avatar.tsx
  - apps/storybook/src/stories/avatar.css
  - apps/storybook/src/stories/Avatar.stories.tsx
  - tokens/tokens.json
---

# Avatar

## Metadata

- Category: data display / identity
- Shapes: square (default), circle
- Sizes: `144 | 88 | 80 | 72 | 48 | 40 | 32 | 28 | 24 | 20 | 18`
- Content types: image, initials, icon

## Overview

Use `Avatar` for user, team, account, or entity identity in navigation,
tables, cards, lists, profiles, and compact metadata rows. Content
priority is image, then icon, then initials.

Do not use Avatar for decorative icons; use `IconShape` for icon-only
decorative containers.

## Figma Mapping

- Figma `size` maps to React `size` with the same string values.
- Figma `circle` maps to React `circle`.
- Figma `dot` maps to React `dot`.
- Figma `name` maps to React `initials`.
- Figma `empty=image` maps to a provided React `src`.
- Figma `empty=AA-light` maps to React `initials`.
- Figma `empty=icon` maps to React `icon`.
- React `alt` describes image avatars when the image conveys identity.
- React `onRemove` is a Storybook-documented code extension for
  removable avatar chips/stacks; it is not part of the primary Figma
  avatar matrix.

## Anatomy

1. Root avatar container.
2. Content: image, initials text, or icon.
3. Optional status dot.
4. Optional remove button when `onRemove` is provided.

## Tokens Used

- `--dls-color-component-avatar-*`
- `--dls-radius-component-avatar-*`
- `--dls-text-avatar-*`
- `--dls-spacing-0-5`
- `--dls-shadow-focus-ring`
- `--dls-font-family`

## Props / API

- `size` AvatarSize, optional. Default: `48`.
  Values: `144 | 88 | 80 | 72 | 48 | 40 | 32 | 28 | 24 | 20 | 18`.
- `circle` boolean, optional. Default: `false`.
- `src` string, optional. Image URL; takes priority over `icon` and
  `initials`.
- `alt` string, optional. Alt text for image avatars.
- `initials` string, optional. Initials shown when no image or icon is
  provided.
- `icon` ReactNode, optional. Decorative placeholder icon shown when no
  image is provided.
- `dot` boolean, optional. Default: `false`. Shows the status dot.
- `onRemove` function, optional. Shows a keyboard-focusable remove
  button.
- `className` string, optional. Additional root class.
- Standard div attributes such as `title`, `aria-label`, and data
  attributes may be passed to the root.

## States

Avatar exposes:

- `data-size="144 | 88 | 80 | 72 | 48 | 40 | 32 | 28 | 24 | 20 | 18"`
- `data-circle` when circular shape is enabled
- `dot` as an optional decorative status marker
- `:hover` and `:focus-within` only to reveal the remove button when
  `onRemove` exists
- `.dls-avatar__remove:focus-visible` for the remove button focus ring

The avatar root has no hover, pressed, selected, disabled, or active
color state.

## Accessibility

- Root is a `<div>` and is not focusable unless a consumer explicitly
  passes focus props.
- Image avatars must provide meaningful `alt` text when the image
  identifies a person or entity. Use empty alt text only for decorative
  images with adjacent visible identity text.
- Icon avatars and status dots are decorative and hidden from assistive
  technology.
- The remove button has an accessible name derived from `alt`,
  `initials`, or the generic "avatar" fallback.
- The remove button is reachable by keyboard and supports Enter/Space
  activation through native button behavior.
- Dynamic status changes represented by the dot should be announced by
  the consuming surface when needed.

## Composition Rules

- Use Avatar inside `TableCell`, `ListItem`, `Item`, `Card`, `TopBar`,
  `Sidebar`, and `AvatarStack`.
- Pair Avatar with adjacent visible identity text when possible,
  especially in dense lists and tables.
- Do not place interactive controls inside Avatar. Use `onRemove` for
  the supported remove affordance.
- Do not rely on the status dot as the only accessible status signal.
- Use `AvatarStack` when displaying multiple overlapping avatars.

## Known Deviations

- Figma exposes a single `empty` property for content type. React uses
  explicit content props (`src`, `initials`, and `icon`) instead.
- React supports `onRemove` as a Storybook-documented code extension;
  the primary Figma avatar matrix does not include this action.

## Code Example

```tsx
<Avatar size="48" src="/photo.jpg" alt="Nadiia" dot />
<Avatar size="32" circle initials="NA" />
<Avatar size="40" icon={<UserIcon />} />
```

## Cross-References

- [avatar-stack.md](avatar-stack.md)
- [icon-shape.md](icon-shape.md)
- [table-cell.md](table-cell.md)
- [accessibility.md](../foundations/accessibility.md)
- [token-reference.md](../tokens/token-reference.md)

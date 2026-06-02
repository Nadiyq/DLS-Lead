# Avatar

Category: data display / identity
React: <Avatar>
Spec: specs/components/avatar.md
TSX: apps/storybook/src/stories/Avatar.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-avatar--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=39-1090

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma represents Avatar as a matrix of size, shape, content type, and
optional dot. Avatar itself is passive and does not define hover,
pressed, selected, disabled, or active color states.

This component uses: NO INTERACTIVE COLOR STATE IMPLEMENTATION.
The optional remove action is a React/Storybook extension. Its button is
revealed on hover and focus-within, and focus-visible uses the semantic
focus ring token.
--------------------------------------------

## Purpose
Represent a user, team, account, or entity with a compact identity mark:
image, initials, or placeholder icon.

## Use when
- Showing the author, owner, assignee, account, customer, or team for an
  object.
- Pairing identity with text in a list, table, card, nav item, or header.
- Displaying a status dot over an identity mark when surrounding UI
  provides the accessible status context.
- Showing removable avatars in compact selection or stack contexts.

## Do NOT use for
- Decorative icon containers -> use IconShape.
- Dot-only status -> use BadgeIndicator.
- Passive status text -> use Badge.
- Multiple overlapping avatars -> use AvatarStack.
- Primary actions or navigation triggers -> wrap adjacent text/control
  with Button, Link, TopBar, or the appropriate navigation component.

## Figma -> Code mapping
| Figma property | React prop | Values |
|---|---|---|
| size | size | 144, 88, 80, 72, 48, 40, 32, 28, 24, 20, 18 |
| circle | circle | false / true |
| dot | dot | false / true |
| name | initials | Initials text, for example AB |
| empty | null | Figma content selector. image -> src, AA-light -> initials, icon -> icon. |
| image fill | src | React supplies the image URL. Image content takes priority. |
| icon vector | icon | Use lucide-react icons; UserIcon is exported for stories. |
| n/a | alt | React-only image alt text for identity images. |
| n/a | onRemove | React-only removable avatar action. |

Notes:
- Figma uses `empty` as a content-type selector. React exposes explicit
  content props instead: `src`, `initials`, and `icon`.
- Content priority in React is `src`, then `icon`, then `initials`.
- Icon avatars and the dot are decorative; adjacent text or consuming
  context must carry the accessible identity/status meaning.
- The remove action is intentionally documented in React/Storybook even
  though it is not represented in the primary Figma avatar matrix.

## Anatomy
1. Root avatar container - <div class="dls-avatar">.
2. Content - image, initials text, or decorative icon.
3. Optional decorative status dot.
4. Optional remove button when `onRemove` is provided.

## Props / API
- size AvatarSize, optional. Default: 48.
  Values: 144, 88, 80, 72, 48, 40, 32, 28, 24, 20, 18.
- circle boolean, optional. Default: false.
- src string, optional. Image URL; takes priority over icon and
  initials.
- alt string, optional. Alt text for image avatars.
- initials string, optional. Initials text when no image or icon is
  provided.
- icon ReactNode, optional. Decorative placeholder icon when no image is
  provided.
- dot boolean, optional. Default: false. Shows the status dot.
- onRemove function, optional. Shows a keyboard-focusable remove button.
- className string, optional. Additional root class.
- Standard div attributes are supported on the root.

## Tokens used (L4 first, then L2/L3 as needed)
- --dls-color-component-avatar-bg
- --dls-color-component-avatar-border
- --dls-color-component-avatar-fg
- --dls-color-component-avatar-icon-fg
- --dls-color-component-avatar-dot
- --dls-color-component-avatar-dot-border
- --dls-color-component-avatar-remove-btn-bg
- --dls-color-component-avatar-remove-btn-fg
- --dls-font-family
- --dls-radius-component-avatar-2xl
- --dls-radius-component-avatar-xl
- --dls-radius-component-avatar-l
- --dls-radius-component-avatar-m
- --dls-radius-component-avatar-s
- --dls-radius-component-avatar-circle
- --dls-radius-component-avatar-dot
- --dls-radius-component-avatar-remove-btn
- --dls-spacing-0-5
- --dls-shadow-focus-ring
- --dls-text-avatar-2xl-font-size
- --dls-text-avatar-2xl-line-height
- --dls-text-avatar-2xl-font-weight
- --dls-text-avatar-xl-font-size
- --dls-text-avatar-xl-line-height
- --dls-text-avatar-xl-font-weight
- --dls-text-avatar-l-font-size
- --dls-text-avatar-l-line-height
- --dls-text-avatar-l-font-weight
- --dls-text-avatar-m-font-size
- --dls-text-avatar-m-line-height
- --dls-text-avatar-m-font-weight
- --dls-text-avatar-s-font-size
- --dls-text-avatar-s-line-height
- --dls-text-avatar-s-font-weight
- --dls-text-avatar-xs-font-size
- --dls-text-avatar-xs-line-height
- --dls-text-avatar-xs-font-weight
- --dls-text-avatar-2xs-font-size
- --dls-text-avatar-2xs-line-height
- --dls-text-avatar-2xs-font-weight
- --dls-text-avatar-3xs-font-size
- --dls-text-avatar-3xs-line-height
- --dls-text-avatar-3xs-font-weight
- --dls-text-avatar-4xs-font-size
- --dls-text-avatar-4xs-line-height
- --dls-text-avatar-4xs-font-weight

Lookup order: L4 component tokens -> L3 state/focus tokens -> L2
semantic tokens -> primitives only through token aliases. Do not
reference raw hex or primitive color scales in component CSS.

## States

### Figma representation
Figma node 39:1090 contains the `avatar-item` matrix:
- size: 144, 88, 80, 72, 48, 40, 32, 28, 24, 20, 18
- circle: false, true
- empty: image, AA-light, icon
- dot: false, true

### Code implementation
Avatar exposes:
- data-size for all supported pixel sizes
- data-circle when circular shape is enabled
- dot prop for the decorative status dot
- hover and focus-within only for the optional remove button
- focus-visible ring on the remove button

No hover, active, pressed, disabled, or selected visual state is defined
for the Avatar root.

## Accessibility contract
- Root is a <div>; Avatar is passive unless `onRemove` renders the
  native button.
- Image avatars must use meaningful `alt` text when the image carries
  identity. Use empty alt only when adjacent text carries the name.
- Icon avatars and the dot use aria-hidden="true".
- Remove button receives an accessible name derived from `alt`,
  `initials`, or "avatar".
- Remove button is reachable by keyboard and activates with Enter/Space.
- Dot status must not be the only accessible status signal.
- Dynamic status changes should be announced by the consuming surface
  with aria-live="polite" when needed.

## Composition rules
- Use Avatar in TableCell, ListItem, Item, Card, TopBar, Sidebar, and
  AvatarStack.
- Pair Avatar with visible identity text in dense surfaces whenever
  possible.
- Do not nest arbitrary interactive children inside Avatar.
- Use AvatarStack for multiple overlapping avatars.

## Known deviations from system rules
- Figma exposes a single `empty` property for content type. React uses
  explicit content props (`src`, `initials`, and `icon`) instead.
- React supports `onRemove` as a documented code extension; the primary
  Figma avatar matrix does not include this action.

## Known accessibility gaps
None.

## Code example
```tsx
<Avatar size="48" src="/photo.jpg" alt="Nadiia" dot />
```

```tsx
<Avatar size="32" circle initials="NA" />
```

```tsx
<Avatar size="40" icon={<UserIcon />} />
```

## Cross-references
- specs/components/avatar.md
- specs/components/avatar-stack.md
- specs/components/icon-shape.md
- specs/components/table-cell.md
- specs/foundations/accessibility.md
- specs/tokens/token-reference.md

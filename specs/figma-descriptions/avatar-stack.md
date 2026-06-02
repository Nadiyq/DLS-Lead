# AvatarStack

Category: data display / identity group
React: <AvatarStack>
Spec: specs/components/avatar-stack.md
TSX: apps/storybook/src/stories/AvatarStack.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-avatarstack--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=39-1635

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma represents AvatarStack as overlapping avatar rows by size, with
optional avatar visibility booleans, counter, and hovered removable
state.

This component uses: OKLCH SHIFT FOR COUNTER INTERACTION ONLY.
The stack root is passive. The counter button uses the component counter
background with `--dls-state-l-delta-hover` and
`--dls-state-l-delta-pressed`, plus `--dls-shadow-focus-ring` for
keyboard focus. The overflow list opens on hover, focus, and counter
click.
--------------------------------------------

## Purpose
Show a compact group of users or entities as overlapping circular
avatars, with optional overflow count and inspectable hidden users.

## Use when
- Showing assignees, participants, viewers, owners, or team members.
- Displaying a compact group identity in a table cell, card, item, nav,
  or header.
- Showing two or more visible avatars with a `+N` overflow count.
- Allowing hidden users to be inspected from a compact counter.

## Do NOT use for
- A single identity -> use Avatar.
- Dot-only status -> use BadgeIndicator.
- Passive status labels -> use Badge.
- Full people management or comparison workflows -> use a List or Table.
- Arbitrary icon clusters -> use IconShape or purpose-built controls.

## Figma -> Code mapping
| Figma property | React prop | Values |
|---|---|---|
| size | size | 88, 80, 72, 48, 40, 32, 28, 24, 20, 18 |
| avatar1 | children | true -> include first Avatar child |
| avatar2 | children | true -> include second Avatar child |
| avatar3 | children | true -> include third Avatar child |
| avatar4 | children | true -> include fourth Avatar child |
| counter | max / total | true -> render overflow when hidden count is greater than 0 |
| counter text | total | `+20` is derived from `total - visibleCount` |
| hovered | null | Design state. React maps this to a child Avatar with `onRemove`. |
| overflow list row | overflowUsers | name, optional secondaryText, optional src or initials |
| list row second line | overflowUsers[].secondaryText | email, date of birth, role, or other metadata |

Notes:
- React does not expose `avatar1`, `avatar2`, `avatar3`, or `avatar4`
  booleans. Provide `Avatar` children instead.
- React does not expose a `counter` boolean. Counter visibility is
  derived from `max`, `total`, and hidden children.
- Counter label is numeric and should be generated from count data.
- Figma `hovered` is an interaction state, not a React prop. Put
  `onRemove` on the child `Avatar` that can be removed.

## Anatomy
1. Root stack container - <div class="dls-avatar-stack">.
2. Visible circular Avatar children.
3. Optional counter button.
4. Optional overflow List.
5. Overflow ListItem rows with avatar + name or avatar + name +
   secondary line.

## Props / API
- size AvatarStackSize, optional. Default: 48.
  Values: 88, 80, 72, 48, 40, 32, 28, 24, 20, 18.
- children ReactNode, required. Avatar elements to render.
- max number, optional. Maximum visible avatars.
- total number, optional. Total count used to calculate the counter.
- overflowUsers OverflowUser[], optional. Hidden users shown in the
  overflow list.
- selectedIndex number, optional. Selected overflow row index.
- onCounterClick function, optional. Called when the counter button is
  clicked.
- onOverflowUserClick function, optional. Called when an overflow user
  row is clicked.
- className string, optional. Additional root class.
- Standard div attributes are supported on the root.

## OverflowUser
- name string, required.
- secondaryText string, optional.
- src string, optional.
- initials string, optional.

## Tokens used (L4 first, then L2/L3 as needed)
- --dls-color-component-avatar-stack-border
- --dls-color-component-avatar-counter-bg
- --dls-color-component-avatar-counter-fg
- --dls-font-family
- --dls-radius-component-avatar-circle
- --dls-spacing-0-5
- --dls-state-l-delta-hover
- --dls-state-l-delta-pressed
- --dls-shadow-focus-ring
- --dls-shadow-surface-md
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
- --dls-text-avatar-3xs-font-size
- --dls-text-avatar-3xs-line-height
- --dls-text-avatar-3xs-font-weight
- --dls-text-avatar-4xs-font-size
- --dls-text-avatar-4xs-line-height
- --dls-text-avatar-4xs-font-weight
- --dls-text-avatar-5xs-font-size
- --dls-text-avatar-5xs-line-height
- --dls-text-avatar-5xs-font-weight

Lookup order: L4 component tokens -> L3 state/focus tokens -> L2
semantic tokens -> primitives only through token aliases. Do not
reference raw hex or primitive color scales in component CSS.

## States

### Figma representation
Figma node 39:1635 contains the `stacked` matrix:
- size: 88, 80, 72, 48, 40, 32, 28, 24, 20, 18
- avatar1, avatar2, avatar3, avatar4: visibility booleans
- counter: visibility boolean
- hovered: removable child-avatar state

### Code implementation
AvatarStack exposes:
- data-size for all supported pixel sizes
- counter default, hover, active, and focus-visible states
- data-open="true" while the overflow list is visible
- selected overflow rows through composed ListItem

The stack root has no interactive color states.

## Accessibility contract
- Root is a <div>; it is passive and not keyboard focusable.
- Counter is a native <button> with an accessible label such as
  "20 more users".
- Counter exposes aria-haspopup="listbox" and aria-expanded when an
  overflow list is available.
- Overflow list is composed with List and ListItem.
- Overflow list opens on hover, keyboard focus, and counter click, then
  closes on blur, mouse leave, Escape, or row click.
- The compact stack should have nearby visible context when exact user
  names matter.
- Do not use the visual stack as the only accessible source of a
  critical participant list.

## Composition rules
- Use Avatar children.
- Do not nest arbitrary interactive children inside AvatarStack.
- Use overflowUsers when hidden users need to be inspectable.
- Use overflowUsers[].secondaryText for email, DOB, role, or similar
  second-line metadata.
- Use in TableCell, Card, Item, TopBar, Sidebar, and compact summary
  regions.
- Use a full List or Table for high-volume or action-heavy user lists.

## Known deviations from system rules
- Figma exposes avatar visibility booleans. React uses children.
- Figma exposes counter as a boolean. React derives counter visibility
  from hidden count.
- Figma exposes hovered as a component property. React maps this to a
  removable child Avatar with `onRemove`.

## Known accessibility gaps
None.

## Code example
```tsx
<AvatarStack size="48" max={2} total={22}>
  <Avatar src="/avatar-1.jpg" alt="User 1" />
  <Avatar src="/avatar-2.jpg" alt="User 2" />
  <Avatar src="/avatar-3.jpg" alt="User 3" />
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

## Cross-references
- specs/components/avatar-stack.md
- specs/components/avatar.md
- specs/components/list.md
- specs/components/list-item.md
- specs/components/table-cell.md
- specs/foundations/accessibility.md
- specs/tokens/token-reference.md

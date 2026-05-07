---
name: ContextMenu
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/context-menu/ContextMenu.tsx
  - apps/storybook/src/stories/context-menu/context-menu.css
  - tokens/tokens.json
---

# ContextMenu

## Metadata

- Category: menu / navigation

## Overview

Use `ContextMenu` for right-click or triggered menus with actions, keyboard shortcuts, submenus, and section labels.

Items are `ListItem` rows. Submenus nest via `ContextMenuSubmenu`.

## Anatomy

- Root (role="menu")
- ContextMenuItem: icon + label + shortcut
- ContextMenuSubmenu: trigger item + nested menu
- ContextMenuDivider: visual separator
- ContextMenuLabel: section header

## Tokens Used

- `--dls-color-component-context-menu-*`
- `--dls-radius-component-context-menu`
- list-item token families

## Props / API

ContextMenuItem:
- `icon`
- `label`
- `shortcut` — array of key labels (e.g., `['Ctrl', 'S']`)

ContextMenuSubmenu:
- `icon`
- `label`
- `children` — nested menu content

## States

- default
- hover (opens submenu)
- focus-visible

## Code Example

```tsx
<ContextMenu>
  <ContextMenuItem icon={<CopyIcon />} label="Copy" shortcut={['Ctrl', 'C']} />
  <ContextMenuDivider />
  <ContextMenuSubmenu icon={<ShareIcon />} label="Share">
    <ContextMenuItem label="Email" />
    <ContextMenuItem label="Link" />
  </ContextMenuSubmenu>
</ContextMenu>
```

## Cross-References

- [list-item.md](list-item.md)
- [dropdown.md](dropdown.md)

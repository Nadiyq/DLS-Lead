---
name: SidebarItem
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/sidebar-item/SidebarItem.tsx
  - apps/storybook/src/stories/sidebar-item/sidebar-item.css
  - tokens/tokens.json
---

# SidebarItem

## Metadata

- Category: navigation item
- Types: `simple | tree | option | collapsible | big-icon`

## Overview

Use `SidebarItem` for individual navigation entries within a `Sidebar`. Five types cover different interaction patterns — simple links, tree nodes, option menus, collapsible sections, and workspace/account switchers.

## Anatomy

- Root (role="menuitem")
- Chevron (tree/collapsible types)
- Icon slot or media slot (big-icon type)
- Text (or text group with primary + secondary for big-icon)
- Badge (BadgeNumber) or indicator (BadgeIndicator)
- Action button (option type, ellipsis)

## Tokens Used

- `--dls-color-component-sidebar-item-*`
- `--dls-radius-component-sidebar-item`

## Props / API

- `type`
- `text`, `secondaryText`
- `icon`, `media`
- `showIndicator`, `badgeCount`
- `active`, `collapsed`, `expanded`
- `disabled`
- `onClick`, `onToggle`, `onAction`

## States

- default
- active (selected)
- collapsed (icon-only)
- expanded / collapsed (tree/collapsible)
- disabled
- hover, focus-visible

## Code Example

```tsx
<SidebarItem type="simple" text="Inbox" icon={<InboxIcon />} active badgeCount={5} />
```

## Cross-References

- [sidebar.md](sidebar.md)

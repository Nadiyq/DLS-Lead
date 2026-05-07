---
name: Sidebar
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/sidebar/Sidebar.tsx
  - apps/storybook/src/stories/sidebar/sidebar.css
  - tokens/tokens.json
---

# Sidebar

## Metadata

- Category: navigation container
- Variants: `1 | 2 | 3 | 4`

## Overview

Use `Sidebar` for the primary navigation panel. Four layout variants provide different grouping and submenu strategies. Supports collapsing to icon-only mode.

## Anatomy

- Root (`<nav>`)
- Top slot (workspace/account switcher, big-icon SidebarItem)
- Nav area: SidebarItem, SidebarGroup, Submenu, SidebarDivider
- Bottom slot (user account item)

## Tokens Used

- `--dls-color-component-sidebar-*`
- `--dls-spacing-*`

## Props / API

- `variant` — `1 | 2 | 3 | 4`
- `collapsed`
- `slotTop`
- `slotBottom`
- `children`

## States

- expanded (default)
- collapsed (icon-only)

## Code Example

```tsx
<Sidebar variant="1" collapsed={isCollapsed}
  slotTop={<SidebarItem type="big-icon" text="Acme Corp" media={<Logo />} collapsed={isCollapsed} />}>
  <SidebarItem type="simple" text="Dashboard" icon={<DashboardIcon />} active />
</Sidebar>
```

## Cross-References

- [sidebar-item.md](sidebar-item.md)
- [submenu.md](submenu.md)
- [top-bar.md](top-bar.md)

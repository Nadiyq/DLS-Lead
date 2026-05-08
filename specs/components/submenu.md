---
name: Submenu
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/submenu/Submenu.tsx
  - apps/storybook/src/stories/submenu/submenu.css
  - tokens/tokens.json
---

# Submenu

## Metadata

- Category: navigation / sidebar

## Overview

Use `Submenu` inside a `Sidebar` to group child navigation items under a collapsible parent. The parent is typically a `SidebarItem` of type `collapsible`.

## Anatomy

- Root (role="group")
- Parent item slot
- Children wrapper (indented)
- Optional bottom slot content

## Tokens Used

- `--dls-color-component-submenu-*`
- `--dls-spacing-*`

## Props / API

- `parent` — parent menu item element
- `expanded` — show/hide children
- `children` — nested items
- `slotContent` — optional bottom slot

## States

- expanded
- collapsed

## Code Example

```tsx
<Submenu expanded={open}
  parent={<SidebarItem type="collapsible" text="Projects" icon={<FolderIcon />} expanded={open} onClick={() => setOpen(!open)} />}>
  <SidebarItem type="simple" text="Design system" />
  <SidebarItem type="simple" text="Marketing" />
</Submenu>
```

## Cross-References

- [sidebar.md](sidebar.md)
- [sidebar-item.md](sidebar-item.md)

---
name: TopBar
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/top-bar/TopBar.tsx
  - apps/storybook/src/stories/top-bar/top-bar.css
  - tokens/tokens.json
---

# TopBar

## Metadata

- Category: navigation / header
- Types: `1 | 2 | 3`

## Overview

Use `TopBar` as the app-wide header bar. Three types: minimal (1), centered search (2), and navigation tabs (3). Includes menu button, notification bell, help, and avatar.

## Anatomy

- Root (`<header>`, role="banner")
- Left section: menu button + slotLeft
- Type 1: right section with search icon, notifications, help, avatar
- Type 2: centered search input + right section
- Type 3: nav tab list + right section
- Avatar wrapper

## Tokens Used

- `--dls-color-component-top-bar-*`
- `--dls-spacing-*`

## Props / API

- `type` — `1 | 2 | 3`
- `onMenuClick`
- `slotLeft`, `slotRight`
- `navItems` — for type 3 (`{ label, active, onClick }[]`)
- `searchPlaceholder`, `searchValue`, `onSearchChange` — for type 2
- `showSearch`, `showNotifications`, `showHelp`
- `avatarInitials`, `avatarSrc`, `onAvatarClick`

## States

- type 1: minimal
- type 2: search active
- type 3: nav tab active

## Code Example

```tsx
<TopBar type="1" onMenuClick={toggleSidebar} avatarInitials="NA" />
```

## Cross-References

- [sidebar.md](sidebar.md)
- [avatar.md](avatar.md)

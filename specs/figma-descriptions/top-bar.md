# TopBar

Category: navigation / header
React: `<TopBar>`
Spec: specs/components/top-bar.md
TSX: apps/storybook/src/stories/top-bar/TopBar.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-topbar--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6631-1569

--------------------------------------------
## State implementation contract

The TopBar container has no interactive states. Interactive states
belong to child Button, Avatar, and nav-item components.

Nav items (type 3) use overlay state model:
- Hover: `--dls-state-hover-overlay` + text-primary color.
- Active: same overlay + text-primary.
- Focus: `box-shadow` ring via `--dls-state-focus-ring-color`.
- Transitions: `background-color 100ms ease, color 100ms ease`
  (simple color transitions — no motion guard needed per spec).

--------------------------------------------

## Purpose

Persistent app-wide header bar providing global navigation, search,
key actions, notifications, and account controls. Stays visible
across pages for quick access to important actions.

## Use when

- Building the main application header above content area.
- Providing a sidebar toggle (hamburger menu button).
- Showing global search, notification bell, help, and account avatar.
- Adding navigation tabs in the header (type 3).

## Do NOT use for

- Sidebar navigation → use Sidebar + SidebarItem.
- In-page tab navigation → use Tabs.
- Toolbar within a page section → use Toolbar.

## Figma → Code mapping

| Figma property | React prop    | Values / Notes                                      |
|----------------|---------------|-----------------------------------------------------|
| type           | type          | 1 (minimal) \| 2 (centered search) \| 3 (nav tabs) |
| indicator      | —             | Notification dot — in code, always shown when showNotifications=true |
| left1          | slotLeft      | Left slot content (type 1)                          |
| left2          | slotLeft      | Left slot content (type 2)                          |
| left3          | slotLeft      | Left slot content (type 3)                          |
| right1         | slotRight     | Right slot content (type 1)                         |
| right2         | slotRight     | Right slot content (type 2)                         |
| right3         | slotRight     | Right slot content (type 3)                         |

Notes:
- Figma has per-type left/right slots; code unifies them into
  `slotLeft` and `slotRight` props.
- Default right content (search, bell, help, avatar) is built
  in and controlled via boolean props (`showSearch`, `showNotifications`,
  `showHelp`) + event handlers.

## Anatomy

1. Root — `<header>` with `dls-top-bar` class, 48px height.
2. Left section — `dls-top-bar__left`: menu button + slotLeft.
3. Center (type 2) — `dls-top-bar__center`: search input (max 320px).
4. Nav (type 3) — `dls-top-bar__nav`: nav-list + right actions.
5. Right section — `dls-top-bar__right`: slot + icon buttons + avatar.
6. Nav items (type 3) — `dls-top-bar__nav-item`: button elements with
   `data-active` attribute.
7. Avatar wrapper — `dls-top-bar__avatar-wrap`: clickable span wrapping Avatar.
8. Search (type 2) — `dls-top-bar__search` label with icon + input.

## Props / API

- `type` — `'1' | '2' | '3'`, default `'1'`.
- `onMenuClick` — `() => void`, optional. Menu button handler.
- `slotLeft` — `React.ReactNode`, optional.
- `slotRight` — `React.ReactNode`, optional.
- `navItems` — `NavItem[]`, optional (type 3). `{ label, active?, onClick? }`.
- `searchPlaceholder` — `string`, default `'Search…'` (type 2).
- `searchValue` — `string`, optional (type 2).
- `onSearchChange` — `(value: string) => void`, optional (type 2).
- `showSearch` — `boolean`, default `true` (type 1 only).
- `onSearchClick` — `() => void`, optional (type 1).
- `showNotifications` — `boolean`, default `true`.
- `onNotificationClick` — `() => void`, optional.
- `showHelp` — `boolean`, default `true`.
- `onHelpClick` — `() => void`, optional.
- `avatarInitials` — `string`, default `'AS'`.
- `avatarSrc` — `string`, optional.
- `onAvatarClick` — `() => void`, optional.
- `className` — `string`, optional.

## Tokens used

Container:
- `--dls-color-surface-base` — background
- `--dls-color-border-subtle` — bottom border
- `--dls-spacing-2` — padding-y, left/right gaps
- `--dls-spacing-3` — type 2/3 gap, nav-item padding, search padding
- `--dls-spacing-4` — padding-x

Nav items (type 3):
- `--dls-radius-component-button` — border-radius
- `--dls-text-m-font-size` / `--dls-text-m-line-height` — text
- `--dls-font-weight-medium` — font weight
- `--dls-color-text-secondary` — default text color
- `--dls-color-text-primary` — active/hover text color
- `--dls-state-hover-overlay` — hover/active background
- `--dls-state-focus-ring-color` — focus ring

Search (type 2):
- `--dls-radius-component-input` — border-radius
- `--dls-color-border-base` — border
- `--dls-color-border-strong` — focus border
- `--dls-color-component-input-fg-placeholder` — placeholder color

No L4 top-bar tokens exist in tokens.json.

## States

Container: no interactive states.

Nav items (type 3):
- `:hover:not(:disabled)` — overlay bg + primary text
- `[data-active]` — overlay bg + primary text
- `:focus-visible` — focus ring via box-shadow

## Accessibility contract

- Root element: `<header>` (implicit banner role).
- Menu button: native `<button>` with `aria-label="Menu"`.
- Search (type 2): `<label>` wrapping `<input>`, focus-within ring.
- Notification button: `aria-label="Notifications"`.
- Help button: `aria-label="Help"`.
- Avatar: `role="button"` with `tabIndex={0}`, `aria-label="Account"`,
  `onKeyDown` for Enter/Space activation.
- Nav items (type 3): native `<button>` elements.
- No `prefers-reduced-motion` needed — only simple color transitions.

## Composition rules

- Use with Sidebar in a flex layout (TopBar on top, Sidebar + content below).
- Icon buttons use the DLS Button component (variant="ghost", iconOnly).
- Avatar uses the DLS Avatar component.
- Nav items are built-in — not composed from external components.
- All icons from lucide-react (Menu, Search, Bell, HelpCircle).

## Known deviations

None.

## Code example

```tsx
<TopBar
  type="1"
  onMenuClick={toggleSidebar}
  showSearch
  showNotifications
  showHelp
  avatarInitials="NA"
  onAvatarClick={openAccountMenu}
/>

<TopBar
  type="3"
  navItems={[
    { label: "Dashboard", active: true },
    { label: "Projects", onClick: () => navigate("/projects") },
  ]}
  showNotifications
  avatarInitials="NA"
/>
```

## Cross-references

- specs/components/sidebar.md
- specs/components/avatar.md
- specs/components/button.md

# Sidebar

Category: navigation container
React: `<Sidebar>`, `<SidebarGroup>`, `<SidebarDivider>`
Spec: specs/components/sidebar.md
TSX: apps/storybook/src/stories/sidebar/Sidebar.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-sidebar--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6627-13946

--------------------------------------------
## State implementation contract

This component has NO interactive states on the container itself.
All interactivity (hover, focus, active, disabled) belongs to
child SidebarItem and Submenu components.

--------------------------------------------

## Purpose

Primary navigation panel for SaaS applications. Four layout
variants provide different grouping strategies — flat lists,
grouped sections, and submenu hierarchies. Supports collapsing
to an icon-only 64px rail.

## Use when

- Building the main left-side navigation shell of an application.
- Organizing navigation into grouped or hierarchical sections.
- Supporting a collapsible sidebar with icon-only mode.

## Do NOT use for

- Top navigation bars → use TopBar.
- In-page navigation → use Tabs.
- Dropdown menus → use Dropdown or ContextMenu.
- Settings panels → use Dialog or page layout.

## Figma → Code mapping

| Figma property | React prop | Values / Notes                          |
|----------------|------------|-----------------------------------------|
| variant        | variant    | 1 \| 2 \| 3 \| 4                       |
| collapsed?     | collapsed  | true / false — icon-only mode           |

Notes:
- Figma shows the full sidebar assembled with content. In code,
  content is composed via `slotTop`, `children`, and `slotBottom`
  props using SidebarItem, SidebarGroup, Submenu, and SidebarDivider.

## Anatomy

1. Root — `<nav>` with `aria-label="Sidebar"`, `dls-sidebar` class.
   266px expanded, 64px collapsed, full height.
2. Top slot — workspace/account switcher (big-icon SidebarItem).
3. Nav area — `dls-sidebar__nav`, scrollable flex column. Contains
   SidebarItem, SidebarGroup, Submenu, SidebarDivider.
4. Bottom slot — user account item (big-icon SidebarItem).
5. SidebarGroup — `dls-sidebar__group`, clusters related items.
6. SidebarDivider — 1px horizontal line with subtle border color.

## Sub-components

- `SidebarGroup` — `{ children: React.ReactNode }`.
  Renders a `div.dls-sidebar__group` with gap-1 vertical stack.
- `SidebarDivider` — no props.
  Renders a 1px `div.dls-sidebar__divider`.

## Props / API

Sidebar:
- `variant` — `'1' | '2' | '3' | '4'`, default `'1'`.
- `collapsed` — `boolean`, default `false`.
- `slotTop` — `React.ReactNode`, optional. Top slot content.
- `children` — `React.ReactNode`, required. Navigation content.
- `slotBottom` — `React.ReactNode`, optional. Bottom slot content.
- `className` — `string`, optional.

## Tokens used

- `--dls-color-surface-base` — sidebar background
- `--dls-color-border-subtle` — divider color
- `--dls-spacing-1` — nav item gap, group item gap, divider margin
- `--dls-spacing-2` — sidebar padding, divider horizontal margin
- `--dls-spacing-3` — sidebar gap (variant 1)
- `--dls-spacing-4` — sidebar gap and nav gap (variants 2–4)

L4 tokens in tokens.json (not currently used by CSS):
- `--dls-color-component-sidebar-bg` → `{color.surface.subtle}`
- `--dls-color-component-sidebar-border` → `{color.border.subtle}`

Note: CSS uses `--dls-color-surface-base` (white) for background.
The L4 token maps to `surface.subtle` (fafafa). The CSS matches
the Figma design (white backgrounds). See Known deviations.

## States

No interactive states on the container. Expanded/collapsed is
controlled by the `collapsed` prop and data-attribute. Visual
states belong to child components.

## Accessibility contract

- Root element: `<nav>` with `aria-label="Sidebar"`.
- Keyboard: delegated to child SidebarItem components.
- No focus management on the container — natural tab order.
- No `prefers-reduced-motion` needed — no transitions.

## Composition rules

- Top slot: typically a big-icon SidebarItem for workspace switcher.
- Bottom slot: typically a big-icon SidebarItem for user account.
- Nav content: SidebarItem, SidebarGroup, Submenu, SidebarDivider.
- Use SidebarGroup to cluster related items.
- Use SidebarDivider between logical sections.
- Use Submenu for collapsible hierarchical navigation.
- All children must pass `collapsed` prop when sidebar is collapsed.
- Variants 2–4 use wider spacing between sections.

## Known deviations

1. **L4 token mismatch** — tokens.json defines
   `color.component.sidebar.bg` → `{color.surface.subtle}` (fafafa),
   but CSS and Figma both use `surface/base` (white). The L4 token
   needs updating to match.

## Code example

```tsx
<Sidebar
  variant="1"
  collapsed={isCollapsed}
  slotTop={
    <SidebarItem type="big-icon" text="Acme Corp"
      secondaryText="admin@acme.com" media={<Logo />}
      collapsed={isCollapsed} />
  }
  slotBottom={
    <SidebarItem type="big-icon" text="Anna Smith"
      secondaryText="anna@acme.com" media={<Avatar />}
      collapsed={isCollapsed} />
  }
>
  <SidebarGroup>
    <SidebarItem type="simple" text="Dashboard" icon={<DashboardIcon />} active />
    <SidebarItem type="simple" text="Inbox" icon={<InboxIcon />} badgeCount={5} />
  </SidebarGroup>
  <SidebarDivider />
  <SidebarItem type="simple" text="Settings" icon={<SettingsIcon />} />
</Sidebar>
```

## Cross-references

- specs/components/sidebar-item.md
- specs/components/submenu.md
- specs/components/dropdown-account.md
- specs/components/top-bar.md

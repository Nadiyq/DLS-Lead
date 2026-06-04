# Submenu

Category: navigation / sidebar
React: `<Submenu>`
Spec: specs/components/submenu.md
TSX: apps/storybook/src/stories/submenu/Submenu.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-submenu--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6475-2085

--------------------------------------------
## State implementation contract

This component has NO interactive states. It is a pure layout
wrapper — no hover, focus, active, or disabled treatments. States
belong to the child SidebarItem components.

--------------------------------------------

## Purpose

Groups child navigation items under a collapsible parent within
a Sidebar. The parent is typically a SidebarItem of type
`collapsible` or `tree`. Children are rendered indented below the
parent when expanded.

## Use when

- Building hierarchical sidebar navigation with collapsible sections.
- Grouping related SidebarItem children under a parent header.
- Nesting navigation levels within a Sidebar.

## Do NOT use for

- Dropdown menus or popovers → use List + ListItem.
- Top-level navigation → use Tabs or standalone SidebarItems.
- Accordion content → use Accordion / AccordionItem.
- Non-sidebar nested groups → use a standard group or List.

## Figma → Code mapping

| Figma property | React prop  | Values / Notes                             |
|----------------|-------------|--------------------------------------------|
| submenu        | expanded    | Boolean — false: parent only; true: parent + children |

Notes:
- Figma's `submenu` boolean toggles between a single parent item
  and the full parent + indented children view. In code, this maps
  to the `expanded` prop.
- The parent item and children are separate React props, not
  Figma-level properties — they are composed via slots.

## Anatomy

1. Root — `div[role="group"]` with `dls-submenu` class.
2. Parent slot — renders the parent SidebarItem (any type).
3. Children wrapper — `dls-submenu__children`, indented with
   `padding-left: var(--dls-spacing-8)` (32px). Children use
   `font-weight: normal` (400) instead of parent's medium (500).
4. Slot content — `dls-submenu__slot`, optional bottom area with
   `padding-left: var(--dls-spacing-6)` (24px).

## Props / API

- `parent` — `React.ReactNode`, required. The parent menu item.
- `expanded` — `boolean`, default `false`. Whether children are visible.
- `children` — `React.ReactNode`, optional. Nested child items.
- `slotContent` — `React.ReactNode`, optional. Additional bottom content.
- `className` — `string`, optional.

## Tokens used

- `--dls-font-family` — inherited font family
- `--dls-spacing-8` — child item left padding (32px)
- `--dls-spacing-6` — slot content left padding (24px)
- `--dls-font-weight-normal` — child item text weight (400)

No L4 component tokens exist for Submenu in tokens.json.

## States

This component has no interactive states. Expand/collapse is
controlled by the `expanded` prop. All visual states (hover,
focus, active, disabled) belong to the child SidebarItem
components.

## Accessibility contract

- Root element: `div[role="group"]`.
- No keyboard interaction on the Submenu itself — keyboard
  handling belongs to the parent SidebarItem and child items.
- No focus management — natural tab order through child items.
- No `prefers-reduced-motion` needed — no transitions or
  animations in this component.

## Composition rules

- Parent slot should be a SidebarItem of type `collapsible` or
  `tree` with matching `expanded` state.
- Children should be SidebarItem components (typically `simple` type).
- Nesting Submenus is supported but should be limited to 2 levels
  for usability.
- Always wrap in a Sidebar component or equivalent navigation
  container.

## Known deviations

None.

## Code example

```tsx
<Submenu
  expanded={open}
  parent={
    <SidebarItem
      type="collapsible"
      text="Projects"
      icon={<FolderIcon />}
      expanded={open}
      onToggle={() => setOpen(!open)}
    />
  }
>
  <SidebarItem type="simple" text="Design system" active />
  <SidebarItem type="simple" text="Marketing" />
</Submenu>
```

## Cross-references

- specs/components/sidebar.md
- specs/components/sidebar-item.md
- specs/foundations/accessibility.md

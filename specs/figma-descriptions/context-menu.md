# ContextMenu

Category: menu / navigation
React: `<ContextMenu>`, `<ContextMenuItem>`, `<ContextMenuSubmenu>`, `<ContextMenuDivider>`, `<ContextMenuLabel>`
Spec: `specs/components/context-menu.md`
TSX: `apps/storybook/src/stories/context-menu/ContextMenu.tsx`
CSS: `apps/storybook/src/stories/context-menu/context-menu.css`
Storybook: https://storybook.dlslead.com/?path=/docs/components-contextmenu--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6605-4492

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays -- this is a
SIMULATION of the code behavior, not the implementation.

This component: OVERLAY TOKENS on child ListItem rows.
The ContextMenu container itself has no interactive states.
ListItem children use overlay tokens for hover/pressed.
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Right-click or triggered menu providing contextual actions, keyboard
shortcuts, nested submenus, section labels, and dividers. Built on
ListItem rows with `role="menu"` semantics.

## Use when

- Right-click context menus.
- Action menus triggered by a button or gesture.
- Menus with keyboard shortcuts displayed inline.
- Menus with nested submenu groups.

## Do NOT use for

- Primary navigation -- use Sidebar or Tabs.
- Form select dropdowns -- use Dropdown.
- Filter lists -- use DropdownFilters.
- Permanent action lists -- use List with ListItem directly.

## Figma -> Code mapping

| Figma property | React prop | Values / notes |
|----------------|------------|----------------|
| (none)         | --         | Figma component is a fixed composition; no configurable properties. Content is defined by nesting ListItem instances in Figma, ContextMenuItem/Submenu/Divider/Label in React. |

## Anatomy

```
ContextMenu (role="menu", .dls-context-menu)
+-- ContextMenuItem (ListItem type="with-slots")
|   +-- iconStart slot (lucide-react icon)
|   +-- text (label)
|   +-- slotRight (KbdGroup with Kbd keys)
+-- ContextMenuSubmenu (.dls-context-menu__submenu)
|   +-- Trigger ListItem (with ChevronRight icon end)
|   +-- Nested ContextMenu (.dls-context-menu__submenu-content)
+-- ContextMenuDivider (ListItem type="divider")
+-- ContextMenuLabel (ListItem type="label")
```

## Props / API

### ContextMenu

| Prop      | Type             | Required | Description             |
|-----------|------------------|----------|-------------------------|
| children  | React.ReactNode  | yes      | Menu content            |
| className | string           | no       | Additional CSS class    |

### ContextMenuItem

| Prop     | Type               | Required | Description                         |
|----------|--------------------|----------|-------------------------------------|
| icon     | React.ReactNode    | no       | Leading icon slot                   |
| label    | string             | yes      | Item label text                     |
| shortcut | string[]           | no       | Keyboard shortcut keys (e.g. ['Ctrl', 'S']) |

Extends `React.ButtonHTMLAttributes<HTMLButtonElement>`.

### ContextMenuSubmenu

| Prop     | Type             | Required | Description            |
|----------|------------------|----------|------------------------|
| icon     | React.ReactNode  | no       | Trigger item icon      |
| label    | string           | yes      | Trigger item label     |
| children | React.ReactNode  | yes      | Submenu content        |

### ContextMenuLabel

| Prop     | Type             | Required | Description       |
|----------|------------------|----------|-------------------|
| children | React.ReactNode  | yes      | Section header    |

### ContextMenuDivider

No props. Renders a ListItem divider.

## Tokens used

### Layout (context-menu.css)

| Token | Use |
|-------|-----|
| `--dls-radius-component-list` | Container border-radius |
| `--dls-font-family` | Container font family |
| `--dls-spacing-2` | Container padding |
| `--dls-spacing-1` | Submenu offset |

### Color

| Token | Use |
|-------|-----|
| `--dls-color-surface-base` | Container background |
| `--dls-color-border-subtle` | Container border |

### Shadow

| Token | Use |
|-------|-----|
| `--dls-shadow-surface-md` | Container drop shadow (matches Figma shadow/m) |

### Delegated tokens (via ListItem, Kbd)

| Token | Use |
|-------|-----|
| `--dls-radius-component-list-item` | Item border-radius |
| `--dls-radius-component-kbd` | Kbd border-radius |
| `--dls-color-intent-neutral-text` | Item text |
| `--dls-color-text-secondary` | Kbd text |
| `--dls-color-surface-muted` | Kbd background |
| `--dls-state-hover-overlay` | Item hover |
| `--dls-state-focus-ring-color` | Item focus ring |

## States

### Container
No interactive states. Static surface.

### Menu items (via ListItem)
| State | Visual |
|-------|--------|
| Normal | Surface base bg, neutral text |
| Hover | Overlay hover bg |
| Focus-visible | Focus ring shadow |

### Submenu trigger
| State | Visual |
|-------|--------|
| Hover | Opens nested ContextMenu |

## Accessibility contract

- Root: `div[role="menu"]`.
- Items: ListItem renders as button with accessible text from `label`.
- Keyboard: Tab moves focus between items. Enter/Space activates.
- Submenu trigger: `aria-haspopup="menu"` + `aria-expanded`. ArrowRight opens and focuses first child. ArrowLeft / Escape closes and returns focus to trigger.
- Escape: closes submenu first; root menu close is consumer responsibility.
- No `prefers-reduced-motion` needed (no CSS transitions/animations in context-menu.css).

## Composition rules

- All rows MUST be ContextMenuItem, ContextMenuSubmenu, ContextMenuDivider, or ContextMenuLabel.
- ContextMenuItem internally uses `ListItem type="with-slots"`.
- ContextMenuSubmenu nests a full `ContextMenu` as child.
- Keyboard shortcuts use `Kbd` / `KbdGroup` in the right slot.
- Icons must be from `lucide-react`.
- ChevronRight icon for submenu triggers is imported from lucide-react.

## Known deviations

- **token-layer**: No L4 color tokens for context-menu in `tokens.json`. Uses `--dls-radius-component-list` from List (same visual). `--dls-radius-component-context-menu` exists in tokens.json but is unused; both resolve to the same value.

## Code example

```tsx
<ContextMenu>
  <ContextMenuItem icon={<Undo2 size={16} />} label="Undo" shortcut={['⌘', 'Z']} />
  <ContextMenuItem icon={<Redo2 size={16} />} label="Redo" shortcut={['⌘', '⇧', 'Z']} />
  <ContextMenuDivider />
  <ContextMenuLabel>Actions</ContextMenuLabel>
  <ContextMenuItem icon={<Scissors size={16} />} label="Cut" shortcut={['⌘', 'X']} />
  <ContextMenuItem icon={<Copy size={16} />} label="Copy" shortcut={['⌘', 'C']} />
  <ContextMenuSubmenu icon={<MessageSquare size={16} />} label="Speech">
    <ContextMenuItem icon={<Play size={16} />} label="Start speaking" />
    <ContextMenuItem icon={<Square size={16} />} label="Stop speaking" />
  </ContextMenuSubmenu>
</ContextMenu>
```

## Cross-references

- [list-item.md](../components/list-item.md) -- menu rows
- [kbd.md](../components/kbd.md) -- shortcut display
- [dropdown.md](../components/dropdown.md) -- related overlay pattern
- [submenu.md](../components/submenu.md) -- submenu component

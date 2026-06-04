# SidebarItem

Category: navigation item
React: `<SidebarItem>`
Spec: specs/components/sidebar-item.md
TSX: apps/storybook/src/stories/sidebar-item/SidebarItem.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-sidebaritem--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=76-13399

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a
SIMULATION of the code behavior, not the implementation.

In code, pick the mechanism by surface type:
- Base fill present (filled, soft, any tinted bg)
  → OKLCH L-shift: oklch(from <base> calc(l + <delta>) c h)
- Transparent surface (outline, dotted, ghost, link, or
  ghost-surface components like SidebarItem)
  → overlay tokens.

This component uses: OVERLAY TOKENS (transparent surface in
normal state). Active state uses a filled surface
(intent/neutral/base), but hover is suppressed on active items.

See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Individual navigation entry within a Sidebar component. Five
types cover different interaction patterns — simple links, tree
nodes with expand/collapse, option items with an action menu,
collapsible section headers, and big-icon workspace/account
switchers.

## Use when

- Building left-side navigation menus with icon + text rows.
- Representing hierarchical navigation with tree/collapsible types.
- Workspace or account switchers with logo/avatar + subtitle.
- Option menus with per-item action buttons.

## Do NOT use for

- Top-level horizontal navigation → use Tabs.
- Dropdown menu rows → use ListItem.
- Breadcrumb links → use Breadcrumbs.
- Standalone buttons → use Button.
- Table row actions → use DropdownColumnActions.

## Figma → Code mapping

| Figma property | React prop       | Values / Notes                                          |
|----------------|------------------|---------------------------------------------------------|
| type           | type             | simple \| tree \| big-icon \| collapsible \| option     |
| state          | (native CSS)     | Figma-only: normal, hover, active, focus                |
| collapsed?     | collapsed        | true / false — sidebar icon-only mode                   |
| icon           | icon             | Boolean toggle in Figma; ReactNode slot in code         |
| indicator      | showIndicator    | Boolean — shows BadgeIndicator dot                      |
| number         | badgeCount       | Boolean in Figma; number in code (BadgeNumber)          |
| text           | text             | string — primary label                                  |
| subtitle       | secondaryText    | Boolean in Figma; string in code (big-icon type only)   |
| subtitleText   | secondaryText    | string — maps to same prop as subtitle toggle           |
| slotMedia      | media            | Boolean in Figma; ReactNode in code (big-icon type)     |
| change         | icon             | Slot swap in Figma; icon prop in code                   |

Notes:
- `state` in Figma is visual only. In code, states come from
  native pseudo-classes and data-attributes — never a prop.
- `number` in Figma is a boolean toggle; in code, `badgeCount`
  is a number — the badge renders when badgeCount > 0.
- `subtitle` and `subtitleText` both map to the `secondaryText`
  prop — subtitle controls visibility, subtitleText sets content.

## Anatomy

1. Root — `div[role="menuitem"]` with `dls-sidebar-item` class.
2. Chevron (tree type: leading; collapsible/big-icon: trailing) —
   lucide-react ChevronDown, 16×16, rotates -90deg when collapsed.
3. Icon slot — 16×16, `currentColor` inherited from parent.
4. Media slot (big-icon only) — 32×32, contains logo/avatar.
5. Indicator dot — BadgeIndicator component, xs/danger.
6. Text — single line with ellipsis overflow.
7. Text group (big-icon) — primary + secondary text stacked.
8. Badge — BadgeNumber component, soft/neutral/s.
9. Action button (option type) — ellipsis icon, appears on hover.

## Props / API

- `type` — `'simple' | 'tree' | 'option' | 'collapsible' | 'big-icon'`, default `'simple'`
- `text` — `string`, required. Primary label.
- `secondaryText` — `string`, optional. Secondary line for big-icon type.
- `icon` — `React.ReactNode`, optional. Leading icon slot.
- `media` — `React.ReactNode`, optional. 32×32 media slot for big-icon type.
- `showIndicator` — `boolean`, default `false`. Notification indicator dot.
- `badgeCount` — `number`, optional. Number badge value.
- `active` — `boolean`, default `false`. Currently selected/active.
- `collapsed` — `boolean`, default `false`. Sidebar collapsed (icon-only).
- `expanded` — `boolean`, default `true`. Tree/collapsible section expanded.
- `disabled` — `boolean`, default `false`. Disables interaction.
- `onClick` — `() => void`, optional. Click handler.
- `onToggle` — `() => void`, optional. Expand/collapse handler.
- `onAction` — `() => void`, optional. Ellipsis action handler (option type).
- `className` — `string`, optional.

## Tokens used

- `--dls-radius-component-sidebar-item` → `{radius.m}` (6px)
- `--dls-color-intent-neutral-text` — default text color
- `--dls-color-intent-neutral-base` — active background
- `--dls-color-intent-neutral-on-base` — active text + icon color
- `--dls-color-text-secondary` — secondary text (big-icon)
- `--dls-color-text-disabled` — disabled text color
- `--dls-color-surface-base` — focus background
- `--dls-state-hover-overlay` — hover background
- `--dls-state-focus-ring-color` — focus ring color

L4 component tokens in tokens.json:
- `--dls-color-component-sidebar-item-fg-base` → `{color.intent.neutral.text}`
- `--dls-color-component-sidebar-item-fg-active` → `{color.intent.neutral.on-base}`
- `--dls-color-component-sidebar-item-bg-active` → `{color.intent.neutral.base}`

Note: The CSS currently uses L2 semantic tokens directly rather
than the L4 component tokens above. Both resolve to the same
values. A future cleanup can switch CSS to reference the L4
tokens for better indirection.

## States

### Figma representation
- normal: transparent background
- hover: `state/hover-overlay` background
- active: `intent/neutral/base` background, `intent/neutral/on-base` text
- focus: `surface/base` background with `0 0 0 3px focus/ring` shadow

### Code implementation
- normal: no background
- hover: `background: var(--dls-state-hover-overlay)` via `:hover:not(:disabled):not([data-disabled]):not([data-active])`
- active: `background: var(--dls-color-intent-neutral-base)` via `[data-active]`
- focus-visible: `box-shadow: 0 0 0 3px var(--dls-state-focus-ring-color)` via `:focus-visible`
- disabled: `color: var(--dls-color-text-disabled)`, `pointer-events: none` via `[data-disabled]`

### State tokens (Layer 3)
- `--dls-state-hover-overlay` — rgba(0,0,0,0.05)
- `--dls-state-focus-ring-color` — focus ring color
- `--dls-state-disabled-opacity` — not used directly; disabled uses text token swap

## Accessibility contract

- Root element: `div[role="menuitem"]` with `tabIndex={0}`.
- `aria-current="page"` set on active item.
- `aria-disabled` set when disabled.
- Chevron toggle buttons: `role="button"` with `aria-label="Expand"/"Collapse"`.
- Ellipsis action: `role="button"` with `aria-label="More options"`.
- Keyboard: Enter/Space activates the item. Tab moves between items.
- Focus ring uses `:focus-visible` and `box-shadow` — never `outline`.
- `prefers-reduced-motion` disables chevron rotation and background transitions.

## Composition rules

- Always use inside a Sidebar component or equivalent `role="menu"` container.
- Icon slot accepts lucide-react icons only (16×16, inherits `currentColor`).
- Media slot (big-icon) accepts IconShape, Avatar, or `<img>` elements (32×32).
- Badge uses BadgeNumber component with soft/neutral/s variant.
- Indicator uses BadgeIndicator component with xs/danger.
- Tree/collapsible types compose with Submenu for child items.
- Collapsed mode hides text, badge, chevron, and action — shows icon only.

## Known deviations

None. The L4 token mismatch has been resolved — tokens.json
now references the same intent/neutral values as Figma.

## Code example

```tsx
<SidebarItem type="simple" text="Inbox" icon={<InboxIcon />} active badgeCount={5} />

<SidebarItem type="tree" text="Projects" icon={<FolderIcon />} expanded onToggle={handleToggle} />

<SidebarItem type="big-icon" text="Acme Corp" secondaryText="admin@acme.com" media={<LogoIcon />} />
```

## Cross-references

- specs/components/sidebar.md
- specs/foundations/motion.md
- specs/foundations/accessibility.md
- specs/tokens/motion-tokens.md
- specs/patterns/composition.md

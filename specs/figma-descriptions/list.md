# List

Category: structure
React: `<List>`
Spec: `specs/components/list.md`
TSX: `apps/storybook/src/stories/list-item/List.tsx`
CSS: `apps/storybook/src/stories/list-item/list.css`
Storybook: https://storybook.dlslead.com/?path=/docs/components-list--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=156-4635

--------------------------------------------
## State implementation contract (applies to all DLS components)

This component: NONE.
List is a static container. All interactive behavior is delegated
to ListItem children.
--------------------------------------------

## Purpose

Container surface for grouped menu rows, selection rows, popover
rows, and other list-based content. Provides the bordered, rounded,
shadowed surface that wraps ListItem rows.

## Use when

- Wrapping ListItem rows in a dropdown, popover, or panel.
- Standalone selection lists.
- Any grouped list surface that needs border + shadow treatment.

## Do NOT use for

- Flat inline lists without surface treatment -- render ListItems directly.
- Data tables -- use Table.
- Navigation sidebars -- use Sidebar.
- Context menus -- use ContextMenu (which replicates List styling independently).

## Figma -> Code mapping

| Figma property | React prop | Values / notes |
|----------------|------------|----------------|
| (none)         | --         | No configurable Figma properties. Content is a slot filled with ListItem instances. In React, pass ListItem components as children. |

## Anatomy

```
List (.dls-list) [role="listbox"]
+-- ListItem children (any ListItem type)
```

## Props / API

| Prop      | Type             | Required | Description           |
|-----------|------------------|----------|-----------------------|
| children  | React.ReactNode  | yes      | ListItem content      |
| className | string           | no       | Additional CSS class  |

## Tokens used

| Token | Use |
|-------|-----|
| `--dls-radius-component-list` | Container border-radius |
| `--dls-font-family` | Container font family |
| `--dls-spacing-2` | Container padding |
| `--dls-color-surface-base` | Container background |
| `--dls-color-border-subtle` | Container border |
| `--dls-shadow-surface-md` | Container drop shadow (matches Figma shadow/m) |

## States

No interactive states. Static container surface.

## Accessibility contract

- Root: `div[role="listbox"]`.
- Not focusable. Child ListItem elements handle their own focus.
- No keyboard handling on the container.
- No `prefers-reduced-motion` needed (no CSS transitions/animations).

## Composition rules

- Children MUST be ListItem components.
- Do not nest List inside List.
- ContextMenu replicates List's surface styling independently (not composed with List).
- Dropdowns use their own surface; List is for standalone usage.

## Known deviations

- **token-layer**: No L4 color tokens for list in `tokens.json`. Uses semantic tokens. Only `--dls-radius-component-list` exists as L4.

## Code example

```tsx
<List>
  <ListItem type="label" text="Category" />
  <ListItem type="text" text="Option 1" />
  <ListItem type="text" text="Option 2" selected />
  <ListItem type="divider" />
  <ListItem type="text" text="Option 3" />
</List>
```

## Cross-references

- [list-item.md](../components/list-item.md) -- row component
- [dropdown.md](../components/dropdown.md) -- primary consumer pattern
- [context-menu.md](../components/context-menu.md) -- independent surface with same visual

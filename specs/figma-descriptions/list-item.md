# ListItem

Category: structure / row
React: `<ListItem>`
Spec: `specs/components/list-item.md`
TSX: `apps/storybook/src/stories/list-item/ListItem.tsx`
CSS: `apps/storybook/src/stories/list-item/list-item.css`
Storybook: https://storybook.dlslead.com/?path=/docs/components-listitem--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=86-2429

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays -- this is a
SIMULATION of the code behavior, not the implementation.

In code, pick the mechanism by surface type:
- Base fill present (filled, soft, any tinted bg)
  -> OKLCH L-shift: oklch(from <base> calc(l + <delta>) c h)
- Transparent surface (outline, dotted, ghost, link)
  -> overlay tokens.

This component: HYBRID.
- Unselected hover: OVERLAY (`--dls-state-hover-overlay`)
- Selected state: `--dls-color-intent-info-subtle` fill
- Selected+hover: OKLCH L-shift on info-subtle
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Foundational row component for every visible item inside dropdowns,
menus, context menus, command palettes, selection lists, and similar
list surfaces. Provides consistent structure for labels, metadata,
icons, controls, and actions.

## Use when

- Options inside a Dropdown or DropdownAutocomplete.
- Actions inside a ContextMenu.
- Navigation menus and command palettes.
- Selectable items within a List.
- Any row inside a list-based overlay surface.

## Do NOT use for

- Data-heavy tabular information -- use Table.
- Standalone buttons or actions outside a list.
- Content containers -- use Card.
- Multi-column layouts.

## Figma -> Code mapping

| Figma property      | React prop        | Values / notes                                           |
|---------------------|-------------------|----------------------------------------------------------|
| type                | type              | "text" \| "with slots" -> "with-slots" \| "two-line" \| "two-line+slots" -> "two-line-slots" \| "label" \| "chips" \| "search" \| "buttons" \| "empty state" -> "empty-state" \| "divider" |
| state               | (native CSS)      | Figma-only: normal/hover/pressed/focus. Code uses :hover, :active, :focus-visible, [data-selected]. |
| text                | text              | string                                                    |
| iconLeft            | iconStart         | Figma boolean -> React ReactNode                          |
| iconRight           | iconEnd           | Figma boolean -> React ReactNode                          |
| slotLeft            | (controls visibility) | Figma boolean -> slotLeft truthy/falsy                |
| slotContentLeft     | slotLeft          | Figma instance swap -> React ReactNode                    |
| slotRight           | (controls visibility) | Figma boolean -> slotRight truthy/falsy               |
| slotContentRight    | slotRight         | Figma instance swap -> React ReactNode                    |
| slotSecondLine      | (controls visibility) | Figma boolean -> secondaryText truthy/falsy           |
| slotSecondLineContent | secondaryContent | Figma instance swap -> React ReactNode                   |
| slot                | children          | Figma instance swap -> React children (buttons/chips/search) |
| button2             | (Figma only)      | Controls second button in buttons type. In React, both buttons are passed as children. |

## Anatomy

```
ListItem (.dls-list-item) [data-type] [data-selected]
  For type="text":
    +-- .dls-list-item__text (label)

  For type="with-slots":
    +-- .dls-list-item__icon (iconStart) [optional]
    +-- .dls-list-item__slot (slotLeft) [optional]
    +-- .dls-list-item__text (label)
    +-- .dls-list-item__slot (slotRight) [optional]
    +-- .dls-list-item__icon (iconEnd) [optional]

  For type="two-line":
    +-- .dls-list-item__two-line
        +-- .dls-list-item__primary
        +-- .dls-list-item__secondary (or secondaryContent)

  For type="two-line-slots":
    +-- .dls-list-item__icon (iconStart) [optional]
    +-- .dls-list-item__slot (slotLeft) [optional]
    +-- .dls-list-item__two-line
    |   +-- .dls-list-item__primary
    |   +-- .dls-list-item__secondary (or secondaryContent)
    +-- .dls-list-item__slot (slotRight) [optional]
    +-- .dls-list-item__icon (iconEnd) [optional]

  For type="label":    .dls-list-item__label
  For type="divider":  .dls-list-item__divider
  For type="buttons":  .dls-list-item__buttons > children
  For type="chips":    .dls-list-item__chips > children
  For type="search":   .dls-list-item__search > children
  For type="empty-state": .dls-list-item__empty
```

## Props / API

| Prop             | Type              | Required | Default | Description                                |
|------------------|-------------------|----------|---------|--------------------------------------------|
| type             | ListItemType      | no       | "text"  | Item type                                  |
| text             | string            | no       | --      | Primary text                               |
| secondaryText    | string            | no       | --      | Secondary line text (two-line types)        |
| secondaryContent | React.ReactNode   | no       | --      | Secondary line custom content (two-line types) |
| iconStart        | React.ReactNode   | no       | --      | Leading icon                               |
| iconEnd          | React.ReactNode   | no       | --      | Trailing icon                              |
| slotLeft         | React.ReactNode   | no       | --      | Left slot content                          |
| slotRight        | React.ReactNode   | no       | --      | Right slot content                         |
| children         | React.ReactNode   | no       | --      | Children for buttons, chips, search types  |
| selected         | boolean           | no       | --      | Persistent selected state                  |
| onClick          | React.MouseEventHandler | no | --      | Click handler                              |
| interactive      | boolean           | no       | (auto)  | Force render tag. Auto-detected by type. Use `false` when row contains its own form control. |
| className        | string            | no       | --      | Additional CSS class                       |

### ListItemType

```ts
type ListItemType =
  | 'text' | 'label' | 'with-slots'
  | 'two-line' | 'two-line-slots'
  | 'buttons' | 'search' | 'empty-state'
  | 'chips' | 'divider';
```

## Tokens used

### Layout

| Token | Use |
|-------|-----|
| `--dls-radius-component-list-item` | Row border-radius |
| `--dls-font-family` | Row font family |
| `--dls-spacing-1` | Padding-y, two-line gap, chips gap, divider padding |
| `--dls-spacing-2` | Padding-x, gap, buttons gap |

### Color

| Token | Use |
|-------|-----|
| `--dls-color-surface-base` | Row background |
| `--dls-color-intent-neutral-text` | Text, primary text |
| `--dls-color-text-secondary` | Label, secondary text, icon color |
| `--dls-color-text-placeholder` | Empty state text |
| `--dls-color-border-base` | Divider line |

### State

| Token | Use |
|-------|-----|
| `--dls-state-hover-overlay` | Unselected hover |
| `--dls-color-intent-info-subtle` | Selected / pressed bg |
| `--dls-state-l-delta-hover` | Selected hover OKLCH L-shift |
| `--dls-state-focus-ring-color` | Focus ring |

### Typography

| Token | Use |
|-------|-----|
| `--dls-text-m-font-size` | Text, primary, empty |
| `--dls-text-m-line-height` | Text, primary, empty |
| `--dls-font-weight-normal` | Text, primary, secondary, empty |
| `--dls-text-s-font-size` | Label, secondary |
| `--dls-text-s-line-height` | Label, secondary |
| `--dls-font-weight-medium` | Label |

## States

| State | Selector | Visual |
|-------|----------|--------|
| Normal | default | Surface base bg |
| Hover | `:hover:not(:disabled):not([data-selected])` | Overlay hover bg |
| Pressed / Selected | `:active`, `[data-selected]` | Intent info subtle bg |
| Selected + hover | `[data-selected]:hover:not(:disabled)` | OKLCH L-shift on info subtle |
| Focus-visible | `:focus-visible` | Focus ring shadow |

Interactive types (auto-render as `<button>`): text, with-slots, two-line, two-line-slots.
Non-interactive types (render as `<div>`): label, buttons, search, chips, empty-state, divider.

## Accessibility contract

- Interactive types: native `<button>`. Non-interactive: `<div>`.
- `interactive` prop overrides auto-detection (use `false` to avoid nested interactive elements).
- `aria-selected` set when `selected` is true.
- Text is the accessible name from `text` prop.
- Focus: `:focus-visible` ring via `--dls-state-focus-ring-color`.
- No `prefers-reduced-motion` needed (no CSS transitions/animations).

## Composition rules

- ListItem is the ONLY allowed row inside dropdowns, menus, context menus, and popovers.
- Icons must be from `lucide-react`, 16x16.
- Do not nest ListItem inside ListItem.

### Type consistency rule

All **interactive rows** in a list MUST use the same structural type
(don't mix text rows with with-slots rows, or single-line with two-line).

The following **utility types** can appear alongside any interactive type:

| Utility type   | Position     | Purpose |
|----------------|-------------|---------|
| `label`        | anywhere    | Section header above a group of rows |
| `divider`      | anywhere    | Visual separator between groups |
| `search`       | top         | Filter/search input at the top of the list |
| `chips`        | top         | Chip filter row at the top of the list |
| `empty-state`  | replaces rows | Shown when search/filter yields no results |
| `buttons`      | bottom (last) | Action row (e.g. Cancel / Apply) for confirming selection or applying changes; can be sticky/fixed so it does not scroll with the rest of the list |

### Valid compositions

- `search` + interactive rows + `buttons` (filter dropdown with apply)
- `label` + interactive rows + `divider` + `label` + interactive rows (sectioned list)
- `chips` + interactive rows (chip filter + options)
- `search` + `empty-state` (no results)
- interactive rows + `buttons` (selection list with confirm)

## Known deviations

- **token-layer**: No L4 color tokens for list-item in `tokens.json`. Uses semantic and intent tokens directly. Only `--dls-radius-component-list-item` exists as L4.

## Code example

```tsx
{/* Simple text item */}
<ListItem type="text" text="Option 1" />

{/* With slots + selection */}
<ListItem
  type="with-slots"
  text="File.tsx"
  iconStart={<File size={16} />}
  iconEnd={<Check size={16} />}
  selected={isSelected}
  onClick={handleClick}
/>

{/* Two-line */}
<ListItem
  type="two-line"
  text="Primary text"
  secondaryText="Secondary description"
/>

{/* Label + divider for sections */}
<ListItem type="label" text="Category" />
<ListItem type="text" text="Item 1" />
<ListItem type="divider" />
<ListItem type="text" text="Item 2" />
```

## Cross-references

- [list.md](../components/list.md) -- parent container
- [dropdown.md](../components/dropdown.md) -- primary consumer
- [context-menu.md](../components/context-menu.md) -- menu consumer
- [kbd.md](../components/kbd.md) -- keyboard shortcut display
- [badge.md](../components/badge.md) -- common slot content

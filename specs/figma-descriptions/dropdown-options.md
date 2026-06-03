# DropdownOptions

Category: menu / container
React: <DropdownOptions>
Spec: specs/components/dropdown-options.md
TSX: apps/storybook/src/stories/dropdown-options/DropdownOptions.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-dropdownoptions--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6122-16148

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a SIMULATION
of the code behavior, not the implementation.

This component uses: NONE on the dropdown panel itself (passive
floating surface). Interactive states live on the trigger Button
(hybrid — soft variant uses OKLCH L-shift) and on the ListItems
inside the panel (overlay for hover, info-subtle fill for selected).
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Generic action menu triggered by an icon button. The panel content
is a `List` with `ListItem` rows — supports an optional `label`
header row, dividers, and submenus that open as adjacent panels
(e.g. `Columns` opens `DropdownColumns`, `Filters` opens
`DropdownFilters`, `Export` opens `DropdownExport`).

In the TableTopBar context, DropdownOptions is the canonical
"overflow / table-management" menu. Submenus open NEAR the main
dropdown so the parent menu remains visible — they never overlap.

## Use when

- Overflow / "more" menu on a row, card, toolbar, or table top bar.
- Contextual action menu where 2–7 actions need to be available
  without crowding the surface.
- Settings / customization entry point that drills into submenus
  (Columns → DropdownColumns, Filters → DropdownFilters, etc.).

## Do NOT use for

- Selection lists with multi-select → use `Dropdown` / `DropdownAutocomplete`.
- Sort controls → use `DropdownSorting`.
- Column visibility → use `DropdownColumns`.
- Filter management → use `DropdownFilters`.
- Free-form popovers without an items list → use `Dialog` or
  a Tooltip if the content is informational.

## Figma → Code mapping

| Figma property        | React prop    | Values / Notes                                  |
|-----------------------|---------------|--------------------------------------------------|
| (panel slot)          | children      | The menu body — typically `<List>` with `<ListItem>` children. Supports `type="label"`, `type="divider"`, `type="text"`, `type="with-slots"`, etc. |
| (trigger icon)        | triggerIcon   | Defaults to lucide `MoreVertical`. Override with any lucide icon (Ellipsis, Settings, Filter, etc.). |
| —                     | triggerLabel  | Accessible name for the trigger Button. Default `"Options"`. |
| —                     | align         | `"start"` / `"end"` (default). Horizontal anchor of the panel relative to the trigger. |
| —                     | side          | `"top"` / `"bottom"` (default). Which side of the trigger the panel opens on. |
| —                     | disabled      | Disable the trigger Button.                      |
| —                     | className     | Root class extension.                            |

## Anatomy

- Root — `.dls-dropdown-options` with `data-open` when open.
  - Trigger — icon-only `<Button variant="soft" intent="neutral" size="m">`
    with `aria-haspopup="menu"`, `aria-expanded={isOpen}`,
    `aria-label={triggerLabel}`.
- Panel (rendered in a React **portal** on `document.body`) —
  `.dls-dropdown-options__panel.dls-dropdown-options__panel--portal`
  with `data-align`, `data-side`, `role="menu"`. Positioned
  absolutely via inline styles set from the wrapper's bounding rect.

## Props / API

```ts
export type DropdownOptionsAlign = 'start' | 'end';
export type DropdownOptionsSide = 'top' | 'bottom';

export interface DropdownOptionsProps {
  children: React.ReactNode;
  align?: DropdownOptionsAlign;   // default 'end'
  side?: DropdownOptionsSide;     // default 'bottom'
  triggerIcon?: React.ReactNode;  // default <MoreVertical />
  triggerLabel?: string;          // default 'Options'
  disabled?: boolean;
  /** Controlled open state. When provided, the component is in
   *  controlled mode and the consumer must keep state in sync via
   *  onOpenChange. Use this when a child action needs to dismiss the
   *  menu programmatically (e.g. a DropdownFilters mirror-chip
   *  handoff that closes this menu + opens a top-bar chip). */
  open?: boolean;
  /** Called whenever the menu wants to change its open state
   *  (trigger click, outside click, Escape). Required in controlled
   *  mode. */
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
```

## Tokens used

- `--dls-color-surface-base` (panel background)
- `--dls-color-border-subtle` (panel border)
- `--dls-radius-component-list` (panel radius)
- `--dls-shadow-surface-md` (panel shadow)
- `--dls-spacing-2` (panel padding)
- `--dls-font-family`
- All Button + List + ListItem tokens (composed via children + the trigger)

## States

| State    | Figma representation | Code implementation                          |
|----------|----------------------|----------------------------------------------|
| closed   | (not shown)          | Panel not rendered                           |
| open     | (panel visible)      | `aria-expanded="true"` + panel portal rendered with `role="menu"` |
| disabled | (n/a in Figma)       | `disabled` on the trigger Button             |

No spatial motion on the panel itself. Color transitions on the
trigger and ListItem children carry their own contracts.

## Accessibility contract

- Trigger is a native `<button>` (via DLS Button) with
  `aria-haspopup="menu"` + `aria-expanded` tracking open state and
  `aria-label` (default `"Options"`).
- Panel uses `role="menu"`. Each interactive child should be a
  `<ListItem type="text" | "with-slots">` which renders as a
  native `<button>` and provides its own focus / keyboard contract.
- Close on:
  - **Click outside** the wrapper or the portal panel (mousedown
    listener)
  - **Escape** (keydown handler)
- The panel renders in a React portal anchored to `document.body`,
  positioned using the trigger wrapper's bounding rect — it stays
  outside any `overflow: hidden` ancestor and is updated on `resize`
  / `scroll`.
- Submenu pattern: a submenu opens as a SECOND DropdownOptions /
  panel adjacent to the main one. Submenus must not hide or overlap
  the parent menu. The trigger ListItem in the main menu carries an
  `iconEnd={<ChevronRight />}` to signal "opens submenu."

## Composition rules

- Children should be `<List>` wrapping `<ListItem>`s. Supported
  ListItem types:
  - `type="label"` — non-interactive header row (e.g. "Customize").
  - `type="divider"` — separator between groups.
  - `type="text"` — plain text row, native `<button>` when
    interactive.
  - `type="with-slots"` — text + iconStart / iconEnd / slotLeft /
    slotRight. Use `iconEnd={<ChevronRight />}` for rows that open a
    submenu; use `iconStart` for the row's primary icon (e.g.
    `Columns3`, `Filter`, `Download`).
- For submenus (Columns / Filters / Export), render the matching
  specialized dropdown (`DropdownColumns`, `DropdownFilters`,
  `DropdownExport`) as a SIBLING node positioned next to the main
  panel via inline flex layout — see the TableTopBar `OptionsMenu`
  helper for the canonical pattern.
- Do not nest `DropdownOptions` inside another `DropdownOptions` —
  open a submenu as an adjacent panel instead.
- Do not place forms, inputs, or full Dialogs inside the menu — use
  the appropriate component instead.

## Known deviations

- The component spec mentions
  `--dls-color-component-dropdown-options-*` and
  `--dls-radius-component-dropdown-options` tokens but those do not
  exist in `tokens.json`. The CSS uses semantic surface/border
  tokens directly and reuses `--dls-radius-component-list` for the
  panel radius. (Low severity.)
- Figma exposes the trigger Button as part of the same component
  (Figma "dropdown-options" frame contains the panel only — the
  trigger is part of the host pattern). In code, the trigger is
  rendered inside the same React component for ergonomics — pass
  `triggerIcon` and `triggerLabel` to customize.

## Code example

```tsx
import { DropdownOptions } from './dropdown-options/DropdownOptions';
import { List } from './list-item/List';
import { ListItem } from './list-item/ListItem';
import {
  Settings as SettingsIcon,
  Columns3 as Columns3Icon,
  Filter as FilterIcon,
  Download as DownloadIcon,
  ChevronRight as ChevronRightIcon,
  MoreHorizontal as MoreIcon,
} from 'lucide-react';

// Plain options menu (kebab trigger)
<DropdownOptions triggerLabel="Row options">
  <List>
    <ListItem type="text" text="Edit" />
    <ListItem type="text" text="Duplicate" />
    <ListItem type="divider" />
    <ListItem type="text" text="Delete" />
  </List>
</DropdownOptions>

// Table-management menu with drill-in submenus (TableTopBar pattern)
function TableOptionsMenu() {
  const [sub, setSub] = React.useState<'root' | 'columns' | 'filters' | 'export'>('root');
  const root = (
    <List>
      <ListItem type="label" text="Customize" />
      <ListItem type="with-slots" text="Columns" iconStart={<Columns3Icon />} iconEnd={<ChevronRightIcon />} onClick={() => setSub('columns')} />
      <ListItem type="with-slots" text="Filters" iconStart={<FilterIcon />}   iconEnd={<ChevronRightIcon />} onClick={() => setSub('filters')} />
      <ListItem type="divider" />
      <ListItem type="with-slots" text="Export"  iconStart={<DownloadIcon />} iconEnd={<ChevronRightIcon />} onClick={() => setSub('export')} />
    </List>
  );
  const submenu =
    sub === 'columns' ? <DropdownColumns onCancel={() => setSub('root')} /> :
    sub === 'filters' ? <DropdownFilters /> :
    sub === 'export'  ? <DropdownExport  /> :
    null;
  return (
    <DropdownOptions triggerIcon={<MoreIcon />}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--dls-spacing-2)' }}>
        {root}
        {submenu}
      </div>
    </DropdownOptions>
  );
}
```

## Cross-references

- [list.md](../components/list.md)
- [list-item.md](../components/list-item.md)
- [button.md](../components/button.md)
- [dropdown-columns.md](../components/dropdown-columns.md)
- [dropdown-filters.md](../components/dropdown-filters.md)
- [dropdown-export.md](../components/dropdown-export.md)
- [context-menu.md](../components/context-menu.md)
- [table-top-bar.md](table-top-bar.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)
- [../foundations/motion.md](../foundations/motion.md)

# DropdownColumns

Category: menu / table-utility
React: <DropdownColumns>
Spec: specs/components/dropdown-columns.md
TSX: apps/storybook/src/stories/dropdown-columns/DropdownColumns.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-dropdowncolumns--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6122-14397

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a SIMULATION
of the code behavior, not the implementation.

This component uses: HYBRID.
- The panel surface is passive (no panel-level hover/pressed/focus).
- Composed ListItem rows carry overlay hover; selected/dragging rows
  use the data-attribute states defined in CSS.
- Pin toggle and Apply / Cancel Buttons carry their own state
  contracts (hybrid — soft / outline / filled variants).
- Drag-over row uses an info-subtle overlay; the actively-dragging
  row drops to half opacity for visual feedback.
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Column customization panel that opens adjacent to the main
`DropdownOptions` (the "Columns" row in the table top-bar options
menu opens this dropdown as a sibling, never overlapping the
parent).

Lets users:
1. **Reorder columns** via drag-and-drop (pointer-event based — no
   HTML5 native drag).
2. **Show / hide columns** by moving them between the **Shown** and
   **Hidden** sections.
3. **Pin / unpin columns** to keep them fixed during horizontal
   scrolling.
4. **Review** counts of visible columns via the section header
   Badge.

Changes are staged in component state until the user clicks **Apply**.
Clicking **Cancel** dismisses without committing.

## Use when

- Below the "Columns" item in the `DropdownOptions` menu on a
  table top bar.
- Anywhere a user needs to choose which columns to show + pin
  in a data table.

## Do NOT use for

- Filter management → use `DropdownFilters`.
- Sort controls → use `DropdownSorting`.
- Export options → use `DropdownExport`.
- Column-level actions (rename, hide, pin from header) → use
  `DropdownColumnActions` triggered from a TableHeaderCell.
- Selection / row-expansion utility columns — those are NOT
  exposed in this dropdown (they control table behavior, not
  data display).

## Locked columns

Columns that cannot be reordered, hidden, or moved between sections
are flagged via `ColumnItem.locked: true`. Locked columns:
- Render a lucide `Lock` icon as the `iconStart` instead of the
  `GripVertical` drag handle.
- Cannot initiate a drag (`pointer-down` handler returns early when
  the source row is locked).
- Cannot be dropped on as a target (the `findRowAtPoint` selector
  is `[data-drag-row]:not([data-locked])` — locked rows are
  invisible to the drop hit-test).
- Do not render the trailing Pin/PinOff toggle Button (pin state
  cannot be changed).
- Carry `aria-label="{label} (locked)"` so screen readers announce
  the locked state.
- If they somehow appear in the `hidden` array, the click-to-show
  handler is also a no-op (`showColumn` returns early for locked).

Typical use cases: primary identifier column, first content
column, business-critical columns required for table usability.

## Figma → Code mapping

| Figma property      | React prop      | Values / Notes                                  |
|---------------------|-----------------|--------------------------------------------------|
| type                | (always supported) | `normal` / `draggable` — both code paths are present; drag is always enabled via pointer events. Figma's `draggable` variant is a visual hint of the drag-handle / cursor; in code, every row has the grip handle and is draggable. |
| (shown column rows) | shown           | `{ id, label, pinned?, locked? }[]` — order in the array is the rendered order; `pinned` controls the pin icon state; `locked` flag fixes the column (no drag, no hide, no pin toggle). |
| (hidden column rows)| hidden          | `{ id, label, locked? }[]` |
| (lock icon)         | shown[].locked / hidden[].locked | When `true`, renders a lucide `Lock` icon as `iconStart` and disables drag + Pin + click-to-show. |
| (Pin toggle in row) | togglePin via shown[].pinned | Each Shown row exposes a ghost icon-only Button (Pin / PinOff icons) that toggles the column's pinned state. |
| (drag handle)       | (built-in)      | Each row renders a lucide `GripVertical` iconStart as the visual drag affordance. Pointer-down on the row starts the drag. |
| (Apply / Cancel)    | onApply / onCancel | Buttons in the footer. Both receive the staged `(shown, hidden)` payload. |
| —                   | onChange        | Live reorder callback fired on every state change before Apply. |
| —                   | className       | Root class extension.                            |

## Anatomy

- Root — `.dls-dropdown-columns` with `role="listbox"`.
- Title row — `<ListItem type="label" text="Show columns" />`
- Divider
- Shown section header — `<ListItem type="with-slots" text="Shown" slotRight={<Badge>{count}</Badge>} />`
- Shown rows — `<ListItem type="with-slots" interactive={false}>` per column
  - `iconStart` = lucide `GripVertical` (drag handle)
  - `text` = column label
  - `slotRight` = ghost icon-only Button (Pin / PinOff)
  - `data-drag-row`, `data-drag-section="shown"`, `data-drag-idx`,
    optional `data-dragging`, optional `data-drag-over`
- Divider
- Hidden section header — `<ListItem type="with-slots" text="Hidden" iconEnd={<EyeOff />} />`
- Hidden rows — `<ListItem type="with-slots" interactive={false}>` per column
  - `iconStart` = lucide `GripVertical`
  - `text` = column label
  - `onClick` = re-show the column (move it to the shown list)
- Divider
- Footer — `<ListItem type="buttons">` with outline `Cancel` + filled `Apply`

## Props / API

```ts
export interface ColumnItem {
  id: string;
  label: string;
  pinned?: boolean;
  /** Locked columns: cannot reorder, hide, or toggle pin. Render a
   *  Lock icon in place of the GripVertical handle. */
  locked?: boolean;
}

export interface DropdownColumnsProps {
  shown: ColumnItem[];
  hidden: ColumnItem[];
  onChange?: (shown: ColumnItem[], hidden: ColumnItem[]) => void;
  onApply?: (shown: ColumnItem[], hidden: ColumnItem[]) => void;
  onCancel?: () => void;
  className?: string;
}
```

## Tokens used

- `--dls-radius-component-list`, `--dls-radius-component-list-item`
- `--dls-color-surface-base` (panel + ListItem rows)
- `--dls-color-border-subtle`, `--dls-color-border-base`
- `--dls-shadow-surface-md` (panel)
- `--dls-shadow-surface-lg` (dragging row "lifts" with stronger shadow)
- `--dls-color-intent-info-subtle` (drag-over highlight)
- `--dls-state-hover-overlay` (row hover)
- `--dls-state-focus-ring-color`
- `--dls-spacing-1`, `--dls-spacing-2`
- `--dls-text-m-font-size`, `--dls-text-m-line-height`
- `--dls-font-weight-normal`, `--dls-font-weight-medium`
- `--dls-font-family`

## States

| State          | Figma representation       | Code implementation                              |
|----------------|----------------------------|---------------------------------------------------|
| default        | `type=normal`              | Static panel                                      |
| draggable      | `type=draggable`           | All rows have GripVertical handle and pointer-down listener |
| dragging row   | Figma drop-shadow `shadow/l` lift | `[data-dragging]` → opacity 0.5 (row going to its new home is visually de-emphasized) |
| drag-over target | Figma highlight on the receiving row | `[data-drag-over]` → info-subtle background |
| pinned         | Pin icon variant           | `shown[i].pinned=true` → Pin icon on the slotRight Button |
| locked         | Lock icon variant          | `shown[i].locked=true` (or `hidden[i].locked=true`) → lucide `Lock` icon replaces the GripVertical handle; pointer-down is a no-op; the row is excluded from the drop hit-test (`:not([data-locked])`); Pin Button is not rendered; row carries `aria-label="{label} (locked)"`. |

The drag implementation uses **pointer events** (not HTML5 native
drag) for reliable cross-browser, sandboxed-iframe, and
nested-interactive-element behavior — same pattern Linear / Notion /
Asana use for row reordering. The Pin button inside each row uses
its own `<button>` so clicking it doesn't start a drag (the
pointer-down handler explicitly checks `closest('button') !== row`).

Color transitions (overlay / box-shadow) are not spatial motion, so
no `prefers-reduced-motion` guard is required at this layer.

## Accessibility contract

- Root is `<div role="listbox">`.
- Each row is a `<ListItem>` with `interactive={false}` rendering as
  a `<div>` (NOT a button) — because rows hold a nested Pin button
  and we must avoid nesting `<button>` inside `<button>`.
- Non-locked rows are keyboard-focusable (`tabIndex={0}`) so users
  can tab through them. Locked rows are not focusable.
- The Pin toggle Button has `aria-label="Pin {label}"` /
  `"Unpin {label}"` so screen readers announce both the action and
  the target column.
- The Hidden section's rows use `onClick` to move the column back to
  Shown — clicking on the row body fires the handler. Keyboard:
  pressing **Enter** or **Space** on a focused Hidden row does the
  same thing.
- Footer Buttons are native `<button>`s with their visible labels.

### Keyboard reordering

Drag is **not** the only way to reorder. Each focused (non-locked)
row responds to:

| Key                    | Section | Action                                              |
|------------------------|---------|------------------------------------------------------|
| **Alt + ArrowUp**      | Both    | Move the row one position up. Locked rows in the path are skipped; the row jumps over them. If there is no valid destination (out of bounds), the row stays put. |
| **Alt + ArrowDown**    | Both    | Move the row one position down (same locked-skip rules). |
| **Enter** / **Space**  | Hidden  | Show the column — moves it to the end of the Shown list. Mirrors the click behavior. |
| **Delete**             | Shown   | Hide the column — moves it to the end of the Hidden list. The keyboard equivalent of dragging a row to the Hidden section. Locked columns are immune to Delete. |

After any reorder, focus follows the row to its new position via
`requestAnimationFrame(() => row.focus())` so consecutive presses
keep working without re-tabbing.

The row's keyboard handler ignores events that originated inside a
nested control (the Pin Button) so Pin's own keyboard handling
isn't disrupted. The Pin Button still has its own native
`:focus-visible` ring.

Focus ring on the row itself uses `--dls-state-focus-ring-color`
via a 2px `box-shadow` (not `outline`) — visible only on
`:focus-visible`.

## Composition rules

- Always render `DropdownColumns` as a SIBLING of the root
  `DropdownOptions` panel (not nested) so the parent menu stays
  visible. The TableTopBar `OptionsMenu` helper is the canonical
  example.
- Section headers should NOT be interactive — they're visual
  labels. Use `interactive={false}` on the header `<ListItem>`.
- Pin / PinOff icons come from `lucide-react`. Do not introduce a
  custom pin icon.
- The grip handle comes from `lucide-react` `GripVertical`.
- Apply / Cancel must be the LAST elements in the panel; don't put
  other actions after them.

## Known deviations

- The component spec mentions
  `--dls-color-component-dropdown-columns-*` tokens but those do not
  exist in `tokens.json`. The CSS uses semantic surface/border/state
  tokens directly. Backfilling deferred. (Low severity.)
- The Figma `type=draggable` variant is informational — in code, all
  non-locked rows are draggable. The variant is kept in Figma to
  document the drag affordance visually.

(Two previously documented deviations are now resolved:
- `ColumnItem.locked` is a first-class prop and the component
  enforces no-drag / no-hide / no-pin plus a Lock icon visual.
- Keyboard reordering is implemented via Alt+ArrowUp / Alt+ArrowDown
  with locked-row skipping, plus Enter/Space to show and Delete to
  hide. See the "Keyboard reordering" subsection of the
  accessibility contract above.)

## Code example

```tsx
import { DropdownColumns, type ColumnItem } from './dropdown-columns/DropdownColumns';

function Demo() {
  const [shown, setShown] = React.useState<ColumnItem[]>([
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email', pinned: true },
    { id: 'role', label: 'Role' },
  ]);
  const [hidden, setHidden] = React.useState<ColumnItem[]>([
    { id: 'phone', label: 'Phone' },
    { id: 'department', label: 'Department' },
  ]);

  return (
    <DropdownColumns
      shown={shown}
      hidden={hidden}
      onChange={(s, h) => { setShown(s); setHidden(h); }}
      onApply={(s, h) => {
        // commit to the table layout
        applyColumnConfig({ shown: s, hidden: h });
      }}
      onCancel={() => {
        // restore from upstream state if needed
      }}
    />
  );
}
```

## Cross-references

- [dropdown-options.md](dropdown-options.md)
- [dropdown-filters.md](../components/dropdown-filters.md)
- [dropdown-sorting.md](../components/dropdown-sorting.md)
- [dropdown-export.md](../components/dropdown-export.md)
- [dropdown-column-actions.md](../components/dropdown-column-actions.md)
- [list.md](../components/list.md)
- [list-item.md](../components/list-item.md)
- [badge.md](../components/badge.md)
- [button.md](../components/button.md)
- [table-top-bar.md](table-top-bar.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)
- [../foundations/motion.md](../foundations/motion.md)

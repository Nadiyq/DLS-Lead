# TableTopBar

Category: table / toolbar
React: <TableTopBar>
Spec: specs/components/table-top-bar.md
TSX: apps/storybook/src/stories/table-top-bar/TableTopBar.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-tabletopbar--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6120-13580

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a SIMULATION
of the code behavior, not the implementation.

This component uses: NONE. TableTopBar is a layout container. All
interactive behavior (hover/pressed/focus) lives on the composed
children — SearchField, Button, FilterChip, Dropdown, AvatarStack —
which each carry their own state contracts.
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Toolbar above a data table containing discovery / refinement
controls on the left (search, filter trigger), row-level actions on
the right (primary CTA, overflow menu, table-management buttons),
and an optional secondary filters row that toggles open on demand.

The separation is intentional: **left = find data**, **right = act
on data**. Maintain that contract across every consumer so the
toolbar reads predictably.

## Use when

- Above any data table that needs search, filtering, and row-level
  actions in one consistent surface.
- Inbox / list view headers that mix search with primary action(s).
- Settings or admin tables where the secondary filter row is
  toggled by a Filter icon button in the left slot.

## Do NOT use for

- Page-level navigation → use `TopBar`.
- Page-level primary headings → use a semantic `<h1>` outside the
  table region.
- Editor / canvas toolbars → use `Toolbar`.
- Form actions → use a form footer with a `ButtonGroup`.

## Figma → Code mapping

| Figma property      | React prop     | Values / Notes                                    |
|---------------------|----------------|----------------------------------------------------|
| slotLeft            | slotLeft       | Figma boolean toggles the left slot; in code, presence of the slotLeft ReactNode drives rendering. |
| slotLeftContent     | slotLeft       | Figma slot for the left content; pass SearchField + a Filter icon Button (and other discovery controls) here. |
| filter              | (composed)     | Figma boolean inside slotLeftContent toggles the canonical Filter icon button. In code, the consumer composes the filter trigger inside `slotLeft`. |
| slotRight           | slotRight      | Figma boolean toggles the right slot. |
| slotRightContent    | slotRight      | Figma slot for the right content; pass a primary Button + overflow icon-Button here. |
| button              | (composed)     | Figma boolean inside slotRightContent toggles the canonical primary Button. In code, the consumer composes it inside `slotRight`. |
| more                | (composed)     | Figma boolean inside slotRightContent toggles the canonical overflow icon-Button. In code, compose it inside `slotRight`. |
| showFilters         | showFilters    | Figma boolean toggles the secondary filters row. In code, also requires `filters` ReactNode to be provided. |
| (secondary slot)    | filters        | Figma `secondary` row content (filter chips, separators, add-filter trigger). |
| —                   | className      | Code-only root class extension.                    |

## Anatomy

- Root — `.dls-table-top-bar` (role="toolbar", aria-label)
- Main row — `.dls-table-top-bar__row` (bottom border)
  - Left — `.dls-table-top-bar__left` (flex: 1, hosts SearchField +
    Filter icon-Button typically)
  - Right — `.dls-table-top-bar__right` (flex-shrink: 0, hosts a
    primary Button + overflow icon-Button typically)
- Filters row — `.dls-table-top-bar__filters` (optional, bottom
  border, hosts a row of `FilterChip`s + separators + an add-filter
  trigger)

## Props / API

```ts
export interface TableTopBarProps {
  slotLeft?: React.ReactNode;
  slotRight?: React.ReactNode;
  showFilters?: boolean;
  filters?: React.ReactNode;
  className?: string;
}
```

## Tokens used

- `--dls-color-surface-base` (background)
- `--dls-color-border-subtle` (row bottom border)
- `--dls-spacing-2`, `--dls-spacing-3`, `--dls-spacing-4`
- `--dls-font-family`

All visual state on the contents (chips, buttons, search field)
comes from those components' own tokens.

## States

| State                 | Figma representation | Code implementation                  |
|-----------------------|----------------------|--------------------------------------|
| default               | `showFilters=false`  | Only the main row renders            |
| filters visible       | `showFilters=true`   | Both main row and filters row render |

No spatial motion. No `prefers-reduced-motion` guard required at
this layer — composed children that have transitions handle their
own motion contracts.

## Accessibility contract

- Root is `<div role="toolbar">` with `aria-label="Table toolbar"`.
  Consumers should override the label when the toolbar is bound to
  a specific table (e.g. `aria-label="Invoices toolbar"`).
- The Filter icon button in the left slot should expose `aria-expanded`
  / `aria-controls` pointing at the filters row when `showFilters` is
  driven by it. The filters row should set `id` matching that
  `aria-controls`.
- Search inputs inside the left slot must have a real `<label>` or
  `aria-label` ("Search").
- The right slot's primary Button uses its own visible label for the
  accessible name; overflow icon-only Buttons require `aria-label`
  ("More actions", "Sort", "Filter columns", etc.).
- Filter chips in the filters row are real `<button>` elements
  (composed via `FilterChip`) — they expose `aria-pressed` when
  the underlying filter is active.

## Composition rules

- **Left slot** — discovery / refinement only.
  - `SearchField` (typical, max-width ~340px).
  - Filter icon-`Button` (icon-only, `aria-label="Show filters"`,
    `aria-pressed={showFilters}` if it controls the row).
  - **Filters-active indicator** — when at least one filter is
    active, the Filter icon-Button gets a tiny red `BadgeIndicator`
    (`size="xs"`, `intent="danger"` — an 8px dot) positioned at the
    top-right corner (`top: 2px; right: 2px`). Wrap the Button in a
    `position: relative` span and absolute-position the indicator
    with `pointer-events: none` so it does not intercept clicks.
    Drive visibility off `activeFilters.length > 0`. The indicator
    is purely decorative — the `aria-pressed` on the Button already
    conveys the filter-state to assistive technology; add an explicit
    `aria-label="Filters active"` to the indicator only when extra
    affordance is desired.
  - Any other read-only controls that filter the view.
- **Right slot** — actions only.
  - One primary `Button` (filled, neutral or primary intent).
  - One overflow icon-`Button` (Ellipsis, `aria-label="More"`).
  - Avoid putting more than 2–3 affordances here — overflow into a
    Dropdown when there are more.
- **Filters row** — the canonical pattern is:
  1. Sort chip (label + chevron, opens `DropdownSorting`).
  2. Separator between sort and filters.
  3. One or more `FilterChip`s. Each chip has a label part
     (filter parameter, usually the column name) and a value part
     with chevron that opens a `Dropdown` of possible values.
  4. Add-filter icon-`Button` (Plus). Pass an `addMenu` ReactNode
     (or a `(close) => ReactNode` render-prop) to the `Filters`
     component to attach a popover containing a `<List>` of
     filterable columns. The Plus button becomes the trigger:
     `aria-haspopup="menu"`, `aria-expanded` follows open state,
     click toggles. The popover closes on click-outside, Escape,
     or any click on a `<ListItem>` inside. Each list-item's
     `onClick` should call the consumer-supplied "add this filter"
     handler and then `close()` (when using the render-prop form).
  
  A filter chip's label part also supports a disable/enable toggle
  (Eye icon), keeping the chip visible but inactive. The chip's
  value-side Dropdown includes a "Remove filter" item (Trash icon)
  at the end of the list for full removal.
- The TableTopBar component itself stays slot-only — the canonical
  Sort / FilterChip / DropdownSorting / DropdownFilters compositions
  live in their own components.

## Known deviations

- The component spec mentions `--dls-color-component-table-top-bar-*`
  tokens but those do not exist in `tokens.json`. The CSS uses
  semantic surface / border / spacing tokens directly. Backfilling a
  dedicated top-bar token group is deferred. (Low severity.)
- The Figma component embeds canonical default slot content
  (Search + Filter icon button on the left; primary Button + overflow
  on the right; full Filters row with sample chips). In code, those
  are *just defaults the consumer must compose explicitly* — the
  React component is purely slot-based. (Low severity — intentional.)

## Code example

```tsx
import { TableTopBar } from './table-top-bar/TableTopBar';
import { SearchField } from './search-field/SearchField';
import { Button } from './Button';
import { FilterChip } from './chip/FilterChip';
import { Filter as FilterIcon, MoreHorizontal as MoreIcon, Plus as PlusIcon } from 'lucide-react';

function InvoicesToolbar() {
  const [showFilters, setShowFilters] = React.useState(false);
  const filtersId = React.useId();

  return (
    <TableTopBar
      slotLeft={
        <>
          <SearchField placeholder="Search invoices..." />
          <Button
            variant="soft"
            intent="neutral"
            size="m"
            iconOnly
            icon={<FilterIcon />}
            aria-label="Show filters"
            aria-pressed={showFilters}
            aria-controls={filtersId}
            onClick={() => setShowFilters(v => !v)}
          />
        </>
      }
      slotRight={
        <>
          <Button variant="filled" intent="neutral" size="m" iconStart={<PlusIcon />}>
            Add invoice
          </Button>
          <Button variant="soft" intent="neutral" size="m" iconOnly icon={<MoreIcon />} aria-label="More actions" />
        </>
      }
      showFilters={showFilters}
      filters={
        <div id={filtersId} role="group" aria-label="Active filters">
          {/* Sort chip + separator + FilterChips + add-filter Plus button */}
        </div>
      }
    />
  );
}
```

## Cross-references

- [table.md](../components/table.md)
- [table-cell.md](../components/table-cell.md)
- [table-header-cell.md](../components/table-header-cell.md)
- [filters.md](../components/filters.md)
- [filter-chip.md](../components/filter-chip.md)
- [search-field.md](../components/search-field.md)
- [button.md](../components/button.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)
- [../foundations/motion.md](../foundations/motion.md)

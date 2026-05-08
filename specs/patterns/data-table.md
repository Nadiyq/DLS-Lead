---
name: Data Table Pattern
category: pattern
status: active
read_when:
  - building_table_screen
  - composing_crm_table
  - data_table_page
  - table_toolbar
  - table_columns
  - table_pagination
related:
  - composition.md
  - component-selection.md
  - ../components/table.md
  - ../components/table-cell.md
  - ../components/table-header-cell.md
  - ../components/table-top-bar.md
  - ../components/pagination.md
  - ../components/filters.md
  - ../components/dropdown-columns.md
  - ../components/dropdown-sorting.md
  - ../components/dropdown-column-actions.md
  - ../components/dropdown-export.md
  - ../components/dropdown-filters.md
  - ../components/search-field.md
  - ../components/badge.md
  - ../components/tabs.md
  - ../components/resizable.md
---

# Data Table Pattern

Best-practice composition rules for heavy data tables in CRM and operational SaaS screens. Every rule here maps to an existing DLS component — do not improvise custom markup.

---

## 1. Toolbar — Always Present

Every data table starts with `TableTopBar`. It is never optional.

### Left slot — Search is mandatory

- Always place `SearchField` in `slotLeft`.
- Search queries against all visible text columns by default.
- Debounce input; show a clear button when a query is active.

### Right slot — One primary action, then utilities

Order items right-to-left by importance:

| Position | Element | Component | Variant |
|---|---|---|---|
| 1 (rightmost) | Add entity | `Button` | `filled` (primary) |
| 2 | Export | `Button` (icon-only) → `DropdownExport` | `transparent` |
| 3 | Column settings | `Button` (icon-only) → `DropdownColumns` | `transparent` |
| 4 | Sort settings | `Button` (icon-only) → `DropdownSorting` | `transparent` |

**Only one `filled` primary button is allowed in the toolbar.** All other toolbar actions use `transparent` variant, icon-only where possible, with `aria-label`.

### Filter row

- Show the `Filters` component with `FilterChip` groups below the main toolbar row when filters are active.
- Use `DropdownFilters` for the "Add filter" picker.
- Filters should be applicable to any column — not a hardcoded subset.
- When no filters are active, collapse the row (do not show an empty strip).

---

## 2. Column Management

### Visibility and order — `DropdownColumns`

- Users must be able to hide, show, and reorder columns.
- Open from the column-settings icon in the toolbar.
- Changes apply on explicit confirm (Cancel / Apply), not live.
- Show a "Shown" section (draggable) and a "Hidden" section.

### Per-column actions — `DropdownColumnActions`

- Right-click or click the header cell chevron to open the column action menu.
- Actions: sort asc, sort desc, filter by this column, pin/unpin, move left, move right, hide.
- Disable move-left on the first column, move-right on the last.

### Pinning

- Users can pin columns from `DropdownColumns` or `DropdownColumnActions`.
- Pinned columns stick to the left edge during horizontal scroll.
- Visually differentiate pinned columns with a subtle right border (use `--dls-color-border-subtle`).

### Resizing — `Resizable`

- Each column boundary has a `Resizable` drag handle.
- Double-click the handle to auto-fit column width to content.
- Enforce a minimum column width (never collapse below readable width — at least 80px for data columns, 48px for checkbox/actions).
- The grip appears on hover over the column border; cursor changes to `col-resize`.

---

## 3. Sorting

### Header-cell sort

- Use `TableHeaderCell` with `sortable` and `sortDirection` props.
- Click the header text to cycle: none → ascending → descending → none.
- Only one column sorted at a time (for CRM defaults). If multi-sort is needed, compose with `DropdownSorting`.

### Sort indicator

- Active sort column shows `ArrowUp` or `ArrowDown`.
- Inactive sortable columns show `ArrowUpDown` (neutral).

---

## 4. Filtering

### Filter model

- Every visible column should be filterable. Use `DropdownColumnActions → onFilter` or the toolbar `Filters` row.
- Common filter types by column data:
  - Text columns → contains / starts with / exact match
  - Status/enum columns → multi-select from known values
  - Date columns → range picker
  - Number columns → range (min/max)
- Active filters appear as `FilterChip` chips in the `Filters` row.
- Each chip shows the column name and the active condition. Clicking opens the filter editor; X clears it.

### Clear all

- When 2+ filters are active, show a "Clear all" link or button at the end of the filter row.

---

## 5. Row Content Rules

### Single-line default

- **One line per cell is the standard.** Every cell should fit its content on a single row.
- Use `TableCell type="text"` for the common case.
- Truncate with ellipsis when content overflows. Show full content on hover via `Tooltip`.

### Two-line exception

- Two-line cells (`TableCell type="two-line"`) are allowed but not recommended.
- Use only when the secondary line adds essential context that cannot be shown elsewhere (e.g., name + email, name + role).
- Never use two-line for all columns — limit to 1-2 columns max per table.

### Content hierarchy within a cell

| Slot | Use for | Example |
|---|---|---|
| `slotLeft` | Avatar, checkbox, icon | User photo, row selector |
| Primary text | Main data point | "Acme Corporation" |
| Secondary text (two-line only) | Supporting detail | "acme@example.com" |
| `slotRight` | Micro-action or indicator | Copy icon, external link |

---

## 6. Badge Usage — Status Only

- `Badge` is exclusively for status columns.
- Map entity lifecycle states to intents:

| Status meaning | Intent | Variant |
|---|---|---|
| Active, complete, paid | `success` | `soft` or `ghost` |
| Pending, in progress, review | `info` | `soft` or `ghost` |
| Warning, expiring, overdue | `warning` | `soft` or `ghost` |
| Failed, rejected, cancelled | `danger` | `soft` or `ghost` |
| Draft, inactive, archived | `neutral` | `soft` or `ghost` |

- **Maximum 2 badge columns per table.** If you need more categorical labels, use plain text.
- Prefer `soft` or `ghost` variant to keep the table visually calm. Reserve `filled` badges for dashboards, not tables.
- Do not use badges for IDs, counts, categories, tags, or any non-status data.

---

## 7. Visual Hierarchy and Cognitive Load

### Color restraint

- The table body should be predominantly neutral. Only status badges and the primary action button introduce color.
- Do not colorize row text, cell backgrounds, or icons by category. If you need to distinguish categories, use text labels or a leading icon — not color.
- Selected-row highlighting uses the documented `--dls-color-component-table-row-bg-selected` token. No custom highlight colors.

### Typography hierarchy

- Header cells: use the documented header-cell token (typically medium-weight, smaller size, muted foreground).
- Primary cell text: regular weight, standard foreground.
- Secondary cell text (two-line): smaller size, muted foreground.
- Never bold entire columns. Bold is only for the primary identifier column (e.g., name/title) if needed.

### Density

- Stick to the documented table row height. Do not add extra vertical padding.
- Use `--dls-spacing-2` or `--dls-spacing-3` for inner cell padding — match what the component provides.
- Consistent row height across all rows. Never let cell content push rows to variable heights.

### Information prioritization

- Left-to-right importance: identifier → key attributes → status → secondary attributes → actions.
- The first column (or first after checkbox) is the primary identifier — it may be clickable (link to detail page).
- Actions column is always last (rightmost).
- Columns users rarely need should be hidden by default (available through `DropdownColumns`).

---

## 8. Row Selection

- When bulk operations are needed, add a checkbox column as the first column.
- Use `TableHeaderCell type="control"` with a "select all" `Checkbox`.
- Use `TableCell` with `slotLeft={<Checkbox />}`.
- When rows are selected, show a contextual bulk-action bar (e.g., "3 selected — Delete, Export, Assign").
- "Select all" selects the current page. If all-pages selection is needed, show a banner: "All 25 on this page selected. Select all 1,204?"

---

## 9. Pagination

### When to use pagination vs. infinite scroll

| Context | Recommendation |
|---|---|
| Admin/CRM tables, reports, audit logs | **Pagination** — users need to reference "page 3," share positions, and navigate non-linearly |
| Activity feeds, timelines, chat history | **Infinite scroll** — chronological consumption, no need to jump to a specific page |
| Mixed or uncertain | Default to **pagination** — it is more predictable and less error-prone for data-heavy screens |

### Pagination rules

- Use the `Pagination` component below the table.
- Show items-per-page selector (10, 25, 50, 100).
- Show total count: "Showing 1-25 of 1,204".
- Default to 25 rows per page for CRM tables.
- Preserve filter, sort, and search state across page changes.
- On filter/search change, reset to page 1.

### Infinite scroll rules (when chosen)

- Load the next batch when the user scrolls within 200px of the bottom.
- Show `Spinner` at the bottom during load.
- Provide a "Back to top" affordance after 3+ batches.
- Still show total count at the top if known.

---

## 10. Tabs and Summary Cards as Filters

### Tabs above the table

- Use `Tabs type="pill"` for mutually exclusive view filters (e.g., "All", "Active", "Archived").
- Tabs sit above `TableTopBar`, not inside it.
- Each tab applies a predefined filter. The active filter state should be reflected in both the tab selection and the `Filters` row.
- **Maximum 5-6 tabs.** Beyond that, move the options into a `Dropdown` or the filter row.

### Summary cards

- Optional row of `Card` components above the table showing aggregate metrics (e.g., "142 Active", "23 Overdue").
- Clicking a summary card applies the corresponding filter to the table.
- Highlight the active card with selected state.
- **Maximum 4-5 cards.** More creates horizontal scroll and cognitive overhead.
- Cards sit above tabs (if both exist): Cards → Tabs → TableTopBar → Table → Pagination.

### Hierarchy caution

- Do not use both tabs AND summary cards unless the table serves as a primary operational view (e.g., main CRM pipeline).
- If using both, ensure they filter orthogonal dimensions (e.g., cards = status, tabs = entity type) to avoid confusion.

---

## 11. Empty and Loading States

### Empty state

- Use `EmptyState` inside the table area when no rows match.
- Differentiate between:
  - **No data ever**: "No contacts yet. Add your first contact." + primary `Button`.
  - **No results for filters/search**: "No results match your filters." + "Clear filters" `Button`.

### Loading state

- Use `Skeleton` rows matching the expected column layout.
- Show 5-10 skeleton rows regardless of expected data count.
- Never show a spinner over the table body (use `Skeleton` rows instead).

---

## 12. Responsive Behavior

- On narrow viewports, hide non-essential columns and show a "Show columns" control.
- Pinned + identifier columns stay visible; secondary columns collapse first.
- If the table cannot fit on mobile, consider switching to a `Card`-based list layout below a breakpoint rather than forcing horizontal scroll.
- The toolbar stacks vertically on narrow screens: search on top, actions below.

---

## 13. Keyboard and Accessibility

- Table uses semantic `role="grid"` or native `<table>` markup.
- Arrow keys navigate between cells.
- Enter on a sortable header toggles sort.
- Tab moves focus through toolbar controls, then into the table, then to pagination.
- Row actions are reachable via keyboard (Tab within the row or via a roving tabindex).
- Screen readers should announce: column header, cell content, sort state, filter state, selected-row count, and pagination position.

---

## Assembly Order

The full data-table screen stacks in this order:

```
[Summary Cards]          ← optional, Card components
[Tabs]                   ← optional, Tabs type="pill"
[TableTopBar]            ← mandatory: SearchField + actions + Filters
[Table]                  ← mandatory: TableHeaderCell + TableCell rows
[Pagination]             ← mandatory for paged data
```

---

## Anti-Patterns

| Do not | Instead |
|---|---|
| Color-code rows by category | Use text labels or a single badge column |
| Use badges for non-status data (IDs, counts, tags) | Use plain text or `ChipRegular` |
| Put 3+ lines in a cell | Split into separate columns or use a detail panel |
| Add multiple primary buttons to toolbar | One `filled` button; others are `transparent` |
| Let row height vary by content | Enforce consistent row height; truncate with ellipsis |
| Show all columns by default | Start with essential columns; let users add more |
| Use custom dropdown/menu markup | Use `List` + `ListItem` for every menu |
| Build sort/filter UI from scratch | Use `DropdownSorting`, `DropdownColumnActions`, `Filters` + `FilterChip` |
| Place pagination inside the table | Place `Pagination` below the table |
| Use `filled` badges in table cells | Use `soft` or `ghost` to keep the table calm |

---

## Cross-References

- [composition.md](composition.md)
- [component-selection.md](component-selection.md)
- [../components/table.md](../components/table.md)
- [../components/table-top-bar.md](../components/table-top-bar.md)
- [../components/table-header-cell.md](../components/table-header-cell.md)
- [../components/table-cell.md](../components/table-cell.md)
- [../components/pagination.md](../components/pagination.md)
- [../components/filters.md](../components/filters.md)
- [../components/dropdown-columns.md](../components/dropdown-columns.md)
- [../components/dropdown-sorting.md](../components/dropdown-sorting.md)
- [../components/dropdown-column-actions.md](../components/dropdown-column-actions.md)
- [../components/dropdown-export.md](../components/dropdown-export.md)
- [../components/dropdown-filters.md](../components/dropdown-filters.md)
- [../components/search-field.md](../components/search-field.md)
- [../components/badge.md](../components/badge.md)
- [../components/tabs.md](../components/tabs.md)
- [../components/resizable.md](../components/resizable.md)
- [../components/empty-state.md](../components/empty-state.md)

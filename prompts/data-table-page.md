---
name: Data Table Page Prompt
category: prompts
status: active
use_when:
  - data_table_screen
  - filters
  - admin_dashboard
---

# Data Table Page Prompt

Use this when asking an agent to build dense operational screens: tables, filters, row actions, bulk actions, and empty states.

```text
Build `[data table page name]` in `[route/file path]` using DLS-Lead.

Before implementing:
- Read `specs/session-start.md`.
- Read `specs/tokens/README.md`, `specs/tokens/token-reference.md`, `specs/foundations/spacing.md`, `specs/foundations/color.md`, `specs/foundations/accessibility.md`, `specs/foundations/grid.md`, `specs/patterns/component-selection.md`, and `specs/patterns/composition.md`.
- Use the `dls-lead-storybook` MCP server:
  - run `list-all-documentation`
  - run `get-documentation` for `Table`, `TableColumn`, `Button`, `InputField` or `SearchField`, `Dropdown`, `FilterChip`, `Badge`, `List`, `ListItem`, `EmptyState`, and any documented table toolbar components
  - use `get-documentation-for-story` for filter, empty, selected, pagination, and row-action examples

Screen requirements:
- Build a data table with toolbar search, filters, column controls, row actions, pagination, loading/empty states if documented, and status badges.
- Use the DLS `Table` and `TableColumn` components for tabular data. Do not build tables from div grids.
- Use `FilterChip` for visible active filters.
- Use `Badge` for status, intent, or metadata pills.
- Use `Dropdown`, `List`, and `ListItem` for filter menus, column menus, export menus, and row action menus.
- Every menu row must be a documented `ListItem` type. No custom menu row markup.
- Use `Button` for toolbar and row actions; icon-only buttons need `aria-label`.

Token constraints:
- Toolbar and table surfaces use `--dls-color-surface-base` or `--dls-color-surface-subtle`.
- Table headers use documented table tokens such as `--dls-color-component-table-header-bg`, `--dls-color-component-table-header-fg`, and `--dls-color-component-table-header-border`.
- Selected rows use documented table selected-row tokens such as `--dls-color-component-table-row-bg-selected`.
- Dividers and table borders use `--dls-color-border-subtle` or documented table component tokens.
- Dense gaps use `--dls-spacing-1`, `--dls-spacing-2`, and `--dls-spacing-3`; page-level rhythm uses `--dls-spacing-6` and `--dls-spacing-8`.

Implementation constraints:
- Keep columns stable; do not allow row height or column width to jump on hover/focus.
- Use `min-width: 0` and ellipsis patterns for long content when the documented component supports it.
- Preserve semantic table accessibility.
- Do not hardcode visual values or invent tokens.
- If a needed table feature is not documented, stop and ask.
- Before finishing, run type checks and any available Storybook tests.
```


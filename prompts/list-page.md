---
name: List Page Prompt
category: prompts
status: active
use_when:
  - list_view
  - card_grid
  - searchable_list
  - directory_page
  - browse_page
---

# List Page Prompt

Use this when asking an agent to build a browse page — searchable list, card grid, directory, or item feed.

```text
Build `[list page name]` in `[route/file path]` using DLS-Lead.

Before implementing:
- Read `specs/session-start.md`.
- Read `specs/tokens/README.md`, `specs/tokens/token-reference.md`, `specs/foundations/spacing.md`, `specs/foundations/color.md`, `specs/foundations/typography.md`, `specs/foundations/accessibility.md`, `specs/foundations/grid.md`, and `specs/patterns/composition.md`.
- Use the `dls-lead-storybook` MCP server:
  - run `list-all-documentation`
  - run `get-documentation` for `Card`, `Item`, `List`, `ListItem`, `SearchField`, `Button`, `Badge`, `Avatar`, `EmptyState`, `Skeleton`, `Pagination`, `Tabs`, `ChipRegular`, and any other component you plan to use
  - if a component is not documented, stop and ask before substituting

Screen requirements:
- Use `SearchField` for the search bar, not a custom input.
- Use `ChipRegular` for active filter tags that can be removed.
- Use `Card` for card-grid layouts. Use `Item` or `List` + `ListItem` for list layouts.
- Use `Avatar` inside list/card items for user or entity images, not custom thumbnails.
- Use `Badge` for status or category indicators.
- Use `EmptyState` for zero-result or empty-list states.
- Use `Skeleton` for loading placeholders.
- Use `Pagination` for paged results when applicable.
- Use `Tabs` for switching between list views (e.g., "All", "Active", "Archived").
- Use `lucide-react` icons only, aliased with an `Icon` suffix.

Token constraints:
- Page background uses `--dls-color-surface-base`.
- Card surfaces use `--dls-color-component-card-bg` and `--dls-radius-component-card`.
- Grid gaps use `--dls-spacing-4` or `--dls-spacing-6`.
- List items use documented list-item tokens for hover, selected, and divider states.
- Search and filter bar spacing uses `--dls-spacing-3` or `--dls-spacing-4`.

Implementation constraints:
- Do not create custom card or list-item markup. Use documented DLS components.
- Do not use inline visual styles.
- Do not hardcode hex, rgba, px spacing, radius, or shadow values.
- Use CSS Grid with `auto-fill` / `minmax` for responsive card grids. Do not invent breakpoint tokens.
- Before finishing, run type checks and any available Storybook tests.
```

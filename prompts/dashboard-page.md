---
name: Dashboard Page Prompt
category: prompts
status: active
use_when:
  - dashboard_screen
  - overview_page
  - kpi_stats
  - analytics_ui
---

# Dashboard Page Prompt

Use this when asking an agent to build an overview or analytics dashboard — stat cards, summary grids, recent-activity lists, and chart placeholders.

```text
Build `[dashboard page name]` in `[route/file path]` using DLS-Lead.

Before implementing:
- Read `specs/session-start.md`.
- Read `specs/tokens/README.md`, `specs/tokens/token-reference.md`, `specs/foundations/spacing.md`, `specs/foundations/color.md`, `specs/foundations/typography.md`, `specs/foundations/grid.md`, `specs/foundations/accessibility.md`, and `specs/patterns/composition.md`.
- Use the `dls-lead-storybook` MCP server:
  - run `list-all-documentation`
  - run `get-documentation` for `Card`, `Text`, `Badge`, `Button`, `Tabs`, `ProgressBar`, `Spinner`, `Skeleton`, `IconShape`, `Avatar`, `AvatarStack`, `Separator`, and any other component you plan to use
  - if a component is not documented, stop and ask before substituting

Screen requirements:
- Use `Card` for each stat/KPI/summary block. Do not build custom card containers.
- Use `Text` for stat labels, values, and section headings.
- Use `Badge` for status indicators attached to metrics.
- Use `IconShape` for semantic metric icons, not raw SVGs.
- Use `ProgressBar` for completion or quota indicators.
- Use `Skeleton` for loading states instead of custom shimmer.
- Use `Tabs` for switching between dashboard views when multiple perspectives exist.
- Use `Separator` between logical sections, not custom borders.
- Use `lucide-react` icons only, aliased with an `Icon` suffix.
- Chart containers should be empty slots with correct spacing; do not fabricate chart markup.

Token constraints:
- Page background uses `--dls-color-surface-base` or `--dls-color-surface-subtle`.
- Card surfaces use `--dls-color-component-card-bg` and `--dls-radius-component-card`.
- Stat values use `--dls-color-text-primary` at heading scale; labels use `--dls-color-text-secondary` at body scale.
- Trend indicators use intent tokens: `--dls-color-intent-success-text` for positive, `--dls-color-intent-danger-text` for negative.
- Grid gaps use `--dls-spacing-4` or `--dls-spacing-6`; internal card padding uses `--dls-spacing-4`.
- Shadows use documented elevation tokens such as `--dls-shadow-surface-sm`.

Implementation constraints:
- Do not create custom visual classes outside the `.dls-*` naming model.
- Do not use inline visual styles.
- Do not hardcode hex, rgba, px spacing, radius, or shadow values.
- Use CSS Grid or flexbox with tokenized gaps for dashboard layout. Do not invent grid tokens.
- Before finishing, run type checks and any available Storybook tests.
```

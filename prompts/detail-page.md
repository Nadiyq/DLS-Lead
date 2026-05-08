---
name: Detail Page Prompt
category: prompts
status: active
use_when:
  - detail_screen
  - profile_page
  - entity_view
  - record_detail
---

# Detail Page Prompt

Use this when asking an agent to build an entity detail or profile page — header with avatar, tabbed sections, metadata, activity feeds, and related items.

```text
Build `[detail page name]` in `[route/file path]` using DLS-Lead.

Before implementing:
- Read `specs/session-start.md`.
- Read `specs/tokens/README.md`, `specs/tokens/token-reference.md`, `specs/foundations/spacing.md`, `specs/foundations/color.md`, `specs/foundations/typography.md`, `specs/foundations/accessibility.md`, and `specs/patterns/composition.md`.
- Use the `dls-lead-storybook` MCP server:
  - run `list-all-documentation`
  - run `get-documentation` for `Tabs`, `Card`, `Text`, `Avatar`, `Badge`, `Button`, `Breadcrumbs`, `Item`, `List`, `ListItem`, `Separator`, `Tooltip`, and any other component you plan to use
  - if a component is not documented, stop and ask before substituting

Screen requirements:
- Build a detail page with a header section (avatar, name, status, actions) and a tabbed or sectioned body.
- Use `Avatar` for the entity image or initials, not a custom image wrapper.
- Use `Breadcrumbs` for hierarchical context above the header.
- Use `Tabs` for switching between detail sections such as overview, activity, and settings.
- Use `Card` for grouped content sections within each tab.
- Use `Item` for standalone content rows in metadata or activity feeds.
- Use `Badge` for entity status or metadata tags.
- Use `Tooltip` for truncated or supplementary info on hover.
- Use `Button` for page-level actions (edit, delete, share); icon-only buttons need `aria-label`.
- Use `lucide-react` icons only, aliased with an `Icon` suffix.

Token constraints:
- Header background uses `--dls-color-surface-subtle` or `--dls-color-surface-muted`.
- Entity name uses `--dls-color-text-primary` at heading scale; metadata uses `--dls-color-text-secondary`.
- Section spacing uses `--dls-spacing-6` or `--dls-spacing-8` between major blocks; `--dls-spacing-3` or `--dls-spacing-4` within cards.
- Borders use `--dls-color-border-subtle`.
- Tab panels use `--dls-color-surface-base`.

Implementation constraints:
- Do not create custom visual classes outside the `.dls-*` naming model.
- Do not use inline visual styles.
- Do not hardcode hex, rgba, px spacing, radius, or shadow values.
- Before finishing, run type checks and any available Storybook tests.
```

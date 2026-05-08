---
name: Navigation Shell Prompt
category: prompts
status: active
use_when:
  - app_shell
  - layout_scaffold
  - sidebar_topbar_layout
  - nav_frame
---

# Navigation Shell Prompt

Use this when asking an agent to build the app-level navigation shell — sidebar, top bar, and main content area.

```text
Build `[app shell / layout name]` in `[route/file path]` using DLS-Lead.

Before implementing:
- Read `specs/session-start.md`.
- Read `specs/tokens/README.md`, `specs/tokens/token-reference.md`, `specs/foundations/spacing.md`, `specs/foundations/color.md`, `specs/foundations/accessibility.md`, `specs/foundations/z-index.md`, `specs/foundations/breakpoints.md`, `specs/foundations/grid.md`, and `specs/patterns/composition.md`.
- Use the `dls-lead-storybook` MCP server:
  - run `list-all-documentation`
  - run `get-documentation` for `Sidebar`, `SidebarItem`, `Submenu`, `TopBar`, `Avatar`, `Breadcrumbs`, `Badge`, and `Button`
  - run `get-documentation-for-story` for Sidebar Interactive and TopBar layout examples
  - if a component is not documented, stop and ask before substituting

Screen requirements:
- Use `Sidebar` for the primary vertical navigation panel. Choose a documented variant (1–4).
- Use `SidebarItem` for every nav entry. Types: `simple` for links, `collapsible` for sections, `big-icon` for workspace/account switchers.
- Use `Submenu` for expandable nav groups wrapping child `SidebarItem` elements.
- Use `TopBar` for the app header bar. Choose a documented type (1–3).
- Use `Avatar` in the `TopBar` and `Sidebar` account slots, not custom image elements.
- Use `Breadcrumbs` for page-level context above the main content area.
- Support sidebar collapsed state (icon-only mode) with the `collapsed` prop.
- Use `lucide-react` icons only, aliased with an `Icon` suffix.
- Icon-only buttons and collapsed nav items need `aria-label` or `title`.

Token constraints:
- Sidebar surface uses `--dls-color-component-sidebar-bg`.
- TopBar surface uses `--dls-color-component-top-bar-bg`.
- Main content area uses `--dls-color-surface-base`.
- Active nav item uses documented sidebar-item active tokens.
- Sidebar/content divider uses `--dls-color-border-subtle`.
- Sidebar width and collapsed width should use tokenized spacing or component tokens if available; do not hardcode px widths as magic numbers.

Implementation constraints:
- Do not create custom nav item markup. Every nav entry must be a `SidebarItem`.
- Do not layer custom classes on `Sidebar` or `TopBar`.
- Use CSS Grid or flexbox for the shell layout (sidebar + main), not absolute positioning.
- Landmarks: `<nav>` for sidebar, `<header>` for top bar, `<main>` for content.
- Do not hardcode hex, rgba, px spacing, radius, or shadow values.
- Before finishing, run type checks and any available Storybook tests.
```

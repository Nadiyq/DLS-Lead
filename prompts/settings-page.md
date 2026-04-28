---
name: Settings Page Prompt
category: prompts
status: active
use_when:
  - settings_screen
  - sidebar_layout
  - account_admin_ui
---

# Settings Page Prompt

Use this when asking an agent to build a SaaS settings page with DLS-Lead components.

```text
Build `[settings page name]` in `[route/file path]` using DLS-Lead.

First follow the base DLS-Lead contract:
- Read `specs/session-start.md`.
- Read `specs/tokens/README.md`, `specs/tokens/token-reference.md`, `specs/foundations/spacing.md`, `specs/foundations/color.md`, `specs/foundations/typography.md`, `specs/foundations/accessibility.md`, `specs/foundations/grid.md`, and `specs/patterns/composition.md`.
- Use the `dls-lead-storybook` MCP server:
  - run `list-all-documentation`
  - run `get-documentation` for `Sidebar`, `SidebarItem`, `Card`, `Text`, `Button`, `InputField`, `Dropdown`, `Tabs`, and any other component you plan to use
  - if a component is not documented, stop and ask before substituting

Screen requirements:
- Create a settings screen with left sidebar navigation and a main content area.
- Sidebar items should use documented DLS sidebar components, not custom nav rows.
- Main sections should use documented structural components such as `Card`, `Text`, `InputField`, `Dropdown`, `Button`, and `Tabs` when available.
- Use `lucide-react` icons only, aliased with an `Icon` suffix.
- Use icon-only buttons only with `aria-label`.
- Use native form labels, hints, errors, and disabled states as documented.

Token constraints:
- Backgrounds use semantic surface tokens such as `--dls-color-surface-base`, `--dls-color-surface-subtle`, and `--dls-color-surface-muted`.
- Text uses `--dls-color-text-primary`, `--dls-color-text-secondary`, and `--dls-color-text-disabled`.
- Borders use `--dls-color-border-base` or `--dls-color-border-subtle`.
- Spacing uses the closed scale: `--dls-spacing-2`, `--dls-spacing-3`, `--dls-spacing-4`, `--dls-spacing-6`, `--dls-spacing-8`.
- Component shape uses component radius tokens such as `--dls-radius-component-card`, `--dls-radius-component-input`, and `--dls-radius-component-button`.

Implementation constraints:
- Do not create custom visual classes outside the `.dls-*` naming model.
- Do not use inline visual styles.
- Do not use raw hex, rgba, px spacing, ad hoc radius, or invented tokens.
- Keep layout responsive with tokenized spacing and `min-width: 0`; do not invent global breakpoint tokens.
- Before finishing, run available type checks and Storybook tests if the repo provides them.
```


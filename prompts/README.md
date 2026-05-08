---
name: DLS-Lead Prompt Library
category: prompts
status: active
---

# DLS-Lead Prompt Library

Copy these prompts into Claude, Cursor, Codex, or another coding agent when you want generated UI to stay inside DLS-Lead. Each prompt tells the agent to read the repo specs, use the `dls-lead-storybook` MCP server, and choose from documented DLS components and tokens.

## How To Use

1. Start Storybook if the prompt involves UI components:

   ```bash
   npm run storybook
   ```

2. Connect the agent to the Storybook MCP endpoint:

   ```text
   http://127.0.0.1:6006/mcp
   ```

3. Paste [base-agent-contract.md](base-agent-contract.md) first for a new session, then paste the task prompt.
4. Replace placeholders like `[screen name]`, `[Figma URL]`, and `[route/file path]`.

## Prompt Index

| Task | Prompt |
|---|---|
| Start any DLS UI coding session | [base-agent-contract.md](base-agent-contract.md) |
| Build a settings page with sidebar layout | [settings-page.md](settings-page.md) |
| Build a data table page with filters/actions | [data-table-page.md](data-table-page.md) |
| Build a form or dialog workflow | [form-dialog.md](form-dialog.md) |
| Build a dropdown, menu, or popover list | [dropdown-menu.md](dropdown-menu.md) |
| Scaffold/update a component from Figma | [component-scaffold-from-figma.md](component-scaffold-from-figma.md) |
| Audit and fix an existing component | [audit-fix-component.md](audit-fix-component.md) |
| Add or extend tokens safely | [token-addition.md](token-addition.md) |
| Build a dashboard with KPI cards and charts | [dashboard-page.md](dashboard-page.md) |
| Build an entity detail or profile page | [detail-page.md](detail-page.md) |
| Build login, signup, or OTP screens | [auth-flow.md](auth-flow.md) |
| Build an app shell with sidebar and top bar | [nav-shell.md](nav-shell.md) |
| Build a searchable list or card grid page | [list-page.md](list-page.md) |
| Build messaging, chat, or notification UI | [messaging-ui.md](messaging-ui.md) |

## Non-Negotiables Baked Into These Prompts

- Read `specs/session-start.md` first.
- Read `specs/tokens/README.md` and `specs/tokens/token-reference.md` before choosing values.
- Use `dls-lead-storybook` tools before using a component.
- Use only documented props, variants, states, and examples.
- Use DLS tokens: no raw hex, raw rgba, ad hoc spacing, ad hoc radii, or invented token names.
- Use `data-*` attributes and native states for variants and state.
- Use `lucide-react` icons only.
- Use semantic HTML, accessible names, keyboard behavior, ARIA state relationships, and `prefers-reduced-motion` guards for spatial motion.
- Test user-facing interactive UI with `getByRole` and accessible name, not `getByTestId`.
- Use the official Figma MCP for Figma work; do not use Figma console.

## When To Stop

Tell the agent to stop and ask if:

- Storybook does not document the component, prop, variant, size, or state it wants to use.
- A needed token does not exist in `tokens/tokens.json` or `specs/tokens/`.
- A new component is needed but no Figma URL is provided.
- A design requires a global breakpoint or z-index scale that DLS-Lead does not currently publish.

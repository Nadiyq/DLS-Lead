# DLS Lead Agents

When working on UI components in this repo, read the repo-local specs first and then use the `dls-lead-storybook` MCP server before answering or making component changes.

- Start with `specs/session-start.md`.
- Read `specs/tokens/README.md` for the token spec map.
- Read `specs/tokens/token-reference.md` before choosing tokens.
- Read the relevant files in `specs/foundations/`, `specs/patterns/`, and `specs/components/` before changing UI.
- Reusable copy-paste prompts for DLS-safe UI work live in `prompts/`. Start with `prompts/base-agent-contract.md` when a session needs prompt scaffolding.

- Run `list-all-documentation` first to discover existing DLS components and docs pages.
- Run `get-documentation` before using a component so you only rely on documented props, variants, sizes, and examples.
- Run `get-documentation-for-story` when the top-level component docs are not enough to understand a specific state or usage pattern.
- Run `get-storybook-story-instructions` before creating or editing stories so new stories follow Storybook's current MCP guidance.
- Run `run-story-tests` after UI changes when Storybook test tools are available.
- Never invent props or variants for DLS components. If a prop or state is not documented in Storybook, stop and ask instead of guessing.

Operational notes:

- Start Storybook with `npm run storybook` before using the MCP server.
- The DLS Lead Storybook MCP endpoint runs at `http://127.0.0.1:6006/mcp`.
- The server name is standardized across configs as `dls-lead-storybook`.
- The `specs/` directory is the repo-local LLM-readable design-system layer. Do not guess around it.
- The `prompts/` directory is the repo-local prompt library for Claude, Cursor, Codex, and other coding agents.

# DLS-Lead

This repository uses a 4-layer design token architecture.

## Token Architecture

`Layer 1` primitives use raw values such as hex, rgba, spacing, radius, and typography scales.

`Layer 2` semantic tokens map those primitives into UI meaning such as surface, text, border, and intent roles.

`Layer 3` state abstraction is a hybrid model:
- In code, interactive state colors use `OKLCH` relative color syntax with numeric lightness deltas.
- In Figma, the same states are represented with opacity overlays for tooling compatibility.

This means the system is **not** purely hex-based. Base tokens may be hex/rgba, but hover and pressed behavior in code is defined by OKLCH state transforms.

## Canonical State-Layer Files

- `tokens/tokens.scss` defines Layer 3 state constants such as `$dls-state-l-delta-hover` and `$dls-state-l-delta-pressed`.
- `tokens/tokens.json` documents `state.lDelta.hover` and `state.lDelta.pressed` in the token source.
- `tokens/tokens.ts` exports the same state model for code consumers.
- `tokens/tokens.css` publishes the generated CSS custom properties.
- `apps/storybook/src/stories/button.css` and other component stylesheets apply the deltas with `oklch(from <base> calc(l + delta) c h)`.

## Source Of Truth

When describing this design system, use the following summary:

> DLS-Lead uses hex/rgba primitives plus an OKLCH-based state layer for hover and pressed interactions in code, with Figma overlay equivalents for design tooling.

## NPM Package For Tokens

The root package, `dls-design-tokens`, is configured as a publishable npm package for the token layer. The package intentionally publishes the canonical token JSON, generated CSS/SCSS/TS token outputs, LLM-readable specs, prompts, and AI consumption docs.

Install:

```bash
npm install dls-design-tokens
```

Package entry points:

| Path | Purpose |
|---|---|
| `dls-design-tokens` | Canonical DTCG token JSON |
| `dls-design-tokens/tokens.json` | Explicit token JSON import |
| `dls-design-tokens/tokens.css` | CSS custom properties |
| `dls-design-tokens/tokens.scss` | SCSS token output |
| `dls-design-tokens/tokens.ts` | TypeScript token source |
| `dls-design-tokens/ai` | AI agent consumption guide |
| `dls-design-tokens/specs/...` | LLM-readable design-system specs |
| `dls-design-tokens/prompts/...` | Copy-paste agent prompts |

AI agents should read [docs/ai-agent-token-consumption.md](docs/ai-agent-token-consumption.md) before generating UI from the npm package. The short version:

1. Read `tokens/tokens.json` before writing CSS.
2. Prefer Layer 4 component tokens, then Layer 2 semantic tokens.
3. Use Layer 3 state tokens for hover, pressed, focus-visible, and disabled behavior.
4. Never use Layer 1 primitive tokens directly in component CSS.
5. Never invent token names, raw colors, spacing, radii, or shadows.

Publish dry run:

```bash
npm pack --dry-run
```

## Figma MCP Sync

The repo now includes a local companion workflow for Figma MCP sync:

- MCP-side: fetch node data with `get_design_context`, `get_screenshot`, and `get_variable_defs`
- Repo-side: audit token names and values with `npm run figma:audit`
- Library-first: always check `apps/storybook/src/stories/` before building a new component

Full workflow and examples live in [docs/figma-sync.md](docs/figma-sync.md).

## Storybook MCP

DLS-Lead's Storybook can act as an MCP server for AI agents through the official Storybook MCP addon. Start Storybook with `npm run storybook`, then connect your agent to `http://127.0.0.1:6006/mcp`.

Packaged setup files live here:

- [AGENTS.md](AGENTS.md)
- [.cursorrules](.cursorrules)
- [.github/copilot-instructions.md](.github/copilot-instructions.md)
- [.mcp.json](.mcp.json)
- [.cursor/mcp.json](.cursor/mcp.json)
- [mcp/README.md](mcp/README.md)

## LLM Specs

The repo includes a repo-local `specs/` directory with structured markdown files for foundations, tokens, patterns, and core components. It follows the LLM-readable design-system approach described by Hardik Pandya: agents read specs at session start, choose from a closed token layer, and verify component APIs through Storybook.

The intended read order for AI agents is:

1. [specs/session-start.md](specs/session-start.md)
2. [specs/tokens/README.md](specs/tokens/README.md) and [specs/tokens/token-reference.md](specs/tokens/token-reference.md)
3. Relevant files in [specs/foundations/](specs/foundations), [specs/patterns/](specs/patterns), and [specs/components/](specs/components), especially [specs/foundations/accessibility.md](specs/foundations/accessibility.md) and [specs/patterns/accessibility-generation.md](specs/patterns/accessibility-generation.md) for React UI.

This is the machine-readable design-system layer for DLS-Lead: if a spec exists, the agent should look it up instead of guessing.

## Prompt Library

Reusable prompts for Claude, Cursor, Codex, and other coding agents live in [prompts/](prompts/). Start with [prompts/base-agent-contract.md](prompts/base-agent-contract.md), then paste a task prompt such as:

- [prompts/settings-page.md](prompts/settings-page.md)
- [prompts/data-table-page.md](prompts/data-table-page.md)
- [prompts/form-dialog.md](prompts/form-dialog.md)
- [prompts/dropdown-menu.md](prompts/dropdown-menu.md)
- [prompts/component-scaffold-from-figma.md](prompts/component-scaffold-from-figma.md)
- [prompts/audit-fix-component.md](prompts/audit-fix-component.md)
- [prompts/token-addition.md](prompts/token-addition.md)

These prompts bake in the spec read order, token constraints, Storybook MCP workflow, and DLS component usage rules.

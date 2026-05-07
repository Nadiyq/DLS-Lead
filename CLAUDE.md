# CLAUDE.md

DLS-Lead — token-driven design system for SaaS products. React + Storybook + CSS custom properties.

## Commands

```bash
npm start                                    # Token reference site :3000
cd apps/storybook && npm run storybook       # Storybook :6006, MCP :6006/mcp
cd apps/storybook && npx tsc -b              # TypeScript check
node .claude/hooks/lint-tokens.mjs --all     # Lint ALL component CSS
node .claude/hooks/lint-tokens.mjs <file>    # Lint single CSS file
/build-component <name>                      # Scaffold/update component from Figma
/audit-component <name|--all>                # Detect DLS violations in existing components
/fix-component <name>                        # Fix violations using Figma as source of truth
```

No test suite yet. Generated outputs (`tokens.css`, `.scss`, `.ts`) are maintained alongside `tokens.json`.

## Source of Truth

`tokens/tokens.json` — DTCG-compliant, 4-layer model: L1 Primitives → L2 Semantics → L3 State → L4 Component.
Generated outputs (don't hand-edit): `tokens/tokens.css`, `tokens/tokens.scss`, `tokens/tokens.ts`.

## LLM Specs

Before writing or modifying any UI code, read the relevant spec files in `specs/`.

- Start with `specs/session-start.md`
- Read `specs/tokens/README.md` and `specs/tokens/token-reference.md`
- Read the relevant files in `specs/foundations/`, `specs/patterns/`, and `specs/components/`

These specs are the repo-local machine-readable design-system layer. If a spec exists, look it up instead of guessing.

## Prompt Library

Reusable prompts for Claude, Cursor, Codex, and other coding agents live in `prompts/`.

- Start a DLS UI session with `prompts/base-agent-contract.md`
- Use task prompts such as `prompts/settings-page.md`, `prompts/data-table-page.md`, `prompts/form-dialog.md`, `prompts/dropdown-menu.md`, `prompts/component-scaffold-from-figma.md`, `prompts/audit-fix-component.md`, and `prompts/token-addition.md`

These prompts bake in the spec read order, token constraints, Storybook MCP workflow, and official Figma MCP requirement.

## Critical Rules — ZERO CUSTOM CSS POLICY

> **⛔ NEVER create custom CSS classes, styled components, or one-off styles.**
> Every visual element MUST use existing DLS components and tokens.
> Read `.claude/skills/dls-enforcement.md` before writing ANY CSS or JSX.

- **Always check the library first.** Before writing any UI element, check `apps/storybook/src/stories/` and Storybook. Never build from scratch if a DLS component exists. If you can't find a component, **stop and ask**.
- **No custom classes.** All CSS classes must be `.dls-*`. Never create `.my-*`, `.custom-*`, `.wrapper`, or any non-DLS class. The lint hook will block it.
- **No inline styles for visual properties.** Never use `style={{ color: '...', background: '...' }}`. Use `data-intent`, `data-variant`, `data-size` attributes.
- **Dropdowns / menus / popover lists are always `List` + `ListItem`.** Every row inside a dropdown, menu, context menu, select popover, or flyout MUST be a `<ListItem type="…" />` — never a custom `<div>`, `<button>`, or raw `<li>`. The dropdown root is a standalone `.dls-{name}` with its own reset, not `.dls-{name}` layered on top of `.dls-list`.
- **Icons come from `lucide-react` only.** Import as `import { Settings as SettingsIcon } from 'lucide-react';` (alias with `Icon` suffix). No hand-drawn `<svg><path/></svg>` constants, no Heroicons, no custom icon sets. Size and colour come from the parent slot's CSS, never inline `size` or `color` props.
- Components NEVER reference L1 primitives. Use L4 component → L2 semantic fallback.
- Variants/intents/sizes via `data-*` attributes, never `.is-*`/`.has-*` classes.
- Every component CSS starts with `all: unset; box-sizing: border-box;`.
- `:hover:not(:disabled)`, `:focus-visible` (not `:focus`), focus ring via `box-shadow` (never `outline`).
- No hardcoded colors, sizes, or radii. Use `--dls-radius-component-*`, never primitive `--dls-radius-*`.
- **Enforced by PostToolUse lint hook** (`.claude/hooks/lint-tokens.mjs`) — violations **block the edit**.

### When You Don't Find a Component

1. Do NOT improvise. Ask: "No DLS component exists for [X]. Should I scaffold one via `/build-component`?"
2. Always require a Figma URL before creating anything new.
3. If a component exists but lacks a variant you need, extend it through proper `data-*` attributes and L4 tokens — never with overrides.

### Fixing Existing Violations

Run `/audit-component <name>` to detect violations, then `/fix-component <name>` with a Figma URL to correct them.

## Figma Workflow

Uses the **official Figma MCP** (authenticated via Figma MCP Auth). Key tools: `use_figma`, `get_screenshot`, `get_design_context`, `search_design_system`, `get_variable_defs`.

Quick start: `/build-component <ComponentName>` with a Figma URL — reads design spec, checks library, compares tokens, scaffolds/updates the component.

## Storybook MCP

When the `dls-lead-storybook` MCP server is available, use it before making UI changes:

- Query Storybook docs before choosing a DLS component.
- Never guess props or variants. Use only what Storybook documents.
- Use story instructions and Storybook tests to validate generated UI.

Project-scoped config and setup examples live in `.mcp.json`, `.cursor/mcp.json`, and `mcp/README.md`.

## Skills (read before acting)

| Task | Read first |
|------|-----------|
| **ANY CSS or UI work (ALWAYS read first)** | **`.claude/skills/dls-enforcement.md`** |
| Build / scaffold a component | `.claude/skills/component-patterns.md` |
| Any UI work — using or composing components | `.claude/skills/dls-component-rules.md` |
| Accessibility, semantics, keyboard, ARIA, tests | `.claude/skills/accessibility.md` |
| Work with tokens (add, edit, lookup) | `.claude/skills/token-architecture.md` |
| Theming, dark mode, brand overrides | `.claude/skills/theming.md` |
| Typography decisions | `.claude/skills/typography.md` |
| Figma sync or MCP operations | `.claude/skills/figma-sync.md` |
| Extend system (new intent, shadow, scale) | `.claude/skills/extension-model.md` |

## Repo Layout

```
tokens/              → tokens.json (source), generated .css/.scss/.ts, figma-sync-4layer.js
apps/storybook/      → React components + stories (Vite + Storybook 10)
specs/               → LLM-readable design-system specs for foundations, tokens, patterns, and core components
prompts/             → Copy-paste prompt library for DLS-safe agent workflows
.claude/skills/      → Detailed instructions per domain
.claude/hooks/       → lint-tokens.mjs (PostToolUse CSS linter)
index.html + server.js → Token reference documentation site
```

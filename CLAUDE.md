# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

DLS-Lead — token-driven design system for SaaS products. React + Storybook + CSS custom properties.

## Commands

```bash
npm start                                    # Token reference site :3000
cd apps/storybook && npm run storybook       # Storybook :6006
cd apps/storybook && npx tsc -b              # TypeScript check
node .claude/hooks/lint-tokens.mjs --all     # Lint component CSS
```

No test suite yet. No token build script — generated outputs (`tokens.css`, `.scss`, `.ts`) are maintained alongside `tokens.json`.

## Source of Truth

`tokens/tokens.json` — DTCG-compliant, 4-layer model: L1 Primitives → L2 Semantics → L3 State → L4 Component.
Generated outputs (don't hand-edit): `tokens/tokens.css`, `tokens/tokens.scss`, `tokens/tokens.ts`.

## Critical Rules

- Components NEVER reference L1 primitives. Use L4 component → L2 semantic fallback.
- Variants/intents/sizes via `data-*` attributes, never `.is-*`/`.has-*` classes.
- Every component CSS starts with `all: unset; box-sizing: border-box;`.
- `:hover:not(:disabled)`, `:focus-visible` (not `:focus`), focus ring via `box-shadow` (never `outline`).
- No hardcoded colors, sizes, or radii. Use `--dls-radius-component-*`, never primitive `--dls-radius-*`.
- **Enforced by PostToolUse lint hook** (`.claude/hooks/lint-tokens.mjs`) — violations block the edit.

## Skills (read before acting)

| Task | Read first |
|------|-----------|
| Build / scaffold a component | `.claude/skills/component-patterns.md` |
| Work with tokens (add, edit, lookup) | `.claude/skills/token-architecture.md` |
| Theming, dark mode, brand overrides | `.claude/skills/theming.md` |
| Typography decisions | `.claude/skills/typography.md` |
| Figma sync or MCP operations | `.claude/skills/figma-sync.md` |
| Extend system (new intent, shadow, scale) | `.claude/skills/extension-model.md` |

## Repo Layout

```
tokens/              → tokens.json (source), generated .css/.scss/.ts, figma-sync-4layer.js
apps/storybook/      → React components + stories (Vite + Storybook 10)
.claude/skills/      → Detailed instructions per domain
.claude/hooks/       → lint-tokens.mjs (PostToolUse CSS linter)
index.html + server.js → Token reference documentation site
```

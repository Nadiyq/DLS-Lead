# DLS-Lead

Token-driven design system for SaaS products. React + Storybook + CSS custom properties.

## Source of Truth

`tokens/tokens.json` (DTCG-compliant, 4-layer model: Primitives → Semantics → State → Component).
Generated outputs: `tokens.css`, `tokens.scss`, `tokens.ts`.

## Critical Rules (always apply)

- Components NEVER reference layer-1 primitives. Use layer-4 component tokens → layer-2 semantic fallback.
- All variants/intents/sizes via `data-*` attributes, never `.is-*`/`.has-*` classes.
- Every component starts with `all: unset; box-sizing: border-box;`.
- States: `:hover:not(:disabled)`, `:focus-visible` (not `:focus`), focus ring via `box-shadow`.
- No hardcoded colors, sizes, or radii in component CSS.

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
tokens/          → tokens.json (source), generated .css/.scss/.ts, figma-sync-4layer.js
apps/storybook/  → React components + stories
.claude/skills/  → Detailed instructions per domain
```

## Run

```bash
npm start              # Token reference site :3000
cd apps/storybook && npm run storybook  # Storybook :6006
```

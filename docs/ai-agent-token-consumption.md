---
name: AI Agent Token Consumption
category: npm
status: active
package: dls-design-tokens
---

# AI Agent Token Consumption

This package is designed to be readable by coding agents before they generate UI. The canonical source is `tokens/tokens.json`, a DTCG-style 4-layer token file.

## Package Entry Points

| Import path | Purpose |
|---|---|
| `dls-design-tokens` | Canonical token JSON |
| `dls-design-tokens/tokens.json` | Canonical token JSON |
| `dls-design-tokens/tokens.css` | CSS custom properties |
| `dls-design-tokens/tokens.scss` | SCSS token output |
| `dls-design-tokens/tokens.ts` | TypeScript token source |
| `dls-design-tokens/ai` | This AI consumption guide |
| `dls-design-tokens/specs/...` | LLM-readable DLS specs |
| `dls-design-tokens/prompts/...` | Copy-paste agent prompts |

## Agent Read Order

Before generating component CSS or JSX:

1. Read `dls-design-tokens/ai`.
2. Read `dls-design-tokens/tokens.json`.
3. Read `dls-design-tokens/specs/session-start.md`.
4. Read `dls-design-tokens/specs/tokens/token-reference.md`.
5. Read focused specs such as `specs/tokens/color-tokens.md`, `specs/foundations/spacing.md`, or `specs/patterns/composition.md`.
6. Query Storybook docs for component APIs before using props, variants, or states.

## Token Layer Rules

| Layer | Agent behavior |
|---|---|
| Layer 1 primitives | Read only. Do not use directly in component CSS. |
| Layer 2 semantics | Use for UI meaning: surface, text, border, intent, overlay. |
| Layer 3 state | Use for hover, pressed, focus, and disabled behavior. |
| Layer 4 component | Prefer inside component CSS when a component token exists. |

## Safe CSS Pattern

```css
.dls-example {
  all: unset;
  box-sizing: border-box;
  background: var(--dls-color-surface-base);
  color: var(--dls-color-text-primary);
  border: 1px solid var(--dls-color-border-subtle);
  border-radius: var(--dls-radius-component-card);
  padding: var(--dls-spacing-4);
}

.dls-example:focus-visible {
  box-shadow: var(--dls-shadow-focus-ring);
}
```

## Prohibited Agent Behavior

- Do not hardcode raw hex, rgb, hsl, rgba, spacing, radius, font, or shadow values in UI code.
- Do not reference primitive tokens such as `--dls-color-primary-700` directly in component CSS.
- Do not invent token names.
- Do not create state classes like `.is-active` or `.has-error`; use `data-*` attributes and native states.
- Do not use plain `:focus` for visual focus; use `:focus-visible`.
- Do not use custom icons when a `lucide-react` icon exists.

## Import Examples

CommonJS:

```js
const tokens = require("dls-design-tokens");
```

ESM JSON import:

```js
import tokens from "dls-design-tokens" with { type: "json" };
```

CSS:

```css
@import "dls-design-tokens/tokens.css";
```

## Agent Prompt Seed

```text
Use the DLS-Lead token package as the source of truth.
Read `dls-design-tokens/ai`, then `dls-design-tokens/tokens.json`, then the relevant files under `dls-design-tokens/specs/`.
Generate UI using DLS tokens only.
Prefer Layer 4 component tokens, then Layer 2 semantic tokens, and use Layer 3 state tokens for hover, pressed, focus-visible, and disabled behavior.
Never invent tokens, props, variants, spacing values, colors, or radii.
Before using a component API, verify it through Storybook documentation.
```


---
name: AI Agent Token Consumption
category: npm
status: active
package: dls-design-tokens
---

# AI Agent Token Consumption

This document is the entry point for AI coding agents consuming the `dls-design-tokens` npm package. Read it before generating any UI code.

## Quick Start

```text
1. Read this file (dls-design-tokens/ai)
2. Read dls-design-tokens/tokens.json
3. Read dls-design-tokens/specs/session-start.md
4. Read dls-design-tokens/specs/tokens/token-reference.md
5. Read relevant specs from specs/foundations/ and specs/components/
6. Query Storybook docs for component APIs before using props or variants
```

## Package Entry Points

| Import path | Format | Purpose |
|---|---|---|
| `dls-design-tokens` | JSON | Canonical DTCG token source |
| `dls-design-tokens/tokens.json` | JSON | Explicit JSON import |
| `dls-design-tokens/tokens.css` | CSS | CSS custom properties |
| `dls-design-tokens/tokens.scss` | SCSS | SCSS variables |
| `dls-design-tokens/tokens.ts` | TypeScript | Typed token exports |
| `dls-design-tokens/ai` | Markdown | This guide |
| `dls-design-tokens/specs/*` | Markdown | LLM-readable design system specs |
| `dls-design-tokens/prompts/*` | Markdown | Copy-paste agent prompts |

## Token Layer Model

The JSON uses a 4-layer hierarchy. Agents must respect layer boundaries — using a lower layer when a higher one exists is a violation.

### Layer 1 — Primitives

Raw values. These exist so semantic and component tokens can reference them. **Never use L1 tokens directly in component CSS.**

```json
"color.primary.600": { "$value": "#7F56D9", "$type": "color" }
"spacing.4":         { "$value": "16px",    "$type": "dimension" }
"radius.m":          { "$value": "6px",     "$type": "dimension" }
```

CSS equivalents (read-only — do not use in components):
```
--dls-color-primary-600   ← WRONG to use in component CSS
--dls-spacing-4           ← OK (spacing has no L4 layer)
```

### Layer 2 — Semantics

Map primitives to UI meaning. Use these when no L4 component token exists.

```json
"color.surface.base":       references color.neutral.0
"color.text.primary":       references color.neutral.900
"color.border.subtle":      references color.neutral.200
"color.intent.primary.bg":  references color.primary.600
```

CSS:
```
--dls-color-surface-base
--dls-color-text-primary
--dls-color-border-subtle
--dls-color-intent-primary-bg
--dls-color-intent-danger-text
```

### Layer 3 — State

OKLCH lightness deltas for interactive states. Applied in CSS via relative color syntax.

```json
"state.lDelta.hover":   { "$value": 0.06 }
"state.lDelta.pressed": { "$value": -0.03 }
```

CSS pattern:
```css
.dls-button[data-intent="primary"]:hover:not(:disabled) {
  background: oklch(from var(--dls-color-intent-primary-bg) calc(l + 0.06) c h);
}
```

### Layer 4 — Component

Named tokens scoped to a specific component. **Always prefer these when they exist.**

```json
"radius.component.button":  references radius.m (6px)
"radius.component.card":    references radius.xl (12px)
"radius.component.tooltip": references radius.m (6px)
```

CSS:
```
--dls-radius-component-button
--dls-radius-component-card
--dls-color-component-sidebar-bg
--dls-color-component-top-bar-bg
```

## Token Naming Convention

All CSS custom properties follow:

```
--dls-{category}-{path}
```

Where `{path}` flattens the JSON nesting with hyphens:

| JSON path | CSS custom property |
|---|---|
| `color.neutral.600` | `--dls-color-neutral-600` |
| `color.surface.base` | `--dls-color-surface-base` |
| `color.intent.primary.bg` | `--dls-color-intent-primary-bg` |
| `radius.component.card` | `--dls-radius-component-card` |
| `spacing.4` | `--dls-spacing-4` |
| `shadow.focus-ring` | `--dls-shadow-focus-ring` |

## JSON Structure

Top-level keys in `tokens.json`:

| Key | Contains | Token count |
|---|---|---|
| `color` | Primitive scales (neutral, primary, info, success, warning, danger, additional) + semantic mappings (surface, text, border, intent, overlay, component) | ~180 |
| `font` | Font family (Inter), weight scale (normal, medium, semibold, bold) | 5 |
| `text` | Size and line-height scale (xs through 2xl) | 12 |
| `typography` | Composed styles: heading, paragraph, button, link, upper, italic, avatar | ~80 |
| `spacing` | 8pt grid: 0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 6, 8, 10, 11, 12, 14, 16 | 15 |
| `radius` | Primitive scale (0, xs, s, m, l, xl, 2xl, full) + 50+ component radii | ~58 |
| `shadow` | Elevation shadows (xs through 2xl) + focus ring | 6 |
| `icon` | Stroke width scale for 12/16/24px icons | 3 |
| `effect` | Backdrop blur (8px) and saturate (180%) for frosted overlays | 2 |
| `state` | OKLCH lightness deltas: hover (+0.06), pressed (-0.03) | 2 |

## Safe CSS Pattern

Every DLS component CSS file follows this structure:

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

.dls-example:hover:not(:disabled) {
  background: oklch(from var(--dls-color-surface-base) calc(l + 0.06) c h);
}

.dls-example:active:not(:disabled) {
  background: oklch(from var(--dls-color-surface-base) calc(l - 0.03) c h);
}

.dls-example:focus-visible {
  box-shadow: var(--dls-shadow-focus-ring);
}
```

Key rules in this pattern:
- `all: unset` + `box-sizing: border-box` — every component starts clean.
- `:hover:not(:disabled)` — hover only when enabled.
- `:focus-visible` not `:focus` — keyboard focus only.
- `box-shadow` for focus ring, never `outline`.
- All values from tokens, zero hardcoded values.

## Prohibited Agent Behavior

- Do not hardcode raw hex, rgb, hsl, rgba, spacing, radius, font, or shadow values.
- Do not reference L1 primitive tokens (e.g., `--dls-color-primary-700`) in component CSS.
- Do not invent token names. If a token doesn't exist, stop and ask.
- Do not create custom CSS classes. All classes must be `.dls-*`.
- Do not create state classes like `.is-active` or `.has-error`. Use `data-*` attributes and native pseudo-classes.
- Do not use plain `:focus` for visual focus rings. Use `:focus-visible`.
- Do not use `outline` for focus indicators. Use `box-shadow`.
- Do not use inline styles for visual properties. Use `data-intent`, `data-variant`, `data-size`.
- Do not create custom icons. Use `lucide-react` only, aliased with an `Icon` suffix.
- Do not guess component props or variants. Verify through Storybook documentation first.

## Reading the JSON Programmatically

To traverse `tokens.json` and find usable tokens:

1. **Skip `$description` and `$schema` keys** — they are metadata, not tokens.
2. **A node is a token if it has both `$value` and `$type`.**
3. **Check `$description` for usage rules** — many L1 tokens include "Do not use directly in components."
4. **Resolve references**: values like `"{radius.m}"` point to another token in the same file.
5. **Flatten paths to CSS names**: `color.surface.base` → `--dls-color-surface-base`.

## Traversal Priority for Agents

When choosing a token for a CSS property:

```
1. Does an L4 component token exist?
   → radius.component.button, color.component.sidebar-bg
   → YES: use it

2. Does an L2 semantic token exist?
   → color.surface.base, color.text.primary, shadow.focus-ring
   → YES: use it

3. Is it a scale token (spacing, text size)?
   → spacing.4, text.m.fontSize
   → YES: use it (these have no L4 layer)

4. Is it an L1 primitive?
   → color.primary.600, radius.m
   → STOP: do not use directly — find the semantic or component alias
```

## Import Examples

CSS:
```css
@import "dls-design-tokens/tokens.css";
```

ESM JSON:
```js
import tokens from "dls-design-tokens" with { type: "json" };
const surfaceColor = tokens.color.surface.base.$value;
```

CommonJS:
```js
const tokens = require("dls-design-tokens");
const surfaceColor = tokens.color.surface.base.$value;
```

TypeScript:
```ts
import { color, spacing, radius } from "dls-design-tokens/tokens.ts";
```

SCSS:
```scss
@use "dls-design-tokens/tokens.scss" as dls;
```

## Bundled Specs and Prompts

The package includes LLM-readable specs under `specs/` and copy-paste prompts under `prompts/`. See the package README for the full listing. These are the same files that power DLS-Lead's own AI-assisted development workflow.

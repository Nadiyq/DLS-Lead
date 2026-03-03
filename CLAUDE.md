# DLS-Lead — Project Guide

## Repository Structure

```
DLS-Lead/
├── tokens/                          # Design tokens (source of truth)
│   ├── tokens.json                  # DTCG-compliant 4-layer token definition
│   ├── tokens.css                   # Generated CSS custom properties (:root)
│   ├── tokens.scss                  # Generated SCSS variables
│   ├── tokens.ts                    # Generated TypeScript exports
│   ├── figma-add-4layer-variables.js
│   ├── figma-cleanup-4layer-variables.js
│   └── figma-rebind-components-to-4layer.js
├── apps/
│   └── storybook/                   # Storybook component library (React + Vite)
│       ├── src/stories/             # Components and their stories
│       └── .storybook/              # Storybook config
├── index.html                       # Token reference site (brutalist style)
├── server.js                        # Local dev server for token reference (port 3000)
└── .agents/skills/                  # AI agent skills (single canonical location)
```

## Token Architecture

4-layer DTCG-compliant system. Each layer has strict usage rules:

| Layer | Purpose | Prefix examples | Who uses it |
|-------|---------|-----------------|-------------|
| 1 — Primitives | Raw values (hex, px, weights) | `color.neutral.700`, `radius.m`, `spacing.4` | Only referenced by layers 2–4 |
| 2 — System Semantics | UI roles mapped from primitives | `color.surface.base`, `color.text.primary`, `color.border.focus`, `color.intent.primary.base` | Components via layer 4, or directly when no component token exists |
| 3 — State Abstraction | Behavioral modifiers (hover, pressed, disabled) | `state.lDelta.hover`, `state.overlay.hover.light`, `state.disabled.opacity` | Component CSS for interactive states |
| 4 — Component Tokens | Override-safe, per-component | `color.component.button.primary.bg.base`, `radius.component.card` | Components use **only** these |

**Rule**: Components must never reference layer-1 primitives directly. Use layer-4 component tokens, falling back to layer-2 semantics.

## CSS Variable Naming

All tokens are exposed as `--dls-{path}` with dots replaced by hyphens:

- `color.neutral.700` → `--dls-color-neutral-700`
- `color.intent.primary.base` → `--dls-color-intent-primary-base`
- `radius.component.button` → `--dls-radius-component-button`
- `spacing.4` → `--dls-spacing-4`

## Component Conventions

### Naming
- Component class prefix: `dls-` (e.g. `.dls-button`, `.dls-accordion`)
- BEM-style children: `.dls-button__icon`
- State via `data-*` attributes, not class names: `data-variant="filled"`, `data-intent="primary"`, `data-size="m"`
- No `is-` or `has-` classes — use `data-*` or `:disabled`

### Variants & Intents
- **Variants** control visual style: `filled`, `outline`, `soft`, `dotted`, `ghost`, `link`
- **Intents** control semantic color: `neutral`, `primary`, `info`, `success`, `warning`, `danger`
- **Sizes**: `m` (default), `s`

### Hover/Pressed States
Code uses OKLCH lightness shift (`calc(l + var(--dls-state-lDelta-hover))`).
Figma uses opacity overlay layers (`state.overlay.hover.light`).

### CSS Structure
- Components use `all: unset` + explicit properties
- Internal CSS variables (`--_base`, `--_on-base`, `--_subtle`, `--_text`, `--_border`) are set per-intent, then consumed by variant rules
- Focus ring: `box-shadow: var(--dls-shadow-focus-ring)`
- Disabled: `opacity: var(--dls-state-disabled-opacity)` + `pointer-events: none`

## Design Decisions

- **Font**: Inter (all weights 400–900)
- **Spacing**: 8pt grid (`spacing.2` = 8px base unit)
- **Border radius**: Semantic per-component (`radius.component.button` = 6px, `radius.component.badge` = pill)
- **Color palette**: Purple primary (`#6941C6` at 700), neutral grays, plus 6 intent scales and 10 additional palettes
- **Contrast targets**: `on-base` foreground colors are designed for WCAG AA+ on their `base` backgrounds
- **Shadows**: 3-tier elevation (sm/md/lg) + overlay shadow for dropdowns + focus ring
- **Dark mode**: Planned via CSS variable overrides — token architecture supports it but no dark theme tokens are defined yet

## Running Locally

```bash
# Token reference site
npm start                    # http://localhost:3000

# Storybook
cd apps/storybook
npm run storybook            # http://localhost:6006
```

## Figma Scripts

The `tokens/figma-*.js` files are meant to run inside the Figma console (or via Figma plugin API) to sync the 4-layer variable structure into Figma.

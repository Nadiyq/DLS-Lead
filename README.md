# dls-design-tokens

Design tokens for DLS-Lead, a token-driven design system for SaaS products. Ships as DTCG-compliant JSON with generated CSS, SCSS, and TypeScript outputs, plus LLM-readable specs and agent prompts.

Built for human developers and AI coding agents alike.

```bash
npm install dls-design-tokens
```

## For AI Agents

This package is designed to be consumed by AI coding agents (Claude, Cursor, Codex, Copilot) before they generate UI. The token JSON is machine-readable, DTCG-compliant, and annotated with `$description` fields that tell agents what each token is for and when not to use it.

**Start here:**

```text
1. Read `dls-design-tokens/ai`              — agent rules and constraints
2. Read `dls-design-tokens/tokens.json`      — the canonical token source
3. Read `dls-design-tokens/specs/session-start.md`  — session checklist
4. Read `dls-design-tokens/specs/tokens/token-reference.md` — full token map
```

Or paste one of the bundled prompts directly into your agent:

```text
Use the DLS-Lead token package as the source of truth.
Read `dls-design-tokens/ai`, then `dls-design-tokens/tokens.json`,
then the relevant files under `dls-design-tokens/specs/`.
Generate UI using DLS tokens only.
Prefer Layer 4 component tokens, then Layer 2 semantic tokens.
Use Layer 3 state tokens for hover, pressed, focus-visible, and disabled.
Never invent tokens, props, variants, spacing values, colors, or radii.
```

### What's in the Package for Agents

| Content | Count | Purpose |
|---|---|---|
| Design tokens | 359 | Colors, spacing, radius, shadow, typography, state, icons |
| Component specs | 76 | Machine-readable anatomy, props, tokens, states, code examples |
| Foundation specs | 14 | Color, spacing, typography, motion, accessibility, grid, z-index |
| Pattern specs | 4 | Composition, component selection, accessibility generation |
| Agent prompts | 15 | Copy-paste prompts for settings pages, data tables, forms, auth flows, dashboards, and more |

### Token Architecture (4 Layers)

Tokens follow a strict 4-layer hierarchy. Agents must respect the layer boundaries:

```
Layer 1 — Primitives     Raw values: hex colors, px sizes, font stacks
                          Example: color.primary.600 → #7F56D9
                          Rule: NEVER use in component CSS

Layer 2 — Semantics      UI meaning: surface, text, border, intent roles
                          Example: --dls-color-surface-base, --dls-color-text-primary
                          Rule: Use when no L4 component token exists

Layer 3 — State           OKLCH lightness deltas for interactive states
                          Example: state.lDelta.hover → +0.06
                          Rule: Use for :hover, :active, :focus-visible, :disabled

Layer 4 — Component       Named per-component tokens
                          Example: --dls-radius-component-button → 6px
                          Rule: ALWAYS prefer over L1/L2 when available
```

### Token Naming Convention

All CSS custom properties follow this pattern:

```
--dls-{category}-{scope}-{name}

--dls-color-surface-base          L2 semantic color
--dls-color-intent-primary-bg     L2 intent color
--dls-color-component-card-bg     L4 component color
--dls-radius-component-button     L4 component radius
--dls-spacing-4                   Spacing scale (16px)
--dls-shadow-focus-ring           Focus ring shadow
```

### Agent Constraints

- Never hardcode hex, rgb, hsl, rgba, px spacing, radius, font, or shadow values.
- Never reference L1 primitives (e.g., `--dls-color-primary-700`) in component CSS.
- Never invent token names — if a token doesn't exist, stop and ask.
- Use `data-*` attributes for variants and states, not `.is-*` or `.has-*` classes.
- Use `:focus-visible` not `:focus`. Focus rings use `box-shadow`, never `outline`.
- Icons from `lucide-react` only, aliased with an `Icon` suffix.

## Package Entry Points

| Import Path | Format | Purpose |
|---|---|---|
| `dls-design-tokens` | JSON | Canonical DTCG token source (default) |
| `dls-design-tokens/tokens.json` | JSON | Explicit token JSON import |
| `dls-design-tokens/tokens.css` | CSS | CSS custom properties (`:root` block) |
| `dls-design-tokens/tokens.scss` | SCSS | SCSS variables (`$dls-*`) |
| `dls-design-tokens/tokens.ts` | TypeScript | Typed token exports (ES module) |
| `dls-design-tokens/ai` | Markdown | AI agent consumption guide |
| `dls-design-tokens/specs/*` | Markdown | LLM-readable design system specs |
| `dls-design-tokens/prompts/*` | Markdown | Copy-paste agent prompts |

### Import Examples

CSS:
```css
@import "dls-design-tokens/tokens.css";
```

ESM:
```js
import tokens from "dls-design-tokens" with { type: "json" };
```

CommonJS:
```js
const tokens = require("dls-design-tokens");
```

SCSS:
```scss
@use "dls-design-tokens/tokens.scss" as dls;
```

TypeScript:
```ts
import { color, spacing, radius } from "dls-design-tokens/tokens.ts";
```

## Token Categories

The JSON contains these top-level categories:

| Category | Layers | Description |
|---|---|---|
| `color` | L1 + L2 | 7 primitive scales (neutral, primary, info, success, warning, danger, additional) + semantic mappings (surface, text, border, intent) |
| `font` | L1 | Font family (Inter) and weight scale (400-700) |
| `text` | L1 | Font size and line height scale (xs through 2xl) |
| `typography` | L1 | Composed type styles: heading, paragraph, button, link, upper, italic, avatar |
| `spacing` | L1 | 8pt grid scale from 0 to 64px |
| `radius` | L1 + L4 | Primitive scale (xs-full) + per-component radius tokens |
| `shadow` | L2 | Elevation shadows and focus ring |
| `icon` | L1 | Stroke width scale for 12/16/24px icons |
| `effect` | L2 | Backdrop blur and saturate values |
| `state` | L3 | OKLCH lightness deltas for hover (+0.06) and pressed (-0.03) |

## Bundled Specs

The `specs/` directory contains 100+ structured markdown files organized for agent consumption:

- **`specs/session-start.md`** — Read first. Checklist for every UI task.
- **`specs/tokens/`** — Token reference, color tokens, spacing, typography, elevation, motion.
- **`specs/foundations/`** — Accessibility, breakpoints, color, grid, motion, spacing, typography, z-index.
- **`specs/patterns/`** — Composition rules, component selection, accessibility generation.
- **`specs/components/`** — 76 component specs with anatomy, props, tokens, states, and code examples.

## Bundled Prompts

The `prompts/` directory contains 15 copy-paste prompts for AI agents. Each prompt bakes in the correct spec read order, token constraints, and Storybook MCP workflow. See [prompts/README.md](prompts/README.md) for the full index.

Start with `prompts/base-agent-contract.md`, then use a task prompt:

| Task | Prompt |
|---|---|
| Settings page with sidebar | `prompts/settings-page.md` |
| Data table with filters | `prompts/data-table-page.md` |
| Form or dialog workflow | `prompts/form-dialog.md` |
| Dashboard with KPI cards | `prompts/dashboard-page.md` |
| Login / signup / OTP | `prompts/auth-flow.md` |
| App shell with sidebar + top bar | `prompts/nav-shell.md` |
| Searchable list or card grid | `prompts/list-page.md` |
| Entity detail / profile page | `prompts/detail-page.md` |
| Messaging / chat / notifications | `prompts/messaging-ui.md` |
| Dropdown, menu, or popover | `prompts/dropdown-menu.md` |
| Scaffold component from Figma | `prompts/component-scaffold-from-figma.md` |
| Audit and fix violations | `prompts/audit-fix-component.md` |
| Add or extend tokens | `prompts/token-addition.md` |

## State Layer

DLS-Lead uses a hybrid state model:

- **In code:** interactive states use OKLCH relative color syntax with numeric lightness deltas. Hover shifts lightness by `+0.06`, pressed by `-0.03`. This produces perceptually uniform state changes across all color scales.
- **In Figma:** the same states are represented with opacity overlays for tooling compatibility.

Agents should use the `state.lDelta.hover` and `state.lDelta.pressed` tokens from `tokens.json`, applied via `oklch(from <base> calc(l + delta) c h)` in CSS.

## Development

### Source of Truth

`tokens/tokens.json` is the canonical DTCG source. Generated outputs (`tokens.css`, `tokens.scss`, `tokens.ts`) are committed alongside it — do not hand-edit them.

### Storybook

```bash
cd apps/storybook && npm run storybook    # Storybook at :6006
```

The Storybook instance acts as an MCP server for AI agents at `http://127.0.0.1:6006/mcp`. Setup files: [.mcp.json](.mcp.json), [.cursor/mcp.json](.cursor/mcp.json), [mcp/README.md](mcp/README.md).

### Figma Sync

Uses the official Figma MCP for design-to-code sync. Key tools: `use_figma`, `get_screenshot`, `get_design_context`, `get_variable_defs`. Full workflow in [docs/figma-sync.md](docs/figma-sync.md).

### Publish

```bash
npm pack --dry-run    # Preview what ships
npm publish           # Publish to npm (public)
```

## License

MIT

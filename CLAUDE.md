# DLS-Lead Design System

> Token-driven infrastructure design system for SaaS products.
> Source of truth: `tokens/tokens.json` (DTCG-compliant).
> Output formats: CSS (`tokens.css`), SCSS (`tokens.scss`), TypeScript (`tokens.ts`).

---

## 1. System Overview

### 1.1 Purpose

DLS-Lead provides a deterministic, token-driven component infrastructure for SaaS products. Every visual decision — color, spacing, typography, radius, shadow, state — is encoded as a design token. Components consume tokens; they never hardcode values.

### 1.2 Target Products

- SaaS admin dashboards
- Internal tools and back-office UIs
- Data-heavy interfaces with tables, forms, filters, modals

### 1.3 Architectural Philosophy

1. **Single source of truth**: `tokens/tokens.json` drives all generated outputs.
2. **4-layer token model**: Primitives → System Semantics → State Abstraction → Component Tokens.
3. **No primitive leaks**: Components never reference layer-1 primitives. They use layer-4 component tokens, falling back to layer-2 semantics when no component token exists.
4. **Override-safe**: Any component token can be overridden per-brand or per-theme without breaking the system.
5. **Figma ↔ Code parity**: Token names map 1:1 between Figma variables and CSS custom properties.

### 1.4 Repository Structure

```
DLS-Lead/
├── tokens/
│   ├── tokens.json                  # DTCG source of truth (4-layer)
│   ├── tokens.css                   # Generated CSS custom properties (:root)
│   ├── tokens.scss                  # Generated SCSS variables
│   ├── tokens.ts                    # Generated TypeScript exports
│   └── figma-sync-4layer.js            # Figma variable sync (add / cleanup / rebind)
├── apps/
│   └── storybook/                   # Component library (React + Vite)
│       ├── src/stories/             # Components: Button, Accordion, Header, Page
│       └── .storybook/              # Storybook config
├── index.html                       # Token reference site (brutalist style)
├── server.js                        # Local dev server (port 3000)
├── CLAUDE.md                        # This file
└── .agents/skills/                  # AI agent skills
```

---

## 2. Token Architecture

### 2.1 Layer Model

| Layer | Name | Purpose | Reference pattern | Who references it |
|-------|------|---------|-------------------|-------------------|
| 1 | **Primitives** | Raw values: hex colors, pixel sizes, weights, numeric scales | `color.neutral.700`, `radius.m`, `spacing.4`, `text.m.fontSize` | Only layers 2, 3, 4 |
| 2 | **System Semantics** | UI roles mapped from primitives | `color.surface.base`, `color.text.primary`, `color.border.focus`, `color.intent.primary.base` | Components (when no layer-4 token exists), layer 4 |
| 3 | **State Abstraction** | Behavioral modifiers independent of brand | `state.lDelta.hover`, `state.overlay.hover.light`, `state.disabled.opacity` | Component CSS for hover/pressed/disabled/focus |
| 4 | **Component Tokens** | Override-safe per-component values | `color.component.button.primary.bg.base`, `radius.component.card` | Components (primary source) |

### 2.2 Dependency Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        COMPONENT CSS                            │
│  References: Layer 4 (component) → Layer 3 (state) → Layer 2   │
└─────────────────────────────────────────────────────────────────┘
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐  ┌──────────────────┐  ┌─────────────────┐
│ Layer 4      │  │ Layer 3          │  │ Layer 2         │
│ Component    │  │ State            │  │ System Semantic │
│              │  │                  │  │                 │
│ color.       │  │ state.lDelta     │  │ color.surface   │
│  component.  │  │  .hover: -0.05   │  │  .base          │
│  button.     │  │  .pressed: -0.10 │  │ color.text      │
│  primary.    │  │ state.overlay    │  │  .primary       │
│  bg.base     │  │  .hover.light    │  │ color.border    │
│              │  │ state.disabled   │  │  .focus         │
│ radius.      │  │  .opacity: 0.38  │  │ color.intent    │
│  component.  │  │ state.focus      │  │  .primary.base  │
│  button      │  │  .ring.color     │  │                 │
└──────┬───────┘  └────────┬─────────┘  └────────┬────────┘
       │                   │                      │
       ▼                   ▼                      ▼
┌─────────────────────────────────────────────────────────────┐
│ Layer 1 — Primitives                                        │
│ color.neutral.*, color.primary.*, radius.m, spacing.4, etc. │
│ NEVER referenced by components directly                     │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Token Mapping Rules

**Rule 1**: Components MUST use layer-4 component tokens when they exist.

```css
/* CORRECT */
background: var(--dls-color-component-button-primary-bg-base);
border-radius: var(--dls-radius-component-button);

/* WRONG — skips component layer */
background: var(--dls-color-intent-primary-base);
border-radius: var(--dls-radius-m);
```

**Rule 2**: If no layer-4 token exists for a property, use layer-2 semantics.

```css
/* CORRECT — no component token for generic text color */
color: var(--dls-color-text-primary);

/* WRONG — using primitive */
color: var(--dls-color-neutral-900);
```

**Rule 3**: Layer-1 primitives are NEVER referenced in component CSS.

**Rule 4**: State behavior uses layer-3 tokens exclusively.

```css
/* CORRECT */
background: oklch(from var(--_base) calc(l + var(--dls-state-l-delta-hover)) c h);

/* WRONG — hardcoded state shift */
background: oklch(from var(--_base) calc(l - 0.05) c h);
```

**Rule 5**: References flow downward only. A lower layer MUST NOT reference a higher layer.

```
Layer 4 → can reference layers 3, 2, 1
Layer 3 → can reference layers 2, 1
Layer 2 → can reference layer 1 only
Layer 1 → raw values only, no references
```

### 2.4 Complete Token Categories

| Category | Layer | Token count | CSS prefix |
|----------|-------|-------------|------------|
| `color.neutral.*` | 1 | 11 stops (0–950) | `--dls-color-neutral-*` |
| `color.primary.*` | 1 | 11 stops | `--dls-color-primary-*` |
| `color.info.*` | 1 | 11 stops | `--dls-color-info-*` |
| `color.success.*` | 1 | 11 stops | `--dls-color-success-*` |
| `color.warning.*` | 1 | 11 stops | `--dls-color-warning-*` |
| `color.danger.*` | 1 | 11 stops | `--dls-color-danger-*` |
| `color.additional.*` | 1 | 10 palettes × 4 stops | `--dls-color-additional-*` |
| `color.opacity.*` | 1 | light/dark × 4 + numeric 0–100 | `--dls-color-opacity-*` |
| `color.surface.*` | 2 | 6 roles | `--dls-color-surface-*` |
| `color.text.*` | 2 | 5 roles | `--dls-color-text-*` |
| `color.border.*` | 2 | 6 roles | `--dls-color-border-*` |
| `color.intent.*` | 2 | 6 intents × 6 props | `--dls-color-intent-*` |
| `color.overlay.*` | 2 | 2 (scrim, backdrop) | `--dls-color-overlay-*` |
| `color.component.*` | 4 | per-component | `--dls-color-component-*` |
| `shadow.*` | 1+2 | raw (3) + semantic (3) + overlay + focus | `--dls-shadow-*` |
| `state.*` | 3 | lDelta, overlay, disabled, focus | `--dls-state-*` |
| `font.*` | 1 | family + 5 weights | `--dls-font-*` |
| `text.*` | 1+semantic | 8 primitive sizes + 7 semantic groups | `--dls-text-*` |
| `radius.*` | 1 | 8 primitives | `--dls-radius-*` |
| `radius.component.*` | 4 | 32 components | `--dls-radius-component-*` |
| `spacing.*` | 1 | 16 steps (0–16) | `--dls-spacing-*` |
| `icon.*` | 1 | 3 stroke weights | `--dls-icon-*` |
| `effect.*` | code-only | backdrop blur + saturate | `--dls-effect-*` |

---

## 3. Naming Convention Rules

### 3.1 Token Path Format

```
category.scope.element.variant.property.state
```

Each segment is lowercase, hyphen-separated within a segment, dot-separated between segments.

### 3.2 CSS Variable Format

All tokens are exposed as `--dls-{path}` with dots replaced by hyphens:

| Token path | CSS variable |
|---|---|
| `color.neutral.700` | `--dls-color-neutral-700` |
| `color.intent.primary.base` | `--dls-color-intent-primary-base` |
| `color.component.button.primary.bg.base` | `--dls-color-component-button-primary-bg-base` |
| `radius.component.button` | `--dls-radius-component-button` |
| `state.lDelta.hover` | `--dls-state-l-delta-hover` |
| `text.heading.h2` | `--dls-text-heading-h2-font-size`, `--dls-text-heading-h2-line-height`, `--dls-text-heading-h2-font-weight` |

### 3.3 Naming Constraints

| Rule | Example (correct) | Example (wrong) |
|---|---|---|
| No ambiguous abbreviations | `color.surface.base` | `color.surf.bg` |
| No direct primitive in component name | `radius.component.button` | `radius.6` in component CSS |
| Intent names are fixed enum | `primary`, `success`, `warning`, `danger`, `info`, `neutral` | `error`, `positive`, `negative` |
| States are fixed enum | `base`, `hover`, `pressed`, `focus`, `disabled`, `active`, `selected` | `hovered`, `click`, `inactive` |
| Size scale uses t-shirt + numeric | `xs`, `s`, `m`, `l`, `xl`, `2xl`, `3xl` | `small`, `medium`, `large` |
| Component names match Figma names | `accordion`, `badge-number`, `carousel-arrow` | `accordeon`, `badge_number`, `carouselArrow` |

### 3.4 Anti-Patterns: Naming

```css
/* WRONG: camelCase in CSS variable */
--dls-colorIntentPrimaryBase: #6941C6;

/* WRONG: abbreviated scope */
--dls-btn-bg: var(--dls-color-primary-700);

/* WRONG: mixing layer concerns in name */
--dls-color-button-neutral-700: ...;

/* CORRECT */
--dls-color-component-button-primary-bg-base: var(--dls-color-intent-primary-base);
```

---

## 4. Component Token Model

### 4.1 Component CSS Architecture

Every DLS component follows this structure:

```css
.dls-{component} {
  all: unset;
  box-sizing: border-box;

  /* Internal variables set per-intent, consumed by variant rules */
  --_base: var(--dls-color-intent-neutral-base);
  --_on-base: var(--dls-color-intent-neutral-on-base);
  --_subtle: var(--dls-color-intent-neutral-subtle);
  --_text: var(--dls-color-intent-neutral-text);
  --_border: var(--dls-color-intent-neutral-border);
}
```

### 4.2 Component Attribute Model

Components use `data-*` attributes for all dynamic properties. No `.is-*` or `.has-*` classes.

| Attribute | Values | Purpose |
|---|---|---|
| `data-variant` | `filled`, `outline`, `soft`, `dotted`, `ghost`, `link` | Visual style |
| `data-intent` | `neutral`, `primary`, `info`, `success`, `warning`, `danger` | Semantic color |
| `data-size` | `xs`, `s`, `m`, `l` | Size scale |
| `data-icon-only` | (presence) | Icon-only mode |
| `:disabled` | native HTML | Disabled state |

### 4.3 Reference Component: Button

**Intent**: Interactive trigger for actions.

**Variants**: `filled`, `outline`, `soft`, `dotted`, `ghost`, `link`

**Sizes**: `m` (default: 32px min-height), `s` (24px min-height)

**Required token references**:

| Property | Token |
|---|---|
| Border radius | `--dls-radius-component-button` → `radius.m` (6px) |
| Font weight | `--dls-font-weight-medium` (500) |
| Font size (m) | `--dls-text-m-font-size` (14px) |
| Font size (s) | `--dls-text-s-font-size` (12px) |
| Gap (m) | `--dls-spacing-1-5` (6px) |
| Gap (s) | `--dls-spacing-1` (4px) |
| Padding (m) | `--dls-spacing-1-5` / `--dls-spacing-2-5` |
| Padding (s) | `--dls-spacing-1` / `--dls-spacing-2` |
| Filled bg | `var(--_base)` → `color.intent.{intent}.base` |
| Filled fg | `var(--_on-base)` → `color.intent.{intent}.on-base` |
| Outline/Ghost bg hover | `var(--dls-state-hover-overlay)` |
| Focus ring | `box-shadow: 0 0 0 3px var(--dls-state-focus-ring-color)` |
| Disabled bg | `--dls-color-surface-disabled` |
| Disabled fg | `--dls-color-text-disabled` |
| Disabled border | `--dls-color-border-disabled` |

**Override boundaries**: Override only `color.component.button.*` tokens. Do not override intent tokens to change one button.

**Anti-patterns**:

```css
/* WRONG: hardcoded color in component */
.dls-button[data-variant="filled"] { background: #6941C6; }

/* WRONG: primitive reference */
.dls-button { border-radius: var(--dls-radius-m); }

/* WRONG: class-based state */
.dls-button.is-disabled { opacity: 0.38; }

/* CORRECT */
.dls-button[data-variant="filled"] { background: var(--_base); }
.dls-button { border-radius: var(--dls-radius-component-button); }
.dls-button:disabled { /* use token-based disabled styles */ }
```

### 4.4 Component Token Template

For any new component, define these tokens:

```
color.component.{name}.{variant?}.bg.{state}
color.component.{name}.{variant?}.fg.{state}
color.component.{name}.{variant?}.border.{state}
radius.component.{name}
```

Where `{state}` is one or more of: `base`, `hover`, `pressed`, `focus`, `disabled`, `active`, `selected`.

### 4.5 Existing Component Tokens

| Component | Color tokens defined | Radius token |
|---|---|---|
| `button` | primary (bg/fg/border × base/disabled), secondary (bg/fg/border × base/focus/hover/pressed/disabled), ghost (bg/fg × base/focus/disabled) | `radius.component.button` = 6px |
| `badge` | 6 intents × (bg/fg/border) | `radius.component.badge` = pill |
| `chip` | bg/fg/border × base/disabled | `radius.component.chip` = 6px |
| `tab` | fg × base/active/hover/disabled, border.active | `radius.component.tab` = 6px |
| `input` | bg/fg/border × base/hover/focus/disabled/placeholder | `radius.component.input` = 6px |
| `table` | row.bg (base/selected), header (bg/fg/border) | `radius.component.table` = 12px |
| `pagination` | fg/bg × base/active/disabled | `radius.component.pagination` = 6px |
| `alert` | 5 intents × (bg/fg/border) | `radius.component.alert` = 8px |
| `dialog` | overlay/bg/border | `radius.component.modal` = 12px |
| `dropdown` | bg/border, item (bg/fg) | `radius.component.dropdown` = 6px |
| `sidebar` | bg/border, item (fg/bg × base/active) | `radius.component.sidebar-item` = 6px |

---

## 5. State Model

### 5.1 Interaction States

| State | Mechanism (Code) | Mechanism (Figma) | Token |
|---|---|---|---|
| **Hover** | OKLCH L-shift: `calc(l - 0.05)` | Opacity overlay layer: `rgba(0,0,0,0.05)` | `state.lDelta.hover` = -0.05 / `state.overlay.hover.light` |
| **Pressed** | OKLCH L-shift: `calc(l - 0.10)` | Opacity overlay layer: `rgba(0,0,0,0.10)` | `state.lDelta.pressed` = -0.10 / `state.overlay.pressed.light` |
| **Focus** | Box-shadow ring: `0 0 0 3px {color}` | Stroke + offset | `state.focus.ring.color` = `color.info.300` |
| **Disabled** | `opacity: 0.38` + `pointer-events: none` | Reduced opacity layer | `state.disabled.opacity` = 0.38 |

### 5.2 State Application Rules

**Filled variants** (filled, soft): Use OKLCH lightness shift on the base/subtle color.

```css
.dls-button[data-variant="filled"]:hover:not(:disabled) {
  background: oklch(from var(--_base) calc(l + var(--dls-state-l-delta-hover)) c h);
}
```

**Transparent variants** (outline, dotted, ghost, link): Use overlay tokens.

```css
.dls-button[data-variant="outline"]:hover:not(:disabled) {
  background: var(--dls-state-hover-overlay);
}
```

### 5.3 Focus Handling

- Focus ring is applied via `:focus-visible` only (keyboard navigation).
- Non-filled variants get `background: var(--dls-color-surface-base)` on focus to ensure contrast under the ring.
- Focus ring uses `box-shadow`, not `outline`, to respect border-radius.

```css
.dls-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--dls-state-focus-ring-color);
}
```

### 5.4 Disabled Logic

Disabled components override all intent colors with the disabled palette:

| Property | Token |
|---|---|
| Background (filled/soft) | `--dls-color-surface-disabled` = `neutral.50` |
| Background (outline/ghost) | `transparent` |
| Foreground | `--dls-color-text-disabled` = `neutral.500` |
| Border | `--dls-color-border-disabled` = `neutral.200` |
| Cursor | `not-allowed` |
| Pointer events | `none` |

### 5.5 Anti-Patterns: States

```css
/* WRONG: hardcoded opacity for hover */
.dls-card:hover { opacity: 0.8; }

/* WRONG: using :hover instead of :hover:not(:disabled) */
.dls-button:hover { background: ...; }

/* WRONG: class-based state management */
.dls-button.is-focused { box-shadow: ...; }

/* WRONG: outline for focus ring (breaks border-radius) */
.dls-button:focus-visible { outline: 2px solid blue; }

/* CORRECT */
.dls-button:hover:not(:disabled) { ... }
.dls-button:focus-visible { box-shadow: 0 0 0 3px var(--dls-state-focus-ring-color); }
```

---

## 6. Theming Strategy

### 6.1 Light Theme (Current Default)

All tokens in `tokens.json` define light-theme values. The `:root` scope in `tokens.css` is the light theme.

### 6.2 Dark Theme

Dark mode is applied via `[data-theme="dark"]` selector overriding CSS variables.

**Currently defined dark overrides**:

| Token | Light value | Dark value |
|---|---|---|
| `color.overlay.backdrop` | `rgba(255, 255, 255, 0.56)` | `rgba(0, 0, 0, 0.3)` |
| `state.overlay.hover` | `rgba(0, 0, 0, 0.05)` | `rgba(255, 255, 255, 0.08)` |
| `state.overlay.pressed` | `rgba(0, 0, 0, 0.10)` | `rgba(255, 255, 255, 0.15)` |

**Strategy for full dark mode**: Override layer-2 semantic tokens. Primitives remain unchanged.

```css
[data-theme="dark"] {
  --dls-color-surface-base: var(--dls-color-neutral-900);
  --dls-color-surface-subtle: var(--dls-color-neutral-800);
  --dls-color-text-primary: var(--dls-color-neutral-0);
  --dls-color-text-secondary: var(--dls-color-neutral-400);
  --dls-color-border-base: var(--dls-color-neutral-700);
  /* ... all layer-2 overrides ... */
}
```

### 6.3 Brand Override Model

To create a new brand theme, override layer-1 primitive color scales:

```css
[data-brand="acme"] {
  --dls-color-primary-50: #F0FDF4;
  --dls-color-primary-100: #DCFCE7;
  /* ... full 50–950 scale ... */
  --dls-color-primary-700: #15803D;
  --dls-color-primary-900: #14532D;
}
```

Because layer-2 and layer-4 tokens reference layer-1 via `var()`, all semantic and component colors update automatically.

### 6.4 Multi-Brand Support

| Override target | Effect scope | Selector pattern |
|---|---|---|
| Layer 1 (primitives) | Entire color palette changes | `[data-brand="X"]` |
| Layer 2 (semantics) | Surface/text/border roles change | `[data-theme="dark"]` |
| Layer 4 (component) | Single component override | `.custom-button { --dls-radius-component-button: 0; }` |

### 6.5 Anti-Patterns: Theming

```css
/* WRONG: theme applied via class */
.dark-mode .dls-button { background: #333; }

/* WRONG: overriding primitives for one component */
.dls-card { --dls-color-neutral-50: #111; }

/* WRONG: inline hardcoded colors */
<div style="background: #F9F5FF">

/* CORRECT: use semantic tokens, they auto-switch with theme */
background: var(--dls-color-surface-subtle);
```

---

## 7. Typography System

### 7.1 Font Stack

| Token | Value |
|---|---|
| `font.family` | `Inter` |
| `font.weight.normal` | 400 |
| `font.weight.medium` | 500 |
| `font.weight.semibold` | 600 |
| `font.weight.bold` | 800 |
| `font.weight.black` | 900 |

### 7.2 Primitive Text Scale

| Token | Font size | Line height |
|---|---|---|
| `text.xs` | 10px | 14px |
| `text.s` | 12px | 16px |
| `text.m` | 14px | 20px |
| `text.l` | 16px | 24px |
| `text.xl` | 18px | 26px |
| `text.2xl` | 24px | 32px |
| `text.3xl` | 32px | 40px |
| `text.hero` | 36px | 46px |

### 7.3 Semantic Typography (7 Categories)

**Headings** — 7 levels, hero through h6:

| Token | Size | Weight | Notes |
|---|---|---|---|
| `text.heading.hero` | 36/46 | 800 (bold) | Page hero |
| `text.heading.h1` | 32/40 | 600 (semibold) | |
| `text.heading.h2` | 24/32 | 600 | |
| `text.heading.h3` | 18/26 | 600 | |
| `text.heading.h4` | 16/24 | 600 | |
| `text.heading.h5` | 14/20 | 600 | |
| `text.heading.h6` | 12/16 | 800 (bold) | Smallest heading, extra bold for emphasis |

**Paragraph** — 5 sizes × 3 weights:

| Size | Font size / Line height | light (400) | medium (500) | heavy (600) |
|---|---|---|---|---|
| xl | 18/26 | `paragraph.xl.light` | `paragraph.xl.medium` | `paragraph.xl.heavy` |
| l | 16/24 | `paragraph.l.light` | `paragraph.l.medium` | `paragraph.l.heavy` |
| m | 14/20 | `paragraph.m.light` | `paragraph.m.medium` | `paragraph.m.heavy` |
| s | 12/16 | `paragraph.s.light` | `paragraph.s.medium` | `paragraph.s.heavy` |
| xs | 10/14 | `paragraph.xs.light` | `paragraph.xs.medium` | `paragraph.xs.heavy` |

Note: `xs` adds `letter-spacing: 0.2px`. `xs.heavy` uses weight 500 (not 600) per Figma.

**Button** — 4 sizes, all weight 500:

| Token | Size | Letter-spacing |
|---|---|---|
| `text.button.l` | 16/24 | — |
| `text.button.m` | 14/20 | — |
| `text.button.s` | 12/16 | — |
| `text.button.xs` | 10/14 | 0.5px |

**Link** — 4 sizes × 3 weights (same size scale as paragraph l–xs):

| Size | light / medium / heavy | Letter-spacing |
|---|---|---|
| l | 16/24 | — |
| m | 14/20 | — |
| s | 12/16 | — |
| xs | 10/14 | 0.5px |

**Upper** — 4 sizes, all weight 500, `text-transform: uppercase`, `letter-spacing: 0.01em`:

| Token | Size |
|---|---|
| `text.upper.l` | 16/24 |
| `text.upper.m` | 14/20 |
| `text.upper.s` | 12/16 |
| `text.upper.xs` | 10/14 |

**Italic** — 4 sizes, all weight 400, `font-style: italic`:

| Token | Size |
|---|---|
| `text.italic.l` | 16/24 |
| `text.italic.m` | 14/20 |
| `text.italic.s` | 12/16 |
| `text.italic.xs` | 10/14 |

**Avatar** — 10 sizes for avatar initials, all weight 600, `line-height = font-size`:

| Token | Size |
|---|---|
| `text.avatar.2xl` | 64/64 |
| `text.avatar.xl` | 40/40 |
| `text.avatar.l` | 30/30 |
| `text.avatar.m` | 20/20 |
| `text.avatar.s` | 18/18 |
| `text.avatar.xs` | 14/14 |
| `text.avatar.2xs` | 12/12 |
| `text.avatar.3xs` | 10/10 |
| `text.avatar.4xs` | 8/10 |
| `text.avatar.5xs` | 6/6 |

### 7.4 CSS Usage

```css
/* Heading */
font-size: var(--dls-text-heading-h2-font-size);
line-height: var(--dls-text-heading-h2-line-height);
font-weight: var(--dls-text-heading-h2-font-weight);

/* Paragraph with weight variant */
font-size: var(--dls-text-paragraph-m-font-size);
line-height: var(--dls-text-paragraph-m-line-height);
font-weight: var(--dls-text-paragraph-m-heavy-font-weight);

/* Button typography */
font-size: var(--dls-text-button-m-font-size);
line-height: var(--dls-text-button-m-line-height);
font-weight: var(--dls-text-button-m-font-weight);

/* Upper label */
font-size: var(--dls-text-upper-s-font-size);
letter-spacing: var(--dls-text-upper-s-letter-spacing);
text-transform: uppercase;
```

---

## 8. Extension Model

### 8.1 Adding a New Component

1. **Define radius token** in `tokens.json` → `radius.component.{name}`:
   ```json
   "my-component": { "$value": "{radius.m}", "$type": "dimension" }
   ```

2. **Define color tokens** in `tokens.json` → `color.component.{name}`:
   ```json
   "my-component": {
     "bg": { "base": { "$value": "{color.surface.base}", "$type": "color" }, "disabled": { "$value": "{color.surface.disabled}", "$type": "color" } },
     "fg": { "base": { "$value": "{color.text.primary}", "$type": "color" }, "disabled": { "$value": "{color.text.disabled}", "$type": "color" } },
     "border": { "base": { "$value": "{color.border.base}", "$type": "color" }, "disabled": { "$value": "{color.border.disabled}", "$type": "color" } }
   }
   ```

3. **Regenerate outputs**: Update `tokens.css`, `tokens.scss`, `tokens.ts` from `tokens.json`.

4. **Create component CSS** following the architecture:
   ```css
   .dls-my-component {
     all: unset;
     box-sizing: border-box;
     border-radius: var(--dls-radius-component-my-component);
     background: var(--dls-color-component-my-component-bg-base);
     color: var(--dls-color-component-my-component-fg-base);
     border: 1px solid var(--dls-color-component-my-component-border-base);
   }
   ```

5. **Add Storybook story** in `apps/storybook/src/stories/`.

6. **Sync to Figma** using `figma-sync-4layer.js` → `addVariables()`.

### 8.2 Adding a New Intent

1. Add primitive color scale (50–950) to `color.{intent-name}` in `tokens.json`.
2. Add semantic intent group to `color.intent.{intent-name}` with: `base`, `on-base`, `subtle`, `strong`, `text`, `border`.
3. Add `data-intent="{intent-name}"` support to existing components.
4. Regenerate all output files.

### 8.3 Adding a New Color Scale

1. Add 4-stop (100/300/500/700) or 11-stop (50–950) scale under `color.additional.{name}` in `tokens.json`.
2. If the scale will be used for intent, follow section 8.2.
3. Regenerate outputs.

### 8.4 Adding a New Shadow Level

1. Add raw shadow to `shadow.raw.{name}` in `tokens.json`.
2. Add semantic reference to `shadow.surface.{name}`.
3. Components reference `shadow.surface.*`, never `shadow.raw.*`.

### 8.5 Anti-Patterns: Extension

```
WRONG: Adding component CSS that hardcodes values from the scale
WRONG: Adding a component without a radius.component token
WRONG: Creating a "one-off" color token outside the intent system
WRONG: Adding an intent with fewer than 6 properties (base/on-base/subtle/strong/text/border)
WRONG: Defining component tokens that reference other component tokens (layer-4 → layer-4)
```

---

## 9. AI Integration Guide

### 9.1 How AI Agents Should Reference Tokens

When generating component code, AI agents MUST:

1. **Read `tokens.json`** before generating any CSS. Identify which layer-4 tokens exist for the target component.
2. **Use CSS custom properties**, never raw values.
3. **Follow the layer hierarchy**: check layer 4 first → layer 2 fallback → never layer 1.
4. **Use the internal variable pattern** (`--_base`, `--_on-base`, etc.) for intent-driven components.

```
LOOKUP ORDER:
1. Does --dls-color-component-{name}-{property}-{state} exist? → Use it.
2. Does --dls-color-{semantic}-{role} exist? → Use it.
3. No match? → Request a new token. Do NOT hardcode.
```

### 9.2 How AI Should Generate New Components

1. Parse `tokens.json` to determine available tokens.
2. Generate the component token entries (layer 4) first.
3. Generate CSS that references only those tokens.
4. Use `data-*` attributes for variants, intents, sizes.
5. Start with `all: unset; box-sizing: border-box;`.
6. Include all states: base, hover, pressed, focus-visible, disabled.
7. Test against all 6 intents.

### 9.3 How AI Must Not Bypass Architecture

| Prohibited action | Why |
|---|---|
| Using `#hex` or `rgb()` in component CSS | Breaks theming |
| Using `var(--dls-color-neutral-700)` in a component | Layer-1 leak |
| Generating inline styles with token values | Not overridable |
| Skipping disabled state | Accessibility failure |
| Using `:focus` instead of `:focus-visible` | Shows ring on mouse click |
| Using `outline` for focus ring | Doesn't follow border-radius |
| Adding `.is-*` or `.has-*` classes | Violates `data-*` convention |
| Omitting `all: unset` on new components | Inherits browser defaults |

### 9.4 AI Prompt Template for Component Generation

```
Generate a DLS-Lead component "{name}" following these rules:
- Read tokens/tokens.json for available tokens
- Component class: .dls-{name}
- Use data-variant, data-intent, data-size attributes
- Start with all: unset; box-sizing: border-box
- Reference --dls-radius-component-{name} for border radius
- Reference --dls-color-component-{name}-* for colors
- Use internal variables --_base, --_on-base, --_subtle, --_text, --_border
- Implement: filled, outline, soft, ghost variants
- Implement: hover, pressed, focus-visible, disabled states
- Hover (filled): oklch L-shift using --dls-state-l-delta-hover
- Hover (transparent): --dls-state-hover-overlay
- Focus: box-shadow with --dls-state-focus-ring-color
- Disabled: surface-disabled, text-disabled, border-disabled, cursor: not-allowed
```

---

## 10. Governance Rules

### 10.1 Token Lifecycle Stages

```
PROPOSED → EXPERIMENTAL → STABLE → DEPRECATED → REMOVED
```

| Stage | Rules |
|---|---|
| **Proposed** | Token exists in discussion/Figma only. Not in `tokens.json`. |
| **Experimental** | Added to `tokens.json` with `$description` containing `[experimental]`. May change without notice. |
| **Stable** | In `tokens.json` without experimental tag. Breaking changes require deprecation cycle. |
| **Deprecated** | `$description` contains `[deprecated: use {replacement}]`. Must remain for 2 minor versions. |
| **Removed** | Deleted from `tokens.json`. Major version bump required. |

### 10.2 Versioning Strategy

- **Patch** (0.0.x): Bug fixes, value adjustments within existing tokens.
- **Minor** (0.x.0): New tokens, new components, new intents, new scales. No removals.
- **Major** (x.0.0): Removed tokens, renamed tokens, structural changes.

### 10.3 Breaking Change Rules

| Change type | Version impact | Required action |
|---|---|---|
| Add new token | Minor | None |
| Change token value | Patch | Document in changelog |
| Rename token | Major | Deprecate old name for 2 minors first |
| Remove token | Major | Deprecate for 2 minors first |
| Change layer assignment | Major | Full migration guide required |
| Add new intent | Minor | Ensure all intent-aware components support it |
| Add new variant | Minor | None (existing variants unchanged) |

### 10.4 Token Modification Rules

| What you CAN do | What you MUST NOT do |
|---|---|
| Override layer-4 tokens per-brand | Override layer-1 primitives for a single component |
| Add new component tokens | Create component tokens that skip layer-2 semantics |
| Adjust primitive values (global effect) | Adjust primitive values expecting local effect |
| Add dark-mode overrides to layer-2 | Put dark-mode logic inside component CSS |

### 10.5 Figma ↔ Code Sync Protocol

1. Design changes are made in Figma first.
2. Token values are extracted via Figma variables API or visual inspection.
3. `tokens.json` is updated as source of truth.
4. `tokens.css`, `tokens.scss`, `tokens.ts` are regenerated.
5. Figma scripts (`figma-*.js`) can be run to push tokens back to Figma variables.

---

## 11. Quick Reference: Override Boundaries

| Scope | What to override | Selector |
|---|---|---|
| Global theme | Layer-2 semantic tokens | `[data-theme="dark"]` on `:root` |
| Brand | Layer-1 primitive scales | `[data-brand="X"]` on `:root` |
| Single component type | Layer-4 component tokens | `.dls-button { --dls-radius-component-button: 0; }` |
| Single component instance | Internal variables | `.my-special-button { --_base: var(--dls-color-danger-600); }` |
| Page-level | Layer-2 tokens scoped to container | `.dashboard-page { --dls-color-surface-base: ...; }` |

---

## 12. Running Locally

```bash
# Token reference site
npm start                    # http://localhost:3000

# Storybook
cd apps/storybook
npm run storybook            # http://localhost:6006
```

## 13. Figma Scripts

All Figma variable operations live in `tokens/figma-sync-4layer.js`. Run via Figma Console MCP (`figma_execute`) or paste into DevTools.

| Function | Purpose |
|---|---|
| `addVariables()` | Create 4-layer semantic variables aliased to primitives |
| `cleanup()` | Remove deprecated names, verify/fix aliases, backfill missing vars |
| `rebindComponents(currentPageOnly)` | Walk nodes and rebind fills/strokes/effects to 4-layer variables |

---

Documentation Complete — DLS-Lead Infrastructure Ready

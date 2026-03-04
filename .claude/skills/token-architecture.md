# Token Architecture

Reference for the 4-layer token model. Read this before adding, editing, or looking up tokens.

## Layer Model

| Layer | Name | Purpose | Referenced by |
|-------|------|---------|---------------|
| 1 | Primitives | Raw values: `color.neutral.700`, `radius.m`, `spacing.4` | Layers 2, 3, 4 only |
| 2 | System Semantics | UI roles: `color.surface.base`, `color.text.primary`, `color.intent.primary.base` | Components (when no L4 exists), layer 4 |
| 3 | State Abstraction | Behavioral: `state.lDelta.hover`, `state.disabled.opacity` | Component CSS for states |
| 4 | Component Tokens | Per-component: `color.component.button.primary.bg.base`, `radius.component.card` | Components (primary source) |

**References flow downward only.** L4→L3/L2/L1. L3→L2/L1. L2→L1. L1→raw values.

## Naming Convention

**Token path:** `category.scope.element.variant.property.state` (lowercase, dots between segments)

**CSS variable:** `--dls-{path}` with dots → hyphens.

| Token path | CSS variable |
|---|---|
| `color.neutral.700` | `--dls-color-neutral-700` |
| `color.component.button.primary.bg.base` | `--dls-color-component-button-primary-bg-base` |
| `state.lDelta.hover` | `--dls-state-l-delta-hover` |

## Fixed Enums

- **Intents:** `primary`, `success`, `warning`, `danger`, `info`, `neutral`
- **States:** `base`, `hover`, `pressed`, `focus`, `disabled`, `active`, `selected`
- **Sizes:** `xs`, `s`, `m`, `l`, `xl`, `2xl`, `3xl`

## Token Categories Quick Reference

| Category | Layer | CSS prefix |
|----------|-------|------------|
| `color.neutral/primary/info/success/warning/danger.*` | 1 | `--dls-color-{palette}-*` |
| `color.additional.*` | 1 | `--dls-color-additional-*` |
| `color.surface/text/border/intent/overlay.*` | 2 | `--dls-color-{role}-*` |
| `state.*` | 3 | `--dls-state-*` |
| `color.component.*` | 4 | `--dls-color-component-*` |
| `radius.*` / `radius.component.*` | 1 / 4 | `--dls-radius-*` |
| `spacing.*` | 1 | `--dls-spacing-*` |
| `shadow.raw.*` / `shadow.surface.*` | 1 / 2 | `--dls-shadow-*` |
| `font.*` / `text.*` | 1 | `--dls-font-*` / `--dls-text-*` |

## Component Token Template

When creating tokens for a new component:
```json
"color.component.{name}": {
  "{variant?}.bg.{state}": "→ layer 2 or 1",
  "{variant?}.fg.{state}": "→ layer 2 or 1",
  "{variant?}.border.{state}": "→ layer 2 or 1"
}
"radius.component.{name}": "→ layer 1 radius"
```

Minimum states: `base`, `disabled`. Full set: `base`, `hover`, `pressed`, `focus`, `disabled`.

## Existing Component Tokens

| Component | Has color tokens | Radius |
|-----------|-----------------|--------|
| button | primary/secondary/ghost × bg/fg/border | 6px |
| badge | 6 intents × bg/fg/border | pill |
| chip, tab, input, pagination, dropdown, sidebar | Yes | 6px |
| table, alert | Yes | 12px / 8px |
| dialog | overlay/bg/border | 12px |

## Anti-Patterns

- `--dls-btn-bg` → no abbreviations
- `--dls-colorIntentPrimaryBase` → no camelCase
- `--dls-color-button-neutral-700` → no mixing layer concerns
- L4 referencing another L4 → forbidden

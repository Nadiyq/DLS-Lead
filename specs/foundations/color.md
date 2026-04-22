---
name: Color
category: foundation
status: active
read_when:
  - choosing_color
  - mapping_intent
  - theming
source_of_truth:
  - tokens/tokens.json
  - tokens/tokens.css
---

# Color

## Overview

DLS-Lead uses a 4-layer token model. For color work, the practical rule is:

- Layer 1 primitives define raw palettes.
- Layer 2 semantics define UI meaning.
- Layer 3 state defines interaction behavior.
- Layer 4 component tokens define per-component styling.

Agents should make day-to-day color choices from Layer 2 and Layer 4, not Layer 1.

## Primitive Palettes

These palettes exist as raw scales and should not be used directly in component CSS:

- `neutral`: surfaces, text, borders
- `primary`: brand accent
- `info`
- `success`
- `warning`
- `danger`

## Semantic Color Families

### Surface

Use for backgrounds and containers.

| Token | Use |
|---|---|
| `--dls-color-surface-base` | Primary surface |
| `--dls-color-surface-subtle` | Secondary surface |
| `--dls-color-surface-muted` | Tertiary surface |
| `--dls-color-surface-strong` | Stronger surface emphasis |
| `--dls-color-surface-inverse` | Inverse or dark surfaces |
| `--dls-color-surface-disabled` | Disabled component backgrounds |

### Text

Use for text and icons.

| Token | Use |
|---|---|
| `--dls-color-text-primary` | Primary content |
| `--dls-color-text-secondary` | Secondary content |
| `--dls-color-text-inverse` | Text on dark surfaces |
| `--dls-color-text-disabled` | Disabled text/icons |
| `--dls-color-text-placeholder` | Input placeholder text |

### Border

| Token | Use |
|---|---|
| `--dls-color-border-base` | Default borders |
| `--dls-color-border-subtle` | Dividers and lighter borders |
| `--dls-color-border-strong` | Strong emphasis borders |
| `--dls-color-border-focus` | Focused input border |
| `--dls-color-border-disabled` | Disabled borders |
| `--dls-color-border-inverse` | Borders on inverse surfaces |

### Intent

Each intent follows the same closed slot model:

- `base`
- `on-base`
- `subtle`
- `strong`
- `text`
- `border`

Use pattern:

`--dls-color-intent-{intent}-{slot}`

Supported intents:

- `neutral`
- `primary`
- `info`
- `success`
- `warning`
- `danger`

## Overlay

Use overlays for modal and frosted treatments:

- `--dls-color-overlay-scrim`
- `--dls-color-overlay-backdrop`

## Color Rules

- Filled components use `intent.*.base` plus `intent.*.on-base`.
- Soft components use `intent.*.subtle` plus `intent.*.text`.
- Border emphasis should come from `border.*` or `intent.*.border`.
- Error styling uses the `danger` intent family.
- Disabled styling uses disabled semantic tokens, not reduced-opacity brand colors.

## Theming

Dark mode should override Layer 2 semantic tokens, not primitive scales per component. Components should inherit semantic remaps automatically.

## Never Do This

- Use `--dls-color-primary-700` directly in component CSS
- Hardcode `#6941C6` or any raw color literal in UI code
- Create one-off “almost semantic” names outside the token system
- Theme by writing ad hoc component overrides instead of semantic remapping

## Cross-References

- [tokens/token-reference.md](../tokens/token-reference.md)
- [motion.md](motion.md)
- [patterns/composition.md](../patterns/composition.md)

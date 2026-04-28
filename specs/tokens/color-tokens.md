---
name: Color Tokens
category: tokens
status: active
read_when:
  - choosing_color
  - mapping_intent
  - theming
source_of_truth:
  - tokens/tokens.json
  - tokens/tokens.css
---

# Color Tokens

## Overview

Use semantic and component tokens for UI work. Primitive palettes are documented here for lookup and token maintenance, not direct component use.

## Primitive Palettes

### Neutral

| Token | Value |
|---|---|
| `--dls-color-neutral-0` | `#FFFFFF` |
| `--dls-color-neutral-50` | `#FAFAFA` |
| `--dls-color-neutral-100` | `#F5F5F5` |
| `--dls-color-neutral-200` | `#E9EAEB` |
| `--dls-color-neutral-300` | `#D5D7DA` |
| `--dls-color-neutral-400` | `#A4A7AE` |
| `--dls-color-neutral-500` | `#717680` |
| `--dls-color-neutral-600` | `#535862` |
| `--dls-color-neutral-700` | `#414651` |
| `--dls-color-neutral-800` | `#252B37` |
| `--dls-color-neutral-900` | `#181D27` |
| `--dls-color-neutral-950` | `#0A0D12` |

### Primary

| Token | Value |
|---|---|
| `--dls-color-primary-50` | `#F9F5FF` |
| `--dls-color-primary-100` | `#F4EBFF` |
| `--dls-color-primary-200` | `#E9D7FE` |
| `--dls-color-primary-300` | `#D6BBFB` |
| `--dls-color-primary-400` | `#B692F6` |
| `--dls-color-primary-500` | `#9E77ED` |
| `--dls-color-primary-600` | `#7F56D9` |
| `--dls-color-primary-700` | `#6941C6` |
| `--dls-color-primary-800` | `#53389E` |
| `--dls-color-primary-900` | `#42307D` |
| `--dls-color-primary-950` | `#2C1C5F` |

### Intent Palettes

| Family | Base scale |
|---|---|
| `info` | `50` through `950`, base semantic token maps to `--dls-color-info-700` in light mode |
| `success` | `50` through `950`, base semantic token maps to `--dls-color-success-700` in light mode |
| `warning` | `50` through `950`, base semantic token maps to `--dls-color-warning-700` in light mode |
| `danger` | `50` through `950`, base semantic token maps to `--dls-color-danger-600` in light mode |

Use the full primitive values in `tokens/tokens.css` only when editing token definitions.

## Semantic Tokens

### Surface

- `--dls-color-surface-base`
- `--dls-color-surface-subtle`
- `--dls-color-surface-muted`
- `--dls-color-surface-strong`
- `--dls-color-surface-inverse`
- `--dls-color-surface-disabled`

### Text

- `--dls-color-text-primary`
- `--dls-color-text-secondary`
- `--dls-color-text-inverse`
- `--dls-color-text-disabled`
- `--dls-color-text-placeholder`

### Border

- `--dls-color-border-base`
- `--dls-color-border-subtle`
- `--dls-color-border-strong`
- `--dls-color-border-focus`
- `--dls-color-border-disabled`
- `--dls-color-border-inverse`

### Intent

Pattern: `--dls-color-intent-{intent}-{slot}`

Intents: `neutral`, `primary`, `info`, `success`, `warning`, `danger`.

Slots: `base`, `on-base`, `subtle`, `strong`, `text`, `border`.

## Dark Theme

Dark theme overrides Layer 2 semantic tokens. Components should inherit those remaps through `var()` references.

## Never Do This

- Use primitive tokens directly in component CSS.
- Hardcode palette values.
- Create one-off semantic names outside the existing slot model.

## Cross-References

- [token-reference.md](token-reference.md)
- [../foundations/color.md](../foundations/color.md)


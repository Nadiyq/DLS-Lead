---
name: Elevation
category: foundation
status: active
read_when:
  - shadow_choice
  - surface_elevation
  - overlay_choice
source_of_truth:
  - tokens/tokens.json
  - tokens/tokens.css
---

# Elevation

## Overview

DLS-Lead defines semantic shadows for surfaces, overlays, and focus treatment. Components should use semantic shadow tokens, not raw shadow primitives.

## Semantic Shadow Tokens

| Token | Use |
|---|---|
| `--dls-shadow-surface-sm` | Small elevated surface |
| `--dls-shadow-surface-md` | Default elevated surface |
| `--dls-shadow-surface-lg` | Large elevated surface or modal |
| `--dls-shadow-overlay` | Dropdowns, popovers, floating overlays |
| `--dls-shadow-focus-ring` | Keyboard focus treatment |

## Raw Shadow Tokens

These exist for token composition, not direct component usage:

- `--dls-shadow-raw-sm`
- `--dls-shadow-raw-md`
- `--dls-shadow-raw-lg`

## Usage Rules

- Cards and elevated panels: surface shadows
- Dropdowns and popovers: overlay shadow
- Focus: ring shadow with the focus color token
- Backdrop glass effects: use `--dls-effect-backdrop-filter`, not custom blur values

## Focus Treatment

- Visual focus uses a ring, not a hard outline style
- Focus color comes from the state layer
- Non-filled controls may need a surface background under the ring for contrast

## Never Do This

- Compose ad hoc box-shadows in component CSS
- Use raw shadow primitives in a component if a semantic shadow exists
- Replace focus treatment with custom outlines

## Cross-References

- [motion.md](motion.md)
- [tokens/token-reference.md](../tokens/token-reference.md)

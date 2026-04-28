---
name: Elevation Tokens
category: tokens
status: active
read_when:
  - elevation_decision
  - overlay_decision
  - focus_state
source_of_truth:
  - tokens/tokens.json
  - tokens/tokens.css
---

# Elevation Tokens

## Shadow Tokens

| Token | Value | Use |
|---|---|---|
| `--dls-shadow-surface-sm` | `0 1px 2px rgba(0, 0, 0, 0.05)` | Low raised surfaces |
| `--dls-shadow-surface-md` | `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)` | Menus and elevated panels |
| `--dls-shadow-surface-lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)` | Dialogs and large panels |
| `--dls-shadow-overlay` | `0 25px 50px -12px rgba(0, 0, 0, 0.25)` | Overlay surfaces |
| `--dls-shadow-focus-ring` | `0 0 0 2px var(--dls-state-focus-ring-color)` | Focus ring |

## Rules

- Use elevation only when a surface needs to float above nearby content.
- Pair overlay shadows with semantic surface and border tokens.
- Use focus ring shadow for keyboard focus, not regular elevation.
- Do not use raw `box-shadow` values in component CSS unless creating or updating the token layer.

## Never Do This

- Stack several shadows to invent a new elevation level.
- Use shadows to replace borders in dense data layouts.
- Apply overlay shadow to static cards in a list.

## Cross-References

- [token-reference.md](token-reference.md)
- [../foundations/elevation.md](../foundations/elevation.md)
- [../foundations/z-index.md](../foundations/z-index.md)


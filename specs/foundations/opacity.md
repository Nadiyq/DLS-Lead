---
name: Opacity
category: foundation
status: active
read_when:
  - overlay_decision
  - disabled_state
  - hover_pressed_focus
source_of_truth:
  - tokens/tokens.json
  - tokens/tokens.css
---

# Opacity

## Overview

Opacity is used for overlays and disabled behavior. It is not a general-purpose way to make colors feel subtle. Prefer semantic color tokens first.

## Primitive Opacity Tokens

| Token | Value |
|---|---|
| `--dls-color-opacity-light-20` | `rgba(255, 255, 255, 0.2)` |
| `--dls-color-opacity-light-40` | `rgba(255, 255, 255, 0.4)` |
| `--dls-color-opacity-light-60` | `rgba(255, 255, 255, 0.6)` |
| `--dls-color-opacity-light-80` | `rgba(255, 255, 255, 0.8)` |
| `--dls-color-opacity-dark-20` | `rgba(0, 0, 0, 0.2)` |
| `--dls-color-opacity-dark-40` | `rgba(0, 0, 0, 0.4)` |
| `--dls-color-opacity-dark-60` | `rgba(0, 0, 0, 0.6)` |
| `--dls-color-opacity-dark-80` | `rgba(0, 0, 0, 0.8)` |

## State Opacity Tokens

| Token | Use |
|---|---|
| `--dls-state-hover-overlay` | Hover on transparent, outline, dotted, ghost, and link surfaces |
| `--dls-state-pressed-overlay` | Pressed on transparent, outline, dotted, ghost, and link surfaces |
| `--dls-state-disabled-opacity` | Disabled treatment where component tokens alone are not enough |

## Overlay Tokens

- `--dls-color-overlay-scrim` for modal/dialog scrims.
- `--dls-color-overlay-backdrop` for frosted or glass-like overlays.

## Rules

- Use semantic text and surface tokens before opacity.
- Use disabled text, border, and surface tokens for disabled controls, then apply disabled opacity only when the component spec calls for it.
- Use state overlays for transparent interactive variants.
- Theme overlays through the token system; dark mode remaps state overlays.

## Never Do This

- Lower opacity on body text to create secondary text.
- Use arbitrary values like `opacity: 0.64`.
- Apply opacity to a parent when it will also fade nested focus rings, badges, or active controls.

## Cross-References

- [color.md](color.md)
- [motion.md](motion.md)
- [../tokens/motion-tokens.md](../tokens/motion-tokens.md)


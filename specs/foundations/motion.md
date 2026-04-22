---
name: Motion
category: foundation
status: active
read_when:
  - interaction_state
  - hover_pressed_focus
  - transitions
source_of_truth:
  - tokens/tokens.json
  - tokens/tokens.css
  - apps/storybook/src/stories/button.css
---

# Motion

## Overview

DLS-Lead separates interaction behavior from color. The state layer defines how components shift on hover, press, focus, and disabled states.

## State Tokens

| Token | Value | Use |
|---|---|---|
| `--dls-state-l-delta-hover` | `-0.05` | OKLCH hover shift |
| `--dls-state-l-delta-pressed` | `-0.10` | OKLCH pressed shift |
| `--dls-state-hover-overlay` | theme-aware overlay | Hover for transparent/non-filled variants |
| `--dls-state-pressed-overlay` | theme-aware overlay | Pressed for transparent/non-filled variants |
| `--dls-state-disabled-opacity` | `0.38` | Disabled treatment |
| `--dls-state-focus-ring-color` | focus ring color | Keyboard focus |

## Behavior Rules

- Filled and soft variants usually use OKLCH lightness shifts.
- Outline, dotted, ghost, and link variants usually use hover and pressed overlays.
- Focus uses `:focus-visible` and the focus ring token.
- Disabled states swap to disabled semantic tokens and reduce interaction, instead of keeping active intent colors.

## Transition Guidance

The current component library commonly uses `150ms ease` for color, border, shadow, and transform transitions. Until dedicated motion tokens exist, that is the default interaction timing for new DLS-consistent UI.

## State Checklist

When documenting or building an interactive component, verify:

- base
- hover
- pressed / active
- focus-visible
- disabled
- error, if applicable

## Never Do This

- Hardcode one-off hover colors
- Use different transition timings per similar component without a system reason
- Use plain `:focus` as the visual focus trigger

## Cross-References

- [color.md](color.md)
- [elevation.md](elevation.md)
- [patterns/composition.md](../patterns/composition.md)

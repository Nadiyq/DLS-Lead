---
name: Motion Tokens
category: tokens
status: active
read_when:
  - hover_pressed_focus
  - transition_decision
  - disabled_state
source_of_truth:
  - tokens/tokens.json
  - tokens/tokens.css
  - apps/storybook/src/stories/
---

# Motion Tokens

## State Tokens

| Token | Value | Use |
|---|---:|---|
| `--dls-state-l-delta-hover` | `-0.05` | OKLCH hover shift |
| `--dls-state-l-delta-pressed` | `-0.10` | OKLCH pressed shift |
| `--dls-state-disabled-opacity` | `0.38` | Disabled opacity treatment |

## Overlay Tokens

| Token | Light mode | Dark mode |
|---|---|---|
| `--dls-state-hover-overlay` | `rgba(0, 0, 0, 0.05)` | `rgba(255, 255, 255, 0.08)` |
| `--dls-state-pressed-overlay` | `rgba(0, 0, 0, 0.10)` | `rgba(255, 255, 255, 0.15)` |

## Focus Token

| Token | Use |
|---|---|
| `--dls-state-focus-ring-color` | Color for focus ring shadows |

## Transition Guidance

There is not yet a dedicated duration/easing token family. Existing components commonly use:

```css
transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease, box-shadow 150ms ease;
```

Use `150ms ease` for comparable color, border, shadow, opacity, and transform transitions until a formal token family exists.

## Rules

- Filled components use OKLCH lightness deltas when the component already supports that pattern.
- Transparent variants use overlay tokens for hover and pressed states.
- Disabled state should remove interaction and use disabled semantic tokens.
- Focus uses `:focus-visible`, never plain `:focus` as the visual trigger.

## Never Do This

- Hardcode hover colors.
- Use different timings for sibling controls without a documented reason.
- Animate layout dimensions in dense controls.

## Cross-References

- [token-reference.md](token-reference.md)
- [../foundations/motion.md](../foundations/motion.md)
- [../foundations/opacity.md](../foundations/opacity.md)


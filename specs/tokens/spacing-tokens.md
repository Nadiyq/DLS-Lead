---
name: Spacing Tokens
category: tokens
status: active
read_when:
  - spacing_decision
  - layout_decision
  - component_padding
source_of_truth:
  - tokens/tokens.json
  - tokens/tokens.css
---

# Spacing Tokens

## Closed Scale

| Token | Value | Typical use |
|---|---:|---|
| `--dls-spacing-0` | `0px` | Flush edges, reset |
| `--dls-spacing-0-5` | `2px` | Hairline alignment and dense nudges |
| `--dls-spacing-1` | `4px` | Tight inline gaps |
| `--dls-spacing-1-5` | `6px` | Dense control internals |
| `--dls-spacing-2` | `8px` | Default icon/text gap |
| `--dls-spacing-2-5` | `10px` | Compact vertical padding |
| `--dls-spacing-3` | `12px` | Control padding and grouped rows |
| `--dls-spacing-4` | `16px` | Card padding and standard stacks |
| `--dls-spacing-6` | `24px` | Larger panel padding |
| `--dls-spacing-8` | `32px` | Section separation |
| `--dls-spacing-10` | `40px` | Large layout spacing |
| `--dls-spacing-11` | `44px` | Control height target |
| `--dls-spacing-12` | `48px` | Large block rhythm |
| `--dls-spacing-14` | `56px` | Large component height |
| `--dls-spacing-16` | `64px` | Page-level rhythm |

## Rules

- Use the nearest token, not a new raw value.
- Prefer `--dls-spacing-2`, `--dls-spacing-3`, and `--dls-spacing-4` for most product UI.
- Use half-steps only for dense control internals.
- If a component has documented padding, use the component rather than overriding its internals.

## Never Do This

- Invent `14px`, `18px`, `22px`, or `28px` spacing.
- Mix raw `px` and spacing tokens in the same component.
- Solve component fit by shaving random padding from a single instance.

## Cross-References

- [token-reference.md](token-reference.md)
- [../foundations/spacing.md](../foundations/spacing.md)
- [../foundations/grid.md](../foundations/grid.md)


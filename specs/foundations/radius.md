---
name: Radius
category: foundation
status: active
read_when:
  - border_radius_choice
  - component_shape_choice
source_of_truth:
  - tokens/tokens.json
  - tokens/tokens.css
---

# Radius

## Overview

DLS-Lead separates raw radius primitives from component radii. Agents should use component radii in component CSS and only touch primitive radii when editing tokens.

## Primitive Radius Scale

| Token | Value |
|---|---|
| `--dls-radius-0` | `0px` |
| `--dls-radius-xs` | `2px` |
| `--dls-radius-s` | `4px` |
| `--dls-radius-m` | `6px` |
| `--dls-radius-l` | `8px` |
| `--dls-radius-xl` | `12px` |
| `--dls-radius-2xl` | `16px` |
| `--dls-radius-full` | `9999px` |

## Common Component Radii

| Component family | Token | Value |
|---|---|---|
| Button | `--dls-radius-component-button` | `6px` |
| Input / dropdown / tab | `--dls-radius-component-input` / `tab` / `dropdown` | `6px` |
| Card / table / list / modal / empty state | component radius | `12px` |
| Chip | `--dls-radius-component-chip` | `6px` |
| Avatar circle / dot | `--dls-radius-component-avatar-circle` / `avatar-dot` | `full` |
| Badge / progress / round controls | component radius | `full` |
| Checkbox / list item / breadcrumb | component radius | `4px` |

## Shape Rules

- Pilled, compact, or count-based UI often uses `full`.
- Dense controls usually use `4px` or `6px`.
- Surfaces and containers usually use `8px` to `12px`.
- Large panels and cards should feel softer than inline controls.

## Never Do This

- Use a primitive radius directly in component CSS when a component token exists
- Introduce one-off values like `10px`
- Mix multiple unrelated radii inside one component without a documented reason

## Cross-References

- [tokens/token-reference.md](../tokens/token-reference.md)
- [patterns/composition.md](../patterns/composition.md)

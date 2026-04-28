---
name: Borders
category: foundation
status: active
read_when:
  - border_decision
  - divider_decision
  - component_surface
source_of_truth:
  - tokens/tokens.json
  - tokens/tokens.css
  - apps/storybook/src/stories/
---

# Borders

## Overview

Borders communicate structure, interaction state, and emphasis. DLS-Lead separates border color from radius and elevation: pick the border token for meaning, the radius token for shape, and the shadow token only when the surface is elevated.

## Border Color Tokens

| Token | Use |
|---|---|
| `--dls-color-border-base` | Default component borders |
| `--dls-color-border-subtle` | Dividers, panel separators, low-emphasis outlines |
| `--dls-color-border-strong` | Hovered or emphasized controls |
| `--dls-color-border-focus` | Focused inputs when a border change is part of the component |
| `--dls-color-border-disabled` | Disabled controls |
| `--dls-color-border-inverse` | Borders on inverse surfaces |

Intent borders use the closed pattern `--dls-color-intent-{intent}-border`.

## Width Rules

- `1px` is the default border width for controls, cards, menus, inputs, and dividers.
- `2px` is reserved for intentionally stronger component affordances, such as selected table markers, avatar strokes, or internal focus treatments already documented in Storybook.
- Do not introduce new width steps without adding a token or documented component rule.

## Divider Rules

- Use `--dls-color-border-subtle` for separators between same-level content.
- Use `--dls-color-border-base` for component boundaries.
- Avoid stacking a border and a shadow unless the component is intentionally elevated.

## Radius Connection

Use component radius tokens for bordered components:

- Buttons: `--dls-radius-component-button`
- Inputs and dropdowns: `--dls-radius-component-input`
- Cards and tables: `--dls-radius-component-card` / `--dls-radius-component-table`
- Lists and menus: `--dls-radius-component-list` and `--dls-radius-component-list-item`

## Never Do This

- Hardcode border colors.
- Use primitive neutral colors directly for borders.
- Add one-off border widths to solve spacing or alignment.
- Use border radius primitives directly in component CSS when a component token exists.

## Cross-References

- [color.md](color.md)
- [radius.md](radius.md)
- [elevation.md](elevation.md)
- [../tokens/color-tokens.md](../tokens/color-tokens.md)


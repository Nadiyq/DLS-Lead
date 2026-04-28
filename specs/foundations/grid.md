---
name: Grid
category: foundation
status: active
read_when:
  - layout_decision
  - dense_data_layout
  - responsive_layout
source_of_truth:
  - tokens/tokens.json
  - tokens/tokens.css
  - apps/storybook/src/stories/
---

# Grid

## Overview

DLS-Lead layout rhythm is driven by the spacing scale, not by a separate grid token family. Use spacing tokens for gaps and padding, and use CSS grid only when the content has real rows, columns, or repeated tracks.

## Layout Rules

- Use `--dls-spacing-*` for `gap`, padding, and section rhythm.
- Use `min-width: 0` inside flex or grid children that contain text.
- Prefer stable tracks for fixed-format controls such as calendars, tables, and grouped inputs.
- Use full-width bands or unframed layouts for page sections; use cards only for repeatable items or framed tools.

## Common Patterns

| Need | Pattern |
|---|---|
| Button row | Flex row with tokenized gap |
| Form stack | Single column with field-level spacing from component specs |
| Calendar-like matrix | CSS grid with fixed repeated tracks |
| Data table | Use the DLS `Table` component |
| Toolbar | Flex row, wrapping only when documented |

## Spacing Bands

- Compact control gaps: `--dls-spacing-1` to `--dls-spacing-2`
- Field groups: `--dls-spacing-3` to `--dls-spacing-4`
- Card and panel padding: `--dls-spacing-4` to `--dls-spacing-6`
- Page-level separation: `--dls-spacing-8` and above

## Never Do This

- Use raw grid gaps when a spacing token exists.
- Build tabular data with arbitrary div grids instead of `Table`.
- Let hover, focus, or dynamic labels resize a fixed-format grid.
- Use decorative nested cards as layout scaffolding.

## Cross-References

- [spacing.md](spacing.md)
- [breakpoints.md](breakpoints.md)
- [../components/table.md](../components/table.md)
- [../patterns/composition.md](../patterns/composition.md)


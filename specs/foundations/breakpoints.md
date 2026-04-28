---
name: Breakpoints
category: foundation
status: draft
read_when:
  - responsive_layout
  - mobile_layout
  - viewport_decision
source_of_truth:
  - apps/storybook/src/stories/
---

# Breakpoints

## Overview

DLS-Lead does not currently publish a closed breakpoint token scale in `tokens/tokens.json`. Until that exists, responsive decisions should stay component-local and should not invent global breakpoint names.

## Current Documented Pattern

Storybook components use narrow, component-specific responsive rules where required. For example, dialogs collapse around small mobile widths.

## Allowed Approach

- Prefer fluid layouts with `min-width: 0`, flexible grids, and tokenized spacing before adding a media query.
- Use component-local media queries only when the component behavior genuinely changes.
- Keep responsive values close to the component they affect.
- If the same breakpoint appears in multiple components, propose a breakpoint token before spreading it further.

## Suggested Working Bands

These bands are descriptive only, not token names:

| Band | Use |
|---|---|
| Small mobile | Single-column controls and full-width actions |
| Mobile / tablet | Stack dense layouts before content becomes cramped |
| Desktop | Preserve data density and side-by-side control groups |

## Stop-And-Ask Cases

- A new global breakpoint family is needed.
- A page layout requires shared desktop/tablet/mobile behavior across multiple screens.
- A component needs behavior that conflicts with existing Storybook examples.

## Never Do This

- Create ad hoc global variables like `--breakpoint-md`.
- Scatter the same raw breakpoint through several components.
- Use viewport-scaled font sizes.

## Cross-References

- [grid.md](grid.md)
- [spacing.md](spacing.md)
- [../patterns/composition.md](../patterns/composition.md)


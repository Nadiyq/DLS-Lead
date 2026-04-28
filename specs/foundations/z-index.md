---
name: Z-Index
category: foundation
status: draft
read_when:
  - overlay_decision
  - popover_menu
  - layering_issue
source_of_truth:
  - apps/storybook/src/stories/
---

# Z-Index

## Overview

DLS-Lead does not currently publish z-index tokens in `tokens/tokens.json`. Treat layering as a component contract, not a free-form number scale.

## Current Pattern

Existing overlay-like components use small local z-index values where needed, most commonly:

| Value | Current use |
|---:|---|
| `1` | Raise focused items above neighbors inside grouped controls |
| `10` | Local dropdown, popover, or menu surface above its trigger |

These are implementation details until a formal z-index token scale exists.

## Rules

- Keep z-index local to the component stacking context.
- Prefer DOM order and positioning before adding z-index.
- Use `1` only for local focus/selection elevation inside a component.
- Use `10` only for component-owned popovers or menu surfaces.
- If a surface must layer above dialogs, app chrome, or another component family, stop and define a tokenized layering model first.

## Stop-And-Ask Cases

- A new component needs global overlay layering.
- Two existing overlay components conflict.
- You are tempted to use values above `10`.
- A component needs `position: fixed` layering.

## Never Do This

- Invent values like `999`, `1000`, or `9999`.
- Use z-index to fix spacing, clipping, or layout problems.
- Depend on global page z-index assumptions from inside reusable components.

## Cross-References

- [elevation.md](elevation.md)
- [opacity.md](opacity.md)
- [../components/dropdown.md](../components/dropdown.md)


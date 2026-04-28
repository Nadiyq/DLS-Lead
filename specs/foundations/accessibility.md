---
name: Accessibility
category: foundation
status: active
read_when:
  - interactive_component
  - form_component
  - navigation_component
  - state_design
source_of_truth:
  - CLAUDE.md
  - apps/storybook/src/stories/
  - tokens/tokens.json
---

# Accessibility

## Overview

DLS-Lead components should be keyboard reachable, screen-reader understandable, and token-driven in every state. Accessibility is not an override layer; it is part of the component contract.

## Keyboard Rules

- Use native interactive elements first: `button`, `input`, `select`, `a`, and semantic table elements.
- Custom interactive wrappers must declare the correct `role`, keyboard behavior, and `tabIndex`.
- Focus styling uses `:focus-visible` plus `--dls-state-focus-ring-color` or `--dls-shadow-focus-ring`.
- Hover-only affordances must also be reachable by focus.
- Disabled controls must use native `disabled` where possible. For non-native controls, pair `aria-disabled` with blocked pointer and keyboard activation.

## Naming Rules

- Icon-only buttons require an `aria-label`.
- Repeated controls need labels that include the target item, such as `Pin Status column`.
- Inputs need visible labels or an explicit accessible name.
- Error and hint text should be connected to the field with `aria-describedby` when the component supports it.

## State Rules

| State | Required treatment |
|---|---|
| Hover | Visual change from tokenized state overlay or OKLCH state shift |
| Pressed / active | Tokenized pressed overlay or selected state |
| Focus-visible | Visible ring or focus shadow, never color alone |
| Disabled | Disabled tokens plus native or ARIA disabled semantics |
| Error | `danger` intent tokens plus text that explains the issue |
| Selected | `aria-selected`, `aria-current`, or checked semantics where applicable |

## Contrast Rules

- Text uses semantic text tokens, not primitive color scales.
- Filled controls use `--dls-color-intent-*-on-base` for text and icons.
- Soft controls use `--dls-color-intent-*-text` on subtle backgrounds.
- Do not reduce opacity on active text as a substitute for a disabled token.

## Component Expectations

- Buttons: native button, `aria-label` when icon-only.
- Dropdowns and menus: listbox/menu semantics as documented by Storybook; rows are `ListItem`.
- Tabs: active tab exposes selected/current state.
- Tables: keep semantic table structure for tabular data.
- Dialogs: must expose modal semantics, title, close path, and keyboard escape behavior.

## Never Do This

- Hide focus rings.
- Depend on hover for the only available action.
- Use placeholder text as the only field label.
- Use a `div` or `span` as a button when a native `button` works.
- Indicate errors with color alone.

## Cross-References

- [color.md](color.md)
- [motion.md](motion.md)
- [../components/button.md](../components/button.md)
- [../components/dropdown.md](../components/dropdown.md)


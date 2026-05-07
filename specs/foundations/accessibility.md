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
  - ../patterns/accessibility-generation.md
---

# Accessibility

## Overview

DLS-Lead components should be keyboard reachable, screen-reader understandable, and token-driven in every state. Accessibility is not an override layer; it is part of the component contract.

## Semantic HTML Rules

- Use `<button>` for actions. Never use `<div onClick>` or `<span onClick>`.
- Use `<a href="...">` for navigation. Never use a click handler on non-link text to navigate.
- Use `<nav>`, `<main>`, `<aside>`, `<header>`, and `<footer>` for landmarks when composing screens.
- Use `<h1>` through `<h6>` in hierarchical order without skipping levels.
- Use `<ul>` / `<ol>` with `<li>` for lists.
- Use `<table>`, `<thead>`, `<tbody>`, `<th>`, and `<td>` for tabular data.
- Use `<form>`, `<fieldset>`, `<legend>`, and `<label>` for forms and grouped controls.
- Use `<dialog>` with its modal API for modal dialogs when building a native dialog primitive.
- Use `<details>` / `<summary>` for simple disclosures when a full custom disclosure component is unnecessary.

## Keyboard Rules

- Use native interactive elements first: `button`, `input`, `select`, `a`, and semantic table elements.
- Custom interactive wrappers must declare the correct `role`, keyboard behavior, and `tabIndex`.
- Focus styling uses `:focus-visible` plus `--dls-state-focus-ring-color` or `--dls-shadow-focus-ring`.
- Hover-only affordances must also be reachable by focus.
- Disabled controls must use native `disabled` where possible. For non-native controls, pair `aria-disabled` with blocked pointer and keyboard activation.
- All interactive elements must be reachable and operable by keyboard.
- Composite widgets must follow WAI-ARIA Authoring Practices keyboard behavior, including arrow-key movement where expected.
- Modal overlays must trap focus while open, restore focus on close, and close with Escape.

## Naming Rules

- Every interactive element must have an accessible name from visible text, `aria-label`, or `aria-labelledby`.
- Icon-only buttons require an `aria-label` on the button and `aria-hidden="true"` on the icon.
- Repeated controls need labels that include the target item, such as `Pin Status column`.
- Inputs need associated `<label>` elements or an explicit accessible name.
- Error and hint text should be connected to the field with `aria-describedby` when the component supports it.
- Decorative images require `alt=""` or `aria-hidden="true"`.

## State Rules

| State | Required treatment |
|---|---|
| Hover | Visual change from tokenized state overlay or OKLCH state shift |
| Pressed / active | Tokenized pressed overlay or selected state |
| Focus-visible | Visible ring or focus shadow, never color alone |
| Disabled | Disabled tokens plus native or ARIA disabled semantics |
| Error | `danger` intent tokens plus text that explains the issue |
| Selected | `aria-selected`, `aria-current`, or checked semantics where applicable |
| Expanded | `aria-expanded` on the control that opens or collapses content |
| Checked | Native checked state or `aria-checked` for custom checkbox/radio/switch primitives |
| Current | `aria-current` for the current page, step, date, or location |
| Status | `aria-live="polite"` for non-critical dynamic status messages |

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
- Comboboxes, listboxes, menus, tabs, and dialogs should be composed from existing DLS components first. If a new primitive is truly required, use a proven accessibility library such as Headless UI, Radix UI, or React Aria rather than hand-rolling behavior.
- Motion that changes transform, position, or scale must respect `prefers-reduced-motion`. Simple color transitions on hover/focus are acceptable without a motion guard.

## Styling And Testing Rules

- In DLS-Lead, style with DLS CSS custom properties and tokens. Do not introduce Tailwind into DLS components unless the target package already uses Tailwind.
- All interactive elements need a visible `:focus-visible` treatment using DLS focus ring tokens.
- Tests should query interactive UI by role and accessible name, such as `getByRole('button', { name: /save/i })`, not `getByTestId`.

## Never Do This

- Hide focus rings.
- Depend on hover for the only available action.
- Use placeholder text as the only field label.
- Use a `div` or `span` as a button when a native `button` works.
- Indicate errors with color alone.
- Build complex ARIA widgets from scratch when an existing DLS component or proven accessibility primitive can provide the behavior.

## Cross-References

- [color.md](color.md)
- [motion.md](motion.md)
- [../patterns/accessibility-generation.md](../patterns/accessibility-generation.md)
- [../components/button.md](../components/button.md)
- [../components/dropdown.md](../components/dropdown.md)

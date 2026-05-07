---
name: Accessible Component Generation
category: pattern
status: active
read_when:
  - generating_component
  - interactive_component
  - form_component
  - navigation_component
  - keyboard_behavior
related:
  - ../session-start.md
  - ../foundations/accessibility.md
  - ../foundations/motion.md
  - composition.md
---

# Accessible Component Generation

Use this pattern whenever an agent generates or edits React UI. These rules are part of the component contract, not a post-pass.

## HTML Semantics

- Use `<button>` for actions. Never use `<div onClick>` or `<span onClick>`.
- Use `<a href="...">` for navigation. Never use `<span onClick={navigate}>`.
- Use `<nav>`, `<main>`, `<aside>`, `<header>`, and `<footer>` for landmarks.
- Use `<h1>` through `<h6>` in correct hierarchical order. Do not skip levels.
- Use `<ul>` / `<ol>` with `<li>` for lists.
- Use `<table>`, `<thead>`, `<tbody>`, `<th>`, and `<td>` for tabular data.
- Use `<form>`, `<fieldset>`, `<legend>`, and `<label>` for forms.
- Use `<dialog>` with `showModal()` for native modal dialog primitives.
- Use `<details>` / `<summary>` for simple disclosures when appropriate.

## Accessibility

- Every interactive element must have an accessible name from visible text, `aria-label`, or `aria-labelledby`.
- Every form input must have an associated `<label>` or `aria-label`.
- Icon-only buttons require `aria-label` on the button and `aria-hidden="true"` on the icon.
- Decorative images require `alt=""` or `aria-hidden="true"`.
- Dynamic state must use `aria-expanded`, `aria-selected`, `aria-checked`, `aria-current`, `aria-disabled`, or native equivalents as appropriate.
- Status messages use `aria-live="polite"`.
- Help text and error messages use `aria-describedby`.

## Keyboard Interaction

- All interactive elements must be keyboard accessible.
- Use visible `:focus-visible` styles. Never remove focus outlines without an equivalent DLS focus ring replacement.
- Composite widgets must follow WAI-ARIA Authoring Practices, including arrow-key behavior where expected.
- Modals must trap focus and restore it on close.
- Escape must close overlays.

## Motion

- Respect `prefers-reduced-motion` for transitions involving transform, position, scaling, or other spatial movement.
- If the target app uses Tailwind, use `motion-safe:` or `motion-reduce:` variants for guarded movement.
- In DLS-Lead component CSS, use media queries and DLS motion tokens instead of introducing Tailwind.
- Simple color transitions on hover/focus are acceptable without motion guards.

## Library Preferences

- Use existing documented DLS components first.
- For complex patterns such as tabs, combobox, dialog, listbox, and menu, do not hand-roll ARIA behavior.
- If DLS lacks a needed primitive, stop and ask. When approved, use Headless UI, Radix UI, or React Aria instead of building complex behavior from scratch.
- Include DLS `:focus-visible` ring styles on all interactive elements.

## Testing

- Query elements with role and accessible name, such as `getByRole('button', { name: /save/i })`.
- Do not prefer `getByTestId` for user-facing interactive UI.

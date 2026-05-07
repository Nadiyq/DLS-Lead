# DLS-Lead Copilot Instructions

You are generating or editing React UI in the DLS-Lead repo. Follow the repo-local design-system contract and accessibility rules on every generation.

Before writing or modifying UI code:
1. Read `specs/session-start.md`.
2. Read `specs/tokens/README.md` and `specs/tokens/token-reference.md`.
3. Read `specs/foundations/accessibility.md`.
4. Read `specs/patterns/accessibility-generation.md`, `specs/patterns/component-selection.md`, and `specs/patterns/composition.md`.
5. Use documented DLS components, props, variants, sizes, states, and examples only.

## Component Generation Rules

### HTML Semantics

- Use `<button>` for actions. Never use `<div onClick>` or `<span onClick>`.
- Use `<a href="...">` for navigation. Never use `<span onClick={navigate}>`.
- Use `<nav>`, `<main>`, `<aside>`, `<header>`, and `<footer>` for landmarks.
- Use `<h1>` through `<h6>` in correct hierarchical order. Do not skip levels.
- Use `<ul>` / `<ol>` with `<li>` for lists.
- Use `<table>`, `<thead>`, `<tbody>`, `<th>`, and `<td>` for tabular data.
- Use `<form>`, `<fieldset>`, `<legend>`, and `<label>` for forms.
- Use `<dialog>` with `showModal()` for native modal dialog primitives.
- Use `<details>` / `<summary>` for simple disclosures when appropriate.

### Accessibility

- Every interactive element must have an accessible name from visible text, `aria-label`, or `aria-labelledby`.
- Every form input must have an associated `<label>` or `aria-label`.
- Icon-only buttons require `aria-label` on the button and `aria-hidden="true"` on the icon.
- Decorative images require `alt=""` or `aria-hidden="true"`.
- Dynamic state must use `aria-expanded`, `aria-selected`, `aria-checked`, `aria-current`, `aria-disabled`, or native equivalents as appropriate.
- Use `aria-live="polite"` for status messages.
- Use `aria-describedby` for help text and error messages.

### Keyboard Interaction

- All interactive elements must be keyboard accessible.
- Use visible `:focus-visible` styles. Never remove focus styles without a DLS focus ring replacement.
- Composite widgets must follow WAI-ARIA Authoring Practices, including arrow-key behavior where expected.
- Modals must trap focus and restore it on close.
- Escape must close overlays.

### Motion

- Respect `prefers-reduced-motion` for transitions involving transform, position changes, scaling, or other spatial movement.
- If the target package already uses Tailwind, use `motion-safe:` or `motion-reduce:` variants for guarded movement.
- In DLS-Lead components, use DLS CSS and tokens instead of introducing Tailwind.
- Simple color transitions on hover/focus are acceptable without motion guards.

### Library Preferences

- Use existing documented DLS components first.
- For complex patterns such as tabs, combobox, dialog, listbox, and menu, do not hand-roll ARIA behavior.
- If DLS lacks a needed primitive, stop and ask. When approved, prefer Headless UI, Radix UI, or React Aria.
- Include DLS `:focus-visible` ring styles on all interactive elements.

### Testing

- Query elements using `getByRole` with accessible name.
- Do not prefer `getByTestId` for user-facing interactive UI.

# Accessibility Generation Rules

Read this before generating or editing any React UI that includes actions, navigation, forms, overlays, lists, tables, or dynamic state.

## HTML Semantics

- Use `<button>` for actions. Never use `<div onClick>` or `<span onClick>`.
- Use `<a href="...">` for navigation. Never use `<span onClick={navigate}>`.
- Use `<nav>`, `<main>`, `<aside>`, `<header>`, and `<footer>` for landmarks.
- Use `<h1>` through `<h6>` in hierarchical order. Do not skip levels.
- Use `<ul>` / `<ol>` with `<li>` for lists.
- Use `<table>`, `<thead>`, `<tbody>`, `<th>`, and `<td>` for tabular data.
- Use `<form>`, `<fieldset>`, `<legend>`, and `<label>` for forms.
- Use `<dialog>` with `showModal()` for native modal dialog primitives.
- Use `<details>` / `<summary>` for simple disclosures when appropriate.

## Accessible Names And State

- Every interactive element must have an accessible name from visible text, `aria-label`, or `aria-labelledby`.
- Every form input must have an associated `<label>` or `aria-label`.
- Icon-only buttons require `aria-label` on the button and `aria-hidden="true"` on the icon.
- Decorative images require `alt=""` or `aria-hidden="true"`.
- Use native state first. Add `aria-expanded`, `aria-selected`, `aria-checked`, `aria-current`, `aria-disabled`, and `aria-describedby` when the native element does not already express the state or relationship.
- Status messages use `aria-live="polite"`.
- Help text and errors connect to controls with `aria-describedby`.

## Keyboard And Focus

- All interactive elements must be keyboard accessible.
- Use `:focus-visible` styles. Never remove outlines without a DLS focus ring replacement.
- Composite widgets follow WAI-ARIA Authoring Practices, including arrow-key navigation where expected.
- Modals trap focus, restore focus on close, and close with Escape.
- Escape closes overlays.

## Motion

- Respect `prefers-reduced-motion` for movement involving transforms, position changes, scaling, or other spatial motion.
- Simple color transitions on hover/focus can run without motion guards.

## Library Preferences

- Use existing documented DLS components first.
- For tabs, comboboxes, dialogs, listboxes, menus, and other complex widgets, do not hand-roll ARIA behavior.
- If DLS lacks a primitive, stop and ask. When approved, use Headless UI, Radix UI, or React Aria instead of building complex behavior from scratch.
- This repo uses DLS CSS and tokens for styling. Do not introduce Tailwind unless the target package already uses it.

## Testing

- Query user-facing UI with role and accessible name, such as `getByRole('button', { name: /save/i })`.
- Do not prefer `getByTestId` for interactive UI.

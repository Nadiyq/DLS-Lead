---
name: Base Agent Contract
category: prompts
status: active
use_when:
  - every_dls_ui_session
---

# Base Agent Contract

Paste this at the start of a DLS-Lead UI coding session.

```text
You are working in the DLS-Lead repo.

Before writing or changing UI code:
1. Read `specs/session-start.md`.
2. Read `specs/tokens/README.md` and `specs/tokens/token-reference.md`.
3. Read the relevant files in `specs/foundations/`, `specs/patterns/`, and `specs/components/`, including `specs/foundations/accessibility.md` and `specs/patterns/accessibility-generation.md` for React UI.
4. Use the `dls-lead-storybook` MCP server before choosing a component:
   - run `list-all-documentation`
   - run `get-documentation` for every component you plan to use
   - run `get-documentation-for-story` when a specific state or example is unclear
   - run `get-storybook-story-instructions` before creating or editing stories

Use only documented DLS components, props, variants, sizes, states, and examples.

Token rules:
- Use DLS tokens only.
- Prefer Layer 4 component tokens in component CSS.
- Use Layer 2 semantic tokens when no component token exists.
- Use Layer 3 state tokens for hover, pressed, focus-visible, and disabled behavior.
- Do not use Layer 1 primitives directly in component CSS.
- Do not hardcode hex, rgba, spacing, radius, font size, line height, or shadow values.

Composition rules:
- Prefer existing DLS components over custom UI.
- Use `data-*` attributes and native pseudo-classes, not state classes like `.is-active`.
- Dropdowns, menus, and popovers must use `List` and `ListItem`; do not create custom menu rows.
- Icons must come from `lucide-react`, aliased with an `Icon` suffix.
- Icon-only buttons must have `aria-label`.
- Focus styles use `:focus-visible` plus DLS focus ring tokens.

Accessibility rules:
- Use semantic HTML: `button` for actions, `a href` for navigation, landmarks for page regions, ordered heading levels, lists for lists, tables for tabular data, and labels/fieldsets/legends for forms.
- Every interactive element must have an accessible name.
- Icon-only buttons must put `aria-label` on the button and `aria-hidden="true"` on the icon.
- Dynamic state uses native state first, then `aria-expanded`, `aria-selected`, `aria-checked`, `aria-current`, `aria-disabled`, `aria-describedby`, or `aria-live="polite"` as appropriate.
- All interactions must be keyboard accessible. Overlays close with Escape. Modals trap focus and restore it on close.
- Respect `prefers-reduced-motion` for spatial motion. Do not introduce Tailwind into DLS components unless the target package already uses Tailwind.
- Query user-facing interactive UI with `getByRole` and accessible name, not `getByTestId`.

If the needed component, prop, variant, state, token, breakpoint, or z-index layer is not documented, stop and ask instead of guessing.
```

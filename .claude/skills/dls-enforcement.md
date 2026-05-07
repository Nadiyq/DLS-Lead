# DLS Enforcement — Zero Custom CSS Policy

> **Read this skill before writing ANY CSS, JSX, or component code.**
> Violations are blocked by the `lint-tokens.mjs` PostToolUse hook.

## Golden Rule

**Never create custom CSS classes, custom styled components, or one-off styles.** Every visual element in the UI MUST be composed from existing DLS components and tokens. There are no exceptions.

## Before You Write Any Code

### Step 1: Check the Library

Search `apps/storybook/src/stories/` for an existing component that matches what you need. Run:

```bash
ls apps/storybook/src/stories/
```

If you find a match (even a partial one), **use it**. Compose existing components rather than building new elements.

### Step 2: If No Component Exists — STOP

Do NOT create a custom solution. Instead:

1. Ask the user: "I don't see a DLS component for [X]. Should I scaffold a new one via `/build-component`?"
2. If yes, use the `/build-component` command with a Figma URL.
3. If no Figma URL is available, ask for one. Never improvise a component design.

### Step 3: If the Component Exists But Lacks a Variant

Do NOT add custom CSS overrides. Instead:

1. Check if the needed variant exists in Figma (use `get_design_context`).
2. If it does, extend the component properly: add `data-*` attribute support and L4 tokens.
3. If it doesn't exist in Figma, inform the user and suggest a Figma-first workflow.

## Strictly Forbidden

| ❌ Never Do This | ✅ Do This Instead |
|---|---|
| `.my-component { ... }` | Use `.dls-{name}` from existing library |
| `.custom-header { color: #333 }` | Use `<Text>` or `.dls-text` with DLS tokens |
| `className="wrapper"` | Use DLS layout tokens and existing containers |
| `style={{ color: 'red' }}` | Use `data-intent="danger"` on DLS component |
| `styled.div` or CSS-in-JS | Use DLS CSS with `var(--dls-*)` tokens |
| `.card-override { padding: 12px }` | Use `var(--dls-spacing-3)` on `.dls-card` |
| `<div className="sidebar-link">` | Use `<SidebarItem>` from DLS library |
| Custom loading spinner | Use `<Spinner>` from DLS library |
| Custom modal/dialog | Use `<Dialog>` or `<AlertDialog>` from DLS |
| Hand-rolled dropdown | Use `<Dropdown>` from DLS library |
| `<div className="menu-row">` inside a dropdown | Use `<ListItem type="…" />` — every row in a dropdown / menu / popover list MUST be a ListItem |
| `.dls-{name}` layered on top of `.dls-list` | Make `.dls-{name}` a standalone root with its own `all: unset; box-sizing: border-box;` + List-equivalent styling |
| `const SettingsIcon = () => <svg>…</svg>` | Import from `lucide-react`: `import { Settings as SettingsIcon } from 'lucide-react'` |
| Custom icon set, hand-drawn `<path>`, Heroicons, Font Awesome | Lucide only (`lucide-react`) — aliased with `Icon` suffix |
| Inline `border-radius: 8px` | Use `var(--dls-radius-component-{name})` |
| `background: #F9F5FF` | Use `var(--dls-color-surface-subtle)` or L2/L4 token |

## CSS Rules (Enforced by Hook)

### Class Naming
- ALL classes must start with `.dls-`
- Sub-elements use BEM-like `.dls-{name}__{element}` (double underscore)
- No `.is-*`, `.has-*`, `.active`, `.selected`, or similar state classes
- State is expressed via `data-*` attributes and native pseudo-classes

### Token Usage
- **L1 primitives** (`--dls-color-primary-500`, `--dls-radius-m`) → NEVER in component CSS
- **L2 semantics** (`--dls-color-surface-base`, `--dls-color-intent-primary-base`) → fallback layer
- **L4 component** (`--dls-color-component-button-primary-bg-base`) → preferred
- No hardcoded hex, rgb, hsl, or oklch values (exception: `oklch(from var(...) ...)` shift pattern)
- No hardcoded px/rem/em on font-size, border-radius, font-weight, line-height, letter-spacing

### Selector Patterns
- Root selector must include `all: unset; box-sizing: border-box;`
- `:hover` must always be `:hover:not(:disabled)`
- Use `:focus-visible`, never plain `:focus`
- Focus ring via `box-shadow`, never `outline` (except `outline: none`)

## Component Composition Rules

When building a page or feature view:

1. **Import existing DLS components** — Button, Card, Input, Dialog, Table, etc.
2. **Layout with DLS spacing tokens** — `var(--dls-spacing-*)` for gaps, padding, margins
3. **Typography via DLS text tokens** — `var(--dls-text-*-font-size)`, `var(--dls-text-*-line-height)`
4. **Colors via semantic tokens only** — `var(--dls-color-surface-*)`, `var(--dls-color-text-*)`
5. **If you need a wrapper div**, use `.dls-{feature-name}` with only layout properties (display, gap, grid-template), no visual styling

## What the Lint Hook Catches

The `lint-tokens.mjs` hook runs after every CSS file edit and will **BLOCK** your edit if it finds:

- Custom class names (not `.dls-*`)
- Hardcoded color values (hex, rgb, hsl, oklch literals)
- L1 primitive token references
- Class-based state selectors (`.is-*`, `.has-*`)
- Missing root reset (`all: unset; box-sizing: border-box`)
- Unguarded `:hover` (needs `:not(:disabled)`)
- `:focus` instead of `:focus-visible`
- `outline` for focus rings

When the hook blocks your edit, **read the error message carefully** and fix the violation. Do not attempt to bypass the hook.

## React/JSX Rules

- Use semantic HTML for generated UI: `button` for actions, `a href` for navigation, landmarks for page structure, lists for lists, tables for tabular data, and associated labels for form controls.
- Every interactive element must have an accessible name. Icon-only buttons require `aria-label` on the button and `aria-hidden="true"` on the icon.
- Use native state first; add ARIA state and relationships (`aria-expanded`, `aria-selected`, `aria-checked`, `aria-current`, `aria-disabled`, `aria-describedby`, `aria-live`) when needed.
- Complex widgets must be keyboard accessible. Overlays close with Escape; modals trap and restore focus.
- Never use `className` with non-DLS classes
- Never use inline `style={{ }}` for visual properties (layout-only is acceptable for truly dynamic values like calculated widths)
- Use `data-variant`, `data-intent`, `data-size` props — not className variants
- Import components from the stories directory: `import { Button } from '../stories/Button'`
- If a component doesn't accept a prop you need, check Figma and extend the component properly

## Dropdowns / Menus / Popover Lists — Always List + ListItem

All dropdowns, menus, context menus, select popovers, and account flyouts in this system are **wrappers of `List` with `ListItem` children**. There are no exceptions.

- Every visible row inside a dropdown MUST be a `<ListItem type="…" />` — `text`, `with-slots`, `two-line`, `two-line-slots`, `label`, `divider`, `buttons`, `search`, `chips`, or `empty-state`.
- Never write `<div className="...-row">`, `<button className="...-item">`, or raw `<li>` inside a dropdown body.
- Drag-and-drop, keyboard handlers, `draggable`, `role`, `aria-*` etc. are passed directly to `<ListItem>` — it forwards all HTML attributes.
- The dropdown root (e.g. `.dls-dropdown-account`) is a **standalone** class that replicates `.dls-list`'s box styling (`all: unset; box-sizing: border-box; display: flex; flex-direction: column; padding; background; border; border-radius; box-shadow; font-family`). Never layer `.dls-{name}` on top of `.dls-list`.
- Applies to: `DropdownAccount`, `DropdownColumns`, `DropdownColumnActions`, `DropdownFilters`, `DropdownSorting`, `DropdownExport`, `DropdownOptions`, `ContextMenu`, and every future dropdown/menu.

## Icons — Lucide only

All icons come from **`lucide-react`**. No exceptions.

- `import { Settings as SettingsIcon } from 'lucide-react';` — alias with an `Icon` suffix.
- Pass the component directly: `iconStart={<SettingsIcon />}`, `icon={<LogOutIcon />}`.
- Size and colour come from the parent slot's CSS (`width: 16px; height: 16px; color: var(--dls-color-text-secondary)`). Never pass `size={16}` or inline `color` props.
- Figma `Icon / {Name}` maps 1:1 to Lucide's `{Name}`. No hand-drawn `<svg><path …/></svg>` constants in component or story files.
- If a Figma icon has no clear Lucide match, stop and ask — don't hand-roll.

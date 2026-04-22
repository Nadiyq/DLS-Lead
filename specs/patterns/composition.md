---
name: Composition Rules
category: pattern
status: active
read_when:
  - building_screen
  - composing_components
  - editing_component_css
related:
  - ../session-start.md
  - ../tokens/token-reference.md
---

# Composition Rules

## Core Policy

Build from existing DLS components and tokens. Do not introduce visual one-offs when the library already defines a pattern.

## Component-First Workflow

1. Check whether a DLS component already exists.
2. Compose existing components before building anything new.
3. If the system lacks the needed component or variant, stop and ask instead of improvising.

## Token Rules

- Prefer Layer 4 component tokens in component CSS.
- Fall back to Layer 2 semantic tokens when no Layer 4 token exists.
- Use Layer 3 state tokens for hover, press, focus, and disabled behavior.
- Do not use Layer 1 primitives directly in component CSS.

## Attribute Model

Dynamic styling should use:

- `data-variant`
- `data-intent`
- `data-size`
- native states like `:disabled` and `:focus-visible`

Do not encode states with class names like `.is-active` or `.has-error`.

## Dropdown / Menu Rule

All dropdowns, menus, context menus, select popovers, and similar list-based flyouts are composed with:

- `List`
- `ListItem`

Every visible row inside these surfaces should be a `ListItem`, not custom row markup.

## Icon Rule

Use `lucide-react` icons only. Do not hand-roll SVG icons for product UI.

## State Rule

- Hover must be guarded for disabled controls.
- Focus styling uses `:focus-visible` and the focus ring token.
- Transparent variants use overlay tokens for hover and pressed.
- Filled and soft variants use the state layer's OKLCH shifts when the component already does.

## Layout Rule

- Use spacing tokens for gaps, padding, and section rhythm.
- Use card, list, table, empty-state, and other structural primitives instead of styling raw containers ad hoc.
- Related content should be grouped through proximity, shared surface treatment, and consistent alignment.

## Theming Rule

Theme by remapping semantic tokens. Do not bake dark-mode logic into individual component variants unless the token system explicitly requires it.

## Stop-And-Ask Cases

- Missing component
- Missing documented variant
- Missing token family
- Unclear component choice between two existing patterns

## Cross-References

- [component-selection.md](component-selection.md)
- [../foundations/color.md](../foundations/color.md)
- [../foundations/spacing.md](../foundations/spacing.md)

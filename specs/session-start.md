---
name: Session Start
category: system
status: active
read_when: every_ui_task
related:
  - README.md
  - tokens/token-reference.md
  - patterns/composition.md
---

# DLS-Lead Session Start

Use this checklist at the start of every UI task.

## Workflow

1. Identify whether the task is foundations, composition, or a specific component.
2. Read [tokens/token-reference.md](tokens/token-reference.md).
3. Read the relevant foundation specs before making visual decisions.
4. Read the relevant component spec before using or editing a component.
5. Check Storybook or the Storybook MCP server for exact props, examples, and states.
6. Use an existing DLS component if it exists. If not, stop and ask.

## What To Read For Common Tasks

- New screen or flow: [patterns/component-selection.md](patterns/component-selection.md) and [patterns/composition.md](patterns/composition.md)
- Color or theming change: [foundations/color.md](foundations/color.md)
- Layout or spacing change: [foundations/spacing.md](foundations/spacing.md)
- Typography choice: [foundations/typography.md](foundations/typography.md)
- Interactive states: [foundations/motion.md](foundations/motion.md)
- Component styling: relevant file in [`components/`](components/)

## Hard Rules

- Use only named DLS tokens. No raw hex, rgba, px, or ad hoc radii in component styles.
- Use `data-*` attributes and native states, not class-based variants.
- Dropdowns, menus, and popovers are composed with `List` and `ListItem`.
- Icons come from `lucide-react` only.
- Focus uses `:focus-visible` and a ring, never `outline` styling as the visual treatment.

## Decision Order

1. Existing component
2. Existing component variant
3. Existing token family
4. New token or new component only if the system truly lacks it

If you are between two plausible visual choices, choose the one already represented in specs, tokens, or Storybook.

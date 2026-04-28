---
name: Audit And Fix Component Prompt
category: prompts
status: active
use_when:
  - component_audit
  - dls_violation_fix
  - refactor_existing_ui
---

# Audit And Fix Component Prompt

Use this when asking an agent to review an existing component for DLS compliance, then fix only the scoped issues.

```text
Audit `[component or file path]` for DLS-Lead compliance and fix scoped violations.

Before changing code:
- Read `specs/session-start.md`.
- Read `specs/tokens/README.md`, `specs/tokens/token-reference.md`, `specs/patterns/composition.md`, `specs/patterns/component-selection.md`, and all relevant foundation/component specs.
- Use the `dls-lead-storybook` MCP server:
  - run `list-all-documentation`
  - run `get-documentation` for the component being audited and any DLS components it composes
  - use `get-documentation-for-story` for states that need comparison

Audit checklist:
- No raw hex, rgba, hsl, oklch literals except documented OKLCH relative color state shifts.
- No Layer 1 primitive token references in component CSS.
- No ad hoc spacing, radius, font size, line height, letter spacing, or shadow values.
- Root component CSS has `all: unset; box-sizing: border-box;`.
- States use `data-*` attributes and native pseudo-classes, not `.is-*` or `.has-*`.
- Hover states are guarded for disabled controls.
- Focus uses `:focus-visible` and DLS focus ring tokens.
- Dropdown/menu/popover rows use `ListItem`.
- Icons come from `lucide-react`.
- Props, variants, sizes, and states match Storybook documentation.
- Accessibility names, ARIA, labels, disabled, and error states are present where needed.

Fixing rules:
- Keep edits scoped to the audited component and directly related stories/specs.
- Prefer existing DLS components over new markup.
- Use Layer 4 component tokens first, then Layer 2 semantic tokens.
- If a missing token, variant, or component is required, stop and ask.

Validation:
- Run `node .claude/hooks/lint-tokens.mjs <changed css file>` where applicable.
- Run TypeScript checks.
- Run available Storybook tests.
- Report findings fixed and any remaining blocked items.
```


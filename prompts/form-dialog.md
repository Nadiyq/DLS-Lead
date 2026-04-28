---
name: Form And Dialog Prompt
category: prompts
status: active
use_when:
  - form_screen
  - modal_workflow
  - settings_form
---

# Form And Dialog Prompt

Use this when asking an agent to build create/edit forms, modal dialogs, confirmations, or account workflows.

```text
Build `[form or dialog workflow]` in `[route/file path]` using DLS-Lead.

Before implementing:
- Read `specs/session-start.md`.
- Read `specs/tokens/README.md`, `specs/tokens/token-reference.md`, `specs/foundations/accessibility.md`, `specs/foundations/color.md`, `specs/foundations/spacing.md`, `specs/foundations/motion.md`, `specs/components/button.md`, `specs/components/input-field.md`, and `specs/components/dropdown.md`.
- Use the `dls-lead-storybook` MCP server:
  - run `list-all-documentation`
  - run `get-documentation` for `Dialog` or `AlertDialog`, `Button`, `InputField`, `Dropdown`, `Text`, and any documented form components such as `FormField`, `Checkbox`, `Radiobutton`, `Switcher`, or `OtpInput`
  - use only documented props, variants, sizes, validation states, and examples

Workflow requirements:
- Use documented form components for every field.
- Use `Dialog` for general modal workflows and `AlertDialog` for destructive or high-consequence confirmation.
- Primary actions use `Button` with documented `variant`, `intent`, and `size`.
- Error states use the `danger` intent family and visible explanatory text.
- Disabled states use documented disabled props and disabled semantic tokens.
- Labels must be visible or have a documented accessible name.
- Hints and errors should be connected through component-supported accessibility APIs.

Token constraints:
- Field surfaces use input component tokens such as `--dls-color-component-input-bg-base`, `--dls-color-component-input-border-base`, `--dls-color-component-input-border-focus`, and `--dls-radius-component-input`.
- Error styling uses `--dls-color-intent-danger-text` and `--dls-color-intent-danger-border`.
- Dialog surfaces use documented dialog tokens such as `--dls-color-component-dialog-bg`, `--dls-color-component-dialog-border`, and `--dls-shadow-surface-lg`.
- Form spacing uses `--dls-spacing-2`, `--dls-spacing-3`, `--dls-spacing-4`, and `--dls-spacing-6`.
- Focus uses `--dls-state-focus-ring-color` or `--dls-shadow-focus-ring`.

Implementation constraints:
- Do not create custom form controls.
- Do not use placeholder text as the only label.
- Do not indicate validation with color alone.
- Do not use inline visual styles.
- If the DLS library lacks a needed input type, stop and ask before building one.
- Before finishing, run type checks and any available Storybook tests.
```


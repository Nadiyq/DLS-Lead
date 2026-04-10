# Audit Component for DLS Violations

Argument: component name (e.g., `Button`) or `--all` to audit every component.

## Purpose

Detect DLS inconsistencies in existing components: custom classes, hardcoded values, L1 primitive usage, missing patterns, and deviations from the design system.

## Steps

### 1. Run the lint hook

```bash
# Single component
node .claude/hooks/lint-tokens.mjs apps/storybook/src/stories/{component-css-file}.css

# All components
node .claude/hooks/lint-tokens.mjs --all
```

Collect all ERROR and WARN violations.

### 2. Structural audit (manual checks the hook can't catch)

For the component CSS file, also check:

- **Missing DLS sub-components**: Is the component rendering raw HTML (`<div>`, `<span>`, `<button>`) where a DLS component exists? Cross-reference against the library:
  ```bash
  ls apps/storybook/src/stories/
  ```
- **Duplicate functionality**: Does this component duplicate behavior of an existing DLS component? (e.g., a custom dropdown when `Dropdown` exists)
- **Inline styles in JSX**: Check the `.tsx` file for `style={{ }}` or non-`dls-` class names
- **Missing token references**: Compare used CSS variables against `tokens/tokens.css` — are all referenced tokens defined?
- **Intent/variant completeness**: Does the component support all standard intents (neutral, primary, info, success, warning, danger) if it's a styled component?

### 3. Generate the audit report

Output a structured report in this format:

```
## Audit Report: {ComponentName}

### 🚫 Blocking Violations (from lint hook)
- L{line}: [{rule}] {message}

### ⚠️ Structural Issues
- {description of issue + suggested fix}

### ✅ Compliant Patterns
- {what's working correctly}

### 📋 Recommended Actions
1. {specific action to fix each issue}
```

### 4. Suggest next steps

- If there are blocking violations: suggest running `/fix-component {Name}` with a Figma URL
- If there are only structural issues: list specific edits needed
- If clean: confirm compliance

## Prerequisites

Read `.claude/skills/dls-enforcement.md` and `.claude/skills/component-patterns.md` before auditing.

## Notes

- Do NOT automatically fix anything — this command is diagnostic only
- Always show the full report to the user so they can decide how to proceed
- If `--all` mode, summarize with a table: component name | errors | warnings | status

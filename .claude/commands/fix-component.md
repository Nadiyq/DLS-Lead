# Fix Component from Figma

Argument: component name (e.g., `Accordion`). **Requires a Figma URL** for the component.

## Purpose

Update an existing component that was built with DLS violations — re-align it with the Figma design and DLS token system. This command is the corrective counterpart to `/build-component` (which scaffolds new components) and `/audit-component` (which detects issues).

## Prerequisites

Read these skills before proceeding:
- `.claude/skills/dls-enforcement.md` (zero custom CSS policy)
- `.claude/skills/component-patterns.md` (CSS skeleton, attribute model, state patterns)
- `.claude/skills/token-architecture.md` (4-layer token model)
- `.claude/skills/figma-sync.md` (Figma MCP workflow)

## Steps

### 1. Audit current state

Run the lint hook on the component to get a baseline of violations:

```bash
node .claude/hooks/lint-tokens.mjs apps/storybook/src/stories/{component-file}.css
```

Also read the component's `.tsx` and `.css` files to understand the current implementation.

### 2. Get Figma design spec

- Call `use_figma` with the provided Figma URL to read the frame structure, properties, variants, and token bindings.
- Call `get_screenshot` to capture the Figma design for visual reference.
- Call `get_design_context` for detailed component properties if needed.
- Call `get_variable_defs` to extract the exact Figma variables/tokens used.

### 3. Build a diff plan

Compare the current implementation against the Figma spec. Create a checklist:

- [ ] **Custom classes → DLS classes**: Replace any `.custom-*` classes with `.dls-{name}` or `.dls-{name}__{element}`
- [ ] **Hardcoded values → tokens**: Replace hex colors, px sizes, etc. with `var(--dls-*)` tokens
- [ ] **L1 primitives → L2/L4 tokens**: Replace `--dls-color-primary-500` with semantic/component tokens
- [ ] **Class state → attribute state**: Replace `.is-active` with `[data-state="active"]` or `data-*` attributes
- [ ] **Missing root reset**: Add `all: unset; box-sizing: border-box;` to root selector
- [ ] **Hover/focus patterns**: Fix `:hover` → `:hover:not(:disabled)`, `:focus` → `:focus-visible`
- [ ] **Missing Figma variants**: Add any variants present in Figma but missing in code
- [ ] **Token mismatches**: Align CSS variables with Figma variable names
- [ ] **Sub-component replacement**: Replace raw HTML elements with existing DLS components where applicable

### 4. Check token availability

Cross-reference required tokens against `tokens/tokens.json`:
- If a needed L4 component token doesn't exist, **add it** to tokens.json following the naming convention
- If a needed L2 semantic token doesn't exist, check if it should be added (consult extension-model.md)
- Regenerate token outputs after any tokens.json changes:
  ```bash
  node tokens/figma-sync-4layer.js
  ```

### 5. Apply fixes

Edit the CSS file to fix all violations. Apply changes methodically — the lint hook will validate each edit.

Edit the TSX file to:
- Replace custom `className` values with `dls-*` classes
- Replace inline styles with token-driven CSS
- Replace raw HTML with DLS component imports where appropriate
- Ensure `data-variant`, `data-intent`, `data-size` are used correctly

### 6. Validate

Run the lint hook again to confirm zero violations:

```bash
node .claude/hooks/lint-tokens.mjs apps/storybook/src/stories/{component-file}.css
```

Also run TypeScript check:

```bash
cd apps/storybook && npx tsc -b
```

### 7. Visual comparison

If Claude Preview is available, start storybook and compare the updated component visually against the Figma screenshot from step 2. Note any visual discrepancies.

## Important Rules

- **Always require a Figma URL** — never fix a component based on guesswork
- **Never add custom classes** during the fix — all fixes must use DLS patterns
- **Preserve existing functionality** — this is a refactor, not a rewrite
- **If the component uses sub-components that also have violations**, note them but fix only the target component. Suggest running `/fix-component` on the sub-components separately.
- **Document all changes** — after fixing, list what was changed and why

## Output

After completing the fix, show:

```
## Fix Report: {ComponentName}

### Changes Made
- {description of each change}

### Tokens Added/Modified
- {any tokens.json changes}

### Remaining Issues
- {anything that couldn't be fixed automatically}

### Lint Status: ✅ Clean / ⚠️ Warnings Only
```

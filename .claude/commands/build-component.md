# Build Component from Figma

Argument: component name (e.g., `Accordion`). Select the component frame in Figma before running.

## Steps

1. Call `figma_get_selection` to read the currently selected frame from Figma Desktop Bridge.
2. Call `figma_get_variables` to get token bindings from the file.
3. Read `tokens/tokens.json` and compare against Figma variables. List any inconsistencies (wrong layer, hardcoded values, missing tokens).
4. Scaffold the Storybook component at `apps/storybook/src/stories/$ARGUMENTS/`.

Read `.claude/skills/component-patterns.md` and `.claude/skills/token-architecture.md` before writing any code.

Do not ask clarifying questions — make reasonable decisions and note them.

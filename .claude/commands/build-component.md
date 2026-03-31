# Build Component from Figma

Argument: component name (e.g., `Accordion`). Provide a Figma URL for the component.

## Steps

1. **Get design spec** — call `use_figma` with the Figma URL to read frame structure, properties, variants, and token bindings.
2. **Take screenshot** — call `get_screenshot` to capture the Figma design for visual reference.
3. **Always check library first** — check `apps/storybook/src/stories/` for existing components. If the component exists, update it. Never build from scratch if a DLS component already exists.
4. **Compare tokens** — cross-reference Figma variables against `tokens/tokens.json`. List any inconsistencies (wrong layer, hardcoded values, missing tokens).
5. **Scaffold or update** — write component at `apps/storybook/src/stories/$ARGUMENTS/`.

Read `.claude/skills/component-patterns.md` and `.claude/skills/token-architecture.md` before writing any code.

Do not ask clarifying questions — make reasonable decisions and note them.

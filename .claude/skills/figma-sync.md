# Figma Sync

Uses the **official Figma MCP** (authenticated via Figma MCP Auth). Key tools:

| Tool | Purpose |
|------|---------|
| `use_figma` | Read any Figma node by URL — structure, properties, token bindings |
| `get_screenshot` | Capture a Figma node screenshot for visual validation |
| `get_design_context` | Get design context for a specific component |
| `search_design_system` | Search the design system for components |
| `get_variable_defs` | Extract variable/token definitions from a file |
| `get_code_connect_map` | Get existing code-connect mappings |

## Workflow: Build / Update Component from Figma

1. **Get design spec** — call `use_figma` with the Figma node URL to read frame structure, properties, variants, and token bindings.
2. **Take screenshot** — call `get_screenshot` to capture the Figma design for visual reference.
3. **Always check library first** — before writing any code, check `apps/storybook/src/stories/` for existing components. Never build from scratch if a DLS component exists.
4. **Compare tokens** — cross-reference Figma variables against `tokens/tokens.json`. List any inconsistencies (wrong layer, hardcoded values, missing tokens).
5. **Scaffold or update** — write component at `apps/storybook/src/stories/{name}/`.
6. **Visual validation** — start Storybook preview, take screenshot, compare against Figma screenshot. Iterate until parity is achieved.

## Parity Rule

Token names map 1:1 between Figma variables and CSS custom properties.
Figma variable `color/intent/primary/base` = CSS `--dls-color-intent-primary-base`.

## Sync Protocol (Token Updates)

1. Design changes are made in Figma first
2. Use `use_figma` + `get_variable_defs` to extract current state
3. `tokens/tokens.json` is updated as source of truth
4. Regenerate `tokens.css`, `tokens.scss`, `tokens.ts`

# Figma Sync

Figma ↔ Code sync protocol using figma-console-mcp (Desktop Bridge).

## MCP Tools Available

This project uses `figma-console-mcp` (southleft), NOT the Anthropic Figma MCP. Key tools:

| Tool | Purpose |
|------|---------|
| `figma_get_selection` | Read the currently selected frame/node — **use this to start any build-component flow** |
| `figma_get_variables` | Extract all design tokens/variables from the file |
| `figma_get_component` | Get component data (metadata or reconstruction spec) |
| `figma_get_component_for_development` | Component + image |
| `figma_get_styles` | Color, text, effect styles |
| `figma_execute` | Run any Figma Plugin API code (create, modify, rebind) |
| `figma_take_screenshot` | Capture current canvas for visual validation |
| `figma_check_design_parity` | Compare Figma spec against code implementation |
| `figma_create_variable` / `figma_update_variable` | CRUD on variables |
| `figma_batch_create_variables` / `figma_batch_update_variables` | Bulk token operations |
| `figma_get_status` | Check Desktop Bridge connection |

## Sync Protocol

1. Design changes are made in Figma first
2. Use `figma_get_selection` + `figma_get_variables` to extract current state
3. `tokens/tokens.json` is updated as source of truth
4. Regenerate `tokens.css`, `tokens.scss`, `tokens.ts`
5. Push back to Figma via `figma_execute` running `figma-sync-4layer.js` functions

## Local Figma Scripts

All also live in `tokens/figma-sync-4layer.js`. Can be run via `figma_execute` or pasted into DevTools.

| Function | Purpose |
|----------|---------|
| `addVariables()` | Create 4-layer semantic variables aliased to primitives |
| `cleanup()` | Remove deprecated names, verify/fix aliases, backfill missing vars |
| `rebindComponents(currentPageOnly)` | Walk nodes, rebind fills/strokes/effects to 4-layer variables |

## Workflow: Build Component from Selection

1. Select component frame in Figma (Desktop Bridge plugin running)
2. Run `/build-component ComponentName` in Claude Code
3. Claude calls `figma_get_selection` → reads the frame
4. Claude calls `figma_get_variables` → reads token bindings
5. Compares against `tokens/tokens.json`
6. Scaffolds component with correct token references

## Parity Rule

Token names map 1:1 between Figma variables and CSS custom properties. Use `figma_check_design_parity` to verify after implementation.

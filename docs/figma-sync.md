# Figma Sync via MCP

This repo is set up for Figma-first implementation using the official Figma MCP.

## MCP Workflow

1. Get design context with `get_design_context` for the exact Figma node.
2. Capture a screenshot with `get_screenshot`.
3. Check the library first in `apps/storybook/src/stories/`.
4. Compare Figma variable names against `tokens/tokens.json`.
5. Update the existing component or scaffold a new one in `apps/storybook/src/stories/{name}/`.
6. Run Storybook, compare the local render to the Figma screenshot, and iterate to parity.

## Repo Commands

```bash
npm run figma:audit -- --token color.intent.primary.base
npm run figma:audit -- --prefix color.component.button
npm run figma:audit -- --compare /absolute/path/to/figma-vars.json
npm run storybook
npm run storybook:typecheck
npm run sync-components
npm run tokens:lint
```

## Token Mapping Rule

Figma variable names map 1:1 to CSS custom properties.

- `color/intent/primary/base` -> `--dls-color-intent-primary-base`
- `color/component/button/primary/bg/base` -> `--dls-color-component-button-primary-bg-base`

`npm run figma:audit` accepts all of these formats:

- `color.intent.primary.base`
- `color/intent/primary/base`
- `--dls-color-intent-primary-base`

## Compare Export Format

When you export variable definitions from MCP for a node, save them as JSON in either of these shapes:

```json
{
  "color/intent/primary/base": "#6941C6",
  "color/text/primary": "#181D27"
}
```

```json
[
  { "name": "color/intent/primary/base", "value": "#6941C6" },
  { "name": "color/text/primary", "value": "#181D27" }
]
```

The audit reports:

- Tokens missing from `tokens/tokens.json`
- Resolved value mismatches between Figma and DLS
- The canonical DLS CSS custom property for each token

## Notes

- `tokens/tokens.json` remains the repo source of truth.
- `tokens/figma-sync-4layer.js` is still the Figma-side helper for creating and rebinding semantic variables inside Figma.
- If a DLS component already exists, update it instead of creating a parallel implementation.

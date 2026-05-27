# Roll Out Component

Argument: `ComponentName <primary-figma-url> [additional-figma-url ...]`.

Use this command for the AI-ready DLS component rollout. Follow the
portable prompt in `prompts/component-rollout.md`.

Hard rule: use the official Figma MCP only. Do not use Figma Console,
Desktop Bridge, `mcp__figma_console__`, or any bridge-based fallback.
If official Figma write access is unavailable, update the local
description file and report that Figma paste-back is blocked.

Read first:

1. `AGENTS.md`
2. `prompts/component-rollout.md`
3. `specs/session-start.md`
4. `specs/component-rollout-plan.md`
5. `specs/schemas/component.v1.json`
6. `specs/tokens/README.md`
7. `specs/tokens/token-reference.md`
8. `specs/foundations/accessibility.md`
9. `specs/foundations/motion.md`
10. `specs/patterns/accessibility-generation.md`
11. `specs/components/<component-kebab>.md`

Use Storybook MCP before relying on component behavior:

- `list-all-documentation`
- `get-documentation`
- `get-documentation-for-story` when needed
- `get-storybook-story-instructions` before story edits

Outputs:

- `specs/figma-descriptions/<component-kebab>.md`
- `specs/components/manifests/<component-kebab>.json`
- scoped TSX/CSS/story fixes only when required by the rollout
- `specs/component-rollout-plan.md` for completed factual statuses

Validate with manifest schema validation, component CSS token lint,
`npm run storybook:typecheck`, and component Storybook tests when
available.

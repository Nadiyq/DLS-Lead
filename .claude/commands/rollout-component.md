# Roll Out Component

Arguments: `$ARGUMENTS` - expects
`ComponentName <primary-figma-url> [additional-figma-url ...]`.

Use this command to continue the AI-ready DLS component rollout for the
next component. It wraps the portable prompt in
`prompts/component-rollout.md`.

## Non-negotiable Figma rule

Use the official Figma MCP only.

- Reads: official `get_design_context`, `get_variable_defs`, and
  `get_screenshot`.
- Writes: official `use_figma` only when available.
- Never use Figma Console, Desktop Bridge, `mcp__figma_console__`, or
  any bridge-based fallback.
- If official `use_figma` is unavailable, update the local description
  file and report that Figma write-back is blocked.

## Read first

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
12. Existing files for the component in:
    - `specs/components/manifests/`
    - `specs/figma-descriptions/`
    - `apps/storybook/src/stories/`

## Workflow

Follow `prompts/component-rollout.md` exactly for Phase 1, Phase 2,
and Phase 3.

For Phase 2 manifest generation, also apply the detailed extraction and
cross-validation rules from `.claude/commands/build-manifest.md`.

## Outputs

Create or update:

- `specs/figma-descriptions/<component-kebab>.md`
- `specs/components/manifests/<component-kebab>.json`
- component TSX/CSS/stories only when needed to fix scoped rollout gaps
- `specs/component-rollout-plan.md` only for completed factual status

## Validation

Run:

1. Manifest schema validation with `ajv` or equivalent.
2. `node .claude/hooks/lint-tokens.mjs` on the component CSS.
3. `npm run storybook:typecheck`
4. Component Storybook tests, when available.

## Report back

Include:

- files changed
- manifest path and schema result
- Figma description path
- whether official Figma write-back succeeded or was blocked
- checks run
- remaining deviations

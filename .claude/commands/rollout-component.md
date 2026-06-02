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

## Figma description format — two outputs, two formats

Each component produces TWO description artifacts:

1. **Local markdown** (`specs/figma-descriptions/<component-kebab>.md`)
   Full detailed spec with all sections: anatomy, props, tokens,
   states, accessibility, composition, code examples, cross-refs.

2. **Figma component panel** (via `use_figma`)
   CONDENSED summary only. Use this exact format:
   ```
   [One-line purpose]

   Figma properties:
   • [figmaProp] → [reactProp]
   ...

   Key tokens:
   • [up to 6 most important tokens]
   ...

   State model: [overlay | hybrid | oklch-shift | none]
   • [1-2 lines about key state behavior]

   Accessibility: [One-line: semantic element, keyboard, focus, motion.]
   ```
   Never paste the full markdown into Figma.

## Outputs

Create or update:

- `specs/figma-descriptions/<component-kebab>.md` (full spec)
- `specs/components/manifests/<component-kebab>.json`
- Figma component description (condensed summary via `use_figma`)
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

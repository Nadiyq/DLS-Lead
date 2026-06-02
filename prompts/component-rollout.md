---
name: Component Rollout
category: prompts
status: active
use_when:
  - ai_ready_component_rollout
  - manifest_generation
  - figma_description_update
---

# Component Rollout Prompt

Paste this into Claude, Cursor, Codex, or another coding agent when
continuing the AI-ready DLS component rollout.

```text
You are working in the DLS-Lead repo.

Task:
Continue the component rollout for:
- Component: [ComponentName]
- Primary Figma component set URL: [Figma URL]
- Additional Figma component set URLs, if any: [Optional URLs]
- Requested phase: [Phase 1 | Phase 2 | Phase 3 | Phase 2 and 3 | all]

If the component name or Figma URL is missing, stop and ask. Do not
guess a Figma URL.

Important Figma rule:
- Use the official Figma MCP only.
- For reads, use official `get_design_context`, `get_variable_defs`,
  and `get_screenshot`.
- For writes, use official `use_figma` only when that tool is
  available in the current session.
- Never use Figma Console, Desktop Bridge, `mcp__figma_console__`,
  or any bridge-based fallback.
- If official `use_figma` is not available, do not attempt a Figma
  write. Update the local description file and tell me that paste-back
  to Figma is blocked by missing official write access.

Read first, in this order:
1. `AGENTS.md`
2. `specs/session-start.md`
3. `specs/component-rollout-plan.md`
4. `specs/schemas/component.v1.json`
5. `specs/tokens/README.md`
6. `specs/tokens/token-reference.md`
7. `specs/foundations/accessibility.md`
8. `specs/foundations/motion.md`
9. `specs/patterns/accessibility-generation.md`
10. `specs/components/[component-kebab].md`
11. Existing manifest, if present:
    `specs/components/manifests/[component-kebab].json`
12. Existing Figma description files, if present:
    `specs/figma-descriptions/[component-kebab].md`

Use Storybook MCP before relying on component behavior:
1. Start Storybook if needed: `npm run storybook`.
2. Use the `dls-lead-storybook` MCP endpoint
   `http://127.0.0.1:6006/mcp`.
3. Run `list-all-documentation`.
4. Run `get-documentation` for this component.
5. Run `get-documentation-for-story` for relevant stories.
6. Run `get-storybook-story-instructions` before creating or editing
   stories.

Phase 1 - Figma description:
1. Read the Figma component set through official Figma MCP.
2. Extract exact Figma property names, variants, states, token bindings,
   component set node IDs, and Storybook docs URL.
3. Create or update:
   `specs/figma-descriptions/[component-kebab].md`
   Use one file per distinct Figma component set if the React component
   maps to multiple Figma sets.
4. The description must include:
   - purpose
   - use when / do not use for
   - Figma -> code mapping table
   - state implementation contract
   - anatomy
   - props / API
   - tokens used
   - accessibility contract
   - composition rules
   - known deviations
   - code example
   - cross-references
5. If official `use_figma` is available, write a CONDENSED summary
   to the Figma component description field and set the Storybook
   docs link. Otherwise stop at the local file.

   IMPORTANT: The Figma component panel description and the local
   markdown file use DIFFERENT formats:

   - `specs/figma-descriptions/[component].md` — FULL detailed spec
     with all sections (anatomy, props, tokens, states, a11y,
     composition, code examples, cross-references). This is the
     machine-readable reference for AI agents and developers.

   - Figma component description (via `use_figma`) — CONDENSED
     summary only. Follow this exact format:

     ```
     [One-line purpose]

     Figma properties:
     • [figmaProp] → [reactProp]
     • [figmaProp] → Figma-only (CSS pseudo-classes)
     ...

     Key tokens:
     • [up to 6 most important tokens]
     ...

     State model: [overlay | hybrid | oklch-shift | none]
     • [1-2 lines about key state behavior]

     Accessibility: [One-line summary: semantic element, keyboard,
     focus ring, reduced-motion.]
     ```

   Never paste the full markdown into Figma. The condensed format
   is designed for designers reading the component panel inline.

Phase 2 - Code fixes and manifest:
1. Apply the `/build-manifest` logic from
   `.claude/commands/build-manifest.md`.
2. Cross-check TSX props, defaults, JSDoc, stories, CSS tokens,
   Storybook docs, Figma mapping, and token definitions.
3. Fix rollout gaps discovered for this component when they are local,
   scoped, and supported by specs:
   - inline SVG -> `lucide-react`
   - missing `prefers-reduced-motion`
   - missing accessible names, ARIA relationships, or native semantics
   - token naming mismatches
   - missing manifest fields
4. Do not invent props, variants, states, or tokens. If a missing field
   is required but not documented, stop and ask.
5. Write:
   `specs/components/manifests/[component-kebab].json`
6. If the component maps to multiple Figma component sets and the schema
   cannot express that, extend the schema in a backward-compatible way.
   Do not drop Figma mappings to fit an old schema.
7. Update `specs/component-rollout-plan.md` only for facts completed in
   this rollout.

Phase 3 - Corrected Figma description:
1. Update the local markdown file with anything fixed in Phase 2.
2. Remove resolved known gaps from the description, but keep real
   deviations that still exist.
3. Write the CONDENSED summary to Figma with official `use_figma`
   if available. Use the condensed format from Phase 1 step 5 —
   never paste the full markdown into Figma.
4. If official Figma write access is unavailable, report the exact local
   description file to paste into Figma and do not use any fallback tool.

Validation before final response:
1. Validate JSON manifests against `specs/schemas/component.v1.json`
   with `ajv` or equivalent.
2. Run component CSS token lint:
   `node .claude/hooks/lint-tokens.mjs apps/storybook/src/stories/[css-file]`
3. Run Storybook typecheck:
   `npm run storybook:typecheck`
4. Run component Storybook tests if available.
5. If full-suite tests fail because of known unrelated failures, report
   that separately and keep the component-specific result clear.

Final response must include:
- Files changed.
- Manifest path and validation result.
- Figma description path and whether official Figma write-back happened.
- Tests/checks run and results.
- Remaining known deviations or blocked items.

Do not revert user changes or unrelated dirty worktree changes.
```

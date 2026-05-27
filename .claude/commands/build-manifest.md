# Build Component Manifest

Arguments: `$ARGUMENTS` — expects `ComponentName <figma-url>`.
Parse the first word as the component name and the remainder as the Figma URL.
Derive the kebab-case form (e.g. `Accordion` → `accordion`,
`DatePicker` → `date-picker`) for file paths and token lookups.

I have just added the "Component configuration → Description"
field in Figma for this component.

Your job: build the JSON manifest for this component end-to-end,
validated against the schema, agreeing with both the Figma
description and the source code.

## Read first (in this exact order)

1. `specs/session-start.md`
2. `specs/schemas/component.v1.json`
   — If this file does not exist yet, STOP and tell me. We need
   to create the schema first. Do not invent fields.
3. `specs/tokens/README.md` and `specs/tokens/token-reference.md`
4. `specs/components/<component-name>.md` — spec frontmatter is
   the source of truth for hand-authored fields
5. `apps/storybook/src/stories/<ComponentName>/<ComponentName>.tsx`
6. `apps/storybook/src/stories/<ComponentName>/<ComponentName>.stories.tsx`
7. `apps/storybook/src/stories/<ComponentName>/<component-name>.css`
8. `tokens/tokens.json` — for L4 tokens scoped to this component
9. `tokens/tokens.ts` — for token bindings if the JSON is ambiguous

## Read from Figma

Use the official Figma MCP only (NOT Figma Console, Desktop Bridge,
`mcp__figma_console__`, or any bridge-based fallback):

- `get_design_context` for the Figma URL — pull the Component
  configuration description, property mapping, variants, and
  node IDs.
- `get_variable_defs` — extract the exact Figma variables bound
  to this component.
- `get_screenshot` — capture the canonical visual for reference.

For Figma writes, use official `use_figma` only when it is available.
If official write access is unavailable, update the local description
file and report that Figma write-back is blocked.

## Read from Storybook MCP

If the `dls-lead-storybook` MCP server is available:

- `list-all-documentation`
- `get-documentation` for the component
- `get-documentation-for-story` for each story variant
- `get-storybook-story-instructions` if stories need updating

## What to extract automatically (from code)

- React component names (interfaces ending in `Props`)
- Props with types, defaults (from destructuring), required
  (from `?` token), and JSDoc descriptions
- Union-type props → enum values
- Story names from `.stories.tsx` → variants/states evidence
- L4 tokens by prefix match against `tokens.json`:
    `color.component.<component-name>.*`
    `radius.component.<component-name>`
    `shadow.component.<component-name>`
  Emit as CSS variable names: `--dls-color-component-...`

## What to read from spec markdown frontmatter

These are HAND-AUTHORED. Do not invent them. If a field is
missing from frontmatter and required by the schema, STOP
and ask me to add it to the spec:

- `category`, `subcategory`, `description`
- `variants`, `intents`, `sizes` (only those actually exposed)
- `states`: `{ implementation, rationale, available, tokens }`
- `composition`: `{ allowedChildren, forbiddenChildren,
  forbiddenParents, maxDepth, minItems, recommendedItems }`
- `accessibility`: `{ semanticElement, requiredAria, keyboard,
  respectsReducedMotion, focusManagement }`
- `useWhen`, `doNotUseFor`, `relations`
- `knownDeviations` (real gaps between code and system rules)

## What to read from Figma description

- `propertyMapping` (Figma property name → React prop)
- `figma.nodeId`, `figma.componentSetUrl`
- Cross-check: every entry in `propertyMapping` MUST have either
  a real React prop on the matching component, or `reactProp:
  null` with a `note` explaining why (e.g. visual-only state).

## Cross-validation rules (FAIL the build if any break)

1. Every prop in the manifest MUST exist in the TSX. No invented
   props.
2. Every TSX prop MUST appear in the manifest. No silent drops.
3. Every token in `tokens[]` MUST exist in `tokens.json` under
   the component's namespace. No orphan tokens.
4. Every `propertyMapping[*].reactProp` MUST match a real prop
   name (or be null with a note).
5. Every entry in `forbiddenChildren` / `allowedChildren` /
   `forbiddenParents` MUST be a known component name (check
   against the full component list in `apps/storybook/src/stories`).
6. Tokens listed in `states.tokens` MUST be Layer 3 state tokens
   (`--dls-state-*`) or component tokens (`--dls-color-component-*`).
   No Layer 1 references.
7. The Figma description's "Figma → Code mapping" table MUST
   agree row-for-row with `figma.propertyMapping` in the JSON.
8. The Figma description's "Tokens used" list MUST be a subset
   of (or equal to) the JSON `tokens[]` array.

If any cross-validation fails, STOP. Report the mismatch.
Do not silently reconcile.

## Output

Write to: `specs/components/manifests/<component-name>.json`

Format:
- 2-space indent
- Keys ordered per the schema (so diffs stay readable)
- `_meta` block populated:
    - `generatedAt`: current ISO timestamp
    - `generator`: `"claude-code-manual@1.0.0"`
    - `sourceHash`: sha256 of (TSX + stories + CSS + spec +
      tokens.json), first 16 hex chars

## Validate before declaring done

Run, in order:

1. JSON Schema validation against `specs/schemas/component.v1.json`
   (use `ajv` or equivalent). Must pass with zero errors.
2. `node .claude/hooks/lint-tokens.mjs` on the component CSS —
   the manifest does not change CSS, but if the CSS is dirty the
   manifest is documenting a broken component. Report violations
   but do not block manifest write.
3. TypeScript check: `cd apps/storybook && npx tsc -b --noEmit`
4. If Storybook tests exist for this component, run them.

## Report back

Tell me:

- Path to the written manifest
- Schema validation result
- Any cross-validation mismatches found AND resolved (e.g.
  "frontmatter missed `composition.maxDepth`, added it after
  confirming with you")
- Any deviations between Figma description and code that need
  human resolution
- Any tokens found in CSS that are not in `tokens.json` (these
  are violations of the token contract)
- Any props in TSX that have no JSDoc description (these should
  be added so the next generation has good `description` fields)

## Hard stops — do not guess, ask me

- A required spec frontmatter field is missing.
- A Figma property has no obvious React prop counterpart and no
  documented reason for the mismatch.
- The component uses a token that does not exist in `tokens.json`.
- The component's CSS has hardcoded values that should be tokens.
- The Figma description conflicts with the code (e.g. lists a
  prop the TSX does not expose).
- The schema does not have a field for something the spec
  frontmatter declares — we extend the schema, we do not drop
  the field.

Do not invent. Do not silently reconcile. Do not edit the spec
markdown, the TSX, the CSS, or `tokens.json` without explicit
permission — your job is to OBSERVE these sources and write the
manifest that reflects them.

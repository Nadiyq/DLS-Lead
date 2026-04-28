---
name: Token Addition Prompt
category: prompts
status: active
use_when:
  - new_token
  - token_extension
  - theming
---

# Token Addition Prompt

Use this when asking an agent to add or extend a DLS token family intentionally.

```text
Add or extend DLS-Lead tokens for `[token need]`.

Before changing tokens:
- Read `specs/session-start.md`.
- Read `specs/tokens/README.md`, `specs/tokens/token-reference.md`, and the focused token spec for the category.
- Read the relevant foundation spec, such as `specs/foundations/color.md`, `spacing.md`, `typography.md`, `radius.md`, `elevation.md`, `motion.md`, `opacity.md`, or `z-index.md`.
- Inspect `tokens/tokens.json`, `tokens/tokens.css`, `tokens/tokens.scss`, and `tokens/tokens.ts`.
- Check existing components and Storybook docs to confirm the token is needed more than once.

Token model:
- Keep the 4-layer model intact:
  - Layer 1 primitives are raw values.
  - Layer 2 semantic tokens carry UI meaning.
  - Layer 3 state tokens carry behavior.
  - Layer 4 component tokens carry component-specific styling.
- Do not add a Layer 4 component token when a Layer 2 semantic token already expresses the need.
- Do not use Layer 1 primitives directly in component CSS.

Implementation requirements:
- Update `tokens/tokens.json` as the source of truth.
- Regenerate or update generated outputs only through the repo's established token workflow.
- Update focused docs in `specs/tokens/` and the relevant foundation spec.
- Update affected component specs if component tokens are added.
- Do not invent names outside the existing DLS naming pattern.

Validation:
- Run `npm run tokens:lint` if available.
- Run type checks if generated TypeScript changes.
- Run Storybook checks if component behavior changes.
- Summarize the layer, purpose, and affected components for every token added.
```


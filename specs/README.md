---
name: DLS-Lead LLM Specs
category: system
status: active
read_when: every_ui_task
source_of_truth:
  - tokens/tokens.json
  - apps/storybook/src/stories/
  - CLAUDE.md
---

# DLS-Lead LLM Specs

This directory is the repo-local design-system layer for AI agents. Read it before changing UI. The goal is simple: do not guess visual decisions that DLS-Lead already defines.

## Read Order

1. [session-start.md](session-start.md)
2. [tokens/token-reference.md](tokens/token-reference.md)
3. Relevant foundation specs in [`foundations/`](foundations/)
4. Relevant pattern specs in [`patterns/`](patterns/)
5. Relevant component specs in [`components/`](components/)

## Source-Of-Truth Order

1. `specs/` for design intent and usage rules
2. `tokens/tokens.json` for canonical token definitions
3. Storybook docs and stories for concrete component APIs and examples
4. Component source files for implementation details

## Non-Negotiables

- Do not invent token names, spacing values, colors, radii, or variants.
- Prefer existing DLS components over custom UI.
- In component CSS, prefer Layer 4 component tokens, then Layer 2 semantic tokens.
- Do not use Layer 1 primitives directly in component CSS.
- If a component or variant does not exist, stop and ask instead of improvising.

## Directory Map

- `foundations/`: color, spacing, typography, radius, elevation, motion
- `tokens/`: closed token reference and lookup rules
- `patterns/`: composition, layout, and component selection rules
- `components/`: focused specs for core DLS building blocks

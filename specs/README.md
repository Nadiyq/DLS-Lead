---
name: DLS-Lead LLM Specs
category: system
status: active
read_when: every_ui_task
source_of_truth:
  - tokens/tokens.json
  - apps/storybook/src/stories/
  - CLAUDE.md
method_reference:
  - https://hvpandya.com/llm-design-systems
---

# DLS-Lead LLM Specs

This directory is the repo-local design-system layer for AI agents. Read it before changing UI. The goal is simple: do not guess visual decisions that DLS-Lead already defines.

The structure follows the LLM-readable design-system pattern from Hardik Pandya's "Expose your design system to LLMs": specs provide session memory, tokens provide a closed value layer, and Storybook provides documented component APIs.

## Read Order

1. [session-start.md](session-start.md)
2. [tokens/README.md](tokens/README.md) and [tokens/token-reference.md](tokens/token-reference.md)
3. Relevant foundation specs in [foundations/](foundations/)
4. Relevant pattern specs in [patterns/](patterns/)
5. Relevant component specs in [components/](components/)

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

- [foundations/](foundations/): color, spacing, typography, radius, elevation, motion, accessibility, borders, breakpoints, grid, iconography, opacity, z-index
- [tokens/](tokens/): closed token reference and focused token lookup files
- [patterns/](patterns/): composition, layout, and component selection rules
- [components/](components/): focused specs for core DLS building blocks

## Maintenance Rules

- New component in Storybook means a matching component spec or a documented reason it is covered by an existing family spec.
- New token family means a focused token spec plus a foundation spec update.
- Repeated review feedback means a pattern spec update.
- Draft foundation specs constrain current behavior but do not authorize new token families.

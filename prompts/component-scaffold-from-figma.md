---
name: Component Scaffold From Figma Prompt
category: prompts
status: active
use_when:
  - figma_component
  - new_component
  - component_update
---

# Component Scaffold From Figma Prompt

Use this when asking an agent to build or update a DLS component from a Figma design.

```text
Build or update the DLS-Lead component `[component name]` from this Figma design: `[Figma URL]`.

Use the official Figma MCP only. Do not use Figma console.

Before implementing:
- Read `specs/session-start.md`.
- Read `specs/component-spec-template.md`.
- Read `specs/tokens/README.md`, `specs/tokens/token-reference.md`, and the relevant foundation specs for color, spacing, typography, radius, elevation, motion, accessibility, iconography, and z-index.
- Read any related component specs in `specs/components/`.
- Start Storybook with `npm run storybook` if needed.
- Use the `dls-lead-storybook` MCP server:
  - run `list-all-documentation`
  - run `get-documentation` for related components
  - run `get-storybook-story-instructions` before creating or editing stories

Figma workflow:
- Use official Figma MCP tools to inspect design context, screenshots, variables, and design-system assets.
- Map Figma variables to DLS tokens. If no token exists, stop and ask before inventing one.
- Search the existing DLS library before creating new component parts.
- If Figma uses icons, map them to `lucide-react` icons with `Icon` suffix aliases.

Implementation requirements:
- Component class names use `.dls-{component}` and `.dls-{component}__part`.
- Root CSS starts with `all: unset; box-sizing: border-box;`.
- Variants, intents, sizes, and states use `data-*` attributes and native pseudo-classes.
- Components use Layer 4 component tokens first and Layer 2 semantic tokens as fallback.
- Hover and pressed states use DLS state tokens or documented OKLCH state shifts.
- Focus uses `:focus-visible` and DLS focus ring tokens.
- No raw hex, rgba, ad hoc px spacing, ad hoc radius, or invented token names.

Deliverables:
- Component implementation.
- Storybook stories that follow current Storybook MCP instructions.
- A spec file in `specs/components/` using `specs/component-spec-template.md`.
- Any needed token additions in `tokens/tokens.json` plus generated outputs, only if approved.

Validation:
- Run TypeScript checks.
- Run token linting for changed CSS.
- Run available Storybook tests.
- Summarize exactly which DLS tokens and documented components were used.
```


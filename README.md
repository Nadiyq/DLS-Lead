# DLS-Lead

This repository uses a 4-layer design token architecture.

## Token Architecture

`Layer 1` primitives use raw values such as hex, rgba, spacing, radius, and typography scales.

`Layer 2` semantic tokens map those primitives into UI meaning such as surface, text, border, and intent roles.

`Layer 3` state abstraction is a hybrid model:
- In code, interactive state colors use `OKLCH` relative color syntax with numeric lightness deltas.
- In Figma, the same states are represented with opacity overlays for tooling compatibility.

This means the system is **not** purely hex-based. Base tokens may be hex/rgba, but hover and pressed behavior in code is defined by OKLCH state transforms.

## Canonical State-Layer Files

- `tokens/tokens.scss` defines Layer 3 state constants such as `$dls-state-l-delta-hover` and `$dls-state-l-delta-pressed`.
- `tokens/tokens.json` documents `state.lDelta.hover` and `state.lDelta.pressed` in the token source.
- `tokens/tokens.ts` exports the same state model for code consumers.
- `tokens/tokens.css` publishes the generated CSS custom properties.
- `apps/storybook/src/stories/button.css` and other component stylesheets apply the deltas with `oklch(from <base> calc(l + delta) c h)`.

## Source Of Truth

When describing this design system, use the following summary:

> DLS-Lead uses hex/rgba primitives plus an OKLCH-based state layer for hover and pressed interactions in code, with Figma overlay equivalents for design tooling.

## Figma MCP Sync

The repo now includes a local companion workflow for Figma MCP sync:

- MCP-side: fetch node data with `get_design_context`, `get_screenshot`, and `get_variable_defs`
- Repo-side: audit token names and values with `npm run figma:audit`
- Library-first: always check `apps/storybook/src/stories/` before building a new component

Full workflow and examples live in [docs/figma-sync.md](docs/figma-sync.md).

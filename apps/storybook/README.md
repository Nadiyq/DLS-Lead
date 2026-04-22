# DLS Storybook

Storybook is the primary documentation and validation workspace for the DLS component library.

## Commands

```bash
npm run storybook
npm run build-storybook
npm run test-storybook
npx tsc -b
```

## MCP Endpoint

This Storybook includes the official Storybook MCP addon. When the dev server is running, agents can connect to:

```text
http://127.0.0.1:6006/mcp
```

Useful companion routes while debugging MCP:

- `http://127.0.0.1:6006/manifests/docs.json`
- `http://127.0.0.1:6006/manifests/components.html`

## Preview Controls

- **Theme**: switch between light and dark token themes
- **Surface**: preview components on base, subtle, muted, and inverse backgrounds

## Story Structure

- `Foundations/*` documents tokens, typography, spacing, radius, and shared behavior
- `Components/*` contains reusable DLS primitives and composed patterns
- `Debug/*` is reserved for internal verification stories

## Authoring Guidelines

1. Prefer semantic and component tokens over raw values.
2. Cover states, variants, sizes, and disabled behavior in stories.
3. Add Figma parity stories when a component is synced from MCP.
4. Keep story layout wrappers consistent and token-driven.

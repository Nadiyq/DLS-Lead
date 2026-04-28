# DLS-Lead Storybook MCP

DLS-Lead ships with the official Storybook MCP addon so AI agents can query the component library, docs, stories, and Storybook test tools through the running Storybook instance.

## What this gives you

- Reuse of documented DLS components instead of ad hoc UI generation
- Access to Storybook docs and examples through MCP tools
- Story generation guidance and preview links for agent-created stories
- Storybook test execution through MCP when Storybook Test is available

## Prerequisites

1. Install dependencies for the Storybook app:

```bash
cd apps/storybook
npm install
cd ../..
```

2. Start Storybook from the repo root:

```bash
npm run storybook
```

3. Keep Storybook running while the agent uses MCP.

The MCP endpoint is:

```text
http://127.0.0.1:6006/mcp
```

You can also inspect Storybook's generated manifests while the server is running:

- `http://127.0.0.1:6006/manifests/docs.json`
- `http://127.0.0.1:6006/manifests/components.html`

## Included repo config

This repo already includes project-scoped config for common agents:

- Claude Code: [.mcp.json](../.mcp.json)
- Cursor: [.cursor/mcp.json](../.cursor/mcp.json)
- Shared agent guidance: [AGENTS.md](../AGENTS.md)

The shared MCP server name is:

```text
dls-lead-storybook
```

## Claude Code

Claude Code reads project-scoped MCP servers from `.mcp.json`. This repo already includes the server definition. If you prefer adding it manually, use:

```bash
claude mcp add --transport http --scope project dls-lead-storybook http://127.0.0.1:6006/mcp
```

After opening the repo in Claude Code, use `/mcp` to confirm the server is connected.

## Cursor

Cursor reads project-scoped MCP config from `.cursor/mcp.json`. This repo already includes that file.

If you prefer configuring it manually instead, use the equivalent entry:

```json
{
  "mcpServers": {
    "dls-lead-storybook": {
      "url": "http://127.0.0.1:6006/mcp"
    }
  }
}
```

## Codex

Codex uses shared MCP config in `~/.codex/config.toml`, so this repo includes an example file instead of an auto-loaded project config:

- [mcp/codex.config.toml.example](./codex.config.toml.example)

You can add the server with the CLI:

```bash
codex mcp add dls-lead-storybook --url http://127.0.0.1:6006/mcp
```

Or copy the example block into `~/.codex/config.toml`.

## Any other MCP-capable agent

Point the client at the same HTTP endpoint:

```text
http://127.0.0.1:6006/mcp
```

If the client supports naming servers, use `dls-lead-storybook` so prompts and agent instructions stay consistent across tools.

## Recommended prompting

For UI work, tell the agent to:

- inspect DLS Storybook docs before composing UI
- use only documented props and examples
- avoid inventing component variants
- run Storybook story tests after UI changes

The repo-level guidance for that is already captured in [AGENTS.md](../AGENTS.md).

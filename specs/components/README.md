---
name: Component Specs Index
category: components
status: active
read_when:
  - choosing_component
  - editing_component
---

# Component Specs Index

These files document the core DLS components that agents should reach for first. Storybook remains the source of truth for exact props, variants, examples, and states.

## Core Components

| Need | Spec |
|---|---|
| Direct action | [button.md](button.md) |
| Status or metadata pill | [badge.md](badge.md) |
| Content surface | [card.md](card.md) |
| Select or option picker | [dropdown.md](dropdown.md) |
| Empty or zero state | [empty-state.md](empty-state.md) |
| Filter trigger or visible filter | [filter-chip.md](filter-chip.md) |
| Single-line text input | [input-field.md](input-field.md) |
| List container | [list.md](list.md) |
| List or menu row | [list-item.md](list-item.md) |
| Tabular data | [table.md](table.md) |
| Table column behavior | [table-column.md](table-column.md) |
| Local view switcher | [tabs.md](tabs.md) |
| Typographic primitive | [text.md](text.md) |

## Storybook-First Rule

Before using a component in code:

1. Read the component spec.
2. Run `list-all-documentation` from the `dls-lead-storybook` MCP server.
3. Run `get-documentation` for the exact component.
4. Use only documented props, variants, states, and examples.

If Storybook documents a component that does not yet have a spec file, follow [../patterns/component-selection.md](../patterns/component-selection.md), then stop and ask before inventing usage rules.


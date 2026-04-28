---
name: Dropdown Menu Prompt
category: prompts
status: active
use_when:
  - dropdown
  - context_menu
  - popover_list
  - command_menu
---

# Dropdown Menu Prompt

Use this when asking an agent to create or update a dropdown, menu, popover list, account flyout, column menu, or row action menu.

```text
Create or update `[dropdown/menu name]` in `[file path]` using DLS-Lead.

Before implementing:
- Read `specs/session-start.md`.
- Read `specs/tokens/README.md`, `specs/tokens/token-reference.md`, `specs/foundations/accessibility.md`, `specs/foundations/elevation.md`, `specs/foundations/z-index.md`, `specs/components/dropdown.md`, `specs/components/list.md`, `specs/components/list-item.md`, and `specs/patterns/composition.md`.
- Use the `dls-lead-storybook` MCP server:
  - run `list-all-documentation`
  - run `get-documentation` for `Dropdown`, `List`, `ListItem`, `Button`, and any specialized dropdown component that already exists
  - run `get-documentation-for-story` for the closest menu, filter, column, or account dropdown story

Hard requirements:
- Every visible row inside the dropdown/menu/popover must be a documented `ListItem` type.
- Do not use custom row markup such as `<div className="...row">`, custom `<button>` rows, or raw `<li>` rows.
- The dropdown root should be its own `.dls-{name}` component root with `all: unset; box-sizing: border-box;` if you are creating component CSS.
- Do not layer `.dls-{name}` on top of `.dls-list`.
- Use `slotLeft`, `slotRight`, `iconStart`, and `iconEnd` according to documented `ListItem` APIs.
- Use `lucide-react` icons only, aliased with `Icon` suffix.

Token constraints:
- Dropdown surface uses `--dls-color-component-dropdown-bg`, `--dls-color-component-dropdown-border`, `--dls-radius-component-list`, and `--dls-shadow-overlay` or the documented dropdown shadow.
- List item text uses semantic text tokens or documented list item component tokens.
- Hover and pressed states use `--dls-state-hover-overlay` and `--dls-state-pressed-overlay`.
- Focus uses `--dls-state-focus-ring-color` or `--dls-shadow-focus-ring`.
- Local menu layering can use the existing local pattern from `specs/foundations/z-index.md`; do not invent global values like `999`.

Implementation constraints:
- Preserve keyboard and ARIA behavior documented by the component.
- Icon-only row actions need `aria-label`.
- If drag-and-drop, pinning, or nested rows are needed, pass behavior through documented `ListItem` props or forwarded HTML attributes.
- If the documented `ListItem` types cannot express the row, stop and ask before inventing a new row type.
- Run type checks and Storybook tests if available.
```


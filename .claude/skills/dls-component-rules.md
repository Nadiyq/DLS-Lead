# DLS Component & Layout Rules

## Component Usage

1. **Always check the library first.** Before writing any UI element, check `apps/storybook/src/stories/` and Storybook. This includes dropdowns, selects, lists, avatars, chips, badges, tags, tooltips, modals, toasts, skeletons, progress bars, status indicators.
2. **Never build from scratch if a DLS component exists.** No custom `<span>` wrappers, hand-rolled dropdowns, or inline-styled elements that duplicate existing components. Use the component's props and variant API.
3. **If you can't find a component, stop and ask.** Say: "I need [X]. I don't see it in the DLS -- should I create a new component, or is there an equivalent?"
4. **Don't re-implement interaction patterns.** Hover, focus, disabled, loading, error states already exist in DLS components. Compose; never clone behavior.

## Layout & Alignment

- **Consistent padding:** Always use DLS spacing tokens. No magic numbers.
- **Table rows must all be equal height.** Truncate with ellipsis + tooltip if overflow.
- **No ghost space in forms.** Conditionally hidden = `display: none`, never `visibility: hidden`.
- **Column widths must not reflow.** Set explicit `min-width`/`max-width` on table columns.
- **Control alignment:** Checkboxes, radios, toggles align with first line of adjacent label text. Use `align-items: flex-start` when labels can wrap.

## Gestalt Principles

- **Proximity:** Related elements closer than unrelated. Label + input tighter than separate fields.
- **Similarity:** Same component type must look identical. No per-instance styling without token reason.
- **Figure/ground:** Interactive elements must contrast with container (WCAG AA minimum).
- **Continuity:** Clear visual columns and rows. Align baselines.
- **Closure:** Group related content inside containers (card, section, panel).

## Figma as Source of Truth

- **Always check the Figma design** before building or updating a component. Use Figma MCP tools (`get_design_context`, `get_screenshot`, `search_design_system`) to understand the component's structure, variants, states, and tokens.
- Compare your implementation against the Figma spec: which types have interactive states (hover, pressed, focus) and which don't. For example, `buttons`, `search`, `chips`, `empty-state`, `divider`, and `label` list-item types are non-interactive — they don't have hover/pressed/focus states.
- Check which sub-elements in Figma are instances of other DLS components (Button, ChipRegular, SearchField, Badge, etc.) and use those DLS components directly — never re-implement them with custom styles.

## When to Stop and Ask

- Before creating any new component not found in the library
- Before adding any one-off style that isn't a DLS token
- Before choosing between similar components (Chip vs Badge vs Tag)

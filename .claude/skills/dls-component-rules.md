# DLS Component & Layout Rules

## Component usage

**Rule 1 — always check the library first.**
Before writing any UI element, check `/src/components` (and Storybook at `storybook.dlslead.com`).
This includes but is not limited to: dropdowns, selects, lists, avatars, chips, badges, tags, kbd, 
icons, tooltips, modals, toasts, skeletons, progress bars, status indicators.

**Rule 2 — never build from scratch if a DLS component exists.**
Do not create custom `<span>` wrappers, hand-rolled dropdowns, or inline-styled elements 
that duplicate existing components. Use the component's props and variant API.

**Rule 3 — if you can't find a component, stop and ask.**
Say exactly: "I need [X]. I don't see it in the DLS — should I create a new component, 
or is there an equivalent I should use instead?"
Do NOT silently invent a one-off implementation.

**Rule 4 — don't re-implement interaction patterns.**
Hover, focus, disabled, loading, error states already exist in DLS components. 
Compose; never clone behavior from scratch.

---

## Layout & alignment

**Consistent padding:** Always use DLS spacing tokens. No magic numbers.
Inner padding for cards, cells, and panels must come from the same spacing scale.

**Table rows must all be equal height.**
If cell content can overflow, truncate with ellipsis + tooltip. Never let variable 
content cause row height inconsistency.

**No ghost space in forms.**
If a field is conditionally hidden, use `display: none` — never `visibility: hidden` 
or an empty placeholder that shifts layout.

**Column widths must not reflow.**
Set explicit `min-width` / `max-width` on all table columns.
Status, avatar, and action columns must have fixed widths.

**Control alignment:**
Checkboxes, radios, toggles, and inline icons must always align vertically with 
the **first line of adjacent label text**. Use `align-items: flex-start` — 
never `center` when labels can wrap.

---

## Gestalt principles — always apply

**Proximity:** Elements that belong together must be visually closer than unrelated elements.
Label + input must be tighter than two separate form fields.

**Similarity:** All instances of the same component type must look identical.
Never style one chip, badge, or avatar differently without a token-based semantic reason.

**Figure/ground:** Interactive elements must contrast with their container.
No ghost buttons on same-tone backgrounds without sufficient contrast ratio (WCAG AA minimum).

**Continuity:** Maintain clear visual columns and rows.
Misaligned baselines or ragged edges break scanning — always align to the grid.

**Closure:** Group related content inside a container (card, section, panel).
Don't rely on spacing alone to imply grouping for complex content.

---

## When to stop and ask (always, before proceeding)

- Before creating any new component not found in `/src/components`
- Before adding any one-off style that isn't a DLS token or existing utility
- Before choosing between similar components (Chip vs Badge vs Tag, etc.)
- When you're unsure which spacing token applies to a given context
```

---

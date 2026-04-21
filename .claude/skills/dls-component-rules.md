# DLS Component & Layout Rules

## Component Usage

1. **Always check the library first.** Before writing any UI element, check `apps/storybook/src/stories/` and Storybook. This includes dropdowns, selects, lists, avatars, chips, badges, tags, tooltips, modals, toasts, skeletons, progress bars, status indicators.
2. **Never build from scratch if a DLS component exists.** No custom `<span>` wrappers, hand-rolled dropdowns, or inline-styled elements that duplicate existing components. Use the component's props and variant API.
3. **If you can't find a component, stop and ask.** Say: "I need [X]. I don't see it in the DLS -- should I create a new component, or is there an equivalent?"
4. **Don't re-implement interaction patterns.** Hover, focus, disabled, loading, error states already exist in DLS components. Compose; never clone behavior.

## Dropdowns, Menus, and Popover Lists — ALWAYS use List + ListItem

> **All dropdowns, menus, select popovers, context menus, command menus, and account/settings flyouts are wrappers around `List` + `ListItem`.** Every row inside them MUST be a `<ListItem>` — never a custom `<div>`, `<li>`, or styled row element. This matches Figma exactly: every row in a dropdown frame is a `list-item` instance.

- **Row structure:** every visible row is `<ListItem type="..." />`. Options are `text` / `with-slots` / `two-line` / `two-line-slots` / `label` / `divider` / `buttons` / `search` / `chips` / `empty-state`.
- **No custom row markup.** `<div className="...-row">`, `<button className="...-item">`, raw `<li>` — all forbidden. If you need drag-and-drop, click handling, or extra HTML attrs, pass them straight to `<ListItem>` (it forwards `...rest` HTML attributes).
- **Section headers** → `<ListItem type="with-slots" className="dls-{component}__section-header" />` and suppress hover in the component CSS.
- **Icons** → use `iconStart` / `iconEnd` props. **Left-side avatars, logos, checkboxes** → use `slotLeft`. **Right-side trailing controls (badge, pin button, trailing chevron)** → use `slotRight`.
- **Container** → every dropdown's root is a standalone `.dls-{name}` with `all: unset; box-sizing: border-box;` that reproduces `.dls-list`'s styling (`display: flex; flex-direction: column; padding; background; border; border-radius; box-shadow; font-family`). Don't layer `.dls-{name}` over `.dls-list` — that double-classes the element and breaks the reset.
- **This applies to every dropdown component in the library**: `DropdownAccount`, `DropdownColumns`, `DropdownColumnActions`, `DropdownFilters`, `DropdownSorting`, `DropdownExport`, `DropdownOptions`, `ContextMenu`, and any new one.

## Icons — Lucide only

> **All icons come from `lucide-react`.** No inline SVG components, no custom icon sets, no hand-drawn `<path>` elements in component files.

- **Import:** `import { Settings as SettingsIcon } from 'lucide-react';` — alias each icon with an `Icon` suffix for clarity.
- **Usage:** pass the Lucide component directly: `<ListItem iconStart={<SettingsIcon />} />` or as an `icon` prop on `<Button>`.
- **Sizing** is controlled by the consuming component's CSS (`.dls-list-item__icon`, `.dls-button__icon`, etc.) via `width: 16px; height: 16px;` or equivalent tokens — never pass `size={16}` inline.
- **Colour** flows from `currentColor` on the Lucide SVG; the parent slot sets `color: var(--dls-color-text-secondary)` (or intent-appropriate token).
- **Figma mapping:** when Figma uses `Icon / Settings`, `Icon / Bell`, `Icon / LogOut`, etc., map 1:1 to Lucide: `Settings`, `Bell`, `LogOut`. If a Figma icon has no obvious Lucide match, stop and ask — don't hand-roll an SVG.
- **Forbidden:** local `const SettingsIcon = () => <svg>...</svg>` in any component or story file.

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

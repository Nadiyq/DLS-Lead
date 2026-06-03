# Item

Category: content / list item
React: <Item>
Spec: specs/components/item.md
TSX: apps/storybook/src/stories/item/Item.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-item--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6613-2913

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a SIMULATION
of the code behavior, not the implementation.

In code, pick the mechanism by surface type:
- Base fill present (filled, soft, any tinted bg)
  → OKLCH L-shift: oklch(from <base> calc(l + <delta>) c h)
- Transparent surface (outline, dotted, ghost, link, or ghost-surface
  components like Accordion, ListItem, MenuItem)
  → overlay tokens.

This component uses: HYBRID.
- `regular` and `outline` types are transparent → overlay tokens for
  hover/pressed when interactive.
- `muted` type has a tinted fill (`--dls-color-surface-muted`) → OKLCH
  L-shift on hover when interactive.
States only apply when `interactive=true` (Tag becomes `<button>`).
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Compact standalone content row with a leading media slot, a stacked
title + description block, and a trailing controls slot. Unlike
`ListItem`, Item is not tied to a `List` container — use it for
settings rows, file entries, account or integration listings, or
any "media + text + actions" combination outside of a dropdown
listbox.

## Use when

- Settings / preferences rows with a leading icon-shape and a
  trailing edit/configure button.
- File or account entries with media, title, and quick actions.
- Integrations / connections lists.
- Any "media + text + actions" row that lives outside a List or
  Dropdown context.

## Do NOT use for

- Rows inside dropdowns, menus, or selection popovers → use
  `ListItem` (composed inside a `List`).
- A bag of arbitrary card content → use `Card`.
- Buttons / actions on their own → use `Button` or `ButtonGroup`.
- Tabular data → use `Table` / `TableCell`.

## Figma → Code mapping

| Figma property      | React prop      | Values / Notes                                  |
|---------------------|-----------------|--------------------------------------------------|
| type                | type            | `regular` / `outline` / `muted`                  |
| media               | media presence  | Figma boolean toggles the media slot; in code, pass a ReactNode (e.g. `<IconShape>`, `<Avatar>`) to render it. |
| media-content       | media           | Figma slot for the leading media; in code, the consumer passes the ReactNode. |
| title               | title           | string                                            |
| description         | description presence | Figma boolean toggles the description line; in code, pass or omit the `description` string. |
| descriptionText     | description     | Figma text override → React string.              |
| content             | innerContent    | Figma slot that replaces the default title/description block. Use for embedded controls, progress, etc. |
| controls            | controls presence | Figma boolean toggles the trailing controls slot. |
| controlsContent     | controls        | Figma slot for the trailing controls; in code, the consumer passes the ReactNode (typically Buttons). |
| —                   | interactive     | Code-only. When `true`, the root becomes a `<button>` with hover/pressed/focus states. |
| —                   | disabled        | Code-only. Native `disabled` (only meaningful when `interactive=true`). |
| —                   | onClick         | Code-only.                                       |
| —                   | className       | Root class extension.                            |

## Anatomy

- Root — `.dls-item` with `data-type="regular | outline | muted"`
  and optional `data-interactive` flag.
- Media slot — `.dls-item__media` (left, flex-shrink: 0)
- Content area — `.dls-item__content` (flex: 1, min-width: 0)
  - Default text block — `.dls-item__text`
    - Title — `.dls-item__title`
    - Description — `.dls-item__description`
  - Or custom inner content (when `innerContent` is provided)
- Controls slot — `.dls-item__controls` (right, flex-shrink: 0)

## Props / API

```ts
export type ItemType = 'regular' | 'outline' | 'muted';

export interface ItemProps {
  type?: ItemType;            // default 'regular'
  media?: React.ReactNode;
  title?: string;
  description?: string;
  innerContent?: React.ReactNode; // replaces default title/description block
  controls?: React.ReactNode;
  interactive?: boolean;      // default false — renders as <button>
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  className?: string;
}
```

## Tokens used

- `--dls-radius-component-item`
- `--dls-color-surface-muted` (muted background)
- `--dls-color-border-base` (outline border)
- `--dls-color-border-subtle` (muted border)
- `--dls-color-text-primary` (title)
- `--dls-color-text-secondary` (description)
- `--dls-color-text-disabled`
- `--dls-state-hover-overlay` (regular/outline hover when interactive)
- `--dls-state-pressed-overlay` (pressed when interactive)
- `--dls-state-l-delta-hover` (muted OKLCH hover shift)
- `--dls-state-focus-ring-color` (focus ring)
- `--dls-spacing-1`, `--dls-spacing-2`, `--dls-spacing-3`, `--dls-spacing-4`
- `--dls-text-m-font-size`, `--dls-text-m-line-height`
- `--dls-font-weight-medium` (title) / `--dls-font-weight-normal` (description)
- `--dls-font-family`

## States

| State    | Figma representation | Code implementation                                  |
|----------|----------------------|------------------------------------------------------|
| default  | All three types      | Passive render                                       |
| hover    | (not in Figma variants) | `interactive=true`: regular/outline → overlay; muted → OKLCH L-shift on `--dls-color-surface-muted` |
| pressed  | (not in Figma variants) | `interactive=true`: `--dls-state-pressed-overlay`   |
| focus-visible | (not in Figma variants) | `interactive=true`: 3px focus-ring box-shadow  |
| disabled | (not in Figma variants) | `interactive=true` + `disabled`: native `disabled` + text disabled token + cursor not-allowed + pointer-events none |

The component has no spatial motion, so no `prefers-reduced-motion`
guard is required. Color transitions on interactive states do not
need a motion guard.

## Accessibility contract

- When `interactive=false` (default) the root is a passive `<div>` —
  no role, no focus.
- When `interactive=true` the root is a native `<button type="button">`
  — focusable, keyboard-activatable (Space/Enter), `disabled` honored,
  `:focus-visible` ring via box-shadow.
- The title is rendered as a `<span>` (not a heading); consumers using
  Item as a page section header should wrap it accordingly or use
  `Card` with a real `<h*>`.
- Media is decorative by default — `IconShape` and `Avatar` already
  set `aria-hidden` when used in non-semantic slots. Consumers placing
  meaningful imagery in the media slot should provide their own alt
  text.

## Composition rules

- Media slot expects: `IconShape`, `Avatar`, `<img>` (with alt), or a
  decorative element. Avoid placing interactive children inside the
  media slot when the Item is `interactive` (nested-interactive
  warning).
- Controls slot expects: `Button`, `ButtonGroup`, icon-only `Button`,
  `Badge`, `Chip`, or a small group of these. Avoid full forms in
  the controls slot.
- `innerContent` replaces the default title/description block when
  the consumer needs a custom layout (e.g. progress bar, metadata
  pills). It does NOT stack underneath title/description — use a
  Card if you need a richer layout.
- Do not nest an Item inside another Item.
- Use Item outside of `List` / `Dropdown` — for in-listbox rows use
  `ListItem` so keyboard semantics and focus management are correct.

## Known deviations

- The component spec mentions `--dls-color-component-item-*` tokens
  but those do not exist in `tokens.json`. The CSS uses semantic
  surface/border/text tokens directly — the L4 component token group
  is deferred until consumers explicitly need item-scoped overrides.
  (Low severity.)

## Code example

```tsx
import { Item } from './item/Item';
import { IconShape } from './icon-shape/IconShape';
import { Button } from './Button';
import { Layers as LayersIcon, MoreVertical as MoreIcon } from 'lucide-react';

// Passive settings row
<Item
  type="outline"
  media={<IconShape intent="neutral"><LayersIcon /></IconShape>}
  title="Project settings"
  description="Manage your project configuration and permissions."
  controls={
    <>
      <Button variant="soft" intent="neutral" size="m">Edit</Button>
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<MoreIcon />} aria-label="More" />
    </>
  }
/>

// Interactive (focusable, hover/pressed/focus-visible)
<Item
  type="regular"
  interactive
  onClick={() => navigate('/account')}
  media={<IconShape intent="primary"><LayersIcon /></IconShape>}
  title="Account settings"
  description="Update your profile and preferences"
/>
```

## Cross-references

- [list-item.md](../components/list-item.md)
- [card.md](../components/card.md)
- [icon-shape.md](../components/icon-shape.md)
- [button.md](../components/button.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)
- [../foundations/motion.md](../foundations/motion.md)

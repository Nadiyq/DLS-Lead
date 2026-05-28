# BadgeNumber / number

Category: status / metadata
Figma component set: number
React: <BadgeNumber>
Spec: specs/components/badge-number.md
TSX: apps/storybook/src/stories/badge/number/BadgeNumber.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-badge-number--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=45-2398

--------------------------------------------
## State implementation contract

BadgeNumber is informational and does not define interactive hover,
pressed, focus, selected, or disabled states.

In code:
- Visual variation is controlled by `data-variant`, `data-intent`, and
  `data-size`.
- Count overflow is computed from `value` and `max`.
- The root stays a passive `<span>`.
--------------------------------------------

## Purpose

Compact numeric badge for sidebar menu items, tabs, notification counts,
and total counts related to a page, menu item, or tab.

## Use when

- Showing a count next to a navigation item.
- Showing unread or new-item counts.
- Showing the total number of data items associated with a tab.
- Showing a text-only colored count where the surrounding UI already
  provides structure.

## Do NOT use for

- Passive status words -> use Badge.
- Dot-only status -> use BadgeIndicator.
- Editable filters or selectable values -> use ChipRegular or FilterChip.
- Body text, labels, or helper copy -> use Text.

## Figma -> Code mapping

| Figma property | React prop | Values |
|---|---|---|
| intent | intent | neutral, info, success, warning, danger |
| style | variant | filled -> filled, soft -> soft, text -> text |
| text | value | numeric value |
| component set | React component | fixed: BadgeNumber |

Notes:
- Figma `style=text` maps to React `variant="text"`.
- React also supports `variant="outline"` as a Storybook/code extension.
- React also supports `intent="primary"` as a code extension because the
  badge color tokens include primary.
- Figma node 45:2398 shows the 20px number badge; use `size="s"` for
  that footprint in React.
- React `max` has no Figma property. It controls overflow display, for
  example `value={100}` with `max={99}` renders `99+`.

## Anatomy

1. Root numeric badge container: `<span class="dls-badge-number">`.
2. Numeric text derived from `value` and `max`.

## Props / API

- value number, required. Numeric value to display.
- max number, optional. Default: 99. Values above max render as
  `{max}+`.
- variant BadgeNumberVariant, optional. Default: filled.
  Values: filled, soft, outline, text.
- intent BadgeNumberIntent, optional. Default: danger.
  Values: neutral, primary, info, success, warning, danger.
- size BadgeNumberSize, optional. Default: m.
  Values: m, s, xs.
- className string, optional. Additional root class.
- Standard span attributes are allowed for accessibility and metadata,
  such as `aria-label`, `title`, and `aria-live`.

## Tokens used

- --dls-color-component-badge-neutral-bg
- --dls-color-component-badge-neutral-fg
- --dls-color-component-badge-neutral-border
- --dls-color-component-badge-primary-bg
- --dls-color-component-badge-primary-fg
- --dls-color-component-badge-primary-border
- --dls-color-component-badge-info-bg
- --dls-color-component-badge-info-fg
- --dls-color-component-badge-info-border
- --dls-color-component-badge-success-bg
- --dls-color-component-badge-success-fg
- --dls-color-component-badge-success-border
- --dls-color-component-badge-warning-bg
- --dls-color-component-badge-warning-fg
- --dls-color-component-badge-warning-border
- --dls-color-component-badge-danger-bg
- --dls-color-component-badge-danger-fg
- --dls-color-component-badge-danger-border
- --dls-color-intent-neutral-base
- --dls-color-intent-neutral-on-base
- --dls-color-intent-primary-base
- --dls-color-intent-primary-on-base
- --dls-color-intent-info-base
- --dls-color-intent-info-on-base
- --dls-color-intent-success-base
- --dls-color-intent-success-on-base
- --dls-color-intent-warning-base
- --dls-color-intent-warning-on-base
- --dls-color-intent-danger-base
- --dls-color-intent-danger-on-base
- --dls-color-border-base
- --dls-font-family
- --dls-font-weight-medium
- --dls-radius-component-badge-number
- --dls-spacing-0-5
- --dls-spacing-1
- --dls-spacing-1-5
- --dls-text-s-font-size
- --dls-text-s-line-height
- --dls-text-xs-font-size
- --dls-text-xs-line-height

Lookup order: L4 component -> L2 semantic/intent -> primitive aliases
through token definitions. Do not reference raw hex values in component
CSS.

## States

### Figma representation

Figma shows a matrix of `intent` and `style` variants for the `number`
component set. The canonical set is node 45:2398.

### Code implementation

BadgeNumber exposes:
- `data-variant="filled | soft | outline | text"`
- `data-intent="neutral | primary | info | success | warning | danger"`
- `data-size="m | s | xs"`

No hover, active, disabled, selected, or focus states are defined because
BadgeNumber is not interactive.

### Per-variant behavior

- filled -> intent base background, intent on-base text.
- soft -> intent subtle background, intent text, intent border.
- outline -> transparent surface, intent text, 1px border.
- text -> transparent surface, intent text, no visible border.

## Accessibility contract

- Root is a `<span>` and is not keyboard focusable.
- The visible number is exposed as plain text by default.
- Add `aria-label` when the count needs context, for example
  `aria-label="5 unread messages"`.
- Dynamic count updates should be announced by the consuming surface
  with `aria-live="polite"` when needed.
- Do not place interactive controls inside BadgeNumber.

## Composition rules

- Keep the rendered value compact, usually one to three digits or a
  short overflow value such as `99+`.
- Use inside SidebarItem, Tabs, TopBar, list rows, and compact metadata
  regions.
- Prefer `variant="text"` where a surrounding tab/menu item already
  provides selection surface and the count should be color-only.
- Prefer `variant="soft"` for sidebar counts when the badge needs a
  subtle container.

## Known deviations from system rules

- Code-supported extensions: React also supports `outline`, `primary`,
  `m`, and `xs`; these are documented in Storybook but are not shown in
  Figma node 45:2398. Severity: low.

## Known accessibility gaps

None.

## Code example

```tsx
<BadgeNumber value={5} intent="danger" variant="filled" size="s" />
```

```tsx
<BadgeNumber
  value={24}
  intent="info"
  variant="text"
  size="s"
  aria-label="24 new updates"
/>
```

```tsx
<BadgeNumber value={128} max={99} intent="neutral" variant="soft" size="s" />
```

## Cross-references

- specs/components/badge-number.md
- specs/components/badge.md
- specs/components/sidebar-item.md
- specs/components/tabs.md
- specs/foundations/accessibility.md
- specs/tokens/token-reference.md

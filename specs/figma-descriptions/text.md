# Text

Category: content / typography pair
React: <Text>
Spec: specs/components/text.md
TSX: apps/storybook/src/stories/text/Text.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-text--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6950-15518

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a SIMULATION
of the code behavior, not the implementation.

This component uses: NONE. Text is a passive typography pair with no
hover/pressed/focus states.
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Paired typographic block (title above description, or description
alone) used as slot content inside hosting components. Use Text when
the design calls for a compact stacked text treatment without
inventing one-off `<p>` markup. Do not treat it as a universal
typography primitive for every text node in the app — use semantic
HTML (`<h1>`…`<h6>`, `<p>`) at the page level.

## Use when

- Title + description slot inside a Card, ListItem, EmptyState, or
  similar host.
- Compact label + supporting line in dense rows.
- Optional title with always-present description (Figma `secondLine`
  toggles the title in code by passing `title` or omitting it).

## Do NOT use for

- Page-level headings → use semantic `<h1>`…`<h6>`.
- Free body paragraphs → use semantic `<p>` with typography tokens.
- Interactive text (links, button labels) → use `<a>` / `Button`.
- Form labels → use `FormField` or `<label>` paired with the input.

## Figma → Code mapping

| Figma property | React prop | Values / Notes |
|---|---|---|
| size           | size       | `M` → `m`, `S` → `s`, `XS` → `xs` |
| secondLine     | title presence | `false` → omit `title`; `true` → pass `title` |
| title          | title      | string; rendered only when present |
| text           | description | string; always rendered |
| —              | className  | code-only root class extension |

Notes:
- Figma uses a boolean `secondLine` toggle paired with a `title`
  string. In code we collapse those two Figma properties into a
  single `title?: string` — passing it shows the title, omitting it
  yields the description-only form.

## Anatomy

- Root — `.dls-text` with `data-size="m | s | xs"`
- Optional title — `.dls-text__title`
- Description — `.dls-text__description`

## Props / API

```ts
export type TextSize = 'm' | 's' | 'xs';

export interface TextProps {
  size?: TextSize;          // default 'm'
  title?: string;           // omit for description-only
  description: string;      // required
  className?: string;
}
```

## Tokens used

- `--dls-font-family`
- `--dls-spacing-1` (title/description gap)
- `--dls-font-weight-medium` (title)
- `--dls-font-weight-normal` (description)
- `--dls-color-text-primary` (title)
- `--dls-color-text-secondary` (description)
- Size M: `--dls-text-l-font-size` / `--dls-text-l-line-height` (title) + `--dls-text-m-font-size` / `--dls-text-m-line-height` (description)
- Size S: `--dls-text-m-font-size` / `--dls-text-m-line-height` (title) + `--dls-text-s-font-size` / `--dls-text-s-line-height` (description)
- Size XS: `--dls-text-s-font-size` / `--dls-text-s-line-height` (title) + `--dls-text-xs-font-size` / `--dls-text-xs-line-height` (description)

## States

| State    | Figma representation | Code implementation     |
|----------|----------------------|-------------------------|
| default  | All variants         | Passive render          |

No interactive states. No animations or transitions, so no
`prefers-reduced-motion` guard is required.

## Accessibility contract

- Root is a plain `<div>`; the inner title and description are
  `<span>` elements. Text contributes content to the accessibility
  tree but is not focusable.
- Visual hierarchy (medium title above regular description) is
  presentation only; consumers using Text as a row label inside
  semantic structures (Card heading, table row, list item) should
  wrap or label the host appropriately.
- Color contrast: title uses `text-primary`, description uses
  `text-secondary` — both pass WCAG AA at all sizes against the
  default surface tokens.
- Reduced motion: N/A (no motion).

## Composition rules

- Place Text inside a host slot: `Card`, `ListItem` (`type="two-line"`
  hosts can compose Text directly), `EmptyState`, `Dialog` content,
  `Tooltip` body, etc.
- Do not wrap Text in another Text.
- Do not nest interactive content inside Text — use the host
  component's action affordances instead.

## Known deviations

(None. Code is a clean 1:1 mapping of the Figma slot helper.)

## Code example

```tsx
import { Text } from './text/Text';

// Description only (Figma secondLine=false)
<Text size="m" description="Last synced 2 minutes ago" />

// Title + description (Figma secondLine=true)
<Text size="s" title="Storage" description="42% of 100 GB used" />
```

## Cross-references

- [card.md](../components/card.md)
- [empty-state.md](../components/empty-state.md)
- [list-item.md](../components/list-item.md)
- [../foundations/typography.md](../foundations/typography.md)
- [../tokens/typography-tokens.md](../tokens/typography-tokens.md)

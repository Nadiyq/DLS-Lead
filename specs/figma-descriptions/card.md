# Card

Category: surface
React: `<Card>`
Spec: `specs/components/card.md`
TSX: `apps/storybook/src/stories/card/Card.tsx`
CSS: `apps/storybook/src/stories/card/card.css`
Storybook: https://storybook.dlslead.com/?path=/docs/components-card--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6953-8834

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays -- this is a
SIMULATION of the code behavior, not the implementation.

This component: NONE.
Card is a static container with no interactive states.
Interactive behavior comes from child components (Button, Badge, etc.).
--------------------------------------------

## Purpose

Flexible container that groups related content, metadata, and actions
into a single visual unit. Three visual types (regular, outline, muted)
control how the card separates from its surrounding context.

## Use when

- Displaying a distinct piece of content or data.
- Grouping information and actions for the same object.
- Presenting collections in lists, grids, dashboards, or feeds.
- Creating reusable content blocks with consistent structure.
- Organizing content into visually separated sections.

## Do NOT use for

- Simple spacing without meaningful grouping.
- Large multi-step workflows -- use dedicated pages.
- Temporary notifications -- use Alert or Toast.
- Modal interactions -- use Dialog.
- Deeply nested containers creating unnecessary complexity.

## Figma -> Code mapping

| Figma property  | React prop       | Values / notes                                    |
|-----------------|------------------|---------------------------------------------------|
| type            | type             | "regular" \| "outline" \| "muted"                 |
| header          | (computed)       | Figma boolean. In React, header renders if headerIcon or headerContent is truthy. |
| icon            | headerIcon       | Figma boolean -> React ReactNode (truthy = visible) |
| headerContent   | headerContent    | Figma instance swap -> React ReactNode             |
| title           | title            | string                                             |
| description     | (controls visibility) | Figma boolean -> React: description prop truthy/falsy |
| descriptionText | description      | Figma string -> React `description` string prop    |
| content         | children         | Figma instance swap -> React ReactNode             |
| footer          | (controls visibility) | Figma boolean -> React: footer prop truthy/falsy  |
| footerContent   | footer           | Figma instance swap -> React ReactNode (footer)    |

## Anatomy

```
Root (.dls-card) [data-type="regular|outline|muted"]
+-- Header (.dls-card__header) [optional]
|   +-- Header icon (.dls-card__header-icon) [optional]
|   +-- Header content (.dls-card__header-content) [optional]
+-- Content (.dls-card__content) [optional]
|   +-- Text block (.dls-card__text) [optional]
|   |   +-- Title (.dls-card__title) [optional]
|   |   +-- Description (.dls-card__description) [optional]
|   +-- children slot
+-- Footer (.dls-card__footer) [optional]
    +-- consumer-provided content
```

## Props / API

| Prop           | Type             | Required | Default   | Description                               |
|----------------|------------------|----------|-----------|-------------------------------------------|
| type           | CardType         | no       | "regular" | Visual type                               |
| headerIcon     | React.ReactNode  | no       | --        | Header icon (16x16)                       |
| headerContent  | React.ReactNode  | no       | --        | Custom header content (slot)              |
| title          | string           | no       | --        | Card title                                |
| description    | string           | no       | --        | Card description                          |
| children       | React.ReactNode  | no       | --        | Custom content below title/description    |
| footer         | React.ReactNode  | no       | --        | Footer content (slot)                     |
| className      | string           | no       | --        | Additional CSS class                      |

### CardType

```ts
type CardType = 'regular' | 'outline' | 'muted';
```

## Tokens used

### Layout

| Token | Use |
|-------|-----|
| `--dls-radius-component-card` | Container border-radius |
| `--dls-font-family` | Container font family |
| `--dls-spacing-4` | Container padding, container gap |
| `--dls-spacing-3` | Content area gap |
| `--dls-spacing-2` | Icon margin-right, footer gap |
| `--dls-spacing-1` | Text block gap (title-description) |

### Color

| Token | Use |
|-------|-----|
| `--dls-color-border-base` | Outline type border |
| `--dls-color-surface-muted` | Muted type background |
| `--dls-color-border-subtle` | Muted type border |
| `--dls-color-text-primary` | Icon color, title color |
| `--dls-color-text-secondary` | Description color |

### Typography

| Token | Use |
|-------|-----|
| `--dls-text-xl-font-size` | Title |
| `--dls-text-xl-line-height` | Title |
| `--dls-font-weight-medium` | Title |
| `--dls-text-m-font-size` | Description |
| `--dls-text-m-line-height` | Description |
| `--dls-font-weight-normal` | Description |

## States

Card has no interactive states. It is a static container.
All interactivity is delegated to child components (Button, Badge, etc.).

## Accessibility contract

- Root: `div` (non-interactive container).
- No ARIA attributes required on the card itself.
- Keyboard: not focusable. Child interactive elements handle their own focus.
- No `prefers-reduced-motion` needed (no CSS transitions/animations).
- Interactive cards (clickable) should be implemented by the consumer wrapping the card in an appropriate interactive element.

## Composition rules

- Card is a top-level grouping container.
- May contain any DLS components as children (Button, Badge, Avatar, Table, etc.).
- Do not nest Card inside Card.
- Header icon should be a 16x16 lucide-react icon.
- Footer typically contains Button components for actions.

## Known deviations

- **token-layer**: No L4 color tokens for card in `tokens.json`. Uses semantic tokens. Only `--dls-radius-component-card` exists as L4.

## Code example

```tsx
<Card
  type="outline"
  headerIcon={<FolderIcon />}
  headerContent={<Badge variant="soft" intent="neutral" size="m">Badge</Badge>}
  title="Project overview"
  description="High-level metrics and recent activity."
  footer={<Button variant="outline" size="m">View details</Button>}
>
  <Table />
</Card>
```

## Cross-references

- [text.md](../components/text.md)
- [table.md](../components/table.md)
- [empty-state.md](../components/empty-state.md)
- [button.md](../components/button.md)
- [badge.md](../components/badge.md)

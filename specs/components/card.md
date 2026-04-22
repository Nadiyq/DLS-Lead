---
name: Card
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/card/Card.tsx
  - tokens/tokens.json
---

# Card

## Metadata

- Category: surface
- Types: `regular | outline | muted`

## Overview

Use `Card` to group related content into a surface with optional header and footer areas.

Do not use a raw bordered container when a card pattern is intended.

## Anatomy

- Root surface
- Optional header icon
- Optional header content
- Title and description block
- Content slot
- Optional footer

## Tokens Used

- `--dls-color-surface-*`
- `--dls-color-border-*`
- `--dls-radius-component-card`
- `--dls-shadow-surface-*`

## Props / API

- `type`
- `headerIcon`
- `headerContent`
- `title`
- `description`
- `children`
- `footer`

## States

- default visual type only

## Code Example

```tsx
<Card
  type="regular"
  title="Project overview"
  description="High-level metrics and recent activity."
  footer={<Button size="s">View details</Button>}
>
  <Table />
</Card>
```

## Cross-References

- [text.md](text.md)
- [table.md](table.md)
- [empty-state.md](empty-state.md)

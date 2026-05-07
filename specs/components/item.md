---
name: Item
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/item/Item.tsx
  - apps/storybook/src/stories/item/item.css
  - tokens/tokens.json
---

# Item

## Metadata

- Category: content / list item
- Types: `regular | outline | muted`

## Overview

Use `Item` for standalone content rows with media, text, and controls. Unlike `ListItem`, it is not tied to a `List` container — suitable for cards, settings rows, or file entries.

## Anatomy

- Root (div or button if interactive)
- Media slot (icon, avatar, image)
- Content: title, description, inner content
- Controls slot (trailing actions)

## Tokens Used

- `--dls-color-component-item-*`
- `--dls-radius-component-item`
- `--dls-spacing-*`

## Props / API

- `type` — `regular | outline | muted`
- `media`
- `title`
- `description`
- `innerContent`
- `controls`
- `interactive` — renders as button
- `disabled`
- `onClick`

## States

- default
- hover (if interactive)
- focus-visible (if interactive)
- disabled

## Code Example

```tsx
<Item type="outline" media={<Avatar initials="NA" size="40" />}
  title="Nadiia" description="Designer" controls={<Button variant="ghost" size="s">Edit</Button>} />
```

## Cross-References

- [list-item.md](list-item.md)
- [card.md](card.md)

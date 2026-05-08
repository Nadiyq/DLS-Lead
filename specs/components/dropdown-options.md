---
name: DropdownOptions
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/dropdown-options/DropdownOptions.tsx
  - apps/storybook/src/stories/dropdown-options/dropdown-options.css
  - tokens/tokens.json
---

# DropdownOptions

## Metadata

- Category: menu / container
- Alignment: `start | end`
- Side: `top | bottom`

## Overview

Use `DropdownOptions` for a generic action menu triggered by an icon button (typically ellipsis). The panel content is a `List` with `ListItem` rows — supports submenus.

## Anatomy

- Root
- Trigger: icon-only Button (soft, neutral)
- Panel (role="menu"): positioned by align + side
  - Children (List + ListItem content)

## Tokens Used

- `--dls-color-component-dropdown-options-*`
- `--dls-radius-component-dropdown-options`
- list-item token families

## Props / API

- `children` — menu content
- `align` — `start | end`
- `side` — `top | bottom`
- `triggerIcon` — custom trigger icon
- `triggerLabel` — accessible label (default: "Options")
- `disabled`

## States

- closed
- open
- disabled

## Code Example

```tsx
<DropdownOptions align="end">
  <List>
    <ListItem type="text" text="Edit" icon={<EditIcon />} />
    <ListItem type="text" text="Delete" icon={<TrashIcon />} />
  </List>
</DropdownOptions>
```

## Cross-References

- [context-menu.md](context-menu.md)
- [list-item.md](list-item.md)

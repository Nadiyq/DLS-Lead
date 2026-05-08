---
name: Toolbar
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/toolbar/Toolbar.tsx
  - apps/storybook/src/stories/toolbar/toolbar.css
  - tokens/tokens.json
---

# Toolbar

## Metadata

- Category: toolbar / editor controls

## Overview

Use `Toolbar` for a horizontal row of action buttons — text formatting, editor controls, or grouped actions. Supports a `sticky` mode (flat, no radius/shadow) for embedding in other components like `MessageComposer`.

## Anatomy

- Root (role="toolbar")
- Button children
- Separator elements between groups
- `ToolbarGroup` — clusters buttons without gaps

## Tokens Used

- `--dls-color-component-toolbar-*`
- `--dls-radius-component-toolbar`

## Props / API

Toolbar:
- `sticky` — flat embedded mode
- `children`

ToolbarGroup:
- `children` — grouped buttons

## States

- default (floating with shadow)
- sticky (flat, no shadow)
- active buttons (via aria-pressed on children)

## Code Example

```tsx
<Toolbar>
  <ToolbarGroup>
    <Button variant="ghost" icon={<BoldIcon />} iconOnly aria-label="Bold" />
    <Button variant="ghost" icon={<ItalicIcon />} iconOnly aria-label="Italic" />
  </ToolbarGroup>
  <Separator orientation="vertical" />
  <Button variant="ghost" icon={<LinkIcon />} iconOnly aria-label="Link" />
</Toolbar>
```

## Cross-References

- [message-composer.md](message-composer.md)
- [button.md](button.md)

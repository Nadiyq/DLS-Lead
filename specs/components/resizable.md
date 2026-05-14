---
name: Resizable
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/resizable/Resizable.tsx
  - apps/storybook/src/stories/resizable/resizable.css
  - tokens/tokens.json
---

# Resizable

## Metadata

- Category: layout / interaction

## Overview

Use `Resizable` as a drag handle between resizable panels. Supports pointer drag and keyboard arrow keys (shift for 10px steps).

## Anatomy

- Root (role="separator")
- Vertical line
- Grip handle with 6-dot icon

## Tokens Used

- `--dls-color-component-resizable-*`

## Props / API

- `disabled`
- `onResize` — called with horizontal delta during drag
- `onResizeStart`, `onResizeEnd`
- `valueNow`, `valueMin`, `valueMax` — ARIA value metadata for keyboard/screen-reader users
- `aria-label`

## States

- default
- active (dragging)
- disabled

## Code Example

```tsx
<div style={{ display: 'flex' }}>
  <aside style={{ width: leftWidth }}>Sidebar</aside>
  <Resizable onResize={(dx) => setLeftWidth(w => w + dx)} />
  <main>Content</main>
</div>
```

## Cross-References

- [separator.md](separator.md)

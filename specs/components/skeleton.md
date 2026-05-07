---
name: Skeleton
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/skeleton/Skeleton.tsx
  - apps/storybook/src/stories/skeleton/skeleton.css
  - tokens/tokens.json
---

# Skeleton

## Metadata

- Category: loading / placeholder
- Types: `regular | card | text`

## Overview

Use `Skeleton` as a loading placeholder. Three predefined layouts: regular (avatar + lines), card (lines + image), text (lines only). Marked `aria-hidden`.

## Anatomy

- Root (aria-hidden="true")
- Regular: avatar shape + text lines
- Card: text lines + image shape
- Text: text lines only

## Tokens Used

- `--dls-color-component-skeleton-*`
- `--dls-radius-component-skeleton`

## Props / API

- `type` — `regular | card | text`

## States

- animated shimmer (CSS)

## Code Example

```tsx
<Skeleton type="regular" />
```

## Cross-References

- [spinner.md](spinner.md)

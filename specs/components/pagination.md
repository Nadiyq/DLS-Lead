---
name: Pagination
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/pagination/Pagination.tsx
  - apps/storybook/src/stories/pagination/pagination.css
  - tokens/tokens.json
---

# Pagination

## Metadata

- Category: navigation
- Variants: `bordered | borderless`
- PageButton types: `number | more | previous | next`

## Overview

Use `Pagination` for navigating paged data. Includes page buttons with smart ellipsis, prev/next arrows, and optional items-per-page selector.

## Anatomy

- Root (`<nav>`)
- ItemsPerPage selector (optional)
- Page buttons: number, ellipsis (more), previous, next
- Selected page indicator

## Tokens Used

- `--dls-color-component-pagination-*`
- `--dls-radius-component-pagination`

## Props / API

Pagination:
- `variant` — `bordered | borderless`
- `currentPage`, `totalPages`
- `totalItems`, `pageSize`, `pageSizeOptions`
- `onPageChange`, `onPageSizeChange`

PageButton:
- `type` — `number | more | previous | next`
- `selected`, `disabled`
- `onClick`

## States

- default
- selected page
- disabled (at boundaries)

## Code Example

```tsx
<Pagination variant="bordered" currentPage={1} totalPages={10} onPageChange={setPage} />
```

## Cross-References

- [table.md](table.md)

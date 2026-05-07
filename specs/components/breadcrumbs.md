---
name: Breadcrumbs
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/breadcrumbs/Breadcrumbs.tsx
  - apps/storybook/src/stories/breadcrumbs/breadcrumbs.css
  - tokens/tokens.json
---

# Breadcrumbs

## Metadata

- Category: navigation
- Item types: `regular | dropdown | more | current`

## Overview

Use `Breadcrumbs` for hierarchical page navigation. The last item is typically `current`.

## Anatomy

- Root (`<nav>` with `<ol>`)
- Breadcrumb items (links, buttons, or current text)
- Separators between items (default: chevron)

## Tokens Used

- `--dls-color-component-breadcrumbs-*`
- `--dls-spacing-*`

## Props / API

- `items` — array of `BreadcrumbItem` (type, label, href, onClick)
- `separator` — custom separator element (default: ChevronRight)

Item types:
- `regular` — clickable link
- `dropdown` — link with chevron for sub-nav
- `more` — collapsed ellipsis
- `current` — non-interactive current page

## States

- default
- hover / focus on links
- current page (non-interactive)

## Code Example

```tsx
<Breadcrumbs items={[
  { label: "Home", href: "/" },
  { type: "dropdown", label: "Projects", href: "/projects" },
  { type: "current", label: "Design system" },
]} />
```

## Cross-References

- [../patterns/component-selection.md](../patterns/component-selection.md)

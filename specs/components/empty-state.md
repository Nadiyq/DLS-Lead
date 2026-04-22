---
name: Empty State
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/empty-state/EmptyState.tsx
  - tokens/tokens.json
---

# Empty State

## Metadata

- Category: feedback / zero state
- Variants: `borderless | bordered`

## Overview

Use `EmptyState` for zero-data, no-results, and onboarding gaps inside a page, card, or section.

Do not use it as an alert banner or error toast replacement.

## Anatomy

- Root container
- Optional media slot
- Text block
- Optional actions area

## Tokens Used

- `--dls-radius-component-empty-state`
- surface, border, and text semantic tokens
- spacing and semantic typography tokens

## Props / API

- `variant`
- `media`
- `title`
- `description`
- `children`
- `className`

## States

- `borderless`
- `bordered`

## Code Example

```tsx
<EmptyState
  variant="bordered"
  title="No invoices yet"
  description="Create your first invoice to start tracking revenue."
  children={<Button size="s">Create invoice</Button>}
/>
```

## Cross-References

- [card.md](card.md)
- [text.md](text.md)

---
name: IconShape
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/icon-shape/IconShape.tsx
  - apps/storybook/src/stories/icon-shape/icon-shape.css
  - tokens/tokens.json
---

# IconShape

## Metadata

- Category: icon container
- Intents: `primary | success | warning | danger | info | neutral`
- Sizes: `m | s | xs`

## Overview

Use `IconShape` for semantic icon badges — a colored background shape around an icon. Sizes map to 40px, 32px, and 24px.

Do not use it for user/entity representations; use `Avatar` for that.

## Anatomy

- Root (colored shape)
- Icon child (SVG from lucide-react)

## Tokens Used

- `--dls-color-intent-*`
- `--dls-radius-component-icon-shape`

## Props / API

- `intent`
- `size`
- `children` — icon element

## States

- static (display only, varies by intent)

## Code Example

```tsx
<IconShape intent="success" size="m"><CheckIcon /></IconShape>
```

## Cross-References

- [avatar.md](avatar.md)
- [checkmark.md](checkmark.md)

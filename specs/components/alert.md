---
name: Alert
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/Alert.tsx
  - apps/storybook/src/stories/alert.css
  - tokens/tokens.json
---

# Alert

## Metadata

- Category: feedback
- Variants: none
- Intents: `neutral | primary | info | success | warning | danger`
- Sizes: `m | s`

## Overview

Use `Alert` for inline contextual messages — confirmations, warnings, errors, or informational banners.

Do not use it for modal confirmations; use `AlertDialog` for that.

## Anatomy

- Root
- Icon slot (optional)
- Body: title and/or description
- Action slot (optional)

## Tokens Used

- `--dls-color-intent-*`
- `--dls-radius-component-alert`
- `--dls-spacing-*`

## Props / API

- `intent`
- `size`
- `icon`
- `title`
- `description`
- `action`

## States

- default (per intent)

## Code Example

```tsx
<Alert intent="success" size="m" title="Saved" description="Your changes have been saved." />
```

## Cross-References

- [alert-dialog.md](alert-dialog.md)
- [../patterns/component-selection.md](../patterns/component-selection.md)

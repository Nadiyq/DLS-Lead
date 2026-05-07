---
name: AlertDialog
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/AlertDialog.tsx
  - apps/storybook/src/stories/alert-dialog.css
  - tokens/tokens.json
---

# AlertDialog

## Metadata

- Category: feedback / modal
- Variants: none
- Intents: `neutral | primary | info | success | warning | danger`
- Breakpoints: `desktop | mobile`

## Overview

Use `AlertDialog` for confirmations, destructive-action warnings, or blocking decisions that require an explicit response.

Do not use it for inline messages; use `Alert` for that.

## Anatomy

- Root (native `<dialog>`)
- Icon slot (optional)
- Title + description text block
- Actions row: primary and/or secondary action

## Tokens Used

- `--dls-color-intent-*`
- `--dls-radius-component-alert-dialog`
- `--dls-spacing-*`

## Props / API

- `intent`
- `breakpoint`
- `open`
- `icon`
- `title`
- `description`
- `primaryAction`
- `secondaryAction`
- `onClose`

## States

- open
- closed

## Code Example

```tsx
<AlertDialog
  intent="danger"
  open={showDialog}
  title="Delete project?"
  description="This action cannot be undone."
  primaryAction={<Button variant="filled" intent="danger">Delete</Button>}
  secondaryAction={<Button variant="outline" intent="neutral">Cancel</Button>}
  onClose={() => setShowDialog(false)}
/>
```

## Cross-References

- [alert.md](alert.md)
- [dialog.md](dialog.md)

---
name: Dialog
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/dialog/Dialog.tsx
  - apps/storybook/src/stories/dialog/dialog.css
  - tokens/tokens.json
---

# Dialog

## Metadata

- Category: modal / overlay
- Breakpoints: `desktop | mobile`

## Overview

Use `Dialog` for modal content that requires focus — forms, confirmations, detail views. Uses the native `<dialog>` element with `showModal()`.

For simple confirm/deny decisions, prefer `AlertDialog`.

## Anatomy

- Root (native `<dialog>`)
- Header: title, optional description, close button
- Content slot
- Actions slot

## Tokens Used

- `--dls-color-component-dialog-*`
- `--dls-radius-component-dialog`
- `--dls-spacing-*`

## Props / API

- `open`
- `breakpoint` — `desktop | mobile`
- `title`
- `description`
- `children` — content slot
- `actions` — action buttons slot
- `onClose`

## States

- open
- closed

## Code Example

```tsx
<Dialog open={isOpen} title="Edit profile" onClose={() => setIsOpen(false)}
  actions={<Button variant="filled" intent="primary">Save</Button>}>
  <FormField label="Name"><InputField /></FormField>
</Dialog>
```

## Cross-References

- [alert-dialog.md](alert-dialog.md)
- [form-field.md](form-field.md)

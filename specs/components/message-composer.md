---
name: MessageComposer
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/message-composer/MessageComposer.tsx
  - apps/storybook/src/stories/message-composer/message-composer.css
  - tokens/tokens.json
---

# MessageComposer

## Metadata

- Category: form / composition
- Channels: `sms | email`

## Overview

Use `MessageComposer` for rich message editing — SMS with optional floating toolbar, or email with subject, recipients, and sticky toolbar.

## Anatomy

- Root
- Top: channel tabs + status indicator
- Alert banner (optional)
- Field rows: subject, recipients (email only)
- Toolbar: sticky or floating
- Textarea input
- Actions row: left and right action slots

## Tokens Used

- `--dls-color-component-message-composer-*`
- `--dls-radius-component-message-composer`
- `--dls-spacing-*`

## Props / API

- `channel` — `sms | email`
- `tabs`, `channelStatus`, `alert`
- `subject`, `onSubjectChange` (email)
- `recipients` (email)
- `toolbar`, `floatingToolbar`
- `placeholder`, `value`, `onChange`
- `actionsLeft`, `actionsRight`

## States

- SMS mode
- email mode (shows subject + recipients)
- toolbar visible / floating

## Code Example

```tsx
<MessageComposer channel="email" subject="Re: Project update"
  toolbar={<Toolbar>...</Toolbar>}
  actionsRight={<Button variant="filled">Send</Button>} />
```

## Cross-References

- [textarea.md](textarea.md)
- [toolbar.md](toolbar.md)

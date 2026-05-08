---
name: Textarea
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/textarea/Textarea.tsx
  - apps/storybook/src/stories/textarea/textarea.css
  - tokens/tokens.json
---

# Textarea

## Metadata

- Category: form input

## Overview

Use `Textarea` for multi-line text entry with optional character counter, clear button, send action, and percentage-used indicator.

## Anatomy

- Root
- Label (optional)
- Field box: textarea + clear button
- Bottom bar: counter + actions (send, used-percent)
- Hint / error row (optional)

## Tokens Used

- `--dls-color-component-input-*`
- `--dls-radius-component-input`
- `--dls-state-focus-ring-color`
- `--dls-color-intent-danger-*`

## Props / API

- `label`, `hint`, `error`
- `maxLength`, `showCount`
- `showUsedPercent`
- `clearable`, `onClear`
- `onSend` — shows send icon button
- `disabled`
- standard textarea HTML attributes

## States

- empty
- filled
- error
- disabled
- focus-within

## Code Example

```tsx
<Textarea label="Message" maxLength={500} showCount clearable placeholder="Type your message..." />
```

## Cross-References

- [input-field.md](input-field.md)
- [message-composer.md](message-composer.md)

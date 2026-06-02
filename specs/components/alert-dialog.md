---
name: AlertDialog
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/AlertDialog.tsx
  - apps/storybook/src/stories/alert-dialog.css
  - apps/storybook/src/stories/AlertDialog.stories.tsx
  - tokens/tokens.json
---

# AlertDialog

## Metadata

- Category: feedback / modal
- Variants: none
- Intents: `neutral | primary | info | success | warning | danger`
- Breakpoints: `desktop | mobile`
- Figma properties: `breakpoint`, `intent`, `icon`, `title`,
  `description`, `subtitle`, `actions`, `action-primary`,
  `action-secondary`, `slot`, `slot-content`

## Overview

Use `AlertDialog` for confirmations, destructive-action warnings, or
blocking decisions that require an explicit response before users can
continue. AlertDialog interrupts the current workflow and renders as a
native modal `<dialog>`.

Do not use it for inline messages; use `Alert` for non-blocking
feedback. Do not use it for complex forms or multi-step workflows; use
`Dialog` for richer modal content.

## Anatomy

- Root - native `<dialog class="dls-alert-dialog">`
- Backdrop - native dialog `::backdrop`
- Content row - icon and text block
- Icon slot - optional decorative leading icon
- Text block - title and optional description
- Actions row - optional primary and/or secondary action

## Tokens Used

- `--dls-color-component-dialog-overlay`
- `--dls-color-component-dialog-bg`
- `--dls-color-component-dialog-border`
- `--dls-color-intent-*-text`
- `--dls-color-text-primary`
- `--dls-radius-component-modal`
- `--dls-shadow-surface-lg`
- `--dls-font-family`
- `--dls-font-weight-semibold`
- `--dls-font-weight-normal`
- `--dls-spacing-1`
- `--dls-spacing-2`
- `--dls-spacing-3`
- `--dls-spacing-4`
- `--dls-spacing-6`
- `--dls-text-xl-font-size`
- `--dls-text-xl-line-height`
- `--dls-text-m-font-size`
- `--dls-text-m-line-height`

## Props / API

- `intent` - semantic intent, default `neutral`
- `breakpoint` - optional layout override, `desktop | mobile`
- `open` - whether the native dialog is shown with `showModal()`,
  default `false`
- `icon` - optional leading decorative icon
- `title` - optional dialog title and accessible name source
- `description` - optional supporting text and accessible description
  source
- `primaryAction` - optional primary action slot, usually a filled
  Button
- `secondaryAction` - optional secondary action slot, usually an
  outline Button
- `onClose` - called when native cancel, such as Escape, requests close
- `className` - additional CSS class on the root

`AlertDialogProps` extends dialog root attributes except native `open`
and native `onClose`, so consumers may pass root attributes such as
`aria-label`, `aria-labelledby`, `aria-describedby`, `id`, or `data-*`.

## States

- Open state - `open=true` calls `showModal()`
- Closed state - `open=false` closes the native dialog
- Intent - `neutral | primary | info | success | warning | danger`
- Breakpoint - `desktop | mobile`, or responsive auto-detect when
  omitted
- Slot presence - icon, description, primary action, and secondary
  action may be omitted

AlertDialog does not define hover, pressed, selected, disabled, or
focus states on the root. Action focus, hover, pressed, and disabled
states are owned by the Button components placed in the action slots.

## Figma Representation

The Figma component set at node `143:12251` represents a matrix of six
intents and two breakpoints:

- `breakpoint=desktop | mobile`
- `intent=neutral | primary | info | success | warning | danger`

Figma also exposes slot and content controls:

- `icon` -> provide or omit `icon`
- `title` -> provide `title`
- `description` -> provide `description`
- `subtitle` -> controls supporting text visibility in Figma; code
  uses `description` presence
- `actions` -> controls action row visibility in Figma; code renders
  the row when `primaryAction` or `secondaryAction` exists
- `action-primary` -> provide or omit `primaryAction`
- `action-secondary` -> provide or omit `secondaryAction`
- `slot` and `slot-content` -> Figma-only content slot; code does not
  expose an arbitrary content slot

Figma examples are static component panels. Code uses a native modal
`<dialog>` and a controlled `open` prop.

## Accessibility Contract

- Root is a native modal `<dialog>` opened with `showModal()`.
- Escape triggers native cancel, prevents the browser default close,
  and calls `onClose` so the controlled `open` state remains the source
  of truth.
- When `title` is present, the root receives `aria-labelledby`
  pointing to the title.
- When `description` is present, the root receives `aria-describedby`
  pointing to the description.
- Consumers may override the accessible name/description with
  `aria-label`, `aria-labelledby`, or `aria-describedby` when needed.
- The leading icon is decorative and hidden from assistive technology.
- Action slot content must be keyboard accessible and directly resolve
  the dialog decision.
- Native dialog behavior provides modal top-layer behavior and focus
  containment while open.

## Composition Rules

- Use one primary action for the recommended or destructive path.
- Use one secondary action for the safe cancel/dismiss path.
- Use action-oriented labels such as "Delete project" instead of
  generic labels such as "OK".
- Pair danger intent with destructive or irreversible decisions.
- Keep title and description concise and focused on one decision.
- Do not place forms, long content, menus, or nested dialogs inside
  AlertDialog.
- Use `Dialog` for rich modal content and `Alert` for non-blocking
  messages.

## Known Deviations

- Figma exposes `slot` and `slot-content` for arbitrary inserted
  content. Code does not expose a general content slot; it supports
  title, description, icon, primary action, and secondary action only.
- Figma renders static panels for documentation. Code uses native
  modal dialog behavior through `showModal()`.

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
- [button.md](button.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)

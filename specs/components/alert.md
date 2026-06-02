---
name: Alert
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/Alert.tsx
  - apps/storybook/src/stories/alert.css
  - apps/storybook/src/stories/Alert.stories.tsx
  - tokens/tokens.json
---

# Alert

## Metadata

- Category: feedback
- Variants: none
- Intents: `neutral | primary | info | success | warning | danger`
- Sizes: `m | s`
- Figma properties: `size`, `intent`, `icon`, `title`,
  `titleText`, `description`, `text`, `button`

## Overview

Use `Alert` for persistent inline contextual messages:
confirmations, warnings, errors, system status, and informational
banners that affect the user's current workflow. Alerts do not block
the page.

Do not use it for modal confirmations; use `AlertDialog` or `Dialog`
for blocking decisions. Do not use it for temporary notifications that
disappear automatically; use Toast when that exists in the product
surface.

## Anatomy

- Root - `<div class="dls-alert" role="alert">`
- Icon slot - optional decorative leading icon
- Body - title and/or description
- Action slot - optional trailing action, usually one `Button`

## Tokens Used

- `--dls-color-component-alert-*-bg`
- `--dls-color-component-alert-*-fg`
- `--dls-color-component-alert-*-border`
- `--dls-radius-component-alert`
- `--dls-font-family`
- `--dls-font-weight-semibold`
- `--dls-font-weight-normal`
- `--dls-spacing-1`
- `--dls-spacing-2`
- `--dls-spacing-3`
- `--dls-spacing-0-5`
- `--dls-text-m-font-size`
- `--dls-text-m-line-height`
- `--dls-text-s-font-size`
- `--dls-text-s-line-height`

## Props / API

- `intent` - semantic intent, default `neutral`
- `size` - density and typography size, default `m`
- `icon` - optional leading decorative icon
- `title` - optional title text
- `description` - optional supporting text
- `action` - optional trailing action slot
- `className` - additional CSS class on the root

`AlertProps` extends `React.HTMLAttributes<HTMLDivElement>`, so
consumers may pass root attributes such as `id`, `aria-live`, `data-*`,
or `aria-label` when product context requires them.

## States

- Intent - `neutral | primary | info | success | warning | danger`
- Size - `m | s`
- Slot presence - icon, title, description, and action may be omitted

Alert is not interactive and does not define hover, pressed, selected,
disabled, or focus states on the root. Focus and keyboard behavior are
owned by interactive children placed in `action`.

## Figma Representation

The Figma component set at node `201:5623` represents a matrix of six
intents and two sizes:

- `size=M` -> `size="m"`
- `size=S` -> `size="s"`
- `intent=neutral | primary | info | success | warning | danger`

Figma also exposes content/slot controls that map to React slots:

- `icon` -> provide or omit `icon`
- `title` and `titleText` -> provide or omit `title`
- `description` and `text` -> provide or omit `description`
- `button` -> provide or omit `action`

Figma examples are fixed-width 364px compositions. Code is fluid and
uses the parent container's width.

## Accessibility Contract

- Root uses `role="alert"` for important inline status messages.
- Alert content must include text that communicates the intent; do not
  rely on color alone.
- The leading icon is decorative and hidden from assistive technology.
- Action content must be keyboard accessible and directly related to
  the alert message.
- Alerts should stay visible long enough for users to read and act.
- Alert has no motion or focus management on its passive root.

## Composition Rules

- Keep title and description concise.
- Use at most one primary action in the action slot.
- Use intent-specific icons from `lucide-react`.
- Pair alert color with explicit text and iconography.
- Do not place unrelated controls, menus, forms, or multiple competing
  actions inside Alert.
- Use `AlertDialog` or `Dialog` for blocking confirmations.
- Use `ProgressBar` for progress and `Badge` for compact status labels.

## Known Deviations

- Figma examples are fixed at 364px. Code is fluid width and relies on
  its parent container for sizing.

## Code Example

```tsx
<Alert intent="success" size="m" title="Saved" description="Your changes have been saved." />

<Alert
  intent="warning"
  icon={<AlertTriangleIcon />}
  title="Review required"
  description="Some fields need attention before you can continue."
  action={<Button variant="filled" intent="warning" size="s">Review</Button>}
/>
```

## Cross-References

- [alert-dialog.md](alert-dialog.md)
- [button.md](button.md)
- [badge.md](badge.md)
- [../patterns/component-selection.md](../patterns/component-selection.md)

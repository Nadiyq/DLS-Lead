# Alert

Category: feedback
React: <Alert>
Spec: specs/components/alert.md
TSX: apps/storybook/src/stories/Alert.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-alert--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=201-5623

--------------------------------------------
## State implementation contract

Alert is a passive, persistent inline status message. It has no
interactive root states. Visual variation is controlled by intent,
size, and slot presence.

- Root: `role="alert"`
- Intent colors: bg/fg/border -> `--dls-color-component-alert-*`
- Radius: `--dls-radius-component-alert`
- Typography: title semibold, description normal
- Icon: decorative leading slot, hidden from assistive technology
- Action: optional trailing slot, usually one Button
- Motion: none
--------------------------------------------

## Purpose

Displays important inline messages that inform users about system
status, required actions, warnings, errors, or successful outcomes.
Use Alert when the message affects the user's current workflow but
should not block the page.

## Use when

- Communicating the result of an action.
- Showing important system status or contextual guidance.
- Warning about a risk while allowing work to continue.
- Explaining an error or failure that needs attention.
- Presenting one directly related action to resolve the message.

## Do NOT use for

- Temporary notifications that disappear automatically - use Toast when
  available.
- Blocking confirmations - use AlertDialog or Dialog.
- Long-form instructional content.
- Marketing or promotional messages.
- Compact status labels - use Badge.
- Passive progress - use ProgressBar.

## Figma -> Code mapping

### Figma component set: alert (201:5623)

| Figma property | React prop | Values / Notes |
|---|---|---|
| size | size | M -> `m`, S -> `s`. |
| intent | intent | neutral, primary, info, success, warning, danger. |
| icon | icon | true -> provide leading icon ReactNode; false -> omit `icon`. |
| title | title | true -> provide `title`; false -> omit `title`. |
| titleText | title | Text override maps to the code `title` string. |
| description | description | true -> provide `description`; false -> omit `description`. |
| text | description | Text override maps to the code `description` string. |
| button | action | true -> provide action ReactNode; false -> omit `action`. |
| - | className | Code-only root class extension. |

Notes:
- Figma uses uppercase size values; React uses lowercase.
- Figma separates slot visibility booleans from text override values.
  React uses the presence or absence of `icon`, `title`,
  `description`, and `action`.
- Figma examples are fixed-width 364px. Code is fluid width.
- Figma action examples use Button. Code accepts any ReactNode, but the
  recommended action is one Button related to the alert message.

## Anatomy

1. Root - `<div class="dls-alert" role="alert">`.
2. Icon slot - optional leading decorative icon.
3. Body - contains title and/or description.
4. Title - semibold text.
5. Description - normal text.
6. Action slot - optional trailing action.

## Props / API

- intent       AlertIntent, optional. Default `neutral`.
  Values: neutral, primary, info, success, warning, danger.
- size         AlertSize, optional. Default `m`.
  Values: m, s.
- icon         ReactNode, optional. Leading decorative icon.
- title        string, optional. Alert title.
- description  string, optional. Supporting alert copy.
- action       ReactNode, optional. Trailing action slot.
- className    string, optional. Additional root class.
- Ref forwarded to root `<div>`.
- Extends `React.HTMLAttributes<HTMLDivElement>` for root attributes.

## Tokens used

L4 component tokens:
- --dls-color-component-alert-neutral-bg
- --dls-color-component-alert-neutral-fg
- --dls-color-component-alert-neutral-border
- --dls-color-component-alert-primary-bg
- --dls-color-component-alert-primary-fg
- --dls-color-component-alert-primary-border
- --dls-color-component-alert-info-bg
- --dls-color-component-alert-info-fg
- --dls-color-component-alert-info-border
- --dls-color-component-alert-success-bg
- --dls-color-component-alert-success-fg
- --dls-color-component-alert-success-border
- --dls-color-component-alert-warning-bg
- --dls-color-component-alert-warning-fg
- --dls-color-component-alert-warning-border
- --dls-color-component-alert-danger-bg
- --dls-color-component-alert-danger-fg
- --dls-color-component-alert-danger-border
- --dls-radius-component-alert

Foundation tokens:
- --dls-font-family
- --dls-font-weight-semibold
- --dls-font-weight-normal
- --dls-spacing-0-5
- --dls-spacing-1
- --dls-spacing-2
- --dls-spacing-3
- --dls-text-m-font-size
- --dls-text-m-line-height
- --dls-text-s-font-size
- --dls-text-s-line-height

## States

### Figma representation

- size: M / S
- intent: neutral / primary / info / success / warning / danger
- icon: true / false
- title: true / false
- description: true / false
- button: true / false

### Code implementation

- `data-intent="neutral | primary | info | success | warning | danger"`
- `data-size="m | s"`
- `icon`, `title`, `description`, and `action` render only when
  provided.
- Alert root has no hover, pressed, disabled, selected, or focus state.
- Action focus and keyboard behavior are owned by the action child.

## Accessibility contract

- Root uses `role="alert"` for important inline status messages.
- Alert copy must communicate the status; do not rely on color alone.
- Leading icon is decorative and hidden with `aria-hidden="true"`.
- Action slot content must be keyboard accessible and directly related
  to the alert message.
- Alerts should remain visible until users have enough time to read and
  act.
- Consumers may pass `aria-live`, `aria-label`, or other root
  attributes when product context requires a different announcement
  pattern.

## Composition rules

- Keep title and description concise.
- Pair intent color with an icon and explicit text.
- Use one action at most.
- Action content should normally be a DLS Button.
- Do not place forms, menus, or multiple competing actions inside
  Alert.
- Use AlertDialog or Dialog when the user must decide before
  continuing.
- Use Badge for compact status metadata.

## Known deviations

- Figma examples are fixed at 364px. Code is fluid width and relies on
  its parent container for sizing. Severity: low.

## Code example

```tsx
<Alert
  intent="success"
  size="m"
  icon={<CheckCircleIcon />}
  title="Saved"
  description="Your changes have been saved."
/>
```

```tsx
<Alert
  intent="danger"
  icon={<XCircleIcon />}
  title="Could not save"
  description="Check the highlighted fields and try again."
  action={<Button variant="filled" intent="danger" size="s">Review</Button>}
/>
```

## Cross-references

- AlertDialog (blocking confirmation)
- Dialog (modal surfaces)
- Button (alert action)
- Badge (compact status metadata)
- ProgressBar (passive progress)
- specs/components/alert.md
- specs/foundations/accessibility.md
- specs/tokens/token-reference.md

# AlertDialog

Category: feedback / modal
React: <AlertDialog>
Spec: specs/components/alert-dialog.md
TSX: apps/storybook/src/stories/AlertDialog.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-alertdialog--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=143-12251

--------------------------------------------
## State implementation contract

AlertDialog is a blocking modal decision surface. It uses the native
HTML `<dialog>` element and synchronizes its modal state from the
controlled `open` prop.

- Root: native `<dialog class="dls-alert-dialog">`
- Open state: `open=true` calls `showModal()`
- Close request: native cancel, such as Escape, calls `onClose`
- Layout: `data-breakpoint="desktop | mobile"` or responsive CSS when
  no breakpoint is provided
- Intent: `data-intent`, used for decorative icon color and action
  Button intent in stories
- Surface: shared Dialog L4 tokens for overlay, panel bg, and border
- Radius: shared modal radius token
- Icon: decorative and hidden from assistive technology
- Motion: no transition or animation in AlertDialog CSS
--------------------------------------------

## Purpose

Requires the user to make an explicit decision before continuing.
Use AlertDialog for confirmations, destructive-action warnings, or
blocking decisions with significant consequences.

## Use when

- Confirming a destructive or irreversible action.
- Asking users to approve or reject an important operation.
- Requiring acknowledgement before task progress can continue.
- Explaining an error state that blocks the workflow.
- Presenting one focused decision with one primary resolution path.

## Do NOT use for

- Inline contextual messages - use Alert.
- Temporary notifications - use Toast when available.
- Complex forms, long content, or multi-step workflows - use Dialog.
- Low-priority confirmations that do not justify interruption.
- Educational, help, or marketing content.

## Figma -> Code mapping

### Figma component set: alert-dialog (143:12251)

| Figma property | React prop | Values / Notes |
|---|---|---|
| breakpoint | breakpoint | desktop, mobile. Code omits the attribute for responsive auto-detect when no prop is provided. |
| intent | intent | neutral, primary, info, success, warning, danger. |
| icon | icon | true -> provide leading icon ReactNode; false -> omit `icon`. |
| title | title | Text override maps to the code `title` string. |
| description | description | Text override maps to the code `description` string. |
| subtitle | description | Figma boolean controls supporting text/text block visibility. Code uses `description` presence. |
| actions | - | Figma boolean controls the action row. Code renders actions when `primaryAction` or `secondaryAction` exists. |
| action-primary | primaryAction | true -> provide primary action ReactNode; false -> omit `primaryAction`. |
| action-secondary | secondaryAction | true -> provide secondary action ReactNode; false -> omit `secondaryAction`. |
| slot | - | Figma-only arbitrary content slot toggle. Code does not expose a general content slot. |
| slot-content | - | Figma slot target for inserted content. Code does not expose a general content slot. |
| - | open | Code-only controlled native dialog state. |
| - | onClose | Code-only close request callback. |
| - | className | Code-only root class extension. |

Notes:
- Figma examples are static component panels; code uses native modal
  behavior with `showModal()`.
- Figma separates action-row visibility from individual action slots.
  React derives action-row visibility from `primaryAction` and
  `secondaryAction`.
- Figma uses `component/modal`, `surface/base`, `border/subtle`, and
  `shadow/l`; code maps these to DLS tokens
  `--dls-radius-component-modal`,
  `--dls-color-component-dialog-bg`,
  `--dls-color-component-dialog-border`, and
  `--dls-shadow-surface-lg`.

## Anatomy

1. Root - native `<dialog class="dls-alert-dialog">`.
2. Backdrop - native `::backdrop`, using dialog overlay token.
3. Content row - icon and text block.
4. Icon slot - optional decorative leading icon.
5. Text block - title and optional description.
6. Actions row - optional secondary and primary actions.

## Props / API

- intent       AlertDialogIntent, optional. Default `neutral`.
  Values: neutral, primary, info, success, warning, danger.
- breakpoint   AlertDialogBreakpoint, optional.
  Values: desktop, mobile. Omit for responsive CSS auto-detect.
- open         boolean, optional. Default `false`.
- icon         ReactNode, optional. Leading decorative icon.
- title        string, optional. Dialog title and accessible name
  source when present.
- description  string, optional. Supporting text and accessible
  description source when present.
- primaryAction    ReactNode, optional. Primary action slot.
- secondaryAction  ReactNode, optional. Secondary action slot.
- onClose      function, optional. Called when native cancel requests
  close.
- className    string, optional. Additional root class.
- Ref forwarded to root `<dialog>`.
- Extends dialog root attributes except native `open` and native
  `onClose`.

## Tokens used

Shared dialog/surface tokens:
- --dls-color-component-dialog-overlay
- --dls-color-component-dialog-bg
- --dls-color-component-dialog-border
- --dls-radius-component-modal
- --dls-shadow-surface-lg

Intent/icon tokens:
- --dls-color-intent-neutral-text
- --dls-color-intent-primary-text
- --dls-color-intent-info-text
- --dls-color-intent-success-text
- --dls-color-intent-warning-text
- --dls-color-intent-danger-text

Foundation tokens:
- --dls-color-text-primary
- --dls-font-family
- --dls-font-weight-semibold
- --dls-font-weight-normal
- --dls-spacing-1
- --dls-spacing-2
- --dls-spacing-3
- --dls-spacing-4
- --dls-spacing-6
- --dls-text-xl-font-size
- --dls-text-xl-line-height
- --dls-text-m-font-size
- --dls-text-m-line-height

## States

### Figma representation

- breakpoint: desktop / mobile
- intent: neutral / primary / info / success / warning / danger
- icon: true / false
- subtitle: true / false
- actions: true / false
- action-primary: true / false
- action-secondary: true / false
- slot: true / false

### Code implementation

- `open=true` calls `showModal()` on the native dialog.
- `open=false` closes the native dialog when it is currently open.
- `data-intent="neutral | primary | info | success | warning | danger"`
- `data-breakpoint="desktop | mobile"` only when explicitly provided.
- Omitted breakpoint uses responsive CSS at max-width 480px.
- Root has no hover, pressed, selected, disabled, or focus visual
  state.
- Action states are owned by Button children.

## Accessibility contract

- Root is a native modal `<dialog>` opened with `showModal()`.
- Escape triggers native cancel, prevents uncontrolled close, and calls
  `onClose`.
- Title receives a generated id and is connected with
  `aria-labelledby` when present.
- Description receives a generated id and is connected with
  `aria-describedby` when present.
- Consumers may pass `aria-label`, `aria-labelledby`, or
  `aria-describedby` when product context requires a different
  accessible name or description.
- Leading icon is decorative and hidden with `aria-hidden="true"`.
- Primary and secondary actions must be keyboard accessible Buttons or
  equivalent interactive controls.
- Do not rely on icon color alone to communicate severity.

## Composition rules

- Use one primary action and at most one secondary action.
- The primary action should represent the recommended or consequential
  path.
- The secondary action should safely cancel or dismiss.
- Use action labels that describe outcomes, such as "Delete project" or
  "Keep draft".
- Keep title and description concise.
- Do not place forms, menus, long content, or nested overlays inside
  AlertDialog.
- Use Dialog for complex modal workflows.

## Known deviations

- Figma exposes `slot` and `slot-content` for arbitrary inserted
  content. Code does not expose a general content slot; it supports
  title, description, icon, primary action, and secondary action only.
  Severity: medium.
- Figma examples are static panels for documentation. Code uses native
  modal dialog behavior through `showModal()`. Severity: low.

## Code example

```tsx
<AlertDialog
  intent="danger"
  open={showDeleteDialog}
  icon={<XCircleIcon />}
  title="Delete project?"
  description="This action cannot be undone."
  primaryAction={<Button variant="filled" intent="danger">Delete project</Button>}
  secondaryAction={<Button variant="outline" intent="neutral">Cancel</Button>}
  onClose={() => setShowDeleteDialog(false)}
/>
```

```tsx
<AlertDialog
  intent="warning"
  breakpoint="mobile"
  open={showLeaveDialog}
  icon={<AlertTriangleIcon />}
  title="Leave without saving?"
  description="Unsaved changes will be lost."
  primaryAction={<Button variant="filled" intent="warning">Leave</Button>}
  secondaryAction={<Button variant="outline" intent="neutral">Stay</Button>}
  onClose={() => setShowLeaveDialog(false)}
/>
```

## Cross-references

- Alert (non-blocking inline feedback)
- Dialog (rich modal content)
- Button (actions)
- specs/components/alert-dialog.md
- specs/foundations/accessibility.md
- specs/tokens/token-reference.md

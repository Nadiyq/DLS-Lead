# Dialog

Category: modal / overlay
React: <Dialog>
Spec: specs/components/dialog.md
TSX: apps/storybook/src/stories/dialog/Dialog.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-dialog--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6605-6884

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a
SIMULATION of the code behavior, not the implementation.

In code, pick the mechanism by surface type:
- Base fill present (filled, soft, any tinted bg)
  → OKLCH L-shift: oklch(from <base> calc(l + <delta>) c h)
- Transparent surface (outline, dotted, ghost, link, or
  ghost-surface components like Accordion, ListItem, MenuItem)
  → overlay tokens.

This component uses: NONE (panel surface — no interactive states
on the dialog itself; interactive states live on the close button
and action buttons inside).
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose
Modal container that presents focused content, forms, or
workflows above the current interface. Temporarily interrupts
the current task to collect input, display important information,
or guide users through a contained interaction before returning
to the underlying page.

## Use when
- User needs to complete a short form or configuration task.
- Reviewing and editing information without leaving the current page.
- Creating or updating an object.
- A focused workflow with multiple fields.
- Content that requires temporary focus.

## Do NOT use for
- Simple confirmations or destructive action approvals → use
  AlertDialog.
- Non-blocking information → use Alert or Toast.
- Complex workflows that require extensive navigation → use a
  dedicated screen.
- Large content pages better suited for dedicated screens.

## Figma → Code mapping

| Figma property      | React prop       | Values                          |
|---------------------|------------------|---------------------------------|
| breakpoint          | breakpoint       | `mobile` / `desktop`            |
| title               | title            | string                          |
| description         | description      | string \| undefined             |
| slot                | (children present) | boolean (Figma-only toggle)   |
| secondaryButton     | (actions slot)   | Figma-only — passed via actions |
| children            | children         | ReactNode (slot content)        |
| —                   | actions          | ReactNode (action buttons slot) |
| —                   | open             | boolean                         |
| —                   | onClose          | () => void                      |
| —                   | className        | string                          |

Notes:
- `slot` in Figma is a visibility toggle for the content slot;
  in code, the slot is present whenever `children` is provided.
- `secondaryButton` in Figma toggles a Cancel button in the
  actions area; in code, the consumer composes the `actions` slot
  with one or two `<Button>` children.
- `open` / `onClose` are runtime concerns and have no Figma
  counterpart — Figma shows the dialog already open.

## Anatomy

- Root (native `<dialog>`) — `.dls-dialog`
  - `::backdrop` — scrim overlay
- Top bar — `.dls-dialog__top`
  - Title block — `.dls-dialog__title-block`
    - Title — `.dls-dialog__title`
    - Description — `.dls-dialog__description` (optional)
  - Close button (Ghost Button, lucide `X` icon)
- Content slot — `.dls-dialog__content` (optional, present when
  `children` is provided)
  - Helpers: `.dls-dialog__subtitle`, `.dls-dialog__body`
- Actions slot — `.dls-dialog__actions` (Button row)

## Props / API

```ts
export type DialogBreakpoint = 'desktop' | 'mobile';

export interface DialogProps {
  open?: boolean;
  breakpoint?: DialogBreakpoint; // default 'desktop'
  title: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}
```

## Tokens used

- `--dls-color-component-dialog-overlay` (`::backdrop`)
- `--dls-color-component-dialog-bg`
- `--dls-color-component-dialog-border`
- `--dls-color-text-primary`
- `--dls-radius-component-modal`
- `--dls-shadow-surface-lg`
- `--dls-spacing-1`, `--dls-spacing-2`, `--dls-spacing-3`,
  `--dls-spacing-4`, `--dls-spacing-6`
- `--dls-text-xl-font-size`, `--dls-text-xl-line-height`
- `--dls-text-l-font-size`, `--dls-text-l-line-height`
- `--dls-text-m-font-size`, `--dls-text-m-line-height`
- `--dls-font-weight-semibold`, `--dls-font-weight-medium`,
  `--dls-font-weight-normal`
- `--dls-font-family`

## States

| State    | Figma representation     | Code implementation        |
|----------|---------------------------|----------------------------|
| open     | Variant `open` / `mobile` / `desktop` | Native `<dialog>.showModal()` |
| closed   | Not displayed             | Native `<dialog>.close()`  |

The dialog panel itself has no hover/pressed/focus states.
Interactive states live on the close button (Ghost Button) and
on the action buttons inside the actions slot.

## Accessibility contract

- Root is native `<dialog>` opened with `showModal()` — the browser
  handles focus trap, inert background, `aria-modal`, and Escape.
- `aria-labelledby` points at the title id.
- `aria-describedby` points at the description id when a
  description is provided.
- Close button is `iconOnly` Ghost Button with `aria-label="Close"`
  and `aria-hidden="true"` on the icon.
- Escape closes via the native `cancel` event (call `onClose`).
- Backdrop click closes (calls `onClose`).
- Motion: panel is a static centered modal with no spatial
  animation, so no `prefers-reduced-motion` guard is required.
  Color transitions on the close button live in the Button
  component.

## Composition rules

- One Dialog per workflow. Do not nest Dialogs.
- Actions slot expects one or two `<Button>` components.
- Primary action uses `variant="filled"` `intent="neutral"`
  (or other intent if domain calls for it).
- Secondary action uses `variant="outline"` `intent="neutral"`.
- Mobile breakpoint stacks actions vertically; primary action
  on top, secondary below.
- Content slot accepts any DLS components — typically FormField +
  InputField for forms, or plain text using `.dls-dialog__subtitle`
  and `.dls-dialog__body` helpers.

## Known deviations

(None — close icon migrated to lucide-react `X`,
`aria-labelledby`/`aria-describedby` wired up.)

## Code example

```tsx
import { Dialog } from './dialog/Dialog';
import { Button } from './Button';
import { FormField } from './form-field/FormField';
import { InputField } from './input-field/InputField';

<Dialog
  open={isOpen}
  breakpoint="desktop"
  title="Edit profile"
  description="Update your account details."
  onClose={() => setIsOpen(false)}
  actions={
    <>
      <Button variant="outline" intent="neutral" size="m" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="filled" intent="neutral" size="m" onClick={save}>Save</Button>
    </>
  }
>
  <FormField label="Name">
    <InputField placeholder="Type..." />
  </FormField>
</Dialog>
```

## Cross-references

- [alert-dialog.md](alert-dialog.md)
- [form-field.md](../components/form-field.md)
- [input-field.md](../components/input-field.md)
- [button.md](../components/button.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)
- [../foundations/motion.md](../foundations/motion.md)

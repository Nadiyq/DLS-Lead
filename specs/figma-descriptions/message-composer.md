# MessageComposer

Category: form / composition
React: <MessageComposer>
Spec: specs/components/message-composer.md
TSX: apps/storybook/src/stories/message-composer/MessageComposer.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-messagecomposer--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=95-10945

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

This component uses: NONE on the MessageComposer root (static
surface). Interactive states live on the Tabs / Buttons / Chips /
Toolbar / Alert composed inside.
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose
A bordered, slotted composer surface for SMS or email messaging
in inbox / conversation views. Hosts a channel switcher, status
chip, alert banner, optional email-only fields (subject, to),
a rich-text input area with either a sticky or selection-floating
formatting toolbar, and an actions row with quick action icons
and a send button (with optional schedule-to-send via ButtonGroup).

## Use when
- Inbox or conversation composer for staff replies (internal /
  external notes).
- SMS reply field with sticky or floating formatting toolbar.
- Email reply / new-message field with subject and recipient
  chips.
- Surface that combines channel context (tabs), delivery status,
  and a focused message-entry workflow in one container.

## Do NOT use for
- A standalone Textarea → use `Textarea`.
- A pure plain-text input → use `InputField` / `Textarea`.
- A persistent action bar without text entry → use `Toolbar`
  on its own or in a `Card` footer.
- Modal forms → use `Dialog`.

## Figma → Code mapping

| Figma property   | React prop          | Values / Notes                                  |
|------------------|---------------------|--------------------------------------------------|
| channel          | channel             | "sms" / "email"                                  |
| alert            | alert               | Figma-only toggle → in code, pass an `<Alert>`   |
| status           | channelStatus       | Figma-only toggle → in code, pass status node    |
| statusTabs       | tabs                | Figma-only toggle → in code, pass `<Tabs>` node  |
| tabGroup         | (covered by tabs)   | Figma-only sub-toggle for the tab group         |
| toolbar          | floatingToolbar     | Figma-only toggle for the *floating* toolbar    |
| toolbarSticky    | toolbar             | Figma-only toggle for the *sticky* toolbar      |
| —                | subject             | Email-only string value                          |
| —                | onSubjectChange     | Email-only string handler                        |
| —                | subjectPlaceholder  | Email-only placeholder                           |
| —                | recipients          | Email-only recipient chips slot (typically a `ChipInput`) |
| —                | recipientsInputId   | DOM id wiring the "to:" label to the slot input  |
| —                | placeholder         | string                                           |
| —                | value, onChange     | Text value + handler                             |
| —                | actionsLeft         | Left action buttons (Emoji, Attach, etc.)        |
| —                | actionsRight        | Right action slot (typically Send ButtonGroup)   |
| —                | className           | string                                           |

Notes:
- Figma uses boolean visibility toggles for each composable slot;
  the React API exposes the slots as ReactNode props so consumers
  can pass real `Tabs`, `ChipRegular`, `Alert`, `Toolbar`, `Button`,
  and `ButtonGroup` components.
- `floatingToolbar` is gated by an internal text-selection check —
  it only renders when the user has selected text in the textarea.

## Anatomy

- Root — `.dls-message-composer` with `data-channel="sms|email"`
- Top bar — `.dls-message-composer__top`
  - Tabs slot (channel switcher: External / Internal)
  - `.dls-message-composer__channel-status` — status label + chip
- Alert region — `.dls-message-composer__alert`
- Email-only field rows (`.dls-message-composer__field-row`):
  - `Subject:` input
  - `to:` recipient chips
- Toolbar region — `.dls-message-composer__toolbar` (sticky)
- Text input — `.dls-message-composer__input`
  - `<textarea>` `.dls-message-composer__textarea`
  - `.dls-message-composer__floating-toolbar` (conditional)
- Actions footer — `.dls-message-composer__actions`
  - `.dls-message-composer__actions-left` (Emoji, Attach, etc.)
  - `.dls-message-composer__actions-right` (Send group)

## Props / API

```ts
export type MessageComposerChannel = 'sms' | 'email';

export interface MessageComposerProps {
  channel?: MessageComposerChannel;       // default 'sms'
  tabs?: React.ReactNode;
  channelStatus?: React.ReactNode;
  alert?: React.ReactNode;
  subject?: string;                       // email only
  onSubjectChange?: (value: string) => void;
  recipients?: React.ReactNode;           // email only
  toolbar?: React.ReactNode;              // sticky toolbar slot
  floatingToolbar?: React.ReactNode;      // selection-aware floating slot
  placeholder?: string;                   // default 'Enter...'
  value?: string;
  onChange?: (value: string) => void;
  actionsLeft?: React.ReactNode;
  actionsRight?: React.ReactNode;
  className?: string;
}
```

## Tokens used

- `--dls-color-surface-base`
- `--dls-color-border-base`
- `--dls-color-border-subtle`
- `--dls-color-text-primary`
- `--dls-color-text-placeholder`
- `--dls-radius-component-input`
- `--dls-spacing-1`, `--dls-spacing-2`
- `--dls-text-m-font-size`, `--dls-text-m-line-height`
- `--dls-font-weight-normal`
- `--dls-font-family`

## States

| State                     | Figma representation     | Code implementation                                     |
|---------------------------|--------------------------|----------------------------------------------------------|
| channel=sms               | Variant `channel=sms`    | `data-channel="sms"` — hides subject/to                  |
| channel=email             | Variant `channel=email`  | `data-channel="email"` — renders subject + recipients   |
| alert visible             | Variant `alert=true`     | When `alert` prop is provided                            |
| tabs visible              | Variant `statusTabs=true`| When `tabs` prop is provided                             |
| status chip visible       | Variant `status=true`    | When `channelStatus` prop is provided                    |
| sticky toolbar visible    | Variant `toolbarSticky=true` | When `toolbar` prop is provided                       |
| floating toolbar visible  | Variant `toolbar=true`   | When `floatingToolbar` prop is provided AND text is selected |

The MessageComposer panel itself has no hover/pressed/focus
states — those live on the Tabs, Chips, Toolbar Buttons, action
Buttons, and Send ButtonGroup composed inside. No spatial motion
on the panel, so no `prefers-reduced-motion` guard is required
at this layer.

## Accessibility contract

- The native `<textarea>` is the focusable input — keyboard users
  can type, select, and copy normally.
- The floating toolbar appears only on text selection, mirroring
  the Figma behavior; it does not steal focus from the textarea.
- Channel switcher is a real `Tabs` component (semantic roles via
  the Tabs DLS component).
- Alert child uses `Alert` with `role="alert"` (intent="warning"
  for SMS multi-record warning).
- Subject row uses a real `<label htmlFor>` paired with the
  underlying `<input type="text">` (id generated via `React.useId`).
- Recipient row uses `ChipInput` (role="combobox", autocomplete
  with avatars, removable chips with cross). When the consumer
  passes `recipientsInputId`, the "to:" label becomes a real
  `<label htmlFor>` pointing at the ChipInput's input id.
- Send button uses `ButtonGroup` so the primary "Send" and the
  schedule-send variant share a unified affordance.
- Quick-action buttons (Emoji, Attach) use icon-only `Button`s
  with `aria-label`.

## Composition rules

- Channel switcher slot expects `Tabs` (type="pill" recommended).
- Status slot expects label text + a `ChipRegular` (variant="dot",
  intent matched to channel state).
- Alert slot expects an `Alert` component (intent="warning"
  typical for delivery-context warnings).
- Toolbar slots expect a `Toolbar` (use `sticky` for the
  embedded/header toolbar).
- Actions slots expect `Button` (ghost icon-only) on the left
  and `ButtonGroup` (filled) on the right with one or two `Button`s
  (the second commonly a chevron/send-schedule trigger).
- Do not nest a MessageComposer inside a MessageComposer.

### Pin / Unpin pattern for the formatting toolbar

The MessageComposer hosts two toolbar slots — `toolbar` (sticky,
pinned above the input) and `floatingToolbar` (visible only when
text is selected). The Figma `Toolbar` exposes an `options` boolean
that, when `true`, attaches a Pin/Unpin DropdownOptions menu to the
trailing Ellipsis. The MessageComposer consumer manages a single
`mode: "pinned" | "floating"` state and routes the same `<Toolbar>`
element into the matching slot:

```tsx
const [mode, setMode] = useState<'pinned' | 'floating'>('pinned');

const formattingToolbar = (
  <Toolbar sticky={mode === 'pinned'}>
    {/* … B I U + alignment + lists + link … */}
    <Separator orientation="vertical" />
    <DropdownOptions triggerIcon={<EllipsisIcon />} triggerLabel="Toolbar options">
      <List>
        <ListItem
          type="text"
          text="Unpin"
          iconStart={<PinOffIcon />}
          selected={mode === 'floating'}
          onClick={() => setMode('floating')}
        />
        <ListItem
          type="text"
          text="Pin"
          iconStart={<PinIcon />}
          selected={mode === 'pinned'}
          onClick={() => setMode('pinned')}
        />
      </List>
    </DropdownOptions>
  </Toolbar>
);

<MessageComposer
  toolbar={mode === 'pinned' ? formattingToolbar : undefined}
  floatingToolbar={mode === 'floating' ? formattingToolbar : undefined}
  /* …other slots… */
/>
```

The currently-active row is painted with `--dls-color-intent-info-subtle`
via the ListItem `selected` prop — matches the Figma highlight.

## Known deviations

- Tokens scoped to MessageComposer
  (`--dls-color-component-message-composer-*`,
  `--dls-radius-component-message-composer`) referenced by the
  spec do not yet exist in `tokens.json`. The CSS currently reuses
  the input-level radius and L2 surface/border tokens. Backfilling
  a dedicated component-token group is deferred until the system
  consolidates composer-specific tokens.

(Inline SVG icons in stories were migrated to `lucide-react`, the
"Subject:" row is now a real `<label htmlFor>` paired with the
subject input, and the "to:" row labels its slot via
`recipientsInputId` for full programmatic association in this
rollout.)

## Code example

```tsx
import { MessageComposer } from './message-composer/MessageComposer';
import { Toolbar, ToolbarGroup } from './toolbar/Toolbar';
import { Button } from './Button';
import { ButtonGroup } from './button-group/ButtonGroup';
import { Separator } from './separator/Separator';
import { Tabs } from './tabs/Tabs';
import { ChipRegular } from './chip/ChipRegular';
import { Alert } from './Alert';
import {
  Bold as BoldIcon, Italic as ItalicIcon, Underline as UnderlineIcon,
  AlignLeft as AlignLeftIcon, AlignCenter as AlignCenterIcon, AlignRight as AlignRightIcon,
  List as ListBulletIcon, ListOrdered as ListNumberedIcon, ListChecks as ListCheckIcon,
  Link2 as LinkIcon, Ellipsis as MoreIcon,
  SmilePlus as EmojiIcon, Paperclip as AttachIcon, Send as SendIcon,
  MessageSquareWarning as WarningIcon,
} from 'lucide-react';

<MessageComposer
  channel="email"
  tabs={<Tabs type="pill" items={tabs} value="internal" onChange={setTab} />}
  channelStatus={<>Channel status: <ChipRegular variant="dot" intent="success" label="Open" size="s" chevron /></>}
  alert={<Alert intent="warning" icon={<WarningIcon />} description="…" />}
  subject={subject}
  onSubjectChange={setSubject}
  recipients={<>
    <ChipRegular variant="outline" label="Anthony Bricks" avatar={{ initials: 'AB' }} chevron size="s" />
    <ChipRegular variant="outline" label="John Smith"     avatar={{ initials: 'JS' }} chevron size="s" />
  </>}
  toolbar={
    <Toolbar sticky>
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<BoldIcon />} aria-label="Bold" />
      {/* … rest of formatting buttons … */}
    </Toolbar>
  }
  value={text}
  onChange={setText}
  actionsLeft={<>
    <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<EmojiIcon />} aria-label="Emoji" />
    <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<AttachIcon />} aria-label="Attach" />
  </>}
  actionsRight={
    <ButtonGroup variant="filled">
      <Button variant="filled" intent="neutral" size="m">Send</Button>
      <Button variant="filled" intent="neutral" size="m" iconOnly icon={<SendIcon />} aria-label="Send now" />
    </ButtonGroup>
  }
/>
```

## Cross-references

- [toolbar.md](toolbar.md)
- [textarea.md](../components/textarea.md)
- [tabs.md](../components/tabs.md)
- [chip-regular.md](../components/chip-regular.md)
- [alert.md](../components/alert.md)
- [button.md](../components/button.md)
- [button-group.md](../components/button-group.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)
- [../foundations/motion.md](../foundations/motion.md)

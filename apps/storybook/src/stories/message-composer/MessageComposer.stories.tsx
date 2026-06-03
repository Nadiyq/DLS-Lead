import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  AlignLeft as AlignLeftIcon,
  AlignCenter as AlignCenterIcon,
  AlignRight as AlignRightIcon,
  List as ListBulletIcon,
  ListOrdered as ListNumberedIcon,
  ListChecks as ListCheckIcon,
  Link2 as LinkIcon,
  Ellipsis as MoreIcon,
  Pin as PinIcon,
  PinOff as PinOffIcon,
  SmilePlus as EmojiIcon,
  Paperclip as AttachIcon,
  Send as SendIcon,
  MessageSquareWarning as WarningIcon,
} from 'lucide-react';
import { MessageComposer } from './MessageComposer';
import { Toolbar, ToolbarGroup } from '../toolbar/Toolbar';
import { Button } from '../Button';
import { ButtonGroup } from '../button-group/ButtonGroup';
import { Separator } from '../separator/Separator';
import { Tabs } from '../tabs/Tabs';
import { ChipRegular } from '../chip/ChipRegular';
import { ChipInput, type ChipInputOption } from '../chip-input/ChipInput';
import { Alert } from '../Alert';
import { DropdownOptions } from '../dropdown-options/DropdownOptions';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';

const meta = {
  title: 'Components/MessageComposer',
  component: MessageComposer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof MessageComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Shared formatting toolbar (matches Figma: B I U | align×3 | list×3 | link | more)
//
// Toggle buttons (B/I/U + alignment) keep their own active state so clicks
// produce visible feedback. The trailing overflow (Ellipsis) opens a
// Pin/Unpin DropdownOptions menu — Pin makes the toolbar render in the
// sticky/pinned slot of MessageComposer; Unpin makes it render in the
// selection-only floating slot.
// ---------------------------------------------------------------------------

type Toggleable = 'bold' | 'italic' | 'underline';
type Align = 'left' | 'center' | 'right';
type ToolbarMode = 'pinned' | 'floating';

interface FormattingToolbarProps {
  /** Selects which slot of MessageComposer the toolbar renders into. */
  mode: ToolbarMode;
  /** Pin / Unpin callback fired from the overflow menu. */
  onModeChange: (mode: ToolbarMode) => void;
  /** Whether to attach the Pin/Unpin overflow menu to the trailing Ellipsis. */
  options?: boolean;
  /** Ref to the underlying <textarea> from MessageComposer — needed to
   *  read selectionStart / selectionEnd and mutate the textarea value. */
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
  /** Setter for the controlled textarea value. Wrapping/prefixing is
   *  applied by reading textareaRef.current and calling this with the
   *  new string. */
  onValueChange?: (next: string) => void;
}

/** Wrap the current selection in the textarea with the given prefix / suffix
 *  markers, restore the selection over the wrapped content, and return the
 *  new value. No-op when nothing is selected. */
const wrapSelection = (
  ta: HTMLTextAreaElement | null,
  prefix: string,
  suffix: string,
  setValue: (v: string) => void,
) => {
  if (!ta) return;
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  if (start === end) return; // nothing selected
  const value = ta.value;
  const next =
    value.slice(0, start) + prefix + value.slice(start, end) + suffix + value.slice(end);
  setValue(next);
  // Restore the selection over the *content* (after the prefix, before the suffix).
  requestAnimationFrame(() => {
    ta.focus();
    ta.setSelectionRange(start + prefix.length, end + prefix.length);
  });
};

/** Prefix every selected line with the given prefix. Used for list buttons. */
const prefixLines = (
  ta: HTMLTextAreaElement | null,
  linePrefix: string | ((index: number) => string),
  setValue: (v: string) => void,
) => {
  if (!ta) return;
  const value = ta.value;
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  // Expand selection to the start of the first line and end of the last line.
  const lineStart = value.lastIndexOf('\n', start - 1) + 1;
  const lineEnd = value.indexOf('\n', end);
  const sliceEnd = lineEnd === -1 ? value.length : lineEnd;
  const block = value.slice(lineStart, sliceEnd);
  const lines = block.split('\n');
  const prefixed = lines
    .map((ln, i) => (typeof linePrefix === 'string' ? linePrefix : linePrefix(i)) + ln)
    .join('\n');
  const next = value.slice(0, lineStart) + prefixed + value.slice(sliceEnd);
  setValue(next);
  const delta = prefixed.length - block.length;
  requestAnimationFrame(() => {
    ta.focus();
    ta.setSelectionRange(lineStart, sliceEnd + delta);
  });
};

const FormattingToolbar = ({
  mode,
  onModeChange,
  options = true,
  textareaRef,
  onValueChange,
}: FormattingToolbarProps) => {
  const sticky = mode === 'pinned';
  const [marks, setMarks] = React.useState<Record<Toggleable, boolean>>({
    bold: false, italic: false, underline: false,
  });
  const [align, setAlign] = React.useState<Align>('left');
  const toggle = (k: Toggleable) => setMarks(m => ({ ...m, [k]: !m[k] }));

  // Apply a wrap to the textarea selection. Also toggles the visual
  // "pressed" state so the button confirms the click registered.
  const applyWrap = (key: Toggleable, prefix: string, suffix = prefix) => {
    toggle(key);
    if (onValueChange) {
      wrapSelection(textareaRef?.current ?? null, prefix, suffix, onValueChange);
    }
  };

  const markBtn = (
    key: Toggleable,
    label: string,
    Icon: React.ComponentType,
    prefix: string,
    suffix = prefix,
  ) => (
    <Button
      variant="ghost"
      intent="neutral"
      size="m"
      iconOnly
      icon={<Icon />}
      aria-label={label}
      aria-pressed={marks[key]}
      data-active={marks[key] ? '' : undefined}
      onClick={() => applyWrap(key, prefix, suffix)}
    />
  );
  const alignBtn = (key: Align, label: string, Icon: React.ComponentType) => (
    <Button
      variant="ghost"
      intent="neutral"
      size="m"
      iconOnly
      icon={<Icon />}
      aria-label={label}
      aria-pressed={align === key}
      data-active={align === key ? '' : undefined}
      onClick={() => setAlign(key)}
    />
  );
  const listBtn = (
    label: string,
    Icon: React.ComponentType,
    linePrefix: string | ((i: number) => string),
  ) => (
    <Button
      variant="ghost"
      intent="neutral"
      size="m"
      iconOnly
      icon={<Icon />}
      aria-label={label}
      onClick={() => {
        if (onValueChange) prefixLines(textareaRef?.current ?? null, linePrefix, onValueChange);
      }}
    />
  );

  // Overflow menu (Pin / Unpin) — only shown when options is enabled.
  // Matches Figma "options" boolean on the Toolbar component (94:10637).
  const overflow = options ? (
    <DropdownOptions
      triggerIcon={<MoreIcon />}
      triggerLabel="Toolbar options"
      align="end"
      side="bottom"
    >
      <List>
        <ListItem
          type="with-slots"
          text="Unpin"
          iconStart={<PinOffIcon aria-hidden="true" />}
          selected={mode === 'floating'}
          aria-selected={mode === 'floating'}
          onClick={() => onModeChange('floating')}
        />
        <ListItem
          type="with-slots"
          text="Pin"
          iconStart={<PinIcon aria-hidden="true" />}
          selected={mode === 'pinned'}
          aria-selected={mode === 'pinned'}
          onClick={() => onModeChange('pinned')}
        />
      </List>
    </DropdownOptions>
  ) : (
    <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<MoreIcon />} aria-label="More" onClick={() => {}} />
  );

  return (
    <Toolbar sticky={sticky}>
      {markBtn('bold',      'Bold',      BoldIcon,      '**')}
      {markBtn('italic',    'Italic',    ItalicIcon,    '*')}
      {markBtn('underline', 'Underline', UnderlineIcon, '__')}
      <Separator orientation="vertical" />
      <ToolbarGroup>
        {alignBtn('left',   'Align left',   AlignLeftIcon)}
        {alignBtn('center', 'Align center', AlignCenterIcon)}
        {alignBtn('right',  'Align right',  AlignRightIcon)}
      </ToolbarGroup>
      <Separator orientation="vertical" />
      <ToolbarGroup>
        {listBtn('Bulleted list', ListBulletIcon, '- ')}
        {listBtn('Numbered list', ListNumberedIcon, (i: number) => `${i + 1}. `)}
        {listBtn('Checklist',     ListCheckIcon,    '- [ ] ')}
      </ToolbarGroup>
      <Separator orientation="vertical" />
      <Button
        variant="ghost"
        intent="neutral"
        size="m"
        iconOnly
        icon={<LinkIcon />}
        aria-label="Link"
        onClick={() => {
          if (!onValueChange || !textareaRef?.current) return;
          const url = window.prompt('Enter URL', 'https://');
          if (!url) return;
          wrapSelection(textareaRef.current, '[', `](${url})`, onValueChange);
        }}
      />
      <Separator orientation="vertical" />
      {overflow}
    </Toolbar>
  );
};

// ---------------------------------------------------------------------------
// Shared slots
// ---------------------------------------------------------------------------

const channelTabs = [
  { value: 'external', label: 'External' },
  { value: 'internal', label: 'Internal' },
];

const statusSlot = (
  <>
    Channel status:{' '}
    <ChipRegular variant="dot" intent="success" label="Open" size="s" chevron />
  </>
);

const alertSlot = (
  <Alert
    intent="warning"
    icon={<WarningIcon />}
    description="This message will be delivered to a number associated with multiple patient records."
  />
);

const actionsLeftSlot = (
  <>
    <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<EmojiIcon />} aria-label="Emoji" />
    <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<AttachIcon />} aria-label="Attach" />
  </>
);

const actionsRightSlot = (
  <ButtonGroup variant="filled">
    <Button variant="filled" intent="neutral" size="m">Send</Button>
    <Button variant="filled" intent="neutral" size="m" iconOnly icon={<SendIcon />} aria-label="Send" />
  </ButtonGroup>
);

// Stub avatars (deterministic, no network) for the recipients picker.
const recipientOptions: ChipInputOption[] = [
  { value: 'anthony.bricks',  label: 'Anthony Bricks',  avatarInitials: 'AB' },
  { value: 'john.smith',      label: 'John Smith',      avatarInitials: 'JS' },
  { value: 'maria.gomez',     label: 'Maria Gomez',     avatarInitials: 'MG' },
  { value: 'liam.chen',       label: 'Liam Chen',       avatarInitials: 'LC' },
  { value: 'priya.iyer',      label: 'Priya Iyer',      avatarInitials: 'PI' },
  { value: 'oliver.park',     label: 'Oliver Park',     avatarInitials: 'OP' },
];

// Stateful recipients chip-input. Each chip uses the cross (remove) action.
const RecipientsField = ({
  initial = ['anthony.bricks', 'john.smith'],
  id,
}: {
  initial?: string[];
  id?: string;
}) => {
  const [values, setValues] = React.useState<string[]>(initial);
  return (
    <ChipInput
      id={id}
      options={recipientOptions}
      values={values}
      onValuesChange={setValues}
      placeholder="Add recipient..."
    />
  );
};

// ---------------------------------------------------------------------------
// 1. SMS with floating toolbar (text selection) — Figma variant 1
// ---------------------------------------------------------------------------

export const SmsWithFloatingToolbar: Story = {
  args: { channel: 'sms' },
  render: () => {
    const [tab, setTab] = React.useState('internal');
    const [text, setText] = React.useState('hello');
    const [mode, setMode] = React.useState<ToolbarMode>('floating');
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const ft = (
      <FormattingToolbar
        mode={mode}
        onModeChange={setMode}
        textareaRef={textareaRef}
        onValueChange={setText}
      />
    );
    return (
      <div style={{ width: 540 }}>
        <MessageComposer
          channel="sms"
          tabs={<Tabs type="pill" items={channelTabs} value={tab} onChange={setTab} />}
          channelStatus={statusSlot}
          alert={alertSlot}
          value={text}
          onChange={setText}
          textareaRef={textareaRef}
          toolbar={mode === 'pinned' ? ft : undefined}
          floatingToolbar={mode === 'floating' ? ft : undefined}
          actionsLeft={actionsLeftSlot}
          actionsRight={actionsRightSlot}
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// 2. SMS — status only, no tabs — Figma variant 2
// ---------------------------------------------------------------------------

export const SmsStatusOnly: Story = {
  args: { channel: 'sms' },
  render: () => {
    const [mode, setMode] = React.useState<ToolbarMode>('pinned');
    const [text, setText] = React.useState('');
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const ft = (
      <FormattingToolbar
        mode={mode}
        onModeChange={setMode}
        textareaRef={textareaRef}
        onValueChange={setText}
      />
    );
    return (
      <div style={{ width: 540 }}>
        <MessageComposer
          channel="sms"
          channelStatus={statusSlot}
          value={text}
          onChange={setText}
          textareaRef={textareaRef}
          toolbar={mode === 'pinned' ? ft : undefined}
          floatingToolbar={mode === 'floating' ? ft : undefined}
          actionsLeft={actionsLeftSlot}
          actionsRight={actionsRightSlot}
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// 3. SMS — tabs only, no status — Figma variant 3
// ---------------------------------------------------------------------------

export const SmsTabsOnly: Story = {
  args: { channel: 'sms' },
  render: () => {
    const [tab, setTab] = React.useState('internal');
    const [mode, setMode] = React.useState<ToolbarMode>('pinned');
    const [text, setText] = React.useState('');
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const ft = (
      <FormattingToolbar
        mode={mode}
        onModeChange={setMode}
        textareaRef={textareaRef}
        onValueChange={setText}
      />
    );
    return (
      <div style={{ width: 540 }}>
        <MessageComposer
          channel="sms"
          tabs={<Tabs type="pill" items={channelTabs} value={tab} onChange={setTab} />}
          value={text}
          onChange={setText}
          textareaRef={textareaRef}
          toolbar={mode === 'pinned' ? ft : undefined}
          floatingToolbar={mode === 'floating' ? ft : undefined}
          actionsLeft={actionsLeftSlot}
          actionsRight={actionsRightSlot}
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// 4. Email — basic, no tabs/status — Figma variant 4
// ---------------------------------------------------------------------------

export const EmailBasic: Story = {
  args: { channel: 'email' },
  render: () => {
    const [subject, setSubject] = React.useState('');
    const recipientsInputId = React.useId();
    const [mode, setMode] = React.useState<ToolbarMode>('pinned');
    const [text, setText] = React.useState('');
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const ft = (
      <FormattingToolbar
        mode={mode}
        onModeChange={setMode}
        textareaRef={textareaRef}
        onValueChange={setText}
      />
    );
    return (
      <div style={{ width: 540 }}>
        <MessageComposer
          channel="email"
          subject={subject}
          onSubjectChange={setSubject}
          recipientsInputId={recipientsInputId}
          recipients={<RecipientsField id={recipientsInputId} />}
          value={text}
          onChange={setText}
          textareaRef={textareaRef}
          toolbar={mode === 'pinned' ? ft : undefined}
          floatingToolbar={mode === 'floating' ? ft : undefined}
          actionsLeft={actionsLeftSlot}
          actionsRight={actionsRightSlot}
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// 5. Email — full (tabs + status + alert) — Figma variant 5
// ---------------------------------------------------------------------------

export const EmailFull: Story = {
  args: { channel: 'email' },
  render: () => {
    const [tab, setTab] = React.useState('internal');
    const [subject, setSubject] = React.useState('');
    const recipientsInputId = React.useId();
    const [mode, setMode] = React.useState<ToolbarMode>('pinned');
    const [text, setText] = React.useState('');
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const ft = (
      <FormattingToolbar
        mode={mode}
        onModeChange={setMode}
        textareaRef={textareaRef}
        onValueChange={setText}
      />
    );
    return (
      <div style={{ width: 540 }}>
        <MessageComposer
          channel="email"
          tabs={<Tabs type="pill" items={channelTabs} value={tab} onChange={setTab} />}
          channelStatus={statusSlot}
          alert={alertSlot}
          subject={subject}
          onSubjectChange={setSubject}
          recipientsInputId={recipientsInputId}
          recipients={<RecipientsField id={recipientsInputId} />}
          value={text}
          onChange={setText}
          textareaRef={textareaRef}
          toolbar={mode === 'pinned' ? ft : undefined}
          floatingToolbar={mode === 'floating' ? ft : undefined}
          actionsLeft={actionsLeftSlot}
          actionsRight={actionsRightSlot}
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// 6. Toolbar + text + actions only — Figma variant 6
// ---------------------------------------------------------------------------

export const ToolbarOnly: Story = {
  args: { channel: 'sms' },
  render: () => {
    const [mode, setMode] = React.useState<ToolbarMode>('pinned');
    const [text, setText] = React.useState('');
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const ft = (
      <FormattingToolbar
        mode={mode}
        onModeChange={setMode}
        textareaRef={textareaRef}
        onValueChange={setText}
      />
    );
    return (
      <div style={{ width: 540 }}>
        <MessageComposer
          channel="sms"
          value={text}
          onChange={setText}
          textareaRef={textareaRef}
          toolbar={mode === 'pinned' ? ft : undefined}
          floatingToolbar={mode === 'floating' ? ft : undefined}
          actionsLeft={actionsLeftSlot}
          actionsRight={actionsRightSlot}
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// 7. Minimal with actions — Figma variant 7
// ---------------------------------------------------------------------------

export const MinimalWithActions: Story = {
  args: { channel: 'sms' },
  render: () => (
    <div style={{ width: 540 }}>
      <MessageComposer
        channel="sms"
        actionsLeft={actionsLeftSlot}
        actionsRight={actionsRightSlot}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Playground (interactive)
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    channel: 'sms',
    placeholder: 'Enter...',
  },
  render: (args) => {
    const [channel, setChannel] = React.useState<'sms' | 'email'>(args.channel || 'sms');
    const [tab, setTab] = React.useState('internal');
    const [text, setText] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const recipientsInputId = React.useId();
    const [mode, setMode] = React.useState<ToolbarMode>('pinned');
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const ft = (
      <FormattingToolbar
        mode={mode}
        onModeChange={setMode}
        textareaRef={textareaRef}
        onValueChange={setText}
      />
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 540 }}>
          <MessageComposer
            channel={channel}
            tabs={
              <Tabs
                type="pill"
                items={channelTabs}
                value={tab}
                onChange={(v) => {
                  setTab(v);
                  setChannel(v === 'external' ? 'email' : 'sms');
                }}
              />
            }
            channelStatus={statusSlot}
            subject={channel === 'email' ? subject : undefined}
            onSubjectChange={setSubject}
            recipientsInputId={channel === 'email' ? recipientsInputId : undefined}
            recipients={channel === 'email' ? <RecipientsField id={recipientsInputId} /> : undefined}
            toolbar={mode === 'pinned' ? ft : undefined}
            floatingToolbar={mode === 'floating' ? ft : undefined}
            placeholder={args.placeholder}
            value={text}
            onChange={setText}
            textareaRef={textareaRef}
            actionsLeft={actionsLeftSlot}
            actionsRight={actionsRightSlot}
          />
        </div>
        <span>
          Channel: {channel} | Tab: {tab} | Toolbar mode: {mode} | Characters: {text.length}
        </span>
      </div>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Comment } from './Comment';
import { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarGroup } from '../toolbar/Toolbar';
import { Tabs } from '../tabs/Tabs';
import { ChipRegular } from '../chip/ChipRegular';
import { Chip } from '../chip/Chip';
import { Alert } from '../Alert';
import { Button } from '../Button';

const meta = {
  title: 'Components/Comment',
  component: Comment,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Comment>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const BoldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 5H13C14.1046 5 15 5.89543 15 7V9C15 10.1046 14.1046 11 13 11H7V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7 11H14C15.1046 11 16 11.8954 16 13V15C16 16.1046 15.1046 17 14 17H7V11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const ItalicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 5H16M8 19H14M13 5L11 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UnderlineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 5V11C7 13.7614 9.23858 16 12 16C14.7614 16 17 13.7614 17 11V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 19H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AlignLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20M4 10H14M4 14H20M4 18H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AlignCenterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20M7 10H17M4 14H20M7 18H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AlignRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20M10 10H20M4 14H20M10 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ListBulletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6H20M9 12H20M9 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="5" cy="6" r="1" fill="currentColor" />
    <circle cx="5" cy="12" r="1" fill="currentColor" />
    <circle cx="5" cy="18" r="1" fill="currentColor" />
  </svg>
);

const ListNumberedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6H20M10 12H20M10 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 5V9M5 5L4 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 15C4 13.8954 4.89543 13 6 13C7.10457 13 7 14.5 5 16H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ListCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6H20M10 12H20M10 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 6L5.5 7.5L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 12L5.5 13.5L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 18L5.5 19.5L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 14L14 10M8.5 11.5L6.5 13.5C5.11929 14.8807 5.11929 17.1193 6.5 18.5C7.88071 19.8807 10.1193 19.8807 11.5 18.5L13.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15.5 12.5L17.5 10.5C18.8807 9.11929 18.8807 6.88071 17.5 5.5C16.1193 4.11929 13.8807 4.11929 12.5 5.5L10.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="18" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const EmojiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="9" cy="10" r="1" fill="currentColor" />
    <circle cx="15" cy="10" r="1" fill="currentColor" />
    <path d="M8.5 14.5C9.33 15.83 10.67 16.5 12 16.5C13.33 16.5 14.67 15.83 15.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AttachIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 7L7.5 14C6.67 14.83 6.67 16.17 7.5 17C8.33 17.83 9.67 17.83 10.5 17L17.5 10C19.16 8.34 19.16 5.66 17.5 4C15.84 2.34 13.16 2.34 11.5 4L4.5 11C2 13.5 2 17.5 4.5 20C7 22.5 11 22.5 13.5 20L20 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12L3 4L21 12L3 20L5 12ZM5 12H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
  </svg>
);

// ---------------------------------------------------------------------------
// Shared formatting toolbar (matches Figma: B I U | align×3 | list×3 | link | more)
// ---------------------------------------------------------------------------

const FormattingToolbar = ({ sticky }: { sticky?: boolean }) => (
  <Toolbar sticky={sticky}>
    <ToolbarButton aria-label="Bold"><BoldIcon /></ToolbarButton>
    <ToolbarButton aria-label="Italic"><ItalicIcon /></ToolbarButton>
    <ToolbarButton aria-label="Underline"><UnderlineIcon /></ToolbarButton>
    <ToolbarSeparator />
    <ToolbarGroup>
      <ToolbarButton aria-label="Align left"><AlignLeftIcon /></ToolbarButton>
      <ToolbarButton aria-label="Align center"><AlignCenterIcon /></ToolbarButton>
      <ToolbarButton aria-label="Align right"><AlignRightIcon /></ToolbarButton>
    </ToolbarGroup>
    <ToolbarSeparator />
    <ToolbarGroup>
      <ToolbarButton aria-label="Bulleted list"><ListBulletIcon /></ToolbarButton>
      <ToolbarButton aria-label="Numbered list"><ListNumberedIcon /></ToolbarButton>
      <ToolbarButton aria-label="Checklist"><ListCheckIcon /></ToolbarButton>
    </ToolbarGroup>
    <ToolbarSeparator />
    <ToolbarButton aria-label="Link"><LinkIcon /></ToolbarButton>
    <ToolbarSeparator />
    <ToolbarButton aria-label="More"><MoreIcon /></ToolbarButton>
  </Toolbar>
);

// ---------------------------------------------------------------------------
// Shared tab items
// ---------------------------------------------------------------------------

const channelTabs = [
  { value: 'external', label: 'External' },
  { value: 'internal', label: 'Internal' },
];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    channel: 'sms',
    placeholder: 'Enter...',
  },
  render: (args) => (
    <div style={{ width: 540 }}>
      <Comment
        channel={args.channel}
        tabs={<Tabs type="pill" items={channelTabs} value="internal" onChange={() => {}} />}
        channelStatus={
          <>
            Channel status:{' '}
            <ChipRegular variant="dot" intent="success" label="Open" size="s" chevron />
          </>
        }
        toolbar={<FormattingToolbar sticky />}
        placeholder={args.placeholder}
        actionsLeft={
          <>
            <ToolbarButton aria-label="Emoji"><EmojiIcon /></ToolbarButton>
            <ToolbarButton aria-label="Attach"><AttachIcon /></ToolbarButton>
          </>
        }
        actionsRight={
          <>
            <Button variant="filled" intent="neutral" size="s">Send</Button>
            <Button variant="filled" intent="neutral" size="s" icon={<SendIcon />} iconOnly aria-label="Send" />
          </>
        }
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// SMS channel
// ---------------------------------------------------------------------------

export const SmsChannel: Story = {
  args: { channel: 'sms' },
  render: () => (
    <div style={{ width: 540 }}>
      <Comment
        channel="sms"
        tabs={<Tabs type="pill" items={channelTabs} value="internal" onChange={() => {}} />}
        channelStatus={
          <>
            Channel status:{' '}
            <ChipRegular variant="dot" intent="success" label="Open" size="s" chevron />
          </>
        }
        alert={
          <Alert
            intent="warning"
            icon={<WarningIcon />}
            description="This message will be delivered to a number associated with multiple patient records."
          />
        }
        toolbar={<FormattingToolbar sticky />}
        actionsLeft={
          <>
            <ToolbarButton aria-label="Emoji"><EmojiIcon /></ToolbarButton>
            <ToolbarButton aria-label="Attach"><AttachIcon /></ToolbarButton>
          </>
        }
        actionsRight={
          <>
            <Button variant="filled" intent="neutral" size="s">Send</Button>
            <Button variant="filled" intent="neutral" size="s" icon={<SendIcon />} iconOnly aria-label="Send" />
          </>
        }
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Email channel
// ---------------------------------------------------------------------------

export const EmailChannel: Story = {
  args: { channel: 'email' },
  render: () => (
    <div style={{ width: 540 }}>
      <Comment
        channel="email"
        tabs={<Tabs type="pill" items={channelTabs} value="internal" onChange={() => {}} />}
        channelStatus={
          <>
            Channel status:{' '}
            <ChipRegular variant="dot" intent="success" label="Open" size="s" chevron />
          </>
        }
        alert={
          <Alert
            intent="warning"
            icon={<WarningIcon />}
            description="This message will be delivered to a number associated with multiple patient records."
          />
        }
        subject=""
        recipients={
          <>
            <Chip label="Anthony Bricks" avatar={{ initials: 'AB' }} chevron size="s" />
            <Chip label="John Smith" avatar={{ initials: 'JS' }} chevron size="s" />
          </>
        }
        toolbar={<FormattingToolbar sticky />}
        actionsLeft={
          <>
            <ToolbarButton aria-label="Emoji"><EmojiIcon /></ToolbarButton>
            <ToolbarButton aria-label="Attach"><AttachIcon /></ToolbarButton>
          </>
        }
        actionsRight={
          <>
            <Button variant="filled" intent="neutral" size="s">Send</Button>
            <Button variant="filled" intent="neutral" size="s" icon={<SendIcon />} iconOnly aria-label="Send" />
          </>
        }
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: { channel: 'sms' },
  render: () => {
    const [channel, setChannel] = React.useState<'sms' | 'email'>('sms');
    const [tab, setTab] = React.useState('internal');
    const [text, setText] = React.useState('');
    const [subject, setSubject] = React.useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 540 }}>
          <Comment
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
            channelStatus={
              <>
                Channel status:{' '}
                <ChipRegular variant="dot" intent="success" label="Open" size="s" chevron />
              </>
            }
            subject={channel === 'email' ? subject : undefined}
            onSubjectChange={setSubject}
            recipients={
              channel === 'email' ? (
                <Chip label="Anthony Bricks" avatar={{ initials: 'AB' }} chevron size="s" />
              ) : undefined
            }
            toolbar={<FormattingToolbar sticky />}
            value={text}
            onChange={setText}
            actionsLeft={
              <>
                <ToolbarButton aria-label="Emoji"><EmojiIcon /></ToolbarButton>
                <ToolbarButton aria-label="Attach"><AttachIcon /></ToolbarButton>
              </>
            }
            actionsRight={
              <>
                <Button variant="filled" intent="neutral" size="s">Send</Button>
                <Button variant="filled" intent="neutral" size="s" icon={<SendIcon />} iconOnly aria-label="Send" />
              </>
            }
          />
        </div>
        <span style={{ fontFamily: 'var(--dls-font-family)', fontSize: 13, color: 'var(--dls-color-text-secondary)' }}>
          Channel: {channel} | Tab: {tab} | Characters: {text.length}
        </span>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// With floating toolbar (on text selection)
// ---------------------------------------------------------------------------

export const WithFloatingToolbar: Story = {
  args: { channel: 'sms' },
  render: () => (
    <div style={{ width: 540 }}>
      <Comment
        channel="sms"
        tabs={<Tabs type="pill" items={channelTabs} value="internal" onChange={() => {}} />}
        channelStatus={
          <>
            Channel status:{' '}
            <ChipRegular variant="dot" intent="success" label="Open" size="s" chevron />
          </>
        }
        toolbar={<FormattingToolbar sticky />}
        value="Select some of this text to see the floating toolbar appear below."
        floatingToolbar={<FormattingToolbar />}
        actionsLeft={
          <>
            <ToolbarButton aria-label="Emoji"><EmojiIcon /></ToolbarButton>
            <ToolbarButton aria-label="Attach"><AttachIcon /></ToolbarButton>
          </>
        }
        actionsRight={
          <>
            <Button variant="filled" intent="neutral" size="s">Send</Button>
            <Button variant="filled" intent="neutral" size="s" icon={<SendIcon />} iconOnly aria-label="Send" />
          </>
        }
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Minimal
// ---------------------------------------------------------------------------

export const Minimal: Story = {
  args: { channel: 'sms' },
  render: () => (
    <div style={{ width: 400 }}>
      <Comment
        channel="sms"
        placeholder="Type a message..."
        actionsRight={
          <>
            <Button variant="filled" intent="neutral" size="s">Send</Button>
            <Button variant="filled" intent="neutral" size="s" icon={<SendIcon />} iconOnly aria-label="Send" />
          </>
        }
      />
    </div>
  ),
};

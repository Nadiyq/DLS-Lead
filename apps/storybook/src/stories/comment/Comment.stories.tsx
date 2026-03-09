import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Comment } from './Comment';
import { Toolbar, ToolbarButton, ToolbarSeparator } from '../toolbar/Toolbar';

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

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 14L14 10M8.5 11.5L6.5 13.5C5.11929 14.8807 5.11929 17.1193 6.5 18.5C7.88071 19.8807 10.1193 19.8807 11.5 18.5L13.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15.5 12.5L17.5 10.5C18.8807 9.11929 18.8807 6.88071 17.5 5.5C16.1193 4.11929 13.8807 4.11929 12.5 5.5L10.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AttachIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 7L7.5 14C6.67 14.83 6.67 16.17 7.5 17C8.33 17.83 9.67 17.83 10.5 17L17.5 10C19.16 8.34 19.16 5.66 17.5 4C15.84 2.34 13.16 2.34 11.5 4L4.5 11C2 13.5 2 17.5 4.5 20C7 22.5 11 22.5 13.5 20L20 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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

// ---------------------------------------------------------------------------
// Placeholder buttons
// ---------------------------------------------------------------------------

const TabGroup = ({ active, onChange }: { active: string; onChange: (v: string) => void }) => (
  <div
    style={{
      display: 'inline-flex',
      gap: 4,
      padding: 2,
      borderRadius: 8,
      background: 'var(--dls-color-surface-muted)',
    }}
  >
    {['SMS', 'Email'].map(tab => (
      <button
        key={tab}
        type="button"
        onClick={() => onChange(tab.toLowerCase())}
        style={{
          all: 'unset',
          boxSizing: 'border-box',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px 12px',
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 500,
          fontFamily: 'var(--dls-font-family)',
          cursor: 'pointer',
          background: active === tab.toLowerCase() ? 'var(--dls-color-surface-base)' : 'transparent',
          color: active === tab.toLowerCase() ? 'var(--dls-color-text-primary)' : 'var(--dls-color-text-secondary)',
          border: active === tab.toLowerCase() ? '1px solid var(--dls-color-border-base)' : '1px solid transparent',
        }}
      >
        {tab}
      </button>
    ))}
  </div>
);

const StatusChip = ({ label }: { label: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 8px',
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 500,
      fontFamily: 'var(--dls-font-family)',
      background: 'var(--dls-color-surface-base)',
      border: '1px solid var(--dls-color-border-base)',
      color: 'var(--dls-color-text-primary)',
    }}
  >
    {label}
  </span>
);

const SendButton = () => (
  <button
    type="button"
    style={{
      all: 'unset',
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: 32,
      padding: '0 12px',
      borderRadius: 6,
      fontSize: 14,
      fontWeight: 500,
      fontFamily: 'var(--dls-font-family)',
      cursor: 'pointer',
      background: 'var(--dls-color-intent-neutral-base)',
      color: 'var(--dls-color-intent-neutral-on-base)',
    }}
  >
    Send
  </button>
);

const AlertBanner = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 12px',
      borderRadius: 8,
      fontSize: 14,
      fontFamily: 'var(--dls-font-family)',
      background: 'var(--dls-color-intent-warning-subtle)',
      border: '1px solid var(--dls-color-intent-warning-border)',
      color: 'var(--dls-color-text-primary)',
    }}
  >
    This contact has opted out of SMS messages.
  </div>
);

const RecipientChip = ({ name }: { name: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 8px',
      borderRadius: 4,
      fontSize: 13,
      fontFamily: 'var(--dls-font-family)',
      background: 'var(--dls-color-surface-muted)',
      color: 'var(--dls-color-text-primary)',
    }}
  >
    {name}
  </span>
);

// ---------------------------------------------------------------------------
// Shared toolbar
// ---------------------------------------------------------------------------

const FormattingToolbar = ({ sticky }: { sticky?: boolean }) => (
  <Toolbar sticky={sticky}>
    <ToolbarButton aria-label="Bold"><BoldIcon /></ToolbarButton>
    <ToolbarButton aria-label="Italic"><ItalicIcon /></ToolbarButton>
    <ToolbarButton aria-label="Underline"><UnderlineIcon /></ToolbarButton>
    <ToolbarSeparator />
    <ToolbarButton aria-label="Link"><LinkIcon /></ToolbarButton>
  </Toolbar>
);

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
        tabs={<TabGroup active={args.channel || 'sms'} onChange={() => {}} />}
        channelStatus={<>Channel status: <StatusChip label="Active" /></>}
        toolbar={<FormattingToolbar sticky />}
        placeholder={args.placeholder}
        actionsLeft={
          <>
            <ToolbarButton aria-label="Attach"><AttachIcon /></ToolbarButton>
            <ToolbarButton aria-label="Emoji"><EmojiIcon /></ToolbarButton>
          </>
        }
        actionsRight={<SendButton />}
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
        tabs={<TabGroup active="sms" onChange={() => {}} />}
        channelStatus={<>Channel status: <StatusChip label="Active" /></>}
        alert={<AlertBanner />}
        toolbar={<FormattingToolbar sticky />}
        actionsLeft={
          <>
            <ToolbarButton aria-label="Attach"><AttachIcon /></ToolbarButton>
            <ToolbarButton aria-label="Emoji"><EmojiIcon /></ToolbarButton>
          </>
        }
        actionsRight={<SendButton />}
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
        tabs={<TabGroup active="email" onChange={() => {}} />}
        channelStatus={<>Channel status: <StatusChip label="Connected" /></>}
        alert={<AlertBanner />}
        subject="Follow-up on your request"
        recipients={
          <>
            <RecipientChip name="john@example.com" />
            <RecipientChip name="jane@example.com" />
          </>
        }
        toolbar={<FormattingToolbar sticky />}
        actionsLeft={
          <>
            <ToolbarButton aria-label="Attach"><AttachIcon /></ToolbarButton>
            <ToolbarButton aria-label="Emoji"><EmojiIcon /></ToolbarButton>
          </>
        }
        actionsRight={<SendButton />}
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
    const [text, setText] = React.useState('');
    const [subject, setSubject] = React.useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 540 }}>
          <Comment
            channel={channel}
            tabs={<TabGroup active={channel} onChange={v => setChannel(v as 'sms' | 'email')} />}
            channelStatus={<>Channel status: <StatusChip label="Active" /></>}
            subject={subject}
            onSubjectChange={setSubject}
            recipients={
              channel === 'email' ? <RecipientChip name="john@example.com" /> : undefined
            }
            toolbar={<FormattingToolbar sticky />}
            value={text}
            onChange={setText}
            actionsLeft={
              <>
                <ToolbarButton aria-label="Attach"><AttachIcon /></ToolbarButton>
                <ToolbarButton aria-label="Emoji"><EmojiIcon /></ToolbarButton>
              </>
            }
            actionsRight={<SendButton />}
          />
        </div>
        <span style={{ fontFamily: 'var(--dls-font-family)', fontSize: 13, color: 'var(--dls-color-text-secondary)' }}>
          Channel: {channel} | Characters: {text.length}
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
        tabs={<TabGroup active="sms" onChange={() => {}} />}
        channelStatus={<>Channel status: <StatusChip label="Active" /></>}
        toolbar={<FormattingToolbar sticky />}
        value="Select some of this text to see the floating toolbar appear below."
        floatingToolbar={<FormattingToolbar />}
        actionsLeft={
          <>
            <ToolbarButton aria-label="Attach"><AttachIcon /></ToolbarButton>
            <ToolbarButton aria-label="Emoji"><EmojiIcon /></ToolbarButton>
          </>
        }
        actionsRight={<SendButton />}
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
        actionsRight={<SendButton />}
      />
    </div>
  ),
};

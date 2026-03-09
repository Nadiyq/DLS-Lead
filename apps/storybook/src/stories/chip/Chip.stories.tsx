import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Chip, type ChipAvatar } from './Chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      {children}
    </div>
  </div>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.33" />
    <path d="M2 5.5L8 9L14 5.5" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const avatarAlice: ChipAvatar = { initials: 'AJ' };
const avatarBob: ChipAvatar = { initials: 'BS' };
const avatarCarol: ChipAvatar = { initials: 'CW' };

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    label: 'Chip',
    size: 'm',
  },
};

// ---------------------------------------------------------------------------
// All types
// ---------------------------------------------------------------------------

export const AllTypes: Story = {
  args: { label: 'Chip' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Text">
        <Chip label="Label" />
      </Section>
      <Section title="Icon + text">
        <Chip leadingIcon={<MailIcon />} label="Email" />
      </Section>
      <Section title="Icon + two texts">
        <Chip leadingIcon={<MailIcon />} label="Email" secondaryLabel="3 new" />
      </Section>
      <Section title="Avatar">
        <Chip avatar={avatarAlice} label="Alice" />
      </Section>
      <Section title="Stacked avatars">
        <Chip stackedAvatars={[avatarAlice, avatarBob, avatarCarol]} label="Team" />
      </Section>
      <Section title="Flag">
        <Chip flag="🇺🇸" label="US" />
      </Section>
      <Section title="Dot">
        <Chip dot="success" label="Active" />
      </Section>
      <Section title="Cross (icon-only)">
        <Chip onRemove={() => {}} />
      </Section>
      <Section title="Chevron (icon-only)">
        <Chip chevron />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  args: { label: 'Chip' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="M (32px)">
        <Chip size="m" leadingIcon={<MailIcon />} label="Medium" />
        <Chip size="m" avatar={avatarAlice} label="Alice" />
        <Chip size="m" dot="info" label="Info" />
      </Section>
      <Section title="S (28px)">
        <Chip size="s" leadingIcon={<MailIcon />} label="Small" />
        <Chip size="s" avatar={avatarAlice} label="Alice" />
        <Chip size="s" dot="info" label="Info" />
      </Section>
      <Section title="XS (24px)">
        <Chip size="xs" leadingIcon={<MailIcon />} label="XSmall" />
        <Chip size="xs" avatar={avatarAlice} label="Alice" />
        <Chip size="xs" dot="info" label="Info" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Removable
// ---------------------------------------------------------------------------

export const Removable: Story = {
  args: { label: 'Chip' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Removable chips">
        <Chip label="Design" onRemove={() => {}} />
        <Chip leadingIcon={<MailIcon />} label="Email" onRemove={() => {}} />
        <Chip avatar={avatarAlice} label="Alice" onRemove={() => {}} />
        <Chip dot="warning" label="Pending" onRemove={() => {}} />
        <Chip flag="🇩🇪" label="Germany" onRemove={() => {}} />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: { label: 'Chip' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Disabled">
        <Chip label="Text" disabled />
        <Chip leadingIcon={<MailIcon />} label="Icon" disabled />
        <Chip avatar={avatarAlice} label="Alice" disabled />
        <Chip dot="success" label="Active" disabled />
        <Chip label="Remove" onRemove={() => {}} disabled />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive (clickable)
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: { label: 'Chip' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Clickable chips">
        <Chip label="Click me" onClick={() => alert('Clicked!')} />
        <Chip leadingIcon={<MailIcon />} label="Email" onClick={() => {}} />
        <Chip chevron label="Expand" onClick={() => {}} />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Dot intents
// ---------------------------------------------------------------------------

export const DotIntents: Story = {
  args: { label: 'Chip' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Dot intents">
        <Chip dot="neutral" label="Neutral" />
        <Chip dot="primary" label="Primary" />
        <Chip dot="info" label="Info" />
        <Chip dot="success" label="Success" />
        <Chip dot="warning" label="Warning" />
        <Chip dot="danger" label="Danger" />
      </Section>
    </div>
  ),
};

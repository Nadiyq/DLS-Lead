import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ChipRegular } from './ChipRegular';

const meta = {
  title: 'Components/ChipRegular',
  component: ChipRegular,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ChipRegular>;

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

const intents = ['neutral', 'info', 'success', 'warning', 'danger'] as const;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    label: 'Chip',
    variant: 'outline',
    intent: 'neutral',
    size: 'm',
  },
};

// ---------------------------------------------------------------------------
// All variants × intents
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  args: { label: 'Chip' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section title="Filled">
        {intents.map((intent) => (
          <ChipRegular key={intent} variant="filled" intent={intent} label={intent} />
        ))}
      </Section>
      <Section title="Outline">
        {intents.map((intent) => (
          <ChipRegular key={intent} variant="outline" intent={intent} label={intent} />
        ))}
      </Section>
      <Section title="Soft">
        {intents.map((intent) => (
          <ChipRegular key={intent} variant="soft" intent={intent} label={intent} />
        ))}
      </Section>
      <Section title="Dot">
        {intents.map((intent) => (
          <ChipRegular key={intent} variant="dot" intent={intent} label={intent} />
        ))}
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
        <ChipRegular size="m" variant="filled" intent="info" label="Filled" />
        <ChipRegular size="m" variant="outline" intent="info" label="Outline" />
        <ChipRegular size="m" variant="soft" intent="info" label="Soft" />
        <ChipRegular size="m" variant="dot" intent="info" label="Dot" />
      </Section>
      <Section title="S (28px)">
        <ChipRegular size="s" variant="filled" intent="info" label="Filled" />
        <ChipRegular size="s" variant="outline" intent="info" label="Outline" />
        <ChipRegular size="s" variant="soft" intent="info" label="Soft" />
        <ChipRegular size="s" variant="dot" intent="info" label="Dot" />
      </Section>
      <Section title="XS (24px)">
        <ChipRegular size="xs" variant="filled" intent="info" label="Filled" />
        <ChipRegular size="xs" variant="outline" intent="info" label="Outline" />
        <ChipRegular size="xs" variant="soft" intent="info" label="Soft" />
        <ChipRegular size="xs" variant="dot" intent="info" label="Dot" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With icons
// ---------------------------------------------------------------------------

export const WithIcons: Story = {
  args: { label: 'Chip' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Leading icon">
        <ChipRegular variant="filled" intent="info" label="Email" leadingIcon={<MailIcon />} />
        <ChipRegular variant="outline" intent="success" label="Email" leadingIcon={<MailIcon />} />
        <ChipRegular variant="soft" intent="warning" label="Email" leadingIcon={<MailIcon />} />
      </Section>
      <Section title="Trailing chevron">
        <ChipRegular variant="filled" intent="neutral" label="More" chevron />
        <ChipRegular variant="outline" intent="neutral" label="More" chevron />
        <ChipRegular variant="soft" intent="neutral" label="More" chevron />
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
      <Section title="Removable">
        <ChipRegular variant="filled" intent="neutral" label="Design" onRemove={() => {}} />
        <ChipRegular variant="outline" intent="info" label="Engineering" onRemove={() => {}} />
        <ChipRegular variant="soft" intent="success" label="Active" onRemove={() => {}} />
        <ChipRegular variant="dot" intent="danger" label="Error" onRemove={() => {}} />
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
        <ChipRegular variant="filled" intent="info" label="Filled" disabled />
        <ChipRegular variant="outline" intent="info" label="Outline" disabled />
        <ChipRegular variant="soft" intent="success" label="Soft" disabled />
        <ChipRegular variant="dot" intent="danger" label="Dot" disabled />
        <ChipRegular variant="outline" intent="neutral" label="Remove" onRemove={() => {}} disabled />
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
      <Section title="Clickable">
        <ChipRegular variant="filled" intent="info" label="Click me" onClick={() => alert('Clicked!')} />
        <ChipRegular variant="outline" intent="neutral" label="Filter" chevron onClick={() => {}} />
        <ChipRegular variant="soft" intent="info" label="Tag" onClick={() => {}} />
      </Section>
    </div>
  ),
};

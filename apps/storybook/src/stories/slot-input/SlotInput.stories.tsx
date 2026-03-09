import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { SlotInput } from './SlotInput';

const meta = {
  title: 'Components/SlotInput',
  component: SlotInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 364 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SlotInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    {children}
  </div>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.33" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.33" />
    <path d="M2 5.5L8 9L14 5.5" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3.5" y="7" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.33" />
    <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const CurrencyBadge = () => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    height: 20, padding: '0 6px', borderRadius: 4,
    fontSize: 12, fontWeight: 600, lineHeight: 1,
    background: 'var(--dls-color-surface-subtle)', color: 'var(--dls-color-text-secondary)',
  }}>
    USD
  </span>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    label: 'Input',
    placeholder: 'Type...',
    iconStart: <SearchIcon />,
  },
};

// ---------------------------------------------------------------------------
// All states
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 364 }}>
      <Section title="Normal (empty)">
        <SlotInput iconStart={<SearchIcon />} placeholder="Type..." />
      </Section>
      <Section title="Filled">
        <SlotInput iconStart={<SearchIcon />} value="Hello world" readOnly />
      </Section>
      <Section title="Disabled">
        <SlotInput iconStart={<SearchIcon />} value="Hello world" disabled />
      </Section>
      <Section title="Error">
        <SlotInput iconStart={<MailIcon />} value="invalid" error="Invalid email address." readOnly />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With slots
// ---------------------------------------------------------------------------

export const WithSlots: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 364 }}>
      <Section title="Leading icon + trailing slot">
        <SlotInput
          iconStart={<MailIcon />}
          placeholder="you@example.com"
          slotRight={<CurrencyBadge />}
        />
      </Section>
      <Section title="Leading slot + trailing icon">
        <SlotInput
          slotLeft={<CurrencyBadge />}
          placeholder="0.00"
          iconEnd={<LockIcon />}
        />
      </Section>
      <Section title="Both slots">
        <SlotInput
          slotLeft={<CurrencyBadge />}
          placeholder="Amount"
          slotRight={<CurrencyBadge />}
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Clearable
// ---------------------------------------------------------------------------

const ClearableTemplate = () => {
  const [value, setValue] = useState('Hello world');
  return (
    <SlotInput
      label="Clearable"
      iconStart={<SearchIcon />}
      placeholder="Search..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      clearable
      onClear={() => setValue('')}
    />
  );
};

export const Clearable: Story = {
  args: {},
  render: () => <ClearableTemplate />,
};

// ---------------------------------------------------------------------------
// With label and hint
// ---------------------------------------------------------------------------

export const WithLabelAndHint: Story = {
  args: {
    label: 'Email',
    hint: 'We will never share your email.',
    placeholder: 'you@example.com',
    iconStart: <MailIcon />,
  },
};

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

export const ErrorState: Story = {
  args: {
    label: 'Password',
    error: 'Password must be at least 8 characters.',
    value: '123',
    iconStart: <LockIcon />,
  },
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

const InteractiveTemplate = () => {
  const [value, setValue] = useState('');
  return (
    <SlotInput
      label="Search"
      hint="Type to search."
      iconStart={<SearchIcon />}
      placeholder="Search..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      clearable
      onClear={() => setValue('')}
    />
  );
};

export const Interactive: Story = {
  args: {},
  render: () => <InteractiveTemplate />,
};

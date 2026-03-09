import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { OtpInput } from './OtpInput';

const meta = {
  title: 'Components/OtpInput',
  component: OtpInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof OtpInput>;

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
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    length: 6,
    type: 'spacing',
    label: 'Verification code',
  },
};

// ---------------------------------------------------------------------------
// All types
// ---------------------------------------------------------------------------

export const AllTypes: Story = {
  args: { length: 6 },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section title="Spacing">
        <OtpInput type="spacing" value="123456" />
      </Section>
      <Section title="No spacing">
        <OtpInput type="no-spacing" value="123456" />
      </Section>
      <Section title="1 separator (3 + 3)">
        <OtpInput type="1-separator" value="123456" />
      </Section>
      <Section title="2 separators (2 + 2 + 2)">
        <OtpInput type="2-separator" value="123456" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// States
// ---------------------------------------------------------------------------

export const States: Story = {
  args: { length: 6 },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section title="Empty">
        <OtpInput type="spacing" />
      </Section>
      <Section title="Partially filled">
        <OtpInput type="spacing" value="12" />
      </Section>
      <Section title="Filled">
        <OtpInput type="spacing" value="123456" />
      </Section>
      <Section title="Error">
        <OtpInput type="spacing" value="123456" error="Invalid code. Please try again." />
      </Section>
      <Section title="Disabled">
        <OtpInput type="spacing" value="123456" disabled />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With label and hint
// ---------------------------------------------------------------------------

export const WithLabelAndHint: Story = {
  args: {
    length: 6,
    type: 'spacing',
    label: 'Verification code',
    hint: 'Enter the 6-digit code sent to your email.',
  },
};

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

export const ErrorState: Story = {
  args: {
    length: 6,
    type: 'spacing',
    value: '123456',
    label: 'Verification code',
    error: 'Invalid code. Please try again.',
  },
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

const InteractiveTemplate = () => {
  const [value, setValue] = useState('');
  return (
    <OtpInput
      type="spacing"
      label="Verification code"
      hint="Enter the 6-digit code."
      value={value}
      onChange={setValue}
    />
  );
};

export const Interactive: Story = {
  args: { length: 6 },
  render: () => <InteractiveTemplate />,
};

// ---------------------------------------------------------------------------
// Interactive with separator
// ---------------------------------------------------------------------------

const InteractiveSeparatorTemplate = () => {
  const [value, setValue] = useState('');
  return (
    <OtpInput
      type="1-separator"
      label="Verification code"
      value={value}
      onChange={setValue}
    />
  );
};

export const InteractiveWithSeparator: Story = {
  args: { length: 6 },
  render: () => <InteractiveSeparatorTemplate />,
};

// ---------------------------------------------------------------------------
// 4-digit code
// ---------------------------------------------------------------------------

export const FourDigit: Story = {
  args: {
    length: 4,
    type: 'spacing',
    label: 'PIN',
    hint: 'Enter your 4-digit PIN.',
  },
};

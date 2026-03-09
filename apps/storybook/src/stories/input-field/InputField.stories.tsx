import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { InputField } from './InputField';

const meta = {
  title: 'Components/InputField',
  component: InputField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 364 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    placeholder: 'Type...',
  },
} satisfies Meta<typeof InputField>;

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

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    label: 'Label',
    placeholder: 'Type...',
  },
};

// ---------------------------------------------------------------------------
// All states
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  args: { placeholder: 'Type...' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 364 }}>
      <Section title="Normal (empty)">
        <InputField placeholder="Type..." />
      </Section>
      <Section title="Filled">
        <InputField placeholder="Type..." value="Some text" readOnly />
      </Section>
      <Section title="Disabled (empty)">
        <InputField placeholder="Type..." disabled />
      </Section>
      <Section title="Disabled (filled)">
        <InputField placeholder="Type..." value="Text" disabled />
      </Section>
      <Section title="Error">
        <InputField placeholder="Type..." value="Text" error="Error message" readOnly />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With label and hint
// ---------------------------------------------------------------------------

export const WithLabelAndHint: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    hint: 'We will never share your email.',
  },
};

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

export const ErrorState: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    value: 'invalid',
    error: 'Please enter a valid email address.',
  },
};

// ---------------------------------------------------------------------------
// Clearable (interactive)
// ---------------------------------------------------------------------------

const ClearableTemplate = () => {
  const [value, setValue] = useState('Hello world');
  return (
    <InputField
      label="Clearable input"
      placeholder="Type something..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      clearable
      onClear={() => setValue('')}
    />
  );
};

export const Clearable: Story = {
  args: { placeholder: 'Type...' },
  render: () => <ClearableTemplate />,
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    label: 'Disabled field',
    placeholder: 'Type...',
    value: 'Cannot edit',
    disabled: true,
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
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
} satisfies Meta<typeof Textarea>;

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
    label: 'Description',
    placeholder: 'Type...',
    maxLength: 280,
    value: '',
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
        <Textarea placeholder="Type..." maxLength={280} value="" readOnly />
      </Section>
      <Section title="Filled">
        <Textarea placeholder="Type..." maxLength={280} value="Some text content" readOnly />
      </Section>
      <Section title="Disabled (empty)">
        <Textarea placeholder="Type..." maxLength={280} value="" disabled />
      </Section>
      <Section title="Disabled (filled)">
        <Textarea placeholder="Type..." maxLength={280} value="Cannot edit this" disabled />
      </Section>
      <Section title="Error">
        <Textarea placeholder="Type..." maxLength={280} value="Invalid content" error="Error message" readOnly />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With label and hint
// ---------------------------------------------------------------------------

export const WithLabelAndHint: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    hint: 'Keep it brief and relevant.',
    maxLength: 280,
    value: '',
  },
};

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

export const ErrorState: Story = {
  args: {
    label: 'Comment',
    placeholder: 'Write a comment...',
    value: 'This text exceeds the limit and contains errors that need to be fixed before submission.',
    error: 'Comment exceeds the maximum length.',
    maxLength: 50,
  },
};

// ---------------------------------------------------------------------------
// Interactive with character count
// ---------------------------------------------------------------------------

const InteractiveTemplate = () => {
  const [value, setValue] = useState('');
  return (
    <Textarea
      label="Message"
      placeholder="Type your message..."
      maxLength={280}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Interactive: Story = {
  args: { placeholder: 'Type...' },
  render: () => <InteractiveTemplate />,
};

// ---------------------------------------------------------------------------
// Without counter
// ---------------------------------------------------------------------------

export const WithoutCounter: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Add notes...',
    value: '',
  },
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    label: 'Locked field',
    placeholder: 'Type...',
    value: 'This content cannot be edited.',
    maxLength: 280,
    disabled: true,
  },
};

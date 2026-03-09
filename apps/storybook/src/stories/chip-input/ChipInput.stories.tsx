import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { ChipInput } from './ChipInput';

const meta = {
  title: 'Components/ChipInput',
  component: ChipInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 364 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChipInput>;

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

const sampleChips = ['Design', 'Engineering', 'Marketing'];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    label: 'Tags',
    placeholder: 'Type...',
    chips: ['Design', 'Engineering'],
  },
};

// ---------------------------------------------------------------------------
// All states
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  args: { chips: [] },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 364 }}>
      <Section title="Normal (empty)">
        <ChipInput placeholder="Type..." />
      </Section>
      <Section title="Filled">
        <ChipInput chips={sampleChips} />
      </Section>
      <Section title="Disabled">
        <ChipInput chips={sampleChips} disabled />
      </Section>
      <Section title="Error">
        <ChipInput chips={sampleChips} error="Too many tags selected." />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With label and hint
// ---------------------------------------------------------------------------

export const WithLabelAndHint: Story = {
  args: {
    label: 'Tags',
    hint: 'Press Enter to add a tag.',
    placeholder: 'Type...',
    chips: ['Design'],
  },
};

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

export const ErrorState: Story = {
  args: {
    label: 'Tags',
    chips: sampleChips,
    error: 'Maximum 3 tags allowed.',
  },
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

const InteractiveTemplate = () => {
  const [chips, setChips] = useState<string[]>(['Design', 'Engineering']);
  return (
    <ChipInput
      label="Tags"
      hint="Press Enter to add. Backspace to remove last."
      placeholder="Add tag..."
      chips={chips}
      onChipsChange={setChips}
    />
  );
};

export const Interactive: Story = {
  args: { chips: [] },
  render: () => <InteractiveTemplate />,
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    label: 'Tags',
    chips: sampleChips,
    disabled: true,
  },
};

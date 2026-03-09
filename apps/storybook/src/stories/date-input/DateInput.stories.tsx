import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { DateInput } from './DateInput';

const meta = {
  title: 'Components/DateInput',
  component: DateInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 364 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DateInput>;

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
    label: 'Date',
    placeholder: 'MM / DD / YYYY',
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
        <DateInput placeholder="MM / DD / YYYY" />
      </Section>
      <Section title="Filled">
        <DateInput value="10 Sep 2023" />
      </Section>
      <Section title="Disabled">
        <DateInput value="10 Sep 2023" disabled />
      </Section>
      <Section title="Error">
        <DateInput value="10 Sep 2023" error="Please select a valid date." />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With label and hint
// ---------------------------------------------------------------------------

export const WithLabelAndHint: Story = {
  args: {
    label: 'Start date',
    hint: 'Select the project start date.',
    placeholder: 'MM / DD / YYYY',
  },
};

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

export const ErrorState: Story = {
  args: {
    label: 'Date',
    value: '10 Sep 2023',
    error: 'This date is in the past.',
  },
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

const InteractiveTemplate = () => {
  const [value, setValue] = useState<string | undefined>();

  const handleClick = () => {
    if (!value) {
      setValue('10 Sep 2023');
    }
  };

  const handleClear = () => {
    setValue(undefined);
  };

  return (
    <DateInput
      label="Date"
      hint="Click to select a date."
      placeholder="MM / DD / YYYY"
      value={value}
      onClick={handleClick}
      onClear={handleClear}
    />
  );
};

export const Interactive: Story = {
  args: {},
  render: () => <InteractiveTemplate />,
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    label: 'Date',
    value: '10 Sep 2023',
    disabled: true,
  },
};

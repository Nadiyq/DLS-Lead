import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { DateRangeInput } from './DateRangeInput';

const meta = {
  title: 'Components/DateRangeInput',
  component: DateRangeInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 430, paddingBottom: 340 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DateRangeInput>;

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
    label: 'Date range',
  },
};

// ---------------------------------------------------------------------------
// All states
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 430 }}>
      <Section title="Empty">
        <DateRangeInput />
      </Section>
      <Section title="Filled">
        <DateRangeInput startValue="10 Sep 2023" endValue="15 Sep 2023" />
      </Section>
      <Section title="Partially filled">
        <DateRangeInput startValue="10 Sep 2023" />
      </Section>
      <Section title="Disabled">
        <DateRangeInput startValue="10 Sep 2023" endValue="15 Sep 2023" disabled />
      </Section>
      <Section title="Error">
        <DateRangeInput startValue="15 Sep 2023" endValue="10 Sep 2023" error="End date must be after start date." />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With label and hint
// ---------------------------------------------------------------------------

export const WithLabelAndHint: Story = {
  args: {
    label: 'Date range',
    hint: 'Select a start and end date.',
  },
};

// ---------------------------------------------------------------------------
// Interactive — with calendar dropdown
// ---------------------------------------------------------------------------

const InteractiveTemplate = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  return (
    <DateRangeInput
      label="Date range"
      hint="Click a field to open the calendar."
      startDate={startDate}
      endDate={endDate}
      onStartDateSelect={setStartDate}
      onEndDateSelect={setEndDate}
      onStartClear={() => setStartDate(undefined)}
      onEndClear={() => setEndDate(undefined)}
    />
  );
};

export const Interactive: Story = {
  args: {},
  render: () => <InteractiveTemplate />,
};

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

export const ErrorState: Story = {
  args: {
    label: 'Date range',
    startValue: '15 Sep 2023',
    endValue: '10 Sep 2023',
    error: 'End date must be after start date.',
  },
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    label: 'Date range',
    startValue: '10 Sep 2023',
    endValue: '15 Sep 2023',
    disabled: true,
  },
};

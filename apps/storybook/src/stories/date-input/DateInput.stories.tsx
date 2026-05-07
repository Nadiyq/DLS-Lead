import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DateInput } from './DateInput';
import { Section } from '../_helpers/StoryLayout';

const meta = {
  title: 'Components/DateInput',
  component: DateInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 364, paddingBottom: 340 }}>
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
      <Section layout="flat" title="Normal (empty)">
        <DateInput placeholder="MM / DD / YYYY" />
      </Section>
      <Section layout="flat" title="Filled">
        <DateInput value="10 Sep 2023" />
      </Section>
      <Section layout="flat" title="Disabled">
        <DateInput value="10 Sep 2023" disabled />
      </Section>
      <Section layout="flat" title="Error">
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
// Interactive — with calendar dropdown
// ---------------------------------------------------------------------------

const InteractiveTemplate = () => {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <DateInput
      label="Date"
      hint="Click to open the calendar."
      placeholder="MM / DD / YYYY"
      selectedDate={date}
      onDateSelect={setDate}
      onClear={() => setDate(undefined)}
    />
  );
};

export const Interactive: Story = {
  args: {},
  render: () => <InteractiveTemplate />,
};

// ---------------------------------------------------------------------------
// With min / max constraints
// ---------------------------------------------------------------------------

const ConstrainedTemplate = () => {
  const [date, setDate] = useState<Date | undefined>();
  const today = new Date();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

  return (
    <DateInput
      label="Date (next 30 days)"
      hint="Only dates within the next 30 days are selectable."
      selectedDate={date}
      onDateSelect={setDate}
      onClear={() => setDate(undefined)}
      min={today}
      max={maxDate}
    />
  );
};

export const WithMinMax: Story = {
  args: {},
  render: () => <ConstrainedTemplate />,
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

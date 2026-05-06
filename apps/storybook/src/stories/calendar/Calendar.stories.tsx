import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Calendar } from './Calendar';
import type { CalendarView } from './Calendar';
import { Section } from '../_helpers/StoryLayout';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    value: new Date(2026, 5, 15),
    month: new Date(2026, 5, 1),
  },
};

// ---------------------------------------------------------------------------
// With selected date — June 2026 with 25th selected
// ---------------------------------------------------------------------------

export const WithSelectedDate: Story = {
  args: {
    value: new Date(2026, 5, 25),
    month: new Date(2026, 5, 1),
  },
};

// ---------------------------------------------------------------------------
// With range — selected start + end with highlighted days between
// ---------------------------------------------------------------------------

export const WithRange: Story = {
  render: () => (
    <Calendar
      value={new Date(2026, 5, 10)}
      valueEnd={new Date(2026, 5, 20)}
      month={new Date(2026, 5, 1)}
    />
  ),
};

// ---------------------------------------------------------------------------
// With min/max — some dates disabled
// ---------------------------------------------------------------------------

export const WithMinMax: Story = {
  render: () => (
    <Calendar
      month={new Date(2026, 5, 1)}
      min={new Date(2026, 5, 5)}
      max={new Date(2026, 5, 25)}
    />
  ),
};

// ---------------------------------------------------------------------------
// Today — highlights today's date
// ---------------------------------------------------------------------------

export const Today: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>(undefined);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <Calendar value={selected} onSelect={setSelected} />
        <span
          style={{
            fontFamily: 'var(--dls-font-family)',
            fontSize: 13,
            color: 'var(--dls-color-text-secondary)',
          }}
        >
          {selected ? `Selected: ${selected.toLocaleDateString()}` : 'Click a date to select'}
        </span>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Month picker
// ---------------------------------------------------------------------------

export const MonthPicker: Story = {
  args: {
    view: 'month',
    value: new Date(2026, 11, 1),
    month: new Date(2026, 0, 1),
  },
};

// ---------------------------------------------------------------------------
// Year picker
// ---------------------------------------------------------------------------

export const YearPicker: Story = {
  args: {
    view: 'year',
    value: new Date(2033, 0, 1),
    month: new Date(2026, 0, 1),
  },
};

// ---------------------------------------------------------------------------
// All views
// ---------------------------------------------------------------------------

export const AllViews: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <Section layout="flat" size="s" title="Date">
        <Calendar
          value={new Date(2026, 5, 25)}
          month={new Date(2026, 5, 1)}
          view="date"
        />
      </Section>
      <Section layout="flat" size="s" title="Month">
        <Calendar
          value={new Date(2026, 11, 1)}
          month={new Date(2026, 0, 1)}
          view="month"
        />
      </Section>
      <Section layout="flat" size="s" title="Year">
        <Calendar
          value={new Date(2033, 0, 1)}
          month={new Date(2026, 0, 1)}
          view="year"
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive — click month title to switch views
// ---------------------------------------------------------------------------

export const InteractiveViews: Story = {
  render: () => {
    const [view, setView] = React.useState<CalendarView>('date');
    const [selected, setSelected] = React.useState<Date>(new Date(2026, 5, 25));
    const [month, setMonth] = React.useState<Date>(new Date(2026, 5, 1));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <Calendar
          view={view}
          onViewChange={setView}
          value={selected}
          month={month}
          onMonthChange={setMonth}
          onSelect={(d) => { setSelected(d); }}
        />
        <span
          style={{
            fontFamily: 'var(--dls-font-family)',
            fontSize: 13,
            color: 'var(--dls-color-text-secondary)',
          }}
        >
          View: {view} | Selected: {selected.toLocaleDateString()}
        </span>
      </div>
    );
  },
};

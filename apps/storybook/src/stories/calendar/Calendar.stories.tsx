import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Calendar } from './Calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    {children}
  </div>
);

const fixedToday = new Date(2026, 5, 15); // June 15, 2026

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    today: fixedToday,
  },
};

// ---------------------------------------------------------------------------
// With selected date
// ---------------------------------------------------------------------------

export const WithSelectedDate: Story = {
  args: {
    value: new Date(2026, 5, 20),
    today: fixedToday,
  },
};

// ---------------------------------------------------------------------------
// All views
// ---------------------------------------------------------------------------

export const AllViews: Story = {
  args: {
    today: fixedToday,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section title="Date view">
        <Calendar today={fixedToday} value={new Date(2026, 5, 20)} />
      </Section>
      <Section title="Month view">
        <Calendar today={fixedToday} defaultView="month" value={new Date(2026, 5, 20)} />
      </Section>
      <Section title="Year view">
        <Calendar today={fixedToday} defaultView="year" value={new Date(2026, 5, 20)} />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With min/max dates
// ---------------------------------------------------------------------------

export const WithMinMaxDates: Story = {
  args: {
    today: fixedToday,
    minDate: new Date(2026, 5, 5),
    maxDate: new Date(2026, 5, 25),
  },
};

// ---------------------------------------------------------------------------
// Monday start
// ---------------------------------------------------------------------------

export const MondayStart: Story = {
  args: {
    today: fixedToday,
    weekStartsOn: 1,
  },
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    today: fixedToday,
  },
  render: () => {
    const [selected, setSelected] = React.useState<Date | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <Calendar
          today={fixedToday}
          value={selected}
          onSelect={setSelected}
        />
        <span style={{ fontFamily: 'var(--dls-font-family)', fontSize: 13, color: 'var(--dls-color-text-secondary)' }}>
          {selected ? `Selected: ${selected.toLocaleDateString()}` : 'No date selected'}
        </span>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// With highlighted dates (range preview)
// ---------------------------------------------------------------------------

export const WithHighlightedDates: Story = {
  args: {
    today: fixedToday,
  },
  render: () => {
    const start = new Date(2026, 5, 10);
    const end = new Date(2026, 5, 18);
    const highlighted: Date[] = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      highlighted.push(new Date(d));
    }
    return (
      <Calendar
        today={fixedToday}
        value={start}
        highlightedDates={highlighted}
      />
    );
  },
};

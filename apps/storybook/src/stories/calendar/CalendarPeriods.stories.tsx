import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { CalendarPeriods } from './CalendarPeriods';
import type { PeriodOption } from './CalendarPeriods';
import { Button } from '../Button';

const meta = {
  title: 'Components/CalendarPeriods',
  component: CalendarPeriods,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarPeriods>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const fixedToday = new Date(2026, 5, 15); // June 15, 2026

const defaultPeriods: PeriodOption[] = [
  { value: '7d', label: 'Last 7 days', startDate: new Date(2026, 5, 8), endDate: new Date(2026, 5, 15) },
  { value: '14d', label: 'Last 14 days', startDate: new Date(2026, 5, 1), endDate: new Date(2026, 5, 15) },
  { value: '30d', label: 'Last 30 days', startDate: new Date(2026, 4, 16), endDate: new Date(2026, 5, 15) },
  { value: '3m', label: 'Last 3 months', startDate: new Date(2026, 2, 15), endDate: new Date(2026, 5, 15) },
  { value: '12m', label: 'Last 12 months', startDate: new Date(2025, 5, 15), endDate: new Date(2026, 5, 15) },
  { value: 'all', label: 'All time' },
  { value: 'custom', label: 'Custom' },
];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    periods: defaultPeriods,
    today: fixedToday,
  },
  render: () => {
    const [period, setPeriod] = React.useState('7d');
    const [start, setStart] = React.useState<Date | null>(new Date(2026, 5, 8));
    const [end, setEnd] = React.useState<Date | null>(new Date(2026, 5, 15));

    return (
      <CalendarPeriods
        periods={defaultPeriods}
        selectedPeriod={period}
        onPeriodChange={(val, s, e) => {
          setPeriod(val);
          if (s && e) { setStart(s); setEnd(e); }
        }}
        startDate={start}
        endDate={end}
        onRangeChange={(s, e) => {
          setStart(s);
          setEnd(e);
          setPeriod('custom');
        }}
        today={fixedToday}
      />
    );
  },
};

// ---------------------------------------------------------------------------
// With footer
// ---------------------------------------------------------------------------

export const WithFooter: Story = {
  args: {
    periods: defaultPeriods,
    selectedPeriod: '14d',
    startDate: new Date(2026, 5, 1),
    endDate: new Date(2026, 5, 15),
    today: fixedToday,
  },
  render: (args) => (
    <CalendarPeriods
      {...args}
      footer={
        <>
          <Button variant="outline" size="m">Cancel</Button>
          <Button variant="filled" size="m">Confirm</Button>
        </>
      }
    />
  ),
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    periods: defaultPeriods,
    today: fixedToday,
  },
  render: () => {
    const [period, setPeriod] = React.useState('7d');
    const [start, setStart] = React.useState<Date | null>(new Date(2026, 5, 8));
    const [end, setEnd] = React.useState<Date | null>(new Date(2026, 5, 15));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <CalendarPeriods
          periods={defaultPeriods}
          selectedPeriod={period}
          onPeriodChange={(val, s, e) => {
            setPeriod(val);
            if (s && e) { setStart(s); setEnd(e); }
          }}
          startDate={start}
          endDate={end}
          onRangeChange={(s, e) => {
            setStart(s);
            setEnd(e);
            setPeriod('custom');
          }}
          today={fixedToday}
          footer={
            <>
              <Button variant="outline" size="m">Cancel</Button>
              <Button variant="filled" size="m">Confirm</Button>
            </>
          }
        />
        <span style={{ fontFamily: 'var(--dls-font-family)', fontSize: 13, color: 'var(--dls-color-text-secondary)' }}>
          Period: {period}
          {start && end ? ` | ${start.toLocaleDateString()} – ${end.toLocaleDateString()}` : ''}
        </span>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// No selection
// ---------------------------------------------------------------------------

export const NoSelection: Story = {
  args: {
    periods: defaultPeriods,
    today: fixedToday,
  },
};

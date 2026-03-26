import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { CalendarRange } from './CalendarRange';
import type { TimePeriod } from './CalendarRange';
import { Button } from '../Button';

const meta = {
  title: 'Components/CalendarRange',
  component: CalendarRange,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarRange>;

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
    layout: 'horizontal',
  },
};

// ---------------------------------------------------------------------------
// With selected range
// ---------------------------------------------------------------------------

export const WithSelectedRange: Story = {
  args: {
    startDate: new Date(2026, 5, 10),
    endDate: new Date(2026, 5, 22),
    today: fixedToday,
  },
};

// ---------------------------------------------------------------------------
// Both layouts
// ---------------------------------------------------------------------------

export const AllLayouts: Story = {
  args: {
    today: fixedToday,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section title="Horizontal">
        <CalendarRange
          today={fixedToday}
          startDate={new Date(2026, 5, 10)}
          endDate={new Date(2026, 6, 5)}
          layout="horizontal"
        />
      </Section>
      <Section title="Vertical">
        <CalendarRange
          today={fixedToday}
          startDate={new Date(2026, 5, 10)}
          endDate={new Date(2026, 6, 5)}
          layout="vertical"
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With footer actions
// ---------------------------------------------------------------------------

export const WithFooter: Story = {
  args: {
    today: fixedToday,
    startDate: new Date(2026, 5, 10),
    endDate: new Date(2026, 5, 22),
  },
  render: () => {
    const [hr, setHr] = React.useState('09');
    const [min, setMin] = React.useState('15');
    const [per, setPer] = React.useState<TimePeriod>('AM');
    return (
      <CalendarRange
        today={fixedToday}
        startDate={new Date(2026, 5, 10)}
        endDate={new Date(2026, 5, 22)}
        showTimePicker
        hour={hr}
        minute={min}
        period={per}
        onTimeChange={(h, m, p) => { setHr(h); setMin(m); setPer(p); }}
        footer={
          <>
            <Button variant="outline" size="m">Cancel</Button>
            <Button variant="filled" size="m">Confirm</Button>
          </>
        }
      />
    );
  },
};

// ---------------------------------------------------------------------------
// With min/max
// ---------------------------------------------------------------------------

export const WithMinMax: Story = {
  args: {
    today: fixedToday,
    minDate: new Date(2026, 5, 1),
    maxDate: new Date(2026, 6, 31),
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
    const [start, setStart] = React.useState<Date | null>(null);
    const [end, setEnd] = React.useState<Date | null>(null);
    const [hr, setHr] = React.useState('09');
    const [min, setMin] = React.useState('15');
    const [per, setPer] = React.useState<TimePeriod>('AM');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <CalendarRange
          today={fixedToday}
          startDate={start}
          endDate={end}
          onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
          showTimePicker
          hour={hr}
          minute={min}
          period={per}
          onTimeChange={(h, m, p) => { setHr(h); setMin(m); setPer(p); }}
          footer={
            <>
              <Button variant="outline" size="m">Cancel</Button>
              <Button variant="filled" size="m">Confirm</Button>
            </>
          }
        />
        <span style={{ fontFamily: 'var(--dls-font-family)', fontSize: 13, color: 'var(--dls-color-text-secondary)' }}>
          {start && end
            ? `${start.toLocaleDateString()} – ${end.toLocaleDateString()} ${hr}:${min} ${per}`
            : start
              ? `Start: ${start.toLocaleDateString()} → pick end date`
              : 'Click to select a range'}
        </span>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Monday start
// ---------------------------------------------------------------------------

export const MondayStart: Story = {
  args: {
    today: fixedToday,
    weekStartsOn: 1,
    startDate: new Date(2026, 5, 10),
    endDate: new Date(2026, 5, 22),
  },
};

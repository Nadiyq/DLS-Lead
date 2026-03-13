import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Slider } from './Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

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

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  },
};

// ---------------------------------------------------------------------------
// Single value positions
// ---------------------------------------------------------------------------

export const SingleValue: Story = {
  args: { value: 50 },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="0%">
        <Slider value={0} />
      </Section>
      <Section title="25%">
        <Slider value={25} />
      </Section>
      <Section title="50%">
        <Slider value={50} />
      </Section>
      <Section title="75%">
        <Slider value={75} />
      </Section>
      <Section title="100%">
        <Slider value={100} />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Range
// ---------------------------------------------------------------------------

export const Range: Story = {
  args: { value: 50 },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="25–75 range">
        <Slider range={[25, 75]} />
      </Section>
      <Section title="10–90 range">
        <Slider range={[10, 90]} />
      </Section>
      <Section title="40–60 narrow range">
        <Slider range={[40, 60]} />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: { value: 50 },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Single disabled">
        <Slider value={60} disabled />
      </Section>
      <Section title="Range disabled">
        <Slider range={[20, 80]} disabled />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive single
// ---------------------------------------------------------------------------

export const InteractiveSingle: Story = {
  args: { value: 50 },
  render: () => {
    const [val, setVal] = React.useState(50);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Slider value={val} onChange={setVal} aria-label="Volume" />
        <span style={{
          fontSize: 'var(--dls-text-s-font-size)',
          color: 'var(--dls-color-text-secondary)',
          fontFamily: 'var(--dls-font-family)',
        }}>
          Value: {val}
        </span>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Interactive range
// ---------------------------------------------------------------------------

export const InteractiveRange: Story = {
  args: { value: 50 },
  render: () => {
    const [range, setRange] = React.useState<[number, number]>([25, 75]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Slider range={range} onRangeChange={setRange} aria-label="Price" />
        <span style={{
          fontSize: 'var(--dls-text-s-font-size)',
          color: 'var(--dls-color-text-secondary)',
          fontFamily: 'var(--dls-font-family)',
        }}>
          Range: {range[0]} – {range[1]}
        </span>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Custom step
// ---------------------------------------------------------------------------

export const CustomStep: Story = {
  args: { value: 50 },
  render: () => {
    const [val, setVal] = React.useState(50);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Slider value={val} onChange={setVal} step={10} aria-label="Brightness" />
        <span style={{
          fontSize: 'var(--dls-text-s-font-size)',
          color: 'var(--dls-color-text-secondary)',
          fontFamily: 'var(--dls-font-family)',
        }}>
          Value: {val} (step: 10)
        </span>
      </div>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
   Helpers
   --------------------------------------------------------------------------- */

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    {children}
  </div>
);

/* ---------------------------------------------------------------------------
   Playground
   --------------------------------------------------------------------------- */

export const Playground: Story = {
  args: {
    type: 'continuous',
    value: 50,
    showLabel: true,
  },
};

/* ---------------------------------------------------------------------------
   Continuous — all percentages
   --------------------------------------------------------------------------- */

export const Continuous: Story = {
  args: { value: 50 },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="0%">
        <ProgressBar type="continuous" value={0} />
      </Section>
      <Section title="25%">
        <ProgressBar type="continuous" value={25} />
      </Section>
      <Section title="50%">
        <ProgressBar type="continuous" value={50} />
      </Section>
      <Section title="75%">
        <ProgressBar type="continuous" value={75} />
      </Section>
      <Section title="100%">
        <ProgressBar type="continuous" value={100} />
      </Section>
    </div>
  ),
};

/* ---------------------------------------------------------------------------
   Segmented — all percentages
   --------------------------------------------------------------------------- */

export const Segmented: Story = {
  args: { value: 50 },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="0% (0 of 4 segments)">
        <ProgressBar type="segmented" value={0} hintLabel="Label" showHintIcon />
      </Section>
      <Section title="25% (1 of 4 segments)">
        <ProgressBar type="segmented" value={25} hintLabel="Label" showHintIcon />
      </Section>
      <Section title="50% (2 of 4 segments)">
        <ProgressBar type="segmented" value={50} hintLabel="Label" showHintIcon />
      </Section>
      <Section title="75% (3 of 4 segments)">
        <ProgressBar type="segmented" value={75} hintLabel="Label" showHintIcon />
      </Section>
      <Section title="100% (4 of 4 segments)">
        <ProgressBar type="segmented" value={100} hintLabel="Label" showHintIcon />
      </Section>
    </div>
  ),
};

/* ---------------------------------------------------------------------------
   Segmented — custom segment counts
   --------------------------------------------------------------------------- */

export const SegmentedCustom: Story = {
  args: { value: 60 },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="3 segments at 66%">
        <ProgressBar type="segmented" value={66} segments={3} hintLabel="2 of 3 complete" />
      </Section>
      <Section title="5 segments at 60%">
        <ProgressBar type="segmented" value={60} segments={5} hintLabel="3 of 5 steps" showHintIcon />
      </Section>
      <Section title="6 segments at 50%">
        <ProgressBar type="segmented" value={50} segments={6} hintLabel="Halfway there" />
      </Section>
    </div>
  ),
};

/* ---------------------------------------------------------------------------
   Small sizes
   --------------------------------------------------------------------------- */

export const Small: Story = {
  args: { value: 70 },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="XS (32px)">
        <ProgressBar type="continuous" value={70} size="xs" />
      </Section>
      <Section title="S (40px)">
        <ProgressBar type="continuous" value={70} size="s" />
      </Section>
      <Section title="M (48px)">
        <ProgressBar type="continuous" value={70} size="m" />
      </Section>
      <Section title="Small sizes inline">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <ProgressBar type="continuous" value={25} size="xs" />
          <ProgressBar type="continuous" value={50} size="s" />
          <ProgressBar type="continuous" value={75} size="m" />
        </div>
      </Section>
    </div>
  ),
};

/* ---------------------------------------------------------------------------
   Without label
   --------------------------------------------------------------------------- */

export const WithoutLabel: Story = {
  args: { value: 60 },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Continuous — no label">
        <ProgressBar type="continuous" value={60} showLabel={false} />
      </Section>
      <Section title="Segmented — no hint">
        <ProgressBar type="segmented" value={75} />
      </Section>
    </div>
  ),
};

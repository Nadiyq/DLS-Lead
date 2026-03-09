import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Checkmark } from './Checkmark';

const meta = {
  title: 'Components/Checkmark',
  component: Checkmark,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkmark>;

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
    size: 'm',
  },
};

// ---------------------------------------------------------------------------
// All sizes
// ---------------------------------------------------------------------------

export const AllSizes: Story = {
  args: {
    size: 'm',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="M (32px)">
        <Checkmark size="m" />
      </Section>
      <Section title="S (24px)">
        <Checkmark size="s" />
      </Section>
      <Section title="XS (16px)">
        <Checkmark size="xs" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Inline comparison
// ---------------------------------------------------------------------------

export const InlineComparison: Story = {
  args: {
    size: 'm',
  },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Checkmark size="m" />
      <Checkmark size="s" />
      <Checkmark size="xs" />
    </div>
  ),
};

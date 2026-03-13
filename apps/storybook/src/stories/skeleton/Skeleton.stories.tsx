import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

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
    type: 'regular',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
};

// ---------------------------------------------------------------------------
// All types
// ---------------------------------------------------------------------------

export const AllTypes: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section title="Regular (avatar + text)">
        <div style={{ width: 300 }}>
          <Skeleton type="regular" />
        </div>
      </Section>
      <Section title="Text (lines only)">
        <div style={{ width: 300 }}>
          <Skeleton type="text" />
        </div>
      </Section>
      <Section title="Card (text + image)">
        <div style={{ width: 300, height: 300 }}>
          <Skeleton type="card" />
        </div>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// List of regular skeletons
// ---------------------------------------------------------------------------

export const ListLoading: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Skeleton type="regular" />
      <Skeleton type="regular" />
      <Skeleton type="regular" />
      <Skeleton type="regular" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Card grid
// ---------------------------------------------------------------------------

export const CardGrid: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, width: 500 }}>
      <div style={{ height: 260 }}><Skeleton type="card" /></div>
      <div style={{ height: 260 }}><Skeleton type="card" /></div>
      <div style={{ height: 260 }}><Skeleton type="card" /></div>
      <div style={{ height: 260 }}><Skeleton type="card" /></div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Text block
// ---------------------------------------------------------------------------

export const TextBlock: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
      <Skeleton type="text" />
      <Skeleton type="text" />
      <Skeleton type="text" />
    </div>
  ),
};

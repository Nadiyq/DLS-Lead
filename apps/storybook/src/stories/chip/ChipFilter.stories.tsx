import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ChipFilter } from './ChipFilter';

const meta = {
  title: 'Components/ChipFilter',
  component: ChipFilter,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ChipFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      {children}
    </div>
  </div>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    segments: [
      { label: 'Filter', icon: <FilterIcon /> },
      { label: 'Value' },
    ],
    active: true,
    size: 'm',
  },
};

// ---------------------------------------------------------------------------
// All states
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  args: {
    segments: [{ label: 'Filter' }],
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Active">
        <ChipFilter
          segments={[{ label: 'Category', icon: <FilterIcon /> }, { label: 'Design' }]}
          active
        />
      </Section>
      <Section title="Inactive">
        <ChipFilter
          segments={[{ label: 'Category' }, { label: 'All' }]}
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  args: {
    segments: [{ label: 'Filter' }],
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="M (32px)">
        <ChipFilter
          size="m"
          segments={[{ label: 'Status', icon: <FilterIcon /> }, { label: 'Active' }]}
          active
        />
        <ChipFilter
          size="m"
          segments={[{ label: 'Status' }, { label: 'All' }]}
        />
      </Section>
      <Section title="S (28px)">
        <ChipFilter
          size="s"
          segments={[{ label: 'Status', icon: <FilterIcon /> }, { label: 'Active' }]}
          active
        />
        <ChipFilter
          size="s"
          segments={[{ label: 'Status' }, { label: 'All' }]}
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With icon
// ---------------------------------------------------------------------------

export const WithIcon: Story = {
  args: {
    segments: [
      { label: 'Filter', icon: <FilterIcon /> },
      { label: 'Recent' },
    ],
    active: true,
  },
};

// ---------------------------------------------------------------------------
// Multiple segments
// ---------------------------------------------------------------------------

export const MultipleSegments: Story = {
  args: {
    segments: [{ label: 'Filter' }],
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Two segments">
        <ChipFilter
          segments={[{ label: 'Type' }, { label: 'Bug' }]}
          active
        />
      </Section>
      <Section title="Three segments">
        <ChipFilter
          segments={[{ label: 'Priority', icon: <FilterIcon /> }, { label: 'High' }, { label: '+2' }]}
          active
        />
      </Section>
    </div>
  ),
};

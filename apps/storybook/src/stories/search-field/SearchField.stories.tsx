import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { SearchField } from './SearchField';

const meta = {
  title: 'Components/SearchField',
  component: SearchField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 364 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    placeholder: 'Search',
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
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
    placeholder: 'Search',
  },
};

// ---------------------------------------------------------------------------
// All states
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  args: { placeholder: 'Search' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 364 }}>
      <Section title="Normal (empty)">
        <SearchField placeholder="Search" />
      </Section>
      <Section title="Filled">
        <SearchField placeholder="Search" value="Item" readOnly />
      </Section>
      <Section title="Disabled">
        <SearchField placeholder="Search" disabled />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With label
// ---------------------------------------------------------------------------

export const WithLabel: Story = {
  args: {
    label: 'Search users',
    placeholder: 'Search by name or email...',
  },
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

const InteractiveTemplate = () => {
  const [value, setValue] = useState('');
  return (
    <SearchField
      placeholder="Search..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
    />
  );
};

export const Interactive: Story = {
  args: { placeholder: 'Search' },
  render: () => <InteractiveTemplate />,
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    placeholder: 'Search',
    disabled: true,
  },
};

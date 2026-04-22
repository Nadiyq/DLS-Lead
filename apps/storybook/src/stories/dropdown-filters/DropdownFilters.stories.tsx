import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { DropdownFilters } from './DropdownFilters';
import type { FilterOption } from './DropdownFilters';

const meta = {
  title: 'Components/DropdownFilters',
  component: DropdownFilters,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const filterOptions: FilterOption[] = [
  { id: 'status', label: 'Status' },
  { id: 'role', label: 'Role' },
  { id: 'date', label: 'Date' },
  { id: 'department', label: 'Department' },
  { id: 'location', label: 'Location' },
];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    options: filterOptions,
  },
};

// ---------------------------------------------------------------------------
// Short list — matches the 3-chip Figma reference
// ---------------------------------------------------------------------------

export const ShortList: Story = {
  args: {
    options: filterOptions.slice(0, 3),
  },
};

// ---------------------------------------------------------------------------
// Interactive — fires onSelect when a chip is clicked
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    options: filterOptions,
  },
  render: () => {
    const [lastClicked, setLastClicked] = React.useState<string | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <DropdownFilters
          options={filterOptions}
          onSelect={(id) => setLastClicked(id)}
        />
        <p style={{
          margin: 0, fontSize: 'var(--dls-text-s-font-size)',
          fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-secondary)',
          maxWidth: 280, textAlign: 'center',
        }}>
          Last clicked: {lastClicked ?? 'None'}
        </p>
      </div>
    );
  },
};

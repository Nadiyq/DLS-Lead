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
    activeIds: ['status', 'role'],
  },
};

// ---------------------------------------------------------------------------
// None active
// ---------------------------------------------------------------------------

export const NoneActive: Story = {
  args: {
    options: filterOptions,
    activeIds: [],
  },
};

// ---------------------------------------------------------------------------
// All active
// ---------------------------------------------------------------------------

export const AllActive: Story = {
  args: {
    options: filterOptions,
    activeIds: filterOptions.map(f => f.id),
  },
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    options: filterOptions,
    activeIds: [],
  },
  render: () => {
    const [activeIds, setActiveIds] = React.useState<string[]>(['status']);

    const handleToggle = (id: string, active: boolean) => {
      setActiveIds(prev =>
        active ? [...prev, id] : prev.filter(x => x !== id),
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <DropdownFilters
          options={filterOptions}
          activeIds={activeIds}
          onToggle={handleToggle}
        />
        <p style={{
          margin: 0, fontSize: 'var(--dls-text-s-font-size)',
          fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-secondary)',
          maxWidth: 280, textAlign: 'center',
        }}>
          Active: {activeIds.length === 0 ? 'None' : activeIds.join(', ')}
        </p>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Synced with filters bar — simulating table top bar context
// ---------------------------------------------------------------------------

export const SyncedWithFiltersBar: Story = {
  args: {
    options: filterOptions,
    activeIds: [],
  },
  render: () => {
    const [activeIds, setActiveIds] = React.useState<string[]>(['status', 'role']);

    const handleToggle = (id: string, active: boolean) => {
      setActiveIds(prev =>
        active ? [...prev, id] : prev.filter(x => x !== id),
      );
    };

    const activeLabels = filterOptions
      .filter(f => activeIds.includes(f.id))
      .map(f => f.label);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <DropdownFilters
          options={filterOptions}
          activeIds={activeIds}
          onToggle={handleToggle}
        />
        <div style={{
          width: 280, padding: '8px 12px',
          border: '1px solid var(--dls-color-border-subtle)',
          borderRadius: 'var(--dls-radius-component-card)',
          fontFamily: 'var(--dls-font-family)', fontSize: 'var(--dls-text-s-font-size)',
          color: 'var(--dls-color-text-secondary)',
        }}>
          <strong style={{ color: 'var(--dls-color-text-primary)' }}>Filters bar reflects:</strong>
          <br />
          {activeLabels.length === 0 ? 'No active filters' : activeLabels.join(' | ')}
        </div>
      </div>
    );
  },
};

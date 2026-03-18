import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { DropdownSorting } from './DropdownSorting';
import type { SortColumn, SortDirection } from './DropdownSorting';
import { FilterChip } from '../filter-chip/FilterChip';

const meta = {
  title: 'Components/DropdownSorting',
  component: DropdownSorting,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: 200, paddingTop: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownSorting>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const sampleColumns: SortColumn[] = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'role', label: 'Role' },
  { value: 'status', label: 'Status' },
  { value: 'deadline', label: 'Deadline' },
  { value: 'amount', label: 'Amount' },
];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    columns: sampleColumns,
    column: 'deadline',
    direction: 'ascending',
  },
};

// ---------------------------------------------------------------------------
// Default state (matching Figma)
// ---------------------------------------------------------------------------

export const DefaultState: Story = {
  args: {
    columns: sampleColumns,
    column: 'deadline',
    direction: 'ascending',
  },
};

// ---------------------------------------------------------------------------
// Descending
// ---------------------------------------------------------------------------

export const Descending: Story = {
  args: {
    columns: sampleColumns,
    column: 'name',
    direction: 'descending',
  },
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    columns: sampleColumns,
    column: 'deadline',
    direction: 'ascending',
  },
  render: () => {
    const [column, setColumn] = React.useState('deadline');
    const [direction, setDirection] = React.useState<SortDirection>('ascending');

    const colLabel = sampleColumns.find(c => c.value === column)?.label ?? column;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <DropdownSorting
          columns={sampleColumns}
          column={column}
          direction={direction}
          onColumnChange={setColumn}
          onDirectionChange={setDirection}
        />
        <p style={{
          margin: 0, fontSize: 'var(--dls-text-s-font-size)',
          fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-secondary)',
          textAlign: 'center',
        }}>
          Sorting by <strong>{colLabel}</strong> — <strong>{direction}</strong>
        </p>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// In context — triggered from chip filter
// ---------------------------------------------------------------------------

export const InContext: Story = {
  args: {
    columns: sampleColumns,
    column: 'name',
    direction: 'ascending',
  },
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [column, setColumn] = React.useState('name');
    const [direction, setDirection] = React.useState<SortDirection>('ascending');

    const colLabel = sampleColumns.find(c => c.value === column)?.label ?? column;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <FilterChip
          label="Sort"
          isVisible
          size="m"
          valueSummary={<span className="dls-filter-chip__value-text">{colLabel}</span>}
          onOpenChange={setOpen}
          open={open}
        />
        {open && (
          <DropdownSorting
            columns={sampleColumns}
            column={column}
            direction={direction}
            onColumnChange={setColumn}
            onDirectionChange={setDirection}
          />
        )}
      </div>
    );
  },
};

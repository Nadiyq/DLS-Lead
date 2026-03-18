import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { TableHeaderCell } from './TableHeaderCell';
import type { SortDirection } from './TableHeaderCell';
import { Checkbox } from '../checkbox/Checkbox';

const meta = {
  title: 'Components/TableHeaderCell',
  component: TableHeaderCell,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TableHeaderCell>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    {children}
  </div>
);

/* Checkbox uses DLS Checkbox component */

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    type: 'text',
    align: 'left',
    padding: true,
    text: 'Column',
    sortable: true,
    sortDirection: 'none',
  },
};

// ---------------------------------------------------------------------------
// Text — alignment
// ---------------------------------------------------------------------------

export const Alignment: Story = {
  args: { text: 'Column' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 200 }}>
      <TableHeaderCell text="Left aligned" align="left" />
      <TableHeaderCell text="Center aligned" align="center" />
      <TableHeaderCell text="Right aligned" align="right" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sortable
// ---------------------------------------------------------------------------

export const Sortable: Story = {
  args: { text: 'Column' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 200 }}>
      <Section title="No sort active">
        <TableHeaderCell text="Name" sortable sortDirection="none" />
      </Section>
      <Section title="Ascending">
        <TableHeaderCell text="Name" sortable sortDirection="asc" />
      </Section>
      <Section title="Descending">
        <TableHeaderCell text="Name" sortable sortDirection="desc" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Right-aligned sortable (sort icon before text)
// ---------------------------------------------------------------------------

export const RightAlignedSort: Story = {
  args: { text: 'Amount' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 200 }}>
      <Section title="Right — no sort">
        <TableHeaderCell text="Amount" align="right" sortable sortDirection="none" />
      </Section>
      <Section title="Right — ascending">
        <TableHeaderCell text="Amount" align="right" sortable sortDirection="asc" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Control (checkbox)
// ---------------------------------------------------------------------------

export const Control: Story = {
  args: { text: 'Column' },
  render: () => (
    <div style={{ width: 50 }}>
      <TableHeaderCell type="control">
        <Checkbox />
      </TableHeaderCell>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Empty
// ---------------------------------------------------------------------------

export const Empty: Story = {
  args: { text: 'Column' },
  render: () => (
    <div style={{ width: 50 }}>
      <TableHeaderCell type="empty" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Padding variants
// ---------------------------------------------------------------------------

export const PaddingVariants: Story = {
  args: { text: 'Column' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 200 }}>
      <Section title="With padding">
        <TableHeaderCell text="Column name" sortable />
      </Section>
      <Section title="Without horizontal padding">
        <TableHeaderCell text="Column name" sortable padding={false} />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive sorting
// ---------------------------------------------------------------------------

export const InteractiveSorting: Story = {
  args: { text: 'Column' },
  render: () => {
    const cycle: SortDirection[] = ['none', 'asc', 'desc'];
    const [sorts, setSorts] = React.useState<Record<string, SortDirection>>({
      name: 'none',
      email: 'none',
      amount: 'none',
    });

    const toggleSort = (col: string) => {
      setSorts(prev => {
        const idx = cycle.indexOf(prev[col]);
        const next = cycle[(idx + 1) % cycle.length];
        // Reset others
        const updated: Record<string, SortDirection> = {};
        for (const key of Object.keys(prev)) updated[key] = key === col ? next : 'none';
        return updated;
      });
    };

    return (
      <div style={{ width: 500 }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '0 0 40px' }}>
            <TableHeaderCell type="control">
              <Checkbox />
            </TableHeaderCell>
          </div>
          <div style={{ flex: 2 }}>
            <TableHeaderCell text="Name" sortable sortDirection={sorts.name} onSort={() => toggleSort('name')} />
          </div>
          <div style={{ flex: 2 }}>
            <TableHeaderCell text="Email" sortable sortDirection={sorts.email} onSort={() => toggleSort('email')} />
          </div>
          <div style={{ flex: 1 }}>
            <TableHeaderCell text="Amount" align="right" sortable sortDirection={sorts.amount} onSort={() => toggleSort('amount')} />
          </div>
          <div style={{ flex: '0 0 80px' }}>
            <TableHeaderCell type="empty" />
          </div>
        </div>
      </div>
    );
  },
};

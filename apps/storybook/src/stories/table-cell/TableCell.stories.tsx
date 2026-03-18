import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { TableCell } from './TableCell';
import { Checkbox } from '../checkbox/Checkbox';
import { Button } from '../Button';
import '../table/table.css';

const meta = {
  title: 'Components/TableCell',
  component: TableCell,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TableCell>;

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

const SmallIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    type: 'text',
    align: 'left',
    padding: true,
    text: 'Item text',
  },
};

// ---------------------------------------------------------------------------
// Text cell — all sub-types
// ---------------------------------------------------------------------------

export const TextCell: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Section title="Plain text">
        <TableCell type="text" text="Item text" />
      </Section>
      <Section title="With checkbox">
        <TableCell type="text" text="Item text" slotLeft={<Checkbox />} />
      </Section>
      <Section title="With icon">
        <TableCell type="text" text="Item text" icon={<SmallIcon />} />
      </Section>
      <Section title="With left + right slots">
        <TableCell type="text" text="Item text" slotLeft={<SmallIcon />} slotRight={<SmallIcon />} />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Two-line cell
// ---------------------------------------------------------------------------

export const TwoLineCell: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Section title="Left aligned">
        <TableCell type="two-line" text="Primary text" secondaryText="Secondary text" align="left" />
      </Section>
      <Section title="Center aligned">
        <TableCell type="two-line" text="Primary text" secondaryText="Secondary text" align="center" />
      </Section>
      <Section title="Right aligned">
        <TableCell type="two-line" text="Primary text" secondaryText="Secondary text" align="right" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Alignment
// ---------------------------------------------------------------------------

export const Alignment: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 300 }}>
      <TableCell type="text" text="Left aligned" align="left" />
      <TableCell type="text" text="Center aligned" align="center" />
      <TableCell type="text" text="Right aligned" align="right" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Padding variants
// ---------------------------------------------------------------------------

export const PaddingVariants: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Section title="With padding (default)">
        <div style={{ background: 'var(--dls-color-surface-muted)' }}>
          <TableCell type="text" text="With horizontal padding" padding />
        </div>
      </Section>
      <Section title="Without horizontal padding">
        <div style={{ background: 'var(--dls-color-surface-muted)' }}>
          <TableCell type="text" text="No horizontal padding" padding={false} />
        </div>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Badge cell
// ---------------------------------------------------------------------------

export const BadgeCell: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 300 }}>
      <TableCell type="badge" align="left">
        <Button variant="soft" intent="success" size="s">Active</Button>
      </TableCell>
      <TableCell type="badge" align="center">
        <Button variant="soft" intent="warning" size="s">Pending</Button>
      </TableCell>
      <TableCell type="badge" align="right">
        <Button variant="soft" intent="danger" size="s">Inactive</Button>
      </TableCell>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Button cell
// ---------------------------------------------------------------------------

export const ButtonCell: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 300 }}>
      <TableCell type="button" align="left">
        <Button variant="outline" intent="neutral" size="s">Edit</Button>
      </TableCell>
      <TableCell type="button" align="right">
        <Button variant="outline" intent="neutral" size="s">View</Button>
      </TableCell>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Actions cell
// ---------------------------------------------------------------------------

export const ActionsCell: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 300 }}>
      <TableCell type="actions" align="right">
        <Button variant="outline" intent="neutral" size="s">Edit</Button>
        <Button variant="outline" intent="neutral" size="s">Delete</Button>
      </TableCell>
      <TableCell type="actions" align="right">
        <Button variant="outline" intent="neutral" size="s">View</Button>
      </TableCell>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Slot cell (generic content)
// ---------------------------------------------------------------------------

export const SlotCell: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 300 }}>
      <TableCell type="slot" align="left">
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--dls-font-family)', fontSize: 'var(--dls-text-s-font-size)',
          color: 'var(--dls-color-text-secondary)',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 'var(--dls-radius-full)',
            background: 'var(--dls-color-surface-muted)',
          }} />
          Custom content
        </div>
      </TableCell>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Full table row example
// ---------------------------------------------------------------------------

export const TableRowExample: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ width: 700 }}>
      <Section title="Example rows (grid layout — equal row heights)">
        <div className="dls-table__columns" style={{ gridTemplateColumns: '40px 2fr 1fr 1fr 120px', gridTemplateRows: 'repeat(2, auto)' }}>
          <TableCell type="text" slotLeft={<Checkbox />} padding={false} />
          <TableCell type="two-line" text="John Smith" secondaryText="john@example.com" />
          <TableCell type="badge" align="center">
            <Button variant="soft" intent="success" size="s">Active</Button>
          </TableCell>
          <TableCell type="text" text="$12,500" align="right" />
          <TableCell type="actions" align="right">
            <Button variant="outline" intent="neutral" size="s">Edit</Button>
          </TableCell>

          <TableCell type="text" slotLeft={<Checkbox />} padding={false} />
          <TableCell type="two-line" text="Jane Doe" secondaryText="jane@example.com" />
          <TableCell type="badge" align="center">
            <Button variant="soft" intent="warning" size="s">Pending</Button>
          </TableCell>
          <TableCell type="text" text="$8,200" align="right" />
          <TableCell type="actions" align="right">
            <Button variant="outline" intent="neutral" size="s">Edit</Button>
          </TableCell>
        </div>
      </Section>
    </div>
  ),
};

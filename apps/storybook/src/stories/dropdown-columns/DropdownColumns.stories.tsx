import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { DropdownColumns } from './DropdownColumns';
import type { ColumnItem } from './DropdownColumns';
import { Button } from '../Button';

const meta = {
  title: 'Components/DropdownColumns',
  component: DropdownColumns,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownColumns>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const sampleShown: ColumnItem[] = [
  { id: 'name', label: 'Name', pinned: true },
  { id: 'email', label: 'Email' },
  { id: 'role', label: 'Role' },
  { id: 'status', label: 'Status' },
];

const sampleHidden: ColumnItem[] = [
  { id: 'phone', label: 'Phone' },
  { id: 'department', label: 'Department' },
];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    shown: sampleShown,
    hidden: sampleHidden,
  },
};

// ---------------------------------------------------------------------------
// All shown — no hidden columns
// ---------------------------------------------------------------------------

export const AllShown: Story = {
  args: {
    shown: [
      { id: 'name', label: 'Name', pinned: true },
      { id: 'email', label: 'Email' },
      { id: 'role', label: 'Role' },
      { id: 'status', label: 'Status' },
      { id: 'phone', label: 'Phone' },
      { id: 'department', label: 'Department' },
    ],
    hidden: [],
  },
};

// ---------------------------------------------------------------------------
// Many hidden
// ---------------------------------------------------------------------------

export const ManyHidden: Story = {
  args: {
    shown: [
      { id: 'name', label: 'Name', pinned: true },
      { id: 'email', label: 'Email' },
    ],
    hidden: [
      { id: 'role', label: 'Role' },
      { id: 'status', label: 'Status' },
      { id: 'phone', label: 'Phone' },
      { id: 'department', label: 'Department' },
      { id: 'location', label: 'Location' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Interactive — full workflow
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    shown: sampleShown,
    hidden: sampleHidden,
  },
  render: () => {
    const [shown, setShown] = React.useState<ColumnItem[]>(sampleShown);
    const [hidden, setHidden] = React.useState<ColumnItem[]>(sampleHidden);
    const [applied, setApplied] = React.useState<string[]>(sampleShown.map(c => c.label));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <DropdownColumns
          shown={shown}
          hidden={hidden}
          onChange={(s, h) => { setShown(s); setHidden(h); }}
          onApply={(s) => {
            setApplied(s.map(c => c.label));
            alert(`Applied columns: ${s.map(c => c.label).join(', ')}`);
          }}
          onCancel={() => {
            setShown(sampleShown);
            setHidden(sampleHidden);
          }}
        />
        <p style={{
          margin: 0, fontSize: 'var(--dls-text-s-font-size)',
          fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-secondary)',
          maxWidth: 280, textAlign: 'center',
        }}>
          Drag to reorder shown columns. Click pin icon to pin/unpin.
          Click hidden columns to show them. Last applied: {applied.join(', ')}
        </p>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// In DropdownOptions context
// ---------------------------------------------------------------------------

export const InContext: Story = {
  args: {
    shown: sampleShown,
    hidden: sampleHidden,
  },
  render: () => {
    const [open, setOpen] = React.useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <Button variant="soft" intent="neutral" size="m" onClick={() => setOpen(v => !v)}>
          {open ? 'Close' : 'Open'} Columns
        </Button>
        {open && (
          <DropdownColumns
            shown={sampleShown}
            hidden={sampleHidden}
            onApply={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        )}
      </div>
    );
  },
};

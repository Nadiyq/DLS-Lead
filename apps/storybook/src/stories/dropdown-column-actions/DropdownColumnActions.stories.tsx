import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { DropdownColumnActions } from './DropdownColumnActions';
import type { SortState } from './DropdownColumnActions';
import { TableHeaderCell } from '../table-header-cell/TableHeaderCell';

const meta = {
  title: 'Components/DropdownColumnActions',
  component: DropdownColumnActions,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownColumnActions>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    sortState: 'asc',
    pinned: false,
    canMoveLeft: true,
    canMoveRight: true,
  },
};

// ---------------------------------------------------------------------------
// Default state (matching Figma — sort ascending active)
// ---------------------------------------------------------------------------

export const DefaultState: Story = {
  args: {
    sortState: 'asc',
    pinned: false,
    canMoveLeft: true,
    canMoveRight: true,
  },
};

// ---------------------------------------------------------------------------
// Sort descending active
// ---------------------------------------------------------------------------

export const SortDescending: Story = {
  args: {
    sortState: 'desc',
    pinned: false,
    canMoveLeft: true,
    canMoveRight: true,
  },
};

// ---------------------------------------------------------------------------
// No sort active
// ---------------------------------------------------------------------------

export const NoSort: Story = {
  args: {
    sortState: 'none',
    pinned: false,
    canMoveLeft: true,
    canMoveRight: true,
  },
};

// ---------------------------------------------------------------------------
// Pinned column
// ---------------------------------------------------------------------------

export const Pinned: Story = {
  args: {
    sortState: 'none',
    pinned: true,
    canMoveLeft: true,
    canMoveRight: true,
  },
};

// ---------------------------------------------------------------------------
// First column (can't move left)
// ---------------------------------------------------------------------------

export const FirstColumn: Story = {
  args: {
    sortState: 'none',
    pinned: false,
    canMoveLeft: false,
    canMoveRight: true,
  },
};

// ---------------------------------------------------------------------------
// Last column (can't move right)
// ---------------------------------------------------------------------------

export const LastColumn: Story = {
  args: {
    sortState: 'none',
    pinned: false,
    canMoveLeft: true,
    canMoveRight: false,
  },
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    sortState: 'none',
    pinned: false,
    canMoveLeft: true,
    canMoveRight: true,
  },
  render: () => {
    const [sortState, setSortState] = React.useState<SortState>('none');
    const [pinned, setPinned] = React.useState(false);
    const [position, setPosition] = React.useState(2); // 0-based, 5 columns total

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <DropdownColumnActions
          sortState={sortState}
          pinned={pinned}
          canMoveLeft={position > 0}
          canMoveRight={position < 4}
          onSortAsc={() => setSortState(s => s === 'asc' ? 'none' : 'asc')}
          onSortDesc={() => setSortState(s => s === 'desc' ? 'none' : 'desc')}
          onFilter={() => alert('Filter clicked')}
          onPin={() => setPinned(p => !p)}
          onMoveLeft={() => setPosition(p => Math.max(0, p - 1))}
          onMoveRight={() => setPosition(p => Math.min(4, p + 1))}
          onHide={() => alert('Column hidden')}
        />
        <p style={{
          margin: 0, fontSize: 'var(--dls-text-s-font-size)',
          fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-secondary)',
          textAlign: 'center',
        }}>
          Sort: <strong>{sortState}</strong> | Pinned: <strong>{pinned ? 'yes' : 'no'}</strong> | Position: <strong>{position + 1}/5</strong>
        </p>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// In context — triggered from table header cell
// ---------------------------------------------------------------------------

export const InContext: Story = {
  args: {
    sortState: 'none',
    pinned: false,
    canMoveLeft: true,
    canMoveRight: true,
  },
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [sortState, setSortState] = React.useState<SortState>('asc');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
        <TableHeaderCell
          text="Name"
          sortable
          sortDirection={sortState}
          onSort={() => setOpen(v => !v)}
        />
        {open && (
          <DropdownColumnActions
            sortState={sortState}
            onSortAsc={() => { setSortState(s => s === 'asc' ? 'none' : 'asc'); setOpen(false); }}
            onSortDesc={() => { setSortState(s => s === 'desc' ? 'none' : 'desc'); setOpen(false); }}
            onFilter={() => { alert('Filter'); setOpen(false); }}
            onPin={() => { alert('Pin toggled'); setOpen(false); }}
            onMoveLeft={() => { alert('Moved left'); setOpen(false); }}
            onMoveRight={() => { alert('Moved right'); setOpen(false); }}
            onHide={() => { alert('Hidden'); setOpen(false); }}
          />
        )}
      </div>
    );
  },
};

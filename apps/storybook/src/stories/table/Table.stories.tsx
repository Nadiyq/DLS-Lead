import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Table } from './Table';
import { TableTopBar } from '../table-top-bar/TableTopBar';
import { TableColumn } from '../table-column/TableColumn';
import type { TableColumnRow } from '../table-column/TableColumn';

const meta = {
  title: 'Templates/Table',
  component: Table,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
   Stub helpers — lightweight stand-ins for real components
   --------------------------------------------------------------------------- */

const SearchInput = () => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 'var(--dls-spacing-2)',
    padding: '0 var(--dls-spacing-3)', height: 32,
    border: '1px solid var(--dls-color-border-base)', borderRadius: 'var(--dls-radius-component-input)',
    fontFamily: 'var(--dls-font-family)', fontSize: 'var(--dls-text-m-font-size)',
    color: 'var(--dls-color-text-secondary)', minWidth: 200,
  }}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.33" />
      <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
    </svg>
    Search…
  </div>
);

const IconButton = ({ label }: { label: string }) => (
  <button type="button" aria-label={label} style={{
    all: 'unset', boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center',
    justifyContent: 'center', width: 32, height: 32,
    borderRadius: 'var(--dls-radius-component-button)',
    color: 'var(--dls-color-text-secondary)', cursor: 'pointer',
  }}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="3" r="1" fill="currentColor" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="8" cy="13" r="1" fill="currentColor" />
    </svg>
  </button>
);

const ActionButton = ({ children }: { children: React.ReactNode }) => (
  <button type="button" style={{
    all: 'unset', boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center',
    justifyContent: 'center', padding: '0 var(--dls-spacing-4)', height: 32,
    borderRadius: 'var(--dls-radius-component-button)',
    background: 'var(--dls-color-intent-neutral-base)',
    color: 'var(--dls-color-intent-neutral-on-base)',
    fontFamily: 'var(--dls-font-family)', fontSize: 'var(--dls-text-m-font-size)',
    fontWeight: 'var(--dls-font-weight-medium)', cursor: 'pointer',
  }}>
    {children}
  </button>
);

const ChipStub = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 'var(--dls-spacing-1)',
    padding: '0 var(--dls-spacing-3)', height: 28,
    borderRadius: 'var(--dls-radius-component-chip)',
    border: '1px solid var(--dls-color-border-base)',
    fontFamily: 'var(--dls-font-family)', fontSize: 'var(--dls-text-s-font-size)',
    color: 'var(--dls-color-text-primary)',
  }}>
    {children}
  </span>
);

/* ---------------------------------------------------------------------------
   Sample data
   --------------------------------------------------------------------------- */

const checkboxRows: TableColumnRow[] = [
  { checked: true }, { checked: false }, { checked: true },
  { checked: false }, { checked: false },
];

const userRows: TableColumnRow[] = [
  { text: 'John Smith', secondaryText: 'jsmith@acme.com', initials: 'JS' },
  { text: 'Jane Doe', secondaryText: 'jane@acme.com', initials: 'JD' },
  { text: 'Bob Wilson', secondaryText: 'bob@acme.com', initials: 'BW' },
  { text: 'Alice Chen', secondaryText: 'alice@acme.com', initials: 'AC' },
  { text: 'Tom Lee', secondaryText: 'tom@acme.com', initials: 'TL' },
];

const badgeRows: TableColumnRow[] = [
  { badgeLabel: 'Active', badgeIntent: 'success' },
  { badgeLabel: 'Pending', badgeIntent: 'warning' },
  { badgeLabel: 'Active', badgeIntent: 'success' },
  { badgeLabel: 'Inactive', badgeIntent: 'danger' },
  { badgeLabel: 'Active', badgeIntent: 'success' },
];

const dateRows: TableColumnRow[] = [
  { text: '12 Jan 2026' }, { text: '5 Feb 2026' }, { text: '18 Mar 2026' },
  { text: '3 Apr 2026' }, { text: '22 May 2026' },
];

const numberRows: TableColumnRow[] = [
  { text: '$1,200' }, { text: '$890' }, { text: '$3,450' },
  { text: '$567' }, { text: '$12,000' },
];

const actionsRows: TableColumnRow[] = [{}, {}, {}, {}, {}];

/* ---------------------------------------------------------------------------
   Playground
   --------------------------------------------------------------------------- */

export const Playground: Story = {
  args: {
    showPagination: true,
    totalItems: 500,
    itemsPerPage: 10,
    currentPage: 1,
    totalPages: 10,
    children: null,
  },
  render: (args) => (
    <Table {...args}>
      <div style={{ flex: '0 0 40px' }}>
        <TableColumn type="checkbox" rows={checkboxRows} />
      </div>
      <div style={{ flex: 2 }}>
        <TableColumn type="two-line+avatar" header="User" rows={userRows} sortable />
      </div>
      <div style={{ flex: 1 }}>
        <TableColumn type="badge" header="Status" rows={badgeRows} />
      </div>
      <div style={{ flex: 1 }}>
        <TableColumn type="date" header="Joined" rows={dateRows} sortable />
      </div>
      <div style={{ flex: 1 }}>
        <TableColumn type="number" header="Amount" rows={numberRows} sortable />
      </div>
      <div style={{ flex: '0 0 100px' }}>
        <TableColumn type="actions" rows={actionsRows} />
      </div>
    </Table>
  ),
};

/* ---------------------------------------------------------------------------
   Default — table with top bar, no filters
   --------------------------------------------------------------------------- */

export const Default: Story = {
  args: {
    showPagination: true,
    totalItems: 500,
    itemsPerPage: 10,
    currentPage: 1,
    totalPages: 10,
    children: null,
  },
  render: (args) => (
    <Table
      {...args}
      topBar={
        <TableTopBar
          slotLeft={<SearchInput />}
          slotRight={
            <div style={{ display: 'flex', gap: 'var(--dls-spacing-2)', alignItems: 'center' }}>
              <IconButton label="Options" />
              <ActionButton>Add new</ActionButton>
            </div>
          }
        />
      }
    >
      <div style={{ flex: '0 0 40px' }}>
        <TableColumn type="checkbox" rows={checkboxRows} />
      </div>
      <div style={{ flex: 2 }}>
        <TableColumn type="two-line+avatar" header="User" rows={userRows} sortable />
      </div>
      <div style={{ flex: 1 }}>
        <TableColumn type="badge" header="Status" rows={badgeRows} />
      </div>
      <div style={{ flex: 1 }}>
        <TableColumn type="date" header="Joined" rows={dateRows} sortable />
      </div>
      <div style={{ flex: 1 }}>
        <TableColumn type="number" header="Amount" rows={numberRows} sortable />
      </div>
      <div style={{ flex: '0 0 100px' }}>
        <TableColumn type="actions" rows={actionsRows} />
      </div>
    </Table>
  ),
};

/* ---------------------------------------------------------------------------
   With filters
   --------------------------------------------------------------------------- */

export const WithFilters: Story = {
  args: {
    showPagination: true,
    totalItems: 500,
    itemsPerPage: 10,
    currentPage: 1,
    totalPages: 10,
    children: null,
  },
  render: (args) => (
    <Table
      {...args}
      topBar={
        <TableTopBar
          slotLeft={<SearchInput />}
          slotRight={
            <div style={{ display: 'flex', gap: 'var(--dls-spacing-2)', alignItems: 'center' }}>
              <IconButton label="Options" />
              <ActionButton>Add new</ActionButton>
            </div>
          }
          showFilters
          filters={
            <div style={{ display: 'flex', gap: 'var(--dls-spacing-2)', alignItems: 'center' }}>
              <ChipStub>Status: Active</ChipStub>
              <ChipStub>Role: Admin</ChipStub>
              <ChipStub>Sort: Name ↑</ChipStub>
            </div>
          }
        />
      }
    >
      <div style={{ flex: '0 0 40px' }}>
        <TableColumn type="checkbox" rows={checkboxRows} />
      </div>
      <div style={{ flex: 2 }}>
        <TableColumn type="two-line+avatar" header="User" rows={userRows} sortable />
      </div>
      <div style={{ flex: 1 }}>
        <TableColumn type="badge" header="Status" rows={badgeRows} />
      </div>
      <div style={{ flex: 1 }}>
        <TableColumn type="date" header="Joined" rows={dateRows} sortable />
      </div>
      <div style={{ flex: 1 }}>
        <TableColumn type="number" header="Amount" rows={numberRows} sortable />
      </div>
      <div style={{ flex: '0 0 100px' }}>
        <TableColumn type="actions" rows={actionsRows} />
      </div>
    </Table>
  ),
};

/* ---------------------------------------------------------------------------
   Without pagination
   --------------------------------------------------------------------------- */

export const NoPagination: Story = {
  args: {
    showPagination: false,
    children: null,
  },
  render: (args) => (
    <Table
      {...args}
      topBar={
        <TableTopBar
          slotLeft={<SearchInput />}
          slotRight={<ActionButton>Export</ActionButton>}
        />
      }
    >
      <div style={{ flex: '0 0 40px' }}>
        <TableColumn type="checkbox" rows={checkboxRows} />
      </div>
      <div style={{ flex: 2 }}>
        <TableColumn type="text" header="Name" rows={userRows.map(r => ({ text: r.text }))} sortable />
      </div>
      <div style={{ flex: 1 }}>
        <TableColumn type="badge" header="Status" rows={badgeRows} />
      </div>
      <div style={{ flex: 1 }}>
        <TableColumn type="number" header="Amount" rows={numberRows} sortable />
      </div>
    </Table>
  ),
};

/* ---------------------------------------------------------------------------
   Interactive pagination
   --------------------------------------------------------------------------- */

export const InteractivePagination: Story = {
  args: {
    showPagination: true,
    totalItems: 500,
    itemsPerPage: 10,
    currentPage: 1,
    totalPages: 50,
    children: null,
  },
  render: () => {
    const [page, setPage] = React.useState(1);
    const [perPage, setPerPage] = React.useState(10);
    const total = 500;
    const totalPages = Math.ceil(total / perPage);

    return (
      <Table
        showPagination
        totalItems={total}
        itemsPerPage={perPage}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onItemsPerPageChange={(n) => { setPerPage(n); setPage(1); }}
        topBar={
          <TableTopBar
            slotLeft={<SearchInput />}
            slotRight={<ActionButton>Add new</ActionButton>}
          />
        }
      >
        <div style={{ flex: '0 0 40px' }}>
          <TableColumn type="checkbox" rows={checkboxRows} />
        </div>
        <div style={{ flex: 2 }}>
          <TableColumn type="two-line+avatar" header="User" rows={userRows} sortable />
        </div>
        <div style={{ flex: 1 }}>
          <TableColumn type="badge" header="Status" rows={badgeRows} />
        </div>
        <div style={{ flex: 1 }}>
          <TableColumn type="date" header="Joined" rows={dateRows} sortable />
        </div>
        <div style={{ flex: 1 }}>
          <TableColumn type="number" header="Amount" rows={numberRows} sortable />
        </div>
        <div style={{ flex: '0 0 100px' }}>
          <TableColumn type="actions" rows={actionsRows} />
        </div>
      </Table>
    );
  },
};

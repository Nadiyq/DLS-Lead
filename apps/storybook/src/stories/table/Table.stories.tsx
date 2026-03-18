import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Table } from './Table';
import { TableTopBar } from '../table-top-bar/TableTopBar';
import { TableColumn } from '../table-column/TableColumn';
import type { TableColumnRow } from '../table-column/TableColumn';
import { Button } from '../Button';
import { InputField } from '../input-field/InputField';
import { Filters } from '../filters/Filters';
import { ChipFilter } from '../chip/ChipFilter';

const meta = {
  title: 'Templates/Table',
  component: Table,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
   Helpers
   --------------------------------------------------------------------------- */

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.33" />
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="3" r="1" fill="currentColor" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <circle cx="8" cy="13" r="1" fill="currentColor" />
  </svg>
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
    columns: '40px 2fr 1fr 1fr 1fr 100px',
    rowCount: 5,
    children: null,
  },
  render: (args) => (
    <Table {...args}>
      <TableColumn type="checkbox" rows={checkboxRows} />
      <TableColumn type="two-line+avatar" header="User" rows={userRows} sortable />
      <TableColumn type="badge" header="Status" rows={badgeRows} />
      <TableColumn type="date" header="Joined" rows={dateRows} sortable />
      <TableColumn type="number" header="Amount" rows={numberRows} sortable />
      <TableColumn type="actions" rows={actionsRows} />
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
    columns: '40px 2fr 1fr 1fr 1fr 100px',
    rowCount: 5,
    children: null,
  },
  render: (args) => (
    <Table
      {...args}
      topBar={
        <TableTopBar
          slotLeft={<InputField placeholder="Search..." iconStart={<SearchIcon />} />}
          slotRight={
            <div style={{ display: 'flex', gap: 'var(--dls-spacing-2)', alignItems: 'center' }}>
              <Button variant="ghost" intent="neutral" size="m" icon={<MoreIcon />} iconOnly aria-label="Options" />
              <Button variant="filled" intent="neutral" size="m">Add new</Button>
            </div>
          }
        />
      }
    >
      <TableColumn type="checkbox" rows={checkboxRows} />
      <TableColumn type="two-line+avatar" header="User" rows={userRows} sortable />
      <TableColumn type="badge" header="Status" rows={badgeRows} />
      <TableColumn type="date" header="Joined" rows={dateRows} sortable />
      <TableColumn type="number" header="Amount" rows={numberRows} sortable />
      <TableColumn type="actions" rows={actionsRows} />
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
    columns: '40px 2fr 1fr 1fr 1fr 100px',
    rowCount: 5,
    children: null,
  },
  render: (args) => (
    <Table
      {...args}
      topBar={
        <TableTopBar
          slotLeft={<InputField placeholder="Search..." iconStart={<SearchIcon />} />}
          slotRight={
            <div style={{ display: 'flex', gap: 'var(--dls-spacing-2)', alignItems: 'center' }}>
              <Button variant="ghost" intent="neutral" size="m" icon={<MoreIcon />} iconOnly aria-label="Options" />
              <Button variant="filled" intent="neutral" size="m">Add new</Button>
            </div>
          }
          showFilters
          filters={
            <Filters
              size="m"
              groups={[
                {
                  id: 'status',
                  children: (
                    <ChipFilter
                      segments={[{ label: 'Status' }, { label: 'Active' }]}
                      active
                      size="m"
                    />
                  ),
                },
                {
                  id: 'role',
                  children: (
                    <ChipFilter
                      segments={[{ label: 'Role' }, { label: 'Admin' }]}
                      active
                      size="m"
                    />
                  ),
                },
                {
                  id: 'sort',
                  children: (
                    <ChipFilter
                      segments={[{ label: 'Sort' }, { label: 'Name ↑' }]}
                      active
                      size="m"
                    />
                  ),
                },
              ]}
            />
          }
        />
      }
    >
      <TableColumn type="checkbox" rows={checkboxRows} />
      <TableColumn type="two-line+avatar" header="User" rows={userRows} sortable />
      <TableColumn type="badge" header="Status" rows={badgeRows} />
      <TableColumn type="date" header="Joined" rows={dateRows} sortable />
      <TableColumn type="number" header="Amount" rows={numberRows} sortable />
      <TableColumn type="actions" rows={actionsRows} />
    </Table>
  ),
};

/* ---------------------------------------------------------------------------
   Without pagination
   --------------------------------------------------------------------------- */

export const NoPagination: Story = {
  args: {
    showPagination: false,
    columns: '40px 2fr 1fr 1fr',
    rowCount: 5,
    children: null,
  },
  render: (args) => (
    <Table
      {...args}
      topBar={
        <TableTopBar
          slotLeft={<InputField placeholder="Search..." iconStart={<SearchIcon />} />}
          slotRight={<Button variant="filled" intent="neutral" size="m">Export</Button>}
        />
      }
    >
      <TableColumn type="checkbox" rows={checkboxRows} />
      <TableColumn type="text" header="Name" rows={userRows.map(r => ({ text: r.text }))} sortable />
      <TableColumn type="badge" header="Status" rows={badgeRows} />
      <TableColumn type="number" header="Amount" rows={numberRows} sortable />
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
    columns: '40px 2fr 1fr 1fr 1fr 100px',
    rowCount: 5,
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
        columns="40px 2fr 1fr 1fr 1fr 100px"
        rowCount={5}
        topBar={
          <TableTopBar
            slotLeft={<InputField placeholder="Search..." iconStart={<SearchIcon />} />}
            slotRight={<Button variant="filled" intent="neutral" size="m">Add new</Button>}
          />
        }
      >
        <TableColumn type="checkbox" rows={checkboxRows} />
        <TableColumn type="two-line+avatar" header="User" rows={userRows} sortable />
        <TableColumn type="badge" header="Status" rows={badgeRows} />
        <TableColumn type="date" header="Joined" rows={dateRows} sortable />
        <TableColumn type="number" header="Amount" rows={numberRows} sortable />
        <TableColumn type="actions" rows={actionsRows} />
      </Table>
    );
  },
};

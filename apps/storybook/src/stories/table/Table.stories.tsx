import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Search as SearchIcon, Filter as FilterIcon, MoreHorizontal as MoreIcon, Plus as PlusIcon } from 'lucide-react';
import { Table } from './Table';
import { TableTopBar } from '../table-top-bar/TableTopBar';
import { TableColumn } from '../table-column/TableColumn';
import type { TableColumnRow } from '../table-column/TableColumn';
import { Button } from '../Button';
import { InputField } from '../input-field/InputField';
import { Filters } from '../filters/Filters';
import { FilterChip } from '../filter-chip/FilterChip';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    // Heavy stories (Filters with deeply nested FilterChip composition) crash
    // Storybook's auto-generated source serializer with `RangeError: Invalid
    // string length`. Disable source autogen for the meta — individual stories
    // can opt back in if needed.
    docs: { source: { type: 'code', code: '' } },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

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
    <Table
      {...args}
      topBar={
        <TableTopBar
          slotLeft={
            <>
              <div style={{ width: 320 }}>
                <InputField placeholder="Search..." iconStart={<SearchIcon />} />
              </div>
              <Button variant="soft" intent="neutral" size="m" icon={<FilterIcon />} iconOnly aria-label="Filter" />
            </>
          }
          slotRight={
            <>
              <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Button</Button>
              <Button variant="soft" intent="neutral" size="m" icon={<MoreIcon />} iconOnly aria-label="More" />
            </>
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
  parameters: {
    docs: { source: { code: '' } },
  },
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
                    <FilterChip
                      label="Status"
                      isVisible
                      size="m"
                      valueSummary={<span className="dls-filter-chip__value-text">Active</span>}
                    />
                  ),
                },
                {
                  id: 'role',
                  children: (
                    <FilterChip
                      label="Role"
                      isVisible
                      size="m"
                      valueSummary={<span className="dls-filter-chip__value-text">Admin</span>}
                    />
                  ),
                },
                {
                  id: 'sort',
                  children: (
                    <FilterChip
                      label="Sort"
                      isVisible
                      size="m"
                      valueSummary={<span className="dls-filter-chip__value-text">Name ↑</span>}
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

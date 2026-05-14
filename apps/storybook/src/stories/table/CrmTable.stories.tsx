import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  Pencil as PencilIcon,
  Trash2 as TrashIcon,
} from 'lucide-react';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../card/Card';
import { Checkbox } from '../checkbox/Checkbox';
import { SAMPLE_USERS } from '../_fixtures';
import { Tabs } from '../tabs/Tabs';
import { Table } from './Table';
import { TableCell } from '../table-cell/TableCell';
import {
  InteractiveDataTable,
  type DataTableColumn,
  type DataTableMobileConfig,
  renderStatusBadge,
} from './interactive-data-table.story-helpers';

type ContactStatus = 'Active' | 'Pending' | 'Inactive' | 'Churned';

interface Contact {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarSrc?: string;
  company: string;
  status: ContactStatus;
  statusIntent: 'success' | 'info' | 'neutral' | 'danger';
  deal: string;
  dealValue: number;
  lastActivity: string;
  lastActivityRank: number;
}

const COMPANIES = [
  'Acme Corp',
  'Globex Inc',
  'Initech',
  'Umbrella Co',
  'Stark Industries',
  'Wayne Ent',
  'Hooli',
  'Pied Piper',
  'Soylent Corp',
  'Cyberdyne',
];

const STATUSES: Array<{ label: ContactStatus; intent: Contact['statusIntent'] }> = [
  { label: 'Active', intent: 'success' },
  { label: 'Pending', intent: 'info' },
  { label: 'Inactive', intent: 'neutral' },
  { label: 'Churned', intent: 'danger' },
];

const DEAL_VALUES = [12400, 8900, 3200, 45000, 1800, 22500, 67000, 5600, 31000, 9750];
const LAST_ACTIVITY = ['2 hours ago', 'Yesterday', '3 days ago', '1 week ago', '2 weeks ago', 'Jan 15', 'Feb 3', 'Mar 22', 'Apr 10', 'May 1'];

const formatDeal = (value: number) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
}).format(value);

const CONTACTS: Contact[] = SAMPLE_USERS.slice(0, 10).map((user, index) => {
  const status = STATUSES[index % STATUSES.length];
  const dealValue = DEAL_VALUES[index];

  return {
    id: `contact-${index + 1}`,
    name: user.name,
    email: user.email,
    initials: user.initials,
    avatarSrc: user.src,
    company: COMPANIES[index],
    status: status.label,
    statusIntent: status.intent,
    deal: formatDeal(dealValue),
    dealValue,
    lastActivity: LAST_ACTIVITY[index],
    lastActivityRank: index,
  };
});

const crmActions = (row: Contact, pinned: { className?: string; style?: React.CSSProperties }) => (
  <TableCell key="actions" type="actions" align="center" className={pinned.className} style={pinned.style}>
    <span className="dls-table-column__actions">
      <Button variant="ghost" intent="neutral" size="m" icon={<PencilIcon />} iconOnly aria-label={`Edit ${row.name}`} />
      <Button variant="ghost" intent="neutral" size="m" icon={<TrashIcon />} iconOnly aria-label={`Delete ${row.name}`} />
    </span>
  </TableCell>
);

const selectColumn: DataTableColumn<Contact> = {
  id: 'select',
  label: 'Select',
  width: 48,
  minWidth: 48,
  sortable: false,
  filterable: false,
  resizable: false,
  hideable: false,
  pinned: true,
  getValue: () => '',
  renderCell: (row, context, pinned) => (
    <TableCell key="select" type="slot" align="center" className={pinned.className} style={pinned.style}>
      <Checkbox
        checked={context.selected}
        aria-label={`Select ${row.name}`}
        onChange={context.toggleSelected}
      />
    </TableCell>
  ),
};

const crmColumns: DataTableColumn<Contact>[] = [
  selectColumn,
  {
    id: 'contact',
    label: 'Contact',
    width: 280,
    minWidth: 220,
    pinned: true,
    sortable: true,
    filterable: true,
    getValue: (row) => row.name,
    getSortValue: (row) => row.name,
    getFilterValue: (row) => row.name,
    getSearchValue: (row) => `${row.name} ${row.email}`,
    renderCell: (row, _context, pinned) => (
      <TableCell
        key="contact"
        type="two-line"
        text={row.name}
        secondaryText={row.email}
        className={pinned.className}
        style={pinned.style}
        slotLeft={<Avatar size="24" circle src={row.avatarSrc} initials={row.initials} />}
      />
    ),
  },
  {
    id: 'company',
    label: 'Company',
    width: 180,
    minWidth: 144,
    sortable: true,
    filterable: true,
    getValue: (row) => row.company,
    getSortValue: (row) => row.company,
    getFilterValue: (row) => row.company,
  },
  {
    id: 'status',
    label: 'Status',
    width: 140,
    minWidth: 112,
    sortable: true,
    filterable: true,
    getValue: (row) => row.status,
    getSortValue: (row) => row.status,
    getFilterValue: (row) => row.status,
    renderCell: (row, _context, pinned) => (
      <TableCell key="status" type="badge" className={pinned.className} style={pinned.style}>
        {renderStatusBadge(row.status, row.statusIntent)}
      </TableCell>
    ),
    renderMobileValue: (row) => renderStatusBadge(row.status, row.statusIntent),
  },
  {
    id: 'deal',
    label: 'Deal value',
    width: 144,
    minWidth: 120,
    align: 'right',
    sortable: true,
    filterable: true,
    getValue: (row) => row.deal,
    getSortValue: (row) => row.dealValue,
    getFilterValue: (row) => row.deal,
  },
  {
    id: 'lastActivity',
    label: 'Last activity',
    width: 160,
    minWidth: 128,
    sortable: true,
    filterable: true,
    getValue: (row) => row.lastActivity,
    getSortValue: (row) => row.lastActivityRank,
    getFilterValue: (row) => row.lastActivity,
  },
  {
    id: 'actions',
    label: 'Actions',
    width: 112,
    minWidth: 96,
    align: 'center',
    sortable: false,
    filterable: false,
    resizable: false,
    hideable: false,
    getValue: () => 'Actions',
    renderCell: (row, _context, pinned) => crmActions(row, pinned),
  },
];

const singleLineCrmColumns: DataTableColumn<Contact>[] = [
  selectColumn,
  {
    id: 'name',
    label: 'Name',
    width: 200,
    minWidth: 160,
    pinned: true,
    sortable: true,
    filterable: true,
    getValue: (row) => row.name,
    getSortValue: (row) => row.name,
    getFilterValue: (row) => row.name,
    getSearchValue: (row) => `${row.name} ${row.email}`,
  },
  {
    id: 'email',
    label: 'Email',
    width: 240,
    minWidth: 180,
    sortable: true,
    filterable: true,
    getValue: (row) => row.email,
    getSortValue: (row) => row.email,
    getFilterValue: (row) => row.email,
  },
  {
    id: 'company',
    label: 'Company',
    width: 180,
    minWidth: 144,
    sortable: true,
    filterable: true,
    getValue: (row) => row.company,
    getSortValue: (row) => row.company,
    getFilterValue: (row) => row.company,
  },
  crmColumns[3],
  crmColumns[4],
  crmColumns[6],
];

const createContact = (rows: Contact[]): Contact => {
  const next = rows.length + 1;
  const user = SAMPLE_USERS[next % SAMPLE_USERS.length];

  return {
    id: `contact-${next}`,
    name: `New contact ${next}`,
    email: `new.contact${next}@example.com`,
    initials: user?.initials ?? 'NC',
    avatarSrc: user?.src,
    company: 'New account',
    status: 'Pending',
    statusIntent: 'info',
    deal: formatDeal(0),
    dealValue: 0,
    lastActivity: 'Just now',
    lastActivityRank: -1,
  };
};

interface CrmTableStoryProps {
  rows?: Contact[];
  columns?: DataTableColumn<Contact>[];
  mobile?: DataTableMobileConfig;
  initialSearch?: string;
  initialShowFilters?: boolean;
  initialFilters?: Array<{ id: string; values: string[]; isVisible?: boolean }>;
  showPagination?: boolean;
  rowPredicate?: (row: Contact) => boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

const CrmTableStory = ({
  rows = CONTACTS,
  columns = crmColumns,
  mobile = {
    primaryColumnId: 'contact',
    secondaryColumnId: 'deal',
    supportingColumnIds: ['status', 'lastActivity'],
    actionsColumnId: 'actions',
  },
  initialSearch,
  initialShowFilters = false,
  initialFilters,
  showPagination = true,
  rowPredicate,
  emptyTitle = 'No contacts found',
  emptyDescription = 'Adjust search, filters, or column visibility.',
}: CrmTableStoryProps) => (
  <InteractiveDataTable
    rows={rows}
    columns={columns}
    getRowId={(row) => row.id}
    mobile={mobile}
    primaryActionLabel="Add contact"
    createRow={createContact}
    initialSearch={initialSearch}
    initialShowFilters={initialShowFilters}
    initialFilters={initialFilters}
    showPagination={showPagination}
    rowPredicate={rowPredicate}
    emptyState={
      <div className="dls-table__empty-stack">
        <span className="dls-table__empty-title">{emptyTitle}</span>
        <span className="dls-table__empty-description">{emptyDescription}</span>
      </div>
    }
  />
);

const statusCounts = (status: ContactStatus) => CONTACTS.filter((contact) => contact.status === status).length;

const statusTabs = [
  { value: 'all', label: 'All contacts', count: CONTACTS.length, intent: 'neutral' as const },
  { value: 'active', label: 'Active', count: statusCounts('Active'), intent: 'success' as const },
  { value: 'pending', label: 'Pending', count: statusCounts('Pending'), intent: 'info' as const },
  { value: 'inactive', label: 'Inactive', count: statusCounts('Inactive'), intent: 'neutral' as const },
  { value: 'churned', label: 'Churned', count: statusCounts('Churned'), intent: 'danger' as const },
];

const summaryCards = statusTabs.filter((tab) => tab.value !== 'all');

const meta = {
  title: 'Patterns/CRM Data Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      source: { type: 'code', code: '' },
      description: {
        component:
          'Best-practice data table composition for CRM and operational screens. Demonstrates a working top bar, filters, sorting, column actions, column management, resizing, pinning, horizontal scroll, mobile row cards, tabs, summary filters, pagination, and empty states.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullCrmTable: Story = {
  name: 'Full CRM Table',
  args: { children: null },
  render: () => {
    const [tab, setTab] = React.useState('all');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dls-spacing-4)', alignItems: 'stretch' }}>
        <Tabs
          type="pill"
          value={tab}
          onChange={setTab}
          items={statusTabs.map((item) => ({
            value: item.value,
            label: item.label,
            slotContent: <Badge variant="soft" intent={item.intent} size="xs">{item.count}</Badge>,
          }))}
        />
        <CrmTableStory
          initialShowFilters
          rowPredicate={(row) => tab === 'all' || row.status.toLowerCase() === tab}
        />
      </div>
    );
  },
};

export const WithSummaryCards: Story = {
  name: 'With Summary Cards',
  args: { children: null },
  render: () => {
    const [activeCard, setActiveCard] = React.useState<string | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dls-spacing-4)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--dls-spacing-3)' }}>
          {summaryCards.map((summary) => (
            <button
              key={summary.value}
              type="button"
              aria-pressed={activeCard === summary.value}
              onClick={() => setActiveCard(activeCard === summary.value ? null : summary.value)}
              style={{
                all: 'unset',
                display: 'block',
                cursor: 'pointer',
              }}
            >
              <Card
                type={activeCard === summary.value ? 'regular' : 'outline'}
                title={String(summary.count)}
                description={summary.label}
                headerContent={<Badge variant="ghost" intent={summary.intent} size="xs">{summary.label}</Badge>}
              />
            </button>
          ))}
        </div>
        <CrmTableStory
          rowPredicate={(row) => !activeCard || row.status.toLowerCase() === activeCard}
        />
      </div>
    );
  },
};

export const Minimal: Story = {
  name: 'Minimal Table',
  args: { children: null },
  render: () => (
    <CrmTableStory
      columns={crmColumns.filter((column) => !['select', 'lastActivity'].includes(column.id))}
      mobile={{
        primaryColumnId: 'contact',
        secondaryColumnId: 'deal',
        supportingColumnIds: ['status', 'company'],
        actionsColumnId: 'actions',
      }}
    />
  ),
};

export const SingleLineRows: Story = {
  name: 'Single-Line Rows',
  args: { children: null },
  render: () => (
    <CrmTableStory
      columns={singleLineCrmColumns}
      mobile={{
        primaryColumnId: 'name',
        secondaryColumnId: 'deal',
        supportingColumnIds: ['status', 'company'],
        actionsColumnId: 'actions',
      }}
    />
  ),
};

export const FilteredState: Story = {
  name: 'Filtered State',
  args: { children: null },
  render: () => (
    <CrmTableStory
      initialShowFilters
      initialFilters={[{ id: 'status', values: ['Active'] }]}
    />
  ),
};

export const EmptySearchResults: Story = {
  name: 'Empty Search Results',
  args: { children: null },
  render: () => (
    <CrmTableStory
      initialSearch="zzzznotfound"
      initialShowFilters
      showPagination={false}
      emptyTitle="No results found"
      emptyDescription="No contacts match the current search and filters."
    />
  ),
};

export const EmptyNoData: Story = {
  name: 'Empty — No Data',
  args: { children: null },
  render: () => (
    <CrmTableStory
      rows={[]}
      showPagination={false}
      emptyTitle="No contacts yet"
      emptyDescription="Add your first contact to get started."
    />
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  Plus as PlusIcon,
  MoreHorizontal as MoreIcon,
  Filter as FilterIcon,
  Columns3 as Columns3Icon,
  Download as DownloadIcon,
  ChevronRight as ChevronRightIcon,
  ArrowDown as ArrowDownIcon,
  X as XIcon,
} from 'lucide-react';
import { Table } from './Table';
import { TableTopBar } from '../table-top-bar/TableTopBar';
import { TableColumn } from '../table-column/TableColumn';
import { Button } from '../Button';
import { SearchField } from '../search-field/SearchField';
import { Filters } from '../filters/Filters';
import { FilterChip } from '../filter-chip/FilterChip';
import { DropdownSorting } from '../dropdown-sorting/DropdownSorting';
import { DropdownColumns } from '../dropdown-columns/DropdownColumns';
import { DropdownFilters } from '../dropdown-filters/DropdownFilters';
import { DropdownExport } from '../dropdown-export/DropdownExport';
import { DropdownOptions } from '../dropdown-options/DropdownOptions';
import { Tabs } from '../tabs/Tabs';
import { Badge } from '../Badge';
import { Card } from '../card/Card';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';
import { Checkbox } from '../checkbox/Checkbox';
import { SAMPLE_USERS, FILTER_STATUS_OPTIONS } from '../_fixtures';
import type { TableColumnRow } from '../table-column/TableColumn';

/* ---------------------------------------------------------------------------
   Fixture data — 10-row CRM contacts dataset
   --------------------------------------------------------------------------- */

type ContactStatus = 'Active' | 'Pending' | 'Inactive' | 'Churned';

interface Contact {
  name: string;
  email: string;
  initials: string;
  avatarSrc: string;
  company: string;
  status: ContactStatus;
  statusIntent: 'success' | 'info' | 'neutral' | 'danger';
  deal: string;
  lastActivity: string;
}

const COMPANIES = ['Acme Corp', 'Globex Inc', 'Initech', 'Umbrella Co', 'Stark Industries', 'Wayne Ent', 'Hooli', 'Pied Piper', 'Soylent Corp', 'Cyberdyne'];

const CONTACTS: Contact[] = SAMPLE_USERS.slice(0, 10).map((u, i) => {
  const statuses: { label: ContactStatus; intent: Contact['statusIntent'] }[] = [
    { label: 'Active', intent: 'success' },
    { label: 'Pending', intent: 'info' },
    { label: 'Inactive', intent: 'neutral' },
    { label: 'Churned', intent: 'danger' },
  ];
  const s = statuses[i % statuses.length];
  const deals = ['$12,400', '$8,900', '$3,200', '$45,000', '$1,800', '$22,500', '$67,000', '$5,600', '$31,000', '$9,750'];
  const dates = ['2 hours ago', 'Yesterday', '3 days ago', '1 week ago', '2 weeks ago', 'Jan 15', 'Feb 3', 'Mar 22', 'Apr 10', 'May 1'];
  return {
    name: u.name,
    email: u.email,
    initials: u.initials,
    avatarSrc: u.src,
    company: COMPANIES[i],
    status: s.label,
    statusIntent: s.intent,
    deal: deals[i],
    lastActivity: dates[i],
  };
});

const UNIQUE_COMPANIES = [...new Set(CONTACTS.map((c) => c.company))];

const toRows = (contacts: Contact[]) => ({
  checkbox: contacts.map(() => ({ checked: false })) as TableColumnRow[],
  contact: contacts.map((c) => ({
    text: c.name,
    secondaryText: c.email,
    initials: c.initials,
    avatarSrc: c.avatarSrc,
  })) as TableColumnRow[],
  company: contacts.map((c) => ({ text: c.company })) as TableColumnRow[],
  status: contacts.map((c) => ({
    badgeLabel: c.status,
    badgeIntent: c.statusIntent,
  })) as TableColumnRow[],
  deal: contacts.map((c) => ({ text: c.deal })) as TableColumnRow[],
  lastActivity: contacts.map((c) => ({ text: c.lastActivity })) as TableColumnRow[],
  actions: contacts.map(() => ({})) as TableColumnRow[],
});

/* ---------------------------------------------------------------------------
   Shared filter components — reusable across stories
   --------------------------------------------------------------------------- */

const StatusFilterChip = ({ selected, onToggle }: {
  selected: string[];
  onToggle: (status: string) => void;
}) => {
  const summaryText = selected.length === 0
    ? 'All'
    : selected.length === 1
      ? selected[0]
      : `${selected.length} selected`;

  return (
    <FilterChip
      label="Status"
      isVisible
      size="m"
      valueSummary={<span className="dls-filter-chip__value-text">{summaryText}</span>}
    >
      <List className="dls-filter-chip__enum-list">
        {FILTER_STATUS_OPTIONS.map((opt) => (
          <ListItem
            key={opt}
            type="with-slots"
            text={opt}
            interactive={false}
            slotLeft={<Checkbox checked={selected.includes(opt)} onChange={() => onToggle(opt)} />}
            onClick={() => onToggle(opt)}
          />
        ))}
      </List>
    </FilterChip>
  );
};

const CompanyFilterChip = ({ selected, onToggle }: {
  selected: string[];
  onToggle: (company: string) => void;
}) => {
  const summaryText = selected.length === 0
    ? 'All'
    : selected.length === 1
      ? selected[0]
      : `${selected.length} selected`;

  return (
    <FilterChip
      label="Company"
      isVisible
      size="m"
      valueSummary={<span className="dls-filter-chip__value-text">{summaryText}</span>}
    >
      <List className="dls-filter-chip__enum-list">
        {UNIQUE_COMPANIES.map((c) => (
          <ListItem
            key={c}
            type="with-slots"
            text={c}
            interactive={false}
            slotLeft={<Checkbox checked={selected.includes(c)} onChange={() => onToggle(c)} />}
            onClick={() => onToggle(c)}
          />
        ))}
      </List>
    </FilterChip>
  );
};

/* ---------------------------------------------------------------------------
   Sort chip — uses FilterChip visually but drives sorting, not filtering.
   Separated from filter chips by a Filters group divider per Figma spec.
   --------------------------------------------------------------------------- */

const SORTABLE_COLUMNS = [
  { value: 'name', label: 'Name' },
  { value: 'company', label: 'Company' },
  { value: 'deal', label: 'Deal value' },
  { value: 'lastActivity', label: 'Last activity' },
];

const SortChip = ({ column, direction, onColumnChange, onDirectionChange }: {
  column: string;
  direction: 'ascending' | 'descending';
  onColumnChange: (v: string) => void;
  onDirectionChange: (v: 'ascending' | 'descending') => void;
}) => {
  const columnLabel = SORTABLE_COLUMNS.find((c) => c.value === column)?.label ?? column;

  return (
    <FilterChip
      label="Sort"
      labelIcon={<ArrowDownIcon />}
      isVisible
      size="m"
      valueSummary={<span className="dls-filter-chip__value-text">{columnLabel}</span>}
    >
      <DropdownSorting
        columns={SORTABLE_COLUMNS}
        column={column}
        direction={direction}
        onColumnChange={onColumnChange}
        onDirectionChange={onDirectionChange}
      />
    </FilterChip>
  );
};

/* ---------------------------------------------------------------------------
   Shared — OptionsMenu with drill-in sub-menus
   --------------------------------------------------------------------------- */

const crmShown = [
  { id: 'contact', label: 'Contact' },
  { id: 'company', label: 'Company', pinned: true },
  { id: 'status', label: 'Status' },
];

const crmHidden = [
  { id: 'deal', label: 'Deal value' },
  { id: 'lastActivity', label: 'Last activity' },
];

type SubMenu = 'root' | 'columns' | 'filters' | 'export';

interface CrmOptionsMenuProps {
  filtersPanel?: React.ReactNode;
}

const CrmOptionsMenu = ({ filtersPanel }: CrmOptionsMenuProps = {}) => {
  const [menu, setMenu] = React.useState<SubMenu>('root');

  const rootMenu = (
    <List>
      <ListItem type="label" text="Customize" />
      <ListItem
        type="with-slots"
        text="Columns"
        iconStart={<Columns3Icon />}
        iconEnd={<ChevronRightIcon />}
        onClick={() => setMenu('columns')}
      />
      <ListItem
        type="with-slots"
        text="Filters"
        iconStart={<FilterIcon />}
        iconEnd={<ChevronRightIcon />}
        onClick={() => setMenu('filters')}
      />
      <ListItem type="divider" />
      <ListItem
        type="with-slots"
        text="Export"
        iconStart={<DownloadIcon />}
        iconEnd={<ChevronRightIcon />}
        onClick={() => setMenu('export')}
      />
    </List>
  );

  let submenu: React.ReactNode = null;
  if (menu === 'columns') {
    submenu = (
      <DropdownColumns
        shown={crmShown}
        hidden={crmHidden}
        onApply={() => setMenu('root')}
        onCancel={() => setMenu('root')}
      />
    );
  } else if (menu === 'filters') {
    submenu = filtersPanel ?? (
      <DropdownFilters>
        <FilterChip label="Status" isVisible size="s" valueSummary={<span className="dls-filter-chip__value-text">All</span>}>
          <List className="dls-filter-chip__enum-list">
            {FILTER_STATUS_OPTIONS.map(opt => (
              <ListItem key={opt} type="with-slots" text={opt} interactive={false} slotLeft={<Checkbox checked={false} onChange={() => {}} />} />
            ))}
          </List>
        </FilterChip>
      </DropdownFilters>
    );
  } else if (menu === 'export') {
    submenu = <DropdownExport />;
  }

  return (
    <DropdownOptions triggerIcon={<MoreIcon />} triggerLabel="Options">
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--dls-spacing-2)' }}>
        {rootMenu}
        {submenu}
      </div>
    </DropdownOptions>
  );
};

/* ---------------------------------------------------------------------------
   Storybook meta
   --------------------------------------------------------------------------- */

const meta = {
  title: 'Patterns/CRM Data Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      source: { type: 'code', code: '' },
      description: {
        component:
          'Best-practice data table composition for CRM and operational screens. ' +
          'Demonstrates search, filtering, sorting, column management, single-line rows, ' +
          'status badges, tabs, summary cards, pagination, and empty states — all built from ' +
          'existing DLS components with no custom markup. See `specs/patterns/data-table.md` for the full pattern spec.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
   1. Full CRM Table — the "golden" example
   --------------------------------------------------------------------------- */

export const FullCrmTable: Story = {
  name: 'Full CRM Table',
  args: { children: null },
  render: () => {
    const [search, setSearch] = React.useState('');
    const [tab, setTab] = React.useState('all');
    const [page, setPage] = React.useState(1);
    const [perPage, setPerPage] = React.useState(10);
    const [showFilters, setShowFilters] = React.useState(true);
    const [sortColumn, setSortColumn] = React.useState('name');
    const [sortDirection, setSortDirection] = React.useState<'ascending' | 'descending'>('ascending');
    const [statusFilter, setStatusFilter] = React.useState<string[]>(['Active']);
    const [companyFilter, setCompanyFilter] = React.useState<string[]>(['Acme Corp']);

    const toggleStatus = (s: string) =>
      setStatusFilter((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
    const toggleCompany = (c: string) =>
      setCompanyFilter((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);

    const filtered = CONTACTS.filter((c) => {
      if (tab !== 'all' && c.status.toLowerCase() !== tab) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.email.toLowerCase().includes(search.toLowerCase()) && !c.company.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    const rows = toRows(filtered);
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dls-spacing-4)', alignItems: 'flex-start' }}>
        <Tabs
          type="pill"
          value={tab}
          onChange={(v) => { setTab(v); setPage(1); }}
          items={[
            { value: 'all', label: 'All contacts', slotContent: <Badge variant="soft" intent="neutral" size="xs">{CONTACTS.length}</Badge> },
            { value: 'active', label: 'Active', slotContent: <Badge variant="soft" intent="success" size="xs">{CONTACTS.filter(c => c.status === 'Active').length}</Badge> },
            { value: 'pending', label: 'Pending', slotContent: <Badge variant="soft" intent="info" size="xs">{CONTACTS.filter(c => c.status === 'Pending').length}</Badge> },
            { value: 'inactive', label: 'Inactive', slotContent: <Badge variant="soft" intent="neutral" size="xs">{CONTACTS.filter(c => c.status === 'Inactive').length}</Badge> },
            { value: 'churned', label: 'Churned', slotContent: <Badge variant="soft" intent="danger" size="xs">{CONTACTS.filter(c => c.status === 'Churned').length}</Badge> },
          ]}
        />

        <Table
          showPagination
          totalItems={filtered.length}
          itemsPerPage={perPage}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onItemsPerPageChange={(n) => { setPerPage(n); setPage(1); }}
          columns="40px 2fr 1fr 100px 100px 120px 80px"
          rowCount={filtered.length}
          topBar={
            <TableTopBar
              slotLeft={
                <>
                  <SearchField
                    placeholder="Search contacts..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    onClear={() => { setSearch(''); setPage(1); }}
                  />
                  <Button
                    variant="ghost"
                    intent="neutral"
                    size="m"
                    icon={<FilterIcon />}
                    iconOnly
                    aria-label="Toggle filters"
                    onClick={() => setShowFilters(!showFilters)}
                  />
                </>
              }
              slotRight={
                <>
                  <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Add contact</Button>
                  <CrmOptionsMenu />
                </>
              }
              showFilters={showFilters}
              filters={
                <Filters
                  size="m"
                  groups={[
                    {
                      id: 'sort',
                      children: (
                        <SortChip
                          column={sortColumn}
                          direction={sortDirection}
                          onColumnChange={setSortColumn}
                          onDirectionChange={setSortDirection}
                        />
                      ),
                    },
                    {
                      id: 'status',
                      children: <StatusFilterChip selected={statusFilter} onToggle={toggleStatus} />,
                    },
                    {
                      id: 'company',
                      children: <CompanyFilterChip selected={companyFilter} onToggle={toggleCompany} />,
                    },
                  ]}
                  showAdd
                  onAdd={() => {}}
                />
              }
            />
          }
        >
          <TableColumn type="checkbox" rows={rows.checkbox} />
          <TableColumn type="two-line+avatar" header="Contact" rows={rows.contact} sortable />
          <TableColumn type="text" header="Company" rows={rows.company} sortable />
          <TableColumn type="badge" header="Status" rows={rows.status} />
          <TableColumn type="number" header="Deal value" rows={rows.deal} sortable />
          <TableColumn type="text" header="Last activity" rows={rows.lastActivity} sortable />
          <TableColumn type="actions" rows={rows.actions} />
        </Table>
      </div>
    );
  },
};

/* ---------------------------------------------------------------------------
   2. With Summary Cards — cards act as clickable filters
   --------------------------------------------------------------------------- */

export const WithSummaryCards: Story = {
  name: 'With Summary Cards',
  args: { children: null },
  render: () => {
    const [activeCard, setActiveCard] = React.useState<string | null>(null);
    const [page, setPage] = React.useState(1);

    const filtered = activeCard
      ? CONTACTS.filter((c) => c.status.toLowerCase() === activeCard)
      : CONTACTS;

    const rows = toRows(filtered);

    const summaryData = [
      { key: 'active', label: 'Active', count: CONTACTS.filter(c => c.status === 'Active').length, intent: 'success' as const },
      { key: 'pending', label: 'Pending', count: CONTACTS.filter(c => c.status === 'Pending').length, intent: 'info' as const },
      { key: 'inactive', label: 'Inactive', count: CONTACTS.filter(c => c.status === 'Inactive').length, intent: 'neutral' as const },
      { key: 'churned', label: 'Churned', count: CONTACTS.filter(c => c.status === 'Churned').length, intent: 'danger' as const },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dls-spacing-4)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--dls-spacing-3)' }}>
          {summaryData.map((s) => (
            <Card
              key={s.key}
              type={activeCard === s.key ? 'regular' : 'outline'}
              title={String(s.count)}
              description={s.label}
              headerContent={<Badge variant="ghost" intent={s.intent} size="xs">{s.label}</Badge>}
              {...{ onClick: () => { setActiveCard(activeCard === s.key ? null : s.key); setPage(1); }, style: { cursor: 'pointer' } } as any}
            />
          ))}
        </div>

        <Table
          showPagination
          totalItems={filtered.length}
          itemsPerPage={10}
          currentPage={page}
          totalPages={Math.max(1, Math.ceil(filtered.length / 10))}
          onPageChange={setPage}
          columns="40px 2fr 1fr 100px 100px 120px 80px"
          rowCount={filtered.length}
          topBar={
            <TableTopBar
              slotLeft={
                <SearchField placeholder="Search contacts..." />
              }
              slotRight={
                <>
                  <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Add contact</Button>
                  <CrmOptionsMenu />
                </>
              }
            />
          }
        >
          <TableColumn type="checkbox" rows={rows.checkbox} />
          <TableColumn type="two-line+avatar" header="Contact" rows={rows.contact} sortable />
          <TableColumn type="text" header="Company" rows={rows.company} sortable />
          <TableColumn type="badge" header="Status" rows={rows.status} />
          <TableColumn type="number" header="Deal value" rows={rows.deal} sortable />
          <TableColumn type="text" header="Last activity" rows={rows.lastActivity} sortable />
          <TableColumn type="actions" rows={rows.actions} />
        </Table>
      </div>
    );
  },
};

/* ---------------------------------------------------------------------------
   3. Minimal — search + single primary action, no filters
   --------------------------------------------------------------------------- */

export const Minimal: Story = {
  name: 'Minimal Table',
  args: { children: null },
  render: () => {
    const rows = toRows(CONTACTS);

    return (
      <Table
        showPagination
        totalItems={CONTACTS.length}
        itemsPerPage={10}
        currentPage={1}
        totalPages={1}
        columns="2fr 1fr 100px 100px 80px"
        rowCount={CONTACTS.length}
        topBar={
          <TableTopBar
            slotLeft={<SearchField placeholder="Search contacts..." />}
            slotRight={
              <>
                <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Add contact</Button>
                <CrmOptionsMenu />
              </>
            }
          />
        }
      >
        <TableColumn type="two-line+avatar" header="Contact" rows={rows.contact} sortable />
        <TableColumn type="text" header="Company" rows={rows.company} sortable />
        <TableColumn type="badge" header="Status" rows={rows.status} />
        <TableColumn type="number" header="Deal value" rows={rows.deal} sortable />
        <TableColumn type="actions" rows={rows.actions} />
      </Table>
    );
  },
};

/* ---------------------------------------------------------------------------
   4. Single-line rows — no two-line cells, demonstrating the default
   --------------------------------------------------------------------------- */

export const SingleLineRows: Story = {
  name: 'Single-Line Rows',
  args: { children: null },
  render: () => {
    const nameRows: TableColumnRow[] = CONTACTS.map((c) => ({ text: c.name }));
    const emailRows: TableColumnRow[] = CONTACTS.map((c) => ({ text: c.email }));
    const companyRows: TableColumnRow[] = CONTACTS.map((c) => ({ text: c.company }));
    const statusRows: TableColumnRow[] = CONTACTS.map((c) => ({
      badgeLabel: c.status,
      badgeIntent: c.statusIntent,
    }));
    const dealRows: TableColumnRow[] = CONTACTS.map((c) => ({ text: c.deal }));
    const actionsRows: TableColumnRow[] = CONTACTS.map(() => ({}));

    return (
      <Table
        showPagination
        totalItems={CONTACTS.length}
        itemsPerPage={10}
        currentPage={1}
        totalPages={1}
        columns="40px 1.5fr 1.5fr 1fr 100px 100px 80px"
        rowCount={CONTACTS.length}
        topBar={
          <TableTopBar
            slotLeft={<SearchField placeholder="Search..." />}
            slotRight={
              <>
                <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Add contact</Button>
                <CrmOptionsMenu />
              </>
            }
          />
        }
      >
        <TableColumn type="checkbox" rows={CONTACTS.map(() => ({ checked: false }))} />
        <TableColumn type="text" header="Name" rows={nameRows} sortable />
        <TableColumn type="text" header="Email" rows={emailRows} sortable />
        <TableColumn type="text" header="Company" rows={companyRows} sortable />
        <TableColumn type="badge" header="Status" rows={statusRows} />
        <TableColumn type="number" header="Deal value" rows={dealRows} sortable />
        <TableColumn type="actions" rows={actionsRows} />
      </Table>
    );
  },
};

/* ---------------------------------------------------------------------------
   5. Filtered state — active filters visible, reduced dataset
   --------------------------------------------------------------------------- */

export const FilteredState: Story = {
  name: 'Filtered State',
  args: { children: null },
  render: () => {
    const [sortColumn, setSortColumn] = React.useState('name');
    const [sortDirection, setSortDirection] = React.useState<'ascending' | 'descending'>('ascending');
    const [statusFilter, setStatusFilter] = React.useState<string[]>(['Active']);
    const toggleStatus = (s: string) =>
      setStatusFilter((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

    const activeContacts = CONTACTS.filter((c) => c.status === 'Active');
    const rows = toRows(activeContacts);

    return (
      <Table
        showPagination
        totalItems={activeContacts.length}
        itemsPerPage={10}
        currentPage={1}
        totalPages={1}
        columns="40px 2fr 1fr 100px 100px 120px 80px"
        rowCount={activeContacts.length}
        topBar={
          <TableTopBar
            slotLeft={
              <>
                <SearchField placeholder="Search contacts..." />
                <Button variant="ghost" intent="neutral" size="m" icon={<FilterIcon />} iconOnly aria-label="Filters" />
              </>
            }
            slotRight={
              <>
                <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Add contact</Button>
                <CrmOptionsMenu />
              </>
            }
            showFilters
            filters={
              <Filters
                size="m"
                groups={[
                  {
                    id: 'sort',
                    children: (
                      <SortChip
                        column={sortColumn}
                        direction={sortDirection}
                        onColumnChange={setSortColumn}
                        onDirectionChange={setSortDirection}
                      />
                    ),
                  },
                  {
                    id: 'status',
                    children: <StatusFilterChip selected={statusFilter} onToggle={toggleStatus} />,
                  },
                ]}
                showAdd
                onAdd={() => {}}
              />
            }
          />
        }
      >
        <TableColumn type="checkbox" rows={rows.checkbox} />
        <TableColumn type="two-line+avatar" header="Contact" rows={rows.contact} sortable />
        <TableColumn type="text" header="Company" rows={rows.company} sortable />
        <TableColumn type="badge" header="Status" rows={rows.status} />
        <TableColumn type="number" header="Deal value" rows={rows.deal} sortable />
        <TableColumn type="text" header="Last activity" rows={rows.lastActivity} sortable />
        <TableColumn type="actions" rows={rows.actions} />
      </Table>
    );
  },
};

/* ---------------------------------------------------------------------------
   6. Empty state — search returns no results
   --------------------------------------------------------------------------- */

export const EmptySearchResults: Story = {
  name: 'Empty Search Results',
  args: { children: null },
  render: () => {
    const [statusFilter, setStatusFilter] = React.useState<string[]>(['Active']);
    const toggleStatus = (s: string) =>
      setStatusFilter((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

    return (
      <Table
        showPagination={false}
        columns="2fr 1fr 100px 100px 80px"
        rowCount={0}
        topBar={
          <TableTopBar
            slotLeft={
              <>
                <SearchField placeholder="Search contacts..." value="zzzznotfound" />
                <Button variant="ghost" intent="neutral" size="m" icon={<FilterIcon />} iconOnly aria-label="Filters" />
              </>
            }
            slotRight={
              <>
                <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Add contact</Button>
                <CrmOptionsMenu />
              </>
            }
            showFilters
            filters={
              <Filters
                size="m"
                groups={[
                  {
                    id: 'status',
                    children: <StatusFilterChip selected={statusFilter} onToggle={toggleStatus} />,
                  },
                ]}
              />
            }
          />
        }
      >
        <div style={{
          padding: 'var(--dls-spacing-10) var(--dls-spacing-6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--dls-spacing-3)',
          color: 'var(--dls-color-text-secondary)',
          fontFamily: 'var(--dls-font-family)',
          fontSize: 'var(--dls-text-paragraph-m-font-size)',
          lineHeight: 'var(--dls-text-paragraph-m-line-height)',
        }}>
          <span style={{
            fontSize: 'var(--dls-text-heading-h4-font-size)',
            fontWeight: 'var(--dls-font-weight-medium)' as any,
            color: 'var(--dls-color-text-primary)',
          }}>
            No results found
          </span>
          <span>No contacts match your current search and filters.</span>
          <Button variant="outline" intent="neutral" size="m" icon={<XIcon />}>Clear filters</Button>
        </div>
      </Table>
    );
  },
};

/* ---------------------------------------------------------------------------
   7. Empty state — no data yet
   --------------------------------------------------------------------------- */

export const EmptyNoData: Story = {
  name: 'Empty — No Data',
  args: { children: null },
  render: () => (
    <Table
      showPagination={false}
      columns="1fr"
      rowCount={0}
      topBar={
        <TableTopBar
          slotLeft={<SearchField placeholder="Search contacts..." disabled />}
          slotRight={
            <>
              <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Add contact</Button>
              <DropdownOptions triggerIcon={<MoreIcon />} triggerLabel="Options" disabled>
                <List>
                  <ListItem type="label" text="Customize" />
                  <ListItem type="with-slots" text="Columns" iconStart={<Columns3Icon />} iconEnd={<ChevronRightIcon />} />
                  <ListItem type="with-slots" text="Filters" iconStart={<FilterIcon />} iconEnd={<ChevronRightIcon />} />
                  <ListItem type="divider" />
                  <ListItem type="with-slots" text="Export" iconStart={<DownloadIcon />} iconEnd={<ChevronRightIcon />} />
                </List>
              </DropdownOptions>
            </>
          }
        />
      }
    >
      <div style={{
        padding: 'var(--dls-spacing-10) var(--dls-spacing-6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--dls-spacing-3)',
        color: 'var(--dls-color-text-secondary)',
        fontFamily: 'var(--dls-font-family)',
        fontSize: 'var(--dls-text-paragraph-m-font-size)',
        lineHeight: 'var(--dls-text-paragraph-m-line-height)',
      }}>
        <span style={{
          fontSize: 'var(--dls-text-heading-h4-font-size)',
          fontWeight: 'var(--dls-font-weight-medium)' as any,
          color: 'var(--dls-color-text-primary)',
        }}>
          No contacts yet
        </span>
        <span>Add your first contact to get started.</span>
        <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Add contact</Button>
      </div>
    </Table>
  ),
};

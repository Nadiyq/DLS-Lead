import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  Plus as PlusIcon,
  MoreHorizontal as MoreIcon,
  Filter as FilterIcon,
  Trash2 as TrashIcon,
  Columns3 as Columns3Icon,
  Download as DownloadIcon,
  ChevronRight as ChevronRightIcon,
  ArrowDown as ArrowDownIcon,
  ArrowUp as ArrowUpIcon,
} from 'lucide-react';
import { Table } from './Table';
import { TableTopBar } from '../table-top-bar/TableTopBar';
import { TableColumn } from '../table-column/TableColumn';
import { Button } from '../Button';
import { SearchField } from '../search-field/SearchField';
import { DropdownOptions } from '../dropdown-options/DropdownOptions';
import { Filters } from '../filters/Filters';
import { FilterChip } from '../filter-chip/FilterChip';
import { DropdownSorting } from '../dropdown-sorting/DropdownSorting';
import { DropdownColumns } from '../dropdown-columns/DropdownColumns';
import { DropdownFilters } from '../dropdown-filters/DropdownFilters';
import { DropdownExport } from '../dropdown-export/DropdownExport';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';
import { Checkbox } from '../checkbox/Checkbox';
import { TABLE_ROWS } from '../_fixtures';

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

const { checkbox: checkboxRows, user: userRows, badge: badgeRows, date: dateRows, number: numberRows, actions: actionsRows } = TABLE_ROWS;

/* ---------------------------------------------------------------------------
   Shared — OptionsMenu with drill-in sub-menus
   --------------------------------------------------------------------------- */

const FILTER_OPTIONS: Record<string, string[]> = {
  Status: ['Active', 'Inactive', 'Pending', 'Archived'],
  Role: ['Admin', 'Editor', 'Viewer'],
};

const SORT_COLUMNS = [
  { value: 'user', label: 'User' },
  { value: 'status', label: 'Status' },
  { value: 'joined', label: 'Joined' },
  { value: 'amount', label: 'Amount' },
];

const initialShown = [
  { id: 'user', label: 'User' },
  { id: 'status', label: 'Status', pinned: true },
  { id: 'joined', label: 'Joined' },
];

const initialHidden = [
  { id: 'amount', label: 'Amount' },
  { id: 'actions', label: 'Actions' },
];

function summarizeValues(selected: Set<string>): string {
  if (selected.size === 0) return 'All';
  if (selected.size === 1) return [...selected][0];
  return `${selected.size} selected`;
}

type SubMenu = 'root' | 'columns' | 'filters' | 'export';

const DefaultFiltersPanel = () => {
  const keys = Object.keys(FILTER_OPTIONS);
  const [activeKeys, setActiveKeys] = React.useState(keys);
  const [values, setValues] = React.useState<Record<string, Set<string>>>(
    Object.fromEntries(keys.map(k => [k, new Set([FILTER_OPTIONS[k][0]])])),
  );
  const [visibility, setVisibility] = React.useState<Record<string, boolean>>(
    Object.fromEntries(keys.map(k => [k, true])),
  );
  const toggleValue = (key: string, opt: string) =>
    setValues(prev => {
      const next = new Set(prev[key]);
      if (next.has(opt)) next.delete(opt); else next.add(opt);
      return { ...prev, [key]: next };
    });
  const toggleVisibility = (key: string, v: boolean) => setVisibility(prev => ({ ...prev, [key]: v }));
  const removeFilter = (key: string) => setActiveKeys(prev => prev.filter(k => k !== key));

  return (
    <DropdownFilters>
      {activeKeys.map(key => (
        <FilterChip
          key={key}
          label={key}
          isVisible={visibility[key] ?? true}
          onVisibilityChange={(v) => toggleVisibility(key, v)}
          size="s"
          valueSummary={<span className="dls-filter-chip__value-text">{summarizeValues(values[key])}</span>}
        >
          <List className="dls-filter-chip__enum-list">
            {FILTER_OPTIONS[key].map(opt => (
              <ListItem
                key={opt}
                type="with-slots"
                text={opt}
                interactive={false}
                slotLeft={<Checkbox checked={values[key]?.has(opt)} onChange={() => toggleValue(key, opt)} />}
                onClick={() => toggleValue(key, opt)}
              />
            ))}
            <ListItem type="divider" />
            <ListItem
              type="with-slots"
              text="Remove filter"
              iconStart={<TrashIcon />}
              onClick={() => removeFilter(key)}
            />
          </List>
        </FilterChip>
      ))}
    </DropdownFilters>
  );
};

interface OptionsMenuProps {
  filtersPanel?: React.ReactNode;
}

const OptionsMenu = ({ filtersPanel }: OptionsMenuProps = {}) => {
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
        shown={initialShown}
        hidden={initialHidden}
        onApply={() => setMenu('root')}
        onCancel={() => setMenu('root')}
      />
    );
  } else if (menu === 'filters') {
    submenu = filtersPanel ?? <DefaultFiltersPanel />;
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
              <SearchField placeholder="Search..." />
              <Button variant="ghost" intent="neutral" size="m" icon={<FilterIcon />} iconOnly aria-label="Filters" />
            </>
          }
          slotRight={
            <>
              <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Add new</Button>
              <OptionsMenu />
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
          slotLeft={
            <>
              <SearchField placeholder="Search..." />
              <Button variant="ghost" intent="neutral" size="m" icon={<FilterIcon />} iconOnly aria-label="Filters" />
            </>
          }
          slotRight={
            <>
              <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Add new</Button>
              <OptionsMenu />
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
   With filters — Sort chip (separate group) + filter chips with dropdown children
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
  render: (args) => {
    const [sortColumn, setSortColumn] = React.useState('user');
    const [sortDirection, setSortDirection] = React.useState<'ascending' | 'descending'>('ascending');
    const sortLabel = SORT_COLUMNS.find(c => c.value === sortColumn)?.label ?? sortColumn;
    const SortIcon = sortDirection === 'ascending' ? ArrowDownIcon : ArrowUpIcon;

    const [activeFilters, setActiveFilters] = React.useState([
      { id: 'status', label: 'Status', values: new Set(['Active']), isVisible: true },
      { id: 'role', label: 'Role', values: new Set(['Admin']), isVisible: true },
    ]);

    const toggleValue = (id: string, opt: string) =>
      setActiveFilters(prev => prev.map(f => {
        if (f.id !== id) return f;
        const next = new Set(f.values);
        if (next.has(opt)) next.delete(opt); else next.add(opt);
        return { ...f, values: next };
      }));
    const setVisibility = (id: string, isVisible: boolean) =>
      setActiveFilters(prev => prev.map(f => f.id === id ? { ...f, isVisible } : f));
    const removeFilter = (id: string) =>
      setActiveFilters(prev => prev.filter(f => f.id !== id));

    const buildChips = (size: 'm' | 's') => activeFilters.map(f => (
      <FilterChip
        key={f.id}
        label={f.label}
        isVisible={f.isVisible}
        onVisibilityChange={(v) => setVisibility(f.id, v)}
        size={size}
        valueSummary={<span className="dls-filter-chip__value-text">{summarizeValues(f.values)}</span>}
      >
        <List className="dls-filter-chip__enum-list">
          {(FILTER_OPTIONS[f.label] ?? []).map(opt => (
            <ListItem
              key={opt}
              type="with-slots"
              text={opt}
              interactive={false}
              slotLeft={<Checkbox checked={f.values.has(opt)} onChange={() => toggleValue(f.id, opt)} />}
              onClick={() => toggleValue(f.id, opt)}
            />
          ))}
          <ListItem type="divider" />
          <ListItem
            type="with-slots"
            text="Remove filter"
            iconStart={<TrashIcon />}
            onClick={() => removeFilter(f.id)}
          />
        </List>
      </FilterChip>
    ));

    return (
      <Table
        {...args}
        topBar={
          <TableTopBar
            slotLeft={
              <>
                <SearchField placeholder="Search..." />
                <Button variant="ghost" intent="neutral" size="m" icon={<FilterIcon />} iconOnly aria-label="Filters" />
              </>
            }
            slotRight={
              <>
                <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Add new</Button>
                <OptionsMenu
                  filtersPanel={
                    activeFilters.length > 0
                      ? <DropdownFilters>{buildChips('s')}</DropdownFilters>
                      : <DropdownFilters />
                  }
                />
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
                      <FilterChip
                        label="Sort"
                        labelIcon={<SortIcon />}
                        isVisible
                        size="m"
                        valueSummary={<span className="dls-filter-chip__value-text">{sortLabel}</span>}
                      >
                        <DropdownSorting
                          columns={SORT_COLUMNS}
                          column={sortColumn}
                          direction={sortDirection}
                          onColumnChange={setSortColumn}
                          onDirectionChange={setSortDirection}
                        />
                      </FilterChip>
                    ),
                  },
                  {
                    id: 'filters',
                    children: <>{buildChips('m')}</>,
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
    );
  },
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
          slotLeft={<SearchField placeholder="Search..." />}
          slotRight={
            <>
              <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Add new</Button>
              <OptionsMenu />
            </>
          }
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
            slotLeft={<SearchField placeholder="Search..." />}
            slotRight={
              <>
                <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Add new</Button>
                <DropdownOptions triggerIcon={<MoreIcon />} triggerLabel="Options">
                  <List>
                    <ListItem type="text" text="Columns" />
                    <ListItem type="text" text="Export" />
                  </List>
                </DropdownOptions>
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
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  Filter as FilterIcon,
  Trash2 as TrashIcon,
  Plus as PlusIcon,
  MoreHorizontal as MoreIcon,
  Columns3 as Columns3Icon,
  Download as DownloadIcon,
  ChevronRight as ChevronRightIcon,
  ArrowDown as ArrowDownIcon,
  ArrowUp as ArrowUpIcon,
} from 'lucide-react';
import { TableTopBar } from './TableTopBar';
import { Filters } from '../filters/Filters';
import type { FilterGroup } from '../filters/Filters';
import { FilterChip } from '../filter-chip/FilterChip';
import { Button } from '../Button';
import { SearchField } from '../search-field/SearchField';
import { DropdownOptions } from '../dropdown-options/DropdownOptions';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';
import { DropdownSorting } from '../dropdown-sorting/DropdownSorting';
import { DropdownColumns } from '../dropdown-columns/DropdownColumns';
import { DropdownFilters } from '../dropdown-filters/DropdownFilters';
import { DropdownExport } from '../dropdown-export/DropdownExport';
import { Checkbox } from '../checkbox/Checkbox';

const FILTER_OPTIONS: Record<string, string[]> = {
  Status: ['Active', 'Inactive', 'Pending', 'Archived'],
  Role: ['Admin', 'Editor', 'Viewer'],
  Date: ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days'],
  Department: ['Engineering', 'Design', 'Sales', 'Support'],
};

const meta = {
  title: 'Components/TableTopBar',
  component: TableTopBar,
  parameters: {
    layout: 'padded',
    // FilterChip composition is deeply nested → Storybook's auto-source
    // serializer crashes with `RangeError: Invalid string length`.
    docs: { source: { type: 'code', code: '' } },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 720, border: '1px solid var(--dls-color-border-subtle)', borderRadius: 'var(--dls-radius-component-card)', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TableTopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helper — DropdownOptions "..." menu with drill-in sub-menus (Figma spec)
// ---------------------------------------------------------------------------

type SubMenu = 'root' | 'columns' | 'filters' | 'export';

const initialShown = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email', pinned: true },
  { id: 'role', label: 'Role' },
];

const initialHidden = [
  { id: 'phone', label: 'Phone' },
  { id: 'department', label: 'Department' },
];

const FILTER_KEYS = Object.keys(FILTER_OPTIONS);

function summarizeValues(selected: Set<string>): string {
  if (selected.size === 0) return 'All';
  if (selected.size === 1) return [...selected][0];
  return `${selected.size} selected`;
}

const DefaultFiltersPanel = () => {
  const [activeKeys, setActiveKeys] = React.useState(FILTER_KEYS);
  const [values, setValues] = React.useState<Record<string, Set<string>>>(
    Object.fromEntries(FILTER_KEYS.map(k => [k, new Set([FILTER_OPTIONS[k][0]])])),
  );
  const [visibility, setVisibility] = React.useState<Record<string, boolean>>(
    Object.fromEntries(FILTER_KEYS.map(k => [k, true])),
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
  /** Custom filters panel — mirrors the actual filter row chips */
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

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    showFilters: false,
    slotLeft: (
      <>
        <SearchField placeholder="Search..." />
        <Button variant="soft" intent="neutral" size="m" icon={<FilterIcon />} iconOnly aria-label="Filter" />
      </>
    ),
    slotRight: (
      <>
        <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Button</Button>
        <OptionsMenu />
      </>
    ),
  },
};

// ---------------------------------------------------------------------------
// Without filters
// ---------------------------------------------------------------------------

export const WithoutFilters: Story = {
  args: {
    showFilters: false,
    slotLeft: (
      <>
        <SearchField placeholder="Search..." />
        <Button variant="soft" intent="neutral" size="m" icon={<FilterIcon />} iconOnly aria-label="Filter" />
      </>
    ),
    slotRight: (
      <>
        <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Button</Button>
        <OptionsMenu filtersPanel={<DropdownFilters />} />
      </>
    ),
  },
};

// ---------------------------------------------------------------------------
// With filters
// ---------------------------------------------------------------------------

const SORT_COLUMNS = [
  { value: 'name', label: 'Name' },
  { value: 'status', label: 'Status' },
  { value: 'role', label: 'Role' },
];

export const WithFilters: Story = {
  parameters: {
    docs: { source: { code: '' } },
  },
  args: {
    showFilters: false,
    slotLeft: <SearchField placeholder="Search..." />,
    slotRight: <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Button</Button>,
  },
  render: () => {
    const [sortColumn, setSortColumn] = React.useState('name');
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
      <TableTopBar
        slotLeft={
          <>
            <SearchField placeholder="Search..." />
            <Button variant="soft" intent="neutral" size="m" icon={<FilterIcon />} iconOnly aria-label="Filter" />
          </>
        }
        slotRight={
          <>
            <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Button</Button>
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
    );
  },
};

// ---------------------------------------------------------------------------
// Interactive — toggle filters visibility
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    showFilters: false,
    slotLeft: <SearchField placeholder="Search..." />,
    slotRight: <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Button</Button>,
  },
  render: () => {
    const [showFilters, setShowFilters] = React.useState(false);
    const [sortColumn, setSortColumn] = React.useState('name');
    const [sortDirection, setSortDirection] = React.useState<'ascending' | 'descending'>('ascending');
    const sortLabel = SORT_COLUMNS.find(c => c.value === sortColumn)?.label ?? sortColumn;
    const SortIcon = sortDirection === 'ascending' ? ArrowDownIcon : ArrowUpIcon;
    const availableFilters = Object.keys(FILTER_OPTIONS);
    const [activeFilters, setActiveFilters] = React.useState<
      { id: string; label: string; values: Set<string>; isVisible: boolean }[]
    >([{ id: 'status', label: 'Status', values: new Set(['Active']), isVisible: true }]);

    const addFilter = () => {
      const used = new Set(activeFilters.map(f => f.label));
      const next = availableFilters.find(f => !used.has(f));
      if (next) {
        setActiveFilters(prev => [
          ...prev,
          { id: next.toLowerCase(), label: next, values: new Set<string>(), isVisible: true },
        ]);
      }
    };

    const removeFilter = (id: string) => {
      setActiveFilters(prev => prev.filter(f => f.id !== id));
    };

    const setVisibility = (id: string, isVisible: boolean) => {
      setActiveFilters(prev => prev.map(f => f.id === id ? { ...f, isVisible } : f));
    };

    const toggleValue = (id: string, opt: string) => {
      setActiveFilters(prev => prev.map(f => {
        if (f.id !== id) return f;
        const next = new Set(f.values);
        if (next.has(opt)) next.delete(opt); else next.add(opt);
        return { ...f, values: next };
      }));
    };

    const sortGroup: FilterGroup = {
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
    };

    const buildFilterGroupChildren = (size: 'm' | 's') => activeFilters.map(f => (
      <FilterChip
        key={f.id}
        label={f.label}
        isVisible={f.isVisible}
        size={size}
        valueSummary={<span className="dls-filter-chip__value-text">{summarizeValues(f.values)}</span>}
        onVisibilityChange={(v) => setVisibility(f.id, v)}
      >
        <List className="dls-filter-chip__enum-list">
          {(FILTER_OPTIONS[f.label] ?? []).map((opt) => (
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

    const groups: FilterGroup[] = [
      sortGroup,
      { id: 'filters', children: <>{buildFilterGroupChildren('m')}</> },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <TableTopBar
          slotLeft={
            <>
              <SearchField placeholder="Search..." />
              <Button variant="soft" intent="neutral" size="m" icon={<FilterIcon />} iconOnly aria-label="Toggle filters" onClick={() => setShowFilters(v => !v)} />
            </>
          }
          slotRight={
            <>
              <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Button</Button>
              <OptionsMenu
                filtersPanel={
                  activeFilters.length > 0
                    ? <DropdownFilters>{buildFilterGroupChildren('s')}</DropdownFilters>
                    : <DropdownFilters />
                }
              />
            </>
          }
          showFilters={showFilters}
          filters={
            <Filters
              size="m"
              groups={groups}
              showAdd={activeFilters.length < availableFilters.length}
              onAdd={addFilter}
            />
          }
        />
        <p style={{
          margin: '0 16px', fontSize: 'var(--dls-text-s-font-size)',
          fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-secondary)',
        }}>
          Click the filter icon to toggle the filters row. Eye = hide/show; chevron opens options + remove filter.
        </p>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Minimal — just search
// ---------------------------------------------------------------------------

export const Minimal: Story = {
  args: {
    showFilters: false,
    slotLeft: <SearchField placeholder="Search..." />,
    slotRight: <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Button</Button>,
  },
};

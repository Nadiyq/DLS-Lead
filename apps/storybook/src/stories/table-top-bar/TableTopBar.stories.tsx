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
import { BadgeIndicator } from '../badge/indicator/BadgeIndicator';

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
      // NOTE: do NOT set overflow:hidden here. The FilterChip dropdown
      // (and any other popover composed inside the TableTopBar) would
      // otherwise be clipped by this wrapper. The TableTopBar itself
      // has rounded edges via the inner cells; the wrapper only needs
      // the outer border + radius for the demo frame.
      //
      // Width tuned so the canonical filters-row pattern (Sort chip +
      // separator + 4 FilterChips + add-filter Plus) fits on one row
      // — closer to real-world table widths (~1100–1200px) than the
      // original Figma frame (716px), which forces Plus to wrap onto
      // a confusing second row whenever filters >= 4.
      <div style={{ width: 1080, border: '1px solid var(--dls-color-border-subtle)', borderRadius: 'var(--dls-radius-component-card)' }}>
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
  /** Controlled open state for the underlying DropdownOptions. */
  open?: boolean;
  /** Called when the underlying DropdownOptions wants to change open state. */
  onOpenChange?: (open: boolean) => void;
}

const OptionsMenu = ({ filtersPanel, open, onOpenChange }: OptionsMenuProps = {}) => {
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
    <DropdownOptions
      triggerIcon={<MoreIcon />}
      triggerLabel="Options"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--dls-spacing-2)' }}>
        {rootMenu}
        {submenu}
      </div>
    </DropdownOptions>
  );
};

// ---------------------------------------------------------------------------
// Helper — Filter icon-Button with a "filters-active" BadgeIndicator dot.
//
// When at least 1 filter is active, a tiny xs danger BadgeIndicator (8px red
// dot) is absolutely-positioned at the top-right corner of the Filter button
// (2px from the top, 2px from the right edge) so users get an at-a-glance
// signal that filters are applied without opening the row.
// ---------------------------------------------------------------------------

interface FilterButtonProps {
  /** Whether at least one filter is currently active — drives the indicator dot. */
  hasActiveFilters?: boolean;
  /** Click handler (typically toggles the filters row). */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** `aria-pressed` value — pass when this button toggles the filters row. */
  ariaPressed?: boolean;
  /** `aria-controls` value — pass when this button controls the filters row id. */
  ariaControls?: string;
  /** Accessible label. */
  ariaLabel?: string;
}

const FilterButton = ({
  hasActiveFilters = false,
  onClick,
  ariaPressed,
  ariaControls,
  ariaLabel = 'Filter',
}: FilterButtonProps) => (
  <span style={{ position: 'relative', display: 'inline-flex' }}>
    <Button
      variant="soft"
      intent="neutral"
      size="m"
      icon={<FilterIcon />}
      iconOnly
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-controls={ariaControls}
      onClick={onClick}
    />
    {hasActiveFilters && (
      <BadgeIndicator
        size="xs"
        intent="danger"
        style={{ position: 'absolute', top: 2, right: 2, pointerEvents: 'none' }}
        aria-label="Filters active"
      />
    )}
  </span>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    showFilters: false,
    slotLeft: (
      <>
        <SearchField placeholder="Search..." />
        <FilterButton hasActiveFilters={false} />
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
        <FilterButton hasActiveFilters={false} />
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
            <FilterButton hasActiveFilters={activeFilters.length > 0} />
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
            addMenu={(close) => {
              const used = new Set(activeFilters.map(f => f.label));
              const remaining = Object.keys(FILTER_OPTIONS).filter(f => !used.has(f));
              if (remaining.length === 0) {
                return (
                  <List>
                    <ListItem type="empty-state" text="No more filters" />
                  </List>
                );
              }
              return (
                <List>
                  {remaining.map((label) => (
                    <ListItem
                      key={label}
                      type="text"
                      text={label}
                      onClick={() => {
                        setActiveFilters(prev => [
                          ...prev,
                          { id: label.toLowerCase(), label, values: new Set<string>(), isVisible: true },
                        ]);
                        close();
                      }}
                    />
                  ))}
                </List>
              );
            }}
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
    // Cross-surface chip-open coordination. When a chip in the
    // DropdownFilters mirror is clicked, we set this id to flip the
    // matching top-bar chip's value popover open.
    const [openFilterId, setOpenFilterId] = React.useState<string | null>(null);
    // Controlled state for the row-right Options (3-dot) menu so the
    // mirror-chip handoff can dismiss it cleanly.
    const [optionsOpen, setOptionsOpen] = React.useState(false);

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

    /** Cross-surface handoff fired by a DropdownFilters mirror chip:
     *  1. Reveal the filter row if it's hidden.
     *  2. Close the OptionsMenu (and the nested DropdownFilters).
     *  3. Open the matching top-bar chip's value popover.
     *  Uses real controlled state on every surface — no synthetic
     *  events. The earlier "dispatch mousedown on body" workaround
     *  also closed the top-bar chip via its own click-outside
     *  listener, which is why a clean controlled API is required. */
    const jumpToTopbarFilter = (id: string) => {
      setShowFilters(true);
      setOptionsOpen(false);
      setOpenFilterId(id);
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

    const buildFilterGroupChildren = (size: 'm' | 's', isMirror = false) => activeFilters.map(f => (
      <FilterChip
        key={f.id}
        label={f.label}
        isVisible={f.isVisible}
        size={size}
        valueSummary={<span className="dls-filter-chip__value-text">{summarizeValues(f.values)}</span>}
        onVisibilityChange={(v) => setVisibility(f.id, v)}
        // Mirror chips inside DropdownFilters are read-only — they
        // never open their own popover. Clicking their chevron fires
        // a handoff that opens the matching TOP-BAR chip instead.
        open={isMirror ? false : openFilterId === f.id}
        onOpenChange={(o) => {
          if (isMirror) {
            if (o) jumpToTopbarFilter(f.id);
          } else {
            setOpenFilterId(o ? f.id : null);
          }
        }}
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
              <FilterButton
                hasActiveFilters={activeFilters.length > 0}
                ariaLabel="Toggle filters"
                ariaPressed={showFilters}
                onClick={() => setShowFilters(v => !v)}
              />
            </>
          }
          slotRight={
            <>
              <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Button</Button>
              <OptionsMenu
                open={optionsOpen}
                onOpenChange={setOptionsOpen}
                filtersPanel={
                  activeFilters.length > 0
                    ? <DropdownFilters>{buildFilterGroupChildren('s', /* isMirror */ true)}</DropdownFilters>
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
              addMenu={(close) => {
                const used = new Set(activeFilters.map(f => f.label));
                const remaining = availableFilters.filter(f => !used.has(f));
                if (remaining.length === 0) {
                  return (
                    <List>
                      <ListItem type="empty-state" text="No more filters" />
                    </List>
                  );
                }
                return (
                  <List>
                    {remaining.map((label) => (
                      <ListItem
                        key={label}
                        type="text"
                        text={label}
                        onClick={() => {
                          setActiveFilters(prev => [
                            ...prev,
                            { id: label.toLowerCase(), label, values: new Set<string>(), isVisible: true },
                          ]);
                          close();
                        }}
                      />
                    ))}
                  </List>
                );
              }}
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

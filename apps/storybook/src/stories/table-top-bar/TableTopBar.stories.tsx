import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Search as SearchIcon, Filter as FilterIcon, Settings as SettingsIcon, Trash2 as TrashIcon, Plus as PlusIcon, MoreHorizontal as MoreIcon } from 'lucide-react';
import { TableTopBar } from './TableTopBar';
import { Filters } from '../filters/Filters';
import type { FilterGroup } from '../filters/Filters';
import { FilterChip } from '../filter-chip/FilterChip';
import { Button } from '../Button';
import { InputField } from '../input-field/InputField';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';

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
      <div style={{ width: 720, border: '1px solid var(--dls-color-border-subtle)', borderRadius: 'var(--dls-radius-component-card)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TableTopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helper components — lightweight stubs for story demos
// ---------------------------------------------------------------------------

const SearchInput = () => (
  <div style={{ width: 320 }}>
    <InputField
      placeholder="Search..."
      iconStart={<SearchIcon />}
    />
  </div>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    showFilters: false,
    slotLeft: (
      <>
        <SearchInput />
        <Button variant="soft" intent="neutral" size="m" icon={<FilterIcon />} iconOnly aria-label="Filter" />
      </>
    ),
    slotRight: (
      <>
        <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Button</Button>
        <Button variant="soft" intent="neutral" size="m" icon={<MoreIcon />} iconOnly aria-label="More" />
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
        <SearchInput />
        <Button variant="soft" intent="neutral" size="m" icon={<FilterIcon />} iconOnly aria-label="Filter" />
      </>
    ),
    slotRight: (
      <>
        <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />}>Button</Button>
        <Button variant="soft" intent="neutral" size="m" icon={<MoreIcon />} iconOnly aria-label="More" />
      </>
    ),
  },
};

// ---------------------------------------------------------------------------
// With filters
// ---------------------------------------------------------------------------

export const WithFilters: Story = {
  parameters: {
    docs: { source: { code: '' } },
  },
  args: {
    showFilters: false,
    slotLeft: <SearchInput />,
    slotRight: <Button variant="filled" intent="neutral" size="m">Export</Button>,
  },
  render: () => (
    <TableTopBar
      slotLeft={
        <>
          <SearchInput />
          <Button variant="soft" intent="neutral" size="m" icon={<FilterIcon />} iconOnly aria-label="Filter" />
        </>
      }
      slotRight={
        <>
          <Button variant="filled" intent="neutral" size="m">Export</Button>
          <Button variant="soft" intent="neutral" size="m" icon={<SettingsIcon />} iconOnly aria-label="Settings" />
        </>
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
          ]}
        />
      }
    />
  ),
};

// ---------------------------------------------------------------------------
// Interactive — toggle filters visibility
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    showFilters: false,
    slotLeft: <SearchInput />,
    slotRight: <Button variant="filled" intent="neutral" size="m">Export</Button>,
  },
  render: () => {
    const [showFilters, setShowFilters] = React.useState(false);
    const availableFilters = Object.keys(FILTER_OPTIONS);
    const [activeFilters, setActiveFilters] = React.useState<
      { id: string; label: string; value: string; isVisible: boolean }[]
    >([{ id: 'status', label: 'Status', value: 'Active', isVisible: true }]);

    const addFilter = () => {
      const used = new Set(activeFilters.map(f => f.label));
      const next = availableFilters.find(f => !used.has(f));
      if (next) {
        setActiveFilters(prev => [
          ...prev,
          { id: next.toLowerCase(), label: next, value: 'All', isVisible: true },
        ]);
      }
    };

    const removeFilter = (id: string) => {
      setActiveFilters(prev => {
        const next = prev.filter(f => f.id !== id);
        if (next.length === 0) setShowFilters(false);
        return next;
      });
    };

    const setVisibility = (id: string, isVisible: boolean) => {
      setActiveFilters(prev => prev.map(f => f.id === id ? { ...f, isVisible } : f));
    };

    const setValue = (id: string, value: string) => {
      setActiveFilters(prev => prev.map(f => f.id === id ? { ...f, value } : f));
    };

    const groups: FilterGroup[] = activeFilters.map(f => ({
      id: f.id,
      children: (
        <FilterChip
          label={f.label}
          isVisible={f.isVisible}
          size="m"
          valueSummary={<span className="dls-filter-chip__value-text">{f.value}</span>}
          onVisibilityChange={(v) => setVisibility(f.id, v)}
        >
          <List className="dls-filter-chip__enum-list">
            {(FILTER_OPTIONS[f.label] ?? []).map((opt) => (
              <ListItem
                key={opt}
                type="text"
                text={opt}
                selected={f.value === opt}
                onClick={() => setValue(f.id, opt)}
              />
            ))}
            <ListItem type="divider" />
            <ListItem
              type="with-slots"
              text="Remove filter"
              slotLeft={<TrashIcon />}
              onClick={() => removeFilter(f.id)}
            />
          </List>
        </FilterChip>
      ),
    }));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <TableTopBar
          slotLeft={
            <>
              <SearchInput />
              <Button variant="soft" intent="neutral" size="m" icon={<FilterIcon />} iconOnly aria-label="Toggle filters" onClick={() => setShowFilters(v => !v)} />
            </>
          }
          slotRight={
            <>
              <Button variant="filled" intent="neutral" size="m">Export</Button>
              <Button variant="soft" intent="neutral" size="m" icon={<SettingsIcon />} iconOnly aria-label="Settings" />
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
    slotLeft: <SearchInput />,
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { TableTopBar } from './TableTopBar';
import { Filters } from '../filters/Filters';
import type { FilterGroup } from '../filters/Filters';
import { FilterChip } from '../filter-chip/FilterChip';
import { Button } from '../Button';
import { InputField } from '../input-field/InputField';

const meta = {
  title: 'Components/TableTopBar',
  component: TableTopBar,
  parameters: { layout: 'padded' },
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

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.33" />
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const SearchInput = () => (
  <InputField
    placeholder="Search..."
    iconStart={<SearchIcon />}
  />
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.33" />
    <path d="M8 2V4M8 12V14M2 8H4M12 8H14M3.76 3.76L5.17 5.17M10.83 10.83L12.24 12.24M12.24 3.76L10.83 5.17M5.17 10.83L3.76 12.24" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
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
        <Button variant="filled" intent="neutral" size="m">Export</Button>
        <Button variant="soft" intent="neutral" size="m" icon={<SettingsIcon />} iconOnly aria-label="Settings" />
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
        <Button variant="filled" intent="neutral" size="m">Export</Button>
        <Button variant="soft" intent="neutral" size="m" icon={<SettingsIcon />} iconOnly aria-label="Settings" />
      </>
    ),
  },
};

// ---------------------------------------------------------------------------
// With filters
// ---------------------------------------------------------------------------

export const WithFilters: Story = {
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
    const availableFilters = ['Status', 'Role', 'Date', 'Department'];
    const [activeFilters, setActiveFilters] = React.useState<
      { id: string; label: string; value: string }[]
    >([{ id: 'status', label: 'Status', value: 'Active' }]);

    const addFilter = () => {
      const used = new Set(activeFilters.map(f => f.label));
      const next = availableFilters.find(f => !used.has(f));
      if (next) {
        setActiveFilters(prev => [
          ...prev,
          { id: next.toLowerCase(), label: next, value: 'All' },
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

    const groups: FilterGroup[] = activeFilters.map(f => ({
      id: f.id,
      children: (
        <FilterChip
          label={f.label}
          isVisible
          size="m"
          valueSummary={<span className="dls-filter-chip__value-text">{f.value}</span>}
          onVisibilityChange={() => removeFilter(f.id)}
        />
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
          Click the filter icon to toggle the filters row. Click chips to remove, + to add.
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

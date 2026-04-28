import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Trash2 as TrashIcon } from 'lucide-react';
import { Filters } from './Filters';
import type { FilterGroup } from './Filters';
import { FilterChip } from '../filter-chip/FilterChip';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';

const meta = {
  title: 'Components/Filters',
  component: Filters,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Filters>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    {children}
  </div>
);

const Val = ({ text }: { text: string }) => (
  <span className="dls-filter-chip__value-text">{text}</span>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    size: 'm',
    showAdd: true,
    groups: [
      {
        id: 'status',
        children: (
          <FilterChip label="Status" isVisible size="m" valueSummary={<Val text="Active" />} />
        ),
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Selected — multiple active filter groups
// ---------------------------------------------------------------------------

export const Selected: Story = {
  args: { size: 'm', groups: [] },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Size M — selected">
        <Filters
          size="m"
          groups={[
            { id: 'status', children: <FilterChip label="Status" isVisible size="m" valueSummary={<Val text="Active" />} /> },
            { id: 'role', children: <FilterChip label="Role" isVisible size="m" valueSummary={<Val text="Admin" />} /> },
            { id: 'date', children: <FilterChip label="Date" isVisible size="m" valueSummary={<Val text="Last 30 days" />} /> },
          ]}
        />
      </Section>
      <Section title="Size S — selected">
        <Filters
          size="s"
          groups={[
            { id: 'status', children: <FilterChip label="Status" isVisible size="s" valueSummary={<Val text="Active" />} /> },
            { id: 'role', children: <FilterChip label="Role" isVisible size="s" valueSummary={<Val text="Admin" />} /> },
          ]}
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Unselected — single group + add button
// ---------------------------------------------------------------------------

export const Unselected: Story = {
  args: { size: 'm', groups: [] },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Size M — unselected">
        <Filters
          size="m"
          groups={[
            { id: 'status', children: <FilterChip label="Status" isVisible={false} size="m" valueSummary={<Val text="All" />} /> },
          ]}
        />
      </Section>
      <Section title="Size S — unselected">
        <Filters
          size="s"
          groups={[
            { id: 'status', children: <FilterChip label="Status" isVisible={false} size="s" valueSummary={<Val text="All" />} /> },
          ]}
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive — add / remove / hide filters
// Eye toggles visibility (filter stays on page).
// "Remove filter" item in the dropdown actually removes it.
// ---------------------------------------------------------------------------

const FILTER_OPTIONS: Record<string, string[]> = {
  Status: ['Active', 'Inactive', 'Pending', 'Archived'],
  Role: ['Admin', 'Editor', 'Viewer'],
  Date: ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days'],
  Department: ['Engineering', 'Design', 'Sales', 'Support'],
  Location: ['US', 'EU', 'APAC'],
};

const InteractiveDemo = () => {
  const availableFilters = Object.keys(FILTER_OPTIONS);
  const [activeFilters, setActiveFilters] = React.useState<
    { id: string; label: string; value: string; isVisible: boolean }[]
  >([
    { id: 'status', label: 'Status', value: 'Active', isVisible: true },
  ]);

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
    setActiveFilters(prev => prev.filter(f => f.id !== id));
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
        valueSummary={<Val text={f.value} />}
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
      <Section title="Eye = hide/show; chevron opens options + remove">
        <Filters
          size="m"
          groups={groups}
          showAdd={activeFilters.length < availableFilters.length}
          onAdd={addFilter}
        />
      </Section>
      <p style={{
        margin: 0, fontSize: 'var(--dls-text-s-font-size)',
        fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-secondary)',
      }}>
        Active: {activeFilters.length === 0 ? 'None' : activeFilters.map(f => `${f.label}${f.isVisible ? '' : ' (hidden)'}: ${f.value}`).join(', ')}
      </p>
    </div>
  );
};

export const Interactive: Story = {
  args: { size: 'm', groups: [] },
  render: () => <InteractiveDemo />,
};

// ---------------------------------------------------------------------------
// Sizes comparison
// ---------------------------------------------------------------------------

export const SizesComparison: Story = {
  args: { size: 'm', groups: [] },
  render: () => {
    const makeGroups = (size: 'm' | 's'): FilterGroup[] => [
      { id: 'status', children: <FilterChip label="Status" isVisible size={size} valueSummary={<Val text="Active" />} /> },
      { id: 'role', children: <FilterChip label="Role" isVisible size={size} valueSummary={<Val text="Admin" />} /> },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Section title="Size M (32px)">
          <Filters size="m" groups={makeGroups('m')} />
        </Section>
        <Section title="Size S (28px)">
          <Filters size="s" groups={makeGroups('s')} />
        </Section>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Without add button
// ---------------------------------------------------------------------------

export const WithoutAddButton: Story = {
  args: { size: 'm', groups: [] },
  render: () => (
    <Filters
      size="m"
      showAdd={false}
      groups={[
        { id: 'status', children: <FilterChip label="Status" isVisible size="m" valueSummary={<Val text="Active" />} /> },
        { id: 'role', children: <FilterChip label="Role" isVisible size="m" valueSummary={<Val text="Admin" />} /> },
      ]}
    />
  ),
};

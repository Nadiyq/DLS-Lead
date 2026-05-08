import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Trash2 as TrashIcon } from 'lucide-react';
import { DropdownFilters } from './DropdownFilters';
import { FilterChip } from '../filter-chip/FilterChip';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';
import { Checkbox } from '../checkbox/Checkbox';

const meta = {
  title: 'Components/DropdownFilters',
  component: DropdownFilters,
  parameters: {
    layout: 'centered',
    docs: { source: { type: 'code', code: '' } },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const ALL_FILTERS = [
  { id: 'status', label: 'Status' },
  { id: 'role', label: 'Role' },
  { id: 'date', label: 'Date' },
  { id: 'department', label: 'Department' },
];

const FILTER_VALUES: Record<string, string[]> = {
  Status: ['Active', 'Inactive', 'Pending', 'Archived'],
  Role: ['Admin', 'Editor', 'Viewer'],
  Date: ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days'],
  Department: ['Engineering', 'Design', 'Sales', 'Support'],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function summarize(selected: Set<string>): string {
  if (selected.size === 0) return 'All';
  if (selected.size === 1) return [...selected][0];
  return `${selected.size} selected`;
}

// ---------------------------------------------------------------------------
// Shared hook — manages active filters with multi-select values and removal
// ---------------------------------------------------------------------------

function useFilters(initial: { id: string; label: string }[]) {
  const [filters, setFilters] = React.useState(
    initial.map(f => ({
      ...f,
      values: new Set<string>([FILTER_VALUES[f.label]?.[0] ?? '']),
      visible: true,
    })),
  );

  const toggleValue = (id: string, opt: string) =>
    setFilters(prev => prev.map(f => {
      if (f.id !== id) return f;
      const next = new Set(f.values);
      if (next.has(opt)) next.delete(opt); else next.add(opt);
      return { ...f, values: next };
    }));

  const setVisible = (id: string, visible: boolean) =>
    setFilters(prev => prev.map(f => f.id === id ? { ...f, visible } : f));

  const remove = (id: string) =>
    setFilters(prev => prev.filter(f => f.id !== id));

  return { filters, toggleValue, setVisible, remove };
}

// ---------------------------------------------------------------------------
// Playground — 4 removable filter chips
// ---------------------------------------------------------------------------

export const Playground: Story = {
  render: () => {
    const { filters, toggleValue, setVisible, remove } = useFilters(ALL_FILTERS);

    return (
      <DropdownFilters>
        {filters.map(f => {
          const options = FILTER_VALUES[f.label] ?? [];
          return (
            <FilterChip
              key={f.id}
              label={f.label}
              isVisible={f.visible}
              onVisibilityChange={(v) => setVisible(f.id, v)}
              size="s"
              valueSummary={<span className="dls-filter-chip__value-text">{summarize(f.values)}</span>}
            >
              <List className="dls-filter-chip__enum-list">
                {options.map(opt => (
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
                  onClick={() => remove(f.id)}
                />
              </List>
            </FilterChip>
          );
        })}
      </DropdownFilters>
    );
  },
};

// ---------------------------------------------------------------------------
// Short list — 3 removable filter chips
// ---------------------------------------------------------------------------

export const ShortList: Story = {
  render: () => {
    const { filters, toggleValue, setVisible, remove } = useFilters(ALL_FILTERS.slice(0, 3));

    return (
      <DropdownFilters>
        {filters.map(f => {
          const options = FILTER_VALUES[f.label] ?? [];
          return (
            <FilterChip
              key={f.id}
              label={f.label}
              isVisible={f.visible}
              onVisibilityChange={(v) => setVisible(f.id, v)}
              size="s"
              valueSummary={<span className="dls-filter-chip__value-text">{summarize(f.values)}</span>}
            >
              <List className="dls-filter-chip__enum-list">
                {options.map(opt => (
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
                  onClick={() => remove(f.id)}
                />
              </List>
            </FilterChip>
          );
        })}
      </DropdownFilters>
    );
  },
};

// ---------------------------------------------------------------------------
// Empty state — no filters selected
// ---------------------------------------------------------------------------

export const EmptyState: Story = {
  render: () => <DropdownFilters />,
};

// ---------------------------------------------------------------------------
// Interactive — 2 removable filter chips
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  render: () => {
    const { filters, toggleValue, setVisible, remove } = useFilters(ALL_FILTERS.slice(0, 2));

    return (
      <DropdownFilters>
        {filters.map(f => {
          const options = FILTER_VALUES[f.label] ?? [];
          return (
            <FilterChip
              key={f.id}
              label={f.label}
              isVisible={f.visible}
              onVisibilityChange={(v) => setVisible(f.id, v)}
              size="s"
              valueSummary={<span className="dls-filter-chip__value-text">{summarize(f.values)}</span>}
            >
              <List className="dls-filter-chip__enum-list">
                {options.map(opt => (
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
                  onClick={() => remove(f.id)}
                />
              </List>
            </FilterChip>
          );
        })}
      </DropdownFilters>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { FilterChip } from './FilterChip';
import { Avatar } from '../Avatar';
import { AvatarStack } from '../AvatarStack';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';
import { Checkbox } from '../checkbox/Checkbox';
import { SearchField } from '../search-field/SearchField';

const meta = {
  title: 'Components/FilterChip',
  component: FilterChip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'flex-start' }}>
      {children}
    </div>
  </div>
);

// Sample user data
const USERS = [
  { id: 1, name: 'Malik Roberson', initials: 'MR', src: 'https://i.pravatar.cc/48?u=malik' },
  { id: 2, name: 'Kenton Jerde', initials: 'KJ', src: 'https://i.pravatar.cc/48?u=kenton' },
  { id: 3, name: 'Talia Kubiak', initials: 'TK', src: 'https://i.pravatar.cc/48?u=talia' },
  { id: 4, name: 'Jayson Wintheiser', initials: 'JW', src: 'https://i.pravatar.cc/48?u=jayson' },
  { id: 5, name: 'Shea Trantow', initials: 'ST', src: 'https://i.pravatar.cc/48?u=shea' },
  { id: 6, name: 'Casey Miller', initials: 'CM', src: 'https://i.pravatar.cc/48?u=casey' },
  { id: 7, name: 'Alex Cooper', initials: 'AC', src: 'https://i.pravatar.cc/48?u=alex' },
];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    label: 'Users',
    isVisible: true,
    size: 'm',
    valueSummary: <span className="dls-filter-chip__value-text">3 Selected</span>,
  },
};

// ---------------------------------------------------------------------------
// Filter Type: User — with searchable checkbox list + avatar stack
// ---------------------------------------------------------------------------

const UserFilterDemo = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 2, 3]);
  const [search, setSearch] = useState('');

  const toggleUser = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id],
    );
  };

  const selectedUsers = USERS.filter((u) => selectedIds.includes(u.id));
  const filtered = search
    ? USERS.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    : USERS;

  return (
    <FilterChip
      label="Users"
      isVisible={isVisible}
      onVisibilityChange={setIsVisible}
      valueSummary={
        selectedUsers.length > 0 ? (
          <span className="dls-filter-chip__value-row">
            <AvatarStack size="20" max={2} total={selectedUsers.length}>
              {selectedUsers.map((u) => (
                <Avatar key={u.id} src={u.src} initials={u.initials} />
              ))}
            </AvatarStack>
            <span className="dls-filter-chip__value-text">
              {selectedUsers.length} Selected
            </span>
          </span>
        ) : (
          <span className="dls-filter-chip__value-text">None</span>
        )
      }
    >
      <List className="dls-filter-chip__user-list">
        <ListItem type="search">
          <SearchField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
            placeholder="Search users..."
          />
        </ListItem>
        <ListItem type="divider" />
        {filtered.map((user) => (
          <ListItem
            key={user.id}
            type="with-slots"
            text={user.name}
            slotLeft={
              <Avatar size="24" circle src={user.src} initials={user.initials} />
            }
            slotRight={
              <Checkbox
                checked={selectedIds.includes(user.id)}
                onChange={() => toggleUser(user.id)}
              />
            }
            onClick={() => toggleUser(user.id)}
            selected={selectedIds.includes(user.id)}
          />
        ))}
        {filtered.length === 0 && (
          <ListItem type="empty-state" text="No users found" />
        )}
      </List>
    </FilterChip>
  );
};

export const UserFilter: Story = {
  args: { label: 'Users' },
  render: () => <UserFilterDemo />,
};

// ---------------------------------------------------------------------------
// Filter Type: Date
// ---------------------------------------------------------------------------

const DateFilterDemo = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <FilterChip
      label="Date"
      isVisible={isVisible}
      onVisibilityChange={setIsVisible}
      valueSummary={
        <span className="dls-filter-chip__value-text">Mar 18, 2026</span>
      }
    >
      <List className="dls-filter-chip__date-list">
        <ListItem type="label" text="Quick picks" />
        <ListItem type="text" text="Today" />
        <ListItem type="text" text="Yesterday" />
        <ListItem type="text" text="Last 7 days" />
        <ListItem type="text" text="Last 30 days" />
        <ListItem type="text" text="This month" />
        <ListItem type="divider" />
        <ListItem type="text" text="Custom range..." />
      </List>
    </FilterChip>
  );
};

export const DateFilter: Story = {
  args: { label: 'Date' },
  render: () => <DateFilterDemo />,
};

// ---------------------------------------------------------------------------
// Filter Type: Enum — checkbox list
// ---------------------------------------------------------------------------

const EnumFilterDemo = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [selected, setSelected] = useState<string[]>(['active']);

  const OPTIONS = ['Active', 'Inactive', 'Pending', 'Archived'];

  const toggle = (opt: string) => {
    const lower = opt.toLowerCase();
    setSelected((prev) =>
      prev.includes(lower) ? prev.filter((s) => s !== lower) : [...prev, lower],
    );
  };

  const summaryText = selected.length === 0
    ? 'All'
    : selected.length === 1
      ? selected[0].charAt(0).toUpperCase() + selected[0].slice(1)
      : `${selected.length} Selected`;

  return (
    <FilterChip
      label="Status"
      isVisible={isVisible}
      onVisibilityChange={setIsVisible}
      valueSummary={
        <span className="dls-filter-chip__value-text">{summaryText}</span>
      }
    >
      <List className="dls-filter-chip__enum-list">
        {OPTIONS.map((opt) => (
          <ListItem
            key={opt}
            type="with-slots"
            text={opt}
            slotRight={
              <Checkbox
                checked={selected.includes(opt.toLowerCase())}
                onChange={() => toggle(opt)}
              />
            }
            onClick={() => toggle(opt)}
            selected={selected.includes(opt.toLowerCase())}
          />
        ))}
      </List>
    </FilterChip>
  );
};

export const EnumFilter: Story = {
  args: { label: 'Status' },
  render: () => <EnumFilterDemo />,
};

// ---------------------------------------------------------------------------
// Filter Type: Numeric — condition + value
// ---------------------------------------------------------------------------

const NumericFilterDemo = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [condition, setCondition] = useState('>');
  const [value, setValue] = useState('100');

  const CONDITIONS = ['=', '>', '<', '>=', '<=', 'between'];

  return (
    <FilterChip
      label="Amount"
      isVisible={isVisible}
      onVisibilityChange={setIsVisible}
      valueSummary={
        <span className="dls-filter-chip__value-text">{condition} {value}</span>
      }
    >
      <List className="dls-filter-chip__numeric-list">
        <ListItem type="label" text="Condition" />
        {CONDITIONS.map((c) => (
          <ListItem
            key={c}
            type="text"
            text={c}
            selected={condition === c}
            onClick={() => setCondition(c)}
          />
        ))}
        <ListItem type="divider" />
        <ListItem type="search">
          <input
            type="number"
            className="dls-filter-chip__number-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value"
          />
        </ListItem>
      </List>
    </FilterChip>
  );
};

export const NumericFilter: Story = {
  args: { label: 'Amount' },
  render: () => <NumericFilterDemo />,
};

// ---------------------------------------------------------------------------
// All States
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  args: { label: 'Users' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Active (filter applied)">
        <FilterChip
          label="Users"
          isVisible
          valueSummary={<span className="dls-filter-chip__value-text">3 Selected</span>}
        >
          <div />
        </FilterChip>
      </Section>
      <Section title="Inactive (filter hidden)">
        <FilterChip
          label="Users"
          isVisible={false}
          valueSummary={<span className="dls-filter-chip__value-text">3 Selected</span>}
        >
          <div />
        </FilterChip>
      </Section>
      <Section title="Disabled">
        <FilterChip
          label="Users"
          isVisible
          disabled
          valueSummary={<span className="dls-filter-chip__value-text">3 Selected</span>}
        >
          <div />
        </FilterChip>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  args: { label: 'Users' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="M (32px)">
        <FilterChip
          label="Status"
          size="m"
          isVisible
          valueSummary={<span className="dls-filter-chip__value-text">Active</span>}
        >
          <div />
        </FilterChip>
      </Section>
      <Section title="S (28px)">
        <FilterChip
          label="Status"
          size="s"
          isVisible
          valueSummary={<span className="dls-filter-chip__value-text">Active</span>}
        >
          <div />
        </FilterChip>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Eye toggle interaction
// ---------------------------------------------------------------------------

const EyeToggleDemo = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <span style={{ fontFamily: 'var(--dls-font-family)', fontSize: 14, color: 'var(--dls-color-text-secondary)' }}>
        Click the label chevron to toggle visibility. State: <strong>{isVisible ? 'Visible' : 'Hidden'}</strong>
      </span>
      <FilterChip
        label="Users"
        isVisible={isVisible}
        onVisibilityChange={setIsVisible}
        valueSummary={<span className="dls-filter-chip__value-text">5 Selected</span>}
      />
    </div>
  );
};

export const EyeToggle: Story = {
  args: { label: 'Users' },
  render: () => <EyeToggleDemo />,
};

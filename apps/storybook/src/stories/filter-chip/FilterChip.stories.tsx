import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { FilterChip } from './FilterChip';
import { Avatar } from '../Avatar';
import { AvatarStack } from '../AvatarStack';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';
import { Checkbox } from '../checkbox/Checkbox';
import { SearchField } from '../search-field/SearchField';
import { CalendarRange } from '../calendar/CalendarRange';
import { Button } from '../Button';
import {
  FILTER_DATE_FIXED_TODAY,
  FILTER_NUMERIC_CONDITIONS,
  FILTER_STATUS_OPTIONS,
  FILTER_USERS,
} from '../_fixtures';

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

  const selectedUsers = FILTER_USERS.filter((u) => selectedIds.includes(u.id));
  const filtered = search
    ? FILTER_USERS.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    : FILTER_USERS;

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

const formatDateRange = (start: Date, end: Date | null) => {
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  if (!end || start.getTime() === end.getTime()) return start.toLocaleDateString(undefined, opts);
  return `${start.toLocaleDateString(undefined, opts)} – ${end.toLocaleDateString(undefined, opts)}`;
};

const DateFilterDemo = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'picks' | 'range'>('picks');
  const [summary, setSummary] = useState('Mar 18, 2026');
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [draftStart, setDraftStart] = useState<Date | null>(null);
  const [draftEnd, setDraftEnd] = useState<Date | null>(null);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setView('picks');
  };

  const applyQuickPick = (label: string) => {
    setSummary(label);
    setStart(null);
    setEnd(null);
    setOpen(false);
  };

  const openCustomRange = () => {
    setDraftStart(start);
    setDraftEnd(end);
    setView('range');
  };

  const cancelRange = () => {
    setView('picks');
  };

  const applyRange = () => {
    if (draftStart) {
      setStart(draftStart);
      setEnd(draftEnd);
      setSummary(formatDateRange(draftStart, draftEnd));
    }
    setOpen(false);
    setView('picks');
  };

  return (
    <FilterChip
      label="Date"
      isVisible={isVisible}
      onVisibilityChange={setIsVisible}
      open={open}
      onOpenChange={handleOpenChange}
      valueSummary={
        <span className="dls-filter-chip__value-text">{summary}</span>
      }
    >
      <div className="dls-filter-chip__date-flyout">
        <List className="dls-filter-chip__date-list">
          <ListItem type="label" text="Quick picks" />
          <ListItem type="text" text="Today" onClick={() => applyQuickPick('Today')} />
          <ListItem type="text" text="Yesterday" onClick={() => applyQuickPick('Yesterday')} />
          <ListItem type="text" text="Last 7 days" onClick={() => applyQuickPick('Last 7 days')} />
          <ListItem type="text" text="Last 30 days" onClick={() => applyQuickPick('Last 30 days')} />
          <ListItem type="text" text="This month" onClick={() => applyQuickPick('This month')} />
          <ListItem type="divider" />
          <ListItem
            type="text"
            text="Custom range..."
            selected={view === 'range'}
            onClick={openCustomRange}
          />
        </List>
        {view === 'range' && (
          <CalendarRange
            className="dls-filter-chip__calendar-range"
            today={FILTER_DATE_FIXED_TODAY}
            startDate={draftStart}
            endDate={draftEnd}
            onRangeChange={(s, e) => { setDraftStart(s); setDraftEnd(e); }}
            footer={
              <>
                <Button variant="outline" intent="neutral" size="m" onClick={cancelRange}>Cancel</Button>
                <Button variant="filled" intent="neutral" size="m" onClick={applyRange} disabled={!draftStart}>Apply</Button>
              </>
            }
          />
        )}
      </div>
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
        {FILTER_STATUS_OPTIONS.map((opt) => (
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
        {FILTER_NUMERIC_CONDITIONS.map((c) => (
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

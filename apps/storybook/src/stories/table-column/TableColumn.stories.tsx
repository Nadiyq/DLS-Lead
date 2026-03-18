import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableColumn } from './TableColumn';
import type { TableColumnType, TableColumnRow } from './TableColumn';
import '../table/table.css';

const meta = {
  title: 'Components/TableColumn',
  component: TableColumn,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof TableColumn>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Sample rows
// ---------------------------------------------------------------------------

const textRows: TableColumnRow[] = [
  { text: 'Alice' }, { text: 'Bob' }, { text: 'Charlie' },
  { text: 'Diana' }, { text: 'Edward' },
];

const numberRows: TableColumnRow[] = [
  { text: '1,200' }, { text: '890' }, { text: '3,450' },
  { text: '567' }, { text: '12,000' },
];

const dateRows: TableColumnRow[] = [
  { text: '12 Jan 2026' }, { text: '5 Feb 2026' }, { text: '18 Mar 2026' },
  { text: '3 Apr 2026' }, { text: '22 May 2026' },
];

const checkboxRows: TableColumnRow[] = [
  { checked: true }, { checked: false }, { checked: true },
  { checked: false }, { checked: false },
];

const badgeRows: TableColumnRow[] = [
  { badgeLabel: 'Active', badgeIntent: 'success' },
  { badgeLabel: 'Pending', badgeIntent: 'warning' },
  { badgeLabel: 'Active', badgeIntent: 'success' },
  { badgeLabel: 'Inactive', badgeIntent: 'danger' },
  { badgeLabel: 'Active', badgeIntent: 'success' },
];

const userRows: TableColumnRow[] = [
  { text: 'John Smith', initials: 'JS' },
  { text: 'Jane Doe', initials: 'JD' },
  { text: 'Bob Wilson', initials: 'BW' },
  { text: 'Alice Chen', initials: 'AC' },
  { text: 'Tom Lee', initials: 'TL' },
];

const twoLineRows: TableColumnRow[] = [
  { text: 'Project Alpha', secondaryText: 'Engineering' },
  { text: 'Project Beta', secondaryText: 'Design' },
  { text: 'Project Gamma', secondaryText: 'Marketing' },
  { text: 'Project Delta', secondaryText: 'Sales' },
  { text: 'Project Epsilon', secondaryText: 'Support' },
];

const twoLineAvatarRows: TableColumnRow[] = [
  { text: 'John Smith', secondaryText: 'jsmith@gmail.com', initials: 'JS' },
  { text: 'Jane Doe', secondaryText: 'jane@gmail.com', initials: 'JD' },
  { text: 'Bob Wilson', secondaryText: 'bob@gmail.com', initials: 'BW' },
  { text: 'Alice Chen', secondaryText: 'alice@gmail.com', initials: 'AC' },
  { text: 'Tom Lee', secondaryText: 'tom@gmail.com', initials: 'TL' },
];

const stackedRows: TableColumnRow[] = [
  { initials: 'JS', stackedCount: 3 },
  { initials: 'AB', stackedCount: 20 },
  { initials: 'CD', stackedCount: 5 },
  { initials: 'EF', stackedCount: 0 },
  { initials: 'GH', stackedCount: 12 },
];

const cardRows: TableColumnRow[] = [
  { cardLast4: '1234' }, { cardLast4: '5678' }, { cardLast4: '9012' },
  { cardLast4: '3456' }, { cardLast4: '7890' },
];

const actionsRows: TableColumnRow[] = [
  {}, {}, {}, {}, {},
];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    type: 'text',
    header: 'Name',
    sortable: true,
    rows: textRows,
  },
};

// ---------------------------------------------------------------------------
// All column types
// ---------------------------------------------------------------------------

export const AllTypes: Story = {
  args: {
    type: 'text',
    rows: textRows,
  },
  render: () => {
    const types: { type: TableColumnType; rows: TableColumnRow[]; header?: string }[] = [
      { type: 'checkbox', rows: checkboxRows },
      { type: 'text', rows: textRows, header: 'Name' },
      { type: 'number', rows: numberRows, header: 'Amount' },
      { type: 'date', rows: dateRows },
      { type: 'badge', rows: badgeRows, header: 'Status' },
      { type: 'user', rows: userRows },
      { type: 'two-line', rows: twoLineRows, header: 'Project' },
      { type: 'card', rows: cardRows },
      { type: 'actions', rows: actionsRows },
    ];

    return (
      <div className="dls-table__columns" style={{
        gridTemplateColumns: '40px repeat(7, 1fr) 100px',
        gridTemplateRows: 'repeat(6, auto)',
        border: '1px solid var(--dls-color-border-subtle)',
        borderRadius: 'var(--dls-radius-component-card)',
        overflow: 'hidden',
      }}>
        {types.map((t, i) => (
          <TableColumn
            key={i}
            type={t.type}
            header={t.header}
            rows={t.rows}
            sortable={t.type !== 'checkbox' && t.type !== 'actions'}
          />
        ))}
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Text column
// ---------------------------------------------------------------------------

export const TextColumn: Story = {
  args: {
    type: 'text',
    header: 'Name',
    sortable: true,
    rows: textRows,
  },
};

// ---------------------------------------------------------------------------
// Number column
// ---------------------------------------------------------------------------

export const NumberColumn: Story = {
  args: {
    type: 'number',
    header: 'Amount',
    sortable: true,
    rows: numberRows,
  },
};

// ---------------------------------------------------------------------------
// Badge column
// ---------------------------------------------------------------------------

export const BadgeColumn: Story = {
  args: {
    type: 'badge',
    header: 'Status',
    rows: badgeRows,
  },
};

// ---------------------------------------------------------------------------
// Two-line + avatar column
// ---------------------------------------------------------------------------

export const TwoLineAvatarColumn: Story = {
  args: {
    type: 'two-line+avatar',
    header: 'User',
    rows: twoLineAvatarRows,
  },
};

// ---------------------------------------------------------------------------
// Users stacked column
// ---------------------------------------------------------------------------

export const UsersStackedColumn: Story = {
  args: {
    type: 'users-stacked',
    header: 'Team',
    rows: stackedRows,
  },
};

// ---------------------------------------------------------------------------
// Full table example
// ---------------------------------------------------------------------------

export const FullTable: Story = {
  args: {
    type: 'text',
    rows: textRows,
  },
  render: () => (
    <div className="dls-table__columns" style={{
      gridTemplateColumns: '40px 2fr 1fr 1fr 1fr 100px',
      gridTemplateRows: 'repeat(6, auto)',
      border: '1px solid var(--dls-color-border-subtle)',
      borderRadius: 'var(--dls-radius-component-card)',
      overflow: 'hidden',
      width: 800,
    }}>
      <TableColumn type="checkbox" rows={checkboxRows} />
      <TableColumn type="two-line+avatar" header="User" rows={twoLineAvatarRows} sortable />
      <TableColumn type="badge" header="Status" rows={badgeRows} />
      <TableColumn type="date" header="Joined" rows={dateRows} sortable />
      <TableColumn type="number" header="Amount" rows={numberRows} sortable />
      <TableColumn type="actions" rows={actionsRows} />
    </div>
  ),
};

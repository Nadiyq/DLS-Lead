import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableColumn } from './TableColumn';
import type { TableColumnType, TableColumnRow } from './TableColumn';
import { TABLE_COLUMN_ROWS } from '../_fixtures';
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
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    type: 'text',
    header: 'Name',
    sortable: true,
    rows: TABLE_COLUMN_ROWS.text,
  },
};

// ---------------------------------------------------------------------------
// All column types
// ---------------------------------------------------------------------------

export const AllTypes: Story = {
  args: {
    type: 'text',
    rows: TABLE_COLUMN_ROWS.text,
  },
  render: () => {
    const types: { type: TableColumnType; rows: TableColumnRow[]; header?: string }[] = [
      { type: 'checkbox', rows: TABLE_COLUMN_ROWS.checkbox },
      { type: 'text', rows: TABLE_COLUMN_ROWS.text, header: 'Name' },
      { type: 'number', rows: TABLE_COLUMN_ROWS.number, header: 'Amount' },
      { type: 'date', rows: TABLE_COLUMN_ROWS.date },
      { type: 'badge', rows: TABLE_COLUMN_ROWS.badge, header: 'Status' },
      { type: 'user', rows: TABLE_COLUMN_ROWS.user },
      { type: 'two-line', rows: TABLE_COLUMN_ROWS.twoLine, header: 'Project' },
      { type: 'card', rows: TABLE_COLUMN_ROWS.card },
      { type: 'actions', rows: TABLE_COLUMN_ROWS.actions },
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
    rows: TABLE_COLUMN_ROWS.text,
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
    rows: TABLE_COLUMN_ROWS.number,
  },
};

// ---------------------------------------------------------------------------
// Badge column
// ---------------------------------------------------------------------------

export const BadgeColumn: Story = {
  args: {
    type: 'badge',
    header: 'Status',
    rows: TABLE_COLUMN_ROWS.badge,
  },
};

// ---------------------------------------------------------------------------
// Two-line + avatar column
// ---------------------------------------------------------------------------

export const TwoLineAvatarColumn: Story = {
  args: {
    type: 'two-line+avatar',
    header: 'User',
    rows: TABLE_COLUMN_ROWS.twoLineAvatar,
  },
};

// ---------------------------------------------------------------------------
// Users stacked column
// ---------------------------------------------------------------------------

export const UsersStackedColumn: Story = {
  args: {
    type: 'users-stacked',
    header: 'Team',
    rows: TABLE_COLUMN_ROWS.stacked,
  },
};

// ---------------------------------------------------------------------------
// Full table example
// ---------------------------------------------------------------------------

export const FullTable: Story = {
  args: {
    type: 'text',
    rows: TABLE_COLUMN_ROWS.text,
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
      <TableColumn type="checkbox" rows={TABLE_COLUMN_ROWS.checkbox} />
      <TableColumn type="two-line+avatar" header="User" rows={TABLE_COLUMN_ROWS.twoLineAvatar} sortable />
      <TableColumn type="badge" header="Status" rows={TABLE_COLUMN_ROWS.badge} />
      <TableColumn type="date" header="Joined" rows={TABLE_COLUMN_ROWS.date} sortable />
      <TableColumn type="number" header="Amount" rows={TABLE_COLUMN_ROWS.number} sortable />
      <TableColumn type="actions" rows={TABLE_COLUMN_ROWS.actions} />
    </div>
  ),
};

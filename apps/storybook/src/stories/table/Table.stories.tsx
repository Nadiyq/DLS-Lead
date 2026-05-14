import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Pencil as PencilIcon,
  Trash2 as TrashIcon,
} from 'lucide-react';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Checkbox } from '../checkbox/Checkbox';
import { TABLE_ROWS } from '../_fixtures';
import { Table } from './Table';
import { TableCell } from '../table-cell/TableCell';
import {
  InteractiveDataTable,
  type DataTableColumn,
  renderStatusBadge,
} from './interactive-data-table.story-helpers';

interface MemberRow {
  id: string;
  name: string;
  email: string;
  initials?: string;
  avatarSrc?: string;
  status: 'Active' | 'Pending' | 'Inactive';
  role: 'Admin' | 'Editor' | 'Viewer';
  joined: string;
  amount: string;
}

const {
  user: userRows,
  badge: badgeRows,
  date: dateRows,
  number: numberRows,
} = TABLE_ROWS;

const MEMBER_ROWS: MemberRow[] = userRows.map((user, index) => ({
  id: `member-${index + 1}`,
  name: user.text ?? `Member ${index + 1}`,
  email: user.secondaryText ?? `member${index + 1}@example.com`,
  initials: user.initials,
  avatarSrc: user.avatarSrc,
  status: (badgeRows[index]?.badgeLabel as MemberRow['status']) ?? 'Active',
  role: (['Admin', 'Editor', 'Viewer', 'Editor', 'Viewer'][index] as MemberRow['role']) ?? 'Viewer',
  joined: dateRows[index]?.text ?? '12 Jan 2026',
  amount: numberRows[index]?.text ?? '$0',
}));

const amountValue = (amount: string) => Number(amount.replace(/[$,]/g, ''));
const statusIntent = (status: MemberRow['status']) => (
  status === 'Active' ? 'success' :
  status === 'Pending' ? 'warning' :
  'danger'
);

const memberColumns: DataTableColumn<MemberRow>[] = [
  {
    id: 'select',
    label: 'Select',
    width: 48,
    minWidth: 48,
    sortable: false,
    filterable: false,
    resizable: false,
    hideable: false,
    pinned: true,
    getValue: () => '',
    renderCell: (row, context, pinned) => (
      <TableCell key="select" type="slot" align="center" className={pinned.className} style={pinned.style}>
        <Checkbox
          checked={context.selected}
          aria-label={`Select ${row.name}`}
          onChange={context.toggleSelected}
        />
      </TableCell>
    ),
  },
  {
    id: 'user',
    label: 'User',
    width: 260,
    minWidth: 200,
    sortable: true,
    filterable: true,
    pinned: true,
    getValue: (row) => row.name,
    getSortValue: (row) => row.name,
    getFilterValue: (row) => row.name,
    getSearchValue: (row) => `${row.name} ${row.email}`,
    renderCell: (row, _context, pinned) => (
      <TableCell
        key="user"
        type="two-line"
        text={row.name}
        secondaryText={row.email}
        className={pinned.className}
        style={pinned.style}
        slotLeft={<Avatar size="24" circle src={row.avatarSrc} initials={row.initials} />}
      />
    ),
  },
  {
    id: 'status',
    label: 'Status',
    width: 140,
    minWidth: 112,
    sortable: true,
    filterable: true,
    getValue: (row) => row.status,
    getSortValue: (row) => row.status,
    getFilterValue: (row) => row.status,
    renderCell: (row, _context, pinned) => (
      <TableCell key="status" type="badge" className={pinned.className} style={pinned.style}>
        {renderStatusBadge(row.status, statusIntent(row.status))}
      </TableCell>
    ),
    renderMobileValue: (row) => renderStatusBadge(row.status, statusIntent(row.status)),
  },
  {
    id: 'role',
    label: 'Role',
    width: 140,
    minWidth: 112,
    visible: false,
    sortable: true,
    filterable: true,
    getValue: (row) => row.role,
    getSortValue: (row) => row.role,
    getFilterValue: (row) => row.role,
  },
  {
    id: 'joined',
    label: 'Joined',
    width: 150,
    minWidth: 128,
    sortable: true,
    filterable: true,
    getValue: (row) => row.joined,
    getSortValue: (row) => Date.parse(row.joined),
    getFilterValue: (row) => row.joined,
  },
  {
    id: 'amount',
    label: 'Amount',
    width: 140,
    minWidth: 112,
    align: 'right',
    sortable: true,
    filterable: true,
    getValue: (row) => row.amount,
    getSortValue: (row) => amountValue(row.amount),
    getFilterValue: (row) => row.amount,
  },
  {
    id: 'actions',
    label: 'Actions',
    width: 112,
    minWidth: 96,
    align: 'center',
    sortable: false,
    filterable: false,
    resizable: false,
    hideable: false,
    getValue: () => 'Actions',
    renderCell: (row, _context, pinned) => (
      <TableCell key="actions" type="actions" align="center" className={pinned.className} style={pinned.style}>
        <span className="dls-table-column__actions">
          <Button variant="ghost" intent="neutral" size="m" icon={<PencilIcon />} iconOnly aria-label={`Edit ${row.name}`} />
          <Button variant="ghost" intent="neutral" size="m" icon={<TrashIcon />} iconOnly aria-label={`Delete ${row.name}`} />
        </span>
      </TableCell>
    ),
  },
];

const createMember = (rows: MemberRow[]): MemberRow => {
  const next = rows.length + 1;
  return {
    id: `member-${next}`,
    name: `New member ${next}`,
    email: `new.member${next}@example.com`,
    initials: 'NM',
    status: 'Pending',
    role: 'Viewer',
    joined: '11 May 2026',
    amount: '$0',
  };
};

interface MemberTableStoryProps {
  initialShowFilters?: boolean;
  showPagination?: boolean;
  initialPageSize?: number;
}

const MemberTableStory = ({
  initialShowFilters = false,
  showPagination = true,
  initialPageSize = 5,
}: MemberTableStoryProps) => (
  <InteractiveDataTable
    rows={MEMBER_ROWS}
    columns={memberColumns}
    getRowId={(row) => row.id}
    primaryActionLabel="Add row"
    createRow={createMember}
    initialShowFilters={initialShowFilters}
    showPagination={showPagination}
    initialPageSize={initialPageSize}
    mobile={{
      primaryColumnId: 'user',
      secondaryColumnId: 'amount',
      supportingColumnIds: ['status', 'joined'],
      actionsColumnId: 'actions',
    }}
  />
);

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: { source: { type: 'code', code: '' } },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { children: null },
  render: () => <MemberTableStory />,
};

export const Default: Story = {
  args: { children: null },
  render: () => <MemberTableStory />,
};

export const WithFilters: Story = {
  args: { children: null },
  parameters: {
    docs: { source: { code: '' } },
  },
  render: () => <MemberTableStory initialShowFilters />,
};

export const NoPagination: Story = {
  args: { children: null },
  render: () => <MemberTableStory showPagination={false} />,
};

export const InteractivePagination: Story = {
  args: { children: null },
  render: () => <MemberTableStory initialPageSize={5} />,
};

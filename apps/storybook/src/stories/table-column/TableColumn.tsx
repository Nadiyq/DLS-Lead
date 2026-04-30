import React from 'react';
import { Pencil as PencilIcon, Trash2 as TrashIcon, Circle as CircleIcon } from 'lucide-react';
import './table-column.css';
import { TableHeaderCell } from '../table-header-cell/TableHeaderCell';
import { TableCell } from '../table-cell/TableCell';
import { Avatar } from '../Avatar';
import { AvatarStack } from '../AvatarStack';
import { Button } from '../Button';
import { Checkbox } from '../checkbox/Checkbox';
import { IconShape } from '../icon-shape/IconShape';
import { mastercardLogo } from '../assets/brand-logos';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type TableColumnType =
  | 'text'
  | 'number'
  | 'checkbox'
  | 'date'
  | 'badge'
  | 'user'
  | 'users-stacked'
  | 'two-line'
  | 'two-line+avatar'
  | 'icon-shape'
  | 'card'
  | 'actions';

export interface TableColumnProps {
  /** Column type — determines header and cell rendering */
  type: TableColumnType;
  /** Column header text */
  header?: string;
  /** Row data — array of cell values */
  rows: TableColumnRow[];
  /** Whether the column is sortable */
  sortable?: boolean;
  className?: string;
}

/** Row data varies by column type */
export interface TableColumnRow {
  /** Primary text (text, number, date types) */
  text?: string;
  /** Secondary text (two-line types) */
  secondaryText?: string;
  /** Badge label */
  badgeLabel?: string;
  /** Badge intent */
  badgeIntent?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  /** Avatar initials */
  initials?: string;
  /** Avatar image src */
  avatarSrc?: string;
  /** Stacked avatar count (legacy — used when no users array provided) */
  stackedCount?: number;
  /** Full list of users for users-stacked column. First two are shown as avatars; the rest populate the +N hover dropdown. */
  users?: { name: string; initials?: string; src?: string }[];
  /** Card last 4 digits */
  cardLast4?: string;
  /** Checkbox checked state */
  checked?: boolean;
  /** Generic render slot */
  render?: React.ReactNode;
}

/* Lucide icons (Pencil, Trash2, Circle) imported above. Checkbox uses DLS Checkbox component. */

/* ---------------------------------------------------------------------------
   Helper: status badge (no DLS text badge component exists yet)
   --------------------------------------------------------------------------- */

const StatusBadge = ({ label, intent = 'neutral' }: { label: string; intent?: string }) => (
  <span
    className="dls-table-column__badge"
    data-intent={intent}
  >
    {label}
  </span>
);

/* ---------------------------------------------------------------------------
   Cell renderer by column type
   --------------------------------------------------------------------------- */

const renderCell = (type: TableColumnType, row: TableColumnRow, idx: number) => {
  switch (type) {
    case 'text':
    case 'date':
      return <TableCell key={idx} type="text" text={row.text} />;

    case 'number':
      return <TableCell key={idx} type="text" text={row.text} align="right" />;

    case 'checkbox':
      return (
        <TableCell key={idx} type="slot" align="center">
          <Checkbox checked={row.checked} />
        </TableCell>
      );

    case 'badge':
      return (
        <TableCell key={idx} type="badge">
          <StatusBadge label={row.badgeLabel || ''} intent={row.badgeIntent} />
        </TableCell>
      );

    case 'user':
      return (
        <TableCell key={idx} type="text" text={row.text} slotLeft={
          <Avatar size="24" circle src={row.avatarSrc} initials={row.initials} className="dls-table-column__avatar" />
        } />
      );

    case 'users-stacked': {
      const users = row.users && row.users.length > 0
        ? row.users
        : [
            { name: row.initials || 'AB', initials: row.initials || 'AB' },
            { name: row.initials || 'CD', initials: row.initials || 'CD' },
          ];
      const total = users.length + (row.users ? 0 : (row.stackedCount ?? 0));
      return (
        <TableCell key={idx} type="slot">
          <AvatarStack size="24" max={2} total={total}>
            {users.map((u, i) => (
              <Avatar key={i} src={u.src} initials={u.initials} alt={u.name} />
            ))}
          </AvatarStack>
        </TableCell>
      );
    }

    case 'two-line':
      return <TableCell key={idx} type="two-line" text={row.text} secondaryText={row.secondaryText} />;

    case 'two-line+avatar':
      return (
        <TableCell key={idx} type="two-line" text={row.text} secondaryText={row.secondaryText} slotLeft={
          <Avatar size="24" circle src={row.avatarSrc} initials={row.initials} className="dls-table-column__avatar" />
        } />
      );

    case 'icon-shape':
      return (
        <TableCell key={idx} type="slot">
          {row.render || <IconShape intent="neutral" size="xs"><CircleIcon /></IconShape>}
        </TableCell>
      );

    case 'card':
      return (
        <TableCell key={idx} type="slot">
          <span className="dls-table-column__card">
            <span className="dls-table-column__card-icon">
              <img src={mastercardLogo} alt="Mastercard" />
            </span>
            <span className="dls-table-column__card-number">
              <span className="dls-table-column__card-dots">••••</span>
              <span>{row.cardLast4 || '1234'}</span>
            </span>
          </span>
        </TableCell>
      );

    case 'actions':
      return (
        <TableCell key={idx} type="actions" align="center">
          {row.render || (
            <span className="dls-table-column__actions">
              <Button variant="ghost" intent="neutral" size="m" icon={<PencilIcon />} iconOnly aria-label="Edit" />
              <Button variant="ghost" intent="neutral" size="m" icon={<TrashIcon />} iconOnly aria-label="Delete" />
            </span>
          )}
        </TableCell>
      );

    default:
      return <TableCell key={idx} type="text" text={row.text} />;
  }
};

/* ---------------------------------------------------------------------------
   Header defaults by type
   --------------------------------------------------------------------------- */

const defaultHeaders: Record<TableColumnType, string> = {
  text: 'Text',
  number: 'Number',
  checkbox: '',
  date: 'Date',
  badge: 'Badge',
  user: 'User',
  'users-stacked': 'Users',
  'two-line': 'Two-line',
  'two-line+avatar': 'User',
  'icon-shape': 'Icon',
  card: 'Card',
  actions: 'Actions',
};

const headerAlign: Record<TableColumnType, 'left' | 'center' | 'right'> = {
  text: 'left',
  number: 'right',
  checkbox: 'center',
  date: 'left',
  badge: 'left',
  user: 'left',
  'users-stacked': 'left',
  'two-line': 'left',
  'two-line+avatar': 'left',
  'icon-shape': 'left',
  card: 'left',
  actions: 'center',
};

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const TableColumn = React.forwardRef<HTMLDivElement, TableColumnProps>(
  (
    {
      type,
      header,
      rows,
      sortable = false,
      className,
    },
    ref,
  ) => {
    const headerText = header ?? defaultHeaders[type];
    const align = headerAlign[type];

    return (
      <div
        ref={ref}
        className={['dls-table-column', className].filter(Boolean).join(' ')}
      >
        {type === 'checkbox' ? (
          <TableHeaderCell type="control">
            <Checkbox />
          </TableHeaderCell>
        ) : (
          <TableHeaderCell
            text={headerText}
            align={align}
            sortable={sortable}
          />
        )}

        {rows.map((row, i) => renderCell(type, row, i))}
      </div>
    );
  },
);

TableColumn.displayName = 'TableColumn';

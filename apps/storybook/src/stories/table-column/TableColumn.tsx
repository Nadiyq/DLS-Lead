import React from 'react';
import './table-column.css';
import { TableHeaderCell } from '../table-header-cell/TableHeaderCell';
import { TableCell } from '../table-cell/TableCell';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Checkbox } from '../checkbox/Checkbox';
import { IconShape } from '../icon-shape/IconShape';

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
  /** Stacked avatar count */
  stackedCount?: number;
  /** Card last 4 digits */
  cardLast4?: string;
  /** Checkbox checked state */
  checked?: boolean;
  /** Generic render slot */
  render?: React.ReactNode;
}

/* ---------------------------------------------------------------------------
   Helper icons
   --------------------------------------------------------------------------- */

const EditIcon = () => (
  <svg viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 16 16" fill="none"><path d="M2 4H14M5 4V2H11V4M6 7V12M10 7V12M3 4L4 14H12L13 4" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const CircleIcon = () => (
  <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.33" /></svg>
);

/* Checkbox uses DLS Checkbox component */

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

    case 'users-stacked':
      return (
        <TableCell key={idx} type="slot">
          <span className="dls-table-column__stacked">
            <Avatar size="24" circle initials={row.initials || 'AB'} className="dls-table-column__avatar" />
            <Avatar size="24" circle initials={row.initials || 'CD'} className="dls-table-column__avatar" />
            {(row.stackedCount ?? 0) > 0 && (
              <span className="dls-table-column__stacked-more">+{row.stackedCount}</span>
            )}
          </span>
        </TableCell>
      );

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
            <span className="dls-table-column__card-icon" />
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
              <Button variant="ghost" intent="neutral" size="m" icon={<EditIcon />} iconOnly aria-label="Edit" />
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

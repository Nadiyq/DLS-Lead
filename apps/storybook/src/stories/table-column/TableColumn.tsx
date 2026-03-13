import React from 'react';
import './table-column.css';
import { TableHeaderCell } from '../table-header-cell/TableHeaderCell';
import { TableCell } from '../table-cell/TableCell';

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

/* ---------------------------------------------------------------------------
   Helper: small checkbox
   --------------------------------------------------------------------------- */

const SmallCheckbox = ({ checked }: { checked?: boolean }) => (
  <span style={{
    display: 'inline-flex', width: 18, height: 18, borderRadius: 'var(--dls-radius-component-checkbox)',
    border: `1px solid ${checked ? 'var(--dls-color-intent-neutral-base)' : 'var(--dls-color-border-strong)'}`,
    background: checked ? 'var(--dls-color-intent-neutral-base)' : 'var(--dls-color-surface-base)',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--dls-color-intent-neutral-on-base)',
  }}>
    {checked && (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6L5 8.5L9.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </span>
);

/* ---------------------------------------------------------------------------
   Helper: small badge
   --------------------------------------------------------------------------- */

const SmallBadge = ({ label, intent = 'neutral' }: { label: string; intent?: string }) => (
  <span style={{
    display: 'inline-flex', padding: '2px 8px',
    fontSize: 'var(--dls-text-s-font-size)', lineHeight: 'var(--dls-text-s-line-height)',
    fontWeight: 'var(--dls-font-weight-medium)', fontFamily: 'var(--dls-font-family)',
    borderRadius: 'var(--dls-radius-component-badge)',
    background: `var(--dls-color-intent-${intent}-subtle)`,
    color: `var(--dls-color-intent-${intent}-text)`,
  }}>
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
          <SmallCheckbox checked={row.checked} />
        </TableCell>
      );

    case 'badge':
      return (
        <TableCell key={idx} type="badge">
          <SmallBadge label={row.badgeLabel || ''} intent={row.badgeIntent} />
        </TableCell>
      );

    case 'user':
      return (
        <TableCell key={idx} type="text" text={row.text} slotLeft={
          <span className="dls-table-column__avatar">
            {row.avatarSrc ? <img src={row.avatarSrc} alt="" /> : row.initials}
          </span>
        } />
      );

    case 'users-stacked':
      return (
        <TableCell key={idx} type="slot">
          <span className="dls-table-column__stacked">
            <span className="dls-table-column__avatar">{row.initials || 'AB'}</span>
            <span className="dls-table-column__avatar">{row.initials || 'CD'}</span>
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
          <span className="dls-table-column__avatar">
            {row.avatarSrc ? <img src={row.avatarSrc} alt="" /> : row.initials}
          </span>
        } />
      );

    case 'icon-shape':
      return (
        <TableCell key={idx} type="slot">
          <span className="dls-table-column__icon-shape">
            {row.render || <CircleIcon />}
          </span>
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
              <button type="button" className="dls-table-column__action-btn" aria-label="Edit"><EditIcon /></button>
              <button type="button" className="dls-table-column__action-btn" aria-label="Delete"><TrashIcon /></button>
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
            <SmallCheckbox />
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

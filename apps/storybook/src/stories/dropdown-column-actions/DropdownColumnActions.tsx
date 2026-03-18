import React from 'react';
import './dropdown-column-actions.css';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const ArrowDownIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3V13M8 13L4 9M8 13L12 9" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 13V3M8 3L4 7M8 3L12 7" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 2.5L13.5 6.5L10.5 7.5L8 10L7 13L3 9L6 8L8.5 5.5L9.5 2.5Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 8C1.5 8 4 3.5 8 3.5C12 3.5 14.5 8 14.5 8C14.5 8 12 12.5 8 12.5C4 12.5 1.5 8 1.5 8Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.33" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type SortState = 'asc' | 'desc' | 'none';

export interface DropdownColumnActionsProps {
  /** Current sort state for this column */
  sortState?: SortState;
  /** Whether column is pinned */
  pinned?: boolean;
  /** Whether "move left" is disabled (first column) */
  canMoveLeft?: boolean;
  /** Whether "move right" is disabled (last column) */
  canMoveRight?: boolean;
  /** Callbacks */
  onSortAsc?: () => void;
  onSortDesc?: () => void;
  onFilter?: () => void;
  onPin?: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  onHide?: () => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const DropdownColumnActions = React.forwardRef<HTMLDivElement, DropdownColumnActionsProps>(
  (
    {
      sortState = 'none',
      pinned = false,
      canMoveLeft = true,
      canMoveRight = true,
      onSortAsc,
      onSortDesc,
      onFilter,
      onPin,
      onMoveLeft,
      onMoveRight,
      onHide,
      className,
    },
    ref,
  ) => {
    return (
      <List
        ref={ref}
        className={['dls-dropdown-column-actions', className].filter(Boolean).join(' ')}
      >
        {/* Sort section */}
        <ListItem
          type="with-slots"
          iconStart={<ArrowDownIcon />}
          text="Sort ascending"
          selected={sortState === 'asc'}
          onClick={onSortAsc}
        />
        <ListItem
          type="with-slots"
          iconStart={<ArrowUpIcon />}
          text="Sort descending"
          selected={sortState === 'desc'}
          onClick={onSortDesc}
        />
        <ListItem
          type="with-slots"
          iconStart={<FilterIcon />}
          text="Filter"
          onClick={onFilter}
        />

        <ListItem type="divider" />

        {/* Column management section */}
        <ListItem
          type="with-slots"
          iconStart={<PinIcon />}
          text={pinned ? 'Unpin column' : 'Pin column'}
          selected={pinned}
          onClick={onPin}
        />
        <ListItem
          type="with-slots"
          iconStart={<ArrowLeftIcon />}
          text="Move left"
          disabled={!canMoveLeft}
          onClick={canMoveLeft ? onMoveLeft : undefined}
        />
        <ListItem
          type="with-slots"
          iconStart={<ArrowRightIcon />}
          text="Move right"
          disabled={!canMoveRight}
          onClick={canMoveRight ? onMoveRight : undefined}
        />

        <ListItem type="divider" />

        {/* Visibility section */}
        <ListItem
          type="with-slots"
          iconStart={<EyeIcon />}
          text="Hide column"
          onClick={onHide}
        />
      </List>
    );
  },
);

DropdownColumnActions.displayName = 'DropdownColumnActions';

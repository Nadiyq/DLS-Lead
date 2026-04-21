import React from 'react';
import {
  ArrowDown as ArrowDownIcon,
  ArrowUp as ArrowUpIcon,
  ListFilter as ListFilterIcon,
  Pin as PinIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  EyeOff as EyeOffIcon,
} from 'lucide-react';
import './dropdown-column-actions.css';
import { ListItem } from '../list-item/ListItem';

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
      <div
        ref={ref}
        className={['dls-dropdown-column-actions', className].filter(Boolean).join(' ')}
        role="listbox"
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
          iconStart={<ListFilterIcon />}
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
          onClick={canMoveLeft ? onMoveLeft : undefined}
        />
        <ListItem
          type="with-slots"
          iconStart={<ArrowRightIcon />}
          text="Move right"
          onClick={canMoveRight ? onMoveRight : undefined}
        />

        <ListItem type="divider" />

        {/* Visibility section */}
        <ListItem
          type="with-slots"
          iconStart={<EyeOffIcon />}
          text="Hide column"
          onClick={onHide}
        />
      </div>
    );
  },
);

DropdownColumnActions.displayName = 'DropdownColumnActions';

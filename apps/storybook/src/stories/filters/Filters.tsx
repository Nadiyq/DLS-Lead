import React from 'react';
import { Plus as PlusIcon } from 'lucide-react';
import './filters.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type FiltersSize = 'm' | 's';

export interface FilterGroup {
  /** Unique key for the group */
  id: string;
  /** Content rendered inside the group (typically FilterChip instances) */
  children: React.ReactNode;
}

export interface FiltersProps {
  /** Filter groups to display */
  groups: FilterGroup[];
  /** Size of the filter bar */
  size?: FiltersSize;
  /** Whether to show the add-filter button */
  showAdd?: boolean;
  /** Called when the add-filter button is clicked */
  onAdd?: () => void;
  /** Disabled state */
  disabled?: boolean;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Filters = React.forwardRef<HTMLDivElement, FiltersProps>(
  (
    {
      groups,
      size = 'm',
      showAdd = true,
      onAdd,
      disabled = false,
      className,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={['dls-filters', className].filter(Boolean).join(' ')}
        data-size={size}
        role="toolbar"
        aria-label="Table filters"
      >
        {groups.map((group, i) => (
          <React.Fragment key={group.id}>
            {i > 0 && <span className="dls-filters__divider" aria-hidden="true" />}
            {group.children}
          </React.Fragment>
        ))}

        {showAdd && (
          <button
            type="button"
            className="dls-filters__add"
            data-disabled={disabled || undefined}
            aria-label="Add filter"
            onClick={!disabled ? onAdd : undefined}
            disabled={disabled}
          >
            <PlusIcon />
          </button>
        )}
      </div>
    );
  },
);

Filters.displayName = 'Filters';

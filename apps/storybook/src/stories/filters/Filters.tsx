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

/** Optional menu rendered when the add-filter Plus button is clicked.
 *  Pass a ReactNode for the simplest case, or a render function that
 *  receives a `close` callback for menus whose items need to close
 *  the popover after a selection. */
export type FiltersAddMenu =
  | React.ReactNode
  | ((close: () => void) => React.ReactNode);

export interface FiltersProps {
  /** Filter groups to display */
  groups: FilterGroup[];
  /** Size of the filter bar */
  size?: FiltersSize;
  /** Whether to show the add-filter button */
  showAdd?: boolean;
  /** Called when the add-filter button is clicked (only used when
   *  `addMenu` is NOT provided). */
  onAdd?: () => void;
  /** Optional menu attached to the add-filter Plus button. When
   *  provided, clicking Plus toggles the menu open / closed instead
   *  of firing `onAdd` directly. The menu is the consumer's content
   *  — typically a <List> of <ListItem>s representing available
   *  filter columns. */
  addMenu?: FiltersAddMenu;
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
      addMenu,
      disabled = false,
      className,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const wrapperRef = React.useRef<HTMLSpanElement>(null);
    const close = React.useCallback(() => setOpen(false), []);

    // Close on click outside the add-menu wrapper
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    // Close on Escape
    React.useEffect(() => {
      if (!open) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }, [open]);

    const renderedAddMenu = open
      ? (typeof addMenu === 'function' ? addMenu(close) : addMenu)
      : null;

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
          addMenu ? (
            <span ref={wrapperRef} className="dls-filters__add-wrapper">
              <button
                type="button"
                className="dls-filters__add"
                data-disabled={disabled || undefined}
                aria-label="Add filter"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={!disabled ? () => setOpen(v => !v) : undefined}
                disabled={disabled}
              >
                <PlusIcon />
              </button>
              {renderedAddMenu && (
                <div
                  className="dls-filters__add-menu"
                  role="menu"
                  // Any click inside the menu propagates from the chosen
                  // <ListItem>'s onClick — consumers using the render-prop
                  // form can call `close()` from there. As a safety net,
                  // also close on a `mousedown` that targets a list-item
                  // directly (no propagation stop).
                  onClickCapture={(e) => {
                    const t = e.target as HTMLElement;
                    if (t.closest('.dls-list-item')) close();
                  }}
                >
                  {renderedAddMenu}
                </div>
              )}
            </span>
          ) : (
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
          )
        )}
      </div>
    );
  },
);

Filters.displayName = 'Filters';

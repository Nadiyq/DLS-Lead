import React from 'react';
import './submenu.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface SubmenuProps {
  /** The parent menu item (rendered at the top) */
  parent: React.ReactNode;
  /** Whether the submenu children are visible */
  expanded?: boolean;
  /** Child menu items (rendered indented below parent) */
  children?: React.ReactNode;
  /** Additional slot content at the bottom */
  slotContent?: React.ReactNode;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Submenu = React.forwardRef<HTMLDivElement, SubmenuProps>(
  (
    {
      parent,
      expanded = false,
      children,
      slotContent,
      className,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={['dls-submenu', className].filter(Boolean).join(' ')}
        role="group"
      >
        {/* Parent item */}
        {parent}

        {/* Indented children */}
        {expanded && children && (
          <div className="dls-submenu__children">
            {children}
          </div>
        )}

        {/* Optional slot content */}
        {expanded && slotContent && (
          <div className="dls-submenu__slot">
            {slotContent}
          </div>
        )}
      </div>
    );
  },
);

Submenu.displayName = 'Submenu';

import React from 'react';
import './toolbar.css';

/* ---------------------------------------------------------------------------
   Toolbar
   --------------------------------------------------------------------------- */

export interface ToolbarProps {
  /** Sticky mode — flat, no radius, no shadow */
  sticky?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ sticky = false, children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={['dls-toolbar', className].filter(Boolean).join(' ')}
        data-sticky={sticky ? '' : undefined}
        role="toolbar"
        aria-label="Formatting toolbar"
      >
        {children}
      </div>
    );
  },
);

Toolbar.displayName = 'Toolbar';

/* ---------------------------------------------------------------------------
   Toolbar Group — groups buttons without gap between them
   --------------------------------------------------------------------------- */

export interface ToolbarGroupProps {
  children: React.ReactNode;
}

export const ToolbarGroup = ({ children }: ToolbarGroupProps) => (
  <div className="dls-toolbar__group">{children}</div>
);

ToolbarGroup.displayName = 'ToolbarGroup';

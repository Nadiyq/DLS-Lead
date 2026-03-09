import React from 'react';
import './list.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface ListProps {
  children: React.ReactNode;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const List = React.forwardRef<HTMLDivElement, ListProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={['dls-list', className].filter(Boolean).join(' ')}
        role="listbox"
      >
        {children}
      </div>
    );
  },
);

List.displayName = 'List';

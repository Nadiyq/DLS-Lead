import React from 'react';
import './sidebar.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface SidebarProps {
  /** Layout variant (1–4) */
  variant?: '1' | '2' | '3' | '4';
  /** Whether the sidebar is collapsed (icon-only) */
  collapsed?: boolean;
  /** Top slot — typically a company/account switcher (big-icon SidebarItem) */
  slotTop?: React.ReactNode;
  /** Navigation content — menu items, submenus, groups */
  children: React.ReactNode;
  /** Bottom slot — typically a user account item */
  slotBottom?: React.ReactNode;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      variant = '1',
      collapsed = false,
      slotTop,
      children,
      slotBottom,
      className,
    },
    ref,
  ) => {
    return (
      <nav
        ref={ref}
        className={['dls-sidebar', className].filter(Boolean).join(' ')}
        data-variant={variant}
        {...(collapsed ? { 'data-collapsed': '' } : {})}
        aria-label="Sidebar"
      >
        {slotTop}

        <div className="dls-sidebar__nav">
          {children}
        </div>

        {slotBottom}
      </nav>
    );
  },
);

Sidebar.displayName = 'Sidebar';

/* ---------------------------------------------------------------------------
   Sidebar.Group — cluster of related items
   --------------------------------------------------------------------------- */

export const SidebarGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="dls-sidebar__group">{children}</div>
);

SidebarGroup.displayName = 'SidebarGroup';

/* ---------------------------------------------------------------------------
   Sidebar.Divider
   --------------------------------------------------------------------------- */

export const SidebarDivider = () => <div className="dls-sidebar__divider" />;

SidebarDivider.displayName = 'SidebarDivider';

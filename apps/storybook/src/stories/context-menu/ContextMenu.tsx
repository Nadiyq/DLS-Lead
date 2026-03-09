import React from 'react';
import './context-menu.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface ContextMenuProps {
  children: React.ReactNode;
  className?: string;
}

export interface ContextMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Leading icon slot */
  icon?: React.ReactNode;
  /** Item label */
  label: string;
  /** Keyboard shortcut keys (rendered as <kbd>) */
  shortcut?: string[];
  /** Disabled state */
  disabled?: boolean;
}

export interface ContextMenuSubmenuProps {
  /** Trigger item icon */
  icon?: React.ReactNode;
  /** Trigger item label */
  label: string;
  /** Submenu content */
  children: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

export interface ContextMenuLabelProps {
  children: React.ReactNode;
}

/* ---------------------------------------------------------------------------
   Chevron icon (for submenu triggers)
   --------------------------------------------------------------------------- */

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 8L14 12L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   ContextMenu — container
   --------------------------------------------------------------------------- */

export const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ children, className }, ref) => (
    <div
      ref={ref}
      className={['dls-context-menu', className].filter(Boolean).join(' ')}
      role="menu"
    >
      {children}
    </div>
  ),
);

ContextMenu.displayName = 'ContextMenu';

/* ---------------------------------------------------------------------------
   ContextMenuItem — clickable row
   --------------------------------------------------------------------------- */

export const ContextMenuItem = React.forwardRef<HTMLButtonElement, ContextMenuItemProps>(
  ({ icon, label, shortcut, disabled, className, ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      className={['dls-context-menu__item', className].filter(Boolean).join(' ')}
      role="menuitem"
      data-disabled={disabled ? '' : undefined}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className="dls-context-menu__item-icon">{icon}</span>}
      <span className="dls-context-menu__item-label">{label}</span>
      {shortcut && shortcut.length > 0 && (
        <span className="dls-context-menu__item-shortcut">
          {shortcut.map((key) => (
            <kbd key={key} className="dls-context-menu__kbd">{key}</kbd>
          ))}
        </span>
      )}
    </button>
  ),
);

ContextMenuItem.displayName = 'ContextMenuItem';

/* ---------------------------------------------------------------------------
   ContextMenuSubmenu — item that reveals a nested menu on hover
   --------------------------------------------------------------------------- */

export const ContextMenuSubmenu: React.FC<ContextMenuSubmenuProps> = ({
  icon,
  label,
  children,
  disabled,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className="dls-context-menu__submenu"
      onMouseEnter={() => !disabled && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="dls-context-menu__item"
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={open}
        data-disabled={disabled ? '' : undefined}
        disabled={disabled}
      >
        {icon && <span className="dls-context-menu__item-icon">{icon}</span>}
        <span className="dls-context-menu__item-label">{label}</span>
        <span className="dls-context-menu__item-chevron"><ChevronRight /></span>
      </button>

      {open && (
        <div className="dls-context-menu__submenu-content">
          <ContextMenu>{children}</ContextMenu>
        </div>
      )}
    </div>
  );
};

ContextMenuSubmenu.displayName = 'ContextMenuSubmenu';

/* ---------------------------------------------------------------------------
   ContextMenuDivider
   --------------------------------------------------------------------------- */

export const ContextMenuDivider: React.FC = () => (
  <div className="dls-context-menu__divider" role="separator" />
);

ContextMenuDivider.displayName = 'ContextMenuDivider';

/* ---------------------------------------------------------------------------
   ContextMenuLabel — section heading
   --------------------------------------------------------------------------- */

export const ContextMenuLabel: React.FC<ContextMenuLabelProps> = ({ children }) => (
  <div className="dls-context-menu__label">{children}</div>
);

ContextMenuLabel.displayName = 'ContextMenuLabel';

import React from 'react';
import './context-menu.css';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';
import { Kbd } from '../kbd/Kbd';

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
  /** Keyboard shortcut keys (rendered via Kbd component) */
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
   ContextMenu — wraps List with menu role + shadow
   --------------------------------------------------------------------------- */

export const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ children, className }, ref) => (
    <List
      ref={ref}
      className={['dls-context-menu', className].filter(Boolean).join(' ')}
    >
      {children}
    </List>
  ),
);

ContextMenu.displayName = 'ContextMenu';

/* ---------------------------------------------------------------------------
   ContextMenuItem — wraps ListItem with-slots + Kbd shortcut
   --------------------------------------------------------------------------- */

export const ContextMenuItem = React.forwardRef<HTMLButtonElement, ContextMenuItemProps>(
  ({ icon, label, shortcut, disabled, className, ...rest }, ref) => {
    const shortcutSlot = shortcut && shortcut.length > 0 ? (
      <span className="dls-context-menu__shortcut">
        {shortcut.map((key) => (
          <Kbd key={key}>{key}</Kbd>
        ))}
      </span>
    ) : undefined;

    return (
      <ListItem
        ref={ref as React.Ref<HTMLDivElement>}
        type="with-slots"
        text={label}
        iconStart={icon}
        slotRight={shortcutSlot}
        disabled={disabled}
        onClick={rest.onClick}
        className={className}
      />
    );
  },
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
      <ListItem
        type="with-slots"
        text={label}
        iconStart={icon}
        iconEnd={<ChevronRight />}
        disabled={disabled}
      />

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
   ContextMenuDivider — wraps ListItem divider type
   --------------------------------------------------------------------------- */

export const ContextMenuDivider: React.FC = () => (
  <ListItem type="divider" />
);

ContextMenuDivider.displayName = 'ContextMenuDivider';

/* ---------------------------------------------------------------------------
   ContextMenuLabel — wraps ListItem label type
   --------------------------------------------------------------------------- */

export const ContextMenuLabel: React.FC<ContextMenuLabelProps> = ({ children }) => (
  <ListItem type="label" text={typeof children === 'string' ? children : undefined} />
);

ContextMenuLabel.displayName = 'ContextMenuLabel';

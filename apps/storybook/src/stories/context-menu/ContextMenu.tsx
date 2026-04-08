import React from 'react';
import './context-menu.css';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';
import { Kbd, KbdGroup } from '../kbd/Kbd';
import { ChevronRight as ChevronRightIcon } from 'lucide-react';

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
}

export interface ContextMenuSubmenuProps {
  /** Trigger item icon */
  icon?: React.ReactNode;
  /** Trigger item label */
  label: string;
  /** Submenu content */
  children: React.ReactNode;
}

export interface ContextMenuLabelProps {
  children: React.ReactNode;
}

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
  ({ icon, label, shortcut, className, ...rest }, ref) => {
    const shortcutSlot = shortcut && shortcut.length > 0 ? (
      <KbdGroup>
        {shortcut.map((key) => (
          <Kbd key={key}>{key}</Kbd>
        ))}
      </KbdGroup>
    ) : undefined;

    return (
      <ListItem
        ref={ref as React.Ref<HTMLDivElement>}
        type="with-slots"
        text={label}
        iconStart={icon}
        slotRight={shortcutSlot}
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
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className="dls-context-menu__submenu"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <ListItem
        type="with-slots"
        text={label}
        iconStart={icon}
        iconEnd={<ChevronRightIcon size={16} />}
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

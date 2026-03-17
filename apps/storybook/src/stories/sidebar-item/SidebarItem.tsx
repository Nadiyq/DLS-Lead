import React from 'react';
import './sidebar-item.css';
import { BadgeNumber } from '../badge/number/BadgeNumber';
import { BadgeIndicator } from '../badge/indicator/BadgeIndicator';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type SidebarItemType = 'simple' | 'tree' | 'option' | 'collapsible' | 'big-icon';

export interface SidebarItemProps {
  /** Item type — determines which slots are shown */
  type?: SidebarItemType;
  /** Primary label text */
  text: string;
  /** Secondary text (big-icon type only) */
  secondaryText?: string;
  /** Leading icon slot */
  icon?: React.ReactNode;
  /** Media slot — 32×32 logo/avatar (big-icon type) */
  media?: React.ReactNode;
  /** Show notification indicator dot */
  showIndicator?: boolean;
  /** Number badge value */
  badgeCount?: number;
  /** Whether the item is currently selected / active */
  active?: boolean;
  /** Whether the sidebar is collapsed (icon-only mode) */
  collapsed?: boolean;
  /** Whether a tree/collapsible section is expanded */
  expanded?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Expand/collapse handler (tree/collapsible) */
  onToggle?: () => void;
  /** Action handler (option type — ellipsis click) */
  onAction?: () => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const ChevronIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EllipsisIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="4" cy="8" r="1" fill="currentColor" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
  </svg>
);

const DefaultIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.33" />
    <path d="M2 6H14" stroke="currentColor" strokeWidth="1.33" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  (
    {
      type = 'simple',
      text,
      secondaryText,
      icon,
      media,
      showIndicator = false,
      badgeCount,
      active = false,
      collapsed = false,
      expanded = true,
      disabled = false,
      onClick,
      onToggle,
      onAction,
      className,
    },
    ref,
  ) => {
    const attrs: Record<string, string | undefined> = {
      'data-type': type,
    };
    if (active) attrs['data-active'] = '';
    if (collapsed) attrs['data-collapsed'] = '';
    if (disabled) attrs['data-disabled'] = '';
    if ((type === 'tree' || type === 'collapsible') && expanded) attrs['data-expanded'] = '';

    const iconSlot = icon || <DefaultIcon />;

    return (
      <div
        ref={ref}
        className={['dls-sidebar-item', className].filter(Boolean).join(' ')}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        aria-current={active ? 'page' : undefined}
        onClick={disabled ? undefined : onClick}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        {...attrs}
      >
        {/* Tree type: leading chevron */}
        {type === 'tree' && !collapsed && (
          <span
            className="dls-sidebar-item__chevron"
            onClick={(e) => { e.stopPropagation(); onToggle?.(); }}
            role="button"
            tabIndex={-1}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            <ChevronIcon />
          </span>
        )}

        {/* Icon or media */}
        {type === 'big-icon' ? (
          <span className="dls-sidebar-item__media">
            {media || iconSlot}
          </span>
        ) : (
          <span className="dls-sidebar-item__icon">
            {iconSlot}
          </span>
        )}

        {/* Indicator dot */}
        {showIndicator && (
          <BadgeIndicator
            size="xs"
            intent="danger"
            className="dls-sidebar-item__indicator"
          />
        )}

        {/* Text content */}
        {type === 'big-icon' ? (
          <span className="dls-sidebar-item__text-group">
            <span className="dls-sidebar-item__primary-text">{text}</span>
            {secondaryText && (
              <span className="dls-sidebar-item__secondary-text">{secondaryText}</span>
            )}
          </span>
        ) : (
          <span className="dls-sidebar-item__text">{text}</span>
        )}

        {/* Number badge */}
        {badgeCount !== undefined && badgeCount > 0 && (
          <BadgeNumber
            value={badgeCount}
            variant="soft"
            intent="info"
            size="s"
            className="dls-sidebar-item__badge"
          />
        )}

        {/* Option type: ellipsis action */}
        {type === 'option' && !collapsed && (
          <span
            className="dls-sidebar-item__action"
            onClick={(e) => { e.stopPropagation(); onAction?.(); }}
            role="button"
            tabIndex={-1}
            aria-label="More options"
          >
            <EllipsisIcon />
          </span>
        )}

        {/* Collapsible / big-icon: trailing chevron */}
        {(type === 'collapsible' || type === 'big-icon') && !collapsed && (
          <span
            className="dls-sidebar-item__chevron"
            onClick={(e) => { e.stopPropagation(); onToggle?.(); }}
            role="button"
            tabIndex={-1}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            <ChevronIcon />
          </span>
        )}
      </div>
    );
  },
);

SidebarItem.displayName = 'SidebarItem';

import React from 'react';
import './top-bar.css';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { BadgeIndicator } from '../badge/indicator/BadgeIndicator';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type TopBarType = '1' | '2' | '3';

export interface NavItem {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export interface TopBarProps {
  /** Layout type: 1 = minimal, 2 = centered search, 3 = nav tabs */
  type?: TopBarType;
  /** Menu button click handler (hamburger / sidebar toggle) */
  onMenuClick?: () => void;
  /** Extra content in the left slot */
  slotLeft?: React.ReactNode;
  /** Extra content in the right slot (before default icons) */
  slotRight?: React.ReactNode;
  /** Nav items (type=3 only) */
  navItems?: NavItem[];
  /** Search placeholder (type=2 only) */
  searchPlaceholder?: string;
  /** Search value (type=2 only) */
  searchValue?: string;
  /** Search change handler (type=2 only) */
  onSearchChange?: (value: string) => void;
  /** Show search icon button (type=1 only) */
  showSearch?: boolean;
  /** Search click handler (type=1) */
  onSearchClick?: () => void;
  /** Show notification bell */
  showNotifications?: boolean;
  /** Whether there are unread notifications */
  hasNotifications?: boolean;
  /** Notification click handler */
  onNotificationClick?: () => void;
  /** Show help button */
  showHelp?: boolean;
  /** Help click handler */
  onHelpClick?: () => void;
  /** Avatar initials */
  avatarInitials?: string;
  /** Avatar image src */
  avatarSrc?: string;
  /** Avatar click handler */
  onAvatarClick?: () => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const MenuIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.33" />
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M4 6C4 3.8 5.8 2 8 2C10.2 2 12 3.8 12 6V9L13 11H3L4 9V6Z" stroke="currentColor" strokeWidth="1.33" strokeLinejoin="round" />
    <path d="M6.5 11V12C6.5 12.8 7.2 13.5 8 13.5C8.8 13.5 9.5 12.8 9.5 12V11" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const HelpIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.33" />
    <path d="M6 6C6 4.9 6.9 4 8 4C9.1 4 10 4.9 10 6C10 7 9 7 8 8V9" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
    <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const TopBar = React.forwardRef<HTMLDivElement, TopBarProps>(
  (
    {
      type = '1',
      onMenuClick,
      slotLeft,
      slotRight,
      navItems = [],
      searchPlaceholder = 'Search…',
      searchValue,
      onSearchChange,
      showSearch = true,
      onSearchClick,
      showNotifications = true,
      hasNotifications = false,
      onNotificationClick,
      showHelp = true,
      onHelpClick,
      avatarInitials = 'AS',
      avatarSrc,
      onAvatarClick,
      className,
    },
    ref,
  ) => {
    const NotificationBtn = () => (
      <span className="dls-top-bar__notification">
        <Button
          variant="ghost"
          intent="neutral"
          size="m"
          icon={<BellIcon />}
          iconOnly
          aria-label="Notifications"
          onClick={onNotificationClick}
        />
        {hasNotifications && <BadgeIndicator size="xs" intent="danger" className="dls-top-bar__notification-dot" />}
      </span>
    );

    const AvatarEl = () => (
      <span
        className="dls-top-bar__avatar-wrap"
        role="button"
        tabIndex={0}
        onClick={onAvatarClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onAvatarClick?.(); } }}
        aria-label="Account"
      >
        <Avatar size="32" circle src={avatarSrc} initials={avatarInitials} />
      </span>
    );

    return (
      <header
        ref={ref}
        className={['dls-top-bar', className].filter(Boolean).join(' ')}
        data-type={type}
      >
        {/* Left: menu button + optional slot */}
        <div className="dls-top-bar__left">
          <Button
            variant="ghost"
            intent="neutral"
            size="m"
            icon={<MenuIcon />}
            iconOnly
            aria-label="Menu"
            onClick={onMenuClick}
          />
          {slotLeft}
        </div>

        {/* Type 1: right-aligned actions */}
        {type === '1' && (
          <div className="dls-top-bar__right">
            {slotRight}
            {showSearch && (
              <Button variant="ghost" intent="neutral" size="m" icon={<SearchIcon />} iconOnly aria-label="Search" onClick={onSearchClick} />
            )}
            {showNotifications && <NotificationBtn />}
            {showHelp && (
              <Button variant="ghost" intent="neutral" size="m" icon={<HelpIcon />} iconOnly aria-label="Help" onClick={onHelpClick} />
            )}
            <AvatarEl />
          </div>
        )}

        {/* Type 2: centered search + right actions */}
        {type === '2' && (
          <>
            <div className="dls-top-bar__center">
              <label className="dls-top-bar__search">
                <SearchIcon />
                <input
                  className="dls-top-bar__search-input"
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                />
              </label>
            </div>
            <div className="dls-top-bar__right">
              {slotRight}
              {showNotifications && <NotificationBtn />}
              {showHelp && (
                <Button variant="ghost" intent="neutral" size="m" icon={<HelpIcon />} iconOnly aria-label="Help" onClick={onHelpClick} />
              )}
              <AvatarEl />
            </div>
          </>
        )}

        {/* Type 3: nav tabs + right actions */}
        {type === '3' && (
          <div className="dls-top-bar__nav">
            <div className="dls-top-bar__nav-list">
              {navItems.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  className="dls-top-bar__nav-item"
                  data-active={item.active ? '' : undefined}
                  onClick={item.onClick}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="dls-top-bar__right">
              {slotRight}
              {showNotifications && <NotificationBtn />}
              <AvatarEl />
            </div>
          </div>
        )}
      </header>
    );
  },
);

TopBar.displayName = 'TopBar';

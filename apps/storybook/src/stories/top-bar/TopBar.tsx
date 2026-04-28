import React from 'react';
import { Menu as MenuIcon, Search as SearchIcon, Bell as BellIcon, HelpCircle as HelpIcon } from 'lucide-react';
import './top-bar.css';
import { Avatar } from '../Avatar';
import { Button } from '../Button';

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
      <Button
        variant="ghost"
        intent="neutral"
        size="m"
        icon={<BellIcon />}
        iconOnly
        aria-label="Notifications"
        onClick={onNotificationClick}
      />
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

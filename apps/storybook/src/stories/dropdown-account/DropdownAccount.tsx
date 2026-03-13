import React from 'react';
import './dropdown-account.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type DropdownAccountType = 'menu' | 'switch-account' | 'log-out' | 'switch-company';

export interface AccountUser {
  name: string;
  email: string;
  initials?: string;
  avatarSrc?: string;
}

export interface AccountCompany {
  name: string;
  initials?: string;
  logoSrc?: string;
}

export interface MenuAction {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface DropdownAccountProps {
  /** Dropdown variant type */
  type: DropdownAccountType;

  /* --- menu type --- */
  /** Current user (menu type — shows avatar + name/email at top) */
  user?: AccountUser;
  /** Menu action items */
  actions?: MenuAction[];

  /* --- switch-account type --- */
  /** List of accounts (switch-account type) */
  accounts?: AccountUser[];
  /** Index of the current account */
  currentAccountIndex?: number;
  /** Called when an account is selected */
  onSelectAccount?: (index: number) => void;

  /* --- log-out type --- */
  /** List of email addresses (log-out type) */
  emails?: string[];
  /** Called when "Log out of all accounts" is clicked */
  onLogOutAll?: () => void;

  /* --- switch-company type --- */
  /** List of companies (switch-company type) */
  companies?: AccountCompany[];
  /** Index of the current company */
  currentCompanyIndex?: number;
  /** Called when a company is selected */
  onSelectCompany?: (index: number) => void;

  /** Extra actions shown below divider (switch-account / switch-company) */
  footerActions?: MenuAction[];

  className?: string;
}

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const SettingsIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.33" />
    <path d="M8 2V4M8 12V14M2 8H4M12 8H14M3.8 3.8L5.2 5.2M10.8 10.8L12.2 12.2M12.2 3.8L10.8 5.2M5.2 10.8L3.8 12.2" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const LogOutIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M6 14H3C2.4 14 2 13.6 2 13V3C2 2.4 2.4 2 3 2H6M11 11L14 8L11 5M14 8H6" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Sub-components
   --------------------------------------------------------------------------- */

const Avatar = ({ initials, src }: { initials?: string; src?: string }) => (
  <span className="dls-dropdown-account__avatar">
    {src ? <img src={src} alt="" /> : initials || '?'}
  </span>
);

const Logo = ({ initials, src }: { initials?: string; src?: string }) => (
  <span className="dls-dropdown-account__logo">
    {src ? <img src={src} alt="" /> : initials || '?'}
  </span>
);

const Divider = () => <div className="dls-dropdown-account__divider" />;

/* ---------------------------------------------------------------------------
   Renderers per type
   --------------------------------------------------------------------------- */

const renderMenu = (props: DropdownAccountProps) => {
  const { user, actions = [] } = props;
  const defaultActions: MenuAction[] = actions.length > 0 ? actions : [
    { label: 'Settings', icon: <SettingsIcon /> },
    { label: 'Log out', icon: <LogOutIcon /> },
  ];

  return (
    <>
      {user && (
        <>
          <div className="dls-dropdown-account__row" data-user="" role="menuitem" tabIndex={0}>
            <Avatar initials={user.initials} src={user.avatarSrc} />
            <span className="dls-dropdown-account__text">
              <span className="dls-dropdown-account__name">{user.name}</span>
              <span className="dls-dropdown-account__email">{user.email}</span>
            </span>
          </div>
          <Divider />
        </>
      )}
      {defaultActions.map((action, i) => (
        <React.Fragment key={i}>
          {i > 0 && i === defaultActions.length - 1 && <Divider />}
          <div
            className="dls-dropdown-account__row"
            role="menuitem"
            tabIndex={0}
            onClick={action.onClick}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); action.onClick?.(); } }}
          >
            {action.icon && <span className="dls-dropdown-account__icon">{action.icon}</span>}
            <span className="dls-dropdown-account__label">{action.label}</span>
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

const renderSwitchAccount = (props: DropdownAccountProps) => {
  const { accounts = [], currentAccountIndex = 0, onSelectAccount, footerActions = [] } = props;

  return (
    <>
      <div className="dls-dropdown-account__header">Switch account</div>
      {accounts.map((account, i) => (
        <div
          key={i}
          className="dls-dropdown-account__row"
          data-user=""
          role="menuitem"
          tabIndex={0}
          onClick={() => onSelectAccount?.(i)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectAccount?.(i); } }}
          aria-current={i === currentAccountIndex ? 'true' : undefined}
        >
          <Avatar initials={account.initials} src={account.avatarSrc} />
          <span className="dls-dropdown-account__text">
            <span className="dls-dropdown-account__name">{account.name}</span>
            <span className="dls-dropdown-account__email">{account.email}</span>
          </span>
        </div>
      ))}
      {footerActions.length > 0 && (
        <>
          <Divider />
          {footerActions.map((action, i) => (
            <div
              key={i}
              className="dls-dropdown-account__row"
              role="menuitem"
              tabIndex={0}
              onClick={action.onClick}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); action.onClick?.(); } }}
            >
              {action.icon && <span className="dls-dropdown-account__icon">{action.icon}</span>}
              <span className="dls-dropdown-account__label">{action.label}</span>
            </div>
          ))}
        </>
      )}
    </>
  );
};

const renderLogOut = (props: DropdownAccountProps) => {
  const { emails = [], onLogOutAll } = props;

  return (
    <>
      {emails.map((email, i) => (
        <div key={i} className="dls-dropdown-account__row" role="menuitem" tabIndex={0}>
          <span className="dls-dropdown-account__label">{email}</span>
        </div>
      ))}
      {emails.length > 0 && <Divider />}
      <div
        className="dls-dropdown-account__row"
        role="menuitem"
        tabIndex={0}
        onClick={onLogOutAll}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onLogOutAll?.(); } }}
      >
        <span className="dls-dropdown-account__label">Log out of all accounts</span>
      </div>
    </>
  );
};

const renderSwitchCompany = (props: DropdownAccountProps) => {
  const { companies = [], currentCompanyIndex = 0, onSelectCompany, footerActions = [] } = props;

  return (
    <>
      <div className="dls-dropdown-account__header">Switch company</div>
      {companies.map((company, i) => (
        <div
          key={i}
          className="dls-dropdown-account__row"
          role="menuitem"
          tabIndex={0}
          onClick={() => onSelectCompany?.(i)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectCompany?.(i); } }}
          aria-current={i === currentCompanyIndex ? 'true' : undefined}
        >
          <Logo initials={company.initials} src={company.logoSrc} />
          <span className="dls-dropdown-account__label">{company.name}</span>
        </div>
      ))}
      {footerActions.length > 0 && (
        <>
          <Divider />
          {footerActions.map((action, i) => (
            <div
              key={i}
              className="dls-dropdown-account__row"
              role="menuitem"
              tabIndex={0}
              onClick={action.onClick}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); action.onClick?.(); } }}
            >
              {action.icon && <span className="dls-dropdown-account__icon">{action.icon}</span>}
              <span className="dls-dropdown-account__label">{action.label}</span>
            </div>
          ))}
        </>
      )}
    </>
  );
};

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const DropdownAccount = React.forwardRef<HTMLDivElement, DropdownAccountProps>(
  (props, ref) => {
    const { type, className } = props;

    let content: React.ReactNode;
    switch (type) {
      case 'menu':
        content = renderMenu(props);
        break;
      case 'switch-account':
        content = renderSwitchAccount(props);
        break;
      case 'log-out':
        content = renderLogOut(props);
        break;
      case 'switch-company':
        content = renderSwitchCompany(props);
        break;
    }

    return (
      <div
        ref={ref}
        className={['dls-dropdown-account', className].filter(Boolean).join(' ')}
        role="menu"
      >
        {content}
      </div>
    );
  },
);

DropdownAccount.displayName = 'DropdownAccount';

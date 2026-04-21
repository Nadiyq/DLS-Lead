import React from 'react';
import { Settings as SettingsIcon, LogOut as LogOutIcon } from 'lucide-react';
import './dropdown-account.css';
import { ListItem } from '../list-item/ListItem';
import { Avatar } from '../Avatar';

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
   Sub-components
   --------------------------------------------------------------------------- */

const CompanyLogo = ({ initials, src }: { initials?: string; src?: string }) => (
  <span className="dls-dropdown-account__logo">
    {src ? <img src={src} alt="" /> : initials || '?'}
  </span>
);

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
          <ListItem
            type="two-line-slots"
            slotLeft={
              <Avatar
                size="32"
                circle
                src={user.avatarSrc}
                initials={user.initials || '?'}
              />
            }
            text={user.name}
            secondaryText={user.email}
            onClick={() => {}}
          />
          <ListItem type="divider" />
        </>
      )}
      {defaultActions.map((action, i) => (
        <React.Fragment key={i}>
          {i > 0 && i === defaultActions.length - 1 && <ListItem type="divider" />}
          <ListItem
            type="with-slots"
            iconStart={action.icon}
            text={action.label}
            onClick={action.onClick}
          />
        </React.Fragment>
      ))}
    </>
  );
};

const renderSwitchAccount = (props: DropdownAccountProps) => {
  const { accounts = [], currentAccountIndex = 0, onSelectAccount, footerActions = [] } = props;

  return (
    <>
      <ListItem type="label" text="Switch account" />
      {accounts.map((account, i) => (
        <ListItem
          key={i}
          type="two-line-slots"
          slotLeft={
            <Avatar
              size="32"
              circle
              src={account.avatarSrc}
              initials={account.initials || '?'}
            />
          }
          text={account.name}
          secondaryText={account.email}
          selected={i === currentAccountIndex}
          onClick={() => onSelectAccount?.(i)}
        />
      ))}
      {footerActions.length > 0 && (
        <>
          <ListItem type="divider" />
          {footerActions.map((action, i) => (
            <ListItem
              key={i}
              type="with-slots"
              iconStart={action.icon}
              text={action.label}
              onClick={action.onClick}
            />
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
        <ListItem
          key={i}
          type="two-line"
          text={email}
        />
      ))}
      {emails.length > 0 && <ListItem type="divider" />}
      <ListItem
        type="text"
        text="Log out of all accounts"
        onClick={onLogOutAll}
      />
    </>
  );
};

const renderSwitchCompany = (props: DropdownAccountProps) => {
  const { companies = [], currentCompanyIndex = 0, onSelectCompany, footerActions = [] } = props;

  return (
    <>
      <ListItem type="label" text="Switch company" />
      {companies.map((company, i) => (
        <ListItem
          key={i}
          type="with-slots"
          slotLeft={<CompanyLogo initials={company.initials} src={company.logoSrc} />}
          text={company.name}
          selected={i === currentCompanyIndex}
          onClick={() => onSelectCompany?.(i)}
        />
      ))}
      {footerActions.length > 0 && (
        <>
          <ListItem type="divider" />
          {footerActions.map((action, i) => (
            <ListItem
              key={i}
              type="with-slots"
              iconStart={action.icon}
              text={action.label}
              onClick={action.onClick}
            />
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
        role="listbox"
      >
        {content}
      </div>
    );
  },
);

DropdownAccount.displayName = 'DropdownAccount';

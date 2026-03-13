import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropdownAccount } from './DropdownAccount';

const meta = {
  title: 'Components/DropdownAccount',
  component: DropdownAccount,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownAccount>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
   Icon helpers
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

const ProfileIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.33" />
    <path d="M2 14C2 11.2 4.7 9 8 9C11.3 9 14 11.2 14 14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const BillingIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.33" />
    <path d="M2 7H14" stroke="currentColor" strokeWidth="1.33" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Playground
   --------------------------------------------------------------------------- */

export const Playground: Story = {
  args: {
    type: 'menu',
    user: { name: 'Anna Smith', email: 'annasmith@company.com', initials: 'AS' },
    actions: [
      { label: 'Profile', icon: <ProfileIcon /> },
      { label: 'Settings', icon: <SettingsIcon /> },
      { label: 'Log out', icon: <LogOutIcon /> },
    ],
  },
};

/* ---------------------------------------------------------------------------
   Menu type
   --------------------------------------------------------------------------- */

export const Menu: Story = {
  args: {
    type: 'menu',
    user: { name: 'Anna Smith', email: 'annasmith@defaultcompany.com', initials: 'AS' },
    actions: [
      { label: 'Profile', icon: <ProfileIcon /> },
      { label: 'Billing', icon: <BillingIcon /> },
      { label: 'Settings', icon: <SettingsIcon /> },
      { label: 'Log out', icon: <LogOutIcon /> },
    ],
  },
};

/* ---------------------------------------------------------------------------
   Switch account
   --------------------------------------------------------------------------- */

export const SwitchAccount: Story = {
  args: {
    type: 'switch-account',
    accounts: [
      { name: 'Anna Smith', email: 'annasmith@company.com', initials: 'AS' },
      { name: 'Anna Smith', email: 'anna.personal@gmail.com', initials: 'AS' },
    ],
    currentAccountIndex: 0,
    footerActions: [
      { label: 'Add account', icon: <PlusIcon /> },
    ],
  },
};

/* ---------------------------------------------------------------------------
   Log out
   --------------------------------------------------------------------------- */

export const LogOut: Story = {
  args: {
    type: 'log-out',
    emails: [
      'annasmith@defaultcompany.com',
      'annasmith@defaultcompany2.com',
    ],
  },
};

/* ---------------------------------------------------------------------------
   Switch company
   --------------------------------------------------------------------------- */

export const SwitchCompany: Story = {
  args: {
    type: 'switch-company',
    companies: [
      { name: 'Acme Corp', initials: 'AC' },
      { name: 'Beta Inc', initials: 'BI' },
    ],
    currentCompanyIndex: 0,
    footerActions: [
      { label: 'Add company', icon: <PlusIcon /> },
    ],
  },
};

/* ---------------------------------------------------------------------------
   Menu with avatar image
   --------------------------------------------------------------------------- */

export const MenuWithImage: Story = {
  args: {
    type: 'menu',
    user: {
      name: 'Anna Smith',
      email: 'annasmith@company.com',
      initials: 'AS',
    },
    actions: [
      { label: 'Settings', icon: <SettingsIcon /> },
      { label: 'Log out', icon: <LogOutIcon /> },
    ],
  },
};

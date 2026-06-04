import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
  User as ProfileIcon,
  Wallet as BillingIcon,
  CirclePlus as PlusIcon,
} from 'lucide-react';
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

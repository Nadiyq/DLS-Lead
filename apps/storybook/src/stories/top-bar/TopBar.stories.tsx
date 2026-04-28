import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { TopBar } from './TopBar';

const meta = {
  title: 'Components/TopBar',
  component: TopBar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
   Playground
   --------------------------------------------------------------------------- */

export const Playground: Story = {
  args: {
    type: '1',
    showSearch: true,
    showNotifications: true,
    showHelp: true,
    avatarInitials: 'AS',
  },
};

/* ---------------------------------------------------------------------------
   Type 1 — Minimal (icon actions right-aligned)
   --------------------------------------------------------------------------- */

export const Type1Minimal: Story = {
  args: {
    type: '1',
    showSearch: true,
    showNotifications: true,
    showHelp: true,
    avatarInitials: 'AS',
  },
};

/* ---------------------------------------------------------------------------
   Type 2 — Centered search
   --------------------------------------------------------------------------- */

export const Type2Search: Story = {
  args: {
    type: '2',
    searchPlaceholder: 'Search anything…',
    showNotifications: true,
    showHelp: true,
    avatarInitials: 'AS',
  },
};

/* ---------------------------------------------------------------------------
   Type 3 — Navigation tabs
   --------------------------------------------------------------------------- */

export const Type3NavTabs: Story = {
  args: {
    type: '3',
    navItems: [
      { label: 'Dashboard', active: true },
      { label: 'Projects' },
      { label: 'Team members' },
    ],
    showNotifications: true,
    avatarInitials: 'AS',
  },
};

/* ---------------------------------------------------------------------------
   No notifications
   --------------------------------------------------------------------------- */

export const NoNotifications: Story = {
  args: {
    type: '1',
    showSearch: true,
    showNotifications: true,
    showHelp: true,
    avatarInitials: 'JD',
  },
};

/* ---------------------------------------------------------------------------
   Interactive type 2
   --------------------------------------------------------------------------- */

export const InteractiveSearch: Story = {
  args: {
    type: '2',
    showNotifications: true,
    showHelp: true,
    avatarInitials: 'AS',
  },
  render: () => {
    const [search, setSearch] = React.useState('');

    return (
      <div>
        <TopBar
          type="2"
          searchPlaceholder="Search anything…"
          searchValue={search}
          onSearchChange={setSearch}
          showNotifications
          showHelp
          avatarInitials="AS"
        />
        {search && (
          <div style={{
            padding: 'var(--dls-spacing-4)',
            fontFamily: 'var(--dls-font-family)',
            fontSize: 'var(--dls-text-m-font-size)',
            color: 'var(--dls-color-text-secondary)',
          }}>
            Searching for: <strong style={{ color: 'var(--dls-color-text-primary)' }}>{search}</strong>
          </div>
        )}
      </div>
    );
  },
};

/* ---------------------------------------------------------------------------
   Interactive type 3
   --------------------------------------------------------------------------- */

export const InteractiveNav: Story = {
  args: {
    type: '3',
    showNotifications: true,
    avatarInitials: 'AS',
  },
  render: () => {
    const [activeTab, setActiveTab] = React.useState('Dashboard');
    const tabs = ['Dashboard', 'Projects', 'Team members', 'Settings'];

    return (
      <div>
        <TopBar
          type="3"
          navItems={tabs.map((t) => ({
            label: t,
            active: t === activeTab,
            onClick: () => setActiveTab(t),
          }))}
          showNotifications
          avatarInitials="AS"
        />
        <div style={{
          padding: 'var(--dls-spacing-4)',
          fontFamily: 'var(--dls-font-family)',
          fontSize: 'var(--dls-text-m-font-size)',
          color: 'var(--dls-color-text-secondary)',
        }}>
          Active tab: <strong style={{ color: 'var(--dls-color-text-primary)' }}>{activeTab}</strong>
        </div>
      </div>
    );
  },
};

/* ---------------------------------------------------------------------------
   With sidebar layout
   --------------------------------------------------------------------------- */

export const WithSidebarLayout: Story = {
  args: {
    type: '1',
    showNotifications: true,
    showHelp: true,
    avatarInitials: 'AS',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: 400 }}>
      <TopBar
        type="1"
        showSearch
        showNotifications
        showHelp
        avatarInitials="AS"
      />
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{
          width: 240, background: 'var(--dls-color-surface-base)',
          borderRight: '1px solid var(--dls-color-border-subtle)',
          padding: 'var(--dls-spacing-3)',
          fontFamily: 'var(--dls-font-family)',
          fontSize: 'var(--dls-text-s-font-size)',
          color: 'var(--dls-color-text-secondary)',
        }}>
          Sidebar area
        </div>
        <div style={{
          flex: 1, padding: 'var(--dls-spacing-4)',
          fontFamily: 'var(--dls-font-family)',
          fontSize: 'var(--dls-text-m-font-size)',
          color: 'var(--dls-color-text-secondary)',
        }}>
          Main content area
        </div>
      </div>
    </div>
  ),
};

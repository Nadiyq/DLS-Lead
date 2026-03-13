import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Submenu } from './Submenu';
import { SidebarItem } from '../sidebar-item/SidebarItem';

const meta = {
  title: 'Components/Submenu',
  component: Submenu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Submenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
   Icon helpers
   --------------------------------------------------------------------------- */

const InboxIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.33" />
    <path d="M2 6H14" stroke="currentColor" strokeWidth="1.33" />
  </svg>
);

const FolderIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M2 4V12C2 12.6 2.4 13 3 13H13C13.6 13 14 12.6 14 12V6C14 5.4 13.6 5 13 5H8L7 3H3C2.4 3 2 3.4 2 4Z" stroke="currentColor" strokeWidth="1.33" strokeLinejoin="round" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="6" cy="5" r="2" stroke="currentColor" strokeWidth="1.33" />
    <path d="M2 13C2 10.8 3.8 9 6 9C8.2 9 10 10.8 10 13" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
    <circle cx="11" cy="5" r="2" stroke="currentColor" strokeWidth="1.33" />
    <path d="M14 13C14 11.3 12.7 10 11 10" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.33" />
    <path d="M8 2V4M8 12V14M2 8H4M12 8H14M3.8 3.8L5.2 5.2M10.8 10.8L12.2 12.2M12.2 3.8L10.8 5.2M5.2 10.8L3.8 12.2" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Wrapper
   --------------------------------------------------------------------------- */

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', gap: 'var(--dls-spacing-1)',
    width: 280, padding: 'var(--dls-spacing-2)',
    background: 'var(--dls-color-surface-base)',
    borderRadius: 'var(--dls-radius-component-card)',
    border: '1px solid var(--dls-color-border-subtle)',
  }}>
    {children}
  </div>
);

/* ---------------------------------------------------------------------------
   Playground
   --------------------------------------------------------------------------- */

export const Playground: Story = {
  args: {
    expanded: true,
    parent: null,
  },
  render: (args) => (
    <SidebarWrapper>
      <Submenu
        {...args}
        parent={
          <SidebarItem type="collapsible" text="Projects" icon={<FolderIcon />} expanded={args.expanded} />
        }
      >
        <SidebarItem type="simple" text="Design system" />
        <SidebarItem type="simple" text="Marketing" />
        <SidebarItem type="simple" text="Engineering" />
      </Submenu>
    </SidebarWrapper>
  ),
};

/* ---------------------------------------------------------------------------
   Collapsed (children hidden)
   --------------------------------------------------------------------------- */

export const Collapsed: Story = {
  args: {
    expanded: false,
    parent: null,
  },
  render: () => (
    <SidebarWrapper>
      <Submenu
        expanded={false}
        parent={
          <SidebarItem type="collapsible" text="Projects" icon={<FolderIcon />} expanded={false} />
        }
      >
        <SidebarItem type="simple" text="Design system" />
        <SidebarItem type="simple" text="Marketing" />
      </Submenu>
    </SidebarWrapper>
  ),
};

/* ---------------------------------------------------------------------------
   Expanded with active child
   --------------------------------------------------------------------------- */

export const WithActiveChild: Story = {
  args: {
    expanded: true,
    parent: null,
  },
  render: () => (
    <SidebarWrapper>
      <Submenu
        expanded
        parent={
          <SidebarItem type="collapsible" text="Projects" icon={<FolderIcon />} expanded />
        }
      >
        <SidebarItem type="simple" text="Design system" active />
        <SidebarItem type="simple" text="Marketing" />
        <SidebarItem type="simple" text="Engineering" />
      </Submenu>
    </SidebarWrapper>
  ),
};

/* ---------------------------------------------------------------------------
   With badge on parent
   --------------------------------------------------------------------------- */

export const WithBadge: Story = {
  args: {
    expanded: true,
    parent: null,
  },
  render: () => (
    <SidebarWrapper>
      <Submenu
        expanded
        parent={
          <SidebarItem type="collapsible" text="Inbox" icon={<InboxIcon />} expanded badgeCount={12} />
        }
      >
        <SidebarItem type="simple" text="Primary" />
        <SidebarItem type="simple" text="Updates" />
        <SidebarItem type="simple" text="Promotions" />
      </Submenu>
    </SidebarWrapper>
  ),
};

/* ---------------------------------------------------------------------------
   Nested submenus
   --------------------------------------------------------------------------- */

export const Nested: Story = {
  args: {
    expanded: true,
    parent: null,
  },
  render: () => (
    <SidebarWrapper>
      <Submenu
        expanded
        parent={
          <SidebarItem type="collapsible" text="Settings" icon={<SettingsIcon />} expanded />
        }
      >
        <SidebarItem type="simple" text="General" />
        <Submenu
          expanded
          parent={
            <SidebarItem type="collapsible" text="Security" expanded />
          }
        >
          <SidebarItem type="simple" text="Two-factor auth" />
          <SidebarItem type="simple" text="API keys" active />
        </Submenu>
        <SidebarItem type="simple" text="Billing" />
      </Submenu>
    </SidebarWrapper>
  ),
};

/* ---------------------------------------------------------------------------
   Interactive
   --------------------------------------------------------------------------- */

export const Interactive: Story = {
  args: {
    expanded: true,
    parent: null,
  },
  render: () => {
    const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({
      projects: true,
      teams: false,
    });
    const [activeItem, setActiveItem] = React.useState('design');

    const toggle = (key: string) =>
      setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));

    return (
      <SidebarWrapper>
        <SidebarItem type="simple" text="Inbox" icon={<InboxIcon />} active={activeItem === 'inbox'} onClick={() => setActiveItem('inbox')} badgeCount={5} />

        <Submenu
          expanded={expandedSections.projects}
          parent={
            <SidebarItem type="collapsible" text="Projects" icon={<FolderIcon />} expanded={expandedSections.projects} onToggle={() => toggle('projects')} onClick={() => toggle('projects')} />
          }
        >
          <SidebarItem type="simple" text="Design system" active={activeItem === 'design'} onClick={() => setActiveItem('design')} />
          <SidebarItem type="simple" text="Marketing" active={activeItem === 'marketing'} onClick={() => setActiveItem('marketing')} />
          <SidebarItem type="simple" text="Engineering" active={activeItem === 'engineering'} onClick={() => setActiveItem('engineering')} />
        </Submenu>

        <Submenu
          expanded={expandedSections.teams}
          parent={
            <SidebarItem type="collapsible" text="Teams" icon={<UsersIcon />} expanded={expandedSections.teams} onToggle={() => toggle('teams')} onClick={() => toggle('teams')} />
          }
        >
          <SidebarItem type="simple" text="Frontend" active={activeItem === 'frontend'} onClick={() => setActiveItem('frontend')} />
          <SidebarItem type="simple" text="Backend" active={activeItem === 'backend'} onClick={() => setActiveItem('backend')} />
        </Submenu>

        <SidebarItem type="simple" text="Settings" icon={<SettingsIcon />} active={activeItem === 'settings'} onClick={() => setActiveItem('settings')} />
      </SidebarWrapper>
    );
  },
};

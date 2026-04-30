import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  Inbox as InboxIcon,
  Folder as FolderIcon,
  Users as UsersIcon,
  Settings as SettingsIcon,
} from 'lucide-react';
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

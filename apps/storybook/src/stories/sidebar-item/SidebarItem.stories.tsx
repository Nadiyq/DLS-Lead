import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  Inbox as InboxIcon,
  Star as StarIcon,
  Folder as FolderIcon,
  Settings as SettingsIcon,
  Users as UsersIcon,
  Building2 as LogoIcon,
} from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { IconShape } from '../icon-shape/IconShape';
import { SidebarDivider } from '../sidebar/Sidebar';
import { Submenu } from '../submenu/Submenu';

const meta = {
  title: 'Components/SidebarItem',
  component: SidebarItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof SidebarItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
   Logo stub — IconShape with a real lucide icon (not initials/text)
   --------------------------------------------------------------------------- */

const LogoStub = () => (
  <IconShape intent="info" size="s"><LogoIcon /></IconShape>
);

/* ---------------------------------------------------------------------------
   Wrapper — constrains width like a real sidebar
   --------------------------------------------------------------------------- */

const SidebarWrapper = ({ children, collapsed }: { children: React.ReactNode; collapsed?: boolean }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', gap: 'var(--dls-spacing-1)',
    width: collapsed ? 'auto' : 240, padding: 'var(--dls-spacing-2)',
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
    type: 'simple',
    text: 'Inbox',
    active: false,
    collapsed: false,
    disabled: false,
    showIndicator: false,
  },
};

/* ---------------------------------------------------------------------------
   Simple type — all states
   --------------------------------------------------------------------------- */

export const SimpleStates: Story = {
  args: { type: 'simple', text: 'Inbox' },
  render: () => (
    <SidebarWrapper>
      <SidebarItem type="simple" text="Normal" icon={<InboxIcon />} />
      <SidebarItem type="simple" text="With indicator" icon={<InboxIcon />} showIndicator />
      <SidebarItem type="simple" text="With badge" icon={<StarIcon />} badgeCount={12} />
      <SidebarItem type="simple" text="Active" icon={<InboxIcon />} active />
      <SidebarItem type="simple" text="Disabled" icon={<SettingsIcon />} disabled />
    </SidebarWrapper>
  ),
};

/* ---------------------------------------------------------------------------
   Tree type
   --------------------------------------------------------------------------- */

export const TreeType: Story = {
  args: { type: 'tree', text: 'Projects' },
  render: () => (
    <SidebarWrapper>
      <Submenu
        expanded
        parent={<SidebarItem type="tree" text="Projects" icon={<FolderIcon />} expanded />}
      >
        <SidebarItem type="simple" text="Design system" icon={<FolderIcon />} active />
        <SidebarItem type="simple" text="Marketing" icon={<FolderIcon />} />
      </Submenu>
      <SidebarItem type="tree" text="Archived" icon={<FolderIcon />} expanded={false} />
    </SidebarWrapper>
  ),
};

/* ---------------------------------------------------------------------------
   Option type — with ellipsis action
   --------------------------------------------------------------------------- */

export const OptionType: Story = {
  args: { type: 'option', text: 'Workspace' },
  render: () => (
    <SidebarWrapper>
      <SidebarItem type="option" text="Workspace A" icon={<FolderIcon />} />
      <SidebarItem type="option" text="Workspace B" icon={<FolderIcon />} active />
      <SidebarItem type="option" text="Workspace C" icon={<FolderIcon />} badgeCount={3} />
    </SidebarWrapper>
  ),
};

/* ---------------------------------------------------------------------------
   Collapsible type
   --------------------------------------------------------------------------- */

export const CollapsibleType: Story = {
  args: { type: 'collapsible', text: 'Settings' },
  render: () => (
    <SidebarWrapper>
      <Submenu
        expanded
        parent={<SidebarItem type="collapsible" text="Settings" icon={<SettingsIcon />} expanded />}
      >
        <SidebarItem type="simple" text="General" icon={<SettingsIcon />} />
        <SidebarItem type="simple" text="Members" icon={<UsersIcon />} active />
      </Submenu>
      <SidebarItem type="collapsible" text="Billing" icon={<FolderIcon />} expanded={false} />
    </SidebarWrapper>
  ),
};

/* ---------------------------------------------------------------------------
   Big icon type
   --------------------------------------------------------------------------- */

export const BigIconType: Story = {
  args: { type: 'big-icon', text: 'Acme Corp' },
  render: () => (
    <SidebarWrapper>
      <SidebarItem
        type="big-icon"
        text="Acme Corp"
        secondaryText="admin@acmecorp.com"
        media={<LogoStub />}
      />
      <SidebarItem
        type="big-icon"
        text="Beta Inc"
        secondaryText="user@betainc.com"
        media={<LogoStub />}
        active
      />
    </SidebarWrapper>
  ),
};

/* ---------------------------------------------------------------------------
   Collapsed mode (icon-only)
   --------------------------------------------------------------------------- */

export const CollapsedMode: Story = {
  args: { type: 'simple', text: 'Inbox', collapsed: true },
  render: () => (
    <SidebarWrapper collapsed>
      <SidebarItem type="simple" text="Inbox" icon={<InboxIcon />} collapsed />
      <SidebarItem type="simple" text="Starred" icon={<StarIcon />} collapsed />
      <SidebarItem type="simple" text="Settings" icon={<SettingsIcon />} collapsed active />
      <SidebarItem type="tree" text="Projects" icon={<FolderIcon />} collapsed />
      <SidebarItem type="big-icon" text="Acme" media={<LogoStub />} collapsed />
    </SidebarWrapper>
  ),
};

/* ---------------------------------------------------------------------------
   Full sidebar example
   --------------------------------------------------------------------------- */

export const FullSidebar: Story = {
  args: { type: 'simple', text: 'Inbox' },
  render: () => (
    <SidebarWrapper>
      <SidebarItem type="big-icon" text="Acme Corp" secondaryText="admin@acmecorp.com" media={<LogoStub />} />
      <SidebarDivider />
      <SidebarItem type="simple" text="Inbox" icon={<InboxIcon />} active badgeCount={5} />
      <SidebarItem type="simple" text="Starred" icon={<StarIcon />} />
      <SidebarItem type="option" text="Drafts" icon={<FolderIcon />} />
      <SidebarDivider />
      <Submenu
        expanded
        parent={<SidebarItem type="collapsible" text="Projects" icon={<FolderIcon />} expanded />}
      >
        <SidebarItem type="simple" text="Design system" icon={<FolderIcon />} />
        <SidebarItem type="simple" text="Marketing" icon={<FolderIcon />} />
      </Submenu>
      <Submenu
        expanded
        parent={<SidebarItem type="tree" text="Teams" icon={<UsersIcon />} expanded />}
      >
        <SidebarItem type="simple" text="Engineering" icon={<UsersIcon />} />
        <SidebarItem type="simple" text="Design" icon={<UsersIcon />} />
      </Submenu>
      <SidebarDivider />
      <SidebarItem type="simple" text="Settings" icon={<SettingsIcon />} />
    </SidebarWrapper>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  Inbox as InboxIcon,
  Star as StarIcon,
  Folder as FolderIcon,
  Settings as SettingsIcon,
  Users as UsersIcon,
  LayoutDashboard as DashboardIcon,
  BarChart3 as ChartIcon,
  Calendar as CalendarIcon,
  Building2 as LogoIcon,
} from 'lucide-react';
import { Sidebar, SidebarGroup, SidebarDivider } from './Sidebar';
import { SidebarItem } from '../sidebar-item/SidebarItem';
import { Submenu } from '../submenu/Submenu';
import { IconShape } from '../icon-shape/IconShape';
import { SIDEBAR_ACCOUNT_USER, SIDEBAR_WORKSPACE } from '../_fixtures';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
   Logo stub — IconShape with lucide Building2 icon (not text/initials)
   --------------------------------------------------------------------------- */

const LogoStub = () => (
  <IconShape intent="info" size="s"><LogoIcon /></IconShape>
);

/* ---------------------------------------------------------------------------
   Frame wrapper to constrain height
   --------------------------------------------------------------------------- */

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ height: 700, display: 'flex' }}>{children}</div>
);

/* ---------------------------------------------------------------------------
   Playground
   --------------------------------------------------------------------------- */

export const Playground: Story = {
  args: {
    variant: '1',
    collapsed: false,
    children: null,
  },
  render: (args) => (
    <Frame>
      <Sidebar
        {...args}
        slotTop={<SidebarItem type="big-icon" text={SIDEBAR_WORKSPACE.name} secondaryText={SIDEBAR_WORKSPACE.email} media={<LogoStub />} />}
        slotBottom={<SidebarItem type="big-icon" text={SIDEBAR_ACCOUNT_USER.name} secondaryText={SIDEBAR_ACCOUNT_USER.email} media={<LogoStub />} />}
      >
        <SidebarGroup>
          <SidebarItem type="simple" text="Dashboard" icon={<DashboardIcon />} active />
          <SidebarItem type="simple" text="Inbox" icon={<InboxIcon />} badgeCount={5} />
          <SidebarItem type="simple" text="Starred" icon={<StarIcon />} />
        </SidebarGroup>
      </Sidebar>
    </Frame>
  ),
};

/* ---------------------------------------------------------------------------
   Variant 1 — submenus with dividers
   --------------------------------------------------------------------------- */

export const Variant1: Story = {
  args: { variant: '1', collapsed: false, children: null },
  render: () => (
    <Frame>
      <Sidebar
        variant="1"
        slotTop={<SidebarItem type="big-icon" text={SIDEBAR_WORKSPACE.name} media={<LogoStub />} />}
        slotBottom={<SidebarItem type="big-icon" text={SIDEBAR_ACCOUNT_USER.name} secondaryText={SIDEBAR_ACCOUNT_USER.email} media={<LogoStub />} />}
      >
        <Submenu
          expanded
          parent={<SidebarItem type="collapsible" text="Projects" icon={<FolderIcon />} expanded />}
        >
          <SidebarItem type="simple" text="Design system" active />
          <SidebarItem type="simple" text="Marketing" />
          <SidebarItem type="simple" text="Engineering" />
        </Submenu>
        <SidebarItem type="simple" text="Dashboard" icon={<DashboardIcon />} />
        <SidebarItem type="simple" text="Inbox" icon={<InboxIcon />} badgeCount={12} />
        <SidebarItem type="simple" text="Calendar" icon={<CalendarIcon />} />
        <SidebarDivider />
        <Submenu
          expanded
          parent={<SidebarItem type="collapsible" text="Teams" icon={<UsersIcon />} expanded />}
        >
          <SidebarItem type="simple" text="Frontend" />
          <SidebarItem type="simple" text="Backend" />
          <SidebarItem type="simple" text="Design" />
        </Submenu>
        <SidebarDivider />
        <SidebarItem type="simple" text="Settings" icon={<SettingsIcon />} />
      </Sidebar>
    </Frame>
  ),
};

/* ---------------------------------------------------------------------------
   Variant 2 — grouped sections
   --------------------------------------------------------------------------- */

export const Variant2: Story = {
  args: { variant: '2', collapsed: false, children: null },
  render: () => (
    <Frame>
      <Sidebar
        variant="2"
        slotTop={<SidebarItem type="big-icon" text={SIDEBAR_WORKSPACE.name} secondaryText={SIDEBAR_WORKSPACE.email} media={<LogoStub />} />}
        slotBottom={<SidebarItem type="big-icon" text={SIDEBAR_ACCOUNT_USER.name} secondaryText={SIDEBAR_ACCOUNT_USER.email} media={<LogoStub />} />}
      >
        <SidebarGroup>
          <SidebarItem type="simple" text="Dashboard" icon={<DashboardIcon />} active />
          <SidebarItem type="simple" text="Inbox" icon={<InboxIcon />} badgeCount={5} />
          <SidebarItem type="simple" text="Analytics" icon={<ChartIcon />} />
          <SidebarItem type="simple" text="Calendar" icon={<CalendarIcon />} />
          <SidebarItem type="simple" text="Starred" icon={<StarIcon />} />
        </SidebarGroup>
        <SidebarDivider />
        <SidebarGroup>
          <SidebarItem type="simple" text="Projects" icon={<FolderIcon />} />
          <SidebarItem type="simple" text="Team" icon={<UsersIcon />} />
          <SidebarItem type="simple" text="Settings" icon={<SettingsIcon />} />
        </SidebarGroup>
      </Sidebar>
    </Frame>
  ),
};

/* ---------------------------------------------------------------------------
   Variant 3 — two navigation sections
   --------------------------------------------------------------------------- */

export const Variant3: Story = {
  args: { variant: '3', collapsed: false, children: null },
  render: () => (
    <Frame>
      <Sidebar
        variant="3"
        slotTop={<SidebarItem type="big-icon" text={SIDEBAR_WORKSPACE.name} media={<LogoStub />} />}
        slotBottom={<SidebarItem type="big-icon" text={SIDEBAR_ACCOUNT_USER.name} secondaryText={SIDEBAR_ACCOUNT_USER.email} media={<LogoStub />} />}
      >
        <SidebarGroup>
          <SidebarItem type="simple" text="Dashboard" icon={<DashboardIcon />} active />
          <SidebarItem type="simple" text="Inbox" icon={<InboxIcon />} badgeCount={3} />
          <SidebarItem type="simple" text="Analytics" icon={<ChartIcon />} />
          <SidebarItem type="simple" text="Calendar" icon={<CalendarIcon />} />
          <SidebarItem type="simple" text="Starred" icon={<StarIcon />} />
          <SidebarItem type="simple" text="Projects" icon={<FolderIcon />} />
          <SidebarItem type="simple" text="Team" icon={<UsersIcon />} />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarItem type="simple" text="Settings" icon={<SettingsIcon />} />
          <SidebarItem type="option" text="Help" icon={<InboxIcon />} />
          <SidebarItem type="option" text="Feedback" icon={<StarIcon />} />
        </SidebarGroup>
      </Sidebar>
    </Frame>
  ),
};

/* ---------------------------------------------------------------------------
   Variant 4 — compact bottom
   --------------------------------------------------------------------------- */

export const Variant4: Story = {
  args: { variant: '4', collapsed: false, children: null },
  render: () => (
    <Frame>
      <Sidebar
        variant="4"
        slotTop={<SidebarItem type="big-icon" text={SIDEBAR_WORKSPACE.name} secondaryText={SIDEBAR_WORKSPACE.email} media={<LogoStub />} />}
        slotBottom={<SidebarItem type="simple" text="Settings" icon={<SettingsIcon />} />}
      >
        <SidebarGroup>
          <SidebarItem type="simple" text="Dashboard" icon={<DashboardIcon />} active />
          <SidebarItem type="simple" text="Inbox" icon={<InboxIcon />} badgeCount={5} />
          <SidebarItem type="simple" text="Analytics" icon={<ChartIcon />} />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarItem type="simple" text="Projects" icon={<FolderIcon />} />
          <SidebarItem type="simple" text="Team" icon={<UsersIcon />} />
          <SidebarItem type="simple" text="Calendar" icon={<CalendarIcon />} />
          <SidebarItem type="simple" text="Starred" icon={<StarIcon />} />
        </SidebarGroup>
      </Sidebar>
    </Frame>
  ),
};

/* ---------------------------------------------------------------------------
   Collapsed
   --------------------------------------------------------------------------- */

export const Collapsed: Story = {
  args: { variant: '1', collapsed: true, children: null },
  render: () => (
    <Frame>
      <Sidebar
        variant="1"
        collapsed
        slotTop={<SidebarItem type="big-icon" text={SIDEBAR_WORKSPACE.shortName} media={<LogoStub />} collapsed />}
        slotBottom={<SidebarItem type="big-icon" text={SIDEBAR_ACCOUNT_USER.name.split(' ')[0]} media={<LogoStub />} collapsed />}
      >
        <SidebarGroup>
          <SidebarItem type="simple" text="Dashboard" icon={<DashboardIcon />} collapsed active />
          <SidebarItem type="simple" text="Inbox" icon={<InboxIcon />} collapsed />
          <SidebarItem type="simple" text="Starred" icon={<StarIcon />} collapsed />
          <SidebarItem type="simple" text="Projects" icon={<FolderIcon />} collapsed />
          <SidebarItem type="simple" text="Team" icon={<UsersIcon />} collapsed />
          <SidebarItem type="simple" text="Settings" icon={<SettingsIcon />} collapsed />
        </SidebarGroup>
      </Sidebar>
    </Frame>
  ),
};

/* ---------------------------------------------------------------------------
   Interactive — toggle collapsed
   --------------------------------------------------------------------------- */

export const Interactive: Story = {
  args: { variant: '1', collapsed: false, children: null },
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const [active, setActive] = React.useState('dashboard');
    const [projectsOpen, setProjectsOpen] = React.useState(true);

    return (
      <div style={{ display: 'flex', height: 700 }}>
        <Sidebar
          variant="1"
          collapsed={collapsed}
          slotTop={
            <SidebarItem
              type="big-icon"
              text={SIDEBAR_WORKSPACE.name}
              secondaryText={SIDEBAR_WORKSPACE.email}
              media={<LogoStub />}
              collapsed={collapsed}
              onClick={() => setCollapsed(c => !c)}
            />
          }
          slotBottom={
            <SidebarItem
              type="big-icon"
              text={SIDEBAR_ACCOUNT_USER.name}
              secondaryText={SIDEBAR_ACCOUNT_USER.email}
              media={<LogoStub />}
              collapsed={collapsed}
            />
          }
        >
          <SidebarGroup>
            <SidebarItem type="simple" text="Dashboard" icon={<DashboardIcon />} collapsed={collapsed} active={active === 'dashboard'} onClick={() => setActive('dashboard')} />
            <SidebarItem type="simple" text="Inbox" icon={<InboxIcon />} collapsed={collapsed} active={active === 'inbox'} onClick={() => setActive('inbox')} badgeCount={5} />
            <SidebarItem type="simple" text="Analytics" icon={<ChartIcon />} collapsed={collapsed} active={active === 'analytics'} onClick={() => setActive('analytics')} />
          </SidebarGroup>
          {!collapsed && (
            <>
              <SidebarDivider />
              <Submenu
                expanded={projectsOpen}
                parent={
                  <SidebarItem type="collapsible" text="Projects" icon={<FolderIcon />} expanded={projectsOpen} onClick={() => setProjectsOpen(p => !p)} />
                }
              >
                <SidebarItem type="simple" text="Design system" active={active === 'design'} onClick={() => setActive('design')} />
                <SidebarItem type="simple" text="Marketing" active={active === 'marketing'} onClick={() => setActive('marketing')} />
              </Submenu>
              <SidebarDivider />
            </>
          )}
          <SidebarGroup>
            <SidebarItem type="simple" text="Settings" icon={<SettingsIcon />} collapsed={collapsed} active={active === 'settings'} onClick={() => setActive('settings')} />
          </SidebarGroup>
        </Sidebar>
        <div style={{
          flex: 1, padding: 'var(--dls-spacing-4)',
          fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-secondary)',
          borderLeft: '1px solid var(--dls-color-border-subtle)',
        }}>
          Active: <strong style={{ color: 'var(--dls-color-text-primary)' }}>{active}</strong>
          <br />
          Click company logo to toggle collapse
        </div>
      </div>
    );
  },
};

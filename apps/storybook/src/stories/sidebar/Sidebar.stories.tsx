import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Sidebar, SidebarGroup, SidebarDivider } from './Sidebar';
import { SidebarItem } from '../sidebar-item/SidebarItem';
import { Submenu } from '../submenu/Submenu';
import { IconShape } from '../icon-shape/IconShape';

const meta = {
  title: 'Templates/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
   Icon helpers
   --------------------------------------------------------------------------- */

const InboxIcon = () => (
  <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.33" /><path d="M2 6H14" stroke="currentColor" strokeWidth="1.33" /></svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 16 16" fill="none"><path d="M8 2L9.8 6.2L14 6.5L10.8 9.4L11.8 14L8 11.5L4.2 14L5.2 9.4L2 6.5L6.2 6.2L8 2Z" stroke="currentColor" strokeWidth="1.33" strokeLinejoin="round" /></svg>
);
const FolderIcon = () => (
  <svg viewBox="0 0 16 16" fill="none"><path d="M2 4V12C2 12.6 2.4 13 3 13H13C13.6 13 14 12.6 14 12V6C14 5.4 13.6 5 13 5H8L7 3H3C2.4 3 2 3.4 2 4Z" stroke="currentColor" strokeWidth="1.33" strokeLinejoin="round" /></svg>
);
const SettingsIcon = () => (
  <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.33" /><path d="M8 2V4M8 12V14M2 8H4M12 8H14M3.8 3.8L5.2 5.2M10.8 10.8L12.2 12.2M12.2 3.8L10.8 5.2M5.2 10.8L3.8 12.2" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" /></svg>
);
const UsersIcon = () => (
  <svg viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5" r="2" stroke="currentColor" strokeWidth="1.33" /><path d="M2 13C2 10.8 3.8 9 6 9C8.2 9 10 10.8 10 13" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" /><circle cx="11" cy="5" r="2" stroke="currentColor" strokeWidth="1.33" /><path d="M14 13C14 11.3 12.7 10 11 10" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" /></svg>
);
const DashboardIcon = () => (
  <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.33" /><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.33" /><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.33" /><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.33" /></svg>
);
const ChartIcon = () => (
  <svg viewBox="0 0 16 16" fill="none"><path d="M2 14V8L6 10L10 4L14 6V14H2Z" stroke="currentColor" strokeWidth="1.33" strokeLinejoin="round" /></svg>
);
const CalendarIcon = () => (
  <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.33" /><path d="M5 2V4M11 2V4M2 7H14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" /></svg>
);

const LogoIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <text x="8" y="12" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor">A</text>
  </svg>
);

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
        slotTop={<SidebarItem type="big-icon" text="Acme Corp" secondaryText="admin@acme.com" media={<LogoStub />} />}
        slotBottom={<SidebarItem type="big-icon" text="Anna Smith" secondaryText="anna@acme.com" media={<LogoStub />} />}
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
        slotTop={<SidebarItem type="big-icon" text="Acme Corp" media={<LogoStub />} />}
        slotBottom={<SidebarItem type="big-icon" text="Anna Smith" secondaryText="anna@acme.com" media={<LogoStub />} />}
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
        slotTop={<SidebarItem type="big-icon" text="Acme Corp" secondaryText="admin@acme.com" media={<LogoStub />} />}
        slotBottom={<SidebarItem type="big-icon" text="Anna Smith" secondaryText="anna@acme.com" media={<LogoStub />} />}
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
        slotTop={<SidebarItem type="big-icon" text="Acme Corp" media={<LogoStub />} />}
        slotBottom={<SidebarItem type="big-icon" text="Anna Smith" secondaryText="anna@acme.com" media={<LogoStub />} />}
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
        slotTop={<SidebarItem type="big-icon" text="Acme Corp" secondaryText="admin@acme.com" media={<LogoStub />} />}
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
        slotTop={<SidebarItem type="big-icon" text="Acme" media={<LogoStub />} collapsed />}
        slotBottom={<SidebarItem type="big-icon" text="Anna" media={<LogoStub />} collapsed />}
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
              text="Acme Corp"
              secondaryText="admin@acme.com"
              media={<LogoStub />}
              collapsed={collapsed}
              onClick={() => setCollapsed(c => !c)}
            />
          }
          slotBottom={
            <SidebarItem
              type="big-icon"
              text="Anna Smith"
              secondaryText="anna@acme.com"
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

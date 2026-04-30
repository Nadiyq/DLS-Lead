import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  Bell as BellIcon,
  Building2 as BuildingIcon,
  Check as CheckIcon,
  Mail as MailIcon,
  Save as SaveIcon,
  Settings as SettingsIcon,
  ShieldCheck as ShieldCheckIcon,
  Users as UsersIcon,
} from 'lucide-react';
import { expect, userEvent } from 'storybook/test';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Card } from '../card/Card';
import { Dropdown, type DropdownOption } from '../dropdown/Dropdown';
import { InputField } from '../input-field/InputField';
import { Sidebar } from '../sidebar/Sidebar';
import { SidebarItem } from '../sidebar-item/SidebarItem';
import { Switcher } from '../switcher/Switcher';
import { Tabs, type TabItem } from '../tabs/Tabs';
import { Text } from '../text/Text';
import './dls-settings-smoke.css';

type NavKey = 'profile' | 'security' | 'notifications' | 'billing';
type TabKey = 'account' | 'security' | 'notifications';

const roleOptions: DropdownOption[] = [
  { value: 'admins', label: 'Admins' },
  { value: 'managers', label: 'Managers' },
  { value: 'members', label: 'Members' },
];

const cadenceOptions: DropdownOption[] = [
  { value: 'immediate', label: 'Immediate' },
  { value: 'daily', label: 'Daily digest' },
  { value: 'weekly', label: 'Weekly summary' },
];

const tabs: TabItem[] = [
  { value: 'account', label: 'Account', icon: <BuildingIcon aria-hidden="true" /> },
  { value: 'security', label: 'Security', icon: <ShieldCheckIcon aria-hidden="true" /> },
  { value: 'notifications', label: 'Notifications', icon: <BellIcon aria-hidden="true" /> },
];

const LogoMark = () => (
  <Avatar size="32" initials="DS" className="dls-settings-smoke__logo-mark" />
);

const SettingsPanel = ({ activeTab }: { activeTab: TabKey }) => {
  const [workspaceName, setWorkspaceName] = React.useState('Northstar Design');
  const [primaryContact, setPrimaryContact] = React.useState('ops@northstar.example');
  const [role, setRole] = React.useState('managers');
  const [cadence, setCadence] = React.useState('daily');
  const [twoStepEnabled, setTwoStepEnabled] = React.useState(true);
  const [approvalEnabled, setApprovalEnabled] = React.useState(false);
  const [digestEnabled, setDigestEnabled] = React.useState(true);

  if (activeTab === 'security') {
    return (
      <Card
        type="outline"
        headerIcon={<ShieldCheckIcon aria-hidden="true" />}
        title="Access controls"
        description="Smoke-check switcher, text, and action composition for account security settings."
        footer={
          <div className="dls-settings-smoke__button-row">
            <Button variant="outline" intent="neutral" size="m">Review log</Button>
            <Button variant="filled" intent="primary" size="m" icon={<CheckIcon aria-hidden="true" />}>
              Apply policy
            </Button>
          </div>
        }
      >
        <div className="dls-settings-smoke__switch-stack">
          <div className="dls-settings-smoke__switch-row">
            <Text
              size="s"
              title="Two-step verification"
              description="Require a second factor before workspace access."
            />
            <Switcher
              checked={twoStepEnabled}
              label="Required"
              textOrientation="left"
              onChange={setTwoStepEnabled}
            />
          </div>
          <div className="dls-settings-smoke__switch-row">
            <Text
              size="s"
              title="Invite approval"
              description="Route new member invites through admins."
            />
            <Switcher
              checked={approvalEnabled}
              label="Manual"
              textOrientation="left"
              onChange={setApprovalEnabled}
            />
          </div>
        </div>
      </Card>
    );
  }

  if (activeTab === 'notifications') {
    return (
      <Card
        type="muted"
        headerIcon={<BellIcon aria-hidden="true" />}
        title="Notification defaults"
        description="Smoke-check dropdown selection and enabled states for workspace messaging."
        footer={
          <div className="dls-settings-smoke__button-row">
            <Button variant="ghost" intent="neutral" size="m">Reset</Button>
            <Button variant="filled" intent="primary" size="m" icon={<SaveIcon aria-hidden="true" />}>
              Save defaults
            </Button>
          </div>
        }
      >
        <div className="dls-settings-smoke__form-grid">
          <Dropdown
            className="dls-settings-smoke__dropdown"
            options={cadenceOptions}
            value={cadence}
            label="Digest cadence"
            hint="Used for non-urgent product activity."
            placeholder="Select cadence"
            leadingIcon={<MailIcon aria-hidden="true" />}
            onChange={setCadence}
          />
          <div className="dls-settings-smoke__switch-row dls-settings-smoke__switch-row--compact">
            <Text
              size="s"
              title="Product digest"
              description="Send account owners a compact activity summary."
            />
            <Switcher
              checked={digestEnabled}
              label="On"
              textOrientation="left"
              onChange={setDigestEnabled}
            />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      type="outline"
      headerIcon={<BuildingIcon aria-hidden="true" />}
      title="Workspace profile"
      description="Smoke-check labeled fields, select controls, card footer actions, and tokenized layout."
      footer={
        <div className="dls-settings-smoke__button-row">
          <Button variant="outline" intent="neutral" size="m">Cancel</Button>
          <Button variant="filled" intent="primary" size="m" icon={<SaveIcon aria-hidden="true" />}>
            Save changes
          </Button>
        </div>
      }
    >
      <div className="dls-settings-smoke__form-grid">
        <InputField
          label="Workspace name"
          value={workspaceName}
          onChange={(event) => setWorkspaceName(event.target.value)}
          iconStart={<BuildingIcon aria-hidden="true" />}
          hint="Shown in invoices, invites, and shared reports."
        />
        <InputField
          label="Primary contact"
          value={primaryContact}
          onChange={(event) => setPrimaryContact(event.target.value)}
          iconStart={<MailIcon aria-hidden="true" />}
          hint="Receives account and billing notifications."
        />
        <Dropdown
          className="dls-settings-smoke__dropdown"
          options={roleOptions}
          value={role}
          label="Default role"
          hint="Applied to new teammates unless changed during invite."
          placeholder="Select role"
          leadingIcon={<UsersIcon aria-hidden="true" />}
          onChange={setRole}
        />
      </div>
    </Card>
  );
};

const DlsSettingsSmoke = () => {
  const [activeNav, setActiveNav] = React.useState<NavKey>('profile');
  const [activeTab, setActiveTab] = React.useState<TabKey>('account');

  return (
    <div className="dls-settings-smoke">
      <Sidebar
        variant="2"
        slotTop={
          <div className="dls-settings-smoke__sidebar-menu" role="menu" aria-label="Workspace">
            <SidebarItem
              type="big-icon"
              text="DLS Lead"
              secondaryText="Settings smoke"
              media={<LogoMark />}
            />
          </div>
        }
        slotBottom={
          <div className="dls-settings-smoke__sidebar-menu" role="menu" aria-label="Account">
            <SidebarItem
              type="big-icon"
              text="Nadia"
              secondaryText="Owner"
              media={<LogoMark />}
            />
          </div>
        }
      >
        <div className="dls-settings-smoke__sidebar-menu" role="menu" aria-label="Settings sections">
          <SidebarItem
            type="simple"
            text="Profile"
            icon={<BuildingIcon aria-hidden="true" />}
            active={activeNav === 'profile'}
            onClick={() => setActiveNav('profile')}
          />
          <SidebarItem
            type="simple"
            text="Security"
            icon={<ShieldCheckIcon aria-hidden="true" />}
            active={activeNav === 'security'}
            onClick={() => setActiveNav('security')}
          />
          <SidebarItem
            type="simple"
            text="Notifications"
            icon={<BellIcon aria-hidden="true" />}
            badgeCount={2}
            active={activeNav === 'notifications'}
            onClick={() => setActiveNav('notifications')}
          />
          <SidebarItem
            type="simple"
            text="Billing"
            icon={<SettingsIcon aria-hidden="true" />}
            active={activeNav === 'billing'}
            disabled
          />
        </div>
      </Sidebar>

      <main className="dls-settings-smoke__main" aria-labelledby="dls-settings-smoke-title">
        <div className="dls-settings-smoke__header">
          <div className="dls-settings-smoke__heading-group">
            <span className="dls-settings-smoke__eyebrow">Storybook smoke surface</span>
            <h1 id="dls-settings-smoke-title" className="dls-settings-smoke__title">
              DLS Settings Smoke
            </h1>
            <p className="dls-settings-smoke__description">
              A Storybook-only settings screen assembled from documented DLS components and tokens.
            </p>
          </div>
          <Button
            className="dls-settings-smoke__audit-button"
            variant="outline"
            intent="neutral"
            size="m"
            icon={<SettingsIcon aria-hidden="true" />}
          >
            Audit tokens
          </Button>
        </div>

        <div className="dls-settings-smoke__toolbar">
          <Tabs
            items={tabs}
            value={activeTab}
            type="pill"
            onChange={(value) => setActiveTab(value as TabKey)}
          />
        </div>

        <section className="dls-settings-smoke__content" aria-label="Settings panel">
          <SettingsPanel activeTab={activeTab} />
          <Card
            type="regular"
            title="Smoke checklist"
            description="The interface keeps production code untouched while exercising layout, inputs, navigation, and actions."
          >
            <div className="dls-settings-smoke__text-stack">
              <Text
                size="xs"
                title="Documented props"
                description="Every DLS prop used here is covered by Storybook MCP docs or component specs."
              />
              <Text
                size="xs"
                title="Token-only shell"
                description="Custom story CSS uses DLS semantic colors, spacing, typography, radius, and shadow tokens."
              />
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

const meta = {
  title: 'DLS Smoke/DLS Settings Smoke',
  component: DlsSettingsSmoke,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DlsSettingsSmoke>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'DLS Settings Smoke' })).toBeVisible();

    const primaryContact = canvas.getByLabelText('Primary contact');
    await userEvent.clear(primaryContact);
    await userEvent.type(primaryContact, 'team@northstar.example');
    await expect(primaryContact).toHaveValue('team@northstar.example');

    await userEvent.click(canvas.getByRole('tab', { name: 'Security' }));
    await expect(canvas.getByRole('tab', { name: 'Security' })).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByText('Access controls')).toBeVisible();

    await userEvent.click(canvas.getByRole('switch', { name: 'Manual' }));
    await expect(canvas.getByRole('switch', { name: 'Manual' })).toBeChecked();

    await userEvent.click(canvas.getByRole('tab', { name: 'Notifications' }));
    await expect(canvas.getByText('Notification defaults')).toBeVisible();
  },
};

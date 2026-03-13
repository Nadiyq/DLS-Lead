import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Switcher } from './Switcher';

const meta = {
  title: 'Components/Switcher',
  component: Switcher,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Switcher>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Enable notifications',
    description: 'Receive alerts when something changes',
    textOrientation: 'right',
  },
};

// ---------------------------------------------------------------------------
// All states
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Off">
        <Switcher label="Unchecked" />
      </Section>
      <Section title="On">
        <Switcher checked label="Checked" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Switcher disabled label="Off disabled" />
      <Switcher checked disabled label="On disabled" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With description
// ---------------------------------------------------------------------------

export const WithDescription: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Switcher checked label="Email notifications" description="Receive updates via email" />
      <Switcher label="Push notifications" description="Get real-time alerts on your device" />
      <Switcher label="SMS alerts" description="Text message notifications for urgent items" disabled />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Text orientation
// ---------------------------------------------------------------------------

export const TextOrientation: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Right (default)">
        <Switcher checked label="Label text" description="Description text" textOrientation="right" />
      </Section>
      <Section title="Left">
        <Switcher checked label="Label text" description="Description text" textOrientation="left" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Without label
// ---------------------------------------------------------------------------

export const WithoutLabel: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Switcher />
      <Switcher checked />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {},
  render: () => {
    const [settings, setSettings] = React.useState({
      email: true,
      push: false,
      sms: false,
    });

    const toggle = (key: keyof typeof settings) => {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Switcher
          checked={settings.email}
          label="Email notifications"
          description="Receive updates via email"
          onChange={() => toggle('email')}
        />
        <Switcher
          checked={settings.push}
          label="Push notifications"
          description="Get real-time alerts on your device"
          onChange={() => toggle('push')}
        />
        <Switcher
          checked={settings.sms}
          label="SMS alerts"
          description="Text message notifications"
          onChange={() => toggle('sms')}
        />
      </div>
    );
  },
};

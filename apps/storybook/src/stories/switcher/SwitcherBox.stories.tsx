import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { SwitcherBox } from './SwitcherBox';

const meta = {
  title: 'Components/SwitcherBox',
  component: SwitcherBox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof SwitcherBox>;

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
    label: 'Label text',
    description: 'Description text',
    textOrientation: 'right',
  },
};

// ---------------------------------------------------------------------------
// Selected vs unselected
// ---------------------------------------------------------------------------

export const SelectionStates: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <SwitcherBox label="Off" description="Not active" />
      <SwitcherBox checked label="On" description="Currently active" />
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
        <SwitcherBox checked label="Label text" description="Description text" textOrientation="right" />
      </Section>
      <Section title="Left">
        <SwitcherBox checked label="Label text" description="Description text" textOrientation="left" />
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
    <div style={{ display: 'flex', gap: 16 }}>
      <SwitcherBox disabled label="Disabled off" description="Cannot interact" />
      <SwitcherBox checked disabled label="Disabled on" description="Cannot interact" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive group
// ---------------------------------------------------------------------------

export const InteractiveGroup: Story = {
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 280 }}>
        <SwitcherBox
          checked={settings.email}
          onChange={() => toggle('email')}
          label="Email notifications"
          description="Receive updates via email"
        />
        <SwitcherBox
          checked={settings.push}
          onChange={() => toggle('push')}
          label="Push notifications"
          description="Get real-time alerts on your device"
        />
        <SwitcherBox
          checked={settings.sms}
          onChange={() => toggle('sms')}
          label="SMS alerts"
          description="Text message notifications"
        />
      </div>
    );
  },
};

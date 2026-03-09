import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { CheckboxBox } from './CheckboxBox';

const meta = {
  title: 'Components/CheckboxBox',
  component: CheckboxBox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxBox>;

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
      <CheckboxBox label="Unselected" description="Not checked" />
      <CheckboxBox checked label="Selected" description="Currently checked" />
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
        <CheckboxBox checked label="Label text" description="Description text" textOrientation="right" />
      </Section>
      <Section title="Left">
        <CheckboxBox checked label="Label text" description="Description text" textOrientation="left" />
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
      <CheckboxBox disabled label="Disabled unchecked" description="Cannot interact" />
      <CheckboxBox checked disabled label="Disabled checked" description="Cannot interact" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive group
// ---------------------------------------------------------------------------

export const InteractiveGroup: Story = {
  args: {},
  render: () => {
    const [selected, setSelected] = React.useState<Record<string, boolean>>({
      email: true,
      push: false,
      sms: false,
    });

    const toggle = (key: string) => {
      setSelected(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 280 }}>
        <CheckboxBox
          checked={selected.email}
          onChange={() => toggle('email')}
          label="Email notifications"
          description="Receive updates via email"
        />
        <CheckboxBox
          checked={selected.push}
          onChange={() => toggle('push')}
          label="Push notifications"
          description="Get real-time alerts on your device"
        />
        <CheckboxBox
          checked={selected.sms}
          onChange={() => toggle('sms')}
          label="SMS alerts"
          description="Text message notifications"
        />
      </div>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

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
    indeterminate: false,
    disabled: false,
    label: 'Accept terms',
    description: 'You agree to our terms of service',
    textOrientation: 'right',
  },
};

// ---------------------------------------------------------------------------
// All types
// ---------------------------------------------------------------------------

export const AllTypes: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Unselected">
        <Checkbox label="Unchecked" />
      </Section>
      <Section title="Selected">
        <Checkbox checked label="Checked" />
      </Section>
      <Section title="Indeterminate">
        <Checkbox indeterminate label="Indeterminate" />
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
      <Checkbox disabled label="Unchecked disabled" />
      <Checkbox checked disabled label="Checked disabled" />
      <Checkbox indeterminate disabled label="Indeterminate disabled" />
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
      <Checkbox checked label="Email notifications" description="Receive updates via email" />
      <Checkbox label="Push notifications" description="Get real-time alerts on your device" />
      <Checkbox label="SMS alerts" description="Text message notifications for urgent items" disabled />
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
        <Checkbox checked label="Label text" description="Description text" textOrientation="right" />
      </Section>
      <Section title="Left">
        <Checkbox checked label="Label text" description="Description text" textOrientation="left" />
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
      <Checkbox />
      <Checkbox checked />
      <Checkbox indeterminate />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {},
  render: () => {
    const [items, setItems] = React.useState([
      { id: 'a', label: 'Option A', checked: true },
      { id: 'b', label: 'Option B', checked: false },
      { id: 'c', label: 'Option C', checked: true },
    ]);

    const allChecked = items.every(i => i.checked);
    const noneChecked = items.every(i => !i.checked);

    const toggleItem = (id: string, val: boolean) => {
      setItems(prev => prev.map(i => (i.id === id ? { ...i, checked: val } : i)));
    };

    const toggleAll = (val: boolean) => {
      setItems(prev => prev.map(i => ({ ...i, checked: val })));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Checkbox
          checked={allChecked}
          indeterminate={!allChecked && !noneChecked}
          label="Select all"
          onChange={toggleAll}
        />
        <div style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map(item => (
            <Checkbox
              key={item.id}
              checked={item.checked}
              label={item.label}
              onChange={val => toggleItem(item.id, val)}
            />
          ))}
        </div>
      </div>
    );
  },
};

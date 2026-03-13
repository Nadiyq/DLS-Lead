import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Radiobutton } from './Radiobutton';

const meta = {
  title: 'Components/Radiobutton',
  component: Radiobutton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Radiobutton>;

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
    label: 'Option label',
    description: 'Description text',
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
      <Section title="Unselected">
        <Radiobutton label="Unchecked" />
      </Section>
      <Section title="Selected">
        <Radiobutton checked label="Checked" />
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
      <Radiobutton disabled label="Unchecked disabled" />
      <Radiobutton checked disabled label="Checked disabled" />
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
      <Radiobutton checked label="Standard plan" description="Best for individuals" />
      <Radiobutton label="Pro plan" description="Best for teams and businesses" />
      <Radiobutton label="Enterprise" description="Custom solutions for large organizations" disabled />
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
        <Radiobutton checked label="Label text" description="Description text" textOrientation="right" />
      </Section>
      <Section title="Left">
        <Radiobutton checked label="Label text" description="Description text" textOrientation="left" />
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
      <Radiobutton />
      <Radiobutton checked />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {},
  render: () => {
    const [selected, setSelected] = React.useState('b');

    const options = [
      { id: 'a', label: 'Option A' },
      { id: 'b', label: 'Option B' },
      { id: 'c', label: 'Option C' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }} role="radiogroup">
        {options.map(opt => (
          <Radiobutton
            key={opt.id}
            checked={selected === opt.id}
            label={opt.label}
            name="interactive-group"
            value={opt.id}
            onChange={() => setSelected(opt.id)}
          />
        ))}
      </div>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { RadiobuttonBox } from './RadiobuttonBox';

const meta = {
  title: 'Components/RadiobuttonBox',
  component: RadiobuttonBox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof RadiobuttonBox>;

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
      <RadiobuttonBox label="Unselected" description="Not checked" />
      <RadiobuttonBox checked label="Selected" description="Currently checked" />
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
        <RadiobuttonBox checked label="Label text" description="Description text" textOrientation="right" />
      </Section>
      <Section title="Left">
        <RadiobuttonBox checked label="Label text" description="Description text" textOrientation="left" />
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
      <RadiobuttonBox disabled label="Disabled unchecked" description="Cannot interact" />
      <RadiobuttonBox checked disabled label="Disabled checked" description="Cannot interact" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive group
// ---------------------------------------------------------------------------

export const InteractiveGroup: Story = {
  args: {},
  render: () => {
    const [selected, setSelected] = React.useState('standard');

    const options = [
      { id: 'standard', label: 'Standard plan', description: 'Best for individuals' },
      { id: 'pro', label: 'Pro plan', description: 'Best for teams and businesses' },
      { id: 'enterprise', label: 'Enterprise', description: 'Custom solutions for large organizations' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 280 }} role="radiogroup">
        {options.map(opt => (
          <RadiobuttonBox
            key={opt.id}
            checked={selected === opt.id}
            onChange={() => setSelected(opt.id)}
            label={opt.label}
            description={opt.description}
            name="plan-group"
            value={opt.id}
          />
        ))}
      </div>
    );
  },
};

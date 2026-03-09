import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ButtonInputGroup } from './ButtonInputGroup';

const meta = {
  title: 'Components/ButtonInputGroup',
  component: ButtonInputGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ButtonInputGroup>;

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
    buttonLabel: 'Button',
    location: 'start',
    size: 'm',
    placeholder: 'Type…',
  },
};

// ---------------------------------------------------------------------------
// All locations
// ---------------------------------------------------------------------------

export const AllLocations: Story = {
  args: {
    buttonLabel: 'Button',
    placeholder: 'Type…',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Start">
        <ButtonInputGroup buttonLabel="Button" location="start" placeholder="Type…" />
      </Section>
      <Section title="End">
        <ButtonInputGroup buttonLabel="Button" location="end" placeholder="Type…" />
      </Section>
      <Section title="Both">
        <ButtonInputGroup buttonLabel={['Start', 'End']} location="both" placeholder="Type…" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  args: {
    buttonLabel: 'Button',
    placeholder: 'Type…',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Medium (default)">
        <ButtonInputGroup buttonLabel="Button" size="m" placeholder="Type…" />
      </Section>
      <Section title="Small">
        <ButtonInputGroup buttonLabel="Button" size="s" placeholder="Type…" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    buttonLabel: 'Button',
    placeholder: 'Type…',
    disabled: true,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Fully disabled">
        <ButtonInputGroup buttonLabel="Button" location="start" placeholder="Type…" disabled />
      </Section>
      <Section title="Start button disabled">
        <ButtonInputGroup buttonLabel="Button" location="start" placeholder="Type…" startDisabled />
      </Section>
      <Section title="End button disabled">
        <ButtonInputGroup buttonLabel="Button" location="end" placeholder="Type…" endDisabled />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    buttonLabel: 'Button',
    placeholder: 'Type…',
  },
  render: () => {
    const [value, setValue] = React.useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ButtonInputGroup
          buttonLabel={['−', '+']}
          location="both"
          value={value}
          onStartClick={() => setValue((v) => v - 1)}
          onEndClick={() => setValue((v) => v + 1)}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (!Number.isNaN(n)) setValue(n);
          }}
          style={{ textAlign: 'center' } as React.CSSProperties}
        />
        <span style={{ fontFamily: 'var(--dls-font-family)', fontSize: 13, color: 'var(--dls-color-text-secondary)' }}>
          Counter: {value}
        </span>
      </div>
    );
  },
};

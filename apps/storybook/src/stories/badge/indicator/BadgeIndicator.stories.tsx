import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { BadgeIndicator } from './BadgeIndicator';

const meta = {
  title: 'Components/Badge/Indicator',
  component: BadgeIndicator,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    intent: { control: 'select', options: ['neutral', 'primary', 'info', 'success', 'warning', 'danger'] },
    size:   { control: 'select', options: ['xs', 's', 'm', 'l'] },
    value:  { control: { type: 'number', min: 0, max: 999 } },
    max:    { control: { type: 'number', min: 1, max: 999 } },
  },
  args: {
    intent: 'danger',
    size: 'm',
    value: 5,
    max: 99,
  },
} satisfies Meta<typeof BadgeIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    {children}
  </div>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>{children}</div>
);

const intents = ['neutral', 'primary', 'info', 'success', 'warning', 'danger'] as const;
const sizes = ['xs', 's', 'm', 'l'] as const;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {};

// ---------------------------------------------------------------------------
// All intents × sizes
// ---------------------------------------------------------------------------

export const AllIntents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {sizes.map((size) => (
        <Section key={size} title={`Size: ${size.toUpperCase()}`}>
          <Row>
            {intents.map((intent) => (
              <BadgeIndicator key={intent} intent={intent} size={size} value={8} />
            ))}
          </Row>
        </Section>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Dot only (XS)
// ---------------------------------------------------------------------------

export const DotOnly: Story = {
  render: () => (
    <Section title="Dot indicators (XS)">
      <Row>
        {intents.map((intent) => (
          <BadgeIndicator key={intent} intent={intent} size="xs" />
        ))}
      </Row>
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// Overflow (max)
// ---------------------------------------------------------------------------

export const Overflow: Story = {
  render: () => (
    <Section title="Overflow (max=99)">
      <Row>
        <BadgeIndicator value={1} size="m" intent="danger" />
        <BadgeIndicator value={42} size="m" intent="danger" />
        <BadgeIndicator value={99} size="m" intent="danger" />
        <BadgeIndicator value={100} size="m" intent="danger" />
        <BadgeIndicator value={999} size="m" intent="danger" />
      </Row>
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// Sizes comparison
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <Section title="Sizes">
      <Row>
        {sizes.map((size) => (
          <BadgeIndicator key={size} size={size} intent="danger" value={5} />
        ))}
      </Row>
    </Section>
  ),
};

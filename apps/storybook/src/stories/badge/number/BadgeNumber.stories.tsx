import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { BadgeNumber } from './BadgeNumber';

const meta = {
  title: 'Components/Badge/Number',
  component: BadgeNumber,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['filled', 'soft', 'outline'] },
    intent:  { control: 'select', options: ['neutral', 'primary', 'info', 'success', 'warning', 'danger'] },
    size:    { control: 'select', options: ['m', 's', 'xs'] },
    value:   { control: { type: 'number', min: 0, max: 999 } },
    max:     { control: { type: 'number', min: 1, max: 999 } },
  },
  args: {
    variant: 'filled',
    intent: 'danger',
    size: 'm',
    value: 5,
    max: 99,
  },
} satisfies Meta<typeof BadgeNumber>;

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
const variants = ['filled', 'soft', 'outline'] as const;
const sizes = ['m', 's', 'xs'] as const;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {};

// ---------------------------------------------------------------------------
// All variants × intents
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {variants.map((variant) => (
        <Section key={variant} title={variant.charAt(0).toUpperCase() + variant.slice(1)}>
          {sizes.map((size) => (
            <Row key={size}>
              {intents.map((intent) => (
                <BadgeNumber key={intent} variant={variant} intent={intent} size={size} value={8} />
              ))}
            </Row>
          ))}
        </Section>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Overflow (max)
// ---------------------------------------------------------------------------

export const Overflow: Story = {
  render: () => (
    <Section title="Overflow (max=99)">
      <Row>
        <BadgeNumber value={1} intent="danger" />
        <BadgeNumber value={42} intent="danger" />
        <BadgeNumber value={99} intent="danger" />
        <BadgeNumber value={100} intent="danger" />
        <BadgeNumber value={999} intent="danger" />
      </Row>
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <Section title="Sizes">
      <Row>
        {sizes.map((size) => (
          <BadgeNumber key={size} size={size} variant="filled" intent="danger" value={5} />
        ))}
      </Row>
    </Section>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Badge } from './Badge';
import { Section } from './_helpers/StoryLayout';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['outline', 'soft', 'filled', 'ghost'] },
    intent:  { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'danger'] },
    size:    { control: 'select', options: ['m', 's', 'xs'] },
  },
  args: {
    variant: 'outline',
    intent: 'neutral',
    size: 'm',
    children: 'Badge',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/* Local Row — Badge stories use a label-less horizontal wrap (different from
   the shared `Row` helper which always has a label column). */
const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>{children}</div>
);

const intents = ['neutral', 'info', 'success', 'warning', 'danger'] as const;
const variants = ['outline', 'soft', 'filled', 'ghost'] as const;
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
                <Badge key={intent} variant={variant} intent={intent} size={size}>
                  Badge
                </Badge>
              ))}
            </Row>
          ))}
        </Section>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <Section layout="flat" title="Sizes">
      <Row>
        {sizes.map((size) => (
          <Badge key={size} size={size} variant="outline" intent="info">
            {size.toUpperCase()}
          </Badge>
        ))}
      </Row>
    </Section>
  ),
};

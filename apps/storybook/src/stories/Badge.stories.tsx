import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check, X } from 'lucide-react';
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
    dot:     { control: 'boolean' },
  },
  args: {
    variant: 'outline',
    intent: 'neutral',
    size: 'm',
    dot: true,
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

// ---------------------------------------------------------------------------
// Icon slots
// ---------------------------------------------------------------------------

export const WithIcons: Story = {
  render: () => (
    <Section layout="flat" title="Icon slots">
      <Row>
        <Badge variant="soft" intent="success" size="m" iconStart={<Check />}>
          Approved
        </Badge>
        <Badge variant="outline" intent="danger" size="s" iconEnd={<X />}>
          Rejected
        </Badge>
        <Badge variant="ghost" intent="info" size="xs" iconStart={<Check />}>
          Synced
        </Badge>
      </Row>
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// Table status without dot
// ---------------------------------------------------------------------------

export const TableStatus: Story = {
  render: () => (
    <Section layout="flat" title="Table status without dot">
      <table style={{ borderCollapse: 'collapse', minWidth: 280 }}>
        <thead>
          <tr>
            <th style={{ padding: 8, textAlign: 'left' }}>Customer</th>
            <th style={{ padding: 8, textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Acme Inc.', 'Active', 'success'],
            ['Northwind', 'Pending', 'warning'],
            ['Globex', 'Blocked', 'danger'],
          ].map(([customer, status, intent]) => (
            <tr key={customer}>
              <td style={{ padding: 8 }}>{customer}</td>
              <td style={{ padding: 8 }}>
                <Badge variant="ghost" intent={intent as 'success' | 'warning' | 'danger'} size="s" dot={false}>
                  {status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Star as StarIcon, Check as CheckIcon, TriangleAlert as AlertIcon, Info as InfoIcon } from 'lucide-react';
import { IconShape } from './IconShape';

const meta = {
  title: 'Components/IconShape',
  component: IconShape,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof IconShape>;

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

const intents = ['primary', 'success', 'warning', 'danger', 'info', 'neutral'] as const;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    intent: 'primary',
    size: 'm',
    children: <StarIcon />,
  },
};

// ---------------------------------------------------------------------------
// All intents
// ---------------------------------------------------------------------------

export const AllIntents: Story = {
  args: {
    children: <StarIcon />,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {intents.map(intent => (
        <IconShape key={intent} intent={intent} size="m">
          <StarIcon />
        </IconShape>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// All sizes
// ---------------------------------------------------------------------------

export const AllSizes: Story = {
  args: {
    children: <StarIcon />,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="M (40px)">
        <div style={{ display: 'flex', gap: 12 }}>
          {intents.map(intent => (
            <IconShape key={intent} intent={intent} size="m">
              <StarIcon />
            </IconShape>
          ))}
        </div>
      </Section>
      <Section title="S (32px)">
        <div style={{ display: 'flex', gap: 12 }}>
          {intents.map(intent => (
            <IconShape key={intent} intent={intent} size="s">
              <StarIcon />
            </IconShape>
          ))}
        </div>
      </Section>
      <Section title="XS (24px)">
        <div style={{ display: 'flex', gap: 12 }}>
          {intents.map(intent => (
            <IconShape key={intent} intent={intent} size="xs">
              <StarIcon />
            </IconShape>
          ))}
        </div>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Semantic usage
// ---------------------------------------------------------------------------

export const SemanticUsage: Story = {
  args: {
    children: <StarIcon />,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <IconShape intent="success" size="m"><CheckIcon /></IconShape>
      <IconShape intent="warning" size="m"><AlertIcon /></IconShape>
      <IconShape intent="danger" size="m"><AlertIcon /></IconShape>
      <IconShape intent="info" size="m"><InfoIcon /></IconShape>
    </div>
  ),
};

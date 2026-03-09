import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
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

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.9 8.62L22 9.27L16.67 13.97L18.18 21L12 17.27L5.82 21L7.33 13.97L2 9.27L9.1 8.62L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9V13M12 17H12.01M4.93 19H19.07C20.14 19 20.84 17.85 20.3 16.93L13.23 4.44C12.69 3.52 11.31 3.52 10.77 4.44L3.7 16.93C3.16 17.85 3.86 19 4.93 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 11V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="8" r="0.75" fill="currentColor" />
  </svg>
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

import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Text } from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

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
    size: 'm',
    title: 'Title',
    description: 'Description text',
  },
};

// ---------------------------------------------------------------------------
// All sizes — description only
// ---------------------------------------------------------------------------

export const DescriptionOnly: Story = {
  args: { description: 'text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="M (14/20)">
        <Text size="m" description="Description text" />
      </Section>
      <Section title="S (12/16)">
        <Text size="s" description="Description text" />
      </Section>
      <Section title="XS (10/14)">
        <Text size="xs" description="Description text" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// All sizes — with title
// ---------------------------------------------------------------------------

export const WithTitle: Story = {
  args: { description: 'text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="M — title L + description M">
        <Text size="m" title="Title" description="Description text goes here" />
      </Section>
      <Section title="S — title M + description S">
        <Text size="s" title="Title" description="Description text goes here" />
      </Section>
      <Section title="XS — title S + description XS">
        <Text size="xs" title="Title" description="Description text goes here" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// As slot content (in context)
// ---------------------------------------------------------------------------

export const AsSlotContent: Story = {
  args: { description: 'text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Section title="Inside a card-like container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: 12,
          border: '1px solid var(--dls-color-border-base)',
          borderRadius: 'var(--dls-radius-m)',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 'var(--dls-radius-m)',
            background: 'var(--dls-color-surface-muted)',
            flexShrink: 0,
          }} />
          <Text size="m" title="Item title" description="Supporting description text" />
        </div>
      </Section>
      <Section title="Small variant in a list item">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          border: '1px solid var(--dls-color-border-base)',
          borderRadius: 'var(--dls-radius-m)',
        }}>
          <div style={{
            width: 24, height: 24, borderRadius: 'var(--dls-radius-full)',
            background: 'var(--dls-color-surface-muted)',
            flexShrink: 0,
          }} />
          <Text size="s" title="Username" description="user@example.com" />
        </div>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Side by side comparison
// ---------------------------------------------------------------------------

export const SizesComparison: Story = {
  args: { description: 'text' },
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <Text size="m" title="Medium" description="14px body" />
      <Text size="s" title="Small" description="12px body" />
      <Text size="xs" title="Extra small" description="10px body" />
    </div>
  ),
};

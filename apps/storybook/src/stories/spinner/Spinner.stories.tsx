import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

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
    size: '24',
  },
};

// ---------------------------------------------------------------------------
// All sizes
// ---------------------------------------------------------------------------

export const AllSizes: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Section title="12">
        <Spinner size="12" />
      </Section>
      <Section title="16">
        <Spinner size="16" />
      </Section>
      <Section title="20">
        <Spinner size="20" />
      </Section>
      <Section title="24">
        <Spinner size="24" />
      </Section>
      <Section title="32">
        <Spinner size="32" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Inline with text
// ---------------------------------------------------------------------------

export const InlineWithText: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: 'var(--dls-font-family)',
        fontSize: 'var(--dls-text-s-font-size)',
        color: 'var(--dls-color-text-secondary)',
      }}>
        <Spinner size="12" />
        Loading items…
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: 'var(--dls-font-family)',
        fontSize: 'var(--dls-text-m-font-size)',
        color: 'var(--dls-color-text-primary)',
      }}>
        <Spinner size="16" />
        Saving changes…
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        fontFamily: 'var(--dls-font-family)',
        fontSize: 'var(--dls-text-m-font-size)',
        color: 'var(--dls-color-text-primary)',
      }}>
        <Spinner size="24" />
        Processing your request
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Centered in container
// ---------------------------------------------------------------------------

export const CenteredInContainer: Story = {
  args: {},
  render: () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 300,
      height: 200,
      border: '1px solid var(--dls-color-border-base)',
      borderRadius: 'var(--dls-radius-m)',
    }}>
      <Spinner size="32" />
    </div>
  ),
};

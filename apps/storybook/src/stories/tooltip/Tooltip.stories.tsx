import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

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
    type: 'general',
    orientation: 'top-center',
    text: 'Tooltip text',
  },
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export const Types: Story = {
  args: { text: 'Tooltip text' },
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      <Section title="General">
        <Tooltip text="Tooltip text" orientation="top-center" />
      </Section>
      <Section title="Error">
        <Tooltip type="error" text="Error message" orientation="top-center" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Orientations — top
// ---------------------------------------------------------------------------

export const OrientationsTop: Story = {
  args: { text: 'Tooltip' },
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      <Section title="Top left">
        <Tooltip text="Tooltip text" orientation="top-left" />
      </Section>
      <Section title="Top center">
        <Tooltip text="Tooltip text" orientation="top-center" />
      </Section>
      <Section title="Top right">
        <Tooltip text="Tooltip text" orientation="top-right" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Orientations — bottom
// ---------------------------------------------------------------------------

export const OrientationsBottom: Story = {
  args: { text: 'Tooltip' },
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      <Section title="Bottom left">
        <Tooltip text="Tooltip text" orientation="bottom-left" />
      </Section>
      <Section title="Bottom center">
        <Tooltip text="Tooltip text" orientation="bottom-center" />
      </Section>
      <Section title="Bottom right">
        <Tooltip text="Tooltip text" orientation="bottom-right" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Orientations — left / right
// ---------------------------------------------------------------------------

export const OrientationsSide: Story = {
  args: { text: 'Tooltip' },
  render: () => (
    <div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
      <Section title="Left">
        <Tooltip text="Tooltip text" orientation="left" />
      </Section>
      <Section title="Right">
        <Tooltip text="Tooltip text" orientation="right" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With slot content (kbd shortcut)
// ---------------------------------------------------------------------------

export const WithShortcut: Story = {
  args: { text: 'Tooltip' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="General with shortcut">
        <Tooltip
          text="Tooltip text"
          orientation="top-center"
          slotContent={
            <kbd style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '2px 4px',
              fontSize: 'var(--dls-text-s-font-size)',
              lineHeight: 'var(--dls-text-s-line-height)',
              fontWeight: 'var(--dls-font-weight-medium)',
              fontFamily: 'var(--dls-font-family)',
              color: 'var(--dls-color-text-secondary)',
              background: 'var(--dls-color-surface-muted)',
              borderRadius: 'var(--dls-radius-component-kbd)',
            }}>
              Ctrl+S
            </kbd>
          }
        />
      </Section>
      <Section title="Error with shortcut">
        <Tooltip
          type="error"
          text="Invalid input"
          orientation="top-center"
          slotContent={
            <kbd style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '2px 4px',
              fontSize: 'var(--dls-text-s-font-size)',
              lineHeight: 'var(--dls-text-s-line-height)',
              fontWeight: 'var(--dls-font-weight-medium)',
              fontFamily: 'var(--dls-font-family)',
              color: 'var(--dls-color-text-secondary)',
              background: 'var(--dls-color-surface-muted)',
              borderRadius: 'var(--dls-radius-component-kbd)',
            }}>
              Esc
            </kbd>
          }
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Error orientations
// ---------------------------------------------------------------------------

export const ErrorOrientations: Story = {
  args: { text: 'Error' },
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <Tooltip type="error" text="Error message" orientation="top-center" />
      <Tooltip type="error" text="Error message" orientation="bottom-center" />
      <Tooltip type="error" text="Error message" orientation="left" />
      <Tooltip type="error" text="Error message" orientation="right" />
    </div>
  ),
};

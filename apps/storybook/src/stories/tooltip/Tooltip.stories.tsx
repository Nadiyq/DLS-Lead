import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Tooltip } from './Tooltip';
import { Kbd, KbdGroup } from '../kbd/Kbd';
import { Section } from '../_helpers/StoryLayout';

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
      <Section layout="flat" size="s" title="General">
        <Tooltip text="Tooltip text" orientation="top-center" />
      </Section>
      <Section layout="flat" size="s" title="Error">
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
      <Section layout="flat" size="s" title="Top left">
        <Tooltip text="Tooltip text" orientation="top-left" />
      </Section>
      <Section layout="flat" size="s" title="Top center">
        <Tooltip text="Tooltip text" orientation="top-center" />
      </Section>
      <Section layout="flat" size="s" title="Top right">
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
      <Section layout="flat" size="s" title="Bottom left">
        <Tooltip text="Tooltip text" orientation="bottom-left" />
      </Section>
      <Section layout="flat" size="s" title="Bottom center">
        <Tooltip text="Tooltip text" orientation="bottom-center" />
      </Section>
      <Section layout="flat" size="s" title="Bottom right">
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
      <Section layout="flat" size="s" title="Left">
        <Tooltip text="Tooltip text" orientation="left" />
      </Section>
      <Section layout="flat" size="s" title="Right">
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
      <Section layout="flat" size="s" title="General with shortcut">
        <Tooltip
          text="Tooltip text"
          orientation="top-center"
          slotContent={
            <KbdGroup type="separated">
              <Kbd>Ctrl</Kbd>
              <Kbd>S</Kbd>
            </KbdGroup>
          }
        />
      </Section>
      <Section layout="flat" size="s" title="Error with shortcut">
        <Tooltip
          type="error"
          text="Invalid input"
          orientation="top-center"
          slotContent={<Kbd>Esc</Kbd>}
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

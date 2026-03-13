import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Separator } from './Separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

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

const TextLine = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    fontFamily: 'var(--dls-font-family)',
    fontSize: 'var(--dls-text-s-font-size)',
    color: 'var(--dls-color-text-secondary)',
  }}>
    {children}
  </span>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
};

// ---------------------------------------------------------------------------
// Horizontal
// ---------------------------------------------------------------------------

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 300 }}>
      <Section title="Horizontal separator">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <TextLine>Content above</TextLine>
          <Separator />
          <TextLine>Content below</TextLine>
        </div>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Vertical
// ---------------------------------------------------------------------------

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: () => (
    <Section title="Vertical separator">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 40 }}>
        <TextLine>Left</TextLine>
        <Separator orientation="vertical" />
        <TextLine>Right</TextLine>
      </div>
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// In list context
// ---------------------------------------------------------------------------

export const InList: Story = {
  args: {},
  render: () => (
    <Section title="Between list items">
      <div style={{ display: 'flex', flexDirection: 'column', width: 240 }}>
        {['Item one', 'Item two', 'Item three', 'Item four'].map((item, i, arr) => (
          <React.Fragment key={item}>
            <div style={{
              padding: '8px 0',
              fontFamily: 'var(--dls-font-family)',
              fontSize: 'var(--dls-text-m-font-size)',
              color: 'var(--dls-color-text-primary)',
            }}>
              {item}
            </div>
            {i < arr.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// In toolbar context
// ---------------------------------------------------------------------------

export const InToolbar: Story = {
  args: {},
  render: () => (
    <Section title="Toolbar dividers">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 32 }}>
        <TextLine>Bold</TextLine>
        <TextLine>Italic</TextLine>
        <Separator orientation="vertical" />
        <TextLine>Left</TextLine>
        <TextLine>Center</TextLine>
        <TextLine>Right</TextLine>
        <Separator orientation="vertical" />
        <TextLine>List</TextLine>
      </div>
    </Section>
  ),
};

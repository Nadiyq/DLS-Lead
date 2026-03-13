import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Scroll } from './Scroll';

const meta = {
  title: 'Components/Scroll',
  component: Scroll,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Scroll>;

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
    orientation: 'vertical',
    thumbSize: 50,
    thumbPosition: 0,
  },
  decorators: [
    (Story) => (
      <div style={{ height: 200 }}>
        <Story />
      </div>
    ),
  ],
};

// ---------------------------------------------------------------------------
// Vertical — various positions
// ---------------------------------------------------------------------------

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      <Section title="Top">
        <div style={{ height: 120 }}>
          <Scroll orientation="vertical" thumbSize={50} thumbPosition={0} />
        </div>
      </Section>
      <Section title="Middle">
        <div style={{ height: 120 }}>
          <Scroll orientation="vertical" thumbSize={50} thumbPosition={25} />
        </div>
      </Section>
      <Section title="Bottom">
        <div style={{ height: 120 }}>
          <Scroll orientation="vertical" thumbSize={50} thumbPosition={50} />
        </div>
      </Section>
      <Section title="Small thumb">
        <div style={{ height: 120 }}>
          <Scroll orientation="vertical" thumbSize={20} thumbPosition={40} />
        </div>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Horizontal — various positions
// ---------------------------------------------------------------------------

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Left">
        <div style={{ width: 200 }}>
          <Scroll orientation="horizontal" thumbSize={40} thumbPosition={0} />
        </div>
      </Section>
      <Section title="Center">
        <div style={{ width: 200 }}>
          <Scroll orientation="horizontal" thumbSize={40} thumbPosition={30} />
        </div>
      </Section>
      <Section title="Right">
        <div style={{ width: 200 }}>
          <Scroll orientation="horizontal" thumbSize={40} thumbPosition={60} />
        </div>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// In context — scrollable container
// ---------------------------------------------------------------------------

export const InContext: Story = {
  args: { orientation: 'vertical' },
  render: () => {
    const [position, setPosition] = React.useState(0);
    const contentRef = React.useRef<HTMLDivElement>(null);

    const handleScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const maxScroll = el.scrollHeight - el.clientHeight;
      const viewRatio = (el.clientHeight / el.scrollHeight) * 100;
      const scrollPct = maxScroll > 0 ? (el.scrollTop / maxScroll) * (100 - viewRatio) : 0;
      setPosition(scrollPct);
    };

    const thumbSize = 30;

    return (
      <div style={{ display: 'flex', gap: 4, height: 200, width: 280 }}>
        <div
          ref={contentRef}
          onScroll={handleScroll}
          style={{
            flex: 1,
            overflow: 'auto',
            scrollbarWidth: 'none',
            fontFamily: 'var(--dls-font-family)',
            fontSize: 'var(--dls-text-s-font-size)',
            color: 'var(--dls-color-text-secondary)',
            lineHeight: 1.6,
          }}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} style={{ padding: '4px 0' }}>Line {i + 1} — scroll to see the indicator move</div>
          ))}
        </div>
        <Scroll orientation="vertical" thumbSize={thumbSize} thumbPosition={position} />
      </div>
    );
  },
};

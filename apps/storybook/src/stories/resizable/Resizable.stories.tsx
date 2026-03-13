import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Resizable } from './Resizable';

const meta = {
  title: 'Components/Resizable',
  component: Resizable,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Resizable>;

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

const Panel = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    padding: 16,
    fontFamily: 'var(--dls-font-family)',
    fontSize: 'var(--dls-text-s-font-size)',
    color: 'var(--dls-color-text-secondary)',
    ...style,
  }}>
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    disabled: false,
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
// States
// ---------------------------------------------------------------------------

export const States: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: 32, height: 200 }}>
      <Section title="Normal">
        <div style={{ height: 160 }}>
          <Resizable />
        </div>
      </Section>
      <Section title="Disabled">
        <div style={{ height: 160 }}>
          <Resizable disabled />
        </div>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive — resizable columns
// ---------------------------------------------------------------------------

export const InteractiveColumns: Story = {
  args: {},
  render: () => {
    const [leftWidth, setLeftWidth] = React.useState(200);
    const containerWidth = 500;
    const minWidth = 80;

    const handleResize = React.useCallback(
      (deltaX: number) => {
        setLeftWidth(prev => {
          const next = prev + deltaX;
          return Math.max(minWidth, Math.min(containerWidth - minWidth - 16, next));
        });
      },
      [containerWidth],
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{
          display: 'flex',
          width: containerWidth,
          height: 200,
          border: '1px solid var(--dls-color-border-base)',
          borderRadius: 'var(--dls-radius-m)',
          overflow: 'hidden',
        }}>
          <Panel style={{ width: leftWidth, flexShrink: 0, background: 'var(--dls-color-surface-muted)' }}>
            Left panel ({leftWidth}px)
          </Panel>
          <Resizable onResize={handleResize} aria-label="Resize panels" />
          <Panel style={{ flex: 1 }}>
            Right panel ({containerWidth - leftWidth - 16}px)
          </Panel>
        </div>
        <span style={{
          fontSize: 'var(--dls-text-s-font-size)',
          color: 'var(--dls-color-text-secondary)',
          fontFamily: 'var(--dls-font-family)',
        }}>
          Drag the handle or use arrow keys when focused
        </span>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Three columns
// ---------------------------------------------------------------------------

export const ThreeColumns: Story = {
  args: {},
  render: () => {
    const containerWidth = 600;
    const minWidth = 80;
    const [widths, setWidths] = React.useState([200, 200]);

    const makeHandler = (index: number) => (deltaX: number) => {
      setWidths(prev => {
        const next = [...prev];
        next[index] = Math.max(minWidth, prev[index] + deltaX);
        return next;
      });
    };

    const rightWidth = Math.max(minWidth, containerWidth - widths[0] - widths[1] - 32);

    return (
      <div style={{
        display: 'flex',
        width: containerWidth,
        height: 200,
        border: '1px solid var(--dls-color-border-base)',
        borderRadius: 'var(--dls-radius-m)',
        overflow: 'hidden',
      }}>
        <Panel style={{ width: widths[0], flexShrink: 0, background: 'var(--dls-color-surface-muted)' }}>
          Panel A
        </Panel>
        <Resizable onResize={makeHandler(0)} aria-label="Resize panel A" />
        <Panel style={{ width: widths[1], flexShrink: 0 }}>
          Panel B
        </Panel>
        <Resizable onResize={makeHandler(1)} aria-label="Resize panel B" />
        <Panel style={{ width: rightWidth, flexShrink: 0, background: 'var(--dls-color-surface-muted)' }}>
          Panel C
        </Panel>
      </div>
    );
  },
};

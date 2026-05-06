import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { SliderItem } from './SliderItem';

const meta = {
  title: 'Components/SliderItem',
  component: SliderItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof SliderItem>;

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
    disabled: false,
    value: 50,
    min: 0,
    max: 100,
    'aria-label': 'Volume',
  },
};

// ---------------------------------------------------------------------------
// All states
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Normal">
        <SliderItem value={50} min={0} max={100} aria-label="Normal" />
      </Section>
      <Section title="Disabled">
        <SliderItem disabled value={50} min={0} max={100} aria-label="Disabled" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// On a track (visual context)
// ---------------------------------------------------------------------------

export const OnTrack: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Single thumb on track">
        <div style={{ position: 'relative', width: 240, height: 16 }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: 0,
            right: 0,
            height: 4,
            borderRadius: 9999,
            background: 'var(--dls-color-surface-muted)',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: 0,
            width: '50%',
            height: 4,
            borderRadius: 9999,
            background: 'var(--dls-color-intent-neutral-base)',
          }} />
          <div style={{ position: 'absolute', top: 0, left: 'calc(50% - 8px)' }}>
            <SliderItem value={50} min={0} max={100} aria-label="Volume" />
          </div>
        </div>
      </Section>
      <Section title="Range (two thumbs)">
        <div style={{ position: 'relative', width: 240, height: 16 }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: 0,
            right: 0,
            height: 4,
            borderRadius: 9999,
            background: 'var(--dls-color-surface-muted)',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: '25%',
            width: '50%',
            height: 4,
            borderRadius: 9999,
            background: 'var(--dls-color-intent-neutral-base)',
          }} />
          <div style={{ position: 'absolute', top: 0, left: 'calc(25% - 8px)' }}>
            <SliderItem value={25} min={0} max={100} aria-label="Min" />
          </div>
          <div style={{ position: 'absolute', top: 0, left: 'calc(75% - 8px)' }}>
            <SliderItem value={75} min={0} max={100} aria-label="Max" />
          </div>
        </div>
      </Section>
    </div>
  ),
};

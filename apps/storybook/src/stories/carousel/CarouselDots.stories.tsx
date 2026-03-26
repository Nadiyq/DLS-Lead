import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { CarouselDots } from './CarouselDots';
import { CarouselArrow } from './CarouselArrow';

const meta = {
  title: 'Components/CarouselDots',
  component: CarouselDots,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof CarouselDots>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    total: 5,
    current: 0,
  },
};

// ---------------------------------------------------------------------------
// Various counts
// ---------------------------------------------------------------------------

export const VariousCounts: Story = {
  args: {
    total: 5,
    current: 0,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <CarouselDots total={3} current={0} />
      <CarouselDots total={5} current={2} />
      <CarouselDots total={7} current={4} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    total: 5,
    current: 0,
  },
  render: () => {
    const [current, setCurrent] = React.useState(0);
    const total = 5;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <CarouselDots total={total} current={current} onDotClick={setCurrent} />
        <span style={{ fontFamily: 'var(--dls-font-family)', fontSize: 13, color: 'var(--dls-color-text-secondary)' }}>
          Slide {current + 1} of {total}
        </span>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// With arrows
// ---------------------------------------------------------------------------

export const WithArrows: Story = {
  args: {
    total: 5,
    current: 0,
  },
  render: () => {
    const [current, setCurrent] = React.useState(0);
    const total = 5;

    return (
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <CarouselArrow
          direction="left"
          disabled={current === 0}
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
        />
        <CarouselDots total={total} current={current} onDotClick={setCurrent} />
        <CarouselArrow
          direction="right"
          disabled={current === total - 1}
          onClick={() => setCurrent(c => Math.min(total - 1, c + 1))}
        />
      </div>
    );
  },
};

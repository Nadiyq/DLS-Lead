import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Carousel } from './Carousel';
import { CarouselItem } from './CarouselItem';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const colors = ['#6941C6', '#2E90FA', '#12B76A', '#F79009', '#F04438'];

const Slide = ({ index, w = 280, h = 132 }: { index: number; w?: number; h?: number }) => (
  <CarouselItem width={w} height={h}>
    <div
      style={{
        width: '100%',
        height: '100%',
        background: colors[index % colors.length],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--dls-font-family)',
        fontSize: 18,
        fontWeight: 700,
        color: '#fff',
      }}
    >
      Slide {index + 1}
    </div>
  </CarouselItem>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    orientation: 'horizontal',
    showLabel: true,
    showDots: true,
    showArrows: true,
    children: Array.from({ length: 5 }, (_, i) => <Slide key={i} index={i} />),
  },
};

// ---------------------------------------------------------------------------
// Horizontal (default)
// ---------------------------------------------------------------------------

export const Horizontal: Story = {
  args: {
    children: [],
  },
  render: () => (
    <div style={{ width: 350 }}>
      <Carousel>
        {Array.from({ length: 5 }, (_, i) => (
          <Slide key={i} index={i} />
        ))}
      </Carousel>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Vertical
// ---------------------------------------------------------------------------

export const Vertical: Story = {
  args: {
    children: [],
  },
  render: () => (
    <div style={{ width: 300 }}>
      <Carousel orientation="vertical">
        {Array.from({ length: 5 }, (_, i) => (
          <Slide key={i} index={i} />
        ))}
      </Carousel>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Without label
// ---------------------------------------------------------------------------

export const DotsOnly: Story = {
  args: {
    children: [],
  },
  render: () => (
    <div style={{ width: 350 }}>
      <Carousel showLabel={false}>
        {Array.from({ length: 3 }, (_, i) => (
          <Slide key={i} index={i} />
        ))}
      </Carousel>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Arrows only (no dots/label)
// ---------------------------------------------------------------------------

export const ArrowsOnly: Story = {
  args: {
    children: [],
  },
  render: () => (
    <div style={{ width: 350 }}>
      <Carousel showLabel={false} showDots={false}>
        {Array.from({ length: 5 }, (_, i) => (
          <Slide key={i} index={i} />
        ))}
      </Carousel>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive (controlled)
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    children: [],
  },
  render: () => {
    const [current, setCurrent] = React.useState(0);
    const total = 5;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 350 }}>
          <Carousel current={current} onSlideChange={setCurrent}>
            {Array.from({ length: total }, (_, i) => (
              <Slide key={i} index={i} />
            ))}
          </Carousel>
        </div>
        <span style={{ fontFamily: 'var(--dls-font-family)', fontSize: 13, color: 'var(--dls-color-text-secondary)' }}>
          Controlled: slide {current + 1}
        </span>
      </div>
    );
  },
};

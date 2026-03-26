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

const Slide = ({ index, w = 132, h = 132 }: { index: number; w?: number; h?: number }) => (
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
    orientation: 'horizontal',
    visibleItems: 1,
    showLabel: false,
    showDots: true,
    showArrows: true,
    children: Array.from({ length: 5 }, (_, i) => <Slide key={i} index={i} />),
  },
};

// ---------------------------------------------------------------------------
// Horizontal — 1, 2, 3 visible items
// ---------------------------------------------------------------------------

export const HorizontalVariants: Story = {
  args: { children: [] },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
      <Section title="1 item visible">
        <Carousel visibleItems={1}>
          {Array.from({ length: 5 }, (_, i) => (
            <Slide key={i} index={i} />
          ))}
        </Carousel>
      </Section>
      <Section title="2 items visible">
        <Carousel visibleItems={2}>
          {Array.from({ length: 5 }, (_, i) => (
            <Slide key={i} index={i} />
          ))}
        </Carousel>
      </Section>
      <Section title="3 items visible">
        <Carousel visibleItems={3}>
          {Array.from({ length: 5 }, (_, i) => (
            <Slide key={i} index={i} />
          ))}
        </Carousel>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Vertical — 1, 2, 3 visible items
// ---------------------------------------------------------------------------

export const VerticalVariants: Story = {
  args: { children: [] },
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <Section title="1 item">
        <Carousel orientation="vertical" visibleItems={1}>
          {Array.from({ length: 5 }, (_, i) => (
            <Slide key={i} index={i} w={200} />
          ))}
        </Carousel>
      </Section>
      <Section title="2 items">
        <Carousel orientation="vertical" visibleItems={2}>
          {Array.from({ length: 5 }, (_, i) => (
            <Slide key={i} index={i} w={200} />
          ))}
        </Carousel>
      </Section>
      <Section title="3 items">
        <Carousel orientation="vertical" visibleItems={3}>
          {Array.from({ length: 5 }, (_, i) => (
            <Slide key={i} index={i} w={200} />
          ))}
        </Carousel>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive (controlled)
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: { children: [] },
  render: () => {
    const [current, setCurrent] = React.useState(0);
    const total = 5;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <Carousel current={current} onSlideChange={setCurrent} visibleItems={2}>
          {Array.from({ length: total }, (_, i) => (
            <Slide key={i} index={i} />
          ))}
        </Carousel>
        <span style={{ fontFamily: 'var(--dls-font-family)', fontSize: 13, color: 'var(--dls-color-text-secondary)' }}>
          Controlled: slide {current + 1}
        </span>
      </div>
    );
  },
};

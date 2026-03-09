import type { Meta, StoryObj } from '@storybook/react-vite';
import { CarouselArrow } from './CarouselArrow';

const meta = {
  title: 'Components/CarouselArrow',
  component: CarouselArrow,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof CarouselArrow>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    direction: 'right',
  },
};

// ---------------------------------------------------------------------------
// All directions
// ---------------------------------------------------------------------------

export const AllDirections: Story = {
  args: {
    direction: 'right',
  },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <CarouselArrow direction="left" />
      <CarouselArrow direction="up" />
      <CarouselArrow direction="down" />
      <CarouselArrow direction="right" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Horizontal pair
// ---------------------------------------------------------------------------

export const HorizontalPair: Story = {
  args: {
    direction: 'right',
  },
  render: () => (
    <div style={{ display: 'flex', gap: 200, alignItems: 'center' }}>
      <CarouselArrow direction="left" />
      <CarouselArrow direction="right" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    direction: 'right',
  },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <CarouselArrow direction="left" disabled />
      <CarouselArrow direction="right" />
    </div>
  ),
};

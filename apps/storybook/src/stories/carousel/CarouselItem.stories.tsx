import type { Meta, StoryObj } from '@storybook/react-vite';
import { CarouselItem } from './CarouselItem';

const meta = {
  title: 'Components/CarouselItem',
  component: CarouselItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof CarouselItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Placeholder = ({ color, label }: { color: string; label: string }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--dls-font-family)',
      fontSize: 14,
      fontWeight: 600,
      color: '#fff',
    }}
  >
    {label}
  </div>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    width: 132,
    height: 132,
    children: <Placeholder color="#6941C6" label="Slide" />,
  },
};

// ---------------------------------------------------------------------------
// Various sizes
// ---------------------------------------------------------------------------

export const VariousSizes: Story = {
  args: {
    width: 132,
    height: 132,
    children: <Placeholder color="#6941C6" label="Slide" />,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'end' }}>
      <CarouselItem width={100} height={100}>
        <Placeholder color="#6941C6" label="100×100" />
      </CarouselItem>
      <CarouselItem width={132} height={132}>
        <Placeholder color="#2E90FA" label="132×132" />
      </CarouselItem>
      <CarouselItem width={200} height={132}>
        <Placeholder color="#12B76A" label="200×132" />
      </CarouselItem>
    </div>
  ),
};

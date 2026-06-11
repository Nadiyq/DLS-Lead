import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';
import { expect } from 'storybook/test';
import { Dot, DOT_INTENTS, DOT_SIZES } from './Dot';

const meta = {
  title: 'Components/Dot',
  component: Dot,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: DOT_SIZES },
    label: { control: 'boolean' },
    text: { control: 'text' },
    intent: { control: 'select', options: DOT_INTENTS },
  },
  args: {
    size: 'xs',
    label: true,
    text: '120',
    intent: 'danger',
  },
} satisfies Meta<typeof Dot>;

export default meta;
type Story = StoryObj<typeof meta>;

const Matrix = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, max-content)',
      columnGap: 'var(--dls-spacing-8)',
      rowGap: 'var(--dls-spacing-6)',
      alignItems: 'start',
    }}
  >
    {children}
  </div>
);

const FigmaStack = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--dls-spacing-8)',
    }}
  >
    {children}
  </div>
);

export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('120')).toBeVisible();
  },
};

export const FigmaMatrix: Story = {
  render: () => (
    <FigmaStack>
      {DOT_SIZES.map((size) => (
        <Dot key={size} size={size} text="120" intent="danger" />
      ))}
    </FigmaStack>
  ),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getAllByText('120')).toHaveLength(3);
    await expect(canvasElement.querySelectorAll('.dls-dot__marker')).toHaveLength(3);
  },
};

export const Sizes: Story = {
  render: () => (
    <Matrix>
      {DOT_SIZES.map((size) => (
        <Dot key={size} size={size} label={false} />
      ))}
    </Matrix>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('.dls-dot__marker')).toHaveLength(3);
  },
};

export const AllIntents: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--dls-spacing-8)',
      }}
    >
      {DOT_INTENTS.map((intent) => (
        <Dot key={intent} size="m" intent={intent} label={false} title={intent} />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('.dls-dot')).toHaveLength(DOT_INTENTS.length);
  },
};

export const WithoutLabel: Story = {
  args: {
    label: false,
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.queryByText('120')).toBeNull();
    await expect(canvasElement.querySelector('.dls-dot__marker')).not.toBeNull();
  },
};

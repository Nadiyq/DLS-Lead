import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';
import { expect } from 'storybook/test';
import { Pie } from './Pie';

const meta = {
  title: 'Components/Pie',
  component: Pie,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    stroke: { control: 'boolean' },
  },
  args: {
    stroke: false,
  },
} satisfies Meta<typeof Pie>;

export default meta;
type Story = StoryObj<typeof meta>;

const Matrix = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--dls-spacing-11)',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBlock: 'var(--dls-spacing-8)',
      paddingInline: 'var(--dls-spacing-6)',
    }}
  >
    {children}
  </div>
);

export const Playground: Story = {
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole('img', { name: /Pie chart: Pink 65/ })).toBeVisible();
    await expect(canvasElement.querySelectorAll('.dls-pie__segment')).toHaveLength(5);
  },
};

export const FigmaDefault: Story = {};

export const WithStroke: Story = {
  args: {
    stroke: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /with segment borders/ })).toHaveAttribute('data-stroke', 'true');
  },
};

export const FigmaMatrix: Story = {
  render: () => (
    <Matrix>
      <Pie aria-label="Pie chart without segment borders: Pink 65, Teal 60, Cinnamon 90, Blue 20, Yellow 65" />
      <Pie stroke aria-label="Pie chart with segment borders: Pink 65, Teal 60, Cinnamon 90, Blue 20, Yellow 65" />
    </Matrix>
  ),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getAllByRole('img')).toHaveLength(2);
    await expect(canvas.getByRole('img', { name: /without segment borders/ })).toBeVisible();
    await expect(canvas.getByRole('img', { name: /with segment borders/ })).toBeVisible();
    await expect(canvasElement.querySelectorAll('.dls-pie__segment')).toHaveLength(10);
  },
};

export const CustomAccessibleName: Story = {
  args: {
    'aria-label': 'Lead source distribution',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'Lead source distribution' })).toBeVisible();
  },
};

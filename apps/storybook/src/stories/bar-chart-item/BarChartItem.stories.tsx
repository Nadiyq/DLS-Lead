import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';
import { expect } from 'storybook/test';
import { BAR_CHART_ITEM_TYPES, BarChartItem, type BarChartItemType } from './BarChartItem';

const meta = {
  title: 'Components/BarChartItem',
  component: BarChartItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: BAR_CHART_ITEM_TYPES },
    horizontal: { control: 'boolean' },
    active: { control: 'boolean' },
    value: { control: 'boolean' },
    valueText: { control: 'text' },
    negativeValueText: { control: 'text' },
  },
  args: {
    type: 'default',
    horizontal: false,
    active: false,
    value: true,
    valueText: '12',
    negativeValueText: '12',
  },
} satisfies Meta<typeof BarChartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const Matrix = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, max-content)',
      columnGap: 'calc(var(--dls-spacing-16) + var(--dls-spacing-8))',
      rowGap: 'var(--dls-spacing-8)',
      alignItems: 'center',
      justifyItems: 'center',
      padding: 'var(--dls-spacing-6)',
    }}
  >
    {children}
  </div>
);

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      gap: 'var(--dls-spacing-8)',
      alignItems: 'center',
      padding: 'var(--dls-spacing-6)',
    }}
  >
    {children}
  </div>
);

export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'Bar chart item: 12' })).toBeVisible();
    await expect(canvas.getByText('12')).toBeVisible();
  },
};

export const FigmaDefault: Story = {
  args: {
    type: 'default',
    horizontal: false,
    active: false,
    value: true,
    valueText: '12',
  },
};

export const FigmaMatrix: Story = {
  render: () => (
    <Matrix>
      {BAR_CHART_ITEM_TYPES.flatMap((type: BarChartItemType) => [
        <BarChartItem key={`${type}-vertical`} type={type} />,
        <BarChartItem key={`${type}-horizontal`} type={type} horizontal />,
        <BarChartItem key={`${type}-vertical-active`} type={type} active />,
        <BarChartItem key={`${type}-horizontal-active`} type={type} horizontal active />,
      ])}
    </Matrix>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('img').length).toBe(12);
    await expect(canvas.getAllByText('12').length).toBeGreaterThanOrEqual(12);
  },
};

export const Horizontal: Story = {
  args: {
    horizontal: true,
  },
};

export const Stacked: Story = {
  args: {
    type: 'stacked',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'Stacked bar chart item: 12' })).toBeVisible();
  },
};

export const Negative: Story = {
  args: {
    type: 'negative',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('img', { name: 'Negative bar chart item: positive 12, negative 12' }),
    ).toBeVisible();
  },
};

export const ActiveStates: Story = {
  render: () => (
    <Stack>
      {BAR_CHART_ITEM_TYPES.map((type) => (
        <BarChartItem key={`${type}-inactive`} type={type} />
      ))}
      {BAR_CHART_ITEM_TYPES.map((type) => (
        <BarChartItem key={`${type}-active`} type={type} active />
      ))}
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const activeItems = canvasElement.querySelectorAll('[data-active]');
    await expect(activeItems.length).toBe(3);
  },
};

export const WithoutValue: Story = {
  args: {
    value: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'Bar chart default item' })).toBeVisible();
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';
import { expect } from 'storybook/test';
import {
  LEGEND_ITEM_COLORS,
  LEGEND_ITEM_TONES,
  type LegendItemColor,
} from '../legend-item/LegendItem';
import { TooltipItem } from './TooltipItem';

const labelFor = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const meta = {
  title: 'Components/TooltipItem',
  component: TooltipItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    unit: { control: 'text' },
    color: { control: 'select', options: LEGEND_ITEM_COLORS },
    tone: { control: 'select', options: LEGEND_ITEM_TONES },
    showSwatch: { control: 'boolean' },
    layout: { control: 'select', options: ['inline', 'split'] },
  },
  args: {
    label: 'Item 1',
    value: '50%',
    unit: 'kcal',
    color: 'green',
    tone: '500',
    showSwatch: true,
    layout: 'inline',
  },
} satisfies Meta<typeof TooltipItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dls-spacing-3)' }}>
    {children}
  </div>
);

const SplitFrame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 'calc(var(--dls-spacing-10) * 4 + var(--dls-spacing-1))' }}>
    {children}
  </div>
);

export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Item 1')).toBeVisible();
  },
};

export const FigmaDefault: Story = {
  args: {
    label: 'Item 1',
    value: '50%',
    unit: 'kcal',
    color: 'green',
    tone: '500',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Item 1')).toBeVisible();
    await expect(canvas.getByText('50%')).toBeVisible();
    await expect(canvas.getByText('kcal')).toBeVisible();
  },
};

export const Split: Story = {
  render: () => (
    <SplitFrame>
      <TooltipItem label="Item 1" value="50%" unit="kcal" color="green" layout="split" />
    </SplitFrame>
  ),
};

export const WithoutUnit: Story = {
  args: {
    label: 'Item 1',
    value: '50%',
    unit: null,
  },
};

export const WithoutValue: Story = {
  args: {
    label: 'Item 1',
    value: null,
    unit: 'kcal',
  },
};

export const TotalItem: Story = {
  args: {
    label: 'Total',
    value: '50%',
    unit: 'kcal',
    showSwatch: false,
    layout: 'split',
  },
  decorators: [
    (Story) => (
      <SplitFrame>
        <Story />
      </SplitFrame>
    ),
  ],
};

export const AllColors: Story = {
  render: () => (
    <Stack>
      {LEGEND_ITEM_COLORS.map((color: LegendItemColor) => (
        <TooltipItem key={color} label={labelFor(color)} value="50%" unit="kcal" color={color} />
      ))}
    </Stack>
  ),
};

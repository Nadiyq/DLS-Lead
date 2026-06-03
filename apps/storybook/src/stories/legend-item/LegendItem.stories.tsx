import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';
import { expect } from 'storybook/test';
import {
  LEGEND_ITEM_COLORS,
  LEGEND_ITEM_TONES,
  LegendItem,
  type LegendItemColor,
} from './LegendItem';

const labelFor = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const meta = {
  title: 'Components/LegendItem',
  component: LegendItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    color: { control: 'select', options: LEGEND_ITEM_COLORS },
    tone: { control: 'select', options: LEGEND_ITEM_TONES },
  },
  args: {
    label: 'Item 1',
    color: 'green',
    tone: '500',
  },
} satisfies Meta<typeof LegendItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dls-spacing-3)' }}>
    {children}
  </div>
);

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, max-content))',
      columnGap: 'var(--dls-spacing-8)',
      rowGap: 'var(--dls-spacing-3)',
    }}
  >
    {children}
  </div>
);

const legendData: Array<{ label: string; value: string; color: LegendItemColor }> = [
  { label: 'Pipeline', value: '42%', color: 'green' },
  { label: 'Expansion', value: '28%', color: 'blue' },
  { label: 'Renewals', value: '18%', color: 'violet' },
  { label: 'Risk', value: '12%', color: 'orange' },
];

export const Playground: Story = {};

export const FigmaDefault: Story = {
  args: {
    label: 'Item 1',
    color: 'green',
    tone: '500',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Item 1')).toBeVisible();
  },
};

export const WithValue: Story = {
  args: {
    label: 'Item 1',
    value: '50%',
    color: 'green',
    tone: '500',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Item 1')).toBeVisible();
    await expect(canvas.getByText('50%')).toBeVisible();
  },
};

export const AllColors: Story = {
  render: () => (
    <Grid>
      {LEGEND_ITEM_COLORS.map((color) => (
        <LegendItem key={color} label={labelFor(color)} color={color} tone="500" />
      ))}
    </Grid>
  ),
};

export const Tones: Story = {
  render: () => (
    <Stack>
      {LEGEND_ITEM_TONES.map((tone) => (
        <LegendItem key={tone} label={`Green ${tone}`} color="green" tone={tone} />
      ))}
    </Stack>
  ),
};

export const ChartLegend: Story = {
  render: () => (
    <Stack>
      {legendData.map((item) => (
        <LegendItem
          key={item.label}
          label={item.label}
          value={item.value}
          color={item.color}
          tone="500"
        />
      ))}
    </Stack>
  ),
};

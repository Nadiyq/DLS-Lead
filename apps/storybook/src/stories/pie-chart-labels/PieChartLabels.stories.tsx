import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import {
  PieChartLabels,
  PIE_CHART_LABELS_DEFAULT_ITEMS,
  PIE_CHART_LABEL_TONES,
  type PieChartLabelItem,
} from './PieChartLabels';

const partialItems: PieChartLabelItem[] = PIE_CHART_LABELS_DEFAULT_ITEMS.map((item) => (
  item.label === 'Yellow' ? { ...item, visible: false } : item
));

const longLabelItems: PieChartLabelItem[] = [
  { label: 'Social Media', value: '65', slot: 'label-1', color: 'pink' },
  { label: 'Paid Search', value: '60', slot: 'label-2', color: 'teal' },
  { label: 'Direct Traffic', value: '90', slot: 'label-3', color: 'cinnamon' },
  { label: 'Email', value: '20', slot: 'label-4', color: 'blue' },
  { label: 'Referral', value: '65', slot: 'label-5', color: 'yellow' },
];

const meta = {
  title: 'Components/PieChartLabels',
  component: PieChartLabels,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    categories: { control: 'boolean' },
    stroke: { control: 'boolean' },
    tone: { control: 'select', options: PIE_CHART_LABEL_TONES },
  },
  args: {
    items: PIE_CHART_LABELS_DEFAULT_ITEMS,
    categories: true,
    stroke: true,
    tone: '700',
  },
} satisfies Meta<typeof PieChartLabels>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('list', { name: 'Pie chart labels' })).toBeVisible();
    await expect(canvas.getByText('Pink')).toBeVisible();
    await expect(canvas.getAllByText('65')).toHaveLength(2);
  },
};

export const FigmaDefault: Story = {
  args: {
    items: PIE_CHART_LABELS_DEFAULT_ITEMS,
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText('Teal')).toBeVisible();
    await expect(canvas.getByText('Cinnamon')).toBeVisible();
    await expect(canvasElement.querySelectorAll('.dls-pie-chart-labels__leader')).toHaveLength(5);
  },
};

export const WithoutStrokes: Story = {
  args: {
    stroke: false,
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('.dls-pie-chart-labels__leader')).toHaveLength(0);
  },
};

export const WithoutCategories: Story = {
  args: {
    categories: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.queryByText('Pink')).toBeNull();
    await expect(canvas.getByText('90')).toBeVisible();
  },
};

export const PartialLabels: Story = {
  args: {
    items: partialItems,
  },
  play: async ({ canvas }) => {
    await expect(canvas.queryByText('Yellow')).toBeNull();
    await expect(canvas.getByText('Blue')).toBeVisible();
  },
};

export const LongLabels: Story = {
  args: {
    items: longLabelItems,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Social Media')).toBeVisible();
    await expect(canvas.getByText('Direct Traffic')).toBeVisible();
  },
};

export const MutedTone: Story = {
  args: {
    tone: '500',
  },
};

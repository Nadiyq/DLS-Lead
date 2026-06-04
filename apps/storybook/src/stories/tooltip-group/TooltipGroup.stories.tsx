import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';
import { expect } from 'storybook/test';
import {
  TOOLTIP_GROUP_DEFAULT_ITEMS,
  TooltipGroup,
  type TooltipGroupItem,
} from './TooltipGroup';

const nutritionItems: TooltipGroupItem[] = [
  { id: 'protein', label: 'Protein', value: '18', unit: 'g', color: 'green' },
  { id: 'carbs', label: 'Carbs', value: '42', unit: 'g', color: 'yellow' },
  { id: 'fat', label: 'Fat', value: '11', unit: 'g', color: 'blue' },
];

const revenueItems: TooltipGroupItem[] = [
  { id: 'pipeline', label: 'Pipeline', value: '42%', unit: null, color: 'green' },
  { id: 'expansion', label: 'Expansion', value: '28%', unit: null, color: 'yellow' },
  { id: 'renewals', label: 'Renewals', value: '18%', unit: null, color: 'blue' },
];

const longItems: TooltipGroupItem[] = [
  { id: 'north-america', label: 'North America', value: '38%', unit: null, color: 'green' },
  { id: 'emea', label: 'EMEA Mid-Market', value: '24%', unit: null, color: 'yellow' },
  { id: 'apac', label: 'APAC Strategic', value: '19%', unit: null, color: 'blue' },
];

const meta = {
  title: 'Components/TooltipGroup',
  component: TooltipGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    date: { control: 'text' },
    items: { control: 'object' },
    total: { control: 'object' },
    showPointer: { control: 'boolean' },
  },
  args: {
    date: '1 Jan, 2026',
    items: TOOLTIP_GROUP_DEFAULT_ITEMS,
    total: { id: 'total', label: 'Total', value: '50%', unit: 'kcal', showSwatch: false },
    showPointer: true,
  },
} satisfies Meta<typeof TooltipGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const Matrix = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--dls-spacing-8)',
      flexWrap: 'wrap',
    }}
  >
    {children}
  </div>
);

export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('tooltip', { name: 'Chart tooltip' })).toBeVisible();
  },
};

export const FigmaDefault: Story = {
  args: {
    date: '1 Jan, 2026',
    items: TOOLTIP_GROUP_DEFAULT_ITEMS,
    total: { id: 'total', label: 'Total', value: '50%', unit: 'kcal', showSwatch: false },
    showPointer: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('tooltip', { name: 'Chart tooltip' })).toBeVisible();
    await expect(canvas.getByText('1 Jan, 2026')).toBeVisible();
    await expect(canvas.getByText('Total')).toBeVisible();
  },
};

export const WithoutPointer: Story = {
  args: {
    showPointer: false,
  },
};

export const WithoutDate: Story = {
  args: {
    date: null,
  },
};

export const WithoutTotal: Story = {
  args: {
    total: null,
  },
};

export const NutritionBreakdown: Story = {
  args: {
    date: 'Lunch',
    items: nutritionItems,
    total: { id: 'total', label: 'Total', value: '71', unit: 'g', showSwatch: false },
  },
};

export const RevenueBreakdown: Story = {
  args: {
    date: 'Q1 2026',
    items: revenueItems,
    total: { id: 'total', label: 'Total', value: '88%', unit: null, showSwatch: false },
  },
};

export const LongLabels: Story = {
  args: {
    date: 'Regions',
    items: longItems,
    total: { id: 'total', label: 'Total', value: '81%', unit: null, showSwatch: false },
  },
};

export const MatrixStates: Story = {
  render: () => (
    <Matrix>
      <TooltipGroup />
      <TooltipGroup showPointer={false} />
      <TooltipGroup date={null} />
      <TooltipGroup total={null} />
    </Matrix>
  ),
};

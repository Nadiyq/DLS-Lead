import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';
import { expect } from 'storybook/test';
import { BAR_COUNTS, Bar, type BarCount } from './Bar';

const meta = {
  title: 'Components/Bar',
  component: Bar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    axis: { control: 'boolean' },
    axisText: { control: 'text' },
    bars: { control: 'select', options: BAR_COUNTS },
    horizontal: { control: 'boolean' },
    value: { control: 'boolean' },
    valueText: { control: 'text' },
  },
  args: {
    axis: true,
    axisText: 'Jan',
    bars: '3',
    horizontal: true,
    value: true,
    valueText: '12',
  },
} satisfies Meta<typeof Bar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Matrix = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, max-content)',
      columnGap: 'calc(var(--dls-spacing-16) + var(--dls-spacing-12))',
      rowGap: 'calc(var(--dls-spacing-16) + var(--dls-spacing-6))',
      alignItems: 'center',
      justifyItems: 'center',
      padding: 'var(--dls-spacing-10)',
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
      padding: 'var(--dls-spacing-8)',
    }}
  >
    {children}
  </div>
);

export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: '3 bars for Jan, each 12' })).toBeVisible();
    await expect(canvas.getByText('Jan')).toBeVisible();
  },
};

export const FigmaMatrix: Story = {
  render: () => (
    <Matrix>
      {BAR_COUNTS.slice().reverse().map((bars: BarCount) => (
        <Bar key={`horizontal-${bars}`} bars={bars} horizontal />
      ))}
      {BAR_COUNTS.slice().reverse().map((bars: BarCount) => (
        <Bar key={`vertical-${bars}`} bars={bars} horizontal={false} />
      ))}
    </Matrix>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('img').length).toBe(6);
    await expect(canvas.getAllByText('Jan').length).toBe(6);
  },
};

export const OneBar: Story = {
  args: {
    bars: '1',
  },
};

export const TwoBars: Story = {
  args: {
    bars: '2',
  },
};

export const ThreeBars: Story = {
  args: {
    bars: '3',
  },
};

export const Vertical: Story = {
  args: {
    horizontal: false,
  },
};

export const Counts: Story = {
  render: () => (
    <Stack>
      {BAR_COUNTS.map((bars) => (
        <Bar key={bars} bars={bars} />
      ))}
    </Stack>
  ),
};

export const WithoutAxis: Story = {
  args: {
    axis: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: '3 bars, each 12' })).toBeVisible();
  },
};

export const WithoutValue: Story = {
  args: {
    value: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: '3 bars for Jan' })).toBeVisible();
  },
};

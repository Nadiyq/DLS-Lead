import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, fn, userEvent } from 'storybook/test';

import { Header } from './Header';

const meta = {
  title: 'Examples/DLS Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onOpenFoundations: fn(),
    onOpenComponents: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReadyForReview: Story = {
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Foundations' }));
    await expect(args.onOpenFoundations).toHaveBeenCalled();

    await userEvent.click(canvas.getByRole('button', { name: 'Components' }));
    await expect(args.onOpenComponents).toHaveBeenCalled();
  },
};

export const ComponentsAction: Story = {
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Components' }));
    await expect(args.onOpenComponents).toHaveBeenCalled();
  },
};

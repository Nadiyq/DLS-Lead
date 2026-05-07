import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent } from 'storybook/test';

import { Page } from './Page';

const meta = {
  title: 'Examples/DLS Workspace',
  component: Page,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ReviewerMode: Story = {
  play: async ({ canvas }) => {
    const reviewButton = canvas.getByRole('button', { name: 'Review as designer' });
    await expect(reviewButton).toBeInTheDocument();
    await userEvent.click(reviewButton);
    await expect(canvas.getByText('Design system owner')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Foundations' }));
    await expect(canvas.getByText('Current review path: Foundations')).toBeInTheDocument();
  },
};

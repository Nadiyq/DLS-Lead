import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, fn, userEvent } from 'storybook/test';
import { Avatar, UserIcon } from './Avatar';
import type { AvatarSize } from './Avatar';
import { Section } from './_helpers/StoryLayout';

const SIZES: AvatarSize[] = ['144', '88', '80', '72', '48', '40', '32', '28', '24', '20', '18'];

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
    },
    circle: { control: 'boolean' },
    src: { control: 'text' },
    initials: { control: 'text' },
    dot: { control: 'boolean' },
  },
  args: {
    size: '48',
    initials: 'AB',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SizeLabel = ({ size, children }: { size: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
    {children}
    <span style={{
      fontSize: 10,
      color: 'var(--dls-color-text-secondary)',
      fontFamily: 'var(--dls-font-family)',
    }}>
      {size}
    </span>
  </div>
);

const SAMPLE_IMAGE = 'https://i.pravatar.cc/300?img=12';

// ---------------------------------------------------------------------------
// Figma matrix
// ---------------------------------------------------------------------------

export const FigmaMatrix: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, minmax(72px, 1fr))',
        gap: 24,
        alignItems: 'center',
      }}
    >
      {SIZES.map((size) => (
        <React.Fragment key={size}>
          <Avatar size={size} src={SAMPLE_IMAGE} alt="User" />
          <Avatar size={size} initials="AB" />
          <Avatar size={size} icon={<UserIcon />} />
          <Avatar size={size} src={SAMPLE_IMAGE} alt="User" circle />
          <Avatar size={size} initials="AB" circle />
          <Avatar size={size} icon={<UserIcon />} circle />
        </React.Fragment>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    size: '48',
    initials: 'AB',
  },
};

// ---------------------------------------------------------------------------
// All sizes — Initials (square)
// ---------------------------------------------------------------------------

export const AllSizesInitials: Story = {
  render: () => (
    <Section layout="wrap" title="All Sizes — Initials (Square)">
      {SIZES.map((size) => (
        <SizeLabel key={size} size={size}>
          <Avatar size={size} initials="AB" />
        </SizeLabel>
      ))}
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// All sizes — Initials (circle)
// ---------------------------------------------------------------------------

export const AllSizesInitialsCircle: Story = {
  render: () => (
    <Section layout="wrap" title="All Sizes — Initials (Circle)">
      {SIZES.map((size) => (
        <SizeLabel key={size} size={size}>
          <Avatar size={size} initials="AB" circle />
        </SizeLabel>
      ))}
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// All sizes — Icon (square)
// ---------------------------------------------------------------------------

export const AllSizesIcon: Story = {
  render: () => (
    <Section layout="wrap" title="All Sizes — Icon (Square)">
      {SIZES.map((size) => (
        <SizeLabel key={size} size={size}>
          <Avatar size={size} icon={<UserIcon />} />
        </SizeLabel>
      ))}
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// All sizes — Icon (circle)
// ---------------------------------------------------------------------------

export const AllSizesIconCircle: Story = {
  render: () => (
    <Section layout="wrap" title="All Sizes — Icon (Circle)">
      {SIZES.map((size) => (
        <SizeLabel key={size} size={size}>
          <Avatar size={size} icon={<UserIcon />} circle />
        </SizeLabel>
      ))}
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// All sizes — Image (square)
// ---------------------------------------------------------------------------

export const AllSizesImage: Story = {
  render: () => (
    <Section layout="wrap" title="All Sizes — Image (Square)">
      {SIZES.map((size) => (
        <SizeLabel key={size} size={size}>
          <Avatar size={size} src={SAMPLE_IMAGE} alt="User" />
        </SizeLabel>
      ))}
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// All sizes — Image (circle)
// ---------------------------------------------------------------------------

export const AllSizesImageCircle: Story = {
  render: () => (
    <Section layout="wrap" title="All Sizes — Image (Circle)">
      {SIZES.map((size) => (
        <SizeLabel key={size} size={size}>
          <Avatar size={size} src={SAMPLE_IMAGE} alt="User" circle />
        </SizeLabel>
      ))}
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// With status dot
// ---------------------------------------------------------------------------

export const WithDot: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section layout="wrap" title="Dot — Initials (Square)">
        {SIZES.map((size) => (
          <SizeLabel key={size} size={size}>
            <Avatar size={size} initials="AB" dot />
          </SizeLabel>
        ))}
      </Section>
      <Section layout="wrap" title="Dot — Image (Circle)">
        {SIZES.map((size) => (
          <SizeLabel key={size} size={size}>
            <Avatar size={size} src={SAMPLE_IMAGE} alt="User" circle dot />
          </SizeLabel>
        ))}
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Content types comparison (single size)
// ---------------------------------------------------------------------------

export const ContentTypes: Story = {
  render: () => (
    <Section layout="wrap" title="Content Types — Size 80">
      <SizeLabel size="Image">
        <Avatar size="80" src={SAMPLE_IMAGE} alt="User" />
      </SizeLabel>
      <SizeLabel size="Initials">
        <Avatar size="80" initials="JD" />
      </SizeLabel>
      <SizeLabel size="Icon">
        <Avatar size="80" icon={<UserIcon />} />
      </SizeLabel>
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// Shape comparison
// ---------------------------------------------------------------------------

export const ShapeComparison: Story = {
  render: () => (
    <Section layout="wrap" title="Square vs Circle — Size 72">
      <SizeLabel size="Square">
        <Avatar size="72" initials="AB" />
      </SizeLabel>
      <SizeLabel size="Circle">
        <Avatar size="72" initials="AB" circle />
      </SizeLabel>
      <SizeLabel size="Square + Dot">
        <Avatar size="72" initials="AB" dot />
      </SizeLabel>
      <SizeLabel size="Circle + Dot">
        <Avatar size="72" initials="AB" circle dot />
      </SizeLabel>
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// Remove button (hover to reveal)
// ---------------------------------------------------------------------------

const STACK_SIZES: AvatarSize[] = ['88', '80', '72', '48', '40', '32', '28', '24', '20', '18'];

export const WithRemoveButton: Story = {
  args: {
    onRemove: fn(),
  },
  render: ({ onRemove }) => (
    <Section layout="wrap" title="Remove Button — Hover to reveal (Circle)">
      {STACK_SIZES.map((size) => (
        <SizeLabel key={size} size={size}>
          <Avatar
            size={size}
            src={SAMPLE_IMAGE}
            alt="User"
            circle
            onRemove={onRemove}
          />
        </SizeLabel>
      ))}
    </Section>
  ),
  play: async ({ args, canvas }) => {
    const removeButtons = await canvas.findAllByRole('button', { name: 'Remove User' });

    removeButtons[0].focus();
    await expect(removeButtons[0]).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onRemove).toHaveBeenCalledTimes(1);
  },
};

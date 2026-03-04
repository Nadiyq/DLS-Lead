import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Avatar, UserIcon } from './Avatar';
import type { AvatarSize } from './Avatar';

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

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3 style={{
      margin: 0,
      fontSize: 16,
      fontWeight: 600,
      fontFamily: 'var(--dls-font-family)',
      color: 'var(--dls-color-text-primary)',
    }}>
      {title}
    </h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 16 }}>
      {children}
    </div>
  </div>
);

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
    <Section title="All Sizes — Initials (Square)">
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
    <Section title="All Sizes — Initials (Circle)">
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
    <Section title="All Sizes — Icon (Square)">
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
    <Section title="All Sizes — Icon (Circle)">
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
    <Section title="All Sizes — Image (Square)">
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
    <Section title="All Sizes — Image (Circle)">
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
      <Section title="Dot — Initials (Square)">
        {SIZES.map((size) => (
          <SizeLabel key={size} size={size}>
            <Avatar size={size} initials="AB" dot />
          </SizeLabel>
        ))}
      </Section>
      <Section title="Dot — Image (Circle)">
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
    <Section title="Content Types — Size 80">
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
    <Section title="Square vs Circle — Size 72">
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
  render: () => (
    <Section title="Remove Button — Hover to reveal (Circle)">
      {STACK_SIZES.map((size) => (
        <SizeLabel key={size} size={size}>
          <Avatar
            size={size}
            src={SAMPLE_IMAGE}
            alt="User"
            circle
            onRemove={() => console.log(`Remove avatar ${size}`)}
          />
        </SizeLabel>
      ))}
    </Section>
  ),
};

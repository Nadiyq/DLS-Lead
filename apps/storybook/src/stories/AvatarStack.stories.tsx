import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { AvatarStack } from './AvatarStack';
import { Avatar, UserIcon } from './Avatar';
import type { AvatarStackSize, OverflowUser } from './AvatarStack';

const SIZES: AvatarStackSize[] = ['88', '80', '72', '48', '40', '32', '28', '24', '20', '18'];

const SAMPLE_IMAGES = [
  'https://i.pravatar.cc/300?img=12',
  'https://i.pravatar.cc/300?img=32',
  'https://i.pravatar.cc/300?img=47',
  'https://i.pravatar.cc/300?img=5',
  'https://i.pravatar.cc/300?img=8',
];

const meta = {
  title: 'Components/AvatarStack',
  component: AvatarStack,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
    },
    max: { control: 'number' },
    total: { control: 'number' },
  },
  args: {
    size: '48',
    children: undefined as unknown as React.ReactNode,
  },
} satisfies Meta<typeof AvatarStack>;

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
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 24 }}>
      {children}
    </div>
  </div>
);

const SizeLabel = ({ size, children }: { size: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
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

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  render: (args) => (
    <AvatarStack {...args}>
      <Avatar src={SAMPLE_IMAGES[0]} alt="User 1" />
      <Avatar src={SAMPLE_IMAGES[1]} alt="User 2" />
      <Avatar src={SAMPLE_IMAGES[2]} alt="User 3" />
    </AvatarStack>
  ),
};

// ---------------------------------------------------------------------------
// All sizes — 2 avatars
// ---------------------------------------------------------------------------

export const AllSizes: Story = {
  render: () => (
    <Section title="All Sizes — 2 Avatars">
      {SIZES.map((size) => (
        <SizeLabel key={size} size={size}>
          <AvatarStack size={size}>
            <Avatar src={SAMPLE_IMAGES[0]} alt="User 1" />
            <Avatar src={SAMPLE_IMAGES[1]} alt="User 2" />
          </AvatarStack>
        </SizeLabel>
      ))}
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// With counter (+N overflow) — hover counter to see hidden users
// ---------------------------------------------------------------------------

const OVERFLOW_USERS: OverflowUser[] = [
  { name: 'Malik Roberson', src: 'https://i.pravatar.cc/300?img=21' },
  { name: 'Kenton Jerde', src: 'https://i.pravatar.cc/300?img=33' },
  { name: 'Talia Kubiak', initials: 'TK' },
  { name: 'Jayson Wintheiser', src: 'https://i.pravatar.cc/300?img=14' },
  { name: 'Shea Trantow', src: 'https://i.pravatar.cc/300?img=9' },
];

export const WithCounter: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(2);
    return (
      <Section title="With Counter (+N) — hover the badge">
        <AvatarStack
          size="48"
          max={2}
          total={7}
          overflowUsers={OVERFLOW_USERS}
          selectedIndex={selected}
          onOverflowUserClick={(_user, i) => setSelected(i)}
        >
          <Avatar src={SAMPLE_IMAGES[0]} alt="User 1" />
          <Avatar src={SAMPLE_IMAGES[1]} alt="User 2" />
          <Avatar src={SAMPLE_IMAGES[2]} alt="User 3" />
          <Avatar src={SAMPLE_IMAGES[3]} alt="User 4" />
        </AvatarStack>
      </Section>
    );
  },
};

// ---------------------------------------------------------------------------
// Max visible (3 of 5, auto-counted)
// ---------------------------------------------------------------------------

export const MaxVisible: Story = {
  render: () => (
    <Section title="Max 3 of 5">
      <AvatarStack size="48" max={3}>
        <Avatar src={SAMPLE_IMAGES[0]} alt="User 1" />
        <Avatar src={SAMPLE_IMAGES[1]} alt="User 2" />
        <Avatar src={SAMPLE_IMAGES[2]} alt="User 3" />
        <Avatar src={SAMPLE_IMAGES[3]} alt="User 4" />
        <Avatar src={SAMPLE_IMAGES[4]} alt="User 5" />
      </AvatarStack>
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// With initials
// ---------------------------------------------------------------------------

export const WithInitials: Story = {
  render: () => (
    <Section title="Initials Stack">
      <AvatarStack size="48">
        <Avatar initials="AB" />
        <Avatar initials="CD" />
        <Avatar initials="EF" />
      </AvatarStack>
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// With icons
// ---------------------------------------------------------------------------

export const WithIcons: Story = {
  render: () => (
    <Section title="Icon Stack">
      <AvatarStack size="48">
        <Avatar icon={<UserIcon />} />
        <Avatar icon={<UserIcon />} />
        <Avatar icon={<UserIcon />} />
      </AvatarStack>
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// Mixed content
// ---------------------------------------------------------------------------

export const MixedContent: Story = {
  render: () => (
    <Section title="Mixed — Image + Initials + Counter">
      <AvatarStack size="72" max={3} total={12}>
        <Avatar src={SAMPLE_IMAGES[0]} alt="User 1" />
        <Avatar src={SAMPLE_IMAGES[1]} alt="User 2" />
        <Avatar initials="JD" />
        <Avatar initials="MK" />
      </AvatarStack>
    </Section>
  ),
};

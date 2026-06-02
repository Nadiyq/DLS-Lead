import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Folder as FolderIcon, Image as ImageIcon } from 'lucide-react';
import { Card } from './Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Avatar } from '../Avatar';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    {children}
  </div>
);


// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

const cardDecorator = (Story: React.FC) => (
  <div style={{ width: 276 }}>
    <Story />
  </div>
);

export const Playground: Story = {
  decorators: [cardDecorator],
  args: {
    type: 'outline',
    title: 'Title',
    description: 'Description',
    headerIcon: <FolderIcon />,
    headerContent: <Badge variant="soft" intent="neutral" size="m">Badge</Badge>,
    footer: <Button variant="outline" size="m">Button</Button>,
  },
};

// ---------------------------------------------------------------------------
// All types
// ---------------------------------------------------------------------------

export const AllTypes: Story = {
  decorators: [cardDecorator],
  args: {
    title: 'Title',
    description: 'Description',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Regular (no background, no border)">
        <Card
          type="regular"
          headerIcon={<FolderIcon />}
          headerContent={<Badge variant="soft" intent="neutral" size="m">Badge</Badge>}
          title="Title"
          description="Description"
          footer={<Button variant="outline" size="m">Button</Button>}
        />
      </Section>
      <Section title="Outline (border only)">
        <Card
          type="outline"
          headerIcon={<FolderIcon />}
          headerContent={<Badge variant="soft" intent="neutral" size="m">Badge</Badge>}
          title="Title"
          description="Description"
          footer={<Button variant="outline" size="m">Button</Button>}
        />
      </Section>
      <Section title="Muted (filled background + subtle border)">
        <Card
          type="muted"
          headerIcon={<FolderIcon />}
          headerContent={<Badge variant="soft" intent="neutral" size="m">Badge</Badge>}
          title="Title"
          description="Description"
          footer={<Button variant="outline" size="m">Button</Button>}
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With custom header content
// ---------------------------------------------------------------------------

export const WithHeaderContent: Story = {
  decorators: [cardDecorator],
  args: {
    type: 'outline',
    title: 'Title',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Icon + Badge">
        <Card
          type="outline"
          headerIcon={<FolderIcon />}
          headerContent={<Badge variant="soft" intent="neutral" size="m">Badge</Badge>}
          title="Title"
          description="Description"
          footer={<Button variant="outline" size="m">Button</Button>}
        />
      </Section>
      <Section title="Header content only (no icon)">
        <Card
          type="outline"
          headerContent={<Badge variant="soft" intent="neutral" size="m">Badge</Badge>}
          title="Title"
          description="Description"
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Content variations (matching Figma node 6953:8809)
// ---------------------------------------------------------------------------

export const ContentVariations: Story = {
  args: {
    type: 'outline',
    title: 'Title',
  },
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      {/* Card 1: outline — name + role footer */}
      <div style={{ width: 276, flexShrink: 0 }}>
        <Card
          type="outline"
          headerIcon={<FolderIcon />}
          headerContent={<Badge variant="soft" intent="warning" size="m">In Progress</Badge>}
          title="AI learning platform"
          description="Learn at your own pace at any time"
          footer={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingTop: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 'var(--dls-text-m-font-size)', lineHeight: 'var(--dls-text-m-line-height)', fontWeight: 'var(--dls-font-weight-normal)', color: 'var(--dls-color-text-primary)', fontFamily: 'var(--dls-font-family)' }}>John Smith</span>
                <span style={{ fontSize: 'var(--dls-text-s-font-size)', lineHeight: 'var(--dls-text-s-line-height)', color: 'var(--dls-color-text-secondary)', fontFamily: 'var(--dls-font-family)' }}>Mentor</span>
              </div>
              <Avatar size="32" circle dot src="https://i.pravatar.cc/64?img=12" />
            </div>
          }
        />
      </div>

      {/* Card 2: muted — subtask count footer */}
      <div style={{ width: 276, flexShrink: 0 }}>
        <Card
          type="muted"
          headerIcon={<FolderIcon />}
          headerContent={<Badge variant="outline" intent="success" size="m">Completed</Badge>}
          title="App design"
          description="Learn at your own pace at any time"
          footer={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingTop: 12 }}>
              <span style={{ fontSize: 'var(--dls-text-s-font-size)', lineHeight: 'var(--dls-text-s-line-height)', color: 'var(--dls-color-text-secondary)', fontFamily: 'var(--dls-font-family)' }}>5/12 subtasks</span>
              <Avatar size="32" circle dot src="https://i.pravatar.cc/64?img=5" />
            </div>
          }
        />
      </div>

      {/* Card 3: outline — image content + photo count */}
      <div style={{ width: 276, flexShrink: 0 }}>
        <Card
          type="outline"
          headerIcon={<ImageIcon />}
          headerContent={<Badge variant="ghost" intent="success" size="m">Published</Badge>}
          title="Photo gallery"
          description="Share the album"
          footer={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingTop: 12 }}>
              <span style={{ fontSize: 'var(--dls-text-s-font-size)', lineHeight: 'var(--dls-text-s-line-height)', color: 'var(--dls-color-text-secondary)', fontFamily: 'var(--dls-font-family)' }}>120 photos</span>
              <Avatar size="32" circle dot src="https://i.pravatar.cc/64?img=8" />
            </div>
          }
        >
          <img
            src="https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=488&h=360&fit=crop"
            alt="Leopard"
            style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 'var(--dls-radius-m)', display: 'block' }}
          />
        </Card>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With footer actions
// ---------------------------------------------------------------------------

export const WithFooter: Story = {
  decorators: [cardDecorator],
  args: {
    type: 'outline',
    title: 'Title',
    description: 'Description',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Single action">
        <Card
          type="outline"
          title="Title"
          description="Description"
          footer={<Button variant="outline" size="m">Button</Button>}
        />
      </Section>
      <Section title="Multiple actions">
        <Card
          type="outline"
          title="Title"
          description="Description"
          footer={
            <>
              <Button variant="outline" size="m">Cancel</Button>
              <Button variant="filled" size="m">Confirm</Button>
            </>
          }
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Minimal
// ---------------------------------------------------------------------------

export const Minimal: Story = {
  decorators: [cardDecorator],
  args: {
    type: 'outline',
    title: 'Just a title',
  },
};

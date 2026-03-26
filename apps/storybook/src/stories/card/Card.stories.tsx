import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
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

const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4.5C2 3.67 2.67 3 3.5 3H6.17C6.7 3 7.2 3.24 7.55 3.65L8 4.2C8.35 4.61 8.85 4.85 9.38 4.85H12.5C13.33 4.85 14 5.52 14 6.35V11.5C14 12.33 13.33 13 12.5 13H3.5C2.67 13 2 12.33 2 11.5V4.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const ImageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.33" />
    <circle cx="5.5" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.33" />
    <path d="M2 11L5.5 7.5L8 10L10.5 7.5L14 11" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
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

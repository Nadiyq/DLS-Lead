import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarGroup, ToolbarTextButton } from './Toolbar';

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const BoldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 5H13C14.1046 5 15 5.89543 15 7V9C15 10.1046 14.1046 11 13 11H7V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7 11H14C15.1046 11 16 11.8954 16 13V15C16 16.1046 15.1046 17 14 17H7V11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const ItalicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 5H16M8 19H14M13 5L11 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UnderlineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 5V11C7 13.7614 9.23858 16 12 16C14.7614 16 17 13.7614 17 11V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 19H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AlignLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20M4 10H14M4 14H20M4 18H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AlignCenterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20M7 10H17M4 14H20M7 18H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AlignRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20M10 10H20M4 14H20M10 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ListBulletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6H20M9 12H20M9 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="5" cy="6" r="1" fill="currentColor" />
    <circle cx="5" cy="12" r="1" fill="currentColor" />
    <circle cx="5" cy="18" r="1" fill="currentColor" />
  </svg>
);

const ListNumberedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6H20M10 12H20M10 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 5V9M5 5L4 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 15C4 13.8954 4.89543 13 6 13C7.10457 13 7 14.5 5 16H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ListCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6H20M10 12H20M10 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 6L5.5 7.5L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 12L5.5 13.5L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 18L5.5 19.5L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 14L14 10M8.5 11.5L6.5 13.5C5.11929 14.8807 5.11929 17.1193 6.5 18.5C7.88071 19.8807 10.1193 19.8807 11.5 18.5L13.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15.5 12.5L17.5 10.5C18.8807 9.11929 18.8807 6.88071 17.5 5.5C16.1193 4.11929 13.8807 4.11929 12.5 5.5L10.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="18" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 10L12 14L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HeadingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 5V19M18 5V19M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    sticky: false,
    children: null,
  },
  render: (args) => (
    <Toolbar sticky={args.sticky}>
      <ToolbarButton aria-label="Bold"><BoldIcon /></ToolbarButton>
      <ToolbarButton aria-label="Italic"><ItalicIcon /></ToolbarButton>
      <ToolbarButton aria-label="Underline"><UnderlineIcon /></ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Link"><LinkIcon /></ToolbarButton>
    </Toolbar>
  ),
};

// ---------------------------------------------------------------------------
// Comment toolbar (matches Figma: B I U | align×3 | list×3 | link | more)
// ---------------------------------------------------------------------------

export const CommentToolbar: Story = {
  args: {
    sticky: false,
    children: null,
  },
  render: () => (
    <Toolbar>
      <ToolbarButton aria-label="Bold"><BoldIcon /></ToolbarButton>
      <ToolbarButton aria-label="Italic"><ItalicIcon /></ToolbarButton>
      <ToolbarButton aria-label="Underline"><UnderlineIcon /></ToolbarButton>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton aria-label="Align left"><AlignLeftIcon /></ToolbarButton>
        <ToolbarButton aria-label="Align center"><AlignCenterIcon /></ToolbarButton>
        <ToolbarButton aria-label="Align right"><AlignRightIcon /></ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton aria-label="Bulleted list"><ListBulletIcon /></ToolbarButton>
        <ToolbarButton aria-label="Numbered list"><ListNumberedIcon /></ToolbarButton>
        <ToolbarButton aria-label="Checklist"><ListCheckIcon /></ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Link"><LinkIcon /></ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton aria-label="More"><MoreIcon /></ToolbarButton>
    </Toolbar>
  ),
};

// ---------------------------------------------------------------------------
// Sticky variant
// ---------------------------------------------------------------------------

export const Sticky: Story = {
  args: {
    sticky: true,
    children: null,
  },
  render: () => (
    <Toolbar sticky>
      <ToolbarButton aria-label="Bold"><BoldIcon /></ToolbarButton>
      <ToolbarButton aria-label="Italic"><ItalicIcon /></ToolbarButton>
      <ToolbarButton aria-label="Underline"><UnderlineIcon /></ToolbarButton>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton aria-label="Align left"><AlignLeftIcon /></ToolbarButton>
        <ToolbarButton aria-label="Align center"><AlignCenterIcon /></ToolbarButton>
        <ToolbarButton aria-label="Align right"><AlignRightIcon /></ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton aria-label="Bulleted list"><ListBulletIcon /></ToolbarButton>
        <ToolbarButton aria-label="Numbered list"><ListNumberedIcon /></ToolbarButton>
        <ToolbarButton aria-label="Checklist"><ListCheckIcon /></ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Link"><LinkIcon /></ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton aria-label="More"><MoreIcon /></ToolbarButton>
    </Toolbar>
  ),
};

// ---------------------------------------------------------------------------
// With active buttons
// ---------------------------------------------------------------------------

export const WithActiveButtons: Story = {
  args: {
    sticky: false,
    children: null,
  },
  render: () => {
    const [active, setActive] = React.useState<Record<string, boolean>>({
      bold: true,
      italic: false,
      underline: false,
    });

    const toggle = (key: string) => {
      setActive(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <Toolbar>
        <ToolbarButton aria-label="Bold" active={active.bold} onClick={() => toggle('bold')}>
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Italic" active={active.italic} onClick={() => toggle('italic')}>
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Underline" active={active.underline} onClick={() => toggle('underline')}>
          <UnderlineIcon />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton aria-label="Link"><LinkIcon /></ToolbarButton>
      </Toolbar>
    );
  },
};

// ---------------------------------------------------------------------------
// With text button
// ---------------------------------------------------------------------------

export const WithTextButton: Story = {
  args: {
    sticky: false,
    children: null,
  },
  render: () => (
    <Toolbar>
      <ToolbarButton aria-label="Bold"><BoldIcon /></ToolbarButton>
      <ToolbarButton aria-label="Italic"><ItalicIcon /></ToolbarButton>
      <ToolbarSeparator />
      <ToolbarTextButton label="Heading" iconStart={<HeadingIcon />} iconEnd={<ChevronDownIcon />} aria-label="Heading" />
      <ToolbarSeparator />
      <ToolbarButton aria-label="Link"><LinkIcon /></ToolbarButton>
    </Toolbar>
  ),
};

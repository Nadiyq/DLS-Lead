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

const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6H20M9 12H20M9 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="5" cy="6" r="1" fill="currentColor" />
    <circle cx="5" cy="12" r="1" fill="currentColor" />
    <circle cx="5" cy="18" r="1" fill="currentColor" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 14L14 10M8.5 11.5L6.5 13.5C5.11929 14.8807 5.11929 17.1193 6.5 18.5C7.88071 19.8807 10.1193 19.8807 11.5 18.5L13.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15.5 12.5L17.5 10.5C18.8807 9.11929 18.8807 6.88071 17.5 5.5C16.1193 4.11929 13.8807 4.11929 12.5 5.5L10.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const StrikethroughIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 7C16 5.34315 14.2091 4 12 4C9.79086 4 8 5.34315 8 7C8 8 8.5 9 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 17C8 18.6569 9.79086 20 12 20C14.2091 20 16 18.6569 16 17C16 16 15.5 15 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
// Comment toolbar (full)
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
        <ToolbarTextButton label="Button" iconStart={<HeadingIcon />} iconEnd={<ChevronDownIcon />} aria-label="Heading" />
        <ToolbarButton aria-label="List"><ListIcon /></ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton aria-label="Align left"><AlignLeftIcon /></ToolbarButton>
        <ToolbarButton aria-label="Align center"><AlignCenterIcon /></ToolbarButton>
        <ToolbarButton aria-label="Align right"><AlignRightIcon /></ToolbarButton>
        <ToolbarTextButton label="Button" iconStart={<HeadingIcon />} iconEnd={<ChevronDownIcon />} aria-label="Heading" />
        <ToolbarButton aria-label="List"><ListIcon /></ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Link"><LinkIcon /></ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Strikethrough"><StrikethroughIcon /></ToolbarButton>
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
        <ToolbarTextButton label="Button" iconStart={<HeadingIcon />} iconEnd={<ChevronDownIcon />} aria-label="Heading" />
        <ToolbarButton aria-label="List"><ListIcon /></ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Link"><LinkIcon /></ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Strikethrough"><StrikethroughIcon /></ToolbarButton>
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

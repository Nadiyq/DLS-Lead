import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Toolbar, ToolbarGroup } from './Toolbar';
import { Button } from '../Button';
import { Separator } from '../separator/Separator';

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Icons (16×16 viewBox, stroke-based, use currentColor)
// ---------------------------------------------------------------------------

const BoldIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 3H9C9.79565 3 10.5587 3.31607 11.1213 3.87868C11.6839 4.44129 12 5.20435 12 6C12 6.79565 11.6839 7.55871 11.1213 8.12132C10.5587 8.68393 9.79565 9 9 9H4V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M4 9H10C10.7956 9 11.5587 9.31607 12.1213 9.87868C12.6839 10.4413 13 11.2044 13 12C13 12.7956 12.6839 13.5587 12.1213 14.1213C11.5587 14.6839 10.7956 15 10 15H4V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const ItalicIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.667 2.667H13.333M2.667 13.333H9.333M9.333 2.667L6.667 13.333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UnderlineIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2.667V8C4 9.0609 4.42143 10.0783 5.17157 10.8284C5.92172 11.5786 6.93913 12 8 12C9.06087 12 10.0783 11.5786 10.8284 10.8284C11.5786 10.0783 12 9.0609 12 8V2.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3.333 14H12.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AlignLeftIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4H14M2 7H10M2 10H14M2 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AlignCenterIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4H14M4 7H12M2 10H14M4 13H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AlignRightIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4H14M6 7H14M2 10H14M6 13H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ListBulletIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4H14M6 8H14M6 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="3" cy="4" r="1" fill="currentColor" />
    <circle cx="3" cy="8" r="1" fill="currentColor" />
    <circle cx="3" cy="12" r="1" fill="currentColor" />
  </svg>
);

const ListNumberedIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.667 4H14M6.667 8H14M6.667 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3.333 3V6M3.333 3L2.667 3.667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.667 10.667C2.667 9.93 3.263 9.333 4 9.333C4.737 9.333 4.667 10.333 3.333 11.333H4.667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ListCheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.667 4H14M6.667 8H14M6.667 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2.667 4L3.667 5L5.333 2.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.667 8L3.667 9L5.333 6.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.667 12L3.667 13L5.333 10.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.667 9.333L9.333 6.667M5.667 7.667L4.333 9C3.41 9.921 3.41 11.413 4.333 12.333C5.255 13.255 6.745 13.255 7.667 12.333L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10.333 8.333L11.667 7C12.59 6.079 12.59 4.587 11.667 3.667C10.745 2.745 9.255 2.745 8.333 3.667L7 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MoreIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="3.333" cy="8" r="1" fill="currentColor" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <circle cx="12.667" cy="8" r="1" fill="currentColor" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.333 6.667L8 9.333L10.667 6.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HeadingIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 3V13M12 3V13M4 8H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<BoldIcon />} aria-label="Bold" />
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<ItalicIcon />} aria-label="Italic" />
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<UnderlineIcon />} aria-label="Underline" />
      <Separator orientation="vertical" />
      <ToolbarGroup>
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<AlignLeftIcon />} aria-label="Align left" />
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<AlignCenterIcon />} aria-label="Align center" />
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<AlignRightIcon />} aria-label="Align right" />
      </ToolbarGroup>
      <Separator orientation="vertical" />
      <ToolbarGroup>
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<ListBulletIcon />} aria-label="Bulleted list" />
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<ListNumberedIcon />} aria-label="Numbered list" />
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<ListCheckIcon />} aria-label="Checklist" />
      </ToolbarGroup>
      <Separator orientation="vertical" />
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<LinkIcon />} aria-label="Link" />
      <Separator orientation="vertical" />
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<MoreIcon />} aria-label="More" />
    </Toolbar>
  ),
};

// ---------------------------------------------------------------------------
// Message composer toolbar (matches Figma: B I U | align×3 | list×3 | link | more)
// ---------------------------------------------------------------------------

export const MessageComposerToolbar: Story = {
  args: {
    sticky: false,
    children: null,
  },
  render: () => (
    <Toolbar>
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<BoldIcon />} aria-label="Bold" />
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<ItalicIcon />} aria-label="Italic" />
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<UnderlineIcon />} aria-label="Underline" />
      <Separator orientation="vertical" />
      <ToolbarGroup>
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<AlignLeftIcon />} aria-label="Align left" />
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<AlignCenterIcon />} aria-label="Align center" />
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<AlignRightIcon />} aria-label="Align right" />
      </ToolbarGroup>
      <Separator orientation="vertical" />
      <ToolbarGroup>
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<ListBulletIcon />} aria-label="Bulleted list" />
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<ListNumberedIcon />} aria-label="Numbered list" />
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<ListCheckIcon />} aria-label="Checklist" />
      </ToolbarGroup>
      <Separator orientation="vertical" />
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<LinkIcon />} aria-label="Link" />
      <Separator orientation="vertical" />
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<MoreIcon />} aria-label="More" />
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
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<BoldIcon />} aria-label="Bold" />
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<ItalicIcon />} aria-label="Italic" />
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<UnderlineIcon />} aria-label="Underline" />
      <Separator orientation="vertical" />
      <ToolbarGroup>
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<AlignLeftIcon />} aria-label="Align left" />
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<AlignCenterIcon />} aria-label="Align center" />
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<AlignRightIcon />} aria-label="Align right" />
      </ToolbarGroup>
      <Separator orientation="vertical" />
      <ToolbarGroup>
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<ListBulletIcon />} aria-label="Bulleted list" />
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<ListNumberedIcon />} aria-label="Numbered list" />
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<ListCheckIcon />} aria-label="Checklist" />
      </ToolbarGroup>
      <Separator orientation="vertical" />
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<LinkIcon />} aria-label="Link" />
      <Separator orientation="vertical" />
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<MoreIcon />} aria-label="More" />
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
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<BoldIcon />} aria-label="Bold" aria-pressed={active.bold} data-active={active.bold ? '' : undefined} onClick={() => toggle('bold')} />
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<ItalicIcon />} aria-label="Italic" aria-pressed={active.italic} data-active={active.italic ? '' : undefined} onClick={() => toggle('italic')} />
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<UnderlineIcon />} aria-label="Underline" aria-pressed={active.underline} data-active={active.underline ? '' : undefined} onClick={() => toggle('underline')} />
        <Separator orientation="vertical" />
        <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<LinkIcon />} aria-label="Link" />
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
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<BoldIcon />} aria-label="Bold" />
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<ItalicIcon />} aria-label="Italic" />
      <Separator orientation="vertical" />
      <Button variant="ghost" intent="neutral" size="m" icon={<HeadingIcon />} aria-label="Heading">
        Heading
        <span className="dls-button__icon"><ChevronDownIcon /></span>
      </Button>
      <Separator orientation="vertical" />
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<LinkIcon />} aria-label="Link" />
    </Toolbar>
  ),
};

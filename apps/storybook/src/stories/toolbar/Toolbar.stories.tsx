import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  AlignLeft as AlignLeftIcon,
  AlignCenter as AlignCenterIcon,
  AlignRight as AlignRightIcon,
  List as ListBulletIcon,
  ListOrdered as ListNumberedIcon,
  ListChecks as ListCheckIcon,
  Link2 as LinkIcon,
  Ellipsis as MoreIcon,
  ChevronDown as ChevronDownIcon,
  Heading as HeadingIcon,
} from 'lucide-react';
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
      <Button variant="ghost" intent="neutral" size="m" icon={<HeadingIcon />} iconEnd={<ChevronDownIcon />}>
        Heading
      </Button>
      <Separator orientation="vertical" />
      <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<LinkIcon />} aria-label="Link" />
    </Toolbar>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd, KbdGroup } from './Kbd';
import { Section } from '../_helpers/StoryLayout';

/* ===========================================================================
   Kbd stories
   =========================================================================== */

const kbdMeta = {
  title: 'Components/Kbd',
  component: Kbd,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Kbd>;

export default kbdMeta;
type KbdStory = StoryObj<typeof kbdMeta>;

/* ---------------------------------------------------------------------------
   Playground
   --------------------------------------------------------------------------- */

export const Playground: KbdStory = {
  args: {
    children: 'Ctrl',
  },
};

/* ---------------------------------------------------------------------------
   Single keys
   --------------------------------------------------------------------------- */

export const SingleKeys: KbdStory = {
  args: { children: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section layout="flat" size="s" title="Letter keys">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Kbd>A</Kbd>
          <Kbd>B</Kbd>
          <Kbd>C</Kbd>
          <Kbd>Z</Kbd>
        </div>
      </Section>
      <Section layout="flat" size="s" title="Modifier keys">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Kbd>Ctrl</Kbd>
          <Kbd>Alt</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>Tab</Kbd>
          <Kbd>Esc</Kbd>
          <Kbd>Enter</Kbd>
          <Kbd>Space</Kbd>
        </div>
      </Section>
      <Section layout="flat" size="s" title="Mac symbols">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>⌥</Kbd>
          <Kbd>⌃</Kbd>
          <Kbd>⏎</Kbd>
          <Kbd>⌫</Kbd>
          <Kbd>⎋</Kbd>
        </div>
      </Section>
      <Section layout="flat" size="s" title="Arrow keys">
        <div style={{ display: 'flex', gap: 8 }}>
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          <Kbd>←</Kbd>
          <Kbd>→</Kbd>
        </div>
      </Section>
    </div>
  ),
};

/* ---------------------------------------------------------------------------
   KbdGroup — regular (adjacent)
   --------------------------------------------------------------------------- */

export const GroupRegular: KbdStory = {
  args: { children: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section layout="flat" size="s" title="Mac-style shortcut (adjacent)">
        <KbdGroup type="regular">
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>⌥</Kbd>
          <Kbd>⌃</Kbd>
        </KbdGroup>
      </Section>
      <Section layout="flat" size="s" title="Copy">
        <KbdGroup type="regular">
          <Kbd>⌘</Kbd>
          <Kbd>C</Kbd>
        </KbdGroup>
      </Section>
      <Section layout="flat" size="s" title="Undo">
        <KbdGroup type="regular">
          <Kbd>⌘</Kbd>
          <Kbd>Z</Kbd>
        </KbdGroup>
      </Section>
    </div>
  ),
};

/* ---------------------------------------------------------------------------
   KbdGroup — separated (with +)
   --------------------------------------------------------------------------- */

export const GroupSeparated: KbdStory = {
  args: { children: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section layout="flat" size="s" title="Bold (Windows)">
        <KbdGroup type="separated">
          <Kbd>Ctrl</Kbd>
          <Kbd>Alt</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>B</Kbd>
        </KbdGroup>
      </Section>
      <Section layout="flat" size="s" title="Save">
        <KbdGroup type="separated">
          <Kbd>Ctrl</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </Section>
      <Section layout="flat" size="s" title="Find and replace">
        <KbdGroup type="separated">
          <Kbd>Ctrl</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>H</Kbd>
        </KbdGroup>
      </Section>
    </div>
  ),
};

/* ---------------------------------------------------------------------------
   Inline usage
   --------------------------------------------------------------------------- */

export const InlineUsage: KbdStory = {
  args: { children: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'var(--dls-font-family)', fontSize: 14, lineHeight: '20px', color: 'var(--dls-color-text-primary)' }}>
      <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
        Press
        <KbdGroup type="separated">
          <Kbd>Ctrl</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
        to save your work.
      </p>
      <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
        Use
        <KbdGroup type="regular">
          <Kbd>⌘</Kbd>
          <Kbd>Z</Kbd>
        </KbdGroup>
        to undo or
        <KbdGroup type="regular">
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>Z</Kbd>
        </KbdGroup>
        to redo.
      </p>
      <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
        Navigate with <Kbd>Tab</Kbd> and <Kbd>Esc</Kbd> to close.
      </p>
    </div>
  ),
};

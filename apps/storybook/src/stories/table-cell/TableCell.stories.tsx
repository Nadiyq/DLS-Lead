import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Check as CheckIcon, User as UserIcon, Pencil as PencilIcon, Copy as CopyIcon, Trash2 as TrashIcon, MoreHorizontal as MoreHorizontalIcon, Plus as PlusIcon } from 'lucide-react';
import { TableCell } from './TableCell';
import { Checkbox } from '../checkbox/Checkbox';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Avatar } from '../Avatar';
import { AvatarStack } from '../AvatarStack';
import '../table/table.css';

const SAMPLE_USERS = [
  { name: 'Malik Roberson', initials: 'MR', src: 'https://i.pravatar.cc/48?u=malik' },
  { name: 'Kenton Jerde', initials: 'KJ', src: 'https://i.pravatar.cc/48?u=kenton' },
  { name: 'Talia Kubiak', initials: 'TK', src: 'https://i.pravatar.cc/48?u=talia' },
  { name: 'Jayson Wintheiser', initials: 'JW', src: 'https://i.pravatar.cc/48?u=jayson' },
  { name: 'Shea Trantow', initials: 'ST', src: 'https://i.pravatar.cc/48?u=shea' },
  { name: 'Casey Miller', initials: 'CM', src: 'https://i.pravatar.cc/48?u=casey' },
  { name: 'Alex Cooper', initials: 'AC', src: 'https://i.pravatar.cc/48?u=alex' },
  { name: 'Bria Watsica', initials: 'BW', src: 'https://i.pravatar.cc/48?u=bria' },
  { name: 'Devon Lubowitz', initials: 'DL', src: 'https://i.pravatar.cc/48?u=devon' },
  { name: 'Elias Toure', initials: 'ET', src: 'https://i.pravatar.cc/48?u=elias' },
  { name: 'Fiona Padberg', initials: 'FP', src: 'https://i.pravatar.cc/48?u=fiona' },
  { name: 'Gabe Howell', initials: 'GH', src: 'https://i.pravatar.cc/48?u=gabe' },
  { name: 'Hana Schmitt', initials: 'HS', src: 'https://i.pravatar.cc/48?u=hana' },
  { name: 'Iris Cole', initials: 'IC', src: 'https://i.pravatar.cc/48?u=iris' },
  { name: 'Jamal Weaver', initials: 'JW', src: 'https://i.pravatar.cc/48?u=jamal' },
  { name: 'Kiana Gallegos', initials: 'KG', src: 'https://i.pravatar.cc/48?u=kiana' },
  { name: 'Liam Bartell', initials: 'LB', src: 'https://i.pravatar.cc/48?u=liam' },
  { name: 'Maya Ortiz', initials: 'MO', src: 'https://i.pravatar.cc/48?u=maya' },
  { name: 'Noah Funk', initials: 'NF', src: 'https://i.pravatar.cc/48?u=noah' },
  { name: 'Olive Reed', initials: 'OR', src: 'https://i.pravatar.cc/48?u=olive' },
  { name: 'Priya Shah', initials: 'PS', src: 'https://i.pravatar.cc/48?u=priya' },
  { name: 'Quinn Roberts', initials: 'QR', src: 'https://i.pravatar.cc/48?u=quinn' },
];

const meta = {
  title: 'Components/TableCell',
  component: TableCell,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TableCell>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    type: 'text',
    align: 'left',
    padding: true,
    text: 'Item text',
  },
};

// ---------------------------------------------------------------------------
// Text cell — all sub-types
// ---------------------------------------------------------------------------

export const TextCell: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Section title="Plain text">
        <TableCell type="text" text="Item text" />
      </Section>
      <Section title="With checkbox">
        <TableCell type="text" text="Item text" slotLeft={<Checkbox />} />
      </Section>
      <Section title="With icon">
        <TableCell type="text" text="Item text" icon={<CheckIcon />} />
      </Section>
      <Section title="With left + right slots">
        <TableCell type="text" text="Item text" slotLeft={<CheckIcon />} slotRight={<CheckIcon />} />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Two-line cell — with optional slotLeft (avatar/checkbox/icon)
// ---------------------------------------------------------------------------

export const TwoLineCell: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <Section title="Plain (no slot) — alignments">
        <TableCell type="two-line" text="Primary text" secondaryText="Secondary text" align="left" />
        <TableCell type="two-line" text="Primary text" secondaryText="Secondary text" align="center" />
        <TableCell type="two-line" text="Primary text" secondaryText="Secondary text" align="right" />
      </Section>
      <Section title="With avatar (slotLeft)">
        <TableCell
          type="two-line"
          text="John Smith"
          secondaryText="john@example.com"
          slotLeft={<Avatar size="32" circle initials="JS" />}
          align="left"
        />
        <TableCell
          type="two-line"
          text="Talia Kubiak"
          secondaryText="talia@example.com"
          slotLeft={<Avatar size="32" circle src="https://i.pravatar.cc/48?u=talia" initials="TK" />}
          align="left"
        />
      </Section>
      <Section title="With checkbox (slotLeft)">
        <TableCell
          type="two-line"
          text="Item text"
          secondaryText="Secondary text"
          slotLeft={<Checkbox />}
          align="left"
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Alignment
// ---------------------------------------------------------------------------

export const Alignment: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 300 }}>
      <TableCell type="text" text="Left aligned" align="left" />
      <TableCell type="text" text="Center aligned" align="center" />
      <TableCell type="text" text="Right aligned" align="right" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Padding variants
// ---------------------------------------------------------------------------

export const PaddingVariants: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Section title="With padding (default)">
        <div style={{ background: 'var(--dls-color-surface-muted)' }}>
          <TableCell type="text" text="With horizontal padding" padding />
        </div>
      </Section>
      <Section title="Without horizontal padding">
        <div style={{ background: 'var(--dls-color-surface-muted)' }}>
          <TableCell type="text" text="No horizontal padding" padding={false} />
        </div>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Badge cell
// ---------------------------------------------------------------------------

export const BadgeCell: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 300 }}>
      <TableCell type="badge" align="left">
        <Badge variant="outline" intent="neutral" size="m">Badge</Badge>
      </TableCell>
      <TableCell type="badge" align="center">
        <Badge variant="outline" intent="neutral" size="m">Badge</Badge>
      </TableCell>
      <TableCell type="badge" align="right">
        <Badge variant="outline" intent="neutral" size="m">Badge</Badge>
      </TableCell>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Button cell
// ---------------------------------------------------------------------------

export const ButtonCell: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 300 }}>
      <TableCell type="button" align="left">
        <Button variant="link" intent="info" size="m" icon={<PlusIcon />}>Button</Button>
      </TableCell>
      <TableCell type="button" align="center">
        <Button variant="link" intent="info" size="m" icon={<PlusIcon />}>Button</Button>
      </TableCell>
      <TableCell type="button" align="right">
        <Button variant="link" intent="info" size="m" icon={<PlusIcon />}>Button</Button>
      </TableCell>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Actions cell
// ---------------------------------------------------------------------------

export const ActionsCell: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Section title="Inline icon actions">
        <TableCell type="actions" align="left">
          <Button variant="ghost" intent="neutral" size="s" icon={<UserIcon />} iconOnly aria-label="View user" />
          <Button variant="ghost" intent="neutral" size="s" icon={<PencilIcon />} iconOnly aria-label="Edit" />
          <Button variant="ghost" intent="neutral" size="s" icon={<CopyIcon />} iconOnly aria-label="Copy" />
          <Button variant="ghost" intent="neutral" size="s" icon={<TrashIcon />} iconOnly aria-label="Delete" />
        </TableCell>
      </Section>
      <Section title="More menu">
        <TableCell type="actions" align="left">
          <Button variant="ghost" intent="neutral" size="s" icon={<MoreHorizontalIcon />} iconOnly aria-label="More actions" />
        </TableCell>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Users stacked cell
// ---------------------------------------------------------------------------

export const UsersStackedCell: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 300 }}>
      <TableCell type="users-stacked" align="left">
        <AvatarStack size="24" max={2} total={22}>
          {SAMPLE_USERS.map((u) => (
            <Avatar key={u.initials} src={u.src} initials={u.initials} alt={u.name} />
          ))}
        </AvatarStack>
      </TableCell>
      <TableCell type="users-stacked" align="center">
        <AvatarStack size="24" max={2} total={22}>
          {SAMPLE_USERS.map((u) => (
            <Avatar key={u.initials} src={u.src} initials={u.initials} alt={u.name} />
          ))}
        </AvatarStack>
      </TableCell>
      <TableCell type="users-stacked" align="right">
        <AvatarStack size="24" max={2} total={22}>
          {SAMPLE_USERS.map((u) => (
            <Avatar key={u.initials} src={u.src} initials={u.initials} alt={u.name} />
          ))}
        </AvatarStack>
      </TableCell>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Credit card cell — brand mark + masked digits
// Brand logo is a story-only composition (two overlapping circles), not a DLS icon.
// ---------------------------------------------------------------------------

const MastercardMark = () => (
  <span
    aria-label="Mastercard"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: 0,
      width: 32,
      height: 20,
      position: 'relative',
    }}
  >
    <span style={{
      position: 'absolute', left: 0, top: 0,
      width: 20, height: 20, borderRadius: '50%',
      background: '#EB001B',
    }} />
    <span style={{
      position: 'absolute', right: 0, top: 0,
      width: 20, height: 20, borderRadius: '50%',
      background: '#F79E1B',
      mixBlendMode: 'multiply',
    }} />
  </span>
);

const CardDigits = ({ last4 }: { last4: string }) => (
  <span style={{
    fontFamily: 'var(--dls-font-family)',
    fontSize: 'var(--dls-text-m-font-size)',
    lineHeight: 'var(--dls-text-m-line-height)',
    color: 'var(--dls-color-text-primary)',
    letterSpacing: '0.05em',
  }}>
    •••• {last4}
  </span>
);

export const CreditCardCell: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 300 }}>
      <TableCell type="credit-card" align="left">
        <MastercardMark />
        <CardDigits last4="1234" />
      </TableCell>
      <TableCell type="credit-card" align="center">
        <MastercardMark />
        <CardDigits last4="1234" />
      </TableCell>
      <TableCell type="credit-card" align="right">
        <MastercardMark />
        <CardDigits last4="1234" />
      </TableCell>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Slot cell (generic content)
// ---------------------------------------------------------------------------

export const SlotCell: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 300 }}>
      <TableCell type="slot" align="left">
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--dls-font-family)', fontSize: 'var(--dls-text-s-font-size)',
          color: 'var(--dls-color-text-secondary)',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 'var(--dls-radius-full)',
            background: 'var(--dls-color-surface-muted)',
          }} />
          Custom content
        </div>
      </TableCell>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Full table row example
// ---------------------------------------------------------------------------

export const TableRowExample: Story = {
  args: { text: 'Item text' },
  render: () => (
    <div style={{ width: 700 }}>
      <Section title="Example rows (grid layout — equal row heights)">
        <div className="dls-table__columns" style={{ gridTemplateColumns: '40px 2fr 1fr 1fr 120px', gridTemplateRows: 'repeat(2, auto)' }}>
          <TableCell type="text" slotLeft={<Checkbox />} padding={false} />
          <TableCell type="two-line" text="John Smith" secondaryText="john@example.com" />
          <TableCell type="badge" align="center">
            <Badge variant="soft" intent="success" size="m">Active</Badge>
          </TableCell>
          <TableCell type="text" text="$12,500" align="right" />
          <TableCell type="actions" align="right">
            <Button variant="outline" intent="neutral" size="s">Edit</Button>
          </TableCell>

          <TableCell type="text" slotLeft={<Checkbox />} padding={false} />
          <TableCell type="two-line" text="Jane Doe" secondaryText="jane@example.com" />
          <TableCell type="badge" align="center">
            <Badge variant="soft" intent="warning" size="m">Pending</Badge>
          </TableCell>
          <TableCell type="text" text="$8,200" align="right" />
          <TableCell type="actions" align="right">
            <Button variant="outline" intent="neutral" size="s">Edit</Button>
          </TableCell>
        </div>
      </Section>
    </div>
  ),
};

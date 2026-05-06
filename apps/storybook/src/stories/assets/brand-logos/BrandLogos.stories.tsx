import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mastercardLogo,
  visaLogo,
  paypalLogo,
  googleLogo,
  appleLogo,
  microsoftLogo,
  azureLogo,
} from './index';

/**
 * Brand logos are third-party brand assets used in demos/stories — not DLS UI
 * icons. They intentionally use brand colors and lockups, not design tokens,
 * so the Lucide-only rule does not apply.
 *
 * Use them with `<img>`:
 *
 *     import { mastercardLogo } from 'apps/storybook/src/stories/assets/brand-logos';
 *     <img src={mastercardLogo} alt="Mastercard" width={32} height={20} />
 */
const meta = {
  title: 'Foundations/Brand Logos',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface LogoEntry {
  name: string;
  src: string;
  /** Aspect ratio width:height to render at */
  size?: { w: number; h: number };
}

const PAYMENT_CARDS: LogoEntry[] = [
  { name: 'Mastercard', src: mastercardLogo, size: { w: 48, h: 30 } },
  { name: 'Visa', src: visaLogo, size: { w: 64, h: 22 } },
];

const PAYMENT_PROVIDERS: LogoEntry[] = [
  { name: 'PayPal', src: paypalLogo, size: { w: 80, h: 24 } },
];

const IDENTITY_PROVIDERS: LogoEntry[] = [
  { name: 'Google', src: googleLogo, size: { w: 32, h: 32 } },
  { name: 'Apple', src: appleLogo, size: { w: 32, h: 32 } },
  { name: 'Microsoft', src: microsoftLogo, size: { w: 32, h: 32 } },
];

const CLOUD: LogoEntry[] = [
  { name: 'Azure', src: azureLogo, size: { w: 32, h: 32 } },
];

const Section = ({ title, logos }: { title: string; logos: LogoEntry[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dls-spacing-3)' }}>
    <h3 style={{
      margin: 0,
      fontSize: 'var(--dls-text-m-font-size)',
      lineHeight: 'var(--dls-text-m-line-height)',
      fontWeight: 'var(--dls-font-weight-semibold)',
      color: 'var(--dls-color-text-primary)',
      fontFamily: 'var(--dls-font-family)',
    }}>
      {title}
    </h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--dls-spacing-4)' }}>
      {logos.map((logo) => (
        <div
          key={logo.name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--dls-spacing-2)',
            padding: 'var(--dls-spacing-3) var(--dls-spacing-4)',
            border: '1px solid var(--dls-color-border-subtle)',
            borderRadius: 'var(--dls-radius-component-card)',
            background: 'var(--dls-color-surface-base)',
            minWidth: 120,
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
          }}>
            <img
              src={logo.src}
              alt={logo.name}
              width={logo.size?.w}
              height={logo.size?.h}
              style={{ display: 'block' }}
            />
          </div>
          <span style={{
            fontSize: 'var(--dls-text-s-font-size)',
            lineHeight: 'var(--dls-text-s-line-height)',
            color: 'var(--dls-color-text-secondary)',
            fontFamily: 'var(--dls-font-family)',
          }}>
            {logo.name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dls-spacing-6)' }}>
      <Section title="Payment cards" logos={PAYMENT_CARDS} />
      <Section title="Payment providers" logos={PAYMENT_PROVIDERS} />
      <Section title="Identity providers" logos={IDENTITY_PROVIDERS} />
      <Section title="Cloud platforms" logos={CLOUD} />
    </div>
  ),
};

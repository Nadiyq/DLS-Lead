import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { effect, radius, shadow, spacing, state } from '@tokens/tokens';

const SEMANTIC_SWATCHES = [
  { name: 'Surface / Base', variable: '--dls-color-surface-base' },
  { name: 'Surface / Subtle', variable: '--dls-color-surface-subtle' },
  { name: 'Surface / Muted', variable: '--dls-color-surface-muted' },
  { name: 'Surface / Inverse', variable: '--dls-color-surface-inverse' },
  { name: 'Text / Primary', variable: '--dls-color-text-primary' },
  { name: 'Text / Secondary', variable: '--dls-color-text-secondary' },
  { name: 'Border / Base', variable: '--dls-color-border-base' },
  { name: 'Border / Strong', variable: '--dls-color-border-strong' },
  { name: 'Intent / Primary', variable: '--dls-color-intent-primary-base' },
  { name: 'Intent / Success', variable: '--dls-color-intent-success-base' },
  { name: 'Intent / Warning', variable: '--dls-color-intent-warning-base' },
  { name: 'Intent / Danger', variable: '--dls-color-intent-danger-base' },
  { name: 'Intent / Info', variable: '--dls-color-intent-info-base' },
];

const TYPOGRAPHY_SAMPLES = [
  { label: 'Hero', fontSize: 'var(--dls-text-heading-hero-font-size)', lineHeight: 'var(--dls-text-heading-hero-line-height)', fontWeight: 'var(--dls-text-heading-hero-font-weight)', text: 'Design system foundations' },
  { label: 'Heading H2', fontSize: 'var(--dls-text-heading-h2-font-size)', lineHeight: 'var(--dls-text-heading-h2-line-height)', fontWeight: 'var(--dls-text-heading-h2-font-weight)', text: 'Consistent type hierarchy' },
  { label: 'Paragraph M', fontSize: 'var(--dls-text-paragraph-m-font-size)', lineHeight: 'var(--dls-text-paragraph-m-line-height)', fontWeight: 'var(--dls-text-paragraph-m-medium-font-weight)', text: 'Use semantic tokens to keep docs, code, and Figma aligned.' },
  { label: 'Button S', fontSize: 'var(--dls-text-button-s-font-size)', lineHeight: 'var(--dls-text-button-s-line-height)', fontWeight: 'var(--dls-text-button-s-font-weight)', text: 'Button label' },
];

const meta = {
  title: 'Foundations/Tokens',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const shellStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--dls-spacing-6)',
};

const sectionStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--dls-spacing-4)',
  padding: 'var(--dls-spacing-6)',
  borderRadius: 'var(--dls-radius-component-card)',
  border: '1px solid var(--dls-color-border-subtle)',
  background: 'color-mix(in srgb, var(--dls-color-surface-base) 88%, transparent)',
  boxShadow: 'var(--dls-shadow-surface-sm)',
};

const sectionTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: 'var(--dls-text-heading-h4-font-size)',
  lineHeight: 'var(--dls-text-heading-h4-line-height)',
  fontWeight: 'var(--dls-text-heading-h4-font-weight)',
  color: 'var(--dls-color-text-primary)',
};

const sectionDescriptionStyle: CSSProperties = {
  margin: 0,
  fontSize: 'var(--dls-text-paragraph-s-font-size)',
  lineHeight: 'var(--dls-text-paragraph-s-line-height)',
  fontWeight: 'var(--dls-text-paragraph-s-medium-font-weight)',
  color: 'var(--dls-color-text-secondary)',
};

export const Overview: Story = {
  render: () => (
    <div style={shellStyle}>
      <section style={sectionStyle}>
        <div style={{ display: 'grid', gap: 'var(--dls-spacing-2)' }}>
          <h2 style={sectionTitleStyle}>Semantic color roles</h2>
          <p style={sectionDescriptionStyle}>
            These are the tokens most component authors should reach for first.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--dls-spacing-3)',
          }}
        >
          {SEMANTIC_SWATCHES.map((swatch) => (
            <div
              key={swatch.variable}
              style={{
                display: 'grid',
                gap: 'var(--dls-spacing-2)',
                padding: 'var(--dls-spacing-3)',
                borderRadius: 'var(--dls-radius-component-input)',
                border: '1px solid var(--dls-color-border-subtle)',
                background: 'var(--dls-color-surface-subtle)',
              }}
            >
              <div
                style={{
                  height: 72,
                  borderRadius: 'var(--dls-radius-component-card)',
                  border: '1px solid var(--dls-color-border-subtle)',
                  background: `var(${swatch.variable})`,
                }}
              />
              <div style={{ display: 'grid', gap: 4 }}>
                <strong
                  style={{
                    fontSize: 'var(--dls-text-paragraph-s-font-size)',
                    lineHeight: 'var(--dls-text-paragraph-s-line-height)',
                    fontWeight: 'var(--dls-text-paragraph-s-heavy-font-weight)',
                    color: 'var(--dls-color-text-primary)',
                  }}
                >
                  {swatch.name}
                </strong>
                <code
                  style={{
                    fontSize: 'var(--dls-text-paragraph-xs-font-size)',
                    lineHeight: 'var(--dls-text-paragraph-xs-line-height)',
                    color: 'var(--dls-color-text-secondary)',
                  }}
                >
                  {swatch.variable}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={{ display: 'grid', gap: 'var(--dls-spacing-2)' }}>
          <h2 style={sectionTitleStyle}>Typography scale</h2>
          <p style={sectionDescriptionStyle}>
            Preview the semantic type styles exactly as components consume them.
          </p>
        </div>
        <div style={{ display: 'grid', gap: 'var(--dls-spacing-4)' }}>
          {TYPOGRAPHY_SAMPLES.map((sample) => (
            <div key={sample.label} style={{ display: 'grid', gap: 6 }}>
              <span
                style={{
                  fontSize: 'var(--dls-text-upper-xs-font-size)',
                  lineHeight: 'var(--dls-text-upper-xs-line-height)',
                  fontWeight: 'var(--dls-text-upper-xs-font-weight)',
                  letterSpacing: 'var(--dls-text-upper-xs-letter-spacing)',
                  textTransform: 'uppercase',
                  color: 'var(--dls-color-text-secondary)',
                }}
              >
                {sample.label}
              </span>
              <div
                style={{
                  fontFamily: 'var(--dls-font-family)',
                  fontSize: sample.fontSize,
                  lineHeight: sample.lineHeight,
                  fontWeight: sample.fontWeight,
                  color: 'var(--dls-color-text-primary)',
                }}
              >
                {sample.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--dls-spacing-4)',
        }}
      >
        <div style={sectionStyle}>
          <div style={{ display: 'grid', gap: 'var(--dls-spacing-2)' }}>
            <h2 style={sectionTitleStyle}>Spacing scale</h2>
            <p style={sectionDescriptionStyle}>Use the same rhythm across stories and components.</p>
          </div>
          <div style={{ display: 'grid', gap: 'var(--dls-spacing-2)' }}>
            {Object.entries(spacing).map(([token, value]) => (
              <div key={token} style={{ display: 'grid', gridTemplateColumns: '96px 1fr', alignItems: 'center', gap: 'var(--dls-spacing-3)' }}>
                <code style={{ color: 'var(--dls-color-text-secondary)' }}>{token}</code>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dls-spacing-2)' }}>
                  <div style={{ width: value, height: 12, minWidth: 1, borderRadius: 9999, background: 'var(--dls-color-intent-primary-base)' }} />
                  <span style={{ color: 'var(--dls-color-text-primary)' }}>{value}px</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={{ display: 'grid', gap: 'var(--dls-spacing-2)' }}>
            <h2 style={sectionTitleStyle}>Radius and elevation</h2>
            <p style={sectionDescriptionStyle}>Component primitives should look tactile before they become UI.</p>
          </div>
          <div style={{ display: 'grid', gap: 'var(--dls-spacing-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 'var(--dls-spacing-3)' }}>
              {['s', 'm', 'l', 'xl'].map((key) => (
                <div key={key} style={{ display: 'grid', gap: 'var(--dls-spacing-2)' }}>
                  <div
                    style={{
                      height: 72,
                      borderRadius: radius[key as 's' | 'm' | 'l' | 'xl'],
                      background: 'var(--dls-color-surface-muted)',
                      border: '1px solid var(--dls-color-border-subtle)',
                    }}
                  />
                  <code style={{ color: 'var(--dls-color-text-secondary)' }}>radius.{key}</code>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'var(--dls-spacing-3)' }}>
              {(['sm', 'md', 'lg'] as const).map((key) => (
                <div
                  key={key}
                  style={{
                    padding: 'var(--dls-spacing-4)',
                    borderRadius: 'var(--dls-radius-component-card)',
                    background: 'var(--dls-color-surface-base)',
                    boxShadow: `var(--dls-shadow-surface-${key})`,
                    border: '1px solid color-mix(in srgb, var(--dls-color-border-subtle) 72%, transparent)',
                    color: 'var(--dls-color-text-primary)',
                  }}
                >
                  <strong style={{ display: 'block', marginBottom: 'var(--dls-spacing-2)' }}>
                    Shadow {key.toUpperCase()}
                  </strong>
                  <code style={{ color: 'var(--dls-color-text-secondary)' }}>{shadow.surface[key]}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={{ display: 'grid', gap: 'var(--dls-spacing-2)' }}>
          <h2 style={sectionTitleStyle}>Interaction tokens</h2>
          <p style={sectionDescriptionStyle}>
            These are the non-visual primitives that keep Figma and code behavior aligned.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--dls-spacing-3)',
          }}
        >
          <MetricCard
            label="Hover delta"
            value={String(state.lDelta.hover)}
            helper="Use the OKLCH hover delta in code, and the overlay equivalent in Figma."
          />
          <MetricCard
            label="Focus ring"
            value="var(--dls-state-focus-ring-color)"
            helper="Use semantic focus color, not a one-off outline."
          />
          <MetricCard
            label="Disabled opacity"
            value="var(--dls-state-disabled-opacity)"
            helper="Consistent reduction across the system."
          />
          <MetricCard
            label="Backdrop blur"
            value={`${effect.backdrop.blur}px / ${effect.backdrop.saturate}%`}
            helper="Effect tokens are code-only and complement the Figma glass effect."
          />
        </div>
      </section>
    </div>
  ),
};

function MetricCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gap: 'var(--dls-spacing-2)',
        padding: 'var(--dls-spacing-4)',
        borderRadius: 'var(--dls-radius-component-input)',
        border: '1px solid var(--dls-color-border-subtle)',
        background: 'var(--dls-color-surface-subtle)',
      }}
    >
      <span
        style={{
          fontSize: 'var(--dls-text-upper-xs-font-size)',
          lineHeight: 'var(--dls-text-upper-xs-line-height)',
          fontWeight: 'var(--dls-text-upper-xs-font-weight)',
          letterSpacing: 'var(--dls-text-upper-xs-letter-spacing)',
          textTransform: 'uppercase',
          color: 'var(--dls-color-text-secondary)',
        }}
      >
        {label}
      </span>
      <strong
        style={{
          fontSize: 'var(--dls-text-paragraph-m-font-size)',
          lineHeight: 'var(--dls-text-paragraph-m-line-height)',
          fontWeight: 'var(--dls-text-paragraph-m-heavy-font-weight)',
          color: 'var(--dls-color-text-primary)',
        }}
      >
        {value}
      </strong>
      <p style={{ margin: 0, color: 'var(--dls-color-text-secondary)' }}>{helper}</p>
    </div>
  );
}

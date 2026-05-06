/**
 * Shared layout helpers for Storybook stories.
 *
 * Many story files duplicate the same `Section` (title + vertical stack of
 * children) and `Row` (small left-aligned label + content) wrappers. This
 * module centralizes them so the styling is consistent and stories can stay
 * focused on the component being demoed.
 *
 *     import { Section, Row } from '../_helpers/StoryLayout';
 *
 *     <Section title="Filled">
 *       {INTENTS.map(intent => (
 *         <Row key={intent} label={intent}>
 *           <Button intent={intent}>Click</Button>
 *         </Row>
 *       ))}
 *     </Section>
 */
import React from 'react';

export interface SectionProps {
  /** Section heading (rendered as <h3>) */
  title: string;
  /**
   * Layout variant for children:
   *  - `stack` (default): vertical column, children wrapped in inner div with gap
   *  - `flat`: heading + children, children render directly with no inner wrapper
   *  - `wrap`: horizontal row that wraps, useful for size/variant grids
   */
  layout?: 'stack' | 'flat' | 'wrap';
  /** Visual size of the section heading. `m` (default) = 16px, `s` = 14px. */
  size?: 'm' | 's';
  /** Outer gap between heading and children container. Defaults follow size. */
  outerGap?: number;
  /** Inner gap between children (only applies to `stack` and `wrap` layouts). */
  innerGap?: number;
  /** Cross-axis alignment for `wrap` layout. Default `flex-end`. */
  wrapAlign?: 'flex-start' | 'center' | 'flex-end';
  children: React.ReactNode;
  className?: string;
}

/** Container with a heading and a stack/wrap/flat of children. */
export const Section = ({
  title,
  layout = 'stack',
  size = 'm',
  outerGap,
  innerGap,
  wrapAlign = 'flex-end',
  children,
  className,
}: SectionProps) => {
  const headingFontSize = size === 's' ? 14 : 16;
  const resolvedOuterGap = outerGap ?? (size === 's' ? 12 : 16);
  const resolvedInnerGap = innerGap ?? (layout === 'wrap' ? 16 : 12);

  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: resolvedOuterGap }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: headingFontSize,
          fontWeight: 600,
          fontFamily: 'var(--dls-font-family)',
          color: 'var(--dls-color-text-primary)',
        }}
      >
        {title}
      </h3>
      {layout === 'flat' ? (
        children
      ) : layout === 'wrap' ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: wrapAlign, gap: resolvedInnerGap }}>
          {children}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: resolvedInnerGap }}>
          {children}
        </div>
      )}
    </div>
  );
};

export interface RowProps {
  /** Small left-aligned text label (e.g., "neutral", "primary") */
  label: string;
  /**
   * Vertical alignment of label + content.
   *  - `center` (default): label centered with content
   *  - `start`: label aligns to top — useful for multi-line content
   */
  align?: 'center' | 'start';
  /** Width of the label column — default 64 */
  labelWidth?: number;
  children: React.ReactNode;
  className?: string;
}

/** A label-on-the-left, content-on-the-right row. */
export const Row = ({
  label,
  align = 'center',
  labelWidth = 64,
  children,
  className,
}: RowProps) => (
  <div
    className={className}
    style={{
      display: 'flex',
      alignItems: align === 'start' ? 'flex-start' : 'center',
      gap: 12,
    }}
  >
    <span
      style={{
        width: labelWidth,
        fontSize: 12,
        color: 'var(--dls-color-text-secondary)',
        fontFamily: 'var(--dls-font-family)',
        flexShrink: 0,
        // Visual alignment fix for `start` rows (matches Alert, etc.)
        paddingTop: align === 'start' ? 10 : undefined,
      }}
    >
      {label}
    </span>
    {children}
  </div>
);

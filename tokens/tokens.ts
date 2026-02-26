/**
 * DLS-Lead Design Tokens
 * 4-layer system: Primitives → System Semantics → State → Component
 * AI-optimized, DTCG-compliant, multi-theme capable.
 */

// =============================================================================
// Layer 1 — Color Primitives (do not use directly in components)
// =============================================================================

export const color = {
  neutral: {
    0: "#FFFFFF",
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E9EAEB",
    300: "#D5D7DA",
    400: "#A4A7AE",
    500: "#717680",
    600: "#535862",
    700: "#414651",
    800: "#252B37",
    900: "#181D27",
    950: "#0A0D12",
  },
  primary: {
    50: "#F9F5FF",
    100: "#F4EBFF",
    200: "#E9D7FE",
    300: "#D6BBFB",
    400: "#B692F6",
    500: "#9E77ED",
    600: "#7F56D9",
    700: "#6941C6",
    800: "#53389E",
    900: "#42307D",
    950: "#2C1C5F",
  },
  info: {
    50: "#EFF8FF",
    100: "#D1E9FF",
    200: "#B2DDFF",
    300: "#84CAFF",
    400: "#53B1FD",
    500: "#2E90FA",
    600: "#1570EF",
    700: "#175CD3",
    800: "#1849A9",
    900: "#194185",
    950: "#102A56",
  },
  success: {
    50: "#ECFDF3",
    100: "#D1FADF",
    200: "#A6F4C5",
    300: "#6CE9A6",
    400: "#32D583",
    500: "#12B76A",
    600: "#039855",
    700: "#027A48",
    800: "#05603A",
    900: "#054F31",
    950: "#053321",
  },
  warning: {
    50: "#FFFAEB",
    100: "#FEF0C7",
    200: "#FEDF89",
    300: "#FEC84B",
    400: "#FDB022",
    500: "#F79009",
    600: "#DC6803",
    700: "#B54708",
    800: "#93370D",
    900: "#7A2E0E",
    950: "#4E1D09",
  },
  danger: {
    50: "#FEF3F2",
    100: "#FEE4E2",
    200: "#FECDCA",
    300: "#FDA29B",
    400: "#F97066",
    500: "#F04438",
    600: "#D92D20",
    700: "#B42318",
    800: "#912018",
    900: "#7A271A",
    950: "#55160C",
  },
  additional: {
    purple:   { 100: "#F8CFFC", 300: "#EF9CF9", 500: "#E244F3", 700: "#B20DC5" },
    violet:   { 100: "#E3CBFB", 300: "#BA7EF5", 500: "#9439EF", 700: "#620FB3" },
    pink:     { 100: "#FFE0F3", 300: "#FFB2E1", 500: "#FF4ABA", 700: "#D60084" },
    blue:     { 100: "#E6E9FF", 300: "#C0C7FF", 500: "#475DFF", 700: "#0019D6" },
    teal:     { 100: "#C8F8FE", 300: "#76EDFD", 500: "#03CCE7", 700: "#03A6BB" },
    yellow:   { 100: "#FFF1C5", 300: "#FFDB6E", 500: "#FFC71F", 700: "#D6A100" },
    green:    { 100: "#C8FDC7", 300: "#76F974", 500: "#0CC308", 700: "#099B06" },
    gold:     { 100: "#F4EECF", 300: "#E4D486", 500: "#DAC65D", 700: "#9A8623" },
    cinnamon: { 100: "#F6E9E4", 300: "#E6C1B2", 500: "#CD866A", 700: "#995033" },
    orange:   { 100: "#FFEAD7", 300: "#FECA9A", 500: "#FD9535", 700: "#CA6202" },
  },
  opacity: {
    light: { 20: "rgba(255, 255, 255, 0.2)", 40: "rgba(255, 255, 255, 0.4)", 60: "rgba(255, 255, 255, 0.6)", 80: "rgba(255, 255, 255, 0.8)" },
    dark:  { 20: "rgba(0, 0, 0, 0.2)", 40: "rgba(0, 0, 0, 0.4)", 60: "rgba(0, 0, 0, 0.6)", 80: "rgba(0, 0, 0, 0.8)" },
  },
} as const;

// =============================================================================
// Layer 2 — System Semantics (theme-aware)
// =============================================================================

export const semantic = {
  default: {
    surface: {
      base:    color.neutral[0],
      subtle:  color.neutral[50],
      muted:   color.neutral[100],
      strong:  color.neutral[300],
      inverse: color.neutral[900],
      disabled: color.neutral[50],
    },
    text: {
      primary:    color.neutral[900],
      secondary:  color.neutral[700],
      inverse:    color.neutral[0],
      disabled:   color.neutral[500],
      placeholder: color.neutral[600],
    },
    border: {
      base:     color.neutral[300],
      subtle:   color.neutral[200],
      strong:   color.neutral[500],
      focus:    color.neutral[700],
      disabled: color.neutral[200],
      inverse:  color.neutral[0],
    },
    intent: {
      primary: { base: color.primary[700], onBase: color.neutral[0], subtle: color.primary[50], strong: color.primary[800], text: color.primary[900], border: color.primary[200] },
      success: { base: color.success[700], onBase: color.neutral[0], subtle: color.success[50], strong: color.success[800], text: color.success[900], border: color.success[200] },
      warning: { base: color.warning[700], onBase: color.neutral[0], subtle: color.warning[50], strong: color.warning[800], text: color.warning[900], border: color.warning[200] },
      danger:  { base: color.danger[600], onBase: color.neutral[0], subtle: color.danger[50], strong: color.danger[700], text: color.danger[900], border: color.danger[200] },
      info:    { base: color.info[700], onBase: color.neutral[0], subtle: color.info[50], strong: color.info[800], text: color.info[900], border: color.info[200] },
      neutral: { base: color.neutral[800], onBase: color.neutral[0], subtle: color.neutral[50], strong: color.neutral[900], text: color.neutral[900], border: color.neutral[200] },
    },
    overlay: {
      scrim:   "rgba(0, 0, 0, 0.5)",
      backdrop: "rgba(0, 0, 0, 0.3)",
    },
  },
  dark: {
    surface: {
      base:    color.neutral[950],
      subtle:  color.neutral[900],
      muted:   color.neutral[800],
      strong:  color.neutral[700],
      inverse: color.neutral[0],
      disabled: color.neutral[800],
    },
    text: {
      primary:    color.neutral[0],
      secondary:  color.neutral[200],
      inverse:    color.neutral[950],
      disabled:   color.neutral[500],
      placeholder: color.neutral[400],
    },
    border: {
      base:     color.neutral[600],
      subtle:   color.neutral[700],
      strong:   color.neutral[400],
      focus:    color.neutral[100],
      disabled: color.neutral[700],
      inverse:  color.neutral[950],
    },
    intent: {
      primary: { base: color.primary[600], onBase: color.neutral[0], subtle: color.primary[900], strong: color.primary[500], text: color.primary[300], border: color.primary[600] },
      success: { base: color.success[500], onBase: color.neutral[950], subtle: color.success[900], strong: color.success[400], text: color.success[300], border: color.success[600] },
      warning: { base: color.warning[500], onBase: color.neutral[950], subtle: color.warning[900], strong: color.warning[400], text: color.warning[300], border: color.warning[600] },
      danger:  { base: color.danger[600], onBase: color.neutral[0], subtle: color.danger[900], strong: color.danger[500], text: color.danger[300], border: color.danger[600] },
      info:    { base: color.info[600], onBase: color.neutral[0], subtle: color.info[900], strong: color.info[500], text: color.info[300], border: color.info[600] },
      neutral: { base: color.neutral[50], onBase: color.neutral[950], subtle: color.neutral[800], strong: color.neutral[100], text: color.neutral[200], border: color.neutral[700] },
    },
    overlay: {
      scrim:   "rgba(0, 0, 0, 0.5)",
      backdrop: "rgba(0, 0, 0, 0.3)",
    },
  },
} as const;

// =============================================================================
// Layer 3 — State abstraction (behavioral only; no brand colors)
// =============================================================================

export const state = {
  /** OKLCH lightness shift — code side only.
   *  Usage: `oklch(from <base-color> calc(l + state.lDelta.hover) c h)` */
  lDelta: {
    hover:   -0.05,
    pressed: -0.10,
  },
  /** Figma-compatible opacity overlays approximating OKLCH L-shift.
   *  Applied as second fill layer on interactive components in Figma.
   *  Use in code for outline, dotted, ghost, and link backgrounds. */
  overlay: {
    hover:   { light: "rgba(0, 0, 0, 0.05)",  dark: "rgba(255, 255, 255, 0.08)" },
    pressed: { light: "rgba(0, 0, 0, 0.10)",  dark: "rgba(255, 255, 255, 0.15)" },
  },
  disabled: { opacity: 0.38 },
  focus:    { ring: { color: color.info[300] } },
} as const;


// =============================================================================
// Layer 4 — Component tokens (override-safe; use these in components)
// -----------------------------------------------------------------------------
// ⚠️ Component-level tokens are for development, theming, and white-label override only.
//    Do NOT use as a replacement for semantic tokens in core design system code.
//    Use these for:
//      - Custom branding/white-labeling
//      - Theme overrides
//      - Temporary dev overrides
//    For production, prefer semantic tokens unless you have a strong reason.
// -----------------------------------------------------------------------------

function getComponentTokens(theme: keyof typeof semantic) {
  const s = semantic[theme];
  return {
    button: {
      primary: {
        // hover/pressed: oklch(from base calc(l - 0.05) c h) / calc(l - 0.10) in component stylesheets
        bg:     { base: s.intent.primary.base, disabled: s.surface.disabled },
        fg:     { base: s.intent.primary.onBase, disabled: s.text.disabled },
        border: { base: s.intent.primary.base, disabled: s.border.disabled },
      },
      secondary: {
        bg:     { base: s.surface.subtle, focus: s.surface.base, disabled: s.surface.disabled },
        fg:     { base: s.text.primary, disabled: s.text.disabled },
        border: { base: s.border.base, hover: s.border.strong, pressed: s.border.strong, disabled: s.border.disabled },
      },
      ghost: {
        bg:     { base: "transparent", focus: s.surface.base, disabled: "transparent" },
        fg:     { base: s.text.primary, disabled: s.text.disabled },
      },
    },
    input: {
      bg:     { base: s.surface.base, disabled: s.surface.disabled },
      fg:     { base: s.text.primary, placeholder: s.text.placeholder, disabled: s.text.disabled },
      border: { base: s.border.base, hover: s.border.strong, focus: s.border.focus, disabled: s.border.disabled },
    },
    table: {
      row:    { bg: { base: "transparent", selected: s.intent.primary.subtle } },
      header: { bg: s.surface.muted, fg: s.text.secondary, border: s.border.subtle },
    },
    dialog:  { overlay: s.overlay.scrim, bg: s.surface.base, border: s.border.subtle },
    dropdown: {
      bg:  s.surface.base,
      border: s.border.base,
      item: { bg: { base: "transparent" }, fg: s.text.primary },
    },
    sidebar: {
      bg:   s.surface.subtle,
      border: s.border.subtle,
      item: { fg: { base: s.text.secondary, active: s.text.primary }, bg: { active: s.surface.muted } },
    },
    badge: {
      neutral: { bg: s.intent.neutral.subtle, fg: s.intent.neutral.text, border: s.intent.neutral.border },
      primary: { bg: s.intent.primary.subtle, fg: s.intent.primary.text, border: s.intent.primary.border },
      success: { bg: s.intent.success.subtle, fg: s.intent.success.text, border: s.intent.success.border },
      warning: { bg: s.intent.warning.subtle, fg: s.intent.warning.text, border: s.intent.warning.border },
      danger:  { bg: s.intent.danger.subtle, fg: s.intent.danger.text, border: s.intent.danger.border },
      info:    { bg: s.intent.info.subtle, fg: s.intent.info.text, border: s.intent.info.border },
    },
    alert: {
      neutral: { bg: s.surface.muted, fg: s.text.primary, border: s.border.base },
      success: { bg: s.intent.success.subtle, fg: s.intent.success.text, border: s.intent.success.border },
      warning: { bg: s.intent.warning.subtle, fg: s.intent.warning.text, border: s.intent.warning.border },
      danger:  { bg: s.intent.danger.subtle, fg: s.intent.danger.text, border: s.intent.danger.border },
      info:    { bg: s.intent.info.subtle, fg: s.intent.info.text, border: s.intent.info.border },
    },
    accordion: {
      item: {
        border:    s.border.base,
        titleFg:   s.text.primary,
        contentFg: s.text.secondary,
        bg: {
          hover:   state.overlay.hover.light,
          pressed: state.overlay.pressed.light,
        },
        focus:    { ring: `0 0 0 2px ${color.info[300]}` },
        disabled: { opacity: state.disabled.opacity },
      },
    },
  } as const;
}

export const component = {
  default: getComponentTokens("default"),
  dark:    getComponentTokens("dark"),
} as const;

// =============================================================================
// Shadow (raw + semantic)
// =============================================================================

export const shadow = {
  raw: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  },
  surface: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  },
  overlay: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  focus:   { ring: `0 0 0 2px ${color.info[300]}` },
} as const;

// =============================================================================
// Font
// =============================================================================

export const font = {
  family: '"Inter", sans-serif',
  weight: {
    normal:   400,
    medium:   500,
    semibold: 600,
    bold:     800,
    black:    900,
  },
} as const;

// =============================================================================
// Text — Primitive scale + semantic typography
// =============================================================================

export const text = {
  xs:   { fontSize: 10, lineHeight: 14 },
  s:    { fontSize: 12, lineHeight: 16 },
  m:    { fontSize: 14, lineHeight: 20 },
  l:    { fontSize: 16, lineHeight: 24 },
  xl:   { fontSize: 18, lineHeight: 26 },
  "2xl": { fontSize: 24, lineHeight: 32 },
  "3xl": { fontSize: 32, lineHeight: 40 },
  hero: { fontSize: 36, lineHeight: 46 },
  heading: {
    xl: { fontSize: 24, lineHeight: 32, fontWeight: font.weight.semibold },
    l:  { fontSize: 18, lineHeight: 26, fontWeight: font.weight.semibold },
    m:  { fontSize: 16, lineHeight: 24, fontWeight: font.weight.medium },
  },
  body: {
    l: { fontSize: 16, lineHeight: 24, fontWeight: font.weight.normal },
    m: { fontSize: 14, lineHeight: 20, fontWeight: font.weight.normal },
    s: { fontSize: 12, lineHeight: 16, fontWeight: font.weight.normal },
  },
  label: {
    m: { fontSize: 14, lineHeight: 20, fontWeight: font.weight.medium },
    s: { fontSize: 12, lineHeight: 16, fontWeight: font.weight.medium },
  },
  caption: { fontSize: 10, lineHeight: 14, fontWeight: font.weight.normal },
} as const;

// =============================================================================
// Radius — Primitive + component
// =============================================================================

export const radius = {
  0: 0,
  xs: 2,
  s: 4,
  m: 6,
  l: 8,
  xl: 12,
  "2xl": 16,
  full: 9999,
  component: {
    button:   6,
    card:     8,
    modal:    12,
    input:    4,
    badge:    9999,
    chip:     9999,
    tooltip:  4,
    dropdown: 6,
    alert:    6,
  },
} as const;

// =============================================================================
// Spacing (8pt grid)
// =============================================================================

export const spacing = {
  0: 0, 0.5: 2, 1: 4, 1.5: 6, 2: 8, 2.5: 10, 3: 12, 4: 16,
  6: 24, 8: 32, 10: 40, 11: 44, 12: 48, 14: 56, 16: 64,
} as const;

// =============================================================================
// Icon stroke
// =============================================================================

export const iconStroke = {
  12: 1,
  16: 1.33,
  24: 2,
} as const;

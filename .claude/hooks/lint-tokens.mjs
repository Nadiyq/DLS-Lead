#!/usr/bin/env node
/**
 * DLS-Lead — PostToolUse CSS Lint Hook
 *
 * Runs automatically after every Write/Edit to a CSS file inside the
 * storybook stories directory.  Blocks the edit when it detects:
 *
 *   1. Custom CSS classes that don't follow the `.dls-*` naming convention
 *   2. Hardcoded color values (hex, rgb, hsl, oklch literals)
 *   3. Hardcoded dimensional values (px, rem, em) for token-governed props
 *   4. Direct L1 primitive token references in component CSS
 *   5. Class-based state selectors (.is-*, .has-*)
 *   6. Missing `all: unset; box-sizing: border-box;` on root selectors
 *   7. `:hover` without `:not(:disabled)`, `:focus` instead of `:focus-visible`
 *   8. `outline` used for focus ring (should be `box-shadow`)
 *
 * Usage:
 *   node .claude/hooks/lint-tokens.mjs <file>          # lint single file
 *   node .claude/hooks/lint-tokens.mjs --all            # lint all component CSS
 *   node .claude/hooks/lint-tokens.mjs --report <dir>   # audit report for dir
 *
 * Exit codes:
 *   0 = clean
 *   1 = violations found (edit blocked)
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { resolve, basename, extname, relative } from "path";

/* ── Config ─────────────────────────────────────────────────────────── */

const STORIES_DIR = resolve(
  import.meta.dirname,
  "../../apps/storybook/src/stories"
);

const SEVERITY = { ERROR: "ERROR", WARN: "WARN" };

/* ── L1 Primitive Patterns ──────────────────────────────────────────── */

// L1 primitives: --dls-color-{intent}-{number} (50-950)
const L1_PRIMITIVE_RE =
  /var\(\s*--dls-color-(?:neutral|primary|info|success|warning|danger)-\d{1,3}\s*\)/g;

// L1 radius primitives (not component radius)
const L1_RADIUS_RE =
  /var\(\s*--dls-radius-(?:xs|s|m|l|xl|2xl|3xl|full|none)\s*\)/g;

// L1 spacing used raw (allowed in most contexts, but flagged as info)
// Not blocked — spacing tokens are used directly.

/* ── Hardcoded Value Patterns ───────────────────────────────────────── */

// Hex colors
const HEX_COLOR_RE = /#(?:[0-9A-Fa-f]{3,4}){1,2}\b/;

// rgb/rgba/hsl/hsla/oklch literals (with actual numeric values, not var())
const CSS_COLOR_FN_RE =
  /(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\(\s*[\d.]+/;

// Hardcoded px/rem/em on token-governed properties
const TOKEN_GOVERNED_PROPS = [
  "border-radius",
  "font-size",
  "font-weight",
  "line-height",
  "letter-spacing",
];

const HARDCODED_SIZE_RE = /:\s*[\d.]+(?:px|rem|em)\s*[;!]/;

/* ── Class & Selector Patterns ──────────────────────────────────────── */

// Class selectors that aren't .dls-*
const NON_DLS_CLASS_RE = /(?<!\w)\.(?!dls-)([a-zA-Z][a-zA-Z0-9_-]*)\s*[{,[:\s]/g;

// Allowed non-dls classes (story wrappers, third-party)
const ALLOWED_NON_DLS = new Set([
  "sb-",       // storybook
  "storybook-",
  "docs-",
]);

// .is-* / .has-* state classes
const STATE_CLASS_RE = /\.(?:is|has)-[a-zA-Z]/;

// :hover without :not(:disabled)
const HOVER_NO_GUARD_RE = /:hover(?!\s*:not\(\s*:disabled\s*\))/;

// :focus (should be :focus-visible)
const FOCUS_NOT_VISIBLE_RE = /:focus(?!-visible)(?!\s*{)/;

// outline for focus (should use box-shadow)
const OUTLINE_FOCUS_RE = /outline\s*:/;

/* ── Root Selector Reset Check ──────────────────────────────────────── */

function checkRootReset(css, fileName) {
  const violations = [];
  // Find root .dls-{name} blocks (not sub-elements like .dls-alert__body)
  const rootSelectorRe = /^\.dls-[a-z][a-z0-9-]*(?:\s*,\s*\.dls-[a-z][a-z0-9-]*)*\s*\{/gm;
  let match;
  while ((match = rootSelectorRe.exec(css)) !== null) {
    // Only check root selectors (not .dls-alert__body, .dls-alert[data-*])
    const selector = match[0];
    if (selector.includes("__") || selector.includes("[")) continue;

    // Find the block content
    const blockStart = match.index + match[0].length;
    let depth = 1;
    let i = blockStart;
    while (i < css.length && depth > 0) {
      if (css[i] === "{") depth++;
      if (css[i] === "}") depth--;
      i++;
    }
    const block = css.slice(blockStart, i - 1);

    if (!block.includes("all: unset") || !block.includes("box-sizing: border-box")) {
      const line = css.slice(0, match.index).split("\n").length;
      violations.push({
        line,
        rule: "root-reset",
        severity: SEVERITY.ERROR,
        message: `Root selector \`${selector.trim()}\` must start with \`all: unset; box-sizing: border-box;\``,
      });
    }
  }
  return violations;
}

/* ── Line-by-Line Checks ────────────────────────────────────────────── */

function lintLine(line, lineNum, fileName) {
  const violations = [];
  const trimmed = line.trim();

  // Skip comments
  if (trimmed.startsWith("/*") || trimmed.startsWith("*") || trimmed.startsWith("//")) {
    return violations;
  }

  // 1. Hardcoded hex colors (skip CSS custom property definitions in tokens files)
  if (HEX_COLOR_RE.test(trimmed) && !trimmed.startsWith("--dls-")) {
    violations.push({
      line: lineNum,
      rule: "no-hardcoded-color",
      severity: SEVERITY.ERROR,
      message: `Hardcoded color value found. Use a DLS token instead: \`${trimmed.trim()}\``,
    });
  }

  // 2. CSS color functions with literal values
  if (CSS_COLOR_FN_RE.test(trimmed)) {
    // Allow oklch(from var(...) ...) pattern — that's the DLS hover shift
    if (!trimmed.includes("oklch(from var(")) {
      violations.push({
        line: lineNum,
        rule: "no-hardcoded-color",
        severity: SEVERITY.ERROR,
        message: `Hardcoded color function found. Use a DLS token: \`${trimmed.trim()}\``,
      });
    }
  }

  // 3. L1 primitive references in component CSS
  const l1Matches = trimmed.match(L1_PRIMITIVE_RE);
  if (l1Matches) {
    for (const m of l1Matches) {
      violations.push({
        line: lineNum,
        rule: "no-L1-in-component",
        severity: SEVERITY.ERROR,
        message: `L1 primitive \`${m}\` used directly. Use L2 semantic or L4 component token instead.`,
      });
    }
  }

  // 4. L1 radius primitives
  const l1RadiusMatches = trimmed.match(L1_RADIUS_RE);
  if (l1RadiusMatches) {
    for (const m of l1RadiusMatches) {
      violations.push({
        line: lineNum,
        rule: "no-L1-radius",
        severity: SEVERITY.ERROR,
        message: `L1 radius primitive \`${m}\` used. Use \`--dls-radius-component-*\` instead.`,
      });
    }
  }

  // 5. Hardcoded sizes on token-governed properties
  for (const prop of TOKEN_GOVERNED_PROPS) {
    if (trimmed.includes(prop) && HARDCODED_SIZE_RE.test(trimmed)) {
      violations.push({
        line: lineNum,
        rule: "no-hardcoded-size",
        severity: SEVERITY.ERROR,
        message: `Hardcoded size on \`${prop}\`. Use a DLS token variable.`,
      });
    }
  }

  // 6. .is-* / .has-* state classes
  if (STATE_CLASS_RE.test(trimmed)) {
    violations.push({
      line: lineNum,
      rule: "no-class-state",
      severity: SEVERITY.ERROR,
      message: `Class-based state selector found. Use \`data-*\` attributes or native pseudo-classes.`,
    });
  }

  // 7. :hover without :not(:disabled)
  if (HOVER_NO_GUARD_RE.test(trimmed) && trimmed.includes(":hover")) {
    // Make sure it's a selector line, not a property
    if (!trimmed.includes(":") || trimmed.match(/^\s*[.[:]/)) {
      violations.push({
        line: lineNum,
        rule: "hover-needs-guard",
        severity: SEVERITY.ERROR,
        message: `\`:hover\` without \`:not(:disabled)\`. Use \`:hover:not(:disabled)\`.`,
      });
    }
  }

  // 8. :focus instead of :focus-visible
  if (FOCUS_NOT_VISIBLE_RE.test(trimmed) && !trimmed.includes(":focus-visible") && !trimmed.includes(":focus-within")) {
    if (trimmed.match(/^\s*[.[:&]/)) {
      violations.push({
        line: lineNum,
        rule: "focus-visible-only",
        severity: SEVERITY.ERROR,
        message: `Use \`:focus-visible\` instead of \`:focus\`.`,
      });
    }
  }

  // 9. Non-.dls- class selectors (the big one: custom classes)
  let classMatch;
  NON_DLS_CLASS_RE.lastIndex = 0;
  while ((classMatch = NON_DLS_CLASS_RE.exec(trimmed)) !== null) {
    const className = classMatch[1];
    // Skip allowed prefixes
    const isAllowed = [...ALLOWED_NON_DLS].some((prefix) =>
      className.startsWith(prefix)
    );
    if (!isAllowed) {
      violations.push({
        line: lineNum,
        rule: "no-custom-class",
        severity: SEVERITY.ERROR,
        message: `Custom class \`.${className}\` found. All classes must use \`.dls-*\` naming. Use an existing DLS component or extend via \`data-*\` attributes.`,
      });
    }
  }

  // 10. outline for focus ring
  if (OUTLINE_FOCUS_RE.test(trimmed) && !trimmed.includes("outline: none")) {
    violations.push({
      line: lineNum,
      rule: "no-outline-focus",
      severity: SEVERITY.WARN,
      message: `\`outline\` used — focus rings must use \`box-shadow\`. Exception: \`outline: none\` is allowed.`,
    });
  }

  return violations;
}

/* ── File Linter ─────────────────────────────────────────────────────── */

function lintFile(filePath) {
  const css = readFileSync(filePath, "utf-8");
  const lines = css.split("\n");
  let violations = [];

  // Root reset check
  violations.push(...checkRootReset(css, filePath));

  // Line-by-line
  let inComment = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Track multi-line comments
    if (line.includes("/*")) inComment = true;
    if (line.includes("*/")) {
      inComment = false;
      continue;
    }
    if (inComment) continue;

    violations.push(...lintLine(line, i + 1, filePath));
  }

  return violations;
}

/* ── Report Formatter ────────────────────────────────────────────────── */

function formatViolations(filePath, violations) {
  if (violations.length === 0) return "";

  const relPath = relative(process.cwd(), filePath);
  const lines = [`\n  ${relPath}`];

  for (const v of violations) {
    const icon = v.severity === SEVERITY.ERROR ? "✘" : "⚠";
    lines.push(`    ${icon} L${v.line} [${v.rule}] ${v.message}`);
  }

  return lines.join("\n");
}

/* ── Collect CSS Files ───────────────────────────────────────────────── */

function collectCssFiles(dir) {
  const files = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectCssFiles(full));
    } else if (extname(entry.name) === ".css") {
      files.push(full);
    }
  }
  return files;
}

/* ── Main ────────────────────────────────────────────────────────────── */

const args = process.argv.slice(2);
const reportMode = args.includes("--report");
const allMode = args.includes("--all");

let files = [];

if (allMode || reportMode) {
  const dir = reportMode
    ? resolve(args[args.indexOf("--report") + 1] || STORIES_DIR)
    : STORIES_DIR;
  files = collectCssFiles(dir);
} else if (args.length > 0) {
  // Single file mode (PostToolUse)
  const file = resolve(args[0]);
  if (extname(file) === ".css") {
    files = [file];
  }
} else {
  // stdin mode — read file path from TOOL_EVENT (PostToolUse hook)
  // When used as a hook, the file path comes as an argument
  console.log("Usage: lint-tokens.mjs <file> | --all | --report [dir]");
  process.exit(0);
}

let totalErrors = 0;
let totalWarnings = 0;
let output = [];

for (const file of files) {
  const violations = lintFile(file);
  const errors = violations.filter((v) => v.severity === SEVERITY.ERROR);
  const warnings = violations.filter((v) => v.severity === SEVERITY.WARN);
  totalErrors += errors.length;
  totalWarnings += warnings.length;

  const formatted = formatViolations(file, violations);
  if (formatted) output.push(formatted);
}

if (output.length > 0) {
  console.error(`\n🚫 DLS Lint — ${totalErrors} error(s), ${totalWarnings} warning(s)\n`);
  console.error(output.join("\n"));

  if (reportMode) {
    console.error(
      `\n📊 Scanned ${files.length} file(s). ${totalErrors} error(s), ${totalWarnings} warning(s).`
    );
    if (totalErrors > 0) {
      console.error(
        "   Run `/fix-component <Name>` with a Figma URL to resolve violations.\n"
      );
    }
  } else {
    console.error(
      "\n❌ EDIT BLOCKED — fix all ERROR violations before proceeding."
    );
    console.error(
      "   Hint: Check .claude/skills/dls-enforcement.md for allowed patterns.\n"
    );
  }
}

if (totalErrors > 0) {
  process.exit(1);
} else if (output.length > 0) {
  // Warnings only
  process.exit(0);
} else {
  if (allMode || reportMode) {
    console.log(`✅ DLS Lint — ${files.length} file(s) clean. No violations.`);
  }
  process.exit(0);
}

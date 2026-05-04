// Computed theme values derived from site.json's `theme` block.
// The artist edits site.json; this file resolves named font presets and
// fills in defaults so templates always see a complete theme object.

const site = require("./site.json");

const FONT_PRESETS = {
  serif: '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif',
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  modern: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
  mono: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
};

const t = site.theme || {};
const fontInput = (t.font || "serif").trim();
// If the value matches a preset key, use that stack; otherwise treat the
// value itself as a CSS font-family list (e.g. `"Garamond", serif`).
const fontFamily = FONT_PRESETS[fontInput] || fontInput;

module.exports = {
  background: t.background || "#fbfaf7",
  text: t.text || "#1f1d1a",
  fontFamily,
  fontPresets: Object.keys(FONT_PRESETS),
};

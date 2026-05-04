const path = require("path");
const Image = require("@11ty/eleventy-img");
const eleventyNavigation = require("@11ty/eleventy-navigation");
const siteData = require("./src/_data/site.json");

async function imageShortcode(src, alt, sizes = "(min-width: 60em) 33vw, 100vw", widths = [400, 800, 1600]) {
  if (alt === undefined) {
    throw new Error(`Missing \`alt\` on image shortcode for: ${src}`);
  }

  // Resolve site-root-absolute paths (e.g. /images/work/foo.jpg) against the
  // project root so the artist can reference originals exactly as they appear
  // in the URL of the deployed site.
  const inputPath = src.startsWith("/")
    ? path.join(__dirname, src)
    : src;

  const metadata = await Image(inputPath, {
    widths,
    formats: ["webp", "jpeg"],
    outputDir: "./_site/images/processed/",
    urlPath: "/images/processed/",
  });

  return Image.generateHTML(metadata, {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigation);

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);

  // Pass through originals + assets.
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Artworks sorted newest-first by `year:`, with `order:` as a tiebreaker
  // for pieces in the same year, then `title:` for alphabetical fallback.
  // Pieces missing `year:` fall to the end.
  eleventyConfig.addCollection("work", (api) => {
    return api
      .getFilteredByGlob("src/work/pieces/*.md")
      .sort((a, b) => {
        const ay = parseInt(a.data.year, 10) || 0;
        const by = parseInt(b.data.year, 10) || 0;
        if (ay !== by) return by - ay;
        const ao = a.data.order ?? 9999;
        const bo = b.data.order ?? 9999;
        if (ao !== bo) return ao - bo;
        return (a.data.title || "").localeCompare(b.data.title || "");
      });
  });

  // Unique, ordered list of categories used across all pieces.
  eleventyConfig.addCollection("categories", (api) => {
    const works = api.getFilteredByGlob("src/work/pieces/*.md");
    const seen = new Set();
    for (const w of works) {
      for (const c of (w.data.category || [])) seen.add(c);
    }
    const order = siteData.categoryOrder || [];
    const ordered = [];
    for (const c of order) if (seen.has(c)) { ordered.push(c); seen.delete(c); }
    return ordered.concat([...seen].sort());
  });

  // Slug filter: stable, lowercase, hyphenated tokens for use as DOM tokens.
  const slugify = (str) =>
    String(str).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  eleventyConfig.addFilter("slug", slugify);
  eleventyConfig.addFilter("slugList", (arr) => (arr || []).map(slugify).join(" "));

  // ISO date (YYYY-MM-DD), used by the sitemap.
  eleventyConfig.addFilter("dateISO", (d) => new Date(d).toISOString().slice(0, 10));

  // Safe JSON serialization for embedding values in JSON-LD scripts.
  eleventyConfig.addFilter("dump", (v) => JSON.stringify(v));

  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  // Strip a single trailing slash; used to normalize site.url for absolute links.
  eleventyConfig.addFilter("stripTrailingSlash", (s) =>
    typeof s === "string" && s.endsWith("/") ? s.slice(0, -1) : s
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html", "11ty.js"],
  };
};

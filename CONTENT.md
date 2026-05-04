# How to update this site

This is a plain-text guide for editing the site without any coding. Everything
on the site is built from text files and image files in this repository. When
you commit and push changes to the `main` branch, GitHub rebuilds the site
automatically — usually within a minute.

## What lives where

| You want to edit… | Open this file |
|---|---|
| The artist name, tagline, email, social links | `src/_data/site.json` |
| The About page | `src/about.md` |
| The Artist Statement page | `src/statement.md` |
| The CV page | `src/cv.md` |
| The list of artworks | files in `src/work/pieces/` (one file per piece) |
| Image files | `images/work/` |

## Pages

The site has these pages, all linked from the top navigation:

- **Home** (`/`) &mdash; landing page with the artist's name, tagline,
  and a small preview of recent work. Edit text in `src/_data/site.json`
  (`title`, `tagline`).
- **About** (`/about/`) &mdash; biography. Edit `src/about.md`.
- **Statement** (`/statement/`) &mdash; artist statement.
  Edit `src/statement.md`.
- **Work** (`/work/`) &mdash; portfolio grid with category filters.
  Edit pieces under `src/work/pieces/`.
- **CV** (`/cv/`) &mdash; CV page. Edit `src/cv.md`.
- **Contact** (`/contact/`) &mdash; contact form (when Formspree is
  configured) and email/social links. Edit `src/_data/site.json`.

## Add a new artwork

1. Drop the image file (JPEG or PNG) into `images/work/`. Use any size you
   like — the site automatically generates thumbnails. Lowercase filenames
   without spaces are easiest, e.g. `red-poppies.jpg`.
2. Copy any existing piece file in `src/work/pieces/` (e.g.
   `morning-window.md`) and rename the copy to match your image's slug,
   e.g. `red-poppies.md`.
3. Open the new file and edit the part between the `---` lines:

   ```
   ---
   title: Red Poppies
   year: 2025
   medium: Oil on linen
   dimensions: 16 × 20 in
   image: /images/work/red-poppies.jpg
   categories: [paintings, still-life]
   order: 5
   ---
   ```

4. Optionally write a longer description below the second `---`. It will
   appear on the artwork's own page (clicked from the grid).
5. Commit and push. The new piece appears in the work grid automatically.

### Field reference

- `title` — shown in the grid and on the detail page.
- `year` / `medium` / `dimensions` — shown on the detail page.
- `image` — must start with `/images/work/` followed by the filename you
  uploaded.
- `categories` — a list. Whatever categories you use here are turned
  into filter buttons on the work page automatically. Reuse the same
  category names across pieces so they group together (e.g. always
  `paintings`, not sometimes `painting`).
- `order` — optional. Lower numbers appear first in the grid. Pieces
  with no `order` are sorted alphabetically by title at the end.

## Change the categories that appear on the work page

You don't need to maintain a separate list. Categories are detected
automatically from the `categories:` field on each piece.

If you want a specific button order, edit `categoryOrder` in
`src/_data/site.json`. Categories not listed there are appended in
alphabetical order. Categories you remove from every piece disappear
from the buttons automatically.

## Edit About / Artist Statement

About and Artist Statement are separate pages, each in its own
file: `src/about.md` and `src/statement.md`. Open either and edit
the text below the front matter (the `---` block at the top —
leave that intact). You can use
[Markdown](https://www.markdownguide.org/cheat-sheet/) — _italic_
with `_underscores_`, **bold** with `**asterisks**`, paragraph
breaks with a blank line between paragraphs.

## Edit the CV

Open `src/cv.md`. The whole file (below the front matter) is yours to
structure with Markdown headings (`##`) and bullet lists (`-`). Add
or remove sections (Education, Exhibitions, Awards, Press, etc.) as
suits you.

## Edit Contact info

Open `src/_data/site.json` and edit:

- `email` — your contact email
- `social` — one entry per link (label + URL)
- `formspreeId` — leave empty to show only your email + social links.
  To enable a working contact form, sign up at
  [formspree.io](https://formspree.io), create a new form, and paste
  the form ID (the bit after `/f/` in the form's endpoint URL) here.

## SEO — search engine and social-share previews

The site automatically writes good metadata for every page (title,
description, Open Graph tags for Facebook/LinkedIn previews, Twitter
Card tags, canonical URL, JSON-LD structured data). You only need
to fill in a few fields in `src/_data/site.json`, plus a one-line
`description:` per page.

### Site-wide (in `src/_data/site.json`)

- `url` — the canonical URL of the published site, e.g.
  `"https://your-domain.com"` (no trailing slash needed). Required
  for absolute links in social previews and the sitemap.
- `description` — a 1–2-sentence default description of the whole
  site. Used as a fallback when a page doesn't set its own.
- `socialImage` — a default image (path under `/images/...`) used
  when a page doesn't have its own. Use a 1200 × 630 image for best
  Twitter/Facebook results. Leave empty to fall back to `heroImage`.
- `twitter` — optional Twitter handle (with `@`), e.g. `"@artist"`.
- `language` — defaults to `"en"`. Set to your site's primary
  language code if different.

### Per-page front-matter

Any of these can be added to the `---` block at the top of
`about.md`, `cv.md`, or any piece file under `work/pieces/`:

```
description: A short, specific summary of THIS page.
socialImage: /images/work/featured-piece.jpg   # overrides site default
noindex: true                                   # hide from search engines
```

For artwork detail pages, the page already uses the artwork's own
`image` as the social-share preview, so you usually don't need to
add `socialImage`. Adding `description:` to each piece is the
single biggest SEO win — it's what shows up under the title in
Google results and Twitter previews.

### Structured data (automatic)

- The home page declares the artist as a `Person` (with social
  links from `social[]`).
- Each artwork page declares a `VisualArtwork` (title, creator,
  medium, year, dimensions, image, description). This helps the
  art appear in Google Image search and Knowledge Graph.

### Sitemap & robots.txt

`/sitemap.xml` is auto-generated from every page on the site, with
absolute URLs built from `site.url`. `/robots.txt` references the
sitemap. After your site is live, submit
`https://your-domain.com/sitemap.xml` in Google Search Console to
get indexed faster.

## Add a logo or home-page hero image

Both are optional. They live as files under `images/` (any subfolder
you like) and are referenced from `src/_data/site.json`:

- `logo` — path to a small **square** logo image, e.g.
  `"/images/logo.png"`. When set, the logo replaces the text site
  title in the top-left of every page. Leave empty (`""`) to keep
  the text title. PNG with transparency works well.
- `heroImage` — path to a wide image to display full-width at the
  top of the **home page**, e.g. `"/images/hero.jpg"`. Leave empty
  to use the plain text hero. Landscape orientation, at least
  1600px wide is recommended.

## Change colors and fonts

Edit the `theme` block in `src/_data/site.json`:

```json
"theme": {
  "background": "#fbfaf7",
  "text": "#1f1d1a",
  "font": "serif"
}
```

- `background` — the page background color. Any CSS color value
  (`#hex`, `rgb()`, color name).
- `text` — the main typography color. Same format.
- `font` — choose one of the named presets, or paste a CSS
  font-family list of your own:
  - `"serif"` — classic book-style serif (default)
  - `"sans"` — neutral system sans-serif
  - `"modern"` — Inter / Helvetica Neue style sans
  - `"mono"` — monospace
  - or any CSS font-family string, e.g. `"'Garamond', serif"`

## Publish

1. Commit your changes (in the GitHub web UI: edit a file → "Commit
   changes" at the bottom; or via desktop tools).
2. Push to the `main` branch.
3. GitHub Actions builds the site and deploys it. Watch progress at
   the **Actions** tab of the repo. Within ~1 minute the site at your
   GitHub Pages URL is updated.

### One-time setup

In the repo settings on GitHub:

1. **Settings → Pages → Build and deployment → Source**: select
   **GitHub Actions**.
2. (Optional) Add a custom domain in the same screen.

## Preview locally (optional)

If you have Node 20+ installed:

```
npm install
npm run serve
```

Open http://localhost:8080. Changes to files reload automatically.

## Troubleshooting

- **My new image doesn't show up.** Make sure the filename in
  `image:` (in the markdown front matter) exactly matches the file in
  `images/work/`, including capitalization and extension.
- **A new category button isn't appearing.** Check that the piece's
  `categories:` line is a YAML list, e.g. `categories: [paintings]`,
  and that you committed and pushed.
- **Deploy failed.** Open the Actions tab on GitHub, click the failed
  run, and read the logs. The most common cause is a typo in a
  markdown file's front matter (missing `:` or unbalanced brackets).

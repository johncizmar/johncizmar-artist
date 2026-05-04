# artsite

A file-based static portfolio site for fine art. Content lives in
markdown files and images in folders; the site builds with
[Eleventy](https://www.11ty.dev/) and deploys to GitHub Pages on every
push to `main`.

## For the artist

See **[CONTENT.md](./CONTENT.md)** — a plain-language guide to adding
new artworks, editing About / Statement / Contact, and publishing.

## Quick start (local preview)

Requires Node 20+.

```
npm install
npm run serve     # http://localhost:8080
npm run build     # outputs static site to _site/
```

## Project layout

```
src/
├── _data/
│   ├── site.json         # Artist name, email, theme, socials, Formspree ID
│   └── theme.js          # Resolves theme.font preset → CSS font-family
├── index.njk             # Home (template: hero + featured work)
├── about.md              # About / biography (artist-edited prose)
├── statement.md          # Artist statement (artist-edited prose)
├── cv.md                 # CV page (artist-edited prose)
├── contact.njk           # Contact page (template: form + email/social fallback)
├── sitemap.njk           # Renders /sitemap.xml from collections.all
├── robots.njk            # Renders /robots.txt with sitemap reference
├── work/
│   ├── index.njk         # Portfolio grid + category filter (template)
│   └── pieces/*.md       # One markdown file per artwork
├── _includes/            # Layouts, partials (nav, footer, contact form, SEO meta)
└── assets/{css,js}/
images/work/              # Original artwork images
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds
the site and publishes it to GitHub Pages. In the repo settings, set
**Pages → Source** to **GitHub Actions** once.

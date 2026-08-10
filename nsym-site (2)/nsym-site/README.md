# North Shore Youth Music — new site

Plain HTML/CSS/JS, no build step. Six pages: `index.html`, `choirs.html`,
`orchestras.html`, `musical-directors.html`, `contact.html`, `apply.html`.

## What still needs doing before this replaces the live site

- **Choirs, Orchestras, Musical Directors, Apply** pages have placeholder
  copy (marked with a dashed gold box) — the real text couldn't be pulled
  automatically from Squarespace. Copy it across from the Squarespace
  editor.
- **Images** currently hot-link to Squarespace's CDN (`images.squarespace-cdn.com`)
  as placeholders. Download the real photos from the Squarespace media
  library and put them in `/images`, then update the `src` attributes,
  before cancelling the Squarespace subscription — those CDN links may
  stop working once the account is closed.
- **Apply form**: Squarespace forms don't export. Simplest replacement is
  a free Google Form linked from `apply.html`, or I can build a plain
  HTML form once you know what fields the original asked for.

## Deploying (free)

**Option A — Netlify, no account needed to start:**
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page
3. You get a live `*.netlify.app` URL immediately — check it over
4. Once happy, create a free account to keep it and add the custom domain

**Option B — Vercel:**
1. Push this folder to a GitHub repo
2. Import the repo at https://vercel.com/new
3. No build settings needed — it's a static site
4. Add the custom domain once DNS is pointed at Cloudflare

Either way, once it's live on its free subdomain, come back and we'll
wire up `nsym.org.nz` to point at it through Cloudflare DNS.

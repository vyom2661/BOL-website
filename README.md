# BackOfficeLabs — Website

Marketing site for BackOfficeLabs (v2 offer: AI Opportunity Audit → fixed-price builds). Current visual theme: **Throughput** (Space Grotesk, cream paper, black borders, tangerine/green accents).

## Files

- **`index.html`** — the deployable site. Fully self-contained (fonts, scripts, and founder photos are embedded). This is the only file a web server needs.
- **`source/`** — the editable source the bundle is compiled from:
  - `BackOfficeLabs-Site-Throughput.html` — page shell (loads React + Babel from CDN)
  - `directions/throughput-site.jsx` — shared components (nav, form, FAQ, hero visual)
  - `directions/throughput-site-page.jsx` — all page sections and copy
  - `assets/` — founder photos (already embedded in the JSX as data URIs; kept for reference)

## Deploying

Any static host works — upload `index.html` and you're done.

**GitHub Pages:** Settings → Pages → Deploy from branch → `main` / root. The site will be served at `https://<user>.github.io/<repo>/`.

## Editing

Small copy/style changes: edit the files in `source/directions/`, then open `source/BackOfficeLabs-Site-Throughput.html` in a browser to preview (requires internet for the CDN scripts). To ship, the source must be re-bundled into a self-contained `index.html`.

## Notes

- The contact form is front-end only — it validates and shows a thank-you but does not deliver submissions anywhere yet. Wire it to a booking tool or form endpoint before relying on it for leads.

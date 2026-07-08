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

Small copy/style changes: edit the files in `source/directions/`, then open `source/BackOfficeLabs-Site-Throughput.html` in a browser to preview (requires internet for the CDN scripts). To ship, re-pack the source into the self-contained `index.html`:

```
python3 build.py
```

`build.py` re-encodes the two editable JSX bundles (`source/directions/*.jsx`) back into `index.html`'s manifest. It does **not** rebuild the page shell (`source/BackOfficeLabs-Site-Throughput.html`) or the embedded fonts — if you change those, the file needs the original bundler.

### Case studies

The four case-study cards and their dedicated pages are data-driven from the `proof` array near the top of `source/directions/throughput-site-page.jsx`. Each entry drives both the card (in the "The work" section) and a full detail page reached at `index.html#/work/<slug>`. To add or edit a case study, edit that array (client, `sub`, `sector`, `url`/`urlLabel`, headline `metrics`, `meta` rows, and the `detail` sections/table/takeaway), then run `python3 build.py`.

## Notes

- The contact form is front-end only — it validates and shows a thank-you but does not deliver submissions anywhere yet. Wire it to a booking tool or form endpoint before relying on it for leads.

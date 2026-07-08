# CLAUDE.md — BackOfficeLabs Website

Project context and working rules for Claude Code. Read this before making changes.

---

## What this is

This repo is the **marketing website for BackOfficeLabs** (`vyom2661/BOL-website`). It's a
single-page marketing site that sells BackOfficeLabs' services and shows proof of work.

**BackOfficeLabs** builds AI-delivered systems for founder-led businesses, on a fixed price,
in weeks rather than months. The v2 offer is: **AI Opportunity Audit → fixed-price build →
documented handover** (you own the system; an optional monthly retainer is offered only at
handover). Two delivery tracks:

- **Run it on AI** — one live, self-verifying operating picture and the systems that act on it
  (CRM & pipeline builds, the flagship "Command Center" ops system).
- **Grow it with AI** — get found by search engines and AI assistants fast (SEO foundation,
  AI-SEO site rebuilds).

Run by two founders (Vyom, Saher); London + India. Contact: `hello@backofficelabs.ai`.
Visual theme is **"Throughput"** — Space Grotesk, cream paper, black borders, tangerine/green
accents, hard offset shadows.

The site's sections: hero → problem → what we build (tracks) → the audit → how we work →
why this works → **the work (case studies)** → founders → FAQ → contact.

---

## Repo layout

- **`index.html`** — the deployable site. A **self-contained bundle**: all assets (the JSX,
  React/Babel, fonts, founder photos) are embedded, gzip+base64, inside `__bundler/*` script
  blocks and reconstructed client-side. This is the only file a web server needs.
- **`source/`** — the **editable** source the bundle is packed from:
  - `BackOfficeLabs-Site-Throughput.html` — the page shell (loads React + Babel from CDN).
  - `directions/throughput-site.jsx` — shared components (nav, contact form, FAQ, hero visual).
  - `directions/throughput-site-page.jsx` — all page sections, copy, **and the case studies**.
  - `assets/` — founder photos (already embedded as data-URIs; kept for reference).
- **`build.py`** — re-packs the two editable JSX files back into `index.html`'s manifest.
- **`README.md`** — deploy + build notes.

**Editing `index.html` directly does nothing lasting — always edit `source/` and re-pack.**

## Case studies (the part we're actively working on)

The "The work" section and its detail pages are **data-driven** from the `proof` array near the
top of `source/directions/throughput-site-page.jsx`. Each entry powers:

- a **card** in the "The work" section (sector tag, website link, headline-metrics strip, chips,
  optional one-line testimonial, "Read the case study" button), and
- a **dedicated detail page** at `index.html#/work/<slug>` (in-app hash route — keeps the
  single-file deploy). Rendered by the `TsCaseStudy` component in the same file.

Per-study fields: `slug, client, sub, sector, url, urlLabel, confidential, result, chips,
quote, quoteAttr, metrics, meta, detail{ headline, intro, sections[], table, takeaway }`.
`quote`/`quoteAttr` are testimonial slots — leave `null` until a **real** quote is supplied
(never fabricate client testimonials). Current studies: Command Center (confidential coaching
business), ivee, Lumina, Curo Travel.

---

## How to make a change

1. Edit the relevant file in `source/` (usually `source/directions/throughput-site-page.jsx`).
2. Re-pack the bundle:  `python3 build.py`
3. Preview locally (needs internet — React/Babel load from a CDN):
   `python3 -m http.server 8765` then open `http://localhost:8765/index.html`.
   Test the case-study routes too, e.g. `.../index.html#/work/curo-travel`.
4. Commit and push (see rules below).

Optional sanity check that the JSX still compiles (catches syntax errors before shipping):
transform `source/directions/*.jsx` with `@babel/preset-react`.

---

## Git & deployment workflow — IMPORTANT

**All content work happens on the `content-updates` branch. `main` is frozen for now.**

- **Commit and push every change to `content-updates` only.** After editing source and running
  `build.py`, commit (source + regenerated `index.html` together) and `git push` to
  `origin/content-updates`.
- **Do NOT touch `main`.** Do not commit to it, merge/rebase into it, push it, or open a pull
  request against it — **unless the user explicitly asks in that moment.** "Keep it updated on
  the branch" means push to `content-updates`, nothing else.
- Do not `git push` with flags that could affect other refs; push the current branch only.
- `.DS_Store` and other macOS cruft are git-ignored — keep it that way.

**Deployment note:** GitHub Pages serves the site from **`main`**. So changes on
`content-updates` are **staged, not live** — they only go live when someone deliberately merges
to `main` later. That merge is the user's call and is out of scope until they say so.

---

## Still pending (content the user will supply later)

- **Testimonials** — one real one-line quote + attribution per client (Command Center's must
  stay anonymous). Drop into `quote`/`quoteAttr`.
- **Images** — client logos / hero screenshots, to be embedded as data-URIs (like the founder
  photos). Wire into the card and/or detail page.

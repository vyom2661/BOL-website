# CLAUDE.md — BackOfficeLabs Website

Project context and working rules for Claude Code. Read this before making changes.

*Last verified against the repo: 2026-07-27.*

---

## What this is

This repo is the **marketing website for BackOfficeLabs** (`vyom2661/BOL-website`). It's a
static marketing site that sells BackOfficeLabs' services and shows proof of work.

**BackOfficeLabs** builds AI-delivered systems for founder-led businesses, on a fixed price,
in weeks rather than months. The v2 offer is: **AI Opportunity Audit → fixed-price build →
documented handover** (you own the system; an optional monthly retainer is offered only at
handover). Two delivery tracks:

- **Run it on AI** — one live, self-verifying operating picture and the systems that act on it
  (CRM & pipeline builds, the flagship "Command Center" ops system).
- **Grow it with AI** — get found by search engines and AI assistants fast (SEO foundation,
  AI-SEO site rebuilds, programmatic content engines).

Run by two founders (Vyom, Saher); London + India. Contact: `hello@backofficelabs.io`.
Visual theme is **"Throughput"** — Space Grotesk, cream paper, black borders, tangerine/green
accents, hard offset shadows.

The home page sections: hero → problem → what we build (tracks) → the audit → how we work →
why this works → **the work (case study cards)** → founders → FAQ → contact.

**Domain: `backofficelabs.io`.** The site moved off `backofficelabs.ai` on 2026-07-27. There
should be **zero** `backofficelabs.ai` references anywhere in the deployed HTML — check
`og:url` tags and `mailto:` links if you add or copy a page.

---

## Repo layout

This is a **multi-page static site**. Plain HTML, one shared stylesheet, **zero JavaScript**
(mobile menu = checkbox hack, FAQ = `<details>/<summary>`, contact form posts via `mailto:`).
Every page renders with JavaScript disabled.

- **`index.html`** — the home page. Literal HTML, no `<script>`, no inline `<style>` block;
  it links out to the shared stylesheet.
- **`styles.css`** — the **shared stylesheet for every page** (~24KB). Home page loads it as
  `href="styles.css"`; case study pages load it as `href="../../styles.css"`. Style changes
  belong here, not in the HTML.
- **`case-studies/<slug>/index.html`** — five standalone case study pages:
  `command-center`, `predictionhero`, `ivee`, `lumina`, `curo-travel`.
- **`workflows/deploy.yml`** — a Hostinger FTP deploy action. **Currently inert** — see
  Deployment below before trusting it.
- **`source/`** — **LEGACY.** The old React/Babel source the previous bundled build was packed
  from. Kept for reference only (copy history, founder photos in `assets/`). Not deployed.
- **`build.py`** — **LEGACY. Do NOT run it.** It regenerates the old React bundle from
  `source/` and would overwrite the current static `index.html`.
- **`README.md`** — deploy notes.

**Edit the HTML files directly — they are the site.** There is no build step.

## Case studies

Each of the five case studies appears in **two separate files**, and both must be kept in sync:

- a **card** in the "The work" section of `index.html` (`<section id="work">`), whose
  "Read the case study" button links to `case-studies/<slug>/`, and
- the **standalone page** at `case-studies/<slug>/index.html`.

Note for anyone working from older instructions: the case studies are **no longer inline
`<article id="work-…">` blocks inside `index.html`**. They were split into their own pages in
the 2026-07-24 rebuild. Editing only the card leaves the real page stale, and vice versa.

When adding a new case study page, copy an existing one and update: `<title>`, the `og:`/meta
tags (including `og:url`, which must be `https://backofficelabs.io/case-studies/<slug>/`), the
`../../styles.css` link, the body content, and the footer contact links.

**Testimonial quotes are real client quotes — never fabricate or edit a client testimonial**
without the user supplying the new wording. Four are live and attributed (PredictionHero,
ivee, Lumina, Curo Travel). **Command Center's client is confidential and must stay
anonymous — it has no attributed quote, and that is deliberate.**

---

## How to make a change

1. Edit the relevant `.html` file directly; put styling in `styles.css`.
2. Preview locally: open the file in a browser (no server or internet needed).
3. Keep the constraints: **no `<script>` tags**, no CDN or external/web-font requests, no
   base64-encoded media payloads; all content as literal HTML. The only external asset a page
   may reference is the local `styles.css`.
4. If the change touches a case study, update **both** the card in `index.html` and the
   standalone page.
5. Commit and push (see rules below).

---

## Git & deployment workflow — IMPORTANT

**All content work happens on the `content-updates` branch.**

- **Commit and push every change to `content-updates`.**
- **Do NOT touch `main`.** Do not commit to it, merge/rebase into it, push it, or open a pull
  request against it — **unless the user explicitly asks in that moment.** "Keep it updated on
  the branch" means push to `content-updates`, nothing else.
- Do not `git push` with flags that could affect other refs; push the current branch only.
- `.DS_Store` and other macOS cruft are git-ignored — keep it that way.

**Deployment: GitHub Pages, from `main`.** Pushing to `main` triggers the
`pages-build-deployment` run and the change goes **live**. So merging `content-updates` into
`main` is a publish action, not a staging step — treat it as outward-facing and confirm before
doing it.

**⚠️ Known issue — the Hostinger deploy is inert.** `workflows/deploy.yml` defines a Hostinger
FTP deploy, but GitHub Actions only reads workflows from **`.github/workflows/`**, and this
repo has no `.github/` directory. The workflow has **never run**. It fails silently and
invisibly, because Pages keeps deploying and the site keeps updating regardless. If Hostinger
is meant to be a live target, the file has to move to `.github/workflows/deploy.yml` — and
someone should decide whether both Pages and Hostinger should serve the site at once.

---

## Still pending (content the user will supply later)

- **Images** — client logos / hero screenshots. The site currently has **no `<img>` tags at
  all**; the only embedded image is the SVG favicon data-URI, and the founder cards use letter
  marks (`S`, `V`) rather than photos. Founder photos exist unused at `source/assets/`.
- **Contact form delivery** — the form posts via `mailto:`, which depends on the visitor having
  a mail client configured. Consider a hosted form endpoint before relying on it for leads.

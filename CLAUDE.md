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

- **`index.html`** — the deployable site AND the editable source. A **single plain static HTML
  file**: all content is literal HTML, all CSS is in one `<style>` tag in `<head>`, and there is
  **zero JavaScript** (mobile menu = checkbox hack, FAQ = `<details>/<summary>`, contact form
  posts via `mailto:`). The full page renders with JavaScript disabled. This is the only file a
  web server needs.
- **`source/`** — **LEGACY.** The old React/Babel source the previous bundled build was packed
  from. Kept for reference only (copy history, founder photos in `assets/`).
- **`build.py`** — **LEGACY. Do NOT run it.** It regenerates the old React bundle from `source/`
  and would overwrite the static `index.html`.
- **`README.md`** — deploy + build notes.

**Edit `index.html` directly — it is the site.**

## Case studies

Each of the five case studies (Command Center, PredictionHero, ivee, Lumina, Curo Travel)
appears twice in `index.html`, and both places must be kept in sync when editing:

- a **card** in the "The work" section (`<section id="work">`), and
- a **full inline detail page** (`<article id="work-<slug>" class="cs">`) further down the page,
  linked from the card's "Read the case study" button.

Testimonial quotes are real client quotes — **never fabricate or edit client testimonials**
without the user supplying the new wording. Command Center's client must stay anonymous.

---

## How to make a change

1. Edit `index.html` directly.
2. Preview locally: open the file in a browser (no server or internet needed).
3. Keep the constraints: no `<script>` tags, no external stylesheets/CDN/web fonts, no
   base64-encoded payloads; all content as literal HTML; CSS only in the single `<style>` block.
4. Commit and push (see rules below).

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

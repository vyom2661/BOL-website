# BackOfficeLabs — Website

Marketing site for BackOfficeLabs (v2 offer: AI Opportunity Audit → fixed-price builds). Current visual theme: **Throughput** (cream paper, black borders, tangerine/green accents, hard offset shadows).

## Files

- **`index.html`** — the deployable site and the editable source. A single plain static HTML file: all content is literal HTML, CSS lives in one `<style>` tag, and there is **zero JavaScript** — the full page renders with JS disabled. The five case studies are inline sections (`#work-<slug>`) linked from the "The work" cards.
- **`source/`** — legacy React/Babel source from the previous bundled build. Reference only.
- **`build.py`** — legacy. **Do not run it** — it would overwrite `index.html` with the old React bundle.

## Deploying

Any static host works — upload `index.html` and you're done.

**GitHub Pages:** Settings → Pages → Deploy from branch → `main` / root. The site will be served at `https://<user>.github.io/<repo>/`.

## Editing

Edit `index.html` directly and preview by opening it in a browser (no server or internet needed). Keep it static: no scripts, no external stylesheets or web fonts, no base64 payloads.

## Notes

- The contact form posts to `mailto:hello@backofficelabs.ai` (opens the visitor's email client). Wire it to a booking tool or form endpoint before relying on it for leads.
- Headings use Space Grotesk only if the visitor has it installed; otherwise the Helvetica/Arial fallback stack. Embedding the font would require a base64 data-URI or an external font file — both were deliberately excluded.

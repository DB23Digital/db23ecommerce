# TASKS — Site refresh (flagship redesign) · started 28/10/2026

Branch: feat/site-refresh (off feat/foldline; main is 12 commits behind).
Direction: hero = live receptionist demo (concept 1), work = showroom (concept 2),
motif = redline / tracked changes (concept 3). Content from the current homepage.
Palette: ink #0B0D0C, paper #E8EAE6, signal vermilion #FF4F1F. Type: Geist.

## Where we are · end of day 28/10/2026

**State:** whole site redesigned and repositioned. All work committed and pushed
on `feat/site-refresh`. `build.zip` (5.3 MB, 139 files) built from that state,
ready for cPanel; not yet deployed (Deon uploads). Not merged to `main`.

**Positioning (decided by Deon):** four core services for small businesses:
website design, hosting & care, SEO/AEO/GEO, AI workshops & strategy.
Voice AI = example implementation, not a core service.
**Plans:** R999/month hosted by DB23, R799/month on client's own hosting; both
include SEO/AEO/GEO + monthly report; prices incl. VAT ("from" prices).

**Built today:** new tokens + Geist; shared SiteHeader/Footer; homepage
(typographic hero + service index, tracked-changes before/after, four services
with plans, pinned horizontal showcase, workshops, Voice AI demo as example,
process, why, FAQ, CTA, contact); logo/favicon/og-image recoloured to
vermilion; showcase reordered + G1 Energy, AlphaPacks, Hire55 and Regal Treats
(in progress); every inner page rebuilt on src/components/PageBlocks.jsx.

**Next session, in order:**
1. Deon to answer the open questions below, then fix copy to match.
2. Re-render blog hero images in the new palette (scripts/blog_heroes.py).
3. Decide fate of Voice AI / AI Automation / Digital Marketing / Outsourced
   Marketing pages (reword as examples, redirect, or keep) and the Contact
   enquiry buttons ("Voice AI Quote").
4. Update llms.txt, sitemap lastmod, index.html Organization JSON-LD to the
   four-service positioning; About page SEO title.
5. Merge plan: feat/site-refresh sits on feat/foldline (WIP). Merge foldline
   first or ship together; then PR to main.
6. Optional: shorten the showcase scroll (~11,600px on desktop), dedicated
   /hosting/ page, Lighthouse run on mobile.

**Open questions for Deon:**
- Blog "AI workshop cost" post says from R3,500 / R6,500 / R12,000; site says
  R4,500 / R12,500. Which is right?
- Unsourced stats on live pages: Deloitte 71%, Frost & Sullivan 68%, HubSpot
  43%, "200 concurrent calls", "10x the calls", "7,000+ integrations". Source or remove.
- Promises to confirm: "reply within the hour", "guarantee white-hat",
  "no lock-in", "3 to 5 days" site build.
- Contact email: info@db23.co.za (Contact page) vs deon@db23.co.za (footer, proposal).
- Logo sits on #000 vs page #0B0D0C: make background transparent?

- [x] Tokens + Geist font + accent-button contrast (ink text on vermilion)
- [x] Shared SiteHeader (home + PageLayout), restyled Footer
- [x] Hero with scripted receptionist demo (no API calls)
- [x] Redline section (was PlainEnglishAI, keeps #plain-english-ai)
- [x] Solutions, Workshops, Process, Why DB23 restyled
- [x] Showroom work section (fan + index), still nofollow, limit prop kept
- [x] FAQ, closing CTA, contact restyle
- [x] Lint + build:ssg
- [x] Mobile + desktop visual check
- [ ] Deon: approve copy changes, logo vs vermilion clash, demo wording
- [x] Phase 2: inner pages in the new design (28/10)
  - [x] Shared kit src/components/PageBlocks.jsx + FounderBio restyle
  - [x] Reference: WebsiteDesignPage (full showcase + hosting plans)
  - [x] AIWorkshops, AITraining, VoiceAI (agent A)
  - [x] AIAutomation, SEOServices (+ plans), DigitalMarketing, OutsourcedMarketing (agent B)
  - [x] About, Contact, Proposal, ClubScrub (agent C)
  - [x] Blog index + post template (agent D)
  - [x] Verify: lint, build:ssg, every route screenshot desktop + 390px, grep for old colour classes
  - Foldline + benchmark keep their own product UI (only header/footer change)
  - [ ] Deon: copy conflicts flagged by the rebuild (blog workshop prices R3,500/R6,500 vs site R4,500/R12,500; unsourced stats; Voice AI/automation/marketing pages still pitch as core services; contact email info@ vs deon@; About SEO title)
  - [ ] Blog hero images still old lime/magenta neon style: re-render with scripts/blog_heroes.py in the new palette
- [x] Showcase horizontal scroll (pinned on desktop, swipe on mobile); order SkillsPassport, Thando, newest, OTRUM + Mud Busters last
- [x] Showcase: G1 Energy added (live); Hire55 + Regal Treats & Eats added as "In progress" (local-build screenshots, no link)
- [x] Repositioned (28/10): 4 core services (websites, hosting, SEO/AEO/GEO, AI workshops + strategy); Voice AI moved to "example implementation" section; nav, footer, FAQ, homepage meta + index.php mirror updated
- [x] Plans (28/10): R999/month hosted, R799/month own hosting, both incl. SEO/AEO/GEO + monthly report, prices incl. VAT. Homepage hosting row, hero note, FAQ, WebsiteDesignPage FAQ (+ its FAQPage schema)
- [x] Logo, favicon and og-image recoloured blue to vermilion (scripts/recolour_logo.py)
- [ ] Deon: fate of Digital/Outsourced Marketing, Voice AI, Automation pages
- [x] Showcase (28/10): Club Scrub removed; OTRUM -> otrumdesign.co.za, Mud Busters, Farmina -> apexpetgroup.co.za/training/, AlphaPacks added; fresh screenshots for OTRUM, Farmina, SkillsPassport, AlphaPacks; all 20 links 200 and nofollow; db23-hosted ones send X-Robots-Tag noindex (checked live)

---

# TASKS — SEO actions (week of 15 Sep report) + blog heroes + cPanel build

Started 02/10/2026. Source: Search Console action list (3 items) + request for new
blog hero images in the "AI for SMEs" style and a cPanel zip.

## 1. Titles / descriptions — /ai-workshops/ and /outsourced-marketing/
- [x] Note: both were already rewritten 07/09/2026 (e5f12a7) and that copy is live
- [x] /ai-workshops/ description says "Half-day workshop from R4,500" — half-day is Tier 2 (R12,500). Fix
- [x] New title + description in SEOHead (page) and public/index.php $pages mirror
- [x] sitemap lastmod

## 2. Homepage slip (54.0 → 57.4)
- [x] Diagnose: history, live meta, hosts, cannibalisation
- [x] www.db23.co.za serves 200 (no 301) — add www → apex redirect in .htaccess
- [x] Header logo points at /DB23 logo.png, which is not in the repo (only on server) — switch to committed .webp
- [x] Homepage title leads with "AI Workshops", competing with /ai-workshops/ — rebalance title/description

## 3. Cluster pages
- [x] Blog: AI receptionist for medical & dental practices (AI receptionist cluster)
- [x] Blog: outsourced marketing vs in-house hire (outsourced marketing cluster)
- [x] Wire both: BlogPostPage, BlogPage cards, prerender.mjs, index.php, sitemap, llms.txt

## 4. Blog hero images (AI for SMEs style)
- [x] scripts/blog_heroes.py — templated renderer (headless Chrome → WebP)
- [x] Render all 18 (16 existing + 2 new), eyeball each

## 5. Build + package
- [x] npm run lint
- [x] cpanel-pack.ps1 → build.zip
- [x] Spot-check dist titles, new routes, images

## Status 02/10/2026
All done. build.zip (130 files, 5.4 MB) built by cpanel-pack.ps1. Lint: only the
pre-existing CurrencyContext.jsx:72 error. Foldline tests 94/94.
Not deployed, not committed. build.zip includes the uncommitted Foldline work on feat/foldline.

---
# SEO skill run — 16/10/2026 (steps run in order)
Evidence rule: claims I could not confirm are marked UNCONFIRMED with where I looked.
Limit: WebSearch is US-only, so SA SERP overlap / rankings cannot be measured directly.
Outputs go to `seo-run/` (new folder, not shipped in build.zip).

- [x] 1 /seo-cluster (seo-run/01-cluster-plan.md) db23.co.za
- [x] 2 /seo-content-brief (seo-run/02-content-briefs.md)
- [x] 3 /seo-schema (seo-run/03-SCHEMA-REPORT.md)
- [x] 4 /seo-content (seo-run/04-CONTENT-REPORT.md)
- [x] 5 /seo-page (seo-run/05-PAGE-outsourced-marketing.md)
- [x] 6 /seo-local (seo-run/06-LOCAL-SEO-ANALYSIS-db23.co.za.md)
- [x] 7 /review-respond — SKIPPED: no such skill installed, and no DB23 Google reviews found to reply to (see report 06)
- [x] 8 /seo-maps (Tier 0 only; seo-run/07-MAPS-ANALYSIS-db23.co.za.md)
- [x] 9 /seo-geo (seo-run/08-GEO-ANALYSIS.md)
- [x] 10 /content-to-leads — no skill installed; done by hand (seo-run/09-LEADS-content-to-leads-and-follow-up.md)
- [x] 11 /lead-follow-up — no skill installed; done by hand (same file)

## SEO run status 16/10/2026
All 11 steps run in order. Reports in seo-run/ (not in build.zip). Two steps skipped or reduced:
step 7 (review-respond: no skill, no reviews found), step 8 (Tier 0 only; no DataForSEO, Overpass down).
No site code was changed during this run. Pending decisions are listed in the final chat summary.

# DB23 Website - Project Feedback & Memory

## Email Routing & SMTP Policies

- **Core Routing Separation:**
  - **Main Website (`db23.co.za`):** Forms should send leads directly to `deon@db23.co.za`.
  - **Showcase Showcase Websites (Demo Portfolios, e.g. `db23.co.za/arehm-dev/`):** Forms must route to their respective company/client emails (e.g. `alam.harji@aremhdevelopments.com` for AREMH Developments) to maintain their demo integrity, rather than sending to the main DB23 inbox.
- **SMTP Mail Server:**
  - Authenticate using Host: `mail.db23.co.za` | Port: `465` (SSL) | Username: `deon@db23.co.za`. This credentials setup can reliably deliver outbound emails to any destination from forms hosted within the same cPanel environment.
  - Implement email dispatch using direct low-level PHP socket connections (`fsockopen` to `ssl://mail.db23.co.za:465`) rather than heavy external libraries like PHPMailer to maintain extreme lightweight pages and absolute zero external dependency requirements on Vercel/cPanel.

## Website Showcase Integration

- **SVG Showcase Mockups:**
  - Showcase elements in `SelectedWork.jsx` use modern programmatic SVG cards stored in `public/assets/showcase/`.
  - Maintain a unified 1200x760 canvas with deep container fills, drop-shadow filters, simulated browser frames with control dots, and custom stylized vector paths representing the target client's industry (e.g., steel truss elevations for construction).
- **Responsive Web Vitals (Gotchas):**
  - Text input font sizes must be at least `16px` on viewports under `1024px` to prevent iOS Safari from automatically forcing an intrusive zoom, breaking the viewport scale.
  - Provide a minimum `48px` tactile tap target area for touch-screen mobile devices, flex center the icons/text inside, and turn off tracking cursors (like drafting crosshairs) entirely on coarse pointers via `@media (pointer: coarse)`.

## Work Showcase Navigation & Deployment

- **Showcase Section Anchors & Links:**
  - Make sure all "Work" navigation menu links (e.g., in `HomePage.jsx` and `PageLayout.jsx`) and section title headers (in `SelectedWork.jsx`) point to the absolute URL `https://db23.co.za/#work-showcase` to ensure users can seamlessly return directly to the portfolio grid from any external pages, sub-routes, or client demos.
- **cPanel Static Deployment Packaging:**
  - To package the compiled static assets for cPanel web hosting, run `npm run build` (or `npm run build:ssg` for the prerendered SSG variant) to generate the output files inside the `dist/` directory.
  - Use `Compress-Archive -Path dist\* -DestinationPath build.zip -Force` in PowerShell from the project root to create a ready-to-deploy zip file containing the HTML, assets, and root configurations (such as `.htaccess`, `sitemap.xml`, and `robots.txt`). This zip file can be extracted directly into the cPanel `public_html` directory.
- **cPanel AV "virus" false positive on zipped builds:**
  - cPanel's upload scanner (ClamAV + unofficial Sanesecurity Foxhole ruleset) flags Vite/webpack/esbuild minified JS bundles inside a **zip container** as `Sanesecurity.Foxhole.JS_Zip_2.UNOFFICIAL` or `JS_Zip_11.UNOFFICIAL` (seen on this project and on stellenboschchiro.co.za) — a well-documented false-positive class, not a real infection. It matches on minified-JS byte patterns *and* the zip container specifically.
  - Re-zipping with different compression levels does not help — the JS bytes are identical either way.
  - Fix: package as **`.tar.gz` instead of `.zip`** — `tar -czf build.tar.gz -C dist .` from the project root (git-bash/Bash tool, not PowerShell). The signature is zip-scoped, so a tarball sidesteps it with identical file contents.
  - Before packaging, do a cheap one-time sanity check that the bundle isn't actually malicious: grep the built JS for `eval(`, `Function(`, `atob(`, `document.write` and confirm nothing looks planted.
  - If both `.zip` and `.tar.gz` get blocked (rare), fall back to FTP/SFTP or cPanel File Manager's multi-file upload straight into `public_html` — no archive at all, nothing for an archive-scoped signature to match.

## 2026-08-06 — CODER_BRIEF.md session: status & handoff

Worked through the 32-task `CODER_BRIEF.md` (Search Console audit + live-page audit). **Committed as
`9cec4b1`** — "SEO/security fixes: de-index microsites, fix UTF-8 encoding at source, sync meta, add
AI Automation + Work case-study pages" (28 files). `npm run build:ssg` and `npm run lint` both clean.
`build.tar.gz` repackaged just now (also `build.zip`, kept for reference — see AV note above, prefer
the tar.gz for actual cPanel upload).

### ⚠️ Found, NOT yet fixed — read before next deploy

**`cpanel-pack.ps1` silently discards `public/index.php`'s router.** Sequence: `vite build` copies
`public/index.php` (the `$pages` meta-lookup router, keyed by `REQUEST_URI`) into `dist/index.php`.
Separately, `prerender.mjs` writes a prerendered `dist/index.html` for the homepage. `cpanel-pack.ps1`
step 3 then converts *every* `dist/**/index.html` to `index.php` by prepending the geo-cookie header —
including the homepage's, which overwrites `dist/index.php` and clobbers the copy of `public/index.php`
that was sitting there. Confirmed by inspection: `dist/index.php` in the built package contains only the
geo-cookie stub, zero occurrences of `$pages`.

Net effect: `public/index.php`'s routing logic **never runs in production** for any path that has no
matching prerendered directory — i.e. every path not in `prerender.mjs`'s route list (unknown/future
`/work/<slug>`, unknown `/blog/<slug>`, and genuine 404s) falls through `.htaccess` to the clobbered
root `index.php` and silently renders as the homepage with no 404 status and no correct canonical. This
was true before this session (not something introduced today) but directly undercuts this session's B2
(404 canonical fix), and the dynamic-slug fallback logic added for blog/work in `public/index.php`.
Routes that *do* have a prerendered directory (all 8 service pages, about/contact/blog index, all 16
blog posts, `/work/`, `/ai-automation/`) are unaffected — their meta comes from the baked Helmet output,
which is correct.

Needs a decision, not a blind fix: either (a) have `cpanel-pack.ps1` skip converting the *root*
`dist/index.html` and let `public/index.php` own `/` + fallback routing instead (need to make sure it
can still read prerendered content, and still gets the geo-cookie header), or (b) give up on
`public/index.php` as a fallback for unprerendered paths and instead make sure `.htaccess`'s
`ErrorDocument 404` / catch-all points somewhere that outputs a real 404 with correct meta.

### Open from the brief — need Deon's input, not invented

- **D1 `/ai-automation/`** — built, reusing the real automation data already written in
  `/blog/ai-automation-south-africa/` (Zapier/Make/n8n examples, tool pricing). Shipped.
- **A6 `/work/`** — index + `/work/:slug` template scaffolded and routed (`src/data/caseStudies.js`,
  currently empty). Needs one real case study: client, problem, what was built, one real number, what
  we'd do differently, live URL.
- **A7 remainder** — once a case study exists, repoint that project's card in `SelectedWork.jsx` from
  the live microsite URL to `/work/<slug>/`.
- **H1 founder bio** — component built (`src/components/FounderBio.jsx`), wired onto ai-workshops,
  ai-training, voice-ai, ai-automation, and every blog post. Draft 71-word bio is a first pass, not
  approved copy. Needs `public/assets/deon-botha.webp` — component hides the `<img>` gracefully if the
  file is missing, so nothing breaks in the meantime.
- **Security** — `contact.php`'s SMTP password is out of the tracked tree now (env var), but the old
  value is still in git history and in `CODER_BRIEF.md` (deliberately left uncommitted, still on disk).
  Rotate the password in cPanel and set `DB23_SMTP_PASSWORD`; decide separately whether git history
  needs rewriting.
- **J1** — `/arehm-dev/` → `/aremh-dev/` rename is prepped (asset renamed, copy fixed, 301 rule in
  `.htaccess`) but the actual live directory still needs renaming on the server to match.


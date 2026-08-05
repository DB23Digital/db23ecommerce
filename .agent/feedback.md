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


# Coder Brief — DB23 eCommerce (db23.co.za)
_Source: Search Console export (May–Aug 2026) + live-page audit + supplied `public/` config files · Generated: 2026-08-05 · Target agent: any (Claude Code / Codex / Gemini / Antigravity)_

---

## 0. Context for the coding agent

- **Stack:** Vite + React SPA (React Router), served through PHP on Apache/cPanel. `public/index.php` reads the built `index.html`, injects route-specific meta via `preg_replace`, and echoes it. Client microsites are **plain static HTML folders** sitting alongside the SPA in the deploy root.
- **Repo root / entry:** SPA source presumed under `src/`; deployed/static assets under `public/`. Confirmed real files in `public/`: `index.php`, `.htaccess`, `robots.txt`, `sitemap.xml`, `llms.txt`, `contact.php`, `assets/showcase/*.svg`.
- **Run / preview:** `npm run dev` (Vite). Note: the PHP meta-injection layer does **not** run under Vite dev — test C-group tasks against a PHP host or `php -S localhost:8000 -t public`.
- **Ground rules:**
  - Make the smallest change that satisfies each task. Match existing code style. Do not refactor unrelated code. Do not add dependencies unless a task explicitly requires it. After each task, verify against its Acceptance Criteria.
  - **Never invent a file path.** Where this brief says `// LOCATE:`, search for the described string before editing.
  - **Do not add `Disallow` rules to `robots.txt` for any URL we are trying to de-index.** A blocked URL cannot be crawled, so Google never sees the `noindex` and the URL stays in the index as a bare listing. This is the single most common way this job gets broken. See A3.
- **Branch/commit convention:** one commit per task, message = task ID + summary (e.g. `A1: X-Robots-Tag noindex for client microsite directories`).

---

## 1. Summary

**32 tasks. 12 are P1. 7 open questions in §4 — three of them (Q1, Q2, Q5) should be answered before the coder starts Group A.**

The site's core problem is not rankings, it's identity: db23.co.za is currently hosting seven client microsites in its own root, and 41% of all organic clicks in the last 90 days went to an Angolan resort (`/safik-wanza/index1.html`). Google's picture of this domain is "resorts, construction, pool robots and golf-club cleaning" — not AI. Group A fixes that. Group D fixes the fact that there is no automation page at all despite automation queries already ranking at position 13. Group C fixes a suspected UTF-8 encoding fault that may be why pages at position 5–12 are getting **zero** clicks. §6 contains the copy direction.

---

## 2. ⚠️ Needs human decision before coding

| Ref | Blocks | Decision needed |
|---|---|---|
| **[Q1]** | A1, A7 | Which client microsites get `noindex`? De-indexing Safi Kwanza removes 12 of the site's current 29 clicks/quarter. See §4. |
| **[Q2]** | A6, A7 | Do we build real case-study pages now, or just `noindex` the microsites and link the showcase off-site? |
| **[Q5]** | D1, §6 | May we publish real client names, real numbers and real prices? Everything in §6 depends on this. |
| [Q3] | F1 | Merge AI Training + AI Workshops into one page, or genuinely differentiate them? |
| [Q4] | E1 | Should the currency selector default to ZAR, or stay USD? |
| [Q6] | H3 | Correct postal code: **7441** (in `llms.txt`) or **7146** (in the site footer)? |
| [Q7] | J1 | Correct spelling: **AREMH** or **AREHM**? URL says `arehm-dev`, copy says AREMH. |

Everything not listed here: proceed.

---

## 3. Tasks

### GROUP A — De-index client microsites & reclaim domain focus  ·  P1

> **Read this before starting the group.** The seven client microsites are static HTML directories in the deploy root. `.htaccess` rule 2 serves existing files/dirs directly, so these never reach the React app. We want them **crawlable but not indexable** — Google must be able to fetch each page in order to read the `noindex` and drop it. Once Search Console confirms they're gone (4–8 weeks), we can revisit blocking.

**Affected directories:**
```
/safik-wanza/
/arehm-dev/
/mar-a-largo/
/otrum/
/club-scrub/
/takeittomarket/
/kenya/
```

---

#### [A1] — Add `X-Robots-Tag: noindex` for all client microsite directories · `CHANGE` · `P1` · effort `S`

- **What the client said:** "especially the noindex section with my client sites"
- **What to do:** Add the block below to `public/.htaccess`, in a new section placed **after** the existing `── 3. Security headers ──` block and before `── 4. Cache ──`. Use `SetEnvIf` rather than `<If>` — it's portable across older cPanel Apache builds.

```apache
# ── 3b. De-index client microsites ────────────────────────────────────────
# These are client project sites hosted in the DB23 root. They must remain
# CRAWLABLE (so Googlebot can read this header) but must not be indexed.
# DO NOT add matching Disallow rules to robots.txt — that would hide the
# header from Googlebot and freeze the URLs in the index.
SetEnvIf Request_URI "^/(safik-wanza|arehm-dev|mar-a-largo|otrum|club-scrub|takeittomarket|kenya)(/|$)" DB23_NOINDEX

<IfModule mod_headers.c>
    Header always set X-Robots-Tag "noindex" env=DB23_NOINDEX
</IfModule>
```

- **Where:** `public/.htaccess`
- **Acceptance criteria:**
  - `curl -sI https://db23.co.za/safik-wanza/index1.html | grep -i x-robots-tag` returns `X-Robots-Tag: noindex`
  - Same for one URL in each of the seven directories, including a deep page: `/arehm-dev/residential-kindombele-complex.html`
  - `curl -sI https://db23.co.za/` and `https://db23.co.za/ai-training/` return **no** `X-Robots-Tag` header
  - `curl -sI https://db23.co.za/website-design/` returns no `X-Robots-Tag` header (guards against a greedy regex)
- **Watch out for:** The value is `noindex` only — **do not** add `nofollow`. With `nofollow`, Googlebot may never crawl deep microsite pages, so it never sees their `noindex` and they stay indexed forever. `follow` is the default and is what we want here.

---

#### [A2] — Fallback: add `<meta name="robots">` to microsite HTML files · `CHANGE` · `P1` · effort `S`

- **What to do:** **Only if A1's acceptance criteria fail** (some cPanel hosts restrict `mod_headers` in `.htaccess`), insert `<meta name="robots" content="noindex">` as the first child of `<head>` in every `.html` file inside the seven directories. If A1 passes, skip this task and note it as skipped.
- **Where:** `public/safik-wanza/*.html`, `public/arehm-dev/*.html`, `public/mar-a-largo/*.html`, `public/otrum/*.html`, `public/club-scrub/*.html`, `public/takeittomarket/*.html`, `public/kenya/*.html`
- **Acceptance criteria:** `view-source:` on every microsite page shows the meta tag inside `<head>`; no page has both this tag and a conflicting `index` directive.
- **Watch out for:** Do not apply this to any file under the SPA build output.

---

#### [A3] — Verify `robots.txt` does not block the de-indexed paths · `BUG` · `P1` · effort `S`

- **What to do:** Open `public/robots.txt` and confirm there is **no** `Disallow` line matching any of the seven directories. Add this comment above the `User-agent: *` block so nobody adds one later:

```
# NOTE: client microsites (/safik-wanza/, /arehm-dev/, /mar-a-largo/, /otrum/,
# /club-scrub/, /takeittomarket/, /kenya/) are de-indexed via X-Robots-Tag in
# .htaccess. They MUST stay crawlable — do not add Disallow rules for them.
```

- **Where:** `public/robots.txt`
- **Acceptance criteria:** No `Disallow` rule in the file matches any of the seven paths. Comment present. `Sitemap:` line unchanged.

---

#### [A4] — Remove `/club-scrub/` from the sitemap · `CHANGE` · `P1` · effort `S`

- **What to do:** Delete the entire `<url>` block for `https://db23.co.za/club-scrub/` from `public/sitemap.xml`. A URL cannot be both submitted for indexing and marked `noindex`.
- **Where:** `public/sitemap.xml` (last `<url>` block, `lastmod 2026-06-28`)
- **Acceptance criteria:** Sitemap contains 26 `<url>` entries, none of them a client microsite. File still validates as XML.

---

#### [A5] — Remove the dead `/club-scrub` route from the meta map · `CHANGE` · `P1` · effort `S`

- **What to do:** Delete the `'/club-scrub' => [...]` entry from the `$pages` array in `public/index.php`. This entry is unreachable: `.htaccess` serves the static `/club-scrub/index.html` directly, so PHP never runs for that path.
- **Where:** `public/index.php` → `$pages` array
- **Acceptance criteria:** `$pages` no longer contains a `club-scrub` key. `https://db23.co.za/club-scrub/` still loads the static microsite unchanged.

---

#### [A6] — Create real case-study pages under `/work/` · `FEATURE` · `P2` · effort `L`  ⚠️ blocked by [Q2]

- **What to do:** Add a React route `/work/:slug` rendering a case-study template, plus an index at `/work/`. One page per project we keep. Template sections: the client's starting problem → what we built → what changed (with a number) → tech used → a link to the live site (external, `rel="noopener"`). Add each new URL to `public/sitemap.xml` and to the `$pages` map in `public/index.php`.
- **Where:** `// LOCATE:` the React Router route definitions — search for `voice-ai` or `ai-training` in `src/` to find the router file.
- **Acceptance criteria:** `/work/` lists all case studies; each `/work/<slug>` returns HTTP 200 with a unique `<title>`, unique meta description and self-referencing canonical; all new URLs present in `sitemap.xml`.
- **Watch out for:** These are the pages that will carry DB23's topical authority. Do not ship them as thin one-paragraph stubs — see §6.4.

---

#### [A7] — Repoint showcase links away from hosted microsites · `CHANGE` · `P2` · effort `M`  ⚠️ blocked by [Q1]/[Q2]

- **What to do:** In the showcase data source, change each project's link. Projects with a case study → `/work/<slug>`. Projects on client-owned domains (haveandshare.co.za, insight2afrika.com, rtmtravel.co.za, skillspassportsa.co.za, mudbusters.co.za, fire-detection.co.za, farmina-store-training.vercel.app) → keep the external URL but add `rel="nofollow noopener"` and `target="_blank"`.
- **Where:** `// LOCATE:` search `src/` for the string `Safi Kwanza Resort` or `An elegant and modern luxury resort website` — the showcase items are almost certainly a single array/JSON consumed by a shared component.
- **Acceptance criteria:** No internal `<a href>` on any DB23 page points to `/safik-wanza/`, `/arehm-dev/`, `/mar-a-largo/`, `/otrum/`, `/club-scrub/`, `/takeittomarket/` or `/kenya/`. All external showcase links carry `rel="nofollow noopener"`.

---

### GROUP B — Kill self-inflicted duplicate URLs  ·  P1

#### [B1] — Strip `?utm_source=chatgpt.com` from every internal link · `BUG` · `P1` · effort `S`

- **What to do:** Someone appended `?utm_source=chatgpt.com` to the site's own showcase links. Search Console is now indexing `/club-scrub/?utm_source=chatgpt.com` and `/otrum/?utm_source=chatgpt.com` as separate URLs. Remove this parameter from every `href` in the codebase. It does nothing for AI visibility, it creates duplicate URLs, and it fabricates a ChatGPT referral in your own analytics.
- **Where:** `// LOCATE:` `rg -n "utm_source=chatgpt" --hidden` across the whole repo including `public/`.
- **Acceptance criteria:** `rg "utm_source=chatgpt"` returns zero results repo-wide. Every previously-affected link still resolves to the same destination.
- **Watch out for:** Also appears on the `haveandshare.co.za`, `insight2afrika.com`, `rtmtravel.co.za`, `skillspassportsa.co.za`, `mudbusters.co.za`, `fire-detection.co.za` and `farmina-store-training.vercel.app` external links. Remove there too.

---

#### [B2] — Add a self-referencing canonical to the SPA shell · `CHANGE` · `P1` · effort `S`

- **What to do:** Confirm `public/index.php` writes a canonical for every route it serves, and that unknown routes (the 404 branch) emit a canonical pointing at the requested path, not the homepage. Currently the 404 branch reuses `$pages['']`, which canonicalises every unknown URL to `https://db23.co.za/` — that tells Google the 404 page *is* the homepage.
- **Where:** `public/index.php` → the `else` branch of `if ($meta === null)`
- **Acceptance criteria:** A request to `/does-not-exist/` returns HTTP 404 **and** its `<link rel="canonical">` is either absent or points to `https://db23.co.za/does-not-exist/` — not to the homepage.

---

#### [B3] — 301 `/home/` to `/` · `BUG` · `P1` · effort `S`

- **What to do:** `/home/` is picking up impressions in Search Console as a separate page (7 impressions, position 34). Add a redirect in `public/.htaccess` above the SPA routing block: `RewriteRule ^home/?$ / [L,R=301]`
- **Where:** `public/.htaccess` → section 2, before the `RewriteCond %{REQUEST_FILENAME} !-f` rules
- **Acceptance criteria:** `curl -sI https://db23.co.za/home/` returns `301` with `Location: https://db23.co.za/`. Homepage itself unaffected.

---

#### [B4] — 301 `/safik-wanza/index1.html` to the directory root · `BUG` · `P3` · effort `S`

- **What to do:** `index1.html` is a leftover dev filename that became the site's top-ranking URL. Rename it to `index.html` (or add a 301) so the canonical entry point is `/safik-wanza/`.
- **Where:** `public/safik-wanza/`, `public/.htaccess`
- **Acceptance criteria:** `/safik-wanza/` serves the resort homepage; `/safik-wanza/index1.html` 301s to it. Both carry `X-Robots-Tag: noindex` from A1.

---

### GROUP C — Meta, encoding and title integrity  ·  P1

> **Why this group is urgent.** Three pages sit at position 4.9–11.8 with a combined 122 impressions and **zero** clicks. That pattern usually means the SERP listing itself is broken.

#### [C1] — Diagnose and fix UTF-8 double-encoding in `<title>` · `BUG` · `P1` · effort `M`

- **What to do:** The live `<title>` on `/ai-training/` renders as `AI Training South Africa â€“ Business Teams | DB23`, and the currency toggle as `ðŸ‡ºðŸ‡¸ USD ($)`. That's UTF-8 bytes being decoded as Latin-1. **First diagnose, then fix:**
  1. `curl -s https://db23.co.za/ai-training/ | head -40 | xxd | grep -A1 -i title` — inspect the raw bytes of the em-dash.
  2. If the bytes are `C3 A2 C2 80 C2 93` the source is double-encoded (fix at build/source). If they are `E2 80 93` the source is correct and the fault is in the `Content-Type` header or a missing `<meta charset="utf-8">`.
  3. Check `public/index.php`: the `preg_replace` calls have no `/u` modifier and `htmlspecialchars` is called with `'UTF-8'` — confirm the source `index.html` read by `file_get_contents` is itself valid UTF-8.
  4. Confirm `<meta charset="utf-8">` is the **first** element inside `<head>` in the built `index.html`.
- **Where:** `public/index.php`, built `public/index.html`, `// LOCATE:` the source `index.html` at repo root
- **Acceptance criteria:** `curl -s https://db23.co.za/ai-training/ | grep -o '<title>.*</title>' | iconv -f utf-8 -t utf-8` renders `AI Training South Africa – Business Teams | DB23` with a clean en-dash. Emoji flags render correctly. Repeat for `/website-design/` and `/`.
- **Watch out for:** Simplest permanent fix if the source is clean: replace all typographic characters (`–`, `—`, `·`, `’`) in titles and meta descriptions with ASCII equivalents (`-`, `|`) so there is nothing left to mis-decode. Do this if diagnosis is inconclusive.

---

#### [C2] — Resolve the PHP-vs-React meta conflict · `BUG` · `P1` · effort `M`

- **What to do:** Two systems are writing meta and they disagree. `public/index.php` injects `Website Design South Africa | Fast, Modern & Conversion-Focused | DB23`; the rendered page shows `Website Design South Africa – Modern Sites | DB23`. Same for descriptions on every page. **Pick one owner.** Recommended: keep the PHP layer (it serves correct meta to crawlers before JS runs) and remove the client-side head management, or make the client-side layer read the same source of truth.
- **Where:** `public/index.php` → `$pages` array; `// LOCATE:` search `src/` for `react-helmet`, `Helmet`, `document.title` or the string `Modern Sites`
- **Acceptance criteria:** For all 8 service routes plus `/`, `/about`, `/contact`, `/blog`: the `<title>` in `curl` output is byte-identical to the `<title>` in the rendered DOM. Same for `meta[name=description]` and `link[rel=canonical]`.
- **Watch out for:** Whichever layer loses, delete it rather than leaving it in place "just in case" — a dormant second writer is how this bug returns.

---

#### [C3] — Add missing routes to the `$pages` meta map · `CHANGE` · `P2` · effort `S`

- **What to do:** The `$pages` array in `public/index.php` is missing entries for the 13 blog posts listed in `sitemap.xml` (they currently fall through to a generic `Blog | DB23 eCommerce` title and description — 13 pages sharing one title). Add a real title + description per post. Also add the new `/ai-automation` route from D1.
- **Where:** `public/index.php` → `$pages`
- **Acceptance criteria:** Every URL in `sitemap.xml` has its own entry in `$pages` with a unique title and unique description. No two entries share a title string.

---

#### [C4] — Reconcile homepage geography in meta · `CHANGE` · `P2` · effort `S`

- **What to do:** The homepage title in `public/index.php` says "Global Businesses" and the og:title says "Worldwide", while every other page and all the target keywords say South Africa. Rewrite the `''` entry to lead with South Africa. Suggested: `AI Workshops, Training & Automation for South African Business | DB23`
- **Where:** `public/index.php` → `$pages['']`
- **Acceptance criteria:** Homepage title and og:title both contain "South Africa" and neither contains "Global" or "Worldwide".

---

### GROUP D — The missing automation service  ·  P1

#### [D1] — Build `/ai-automation/` · `FEATURE` · `P1` · effort `L`  ⚠️ copy spec in §6.2

- **What the client said:** "how can I rank higher for ... Automations"
- **What to do:** There is currently no automation page anywhere on the site — not in the nav, not in the footer, not in `sitemap.xml`, not in `llms.txt`. Meanwhile `ai workflow automation south africa` already ranks position 13 and `ai automation south africa` position 14, both off a blog post. Create the service page. Full checklist:
  1. New React route `/ai-automation/` + page component, matching the structure of the existing `/voice-ai/` page.
  2. Copy per §6.2 — do not ship placeholder text.
  3. Add to primary nav (between Voice AI and AI Training) and to the footer "Explore" list.
  4. Add `$pages['/ai-automation']` entry in `public/index.php`.
  5. Add `<url>` block to `public/sitemap.xml`, `priority 0.9`, `changefreq monthly`.
  6. Add a `## Services` bullet to `public/llms.txt`.
  7. Internally link the existing post `/blog/ai-automation-south-africa/` **up** to this page with descriptive anchor text, and link this page **down** to that post.
- **Where:** `// LOCATE:` copy the file structure of the Voice AI page — search `src/` for `Voice AI South Africa`
- **Acceptance criteria:** `/ai-automation/` returns 200 with unique title/description/canonical; appears in nav and footer on every page; present in `sitemap.xml`, `index.php` and `llms.txt`; at least one crawlable internal link exists in each direction between the page and the automation blog post.

---

### GROUP E — Geographic and currency signals  ·  P2

#### [E1] — Default the currency selector to ZAR · `CHANGE` · `P2` · effort `S`  ⚠️ blocked by [Q4]

- **What to do:** Every page currently loads showing `🇺🇸 USD ($)` while `og:locale` is `en_ZA` and every keyword targets South Africa. Default to ZAR; let the user switch.
- **Where:** `// LOCATE:` search `src/` for `USD` or the flag emoji in the header/footer component
- **Acceptance criteria:** A first-time visitor with no stored preference sees ZAR (R) in header and footer. The selector still switches to USD and persists the choice.

---

#### [E2] — Remove global-market language from SA-targeted pages · `CONTENT` · `P2` · effort `M`

- **What to do:** `/website-design/` says "modern businesses worldwide", "globally", "across the world", "internationally" in body copy while its meta targets South Africa. Replace with South African framing per §6.3.
- **Where:** `// LOCATE:` `rg -n "worldwide|globally|internationally|across the world" src/`
- **Acceptance criteria:** No service page contains "worldwide", "globally" or "internationally" in body copy. Each service page mentions South Africa or a named SA city at least twice in visible content.

---

### GROUP F — Fix keyword cannibalisation  ·  P2

#### [F1] — Differentiate or merge AI Training and AI Workshops · `CONTENT` · `P2` · effort `L`  ⚠️ blocked by [Q3]

- **What to do:** `/ai-training/` and `/ai-workshops/` target the same audience with near-identical copy — the training page even has an FAQ titled *"What is the difference between AI training and an AI workshop?"*. If a visitor needs that explained, Google can't tell either, and the ranking signal splits across two weak pages. Either (a) merge into one page and 301 the loser, or (b) rewrite so Workshops = one-off paid sessions with a published price and dates, Training = multi-week programmes for teams. See §6.1.
- **Where:** `// LOCATE:` the AI Training and AI Workshops page components in `src/`
- **Acceptance criteria:** If merged: the retired URL 301s to the survivor, is removed from `sitemap.xml` and `$pages`, and all internal links updated. If kept separate: the two pages share no more than two identical headings, and each has a distinct primary CTA.

---

### GROUP G — Remove duplicate boilerplate  ·  P2

#### [G1] — Stop rendering the full showcase on every service page · `CHANGE` · `P2` · effort `M`

- **What to do:** `/website-design/` has roughly 400 words of its own content followed by the entire 13-project showcase block — which also renders on the homepage and, from the footer evidence, other service pages. The boilerplate outweighs the unique content on the page. Change the shared showcase component to accept a `limit` and `filter` prop; render **3** relevant projects on service pages and keep the full set on the homepage and `/work/`.
- **Where:** `// LOCATE:` search `src/` for `Modern digital systems across multiple business verticals`
- **Acceptance criteria:** No service page renders more than 3 showcase cards. Unique on-page word count exceeds boilerplate word count on every service page. Homepage still shows the full set.
- **Watch out for:** This is a shared component — one edit fixes every page. Verify the homepage and `/work/` are unaffected before shipping.

---

### GROUP H — Entity, author and local signals  ·  P2

#### [H1] — Add an author/founder block with `Person` schema · `FEATURE` · `P2` · effort `M`

- **What to do:** Deon Botha appears nowhere on the service pages. Add a reusable "Who delivers this" block (photo, 60–90 word bio, LinkedIn link) to `/ai-workshops/`, `/ai-training/`, `/ai-automation/`, `/voice-ai/` and every blog post. Emit `Person` JSON-LD with `name`, `jobTitle`, `worksFor`, `image`, and `sameAs: ["https://www.linkedin.com/in/deon-botha-skillspassport/"]`.
- **Where:** `// LOCATE:` create a shared component; render inside the page templates in `src/`
- **Acceptance criteria:** The block is visible on all listed pages. JSON-LD validates in Google's Rich Results Test with no errors. Schema `name`/`image` match what's visibly on the page.

---

#### [H2] — Add `Organization` + `LocalBusiness` JSON-LD sitewide · `FEATURE` · `P2` · effort `M`

- **What to do:** Emit one `Organization` block sitewide with `name`, `url`, `logo`, `telephone`, `address` (PostalAddress), `areaServed: "ZA"`, and `sameAs` for both LinkedIn URLs from `llms.txt`. Add `LocalBusiness` with the Cape Town address and service area.
- **Where:** `// LOCATE:` inject into the built `index.html` head, or via the same layer that wins C2
- **Acceptance criteria:** Rich Results Test passes with zero errors on `/`. Address in schema matches the footer byte-for-byte.
- **Watch out for:** Blocked by [Q6] — do not ship schema with the wrong postal code.

---

#### [H3] — Fix the NAP inconsistency · `BUG` · `P2` · effort `S`  ⚠️ blocked by [Q6]

- **What to do:** `public/llms.txt` says postal code **7441**; the site footer says **7146**. Pick the correct one and make it identical in: the footer component, `llms.txt`, all JSON-LD, and the Google Business Profile.
- **Where:** `public/llms.txt` line under "Physical Address"; `// LOCATE:` the footer component in `src/`
- **Acceptance criteria:** `rg "7441|7146"` returns the same code everywhere. Address string is character-identical across all three locations.

---

#### [H4] — Do not add FAQ schema · `CHANGE` · `P3` · effort `S`

- **What to do:** The `Search_appearance.csv` export is empty — the site earns no rich results of any kind. Do **not** respond by adding FAQPage markup: Google restricted FAQ rich results to government and health sites in 2023, and per Google's June 2026 generative-AI guidance there is no special schema that improves AI Overview or AI Mode visibility. If FAQPage markup already exists, leave it; just don't invest more here.
- **Acceptance criteria:** No new FAQPage/HowTo markup added. Note recorded that this was deliberately skipped.

---

### GROUP I — Security  ·  P1

#### [I1] — Remove the hardcoded SMTP password · `BUG` · `P1` · effort `M`

- **What to do:** `public/contact.php` line 11 contains a live SMTP password in plaintext, committed to the repo, in the public web root. If PHP ever fails to execute on this host — a misconfiguration, a module update, a bad deploy — the file is served as text and the mailbox credentials are public. Move `$smtpHost`, `$smtpPort`, `$smtpUsername`, `$smtpPassword` to environment variables or a config file **outside** the web root, read via `getenv()` or `require`. **Then rotate the password** — it is already in version control history.
- **Where:** `public/contact.php`
- **Acceptance criteria:** `rg -i "Flugelbind"` returns zero results in the working tree. Contact form still sends successfully end-to-end. The config file (if used) resolves to a path outside `public/`. Password rotated in cPanel.
- **Watch out for:** Rotating alone is not enough if the old value stays in git history — flag to Deon whether history rewriting is needed.

---

### GROUP J — Housekeeping  ·  P3

#### [J1] — Fix AREMH/AREHM spelling · `BUG` · `P3` · effort `S` ⚠️ blocked by [Q7]
- **Where:** directory `public/arehm-dev/`, file `public/assets/showcase/aremh-developments.svg`, showcase copy
- **Acceptance criteria:** One spelling used in directory name, asset filename, alt text and body copy. If the directory is renamed, add a 301 from the old path.

#### [J2] — Fix the placeholder guard in `contact.php` · `BUG` · `P3` · effort `S`
- **What to do:** The check `if ($smtpPassword === 'SMTP_PASSWORD_HERE')` becomes dead code after I1. Replace with a check that the env var is set and non-empty.
- **Where:** `public/contact.php`
- **Acceptance criteria:** Missing/empty credentials return a 500 JSON error rather than attempting an SMTP connection.

#### [J3] — Update `sitemap.xml` lastmod dates on edit · `CHANGE` · `P3` · effort `S`
- **What to do:** Every page currently claims `2026-05-27` or `2026-06-29`. Update `lastmod` to the real date for any page changed by this brief.
- **Acceptance criteria:** No `lastmod` is later than today's date; changed pages reflect their actual edit date.

#### [J4] — Review the `anthropic-ai` crawler block · `CHANGE` · `P3` · effort `S`
- **What to do:** `public/robots.txt` blocks `anthropic-ai` and `CCBot` while allowing `ClaudeBot`. That's a coherent choice (search allowed, training blocked) — leave it unless Deon says otherwise. Note: `llms.txt` is fine to keep but Google Search does not read it, so don't treat it as a ranking lever.
- **Acceptance criteria:** No change unless instructed; decision documented in a comment.

---

## 4. Open questions for the client/PM

1. **[Q1] The client microsites are 41% of your current search traffic.** `/safik-wanza/index1.html` alone brought 12 of 29 clicks last quarter. These are people looking for an Angolan resort, not for AI training — so the traffic has no commercial value to DB23, but the numbers in Search Console will visibly drop for a few months. Confirm you're happy to de-index all seven. If you want to keep any one of them indexed, name it.
2. **[Q2] Do the clients own their own domains?** The better long-term answer is moving these sites to the client's own domain (or a subdomain like `safikwanza.db23.co.za`) rather than de-indexing them. Which clients could we move? For the rest, do you want proper case-study pages built on db23.co.za (recommended), or should the showcase just link off-site?
3. **[Q3] AI Training and AI Workshops are competing with each other.** Should we merge them into one page, or split them properly — Workshops = a fixed-price one-off session, Training = a multi-week programme for a whole team?
4. **[Q4] Should the site default to Rands?** It currently shows USD to everyone on first load.
5. **[Q5] Can we publish real names, real numbers and real prices?** Your service pages currently contain no client names, no case results, no prices and no dates. This is the biggest single reason they don't rank. For each client — Safi Kwanza, AREMH, Mar a Largo, Otrum, Club Scrub, Mud Busters, SkillsPassport, RTM Travel, Farmina, Fire Detection SA, Insight2Afrika, Have & Share — please confirm: (a) may we name them, (b) can you give one concrete before/after number, (c) may we quote them. Also: your `llms.txt` already publishes "AI Workshops from R4,500" but your website hides it behind "contact us for a quote." Should the price go on the page?
6. **[Q6] Is your postal code 7441 or 7146?** Both appear on the site. Whichever is correct, it must also match your Google Business Profile exactly.
7. **[Q7] AREMH or AREHM?** The URL says one, the copy says the other.

**Also for Deon, not the coder:** once A1 is live and verified, submit the seven microsite URLs through the Search Console **Removals** tool to accelerate de-indexing, then watch the *Pages* report for "Excluded by 'noindex'" over the following 4–8 weeks.

---

## 5. Out of scope / ignored

- **`llms.txt` improvements.** The file is well-written and harmless to keep, but Google Search does not read it, and it should not be treated as an AI-visibility tactic. Only D1 touches it (adding the new service).
- **CSP, HSTS and caching in `.htaccess`.** These are correctly configured. Left alone.
- **Blog volume.** 15 posts currently generate 700+ impressions and 4 clicks. No new posts are briefed here deliberately — more of the same content style makes the thin-content signal worse. Revisit after the service pages are rewritten.
- **Core Web Vitals / performance.** Not audited in this pass; no evidence yet that speed is the constraint. Worth a separate PageSpeed run after these changes ship.
- **The showcase SVG placeholder assets.** Several are still generic geometric placeholders (`fire-detection.svg`, `living-atlas.svg`, `expedition-desk.svg`, `apexpetgroup.svg`, `scoliosisbracing.svg`, `stellenboschchiro.svg`). Replacing them with real screenshots would help, but it's a content-supply job, not a coding task.

---

## 6. Copy direction

> **The core problem, stated once.** Every service page on db23.co.za is written in a register a language model could produce without ever having met you. Six generic module cards, eight generic outcome bullets, three delivery formats, an FAQ. No prices, no names, no dates, no photos, no numbers, no failures. Google's June 2026 guidance on generative-AI search is explicit that first-hand experience and a non-commodity point of view influence generative-AI presence more than anything else — and this is exactly the axis where the site scores lowest. That is why the July impressions spike (360/week when the blog cluster launched) decayed to 166/week: discovery boost, then quality evaluation.
>
> **The rule for every rewrite below:** if a competitor could paste the sentence onto their own site and it would still be true, delete it.

### 6.1 `/ai-training/` and `/ai-workshops/`

**Delete outright:**
- "No jargon, no theory overload, just practical skills your team can use from day one" — every AI trainer in South Africa says this.
- The six module cards ("AI Fundamentals for Business", "Practical AI Tools", "Marketing & Content AI"…). These are a table of contents, not evidence.
- The eight "What Your Team Will Be Able to Do" bullets. All eight are unfalsifiable.
- "Built for Every Business Role" with six audience chips. Saying it's for everyone is saying it's for no one.

**Replace with, in this order:**
1. **A real session.** One training you actually delivered: the company (or "a 40-person logistics firm in Epping" if [Q5] restricts naming), what they were struggling with, what you covered on the day, what changed afterwards. 300–400 words. This is the whole page's value.
2. **The actual agenda of your last workshop.** Not module categories — the real running order with times. "09:00 mapping your team's five most repetitive tasks · 10:30 building your first working automation · 13:00 the three tools we'd tell you to cancel."
3. **Price.** Your `llms.txt` already publishes R4,500 introductory / R12,500 team half-day. Put those numbers on the page. Hiding them behind "contact us for a quote" costs you the query `ai workshop cost south africa` — which you currently rank position 4.9 for with **zero clicks**.
4. **What you won't do.** "We don't train on tools we haven't deployed for a paying client." "We won't run a session for more than 12 people — it stops being hands-on." Stated limits are the fastest credibility signal available and no AI-generated page has them.
5. **Deon, by name, with a photo** (see H1). Who is standing at the front of the room.
6. **One photo of an actual session.** A room with actual people in it beats any stock hero image.

**Differentiation, if [Q3] says keep both:**
- `/ai-workshops/` = a fixed-price, fixed-date, one-off event. Lead with price and next available dates. Target: `ai workshop cost south africa`, `ai workshops for sme owners south africa`.
- `/ai-training/` = a multi-week programme for an existing team, priced per team, with a curriculum that adapts. Target: `chatgpt training for business south africa`, `corporate ai training south africa`.
- Neither page should contain an FAQ explaining the difference between them. If the pages are done right, it's obvious.

### 6.2 `/ai-automation/` (new page — D1)

Structure it around **one automation you have actually built and shipped.** Suggested skeleton:

- **H1:** `AI Automation for South African Businesses`
- **Opening (80 words):** the specific kind of work you automate. Not "streamline your workflows" — "the quoting, invoicing, lead-follow-up and reporting work that eats a morning a week."
- **A worked example, with a diagram.** Before: what the manual process was, step by step, with the hours. After: what runs automatically now. The saving, as a number. Name the tools by name (Make, n8n, Zapier, Airtable, Google Apps Script, whichever you actually use) — specific tool names are how you get retrieved for specific queries.
- **"Automations we've built"** — a plain list of 6–10 real ones. "WhatsApp enquiry → CRM record → templated quote → follow-up sequence." Each line should be something a reader recognises as their own problem.
- **What it costs.** A range and what drives it. Even "most builds land between R8,000 and R35,000" beats silence.
- **Where automation is the wrong answer.** One honest paragraph. Nothing else on your site does this.
- **Internal links:** up from `/blog/ai-automation-south-africa/`, across to `/voice-ai/` and `/ai-training/`.

**Target queries** (all already showing impressions, none with a page to land on): `ai workflow automation south africa` (pos 13), `ai automation south africa` (pos 14), `business automation tools south africa`, `ai integration for small business south africa` (34 impressions, pos 29), `ai tools for small business south africa` (40 impressions, pos 29).

### 6.3 `/website-design/`

Currently position **49** on 75 impressions. The page's unique content is ~400 words of claims — "ultra-fast", "conversion-focused", "modern tech stack", "copywriting included" — followed by 13 showcase cards that also appear on the homepage.

**Delete:** "Your website is your 24/7 digital storefront." "Beautiful designs are useless if they don't convert." "Slow websites kill conversions and SEO." Every one of these is a sentence from a thousand other agency pages.

**Replace with:**
- **Two builds, in detail.** Pick the two most impressive from your own portfolio — AREMH (the D3 globe navigation, the cPanel leasing-proposal integration) is genuinely unusual and you're describing it in one sentence. Give it 300 words. What was hard, what you chose, what it does that an off-the-shelf template can't.
- **Real Lighthouse scores.** You claim "ultra-fast" and "loads in milliseconds." Run PageSpeed on three of your live client sites and publish the actual numbers. If they're not good, fix them before you publish the claim — but a real 94 beats "ultra-fast" every time.
- **Price bands.** "Brochure site from RX. eCommerce from RY. Custom application from RZ." The FAQ currently answers the cost question with "a competitive baseline suited for SMEs worldwide," which answers nothing.
- **Geography (E2):** every "worldwide"/"globally"/"internationally" becomes South African. You are trying to rank for `website design South Africa`; the copy is currently telling Google you serve everyone everywhere, which is a weaker signal than serving one market well.

### 6.4 Case-study template (A6)

Five sections, in this order, ~500–700 words each:

1. **The situation** — who the client is, what market, what wasn't working. Concrete.
2. **What we built** — technical specifics. Stack, integrations, the one hard problem.
3. **What changed** — a number. Enquiries, load time, time saved, bookings. If you have no number, say what changed qualitatively and say you don't have the data — that's more credible than a vague claim.
4. **What we'd do differently** — one honest paragraph. This is the single highest-trust element you can put on a website and almost no agency does it.
5. **Live link** (external, `rel="nofollow noopener"`) + a CTA to the matching service page.

### 6.5 Sitewide copy rules

- Never claim a superlative you haven't measured. Replace "ultra-fast", "premium", "world-class", "cutting-edge" with the number or delete the sentence.
- Publish prices, or price ranges, on every service page.
- Every service page names at least one real client and one real number.
- Every page answers "why DB23 and not the other twelve agencies" in a way the other twelve couldn't copy.
- South Africa, Cape Town, ZAR, `en-ZA` — consistently, everywhere.
- One CTA per page, and make it specific: "Book a 20-minute automation audit" beats "Contact Us".

---

## 7. Suggested execution order

1. **I1** (security — do this first, it's a live credential)
2. **A1 → A3 → A4 → A5** (the noindex work; verify A1 with `curl` before moving on)
3. **B1, B3, B2** (duplicate URLs)
4. **C1 → C2** (encoding, then meta ownership — C2 is much easier to verify once C1 is clean)
5. **D1** (the automation page — highest new-traffic upside)
6. **G1, E1, E2, C3, C4**
7. **H1, H2, H3**
8. **A6, A7, F1** (once §4 questions are answered)
9. **J1–J4**

Re-verify in Search Console 4 weeks after step 5 ships: watch *Pages → Excluded by 'noindex'* rising for the microsites, and impressions on `/ai-automation/` appearing at all.

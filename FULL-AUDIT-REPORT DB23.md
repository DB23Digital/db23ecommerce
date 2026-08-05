# FULL SEO AUDIT REPORT: db23.co.za
**Date**: 2026-06-27
**Auditor**: Claude SEO (claude-seo v1.9.8)
**Business**: DB23 eCommerce — AI Workshops, Training & Digital Services
**Market**: South Africa (ZA)
**Pages crawled**: 8 / 8

---

## SEO Health Score: 38 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|---------|
| Technical SEO | 22% | 30/100 | 6.6 |
| Content Quality | 23% | 40/100 | 9.2 |
| On-Page SEO | 20% | 18/100 | 3.6 |
| Schema / Structured Data | 10% | 70/100 | 7.0 |
| Performance (CWV) | 10% | 45/100 | 4.5 |
| AI Search Readiness | 10% | 40/100 | 4.0 |
| Images | 5% | 50/100 | 2.5 |
| **TOTAL** | **100%** | | **37.4 / 100** |

> **Verdict**: POOR. The site has a foundational architecture problem (React SPA without server-side rendering) that prevents Google from seeing any page-level content on the first request. All 7 service pages canonicalize to the homepage, effectively telling Google not to index them as separate entities. This is the primary driver of the low score and must be resolved before any other SEO work has meaningful impact.

---

## Executive Summary

### Business Context
DB23 eCommerce is a South African consultancy offering AI workshops, AI training, Voice AI implementation, digital marketing, website design, outsourced marketing, and SEO services. The site targets B2B clients across South Africa with a lean 8-page site.

### Top 5 Critical Issues

1. **React SPA with no Server-Side Rendering** — All 7 service pages serve an empty HTML shell (`<div id="root"></div>`). Google must execute a 612KB JavaScript bundle to see any content, creating indexation delays and rendering failures for some crawlers.

2. **All service page canonicals point to the homepage** — Every URL (`/ai-workshops/`, `/voice-ai/`, `/ai-training/`, etc.) has `<link rel="canonical" href="https://db23.co.za/">`. This explicitly instructs Google that these pages are duplicates of the homepage and should not be ranked separately. None of the 7 service pages can rank for their target keywords.

3. **Duplicate titles and meta descriptions site-wide** — All 8 pages share the identical title ("AI Workshops South Africa | DB23 – Train, Automate & Grow") and identical meta description. Google cannot differentiate pages in SERPs.

4. **Zero security headers** — Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, and Referrer-Policy are all absent. This creates security vulnerabilities (clickjacking, MIME sniffing, XSS) and is a negative trust signal.

5. **No backlink profile** — Common Crawl shows zero referring domains. The site has no external authority signals, making it extremely difficult to rank for competitive terms even if the on-page issues are fixed.

### Top 5 Quick Wins

1. Fix canonical tags on all service pages (1–2 hours of dev work)
2. Add unique `<title>` and `<meta name="description">` per page in the React router
3. Add security headers via `.htaccess` or server config (30 minutes)
4. Add `llms.txt` for AI crawler accessibility (1 hour)
5. Add `<link rel="preload">` for the JS bundle and enable Gzip/Brotli compression

---

## 1. Technical SEO — Score: 30/100

### 1.1 Site Architecture

| Check | Result | Status |
|-------|--------|--------|
| Framework | React SPA (Vite build) | CRITICAL |
| Server-Side Rendering | None | CRITICAL |
| HTTP → HTTPS redirect | 301 redirect active | PASS |
| www vs non-www | Serves on non-www | OK |
| robots.txt | `Allow: /` for all agents | PASS |
| Sitemap | Present at `/sitemap.xml` | PASS |
| Sitemap in robots.txt | Yes | PASS |
| Pages in sitemap | 8 | OK |
| Server | Apache | OK |

**Critical Finding**: The entire site is built as a React SPA using Vite. The server delivers an empty `<div id="root"></div>` to every URL. Content rendering requires executing `/assets/index-BAdN6n5Z.js` (612KB uncompressed). Googlebot can render JavaScript, but:
- Initial indexation is delayed (Google queues JS rendering separately from initial crawl)
- Budget crawlers (Bing, many AI crawlers) do not render JS
- Rendering failures are invisible to the site owner
- The existing canonical issue (see 1.2) compounds this to make individual pages unindexable

### 1.2 Canonicalisation — CRITICAL FAILURE

Every single URL on the site carries this canonical tag:
```html
<link rel="canonical" href="https://db23.co.za/" />
```

This affects all 8 pages including service pages that need their own authority:

| URL | Canonical Tag | Issue |
|-----|--------------|-------|
| `https://db23.co.za/` | `https://db23.co.za/` | Correct |
| `https://db23.co.za/ai-workshops/` | `https://db23.co.za/` | WRONG — signals duplicate |
| `https://db23.co.za/voice-ai/` | `https://db23.co.za/` | WRONG — signals duplicate |
| `https://db23.co.za/ai-training/` | `https://db23.co.za/` | WRONG — signals duplicate |
| `https://db23.co.za/digital-marketing/` | `https://db23.co.za/` | WRONG — signals duplicate |
| `https://db23.co.za/website-design/` | `https://db23.co.za/` | WRONG — signals duplicate |
| `https://db23.co.za/outsourced-marketing/` | `https://db23.co.za/` | WRONG — signals duplicate |
| `https://db23.co.za/seo-services/` | `https://db23.co.za/` | WRONG — signals duplicate |

**Root cause**: The canonical is hardcoded in the static HTML `<head>`, not dynamically set per route by the React app. Since the same HTML file serves all routes (SPA behaviour), all routes inherit the homepage canonical.

**Impact**: Google consolidates all ranking signals to the homepage. Service pages cannot rank individually. Keywords like "Voice AI South Africa" or "SEO services South Africa" will never rank because the pages targeting them are canonicalised away.

### 1.3 Duplicate Content — CRITICAL

All 8 URLs return **byte-for-byte identical HTML** (12,088 bytes each). From Google's perspective, these are 8 duplicate pages with the homepage as the canonical. The sitemap lists them as distinct pages but the canonical tags contradict this.

### 1.4 Crawlability

| Check | Result | Status |
|-------|--------|--------|
| robots.txt accessible | Yes | PASS |
| robots.txt blocks crawlers | No — all allowed | PASS |
| HTML content visible to crawlers | No — SPA shell only | FAIL |
| Googlebot rendering required | Yes (JS-dependent) | WARNING |
| Non-JS crawlers (Bing, AI bots) | See empty shell | FAIL |

### 1.5 Indexability

| Check | Result | Status |
|-------|--------|--------|
| Meta robots on homepage | `index, follow` | PASS |
| Meta robots on service pages | `index, follow` | PASS (but canonicals override) |
| Canonical (service pages) | All point to `/` | CRITICAL FAIL |
| noindex directives | None detected | PASS |

### 1.6 Security Headers — ALL MISSING

| Header | Status | Risk |
|--------|--------|------|
| Content-Security-Policy | MISSING | XSS vulnerability |
| X-Frame-Options | MISSING | Clickjacking vulnerability |
| X-Content-Type-Options | MISSING | MIME sniffing |
| Strict-Transport-Security (HSTS) | MISSING | Downgrade attacks |
| Referrer-Policy | MISSING | Data leakage |
| Permissions-Policy | MISSING | Feature abuse |
| Cache-Control | MISSING | No browser caching |

All security headers are absent. While HTTP → HTTPS redirect is active, without HSTS the browser must make an insecure HTTP request before being redirected on first visit.

### 1.7 URL Structure

The URL structure is clean and keyword-rich:
- `/ai-workshops/` — good
- `/voice-ai/` — good
- `/ai-training/` — good
- `/digital-marketing/` — good
- `/website-design/` — good
- `/outsourced-marketing/` — good
- `/seo-services/` — good

**No issues with URL structure** — the slugs are well-chosen. The problem is that these URLs never render distinct content to search engines.

---

## 2. Content Quality — Score: 40/100

> **Limitation**: All page content is JavaScript-rendered (React SPA). The assessment below is based on visible HTML (schemas, meta tags) and the content signals embedded in structured data. A full content audit requires rendering the JS bundle.

### 2.1 Content Architecture

The site covers 7 distinct service areas across 7 pages. This is appropriate. However:

- **Word count visible to crawlers**: ~535 words on every page (all JS shell text, mainly schema JSON)
- **Actual content**: Unknown without JS rendering
- **No blog or resource section** detected in sitemap
- **No pillar/cluster content architecture** identified

### 2.2 E-E-A-T Signals

| Signal | Present | Notes |
|--------|---------|-------|
| Author/team bios | Unknown | In JS |
| Case studies/results | Unknown | In JS |
| Client testimonials | Unknown | In JS |
| About page | Not in sitemap | Missing |
| Contact page | Not in sitemap | Missing |
| Privacy policy | Not in sitemap | Missing |
| Physical address | In schema only | Weak |
| Phone number | Unknown | In JS |
| LinkedIn/social links | In schema | Partial |
| Certifications | Unknown | In JS |

**Missing pages from sitemap**: No `/about/`, `/contact/`, `/blog/`, or `/privacy-policy/` pages found. These are trust-critical for E-E-A-T and Google's evaluation of business legitimacy.

### 2.3 Content Gaps

Based on the services offered and keyword targets, the following content is either absent or unverifiable:
- No blog/insights section (critical for authority building in AI consulting space)
- No case studies page
- No team/about page
- No FAQ page (FAQ schema exists but the FAQ page itself is not in the sitemap)
- No pricing page
- No testimonials/reviews page

### 2.4 Keyword Targeting

From the `<meta name="keywords">` tag and schema content, the site targets:
- AI workshops South Africa ✓
- AI training South Africa ✓
- Voice AI South Africa ✓
- Digital marketing services South Africa ✓
- Website design South Africa ✓
- Outsourced marketing South Africa ✓
- SEO services South Africa ✓
- AI automation South Africa ✓
- AI consulting South Africa ✓
- Business AI training Cape Town ✓ (local modifier)

These are solid keyword targets. However, without individual pages that Google can index independently, none of these will rank.

---

## 3. On-Page SEO — Score: 18/100

### 3.1 Title Tags — CRITICAL

| Page | Title | Length | Issue |
|------|-------|--------|-------|
| Homepage | "AI Workshops South Africa \| DB23 – Train, Automate & Grow" | 59 chars | Duplicate (but correct for this page) |
| /ai-workshops/ | "AI Workshops South Africa \| DB23 – Train, Automate & Grow" | 59 chars | DUPLICATE of homepage |
| /voice-ai/ | "AI Workshops South Africa \| DB23 – Train, Automate & Grow" | 59 chars | DUPLICATE — not about Voice AI |
| /ai-training/ | "AI Workshops South Africa \| DB23 – Train, Automate & Grow" | 59 chars | DUPLICATE |
| /digital-marketing/ | "AI Workshops South Africa \| DB23 – Train, Automate & Grow" | 59 chars | DUPLICATE |
| /website-design/ | "AI Workshops South Africa \| DB23 – Train, Automate & Grow" | 59 chars | DUPLICATE |
| /outsourced-marketing/ | "AI Workshops South Africa \| DB23 – Train, Automate & Grow" | 59 chars | DUPLICATE |
| /seo-services/ | "AI Workshops South Africa \| DB23 – Train, Automate & Grow" | 59 chars | DUPLICATE |

8 pages, 1 unique title. All service pages are using the homepage's title because it is hardcoded in the static HTML that serves all routes.

**Note**: The em dash (—) renders as garbled characters in the raw HTML due to encoding, though browsers likely render it correctly.

### 3.2 Meta Descriptions — CRITICAL

All 8 pages share the identical meta description (158 characters):
> "Practical AI workshops, AI training & Voice AI for SA businesses. Expert website design, digital marketing & outsourced marketing. Book your session today ✓"

- **Good**: The homepage description is well-written with a CTA
- **Bad**: Every service page uses the same description — Google may auto-generate descriptions instead, reducing click-through rates
- **Slightly long**: 158 chars (guideline is 150–155)

### 3.3 Heading Structure — NOT ASSESSABLE

No H1, H2, or H3 tags are present in the server-rendered HTML. All headings are generated by JavaScript. From a crawler perspective, the pages have zero heading hierarchy.

**Expected H1s per page**:
- Homepage: "AI Workshops South Africa" or similar
- /ai-workshops/: Something like "AI Workshops for South African Businesses"
- /voice-ai/: "Voice AI Solutions for SA Businesses"
- etc.

These likely exist in the React components but cannot be verified or indexed without rendering.

### 3.4 Internal Linking

Only 1 internal link detected per page in the server-rendered HTML (canonical link element — not a navigational link). All navigation menus and content links are JavaScript-rendered.

### 3.5 Open Graph / Social

| Tag | Status | Issue |
|-----|--------|-------|
| og:type | Present | |
| og:url | Hardcoded to `https://db23.co.za/` | Wrong for service pages |
| og:title | Present | 53 chars — good |
| og:description | Present | 147 chars — good |
| og:image | Present | `https://db23.co.za/og-image.png` |
| og:image:width | 1200 | Good |
| og:image:height | 630 | Good |
| og:image:alt | Present | Good |
| og:locale | `en_ZA` | Correct |
| twitter:card | `summary_large_image` | Good |
| twitter:site | `@db23ecommerce` | Good |

**Issue**: `og:url` is hardcoded to the homepage for all pages. When service pages are shared on social media, Facebook/LinkedIn will show the homepage URL and homepage OG data.

---

## 4. Schema / Structured Data — Score: 70/100

Schema is a strong point for this site. Three JSON-LD blocks are present on the homepage.

### 4.1 Organization Schema
```json
{
  "@type": "Organization",
  "name": "DB23 eCommerce",
  "url": "https://db23.co.za",
  "logo": "https://db23.co.za/logo.png",
  "description": "...",
  "sameAs": ["twitter", "linkedin", "instagram"],
  "hasOfferCatalog": { ... 11 services ... }
}
```
**Status**: Well-structured. Missing: `telephone`, `address`, `email`, `foundingDate`.

### 4.2 LocalBusiness Schema
```json
{
  "@type": "LocalBusiness",
  "areaServed": { "@type": "Country", "name": "South Africa" },
  "priceRange": "RR",
  "knowsAbout": [ 8 topics ],
  "sameAs": [ ... ]
}
```
**Status**: Present but incomplete. Missing: `address` (PostalAddress), `telephone`, `openingHours`, `geo` (latitude/longitude). Without a physical address, this cannot trigger Google's local pack features.

### 4.3 FAQPage Schema
8 Q&A pairs covering:
- Who the workshops are for
- Technical skills required
- Post-workshop pathway
- AI automation capabilities
- Website building
- Voice AI solutions
- Digital marketing services
- Outsourced marketing

**Status**: Well-structured and comprehensive. These Q&As are eligible for FAQ rich results in SERPs. This is a genuine strength.

### 4.4 Schema Gaps

| Schema Type | Status | Impact |
|-------------|--------|--------|
| Organization | Present | Good |
| LocalBusiness | Present (incomplete) | Medium |
| FAQPage | Present | Good |
| Service (per-page) | Absent | Missing — should be on each service page |
| WebSite (with SearchAction) | Absent | Low |
| BreadcrumbList | Absent | Medium |
| Person (team/authors) | Absent | E-E-A-T signal |
| Review / AggregateRating | Absent | Trust signal |

---

## 5. Performance — Score: 45/100

> **Note**: PageSpeed Insights API was rate-limited during this audit. Performance scores are estimated from available signals.

### 5.1 Core Web Vitals (Estimated)

| Metric | Estimate | Status |
|--------|----------|--------|
| LCP | Unknown — JS-dependent | At Risk |
| INP | Unknown — JS-dependent | At Risk |
| CLS | Unknown | Unknown |
| TTFB | ~0.3–0.5s (Apache) | OK |
| FCP | Delayed (JS required) | At Risk |

### 5.2 Performance Signals

| Check | Result | Impact |
|-------|--------|--------|
| HTML size | 12KB | GOOD |
| JavaScript bundle | 612KB uncompressed | HIGH — likely renders to ~180KB gzipped |
| Compression (Gzip/Brotli) | Not confirmed | Likely missing |
| Cache-Control headers | MISSING | No browser caching |
| Lazy loading | Unknown (in JS) | Unknown |
| Google Fonts | External (`fonts.googleapis.com`) | Render-blocking risk |
| Preconnect for fonts | Present | Good |
| CSS | 1 external bundle | OK |
| Images | Unknown (in JS) | Unknown |

### 5.3 Key Performance Issues

1. **612KB JS bundle**: Uncompressed bundle size. If Gzip/Brotli is not enabled, this blocks first render. Even compressed (~150–180KB), a React SPA has significant parse time.
2. **No Cache-Control**: Static assets should have `max-age=31536000` (1 year for hashed bundles). Without caching, repeat visitors re-download the full JS bundle.
3. **Google Fonts external dependency**: Even with `preconnect`, loading fonts from an external CDN adds DNS lookup + TCP handshake time to the critical path.
4. **No HTTP/2 Push or preload for main bundle**: The JS bundle (`index-BAdN6n5Z.js`) is not preloaded, meaning the browser must parse the HTML before discovering it.

---

## 6. AI Search Readiness — Score: 40/100

### 6.1 AI Crawler Access

| Check | Result | Status |
|-------|--------|--------|
| llms.txt | NOT FOUND | FAIL |
| robots.txt blocks AI crawlers | No | PASS |
| Content visible without JS | No | FAIL |
| Content citability | Low (JS-dependent) | FAIL |
| Passage-level clarity | Unknown | Unknown |

### 6.2 AI Crawler Assessment

**ChatGPT, Perplexity, Claude, Bing Copilot**: These AI systems either don't render JavaScript or have inconsistent JS rendering. When they crawl db23.co.za, they see an empty page with JSON-LD schema and meta tags only. The FAQ schema provides some citability for AI answers about DB23's services.

**Google AI Overviews**: Google can render the JS but still faces the canonical issue — all service pages appear as duplicates of the homepage.

### 6.3 Brand Mention Signals

Schema includes social links to Twitter, LinkedIn, and Instagram. No Wikipedia entry, no major publication citations, no authority backlinks to support brand entity recognition.

### 6.4 AI Search Opportunities

- **FAQ schema** is a direct AI citation opportunity — the 8 Q&As are structured for extraction by AI systems
- **Service descriptions in schema** are readable by AI crawlers even without JS rendering
- **LocalBusiness schema** helps with geo-specific AI queries

---

## 7. Images — Score: 50/100

> All images are loaded via JavaScript and not visible in server-rendered HTML.

### 7.1 Image Signals from Meta/Schema

| Asset | Location | Status |
|-------|----------|--------|
| `og-image.png` (1200×630) | OG + Twitter + Schema | Present — format OK |
| `logo.png` | Schema | Present |
| `favicon.png` | `/DB23%20favicon.png` | Present — space in filename! |

**Issue**: The favicon path contains a URL-encoded space: `/DB23%20favicon.png`. While this works, spaces in filenames are bad practice and can cause issues with some systems.

### 7.2 Image Audit Limitations

Cannot audit body content images, alt text, file sizes, or formats (WebP/AVIF) without JavaScript rendering. Visual audit via Playwright screenshot would be needed.

---

## 8. Backlinks & Authority — Score: 15/100

| Source | Result |
|--------|--------|
| Common Crawl referring domains | 0 |
| Moz DA/PA | Not available (no API key) |
| Bing Webmaster | Not available (no API key) |

**No external backlinks detected**. This is the expected state for a new or recently relaunched site, but it means:
- Zero domain authority
- No topical authority signals
- Cannot compete for any competitive keywords regardless of on-page quality
- Need to begin link acquisition immediately after fixing technical issues

---

## 9. Local SEO — Score: 35/100

| Check | Result | Status |
|-------|--------|--------|
| LocalBusiness schema | Present | PASS |
| Physical address in schema | MISSING | FAIL |
| Phone in schema | MISSING | FAIL |
| OpeningHours in schema | MISSING | FAIL |
| Geo coordinates | MISSING | FAIL |
| Google Business Profile | Not verified | UNKNOWN |
| NAP consistency | Can't verify (no address visible) | UNKNOWN |
| Reviews schema | MISSING | FAIL |
| Local landing pages | None (SA-wide only) | MISSING |

The site targets South Africa broadly. The LocalBusiness schema exists but lacks the address, phone, and hours fields that enable local pack features. No city-specific landing pages exist (e.g., Cape Town, Johannesburg).

---

## 10. Site Topology Snapshot

```
db23.co.za/ (8 pages in sitemap)
├── / (homepage — all content in JS)
├── /ai-workshops/
├── /voice-ai/
├── /ai-training/
├── /digital-marketing/
├── /website-design/
├── /outsourced-marketing/
└── /seo-services/

Missing:
├── /about/          (E-E-A-T critical)
├── /contact/        (conversion + local SEO)
├── /blog/           (authority building)
└── /privacy-policy/ (legal + trust)
```

---

## 11. Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (SPA via Vite) |
| Bundler | Vite (output: `/assets/index-[hash].js`) |
| CSS | Single bundled stylesheet |
| Fonts | Google Fonts (Inter) |
| Analytics | Google Analytics 4 (G-63K3NNB0X0) |
| Server | Apache |
| Hosting | Unknown (possibly cPanel shared) |
| CMS | None detected |
| CDN | None detected |

---

## 12. Sitemap Analysis

**Sitemap**: `https://db23.co.za/sitemap.xml`
- 8 URLs total
- All 200 OK
- `lastmod` dates: May 2026
- Priority: Homepage 1.0, all others 0.9
- `changefreq`: Homepage weekly, others monthly

**Issues**:
- All 8 URLs serve identical HTML (SPA issue)
- Sitemap claims 8 distinct pages but canonicals signal they're all the homepage
- No image sitemap
- No video sitemap

---

## 13. Competitive Landscape (Estimated)

Target keywords in the South African market:

| Keyword | Estimated Competition | DB23 Ranking Potential (current state) |
|---------|----------------------|---------------------------------------|
| AI workshops South Africa | Medium | Very Low |
| AI training South Africa | Medium-High | Very Low |
| Voice AI South Africa | Low-Medium | Very Low |
| SEO services South Africa | High | Very Low |
| Digital marketing South Africa | Very High | Very Low |
| Website design South Africa | Very High | Very Low |

**With canonical fix + SSR**: Potential jumps to Low–Medium for less competitive terms.

---

## Appendix: Raw Data

### Pages Crawled
All 8 sitemap URLs fetched via Googlebot UA. All returned HTTP 200, identical 12,088-byte HTML.

### Schema Types Found (homepage)
Organization, OfferCatalog, Offer (×11), Service (×11), LocalBusiness, Country, FAQPage, Question (×8), Answer (×8)

### Security Headers (all pages)
Content-Security-Policy: MISSING
X-Frame-Options: MISSING
X-Content-Type-Options: MISSING
Strict-Transport-Security: MISSING
Referrer-Policy: MISSING
Cache-Control: MISSING

### Redirect Chain
HTTP → HTTPS: 301 (correct)
All service pages: 200 (no redirects)

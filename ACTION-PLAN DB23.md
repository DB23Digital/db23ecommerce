# ACTION PLAN: db23.co.za SEO
**Generated**: 2026-06-27
**Based on**: Full SEO Audit (Score: 38/100)
**Goal**: Reach 70+ within 90 days

---

## Priority Legend
- 🔴 **CRITICAL** — Blocks indexing; fix immediately (within 48 hours)
- 🟠 **HIGH** — Significant ranking impact; fix within 1 week
- 🟡 **MEDIUM** — Optimization opportunity; fix within 1 month
- 🟢 **LOW** — Nice to have; backlog

---

## 🔴 CRITICAL: Fix Immediately (48 hours)

### C1 — Fix Canonical Tags on All Service Pages
**Issue**: All 7 service pages have `<link rel="canonical" href="https://db23.co.za/">` — they self-canonicalise to the homepage, preventing Google from ranking them.

**Root cause**: The canonical is hardcoded in the static `index.html` (SPA shell). The React app needs to set the canonical dynamically per route.

**Fix**: Install `react-helmet-async` (or use the existing head management if already in place) and set a unique canonical per route:

```jsx
// In each page component:
import { Helmet } from 'react-helmet-async';

// AIWorkshops.jsx
<Helmet>
  <link rel="canonical" href="https://db23.co.za/ai-workshops/" />
  <title>AI Workshops South Africa | Practical Training for SA Teams | DB23</title>
  <meta name="description" content="Book hands-on AI workshops for your South African business team. No tech background needed. DB23 delivers practical AI training that creates real workflow change." />
</Helmet>
```

Also remove the hardcoded canonical from `index.html`.

**Expected impact**: Service pages can now be indexed and ranked as independent pages. **This is the single highest-impact fix on the entire site.**

**Effort**: 2–4 hours dev work.

---

### C2 — Add Unique Titles and Meta Descriptions Per Page
**Issue**: All 8 pages share identical title and meta description. Google cannot differentiate pages in SERPs.

**Recommended titles and meta descriptions**:

| Page | Title (≤60 chars) | Meta Description (≤155 chars) |
|------|-------------------|-------------------------------|
| Homepage | AI Workshops South Africa \| DB23 – Train, Automate & Grow | Practical AI workshops, Voice AI & digital services for SA businesses. Book your session today. |
| /ai-workshops/ | AI Workshops South Africa for Business Teams \| DB23 | Book practical AI workshops for SA business teams. No tech skills needed — just results. DB23 delivers hands-on AI training that changes how your team works. |
| /voice-ai/ | Voice AI Solutions South Africa \| AI Receptionist & More | DB23 designs Voice AI systems for SA businesses — AI receptionists, lead qualification & customer engagement. Automate your calls without losing the human touch. |
| /ai-training/ | AI Training South Africa for Non-Technical Teams \| DB23 | AI training built for real SA business people. DB23 explains AI in plain language with practical tools, workflow exercises and implementation support. |
| /digital-marketing/ | Digital Marketing Services South Africa \| DB23 | Expert digital marketing services for South African SMEs. SEO, content, social media & AI-assisted marketing. Consistent digital marketing without hiring a team. |
| /website-design/ | Website Design South Africa \| Conversion-Focused Sites | DB23 builds modern SA websites focused on clarity, trust & conversion. Not just pretty — built to grow your business. Fast, mobile-first, SEO-ready. |
| /outsourced-marketing/ | Outsourced Marketing South Africa \| Full Digital Team \| DB23 | Get a full digital marketing team without the overhead. DB23 provides outsourced marketing — content, SEO, social & AI-assisted campaigns for SA businesses. |
| /seo-services/ | SEO Services South Africa \| Rank Higher, Get Found \| DB23 | DB23 provides SEO services for South African businesses. Technical SEO, content strategy & link building to help SA businesses rank on Google. |

**Effort**: 2 hours dev work.

---

### C3 — Fix OG:URL Per Page
**Issue**: `og:url` is hardcoded to `https://db23.co.za/` on all pages. When service pages are shared on LinkedIn/WhatsApp, they show the homepage URL.

**Fix**: Set `og:url` dynamically to match the current page URL (same helmet change as C1/C2).

**Effort**: Included in C1/C2 dev work.

---

## 🟠 HIGH: Fix Within 1 Week

### H1 — Evaluate SSR or Pre-rendering Strategy
**Issue**: The site is a pure client-side React SPA. Google renders JavaScript but with a delay. All other crawlers (Bing, AI bots, social scrapers) see an empty page.

**Options** (choose one):

**Option A — Migrate to Next.js (Recommended)**
Convert the Vite React app to Next.js with Static Site Generation (SSG) for all 8 pages. Each page gets pre-rendered HTML with unique title, canonical, H1, and full content. This is the gold standard fix.
- Effort: 1–2 days
- Impact: Dramatic improvement in indexation speed and ranking potential

**Option B — Add Prerendering (SSG without framework change)**
Use `vite-plugin-ssr` or `@prerenderer/plugin-vite` to generate static HTML snapshots of each route at build time.
- Effort: 4–8 hours
- Impact: Good — crawlers get real HTML without framework migration

**Option C — Dynamic rendering (temporary workaround)**
Detect Googlebot user agent on the server and serve pre-rendered snapshots. Not recommended by Google but better than the current state.
- Effort: 4 hours
- Impact: Moderate — only helps Google, not other crawlers

**Recommendation**: Start with C1/C2 (canonical/title fixes) immediately. Schedule Next.js migration or prerendering for sprint 2. The canonical fix alone will have significant impact while the SSR work is planned.

---

### H2 — Add Security Headers
**Issue**: All security headers are missing. This is a security risk and a negative trust signal.

**Fix**: Add to Apache `.htaccess`:

```apache
# Security Headers
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"

# Caching for static assets (Vite hashed bundles)
<FilesMatch "\.(js|css|woff2|png|jpg|webp|svg)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>

# Cache HTML (short TTL for SPA index.html)
<FilesMatch "\.html$">
  Header set Cache-Control "public, max-age=3600, must-revalidate"
</FilesMatch>
```

**Effort**: 30 minutes.
**Impact**: Improved security posture; passes browser security checks; minor SEO trust signal.

---

### H3 — Enable Compression (Gzip/Brotli)
**Issue**: The 612KB JS bundle is likely served uncompressed. With Gzip, it should compress to ~160–180KB.

**Fix**: Add to `.htaccess`:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>
```

Or configure Brotli if available:
```apache
<IfModule mod_brotli.c>
  AddOutputFilterByType BROTLI_COMPRESS text/html text/css application/javascript
</IfModule>
```

**Effort**: 15 minutes.
**Impact**: Significant performance improvement; faster page load; better Core Web Vitals.

---

### H4 — Add H1 Tags (Visible in HTML)
**Issue**: No H1 tags are visible to crawlers in the server-rendered HTML. Even if React renders them, crawlers without JS see no headings.

**Fix**: If using SSR/prerendering (H1 above), this resolves automatically. If staying SPA:
- Add a `<noscript>` block with page heading content as a fallback
- Or add static H1 placeholders that React replaces on load

**Minimum viable fix** (before SSR):
In `index.html`, add page-specific static text behind a `<noscript>` tag:
```html
<noscript>
  <h1>AI Workshops South Africa — DB23 eCommerce</h1>
  <p>Please enable JavaScript to view this site.</p>
</noscript>
```

**Effort**: 30 minutes.

---

### H5 — Add Missing Trust Pages
**Issue**: No `/about/`, `/contact/`, `/privacy-policy/` pages found in sitemap. These are critical for E-E-A-T.

**Fix**: Create and publish these pages:

1. **About page** (`/about/`): Company history, team bios, mission, years in business
2. **Contact page** (`/contact/`): Phone, email, address, contact form, map
3. **Privacy policy** (`/privacy-policy/`): Required by law (POPIA in South Africa)
4. **Terms of service** (`/terms/`)

Add to sitemap after publishing.

**Effort**: 4–8 hours content creation + 2 hours dev.

---

### H6 — Complete LocalBusiness Schema
**Issue**: LocalBusiness schema is missing address, phone, hours, and geo coordinates.

**Fix**: Update the JSON-LD in the React component (or static HTML):

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "DB23 eCommerce",
  "url": "https://db23.co.za",
  "telephone": "+27-XX-XXX-XXXX",
  "email": "hello@db23.co.za",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Your street address]",
    "addressLocality": "[City]",
    "addressRegion": "[Province]",
    "postalCode": "[Postal code]",
    "addressCountry": "ZA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -33.9249,
    "longitude": 18.4241
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "RR",
  "areaServed": {"@type": "Country", "name": "South Africa"}
}
```

**Effort**: 1 hour.

---

### H7 — Fix Favicon Filename
**Issue**: Favicon path contains a URL-encoded space: `/DB23%20favicon.png`. Spaces in filenames are bad practice.

**Fix**: Rename the file to `favicon.png` and update the HTML reference:
```html
<link rel="icon" type="image/png" href="/favicon.png" />
```

**Effort**: 10 minutes.

---

## 🟡 MEDIUM: Fix Within 1 Month

### M1 — Create a Blog/Insights Section
**Issue**: No content marketing presence. In the AI consulting space, authority is built through educational content.

**Recommended content topics** (based on keyword targets):
- "How to use AI in your South African small business" (pillar)
- "Voice AI for SA businesses: what it is and how it works"
- "How to run an AI workshop for your team"
- "What is outsourced marketing and is it right for your SA business?"
- "SEO for South African businesses: 2026 guide"
- "AI automation case studies: SA businesses that transformed"

**Effort**: Ongoing (1–2 posts/month minimum).

---

### M2 — Add llms.txt for AI Crawler Access
**Issue**: No `llms.txt` file. This file guides AI systems on what content they can cite.

**Create**: `https://db23.co.za/llms.txt`

```
# DB23 eCommerce — AI Systems Guide
# https://db23.co.za/llms.txt

## DB23 eCommerce
> AI implementation partner for South African businesses. We run AI workshops, deliver AI training, deploy Voice AI systems, and provide outsourced digital marketing.

## Services
- AI Workshops: https://db23.co.za/ai-workshops/
- Voice AI Solutions: https://db23.co.za/voice-ai/
- AI Training: https://db23.co.za/ai-training/
- Digital Marketing: https://db23.co.za/digital-marketing/
- Website Design: https://db23.co.za/website-design/
- Outsourced Marketing: https://db23.co.za/outsourced-marketing/
- SEO Services: https://db23.co.za/seo-services/

## About
DB23 eCommerce is based in South Africa and helps businesses implement practical AI without needing technical backgrounds. We explain AI in plain business language.

## Contact
Website: https://db23.co.za
Twitter: https://twitter.com/db23ecommerce
LinkedIn: https://www.linkedin.com/company/db23ecommerce
```

**Effort**: 30 minutes.

---

### M3 — Add per-Service Schema Markup
**Issue**: Service pages lack Service schema. Each service page should have its own structured data.

**Example for /ai-workshops/**:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Workshops for Businesses",
  "provider": {
    "@type": "Organization",
    "name": "DB23 eCommerce",
    "url": "https://db23.co.za"
  },
  "serviceType": "AI Training Workshop",
  "areaServed": {"@type": "Country", "name": "South Africa"},
  "description": "Practical AI workshops for South African business teams. No technical background required.",
  "url": "https://db23.co.za/ai-workshops/",
  "offers": {
    "@type": "Offer",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "ZAR"
    }
  }
}
```

**Effort**: 2–3 hours (all 7 service pages).

---

### M4 — Add WebSite Schema with SearchAction
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "DB23 eCommerce",
  "url": "https://db23.co.za",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://db23.co.za/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

**Effort**: 30 minutes (only add if site search exists or is planned).

---

### M5 — Add BreadcrumbList Schema
For service pages, add BreadcrumbList to help Google understand site structure:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/"},
    {"@type": "ListItem", "position": 2, "name": "AI Workshops", "item": "https://db23.co.za/ai-workshops/"}
  ]
}
```

**Effort**: 1 hour (all service pages).

---

### M6 — Self-host Google Fonts
**Issue**: Google Fonts loads from `fonts.googleapis.com` — an external request on the critical path.

**Fix**: Download the Inter font files and serve them from the same domain. Update CSS to use `@font-face` with local paths.

**Alternative**: Use the `&display=swap` parameter (already in use — `display=swap` is present) and preload the specific font variant used.

**Effort**: 2 hours.

---

### M7 — Add Google Business Profile
**Issue**: No verified GBP detected. This is critical for local visibility.

**Action**:
1. Go to https://business.google.com
2. Claim or create a profile for "DB23 eCommerce"
3. Complete with: address, phone, hours, description, photos, services
4. Verify by postcard or phone
5. Ensure NAP matches website and schema exactly

**Effort**: 2 hours setup + 1–2 weeks verification.

---

### M8 — Add Image Sitemap + OG Image Verification
**Issue**: No image sitemap. Cannot verify if `og-image.png` and `logo.png` are accessible.

**Action**:
1. Verify `https://db23.co.za/og-image.png` loads (1200×630)
2. Verify `https://db23.co.za/logo.png` loads
3. Add image sitemap at `/image-sitemap.xml`

**Effort**: 1 hour.

---

### M9 — City-Specific Landing Pages
**Issue**: The site targets South Africa broadly. Adding city pages would capture local search traffic.

**Recommended pages**:
- `/ai-workshops-cape-town/` — "AI Workshops Cape Town"
- `/ai-workshops-johannesburg/` — "AI Workshops Johannesburg"
- `/ai-workshops-durban/` — "AI Workshops Durban"

**Effort**: 3–4 hours per page (content + dev).

---

## 🟢 LOW: Backlog

### L1 — Start Link Acquisition
Begin building backlinks once technical issues are resolved. Priority targets:
- South African business directories
- AI/tech industry publications (ITWeb, Bizcommunity, TechCentral SA)
- Guest posts on marketing blogs
- LinkedIn articles with links to service pages
- Sponsorships/mentions in SA startup communities

### L2 — Add Review Schema
Collect client testimonials and add `Review` / `AggregateRating` schema.

### L3 — Implement Structured Monitoring
Set up Google Search Console (free) to monitor:
- Which pages Google has indexed
- Which queries drive impressions/clicks
- Core Web Vitals field data
- Manual actions or penalties

### L4 — Add FAQ Schema to Service Pages
Extend the FAQ schema to each individual service page with service-specific Q&As.

### L5 — Set Up Drift Monitoring
Run `python scripts/drift_baseline.py https://db23.co.za/` to capture a baseline. After C1/C2 fixes are deployed, run `drift compare` to verify improvements.

### L6 — Performance Budget
After SSR/prerendering is implemented, set a performance budget:
- JS < 150KB gzipped
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms

---

## Implementation Roadmap

### Week 1 (Critical)
- [ ] C1 — Fix canonical tags (dynamic per-route)
- [ ] C2 — Add unique titles and meta descriptions per page
- [ ] C3 — Fix OG:URL per page
- [ ] H2 — Add security headers to `.htaccess`
- [ ] H3 — Enable Gzip compression
- [ ] H6 — Complete LocalBusiness schema
- [ ] H7 — Fix favicon filename

### Week 2–3 (High)
- [ ] H1 — Evaluate and begin SSR/prerendering migration
- [ ] H4 — Add H1 noscript fallback (if SSR not yet ready)
- [ ] H5 — Create About, Contact, Privacy Policy pages

### Month 2 (Medium)
- [ ] M2 — Create llms.txt
- [ ] M3 — Add Service schema to each service page
- [ ] M5 — Add BreadcrumbList schema
- [ ] M7 — Set up and verify Google Business Profile
- [ ] M8 — Verify OG image and logo accessibility
- [ ] Begin blog content (M1)

### Month 3 (Medium/Low)
- [ ] M4 — WebSite schema with SearchAction
- [ ] M6 — Self-host Google Fonts
- [ ] M9 — City-specific landing pages
- [ ] L1 — Begin link acquisition
- [ ] L3 — Google Search Console setup + monitoring

---

## Expected Score After Fixes

| Category | Current | After Week 1 | After Month 3 |
|----------|---------|--------------|---------------|
| Technical SEO | 30 | 60 | 75 |
| Content Quality | 40 | 45 | 70 |
| On-Page SEO | 18 | 70 | 80 |
| Schema | 70 | 80 | 85 |
| Performance | 45 | 55 | 70 |
| AI Search | 40 | 50 | 65 |
| Images | 50 | 50 | 65 |
| **Overall** | **38** | **60** | **74** |

---

*Report generated by Claude SEO (claude-seo v1.9.8) · 2026-06-27*

# 05 — Page audit: /outsourced-marketing/ (16/10/2026)

Reported: fell 8.9 places, 24.3 → 33.2 (Search Console average position, per your action list).
Measured: the live HTML of the page. Not measurable from here: Core Web Vitals, rankings, query-level data, backlinks.

## Page score card (my judgment from the measurements)
```
Overall:         57/100
On-Page SEO:     62/100  ██████░░░░
Content Quality: 40/100  ████░░░░░░
Technical:       68/100  ███████░░░
Schema:          70/100  ███████░░░
Images:          60/100  ██████░░░░
```

## Why the position fell: what I can and cannot say
I cannot determine the cause from outside Search Console. Four candidates, ranked by how well the evidence supports each:

1. **Averaging effect (plausible, UNCONFIRMED).** The 07/09 title rewrite lifted the page to page one for some queries (position 9.1 in your report). Average position blends every query the page shows for. When a page starts appearing for many new, lower-ranked queries, the average drops even though nothing got worse. Check this first: Search Console → Performance → filter to this page → Queries, compare the last 28 days with the previous 28. If the top queries held their positions, there is no real fall.
2. **Intent mismatch (supported, inferred).** On 16/10 the "outsourced marketing South Africa" results were dominated by pages selling South Africa as a place to outsource to (RPO Recruitment, Afrishore BPO, Hiresava, ITWeb). DB23's page is for South African businesses outsourcing their own marketing. A page serving a different searcher tends to sit around position 20–35.
3. **Thin page (measured).** 338 words, three H2s, no proof, no price signal. Competitors in the cost-guide space run 1,100–1,900 words (read on 16/10).
4. **Title edits (measured, weak).** The title changed on 07/09 and again on 02/10. The 02/10 change is after the period in your report, so it cannot explain the 15 September figure. Expect more movement for 2–4 weeks after any title change.
I would not touch the URL, canonical or robots: all are correct (below).

## On-page
| Element | Finding | Status |
|---|---|---|
| Title | "Outsourced Marketing Team South Africa \| Fixed Retainer \| DB23" = **62 characters**. I wrote this on 02/10 and it is over the 60 limit, so "\| DB23" may be cut off in results. | ⚠️ fix |
| Meta description | 154 characters, leads with the offer, ends with a call to action | ✅ |
| H1 | One, "Outsourced Marketing for Growing SA Businesses". Does not contain "South Africa" in full; fine | ✅ |
| H2s | Only three: benefits, in-house comparison, FAQ. No section on process, price, example month, who it is for | ❌ |
| URL | /outsourced-marketing/, short | ✅ |
| Internal links out | Three in the main content: #how-it-helps, /#contact, and the 02/10 cost-comparison post. None to /digital-marketing/, /seo-services/, /website-design/ or /about/ | ⚠️ |
| Internal links in | Linked from nav on every page I checked (12/12) | ✅ |
| External links | None | ⚠️ |

## Technical
| Element | Finding | Status |
|---|---|---|
| Status / canonical | 200; canonical self-referencing | ✅ |
| Meta robots | `index, follow` | ✅ |
| Open Graph | og:title, og:description, og:url present; **og:type missing**; og:image is the generic site image, not page-specific | ⚠️ |
| Twitter card | **twitter:card and twitter:image missing** (twitter:title present) | ⚠️ |
| Hreflang | none; single-language site, fine | ✅ |
| Render-blocking scripts | none found in the head | ✅ |
| Cache-Control | `no-cache, no-store, must-revalidate` on HTML pages: browsers and CDNs cannot cache the page, so repeat views refetch ~134 KB. Probably deliberate for the PHP geo cookie, but costly for speed | ⚠️ |

## Images
One image: `/hero-outsourced-marketing.webp`, 134 KB (under the 200 KB warning), WebP, width and height set (no layout shift), preloaded. Alt text "Abstract gears representing outsourced teamwork" describes a stock graphic, not the service. Suggest alt text that says what the page offers.

## Schema
BreadcrumbList, FAQPage, Service (plus the sitewide Organization, LocalBusiness, WebSite, Person). The Service block has an Offer with no price (see report 03). FAQ markup earns no rich result for this site type but is harmless.

## Recommendations, in order of expected impact

**1. Fix the title length (two minutes).** "Outsourced Marketing South Africa | Fixed Retainer | DB23" is 57 characters and keeps the exact phrase first.

**2. Expand the page from 338 to about 900 words.** Keep what is there; add:
- **What you get each month** (table: SEO, content, newsletter, reporting; frequency and your time needed). The current "2–4 posts" bullet list is the seed.
- **A worked example month** **[Deon to supply]** — real or clearly illustrative.
- **How it works in three steps**: strategy workshop → agreed retainer → monthly report (the FAQ already describes this; promote it to a section).
- **Who it suits and who it does not** (honest limits build trust and answer-engine citations).
- **What "AI-powered" means in practice**: the page says "latest AI tools" without saying what a client gets from it.
- **Pricing posture** **[Deon decides]**: competitors publish ranges (about R5,000–R35,000/month for small-business retainers, per sources read on 16/10, vendor-reported). Even "retainers start from R…" or "most clients spend R… to R…" would help.
- **Proof** **[Deon to supply]**: one client quote or outcome, with permission.

**3. Make the audience unambiguous in the first paragraph.** One sentence stating the page is for South African businesses outsourcing their marketing ("not offshore outsourcing"). That answers the intent mismatch directly.

**4. Link out.** Add contextual links to /seo-services/, /digital-marketing/, /website-design/, the cost guide once published, and the account-ownership checklist.

**5. Social tags and image.** Add `og:type` and `twitter:card` once in the shared SEOHead component, which fixes every page. I can also render a page-specific 1200×630 share image in the same style as the blog covers.

**6. Alt text.** "DB23 outsourced marketing team for South African businesses" instead of "abstract gears".

**7. After changes ship:** request indexing in Search Console, then compare 28-day query data at 2 and 4 weeks. Do not change the title again before then; repeated edits confuse the read.

## Quick-win code changes ready to apply (say go)
- Title string in `OutsourcedMarketingPage.jsx` and `public/index.php` (item 1)
- Alt text (item 6)
- og:type and twitter:card in `SEOHead` (item 5)
Items 2–4 need your inputs first.

# 04 — Content quality and E-E-A-T: db23.co.za (16/10/2026)

## What was measured, and what was judged
- **Measured (live HTML, 16/10/2026):** 16 pages, text inside `<main>` — word count, H1/H2 count, internal/external/blog links, images and alt text, byline presence.
- **Judged by me:** the scores below. They are my assessment against the skill's rubric, not tool output.
- **Not checked:** backlinks and third-party mentions (no tool connected), privacy policy and terms pages, visible "last updated" dates on posts, Google's actual indexing of these pages.
- FAQ answers are collapsed on the live pages and excluded from word counts, so every count is slightly low.

## Scores (judgment)
**Content quality: 58/100 · E-E-A-T: 53/100 · AI-citation readiness: 55/100**

| Factor | Score | Key signals |
|---|---|---|
| Experience | 11/25 | No case study, outcome, client quote or "what we did" on any service page. (Case studies were deliberately kept off db23.co.za on 07/09; the showcase shows work but not results.) |
| Expertise | 16/25 | Named founder, bio block on every service page and post, specific South African detail (POPIA, load shedding, ZAR). Held back by the unsourced figures below. |
| Authoritativeness | 9/25 | Service pages carry 0–1 external citations. Backlink profile **UNCONFIRMED**. |
| Trustworthiness | 17/25 | HTTPS, address, phone, WhatsApp, "within the hour" promise. Held back by unverified statistics and no reviews. |

## Who / How / Why test
- **Who:** pass. Founder bio on service pages and posts; Article schema names Deon Botha.
- **How:** weak. Eighteen posts follow one template and 14 of them carry the same publication date (29 June 2026). There is no line saying who reviewed them. See issue 4.
- **Why:** mostly pass. The copy is written to help an SME decide, with costs and limits stated. Issue 1 undermines it.

## Page metrics
| Page | Words | H2 | Ext links | Floor (guideline) | Verdict |
|---|---|---|---|---|---|
| / | 1,416 | 11 | 8 | 500 | OK. No links to any blog post |
| /ai-workshops/ | 877 | 8 | 1 | 800 | OK, thin on proof |
| /outsourced-marketing/ | **338** | 3 | 0 | 800 | **Thin** |
| /voice-ai/ | 846 | 6 | 1 | 800 | OK. Links to no blog posts |
| /ai-training/ | 750 | 7 | 1 | 800 | Slightly under |
| /ai-automation/ | 761 | 7 | 1 | 800 | Slightly under |
| /digital-marketing/ | 555 | 5 | 0 | 800 | Under |
| /seo-services/ | **295** | 3 | 0 | 800 | **Thin** |
| /website-design/ | 462 | 3 | 2 | 800 | Under |
| /about/ | 407 | 5 | 0 | 500 | Under, and the best place for E-E-A-T |
| /contact/ | 206 | 3 | 1 | n/a | Fine for its job |
| 4 blog posts sampled | 750–1,010 | 6–8 | 1–3 | 1,500 | Under the guideline |
The floors are topical-coverage guidelines, not ranking factors. The point is the gaps in coverage, listed next.

## Issues, in priority order

**1. Unverified statistics, one attributed to a named firm (fix first).**
The SMEs post (line 1903 of `src/pages/BlogPostPage.jsx`) says "A 2025 Deloitte Africa survey found only 22% of South African organisations offer structured AI training". A second post (line 1224) cites "Deloitte 2025 Future of Work SA". I searched for the source on 16/10/2026 and could not find a Deloitte report with that figure; the only page repeating it is DB23's own. **UNCONFIRMED, and possibly wrong.** Attributing an unverifiable number to a real firm is the biggest trust risk on the site.
Other unsourced figures in posts: "80–90% of inbound calls handled" (lines 479, 499, 632), "miss an estimated 30–40% of after-hours calls" (line 1951), "15–25% faster payment collection" (lines 1624, 1967), "60–70% content time cut" (SMEs post). Those may be reasonable estimates, but they read as facts.
*Fix:* remove the Deloitte line, or replace it with a figure I could confirm: SAP's 2025 AI skills report found 98% of South African respondents say lacking AI skills undermines innovation ([SAP News Center](https://news.sap.com/africa/2025/05/ai-skills-development-in-africa-new-report-findings-revealed/)). Label the other figures "DB23 estimate based on client set-ups" if that is true, or cite a source, or soften to "often". Client-facing wording, so your call.

**2. Thin service pages, starting with the one in the report.**
/outsourced-marketing/ is 338 words and /seo-services/ 295. The outsourced page has four benefit tiles, one deliverables list and a FAQ. It has no price signal, no example month, no process, no proof, and no explanation of how it differs from an agency. This is the likeliest content reason for the fall to position 33 (step 5 goes deeper).

**3. No proof anywhere on service pages.**
Zero outcomes, testimonials, named results or case notes. The Stellenbosch Chiro and Scoliosis Bracing sites show 5.0 on Google from 12 patient reviews on the clients' own sites (seen 16/10) — a quote from those clients, with permission, would be real evidence. DB23's own Google reviews: **UNCONFIRMED** (see step 6).

**4. Bulk-publishing pattern, no review disclosure.**
14 of 18 posts are dated 29 June 2026, share one structure (summary box, H2 sections, POPIA note, CTA), and none says who reviewed them or when. The Sept 2025 rater guidelines assess generic, repetitive, unattributed content. Low-risk fix: add "Written and reviewed by Deon Botha, last reviewed [date]" to the post template, and stagger/refresh dates only when content actually changes (do not fake dates).

**5. Service pages do not connect to the blog.**
Of the 16 pages measured, the service pages link to 0–1 blog posts each. Internal links from hubs to spokes are the cheapest authority transfer available. (Also in the cluster plan.)

**6. Citations.**
Service pages cite no external sources. One or two linked, dated references per page (e.g. salary data on the outsourced page, POPIA on the Voice AI page) would lift Authoritativeness at no cost.

**7. About page is under-using the best asset.**
407 words. It should carry Deon Botha's background, how the work is done, the Cape Town address, and a "how we use AI in our own content" line. **[Deon to supply]** the credentials and history.

## AI-citation readiness (55/100, judgment)
- Strengths: answer-first summary boxes on posts, tables, FAQ blocks, clear H2s, Article and Person schema.
- Gaps: service pages have no direct-answer paragraphs; statistics are unsourced (AI systems prefer attributable figures); no first-party data anywhere. A small original dataset (e.g. anonymised call-volume or turnaround figures from DB23's own work **[Deon to supply]**) would be the strongest single addition.

## Recommended actions
| # | Action | Owner |
|---|---|---|
| 1 | Remove or replace the Deloitte 22% claim; soften or source the other statistics | Deon approves wording |
| 2 | Expand /outsourced-marketing/ to ~900 words (process, example month, pricing posture, who it is for, proof) | Claude drafts, Deon approves |
| 3 | Add reviewer line to the post template | Claude (small code change) |
| 4 | Link each service hub to its spoke posts | Claude |
| 5 | Add one client quote per service page, with permission | Deon |
| 6 | Expand /about/ and /seo-services/ | Claude drafts, Deon supplies facts |

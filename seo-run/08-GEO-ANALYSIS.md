# 08 — AI search (GEO) analysis: db23.co.za (16/10/2026)

Framing (Google's own position): optimising for AI answers is still SEO. The checks below are SEO fundamentals applied to AI surfaces. Where community advice contradicts Google, I follow Google and say so.

## GEO readiness: 58/100 (my judgment from the measurements below)
| Platform | Score | Why |
|---|---|---|
| Google AI Overviews / AI Mode | 60 | Crawlable, server-rendered, good structure; held back by thin service pages and unsourced figures |
| ChatGPT | 45 | Crawler allowed; no entity presence on the sources it favours (see Brand mentions) |
| Perplexity | 40 | Same; favours community discussion, where DB23 has none that I could find |
Platform scores are judgment, not measured citations. I could not check live citations (no ChatGPT scraper or LLM-mention tool connected; DataForSEO not available).

## 1. AI crawler access: pass (verified)
`robots.txt` read 16/10/2026:
| Crawler | Status |
|---|---|
| GPTBot, OAI-SearchBot | allowed |
| ClaudeBot | allowed |
| PerplexityBot | allowed |
| Bytespider (ByteDance) | allowed |
| CCBot (Common Crawl), anthropic-ai | blocked (training-only), deliberate per the file's own comment |
| Everything else (`*`) | allowed, so ChatGPT-User and Google-Extended inherit access |
I also requested the home page and a blog post using GPTBot, ClaudeBot and PerplexityBot user-agent strings: all returned HTTP 200. (That tests the server, not each bot's real IP, but no user-agent blocking exists in `.htaccess`.)
Optional: block Bytespider if you do not want TikTok's crawler on the site. Not a risk, your call.

## 2. Server-side rendering: pass (verified)
A blog post's raw HTML (no JavaScript run) is about 40 KB and contains its full text, 8 H2s and the summary paragraph. AI crawlers that do not execute JavaScript see the content. This is the prerender step in `cpanel-pack.ps1` doing its job.

## 3. llms.txt: present, no weight given
`/llms.txt` exists and is well-written. Google has said it does not use it and independent studies in the skill's references found no citation effect, so I assign it no value. Keep it (costs nothing) but do not spend time on it. It lists only four blog posts out of 18.

## 4. Brand mentions: the main gap
Brand mentions correlate far more strongly with AI visibility than backlinks (Ahrefs study cited in the skill; I did not re-verify it). In two searches on 16/10 for DB23 and for Deon Botha I found **no LinkedIn, YouTube, Reddit, Wikipedia or directory presence for DB23**, only db23.co.za pages. **UNCONFIRMED:** my search tool is US-only and may not index these, so check yourself: search "DB23 eCommerce" on LinkedIn, YouTube and Reddit.
Entity risk: a search for "Deon Botha" surfaces another person of the same name (a principal consultant at PBT Group). The two may not be the same, so an AI system could mix them up. Your LinkedIn link in the Person schema helps; make sure the About page, LinkedIn headline and Business Profile all describe the same person and company with the same wording.
The same searches returned **pre-September page titles** for the home and /ai-workshops/ pages ("AI Workshops & Digital Marketing South Africa", "AI Workshops South Africa – Business Training"), so whatever index that tool uses had not re-crawled the 07/09 and 02/10 changes. Search Console's re-index request is the fix.

## 5. Passage-level citability (measured)
I measured the lead answer box on all 18 blog posts: average **102 words**, range 66–129, **none in the 134–167 word band**, and 8 are under 100. Two of the shortest are the oldest posts (ROI of AI training, 69; ChatGPT for business training, 66).
Caveat: the 134–167 figure is a community recommendation. Google's guidance rejects chunking tactics, so do not pad boxes to hit a number. What matters is that each box answers its question completely, stands alone, carries a source or date, and has no unverifiable statistic. Rewrite the weakest (66–91 words) for completeness, not length.
Service pages have no answer-first paragraph at all (e.g. /outsourced-marketing/ opens with the hero, then benefits). Add one 60–80 word definition at the top of each (see report 05).

## 6. Authority signals
- Author byline and Person schema on posts: present.
- Visible publication or "last reviewed" date: not checked on rendered pages; schema has datePublished.
- External citations: service pages 0–1; the quotable statistics are unsourced, and one is attributed to Deloitte without a source I could find (report 04). AI systems prefer attributable figures, so this is the highest-risk item.
- Original, citeable asset: the **Foldline benchmark** (a published 26-test LinkedIn standard, built so it can be cited) is the one piece of first-party material on the site that nobody else has. It is the best candidate for earning mentions. It is also on the unfinished feat/foldline branch in the build.

## 7. Multi-modal
Posts now have a branded cover image. No video, no calculators. A short explainer video per cluster (AI receptionist, outsourced marketing) would help on YouTube, which the skill lists as the strongest mention signal. Not essential.

## Top 5 highest-impact changes
1. **Fix the unsourced statistics** (report 04). Accuracy first; wrong numbers get quoted.
2. **Build entity presence outside the site**: an active LinkedIn company page and Deon's profile (consistent wording), a few short YouTube videos, and 3–5 genuine directory listings (report 06). Aim for mentions that name DB23 and describe what it does.
3. **Add answer-first definition paragraphs** to the five service pages, and tighten the shortest blog answer boxes.
4. **Promote the Foldline benchmark** (once it ships) as a cited reference: a plain-language summary post, a LinkedIn announcement, and a link from relevant articles.
5. **Make sure Bing has the site**: ChatGPT-style systems lean on Bing's index per the skill. Submit the sitemap in Bing Webmaster Tools and enable IndexNow if available. **UNCONFIRMED** whether it is already done.

## Schema for AI discoverability
Already in place: Organization, Person, Article, Service, FAQPage (valid, useful to AI systems even though Google shows no FAQ rich result for this site type). Fixes in report 03 (author URL and sameAs on articles) strengthen the entity link.

## Content reformatting suggestions (specific)
- ROI of AI training (69 words) and ChatGPT for business training (66 words): rewrite the answer box to state the main number, the method and the caveat in one standalone paragraph.
- Four posts with 86–91-word boxes (AI receptionist, AI vs human, best AI tools, ChatGPT workshop): add one sentence of cost range or decision rule each, sourced.
- /outsourced-marketing/ and /seo-services/: add an opening definition paragraph, then the sections in reports 02 and 05.

# 01 — Cluster plan: db23.co.za (16/10/2026)

## How this was built, and what it cannot tell you
- Seed clusters come from the Search Console action list: AI receptionist (39 impressions/month, position 24) and outsourced marketing (41 impressions, position 20).
- I ran 4 WebSearches (AI receptionist SA, outsourced marketing SA, marketing agency retainer cost SA, AI answering service for doctors/dentists SA POPIA).
- **UNCONFIRMED: SERP-overlap scoring.** The skill's method needs top-10 overlap for every keyword pair. My WebSearch tool is US-only, so I cannot measure South African SERPs reliably, and I did not run the ~180 pairwise comparisons. Groupings below are by intent and by the competitor pages that appeared, not by measured overlap. DataForSEO is not connected. If you want measured clusters, run the same keywords through Search Console's Queries view or a rank tool with a ZA locale.
- **UNCONFIRMED: search volumes.** None obtained. Every volume cell is blank on purpose.
- No `cluster-map.html`: the skill's template file (`templates/cluster-map.html`) is not installed on this machine.

## Finding that changes the plan: the head term has the wrong intent
The "outsourced marketing South Africa" SERP is dominated by pages selling South Africa as a place to outsource TO (RPO Recruitment, Afrishore BPO, Hiresava, ITWeb "why SA is ideal for outsourcing digital marketing"). Those are written for UK/US buyers offshoring work. DB23's page is written for South African businesses outsourcing their own marketing. That is a different searcher, and it is a likely reason the page sits at position 20–33 with no clicks.
Source: WebSearch "outsourced marketing South Africa", 16/10/2026. Inference, not measured.

## Cluster A — AI receptionist (hub: /voice-ai/)

Competition seen: vendor sites with prices (BizAI ~R999/mo, AiSky ~R1,999/mo, Remi from R2,900/mo for clinics, Aiployee R7,500/mo + R5,000 setup), plus niche pages (dentalconnectai.co.za, remireception.com/clinics, BizAI GP-practice guide). All are vendor-reported prices; none verified.

| Page | Status | Intent | Template | Target words |
|---|---|---|---|---|
| /voice-ai/ (hub) | exists | commercial | landing-page | 1,500+ |
| /blog/ai-receptionist-south-africa/ | exists | informational/commercial | ultimate-guide | update, don't duplicate |
| /blog/ai-vs-human-receptionist-south-africa/ | exists | commercial | comparison | keep |
| /blog/voice-ai-small-business-south-africa/ | exists | informational | explainer | keep |
| /blog/ai-receptionist-medical-practice-south-africa/ | **new 02/10** | informational/commercial | how-to | add dental section |
| AI receptionist for law firms and attorneys | **gap** | commercial | how-to | 1,400 |
| AI receptionist for plumbers, electricians and trades (after-hours call-outs) | **gap** | commercial | how-to | 1,300 |
| AI receptionist for estate agents and property | **gap** | commercial | how-to | 1,300 |
| AI receptionist POPIA checklist (operator agreement, recordings, consent wording) | **gap** | informational | checklist | 1,500 |
| Voice AI in Afrikaans, isiZulu and other SA languages | **gap** | informational | explainer | 1,200 |

Cannibalisation guard: do NOT publish a separate "AI receptionist cost South Africa" page. /blog/ai-receptionist-south-africa/ already targets cost (R500–R3,500/month in its title). Refresh that page with a competitor price table instead. Dental: keep inside the medical post as its own H2 unless Search Console shows dental queries earning impressions on their own.

## Cluster B — Outsourced marketing (hub: /outsourced-marketing/)

Competition seen: agency cost guides with ranges (Preferred Marketers, Juicy Designs, Mintt, Syte, Simboti). Quoted retainer range across sources: about R5,000–R35,000/month for small-business work, up to R50,000+ for multi-channel; one source says retainers below about R5,000/month stop making sense; PR sources say 6–12 month lock-ins are common (relevant: DB23 offers no lock-in).

| Page | Status | Intent | Template | Target words |
|---|---|---|---|---|
| /outsourced-marketing/ (hub) | exists, **retarget** | commercial | landing-page | 1,500+ |
| /blog/outsourced-marketing-vs-in-house-south-africa/ | **new 02/10** | commercial | comparison | keep |
| /digital-marketing/ and /seo-services/ | exist | commercial | landing-page | keep, link to hub |
| How much does a marketing retainer cost in South Africa | **gap** | commercial/transactional | how-to + table | 1,600 |
| Marketing retainer vs project vs hourly pricing (SA) | **gap** | commercial | comparison | 1,300 |
| How to choose a marketing agency in South Africa (questions to ask, contract red flags) | **gap** | informational | checklist | 1,500 |
| Fractional CMO South Africa: when it beats an agency | **gap** | commercial | explainer | 1,300 |
| Marketing for medical and dental practices (ties to Stellenbosch Chiro and Scoliosis Bracing work) | **gap** | commercial | how-to | 1,400 |

## Link matrix (internal)
- Every spoke links to its hub and back (mandatory).
- A ↔ B cross-link: the medical-practice receptionist page links to the medical-practice marketing page; both come from the same buyer.
- Each spoke: 2–3 links to siblings. Hub pages list all spokes in a "guides" block. Blog index lists all.
- Today the service pages link out to NO blog posts (checked 02/10: zero `/blog/` links on VoiceAIPage, OutsourcedMarketingPage, DigitalMarketingPage). Two links were added on 02/10; the rest of Cluster A and B has none. This is the cheapest fix in the plan.

## Decisions that are yours
1. Publish a DB23 price on the retainer-cost page, or give a range for the market and ask for a quote? Competitors publish ranges and searchers want a number.
2. Retarget /outsourced-marketing/ to "for South African businesses" wording? It changes the page title and H1 (client-facing).
3. Verticals: law, trades, property, medical marketing. Do you want to serve these, or stay general?

Next step (step 2) turns the 10 gap pages into briefs.

# 06 — Local SEO analysis: db23.co.za (16/10/2026)

## Local SEO score: 46/100 (my judgment; no GBP dashboard or rank data available)
| Dimension | Weight | Score | Basis |
|---|---|---|---|
| GBP signals | 25% | 12/25 | A profile exists (the 07/09 commit says the schema matches it) but the site has no Maps embed, no "find us on Google" link and no reviews link |
| Reviews and reputation | 20% | 3/20 | No review count or rating anywhere on the site, no aggregateRating (correct while there are none), and I found no Google reviews for DB23 in two searches. **UNCONFIRMED:** my search tool cannot see Google Maps or the profile |
| Local on-page | 20% | 14/20 | Cape Town in homepage title and H1 area, phone as `tel:` link, WhatsApp link, NAP in footer. Business hours are not visible on any page (schema only) |
| NAP and citations | 15% | 8/15 | NAP consistent across footer, /contact/, /about/, llms.txt and schema (see below). No third-party directory listing found |
| Local schema | 10% | 6/10 | ProfessionalService/LocalBusiness present with address, phone, hours, areaServed; `geo` pin likely wrong (report 03) |
| Local authority | 10% | 3/10 | No chamber, press or local-link signals visible. Backlinks **UNCONFIRMED** |
Total: 12 + 3 + 14 + 8 + 6 + 3 = 46. The basics (NAP, phone, schema) are sound; the gaps are reviews, visible GBP links and local authority.

## Business type and vertical
- **Business type:** hybrid, leaning service-area. A street address is shown on every page (Tryall Road, Parklands, Cape Town, 7441), but the contact page says "Serving SA nationally · Global clients online", and most delivery is online. **Decision for you:** if that address is a home or shared space, a Service Area setup on the Business Profile (address hidden, service area set) is the usual choice; I cannot see how yours is configured.
- **Vertical:** none of the six local verticals; correct generic subtype is already used (ProfessionalService).

## NAP consistency audit
| Source | Name | Address | Phone | Status |
|---|---|---|---|---|
| Footer (every page) | DB23 eCommerce | Tryall Road, Parklands, Cape Town, Western Cape, 7441 | +27 83 602 5227 | ✅ |
| /contact/ | DB23 eCommerce | Tryall Road, Parklands, Cape Town, Western Cape, 7441 | +27 83 602 5227, WhatsApp same number | ✅ |
| JSON-LD (LocalBusiness) | DB23 eCommerce | Tryall Road, Parklands, Cape Town, 7441 | +27-83-602-5227 | ✅ |
| llms.txt | same | same | same | ✅ |
| Google Business Profile | **not checked** | | | UNCONFIRMED |
Minor: /contact/ lists both info@db23.co.za and deon@db23.co.za; schema and footer use deon@. Pick one primary.
One search result snippet showed a "7146" postcode on the homepage. That is an old cached snippet; the live site shows 7441 everywhere (checked 16/10), so there is no live inconsistency. The same search also returned pre-07/09 page titles, which suggests the index had not yet re-crawled the changes. Request re-indexing of the homepage, /ai-workshops/ and /outsourced-marketing/ in Search Console.

## GBP checklist (on-page signals only; I cannot see the dashboard)
- ❌ Maps embed or "View on Google Maps" link on /contact/
- ❌ Link to the Google review form (so clients can leave a review in one tap)
- ❌ Business hours visible in page text (only in schema: Mon–Fri 08:00–17:00)
- ✅ Click-to-call (`tel:`) and WhatsApp on every page
- ✅ Cape Town in homepage title and hero text
- ⚠️ Cape Town no longer appears in the /ai-workshops/ title: I removed "Cape Town & Online" on 02/10 to lead with price. If in-person Cape Town workshops matter to you, restore the phrase in the description or add it back to the H1.
- ⚠️ Do not point the Profile's website link at the strongest page; use the homepage (current best practice per the skill's reference; I have not seen your current setting).

## Review health snapshot
No rating, count or recency data is available to me. Two searches (16/10/2026) found no Google reviews for "DB23 eCommerce", which may mean none exist or that my tool cannot see them. Please check the Profile directly. If there are none, the single biggest local gain is the first 10 genuine reviews from past clients (10 is the commonly cited threshold). Ask real clients; never pre-screen who you ask, which Google treats as review gating.

## Citations
Search found no DB23 listing on third-party directories (Bizcommunity, the Business Directory, Best Directory all returned others). **UNCONFIRMED:** these were two broad searches, not a per-directory check. Worth claiming: Bing Places (feeds ChatGPT and Copilot), Apple Business Connect, and South African directories used by SME buyers. Pick 4–5 and keep NAP identical to the footer.

## Location pages
DB23 has no location pages, and it should not add town-by-town pages for a one-person business serving nationally; that is the doorway pattern the skill warns about. One genuine exception: a Cape Town in-person workshop page, but only if there is unique content (venues, travel radius, client types, a Cape Town example). Decision for you.

## Top 10 actions
| # | Priority | Action | Effort |
|---|---|---|---|
| 1 | Critical | Confirm the Business Profile exists, is verified and its category, hours, services and phone match the footer; fix the `geo` pin in schema from it | 20 min, Deon |
| 2 | Critical | Check and (if needed) start collecting Google reviews from real clients; add the review link to /contact/ and the footer | Deon |
| 3 | High | Add a Maps link/embed and visible business hours to /contact/ | Claude, small |
| 4 | High | Ask Search Console to re-index homepage, /ai-workshops/, /outsourced-marketing/ | 5 min, Deon |
| 5 | High | Claim Bing Places and Apple Business Connect with identical NAP | 30 min, Deon |
| 6 | Medium | Decide address vs service-area setup for the Profile | Deon |
| 7 | Medium | Restore Cape Town in the /ai-workshops/ description or H1 | Claude, small |
| 8 | Medium | List on 4–5 SA directories | Deon / Claude |
| 9 | Low | One primary email in schema and footer | Claude |
| 10 | Low | Local links: a chamber or an SME association membership; one local press or podcast mention | Deon |

## Limitations
Not assessed: GBP dashboard data (claim status, category, photos, posts, Insights), real local-pack positions, geo-grid ranking, domain authority, full backlink profile, Apple/Bing listing status. Step 8 (`/seo-maps`) covers some of this if a maps tool is connected.

## Note on step 7 (review replies)
There is no `/review-respond` skill on this machine, and I found no DB23 Google reviews to reply to. If reviews exist, paste them into the chat and I will draft replies in your voice.

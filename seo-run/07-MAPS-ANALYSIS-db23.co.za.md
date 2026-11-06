# 07 — Maps analysis: db23.co.za (16/10/2026)

## Capability tier: Tier 0 (free)
DataForSEO is not connected, so the paid parts of this skill did **not** run: no geo-grid rank scan, no live Business Profile audit, no review velocity or sentiment, no GBP post/Q&A data. No credits were consumed. What ran: OpenStreetMap geocoding (Nominatim), an OpenStreetMap listing check, a web search for competitors, and the on-site signal checks from step 6.
The Overpass competitor-radius query **failed** (the primary server returned an expired SSL certificate; the mirror returned HTTP 500). Competitor mapping below is therefore from web search, not from map data.

## Maps Health Score: not scorable
There is no Business Profile data to score. The only measurable piece is on-site GBP integration, which scored 12/25 in report 06. Anything I put as a headline number here would be invented.

## Findings

### 1. The schema `geo` pin is about 16 km from the street (confirmed, with a caveat)
- Current schema: -33.9249, 18.4241 (Cape Town city centre).
- OpenStreetMap places Tryall Road, Parklands at about -33.7927, 18.4995 (street centreline, not the building), and the Parklands 7441 postcode area centre at -33.8169, 18.5015.
- Distance from the schema pin to the street: **16.3 km** (calculated).
- Caveat: OpenStreetMap is crowd-sourced. Use the pin from your own Business Profile, which Google already trusts. If the profile uses a service area with a hidden address, make the schema pin match that choice.

### 2. Postcode: 7441 vs 7433 (needs checking)
Every page, the schema and llms.txt say **7441**. OpenStreetMap lists Tryall Road itself under **7433**, with 7441 as the wider Parklands code. A 07/09 commit unified the site to 7441, so someone chose it deliberately, possibly from your Profile.
**UNCONFIRMED which is right.** Check the South African Post Office postal code lookup for the exact street, then make the Profile, footer, schema and llms.txt identical. A mismatch here weakens the NAP match across Maps, Bing and Apple.

### 3. No OpenStreetMap listing
A Nominatim search for "DB23 eCommerce" returned only an unrelated place (in Hong Kong). DB23 is not mapped in OSM. OSM data feeds Apple Maps-adjacent and many smaller map apps; adding a node is optional and free, low priority.

### 4. Cross-platform NAP
| Platform | Status |
|---|---|
| Website (footer, contact, schema, llms.txt) | consistent: name, Tryall Road Parklands, +27 83 602 5227 |
| Google Business Profile | **not checked** (no API access) |
| Bing Places | **not checked** |
| Apple Business Connect | **not checked** (no public API) |
| OpenStreetMap | not listed |

### 5. Competitors (web search, not map data)
A search for "AI workshops for businesses Cape Town" on 16/10 returned training-provider catalogues, not small local firms: NobleProg (several AI courses, 4- to 21-hour formats), GLOMACS (AI strategy and leadership), Twasa Corporate Training (2-day AI for executives, on-site or on Teams), The Knowledge Academy (Gemini and AI Studio). All are course listings; prices and dates were not shown, and some pages may be dated. Source: WebSearch, US-only tool, so Cape Town ordering is **UNCONFIRMED**.
Read: for in-person "AI workshop Cape Town" searches, the competition appears to be large training companies selling fixed courses. DB23's position, a hands-on session built around the client's own tasks from R4,500, is different and worth stating on the page. A map-pack comparison would need DataForSEO or a manual check of Google Maps from Cape Town.
Competitor density: not computed (needs the failed Overpass query).

## Corrected schema snippet
In `generated-schema.json` the `localBusiness_geo_fix` entry now carries the OpenStreetMap approximation, marked as such. Replace with your Profile's pin before using.

## Top actions
| # | Priority | Action |
|---|---|---|
| 1 | Critical | Confirm postcode for Tryall Road (7441 vs 7433) and make Profile, site, schema and llms.txt identical |
| 2 | Critical | Replace the schema `geo` pin with the one on your Business Profile |
| 3 | High | Check Bing Places and Apple Business Connect listings exist and match the footer |
| 4 | High | Run a manual Maps check from Cape Town for "AI workshop Cape Town" and "AI receptionist Cape Town" and note who appears (10 minutes) |
| 5 | Medium | Decide address vs service-area display (report 06) |
| 6 | Low | Add DB23 to OpenStreetMap |

## To get the paid half
Connect DataForSEO (the geo-grid scan is a 7×7 grid of Maps searches per keyword; the skill shows a cost estimate and asks before spending). Until then, treat ranking claims about Maps as unmeasured.

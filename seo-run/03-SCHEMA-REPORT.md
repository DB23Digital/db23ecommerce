# 03 — Schema report: db23.co.za (16/10/2026)

Method: pulled the live JSON-LD from 11 pages (home, 6 service pages, contact, about, blog index, 2 posts) and parsed every block. No Google Rich Results Test was run, so "eligible" below means eligible by Google's published rules, **not** tested.

## Answer to the brief ("ranking acceptably but the listing under-earns clicks")
Schema is not the lever here. None of the pages can earn a new rich result from schema alone:
- FAQ rich results are limited to government and health authority sites (since Aug 2023). DB23 has FAQPage markup on 7+ pages; it is valid, harmless, and earns no visible rich result.
- Service and LocalBusiness do not produce rich snippets in standard results.
- BreadcrumbList is already present on every inner page.
- Review/AggregateRating would add stars, but DB23 has no reviews yet. Do not add it.
The click lever is the title and description. Both target pages were rewritten on 02/10 and are now live (verified 16/10); Search Console needs 2–4 weeks to show the effect, so judge them then.

## Validation results
| Schema | Where | Status | Issues |
|---|---|---|---|
| Organization | every page | ✅ | alternateName present |
| LocalBusiness + ProfessionalService | every page | ⚠️ | geo point looks like Cape Town city centre, not Parklands 7441 (see 1); priceRange "$$" (see 2); no aggregateRating (correct) |
| WebSite | every page | ✅ | |
| Person (Deon Botha) | every page | ✅ | has sameAs LinkedIn, knowsAbout |
| BreadcrumbList | inner pages | ✅ | |
| Service | 5 service pages | ⚠️ | Offer has priceCurrency but no price (see 3) |
| FAQPage | 5 service pages + posts | ⚠️ | valid, no rich result for this site type (see 4) |
| Article | blog posts | ⚠️ | author lacks url/sameAs (see 5) |
| ContactPage, AboutPage | /contact/, /about/ | ✅ | |
| Blog index | /blog/ | ⚠️ | no CollectionPage/Blog markup (see 6) |
No deprecated types found (no HowTo, SpecialAnnouncement, etc.). All @context and absolute URLs present in the blocks I read. JSON-LD is in the server-rendered HTML (prerendered), which is what Google recommends.

## Fixes, in order of value

**1. LocalBusiness `geo` (likely wrong).** Current: -33.9249, 18.4241, which is Cape Town city centre. The address is Tryall Road, Parklands, 7441, roughly 15 km north. **UNCONFIRMED:** I have not looked up the exact coordinates for that street. Take the coordinates from your Google Business Profile pin and replace them. A wrong pin can undermine the NAP match that local ranking relies on.

**2. `priceRange` "$$".** Replace with a rand-based value that suits a service business, or remove the field. Google does not require it.

**3. Service `offers` with no price.** Either remove the Offer (it has no price, so it says nothing a machine can use) or add a real `priceSpecification`. Do not add a price you have not published.

**4. FAQPage.** Leave in place (the 07/09 commit left it deliberately). It costs nothing, but do not expect snippets from it. It can still help AI answer engines parse Q&A (see step 9).

**5. Article author.** Add `url` (https://db23.co.za/about/) and `sameAs` (LinkedIn) to the author Person on posts. This links the author to the same Person entity used sitewide and supports E-E-A-T. Applies to the template in BlogPostPage.jsx, so it covers all 18 posts.

**6. Blog index.** Add `CollectionPage` with `hasPart` pointing at the posts, or leave it. Low value.

**7. New posts (when published).** Use the existing Article template. Do not add Review or AggregateRating anywhere.

## Not recommended
- AggregateRating or Review on DB23's own pages (no reviews).
- HowTo (deprecated).
- Marking up the client showcase cards as Review/Product.

See `generated-schema.json` for the corrected snippets. Nothing has been changed in the site code; say the word and I will apply 2, 3 and 5 now, and 1 once you give me the coordinates.

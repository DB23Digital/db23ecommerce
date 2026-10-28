import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { CTABand, FeatureRows, PageFAQ, PageHero, PriceTable, Section } from '../components/PageBlocks';


const seoPillars = [
    { title: 'Local SEO (Google Maps)', body: 'Dominate the "near me" searches. We optimise your Google Business Profile so you show up in the local map pack for South African searchers.' },
    { title: 'Technical SEO', body: 'We fix the under-the-hood issues: site speed, mobile usability, indexability, and schema markup so Google loves crawling your site.' },
    { title: 'On-page content', body: 'Keyword-optimised landing pages, perfectly structured headings (H1/H2), and compelling meta descriptions that drive high click-through rates.' },
    { title: 'Authority & link building', body: 'Safe, high-quality backlink acquisition strategies to increase your domain authority and push your site above older competitors.' },
];

const plans = [
    {
        name: 'Hosted by DB23',
        price: 'From R999',
        period: '/month',
        features: ['Hosting', 'SEO, AEO & GEO', 'Monthly reporting'],
        cta: 'Ask about a plan',
        href: '/#contact',
        subject: 'Hosting & SEO plan',
        featured: true,
    },
    {
        name: 'On your own hosting',
        price: 'From R799',
        period: '/month',
        features: ['You pay your hosting provider', 'SEO, AEO & GEO on your domain', 'Monthly reporting'],
        cta: 'Ask about a plan',
        href: '/#contact',
        subject: 'Hosting & SEO plan',
    },
];

const faqs = [
    { q: 'What is SEO and why does my business need it?', a: 'Search Engine Optimisation (SEO) is the process of improving your website so it ranks higher on Google. When people search for your services, you want to be on the first page, capturing that high-intent traffic before your competitors do.' },
    { q: 'How long does SEO take to show results?', a: 'SEO is a long-term strategy. While technical fixes can yield quick bumps, establishing authority and ranking for competitive keywords generally takes 3 to 6 months of consistent work.' },
    { q: 'Is SEO better than Google Ads?', a: 'They serve different purposes. Ads give you instant visibility but cost money per click. SEO takes longer to build, but once you rank organically, that traffic is "free" and highly trusted by users. A balanced strategy often uses both.' },
    { q: 'Do you guarantee a #1 ranking on Google?', a: 'No ethical SEO agency guarantees a #1 ranking, because Google\'s algorithm changes constantly and is outside our direct control. We guarantee that we use proven, white-hat strategies that consistently improve visibility and traffic.' },
    { q: 'Can you fix a website that dropped in rankings?', a: 'Yes. We start with a comprehensive SEO audit to diagnose penalties, technical errors, or content quality issues that caused the drop, and then execute a recovery plan.' },
    { q: 'How do you measure SEO success?', a: 'We look past just rankings. We measure organic traffic growth, engagement rates, and most importantly, the number of actual leads/conversions generated from organic search.' },
];

export function SEOServicesPage() {
    return (
        <PageLayout>
            <SEOHead
                title="SEO Services South Africa – Rank on Google | DB23"
                description="Search engine optimisation for South African businesses. Technical SEO, content, local search and ranking strategy."
                canonical="https://db23.co.za/seo-services/"
                keywords="SEO services South Africa, search engine optimisation South Africa, local SEO South Africa, technical SEO, rank on Google South Africa"
                ogTitle="SEO Services South Africa – Rank on Google | DB23"
                ogDescription="Search engine optimisation for South African businesses. Technical SEO, content, local search and ranking strategy."
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "SEO Services", "item": "https://db23.co.za/seo-services/" }
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(f => ({
                            "@type": "Question",
                            "name": f.q,
                            "acceptedAnswer": { "@type": "Answer", "text": f.a }
                        }))
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "@id": "https://db23.co.za/seo-services/#service",
                        "name": "SEO Services South Africa",
                        "description": "Expert SEO services for South African businesses. Technical SEO, content optimisation, and authority building so you rank higher on Google.",
                        "provider": { "@id": "https://db23.co.za/#organization" },
                        "serviceType": "Search Engine Optimisation",
                        "areaServed": { "@type": "Country", "name": "South Africa" },
                        "offers": [
                            {
                                "@type": "Offer",
                                "name": "Hosted by DB23",
                                "description": "Hosting, SEO, AEO & GEO, and monthly reporting. Price includes VAT.",
                                "priceSpecification": { "@type": "UnitPriceSpecification", "minPrice": 999, "priceCurrency": "ZAR", "unitText": "MONTH", "valueAddedTaxIncluded": true }
                            },
                            {
                                "@type": "Offer",
                                "name": "On your own hosting",
                                "description": "SEO, AEO & GEO and monthly reporting on your domain. Price includes VAT.",
                                "priceSpecification": { "@type": "UnitPriceSpecification", "minPrice": 799, "priceCurrency": "ZAR", "unitText": "MONTH", "valueAddedTaxIncluded": true }
                            }
                        ],
                        "url": "https://db23.co.za/seo-services/"
                    }
                ]}
            />


            <PageHero
                eyebrow="SEO services · South Africa"
                title="SEO services for South African businesses."
                intro="When South Africans search for your services on Google, are you showing up? We provide technical and content-driven SEO strategies that push your website to the top of the results."
                primary={{ label: 'Request a free SEO audit', href: '/#contact' }}
                secondary={{ label: 'Our SEO process', href: '#pillars' }}
            />

            <Section
                id="pillars"
                title="How we get you to page 1."
                intro="SEO isn't magic. It's the consistent application of technical best practices, high-quality content, and digital authority."
            >
                <FeatureRows items={seoPillars} />
            </Section>

            <Section id="plans" title="Plans that include SEO, AEO & GEO.">
                <PriceTable plans={plans} note="Prices include VAT." />
            </Section>

            <PageFAQ faqs={faqs.map((f) => ({ q: f.q, a: f.a }))} title="SEO questions." />

            <CTABand
                title="Not sure why your site isn't ranking?"
                body="Let us run a comprehensive technical and content audit on your website. We'll identify exactly what's holding you back and give you a clear roadmap to fix it. No commitment required."
                primary={{ label: 'Request your free audit', href: '/#contact' }}
            />
        </PageLayout>
    );
}

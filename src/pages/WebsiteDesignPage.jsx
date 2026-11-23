import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { SelectedWork } from '../components/SelectedWork';
import { CTABand, PageFAQ, PageHero, PriceTable, RuledList, Section } from '../components/PageBlocks';

const features = [
    { title: 'Conversion-focused design', body: 'Beautiful designs are useless if they don\'t convert. We design user journeys that guide South African visitors toward contacting you or buying your products.' },
    { title: 'Mobile-first experience', body: 'With the majority of web traffic coming from mobile devices, we ensure your website looks and functions perfectly on all screen sizes everywhere.' },
    { title: 'Ultra-fast performance', body: 'Slow websites kill conversions and SEO. We build lightweight, highly-optimised websites that load in milliseconds for South African visitors.' },
    { title: 'SEO-ready architecture', body: 'Proper heading structures, schema markup, and clean code so Google can easily crawl, understand, and rank your site from day one.' },
    { title: 'Modern tech stack', body: 'We build using modern React/Next.js frameworks or optimised WordPress, depending on what your specific South African business needs to scale.' },
    { title: 'Copywriting included', body: 'A great website needs great words. We don\'t just give you empty templates; we help craft the messaging that sells your services.' },
];

const plans = [
    {
        name: 'Hosted by DB23',
        price: 'From R999',
        period: '/month',
        features: ['Hosting', 'SEO, AEO & GEO', 'Monthly reporting'],
        cta: 'Ask about hosting',
        href: '/#contact',
        subject: 'Hosting & SEO plan',
        featured: true,
    },
    {
        name: 'On your own hosting',
        price: 'From R799',
        period: '/month',
        features: ['You pay your hosting provider', 'SEO, AEO & GEO on your domain', 'Monthly reporting'],
        cta: 'Ask about SEO care',
        href: '/#contact',
        subject: 'Hosting & SEO plan',
    },
];

const faqs = [
    { q: 'How much does a new website cost?', a: 'Website pricing depends on complexity, the number of pages, and required features (like eCommerce or custom portals). Our professional business sites typically start from a competitive baseline suited for South African SMEs. Contact us for a precise quote.' },
    { q: 'How long does it take to build a website?', a: 'A standard 5-page business website usually takes 3 to 5 days from the initial kickoff to launch, provided we have all the necessary branding assets and information from you.' },
    { q: 'Do you offer eCommerce website design?', a: 'Yes. We build robust eCommerce platforms using Shopify or WooCommerce, fully integrated with global payment gateways like Stripe and PayPal, as well as localized gateways based on your target market.' },
    { q: 'Will I be able to update the website myself?', a: 'Yes. We build sites with user-friendly Content Management Systems (CMS) and provide remote training so your team can easily update text, add blog posts, or change images without needing a developer.' },
    { q: 'Do you provide website hosting?', a: 'Yes, or we can work with your existing host. Our hosted plan starts at R999 a month and includes hosting, SEO, AEO and GEO, and a monthly report. If you keep your own hosting, the same SEO, AEO, GEO and reporting on your domain starts at R799 a month. Prices include VAT.' },
    { q: 'What happens after the website goes live?', a: 'We submit your new site to Google, ensure all tracking (Analytics, Tag Manager) is working, and offer ongoing website maintenance retainers to help your site grow.' },
];

export function WebsiteDesignPage() {
    return (
        <PageLayout>
            <SEOHead
                title="Website Design South Africa – Modern Sites | DB23"
                description="Modern websites built for clarity, trust and conversion. Part of a broader digital growth system for SA businesses."
                canonical="https://db23.co.za/website-design/"
                keywords="website design South Africa, web development South Africa, custom web design SA, responsive website design South Africa"
                ogTitle="Website Design South Africa – Modern Sites | DB23"
                ogDescription="Modern websites built for clarity, trust and conversion. Part of a broader digital growth system for SA businesses."
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "Website Design", "item": "https://db23.co.za/website-design/" }
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
                        "@id": "https://db23.co.za/website-design/#service",
                        "name": "Website Design South Africa",
                        "description": "Modern websites built for clarity, trust, and conversion. Fast, mobile-friendly, SEO-optimised websites for South African businesses.",
                        "provider": { "@id": "https://db23.co.za/#organization" },
                        "serviceType": "Web Design",
                        "areaServed": { "@type": "Country", "name": "South Africa" },
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "ZAR",
                            "description": "Project-based pricing. Contact for a tailored quote."
                        },
                        "url": "https://db23.co.za/website-design/"
                    }
                ]}
            />

            <PageHero
                eyebrow="Website design · Cape Town & nationwide"
                title="Modern website design for South African businesses."
                intro="Your website is your 24/7 digital storefront. We build fast, mobile-first websites designed to capture leads and drive sales for South African businesses."
                primary={{ label: 'Get a web design quote', href: '/#contact', subject: 'Website Design Quote' }}
                secondary={{ label: 'See the work', href: '#work-showcase' }}
            />

            <Section
                id="features"
                title="Built for performance."
                intro="Every website we build follows strict technical standards so it loads fast, ranks well, and works on every screen."
            >
                <RuledList items={features} />
            </Section>

            <SelectedWork />

            <Section
                id="hosting"
                title="Hosting, SEO and reporting in one plan."
                intro="Keep your site online and getting found after launch. We host it for you, or work on your existing hosting. Every plan includes SEO, AEO and GEO with a monthly report."
            >
                <PriceTable plans={plans} note="Prices include VAT." />
            </Section>

            <PageFAQ faqs={faqs} title="Web design questions." />

            <CTABand
                title="Let's build a site that brings in enquiries."
                body="Tell us about your business and what the website needs to do. We'll come back with a practical plan and a quote."
                primary={{ label: 'Get a web design quote', href: '/#contact', subject: 'Website Design Quote' }}
                secondary={{ label: 'See hosting plans', href: '#hosting' }}
            />
        </PageLayout>
    );
}

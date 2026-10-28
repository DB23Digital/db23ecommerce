import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { CTABand, FeatureRows, PageHero, RuledList, Section } from '../components/PageBlocks';

const values = [
    { title: 'Practical over theory', body: 'We focus on AI tools and systems that deliver measurable business outcomes — not buzzwords or proof-of-concepts that never ship.' },
    { title: 'Plain language', body: 'Every concept is explained in plain English. Our clients are business people, not engineers. We bridge that gap deliberately.' },
    { title: 'Speed to value', body: 'We move fast. From consultation to implementation, we focus on getting real AI tools working in your business as quickly as possible.' },
    { title: 'SA business context', body: 'We understand the South African market — its unique challenges, budget constraints, infrastructure realities, and growth opportunities.' },
];

const strengths = [
    { title: 'SA-focused', body: 'Deep understanding of the local market' },
    { title: 'No jargon', body: 'Plain English, always' },
    { title: 'Practical', body: 'Real tools, real workflows' },
    { title: 'Measurable', body: 'ROI you can actually track' },
];

const services = [
    {
        title: 'Website design',
        body: 'Fast, mobile-first websites for South African businesses, built to capture leads and drive sales.',
        href: '/website-design/',
        linkLabel: 'Website design',
    },
    {
        title: 'Hosting & care',
        body: 'We host and look after your site from R999/month, or from R799/month if you keep your own hosting. Both include SEO, AEO and GEO and a monthly report. Prices include VAT.',
        href: '/#hosting',
        linkLabel: 'See hosting plans',
    },
    {
        title: 'SEO, AEO & GEO',
        body: 'Get found in Google and in AI answers, with clear monthly reporting on what is working.',
        href: '/seo-services/',
        linkLabel: 'SEO services',
    },
    {
        title: 'AI workshops & strategy',
        body: 'Practical AI workshops and strategy for small businesses. Voice AI is one example of what we can implement.',
        href: '/ai-workshops/',
        linkLabel: 'AI workshops',
    },
];

const trust = [
    { title: 'No technical background required', body: 'We explain everything in plain language.' },
    { title: 'Practical outcomes', body: 'From every engagement — no theoretical exercises.' },
    { title: 'SA-market expertise', body: 'We understand local business challenges.' },
];

export function AboutPage() {
    return (
        <PageLayout>
            <SEOHead
                title="About DB23 eCommerce | AI & Digital Services South Africa"
                description="DB23 eCommerce is an AI implementation partner helping South African businesses adopt practical AI, automation, modern websites, and digital systems that drive real growth."
                canonical="https://db23.co.za/about/"
                keywords="about DB23 eCommerce, AI consulting South Africa, AI implementation partner SA, digital agency Cape Town"
                ogTitle="About DB23 eCommerce | AI Implementation Partner South Africa"
                ogDescription="South Africa's practical AI implementation partner. We help businesses adopt AI without the jargon."
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "About", "item": "https://db23.co.za/about/" }
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "AboutPage",
                        "name": "About DB23 eCommerce",
                        "url": "https://db23.co.za/about/",
                        "description": "DB23 eCommerce is an AI implementation partner helping South African businesses adopt practical AI, automation, and modern digital systems.",
                        "mainEntity": { "@id": "https://db23.co.za/#organization" }
                    }
                ]}
            />

            <PageHero
                eyebrow="South Africa's AI Implementation Partner"
                title="We make AI practical for SA businesses."
                intro="DB23 eCommerce was founded to close the gap between AI hype and AI reality for South African businesses. We translate cutting-edge AI capabilities into practical tools and systems that actually work in the real world."
                primary={{ label: 'Start a Conversation', href: '/#contact' }}
                secondary={{ label: 'Explore AI Workshops', href: '/ai-workshops/' }}
            />

            <Section id="story" title="Built for the SA business owner.">
                <div className="grid gap-12 lg:grid-cols-12">
                    <div className="space-y-6 text-lg leading-relaxed text-text-muted lg:col-span-6">
                        <p>
                            South African businesses face a unique challenge: AI tools are advancing rapidly, but most of the guidance is aimed at large enterprises with dedicated tech teams and international budgets.
                        </p>
                        <p>
                            DB23 exists to change that. We work with SME owners, marketing teams, and leadership to identify where AI creates real commercial value — then implement the tools and systems to deliver it, without the jargon or the enterprise price tag.
                        </p>
                        <p>
                            From Cape Town, we serve South African businesses nationally and work with global clients online. Every engagement is practical, focused, and designed to deliver results you can measure.
                        </p>
                    </div>
                    <div className="lg:col-span-5 lg:col-start-8">
                        <RuledList items={strengths} columns={2} />
                    </div>
                </div>
            </Section>

            <Section
                id="principles"
                tone="paper"
                title="Our principles."
                intro="The values that shape every workshop, every project, and every client relationship."
            >
                <RuledList items={values} columns={4} tone="paper" />
            </Section>

            <Section
                id="services"
                title="What we do."
                intro="Website design, hosting and care, SEO, and AI workshops, built for South African business growth."
            >
                <FeatureRows items={services} />
            </Section>

            <Section
                id="trust"
                title="Trusted by SA businesses."
                intro="We've helped businesses across South Africa understand and implement AI in ways that actually move the needle."
            >
                <RuledList items={trust} columns={3} />
            </Section>

            <CTABand
                title="Ready to work together?"
                body="Tell us about your business and goals. We'll recommend the best starting point — message us on WhatsApp and we reply within the hour during business hours."
                primary={{ label: 'Contact Us', href: '/contact/' }}
                secondary={{ label: 'Book an AI Workshop', href: '/ai-workshops/' }}
            />
        </PageLayout>
    );
}

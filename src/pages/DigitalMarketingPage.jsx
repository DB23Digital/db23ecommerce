import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { CTABand, PageFAQ, PageHero, RuledList, Section, TextLink } from '../components/PageBlocks';


const services = [
    { title: 'SEO & search visibility', body: 'Get found on Google when South African customers search for your services. We focus on high-intent commercial keywords that drive leads.' },
    { title: 'Content & copywriting', body: 'High-quality, SEO-optimised content that builds trust. From website copy to ongoing blog articles designed to establish authority.' },
    { title: 'Lead generation', body: 'Targeted campaigns designed to capture high-quality B2B and B2C leads using modern funnels and automated qualification.' },
    { title: 'Data & analytics', body: 'No more guessing. Clear reporting on what is actually working, where your leads come from, and your real return on investment.' },
    { title: 'AI-enhanced marketing', body: 'We use the latest AI tools to produce more content, faster and cheaper — passing the efficiency and cost savings directly to you.' },
    { title: 'Digital strategy', body: 'A clear, actionable roadmap for your online presence. We align your digital marketing directly with your core business goals.' },
];

const benefits = [
    { title: 'Lead quality', body: 'Focus on lead quality, not just traffic' },
    { title: 'Lower costs', body: 'AI-driven efficiency = lower costs for you' },
    { title: 'Clear reporting', body: 'Clear, jargon-free monthly reporting' },
    { title: 'Local understanding', body: 'Deep understanding of SA business landscape' },
];

const faqs = [
    { q: 'What digital marketing services do small businesses need?', a: 'Most SMEs need a strong foundation: a conversion-focused website, solid local SEO, clear content, and a reliable lead generation channel. We focus on these core pillars rather than vanity metrics.' },
    { q: 'Do you work with businesses outside of Cape Town?', a: 'Yes. While we have a strong presence in Cape Town, we provide digital marketing services to businesses across South Africa.' },
    { q: 'How long does it take to see results from digital marketing?', a: 'It depends on the channel. Paid lead generation can deliver results in weeks. Organic SEO and content marketing is a long-term strategy that typically shows significant compounding growth after 3-6 months.' },
    { q: 'What is AI-enhanced marketing?', a: 'We use AI internally to speed up research, outline content, and analyse data. This allows us to deliver agency-quality marketing at a fraction of the cost, making professional marketing accessible to smaller businesses.' },
    { q: 'Can you just handle my SEO?', a: 'Yes. We offer standalone SEO services for businesses that already have their other marketing channels sorted. See our dedicated SEO Services page for details.' },
    { q: 'Do I get regular reports?', a: 'Yes. You receive clear, jargon-free monthly reports showing exactly what was done, what the results were (traffic, leads, conversions), and what the plan is for the next month.' },
];

export function DigitalMarketingPage() {
    return (
        <PageLayout>
            <SEOHead
                title="Digital Marketing South Africa – Outsourced | DB23"
                description="Outsourced digital marketing for SA businesses. SEO, content, social media and AI-assisted campaigns."
                canonical="https://db23.co.za/digital-marketing/"
                keywords="digital marketing services South Africa, outsourced digital marketing SA, digital marketing agency South Africa, AI digital marketing South Africa"
                ogTitle="Digital Marketing South Africa – Outsourced | DB23"
                ogDescription="Outsourced digital marketing for SA businesses. SEO, content, social media and AI-assisted campaigns."
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "Digital Marketing", "item": "https://db23.co.za/digital-marketing/" }
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
                        "@id": "https://db23.co.za/digital-marketing/#service",
                        "name": "Digital Marketing Services South Africa",
                        "description": "Practical digital marketing services for South African SMEs. SEO, lead generation, content, and AI-enhanced marketing.",
                        "provider": { "@id": "https://db23.co.za/#organization" },
                        "serviceType": "Digital Marketing",
                        "areaServed": { "@type": "Country", "name": "South Africa" },
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "ZAR",
                            "description": "Monthly retainer-based pricing. Contact for a tailored quote."
                        },
                        "url": "https://db23.co.za/digital-marketing/"
                    }
                ]}
            />


            <PageHero
                eyebrow="Digital marketing · South Africa"
                title="Digital marketing services for SA businesses."
                intro="We cut through the vanity metrics. DB23 provides practical, AI-enhanced digital marketing designed specifically for South African SMEs that want more leads, better visibility, and clear ROI."
                primary={{ label: 'Discuss your marketing', href: '/#contact' }}
                secondary={{ label: 'Explore services', href: '#services' }}
            />

            <Section id="answer" title="What does digital marketing do for a South African business?">
                <div className="max-w-3xl">
                    <p className="mb-6 text-pretty text-lg leading-relaxed text-text-muted">
                        Digital marketing for South African businesses means getting found online by the right customers at the right time — through search engines, content, and targeted campaigns — and converting that visibility into enquiries and revenue. Unlike traditional advertising that broadcasts to everyone, digital marketing targets specific audiences based on intent: people actively searching for your service in your area or sector. DB23 provides outsourced digital marketing covering SEO, content creation, lead generation, analytics, and AI-enhanced campaign management. All services are designed for South African SMEs that need agency-quality marketing at an accessible price point, with monthly reporting that shows exactly where your budget goes and what it produces.
                    </p>
                    <p className="border-l border-accent pl-5 text-sm leading-relaxed text-text-muted">
                        Businesses using AI-enhanced content marketing report 43% more organic traffic growth than those using traditional approaches. (Source: HubSpot State of Marketing 2025.) DB23 applies AI across content production, research, and campaign optimisation — passing that efficiency directly to clients as cost savings and faster results.
                    </p>
                </div>
            </Section>

            <Section
                id="services"
                title="Our digital marketing services."
                intro="We don't do everything. We focus on the high-impact channels that actually move the needle for small and medium businesses."
            >
                <RuledList items={services} />
            </Section>

            <Section id="why" title="AI-enhanced, business-focused.">
                <div className="grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <p className="mb-6 text-pretty text-lg leading-relaxed text-text-muted">
                            Traditional marketing agencies are often expensive and slow. By integrating AI into our own workflows, DB23 delivers high-quality content, rapid research, and comprehensive SEO at a fraction of the traditional cost.
                        </p>
                        <p className="mb-6 text-pretty text-lg leading-relaxed text-text-muted">
                            We speak plain English, focus on your actual bottom line, and provide absolute transparency on where your budget goes.
                        </p>
                        <TextLink href="/outsourced-marketing/">Explore outsourced marketing</TextLink>
                    </div>
                    <div className="lg:col-span-6 lg:col-start-7">
                        <RuledList items={benefits} columns={1} />
                    </div>
                </div>
            </Section>

            <PageFAQ faqs={faqs.map((f) => ({ q: f.q, a: f.a }))} title="Digital marketing questions." />

            <CTABand
                title="Ready to grow your online presence?"
                body="Stop wasting budget on marketing that doesn't deliver. Let's discuss a practical strategy tailored to your business goals."
                primary={{ label: 'Contact us today', href: '/#contact' }}
                secondary={{ label: 'View SEO services', href: '/seo-services/' }}
            />
        </PageLayout>
    );
}

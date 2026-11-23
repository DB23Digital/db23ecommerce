import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { CTABand, PageFAQ, PageHero, RuledList, Section } from '../components/PageBlocks';


const benefits = [
    { title: 'Instant marketing team', body: 'Get immediate access to copywriters, SEO experts, and strategists without the hiring delay or overhead.' },
    { title: 'Predictable costs', body: 'Fixed monthly retainers mean no surprise agency fees. You know exactly what you are paying and what you are getting.' },
    { title: 'Focus on your business', body: 'Stop trying to write blogs and manage social media at 8 PM. Let us handle the marketing while you run your company.' },
    { title: 'AI-powered efficiency', body: 'Our team uses the latest AI tools to deliver more output for your budget, getting you results faster than traditional agencies.' },
];

const deliverables = [
    'Ongoing technical & local SEO management',
    '2–4 high-quality blog posts or case studies',
    'Monthly newsletter creation and dispatch',
    'Website performance optimisation',
    'Monthly strategy and reporting call',
];

const faqs = [
    { q: 'Can DB23 handle outsourced marketing for my business?', a: 'Yes. We provide complete outsourced marketing support, acting as your remote marketing department. This gives you a full digital team without the overhead of hiring in-house.' },
    { q: 'What does an outsourced marketing team do?', a: 'We manage your ongoing digital presence. This includes monthly SEO work, content creation (blogs, case studies), website updates, lead generation campaigns, and regular performance reporting.' },
    { q: 'Is outsourced marketing cheaper than hiring in-house?', a: 'Almost always. Hiring a single mid-level marketing manager costs significantly more than a comprehensive outsourced retainer — and with outsourcing, you get a full team of specialists rather than one generalist.' },
    { q: 'How does the process work?', a: 'We start with a strategy workshop to understand your goals. Then, we agree on a monthly retainer that covers specific deliverables (e.g., 2 SEO blogs, 1 newsletter, website management, and SEO tracking). We execute, report, and optimise monthly.' },
    { q: 'Are we locked into a long contract?', a: 'No. We believe in earning your business every month. While marketing takes time to show compounding results, our retainers operate on flexible terms without punishing lock-in clauses.' },
    { q: 'Do we still have a say in what gets published?', a: 'Absolutely. We establish an approval workflow that suits you. You have final sign-off on all content and campaigns before they go live.' },
];

export function OutsourcedMarketingPage() {
    return (
        <PageLayout>
            <SEOHead
                title="Outsourced Marketing Team South Africa | Fixed Retainer | DB23"
                description="Your marketing department on a fixed monthly retainer: strategy, SEO, content and paid, run by a Cape Town team. No lock-in. See what each month includes."
                canonical="https://db23.co.za/outsourced-marketing/"
                keywords="outsourced marketing South Africa, fractional marketing team SA, marketing as a service South Africa, outsourced digital team South Africa"
                ogTitle="Outsourced Marketing Team South Africa | Fixed Retainer | DB23"
                ogDescription="Your marketing department on a fixed monthly retainer: strategy, SEO, content and paid, run by a Cape Town team. No lock-in. See what each month includes."
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "Outsourced Marketing", "item": "https://db23.co.za/outsourced-marketing/" }
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
                        "@id": "https://db23.co.za/outsourced-marketing/#service",
                        "name": "Outsourced Marketing South Africa",
                        "description": "Full-service outsourced digital marketing team for South African businesses. Expert SEO, content, and strategy without in-house overhead.",
                        "provider": { "@id": "https://db23.co.za/#organization" },
                        "serviceType": "Outsourced Marketing",
                        "areaServed": { "@type": "Country", "name": "South Africa" },
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "ZAR",
                            "description": "Fixed monthly retainer pricing. Contact for a tailored quote."
                        },
                        "url": "https://db23.co.za/outsourced-marketing/"
                    }
                ]}
            />


            <PageHero
                eyebrow="Outsourced marketing · South Africa"
                title="Outsourced marketing for growing SA businesses."
                intro="DB23 acts as your remote marketing department. We handle your SEO, content, lead generation, and website management so you can focus on running your business."
                primary={{ label: 'Discuss retainers', href: '/#contact' }}
                secondary={{ label: 'See the benefits', href: '#how-it-helps' }}
            />

            <Section
                id="how-it-helps"
                title="The smart way for SMEs to scale."
                intro={
                    <>
                        Building an in-house marketing team is expensive, slow, and hard to manage. Outsourcing gives you immediate access to experts.{' '}
                        <a href="/blog/outsourced-marketing-vs-in-house-south-africa/" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-accent">See the cost comparison</a>.
                    </>
                }
            >
                <RuledList items={benefits} columns={4} />
            </Section>

            <Section id="comparison" title="Stop paying for downtime.">
                <div className="grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-6">
                        <p className="mb-6 text-pretty text-lg leading-relaxed text-text-muted">
                            When you hire a full-time marketing manager, you pay for their sick leave, training, software licenses, and downtime. And often, one person doesn't have the skills to do SEO, copywriting, design, and strategy perfectly.
                        </p>
                        <p className="text-pretty text-lg leading-relaxed text-text-muted">
                            With DB23's outsourced marketing, you pay a flat fee for the outputs you actually need. You get a fractional team of specialists, supported by AI to move faster.
                        </p>
                    </div>
                    <div className="lg:col-span-5 lg:col-start-8">
                        <h3 className="mb-6 text-2xl font-medium tracking-tight text-white">Typical monthly deliverables</h3>
                        <ul className="border-b border-white/10">
                            {deliverables.map((item) => (
                                <li key={item} className="flex gap-3 border-t border-white/10 py-4 text-text-muted">
                                    <span className="mt-3 h-px w-3 shrink-0 bg-white/40" aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>

            <PageFAQ faqs={faqs.map((f) => ({ q: f.q, a: f.a }))} title="Outsourced marketing questions." />

            <CTABand
                title="Get a custom proposal."
                primary={{ label: 'Get a custom proposal', href: '/#contact' }}
            />
        </PageLayout>
    );
}

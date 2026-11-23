import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { useCurrency } from '../components/CurrencyContext';
import { FounderBio } from '../components/FounderBio';
import { CTABand, PageFAQ, PageHero, PriceTable, RuledList, Section, Steps } from '../components/PageBlocks';

const modules = [
    { title: 'AI fundamentals', body: 'What AI actually is, how it works, and what it means for your business — in plain language.' },
    { title: 'AI tools for teams', body: 'Hands-on introduction to practical AI tools your team can use immediately to save time.' },
    { title: 'Workflow automation', body: 'Identify repetitive tasks draining your team and map them to real automation opportunities.' },
    { title: 'Marketing and content AI', body: 'Use AI to improve communication, content production, and marketing efficiency.' },
    { title: 'AI customer engagement', body: 'Voice AI, chat systems, and intelligent lead handling — practical customer-facing AI.' },
    { title: 'Business modernization', body: 'How AI fits into your operations and where the biggest commercial opportunities are.' },
];

const packages = [
    { name: 'Tier 1 — Introductory Workshop (1 team, up to 6 people)', priceZAR: 'From R4,500', priceUSD: 'From $300', features: ['90 mins to 2 hours', 'Practical AI overview', 'Ideal for SME owners', 'Online or in-person', 'Q&A included'], cta: 'Enquire Now' },
    { name: 'Tier 2 — Practical AI for Teams (up to 15 people)', priceZAR: 'From R12,500', priceUSD: 'From $700', label: 'Most Popular', features: ['Half-day workshop', 'Team enablement focus', 'Workflow analysis included', 'Productivity-focused exercises', 'Opportunity mapping'], cta: 'Book Team Workshop', featured: true },
    { name: 'Tier 3 — Leadership Modernization Session', priceZAR: 'Custom Pricing', priceUSD: 'Custom Pricing', features: ['Full-day strategic session', 'Leadership & executive focus', 'AI opportunity mapping', 'Automation recommendations', 'Implementation roadmap'], cta: 'Schedule Strategy Session' },
];

const audiences = [
    'Business Owners & Founders', 'Leadership & Management Teams',
    'Marketing & Sales Teams', 'Operations & Admin Staff',
    'SMEs Ready to Modernize', 'Teams with No Technical Background',
];

const steps = [
    { title: 'Book your session', body: 'Choose a workshop format and submit your enquiry. We confirm availability and arrange a brief needs discussion.' },
    { title: 'Pre-session discovery', body: 'We learn about your business, team size, and goals so the workshop is tailored to your real challenges.' },
    { title: 'Workshop day', body: 'A focused, practical session with real tools, live examples, and no jargon. Interactive and business-specific.' },
    { title: 'Opportunity map', body: 'After the session you receive a clear summary of your biggest AI opportunities and recommended next steps.' },
];

const faqs = [
    { q: 'What is an AI workshop?', a: 'An AI workshop is a structured, practical session that helps your business understand how AI works and where it creates real value — without needing any technical background. DB23 workshops are focused on business application, not theory.' },
    { q: 'Who should attend an AI business workshop?', a: 'Anyone who makes decisions, manages processes, or leads teams will benefit — owners, managers, marketing teams, sales staff, operations leads, and executive teams.' },
    { q: 'Do we need technical skills to attend?', a: 'No. DB23 explains everything in plain business language with practical examples. The workshops are designed for people who want to understand and use AI — not build it.' },
    { q: 'How much does an AI workshop cost?', a: 'There are three tiers. Tier 1, the introductory workshop for one team of up to six people, starts from R4,500. Tier 2, Practical AI for Teams, is a half-day session for up to fifteen people from R12,500. Tier 3, the full-day leadership modernization session, is custom-priced on scope. International equivalent pricing is provided on enquiry.' },
    { q: 'Are AI workshops available online?', a: 'Yes. DB23 delivers workshops online via video call to teams anywhere in South Africa. We also offer in-person sessions at your premises in Cape Town, Johannesburg, Durban and other major centres upon request.' },
    { q: 'What happens after an AI workshop?', a: 'You receive an opportunity map highlighting your biggest AI and automation opportunities. From there you can implement specific tools yourself, engage DB23 for automation, or move onto a multi-week AI training programme for the wider team.' },
    { q: 'Is a workshop the same as AI training?', a: 'No. A workshop is one fixed-price session from R4,500 with no follow-up commitment — it is the fastest way to show a team what AI can do for their own work. AI training is a programme: four to eight weeks of live sessions with practice tasks between them, built for teams that need AI in their daily workflow rather than an introduction to it.' },
    { q: 'Are AI workshops worth it for small businesses?', a: 'Yes — especially now. AI tools are accessible and affordable for SMEs. A workshop helps your team understand what\'s possible before spending on tools, making your investment far more targeted.' },
    { q: 'How long does an AI workshop take?', a: 'Introductory sessions run 90 minutes to 2 hours. Team workshops are half-day. Strategic leadership sessions are full-day. Custom durations are available on request.' },
];

export function AIWorkshopsPage() {
    const { currency } = useCurrency();

    const dynamicFaqs = faqs.map(faq => {
        if (faq.q === 'How much does an AI workshop cost?') {
            return {
                q: faq.q,
                a: currency === 'ZAR'
                    ? 'DB23 introductory virtual workshops start from R4,500 (ZAR). Team workshops start from R12,500 (ZAR). Leadership and full-day strategic sessions are custom-priced based on your specific requirements.'
                    : 'DB23 introductory virtual workshops start from $300 (USD). Team workshops start from $700 (USD). Leadership and full-day strategic sessions are custom-priced based on your specific requirements.'
            };
        }
        return faq;
    });

    const plans = packages.map(pkg => ({
        name: pkg.name,
        price: currency === 'ZAR' ? pkg.priceZAR : pkg.priceUSD,
        label: pkg.label,
        features: pkg.features,
        cta: pkg.cta,
        href: '/#contact',
        featured: pkg.featured,
    }));

    return (
        <PageLayout>
            <SEOHead
                title="AI Workshops South Africa | Fixed Price from R4,500 | DB23"
                description="One-off AI workshops for SA teams: 90-minute intro from R4,500, half-day team session from R12,500. Online or in Cape Town, built around your own tasks."
                canonical="https://db23.co.za/ai-workshops/"
                keywords="AI workshops South Africa, business AI workshop, AI training South Africa, corporate AI training South Africa, AI upskilling South Africa"
                ogTitle="AI Workshops South Africa | Fixed Price from R4,500 | DB23"
                ogDescription="One-off AI workshops for SA teams: 90-minute intro from R4,500, half-day team session from R12,500. Online or in Cape Town, built around your own tasks."
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "AI Workshops", "item": "https://db23.co.za/ai-workshops/" }
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
                        "@id": "https://db23.co.za/ai-workshops/#service",
                        "name": "AI Workshops for South African Businesses",
                        "description": "Practical AI workshops for SA business teams. Hands-on training, real tools, no jargon.",
                        "provider": { "@id": "https://db23.co.za/#organization" },
                        "serviceType": "AI Training Workshop",
                        "areaServed": { "@type": "Country", "name": "South Africa" },
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "ZAR",
                            "priceSpecification": {
                                "@type": "UnitPriceSpecification",
                                "priceCurrency": "ZAR",
                                "minPrice": "4500",
                                "maxPrice": "12500",
                                "description": "Introductory virtual from R4,500. Team workshops from R12,500."
                            }
                        },
                        "url": "https://db23.co.za/ai-workshops/"
                    }
                ]}
            />

            <PageHero
                eyebrow="AI workshops · Cape Town & online"
                title="AI workshops for South African business teams."
                intro={
                    <>
                        DB23 workshops are single fixed-price sessions — from R4,500, 90 minutes to a full day — that get a South African business team using real AI tools in their own workflows. No technical background needed, no ongoing commitment. Need the whole team changing how they work over several weeks? That's an{' '}
                        <a href="/ai-training/" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-accent">AI training programme</a>.
                    </>
                }
                primary={{ label: 'Book your AI workshop', href: '/#contact' }}
                secondary={{ label: 'View packages and pricing', href: '#workshop-packages' }}
            />

            <Section id="what-is-workshop" title="What is an AI workshop for business?">
                <div className="max-w-3xl">
                    <p className="mb-8 text-pretty text-lg leading-relaxed text-text-muted">
                        An AI workshop for business is a structured training session — typically 90 minutes to a full day — where employees learn to use AI tools in their actual daily job roles. Unlike academic AI courses, DB23 workshops skip theory and mathematics to focus entirely on practical application: using ChatGPT to draft communications, automating repetitive data tasks, or building AI into customer engagement workflows. Sessions run online for distributed teams across South Africa, or in-person at your premises. The introductory workshop format starts from R4,500 and runs 90 minutes to 2 hours. Team workshops run half a day from R12,500. No technical background is required from attendees. The goal is one clear outcome: each participant leaves with at least one AI workflow they can use the very next working day.
                    </p>
                    <p className="border-l border-accent pl-5 text-sm leading-relaxed text-text-muted">
                        A 2024 Deloitte Africa Digital Skills survey found 71% of South African business owners want to adopt AI but cite a skills gap as the primary barrier. AI workshops directly close that gap — turning intent into practical capability.
                    </p>
                </div>
            </Section>

            <Section
                id="modules"
                title="What you'll learn."
                intro="Every DB23 AI workshop is tailored to your business context. Core modules are adapted to your team's level and goals."
            >
                <RuledList items={modules} />
            </Section>

            <Section
                id="workshop-packages"
                title="AI workshop packages."
                intro="Choose the format that fits your team size, goals, and timeline. All packages available online or in-person."
            >
                <PriceTable plans={plans} />
            </Section>

            <Section
                id="who-its-for"
                tone="paper"
                title="Built for business teams, not technologists."
                intro="You don't need a software background to benefit from AI. These workshops are designed for the people who run, lead, and grow modern businesses every day."
            >
                <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                    {audiences.map(a => (
                        <li key={a} className="border-t border-ink/15 py-5 text-lg font-medium tracking-tight text-ink">{a}</li>
                    ))}
                </ul>
            </Section>

            <Section
                id="process"
                title="What to expect."
                intro="A clear, no-surprise process from booking to your AI action plan."
            >
                <Steps steps={steps} />
            </Section>

            <PageFAQ faqs={dynamicFaqs} title="AI workshop questions." />

            <FounderBio />

            <CTABand
                title="Ready to run an AI workshop?"
                body="Tell us about your team and goals. We'll recommend the right workshop format and get back to you with a practical next step."
                primary={{ label: 'Book an AI workshop', href: '/#contact' }}
                secondary={{ label: 'Explore Voice AI', href: '/voice-ai/' }}
            />
        </PageLayout>
    );
}

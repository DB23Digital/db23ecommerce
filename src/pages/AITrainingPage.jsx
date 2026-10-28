import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { FounderBio } from '../components/FounderBio';
import { CTABand, FeatureRows, PageFAQ, PageHero, RuledList, Section } from '../components/PageBlocks';

const modules = [
    { title: 'AI fundamentals for business', body: 'What AI is, how it works, and what it means practically for your business operations, team, and competitive landscape.' },
    { title: 'Practical AI tools', body: 'Hands-on training with real AI tools your team can start using immediately — from content creation to analysis and productivity.' },
    { title: 'Workflow automation', body: 'Map your most repetitive processes and identify exactly where automation can save hours of manual work each week.' },
    { title: 'Marketing and content AI', body: 'Use AI to improve marketing output, generate content faster, personalise communication, and grow brand reach efficiently.' },
    { title: 'AI customer engagement', body: 'Practical training on AI chatbots, voice systems, and automated customer communication tools for better service at lower cost.' },
    { title: 'AI strategy for leadership', body: 'For executives and decision-makers: how to evaluate AI opportunities, build an AI roadmap, and lead a modern digital business.' },
];

const outcomes = [
    'Understand what AI can and cannot do for your specific business',
    'Know which AI tools are worth investing in vs. which to avoid',
    'Identify your highest-value automation opportunities',
    'Use AI tools confidently for marketing, content, and communication',
    'Build a practical AI implementation roadmap for your business',
    'Reduce repetitive admin and free up team capacity',
    'Improve customer response times and engagement quality',
    'Make informed AI investment decisions with confidence',
];

const formats = [
    { title: '4-Week Team Programme', body: 'One live session a week for four weeks, with role-specific practice tasks between sessions so the tools land in real work, not in a notebook. Delivered in-person at your premises or online.', meta: 'Most popular' },
    { title: '8-Week Department Programme', body: 'Two tracks running in parallel over eight weeks — one for the people doing the work, one for the managers reviewing it — with a shared adoption review at the halfway mark.' },
    { title: 'Ongoing Retained Training', body: 'A standing monthly session for teams that have finished a programme: new tools, new workflows, and support for the automations already running in the business.' },
];

const audiences = [
    'Business owners and founders', 'Marketing and content teams',
    'Sales and customer service teams', 'Operations and admin staff',
    'Leadership and management teams', 'Businesses with no IT department',
];

const faqs = [
    { q: 'What is AI training for businesses?', a: 'Business AI training teaches your team how to understand, use, and apply AI tools practically in your daily operations — without needing a technical background. DB23\'s AI training is focused entirely on real business applications.' },
    { q: 'What do teams learn in AI training?', a: 'Teams learn how AI tools work, which tools are most useful for their role, how to automate repetitive tasks, how to use AI for marketing and content, and how to identify AI opportunities in their specific workflows.' },
    { q: 'How long does an AI training programme take?', a: 'DB23 AI training runs as a multi-week programme, not a single session. The standard team programme is four weekly sessions; department-wide programmes run over eight weeks with two parallel tracks. Teams that want a one-off session instead should book an AI workshop, which starts from R4,500.' },
    { q: 'Should we book an AI workshop or an AI training programme?', a: 'Book an AI workshop if you want one fixed-price session to introduce AI to a team — 90 minutes to a full day, from R4,500, no follow-up commitment. Book an AI training programme if you need the whole team using AI in their daily work: multiple sessions over four to eight weeks, practice tasks between them, and a measured adoption review at the end. Most businesses start with a workshop and move to a programme once they know which workflows they want to change.' },
    { q: 'Is AI training suitable for non-technical staff?', a: 'Absolutely. DB23 AI training is built specifically for business people — not developers or engineers. We explain AI in plain language with practical examples that make sense for your team\'s day-to-day work.' },
    { q: 'Can AI training be customised for our industry?', a: 'Yes. DB23 tailors AI training content to your industry, team roles, and specific business challenges. Training for a marketing team looks very different from training for an operations team.' },
    { q: 'What AI tools do you cover in training?', a: 'DB23 training covers a range of practical AI tools including AI writing assistants, image generation, automation platforms, AI customer engagement tools, workflow tools, and voice AI systems — selected based on your team\'s needs.' },
    { q: 'Does DB23 offer ongoing AI training support?', a: 'Yes. Programmes can continue as a retained monthly session covering new tools, new workflows, and support for the automations already running in the business.' },
];

export function AITrainingPage() {
    return (
        <PageLayout>
            <SEOHead
                title="AI Training South Africa – Business Teams | DB23"
                description="Practical AI training programs for SA managers, marketing teams and operational staff. No tech background needed."
                canonical="https://db23.co.za/ai-training/"
                keywords="AI training South Africa, AI training for businesses, business AI training, corporate AI training South Africa, AI upskilling South Africa"
                ogTitle="AI Training South Africa – Business Teams | DB23"
                ogDescription="Practical AI training programs for SA managers, marketing teams and operational staff. No tech background needed."
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "AI Training", "item": "https://db23.co.za/ai-training/" }
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
                        "@id": "https://db23.co.za/ai-training/#service",
                        "name": "AI Training Programs for South African Business Teams",
                        "description": "Multi-week AI training programmes for South African business teams — four to eight weeks of live sessions with practice tasks between them. No technical background required.",
                        "provider": { "@id": "https://db23.co.za/#organization" },
                        "serviceType": "AI Business Training",
                        "areaServed": { "@type": "Country", "name": "South Africa" },
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "ZAR",
                            "description": "Multi-week team programme, quoted per team on size, number of sessions and format. One-off sessions are priced separately as AI workshops from R4,500."
                        },
                        "url": "https://db23.co.za/ai-training/"
                    }
                ]}
            />

            <PageHero
                eyebrow="AI training · Multi-week team programmes"
                title="Practical AI training for SA businesses."
                intro={
                    <>
                        DB23 runs multi-week AI training programmes for South African business teams — four to eight weeks of live sessions, with role-specific practice tasks between them so the skills stick. Looking for a single fixed-price session instead? That's an{' '}
                        <a href="/ai-workshops/" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-accent">AI workshop, from R4,500</a>.
                    </>
                }
                primary={{ label: 'Enquire about AI training', href: '/#contact' }}
                secondary={{ label: 'View training formats', href: '#training-formats' }}
            />

            <Section
                id="modules"
                title="What our AI training covers."
                intro="Training modules are selected and sequenced based on your team's role and your business priorities — not a generic curriculum."
            >
                <RuledList items={modules} />
            </Section>

            <Section
                id="outcomes"
                title="What your team will be able to do."
                intro="By the end of DB23 AI training, your team will have practical, actionable AI capability — not just theoretical understanding. Here's what that looks like in practice:"
            >
                <ul className="grid gap-x-10 md:grid-cols-2">
                    {outcomes.map(o => (
                        <li key={o} className="flex gap-4 border-t border-white/10 py-5 text-lg leading-snug text-white/90">
                            <span className="mt-3 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                            {o}
                        </li>
                    ))}
                </ul>
            </Section>

            <Section
                id="training-formats"
                title="Programme structures."
                intro="Every option runs over multiple weeks. Pick the shape that matches your team size and how fast you need the capability in place."
            >
                <FeatureRows items={formats} />
            </Section>

            <Section
                id="who-its-for"
                tone="paper"
                title="Built for every business role."
                intro="DB23 AI training is relevant across your entire organisation. No technical role required."
            >
                <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                    {audiences.map(a => (
                        <li key={a} className="border-t border-ink/15 py-5 text-lg font-medium tracking-tight text-ink">{a}</li>
                    ))}
                </ul>
            </Section>

            <PageFAQ faqs={faqs} title="AI training questions." />

            <FounderBio />

            <CTABand
                title="Ready to build real AI capability?"
                body="Tell us about your team, your goals, and your timeline. We'll design the right AI training programme for your business and get back to you with a practical next step."
                primary={{ label: 'Enquire about AI training', href: '/#contact' }}
                secondary={{ label: 'View AI workshops', href: '/ai-workshops/' }}
            />
        </PageLayout>
    );
}

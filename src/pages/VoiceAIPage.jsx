import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { FounderBio } from '../components/FounderBio';
import { CTABand, PageFAQ, PageHero, RuledList, Section, Steps } from '../components/PageBlocks';

const useCases = [
    { title: 'AI voice receptionist', body: 'Handle every incoming call professionally 24/7. Your AI receptionist greets callers, answers FAQs, and routes enquiries to the right person — even after hours.' },
    { title: 'Lead qualification', body: 'Automatically qualify inbound leads before they reach your team. Your Voice AI asks the right questions and scores prospects in real time.' },
    { title: 'Appointment booking', body: 'Let customers book, reschedule, or confirm appointments via voice — connected to your calendar system without human intervention.' },
    { title: 'Customer FAQ handling', body: 'Answer your most common customer questions instantly via voice. Reduce call volumes on your team for repetitive enquiries.' },
    { title: 'Automated follow-ups', body: 'Trigger outbound voice calls for appointment reminders, payment follow-ups, or post-sale check-ins — automatically and at scale.' },
    { title: 'After-hours coverage', body: 'Never lose a lead because your office is closed. Your Voice AI takes messages, answers questions, and creates leads for your team to follow up.' },
];

const benefits = [
    { title: 'Never miss a lead', body: 'Every call answered, even at 2am.' },
    { title: 'Reduce call costs', body: 'Automate repetitive, high-volume calls.' },
    { title: 'Scale without hiring', body: 'Handle 10x the calls with the same team.' },
    { title: 'Data from every call', body: 'Logs, transcripts, and insights from every interaction.' },
];

const howItWorks = [
    { title: 'Discovery consultation', body: 'We map your incoming call types, common questions, lead flow, and business goals to design the right Voice AI solution.' },
    { title: 'Voice and script design', body: 'We write the conversation flows, scripts, and response logic — tailored to your brand tone and business processes.' },
    { title: 'Integration and setup', body: 'Your Voice AI is connected to your existing phone number, CRM, calendar, or communication tools as needed.' },
    { title: 'Testing and refinement', body: 'We run full test scenarios across call types to ensure natural, accurate responses before going live.' },
    { title: 'Go live and optimise', body: 'Your Voice AI goes live. We monitor performance, review call logs, and continuously optimise responses over time.' },
];

const faqs = [
    { q: 'What is a Voice AI solution?', a: 'Voice AI is an intelligent, automated voice system that handles phone calls using artificial intelligence. It can greet callers, answer questions, qualify leads, book appointments, and route calls — without a human operator.' },
    { q: 'How does Voice AI work for small businesses?', a: 'Voice AI connects to your existing phone number and handles calls automatically. It uses natural language processing to understand what callers say and responds intelligently — just like a human receptionist, but available 24/7 at a fraction of the cost.' },
    { q: 'Can a small business afford Voice AI?', a: 'Yes. DB23 designs Voice AI solutions scaled to SME budgets. Unlike enterprise voice platforms, our solutions are practical and priced for South African small and medium businesses.' },
    { q: 'Does Voice AI sound robotic?', a: 'No. Modern Voice AI uses natural-sounding speech synthesis that is indistinguishable from a human in many cases. DB23 designs conversation flows that feel natural, professional, and on-brand.' },
    { q: 'What phone systems does Voice AI integrate with?', a: 'DB23 Voice AI solutions can integrate with most South African VoIP systems, landlines, and mobile numbers. We also connect to CRMs, calendars, and communication tools like WhatsApp and email where needed.' },
    { q: 'Will Voice AI replace my receptionist?', a: 'Not necessarily. Voice AI handles repetitive, high-volume call tasks — freeing your team to focus on complex, high-value interactions. Many businesses use Voice AI to extend their team\'s capacity rather than replace anyone.' },
    { q: 'How long does it take to set up a Voice AI system?', a: 'Most DB23 Voice AI implementations take 2–4 weeks from discovery to go-live, depending on complexity and the number of integrations required.' },
    { q: 'Can Voice AI handle South African accents and languages?', a: 'Yes. Modern Voice AI platforms support South African English and are continuously improving. DB23 tests and tunes your system specifically for your caller base during setup.' },
];

export function VoiceAIPage() {
    return (
        <PageLayout>
            <SEOHead
                title="Voice AI South Africa – AI Receptionists | DB23"
                description="AI voice receptionists and automated lead qualification for South African businesses. Available 24/7."
                canonical="https://db23.co.za/voice-ai/"
                keywords="Voice AI South Africa, AI voice receptionist South Africa, AI call handling, voice AI for small business, AI phone system South Africa"
                ogTitle="Voice AI South Africa – AI Receptionists | DB23"
                ogDescription="AI voice receptionists and automated lead qualification for South African businesses. Available 24/7."
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "Voice AI", "item": "https://db23.co.za/voice-ai/" }
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
                        "@id": "https://db23.co.za/voice-ai/#service",
                        "name": "Voice AI Solutions for South African Businesses",
                        "description": "AI voice receptionists, automated lead qualification, and customer engagement systems for SA businesses.",
                        "provider": { "@id": "https://db23.co.za/#organization" },
                        "serviceType": "Voice AI Implementation",
                        "areaServed": { "@type": "Country", "name": "South Africa" },
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "ZAR",
                            "description": "Custom pricing based on call volume and configuration. Contact for a tailored quote."
                        },
                        "url": "https://db23.co.za/voice-ai/"
                    }
                ]}
            />

            <PageHero
                eyebrow="Voice AI · Cape Town & nationwide"
                title="Voice AI solutions for SA businesses."
                intro="DB23 builds intelligent Voice AI systems that handle your inbound calls, qualify leads, book appointments, and answer customer questions — 24 hours a day, 7 days a week, at a fraction of the cost of a full-time receptionist."
                primary={{ label: 'Get a Voice AI quote', href: '/#contact' }}
                secondary={{ label: 'How it works', href: '#how-it-works' }}
            />

            <Section id="what-is-voice-ai" title="What is Voice AI for business?">
                <div className="max-w-3xl">
                    <p className="mb-8 text-pretty text-lg leading-relaxed text-text-muted">
                        Voice AI for business is an intelligent automated phone system that handles inbound and outbound calls using artificial intelligence — without a human operator. It greets callers, answers frequently asked questions, qualifies new leads, books appointments, and routes complex queries to your team, all in real time, 24 hours a day, 7 days a week. Unlike basic IVR menu systems, Voice AI uses natural language processing to understand what callers actually say and respond naturally. DB23 designs and implements Voice AI systems specifically for South African businesses, integrated with your existing phone number, CRM, and calendar tools. Most implementations go live within 2 to 4 weeks. The system handles up to 200 concurrent calls simultaneously, eliminating queues entirely during peak periods.
                    </p>
                    <p className="border-l border-accent pl-5 text-sm leading-relaxed text-text-muted">
                        South African call centres report that 68% of inbound calls are repetitive enquiries that could be handled by AI without human involvement. (Source: Frost &amp; Sullivan, 2024 SA Contact Centre Report.) Voice AI converts this cost centre into a scalable, always-on customer engagement system.
                    </p>
                </div>
            </Section>

            <Section
                id="use-cases"
                title="What Voice AI does for your business."
                intro="From handling reception calls to qualifying leads and booking appointments — Voice AI takes over the repetitive, time-consuming call work so your team doesn't have to."
            >
                <RuledList items={useCases} />
            </Section>

            <Section
                id="how-it-works"
                title="How we build your Voice AI."
                intro="A structured, clear implementation process from consultation to a live, working Voice AI system."
            >
                <Steps steps={howItWorks} />
            </Section>

            <Section id="benefits" tone="paper" title="Why businesses use it.">
                <RuledList items={benefits} columns={4} tone="paper" />
            </Section>

            <PageFAQ faqs={faqs} title="Voice AI questions." intro="Everything you need to know about Voice AI for South African businesses." />

            <FounderBio />

            <CTABand
                title="Ready to put Voice AI to work?"
                body="Tell us about your call volume and business goals. We'll design a Voice AI solution that fits your budget and starts delivering results quickly."
                primary={{ label: 'Get a Voice AI quote', href: '/#contact' }}
                secondary={{ label: 'Explore AI workshops', href: '/ai-workshops/' }}
            />
        </PageLayout>
    );
}

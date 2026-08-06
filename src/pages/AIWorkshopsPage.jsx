import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Bot, Brain, BriefcaseBusiness, CheckCircle, Megaphone, Minus, Plus, Sparkles, Users, Workflow } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/Button';
import { useCurrency } from '../components/CurrencyContext';
import { FounderBio } from '../components/FounderBio';

const modules = [
    { icon: <Brain className="h-6 w-6" />, title: 'AI Fundamentals', desc: 'What AI actually is, how it works, and what it means for your business — in plain language.' },
    { icon: <Users className="h-6 w-6" />, title: 'AI Tools for Teams', desc: 'Hands-on introduction to practical AI tools your team can use immediately to save time.' },
    { icon: <Workflow className="h-6 w-6" />, title: 'Workflow Automation', desc: 'Identify repetitive tasks draining your team and map them to real automation opportunities.' },
    { icon: <Megaphone className="h-6 w-6" />, title: 'Marketing & Content AI', desc: 'Use AI to improve communication, content production, and marketing efficiency.' },
    { icon: <Bot className="h-6 w-6" />, title: 'AI Customer Engagement', desc: 'Voice AI, chat systems, and intelligent lead handling — practical customer-facing AI.' },
    { icon: <BriefcaseBusiness className="h-6 w-6" />, title: 'Business Modernization', desc: 'How AI fits into your operations and where the biggest commercial opportunities are.' },
];

const packages = [
    { name: 'Introductory Business AI Workshop', priceZAR: 'From R4,500', priceUSD: 'From $300', features: ['90 mins to 2 hours', 'Practical AI overview', 'Ideal for SME owners', 'Online or in-person', 'Q&A included'], cta: 'Enquire Now', featured: false },
    { name: 'Practical AI for Teams', priceZAR: 'From R12,500', priceUSD: 'From $700', tag: 'Most Popular', features: ['Half-day workshop', 'Team enablement focus', 'Workflow analysis included', 'Productivity-focused exercises', 'Opportunity mapping'], cta: 'Book Team Workshop', featured: true },
    { name: 'AI Business Modernization Session', priceZAR: 'Custom Pricing', priceUSD: 'Custom Pricing', features: ['Full-day strategic session', 'Leadership & executive focus', 'AI opportunity mapping', 'Automation recommendations', 'Implementation roadmap'], cta: 'Schedule Strategy Session', featured: false },
];

const audiences = [
    'Business Owners & Founders', 'Leadership & Management Teams',
    'Marketing & Sales Teams', 'Operations & Admin Staff',
    'SMEs Ready to Modernize', 'Teams with No Technical Background',
];

const steps = [
    { n: '01', title: 'Book Your Session', body: 'Choose a workshop format and submit your enquiry. We confirm availability and arrange a brief needs discussion.' },
    { n: '02', title: 'Pre-Session Discovery', body: 'We learn about your business, team size, and goals so the workshop is tailored to your real challenges.' },
    { n: '03', title: 'Workshop Day', body: 'A focused, practical session with real tools, live examples, and no jargon. Interactive and business-specific.' },
    { n: '04', title: 'Opportunity Map', body: 'After the session you receive a clear summary of your biggest AI opportunities and recommended next steps.' },
];

const faqs = [
    { q: 'What is an AI workshop?', a: 'An AI workshop is a structured, practical session that helps your business understand how AI works and where it creates real value — without needing any technical background. DB23 workshops are focused on business application, not theory.' },
    { q: 'Who should attend an AI business workshop?', a: 'Anyone who makes decisions, manages processes, or leads teams will benefit — owners, managers, marketing teams, sales staff, operations leads, and executive teams.' },
    { q: 'Do we need technical skills to attend?', a: 'No. DB23 explains everything in plain business language with practical examples. The workshops are designed for people who want to understand and use AI — not build it.' },
    { q: 'How much does an AI workshop cost?', a: 'DB23 introductory virtual workshops start from R4,500 (ZAR). Team workshops start from R12,500 (ZAR). Leadership and full-day strategic sessions are custom-priced based on your specific requirements. International equivalent pricing is provided upon inquiry.' },
    { q: 'Are AI workshops available online?', a: 'Yes. DB23 delivers workshops online via video call to teams anywhere in South Africa. We also offer in-person sessions at your premises in Cape Town, Johannesburg, Durban and other major centres upon request.' },
    { q: 'What happens after an AI workshop?', a: 'You receive an opportunity map highlighting your biggest AI and automation opportunities. From there you can implement specific tools, engage DB23 for automation, or continue with further training.' },
    { q: 'Are AI workshops worth it for small businesses?', a: 'Yes — especially now. AI tools are accessible and affordable for SMEs. A workshop helps your team understand what\'s possible before spending on tools, making your investment far more targeted.' },
    { q: 'How long does an AI workshop take?', a: 'Introductory sessions run 90 minutes to 2 hours. Team workshops are half-day. Strategic leadership sessions are full-day. Custom durations are available on request.' },
];

function FAQItem({ faq, isOpen, onClick }) {
    return (
        <div className={`overflow-hidden rounded-xl border transition-colors duration-200 ${isOpen ? 'border-accent/40 bg-card' : 'border-white/5 bg-background hover:border-white/15'}`}>
            <button className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left" onClick={onClick} aria-expanded={isOpen}>
                <span className="text-base font-semibold leading-snug text-white">{faq.q}</span>
                <span className={`shrink-0 ${isOpen ? 'text-accent' : 'text-text-muted'}`}>{isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</span>
            </button>
            {isOpen && <p className="px-6 pb-6 leading-relaxed text-text-muted">{faq.a}</p>}
        </div>
    );
}

export function AIWorkshopsPage() {
    const [openFaq, setOpenFaq] = useState(0);
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

    return (
        <PageLayout>
            <SEOHead
                title="AI Workshops South Africa – Business Training | DB23"
                description="Practical AI workshops for SA business teams. Hands-on training, real tools, no jargon. Book your session today."
                canonical="https://db23.co.za/ai-workshops/"
                keywords="AI workshops South Africa, business AI workshop, AI training South Africa, corporate AI training South Africa, AI upskilling South Africa"
                ogTitle="AI Workshops South Africa – Business Training | DB23"
                ogDescription="Practical AI workshops for SA business teams. Hands-on training, real tools, no jargon. Book your session today."
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

            {/* Hero */}
            <section className="relative min-h-[75vh] overflow-hidden bg-background pt-32 pb-20 md:pt-44" aria-labelledby="workshops-h1">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.22),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(20,184,166,0.14),transparent_30%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8">
                    <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                            <Sparkles className="h-4 w-4" aria-hidden="true" />
                            Flagship Service · Virtual AI Workshops
                        </div>
                        <h1 id="workshops-h1" className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl text-balance">
                            AI Workshops for{' '}
                            <span className="bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent">South African Business Teams</span>
                        </h1>
                        <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-text-muted md:text-xl">
                            DB23 delivers hands-on AI workshops that help South African business teams understand AI tools, automate workflows, and identify real opportunities — in plain language, no technical background needed.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row justify-center">
                            <Button href="/#contact" size="lg" className="w-full sm:w-auto">Book Your AI Workshop</Button>
                            <Button href="#workshop-packages" variant="outline" size="lg" className="w-full sm:w-auto">View Packages & Pricing</Button>
                        </div>
                        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-text-muted">
                            {['No tech skills required', 'Virtual & online sessions', 'Tailored to your business', 'Nationwide availability'].map(t => (
                                <span key={t} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400" aria-hidden="true" /> {t}</span>
                            ))}
                        </div>
                    </Motion.div>
                </div>
            </section>

            {/* Answer Block — GEO citability */}
            <section className="bg-background py-16 md:py-20" aria-labelledby="answer-what-is-workshop">
                <div className="container mx-auto px-4 md:px-8 max-w-3xl">
                    <h2 id="answer-what-is-workshop" className="mb-4 text-2xl font-black text-white">What is an AI workshop for business?</h2>
                    <p className="text-lg leading-relaxed text-text-muted mb-4">
                        An AI workshop for business is a structured training session — typically 90 minutes to a full day — where employees learn to use AI tools in their actual daily job roles. Unlike academic AI courses, DB23 workshops skip theory and mathematics to focus entirely on practical application: using ChatGPT to draft communications, automating repetitive data tasks, or building AI into customer engagement workflows. Sessions run online for distributed teams across South Africa, or in-person at your premises. The introductory workshop format starts from R4,500 and runs 90 minutes to 2 hours. Team workshops run half a day from R12,500. No technical background is required from attendees. The goal is one clear outcome: each participant leaves with at least one AI workflow they can use the very next working day.
                    </p>
                    <p className="text-sm leading-relaxed text-text-muted border-l-2 border-accent/40 pl-4">
                        A 2024 Deloitte Africa Digital Skills survey found 71% of South African business owners want to adopt AI but cite a skills gap as the primary barrier. AI workshops directly close that gap — turning intent into practical capability.
                    </p>
                </div>
            </section>

            {/* Modules */}
            <section className="relative bg-card/35 py-24 md:py-32" aria-labelledby="modules-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Workshop Content</p>
                        <h2 id="modules-heading" className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">What You'll Learn</h2>
                        <p className="text-lg leading-relaxed text-text-muted">Every DB23 AI workshop is tailored to your business context. Core modules are adapted to your team's level and goals.</p>
                    </div>
                    <Motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {modules.map(m => (
                            <Motion.article key={m.title} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }} className="rounded-2xl border border-white/10 bg-background/70 p-6 transition hover:-translate-y-1 hover:border-accent/45">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">{m.icon}</div>
                                <h3 className="mb-2 text-xl font-bold text-white">{m.title}</h3>
                                <p className="text-sm leading-relaxed text-text-muted">{m.desc}</p>
                            </Motion.article>
                        ))}
                    </Motion.div>
                </div>
            </section>

            {/* Packages */}
            <section className="bg-background py-24 md:py-32" id="workshop-packages" aria-labelledby="packages-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Pricing</p>
                        <h2 id="packages-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">AI Workshop Packages</h2>
                        <p className="text-lg text-text-muted">Choose the format that fits your team size, goals, and timeline. All packages available online or in-person.</p>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {packages.map(pkg => (
                            <article key={pkg.name} className={`relative flex flex-col rounded-3xl border p-7 ${pkg.featured ? 'border-accent bg-accent/10 shadow-2xl shadow-accent/10' : 'border-white/10 bg-card/70'}`}>
                                {pkg.tag && <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">{pkg.tag}</span>}
                                <h3 className="mb-4 max-w-[16rem] text-2xl font-bold text-white">{pkg.name}</h3>
                                <p className="mb-7 text-2xl font-black text-accent">{currency === 'ZAR' ? pkg.priceZAR : pkg.priceUSD}</p>
                                <ul className="mb-8 flex-1 space-y-3">
                                    {pkg.features.map(f => (
                                        <li key={f} className="flex gap-3 text-sm text-white/80"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" /><span>{f}</span></li>
                                    ))}
                                </ul>
                                <Button href="/#contact" variant={pkg.featured ? 'primary' : 'outline'} className="w-full">{pkg.cta}</Button>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who It's For */}
            <section className="bg-card/35 py-24 md:py-32" aria-labelledby="audience-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Who It's For</p>
                            <h2 id="audience-heading" className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">Built for South African Business Teams, Not Technologists</h2>
                            <p className="mb-8 text-lg leading-relaxed text-text-muted">You don't need a software background to benefit from AI. These workshops are designed for the people who run, lead, and grow modern businesses every day.</p>
                            <Button href="/#contact" size="lg">Book Your Workshop Today</Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {audiences.map(a => (
                                <div key={a} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-background/70 px-4 py-4">
                                    <BadgeCheck className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                                    <span className="text-sm font-semibold text-white">{a}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="bg-background py-24 md:py-32" aria-labelledby="process-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">The Process</p>
                        <h2 id="process-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">What to Expect</h2>
                        <p className="text-lg text-text-muted">A clear, no-surprise process from booking to your AI action plan.</p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {steps.map(s => (
                            <article key={s.n} className="rounded-3xl border border-white/10 bg-card/70 p-7 transition hover:-translate-y-1 hover:border-accent/45">
                                <span className="mb-6 block text-4xl font-black text-white/10">{s.n}</span>
                                <h3 className="mb-3 text-xl font-bold text-white">{s.title}</h3>
                                <p className="leading-relaxed text-text-muted">{s.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-card/35 py-24 md:py-32" aria-labelledby="faq-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-12 text-center">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">FAQ</p>
                            <h2 id="faq-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">AI Workshop Questions, Answered</h2>
                        </div>
                        <div className="space-y-3">
                            {dynamicFaqs.map((faq, i) => (
                                <FAQItem key={faq.q} faq={faq} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <FounderBio />

            {/* CTA */}
            <section className="relative overflow-hidden bg-background py-24 md:py-32">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.18),transparent_36%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8 text-center">
                    <Motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl">
                        <h2 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl">Ready to Run an AI Workshop?</h2>
                        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-muted">Tell us about your team and goals. We'll recommend the right workshop format and get back to you with a practical next step.</p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button href="/#contact" size="lg" className="w-full sm:w-auto">Book an AI Workshop</Button>
                            <a href="/voice-ai/" className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-white transition-colors">Explore Voice AI <ArrowRight className="h-4 w-4" /></a>
                        </div>
                    </Motion.div>
                </div>
            </section>
        </PageLayout>
    );
}

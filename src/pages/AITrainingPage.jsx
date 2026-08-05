import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Bot, BrainCircuit, BriefcaseBusiness, CheckCircle, Laptop, Megaphone, Minus, Plus, Sparkles, Users, Workflow } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/Button';

const modules = [
    { icon: <BrainCircuit className="h-6 w-6" />, title: 'AI Fundamentals for Business', desc: 'What AI is, how it works, and what it means practically for your business operations, team, and competitive landscape.' },
    { icon: <Laptop className="h-6 w-6" />, title: 'Practical AI Tools', desc: 'Hands-on training with real AI tools your team can start using immediately — from content creation to analysis and productivity.' },
    { icon: <Workflow className="h-6 w-6" />, title: 'Workflow Automation', desc: 'Map your most repetitive processes and identify exactly where automation can save hours of manual work each week.' },
    { icon: <Megaphone className="h-6 w-6" />, title: 'Marketing & Content AI', desc: 'Use AI to improve marketing output, generate content faster, personalise communication, and grow brand reach efficiently.' },
    { icon: <Bot className="h-6 w-6" />, title: 'AI Customer Engagement', desc: 'Practical training on AI chatbots, voice systems, and automated customer communication tools for better service at lower cost.' },
    { icon: <BriefcaseBusiness className="h-6 w-6" />, title: 'AI Strategy for Leadership', desc: 'For executives and decision-makers: how to evaluate AI opportunities, build an AI roadmap, and lead a modern digital business.' },
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
    { icon: <Users className="h-6 w-6" />, title: 'In-Person Training', body: 'We come to your office or venue and deliver hands-on AI training in a collaborative, face-to-face environment across South Africa.', tag: 'Most Engaging' },
    { icon: <Laptop className="h-6 w-6" />, title: 'Online / Remote Training', body: 'Full AI training sessions delivered via video conference with live tools, screen sharing, and interactive exercises for remote teams.', tag: null },
    { icon: <BriefcaseBusiness className="h-6 w-6" />, title: 'Hybrid Programme', body: 'A combination of live online sessions and in-person workshops spread over multiple days or weeks for deeper team capability building.', tag: null },
];

const audiences = [
    'Business owners and founders', 'Marketing and content teams',
    'Sales and customer service teams', 'Operations and admin staff',
    'Leadership and management teams', 'Businesses with no IT department',
];

const faqs = [
    { q: 'What is AI training for businesses?', a: 'Business AI training teaches your team how to understand, use, and apply AI tools practically in your daily operations — without needing a technical background. DB23\'s AI training is focused entirely on real business applications.' },
    { q: 'What do teams learn in AI training?', a: 'Teams learn how AI tools work, which tools are most useful for their role, how to automate repetitive tasks, how to use AI for marketing and content, and how to identify AI opportunities in their specific workflows.' },
    { q: 'How long does AI training take?', a: 'DB23 AI training ranges from 90-minute introductory sessions to full-day programmes. Multi-session programmes spread over several weeks are also available for deeper capability building.' },
    { q: 'Is AI training suitable for non-technical staff?', a: 'Absolutely. DB23 AI training is built specifically for business people — not developers or engineers. We explain AI in plain language with practical examples that make sense for your team\'s day-to-day work.' },
    { q: 'What is the difference between AI training and an AI workshop?', a: 'AI workshops are typically one-off, focused sessions exploring AI concepts and opportunities. AI training is a more structured learning programme designed to build practical skills and confidence over time. Both approaches are available through DB23.' },
    { q: 'Can AI training be customised for our industry?', a: 'Yes. DB23 tailors AI training content to your industry, team roles, and specific business challenges. Training for a marketing team looks very different from training for an operations team.' },
    { q: 'What AI tools do you cover in training?', a: 'DB23 training covers a range of practical AI tools including AI writing assistants, image generation, automation platforms, AI customer engagement tools, workflow tools, and voice AI systems — selected based on your team\'s needs.' },
    { q: 'Does DB23 offer ongoing AI training support?', a: 'Yes. After initial training, DB23 can provide follow-up sessions, implementation support, and ongoing access to new AI tools and techniques as the AI landscape evolves.' },
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

export function AITrainingPage() {
    const [openFaq, setOpenFaq] = useState(0);
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
                        "description": "Business-focused AI training programs for managers, marketing teams, and operational staff. No technical background required.",
                        "provider": { "@id": "https://db23.co.za/#organization" },
                        "serviceType": "AI Business Training",
                        "areaServed": { "@type": "Country", "name": "South Africa" },
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "ZAR",
                            "description": "Custom pricing based on team size, duration and format. Contact for a tailored quote."
                        },
                        "url": "https://db23.co.za/ai-training/"
                    }
                ]}
            />

            {/* Hero */}
            <section className="relative min-h-[75vh] overflow-hidden bg-background pt-32 pb-20 md:pt-44" aria-labelledby="training-h1">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_12%_18%,rgba(59,130,246,0.22),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.14),transparent_30%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8">
                    <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                            <Sparkles className="h-4 w-4" aria-hidden="true" />
                            AI Training South Africa · Practical & Business-Focused
                        </div>
                        <h1 id="training-h1" className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl text-balance">
                            Practical AI Training for{' '}
                            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">SA Businesses</span>
                        </h1>
                        <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-text-muted md:text-xl">
                            DB23 delivers structured AI training programmes for South African business teams — from introductory sessions to advanced leadership strategy. No jargon, no theory overload, just practical skills your team can use from day one.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row justify-center">
                            <Button href="/#contact" size="lg" className="w-full sm:w-auto">Enquire About AI Training</Button>
                            <Button href="#training-formats" variant="outline" size="lg" className="w-full sm:w-auto">View Training Formats</Button>
                        </div>
                        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-text-muted">
                            {['No tech skills required', 'Tailored to your team', 'In-person or online', 'Across South Africa'].map(t => (
                                <span key={t} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400" aria-hidden="true" /> {t}</span>
                            ))}
                        </div>
                    </Motion.div>
                </div>
            </section>

            {/* Training Modules */}
            <section className="bg-card/35 py-24 md:py-32" aria-labelledby="modules-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Training Content</p>
                        <h2 id="modules-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">What Our AI Training Covers</h2>
                        <p className="text-lg text-text-muted">Training modules are selected and sequenced based on your team's role and your business priorities — not a generic curriculum.</p>
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

            {/* Learning Outcomes */}
            <section className="bg-background py-24 md:py-32" aria-labelledby="outcomes-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Learning Outcomes</p>
                            <h2 id="outcomes-heading" className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">What Your Team Will Be Able to Do</h2>
                            <p className="mb-8 text-lg leading-relaxed text-text-muted">By the end of DB23 AI training, your team will have practical, actionable AI capability — not just theoretical understanding. Here's what that looks like in practice:</p>
                            <Button href="/#contact" size="lg">Start Building AI Capability</Button>
                        </div>
                        <ul className="space-y-3">
                            {outcomes.map(o => (
                                <li key={o} className="flex items-start gap-3 rounded-xl border border-white/10 bg-card/70 px-5 py-4">
                                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
                                    <span className="text-sm font-medium text-white/90">{o}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Training Formats */}
            <section className="bg-card/35 py-24 md:py-32" id="training-formats" aria-labelledby="formats-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Delivery Options</p>
                        <h2 id="formats-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">AI Training Formats</h2>
                        <p className="text-lg text-text-muted">Choose the delivery format that works for your team's location, size, and schedule.</p>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {formats.map(f => (
                            <article key={f.title} className="relative rounded-3xl border border-white/10 bg-background/70 p-7 transition hover:-translate-y-1 hover:border-accent/45">
                                {f.tag && <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">{f.tag}</span>}
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">{f.icon}</div>
                                <h3 className="mb-3 text-xl font-bold text-white">{f.title}</h3>
                                <p className="leading-relaxed text-text-muted">{f.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who It's For */}
            <section className="bg-background py-24 md:py-32" aria-labelledby="who-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Who It's For</p>
                        <h2 id="who-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">Built for Every Business Role</h2>
                        <p className="text-lg text-text-muted">DB23 AI training is relevant across your entire organisation. No technical role required.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
                        {audiences.map(a => (
                            <div key={a} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-card/70 px-5 py-4">
                                <CheckCircle className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                                <span className="text-sm font-semibold text-white">{a}</span>
                            </div>
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
                            <h2 id="faq-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">AI Training Questions, Answered</h2>
                        </div>
                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <FAQItem key={faq.q} faq={faq} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden bg-background py-24 md:py-32">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.18),transparent_36%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8 text-center">
                    <Motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl">
                        <h2 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl">Ready to Build Real AI Capability?</h2>
                        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-muted">Tell us about your team, your goals, and your timeline. We'll design the right AI training programme for your business and get back to you with a practical next step.</p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button href="/#contact" size="lg" className="w-full sm:w-auto">Enquire About AI Training</Button>
                            <a href="/ai-workshops/" className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-white transition-colors">View AI Workshops <ArrowRight className="h-4 w-4" /></a>
                        </div>
                    </Motion.div>
                </div>
            </section>
        </PageLayout>
    );
}

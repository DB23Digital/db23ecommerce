import React from 'react';
import { motion as Motion } from 'framer-motion';
import { BadgeCheck, Bot, BrainCircuit, Globe, Lightbulb, Megaphone, Sparkles, Users, Zap } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/Button';

const values = [
    { icon: <Lightbulb className="h-6 w-6" />, title: 'Practical Over Theory', desc: 'We focus on AI tools and systems that deliver measurable business outcomes — not buzzwords or proof-of-concepts that never ship.' },
    { icon: <Globe className="h-6 w-6" />, title: 'Plain Language', desc: 'Every concept is explained in plain English. Our clients are business people, not engineers. We bridge that gap deliberately.' },
    { icon: <Zap className="h-6 w-6" />, title: 'Speed to Value', desc: 'We move fast. From consultation to implementation, we focus on getting real AI tools working in your business as quickly as possible.' },
    { icon: <Users className="h-6 w-6" />, title: 'SA Business Context', desc: 'We understand the South African market — its unique challenges, budget constraints, infrastructure realities, and growth opportunities.' },
];

const services = [
    { icon: <BrainCircuit className="h-5 w-5" />, name: 'AI Workshops', href: '/ai-workshops/' },
    { icon: <Bot className="h-5 w-5" />, name: 'Voice AI', href: '/voice-ai/' },
    { icon: <Users className="h-5 w-5" />, name: 'AI Training', href: '/ai-training/' },
    { icon: <Megaphone className="h-5 w-5" />, name: 'Digital Marketing', href: '/digital-marketing/' },
    { icon: <Globe className="h-5 w-5" />, name: 'Website Design', href: '/website-design/' },
    { icon: <Sparkles className="h-5 w-5" />, name: 'Outsourced Marketing', href: '/outsourced-marketing/' },
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

            {/* Hero */}
            <section className="relative min-h-[60vh] overflow-hidden bg-background pt-32 pb-20 md:pt-44" aria-labelledby="about-h1">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(20,184,166,0.12),transparent_30%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8">
                    <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                            <Sparkles className="h-4 w-4" aria-hidden="true" />
                            South Africa's AI Implementation Partner
                        </div>
                        <h1 id="about-h1" className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl text-balance">
                            We Make AI{' '}
                            <span className="bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent">Practical for SA Businesses</span>
                        </h1>
                        <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-text-muted md:text-xl">
                            DB23 eCommerce was founded to close the gap between AI hype and AI reality for South African businesses. We translate cutting-edge AI capabilities into practical tools and systems that actually work in the real world.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row justify-center">
                            <Button href="/#contact" size="lg">Start a Conversation</Button>
                            <Button href="/ai-workshops/" variant="outline" size="lg">Explore AI Workshops</Button>
                        </div>
                    </Motion.div>
                </div>
            </section>

            {/* Our Story */}
            <section className="bg-card/35 py-24 md:py-32" aria-labelledby="story-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center max-w-5xl mx-auto">
                        <div>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Our Story</p>
                            <h2 id="story-heading" className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">Built for the SA Business Owner</h2>
                            <p className="mb-6 text-lg leading-relaxed text-text-muted">
                                South African businesses face a unique challenge: AI tools are advancing rapidly, but most of the guidance is aimed at large enterprises with dedicated tech teams and international budgets.
                            </p>
                            <p className="mb-6 text-lg leading-relaxed text-text-muted">
                                DB23 exists to change that. We work with SME owners, marketing teams, and leadership to identify where AI creates real commercial value — then implement the tools and systems to deliver it, without the jargon or the enterprise price tag.
                            </p>
                            <p className="text-lg leading-relaxed text-text-muted">
                                From Cape Town, we serve South African businesses nationally and work with global clients online. Every engagement is practical, focused, and designed to deliver results you can measure.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                ['SA-focused', 'Deep understanding of the local market'],
                                ['No jargon', 'Plain English, always'],
                                ['Practical', 'Real tools, real workflows'],
                                ['Measurable', 'ROI you can actually track'],
                            ].map(([heading, body]) => (
                                <div key={heading} className="rounded-2xl border border-white/10 bg-background/70 p-5">
                                    <p className="text-lg font-black text-accent mb-1">{heading}</p>
                                    <p className="text-sm text-text-muted leading-snug">{body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-background py-24 md:py-32" aria-labelledby="values-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">How We Work</p>
                        <h2 id="values-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">Our Principles</h2>
                        <p className="text-lg text-text-muted">The values that shape every workshop, every project, and every client relationship.</p>
                    </div>
                    <Motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                        {values.map(v => (
                            <Motion.article key={v.title} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }} className="rounded-2xl border border-white/10 bg-card/70 p-6 transition hover:-translate-y-1 hover:border-accent/45">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">{v.icon}</div>
                                <h3 className="mb-2 text-xl font-bold text-white">{v.title}</h3>
                                <p className="text-sm leading-relaxed text-text-muted">{v.desc}</p>
                            </Motion.article>
                        ))}
                    </Motion.div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="bg-card/35 py-24 md:py-32" aria-labelledby="services-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">What We Do</p>
                        <h2 id="services-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">Our Services</h2>
                        <p className="text-lg text-text-muted">A focused suite of services designed for South African business growth in the AI era.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
                        {services.map(s => (
                            <a key={s.name} href={s.href} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-background/70 px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent/45 group">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent/20 transition">{s.icon}</span>
                                <span className="font-semibold text-white">{s.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* What clients say */}
            <section className="bg-background py-24 md:py-32" aria-labelledby="trust-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Why DB23</p>
                        <h2 id="trust-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">Trusted by SA Businesses</h2>
                        <p className="mb-10 text-lg text-text-muted">We've helped businesses across South Africa understand and implement AI in ways that actually move the needle.</p>
                        <div className="grid gap-4 sm:grid-cols-3 text-left">
                            {[
                                'No technical background required — we explain everything in plain language',
                                'Practical outcomes from every engagement — no theoretical exercises',
                                'SA-market expertise — we understand local business challenges',
                            ].map(point => (
                                <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-card/70 p-5">
                                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                                    <span className="text-sm text-white/85 leading-snug">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden bg-card/35 py-24 md:py-32">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_36%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8 text-center">
                    <Motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl">
                        <h2 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl">Ready to Work Together?</h2>
                        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-muted">Tell us about your business and goals. We'll recommend the best starting point — message us on WhatsApp and we reply within the hour during business hours.</p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button href="/contact/" size="lg">Contact Us</Button>
                            <Button href="/ai-workshops/" variant="outline" size="lg">Book an AI Workshop</Button>
                        </div>
                    </Motion.div>
                </div>
            </section>
        </PageLayout>
    );
}

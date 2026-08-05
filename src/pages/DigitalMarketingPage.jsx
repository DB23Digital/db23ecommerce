import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, BarChart, CheckCircle, Lightbulb, Megaphone, Minus, PenTool, Plus, Search, Sparkles, Target } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/Button';

const services = [
    { icon: <Search className="h-6 w-6" />, title: 'SEO & Search Visibility', desc: 'Get found on Google when South African customers search for your services. We focus on high-intent commercial keywords that drive leads.' },
    { icon: <PenTool className="h-6 w-6" />, title: 'Content & Copywriting', desc: 'High-quality, SEO-optimised content that builds trust. From website copy to ongoing blog articles designed to establish authority.' },
    { icon: <Target className="h-6 w-6" />, title: 'Lead Generation', desc: 'Targeted campaigns designed to capture high-quality B2B and B2C leads using modern funnels and automated qualification.' },
    { icon: <BarChart className="h-6 w-6" />, title: 'Data & Analytics', desc: 'No more guessing. Clear reporting on what is actually working, where your leads come from, and your real return on investment.' },
    { icon: <Lightbulb className="h-6 w-6" />, title: 'AI-Enhanced Marketing', desc: 'We use the latest AI tools to produce more content, faster and cheaper — passing the efficiency and cost savings directly to you.' },
    { icon: <Megaphone className="h-6 w-6" />, title: 'Digital Strategy', desc: 'A clear, actionable roadmap for your online presence. We align your digital marketing directly with your core business goals.' },
];

const faqs = [
    { q: 'What digital marketing services do small businesses need?', a: 'Most SMEs need a strong foundation: a conversion-focused website, solid local SEO, clear content, and a reliable lead generation channel. We focus on these core pillars rather than vanity metrics.' },
    { q: 'Do you work with businesses outside of Cape Town?', a: 'Yes. While we have a strong presence in Cape Town, we provide digital marketing services to businesses across South Africa.' },
    { q: 'How long does it take to see results from digital marketing?', a: 'It depends on the channel. Paid lead generation can deliver results in weeks. Organic SEO and content marketing is a long-term strategy that typically shows significant compounding growth after 3-6 months.' },
    { q: 'What is AI-enhanced marketing?', a: 'We use AI internally to speed up research, outline content, and analyse data. This allows us to deliver agency-quality marketing at a fraction of the cost, making professional marketing accessible to smaller businesses.' },
    { q: 'Can you just handle my SEO?', a: 'Yes. We offer standalone SEO services for businesses that already have their other marketing channels sorted. See our dedicated SEO Services page for details.' },
    { q: 'Do I get regular reports?', a: 'Yes. You receive clear, jargon-free monthly reports showing exactly what was done, what the results were (traffic, leads, conversions), and what the plan is for the next month.' },
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

export function DigitalMarketingPage() {
    const [openFaq, setOpenFaq] = useState(0);

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

            {/* Hero */}
            <section className="relative min-h-[85vh] overflow-hidden bg-background pt-32 pb-20 md:pt-44" aria-labelledby="hero-h1">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.15),transparent_40%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <Motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                                <Sparkles className="h-4 w-4" aria-hidden="true" />
                                Digital Marketing Services South Africa
                            </div>
                            <h1 id="hero-h1" className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl text-balance">
                                Digital Marketing Services for{' '}
                                <span className="bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent">SA Businesses</span>
                            </h1>
                            <p className="mb-10 text-lg leading-relaxed text-text-muted md:text-xl max-w-xl">
                                We cut through the vanity metrics. DB23 provides practical, AI-enhanced digital marketing designed specifically for South African SMEs that want more leads, better visibility, and clear ROI.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Button href="/#contact" size="lg" className="w-full sm:w-auto">Discuss Your Marketing</Button>
                                <Button href="#services" variant="outline" size="lg" className="w-full sm:w-auto">Explore Services</Button>
                            </div>
                        </Motion.div>
                        <Motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
                            <div className="absolute -inset-4 rounded-[2rem] bg-accent/10 blur-3xl" />
                            <img src="/hero-digital-marketing.webp" alt="Abstract data nodes and marketing funnels" className="relative rounded-3xl border border-white/10 shadow-2xl w-full h-auto object-cover aspect-[4/3] sm:aspect-video lg:aspect-square" width="800" height="800" fetchpriority="high" />
                        </Motion.div>
                    </div>
                </div>
            </section>

            {/* Answer Block — GEO citability */}
            <section className="bg-background py-16 md:py-20" aria-labelledby="answer-what-is-digital-marketing">
                <div className="container mx-auto px-4 md:px-8 max-w-3xl">
                    <h2 id="answer-what-is-digital-marketing" className="mb-4 text-2xl font-black text-white">What does digital marketing do for a South African business?</h2>
                    <p className="text-lg leading-relaxed text-text-muted mb-4">
                        Digital marketing for South African businesses means getting found online by the right customers at the right time — through search engines, content, and targeted campaigns — and converting that visibility into enquiries and revenue. Unlike traditional advertising that broadcasts to everyone, digital marketing targets specific audiences based on intent: people actively searching for your service in your area or sector. DB23 provides outsourced digital marketing covering SEO, content creation, lead generation, analytics, and AI-enhanced campaign management. All services are designed for South African SMEs that need agency-quality marketing at an accessible price point, with monthly reporting that shows exactly where your budget goes and what it produces.
                    </p>
                    <p className="text-sm leading-relaxed text-text-muted border-l-2 border-accent/40 pl-4">
                        Businesses using AI-enhanced content marketing report 43% more organic traffic growth than those using traditional approaches. (Source: HubSpot State of Marketing 2025.) DB23 applies AI across content production, research, and campaign optimisation — passing that efficiency directly to clients as cost savings and faster results.
                    </p>
                </div>
            </section>

            {/* Core Services */}
            <section id="services" className="bg-card/35 py-24 md:py-32" aria-labelledby="services-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Core Focus Areas</p>
                        <h2 id="services-heading" className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">Our Digital Marketing Services</h2>
                        <p className="text-lg leading-relaxed text-text-muted">We don't do everything. We focus on the high-impact channels that actually move the needle for small and medium businesses.</p>
                    </div>
                    <Motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map(s => (
                            <Motion.article key={s.title} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }} className="rounded-2xl border border-white/10 bg-background/70 p-6 transition hover:-translate-y-1 hover:border-accent/45">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">{s.icon}</div>
                                <h3 className="mb-2 text-xl font-bold text-white">{s.title}</h3>
                                <p className="text-sm leading-relaxed text-text-muted">{s.desc}</p>
                            </Motion.article>
                        ))}
                    </Motion.div>
                </div>
            </section>

            {/* Why Us */}
            <section className="bg-background py-24 md:py-32" aria-labelledby="why-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">The DB23 Difference</p>
                            <h2 id="why-heading" className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">AI-Enhanced, Business-Focused</h2>
                            <p className="mb-6 text-lg leading-relaxed text-text-muted">
                                Traditional marketing agencies are often expensive and slow. By integrating AI into our own workflows, DB23 delivers high-quality content, rapid research, and comprehensive SEO at a fraction of the traditional cost.
                            </p>
                            <p className="mb-8 text-lg leading-relaxed text-text-muted">
                                We speak plain English, focus on your actual bottom line, and provide absolute transparency on where your budget goes.
                            </p>
                            <Button href="/outsourced-marketing/" size="lg" variant="outline">Explore Outsourced Marketing <ArrowRight className="ml-2 h-4 w-4" /></Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                'Focus on lead quality, not just traffic',
                                'AI-driven efficiency = lower costs for you',
                                'Clear, jargon-free monthly reporting',
                                'Deep understanding of SA business landscape'
                            ].map(benefit => (
                                <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-card/70 p-5">
                                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
                                    <span className="text-sm font-medium text-white/90 leading-snug">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-card/35 py-24 md:py-32" aria-labelledby="faq-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-12 text-center">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">FAQ</p>
                            <h2 id="faq-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">Digital Marketing Questions</h2>
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
                        <h2 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl">Ready to Grow Your Online Presence?</h2>
                        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-muted">Stop wasting budget on marketing that doesn't deliver. Let's discuss a practical strategy tailored to your business goals.</p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button href="/#contact" size="lg" className="w-full sm:w-auto">Contact Us Today</Button>
                            <a href="/seo-services/" className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-white transition-colors">View SEO Services <ArrowRight className="h-4 w-4" /></a>
                        </div>
                    </Motion.div>
                </div>
            </section>
        </PageLayout>
    );
}

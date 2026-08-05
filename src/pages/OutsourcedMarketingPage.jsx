import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, Briefcase, CheckCircle, Clock, LineChart, Minus, Plus, Settings, Sparkles, Users } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/Button';

const benefits = [
    { icon: <Users className="h-6 w-6" />, title: 'Instant Marketing Team', desc: 'Get immediate access to copywriters, SEO experts, and strategists without the hiring delay or overhead.' },
    { icon: <LineChart className="h-6 w-6" />, title: 'Predictable Costs', desc: 'Fixed monthly retainers mean no surprise agency fees. You know exactly what you are paying and what you are getting.' },
    { icon: <Clock className="h-6 w-6" />, title: 'Focus on Your Business', desc: 'Stop trying to write blogs and manage social media at 8 PM. Let us handle the marketing while you run your company.' },
    { icon: <Settings className="h-6 w-6" />, title: 'AI-Powered Efficiency', desc: 'Our team uses the latest AI tools to deliver more output for your budget, getting you results faster than traditional agencies.' },
];

const faqs = [
    { q: 'Can DB23 handle outsourced marketing for my business?', a: 'Yes. We provide complete outsourced marketing support, acting as your remote marketing department. This gives you a full digital team without the overhead of hiring in-house.' },
    { q: 'What does an outsourced marketing team do?', a: 'We manage your ongoing digital presence. This includes monthly SEO work, content creation (blogs, case studies), website updates, lead generation campaigns, and regular performance reporting.' },
    { q: 'Is outsourced marketing cheaper than hiring in-house?', a: 'Almost always. Hiring a single mid-level marketing manager costs significantly more than a comprehensive outsourced retainer — and with outsourcing, you get a full team of specialists rather than one generalist.' },
    { q: 'How does the process work?', a: 'We start with a strategy workshop to understand your goals. Then, we agree on a monthly retainer that covers specific deliverables (e.g., 2 SEO blogs, 1 newsletter, website management, and SEO tracking). We execute, report, and optimise monthly.' },
    { q: 'Are we locked into a long contract?', a: 'No. We believe in earning your business every month. While marketing takes time to show compounding results, our retainers operate on flexible terms without punishing lock-in clauses.' },
    { q: 'Do we still have a say in what gets published?', a: 'Absolutely. We establish an approval workflow that suits you. You have final sign-off on all content and campaigns before they go live.' },
];

function FAQItem({ faq, isOpen, onClick }) {
    return (
        <div className={`overflow-hidden rounded-xl border transition-colors duration-200 ${isOpen ? 'border-emerald-400/40 bg-card' : 'border-white/5 bg-background hover:border-white/15'}`}>
            <button className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left" onClick={onClick} aria-expanded={isOpen}>
                <span className="text-base font-semibold leading-snug text-white">{faq.q}</span>
                <span className={`shrink-0 ${isOpen ? 'text-emerald-400' : 'text-text-muted'}`}>{isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</span>
            </button>
            {isOpen && <p className="px-6 pb-6 leading-relaxed text-text-muted">{faq.a}</p>}
        </div>
    );
}

export function OutsourcedMarketingPage() {
    const [openFaq, setOpenFaq] = useState(0);

    return (
        <PageLayout>
            <SEOHead
                title="Outsourced Marketing South Africa | DB23"
                description="Full-service digital marketing team without the overhead of in-house hiring. Built for growing SA businesses."
                canonical="https://db23.co.za/outsourced-marketing/"
                keywords="outsourced marketing South Africa, fractional marketing team SA, marketing as a service South Africa, outsourced digital team South Africa"
                ogTitle="Outsourced Marketing South Africa | DB23"
                ogDescription="Full-service digital marketing team without the overhead of in-house hiring. Built for growing SA businesses."
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

            {/* Hero */}
            <section className="relative min-h-[85vh] overflow-hidden bg-background pt-32 pb-20 md:pt-44" aria-labelledby="hero-h1">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.15),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_40%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <Motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-400">
                                <Sparkles className="h-4 w-4" aria-hidden="true" />
                                Outsourced Marketing South Africa
                            </div>
                            <h1 id="hero-h1" className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl text-balance">
                                Outsourced Marketing for{' '}
                                <span className="bg-gradient-to-r from-emerald-400 to-accent bg-clip-text text-transparent">Growing SA Businesses</span>
                            </h1>
                            <p className="mb-10 text-lg leading-relaxed text-text-muted md:text-xl max-w-xl">
                                DB23 acts as your remote marketing department. We handle your SEO, content, lead generation, and website management so you can focus on running your business.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Button href="/#contact" size="lg" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white">Discuss Retainers</Button>
                                <Button href="#how-it-helps" variant="outline" size="lg" className="w-full sm:w-auto border-emerald-400/30 hover:bg-emerald-400/10">See The Benefits</Button>
                            </div>
                        </Motion.div>
                        <Motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative order-1 lg:order-2">
                            <div className="absolute -inset-4 rounded-[2rem] bg-emerald-400/10 blur-3xl" />
                            <img src="/hero-outsourced-marketing.webp" alt="Abstract gears representing outsourced teamwork" className="relative rounded-3xl border border-white/10 shadow-2xl w-full h-auto object-cover aspect-[4/3] sm:aspect-video lg:aspect-square" width="800" height="800" fetchpriority="high" />
                        </Motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section id="how-it-helps" className="bg-card/35 py-24 md:py-32" aria-labelledby="benefits-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">Why Outsource?</p>
                        <h2 id="benefits-heading" className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">The Smart Way for SMEs to Scale</h2>
                        <p className="text-lg leading-relaxed text-text-muted">Building an in-house marketing team is expensive, slow, and hard to manage. Outsourcing gives you immediate access to experts.</p>
                    </div>
                    <Motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {benefits.map(b => (
                            <Motion.article key={b.title} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }} className="rounded-2xl border border-white/10 bg-background/70 p-6 transition hover:-translate-y-1 hover:border-emerald-400/45">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">{b.icon}</div>
                                <h3 className="mb-2 text-xl font-bold text-white">{b.title}</h3>
                                <p className="text-sm leading-relaxed text-text-muted">{b.desc}</p>
                            </Motion.article>
                        ))}
                    </Motion.div>
                </div>
            </section>

            {/* Comparison */}
            <section className="bg-background py-24 md:py-32" aria-labelledby="comparison-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">In-House vs Outsourced</p>
                            <h2 id="comparison-heading" className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">Stop Paying for Downtime</h2>
                            <p className="mb-6 text-lg leading-relaxed text-text-muted">
                                When you hire a full-time marketing manager, you pay for their sick leave, training, software licenses, and downtime. And often, one person doesn't have the skills to do SEO, copywriting, design, and strategy perfectly.
                            </p>
                            <p className="mb-8 text-lg leading-relaxed text-text-muted">
                                With DB23's outsourced marketing, you pay a flat fee for the outputs you actually need. You get a fractional team of specialists, supported by AI to move faster.
                            </p>
                            <Button href="/#contact" size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">Get a Custom Proposal</Button>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-card/70 p-8">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Briefcase className="h-5 w-5 text-emerald-400" /> Typical Monthly Deliverables</h3>
                            <ul className="space-y-4">
                                {[
                                    'Ongoing technical & local SEO management',
                                    '2–4 high-quality blog posts or case studies',
                                    'Monthly newsletter creation and dispatch',
                                    'Website performance optimisation',
                                    'Monthly strategy and reporting call'
                                ].map(item => (
                                    <li key={item} className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
                                        <span className="text-white/90">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-card/35 py-24 md:py-32" aria-labelledby="faq-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-12 text-center">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">FAQ</p>
                            <h2 id="faq-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">Outsourced Marketing Questions</h2>
                        </div>
                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <FAQItem key={faq.q} faq={faq} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}

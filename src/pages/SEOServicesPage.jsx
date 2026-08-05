import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, BarChart, CheckCircle, FileText, MapPin, Minus, Plus, Search, Sparkles, TrendingUp } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/Button';

const seoPillars = [
    { icon: <MapPin className="h-6 w-6" />, title: 'Local SEO (Google Maps)', desc: 'Dominate the "near me" searches. We optimise your Google Business Profile so you show up in the local map pack for South African searchers.' },
    { icon: <Search className="h-6 w-6" />, title: 'Technical SEO', desc: 'We fix the under-the-hood issues: site speed, mobile usability, indexability, and schema markup so Google loves crawling your site.' },
    { icon: <FileText className="h-6 w-6" />, title: 'On-Page Content', desc: 'Keyword-optimised landing pages, perfectly structured headings (H1/H2), and compelling meta descriptions that drive high click-through rates.' },
    { icon: <TrendingUp className="h-6 w-6" />, title: 'Authority & Link Building', desc: 'Safe, high-quality backlink acquisition strategies to increase your domain authority and push your site above older competitors.' },
];

const faqs = [
    { q: 'What is SEO and why does my business need it?', a: 'Search Engine Optimisation (SEO) is the process of improving your website so it ranks higher on Google. When people search for your services, you want to be on the first page, capturing that high-intent traffic before your competitors do.' },
    { q: 'How long does SEO take to show results?', a: 'SEO is a long-term strategy. While technical fixes can yield quick bumps, establishing authority and ranking for competitive keywords generally takes 3 to 6 months of consistent work.' },
    { q: 'Is SEO better than Google Ads?', a: 'They serve different purposes. Ads give you instant visibility but cost money per click. SEO takes longer to build, but once you rank organically, that traffic is "free" and highly trusted by users. A balanced strategy often uses both.' },
    { q: 'Do you guarantee a #1 ranking on Google?', a: 'No ethical SEO agency guarantees a #1 ranking, because Google\'s algorithm changes constantly and is outside our direct control. We guarantee that we use proven, white-hat strategies that consistently improve visibility and traffic.' },
    { q: 'Can you fix a website that dropped in rankings?', a: 'Yes. We start with a comprehensive SEO audit to diagnose penalties, technical errors, or content quality issues that caused the drop, and then execute a recovery plan.' },
    { q: 'How do you measure SEO success?', a: 'We look past just rankings. We measure organic traffic growth, engagement rates, and most importantly, the number of actual leads/conversions generated from organic search.' },
];

function FAQItem({ faq, isOpen, onClick }) {
    return (
        <div className={`overflow-hidden rounded-xl border transition-colors duration-200 ${isOpen ? 'border-cyan-400/40 bg-card' : 'border-white/5 bg-background hover:border-white/15'}`}>
            <button className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left" onClick={onClick} aria-expanded={isOpen}>
                <span className="text-base font-semibold leading-snug text-white">{faq.q}</span>
                <span className={`shrink-0 ${isOpen ? 'text-cyan-400' : 'text-text-muted'}`}>{isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</span>
            </button>
            {isOpen && <p className="px-6 pb-6 leading-relaxed text-text-muted">{faq.a}</p>}
        </div>
    );
}

export function SEOServicesPage() {
    const [openFaq, setOpenFaq] = useState(0);

    return (
        <PageLayout>
            <SEOHead
                title="SEO Services South Africa – Rank on Google | DB23"
                description="Search engine optimisation for South African businesses. Technical SEO, content, local search and ranking strategy."
                canonical="https://db23.co.za/seo-services/"
                keywords="SEO services South Africa, search engine optimisation South Africa, local SEO South Africa, technical SEO, rank on Google South Africa"
                ogTitle="SEO Services South Africa – Rank on Google | DB23"
                ogDescription="Search engine optimisation for South African businesses. Technical SEO, content, local search and ranking strategy."
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "SEO Services", "item": "https://db23.co.za/seo-services/" }
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
                        "@id": "https://db23.co.za/seo-services/#service",
                        "name": "SEO Services South Africa",
                        "description": "Expert SEO services for South African businesses. Technical SEO, content optimisation, and authority building so you rank higher on Google.",
                        "provider": { "@id": "https://db23.co.za/#organization" },
                        "serviceType": "Search Engine Optimisation",
                        "areaServed": { "@type": "Country", "name": "South Africa" },
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "ZAR",
                            "description": "Monthly retainer-based pricing. Free audit available. Contact for a tailored quote."
                        },
                        "url": "https://db23.co.za/seo-services/"
                    }
                ]}
            />

            {/* Hero */}
            <section className="relative min-h-[85vh] overflow-hidden bg-background pt-32 pb-20 md:pt-44" aria-labelledby="hero-h1">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.15),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_40%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <Motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-400">
                                <Sparkles className="h-4 w-4" aria-hidden="true" />
                                SEO Services South Africa
                            </div>
                            <h1 id="hero-h1" className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl text-balance">
                                SEO Services for{' '}
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">South African Businesses</span>
                            </h1>
                            <p className="mb-10 text-lg leading-relaxed text-text-muted md:text-xl max-w-xl">
                                When South Africans search for your services on Google, are you showing up? We provide technical and content-driven SEO strategies that push your website to the top of the results.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Button href="/#contact" size="lg" className="w-full sm:w-auto">Request a Free SEO Audit</Button>
                                <Button href="#pillars" variant="outline" size="lg" className="w-full sm:w-auto">Our SEO Process</Button>
                            </div>
                        </Motion.div>
                        <Motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative order-1 lg:order-2">
                            <div className="absolute -inset-4 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
                            <img src="/hero-seo-services.webp" alt="Abstract search algorithms and upward ranking charts" className="relative rounded-3xl border border-white/10 shadow-2xl w-full h-auto object-cover aspect-[4/3] sm:aspect-video lg:aspect-square" width="800" height="800" fetchpriority="high" />
                        </Motion.div>
                    </div>
                </div>
            </section>

            {/* Pillars */}
            <section id="pillars" className="bg-card/35 py-24 md:py-32" aria-labelledby="pillars-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">The 4 Pillars of SEO</p>
                        <h2 id="pillars-heading" className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">How We Get You to Page 1</h2>
                        <p className="text-lg leading-relaxed text-text-muted">SEO isn't magic. It's the consistent application of technical best practices, high-quality content, and digital authority.</p>
                    </div>
                    <Motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {seoPillars.map(p => (
                            <Motion.article key={p.title} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }} className="rounded-2xl border border-white/10 bg-background/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/45">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">{p.icon}</div>
                                <h3 className="mb-2 text-xl font-bold text-white">{p.title}</h3>
                                <p className="text-sm leading-relaxed text-text-muted">{p.desc}</p>
                            </Motion.article>
                        ))}
                    </Motion.div>
                </div>
            </section>

            {/* Audit CTA */}
            <section className="bg-background py-24 md:py-32" aria-labelledby="audit-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-900/40 to-blue-900/20 p-8 md:p-12 lg:p-16 text-center">
                        <h2 id="audit-heading" className="mb-5 text-3xl font-black text-white md:text-4xl">Not sure why your site isn't ranking?</h2>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-text-muted">
                            Let us run a comprehensive technical and content audit on your website. We'll identify exactly what's holding you back and give you a clear roadmap to fix it. No commitment required.
                        </p>
                        <Button href="/#contact" size="lg" className="bg-white text-black hover:bg-gray-200">Request Your Free Audit</Button>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-card/35 py-24 md:py-32" aria-labelledby="faq-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-12 text-center">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">FAQ</p>
                            <h2 id="faq-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">SEO Questions</h2>
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

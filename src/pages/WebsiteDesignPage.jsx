import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, Code2, Globe, LayoutTemplate, Minus, PenTool, Plus, Smartphone, Sparkles, Zap } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/Button';
import { SelectedWork } from '../components/SelectedWork';

const features = [
    { icon: <LayoutTemplate className="h-6 w-6" />, title: 'Conversion-Focused Design', desc: 'Beautiful designs are useless if they don\'t convert. We design user journeys that guide visitors toward contacting you or buying your products globally.' },
    { icon: <Smartphone className="h-6 w-6" />, title: 'Mobile-First Experience', desc: 'With the majority of web traffic coming from mobile devices, we ensure your website looks and functions perfectly on all screen sizes everywhere.' },
    { icon: <Zap className="h-6 w-6" />, title: 'Ultra-Fast Performance', desc: 'Slow websites kill conversions and SEO. We build lightweight, highly-optimised websites that load in milliseconds across the world.' },
    { icon: <Search className="h-6 w-6" />, title: 'SEO-Ready Architecture', desc: 'Proper heading structures, schema markup, and clean code so Google can easily crawl, understand, and rank your site from day one.' },
    { icon: <Code2 className="h-6 w-6" />, title: 'Modern Tech Stack', desc: 'We build using modern React/Next.js frameworks or optimised WordPress, depending on what your specific business needs to scale internationally.' },
    { icon: <PenTool className="h-6 w-6" />, title: 'Copywriting Included', desc: 'A great website needs great words. We don\'t just give you empty templates; we help craft the messaging that sells your services.' },
];

const faqs = [
    { q: 'How much does a new website cost?', a: 'Website pricing depends on complexity, the number of pages, and required features (like eCommerce or custom portals). Our professional business sites typically start from a competitive baseline suited for SMEs worldwide. Contact us for a precise quote.' },
    { q: 'How long does it take to build a website?', a: 'A standard 5-page business website usually takes 3 to 5 days from the initial kickoff to launch, provided we have all the necessary branding assets and information from you.' },
    { q: 'Do you offer eCommerce website design?', a: 'Yes. We build robust eCommerce platforms using Shopify or WooCommerce, fully integrated with global payment gateways like Stripe and PayPal, as well as localized gateways based on your target market.' },
    { q: 'Will I be able to update the website myself?', a: 'Yes. We build sites with user-friendly Content Management Systems (CMS) and provide remote training so your team can easily update text, add blog posts, or change images without needing a developer.' },
    { q: 'Do you provide website hosting?', a: 'We work with your existing hosting providers, or we can recommend reliable, secure global hosting providers if you need one.' },
    { q: 'What happens after the website goes live?', a: 'We submit your new site to Google, ensure all tracking (Analytics, Tag Manager) is working, and offer ongoing website maintenance retainers to help your site grow.' },
];

function Search({ className }) { return <Globe className={className} />; }

function FAQItem({ faq, isOpen, onClick }) {
    return (
        <div className={`overflow-hidden rounded-xl border transition-colors duration-200 ${isOpen ? 'border-purple-400/40 bg-card' : 'border-white/5 bg-background hover:border-white/15'}`}>
            <button className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left" onClick={onClick} aria-expanded={isOpen}>
                <span className="text-base font-semibold leading-snug text-white">{faq.q}</span>
                <span className={`shrink-0 ${isOpen ? 'text-purple-400' : 'text-text-muted'}`}>{isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</span>
            </button>
            {isOpen && <p className="px-6 pb-6 leading-relaxed text-text-muted">{faq.a}</p>}
        </div>
    );
}

export function WebsiteDesignPage() {
    const [openFaq, setOpenFaq] = useState(0);

    return (
        <PageLayout>
            <SEOHead
                title="Website Design South Africa – Modern Sites | DB23"
                description="Modern websites built for clarity, trust and conversion. Part of a broader digital growth system for SA businesses."
                canonical="https://db23.co.za/website-design/"
                keywords="website design South Africa, web development South Africa, custom web design SA, responsive website design South Africa"
                ogTitle="Website Design South Africa – Modern Sites | DB23"
                ogDescription="Modern websites built for clarity, trust and conversion. Part of a broader digital growth system for SA businesses."
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "Website Design", "item": "https://db23.co.za/website-design/" }
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
                        "@id": "https://db23.co.za/website-design/#service",
                        "name": "Website Design South Africa",
                        "description": "Modern websites built for clarity, trust, and conversion. Fast, mobile-friendly, SEO-optimised websites for South African businesses.",
                        "provider": { "@id": "https://db23.co.za/#organization" },
                        "serviceType": "Web Design",
                        "areaServed": { "@type": "Country", "name": "South Africa" },
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "ZAR",
                            "description": "Project-based pricing. Contact for a tailored quote."
                        },
                        "url": "https://db23.co.za/website-design/"
                    }
                ]}
            />

            {/* Hero */}
            <section className="relative min-h-[85vh] overflow-hidden bg-background pt-32 pb-20 md:pt-44" aria-labelledby="hero-h1">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.15),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.15),transparent_40%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <Motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-sm font-semibold text-purple-400">
                                <Sparkles className="h-4 w-4" aria-hidden="true" />
                                Custom Web Development Agency
                            </div>
                            <h1 id="hero-h1" className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl text-balance">
                                Modern Website Design for{' '}
                                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">SA Businesses</span>
                            </h1>
                            <p className="mb-10 text-lg leading-relaxed text-text-muted md:text-xl max-w-xl">
                                Your website is your 24/7 digital storefront. We build ultra-fast, mobile-optimised websites designed specifically to capture leads and drive sales for modern businesses worldwide.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Button href="/#contact" size="lg" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white border-purple-500">Get a Web Design Quote</Button>
                                <Button href="#features" variant="outline" size="lg" className="w-full sm:w-auto border-purple-400/30 hover:bg-purple-400/10">View Features</Button>
                            </div>
                        </Motion.div>
                        <Motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
                            <div className="absolute -inset-4 rounded-[2rem] bg-purple-400/10 blur-3xl" />
                            <img src="/hero-website-design.webp" alt="Modern floating UI wireframes and glowing web components" className="relative rounded-3xl border border-white/10 shadow-2xl w-full h-auto object-cover aspect-[4/3] sm:aspect-video lg:aspect-square" width="800" height="800" fetchpriority="high" />
                        </Motion.div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="bg-card/35 py-24 md:py-32" aria-labelledby="features-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple-400">Our Standards</p>
                        <h2 id="features-heading" className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">Built for Performance</h2>
                        <p className="text-lg leading-relaxed text-text-muted">Every website we build adheres to strict technical standards ensuring it loads fast, ranks well, and works flawlessly.</p>
                    </div>
                    <Motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map(f => (
                            <Motion.article key={f.title} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }} className="rounded-2xl border border-white/10 bg-background/70 p-6 transition hover:-translate-y-1 hover:border-purple-400/45">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-400/10 text-purple-400">{f.icon}</div>
                                <h3 className="mb-2 text-xl font-bold text-white">{f.title}</h3>
                                <p className="text-sm leading-relaxed text-text-muted">{f.desc}</p>
                            </Motion.article>
                        ))}
                    </Motion.div>
                </div>
            </section>

            {/* Work Showcase */}
            <SelectedWork />

            {/* FAQ */}
            <section className="bg-background py-24 md:py-32" aria-labelledby="faq-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-12 text-center">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple-400">FAQ</p>
                            <h2 id="faq-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">Web Design Questions</h2>
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

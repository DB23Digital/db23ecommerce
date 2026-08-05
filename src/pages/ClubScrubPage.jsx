import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Sparkles } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/Button';

const features = [
    'Professional golf club cleaning & restoration',
    'Specialised cleaning compounds and tools',
    'Restores grip, shine, and performance',
    'Available for individuals and clubs',
    'Fast turnaround service',
    'Based in South Africa',
];

export function ClubScrubPage() {
    return (
        <PageLayout>
            <SEOHead
                title="Club Scrub — Golf Club Cleaning Service | DB23 eCommerce"
                description="Club Scrub is a professional golf club cleaning and restoration service. DB23 built their digital presence to help them grow online."
                canonical="https://db23.co.za/club-scrub/"
                keywords="golf club cleaning South Africa, club scrub, golf club restoration, golf equipment cleaning"
                ogTitle="Club Scrub — Golf Club Cleaning Service"
                ogDescription="Professional golf club cleaning and restoration. A DB23 eCommerce client showcase."
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "Club Scrub", "item": "https://db23.co.za/club-scrub/" }
                        ]
                    }
                ]}
            />

            {/* Hero */}
            <section className="relative min-h-[70vh] overflow-hidden bg-background pt-32 pb-20 md:pt-44" aria-labelledby="clubscrub-h1">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(20,184,166,0.12),transparent_30%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8">
                    <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                            <Sparkles className="h-4 w-4" aria-hidden="true" />
                            Client Showcase
                        </div>
                        <h1 id="clubscrub-h1" className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl text-balance">
                            Club Scrub —{' '}
                            <span className="bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent">Golf Club Cleaning</span>
                        </h1>
                        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-muted">
                            Club Scrub is a professional golf club cleaning and restoration service based in South Africa.
                            DB23 eCommerce built their digital presence to help them reach golfers and clubs online.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row justify-center">
                            <Button href="/#contact" size="lg">Get Your Own Website</Button>
                            <a href="/website-design/" className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-text-muted hover:text-white transition-colors px-6 py-3">
                                View Website Design Services <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </Motion.div>
                </div>
            </section>

            {/* Showcase image */}
            <section className="bg-card/35 py-16">
                <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                    <img
                        src="/assets/showcase/clubscrub.webp"
                        alt="Club Scrub golf club cleaning service website built by DB23 eCommerce"
                        className="w-full rounded-3xl border border-white/10 shadow-2xl"
                        width="1200"
                        height="800"
                        loading="lazy"
                    />
                </div>
            </section>

            {/* Features */}
            <section className="bg-background py-20 md:py-28">
                <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                    <div className="text-center mb-12">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">About Club Scrub</p>
                        <h2 className="text-3xl font-black text-white md:text-4xl">Professional Golf Club Restoration</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {features.map(f => (
                            <div key={f} className="flex items-center gap-3 rounded-xl border border-white/10 bg-card/70 px-5 py-4">
                                <BadgeCheck className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                                <span className="text-sm font-semibold text-white">{f}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden bg-card/35 py-20 md:py-28">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">Need a Website Like This?</h2>
                    <p className="mx-auto mb-8 max-w-xl text-lg text-text-muted">
                        DB23 builds fast, modern websites for South African businesses. From showcase sites to full digital marketing systems.
                    </p>
                    <Button href="/website-design/" size="lg">See Website Design Services</Button>
                </div>
            </section>
        </PageLayout>
    );
}

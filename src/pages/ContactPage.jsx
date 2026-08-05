import React from 'react';
import { motion as Motion } from 'framer-motion';
import { BadgeCheck, Bot, BrainCircuit, Globe, Mail, MapPin, Sparkles } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { ContactForm } from '../components/ContactForm';

const enquiryTypes = [
    { icon: <BrainCircuit className="h-5 w-5" />, label: 'Book an AI Workshop', subject: 'AI Workshop Enquiry' },
    { icon: <Bot className="h-5 w-5" />, label: 'Voice AI Quote', subject: 'Voice AI Quote Request' },
    { icon: <Globe className="h-5 w-5" />, label: 'Website Design Quote', subject: 'Website Design Quote' },
    { icon: <Sparkles className="h-5 w-5" />, label: 'General Enquiry', subject: 'General Enquiry' },
];

export function ContactPage() {
    const handleEnquiryType = (subject) => {
        window.dispatchEvent(new CustomEvent('db23-contact-subject', { detail: { subject } }));
        document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <PageLayout>
            <SEOHead
                title="Contact DB23 eCommerce | Book an AI Workshop or Consultation"
                description="Get in touch with DB23 eCommerce. Book an AI workshop, request a digital services quote, or start a conversation about AI for your South African business."
                canonical="https://db23.co.za/contact/"
                keywords="contact DB23 eCommerce, book AI workshop South Africa, AI consulting enquiry, digital marketing quote South Africa"
                ogTitle="Contact DB23 eCommerce | South Africa"
                ogDescription="Book an AI workshop or discuss digital services with DB23. We respond within one business day."
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://db23.co.za/contact/" }
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        "name": "Contact DB23 eCommerce",
                        "url": "https://db23.co.za/contact/",
                        "description": "Contact DB23 eCommerce for AI workshops, Voice AI, digital marketing, website design, and SEO services in South Africa.",
                        "mainEntity": { "@id": "https://db23.co.za/#business" }
                    }
                ]}
            />

            {/* Hero */}
            <section className="relative overflow-hidden bg-background pt-32 pb-16 md:pt-44" aria-labelledby="contact-h1">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(20,184,166,0.12),transparent_30%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8">
                    <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                            <Sparkles className="h-4 w-4" aria-hidden="true" />
                            We respond within one business day
                        </div>
                        <h1 id="contact-h1" className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl text-balance">
                            Let's Talk About{' '}
                            <span className="bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent">Your Business</span>
                        </h1>
                        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-text-muted">
                            Whether you want to book an AI workshop, get a quote for Voice AI, or just have a conversation about what AI could do for your business — we're ready to help.
                        </p>
                    </Motion.div>
                </div>
            </section>

            {/* Quick enquiry type selector */}
            <section className="bg-card/35 py-12" aria-label="Enquiry type">
                <div className="container mx-auto px-4 md:px-8">
                    <p className="text-center text-sm font-semibold uppercase tracking-widest text-accent mb-6">What can we help with?</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {enquiryTypes.map(e => (
                            <button
                                key={e.label}
                                onClick={() => handleEnquiryType(e.subject)}
                                className="flex items-center gap-2 rounded-full border border-white/10 bg-background/70 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:border-accent/50 hover:text-accent hover:bg-accent/10"
                            >
                                <span className="text-accent">{e.icon}</span>
                                {e.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact details + form */}
            <section id="contact-form-section" className="bg-background py-24 md:py-32" aria-labelledby="form-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid gap-12 lg:grid-cols-5 max-w-6xl mx-auto">

                        {/* Contact info */}
                        <div className="lg:col-span-2">
                            <h2 id="form-heading" className="mb-6 text-3xl font-black text-white">Get in Touch</h2>
                            <p className="mb-8 text-lg leading-relaxed text-text-muted">
                                Fill in the form and we'll get back to you within one South African business day. No sales pressure — just a practical conversation about what we can do for your business.
                            </p>

                            <address className="not-italic space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Email</p>
                                        <a href="mailto:info@db23.co.za" className="text-white hover:text-accent transition-colors font-semibold">info@db23.co.za</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Location</p>
                                        <p className="text-white font-semibold">Cape Town, Western Cape</p>
                                        <p className="text-text-muted text-sm">South Africa</p>
                                        <p className="text-text-muted text-sm mt-1">Serving SA nationally · Global clients online</p>
                                    </div>
                                </div>
                            </address>

                            <div className="mt-10 space-y-3">
                                {[
                                    'AI workshops from R4,500 (ZAR) / $300 (USD)',
                                    'Voice AI custom-quoted per project',
                                    'Free initial consultation call',
                                    'Response within 1 business day',
                                ].map(point => (
                                    <div key={point} className="flex items-center gap-3">
                                        <BadgeCheck className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                                        <span className="text-sm text-text-muted">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact form */}
                        <div className="lg:col-span-3">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Maps — location signal for local SEO */}
            <section className="bg-card/35 py-16 md:py-24" aria-label="Our location">
                <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                    <div className="mb-8 text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Find Us</p>
                        <h2 className="text-2xl font-black text-white">Tryall Road, Parklands, Cape Town</h2>
                        <p className="text-text-muted text-sm mt-1">Western Cape, 7146, South Africa</p>
                    </div>
                    <div className="rounded-2xl overflow-hidden" style={{ height: '400px' }}>
                        <iframe
                            src="https://storage.googleapis.com/maps-solutions-9wahyfg264/address-selection/flzc/address-selection.html"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="DB23 eCommerce — Tryall Road, Parklands, Cape Town"
                            aria-label="Map showing DB23 eCommerce location in Parklands, Cape Town"
                        />
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}

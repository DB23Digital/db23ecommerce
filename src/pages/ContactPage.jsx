import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { ContactForm } from '../components/ContactForm';
import { PageHero, Section } from '../components/PageBlocks';

const enquiryTypes = [
    { label: 'Book an AI Workshop', subject: 'AI Workshop Enquiry' },
    { label: 'Voice AI Quote', subject: 'Voice AI Quote Request' },
    { label: 'Website Design Quote', subject: 'Website Design Quote' },
    { label: 'General Enquiry', subject: 'General Enquiry' },
];

const points = [
    'AI workshops: Tier 1 from R4,500, Tier 2 from R12,500, Tier 3 custom',
    'Voice AI custom-quoted per project',
    'Free initial consultation call',
    'WhatsApp reply within the hour',
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
                ogDescription="Book an AI workshop or discuss digital services with DB23. We reply within the hour on WhatsApp, business hours."
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

            <PageHero
                eyebrow="We reply within the hour, business hours"
                title="Let's talk about your business."
                intro="Whether you want to book an AI workshop, get a quote for Voice AI, or just have a conversation about what AI could do for your business — we're ready to help."
            >
                <div className="mt-12" role="group" aria-label="What can we help with?">
                    <p className="mb-4 text-sm text-text-muted">What can we help with?</p>
                    <div className="flex flex-wrap gap-3">
                        {enquiryTypes.map(e => (
                            <button
                                key={e.label}
                                type="button"
                                onClick={() => handleEnquiryType(e.subject)}
                                className="rounded-[3px] border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
                            >
                                {e.label}
                            </button>
                        ))}
                    </div>
                </div>
            </PageHero>

            <Section
                id="contact-form-section"
                title="Get in touch."
                intro="Fill in the form, or message us on WhatsApp for the fastest reply — within the hour during business hours. No sales pressure, just a practical conversation about what we can do for your business."
            >
                <div className="grid gap-16 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <address className="not-italic">
                            <div className="border-t border-white/10 py-6">
                                <p className="mb-2 text-sm text-text-muted">WhatsApp</p>
                                <a
                                    href="https://wa.me/27836025227?text=Hi%20DB23%2C%20I%20would%20like%20to%20talk%20about%20"
                                    rel="noopener"
                                    className="text-xl font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-accent"
                                >
                                    +27 83 602 5227
                                </a>
                                <p className="mt-1 text-sm text-text-muted">Fastest reply — within the hour, business hours</p>
                            </div>
                            <div className="border-t border-white/10 py-6">
                                <p className="mb-2 text-sm text-text-muted">Email</p>
                                <a
                                    href="mailto:info@db23.co.za"
                                    className="break-all text-xl font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-accent"
                                >
                                    info@db23.co.za
                                </a>
                            </div>
                            <div className="border-t border-white/10 py-6">
                                <p className="mb-2 text-sm text-text-muted">Location</p>
                                <p className="text-xl font-medium text-white">Cape Town, Western Cape</p>
                                <p className="text-sm text-text-muted">South Africa</p>
                                <p className="mt-1 text-sm text-text-muted">Serving SA nationally · Global clients online</p>
                            </div>
                        </address>

                        <ul className="border-t border-white/10 pt-6">
                            {points.map(point => (
                                <li key={point} className="flex gap-3 py-1.5 text-sm text-text-muted">
                                    <span className="mt-2.5 h-px w-3 shrink-0 bg-white/40" aria-hidden="true" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-7">
                        <ContactForm />
                    </div>
                </div>
            </Section>

            {/* Google Maps, location signal for local SEO */}
            <Section id="find-us" title="Tryall Road, Parklands, Cape Town." intro="Western Cape, 7441, South Africa">
                <div className="overflow-hidden rounded-md border border-white/10" style={{ height: '400px' }}>
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
            </Section>
        </PageLayout>
    );
}

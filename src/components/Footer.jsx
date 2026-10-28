import React from 'react';
import { CurrencySelector } from './ui/CurrencySelector';

const explore = [
    { label: 'Website Design', href: '/website-design/' },
    { label: 'Hosting & Care', href: '/#hosting' },
    { label: 'SEO, AEO & GEO', href: '/seo-services/' },
    { label: 'AI Workshops', href: '/ai-workshops/' },
    { label: 'AI Training', href: '/ai-training/' },
    { label: 'Blog', href: '/blog/' },
];

// Not core services any more, but still live pages: keep them linked.
const implementations = [
    { label: 'Voice AI', href: '/voice-ai/' },
    { label: 'AI Automation', href: '/ai-automation/' },
    { label: 'Digital Marketing', href: '/digital-marketing/' },
    { label: 'Outsourced Marketing', href: '/outsourced-marketing/' },
];

const company = [
    { label: 'About DB23', href: '/about/' },
    { label: 'Work', href: '/#work-showcase' },
    { label: 'Before & After', href: '/#plain-english-ai' },
    { label: 'Contact Us', href: '/contact/' },
    { label: 'Book a Workshop', href: '/#contact' },
];

const linkClass = 'text-text-muted transition-colors hover:text-white';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-background pb-10 pt-20">
            <div className="mx-auto max-w-[1400px] px-4 md:px-8">
                <div className="mb-20 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-12">
                    <div className="col-span-2 md:col-span-4">
                        <p className="max-w-sm text-pretty text-lg leading-relaxed text-white">
                            DB23 designs, hosts and optimises websites for small businesses, and helps teams put AI to work
                            through practical workshops and strategy.
                        </p>
                    </div>

                    <div className="md:col-span-3 md:col-start-6">
                        <h2 className="mb-5 text-sm text-white">Services</h2>
                        <ul className="space-y-3 text-sm">
                            {explore.map((l) => (
                                <li key={l.href}><a href={l.href} className={linkClass}>{l.label}</a></li>
                            ))}
                        </ul>
                        <h2 className="mb-4 mt-10 text-sm text-white">We also implement</h2>
                        <ul className="space-y-3 text-sm">
                            {implementations.map((l) => (
                                <li key={l.href}><a href={l.href} className={linkClass}>{l.label}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h2 className="mb-5 text-sm text-white">Company</h2>
                        <ul className="space-y-3 text-sm">
                            {company.map((l) => (
                                <li key={l.href}><a href={l.href} className={linkClass}>{l.label}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-3">
                        <h2 className="mb-5 text-sm text-white">Contact</h2>
                        <address className="space-y-3 text-sm not-italic text-text-muted">
                            <p>Cape Town, Western Cape, South Africa</p>
                            <p><a href="tel:+27836025227" className={linkClass}>+27 83 602 5227</a></p>
                            <p>
                                <a
                                    href="https://wa.me/27836025227?text=Hi%20DB23%2C%20I%20would%20like%20to%20talk%20about%20"
                                    rel="noopener"
                                    className={linkClass}
                                >
                                    WhatsApp: reply within the hour
                                </a>
                            </p>
                            <p><a href="mailto:deon@db23.co.za" className={linkClass}>deon@db23.co.za</a></p>
                        </address>
                    </div>
                </div>

                {/* NAP in plain HTML for local SEO crawlability */}
                <p className="mb-10 border-t border-white/10 pt-8 text-xs leading-relaxed text-text-muted">
                    <strong className="font-medium text-white/80">DB23 eCommerce</strong> &bull;
                    Tryall Road, Parklands, Cape Town, Western Cape, 7441, South Africa &bull;
                    <a href="tel:+27836025227" className="ml-1 hover:text-white">+27 83 602 5227</a> &bull;
                    <a href="mailto:deon@db23.co.za" className="ml-1 hover:text-white">deon@db23.co.za</a>
                    &bull; <span className="ml-1">Website Design · Hosting · SEO, AEO &amp; GEO · AI Workshops &amp; Strategy</span>
                </p>

                <div className="flex flex-col gap-4 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
                    <p>&copy; {currentYear} DB23 eCommerce. All rights reserved.</p>
                    <div className="flex flex-wrap items-center gap-4">
                        <CurrencySelector />
                        <span>Websites &bull; Search &bull; AI Strategy</span>
                    </div>
                </div>
            </div>

            {/* Oversized wordmark, cropped by the footer edge */}
            <p
                className="pointer-events-none mt-12 select-none text-center text-[34vw] font-semibold leading-[0.72] tracking-[-0.07em] text-white/[0.04] md:-mb-[4vw] md:text-[28vw]"
                aria-hidden="true"
            >
                DB23
            </p>
        </footer>
    );
}

import React from 'react';
import { CurrencySelector } from './ui/CurrencySelector';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 bg-background pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-8">
                <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-5">
                    <div className="md:col-span-2">
                        <h3 className="mb-4 text-2xl font-black tracking-tight text-white">DB23 eCommerce</h3>
                        <p className="mb-6 max-w-md text-text-muted">
                            DB23 helps businesses practically understand and implement AI while building modern digital
                            systems that support real business growth.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">Explore</h4>
                        <ul className="space-y-4">
                            <li><a href="/ai-workshops/" className="text-text-muted transition-colors hover:text-white">AI Workshops</a></li>
                            <li><a href="/voice-ai/" className="text-text-muted transition-colors hover:text-white">Voice AI</a></li>
                            <li><a href="/ai-automation/" className="text-text-muted transition-colors hover:text-white">AI Automation</a></li>
                            <li><a href="/ai-training/" className="text-text-muted transition-colors hover:text-white">AI Training</a></li>
                            <li><a href="/digital-marketing/" className="text-text-muted transition-colors hover:text-white">Digital Marketing</a></li>
                            <li><a href="/website-design/" className="text-text-muted transition-colors hover:text-white">Website Design</a></li>
                            <li><a href="/outsourced-marketing/" className="text-text-muted transition-colors hover:text-white">Outsourced Marketing</a></li>
                            <li><a href="/seo-services/" className="text-text-muted transition-colors hover:text-white">SEO Services</a></li>
                            <li><a href="/blog/" className="text-text-muted transition-colors hover:text-white">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
                        <ul className="mb-8 space-y-4">
                            <li><a href="/about/" className="text-text-muted transition-colors hover:text-white">About DB23</a></li>
                            <li><a href="/#plain-english-ai" className="text-text-muted transition-colors hover:text-white">AI in Plain English</a></li>
                            <li><a href="/contact/" className="text-text-muted transition-colors hover:text-white">Contact Us</a></li>
                            <li><a href="/#contact" className="text-text-muted transition-colors hover:text-white">Book a Workshop</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
                        <address className="not-italic space-y-4 text-text-muted text-sm">
                            <p>
                                <span className="block text-white/60 text-xs uppercase tracking-widest mb-1">Business</span>
                                DB23 eCommerce
                            </p>
                            <p>
                                <span className="block text-white/60 text-xs uppercase tracking-widest mb-1">Location</span>
                                Cape Town, Western Cape,<br />South Africa
                            </p>
                            <p>
                                <span className="block text-white/60 text-xs uppercase tracking-widest mb-1">Phone</span>
                                <a href="tel:+27836025227" className="hover:text-white transition-colors">+27 83 602 5227</a>
                            </p>
                            <p>
                                <span className="block text-white/60 text-xs uppercase tracking-widest mb-1">Email</span>
                                <a href="mailto:deon@db23.co.za" className="hover:text-white transition-colors">deon@db23.co.za</a>
                            </p>
                        </address>
                    </div>
                </div>

                {/* NAP in plain HTML for local SEO crawlability */}
                <div className="mb-8 rounded-xl border border-white/5 bg-white/[0.02] px-6 py-4 text-sm text-text-muted">
                    <strong className="text-white/70">DB23 eCommerce</strong> &bull;
                    Tryall Road, Parklands, Cape Town, Western Cape, 7441, South Africa &bull;
                    <a href="tel:+27836025227" className="hover:text-white transition-colors ml-1">+27 83 602 5227</a> &bull;
                    <a href="mailto:deon@db23.co.za" className="hover:text-white transition-colors ml-1">deon@db23.co.za</a>
                    &bull; <span className="ml-1">AI Workshops · Voice AI · Digital Marketing · Website Design · SEO Services</span>
                </div>

                <div className="flex flex-col items-center justify-between border-t border-white/5 pt-8 text-sm text-text-muted md:flex-row">
                    <p>&copy; {currentYear} DB23 eCommerce. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 flex items-center gap-4 flex-wrap justify-center">
                        <CurrencySelector />
                        <span className="hidden sm:inline">|</span>
                        <span>AI Workshops &bull; Automation &bull; Digital Systems</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

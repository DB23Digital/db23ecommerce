import React from 'react';
import { Hero } from '../components/Hero';
import { ServicesGrid } from '../components/ServicesGrid';
import { SelectedWork } from '../components/SelectedWork';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Features } from '../components/Features';
import { AITraining } from '../components/AITraining';
import { FAQ } from '../components/FAQ';
import { BottomCTA } from '../components/BottomCTA';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { PlainEnglishAI } from '../components/PlainEnglishAI';
import { VideoReady } from '../components/VideoReady';
import { SEOHead } from '../components/SEOHead';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'AI Workshops', href: '/ai-workshops/' },
    { label: 'Voice AI', href: '/voice-ai/' },
    { label: 'AI Training', href: '/ai-training/' },
    { label: 'Work', href: 'https://db23.co.za/#work-showcase' },
    { label: 'Contact', href: '#contact' },
];

export function HomePage() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-text-main font-sans selection:bg-accent/30 selection:text-white overflow-x-hidden">
            <SEOHead
                title="AI Workshops & Digital Marketing South Africa | DB23"
                description="DB23 helps South African businesses implement AI, automate marketing, and grow online. AI workshops, Voice AI, SEO and website design."
                canonical="https://db23.co.za/"
                keywords="AI workshops South Africa, AI training South Africa, Voice AI South Africa, digital marketing South Africa, SEO services South Africa"
                ogTitle="AI Workshops & Digital Marketing South Africa | DB23"
                ogDescription="DB23 helps South African businesses implement AI, automate marketing, and grow online. AI workshops, Voice AI, SEO and website design."
            />

            <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5 py-4">
                <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                    <a href="/" className="flex items-center">
                        <img src="/DB23%20logo.png" alt="DB23 eCommerce" className="h-10 w-auto" width="120" height="40" />
                    </a>
                    <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6 text-sm font-medium text-text-muted">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className="hover:text-white transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center gap-4">
                        <a href="/ai-workshops/" className="hidden md:inline-flex text-sm font-semibold hover:text-accent transition-colors">
                            Book AI Workshop
                        </a>
                        <button
                            className="md:hidden text-text-muted hover:text-white"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        >
                            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
                {mobileOpen && (
                    <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-md px-4 pb-6 pt-4">
                        <nav className="flex flex-col gap-4">
                            {navLinks.map(link => (
                                <a key={link.href} href={link.href} className="text-sm font-medium text-text-muted hover:text-white transition-colors py-1" onClick={() => setMobileOpen(false)}>
                                    {link.label}
                                </a>
                            ))}
                            <a href="/ai-workshops/" className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover" onClick={() => setMobileOpen(false)}>
                                Book AI Workshop
                            </a>
                        </nav>
                    </div>
                )}
            </header>

            <main>
                <Hero />
                <AITraining />
                <ServicesGrid />
                <Features />
                <WhyChooseUs />
                <PlainEnglishAI />
                <SelectedWork />
                <VideoReady />
                <FAQ />
                <BottomCTA />
                <ContactForm />
            </main>
            <Footer />
        </div>
    );
}

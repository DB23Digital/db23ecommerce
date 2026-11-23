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
    { label: 'Free AI Resources', href: '#free-ai-resources' },
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
                    <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium text-text-muted">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className="hover:text-white transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center gap-4">
                        <a href="/ai-workshops/" className="hidden lg:inline-flex text-sm font-semibold hover:text-accent transition-colors">
                            Book AI Workshop
                        </a>
                        <button
                            className="lg:hidden text-text-muted hover:text-white"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        >
                            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
                {mobileOpen && (
                    <div className="lg:hidden border-t border-white/5 bg-background/95 backdrop-blur-md px-4 pb-6 pt-4">
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
                <section id="free-ai-resources" aria-labelledby="free-ai-resources-heading" className="scroll-mt-28 border-y border-white/10 bg-card/40 py-16 md:py-20">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="mb-8 max-w-3xl">
                            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-blue-300">Free learning from DB23</p>
                            <h2 id="free-ai-resources-heading" className="mb-4 text-3xl font-black tracking-tight text-white md:text-4xl">Understand AI. Then put it to work.</h2>
                            <p className="text-base leading-relaxed text-text-muted md:text-lg">Clear explanations when you are starting out, plus practical prompts and templates when you are ready to try something yourself. Free to explore—no sign-up needed.</p>
                        </div>
                        <div className="grid gap-5 md:grid-cols-2">
                            <article className="flex flex-col rounded-2xl border border-white/10 bg-card p-6 md:p-8">
                                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-300">Learn the fundamentals</p>
                                <h3 className="mb-3 text-2xl font-extrabold text-white">DB23 AI Academy</h3>
                                <p className="mb-6 flex-1 text-sm leading-relaxed text-text-muted">Follow illustrated lessons from beginner concepts through business AI, tools and coding agents. Look up unfamiliar terms in the searchable glossary.</p>
                                <a href="/ai-academy/" className="inline-flex min-h-11 items-center justify-center self-start rounded-lg bg-accent px-5 py-3 text-sm font-bold text-white transition hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300">Explore the AI Academy →</a>
                            </article>
                            <article className="flex flex-col rounded-2xl border border-white/10 bg-card p-6 md:p-8">
                                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-300">Try a practical task</p>
                                <h3 className="mb-3 text-2xl font-extrabold text-white">DB23 AI Prompt Library</h3>
                                <p className="mb-6 flex-1 text-sm leading-relaxed text-text-muted">Browse clear, copyable prompts for marketing, websites, creative work and coding projects. Every template explains what to customise and what to check.</p>
                                <a href="/prompt-library/" className="inline-flex min-h-11 items-center justify-center self-start rounded-lg border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300">Explore the Prompt Library →</a>
                            </article>
                        </div>
                        <p className="mt-7 text-sm text-text-muted">Have a real business challenge? <a href="/contact/" className="font-semibold text-white underline underline-offset-4 hover:text-blue-300">Talk to DB23 about training, strategy or implementation.</a></p>
                    </div>
                </section>
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

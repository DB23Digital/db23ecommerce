import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Footer } from './Footer';
import { CurrencySelector } from './ui/CurrencySelector';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'AI Workshops', href: '/ai-workshops/' },
    { label: 'Voice AI', href: '/voice-ai/' },
    { label: 'AI Automation', href: '/ai-automation/' },
    { label: 'AI Training', href: '/ai-training/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Work', href: 'https://db23.co.za/#work-showcase' },
    { label: 'Contact', href: '/#contact' },
];

export function PageLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-text-main font-sans selection:bg-accent/30 selection:text-white overflow-x-hidden">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5 py-4">
                <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                    <a href="/" className="flex items-center">
                        <img src="/DB23%20logo.png" alt="DB23 eCommerce" className="h-10 w-auto" width="120" height="40" />
                    </a>

                    <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6 text-sm font-medium text-text-muted">
                        {navLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <CurrencySelector />
                        <a
                            href="/#contact"
                            className="hidden md:inline-flex text-sm font-semibold hover:text-accent transition-colors"
                        >
                            Book AI Workshop
                        </a>
                        <button
                            className="md:hidden text-text-muted hover:text-white transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        >
                            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-md px-4 pb-6 pt-4">
                        <nav className="flex flex-col gap-4">
                            {navLinks.map(link => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-text-muted hover:text-white transition-colors py-1"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="flex items-center justify-between py-2 border-t border-white/5 mt-2">
                                <span className="text-sm text-text-muted">Change Currency</span>
                                <CurrencySelector />
                            </div>
                            <a
                                href="/#contact"
                                className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
                                onClick={() => setMobileOpen(false)}
                            >
                                Book AI Workshop
                            </a>
                        </nav>
                    </div>
                )}
            </header>

            <main>{children}</main>
            <Footer />
        </div>
    );
}

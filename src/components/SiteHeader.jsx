import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CurrencySelector } from './ui/CurrencySelector';

const navLinks = [
    { label: 'Websites', href: '/website-design/' },
    { label: 'Hosting', href: '/#hosting' },
    { label: 'SEO & AI search', href: '/seo-services/' },
    { label: 'AI Workshops', href: '/ai-workshops/' },
    { label: 'Work', href: '/#work-showcase' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Contact', href: '/#contact' },
];

export function SiteHeader({ showCurrency = false }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Slide away on scroll down, return on scroll up.
    useEffect(() => {
        let lastY = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 12);
            setHidden(y > 240 && y > lastY);
            lastY = y;
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (!mobileOpen) return undefined;
        const onKey = (e) => e.key === 'Escape' && setMobileOpen(false);
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [mobileOpen]);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-300 ${
                hidden && !mobileOpen ? '-translate-y-full' : 'translate-y-0'
            } ${scrolled || mobileOpen ? 'border-b border-white/10 bg-background/95' : 'border-b border-transparent bg-transparent'}`}
        >
            <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:h-[72px] md:px-8">
                <a href="/" className="flex items-center" aria-label="DB23 home">
                    <img src="/DB23-logo.webp" alt="DB23 eCommerce" className="h-9 w-auto md:h-10" width="120" height="40" />
                </a>

                <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm text-text-muted lg:flex">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className="transition-colors hover:text-white">
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    {showCurrency && (
                        <span className="hidden lg:inline-flex">
                            <CurrencySelector />
                        </span>
                    )}
                    <a
                        href="/#contact"
                        className="hidden h-10 items-center rounded-[3px] border border-white/25 px-4 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent lg:inline-flex"
                    >
                        Start a project
                    </a>
                    <button
                        className="-mr-2 flex h-11 w-11 items-center justify-center text-white lg:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                    >
                        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div id="mobile-menu" className="h-[calc(100dvh-4rem)] overflow-y-auto bg-background px-4 pb-10 pt-6 lg:hidden">
                    <nav aria-label="Mobile navigation" className="flex flex-col">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="border-b border-white/10 py-4 text-2xl font-medium tracking-tight text-white"
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                    {showCurrency && (
                        <div className="mt-6 flex items-center justify-between">
                            <span className="text-sm text-text-muted">Currency</span>
                            <CurrencySelector />
                        </div>
                    )}
                    <a
                        href="/#contact"
                        className="mt-8 flex h-14 items-center justify-center rounded-[3px] bg-accent text-base font-semibold text-ink"
                        onClick={() => setMobileOpen(false)}
                    >
                        Start a project
                    </a>
                </div>
            )}
        </header>
    );
}

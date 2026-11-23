import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { CurrencySelector } from './ui/CurrencySelector';
import { aiResources } from '../data/aiResources';

const navLinks = [
    { label: 'Websites', href: '/website-design/' },
    { label: 'Hosting', href: '/#hosting' },
    { label: 'SEO & AI search', href: '/seo-services/' },
    { label: 'AI Workshops', href: '/ai-workshops/' },
    { label: 'Work', href: '/#work-showcase' },
    { label: 'Blog', href: '/blog/' },
];

const contactLink = { label: 'Contact', href: '/#contact' };

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

/** Desktop disclosure (button + list of links), not an ARIA menu: Tab moves through it normally. */
function ResourcesDropdown({ open, setOpen }) {
    const wrapRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        if (!open) return undefined;
        const onPointer = (e) => {
            if (!wrapRef.current?.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => {
            if (e.key !== 'Escape') return;
            setOpen(false);
            buttonRef.current?.focus();
        };
        document.addEventListener('pointerdown', onPointer);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('pointerdown', onPointer);
            document.removeEventListener('keydown', onKey);
        };
    }, [open, setOpen]);

    return (
        <div
            ref={wrapRef}
            className="relative"
            onBlur={(e) => {
                if (!wrapRef.current?.contains(e.relatedTarget)) setOpen(false);
            }}
        >
            <button
                ref={buttonRef}
                type="button"
                className={`inline-flex items-center gap-1 transition-colors hover:text-white ${open ? 'text-white' : ''} ${focusRing}`}
                aria-expanded={open}
                aria-controls="ai-resources-panel"
                onClick={() => setOpen((v) => !v)}
            >
                Free AI Resources
                <ChevronDown className={`h-4 w-4 transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            <div
                id="ai-resources-panel"
                hidden={!open}
                className="absolute left-1/2 top-full mt-5 w-80 -translate-x-1/2 rounded-[3px] border border-white/10 bg-background p-2 shadow-2xl shadow-black/60"
            >
                <ul>
                    {aiResources.map((r) => (
                        <li key={r.href}>
                            <a
                                href={r.href}
                                className={`block rounded-[3px] px-4 py-3 transition-colors hover:bg-white/[0.05] ${focusRing} focus-visible:outline-offset-0`}
                            >
                                <span className="block font-medium text-white">{r.name}</span>
                                <span className="mt-0.5 block text-text-muted">{r.tagline}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export function SiteHeader({ showCurrency = false }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);

    // Slide away on scroll down, return on scroll up.
    useEffect(() => {
        let lastY = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 12);
            const hide = y > 240 && y > lastY;
            setHidden(hide);
            if (hide) setResourcesOpen(false);
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

                <nav aria-label="Main navigation" className="hidden items-center gap-5 text-sm text-text-muted lg:flex xl:gap-7">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className={`transition-colors hover:text-white ${focusRing}`}>
                            {link.label}
                        </a>
                    ))}
                    <ResourcesDropdown open={resourcesOpen} setOpen={setResourcesOpen} />
                    <a href={contactLink.href} className={`transition-colors hover:text-white ${focusRing}`}>
                        {contactLink.label}
                    </a>
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
                        {[...navLinks, contactLink].map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="border-b border-white/10 py-4 text-2xl font-medium tracking-tight text-white"
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <p id="mobile-ai-resources" className="mt-8 text-sm text-text-muted">
                            Free AI Resources
                        </p>
                        <ul aria-labelledby="mobile-ai-resources" className="mt-1">
                            {aiResources.map((r) => (
                                <li key={r.href}>
                                    <a
                                        href={r.href}
                                        className="flex items-baseline justify-between gap-4 border-b border-white/10 py-4"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        <span className="text-xl font-medium tracking-tight text-white">{r.name}</span>
                                        <span className="text-sm text-text-muted">{r.tagline}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
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

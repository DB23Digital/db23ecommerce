import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/Button';

function selectContactSubject(subject) {
    window.sessionStorage.setItem('db23-contact-subject', subject);
    window.dispatchEvent(new CustomEvent('db23-contact-subject', { detail: { subject } }));
}

const rise = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

// The four core services; each row jumps to its detail on the page.
const services = [
    { label: 'Website design', note: 'Sites that bring in enquiries', href: '#website-design' },
    { label: 'Hosting & care', note: 'Plans from R999/month, SEO included', href: '#hosting' },
    { label: 'SEO, AEO & GEO', note: 'Found on Google and in AI answers', href: '#search' },
    { label: 'AI workshops & strategy', note: 'A practical plan for your team', href: '#ai-workshops' },
];

export function Hero() {
    return (
        <section
            className="relative overflow-hidden bg-background pb-16 pt-28 md:pb-24 md:pt-40"
            id="home"
            aria-labelledby="hero-heading"
        >
            <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

            <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
                <Motion.p {...rise(0)} className="mb-8 text-sm text-text-muted">
                    For South African small businesses · Cape Town &amp; nationwide
                </Motion.p>

                <Motion.h1
                    {...rise(0.06)}
                    id="hero-heading"
                    className="max-w-6xl text-balance text-[2.75rem] font-medium leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-[6.5rem]"
                >
                    Websites that get found. <span className="text-text-muted">AI that makes sense.</span>
                </Motion.h1>

                <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-end">
                    <Motion.p
                        {...rise(0.16)}
                        className="max-w-xl text-pretty text-lg leading-relaxed text-text-muted md:text-xl lg:col-span-6"
                    >
                        DB23 designs, hosts and optimises websites for small businesses, so you show up on Google and in
                        AI answers. Then we help your team put AI to work with hands-on workshops and clear strategy.
                    </Motion.p>

                    <Motion.div
                        {...rise(0.26)}
                        className="flex flex-col gap-5 sm:flex-row sm:items-center lg:col-span-5 lg:col-start-8 lg:justify-end"
                    >
                        <Button
                            href="#contact"
                            size="lg"
                            className="w-full sm:w-auto"
                            onClick={() => selectContactSubject('Start a Project')}
                        >
                            Start a project
                        </Button>
                        <a
                            href="#ai-workshops"
                            onClick={() => selectContactSubject('AI Workshop')}
                            className="group inline-flex items-center justify-center gap-2 py-3 text-base font-medium text-white underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-accent"
                        >
                            Book an AI workshop
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </a>
                    </Motion.div>
                </div>

                <Motion.nav
                    {...rise(0.36)}
                    aria-label="Services"
                    className="mt-16 grid border-t border-white/10 sm:grid-cols-2 md:mt-24 lg:grid-cols-4"
                >
                    {services.map((s, i) => (
                        <a
                            key={s.href}
                            href={s.href}
                            className={`group flex items-start justify-between gap-4 border-b border-white/10 py-6 lg:border-b-0 lg:py-8 ${
                                i > 0 ? 'lg:border-l lg:pl-6' : ''
                            } ${i % 2 === 1 ? 'sm:border-l sm:pl-6 lg:pl-6' : ''}`}
                        >
                            <span>
                                <span className="block text-xl font-medium tracking-tight text-white transition-colors group-hover:text-accent">
                                    {s.label}
                                </span>
                                <span className="mt-1 block text-sm text-text-muted">{s.note}</span>
                            </span>
                            <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                        </a>
                    ))}
                </Motion.nav>
            </div>
        </section>
    );
}

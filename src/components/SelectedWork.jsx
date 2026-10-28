import React, { useEffect, useRef, useState } from 'react';
import { motion as Motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { showcaseItems } from '../data/showcase';

function hostOf(url) {
    try {
        return new URL(url).host.replace(/^www\./, '');
    } catch {
        return url;
    }
}

function selectContactSubject(subject) {
    window.sessionStorage.setItem('db23-contact-subject', subject);
    window.dispatchEvent(new CustomEvent('db23-contact-subject', { detail: { subject } }));
}

function WorkCard({ item, eager, className = '', onFocus }) {
    return (
        // Hosted client microsites carry X-Robots-Tag: noindex, so every
        // showcase link is nofollow — none should collect crawl equity.
        <a
            href={item.url}
            target="_blank"
            rel="nofollow noopener noreferrer"
            onFocus={onFocus}
            aria-label={`${item.project}, ${item.category}. Opens the live site.`}
            className={`group block shrink-0 focus:outline-none ${className}`}
        >
            <div className="overflow-hidden rounded-md border border-white/15 bg-card shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-colors group-hover:border-accent/60 group-focus-visible:border-accent">
                <div className="flex h-7 items-center gap-3 border-b border-white/10 bg-[#1a1d1b] px-3">
                    <span className="flex gap-1" aria-hidden="true">
                        <span className="h-2 w-2 rounded-full bg-white/15" />
                        <span className="h-2 w-2 rounded-full bg-white/15" />
                    </span>
                    <span className="truncate text-[0.65rem] text-white/45">{hostOf(item.url)}</span>
                </div>
                <div className="aspect-[16/10] overflow-hidden bg-card">
                    <img
                        src={item.image}
                        alt={item.alt}
                        width="1200"
                        height="750"
                        loading={eager ? 'eager' : 'lazy'}
                        decoding="async"
                        className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                </div>
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-xl font-medium tracking-tight text-white transition-colors group-hover:text-accent md:text-2xl">
                        {item.project}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">{item.category}</p>
                </div>
                <ArrowUpRight
                    className="mt-1 h-5 w-5 shrink-0 text-text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden="true"
                />
            </div>
        </a>
    );
}

function Heading({ count, compact = false }) {
    return (
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
                <h2
                    id="work-showcase-heading"
                    className={`text-balance font-medium leading-[1] tracking-[-0.04em] text-white ${
                        compact ? 'text-[2.6rem] md:text-6xl' : 'text-[2.6rem] md:text-7xl'
                    }`}
                >
                    Websites that work as hard as you do.
                </h2>
                <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-text-muted">
                    Conversion-focused sites for small businesses across education, healthcare, travel, pet care, property
                    and more. Each one built to communicate clearly, earn trust, and bring in enquiries.
                </p>
            </div>
            <p className="text-sm text-text-muted lg:col-span-3 lg:col-start-10 lg:text-right">{count} live projects</p>
        </div>
    );
}

export function SelectedWork({ limit }) {
    const items = limit ? showcaseItems.slice(0, limit) : showcaseItems;
    const reduceMotion = useReducedMotion();
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const viewportRef = useRef(null);
    // Pin only on wide screens with motion allowed; phones get a native swipe row.
    const [wide, setWide] = useState(false);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const update = () => setWide(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    const pinned = wide && !reduceMotion && distance > 0;

    // Horizontal overflow of the track = how far the pinned section must scroll.
    useEffect(() => {
        if (!wide || reduceMotion) return undefined;
        const measure = () => {
            const track = trackRef.current;
            if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
        };
        measure();
        const ro = new ResizeObserver(measure);
        if (trackRef.current) ro.observe(trackRef.current);
        window.addEventListener('resize', measure);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, [wide, reduceMotion, items.length]);

    // Progress through the pinned section, measured live. useScroll caches the
    // target's offsets, which go stale once the section grows to fit the track.
    const progress = useMotionValue(0);
    useEffect(() => {
        if (!pinned) return undefined;
        let frame = 0;
        const read = () => {
            frame = 0;
            const el = sectionRef.current;
            if (!el) return;
            const span = el.offsetHeight - window.innerHeight;
            const p = span > 0 ? -el.getBoundingClientRect().top / span : 0;
            progress.set(Math.min(1, Math.max(0, p)));
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(read);
        };
        read();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [pinned, distance, progress]);

    const x = useTransform(progress, [0, 1], [0, -distance]);
    const bar = useSpring(progress, { stiffness: 140, damping: 30 });

    // Keyboard focus on an off-screen card: scroll the page to where that card sits in view.
    const focusCard = (e) => {
        if (!pinned) return;
        if (viewportRef.current) viewportRef.current.scrollLeft = 0;
        const section = sectionRef.current;
        const card = e.currentTarget;
        const target = Math.min(distance, Math.max(0, card.offsetLeft - window.innerWidth * 0.2));
        const top = section.getBoundingClientRect().top + window.scrollY + target;
        window.scrollTo({ top, behavior: 'auto' });
    };

    const closing = (
        <div className="mx-auto mt-20 grid max-w-[1400px] gap-8 px-4 md:grid-cols-12 md:items-end md:px-8">
            <p className="text-balance text-3xl font-medium leading-tight tracking-[-0.03em] text-white md:col-span-8 md:text-4xl">
                Want your business to feel this clear and modern online?
            </p>
            <a
                href="#contact"
                onClick={() => selectContactSubject('Start a Project')}
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-[3px] bg-accent px-8 text-base font-semibold text-ink transition-colors hover:bg-accent-hover md:col-span-4 md:justify-self-end"
            >
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
        </div>
    );

    if (wide && !reduceMotion) {
        return (
            <section id="work-showcase" className="relative bg-background pb-24 md:pb-32" aria-labelledby="work-showcase-heading">
                <div ref={sectionRef} className="relative" style={{ height: pinned ? `calc(100vh + ${distance}px)` : 'auto' }}>
                    <div
                        ref={viewportRef}
                        className={`${pinned ? 'sticky top-0 h-screen' : ''} flex flex-col justify-center overflow-hidden pt-24 pb-10`}
                    >
                        <div className="mx-auto mb-10 w-full max-w-[1400px] px-8">
                            <Heading count={items.length} compact />
                        </div>

                        <Motion.ul
                            ref={trackRef}
                            style={{ x: pinned ? x : 0 }}
                            className="flex w-max gap-10 pl-[max(2rem,calc((100vw-1400px)/2+2rem))] pr-[8vw]"
                        >
                            {items.map((item, i) => (
                                <li key={item.project}>
                                    <WorkCard
                                        item={item}
                                        eager={i < 3}
                                        onFocus={focusCard}
                                        className="w-[min(36vw,calc((100vh-330px)*1.45))]"
                                    />
                                </li>
                            ))}
                        </Motion.ul>

                        {pinned && (
                            <div className="mx-auto mt-10 w-full max-w-[1400px] px-8" aria-hidden="true">
                                <div className="h-px w-full bg-white/10">
                                    <Motion.div style={{ scaleX: bar }} className="h-full origin-left bg-accent" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {closing}
            </section>
        );
    }

    return (
        <section id="work-showcase" className="relative bg-background py-24" aria-labelledby="work-showcase-heading">
            <div className="mx-auto max-w-[1400px] px-4 md:px-8">
                <Heading count={items.length} />
            </div>
            <ul className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] md:scroll-px-8 md:px-8">
                {items.map((item, i) => (
                    <li key={item.project} className="snap-start">
                        <WorkCard item={item} eager={i === 0} className="w-[80vw] sm:w-[58vw] md:w-[44vw]" />
                    </li>
                ))}
            </ul>
            <p className="mx-auto mt-4 max-w-[1400px] px-4 text-sm text-text-muted md:px-8">Swipe to see more.</p>
            {closing}
        </section>
    );
}

import React, { useRef, useState } from 'react';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { showcaseItems } from '../data/showcase';

function hostOf(url) {
    try {
        return new URL(url).host.replace(/^www\./, '');
    } catch {
        return url;
    }
}

function BrowserFrame({ item, className = '', eager = false }) {
    return (
        <div className={`overflow-hidden rounded-md border border-white/15 bg-card shadow-[0_30px_60px_-15px_rgba(0,0,0,0.75)] ${className}`}>
            <div className="flex h-7 items-center gap-3 border-b border-white/10 bg-[#1a1d1b] px-3">
                <span className="flex gap-1" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                </span>
                <span className="truncate text-[0.65rem] text-white/45">{hostOf(item.url)}</span>
            </div>
            <div className="aspect-[16/10] bg-card">
                <img
                    src={item.image}
                    alt={item.alt}
                    width="1200"
                    height="750"
                    loading={eager ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                />
            </div>
        </div>
    );
}

// Fan positions for the opener, desktop only. x/y in %, r in degrees, depth drives parallax.
const fanLayout = [
    { x: 2, y: 18, w: 34, r: -4, depth: 0.6, z: 1 },
    { x: 24, y: 4, w: 36, r: 2, depth: 1, z: 3 },
    { x: 50, y: 14, w: 34, r: -2, depth: 0.75, z: 2 },
    { x: 70, y: 0, w: 32, r: 4, depth: 0.5, z: 1 },
    { x: 38, y: 40, w: 30, r: -1, depth: 1.2, z: 4 },
];

function FanFrame({ item, layout, progress }) {
    const y = useTransform(progress, [0, 1], [80 * layout.depth, -120 * layout.depth]);
    return (
        <Motion.div
            style={{ y, left: `${layout.x}%`, top: `${layout.y}%`, width: `${layout.w}%`, rotate: layout.r, zIndex: layout.z }}
            className="absolute"
        >
            <BrowserFrame item={item} />
        </Motion.div>
    );
}

export function SelectedWork({ limit }) {
    const items = limit ? showcaseItems.slice(0, limit) : showcaseItems;
    const fanItems = items.slice(0, Math.min(5, items.length));
    const [preview, setPreview] = useState(0);
    const openerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: openerRef, offset: ['start end', 'end start'] });

    return (
        <section
            id="work-showcase"
            className="relative overflow-x-clip bg-background py-24 md:py-32"
            aria-labelledby="work-showcase-heading"
        >
            {/* Opener: fanned live sites, headline bottom-left */}
            <div ref={openerRef} className="relative mx-auto max-w-[1400px] px-4 md:px-8">
                <div className="relative hidden h-[620px] lg:block" aria-hidden="true">
                    {fanItems.map((item, i) => (
                        <FanFrame key={item.project} item={item} layout={fanLayout[i]} progress={scrollYProgress} />
                    ))}
                    <div className="absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-background via-background/85 to-transparent" />
                </div>

                <div className="relative z-20 grid gap-8 lg:-mt-48 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <h2
                            id="work-showcase-heading"
                            className="text-balance text-[2.6rem] font-medium leading-[1] tracking-[-0.04em] text-white md:text-7xl"
                        >
                            Websites that work as hard as you do.
                        </h2>
                        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-text-muted">
                            Conversion-focused sites across coaching, travel, education, sport, healthcare, product
                            innovation and estate living. Each one is built to communicate clearly, earn trust, and bring in
                            enquiries.
                        </p>
                    </div>
                    <p className="text-sm text-text-muted lg:col-span-3 lg:col-start-10 lg:self-end lg:text-right">
                        {items.length} live projects below.
                    </p>
                </div>

                {/* Mobile: swipeable frames */}
                <div
                    className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] lg:hidden"
                    aria-hidden="true"
                >
                    {fanItems.map((item, i) => (
                        <BrowserFrame key={item.project} item={item} eager={i === 0} className="w-[82%] shrink-0 snap-start sm:w-[60%]" />
                    ))}
                </div>
            </div>

            {/* Index: archive rows with a sticky preview on desktop */}
            <div id="work-index" className="mx-auto mt-16 max-w-[1400px] px-4 md:mt-24 md:px-8">
                <div className="grid gap-10 lg:grid-cols-12">
                    <ul className="lg:col-span-7">
                        {items.map((item, i) => (
                            <li key={item.project} className="border-t border-white/10 last:border-b">
                                {/* Hosted client microsites carry X-Robots-Tag: noindex, so every
                                    showcase link is nofollow — none should collect crawl equity. */}
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="nofollow noopener noreferrer"
                                    onMouseEnter={() => setPreview(i)}
                                    onFocus={() => setPreview(i)}
                                    className={`group grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 py-5 transition-colors sm:grid-cols-[1fr_auto_auto] sm:gap-8 md:py-6 ${
                                        preview === i ? 'lg:text-white' : 'lg:text-white/60'
                                    }`}
                                    aria-label={`${item.project}, ${item.category}. Opens the live site.`}
                                >
                                    <img
                                        src={item.image}
                                        alt=""
                                        width="144"
                                        height="90"
                                        loading="lazy"
                                        decoding="async"
                                        className="aspect-[16/10] w-full rounded-sm object-cover object-top sm:hidden"
                                    />
                                    <span className="text-xl font-medium tracking-tight text-white transition-colors group-hover:text-accent md:text-3xl">
                                        {item.project}
                                    </span>
                                    <span className="hidden text-sm text-text-muted sm:block">{item.category}</span>
                                    <ArrowUpRight className="h-5 w-5 text-text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="hidden lg:col-span-5 lg:block">
                        <div className="sticky top-28">
                            <BrowserFrame item={items[preview]} />
                            <p className="mt-5 text-sm text-text-muted">{items[preview].category}</p>
                            <p className="mt-2 text-pretty leading-relaxed text-white/85">{items[preview].summary}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 grid gap-8 md:grid-cols-12 md:items-end">
                    <p className="text-balance text-3xl font-medium leading-tight tracking-[-0.03em] text-white md:col-span-8 md:text-4xl">
                        Want your business to feel this clear and modern online?
                    </p>
                    <a
                        href="#contact"
                        onClick={() => {
                            window.sessionStorage.setItem('db23-contact-subject', 'Start a Project');
                            window.dispatchEvent(new CustomEvent('db23-contact-subject', { detail: { subject: 'Start a Project' } }));
                        }}
                        className="group inline-flex h-14 items-center justify-center gap-3 rounded-[3px] bg-accent px-8 text-base font-semibold text-ink transition-colors hover:bg-accent-hover md:col-span-4 md:justify-self-end"
                    >
                        Start a project
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </section>
    );
}

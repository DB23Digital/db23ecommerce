import React, { useRef, useState } from 'react';
import { AnimatePresence, motion as Motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Minus, Plus } from 'lucide-react';
import { Button } from './ui/Button';

// Shared building blocks for inner pages, in the homepage design language:
// ink/paper surfaces, hairline rules instead of cards, one vermilion accent,
// no icon tiles, no pill eyebrows, no numbered labels.

const ease = [0.16, 1, 0.3, 1];

function selectContactSubject(subject) {
    if (!subject) return;
    window.sessionStorage.setItem('db23-contact-subject', subject);
    window.dispatchEvent(new CustomEvent('db23-contact-subject', { detail: { subject } }));
}

const rise = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
});

/** Underlined text link with arrow, the secondary action everywhere. */
export function TextLink({ href, children, onClick, external = false, tone = 'ink', className = '' }) {
    const Icon = external ? ArrowUpRight : ArrowRight;
    const colours = tone === 'paper'
        ? 'text-ink decoration-ink/30 hover:decoration-accent-deep'
        : 'text-white decoration-white/30 hover:decoration-accent';
    return (
        <a
            href={href}
            onClick={onClick}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`group inline-flex items-center gap-2 py-2 text-base font-medium underline underline-offset-[6px] transition-colors ${colours} ${className}`}
        >
            {children}
            <Icon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
    );
}

/**
 * Page opener. `eyebrow` is a plain muted line, not a pill.
 * primary/secondary: { label, href, subject? }. image: { src, alt } (optional, shown full-width below).
 */
export function PageHero({ eyebrow, title, intro, primary, secondary, image, children }) {
    return (
        <section className="relative overflow-hidden bg-background pb-16 pt-32 md:pb-24 md:pt-44" aria-labelledby="page-heading">
            <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
                {eyebrow && (
                    <Motion.p {...rise(0)} className="mb-8 text-sm text-text-muted">
                        {eyebrow}
                    </Motion.p>
                )}
                <Motion.h1
                    {...rise(0.06)}
                    id="page-heading"
                    className="max-w-5xl text-balance text-[2.6rem] font-medium leading-[1] tracking-[-0.045em] text-white sm:text-6xl lg:text-[5.25rem]"
                >
                    {title}
                </Motion.h1>
                <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
                    {intro && (
                        <Motion.div {...rise(0.16)} className="max-w-2xl text-pretty text-lg leading-relaxed text-text-muted md:text-xl lg:col-span-7">
                            {intro}
                        </Motion.div>
                    )}
                    {(primary || secondary) && (
                        <Motion.div
                            {...rise(0.24)}
                            className="flex flex-col gap-4 sm:flex-row sm:items-center lg:col-span-5 lg:justify-end"
                        >
                            {primary && (
                                <Button
                                    href={primary.href}
                                    size="lg"
                                    className="w-full sm:w-auto"
                                    onClick={() => selectContactSubject(primary.subject)}
                                >
                                    {primary.label}
                                </Button>
                            )}
                            {secondary && (
                                <TextLink href={secondary.href} onClick={() => selectContactSubject(secondary.subject)} className="justify-center">
                                    {secondary.label}
                                </TextLink>
                            )}
                        </Motion.div>
                    )}
                </div>
                {children}
            </div>
            {image && (
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease }}
                    className="relative mx-auto mt-16 max-w-[1400px] px-4 md:mt-20 md:px-8"
                >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-white/10 md:aspect-[21/9]">
                        <img
                            src={image.src}
                            alt={image.alt}
                            width="1600"
                            height="686"
                            fetchpriority="high"
                            className="h-full w-full object-cover grayscale-[25%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                    </div>
                </Motion.div>
            )}
        </section>
    );
}

/** Section with the standard 12-column heading: title left, intro right. tone="paper" for the light surface. */
export function Section({ id, title, intro, tone = 'ink', children, className = '', bordered = true }) {
    const paper = tone === 'paper';
    const headingId = id ? `${id}-heading` : undefined;
    return (
        <section
            id={id}
            aria-labelledby={title ? headingId : undefined}
            className={`relative py-24 md:py-32 ${
                paper ? 'bg-paper text-ink' : `bg-background ${bordered ? 'border-t border-white/10' : ''}`
            } ${className}`}
        >
            {paper && <div className="paper-grid pointer-events-none absolute inset-0" aria-hidden="true" />}
            <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
                {(title || intro) && (
                    <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12">
                        {title && (
                            <h2
                                id={headingId}
                                className={`text-balance text-4xl font-medium leading-[1.02] tracking-[-0.04em] md:col-span-7 md:text-6xl ${
                                    paper ? 'text-ink' : 'text-white'
                                }`}
                            >
                                {title}
                            </h2>
                        )}
                        {intro && (
                            <div
                                className={`text-pretty text-lg leading-relaxed md:col-span-4 md:col-start-9 md:self-end ${
                                    paper ? 'text-ink/70' : 'text-text-muted'
                                }`}
                            >
                                {intro}
                            </div>
                        )}
                    </div>
                )}
                {children}
            </div>
        </section>
    );
}

/** Ruled definition list: items [{ title, body, href? }]. Replaces icon-tile card grids. */
export function RuledList({ items, columns = 3, tone = 'ink' }) {
    const paper = tone === 'paper';
    const cols = { 1: '', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns];
    return (
        <dl className={`grid gap-x-10 ${cols}`}>
            {items.map((item, i) => (
                <Motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-8% 0px' }}
                    transition={{ duration: 0.6, delay: (i % columns) * 0.06, ease }}
                    className={`border-t py-7 ${paper ? 'border-ink/15' : 'border-white/10'}`}
                >
                    <dt className={`mb-2 text-lg font-medium tracking-tight ${paper ? 'text-ink' : 'text-white'}`}>
                        {item.href ? (
                            <a href={item.href} className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-accent">
                                {item.title}
                            </a>
                        ) : (
                            item.title
                        )}
                    </dt>
                    <dd className={`text-pretty leading-relaxed ${paper ? 'text-ink/70' : 'text-text-muted'}`}>{item.body}</dd>
                </Motion.div>
            ))}
        </dl>
    );
}

/** Large editorial rows: items [{ title, body, meta?, href? }]. For headline services or offers. */
export function FeatureRows({ items }) {
    return (
        <div>
            {items.map((item, i) => (
                <Motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.7, delay: i * 0.04, ease }}
                    className="group grid gap-6 border-t border-white/10 py-10 md:grid-cols-12 md:gap-8 md:py-12"
                >
                    <h3 className="text-3xl font-medium tracking-[-0.03em] text-white transition-colors group-hover:text-accent md:col-span-5 md:text-4xl">
                        {item.title}
                    </h3>
                    <div className="md:col-span-6 md:col-start-7">
                        <div className="text-pretty text-lg leading-relaxed text-text-muted">{item.body}</div>
                        {item.meta && <p className="mt-5 text-sm leading-relaxed text-white/80">{item.meta}</p>}
                        {item.href && (
                            <TextLink href={item.href} className="mt-5">
                                {item.linkLabel || 'Learn more'}
                            </TextLink>
                        )}
                    </div>
                </Motion.article>
            ))}
        </div>
    );
}

/** Process steps with a rail that fills on scroll. steps [{ title, body }]. */
export function Steps({ steps }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
    // Literal class names so Tailwind generates them
    const cols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3' }[steps.length] || 'md:grid-cols-4';
    return (
        <div ref={ref} className="relative">
            <div className="absolute left-0 top-0 hidden h-px w-full bg-white/10 md:block" aria-hidden="true">
                <Motion.div style={{ scaleX: progress }} className="h-full origin-left bg-accent" />
            </div>
            <div className="absolute left-0 top-0 h-full w-px bg-white/10 md:hidden" aria-hidden="true">
                <Motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-accent" />
            </div>
            <ol className={`grid gap-12 pl-8 md:gap-8 md:pl-0 md:pt-12 ${cols}`}>
                {steps.map((step) => (
                    <li key={step.title}>
                        <h3 className="mb-3 text-2xl font-medium tracking-tight text-white">{step.title}</h3>
                        <p className="max-w-xs leading-relaxed text-text-muted">{step.body}</p>
                    </li>
                ))}
            </ol>
        </div>
    );
}

/**
 * Ruled price table. plans [{ name, price, period?, features[], cta, href, subject?, featured?, label? }].
 * `note` renders under the table (e.g. VAT).
 */
export function PriceTable({ plans, note }) {
    return (
        <div>
            <div className={`grid border-t border-white/10 ${plans.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
                {plans.map((plan, i) => (
                    <article
                        key={plan.name}
                        className={`relative flex flex-col border-b border-white/10 py-10 lg:border-b-0 lg:px-8 lg:py-12 ${
                            i > 0 ? 'lg:border-l' : 'lg:pl-0'
                        } ${plan.featured ? 'lg:bg-white/[0.02]' : ''}`}
                    >
                        {plan.featured && <span className="absolute inset-x-0 top-0 h-[3px] bg-accent lg:-top-px" aria-hidden="true" />}
                        <p className="mb-4 h-5 text-sm text-accent">{plan.label || ''}</p>
                        <h3 className="mb-3 max-w-[18rem] text-2xl font-medium tracking-tight text-white">{plan.name}</h3>
                        <p className="mb-8 text-4xl font-medium tracking-[-0.03em] text-white">
                            {plan.price}
                            {plan.period && <span className="text-base text-text-muted"> {plan.period}</span>}
                        </p>
                        <ul className="mb-10 flex-1 space-y-2.5">
                            {plan.features.map((f) => (
                                <li key={f} className="flex gap-3 text-sm text-text-muted">
                                    <span className="mt-2 h-px w-3 shrink-0 bg-white/40" aria-hidden="true" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        {plan.cta && (
                            <Button
                                href={plan.href}
                                variant={plan.featured ? 'primary' : 'outline'}
                                className="w-full sm:w-auto lg:w-full"
                                onClick={() => selectContactSubject(plan.subject)}
                            >
                                {plan.cta}
                            </Button>
                        )}
                    </article>
                ))}
            </div>
            {note && <p className="mt-8 text-sm text-text-muted">{note}</p>}
        </div>
    );
}

/** FAQ accordion with a sticky heading column. faqs [{ q, a }]. Keep the page's FAQPage schema fed from the same array. */
export function PageFAQ({ faqs, title = 'Questions, answered.', intro }) {
    const [open, setOpen] = useState(0);
    return (
        <section className="border-t border-white/10 bg-background py-24 md:py-32" aria-labelledby="faq-heading">
            <div className="mx-auto grid max-w-[1400px] gap-12 px-4 md:px-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-28">
                        <h2 id="faq-heading" className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-white md:text-5xl">
                            {title}
                        </h2>
                        {intro && <p className="mt-6 text-text-muted">{intro}</p>}
                    </div>
                </div>
                <div className="border-b border-white/10 lg:col-span-7 lg:col-start-6">
                    {faqs.map((faq, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={faq.q} className="border-t border-white/10">
                                <h3>
                                    <button
                                        id={`pfaq-q-${i}`}
                                        className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                                        onClick={() => setOpen(isOpen ? null : i)}
                                        aria-expanded={isOpen}
                                        aria-controls={`pfaq-a-${i}`}
                                    >
                                        <span className={`text-lg font-medium leading-snug tracking-tight md:text-xl ${isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                                            {faq.q}
                                        </span>
                                        <span className={`mt-1 shrink-0 ${isOpen ? 'text-accent' : 'text-text-muted group-hover:text-white'}`}>
                                            {isOpen ? <Minus className="h-5 w-5" aria-hidden="true" /> : <Plus className="h-5 w-5" aria-hidden="true" />}
                                        </span>
                                    </button>
                                </h3>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <Motion.div
                                            id={`pfaq-a-${i}`}
                                            role="region"
                                            aria-labelledby={`pfaq-q-${i}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease }}
                                            className="overflow-hidden"
                                        >
                                            <p className="max-w-2xl pb-8 leading-relaxed text-text-muted">{faq.a}</p>
                                        </Motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/** Closing call to action. primary/secondary: { label, href, subject? } */
export function CTABand({ title, body, primary, secondary }) {
    return (
        <section className="relative overflow-hidden border-t border-white/10 bg-background py-28 md:py-40" aria-labelledby="cta-heading">
            <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative mx-auto max-w-[1400px] px-4 text-center md:px-8">
                <h2 id="cta-heading" className="mx-auto max-w-4xl text-balance text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-white md:text-7xl">
                    {title}
                </h2>
                {body && <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-text-muted">{body}</p>}
                <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
                    {primary && (
                        <Button href={primary.href} size="lg" className="w-full sm:w-auto" onClick={() => selectContactSubject(primary.subject)}>
                            {primary.label}
                        </Button>
                    )}
                    {secondary && (
                        <TextLink href={secondary.href} onClick={() => selectContactSubject(secondary.subject)}>
                            {secondary.label}
                        </TextLink>
                    )}
                </div>
            </div>
        </section>
    );
}

/** Large statement quote or callout on paper, the page's one light moment if it needs one. */
export function Statement({ children, cite }) {
    return (
        <section className="relative bg-paper py-24 text-ink md:py-32">
            <div className="paper-grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <figure className="relative mx-auto max-w-[1400px] px-4 md:px-8">
                <blockquote className="max-w-5xl text-balance text-3xl font-medium leading-[1.1] tracking-[-0.035em] md:text-5xl">
                    {children}
                </blockquote>
                {cite && <figcaption className="mt-8 text-sm text-ink/60">{cite}</figcaption>}
            </figure>
        </section>
    );
}

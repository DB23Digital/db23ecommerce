import React from 'react';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from './ui/Button';

function selectContactSubject(subject) {
    window.sessionStorage.setItem('db23-contact-subject', subject);
    window.dispatchEvent(new CustomEvent('db23-contact-subject', { detail: { subject } }));
}

const workshopTopics = [
    { title: 'AI Fundamentals', description: 'Understanding AI in practical business environments.' },
    { title: 'AI Tools for Teams', description: 'Learning modern AI tools productively.' },
    { title: 'Workflow Automation', description: 'Identifying repetitive tasks that can be automated.' },
    { title: 'Marketing & Content AI', description: 'Using AI to improve communication and marketing efficiency.' },
    { title: 'AI for Customers', description: 'Where chat, voice and lead handling can help, with real examples.' },
    { title: 'AI Strategy', description: 'Choosing the few AI moves that are worth it for your business.' },
];

const workshopPackages = [
    {
        name: 'Introductory Business AI Workshop',
        price: 'From R4,500',
        subject: 'Introductory Business AI Workshop',
        cta: 'Enquire now',
        features: ['90 mins to 2 hours', 'Introductory practical AI session', 'Ideal for SMEs', 'Online or in-person'],
    },
    {
        name: 'Practical AI for Teams',
        price: 'From R12,500',
        subject: 'Practical AI for Teams',
        cta: 'Book team workshop',
        featured: true,
        features: ['Half-day workshop', 'Team enablement', 'Workflow analysis', 'Productivity-focused'],
    },
    {
        name: 'AI Business Modernisation Session',
        price: 'Custom pricing',
        subject: 'AI Business Modernization Session',
        cta: 'Schedule strategy session',
        features: ['Full-day strategic session', 'Leadership-focused', 'AI opportunity mapping', 'Automation recommendations'],
    },
];

export function AITraining() {
    const photoRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: photoRef, offset: ['start end', 'end start'] });
    const drift = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

    return (
        <section className="relative bg-background" id="ai-workshops" aria-labelledby="ai-workshops-heading">
            {/* Full-bleed photo opener */}
            <div ref={photoRef} className="relative h-[78vh] min-h-[520px] overflow-hidden md:h-[88vh]">
                <Motion.img
                    style={{ y: drift }}
                    src="/assets/showcase/boardroom-workshop.webp"
                    alt="Deon Botha leading an AI business modernisation workshop in a boardroom"
                    loading="lazy"
                    decoding="async"
                    width="1600"
                    height="900"
                    className="absolute inset-x-0 top-[-8%] h-[116%] w-full object-cover grayscale-[35%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
                <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-4 pb-14 md:px-8 md:pb-20">
                    <p className="mb-6 text-sm text-white/70">AI workshops &amp; strategy · Run in person by Deon Botha</p>
                    <h2
                        id="ai-workshops-heading"
                        className="max-w-4xl text-balance text-[2.6rem] font-medium leading-[1] tracking-[-0.04em] text-white md:text-7xl"
                    >
                        Practical AI workshops and strategy for small businesses.
                    </h2>
                    <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-white/75">
                        Hands-on workshops get your team using AI tools properly. Strategy sessions help owners and
                        leadership decide where AI fits, what to try first, and what to leave alone.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
                {/* Topics */}
                <div className="mb-24 grid gap-10 md:grid-cols-12">
                    <h3 className="text-2xl font-medium tracking-tight text-white md:col-span-3">What teams cover</h3>
                    <dl className="grid gap-x-10 sm:grid-cols-2 md:col-span-9 lg:grid-cols-3">
                        {workshopTopics.map((topic) => (
                            <div key={topic.title} className="border-t border-white/10 py-6">
                                <dt className="mb-2 font-medium text-white">{topic.title}</dt>
                                <dd className="text-sm leading-relaxed text-text-muted">{topic.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Packages as a ruled table, not cards */}
                <div className="grid border-t border-white/10 lg:grid-cols-3">
                    {workshopPackages.map((pkg, i) => (
                        <article
                            key={pkg.name}
                            className={`relative flex flex-col border-b border-white/10 py-10 lg:border-b-0 lg:px-8 lg:py-12 ${
                                i > 0 ? 'lg:border-l' : 'lg:pl-0'
                            } ${pkg.featured ? 'lg:bg-white/[0.02]' : ''}`}
                        >
                            {pkg.featured && (
                                <span className="absolute inset-x-0 top-0 h-[3px] bg-accent lg:-top-px" aria-hidden="true" />
                            )}
                            <p className="mb-4 h-5 text-sm text-accent">{pkg.featured ? 'Popular' : ''}</p>
                            <h3 className="mb-3 max-w-[18rem] text-2xl font-medium tracking-tight text-white">{pkg.name}</h3>
                            <p className="mb-8 text-4xl font-medium tracking-[-0.03em] text-white">{pkg.price}</p>
                            <ul className="mb-10 flex-1 space-y-2.5">
                                {pkg.features.map((item) => (
                                    <li key={item} className="flex gap-3 text-sm text-text-muted">
                                        <span className="mt-2 h-px w-3 shrink-0 bg-white/40" aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                href="#contact"
                                variant={pkg.featured ? 'primary' : 'outline'}
                                className="w-full sm:w-auto lg:w-full"
                                onClick={() => selectContactSubject(pkg.subject)}
                            >
                                {pkg.cta}
                            </Button>
                        </article>
                    ))}
                </div>
                <p className="mt-8 text-sm text-text-muted">
                    Prices in ZAR.{' '}
                    <a href="/ai-workshops/" className="text-white underline decoration-white/25 underline-offset-4 hover:decoration-accent">
                        Full workshop details
                    </a>
                </p>
            </div>
        </section>
    );
}

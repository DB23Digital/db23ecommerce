import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Button } from './ui/Button';
import { TextLink } from './PageBlocks';
import { aiResources } from '../data/aiResources';

function selectContactSubject(subject) {
    window.sessionStorage.setItem('db23-contact-subject', subject);
    window.dispatchEvent(new CustomEvent('db23-contact-subject', { detail: { subject } }));
}

const reveal = (i = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10% 0px' },
    transition: { duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
});

// Learn it (Academy) / Apply it (Prompt Library) / Implement it (DB23).
// Education first; the consulting line sits last and stays quieter than the two resources.
export function FreeAIResources() {
    return (
        <section
            id="free-ai-resources"
            aria-labelledby="free-ai-resources-heading"
            className="relative border-t border-white/10 bg-background py-24 md:py-32"
        >
            <div className="mx-auto max-w-[1400px] px-4 md:px-8">
                <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12">
                    <h2
                        id="free-ai-resources-heading"
                        className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-white md:col-span-7 md:text-6xl"
                    >
                        Learn AI. Understand it. Put it to work.
                    </h2>
                    <div className="space-y-4 text-pretty text-lg leading-relaxed text-text-muted md:col-span-4 md:col-start-9 md:self-end">
                        <p>
                            You don&rsquo;t need a technical background to start using AI. Explore our free AI Academy to
                            understand the concepts, then visit our Prompt Library for practical templates and workflows
                            you can use in your business.
                        </p>
                        <p className="text-base text-white/80">Both are free to use, with no sign-up.</p>
                    </div>
                </div>

                <div className="grid border-t border-white/10 lg:grid-cols-2">
                    {aiResources.map((r, i) => (
                        <Motion.article
                            key={r.href}
                            {...reveal(i)}
                            aria-labelledby={`resource-${i}-heading`}
                            className={`flex flex-col border-b border-white/10 py-10 lg:py-14 ${
                                i > 0 ? 'lg:border-l lg:pl-12' : 'lg:pr-12'
                            }`}
                        >
                            <p className="mb-5 text-sm text-accent">{r.step}</p>
                            <h3
                                id={`resource-${i}-heading`}
                                className="text-3xl font-medium tracking-[-0.03em] text-white md:text-4xl"
                            >
                                {r.fullName}
                            </h3>
                            <p className="mt-3 text-pretty text-xl tracking-tight text-white/90">{r.headline}</p>
                            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-text-muted">{r.body}</p>
                            <ul className="mb-10 mt-8 flex-1 space-y-2.5">
                                {r.includes.map((item) => (
                                    <li key={item} className="flex gap-3 text-sm text-text-muted">
                                        <span className="mt-2 h-px w-3 shrink-0 bg-white/40" aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button href={r.href} variant={i === 0 ? 'primary' : 'outline'} className="w-full sm:w-auto sm:self-start">
                                {r.cta}
                            </Button>
                        </Motion.article>
                    ))}
                </div>

                <Motion.div {...reveal()} className="grid gap-8 pt-10 md:grid-cols-12 md:items-end lg:pt-14">
                    <div className="md:col-span-7">
                        <p className="mb-5 text-sm text-accent">Implement it</p>
                        <h3 className="text-balance text-2xl font-medium tracking-[-0.03em] text-white md:text-3xl">
                            Ready to apply AI in your business?
                        </h3>
                        <p className="mt-4 max-w-xl text-pretty leading-relaxed text-text-muted">
                            DB23 helps businesses identify worthwhile AI opportunities, train their teams and implement
                            practical solutions.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center md:col-span-5 md:justify-end">
                        <Button
                            href="/contact/"
                            variant="outline"
                            className="w-full sm:w-auto"
                            onClick={() => selectContactSubject('AI Project Enquiry')}
                        >
                            Discuss your AI project
                        </Button>
                        <TextLink href="/ai-workshops/" className="justify-center">
                            See AI workshops
                        </TextLink>
                    </div>
                </Motion.div>
            </div>
        </section>
    );
}

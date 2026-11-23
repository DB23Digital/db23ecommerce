import React, { useRef } from 'react';
import { motion as Motion, useScroll, useSpring } from 'framer-motion';

const processSteps = [
    { title: 'Discover', body: 'Understanding your business and identifying opportunities.' },
    { title: 'Strategise', body: 'Planning practical AI and digital systems.' },
    { title: 'Build & implement', body: 'Designing, automating, and deploying solutions.' },
    { title: 'Support & scale', body: 'Continuous optimisation and improvement.' },
];

export function Features() {
    const trackRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 85%', 'end 55%'] });
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

    return (
        <section className="relative bg-background py-24 md:py-36" id="process" aria-labelledby="process-heading">
            <div className="mx-auto max-w-[1400px] px-4 md:px-8">
                <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12">
                    <h2
                        id="process-heading"
                        className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-white md:col-span-7 md:text-6xl"
                    >
                        From workshop insight to working systems.
                    </h2>
                    <p className="text-pretty text-lg leading-relaxed text-text-muted md:col-span-4 md:col-start-9 md:self-end">
                        We keep the process clear, collaborative, and commercially focused, so AI becomes useful in your
                        business instead of another abstract technology conversation.
                    </p>
                </div>

                <div ref={trackRef} className="relative">
                    {/* Rail fills as you scroll: horizontal on desktop, vertical on mobile */}
                    <div className="absolute left-0 top-0 hidden h-px w-full bg-white/10 md:block" aria-hidden="true">
                        <Motion.div style={{ scaleX: progress }} className="h-full origin-left bg-accent" />
                    </div>
                    <div className="absolute left-0 top-0 h-full w-px bg-white/10 md:hidden" aria-hidden="true">
                        <Motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-accent" />
                    </div>

                    <ol className="grid gap-12 pl-8 md:grid-cols-4 md:gap-8 md:pl-0 md:pt-12">
                        {processSteps.map((step, i) => (
                            <Motion.li
                                key={step.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <h3 className="mb-3 text-2xl font-medium tracking-tight text-white md:text-3xl">{step.title}</h3>
                                <p className="max-w-xs leading-relaxed text-text-muted">{step.body}</p>
                            </Motion.li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}

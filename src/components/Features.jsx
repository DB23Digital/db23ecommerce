import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Compass, Rocket, Search, Settings2 } from 'lucide-react';

const processSteps = [
    {
        number: '01',
        icon: <Search className="h-6 w-6" />,
        title: 'Discover',
        body: 'Understanding your business and identifying opportunities.',
    },
    {
        number: '02',
        icon: <Compass className="h-6 w-6" />,
        title: 'Strategize',
        body: 'Planning practical AI and digital systems.',
    },
    {
        number: '03',
        icon: <Settings2 className="h-6 w-6" />,
        title: 'Build & Implement',
        body: 'Designing, automating, and deploying solutions.',
    },
    {
        number: '04',
        icon: <Rocket className="h-6 w-6" />,
        title: 'Support & Scale',
        body: 'Continuous optimization and improvement.',
    },
];

export function Features() {
    return (
        <section className="relative overflow-hidden bg-card/35 py-24 md:py-32" id="process" aria-labelledby="process-heading">
            <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="container relative z-10 mx-auto px-4 md:px-8">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">How We Work</p>
                    <h2 id="process-heading" className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">
                        From workshop insight to practical implementation
                    </h2>
                    <p className="text-lg leading-relaxed text-text-muted">
                        We keep the process clear, collaborative, and commercially focused so AI becomes useful in your
                        business instead of another abstract technology conversation.
                    </p>
                </div>

                <Motion.div
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
                >
                    {processSteps.map((step) => (
                        <Motion.article
                            key={step.number}
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                            className="rounded-3xl border border-white/10 bg-background/80 p-7 transition hover:-translate-y-1 hover:border-accent/45"
                        >
                            <div className="mb-8 flex items-center justify-between">
                                <span className="text-4xl font-black text-white/10">{step.number}</span>
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                    {step.icon}
                                </span>
                            </div>
                            <h3 className="mb-3 text-2xl font-bold text-white">{step.title}</h3>
                            <p className="leading-relaxed text-text-muted">{step.body}</p>
                        </Motion.article>
                    ))}
                </Motion.div>
            </div>
        </section>
    );
}

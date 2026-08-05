import React from 'react';
import { motion as Motion } from 'framer-motion';
import { BadgeCheck, Handshake, MapPinned, MonitorCog, Target, Workflow } from 'lucide-react';

const reasons = [
    {
        icon: <BadgeCheck className="h-6 w-6" />,
        title: 'Practical AI Approach',
        body: 'No hype. Real implementation.',
    },
    {
        icon: <Target className="h-6 w-6" />,
        title: 'Business-Focused Thinking',
        body: 'Solutions aligned to outcomes.',
    },
    {
        icon: <MonitorCog className="h-6 w-6" />,
        title: 'Modern Design Standards',
        body: 'Premium digital experiences.',
    },
    {
        icon: <Handshake className="h-6 w-6" />,
        title: 'Hands-On Support',
        body: 'Collaborative implementation.',
    },
    {
        icon: <Workflow className="h-6 w-6" />,
        title: 'Automation Expertise',
        body: 'Reducing repetitive admin work.',
    },
    {
        icon: <MapPinned className="h-6 w-6" />,
        title: 'South African Business Understanding',
        body: 'Solutions designed for local realities.',
    },
];

const metrics = [
    ['Multiple', 'Industries Served'],
    ['AI-Focused', 'Solutions'],
    ['Modern', 'Digital Systems'],
    ['South African', 'Business Focus'],
];

export function WhyChooseUs() {
    return (
        <section className="relative bg-background py-24 md:py-32" id="about" aria-labelledby="why-heading">
            <div className="container mx-auto px-4 md:px-8">
                <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(320px,0.6fr)] lg:items-end">
                    <div className="max-w-4xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Why DB23</p>
                        <h2 id="why-heading" className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">
                            Why Businesses Choose DB23
                        </h2>
                        <p className="text-lg leading-relaxed text-text-muted">
                            We help leadership teams and business owners turn AI interest into practical decisions,
                            clear systems, and measurable improvements in how work gets done.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 rounded-3xl border border-white/10 bg-card/70 p-4">
                        {metrics.map(([value, label]) => (
                            <div key={label} className="rounded-2xl bg-background/75 p-4 text-center">
                                <p className="text-xl font-black text-white">{value}</p>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-text-muted">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <Motion.div
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {reasons.map((reason) => (
                        <Motion.article
                            key={reason.title}
                            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
                            className="rounded-2xl border border-white/10 bg-card/65 p-6 transition hover:-translate-y-1 hover:border-accent/45"
                        >
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                {reason.icon}
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-white">{reason.title}</h3>
                            <p className="text-text-muted">{reason.body}</p>
                        </Motion.article>
                    ))}
                </Motion.div>
            </div>
        </section>
    );
}

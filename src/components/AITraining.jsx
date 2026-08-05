import React from 'react';
import { motion as Motion } from 'framer-motion';
import {
    Bot,
    BrainCircuit,
    BriefcaseBusiness,
    CheckCircle,
    Megaphone,
    Sparkles,
    Users,
    Workflow,
} from 'lucide-react';
import { Button } from './ui/Button';

function selectContactSubject(subject) {
    window.sessionStorage.setItem('db23-contact-subject', subject);
    window.dispatchEvent(new CustomEvent('db23-contact-subject', { detail: { subject } }));
}

const workshopFeatures = [
    {
        icon: <BrainCircuit className="h-6 w-6" />,
        title: 'AI Fundamentals',
        description: 'Understanding AI in practical business environments.',
    },
    {
        icon: <Users className="h-6 w-6" />,
        title: 'AI Tools for Teams',
        description: 'Learning modern AI tools productively.',
    },
    {
        icon: <Workflow className="h-6 w-6" />,
        title: 'Workflow Automation',
        description: 'Identifying repetitive tasks that can be automated.',
    },
    {
        icon: <Megaphone className="h-6 w-6" />,
        title: 'Marketing & Content AI',
        description: 'Using AI to improve communication and marketing efficiency.',
    },
    {
        icon: <Bot className="h-6 w-6" />,
        title: 'AI Customer Engagement',
        description: 'Voice AI, chat systems, and automated lead handling.',
    },
    {
        icon: <BriefcaseBusiness className="h-6 w-6" />,
        title: 'Business Modernization',
        description: 'How AI integrates into modern operational systems.',
    },
];

const workshopPackages = [
    {
        name: 'Introductory Business AI Workshop',
        price: 'Starting from R4,500',
        subject: 'Introductory Business AI Workshop',
        cta: 'Enquire Now',
        features: ['90 mins to 2 hours', 'Introductory practical AI session', 'Ideal for SMEs', 'Online or in-person'],
    },
    {
        name: 'Practical AI for Teams',
        price: 'Starting from R12,500',
        subject: 'Practical AI for Teams',
        cta: 'Book Team Workshop',
        featured: true,
        features: ['Half-day workshop', 'Team enablement', 'Workflow analysis', 'Productivity-focused'],
    },
    {
        name: 'AI Business Modernization Session',
        price: 'Custom Pricing',
        subject: 'AI Business Modernization Session',
        cta: 'Schedule Strategy Session',
        features: ['Full-day strategic session', 'Leadership-focused', 'AI opportunity mapping', 'Automation recommendations'],
    },
];

export function AITraining() {
    return (
        <section
            className="relative overflow-hidden bg-card/35 py-24 md:py-32"
            id="ai-workshops"
            aria-labelledby="ai-workshops-heading"
        >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_86%_12%,rgba(20,184,166,0.14),transparent_32%)]" />

            <div className="container relative z-10 mx-auto px-4 md:px-8">
                <div className="mx-auto mb-14 max-w-4xl text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                        Flagship offer
                    </div>
                    <h2 id="ai-workshops-heading" className="mb-6 text-3xl font-black leading-tight text-white md:text-5xl">
                        Practical AI Workshops for Modern Businesses
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-text-muted">
                        AI is changing how businesses operate, market, communicate, and grow. DB23 delivers practical
                        workshops designed to help teams understand AI tools, improve workflows, reduce repetitive tasks,
                        and identify real-world opportunities for automation and growth.
                    </p>
                </div>

                <Motion.div
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {workshopFeatures.map((feature) => (
                        <Motion.article
                            key={feature.title}
                            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
                            className="rounded-2xl border border-white/10 bg-background/70 p-6 transition hover:-translate-y-1 hover:border-accent/45 hover:bg-background"
                        >
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                {feature.icon}
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
                            <p className="text-sm leading-relaxed text-text-muted">{feature.description}</p>
                        </Motion.article>
                    ))}
                </Motion.div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {workshopPackages.map((pkg) => (
                        <article
                            key={pkg.name}
                            className={`relative flex flex-col rounded-3xl border p-7 ${
                                pkg.featured
                                    ? 'border-accent bg-accent/10 shadow-2xl shadow-accent/10'
                                    : 'border-white/10 bg-background/75'
                            }`}
                        >
                            {pkg.featured && (
                                <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                                    Popular
                                </span>
                            )}
                            <h3 className="mb-4 max-w-[16rem] text-2xl font-bold text-white">{pkg.name}</h3>
                            <p className="mb-7 text-2xl font-black text-accent">{pkg.price}</p>
                            <ul className="mb-8 flex-1 space-y-3">
                                {pkg.features.map((item) => (
                                    <li key={item} className="flex gap-3 text-sm text-white/80">
                                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                href="#contact"
                                variant={pkg.featured ? 'primary' : 'outline'}
                                className="w-full"
                                onClick={() => selectContactSubject(pkg.subject)}
                            >
                                {pkg.cta}
                            </Button>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

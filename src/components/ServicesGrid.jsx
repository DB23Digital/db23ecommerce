import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, Bot, Gauge, Headphones, MonitorSmartphone, PhoneCall, Workflow } from 'lucide-react';

const solutions = [
    {
        id: 'ai-automation',
        icon: <Bot className="h-7 w-7" />,
        eyebrow: 'Solution Group 1',
        title: 'AI & Automation',
        description:
            'Practical AI systems that reduce manual work, improve customer response, and connect the tools your business already uses.',
        items: ['AI voice receptionists', 'AI customer engagement', 'Workflow automation', 'AI integrations', 'Lead qualification systems'],
        accent: 'text-cyan-300',
        iconBg: 'bg-cyan-400/10',
        border: 'hover:border-cyan-300/45',
    },
    {
        id: 'digital-growth',
        icon: <MonitorSmartphone className="h-7 w-7" />,
        eyebrow: 'Solution Group 2',
        title: 'Digital Growth Systems',
        description:
            'Modern digital experiences designed to make your business clearer, more credible, and easier for customers to engage with.',
        items: ['Websites', 'Landing pages', 'UX optimization', 'Conversion systems', 'Modern digital experiences'],
        accent: 'text-accent',
        iconBg: 'bg-accent/10',
        border: 'hover:border-accent/45',
    },
    {
        id: 'outsourced-support',
        icon: <Headphones className="h-7 w-7" />,
        eyebrow: 'Solution Group 3',
        title: 'Outsourced Digital Support',
        description:
            'Ongoing digital capability for businesses that need consistent support without building a full internal digital team.',
        items: ['Outsourced marketing', 'AI-assisted support', 'Content systems', 'Digital operations', 'Ongoing optimization'],
        accent: 'text-emerald-300',
        iconBg: 'bg-emerald-400/10',
        border: 'hover:border-emerald-300/45',
    },
];

const capabilities = [
    { label: 'Voice AI', icon: <PhoneCall className="h-4 w-4" /> },
    { label: 'Automation', icon: <Workflow className="h-4 w-4" /> },
    { label: 'Digital Systems', icon: <Gauge className="h-4 w-4" /> },
];

export function ServicesGrid() {
    return (
        <section className="relative bg-background py-24 md:py-32" id="solutions" aria-labelledby="solutions-heading">
            <div className="container mx-auto px-4 md:px-8">
                <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.55fr)] lg:items-end">
                    <div className="max-w-4xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Solutions</p>
                        <h2 id="solutions-heading" className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">
                            Business Modernization Solutions
                        </h2>
                        <p className="text-lg leading-relaxed text-text-muted">
                            DB23 helps businesses move from disconnected tools and manual processes into clear, modern
                            digital systems that support growth, customer service, marketing, and operations.
                        </p>
                    </div>

                    <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        {capabilities.map((item) => (
                            <div key={item.label} className="flex items-center gap-3 rounded-xl bg-background/70 px-4 py-3">
                                <span className="text-accent">{item.icon}</span>
                                <span className="text-sm font-semibold text-white">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <Motion.div
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid gap-6 lg:grid-cols-3"
                >
                    {solutions.map((solution) => (
                        <Motion.article
                            key={solution.id}
                            id={solution.id}
                            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
                            className={`flex h-full flex-col rounded-3xl border border-white/10 bg-card/70 p-8 transition duration-300 hover:-translate-y-1 ${solution.border}`}
                        >
                            <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${solution.iconBg} ${solution.accent}`}>
                                {solution.icon}
                            </div>
                            <p className={`mb-3 text-xs font-bold uppercase tracking-widest ${solution.accent}`}>{solution.eyebrow}</p>
                            <h3 className="mb-4 text-2xl font-bold text-white">{solution.title}</h3>
                            <p className="mb-7 flex-1 leading-relaxed text-text-muted">{solution.description}</p>
                            <ul className="space-y-3">
                                {solution.items.map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-white/78">
                                        <ArrowRight className={`h-4 w-4 shrink-0 ${solution.accent}`} aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Motion.article>
                    ))}
                </Motion.div>
            </div>
        </section>
    );
}

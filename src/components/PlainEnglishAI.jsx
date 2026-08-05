import React from 'react';
import { Bot, MessageSquareText, TimerReset } from 'lucide-react';
import { Button } from './ui/Button';

function selectContactSubject(subject) {
    window.sessionStorage.setItem('db23-contact-subject', subject);
    window.dispatchEvent(new CustomEvent('db23-contact-subject', { detail: { subject } }));
}

const examples = [
    {
        icon: <TimerReset className="h-5 w-5" />,
        title: 'Save Time',
        body: 'Automate repetitive admin and reduce manual follow-up.',
    },
    {
        icon: <MessageSquareText className="h-5 w-5" />,
        title: 'Improve Communication',
        body: 'Use AI to support marketing, content, and customer responses.',
    },
    {
        icon: <Bot className="h-5 w-5" />,
        title: 'Modernize Operations',
        body: 'Connect practical tools into workflows your team can actually use.',
    },
];

export function PlainEnglishAI() {
    return (
        <section className="relative overflow-hidden bg-card/35 py-24 md:py-32" id="plain-english-ai">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.16),transparent_30%)]" />
            <div className="container relative z-10 mx-auto px-4 md:px-8">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(340px,0.65fr)] lg:items-center">
                    <div className="max-w-3xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">AI in Plain English</p>
                        <h2 className="mb-6 text-3xl font-black leading-tight text-white md:text-5xl">
                            AI Doesn&apos;t Need to Be Complicated
                        </h2>
                        <p className="mb-8 text-lg leading-relaxed text-text-muted">
                            DB23 focuses on practical AI implementation for real businesses. From automating repetitive
                            admin to improving customer engagement and marketing workflows, the goal is simple: save time,
                            improve efficiency, and modernize operations.
                        </p>
                        <Button
                            href="#contact"
                            size="lg"
                            onClick={() => selectContactSubject('AI Workshop')}
                        >
                            Book an AI Workshop
                        </Button>
                    </div>

                    <div className="grid gap-4">
                        {examples.map((example) => (
                            <article key={example.title} className="rounded-2xl border border-white/10 bg-background/75 p-5">
                                <div className="mb-3 flex items-center gap-3 text-accent">
                                    {example.icon}
                                    <h3 className="text-lg font-bold text-white">{example.title}</h3>
                                </div>
                                <p className="text-sm leading-relaxed text-text-muted">{example.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

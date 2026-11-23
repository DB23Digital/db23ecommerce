import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const reasons = [
    { title: 'Practical AI approach', body: 'No hype. Real implementation.' },
    { title: 'Business-focused thinking', body: 'Solutions aligned to outcomes.' },
    { title: 'Modern design standards', body: 'Premium digital experiences.' },
    { title: 'Hands-on support', body: 'Collaborative implementation.' },
    { title: 'Search know-how', body: 'Built to be found on Google and in AI answers.' },
    { title: 'South African business understanding', body: 'Solutions designed for local realities.' },
];

export function WhyChooseUs() {
    return (
        <section className="relative border-t border-white/10 bg-background py-24 md:py-36" id="about" aria-labelledby="why-heading">
            <div className="mx-auto grid max-w-[1400px] gap-16 px-4 md:px-8 lg:grid-cols-12">
                <div className="lg:col-span-6">
                    <h2 id="why-heading" className="mb-6 text-sm text-text-muted">
                        Why businesses choose DB23
                    </h2>
                    <p className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-white md:text-6xl">
                        No hype. <span className="text-text-muted">Real implementation, built around how your business works.</span>
                    </p>
                    <p className="mt-10 max-w-lg text-pretty leading-relaxed text-text-muted">
                        Deon Botha founded DB23 to help South African businesses adopt AI without the enterprise price tag or
                        the jargon. He designs and runs every workshop personally, and focuses on tools your team can use the
                        next working day.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                        <a
                            href="/about/"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-white underline decoration-white/25 underline-offset-[6px] hover:decoration-accent"
                        >
                            About DB23
                        </a>
                        <a
                            href="https://www.linkedin.com/in/deon-botha-skillspassport/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 text-sm font-medium text-white underline decoration-white/25 underline-offset-[6px] hover:decoration-accent"
                        >
                            Deon on LinkedIn
                            <ArrowUpRight className="h-4 w-4 text-accent" aria-hidden="true" />
                        </a>
                    </div>
                </div>

                <dl className="grid gap-x-10 self-end sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
                    {reasons.map((reason) => (
                        <div key={reason.title} className="border-t border-white/10 py-6">
                            <dt className="mb-1.5 font-medium text-white">{reason.title}</dt>
                            <dd className="text-sm text-text-muted">{reason.body}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}

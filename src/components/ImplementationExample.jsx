import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ReceptionistDemo } from './ReceptionistDemo';

// Voice AI is not a core service; it is shown as one example of what a
// workshop or strategy session can lead to.
export function ImplementationExample() {
    return (
        <section
            className="relative overflow-hidden border-t border-white/10 bg-background py-24 md:py-36"
            id="ai-example"
            aria-labelledby="ai-example-heading"
        >
            <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative mx-auto grid max-w-[1400px] gap-14 px-4 md:px-8 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-center">
                    <p className="mb-6 text-sm text-text-muted">After the workshop: one example</p>
                    <h2
                        id="ai-example-heading"
                        className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-white md:text-6xl"
                    >
                        Strategy is the start. Here is what it can lead to.
                    </h2>
                    <p className="mt-8 max-w-lg text-pretty text-lg leading-relaxed text-text-muted">
                        When a workshop or strategy session turns up a clear win, we can help you implement it. An AI
                        receptionist that answers enquiries, books appointments and hands over to your team is a good
                        example.
                    </p>
                    <p className="mt-6 max-w-lg text-pretty text-text-muted">
                        Try it: pick a business and watch a typical enquiry play out.
                    </p>
                    <a
                        href="/voice-ai/"
                        className="group mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-white underline decoration-white/25 underline-offset-[6px] hover:decoration-accent"
                    >
                        More on Voice AI
                        <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                </div>

                <div className="lg:col-span-6 lg:row-start-1">
                    <ReceptionistDemo />
                </div>
            </div>
        </section>
    );
}

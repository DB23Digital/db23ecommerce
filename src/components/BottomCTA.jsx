import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Button } from './ui/Button';

function selectContactSubject(subject) {
    window.sessionStorage.setItem('db23-contact-subject', subject);
    window.dispatchEvent(new CustomEvent('db23-contact-subject', { detail: { subject } }));
}

export function BottomCTA() {
    return (
        <section className="relative overflow-hidden border-t border-white/10 bg-background py-28 md:py-44" aria-labelledby="closing-heading">
            <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
            <Motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative mx-auto max-w-[1400px] px-4 text-center md:px-8"
            >
                <h2
                    id="closing-heading"
                    className="mx-auto max-w-5xl text-balance text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-white md:text-8xl"
                >
                    Ready to be found, and to use AI properly?
                </h2>
                <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-text-muted">
                    Websites, hosting, search visibility and AI strategy for small businesses, from one Cape Town team.
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
                    <Button
                        href="#contact"
                        size="lg"
                        className="w-full sm:w-auto"
                        onClick={() => selectContactSubject('Start a Project')}
                    >
                        Start a project
                    </Button>
                    <a
                        href="#contact"
                        className="py-3 text-base font-medium text-white underline decoration-white/30 underline-offset-[6px] hover:decoration-accent"
                        onClick={() => selectContactSubject('AI Workshop')}
                    >
                        Book an AI workshop
                    </a>
                </div>
            </Motion.div>
        </section>
    );
}

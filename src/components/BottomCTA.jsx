import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Button } from './ui/Button';

function selectContactSubject(subject) {
    window.sessionStorage.setItem('db23-contact-subject', subject);
    window.dispatchEvent(new CustomEvent('db23-contact-subject', { detail: { subject } }));
}

export function BottomCTA() {
    return (
        <section className="relative overflow-hidden bg-card/35 py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.18),transparent_36%)]" />
            <div className="container relative z-10 mx-auto px-4 md:px-8">
                <Motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-4xl text-center"
                >
                    <h2 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
                        Ready to Modernize Your Business?
                    </h2>
                    <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-text-muted md:text-xl">
                        From AI workshops and automation to premium websites and digital systems, DB23 helps businesses
                        implement practical technology solutions that support real growth.
                    </p>

                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button
                            href="#contact"
                            size="lg"
                            className="w-full sm:w-auto"
                            onClick={() => selectContactSubject('AI Workshop')}
                        >
                            Book an AI Workshop
                        </Button>
                        <Button
                            href="#contact"
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto"
                            onClick={() => selectContactSubject('Start a Project')}
                        >
                            Start a Project
                        </Button>
                    </div>
                </Motion.div>
            </div>
        </section>
    );
}

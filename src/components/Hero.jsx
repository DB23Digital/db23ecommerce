import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, Brain, CheckCircle, Network, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';

function selectContactSubject(subject) {
    window.sessionStorage.setItem('db23-contact-subject', subject);
    window.dispatchEvent(new CustomEvent('db23-contact-subject', { detail: { subject } }));
}

const workflowItems = ['AI Workshop', 'Workflow Audit', 'Automation Map', 'Implementation'];

export function Hero() {
    return (
        <section
            className="relative min-h-[92vh] overflow-hidden bg-background pt-28 pb-16 md:pt-36"
            id="home"
            aria-labelledby="hero-heading"
        >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_12%_18%,rgba(59,130,246,0.22),transparent_32%),radial-gradient(circle_at_78%_12%,rgba(20,184,166,0.16),transparent_30%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

            <div className="container relative z-10 mx-auto px-4 md:px-8">
                <div className="grid min-h-[70vh] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.82fr)] lg:items-center">
                    <div className="max-w-4xl">
                        <Motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55 }}
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
                        >
                            <Sparkles className="h-4 w-4" aria-hidden="true" />
                            Practical AI implementation · Cape Town &amp; nationwide
                        </Motion.div>

                        <Motion.h1
                            id="hero-heading"
                            initial={{ opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, delay: 0.05 }}
                            className="mb-6 max-w-5xl text-4xl font-black leading-[1.05] tracking-normal text-white md:text-6xl lg:text-7xl"
                        >
                            AI Training, Automation &amp; Digital Systems for Modern Businesses
                        </Motion.h1>

                        <Motion.p
                            initial={{ opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, delay: 0.15 }}
                            className="mb-10 max-w-3xl text-lg leading-relaxed text-text-muted md:text-xl"
                        >
                            DB23 is a Cape Town AI implementation partner helping South African businesses understand,
                            adopt, and implement practical AI through workshops, automation, modern websites, and digital
                            systems designed for real business growth.
                        </Motion.p>

                        <Motion.div
                            initial={{ opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, delay: 0.25 }}
                            className="flex flex-col gap-4 sm:flex-row"
                        >
                            <Button
                                href="#ai-workshops"
                                size="lg"
                                className="w-full sm:w-auto"
                                onClick={() => selectContactSubject('AI Workshop')}
                            >
                                Book an AI Workshop
                            </Button>
                            <Button href="#work-showcase" variant="outline" size="lg" className="w-full sm:w-auto">
                                View Our Work
                            </Button>
                        </Motion.div>
                    </div>

                    <Motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.25 }}
                        className="relative"
                        aria-label="AI workshop and implementation dashboard visual"
                    >
                        <div className="absolute -inset-5 rounded-[2rem] bg-accent/10 blur-3xl" />
                        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/30 backdrop-blur">
                            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-accent">Workshop Dashboard</p>
                                    <p className="mt-1 text-sm text-text-muted">Business modernization plan</p>
                                </div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white">
                                    <Brain className="h-5 w-5" aria-hidden="true" />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {workflowItems.map((item, index) => (
                                    <div key={item} className="rounded-2xl border border-white/10 bg-background/70 p-4">
                                        <div className="mb-4 flex items-center justify-between">
                                            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                                                0{index + 1}
                                            </span>
                                            <CheckCircle className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                                        </div>
                                        <p className="text-base font-bold text-white">{item}</p>
                                        <div className="mt-4 h-2 rounded-full bg-white/10">
                                            <div
                                                className="h-full rounded-full bg-accent"
                                                style={{ width: `${48 + index * 14}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                                <div className="mb-4 flex items-center gap-3">
                                    <Network className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                                    <h2 className="text-lg font-bold text-white">Opportunity Map</h2>
                                </div>
                                <div className="grid gap-3">
                                    {['Customer engagement', 'Admin automation', 'Marketing workflow'].map((label) => (
                                        <div key={label} className="flex items-center justify-between rounded-lg bg-background/60 px-4 py-3">
                                            <span className="text-sm text-white/85">{label}</span>
                                            <ArrowRight className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Motion.div>
                </div>
            </div>
        </section>
    );
}

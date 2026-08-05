import React, { useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

const faqs = [
    {
        question: 'Who are DB23 AI workshops for?',
        answer:
            'They are designed for business owners, leadership teams, managers, marketing teams, sales teams, and operational staff who want to understand how AI can be used practically without needing technical backgrounds.',
    },
    {
        question: 'Do we need technical skills to attend?',
        answer:
            'No. The workshops are built around plain-English explanations, practical examples, and real business use cases. The goal is to help teams understand what is possible and where AI can create value.',
    },
    {
        question: 'What happens after an AI workshop?',
        answer:
            'Many workshops naturally lead into opportunity mapping, workflow automation, AI customer engagement, website improvements, digital systems planning, or ongoing modernization support. You can stop at the workshop or continue into implementation.',
    },
    {
        question: 'Can DB23 build the automations and systems too?',
        answer:
            'Yes. DB23 can help design and implement AI voice agents, customer engagement systems, workflow automations, lead qualification processes, modern websites, and digital growth systems.',
    },
    {
        question: 'Is this only for large companies?',
        answer:
            'No. The workshops and implementation services are especially useful for small and medium businesses that need practical technology advantages without hiring a large internal digital or AI team.',
    },
    {
        question: 'Do you still build websites?',
        answer:
            'Yes. Websites are still part of the DB23 offering, but they are positioned as modern digital systems rather than isolated brochures. We focus on clarity, trust, conversion, and integration with broader business workflows.',
    },
    {
        question: 'What does AI automation usually include?',
        answer:
            'It can include lead routing, follow-up messages, appointment handling, CRM updates, report generation, content support, customer response systems, and tool integrations. The exact solution depends on your workflows.',
    },
    {
        question: 'Where is DB23 based?',
        answer:
            'DB23 works with South African businesses and understands local operational realities, budgets, customer expectations, and growth challenges.',
    },
];

function FAQItem({ faq, isOpen, onClick }) {
    return (
        <div
            className={`overflow-hidden rounded-xl border transition-colors duration-200 ${
                isOpen ? 'border-accent/40 bg-card' : 'border-white/5 bg-background hover:border-white/15'
            }`}
        >
            <button
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span className="text-base font-semibold leading-snug text-white">{faq.question}</span>
                <span className={`shrink-0 transition-colors ${isOpen ? 'text-accent' : 'text-text-muted'}`}>
                    {isOpen ? <Minus className="h-5 w-5" aria-hidden="true" /> : <Plus className="h-5 w-5" aria-hidden="true" />}
                </span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <Motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-6 leading-relaxed text-text-muted">{faq.answer}</p>
                    </Motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="bg-background py-24" id="faq" aria-labelledby="faq-heading">
            <div className="container mx-auto px-4 md:px-8">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-14 text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">FAQ</p>
                        <h2 id="faq-heading" className="mb-5 text-3xl font-bold text-white md:text-5xl">
                            AI workshops and implementation, explained simply.
                        </h2>
                        <p className="text-lg text-text-muted">
                            Everything you need to know about working with DB23, in plain language.
                        </p>
                    </div>

                    <Motion.div
                        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } }}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        className="space-y-3"
                    >
                        {faqs.map((faq, index) => (
                            <Motion.div
                                key={faq.question}
                                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                            >
                                <FAQItem
                                    faq={faq}
                                    isOpen={openIndex === index}
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                />
                            </Motion.div>
                        ))}
                    </Motion.div>
                </div>
            </div>
        </section>
    );
}

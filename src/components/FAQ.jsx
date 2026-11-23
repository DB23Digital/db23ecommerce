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
        question: 'Can DB23 implement the AI ideas from a workshop?',
        answer:
            'Yes, where it makes sense. Our core services are websites, hosting, SEO and AI workshops and strategy, but when a session turns up a clear win we can help implement it. An AI receptionist that answers enquiries and books appointments is a common example.',
    },
    {
        question: 'Is this only for large companies?',
        answer:
            'No. Everything we do is aimed at small businesses that need a strong online presence and practical AI know-how without hiring an internal digital or AI team.',
    },
    {
        question: 'What do you include in website design?',
        answer:
            'A modern, mobile-first website built around clarity, trust and enquiries, with the SEO groundwork done from the start. We can also host and look after the site once it is live.',
    },
    {
        question: 'Do you host websites, and what does it cost?',
        answer:
            'Yes. Our hosted plan starts at R999 a month and includes hosting, SEO, AEO and GEO, and a monthly report. If you prefer to keep your own hosting, we work on your domain and the same SEO, AEO, GEO and reporting starts at R799 a month, with you paying your hosting provider directly. Prices include VAT.',
    },
    {
        question: 'What are AEO and GEO?',
        answer:
            'Answer engine optimisation (AEO) and generative engine optimisation (GEO) are about showing up in AI answers, such as Google AI Overviews, ChatGPT and Perplexity. They rest on the same foundations as good SEO: a fast, crawlable site, clear answers to real questions, and a business that is easy to verify. We do those well first.',
    },
    {
        question: 'Where is DB23 based?',
        answer:
            'DB23 works with South African businesses and understands local operational realities, budgets, customer expectations, and growth challenges.',
    },
];

function FAQItem({ faq, index, isOpen, onClick }) {
    return (
        <div className="border-t border-white/10">
            <h3>
                <button
                    id={`faq-q-${index}`}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                    onClick={onClick}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${index}`}
                >
                    <span className={`text-lg font-medium leading-snug tracking-tight transition-colors md:text-xl ${isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                        {faq.question}
                    </span>
                    <span className={`mt-1 shrink-0 transition-colors ${isOpen ? 'text-accent' : 'text-text-muted group-hover:text-white'}`}>
                        {isOpen ? <Minus className="h-5 w-5" aria-hidden="true" /> : <Plus className="h-5 w-5" aria-hidden="true" />}
                    </span>
                </button>
            </h3>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <Motion.div
                        key="answer"
                        id={`faq-a-${index}`}
                        role="region"
                        aria-labelledby={`faq-q-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="max-w-2xl pb-8 leading-relaxed text-text-muted">{faq.answer}</p>
                    </Motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="border-t border-white/10 bg-background py-24 md:py-36" id="faq" aria-labelledby="faq-heading">
            <div className="mx-auto grid max-w-[1400px] gap-12 px-4 md:px-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-28">
                        <h2
                            id="faq-heading"
                            className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-white md:text-5xl"
                        >
                            AI workshops and implementation, explained simply.
                        </h2>
                        <p className="mt-6 text-text-muted">
                            Everything you need to know about working with DB23, in plain language.
                        </p>
                    </div>
                </div>

                <div className="border-b border-white/10 lg:col-span-7 lg:col-start-6">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={faq.question}
                            faq={faq}
                            index={index}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
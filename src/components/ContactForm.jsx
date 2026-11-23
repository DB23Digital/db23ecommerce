import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Button } from './ui/Button';

const DEFAULT_SUBJECT = 'Website Contact Form';

export function ContactForm({ withDetails = false }) {
    const [subject, setSubject] = useState(DEFAULT_SUBJECT);
    const [status, setStatus] = useState({ type: 'idle', message: '' });

    useEffect(() => {
        const savedSubject = window.sessionStorage.getItem('db23-contact-subject');
        if (savedSubject) {
            setSubject(savedSubject);
        }

        const handleSubjectChange = (event) => {
            const nextSubject = event.detail?.subject || DEFAULT_SUBJECT;
            setSubject(nextSubject);
            window.sessionStorage.setItem('db23-contact-subject', nextSubject);
        };

        window.addEventListener('db23-contact-subject', handleSubjectChange);
        return () => window.removeEventListener('db23-contact-subject', handleSubjectChange);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        setStatus({ type: 'loading', message: 'Sending your message...' });

        const formData = new FormData(form);
        formData.set('subject', subject);

        try {
            const response = await fetch('/contact.php', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            if (!response.ok || !result.ok) {
                throw new Error(result.message || 'Message could not be sent.');
            }

            form.reset();
            setSubject(DEFAULT_SUBJECT);
            window.sessionStorage.removeItem('db23-contact-subject');
            setStatus({ type: 'success', message: 'Thanks, your message has been sent.' });
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.message || 'Something went wrong. Please try again.',
            });
        }
    };

    const fieldClass =
        'w-full rounded-none border-0 border-b border-white/20 bg-transparent px-0 py-3 text-lg text-white placeholder:text-white/30 transition-colors focus:border-accent focus:outline-none focus:ring-0';

    const body = status.type === 'success' ? (
        <Motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-white/10 pt-10"
            role="status"
        >
            <h2 className="mb-4 text-3xl font-medium tracking-tight text-white">Thank you for your enquiry.</h2>
            <p className="mb-8 text-text-muted">
                We have received your message and will get back to you with a practical next step shortly.
            </p>
            <Button href="/" variant="outline">Back to the home page</Button>
        </Motion.div>
    ) : (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <input type="hidden" name="subject" value={subject} />

            <p className="text-sm text-text-muted">
                Enquiry type: <span className="font-medium text-accent">{subject}</span>
            </p>

            <div>
                <label htmlFor="name" className="block text-sm text-text-muted">Full name</label>
                <input type="text" id="name" name="name" autoComplete="name" className={fieldClass} placeholder="Your name" required />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm text-text-muted">Email address</label>
                <input type="email" id="email" name="email" autoComplete="email" className={fieldClass} placeholder="you@company.co.za" required />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm text-text-muted">How can we help?</label>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className={`${fieldClass} resize-none`}
                    placeholder="What would you like to improve, automate or modernise?"
                    required
                ></textarea>
            </div>

            {status.message && (
                <p
                    role={status.type === 'error' ? 'alert' : 'status'}
                    className={`text-sm font-medium ${status.type === 'error' ? 'text-red-300' : 'text-text-muted'}`}
                >
                    {status.message}
                </p>
            )}

            <Button type="submit" className="w-full sm:w-auto" size="lg" disabled={status.type === 'loading'}>
                {status.type === 'loading' ? 'Sending…' : 'Send message'}
            </Button>
        </form>
    );

    if (!withDetails) {
        return (
            <section className="py-12" id="contact">
                <div className="mx-auto max-w-xl">{body}</div>
            </section>
        );
    }

    return (
        <section className="border-t border-white/10 bg-background py-24 md:py-32" id="contact" aria-labelledby="contact-heading">
            <div className="mx-auto grid max-w-[1400px] gap-16 px-4 md:px-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <h2 id="contact-heading" className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-white md:text-5xl">
                        Let&apos;s talk about your business.
                    </h2>
                    <p className="mt-6 max-w-md text-pretty text-text-muted">
                        Tell us what you want to improve, automate, or modernise. We&apos;ll get back to you with a practical
                        next step.
                    </p>

                    <dl className="mt-12 space-y-6">
                        <div>
                            <dt className="text-sm text-text-muted">WhatsApp</dt>
                            <dd>
                                <a
                                    href="https://wa.me/27836025227?text=Hi%20DB23%2C%20I%20would%20like%20to%20talk%20about%20"
                                    rel="noopener"
                                    className="text-xl font-medium text-white underline decoration-white/25 underline-offset-[6px] hover:decoration-accent"
                                >
                                    Message us, reply within the hour
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm text-text-muted">Phone</dt>
                            <dd>
                                <a href="tel:+27836025227" className="text-xl font-medium text-white hover:text-accent">+27 83 602 5227</a>
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm text-text-muted">Email</dt>
                            <dd>
                                <a href="mailto:deon@db23.co.za" className="text-xl font-medium text-white hover:text-accent">deon@db23.co.za</a>
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">{body}</div>
            </div>
        </section>
    );
}
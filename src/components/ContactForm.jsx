import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Button } from './ui/Button';

const DEFAULT_SUBJECT = 'Website Contact Form';

export function ContactForm() {
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

    if (status.type === 'success') {
        return (
            <section className="py-24 bg-background border-y border-white/5" id="contact">
                <div className="container mx-auto px-4 md:px-8 text-center max-w-xl">
                    <Motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card p-12 rounded-3xl border border-white/5"
                    >
                        <div className="w-16 h-16 bg-emerald-400/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Thank you for your enquiry!</h2>
                        <p className="text-text-muted mb-8">
                            We have received your message and will get back to you with a practical next step shortly.
                        </p>
                        <Button href="/" size="lg" className="w-full sm:w-auto">
                            Return to Home Page
                        </Button>
                    </Motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-background border-y border-white/5" id="contact">
            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let&apos;s talk business modernization.</h2>
                        <p className="text-text-muted">
                            Tell us what you want to improve, automate, or modernize. We&apos;ll get back to you with a practical next step.
                        </p>
                    </div>

                    <Motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6 bg-card p-8 rounded-3xl border border-white/5"
                        onSubmit={handleSubmit}
                    >
                        <input type="hidden" name="subject" value={subject} />

                        <div className="rounded-lg border border-accent/20 bg-accent/10 px-4 py-3 text-sm font-semibold text-white">
                            Enquiry type: <span className="text-accent">{subject}</span>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-white/80">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                                placeholder="Jack Black"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-white/80">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                                placeholder="john@example.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-sm font-medium text-white/80">How can we help?</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-none"
                                placeholder="Tell us about your project goals..."
                                required
                            ></textarea>
                        </div>

                        {status.message && (
                            <p
                                className={`text-sm font-medium ${
                                    status.type === 'success'
                                        ? 'text-emerald-400'
                                        : status.type === 'error'
                                            ? 'text-red-300'
                                            : 'text-text-muted'
                                }`}
                            >
                                {status.message}
                            </p>
                        )}

                        <Button type="submit" className="w-full" size="lg" disabled={status.type === 'loading'}>
                            {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                        </Button>
                    </Motion.form>

                    <div className="mt-8 rounded-2xl overflow-hidden" style={{ height: '360px' }}>
                        <iframe
                            src="https://storage.googleapis.com/maps-solutions-9wahyfg264/address-selection/flzc/address-selection.html"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="DB23 eCommerce — Tryall Road, Parklands, Cape Town"
                            aria-label="Map showing DB23 eCommerce location in Parklands, Cape Town"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

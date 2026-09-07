import React from 'react';
import { Linkedin } from 'lucide-react';

export function FounderBio() {
    return (
        <section className="bg-card/35 py-16 md:py-20" aria-labelledby="founder-heading">
            <div className="container mx-auto px-4 md:px-8">
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl border border-white/10 bg-background/40 p-8 text-center sm:flex-row sm:text-left">
                    <img
                        src="/assets/deon-botha.webp"
                        alt="Deon Botha, Founder of DB23 eCommerce"
                        width="120"
                        height="120"
                        loading="lazy"
                        decoding="async"
                        className="h-28 w-28 shrink-0 rounded-2xl border border-white/10 object-cover"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Who Delivers This</p>
                        <h2 id="founder-heading" className="mb-3 text-xl font-bold text-white">Deon Botha, Founder &amp; AI Implementation Consultant</h2>
                        <p className="text-sm leading-relaxed text-text-muted">
                            Deon Botha founded DB23 eCommerce to help South African businesses adopt AI without the enterprise price tag or the jargon. He designs and runs every AI workshop and training session personally — no outsourced facilitators — drawing on hands-on implementation work across website design, automation, and digital marketing for SME clients around Cape Town and further afield. Deon focuses on tools businesses can start using the next working day, not theory.
                        </p>
                        <a
                            href="https://www.linkedin.com/in/deon-botha-skillspassport/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                        >
                            <Linkedin className="h-4 w-4" aria-hidden="true" /> Connect on LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

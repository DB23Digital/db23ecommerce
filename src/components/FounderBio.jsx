import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function FounderBio() {
    return (
        <section className="border-t border-white/10 bg-background py-20 md:py-28" aria-labelledby="founder-heading">
            <div className="mx-auto grid max-w-[1400px] gap-10 px-4 md:px-8 lg:grid-cols-12">
                <div className="flex items-start gap-6 lg:col-span-4">
                    <img
                        src="/assets/deon-botha.webp"
                        alt="Deon Botha, Founder of DB23 eCommerce"
                        width="120"
                        height="120"
                        loading="lazy"
                        decoding="async"
                        className="h-24 w-24 shrink-0 rounded-sm border border-white/10 object-cover grayscale-[30%]"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                    <div>
                        <p className="mb-2 text-sm text-text-muted">Who delivers this</p>
                        <h2 id="founder-heading" className="text-2xl font-medium tracking-tight text-white">
                            Deon Botha
                        </h2>
                        <p className="mt-1 text-sm text-text-muted">Founder &amp; AI Implementation Consultant</p>
                    </div>
                </div>
                <div className="lg:col-span-7 lg:col-start-6">
                    <p className="text-pretty text-lg leading-relaxed text-white/85">
                        Deon Botha founded DB23 eCommerce to help South African businesses adopt AI without the enterprise price tag or the jargon. He designs and runs every AI workshop and training session personally — no outsourced facilitators — drawing on hands-on implementation work across website design, automation, and digital marketing for SME clients around Cape Town and further afield. Deon focuses on tools businesses can start using the next working day, not theory.
                    </p>
                    <a
                        href="https://www.linkedin.com/in/deon-botha-skillspassport/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white underline decoration-white/25 underline-offset-[6px] hover:decoration-accent"
                    >
                        Connect on LinkedIn
                        <ArrowUpRight className="h-4 w-4 text-accent" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </section>
    );
}

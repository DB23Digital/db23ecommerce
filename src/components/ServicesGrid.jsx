import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

function selectContactSubject(subject) {
    window.sessionStorage.setItem('db23-contact-subject', subject);
    window.dispatchEvent(new CustomEvent('db23-contact-subject', { detail: { subject } }));
}

const solutions = [
    {
        id: 'website-design',
        title: 'Website design',
        description:
            'Modern, mobile-first websites that make your business clearer, more credible, and easier to contact. Built to bring in enquiries, not just to look good.',
        items: ['Business websites', 'Landing pages', 'Redesigns', 'Conversion-focused copy and layout'],
        links: [{ label: 'Website design', href: '/website-design/' }],
    },
    {
        id: 'hosting',
        title: 'Hosting & care',
        description:
            'One monthly plan keeps your site online and getting found. We host it for you, or work on your existing hosting, and every plan includes SEO, AEO and GEO with a monthly report.',
        plans: [
            { name: 'Hosted by DB23', price: 'From R999', note: 'Hosting, SEO, AEO & GEO, monthly reporting' },
            { name: 'On your own hosting', price: 'From R799', note: 'You pay your hosting. We do SEO, AEO & GEO and reporting on your domain' },
        ],
        links: [{ label: 'Ask about a plan', href: '#contact', subject: 'Hosting & SEO plan' }],
    },
    {
        id: 'search',
        title: 'SEO, AEO & GEO',
        description:
            'Get found wherever customers search: on Google, in AI Overviews, and in tools like ChatGPT and Perplexity. AI search runs on the same fundamentals as SEO, so we get those right first.',
        items: ['Technical SEO', 'Local search', 'Content that answers real questions', 'AI search visibility'],
        links: [
            { label: 'SEO services', href: '/seo-services/' },
            { label: 'Read the blog', href: '/blog/' },
        ],
    },
    {
        id: 'ai-strategy',
        title: 'AI workshops & strategy',
        description:
            'Practical AI for small businesses. Hands-on workshops that get your team using AI tools properly, and strategy sessions that turn AI interest into a short, sensible plan.',
        items: ['Team workshops', 'Leadership strategy sessions', 'AI opportunity mapping', 'Implementation guidance'],
        links: [
            { label: 'AI workshops', href: '/ai-workshops/' },
            { label: 'AI training', href: '/ai-training/' },
        ],
    },
];

export function ServicesGrid() {
    return (
        <section className="relative bg-background py-24 md:py-36" id="solutions" aria-labelledby="solutions-heading">
            <div className="mx-auto max-w-[1400px] px-4 md:px-8">
                <div className="mb-16 grid gap-8 md:grid-cols-12">
                    <h2
                        id="solutions-heading"
                        className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-white md:col-span-7 md:text-6xl"
                    >
                        Four services, done properly.
                    </h2>
                    <p className="text-pretty text-lg leading-relaxed text-text-muted md:col-span-4 md:col-start-9 md:self-end">
                        A small business needs a website that works, a place for it to live, a way to be found, and a clear
                        idea of where AI fits. That is what we do.
                    </p>
                </div>

                <div>
                    {solutions.map((solution, i) => (
                        <Motion.article
                            key={solution.id}
                            id={solution.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                            className="group grid gap-6 border-t border-white/10 py-10 transition-colors md:grid-cols-12 md:gap-8 md:py-14"
                        >
                            <h3 className="text-3xl font-medium tracking-[-0.03em] text-white transition-colors group-hover:text-accent md:col-span-5 md:text-5xl">
                                {solution.title}
                            </h3>
                            <div className="md:col-span-6 md:col-start-7">
                                <p className="mb-6 text-pretty text-lg leading-relaxed text-text-muted">{solution.description}</p>
                                {solution.items && (
                                    <p className="mb-8 text-sm leading-relaxed text-white/80">
                                        {solution.items.join(' / ')}
                                    </p>
                                )}
                                {solution.plans && (
                                    <div className="mb-8">
                                        <dl className="grid border-t border-white/10 sm:grid-cols-2">
                                            {solution.plans.map((plan, p) => (
                                                <div
                                                    key={plan.name}
                                                    className={`border-b border-white/10 py-5 sm:border-b-0 ${p > 0 ? 'sm:border-l sm:pl-6' : 'sm:pr-6'}`}
                                                >
                                                    <dt className="text-sm text-text-muted">{plan.name}</dt>
                                                    <dd className="mt-1 text-3xl font-medium tracking-[-0.03em] text-white">
                                                        {plan.price}
                                                        <span className="text-base text-text-muted"> /month</span>
                                                    </dd>
                                                    <dd className="mt-2 text-sm leading-relaxed text-white/80">{plan.note}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                        <p className="mt-3 text-xs text-text-muted">Prices include VAT.</p>
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-x-8 gap-y-3">
                                    {solution.links.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            onClick={link.subject ? () => selectContactSubject(link.subject) : undefined}
                                            className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-white underline decoration-white/25 underline-offset-[6px] transition-colors hover:decoration-accent"
                                        >
                                            {link.label}
                                            <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden="true" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </Motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}

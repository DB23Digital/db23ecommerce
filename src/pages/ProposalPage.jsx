import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { CTABand, PageHero, Section } from '../components/PageBlocks';

const proposals = [
    {
        name: 'Safi-Kwanza',
        image: '/assets/showcase/safi-kwanza.jpg',
        alt: 'Safi-Kwanza Logo',
        scope: [
            { title: 'Website Build & Deployment', body: 'Complete design, development, and launch of the Safi-Kwanza website.' },
            { title: 'Monthly Retainer', body: 'Ongoing maintenance and updates for ad-hoc special offers or promotions.' },
        ],
        prices: [
            { label: 'Build & Deployment', value: 'R5,000' },
            { label: 'Monthly Retainer', value: 'R500 / month', accent: true },
        ],
    },
    {
        name: 'AREMH Developments',
        image: '/assets/showcase/aremh-dev.webp',
        alt: 'AREMH Developments Logo',
        scope: [
            { title: 'Website Build & Deployment', body: 'Complete design, development, and launch of the AREMH Developments website.' },
            { title: 'Additional Scope', body: 'Any additional work outside the initial website build and deployment will be quoted separately.' },
        ],
        prices: [
            { label: 'Build & Deployment', value: 'R5,000' },
            { label: 'Additional Work', value: 'Quoted Separately', accent: true },
        ],
    },
];

export function ProposalPage() {
    return (
        <PageLayout>
            <SEOHead
                title="Proposal: Safi-Kwanza & AREMH Developments | DB23 Ecommerce"
                description="Digital proposal for web design and development services from DB23 Ecommerce."
                canonical="https://db23.co.za/proposal"
            />

            <PageHero
                title="Project proposal."
                intro="Prepared by DB23 Ecommerce for Safi-Kwanza and AREMH Developments."
            />

            <Section id="proposals" className="!pt-16 md:!pt-20">
                <div className="grid gap-16 md:grid-cols-2 md:gap-12">
                    {proposals.map(p => (
                        <article key={p.name} className="flex flex-col border-t border-white/10 pt-8">
                            <div className="mb-8 h-48 overflow-hidden rounded-md border border-white/10">
                                <img src={p.image} alt={p.alt} className="h-full w-full object-cover" />
                            </div>

                            <h2 className="mb-2 text-3xl font-medium tracking-[-0.03em] text-white">{p.name}</h2>
                            <p className="mb-8 text-text-muted">Website Design & Development</p>

                            <dl className="mb-8 flex-grow space-y-6">
                                {p.scope.map(item => (
                                    <div key={item.title}>
                                        <dt className="font-medium text-white">{item.title}</dt>
                                        <dd className="mt-1 text-sm leading-relaxed text-text-muted">{item.body}</dd>
                                    </div>
                                ))}
                            </dl>

                            <dl className="mt-auto border-t border-white/10 pt-6">
                                {p.prices.map(row => (
                                    <div key={row.label} className="flex items-center justify-between gap-4 py-1">
                                        <dt className="text-text-muted">{row.label}</dt>
                                        <dd className={`font-medium ${row.accent ? 'text-accent' : 'text-white'}`}>{row.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </article>
                    ))}
                </div>
            </Section>

            <CTABand
                title="Ready to proceed?"
                body="If you are happy with the proposed scope and pricing, let's get started on bringing your vision to life."
                primary={{ label: 'Accept Proposal', href: 'mailto:deon@db23.co.za?subject=Proposal accepted for both websites' }}
            />
        </PageLayout>
    );
}

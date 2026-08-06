import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { caseStudies } from '../data/caseStudies';

export function WorkIndexPage() {
    const studies = Object.entries(caseStudies);

    return (
        <PageLayout>
            <SEOHead
                title="Our Work | Case Studies | DB23 eCommerce"
                description="Real projects DB23 has built for South African businesses — the problem, what we built, and what changed, in detail."
                canonical="https://db23.co.za/work/"
                ogTitle="Our Work | Case Studies | DB23 eCommerce"
                ogDescription="Real projects DB23 has built for South African businesses — the problem, what we built, and what changed, in detail."
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "Work", "item": "https://db23.co.za/work/" }
                        ]
                    }
                ]}
            />

            <section className="relative overflow-hidden bg-background pt-32 pb-24 md:pt-44">
                <div className="container relative z-10 mx-auto px-4 md:px-8">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <h1 className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl text-balance">
                            Our Work
                        </h1>
                        <p className="text-lg leading-relaxed text-text-muted md:text-xl">
                            Real projects for South African businesses — the problem we were given, what we built, and what changed.
                        </p>
                    </div>

                    {studies.length === 0 ? (
                        <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-card/40 p-10 text-center">
                            <p className="text-text-muted">
                                Case studies are being written up. In the meantime, see our{' '}
                                <a href="/#work-showcase" className="text-accent hover:underline">full project showcase</a>.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {studies.map(([slug, study]) => (
                                <a
                                    key={slug}
                                    href={`/work/${slug}/`}
                                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-accent/55"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-card">
                                        <img src={study.image} alt={study.project} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" width="1200" height="750" loading="lazy" />
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <span className="mb-3 w-fit rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-widest text-accent">
                                            {study.category}
                                        </span>
                                        <h2 className="mb-2 text-xl font-bold text-white">{study.project}</h2>
                                        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                                            Read case study
                                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PageLayout>
    );
}

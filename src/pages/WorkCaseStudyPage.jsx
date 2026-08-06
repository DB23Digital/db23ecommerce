import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { FounderBio } from '../components/FounderBio';
import { caseStudies } from '../data/caseStudies';

function NotFound() {
    return (
        <PageLayout>
            <SEOHead
                title="Case Study Not Found | DB23"
                description="The requested case study could not be found. Return to our work showcase to see our other projects."
                canonical="https://db23.co.za/work/"
            />
            <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-32">
                <h1 className="text-3xl font-black text-white mb-4">Case Study Not Found</h1>
                <p className="text-text-muted mb-8 max-w-md">
                    The project you're looking for might have been moved or is currently unavailable.
                </p>
                <a href="/work/" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-hover transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to All Work
                </a>
            </section>
        </PageLayout>
    );
}

export function WorkCaseStudyPage() {
    const { slug } = useParams();
    const study = caseStudies[slug];

    if (!study) return <NotFound />;

    return (
        <PageLayout>
            <SEOHead
                title={study.title}
                description={study.description}
                canonical={`https://db23.co.za/work/${slug}/`}
                ogTitle={study.title}
                ogDescription={study.description}
                ogImage={`https://db23.co.za${study.image}`}
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "Work", "item": "https://db23.co.za/work/" },
                            { "@type": "ListItem", "position": 3, "name": study.project, "item": `https://db23.co.za/work/${slug}/` }
                        ]
                    }
                ]}
            />

            <article className="relative bg-background pt-32 pb-24 md:pt-40">
                <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-4xl">
                    <div className="mb-8">
                        <a href="/work/" className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-white transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            Back to All Work
                        </a>
                    </div>

                    <span className="mb-4 inline-block w-fit rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
                        {study.category}
                    </span>
                    <h1 className="mb-10 text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl text-balance">
                        {study.project}
                    </h1>

                    <div className="relative mb-12 rounded-3xl border border-white/10 overflow-hidden shadow-2xl aspect-[16/10]">
                        <img src={study.image} alt={study.project} className="h-full w-full object-cover" width="1200" height="750" />
                    </div>

                    <div className="prose prose-invert max-w-none text-text-muted space-y-10">
                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">The Situation</h2>
                            <p className="leading-relaxed">{study.situation}</p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">What We Built</h2>
                            <p className="leading-relaxed">{study.whatWeBuilt}</p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">What Changed</h2>
                            <p className="leading-relaxed">{study.whatChanged}</p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">What We'd Do Differently</h2>
                            <p className="leading-relaxed">{study.whatWedDoDifferently}</p>
                        </section>
                    </div>

                    {study.liveUrl && (
                        <div className="mt-12 pt-8 border-t border-white/5">
                            <a
                                href={study.liveUrl}
                                target="_blank"
                                rel="nofollow noopener"
                                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-accent/50 hover:bg-accent/15"
                            >
                                View Live Site
                                <ArrowUpRight className="h-4 w-4 text-accent" aria-hidden="true" />
                            </a>
                        </div>
                    )}
                </div>
            </article>

            <FounderBio />
        </PageLayout>
    );
}

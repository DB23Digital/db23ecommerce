import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { CTABand, PageHero, RuledList, Section } from '../components/PageBlocks';

const features = [
    { title: 'Cleaning & restoration', body: 'Professional golf club cleaning & restoration' },
    { title: 'Specialised tools', body: 'Specialised cleaning compounds and tools' },
    { title: 'Performance', body: 'Restores grip, shine, and performance' },
    { title: 'Individuals and clubs', body: 'Available for individuals and clubs' },
    { title: 'Fast turnaround', body: 'Fast turnaround service' },
    { title: 'Local', body: 'Based in South Africa' },
];

export function ClubScrubPage() {
    return (
        <PageLayout>
            <SEOHead
                title="Club Scrub — Golf Club Cleaning Service | DB23 eCommerce"
                description="Club Scrub is a professional golf club cleaning and restoration service. DB23 built their digital presence to help them grow online."
                canonical="https://db23.co.za/club-scrub/"
                keywords="golf club cleaning South Africa, club scrub, golf club restoration, golf equipment cleaning"
                ogTitle="Club Scrub — Golf Club Cleaning Service"
                ogDescription="Professional golf club cleaning and restoration. A DB23 eCommerce client showcase."
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "Club Scrub", "item": "https://db23.co.za/club-scrub/" }
                        ]
                    }
                ]}
            />

            <PageHero
                eyebrow="Client showcase"
                title="Club Scrub: golf club cleaning."
                intro="Club Scrub is a professional golf club cleaning and restoration service based in South Africa. DB23 eCommerce built their digital presence to help them reach golfers and clubs online."
                primary={{ label: 'Get Your Own Website', href: '/#contact' }}
                secondary={{ label: 'View Website Design Services', href: '/website-design/' }}
            />

            <section className="border-t border-white/10 bg-background pb-24 pt-16 md:pb-32 md:pt-20" aria-label="Club Scrub website">
                <div className="mx-auto max-w-[1400px] px-4 md:px-8">
                    <img
                        src="/assets/showcase/clubscrub.webp"
                        alt="Club Scrub golf club cleaning service website built by DB23 eCommerce"
                        className="mx-auto h-auto w-full max-w-4xl rounded-md border border-white/10"
                        width="1200"
                        height="800"
                        loading="lazy"
                    />
                </div>
            </section>

            <Section id="about-club-scrub" title="Professional golf club restoration.">
                <RuledList items={features} columns={3} />
            </Section>

            <CTABand
                title="Need a website like this?"
                body="DB23 builds fast, modern websites for South African businesses. From showcase sites to full digital marketing systems."
                primary={{ label: 'See Website Design Services', href: '/website-design/' }}
            />
        </PageLayout>
    );
}

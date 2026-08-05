import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const showcaseItems = [
    {
        project: 'Safi Kwanza Resort',
        category: 'Travel & Hospitality',
        summary:
            'An elegant and modern luxury resort website along the Kwanza River, featuring immersive safari storytelling, architectural design presentation, and 5-star booking integration.',
        url: 'https://db23.co.za/safik-wanza/index1.html',
        image: '/assets/showcase/safi-kwanza.jpg',
        alt: 'Safi Kwanza Resort luxury riverside holiday destination website',
    },
    {
        project: 'Have & Share',
        category: 'Business Coaching',
        summary:
            'A premium business coaching and personal development website designed to communicate authority, transformation, and professional growth through elegant branding and clear service positioning.',
        url: 'https://haveandshare.co.za?utm_source=chatgpt.com',
        image: '/assets/showcase/haveandshare.webp',
        alt: 'Have and Share business coaching website landing page',
    },
    {
        project: 'Insight2Afrika',
        category: 'Travel & Safaris',
        summary:
            'A luxury African safari and travel website built around immersive destination storytelling, curated travel experiences, and high-end visual presentation.',
        url: 'https://insight2afrika.com/?utm_source=chatgpt.com',
        image: '/assets/showcase/insight2afrika.webp',
        alt: 'Insight2Afrika luxury African safari website landing page',
    },
    {
        project: 'Living Atlas',
        category: 'Travel & Safaris',
        summary:
            'An interactive African destination atlas built for Insight2Afrika, mapping regions, wildlife, and travel experiences into an immersive, story-driven exploration tool.',
        url: 'https://db23.co.za/insight2afrika/living-atlas/index.html',
        image: '/assets/showcase/living-atlas.jpg',
        alt: 'Living Atlas interactive African destination map website',
    },
    {
        project: 'Expedition Desk',
        category: 'Travel & Safaris',
        summary:
            'A bespoke safari trip-planning tool for Insight2Afrika, helping travel consultants build, compare, and present tailored African expedition itineraries.',
        url: 'https://db23.co.za/insight2afrika/expedition-desk/index.html',
        image: '/assets/showcase/expedition-desk.jpg',
        alt: 'Expedition Desk safari trip planning tool website',
    },
    {
        project: 'RTM Travel',
        category: 'Corporate Travel',
        summary:
            'A modern corporate travel management website positioning RTM as a trusted travel coordination partner for business travel, executive support, reporting, and logistics management.',
        url: 'https://rtmtravel.co.za?utm_source=chatgpt.com',
        image: '/assets/showcase/rtmtravel.webp',
        alt: 'RTM Travel corporate travel management website',
    },
    {
        project: 'SkillsPassport',
        category: 'Education & Career Guidance',
        summary:
            'A comprehensive South African career guidance platform helping learners, schools, parents, sponsors, and employers navigate subject choices, career pathways, and future opportunities.',
        url: 'https://skillspassportsa.co.za?utm_source=chatgpt.com',
        image: '/assets/showcase/skillspassport.webp',
        alt: 'SkillsPassport career guidance platform website',
    },
    {
        project: 'Otrum',
        category: 'Pool Technology',
        summary:
            'A high-tech product landing page for an intelligent swimming pool cleaning and navigation device using premium visuals, technical storytelling, and modern feature presentation.',
        url: 'https://db23.co.za/otrum/?utm_source=chatgpt.com',
        image: '/assets/showcase/otrum.webp',
        alt: 'Otrum intelligent swimming pool cleaning device landing page',
    },
    {
        project: 'Mud Busters',
        category: 'Sports Equipment Cleaning',
        summary:
            'A sports equipment cleaning and sanitization brand website focused on hygiene, restoration, and convenience for athletes, schools, sports clubs, and parents.',
        url: 'https://mudbusters.co.za?utm_source=chatgpt.com',
        image: '/assets/showcase/mudbusters.webp',
        alt: 'Mud Busters sports equipment cleaning website',
    },
    {
        project: 'Club Scrub',
        category: 'Sports Industry',
        summary:
            'A conversion-focused sports gear cleaning landing page featuring service packages, process explanations, FAQs, pricing structures, and booking-driven calls to action.',
        url: 'https://db23.co.za/club-scrub/index.html?utm_source=chatgpt.com',
        image: '/assets/showcase/clubscrub.webp',
        alt: 'Club Scrub sports gear cleaning service website',
    },
    {
        project: 'Farmina Store Training',
        category: 'Education & Training',
        summary:
            'An interactive education and product training platform helping retail staff better understand product benefits, improve customer conversations, and support more informed in-store recommendations.',
        url: 'https://farmina-store-training.vercel.app/?utm_source=chatgpt.com',
        image: '/assets/showcase/farmina-store-training.webp',
        alt: 'Farmina Store Training education platform website',
    },
    {
        project: 'Take It To Market',
        category: 'Outsourced Marketing & AI Services',
        summary:
            'A high-tech digital growth platform helping small and medium businesses with outsourced marketing, AI-powered customer engagement, website modernization, automation, lead generation, and digital support services.',
        url: 'https://www.db23.co.za/takeittomarket/?utm_source=chatgpt.com',
        image: '/assets/showcase/take-it-to-market.webp',
        alt: 'Take It To Market outsourced marketing and AI services website',
    },
    {
        project: 'Mar a Largo',
        category: 'Lifestyle Estate Living',
        summary:
            'A polished lifestyle estate website presenting Mar a Largo through premium coastal living, estate positioning, visual storytelling, and clear property-focused calls to action.',
        url: 'https://db23.co.za/mar-a-largo/index.html?utm_source=chatgpt.com',
        image: '/assets/showcase/mar-a-largo.webp',
        alt: 'Mar a Largo lifestyle estate living website',
    },
    {
        project: 'AREMH Developments',
        category: 'Engineering & Construction',
        summary:
            'A premium civil construction and industrial real estate website designed with a tactical drafting theme, interactive geographic D3 globe hub navigation, inline HTML5 media popups, and robust cPanel integrated leasing proposals.',
        url: 'https://db23.co.za/arehm-dev/',
        image: '/assets/showcase/ahrem-dev.webp',
        alt: 'AREMH Developments engineering and civil construction website',
    },
    {
        project: 'Fire Detection SA',
        category: 'Industrial Safety',
        summary:
            'A reliable fire detection and suppression systems website that positions industrial safety solutions clearly for commercial, manufacturing, and infrastructure clients.',
        url: 'https://fire-detection.co.za/?utm_source=chatgpt.com',
        image: '/assets/showcase/fire-detection.webp',
        alt: 'Fire Detection SA industrial fire safety systems website',
    },
    {
        project: 'Stellenbosch Chiro',
        category: 'Healthcare & Wellness',
        summary:
            'A clean, trust-building website for a Stellenbosch chiropractic practice, presenting treatments, practitioner credibility, and easy appointment booking.',
        url: 'https://db23.co.za/stellenboschchiro/',
        image: '/assets/showcase/stellenboschchiro.jpg',
        alt: 'Stellenbosch Chiro chiropractic practice website',
    },
    {
        project: 'Scoliosis Bracing',
        category: 'Healthcare & Medical Devices',
        summary:
            'A clinical, patient-focused website for a scoliosis bracing provider, explaining treatment approach, bracing technology, and patient care pathways clearly.',
        url: 'https://db23.co.za/scoliosisbracing/',
        image: '/assets/showcase/scoliosisbracing.jpg',
        alt: 'Scoliosis Bracing spinal treatment website',
    },
    {
        project: 'Apex Pet Group',
        category: 'Pet Industry',
        summary:
            'A corporate group website for Apex Pet Group, unifying brand presence, product lines, and business positioning across the pet industry.',
        url: 'https://apexpetgroup.co.za',
        image: '/assets/showcase/apexpetgroup.jpg',
        alt: 'Apex Pet Group corporate pet industry website',
    },
];


const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const card = {
    hidden: { opacity: 0, y: 26 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export function SelectedWork() {
    return (
        <section
            id="work-showcase"
            className="relative overflow-hidden bg-gradient-to-b from-background via-[#0b1020] to-background py-24 md:py-32"
            aria-labelledby="work-showcase-heading"
        >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_12%,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_88%_18%,rgba(34,211,238,0.12),transparent_28%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="container relative z-10 mx-auto px-4 md:px-8">
                <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.55fr)] lg:items-end">
                    <div className="max-w-4xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
                            <a href="https://db23.co.za/#work-showcase" className="hover:underline">Work Showcase</a>
                        </p>
                        <h2 id="work-showcase-heading" className="mb-5 max-w-4xl text-3xl font-bold text-white md:text-5xl">
                            Modern digital systems across multiple business verticals
                        </h2>
                        <p className="max-w-3xl text-lg leading-relaxed text-text-muted">
                            DB23 builds practical, conversion-focused digital experiences for businesses across coaching,
                            travel, education, sport, product innovation, AI services, estate living, and professional services.
                            Each project is designed to communicate clearly, build trust, and support measurable business growth.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
                        {[
                            ['100+', 'Projects'],
                            ['8+', 'Verticals'],
                            ['AI', 'Ready'],
                        ].map(([value, label]) => (
                            <div key={label} className="text-center">
                                <div className="text-2xl font-black text-white">{value}</div>
                                <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-text-muted">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <Motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                >
                    {showcaseItems.map((item) => (
                        <Motion.article
                            key={item.project}
                            variants={card}
                            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/55 hover:shadow-accent/10"
                        >
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-card">
                                <img
                                    src={item.image}
                                    alt={item.alt}
                                    width="1200"
                                    height="760"
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement.classList.add('flex', 'items-center', 'justify-center');
                                        const placeholder = document.createElement('div');
                                        placeholder.className = 'text-text-muted text-sm font-medium opacity-40';
                                        placeholder.textContent = item.project;
                                        e.currentTarget.parentElement.appendChild(placeholder);
                                    }}
                                />
                                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/85 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>

                            <div className="relative flex flex-1 flex-col p-6">
                                <span className="mb-4 w-fit rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-widest text-accent">
                                    {item.category}
                                </span>
                                <h3 className="mb-3 text-xl font-bold text-white">{item.project}</h3>
                                <p className="mb-6 flex-1 text-sm leading-relaxed text-text-muted">{item.summary}</p>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/50 hover:bg-accent/15 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                                    aria-label={`View ${item.project} project`}
                                >
                                    View Project
                                    <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                                </a>
                            </div>
                        </Motion.article>
                    ))}
                </Motion.div>

                <div className="mt-16 border-t border-white/10 pt-12 md:mt-20">
                    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                        <div className="max-w-3xl">
                            <h3 className="mb-4 text-3xl font-black leading-tight text-white md:text-4xl">
                                Want your business to feel this clear and modern online?
                            </h3>
                            <p className="text-lg leading-relaxed text-text-muted">
                                From AI workshops and automation to premium websites and digital systems, DB23 helps businesses
                                turn practical technology ideas into real commercial value.
                            </p>
                        </div>
                        <a
                            href="#contact"
                            className="inline-flex h-14 items-center justify-center gap-3 rounded-md bg-accent px-8 text-base font-semibold text-white shadow-lg shadow-accent/20 transition hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                        >
                            Start a Project
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

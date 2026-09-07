import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Bot, CheckCircle, Headphones, Minus, PhoneCall, Plus, Settings2, Sparkles, Zap } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/Button';
import { FounderBio } from '../components/FounderBio';

const useCases = [
    { icon: <PhoneCall className="h-6 w-6" />, title: 'AI Voice Receptionist', desc: 'Handle every incoming call professionally 24/7. Your AI receptionist greets callers, answers FAQs, and routes enquiries to the right person — even after hours.', accent: 'text-cyan-300', bg: 'bg-cyan-400/10' },
    { icon: <BadgeCheck className="h-6 w-6" />, title: 'Lead Qualification', desc: 'Automatically qualify inbound leads before they reach your team. Your Voice AI asks the right questions and scores prospects in real time.', accent: 'text-accent', bg: 'bg-accent/10' },
    { icon: <Bot className="h-6 w-6" />, title: 'Appointment Booking', desc: 'Let customers book, reschedule, or confirm appointments via voice — connected to your calendar system without human intervention.', accent: 'text-emerald-300', bg: 'bg-emerald-400/10' },
    { icon: <Headphones className="h-6 w-6" />, title: 'Customer FAQ Handling', desc: 'Answer your most common customer questions instantly via voice. Reduce call volumes on your team for repetitive enquiries.', accent: 'text-purple-300', bg: 'bg-purple-400/10' },
    { icon: <Zap className="h-6 w-6" />, title: 'Automated Follow-Ups', desc: 'Trigger outbound voice calls for appointment reminders, payment follow-ups, or post-sale check-ins — automatically and at scale.', accent: 'text-amber-300', bg: 'bg-amber-400/10' },
    { icon: <Settings2 className="h-6 w-6" />, title: 'After-Hours Coverage', desc: 'Never lose a lead because your office is closed. Your Voice AI takes messages, answers questions, and creates leads for your team to follow up.', accent: 'text-rose-300', bg: 'bg-rose-400/10' },
];

const benefits = [
    ['24/7', 'Availability — never miss a call'],
    ['<3s', 'Average AI response time'],
    ['100%', 'Consistent customer experience'],
    ['60%+', 'Reduction in repetitive call handling'],
];

const howItWorks = [
    { n: '01', title: 'Discovery Consultation', body: 'We map your incoming call types, common questions, lead flow, and business goals to design the right Voice AI solution.' },
    { n: '02', title: 'Voice & Script Design', body: 'We write the conversation flows, scripts, and response logic — tailored to your brand tone and business processes.' },
    { n: '03', title: 'Integration & Setup', body: 'Your Voice AI is connected to your existing phone number, CRM, calendar, or communication tools as needed.' },
    { n: '04', title: 'Testing & Refinement', body: 'We run full test scenarios across call types to ensure natural, accurate responses before going live.' },
    { n: '05', title: 'Go Live & Optimise', body: 'Your Voice AI goes live. We monitor performance, review call logs, and continuously optimise responses over time.' },
];

const faqs = [
    { q: 'What is a Voice AI solution?', a: 'Voice AI is an intelligent, automated voice system that handles phone calls using artificial intelligence. It can greet callers, answer questions, qualify leads, book appointments, and route calls — without a human operator.' },
    { q: 'How does Voice AI work for small businesses?', a: 'Voice AI connects to your existing phone number and handles calls automatically. It uses natural language processing to understand what callers say and responds intelligently — just like a human receptionist, but available 24/7 at a fraction of the cost.' },
    { q: 'Can a small business afford Voice AI?', a: 'Yes. DB23 designs Voice AI solutions scaled to SME budgets. Unlike enterprise voice platforms, our solutions are practical and priced for South African small and medium businesses.' },
    { q: 'Does Voice AI sound robotic?', a: 'No. Modern Voice AI uses natural-sounding speech synthesis that is indistinguishable from a human in many cases. DB23 designs conversation flows that feel natural, professional, and on-brand.' },
    { q: 'What phone systems does Voice AI integrate with?', a: 'DB23 Voice AI solutions can integrate with most South African VoIP systems, landlines, and mobile numbers. We also connect to CRMs, calendars, and communication tools like WhatsApp and email where needed.' },
    { q: 'Will Voice AI replace my receptionist?', a: 'Not necessarily. Voice AI handles repetitive, high-volume call tasks — freeing your team to focus on complex, high-value interactions. Many businesses use Voice AI to extend their team\'s capacity rather than replace anyone.' },
    { q: 'How long does it take to set up a Voice AI system?', a: 'Most DB23 Voice AI implementations take 2–4 weeks from discovery to go-live, depending on complexity and the number of integrations required.' },
    { q: 'Can Voice AI handle South African accents and languages?', a: 'Yes. Modern Voice AI platforms support South African English and are continuously improving. DB23 tests and tunes your system specifically for your caller base during setup.' },
];

function FAQItem({ faq, isOpen, onClick }) {
    return (
        <div className={`overflow-hidden rounded-xl border transition-colors duration-200 ${isOpen ? 'border-accent/40 bg-card' : 'border-white/5 bg-background hover:border-white/15'}`}>
            <button className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left" onClick={onClick} aria-expanded={isOpen}>
                <span className="text-base font-semibold leading-snug text-white">{faq.q}</span>
                <span className={`shrink-0 ${isOpen ? 'text-accent' : 'text-text-muted'}`}>{isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</span>
            </button>
            {isOpen && <p className="px-6 pb-6 leading-relaxed text-text-muted">{faq.a}</p>}
        </div>
    );
}

export function VoiceAIPage() {
    const [openFaq, setOpenFaq] = useState(0);
    return (
        <PageLayout>
            <SEOHead
                title="Voice AI South Africa – AI Receptionists | DB23"
                description="AI voice receptionists and automated lead qualification for South African businesses. Available 24/7."
                canonical="https://db23.co.za/voice-ai/"
                keywords="Voice AI South Africa, AI voice receptionist South Africa, AI call handling, voice AI for small business, AI phone system South Africa"
                ogTitle="Voice AI South Africa – AI Receptionists | DB23"
                ogDescription="AI voice receptionists and automated lead qualification for South African businesses. Available 24/7."
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "Voice AI", "item": "https://db23.co.za/voice-ai/" }
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(f => ({
                            "@type": "Question",
                            "name": f.q,
                            "acceptedAnswer": { "@type": "Answer", "text": f.a }
                        }))
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "@id": "https://db23.co.za/voice-ai/#service",
                        "name": "Voice AI Solutions for South African Businesses",
                        "description": "AI voice receptionists, automated lead qualification, and customer engagement systems for SA businesses.",
                        "provider": { "@id": "https://db23.co.za/#organization" },
                        "serviceType": "Voice AI Implementation",
                        "areaServed": { "@type": "Country", "name": "South Africa" },
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "ZAR",
                            "description": "Custom pricing based on call volume and configuration. Contact for a tailored quote."
                        },
                        "url": "https://db23.co.za/voice-ai/"
                    }
                ]}
            />

            {/* Hero */}
            <section className="relative min-h-[80vh] overflow-hidden bg-background pt-32 pb-20 md:pt-44" aria-labelledby="voice-ai-h1">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_8%_18%,rgba(6,182,212,0.22),transparent_35%),radial-gradient(circle_at_88%_12%,rgba(59,130,246,0.16),transparent_30%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                                <Sparkles className="h-4 w-4" aria-hidden="true" />
                                Voice AI South Africa · Available 24/7
                            </div>
                            <h1 id="voice-ai-h1" className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl text-balance">
                                Voice AI Solutions for{' '}
                                <span className="bg-gradient-to-r from-cyan-400 to-accent bg-clip-text text-transparent">SA Businesses</span>
                            </h1>
                            <p className="mb-10 text-lg leading-relaxed text-text-muted md:text-xl">
                                DB23 builds intelligent Voice AI systems that handle your inbound calls, qualify leads, book appointments, and answer customer questions — 24 hours a day, 7 days a week, at a fraction of the cost of a full-time receptionist.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Button href="/#contact" size="lg" className="w-full sm:w-auto">Get a Voice AI Quote</Button>
                                <Button href="#how-it-works" variant="outline" size="lg" className="w-full sm:w-auto">How It Works</Button>
                            </div>
                        </Motion.div>

                        {/* Stat card */}
                        <Motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
                            <div className="absolute -inset-4 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
                            <div className="relative rounded-3xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur shadow-2xl shadow-black/30">
                                <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300"><PhoneCall className="h-5 w-5" /></div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">Voice AI Dashboard</p>
                                        <p className="text-sm text-text-muted">Live call intelligence</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {benefits.map(([val, label]) => (
                                        <div key={label} className="rounded-2xl border border-white/10 bg-background/70 p-4">
                                            <p className="text-2xl font-black text-cyan-300">{val}</p>
                                            <p className="mt-1 text-xs text-text-muted leading-snug">{label}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                                    <p className="text-xs font-bold uppercase tracking-widest text-cyan-300 mb-2">Active Right Now</p>
                                    {['Answering inbound enquiry', 'Qualifying new lead', 'Booking appointment'].map(s => (
                                        <div key={s} className="flex items-center gap-2 rounded-lg bg-background/60 px-3 py-2 mb-2 last:mb-0">
                                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                            <span className="text-sm text-white/85">{s}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Motion.div>
                    </div>
                </div>
            </section>

            {/* Answer Block — GEO citability */}
            <section className="bg-background py-16 md:py-20" aria-labelledby="answer-what-is-voice-ai">
                <div className="container mx-auto px-4 md:px-8 max-w-3xl">
                    <h2 id="answer-what-is-voice-ai" className="mb-4 text-2xl font-black text-white">What is Voice AI for business?</h2>
                    <p className="text-lg leading-relaxed text-text-muted mb-4">
                        Voice AI for business is an intelligent automated phone system that handles inbound and outbound calls using artificial intelligence — without a human operator. It greets callers, answers frequently asked questions, qualifies new leads, books appointments, and routes complex queries to your team, all in real time, 24 hours a day, 7 days a week. Unlike basic IVR menu systems, Voice AI uses natural language processing to understand what callers actually say and respond naturally. DB23 designs and implements Voice AI systems specifically for South African businesses, integrated with your existing phone number, CRM, and calendar tools. Most implementations go live within 2 to 4 weeks. The system handles up to 200 concurrent calls simultaneously, eliminating queues entirely during peak periods.
                    </p>
                    <p className="text-sm leading-relaxed text-text-muted border-l-2 border-cyan-400/40 pl-4">
                        South African call centres report that 68% of inbound calls are repetitive enquiries that could be handled by AI without human involvement. (Source: Frost &amp; Sullivan, 2024 SA Contact Centre Report.) Voice AI converts this cost centre into a scalable, always-on customer engagement system.
                    </p>
                </div>
            </section>

            {/* Use Cases */}
            <section className="bg-card/35 py-24 md:py-32" aria-labelledby="usecases-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-300">Use Cases</p>
                        <h2 id="usecases-heading" className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">What Voice AI Does for Your Business</h2>
                        <p className="text-lg leading-relaxed text-text-muted">From handling reception calls to qualifying leads and booking appointments — Voice AI takes over the repetitive, time-consuming call work so your team doesn't have to.</p>
                    </div>
                    <Motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {useCases.map(uc => (
                            <Motion.article key={uc.title} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }} className="rounded-2xl border border-white/10 bg-background/70 p-6 transition hover:-translate-y-1 hover:border-white/25">
                                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${uc.bg} ${uc.accent}`}>{uc.icon}</div>
                                <h3 className="mb-2 text-xl font-bold text-white">{uc.title}</h3>
                                <p className="text-sm leading-relaxed text-text-muted">{uc.desc}</p>
                            </Motion.article>
                        ))}
                    </Motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-background py-24 md:py-32" id="how-it-works" aria-labelledby="hiw-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">The Process</p>
                        <h2 id="hiw-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">How We Build Your Voice AI</h2>
                        <p className="text-lg text-text-muted">A structured, clear implementation process from consultation to a live, working Voice AI system.</p>
                    </div>
                    <div className="relative mx-auto max-w-4xl">
                        <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
                        <div className="space-y-5">
                            {howItWorks.map(s => (
                                <Motion.article key={s.n} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative flex gap-6 rounded-2xl border border-white/10 bg-card/70 p-6 transition hover:border-accent/30">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent font-black text-sm">{s.n}</div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-bold text-white">{s.title}</h3>
                                        <p className="leading-relaxed text-text-muted">{s.body}</p>
                                    </div>
                                </Motion.article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Benefits Banner */}
            <section className="bg-card/35 py-16" aria-label="Voice AI key benefits">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            ['Never miss a lead', 'Every call answered, even at 2am.'],
                            ['Reduce call costs', 'Automate repetitive, high-volume calls.'],
                            ['Scale without hiring', 'Handle 10x the calls with the same team.'],
                            ['Data from every call', 'Logs, transcripts, and insights from every interaction.'],
                        ].map(([title, body]) => (
                            <div key={title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-background/70 p-5">
                                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
                                <div><p className="font-bold text-white text-sm mb-1">{title}</p><p className="text-xs text-text-muted leading-relaxed">{body}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-background py-24 md:py-32" aria-labelledby="faq-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-12 text-center">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">FAQ</p>
                            <h2 id="faq-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">Voice AI Questions, Answered</h2>
                            <p className="text-lg text-text-muted">Everything you need to know about Voice AI for South African businesses.</p>
                        </div>
                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <FAQItem key={faq.q} faq={faq} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <FounderBio />

            {/* CTA */}
            <section className="relative overflow-hidden bg-card/35 py-24 md:py-32">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.18),transparent_36%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8 text-center">
                    <Motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl">
                        <h2 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl">Ready to Put Voice AI to Work?</h2>
                        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-muted">Tell us about your call volume and business goals. We'll design a Voice AI solution that fits your budget and starts delivering results quickly.</p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button href="/#contact" size="lg" className="w-full sm:w-auto">Get a Voice AI Quote</Button>
                            <a href="/ai-workshops/" className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-white transition-colors">Explore AI Workshops <ArrowRight className="h-4 w-4" /></a>
                        </div>
                    </Motion.div>
                </div>
            </section>
        </PageLayout>
    );
}

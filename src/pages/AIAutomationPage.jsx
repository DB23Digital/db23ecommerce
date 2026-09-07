import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Minus, Plus, Sparkles, Workflow } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/Button';
import { FounderBio } from '../components/FounderBio';

const automations = [
    { num: '#1', title: 'Lead Capture to CRM with Auto Follow-up', trigger: 'Contact form submission', steps: 'Add to CRM → AI-written personalised intro email → notify sales rep', tools: 'Zapier + HubSpot + ChatGPT plugin', build: '2–3 hours', save: '20–30 min/day' },
    { num: '#2', title: 'Invoice Payment Reminder Sequence', trigger: 'Invoice due date approaching (3 days, 1 day, overdue)', steps: 'Send escalating reminders → log response in accounting software', tools: 'Zapier + Xero/Sage + Gmail', build: '1–2 hours', save: '1–2 hours/week' },
    { num: '#3', title: 'Meeting Summary to Team', trigger: 'Meeting ends in Teams or Zoom', steps: 'Auto-transcription → AI summary → emailed to attendees + logged to Notion', tools: 'Otter.ai/Fireflies + Zapier + Notion', build: '30 min setup', save: '20–30 min per meeting' },
    { num: '#4', title: 'Google Review Response Pipeline', trigger: 'New Google review posted', steps: 'AI drafts professional response → owner reviews → response posted', tools: 'Zapier + ChatGPT + Google Business Profile', build: '2 hours', save: '15 min per review + faster response time' },
    { num: '#5', title: 'Social Media Publishing Pipeline', trigger: 'Blog post or product update published', steps: 'AI generates 3 social variations (LinkedIn, Facebook, Instagram) → scheduled in Buffer', tools: 'Zapier + ChatGPT + Buffer', build: '2–3 hours', save: '45–60 min per post' },
];

const tools = [
    { name: 'Zapier', best: 'Beginners, 7,000+ integrations', price: 'R0–R1,600/month' },
    { name: 'Make', best: 'Advanced, visual builder', price: 'R0–R1,200/month' },
    { name: 'n8n', best: 'Developers, self-hostable', price: 'R0 (self-hosted)' },
    { name: 'Power Automate', best: 'Microsoft 365 users', price: 'Included in M365' },
];

const faqs = [
    { q: 'What is AI automation for South African businesses?', a: 'AI automation means connecting your existing tools (CRM, accounting, email, calendar) so repetitive tasks happen automatically without manual triggering. AI adds intelligence to those workflows — generating text, classifying content, or making routing decisions. No-code tools like Zapier and Make handle the connections; a ChatGPT plugin or similar adds the AI layer. No developer required.' },
    { q: "What's the easiest AI automation to start with?", a: 'An invoice payment reminder sequence: Zapier connects your accounting software (Xero or Sage) to Gmail, sending escalating payment reminders 3 days before, 1 day before, and on the due date — automatically. Takes 1–2 hours to build and saves 1–2 hours per week.' },
    { q: 'Which no-code automation tool is best for SA businesses?', a: 'Zapier is the best starting point for most SA businesses: 7,000+ app integrations, the lowest learning curve, and a free tier that covers most basic automations. It\'s cloud-based, so it survives load shedding. Move to Make when you need more complex visual workflows.' },
    { q: 'Is POPIA compliance required for automated data workflows?', a: 'Yes. If your automation passes personal data (names, emails, ID numbers) between systems, you need a Data Processing Agreement with each service in the chain. Zapier, Make, Google, and Microsoft all have DPAs available — don\'t route personal data through free AI plugins that lack one.' },
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

export function AIAutomationPage() {
    const [openFaq, setOpenFaq] = useState(0);
    return (
        <PageLayout>
            <SEOHead
                title="AI Automation South Africa | Workflow Automation for Business | DB23"
                description="AI-powered workflow automation for South African businesses. Real automations, real tools (Zapier, Make, n8n), ZAR pricing. Book a free workflow audit."
                canonical="https://db23.co.za/ai-automation/"
                keywords="ai workflow automation south africa, ai automation south africa, business automation tools south africa, ai integration for small business south africa"
                ogTitle="AI Automation South Africa | Workflow Automation for Business | DB23"
                ogDescription="AI-powered workflow automation for South African businesses. Real automations, real tools (Zapier, Make, n8n), ZAR pricing. Book a free workflow audit."
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://db23.co.za/" },
                            { "@type": "ListItem", "position": 2, "name": "AI Automation", "item": "https://db23.co.za/ai-automation/" }
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": "AI Workflow Automation",
                        "provider": { "@id": "https://db23.co.za/#organization" },
                        "areaServed": { "@type": "Country", "name": "South Africa" },
                        "description": "AI-powered workflow automation for South African businesses using Zapier, Make, n8n, and custom tooling."
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
                    }
                ]}
            />

            {/* Hero */}
            <section className="relative min-h-[65vh] overflow-hidden bg-background pt-32 pb-20 md:pt-44" aria-labelledby="automation-h1">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_12%_18%,rgba(59,130,246,0.2),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(20,184,166,0.14),transparent_30%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8">
                    <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                            <Workflow className="h-4 w-4" aria-hidden="true" />
                            AI Workflow Automation
                        </div>
                        <h1 id="automation-h1" className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl text-balance">
                            AI Automation for{' '}
                            <span className="bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent">South African Businesses</span>
                        </h1>
                        <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-text-muted md:text-xl">
                            We automate the quoting, lead follow-up, invoicing and reporting work that eats a morning a week — connecting the tools you already use with Zapier, Make or n8n, so the repetitive part happens without you.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row justify-center">
                            <Button href="/contact/" size="lg" className="w-full sm:w-auto">Book a Free Workflow Audit</Button>
                            <Button href="#automations-built" variant="outline" size="lg" className="w-full sm:w-auto">See What We Automate</Button>
                        </div>
                    </Motion.div>
                </div>
            </section>

            {/* Worked example */}
            <section className="bg-card/35 py-20 md:py-28" aria-labelledby="worked-example-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto max-w-4xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">A Worked Example</p>
                        <h2 id="worked-example-heading" className="mb-8 text-3xl font-black leading-tight text-white md:text-5xl">Lead Capture, End to End</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-background/70 p-6">
                                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-rose-300">Before</p>
                                <p className="leading-relaxed text-text-muted">A contact form submission sits in an inbox until someone notices it. A team member manually copies the details into a spreadsheet or CRM, writes an intro email from scratch, and pings the sales rep on WhatsApp. If it's a busy day, that can take hours — or fall through entirely.</p>
                            </div>
                            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
                                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-300">After</p>
                                <p className="leading-relaxed text-text-muted">The form submission lands in the CRM automatically. An AI-drafted, personalised intro email goes out within seconds. The assigned sales rep gets notified immediately. Nothing waits on someone remembering to check an inbox.</p>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-4 rounded-xl border border-white/5 bg-background/50 px-6 py-4 text-sm text-text-muted">
                            <span><strong className="text-white">Tools:</strong> Zapier + CRM + ChatGPT plugin</span>
                            <span><strong className="text-white">Build time:</strong> 2–3 hours</span>
                            <span><strong className="text-white">Saves:</strong> 20–30 min/day</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Automations we build */}
            <section className="bg-background py-20 md:py-28" id="automations-built" aria-labelledby="automations-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Automations We Build</p>
                        <h2 id="automations-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">Five We Build Most Often</h2>
                        <p className="text-lg text-text-muted">Each one below is something a reader will recognise as their own problem — not a hypothetical.</p>
                    </div>
                    <div className="mx-auto max-w-4xl space-y-5">
                        {automations.map(a => (
                            <Motion.div key={a.num} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="rounded-2xl border border-white/10 bg-card/50 p-6">
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="rounded-md bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">{a.num}</span>
                                    <h3 className="text-base font-bold text-white">{a.title}</h3>
                                </div>
                                <div className="grid gap-x-6 gap-y-1.5 text-sm text-text-muted sm:grid-cols-2">
                                    <span><strong className="text-white">Trigger:</strong> {a.trigger}</span>
                                    <span><strong className="text-white">Tools:</strong> {a.tools}</span>
                                    <span className="sm:col-span-2"><strong className="text-white">Steps:</strong> {a.steps}</span>
                                    <span><strong className="text-white">Build time:</strong> {a.build}</span>
                                    <span><strong className="text-white">Saves:</strong> {a.save}</span>
                                </div>
                            </Motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What it costs */}
            <section className="bg-card/35 py-20 md:py-28" aria-labelledby="cost-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto max-w-4xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">What It Costs</p>
                        <h2 id="cost-heading" className="mb-6 text-3xl font-black text-white md:text-5xl">Tool Costs, Honestly</h2>
                        <p className="mb-8 leading-relaxed text-text-muted">The automation tool itself is usually the cheap part. Build cost depends on how many steps and integrations are involved — a one-trigger automation like the invoice reminder above is a couple of hours' work; a multi-branch workflow with several tools takes longer. Book a free audit and we'll scope it before you commit to anything.</p>
                        <div className="overflow-x-auto rounded-xl border border-white/5 bg-background/60">
                            <table className="min-w-full divide-y divide-white/5 text-left text-sm">
                                <thead className="bg-white/5 text-xs uppercase tracking-wider text-white">
                                    <tr>
                                        <th className="px-4 py-4 font-semibold">Tool</th>
                                        <th className="px-4 py-4 font-semibold">Best For</th>
                                        <th className="px-4 py-4 font-semibold text-accent">Price (ZAR approx)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-text-muted">
                                    {tools.map(t => (
                                        <tr key={t.name}>
                                            <td className="px-4 py-3 font-medium text-white">{t.name}</td>
                                            <td className="px-4 py-3">{t.best}</td>
                                            <td className="px-4 py-3 text-accent">{t.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Where automation is wrong */}
            <section className="bg-background py-20 md:py-28" aria-labelledby="wrong-answer-heading">
                <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">One Honest Caveat</p>
                    <h2 id="wrong-answer-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">Where Automation Is the Wrong Answer</h2>
                    <p className="text-lg leading-relaxed text-text-muted">If you're doing something twice a year, or the process changes every single time, automating it usually costs more in setup than it will ever save. We tell clients this upfront during the audit — building an automation nobody ends up using isn't a good use of anyone's budget, ours included.</p>
                </div>
            </section>

            <FounderBio />

            {/* FAQ */}
            <section className="bg-card/35 py-24 md:py-32" aria-labelledby="faq-heading">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-12 text-center">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">FAQ</p>
                            <h2 id="faq-heading" className="mb-5 text-3xl font-black text-white md:text-5xl">AI Automation Questions, Answered</h2>
                        </div>
                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <FAQItem key={faq.q} faq={faq} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Internal links */}
            <section className="bg-background py-16" aria-label="Related services">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-6 text-sm">
                        <a href="/blog/ai-automation-south-africa/" className="inline-flex items-center gap-2 font-semibold text-accent hover:underline">Read the full automation guide <ArrowRight className="h-4 w-4" /></a>
                        <a href="/voice-ai/" className="inline-flex items-center gap-2 font-semibold text-text-muted hover:text-white transition-colors">Explore Voice AI <ArrowRight className="h-4 w-4" /></a>
                        <a href="/ai-training/" className="inline-flex items-center gap-2 font-semibold text-text-muted hover:text-white transition-colors">Explore AI Training <ArrowRight className="h-4 w-4" /></a>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden bg-card/35 py-24 md:py-32">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.18),transparent_36%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8 text-center">
                    <Motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl">
                        <h2 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl">Ready to Automate the Boring Part?</h2>
                        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-muted">Tell us what's eating your team's time. We'll scope a workflow audit and tell you honestly whether automation is worth it.</p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button href="/contact/" size="lg" className="w-full sm:w-auto">Book a Free Workflow Audit</Button>
                            <span className="flex items-center gap-2 text-sm text-text-muted"><CheckCircle className="h-4 w-4 text-emerald-400" /> No obligation, honest scoping</span>
                        </div>
                    </Motion.div>
                </div>
            </section>
        </PageLayout>
    );
}

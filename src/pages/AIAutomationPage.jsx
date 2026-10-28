import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { FounderBio } from '../components/FounderBio';
import { CTABand, FeatureRows, PageFAQ, PageHero, Section, TextLink } from '../components/PageBlocks';


const automations = [
    { title: 'Lead capture to CRM with auto follow-up', trigger: 'Contact form submission', steps: 'Add to CRM → AI-written personalised intro email → notify sales rep', tools: 'Zapier + HubSpot + ChatGPT plugin', build: '2–3 hours', save: '20–30 min/day' },
    { title: 'Invoice payment reminder sequence', trigger: 'Invoice due date approaching (3 days, 1 day, overdue)', steps: 'Send escalating reminders → log response in accounting software', tools: 'Zapier + Xero/Sage + Gmail', build: '1–2 hours', save: '1–2 hours/week' },
    { title: 'Meeting summary to team', trigger: 'Meeting ends in Teams or Zoom', steps: 'Auto-transcription → AI summary → emailed to attendees + logged to Notion', tools: 'Otter.ai/Fireflies + Zapier + Notion', build: '30 min setup', save: '20–30 min per meeting' },
    { title: 'Google review response pipeline', trigger: 'New Google review posted', steps: 'AI drafts professional response → owner reviews → response posted', tools: 'Zapier + ChatGPT + Google Business Profile', build: '2 hours', save: '15 min per review + faster response time' },
    { title: 'Social media publishing pipeline', trigger: 'Blog post or product update published', steps: 'AI generates 3 social variations (LinkedIn, Facebook, Instagram) → scheduled in Buffer', tools: 'Zapier + ChatGPT + Buffer', build: '2–3 hours', save: '45–60 min per post' },
].map((a) => ({
    title: a.title,
    body: a.steps,
    meta: `Trigger: ${a.trigger}. Tools: ${a.tools}. Build time: ${a.build}. Saves: ${a.save}.`,
}));

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

export function AIAutomationPage() {
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


            <PageHero
                eyebrow="AI workflow automation · South Africa"
                title="AI automation for South African businesses."
                intro="We automate the quoting, lead follow-up, invoicing and reporting work that eats a morning a week — connecting the tools you already use with Zapier, Make or n8n, so the repetitive part happens without you."
                primary={{ label: 'Book a free workflow audit', href: '/contact/' }}
                secondary={{ label: 'See what we automate', href: '#automations-built' }}
            />

            <Section id="worked-example" title="Lead capture, end to end." tone="paper">
                <div className="grid gap-x-10 md:grid-cols-2">
                    <div className="border-t border-ink/15 py-7">
                        <h3 className="mb-2 text-lg font-medium tracking-tight text-ink">Before</h3>
                        <p className="text-pretty leading-relaxed text-ink/70">A contact form submission sits in an inbox until someone notices it. A team member manually copies the details into a spreadsheet or CRM, writes an intro email from scratch, and pings the sales rep on WhatsApp. If it's a busy day, that can take hours — or fall through entirely.</p>
                    </div>
                    <div className="border-t border-accent-deep py-7">
                        <h3 className="mb-2 text-lg font-medium tracking-tight text-accent-deep">After</h3>
                        <p className="text-pretty leading-relaxed text-ink/70">The form submission lands in the CRM automatically. An AI-drafted, personalised intro email goes out within seconds. The assigned sales rep gets notified immediately. Nothing waits on someone remembering to check an inbox.</p>
                    </div>
                </div>
                <p className="border-t border-ink/15 pt-6 text-sm text-ink/70">
                    <span className="font-medium text-ink">Tools:</span> Zapier + CRM + ChatGPT plugin
                    <span className="mx-3 text-ink/30" aria-hidden="true">/</span>
                    <span className="font-medium text-ink">Build time:</span> 2–3 hours
                    <span className="mx-3 text-ink/30" aria-hidden="true">/</span>
                    <span className="font-medium text-ink">Saves:</span> 20–30 min/day
                </p>
            </Section>

            <Section
                id="automations-built"
                title="Five we build most often."
                intro="Each one below is something a reader will recognise as their own problem — not a hypothetical."
            >
                <FeatureRows items={automations} />
            </Section>

            <Section
                id="cost"
                title="Tool costs, honestly."
                intro="The automation tool itself is usually the cheap part. Build cost depends on how many steps and integrations are involved — a one-trigger automation like the invoice reminder above is a couple of hours' work; a multi-branch workflow with several tools takes longer. Book a free audit and we'll scope it before you commit to anything."
            >
                <table className="w-full border-t border-white/10 text-left text-sm sm:text-base">
                    <caption className="sr-only">Automation tools and approximate monthly prices in rand</caption>
                    <thead>
                        <tr className="border-b border-white/10 text-text-muted">
                            <th scope="col" className="py-4 pr-3 font-normal">Tool</th>
                            <th scope="col" className="py-4 pr-3 font-normal">Best for</th>
                            <th scope="col" className="py-4 font-normal">Price (ZAR approx)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tools.map((t) => (
                            <tr key={t.name} className="border-b border-white/10 align-top">
                                <th scope="row" className="py-5 pr-3 font-medium tracking-tight text-white">{t.name}</th>
                                <td className="py-5 pr-3 text-text-muted">{t.best}</td>
                                <td className="py-5 text-white">{t.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Section>

            <Section
                id="caveat"
                title="Where automation is the wrong answer."
                intro="One honest caveat."
            >
                <p className="max-w-3xl text-pretty text-lg leading-relaxed text-text-muted md:text-xl">If you're doing something twice a year, or the process changes every single time, automating it usually costs more in setup than it will ever save. We tell clients this upfront during the audit — building an automation nobody ends up using isn't a good use of anyone's budget, ours included.</p>
            </Section>

            <FounderBio />

            <PageFAQ faqs={faqs.map((f) => ({ q: f.q, a: f.a }))} title="Automation questions." />

            <section className="border-t border-white/10 bg-background py-12" aria-label="Related services">
                <div className="mx-auto flex max-w-[1400px] flex-col gap-x-10 gap-y-2 px-4 sm:flex-row sm:flex-wrap md:px-8">
                    <TextLink href="/blog/ai-automation-south-africa/">Read the full automation guide</TextLink>
                    <TextLink href="/voice-ai/">Explore Voice AI</TextLink>
                    <TextLink href="/ai-training/">Explore AI Training</TextLink>
                </div>
            </section>

            <CTABand
                title="Ready to automate the boring part?"
                body="Tell us what's eating your team's time. We'll scope a workflow audit and tell you honestly whether automation is worth it."
                primary={{ label: 'Book a free workflow audit', href: '/contact/' }}
            />
        </PageLayout>
    );
}

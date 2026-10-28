import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './ui/Button';

function selectContactSubject(subject) {
    window.sessionStorage.setItem('db23-contact-subject', subject);
    window.dispatchEvent(new CustomEvent('db23-contact-subject', { detail: { subject } }));
}

// Tracked-changes rows: the old way is struck out, the AI way is inserted.
const edits = [
    { lead: 'Your website', del: 'looks fine and sits there', ins: 'brings in enquiries', note: 'Website design', href: '#website-design' },
    { lead: 'Customers find you', del: 'by word of mouth only', ins: 'on Google and in AI answers', note: 'SEO, AEO & GEO', href: '#search' },
    { lead: 'Your hosting is', del: 'a login nobody remembers', ins: 'looked after by the team that built the site', note: 'Hosting & care', href: '#hosting' },
    { lead: 'Your team learns AI', del: 'one YouTube video at a time', ins: 'in one practical workshop', note: 'AI workshops', href: '#ai-workshops' },
    { lead: 'Your AI plan is', del: 'a vague intention', ins: 'a short list of steps that pay off', note: 'AI strategy', href: '#ai-workshops' },
    { lead: 'The phone gets answered', del: 'between 8 and 5', ins: 'at 2am on a Sunday', note: 'Example: Voice AI', href: '#ai-example' },
];

const ease = [0.16, 1, 0.3, 1];

function EditRow({ edit, index }) {
    return (
        <Motion.li
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            className="grid gap-4 border-t border-ink/15 py-8 md:grid-cols-12 md:gap-8 md:py-10"
        >
            <p className="text-pretty text-[1.75rem] font-medium leading-[1.15] tracking-[-0.03em] md:col-span-9 md:text-[2.6rem]">
                {edit.lead}{' '}
                {/* Background-drawn strike and highlight so both survive line wraps on mobile */}
                <Motion.del
                    variants={{ hidden: { backgroundSize: '0% 3px' }, show: { backgroundSize: '100% 3px' } }}
                    transition={{ duration: 0.6, delay: 0.15 + index * 0.05, ease }}
                    className="bg-[linear-gradient(var(--color-accent-deep),var(--color-accent-deep))] bg-[position:0_58%] bg-no-repeat text-ink/45 no-underline [box-decoration-break:clone]"
                >
                    {edit.del}
                </Motion.del>{' '}
                <Motion.ins
                    variants={{ hidden: { backgroundSize: '0% 100%' }, show: { backgroundSize: '100% 100%' } }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.05, ease }}
                    className="bg-[linear-gradient(var(--color-accent),var(--color-accent))] bg-left bg-no-repeat px-1.5 text-ink no-underline [box-decoration-break:clone]"
                >
                    {edit.ins}
                </Motion.ins>
                .
            </p>
            <a
                href={edit.href}
                className="group inline-flex items-start gap-1.5 self-end text-sm font-medium text-accent-deep md:col-span-3 md:justify-self-end md:pb-2"
            >
                {edit.note}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
        </Motion.li>
    );
}

export function PlainEnglishAI() {
    return (
        <section
            className="relative overflow-hidden bg-paper py-24 text-ink md:py-36"
            id="plain-english-ai"
            aria-labelledby="plain-english-heading"
        >
            <div className="paper-grid pointer-events-none absolute inset-0" aria-hidden="true" />

            {/* Side rail note, desktop only */}
            <p
                className="absolute right-6 top-1/2 hidden origin-center -translate-y-1/2 rotate-90 text-xs tracking-wide text-ink/50 xl:block"
                aria-hidden="true"
            >
                Tracked changes: on
            </p>

            <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
                <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12">
                    <h2
                        id="plain-english-heading"
                        className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.04em] md:col-span-7 md:text-6xl"
                    >
                        What changes when your website and your AI plan both work.
                    </h2>
                    <p className="text-pretty text-lg leading-relaxed text-ink/70 md:col-span-4 md:col-start-9 md:self-end">
                        No jargon, no hype. A small business needs to be found, look credible, and use AI where it
                        genuinely saves time. Here is the before and after.
                    </p>
                </div>

                <ol>
                    {edits.map((edit, i) => (
                        <EditRow key={edit.lead} edit={edit} index={i} />
                    ))}
                </ol>

                <div className="mt-6 flex flex-col gap-6 border-t border-ink/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-md text-ink/70">
                        Tell us where you are now. We will tell you, in plain English, what to fix first.
                    </p>
                    <Button
                        href="#contact"
                        size="lg"
                        className="w-full focus-visible:ring-offset-paper sm:w-auto"
                        onClick={() => selectContactSubject('Start a Project')}
                    >
                        Start a project
                    </Button>
                </div>
            </div>
        </section>
    );
}

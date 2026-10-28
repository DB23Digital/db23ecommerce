import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { Check, RotateCcw } from 'lucide-react';

// Scripted, not live: no API calls. Businesses are fictional on purpose.
const scripts = [
    {
        id: 'dental',
        label: 'Dental practice',
        channel: 'WhatsApp',
        messages: [
            { from: 'customer', text: 'Hi, I chipped a tooth. Can someone see me this week?' },
            { from: 'ai', text: 'Sorry to hear that. The dentist has Thursday 08:15 or Friday 14:30 open. Which suits you?' },
            { from: 'customer', text: 'Friday please.' },
            { from: 'ai', text: 'Done: Friday 14:30. You will get an SMS reminder the day before.' },
        ],
        outcome: ['Booked Friday 14:30', 'Added to the practice diary', 'Reminder SMS scheduled'],
    },
    {
        id: 'lodge',
        label: 'Safari lodge',
        channel: 'Website chat',
        messages: [
            { from: 'customer', text: 'Do you have a room for 2 adults, 12 to 15 March?' },
            { from: 'ai', text: 'Yes, a river-view suite is open for those three nights, with dinner and game drives included. Shall I hold it for 24 hours?' },
            { from: 'customer', text: 'Yes please.' },
            { from: 'ai', text: 'Held until 18:00 tomorrow. I have emailed you the booking form and a secure payment link.' },
        ],
        outcome: ['Suite held for 24 hours', 'Booking form emailed', 'Lead added to the CRM'],
    },
    {
        id: 'plumber',
        label: 'Plumber',
        channel: 'Phone call',
        messages: [
            { from: 'customer', text: 'My geyser is leaking and there is water everywhere.' },
            { from: 'ai', text: 'Switch off the geyser at the DB board and close the main water valve. What is your address?' },
            { from: 'customer', text: 'Table View, near the beach.' },
            { from: 'ai', text: 'Thanks. A plumber is on the way, about 45 minutes. You will get his name and number by SMS.' },
        ],
        outcome: ['Emergency job logged', 'Nearest plumber dispatched', 'Customer SMS sent'],
    },
];

const TYPING_MS = 1100;
const GAP_MS = 650;

export function ReceptionistDemo() {
    const reduceMotion = useReducedMotion();
    const [active, setActive] = useState(0);
    const [run, setRun] = useState(0);
    // Timeline state is tagged with the run it belongs to, so a tab switch or
    // replay starts from zero without a synchronous reset inside the effect.
    const [timeline, setTimeline] = useState({ key: '', step: 0, typing: false });
    const threadRef = useRef(null);
    const rootRef = useRef(null);
    const [inView, setInView] = useState(false);

    // Hold the first run until the phone is on screen.
    useEffect(() => {
        const el = rootRef.current;
        if (!el || inView) return undefined;
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setInView(true);
        }, { threshold: 0.4 });
        io.observe(el);
        return () => io.disconnect();
    }, [inView]);

    const script = scripts[active];
    const total = script.messages.length;
    const runKey = `${active}-${run}`;
    const current = timeline.key === runKey;

    // step = messages shown; total + 1 also shows the outcome
    const step = reduceMotion ? total + 1 : current ? timeline.step : 0;
    const typing = !reduceMotion && current && timeline.typing;

    useEffect(() => {
        if (reduceMotion || !inView) return undefined;
        const timers = [];
        let t = 500;
        for (let i = 0; i < total; i += 1) {
            timers.push(setTimeout(() => setTimeline({ key: runKey, step: i, typing: true }), t));
            t += TYPING_MS;
            timers.push(setTimeout(() => setTimeline({ key: runKey, step: i + 1, typing: false }), t));
            t += GAP_MS;
        }
        timers.push(setTimeout(() => setTimeline({ key: runKey, step: total + 1, typing: false }), t + 200));
        return () => timers.forEach(clearTimeout);
    }, [runKey, reduceMotion, total, inView]);

    useEffect(() => {
        const el = threadRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
    }, [step, typing, reduceMotion]);

    const nextFrom = script.messages[step]?.from;
    const done = step > total;

    return (
        <div ref={rootRef} className="w-full">
            <div role="tablist" aria-label="Pick a business" className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-1">
                <span className="w-full text-sm text-text-muted sm:w-auto">Pick a business:</span>
                {scripts.map((s, i) => (
                    <button
                        key={s.id}
                        role="tab"
                        id={`demo-tab-${s.id}`}
                        aria-selected={active === i}
                        aria-controls="demo-thread"
                        onClick={() => {
                            setActive(i);
                            setRun((r) => r + 1);
                        }}
                        className={`relative py-2 text-sm font-medium transition-colors ${
                            active === i ? 'text-white' : 'text-text-muted hover:text-white'
                        }`}
                    >
                        {s.label}
                        <span
                            className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent transition-transform duration-300 ${
                                active === i ? 'scale-x-100' : 'scale-x-0'
                            }`}
                        />
                    </button>
                ))}
            </div>

            {/* Phone */}
            <div className="relative mx-auto w-full max-w-[380px] rounded-[2.6rem] border border-white/15 bg-[#121513] p-2.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                <div className="overflow-hidden rounded-[2.1rem] bg-[#0f1211]">
                    <div className="flex items-center justify-between border-b border-white/10 px-5 pb-3 pt-4">
                        <div>
                            <p className="text-sm font-semibold text-white">{script.label}</p>
                            <p className="flex items-center gap-1.5 text-xs text-text-muted">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                                AI receptionist · {script.channel}
                            </p>
                        </div>
                        <span className="text-xs text-text-muted">24/7</span>
                    </div>

                    <div
                        id="demo-thread"
                        role="tabpanel"
                        aria-labelledby={`demo-tab-${script.id}`}
                        ref={threadRef}
                        className="h-[340px] space-y-3 overflow-y-auto px-4 py-5 [scrollbar-width:none] md:h-[380px]"
                    >
                        <ol className="space-y-3" aria-live="polite">
                            {script.messages.slice(0, Math.min(step, total)).map((m, i) => (
                                <Motion.li
                                    key={`${script.id}-${run}-${i}`}
                                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    className={`flex ${m.from === 'ai' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <p
                                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.9rem] leading-snug ${
                                            m.from === 'ai'
                                                ? 'rounded-br-md bg-paper text-ink'
                                                : 'rounded-bl-md bg-white/[0.08] text-white'
                                        }`}
                                    >
                                        <span className="sr-only">{m.from === 'ai' ? 'AI receptionist: ' : 'Customer: '}</span>
                                        {m.text}
                                    </p>
                                </Motion.li>
                            ))}
                        </ol>

                        {typing && (
                            <div className={`flex ${nextFrom === 'ai' ? 'justify-end' : 'justify-start'}`} aria-hidden="true">
                                <span className={`flex gap-1 rounded-2xl px-4 py-3 ${nextFrom === 'ai' ? 'bg-paper/80' : 'bg-white/[0.08]'}`}>
                                    {[0, 1, 2].map((d) => (
                                        <span key={d} className={`typing-dot h-1.5 w-1.5 rounded-full ${nextFrom === 'ai' ? 'bg-ink' : 'bg-white'}`} />
                                    ))}
                                </span>
                            </div>
                        )}

                        <AnimatePresence>
                            {done && (
                                <Motion.div
                                    key={`outcome-${script.id}-${run}`}
                                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                    className="mt-2 border-t border-dashed border-white/15 pt-4"
                                >
                                    <p className="mb-2 text-xs text-text-muted">What happened behind the scenes</p>
                                    <ul className="space-y-1.5">
                                        {script.outcome.map((o) => (
                                            <li key={o} className="flex items-center gap-2 text-sm text-white">
                                                <Check className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                                                {o}
                                            </li>
                                        ))}
                                    </ul>
                                </Motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-4 flex max-w-[380px] items-center justify-between text-xs text-text-muted">
                <span>Sample conversation, scripted for this demo.</span>
                <button
                    onClick={() => setRun((r) => r + 1)}
                    className="inline-flex items-center gap-1.5 py-2 transition-colors hover:text-white"
                >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Replay
                </button>
            </div>
        </div>
    );
}

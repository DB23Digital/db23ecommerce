import React from 'react';
import { Play, Video } from 'lucide-react';

const videoTypes = ['AI demos', 'Workshop clips', 'Voice AI walkthroughs', 'Case studies'];

export function VideoReady() {
    return (
        <section className="bg-background py-24 md:py-32" id="resources" aria-labelledby="video-ready-heading">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(340px,0.75fr)] lg:items-center">
                    <div className="max-w-3xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Video Ready</p>
                        <h2 id="video-ready-heading" className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">
                            Built for future AI demos, walkthroughs, and case studies
                        </h2>
                        <p className="text-lg leading-relaxed text-text-muted">
                            The site is structured so workshop clips, AI demos, voice AI recordings, and client walkthroughs
                            can be embedded cleanly as the content library grows.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-card/70 p-5">
                        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-white/10">
                            <img
                                src="/assets/showcase/boardroom-workshop.webp"
                                alt="AI Business Modernization Strategy Workshop led by Deon"
                                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/35" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(59,130,246,0.2),transparent_34%)]" />
                        </div>
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            {videoTypes.map((type) => (
                                <div key={type} className="flex items-center gap-3 rounded-xl bg-background/75 px-4 py-3">
                                    <Video className="h-4 w-4 text-accent" aria-hidden="true" />
                                    <span className="text-sm font-semibold text-white">{type}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

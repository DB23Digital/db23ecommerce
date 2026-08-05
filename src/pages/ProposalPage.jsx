import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function ProposalPage() {
    return (
        <PageLayout>
            <SEOHead
                title="Proposal: Safi-Kwanza & Ahrem Developments | DB23 Ecommerce"
                description="Digital proposal for web design and development services from DB23 Ecommerce."
                canonical="https://db23.co.za/proposal"
            />

            {/* Main Content Container */}
            <main className="relative min-h-screen pt-24 pb-12 flex flex-col justify-center overflow-hidden bg-background z-10">
                <div className="absolute top-0 w-full h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2" />
                
                <div className="container relative z-20 mx-auto px-4 md:px-8 mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                        Project Proposal
                    </h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Prepared by DB23 Ecommerce for Safi-Kwanza and Ahrem Developments.
                    </p>
                </div>

                <div className="container relative z-20 mx-auto px-4 md:px-8 max-w-6xl">
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Safi-Kwanza Card */}
                        <div className="bg-surface/50 border border-white/5 rounded-2xl p-10 backdrop-blur-sm flex flex-col hover:bg-surface transition-colors shadow-2xl">
                            <div className="mb-8 h-48 flex items-center justify-center bg-white/5 rounded-xl p-2 overflow-hidden">
                                <img 
                                    src="/assets/showcase/safi-kwanza.jpg" 
                                    alt="Safi-Kwanza Logo" 
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            
                            <h2 className="text-2xl font-bold text-white mb-2">Safi-Kwanza</h2>
                            <p className="text-text-muted mb-6">Website Design & Development</p>
                            
                            <div className="space-y-4 mb-8 flex-grow">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-white">Website Build & Deployment</h3>
                                        <p className="text-sm text-text-muted mt-1">Complete design, development, and launch of the Safi-Kwanza website.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-white">Monthly Retainer</h3>
                                        <p className="text-sm text-text-muted mt-1">Ongoing maintenance and updates for ad-hoc special offers or promotions.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border-t border-white/10 pt-6 mt-auto">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-text-muted">Build & Deployment</span>
                                    <span className="font-bold text-white">R5,000</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-text-muted">Monthly Retainer</span>
                                    <span className="font-bold text-accent">R500 / month</span>
                                </div>
                            </div>
                        </div>

                        {/* Ahrem Developments Card */}
                        <div className="bg-surface/50 border border-white/5 rounded-2xl p-10 backdrop-blur-sm flex flex-col hover:bg-surface transition-colors shadow-2xl">
                            <div className="mb-8 h-48 flex items-center justify-center bg-white/5 rounded-xl p-2 overflow-hidden">
                                <img 
                                    src="/assets/showcase/ahrem-dev.webp" 
                                    alt="Ahrem Developments Logo" 
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            
                            <h2 className="text-2xl font-bold text-white mb-2">Ahrem Developments</h2>
                            <p className="text-text-muted mb-6">Website Design & Development</p>
                            
                            <div className="space-y-4 mb-8 flex-grow">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-white">Website Build & Deployment</h3>
                                        <p className="text-sm text-text-muted mt-1">Complete design, development, and launch of the Ahrem Developments website.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-accent/50 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-text-muted">Additional Scope</h3>
                                        <p className="text-sm text-text-muted mt-1">Any additional work outside the initial website build and deployment will be quoted separately.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border-t border-white/10 pt-6 mt-auto">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-text-muted">Build & Deployment</span>
                                    <span className="font-bold text-white">R5,000</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-text-muted">Additional Work</span>
                                    <span className="font-bold text-accent">Quoted Separately</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to proceed?</h3>
                        <p className="text-text-muted mb-8 max-w-2xl mx-auto">
                            If you are happy with the proposed scope and pricing, let's get started on bringing your vision to life.
                        </p>
                        <a 
                            href="mailto:deon@db23.co.za?subject=Proposal accepted for both websites" 
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-10 py-5 text-lg font-semibold text-white transition hover:bg-accent-hover hover:scale-105"
                        >
                            Accept Proposal <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </main>
        </PageLayout>
    );
}

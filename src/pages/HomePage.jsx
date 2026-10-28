import React from 'react';
import { MotionConfig } from 'framer-motion';
import { Hero } from '../components/Hero';
import { ServicesGrid } from '../components/ServicesGrid';
import { SelectedWork } from '../components/SelectedWork';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Features } from '../components/Features';
import { AITraining } from '../components/AITraining';
import { FAQ } from '../components/FAQ';
import { BottomCTA } from '../components/BottomCTA';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { PlainEnglishAI } from '../components/PlainEnglishAI';
import { SEOHead } from '../components/SEOHead';
import { SiteHeader } from '../components/SiteHeader';
import { ImplementationExample } from '../components/ImplementationExample';

export function HomePage() {
    return (
        <MotionConfig reducedMotion="user">
            <div className="min-h-screen bg-background text-text-main font-sans selection:bg-accent selection:text-ink overflow-x-clip">
                <SEOHead
                    title="DB23 | Website Design, SEO & AI Workshops, Cape Town"
                    description="Website design, hosting, SEO and AI search visibility for South African small businesses, plus practical AI workshops and strategy. Based in Cape Town."
                    canonical="https://db23.co.za/"
                    keywords="website design Cape Town, website hosting South Africa, SEO services South Africa, AI search optimisation, AI workshops South Africa"
                    ogTitle="DB23 | Website Design, SEO & AI Workshops, Cape Town"
                    ogDescription="Website design, hosting, SEO and AI search visibility for South African small businesses, plus practical AI workshops and strategy. Based in Cape Town."
                />

                <SiteHeader />

                <main>
                    <Hero />
                    <PlainEnglishAI />
                    <ServicesGrid />
                    <SelectedWork />
                    <AITraining />
                    <ImplementationExample />
                    <Features />
                    <WhyChooseUs />
                    <FAQ />
                    <BottomCTA />
                    <ContactForm withDetails />
                </main>
                <Footer />
            </div>
        </MotionConfig>
    );
}

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CurrencyProvider } from './components/CurrencyContext';

// All pages eagerly imported — lazy() is not supported in renderToString
import { HomePage }               from './pages/HomePage';
import { AIWorkshopsPage }        from './pages/AIWorkshopsPage';
import { VoiceAIPage }            from './pages/VoiceAIPage';
import { AIAutomationPage }       from './pages/AIAutomationPage';
import { AITrainingPage }         from './pages/AITrainingPage';
import { DigitalMarketingPage }   from './pages/DigitalMarketingPage';
import { OutsourcedMarketingPage } from './pages/OutsourcedMarketingPage';
import { WebsiteDesignPage }      from './pages/WebsiteDesignPage';
import { SEOServicesPage }        from './pages/SEOServicesPage';
import { AboutPage }              from './pages/AboutPage';
import { ContactPage }            from './pages/ContactPage';
import { ClubScrubPage }          from './pages/ClubScrubPage';
import { BlogPage }               from './pages/BlogPage';
import { BlogPostPage }           from './pages/BlogPostPage';
import { WorkIndexPage }          from './pages/WorkIndexPage';
import { WorkCaseStudyPage }      from './pages/WorkCaseStudyPage';

export function AppSSR() {
    return (
        <CurrencyProvider>
            <Routes>
                <Route path="/"                        element={<HomePage />} />
                <Route path="/ai-workshops"            element={<AIWorkshopsPage />} />
                <Route path="/ai-workshops/"           element={<AIWorkshopsPage />} />
                <Route path="/voice-ai"                element={<VoiceAIPage />} />
                <Route path="/voice-ai/"               element={<VoiceAIPage />} />
                <Route path="/ai-automation"           element={<AIAutomationPage />} />
                <Route path="/ai-automation/"          element={<AIAutomationPage />} />
                <Route path="/ai-training"             element={<AITrainingPage />} />
                <Route path="/ai-training/"            element={<AITrainingPage />} />
                <Route path="/digital-marketing"       element={<DigitalMarketingPage />} />
                <Route path="/digital-marketing/"      element={<DigitalMarketingPage />} />
                <Route path="/outsourced-marketing"    element={<OutsourcedMarketingPage />} />
                <Route path="/outsourced-marketing/"   element={<OutsourcedMarketingPage />} />
                <Route path="/website-design"          element={<WebsiteDesignPage />} />
                <Route path="/website-design/"         element={<WebsiteDesignPage />} />
                <Route path="/seo-services"            element={<SEOServicesPage />} />
                <Route path="/seo-services/"           element={<SEOServicesPage />} />
                <Route path="/about"                   element={<AboutPage />} />
                <Route path="/about/"                  element={<AboutPage />} />
                <Route path="/contact"                 element={<ContactPage />} />
                <Route path="/contact/"                element={<ContactPage />} />
                <Route path="/club-scrub"              element={<ClubScrubPage />} />
                <Route path="/club-scrub/"             element={<ClubScrubPage />} />
                <Route path="/blog"                    element={<BlogPage />} />
                <Route path="/blog/"                   element={<BlogPage />} />
                <Route path="/blog/:slug"              element={<BlogPostPage />} />
                <Route path="/blog/:slug/"             element={<BlogPostPage />} />
                <Route path="/work"                    element={<WorkIndexPage />} />
                <Route path="/work/"                   element={<WorkIndexPage />} />
                <Route path="/work/:slug"              element={<WorkCaseStudyPage />} />
                <Route path="/work/:slug/"             element={<WorkCaseStudyPage />} />
                <Route path="/home"                    element={<Navigate to="/" replace />} />
                <Route path="/home/"                   element={<Navigate to="/" replace />} />
            </Routes>
        </CurrencyProvider>
    );
}

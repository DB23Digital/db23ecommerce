import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CurrencyProvider } from './components/CurrencyContext';

// Eagerly load the home page (above-the-fold priority)
import { HomePage } from './pages/HomePage';

// Lazy-load all other routes — each gets its own JS chunk
const AIWorkshopsPage       = lazy(() => import('./pages/AIWorkshopsPage').then(m => ({ default: m.AIWorkshopsPage })));
const VoiceAIPage           = lazy(() => import('./pages/VoiceAIPage').then(m => ({ default: m.VoiceAIPage })));
const AIAutomationPage      = lazy(() => import('./pages/AIAutomationPage').then(m => ({ default: m.AIAutomationPage })));
const AITrainingPage        = lazy(() => import('./pages/AITrainingPage').then(m => ({ default: m.AITrainingPage })));
const DigitalMarketingPage  = lazy(() => import('./pages/DigitalMarketingPage').then(m => ({ default: m.DigitalMarketingPage })));
const OutsourcedMarketingPage = lazy(() => import('./pages/OutsourcedMarketingPage').then(m => ({ default: m.OutsourcedMarketingPage })));
const WebsiteDesignPage     = lazy(() => import('./pages/WebsiteDesignPage').then(m => ({ default: m.WebsiteDesignPage })));
const SEOServicesPage       = lazy(() => import('./pages/SEOServicesPage').then(m => ({ default: m.SEOServicesPage })));
const AboutPage             = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage           = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const ProposalPage          = lazy(() => import('./pages/ProposalPage').then(m => ({ default: m.ProposalPage })));
const BlogPage              = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage          = lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const ClubScrubPage         = lazy(() => import('./pages/ClubScrubPage').then(m => ({ default: m.ClubScrubPage })));
const WorkIndexPage         = lazy(() => import('./pages/WorkIndexPage').then(m => ({ default: m.WorkIndexPage })));
const WorkCaseStudyPage     = lazy(() => import('./pages/WorkCaseStudyPage').then(m => ({ default: m.WorkCaseStudyPage })));
const FoldlinePage          = lazy(() => import('./pages/FoldlinePage').then(m => ({ default: m.FoldlinePage })));
const FoldlineBenchmarkPage = lazy(() => import('./pages/FoldlineBenchmarkPage').then(m => ({ default: m.FoldlineBenchmarkPage })));

function PageLoader() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </div>
    );
}

function App() {
    return (
        <CurrencyProvider>
            <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/"                        element={<HomePage />} />
                        <Route path="/home"                    element={<Navigate to="/" replace />} />
                        <Route path="/home/"                   element={<Navigate to="/" replace />} />
                        <Route path="/ai-workshops/"           element={<AIWorkshopsPage />} />
                        <Route path="/ai-workshops"            element={<AIWorkshopsPage />} />
                        <Route path="/voice-ai/"               element={<VoiceAIPage />} />
                        <Route path="/voice-ai"                element={<VoiceAIPage />} />
                        <Route path="/ai-automation/"          element={<AIAutomationPage />} />
                        <Route path="/ai-automation"           element={<AIAutomationPage />} />
                        <Route path="/ai-training/"            element={<AITrainingPage />} />
                        <Route path="/ai-training"             element={<AITrainingPage />} />
                        <Route path="/digital-marketing/"      element={<DigitalMarketingPage />} />
                        <Route path="/digital-marketing"       element={<DigitalMarketingPage />} />
                        <Route path="/outsourced-marketing/"   element={<OutsourcedMarketingPage />} />
                        <Route path="/outsourced-marketing"    element={<OutsourcedMarketingPage />} />
                        <Route path="/website-design/"         element={<WebsiteDesignPage />} />
                        <Route path="/website-design"          element={<WebsiteDesignPage />} />
                        <Route path="/seo-services/"           element={<SEOServicesPage />} />
                        <Route path="/seo-services"            element={<SEOServicesPage />} />
                        <Route path="/about/"                  element={<AboutPage />} />
                        <Route path="/about"                   element={<AboutPage />} />
                        <Route path="/contact/"                element={<ContactPage />} />
                        <Route path="/contact"                 element={<ContactPage />} />
                        <Route path="/proposal"                element={<ProposalPage />} />
                        <Route path="/blog/"                   element={<BlogPage />} />
                        <Route path="/blog"                    element={<BlogPage />} />
                        <Route path="/blog/:slug/"             element={<BlogPostPage />} />
                        <Route path="/blog/:slug"              element={<BlogPostPage />} />
                        <Route path="/club-scrub/"             element={<ClubScrubPage />} />
                        <Route path="/club-scrub"              element={<ClubScrubPage />} />
                        <Route path="/work/"                   element={<WorkIndexPage />} />
                        <Route path="/work"                    element={<WorkIndexPage />} />
                        <Route path="/work/:slug/"             element={<WorkCaseStudyPage />} />
                        <Route path="/work/:slug"              element={<WorkCaseStudyPage />} />
                        <Route path="/foldline/"               element={<FoldlinePage />} />
                        <Route path="/foldline"                element={<FoldlinePage />} />
                        <Route path="/foldline/benchmark/"     element={<FoldlineBenchmarkPage />} />
                        <Route path="/foldline/benchmark"      element={<FoldlineBenchmarkPage />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </CurrencyProvider>
    );
}

export default App;

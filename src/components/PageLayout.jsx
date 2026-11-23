import React from 'react';
import { Footer } from './Footer';
import { SiteHeader } from './SiteHeader';

export function PageLayout({ children }) {
    return (
        <div className="min-h-screen bg-background text-text-main font-sans selection:bg-accent selection:text-ink overflow-x-clip">
            <SiteHeader showCurrency />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

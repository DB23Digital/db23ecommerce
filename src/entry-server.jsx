import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppSSR } from './AppSSR';

/**
 * render(url) — called by prerender.mjs for each route.
 * Returns the pre-rendered HTML string and the collected Helmet context
 * (title, meta, link, script tags to inject into <head>).
 */
export function render(url) {
    const helmetContext = {};

    const html = renderToString(
        <HelmetProvider context={helmetContext}>
            <StaticRouter location={url}>
                <AppSSR />
            </StaticRouter>
        </HelmetProvider>
    );

    return { html, helmet: helmetContext.helmet };
}

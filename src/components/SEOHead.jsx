import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEOHead — Injects per-route meta into <head> via react-helmet-async.
 * Works both server-side (SSG prerender) and client-side (SPA hydration).
 *
 * Props:
 *   title, description, canonical, keywords
 *   ogTitle, ogDescription, ogImage
 *   schema — JSON-LD object or array (BreadcrumbList, FAQPage, etc.)
 */
export function SEOHead({
    title,
    description,
    canonical,
    keywords = '',
    ogTitle,
    ogDescription,
    ogImage = 'https://db23.co.za/og-image.png',
    schema = null,
}) {
    const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
    const resolvedOgTitle = ogTitle || title;
    const resolvedOgDesc  = ogDescription || description;

    return (
        <Helmet>
            {title        && <title>{title}</title>}
            {description  && <meta name="description" content={description} />}
            {keywords     && <meta name="keywords"    content={keywords} />}
            {canonical    && <link rel="canonical"    href={canonical} />}

            {/* Open Graph — per-page values */}
            {canonical        && <meta property="og:url"         content={canonical} />}
            {resolvedOgTitle  && <meta property="og:title"       content={resolvedOgTitle} />}
            {resolvedOgDesc   && <meta property="og:description" content={resolvedOgDesc} />}
            {ogImage          && <meta property="og:image"       content={ogImage} />}

            {/* Twitter / X Card — per-page values */}
            {canonical        && <meta name="twitter:url"         content={canonical} />}
            {resolvedOgTitle  && <meta name="twitter:title"       content={resolvedOgTitle} />}
            {resolvedOgDesc   && <meta name="twitter:description" content={resolvedOgDesc} />}

            {/* Per-page JSON-LD (BreadcrumbList, FAQPage, etc.) */}
            {schemas.map((s, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(s)}
                </script>
            ))}
        </Helmet>
    );
}

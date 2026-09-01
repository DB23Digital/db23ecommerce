import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = [
    { url: '/',                      outDir: 'dist' },
    { url: '/ai-workshops/',         outDir: 'dist/ai-workshops' },
    { url: '/voice-ai/',             outDir: 'dist/voice-ai' },
    { url: '/ai-automation/',        outDir: 'dist/ai-automation' },
    { url: '/ai-training/',          outDir: 'dist/ai-training' },
    { url: '/digital-marketing/',    outDir: 'dist/digital-marketing' },
    { url: '/website-design/',       outDir: 'dist/website-design' },
    { url: '/outsourced-marketing/', outDir: 'dist/outsourced-marketing' },
    { url: '/seo-services/',         outDir: 'dist/seo-services' },
    { url: '/about/',                outDir: 'dist/about' },
    { url: '/contact/',              outDir: 'dist/contact' },
    { url: '/club-scrub/',                                    outDir: 'dist/club-scrub' },
    { url: '/work/',                                          outDir: 'dist/work' },
    { url: '/blog/',                                          outDir: 'dist/blog' },
    { url: '/blog/ai-strategy-south-africa/',                 outDir: 'dist/blog/ai-strategy-south-africa' },
    { url: '/blog/how-to-implement-ai-south-africa/',         outDir: 'dist/blog/how-to-implement-ai-south-africa' },
    { url: '/blog/ai-for-smes-south-africa/',                 outDir: 'dist/blog/ai-for-smes-south-africa' },
    { url: '/blog/ai-readiness-south-africa/',                outDir: 'dist/blog/ai-readiness-south-africa' },
    { url: '/blog/best-ai-tools-south-africa/',               outDir: 'dist/blog/best-ai-tools-south-africa' },
    { url: '/blog/chatgpt-for-business-south-africa/',        outDir: 'dist/blog/chatgpt-for-business-south-africa' },
    { url: '/blog/ai-automation-south-africa/',               outDir: 'dist/blog/ai-automation-south-africa' },
    { url: '/blog/ai-receptionist-south-africa/',             outDir: 'dist/blog/ai-receptionist-south-africa' },
    { url: '/blog/ai-vs-human-receptionist-south-africa/',    outDir: 'dist/blog/ai-vs-human-receptionist-south-africa' },
    { url: '/blog/voice-ai-small-business-south-africa/',     outDir: 'dist/blog/voice-ai-small-business-south-africa' },
    { url: '/blog/ai-workshop-cost-south-africa/',            outDir: 'dist/blog/ai-workshop-cost-south-africa' },
    { url: '/blog/what-to-expect-ai-workshop/',               outDir: 'dist/blog/what-to-expect-ai-workshop' },
    { url: '/blog/ai-workshop-for-employees/',                outDir: 'dist/blog/ai-workshop-for-employees' },
    { url: '/blog/chatgpt-workshop-south-africa/',            outDir: 'dist/blog/chatgpt-workshop-south-africa' },
    { url: '/blog/roi-remote-corporate-ai-training/',         outDir: 'dist/blog/roi-remote-corporate-ai-training' },
    { url: '/blog/chatgpt-business-global-marketing-guide/',  outDir: 'dist/blog/chatgpt-business-global-marketing-guide' },
    { url: '/foldline/',                                      outDir: 'dist/foldline' },
    { url: '/foldline/benchmark/',                            outDir: 'dist/foldline/benchmark' },
];

const template = fs.readFileSync(path.join(__dirname, 'dist/index.html'), 'utf-8');

// React 19 + react-helmet-async v3: metadata tags appear at the START of renderToString
// output (before any <div>) rather than via the Helmet context object.
// Split at the first <div to separate head elements from the body tree.
const splitRenderedHtml = (html) => {
    const firstDiv = html.indexOf('<div');
    if (firstDiv === -1) return { headHtml: '', bodyHtml: html };
    return {
        headHtml: html.substring(0, firstDiv).trim(),
        bodyHtml: html.substring(firstDiv),
    };
};

// Safe replacement: avoids JS regex $& / $' / $` special-pattern expansion in
// the replacement string by using a replacer function instead of a string literal.
const safeReplace = (str, search, replacement) =>
    str.replace(search, () => replacement);

const entryUrl = pathToFileURL(path.join(__dirname, 'dist/entry-server.js')).href;
const { render } = await import(entryUrl);

console.log('\nPre-rendering routes...');

for (const { url, outDir } of routes) {
    const { html: appHtml } = render(url);
    const { headHtml, bodyHtml } = splitRenderedHtml(appHtml);

    let pageHtml = template;

    // 1. Replace <title> with per-page title
    const titleMatch = headHtml.match(/<title>([^<]*)<\/title>/);
    if (titleMatch) {
        pageHtml = safeReplace(
            pageHtml,
            /<title>[^<]*<\/title>/,
            `<title>${titleMatch[1]}</title>`
        );
    }

    // 2. Inject per-page meta/link/script tags before </head>
    //    (Vite strips HTML comments, so we inject before </head> instead)
    const headWithoutTitle = headHtml.replace(/<title>[^<]*<\/title>/, '').trim();
    if (headWithoutTitle) {
        pageHtml = safeReplace(pageHtml, '</head>', `${headWithoutTitle}\n</head>`);
    }

    // 3. Inject pre-rendered body HTML into the root div
    pageHtml = safeReplace(pageHtml, '<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

    const absOutDir = path.join(__dirname, outDir);
    fs.mkdirSync(absOutDir, { recursive: true });
    fs.writeFileSync(path.join(absOutDir, 'index.html'), pageHtml, 'utf-8');

    console.log(`  ✓  ${url}`);
}

console.log('\nPre-render complete.\n');

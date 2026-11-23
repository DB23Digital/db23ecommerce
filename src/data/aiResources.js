// Free AI resources. Both are separate static sites in public_html/ai-academy/ and
// public_html/prompt-library/, not React routes: link with plain <a href>, never
// add them to the router or prerender list, and never ship those folders in dist/.
// Descriptions match what is live on 23/11/2026; update them if either site changes.
export const aiResources = [
    {
        name: 'AI Academy',
        fullName: 'DB23 AI Academy',
        href: '/ai-academy/',
        tagline: 'Learn AI',
        step: 'Learn it',
        headline: 'Learn AI in plain English.',
        body: 'Free illustrated lessons, everyday examples, interactive exercises and a searchable glossary to help you understand AI, from the fundamentals to coding agents.',
        includes: ['A “start here” path by confidence level', 'Lessons from what AI is to coding agents', 'Searchable A–Z glossary', 'Interactive learning lab'],
        cta: 'Explore the AI Academy',
    },
    {
        name: 'AI Prompt Library',
        fullName: 'DB23 AI Prompt Library',
        href: '/prompt-library/',
        tagline: 'Put AI to work',
        step: 'Apply it',
        headline: 'Turn AI knowledge into practical results.',
        body: 'Copyable prompts, templates and workflows for writing and marketing, websites, visual content, AI operations and coding. Each one explains what to replace and how to check the result.',
        includes: ['Writing and marketing', 'Websites and UX', 'Visual content', 'AI coding and operations'],
        cta: 'Explore the Prompt Library',
    },
];

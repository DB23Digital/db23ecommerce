import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import { PageHero } from '../components/PageBlocks';

const posts = [
    {
        slug: 'roi-remote-corporate-ai-training',
        title: 'The ROI of Remote Corporate AI Training for Distributed Teams',
        excerpt: 'Discover how virtual artificial intelligence training delivers measurable ROI, enhances productivity, and empowers distributed teams to scale business operations.',
        image: '/assets/blog/roi_remote_ai_training.webp',
        date: 'May 26, 2026',
        readTime: '6 min read',
        category: 'AI & Training',
        tags: ['Virtual AI Workshops', 'Remote AI Training', 'Corporate AI Enablement']
    },
    {
        slug: 'chatgpt-business-global-marketing-guide',
        title: 'ChatGPT for Business: A Training Guide for Global Marketing Teams',
        excerpt: 'Empower your global marketing teams with remote ChatGPT for business training. Learn steps to scale content production, optimize campaigns, and maintain brand voice.',
        image: '/assets/blog/chatgpt_marketing_guide.webp',
        date: 'May 26, 2026',
        readTime: '7 min read',
        category: 'Digital Marketing',
        tags: ['ChatGPT for Business', 'Generative AI', 'Marketing Teams']
    },
    {
        slug: 'ai-strategy-south-africa',
        title: 'AI Strategy for South African Businesses: The Complete Framework',
        excerpt: 'A practical AI strategy framework for SA businesses — how to assess readiness, prioritise use cases, build a roadmap, manage change, and measure outcomes.',
        image: '/assets/blog/ai_strategy_south_africa.webp',
        date: 'June 29, 2026',
        readTime: '9 min read',
        category: 'AI Strategy',
        tags: ['AI Strategy', 'South Africa', 'Business Leadership']
    },
    {
        slug: 'how-to-implement-ai-south-africa',
        title: 'How to Implement AI in Your South African Business (Step-by-Step)',
        excerpt: 'A practical 6-step AI implementation guide for SA businesses. Includes POPIA compliance, common pitfalls, and the workflow-first methodology DB23 uses with SA clients.',
        image: '/assets/blog/how_to_implement_ai_south_africa.webp',
        date: 'June 29, 2026',
        readTime: '8 min read',
        category: 'AI Strategy',
        tags: ['AI Implementation', 'South Africa', 'Business Strategy']
    },
    {
        slug: 'ai-for-smes-south-africa',
        title: 'AI for SMEs in South Africa: Five Practical Starting Points',
        excerpt: 'How SA SMEs are using AI in 2026 — five high-ROI starting points, what each costs, POPIA considerations, and what to avoid in your first 90 days.',
        image: '/assets/blog/ai_for_smes_south_africa.webp',
        date: 'June 29, 2026',
        readTime: '8 min read',
        category: 'AI Strategy',
        tags: ['AI for SMEs', 'South Africa', 'Small Business']
    },
    {
        slug: 'ai-readiness-south-africa',
        title: 'AI Readiness Assessment: Is Your SA Business Ready to Implement AI?',
        excerpt: 'Score your SA business across four dimensions — data, people, process, and technology — to find out if you\'re ready for AI, mostly ready, or not yet.',
        image: '/assets/blog/ai_readiness_south_africa.webp',
        date: 'June 29, 2026',
        readTime: '6 min read',
        category: 'AI Strategy',
        tags: ['AI Readiness', 'South Africa', 'Assessment']
    },
    {
        slug: 'best-ai-tools-south-africa',
        title: 'Best AI Tools for South African Businesses (2026 Edition)',
        excerpt: 'The top AI tools used by SA businesses, rated for ZAR pricing, POPIA compliance, load-shedding resilience, and SA language support. Updated June 2026.',
        image: '/assets/blog/best_ai_tools_south_africa.webp',
        date: 'June 29, 2026',
        readTime: '8 min read',
        category: 'AI Tools',
        tags: ['AI Tools', 'South Africa', '2026']
    },
    {
        slug: 'chatgpt-for-business-south-africa',
        title: 'ChatGPT for Business in South Africa: A Practical Guide',
        excerpt: 'How SA businesses are using ChatGPT in 2026 — real use cases, POPIA compliance guidance, ZAR pricing, and how to get your team using it consistently.',
        image: '/assets/blog/chatgpt_for_business_south_africa.webp',
        date: 'June 29, 2026',
        readTime: '6 min read',
        category: 'AI Tools',
        tags: ['ChatGPT', 'South Africa', 'POPIA']
    },
    {
        slug: 'ai-automation-south-africa',
        title: 'AI Automation for South African Businesses: A Practical Getting-Started Guide',
        excerpt: 'How SA businesses automate repetitive workflows with Zapier, Make, and ChatGPT — five ready-to-build automations with ZAR pricing and POPIA guidance.',
        image: '/assets/blog/ai_automation_south_africa.webp',
        date: 'June 29, 2026',
        readTime: '7 min read',
        category: 'AI Tools',
        tags: ['AI Automation', 'South Africa', 'No-Code']
    },
    {
        slug: 'ai-receptionist-south-africa',
        title: 'AI Receptionist South Africa: What It Costs and How It Works',
        excerpt: 'An AI receptionist for SA businesses costs R500–R3,500/month and handles 80–90% of inbound calls 24/7. What it does, what it costs, and whether it\'s right for your business.',
        image: '/assets/blog/ai_receptionist_south_africa.webp',
        date: 'June 29, 2026',
        readTime: '7 min read',
        category: 'Voice AI',
        tags: ['AI Receptionist', 'Voice AI', 'South Africa']
    },
    {
        slug: 'ai-vs-human-receptionist-south-africa',
        title: 'AI vs Human Receptionist in South Africa: An Honest Comparison',
        excerpt: 'A human receptionist costs R15,500–R20,500/month in SA. An AI receptionist costs R500–R3,500. Here\'s what you actually get with each — and when one beats the other.',
        image: '/assets/blog/ai_vs_human_receptionist_sa.webp',
        date: 'June 29, 2026',
        readTime: '6 min read',
        category: 'Voice AI',
        tags: ['AI Receptionist', 'Cost Comparison', 'South Africa']
    },
    {
        slug: 'voice-ai-small-business-south-africa',
        title: 'Voice AI for Small Business in South Africa: A Practical Guide',
        excerpt: 'Voice AI phone systems for SA small businesses cost R500–R2,000/month and handle calls 24/7. Who benefits most, what setup involves, and whether it\'s worth it.',
        image: '/assets/blog/voice_ai_small_business_sa.webp',
        date: 'June 29, 2026',
        readTime: '6 min read',
        category: 'Voice AI',
        tags: ['Voice AI', 'Small Business', 'South Africa']
    },
    {
        slug: 'ai-workshop-cost-south-africa',
        title: 'How Much Does an AI Workshop Cost in South Africa?',
        excerpt: 'AI workshops in South Africa cost R3,500–R12,000. Here\'s what drives the price difference, what\'s included in a quality session, and how to calculate the ROI before you book.',
        image: '/assets/blog/ai_workshop_cost_sa.webp',
        date: 'June 29, 2026',
        readTime: '5 min read',
        category: 'AI Training',
        tags: ['AI Workshops', 'Pricing', 'South Africa']
    },
    {
        slug: 'what-to-expect-ai-workshop',
        title: 'What to Expect from a Corporate AI Workshop in South Africa',
        excerpt: 'Wondering what happens at an AI workshop? DB23 breaks down a typical session hour by hour — what you\'ll cover, what your team will leave with, and how to prepare.',
        image: '/assets/blog/what_to_expect_ai_workshop.webp',
        date: 'June 29, 2026',
        readTime: '6 min read',
        category: 'AI Training',
        tags: ['AI Workshops', 'Corporate Training', 'South Africa']
    },
    {
        slug: 'ai-workshop-for-employees',
        title: 'AI Workshops for Employees in South Africa: The Complete Upskilling Guide',
        excerpt: 'How to run an AI workshop for your SA employees — making the business case, handling job security concerns, and building the 4-week adoption plan that makes skills stick.',
        image: '/assets/blog/ai_workshop_for_employees_sa.webp',
        date: 'June 29, 2026',
        readTime: '7 min read',
        category: 'AI Training',
        tags: ['AI Training', 'Employees', 'South Africa']
    },
    {
        slug: 'chatgpt-workshop-south-africa',
        title: 'ChatGPT Workshop South Africa: Practical Training for Business Teams',
        excerpt: 'DB23 runs ChatGPT workshops for South African business teams — 5 modules, half-day and full-day formats, remote and in-person. ZAR pricing included.',
        image: '/assets/blog/chatgpt_workshop_south_africa.webp',
        date: 'June 29, 2026',
        readTime: '6 min read',
        category: 'AI Training',
        tags: ['ChatGPT', 'Workshop', 'South Africa']
    },
    {
        slug: 'ai-receptionist-medical-practice-south-africa',
        title: 'AI Receptionist for Medical and Dental Practices in South Africa',
        excerpt: 'How SA medical and dental practices use an AI receptionist for bookings and after-hours calls, what it must never do, and the POPIA rules for patient data.',
        image: '/assets/blog/ai_receptionist_medical_practice_sa.webp',
        date: 'October 2, 2026',
        readTime: '7 min read',
        category: 'Voice AI',
        tags: ['AI Receptionist', 'Medical Practices', 'POPIA']
    },
    {
        slug: 'outsourced-marketing-vs-in-house-south-africa',
        title: 'Outsourced Marketing vs Hiring In-House in South Africa: The Real Cost',
        excerpt: 'An SA marketing manager costs ~R30,000–R38,000/month before tools and leave. When an outsourced marketing team makes more sense, when a hire does, what to ask.',
        image: '/assets/blog/outsourced_marketing_vs_in_house_sa.webp',
        date: 'October 2, 2026',
        readTime: '7 min read',
        category: 'Digital Marketing',
        tags: ['Outsourced Marketing', 'Marketing Team', 'South Africa']
    }
];

export function BlogPage() {
    return (
        <PageLayout>
            <SEOHead
                title="AI & Digital Business Insights | DB23 eCommerce Blog"
                description="Read our latest insights on virtual AI training, ChatGPT for business, remote web development agency trends, and digital systems built to grow global brands."
                canonical="https://db23.co.za/blog/"
                keywords="virtual AI training, ChatGPT for business remote, remote web development agency blog, global marketing AI automation"
                ogTitle="AI & Digital Marketing Insights for High-Performance Teams | DB23"
                ogDescription="Unlock the secrets of digital modernization. Read about corporate AI training ROI, generative AI workflows, and bespoke web design from the experts."
            />

            <PageHero
                eyebrow="Blog · AI, websites and search for small businesses"
                title="AI, Automation & Digital Systems"
                intro="Empowering distributed teams and global brands with practical, jargon-free knowledge on implementing artificial intelligence and building robust digital architectures."
            />

            <section className="border-t border-white/10 bg-background pb-24 md:pb-32" aria-label="Blog posts">
                <div className="mx-auto max-w-[1400px] px-4 md:px-8">
                    {posts.map((post) => (
                        <article
                            key={post.slug}
                            className="group grid gap-6 border-t border-white/10 py-10 first:border-t-0 md:grid-cols-12 md:gap-8 md:py-12"
                        >
                            <a href={`/blog/${post.slug}`} className="block overflow-hidden rounded-md border border-white/10 md:col-span-4" tabIndex={-1} aria-hidden="true">
                                <img
                                    src={post.image}
                                    alt=""
                                    className="aspect-[16/9] h-full w-full object-cover grayscale-[25%] transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                    width="640"
                                    height="360"
                                />
                            </a>
                            <div className="md:col-span-7 md:col-start-6">
                                <p className="mb-3 text-sm text-text-muted">
                                    {post.category} · {post.date} · {post.readTime}
                                </p>
                                <h2 className="mb-4 text-balance text-2xl font-medium leading-snug tracking-[-0.02em] text-white transition-colors hover:text-accent md:text-3xl">
                                    <a href={`/blog/${post.slug}`}>{post.title}</a>
                                </h2>
                                <p className="max-w-2xl text-pretty leading-relaxed text-text-muted">{post.excerpt}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}

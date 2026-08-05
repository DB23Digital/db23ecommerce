import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, Clock, Sparkles } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';

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

            {/* Hero Section */}
            <section className="relative min-h-[45vh] overflow-hidden bg-background pt-32 pb-16 md:pt-40 md:pb-20" aria-labelledby="blog-title">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.12),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.1),transparent_40%)]" />
                <div className="container relative z-10 mx-auto px-4 md:px-8 text-center">
                    <Motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-1.5 text-xs md:text-sm font-semibold text-purple-400">
                            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                            DB23 Insights & Strategy
                        </div>
                        <h1 id="blog-title" className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl text-balance">
                            AI, Automation & <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Digital Systems</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
                            Empowering distributed teams and global brands with practical, jargon-free knowledge on implementing artificial intelligence and building robust digital architectures.
                        </p>
                    </Motion.div>
                </div>
            </section>

            {/* Blog Post Grid */}
            <section className="bg-background py-12 pb-24 md:pb-32">
                <div className="container mx-auto px-4 md:px-8">
                    <Motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="grid gap-8 sm:grid-cols-2 lg:gap-10 max-w-5xl mx-auto"
                    >
                        {posts.map((post, index) => (
                            <Motion.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-card/40 transition-all hover:border-purple-500/30 hover:bg-card/75"
                            >
                                {/* Cover Image */}
                                <a href={`/blog/${post.slug}`} className="relative block overflow-hidden aspect-[16/9]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10 transition-opacity group-hover:opacity-0" />
                                    <img 
                                        src={post.image} 
                                        alt={post.title} 
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                        width="640"
                                        height="360"
                                    />
                                </a>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-6 md:p-8">
                                    {/* Meta info */}
                                    <div className="mb-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                                        <span className="text-purple-400 bg-purple-400/10 px-2.5 py-1 rounded-md">{post.category}</span>
                                        <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
                                        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="mb-4 text-xl font-bold leading-snug text-white transition hover:text-purple-400 md:text-2xl">
                                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                                    </h2>

                                    {/* Description */}
                                    <p className="mb-6 flex-1 text-sm leading-relaxed text-text-muted md:text-base">
                                        {post.excerpt}
                                    </p>

                                    {/* Tags */}
                                    <div className="mb-6 flex flex-wrap gap-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-xs text-white/50 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Read link */}
                                    <div className="pt-4 border-t border-white/5">
                                        <a 
                                            href={`/blog/${post.slug}`} 
                                            className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 group-hover:text-purple-300 transition-colors"
                                        >
                                            Read Full Article
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </a>
                                    </div>
                                </div>
                            </Motion.article>
                        ))}
                    </Motion.div>
                </div>
            </section>
        </PageLayout>
    );
}

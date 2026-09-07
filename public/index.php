<?php
/**
 * DB23 eCommerce — Server-Side SEO Meta Injection
 *
 * Reads the built index.html and injects route-specific meta before serving.
 * Fixes: per-page canonical tags, duplicate titles, duplicate descriptions,
 * and soft-404 responses for unknown routes.
 */

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$path = '/' . trim($path, '/');
if ($path === '/') $path = '';

// Meta below is kept byte-identical to each page's <SEOHead> props in
// src/pages/*.jsx (the real source — baked into the prerendered HTML at
// SSG build time). This array only actually serves requests for routes
// that have no prerendered dist/<route>/ directory; keep both in sync by
// hand when copy changes.
$pages = [
    '' => [
        'title'          => 'AI Workshops & Digital Marketing South Africa | DB23',
        'description'    => 'DB23 helps South African businesses implement AI, automate marketing, and grow online. AI workshops, Voice AI, SEO and website design.',
        'canonical'      => 'https://db23.co.za/',
        'og_title'       => 'AI Workshops & Digital Marketing South Africa | DB23',
        'og_description' => 'DB23 helps South African businesses implement AI, automate marketing, and grow online. AI workshops, Voice AI, SEO and website design.',
    ],
    '/ai-workshops' => [
        'title'          => 'AI Workshops for SME Owners | From R4,500 | Cape Town & Online',
        'description'    => 'Hands-on AI training for South African business owners and their teams. Half-day workshop from R4,500. Real tools, your own use cases, no jargon.',
        'canonical'      => 'https://db23.co.za/ai-workshops/',
        'og_title'       => 'AI Workshops for SME Owners | From R4,500 | Cape Town & Online',
        'og_description' => 'Hands-on AI training for South African business owners and their teams. Half-day workshop from R4,500. Real tools, your own use cases, no jargon.',
    ],
    '/voice-ai' => [
        'title'          => 'Voice AI South Africa – AI Receptionists | DB23',
        'description'    => 'AI voice receptionists and automated lead qualification for South African businesses. Available 24/7.',
        'canonical'      => 'https://db23.co.za/voice-ai/',
        'og_title'       => 'Voice AI South Africa – AI Receptionists | DB23',
        'og_description' => 'AI voice receptionists and automated lead qualification for South African businesses. Available 24/7.',
    ],
    '/ai-training' => [
        'title'          => 'AI Training South Africa – Business Teams | DB23',
        'description'    => 'Practical AI training programs for SA managers, marketing teams and operational staff. No tech background needed.',
        'canonical'      => 'https://db23.co.za/ai-training/',
        'og_title'       => 'AI Training South Africa – Business Teams | DB23',
        'og_description' => 'Practical AI training programs for SA managers, marketing teams and operational staff. No tech background needed.',
    ],
    '/ai-automation' => [
        'title'          => 'AI Automation South Africa | Workflow Automation for Business | DB23',
        'description'    => 'AI-powered workflow automation for South African businesses. Real automations, real tools (Zapier, Make, n8n), ZAR pricing. Book a free workflow audit.',
        'canonical'      => 'https://db23.co.za/ai-automation/',
        'og_title'       => 'AI Automation South Africa | Workflow Automation for Business | DB23',
        'og_description' => 'AI-powered workflow automation for South African businesses. Real automations, real tools (Zapier, Make, n8n), ZAR pricing. Book a free workflow audit.',
    ],
    '/digital-marketing' => [
        'title'          => 'Digital Marketing South Africa – Outsourced | DB23',
        'description'    => 'Outsourced digital marketing for SA businesses. SEO, content, social media and AI-assisted campaigns.',
        'canonical'      => 'https://db23.co.za/digital-marketing/',
        'og_title'       => 'Digital Marketing South Africa – Outsourced | DB23',
        'og_description' => 'Outsourced digital marketing for SA businesses. SEO, content, social media and AI-assisted campaigns.',
    ],
    '/website-design' => [
        'title'          => 'Website Design South Africa – Modern Sites | DB23',
        'description'    => 'Modern websites built for clarity, trust and conversion. Part of a broader digital growth system for SA businesses.',
        'canonical'      => 'https://db23.co.za/website-design/',
        'og_title'       => 'Website Design South Africa – Modern Sites | DB23',
        'og_description' => 'Modern websites built for clarity, trust and conversion. Part of a broader digital growth system for SA businesses.',
    ],
    '/outsourced-marketing' => [
        'title'          => 'Outsourced Marketing Team, South Africa | DB23',
        'description'    => 'A full marketing team for less than one in-house hire. Strategy, content, SEO and paid, run for growing SA businesses. See what is included.',
        'canonical'      => 'https://db23.co.za/outsourced-marketing/',
        'og_title'       => 'Outsourced Marketing Team, South Africa | DB23',
        'og_description' => 'A full marketing team for less than one in-house hire. Strategy, content, SEO and paid, run for growing SA businesses. See what is included.',
    ],
    '/seo-services' => [
        'title'          => 'SEO Services South Africa – Rank on Google | DB23',
        'description'    => 'Search engine optimisation for South African businesses. Technical SEO, content, local search and ranking strategy.',
        'canonical'      => 'https://db23.co.za/seo-services/',
        'og_title'       => 'SEO Services South Africa – Rank on Google | DB23',
        'og_description' => 'Search engine optimisation for South African businesses. Technical SEO, content, local search and ranking strategy.',
    ],
    '/blog' => [
        'title'          => 'AI & Digital Business Insights | DB23 eCommerce Blog',
        'description'    => 'Read our latest insights on virtual AI training, ChatGPT for business, remote web development agency trends, and digital systems built to grow global brands.',
        'canonical'      => 'https://db23.co.za/blog/',
        'og_title'       => 'AI & Digital Marketing Insights for High-Performance Teams | DB23',
        'og_description' => 'Unlock the secrets of digital modernization. Read about corporate AI training ROI, generative AI workflows, and bespoke web design from the experts.',
    ],
    '/blog/roi-remote-corporate-ai-training' => [
        'title'          => 'ROI of Remote Corporate AI Training | Distributed Team Upskilling | DB23 Blog',
        'description'    => 'Discover how virtual artificial intelligence training delivers measurable ROI, enhances productivity, and empowers distributed teams to scale business operations.',
        'canonical'      => 'https://db23.co.za/blog/roi-remote-corporate-ai-training/',
        'og_title'       => 'The ROI of Remote Corporate AI Training for Distributed Teams | DB23 Insights',
        'og_description' => 'Discover how virtual artificial intelligence training delivers measurable ROI, enhances productivity, and empowers distributed teams to scale business operations.',
    ],
    '/blog/chatgpt-business-global-marketing-guide' => [
        'title'          => 'ChatGPT for Business Training Guide | Global Marketing Teams | DB23 Blog',
        'description'    => 'Empower your global marketing teams with remote ChatGPT for business training. Learn steps to scale content production, optimize campaigns, and maintain brand voice.',
        'canonical'      => 'https://db23.co.za/blog/chatgpt-business-global-marketing-guide/',
        'og_title'       => 'ChatGPT for Business: A Training Guide for Global Marketing Teams | DB23 Insights',
        'og_description' => 'Empower your global marketing teams with remote ChatGPT for business training. Learn steps to scale content production, optimize campaigns, and maintain brand voice.',
    ],
    '/blog/ai-workshop-cost-south-africa' => [
        'title'          => 'AI Workshop Cost South Africa: 2026 Pricing Guide | DB23 Blog',
        'description'    => 'AI workshops in South Africa cost R3,500–R12,000 per session. Here\'s what drives the price difference, what\'s included, and how to calculate the ROI before you book.',
        'canonical'      => 'https://db23.co.za/blog/ai-workshop-cost-south-africa/',
        'og_title'       => 'How Much Does an AI Workshop Cost in South Africa? | DB23 Insights',
        'og_description' => 'AI workshops in South Africa cost R3,500–R12,000 per session. Here\'s what drives the price difference, what\'s included, and how to calculate the ROI before you book.',
    ],
    '/blog/ai-receptionist-south-africa' => [
        'title'          => 'AI Receptionist South Africa: Cost, Setup & What to Expect (2026) | DB23 Blog',
        'description'    => 'An AI receptionist for SA businesses costs R500–R3,500/month and handles 80–90% of inbound calls 24/7. What it does, what it costs, and whether it\'s right for your business.',
        'canonical'      => 'https://db23.co.za/blog/ai-receptionist-south-africa/',
        'og_title'       => 'AI Receptionist South Africa: What It Costs and How It Works | DB23 Insights',
        'og_description' => 'An AI receptionist for SA businesses costs R500–R3,500/month and handles 80–90% of inbound calls 24/7. What it does, what it costs, and whether it\'s right for your business.',
    ],
    '/blog/ai-vs-human-receptionist-south-africa' => [
        'title'          => 'AI vs Human Receptionist South Africa: Real Costs & Trade-offs (2026) | DB23 Blog',
        'description'    => 'A human receptionist costs R15,500–R20,500/month in SA. An AI receptionist costs R500–R3,500. Here\'s what you actually get with each — and when one beats the other.',
        'canonical'      => 'https://db23.co.za/blog/ai-vs-human-receptionist-south-africa/',
        'og_title'       => 'AI vs Human Receptionist in South Africa: An Honest Comparison | DB23 Insights',
        'og_description' => 'A human receptionist costs R15,500–R20,500/month in SA. An AI receptionist costs R500–R3,500. Here\'s what you actually get with each — and when one beats the other.',
    ],
    '/blog/best-ai-tools-south-africa' => [
        'title'          => 'Best AI Tools for South African Businesses in 2026 (Tested & Ranked) | DB23 Blog',
        'description'    => 'The top AI tools used by SA businesses in 2026, rated for ZAR pricing, POPIA compliance, load-shedding resilience, and SA language support. Updated June 2026.',
        'canonical'      => 'https://db23.co.za/blog/best-ai-tools-south-africa/',
        'og_title'       => 'Best AI Tools for South African Businesses (2026 Edition) | DB23 Insights',
        'og_description' => 'The top AI tools used by SA businesses in 2026, rated for ZAR pricing, POPIA compliance, load-shedding resilience, and SA language support. Updated June 2026.',
    ],
    '/blog/how-to-implement-ai-south-africa' => [
        'title'          => 'How to Implement AI in Your South African Business: A Step-by-Step Guide | DB23 Blog',
        'description'    => 'A practical AI implementation guide for SA businesses. 6-step framework, common pitfalls, POPIA considerations, and what DB23 sees most often go wrong in SA implementations.',
        'canonical'      => 'https://db23.co.za/blog/how-to-implement-ai-south-africa/',
        'og_title'       => 'How to Implement AI in Your South African Business (Step-by-Step) | DB23 Insights',
        'og_description' => 'A practical AI implementation guide for SA businesses. 6-step framework, common pitfalls, POPIA considerations, and what DB23 sees most often go wrong in SA implementations.',
    ],
    '/blog/what-to-expect-ai-workshop' => [
        'title'          => 'What to Expect from an AI Workshop: A DB23 Walkthrough | DB23 Blog',
        'description'    => 'Wondering what happens at an AI workshop? DB23 breaks down a typical session — what you\'ll cover, what your team will leave with, and how to prepare.',
        'canonical'      => 'https://db23.co.za/blog/what-to-expect-ai-workshop/',
        'og_title'       => 'What to Expect from a Corporate AI Workshop in South Africa | DB23 Insights',
        'og_description' => 'Wondering what happens at an AI workshop? DB23 breaks down a typical session — what you\'ll cover, what your team will leave with, and how to prepare.',
    ],
    '/blog/chatgpt-for-business-south-africa' => [
        'title'          => 'ChatGPT for Business in South Africa: Use Cases, Setup & POPIA Rules | DB23 Blog',
        'description'    => 'How SA businesses are using ChatGPT in 2026 — real use cases, POPIA compliance guidance, ZAR pricing, and how to get your team using it consistently.',
        'canonical'      => 'https://db23.co.za/blog/chatgpt-for-business-south-africa/',
        'og_title'       => 'ChatGPT for Business in South Africa: A Practical Guide | DB23 Insights',
        'og_description' => 'How SA businesses are using ChatGPT in 2026 — real use cases, POPIA compliance guidance, ZAR pricing, and how to get your team using it consistently.',
    ],
    '/blog/ai-workshop-for-employees' => [
        'title'          => 'AI Workshops for Employees in South Africa: How to Upskill Your Team | DB23 Blog',
        'description'    => 'How to run an AI workshop for your SA employees — what to cover, how to get buy-in, and how to measure the impact. Includes DB23\'s employee training framework.',
        'canonical'      => 'https://db23.co.za/blog/ai-workshop-for-employees/',
        'og_title'       => 'AI Workshops for Employees in South Africa: The Complete Upskilling Guide | DB23 Insights',
        'og_description' => 'How to run an AI workshop for your SA employees — what to cover, how to get buy-in, and how to measure the impact. Includes DB23\'s employee training framework.',
    ],
    '/blog/ai-readiness-south-africa' => [
        'title'          => 'AI Readiness Assessment for South African Businesses: Are You Ready? | DB23 Blog',
        'description'    => 'A self-assessment tool for SA businesses to measure AI readiness across data, people, processes, and technology. Takes 10 minutes. DB23\'s readiness framework.',
        'canonical'      => 'https://db23.co.za/blog/ai-readiness-south-africa/',
        'og_title'       => 'AI Readiness Assessment: Is Your SA Business Ready to Implement AI? | DB23 Insights',
        'og_description' => 'A self-assessment tool for SA businesses to measure AI readiness across data, people, processes, and technology. Takes 10 minutes. DB23\'s readiness framework.',
    ],
    '/blog/chatgpt-workshop-south-africa' => [
        'title'          => 'ChatGPT Workshop South Africa: Book a Business Training Session | DB23 Blog',
        'description'    => 'DB23 runs ChatGPT workshops for South African business teams — half-day and full-day formats, remote and in-person (Cape Town). ZAR pricing. Book a free 20-min call.',
        'canonical'      => 'https://db23.co.za/blog/chatgpt-workshop-south-africa/',
        'og_title'       => 'ChatGPT Workshop South Africa: Practical Training for Business Teams | DB23 Insights',
        'og_description' => 'DB23 runs ChatGPT workshops for South African business teams — half-day and full-day formats, remote and in-person (Cape Town). ZAR pricing. Book a free 20-min call.',
    ],
    '/blog/ai-automation-south-africa' => [
        'title'          => 'AI Automation for South African Businesses: Where to Start (2026 Guide) | DB23 Blog',
        'description'    => 'How SA businesses are automating repetitive workflows with AI tools in 2026. Zapier, Make, n8n, and custom automation — with ZAR pricing, POPIA guidance, and real SA examples.',
        'canonical'      => 'https://db23.co.za/blog/ai-automation-south-africa/',
        'og_title'       => 'AI Automation for South African Businesses: A Practical Getting-Started Guide | DB23 Insights',
        'og_description' => 'How SA businesses are automating repetitive workflows with AI tools in 2026. Zapier, Make, n8n, and custom automation — with ZAR pricing, POPIA guidance, and real SA examples.',
    ],
    '/blog/voice-ai-small-business-south-africa' => [
        'title'          => 'Voice AI for Small Business in South Africa: Is It Worth It in 2026? | DB23 Blog',
        'description'    => 'Voice AI phone systems for SA small businesses cost R500–R2,000/month and handle calls 24/7. Who it benefits, what\'s involved in setup, and whether it\'s worth it.',
        'canonical'      => 'https://db23.co.za/blog/voice-ai-small-business-south-africa/',
        'og_title'       => 'Voice AI for Small Business in South Africa: A Practical Guide | DB23 Insights',
        'og_description' => 'Voice AI phone systems for SA small businesses cost R500–R2,000/month and handle calls 24/7. Who it benefits, what\'s involved in setup, and whether it\'s worth it.',
    ],
    '/blog/ai-strategy-south-africa' => [
        'title'          => 'AI Strategy for South African Businesses: A Complete 2026 Framework | DB23 Blog',
        'description'    => 'A practical AI strategy framework for SA businesses — how to assess readiness, prioritise use cases, build a roadmap, manage change, and measure outcomes.',
        'canonical'      => 'https://db23.co.za/blog/ai-strategy-south-africa/',
        'og_title'       => 'AI Strategy for South African Businesses: The Complete Framework | DB23 Insights',
        'og_description' => 'A practical AI strategy framework for SA businesses — how to assess readiness, prioritise use cases, build a roadmap, manage change, and measure outcomes.',
    ],
    '/blog/ai-for-smes-south-africa' => [
        'title'          => 'AI for SMEs South Africa: Practical Guide for SA Small Businesses (2026) | DB23 Blog',
        'description'    => 'How South African SMEs are using AI in 2026 — five high-ROI starting points, what each costs, POPIA considerations, and what to avoid in your first 90 days.',
        'canonical'      => 'https://db23.co.za/blog/ai-for-smes-south-africa/',
        'og_title'       => 'AI for SMEs in South Africa: Five Practical Starting Points | DB23 Insights',
        'og_description' => 'How South African SMEs are using AI in 2026 — five high-ROI starting points, what each costs, POPIA considerations, and what to avoid in your first 90 days.',
    ],
    '/foldline' => [
        'title'          => 'Foldline — score your LinkedIn post before you publish | DB23',
        'description'    => 'Paste a LinkedIn draft and score it against 26 weighted tests from the 2026 feed algorithm — text, image, carousel and video. See where the fold cuts, what costs you reach, and copy a corrected post. Free score, no signup.',
        'canonical'      => 'https://db23.co.za/foldline/',
        'og_title'       => 'Foldline — score your LinkedIn post before you publish | DB23',
        'og_description' => 'Paste a LinkedIn draft and score it against 26 weighted tests from the 2026 feed algorithm — text, image, carousel and video. See where the fold cuts, what costs you reach, and copy a corrected post. Free score, no signup.',
    ],
    '/foldline/benchmark' => [
        'title'          => 'The Foldline Benchmark — LinkedIn v3.0.0 (2026) | DB23',
        'description'    => 'An open, versioned standard for LinkedIn content quality: 26 weighted tests scoped by format, 3 of them blocking, each with a pass condition, a weight and an evidence grade. Free to read, free to cite.',
        'canonical'      => 'https://db23.co.za/foldline/benchmark/',
        'og_title'       => 'The Foldline Benchmark — LinkedIn v3.0.0 (2026) | DB23',
        'og_description' => 'An open, versioned standard for LinkedIn content quality: 26 weighted tests scoped by format, 3 of them blocking, each with a pass condition, a weight and an evidence grade. Free to read, free to cite.',
    ],
    '/about' => [
        'title'          => 'About DB23 eCommerce | AI & Digital Services South Africa',
        'description'    => 'DB23 eCommerce is an AI implementation partner helping South African businesses adopt practical AI, automation, modern websites, and digital systems that drive real growth.',
        'canonical'      => 'https://db23.co.za/about/',
        'og_title'       => 'About DB23 eCommerce | AI Implementation Partner South Africa',
        'og_description' => 'South Africa\'s practical AI implementation partner. We help businesses adopt AI without the jargon.',
    ],
    '/contact' => [
        'title'          => 'Contact DB23 eCommerce | Book an AI Workshop or Consultation',
        'description'    => 'Get in touch with DB23 eCommerce. Book an AI workshop, request a digital services quote, or start a conversation about AI for your South African business.',
        'canonical'      => 'https://db23.co.za/contact/',
        'og_title'       => 'Contact DB23 eCommerce | South Africa',
        'og_description' => 'Book an AI workshop or discuss digital services with DB23. We reply within the hour on WhatsApp, business hours.',
    ],
];

$lookup = rtrim($path, '/');
$meta   = isset($pages[$lookup]) ? $pages[$lookup] : null;

if ($meta === null) {
    // Blog post slug — dynamic canonical from URL
    if (preg_match('#^/blog/[^/]+#', $path)) {
        $slug_canonical = 'https://db23.co.za' . rtrim($path, '/') . '/';
        $meta = [
            'title'          => 'Blog | DB23 eCommerce',
            'description'    => 'Read the latest AI and digital marketing insights from DB23 eCommerce.',
            'canonical'      => $slug_canonical,
            'og_title'       => 'DB23 eCommerce Blog',
            'og_description' => 'Practical AI and marketing insights for South African businesses.',
        ];
    } else {
        // Unknown path — proper 404 status, self-referencing canonical
        // (not the homepage — a bare-URL canonical here tells Google the
        // 404 page IS the homepage).
        http_response_code(404);
        $meta = $pages[''];
        $meta['canonical'] = 'https://db23.co.za' . rtrim($path, '/') . '/';
    }
}

$html = @file_get_contents(__DIR__ . '/index.html');
if ($html === false) {
    http_response_code(500);
    exit('500 Internal Server Error');
}

$esc = fn($s) => htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

$title     = $esc($meta['title']);
$desc      = $esc($meta['description']);
$canonical = $esc($meta['canonical']);
$og_title  = $esc($meta['og_title']);
$og_desc   = $esc($meta['og_description']);

// Title
$html = preg_replace('/<title>[^<]*<\/title>/', "<title>{$title}</title>", $html);

// Meta description
$html = preg_replace(
    '/(<meta\s+name="description"\s+content=")[^"]*(")/i',
    "\${1}{$desc}\${2}",
    $html
);

// Canonical href
$html = preg_replace(
    '/(<link\s+rel="canonical"\s+href=")[^"]*(")/i',
    "\${1}{$canonical}\${2}",
    $html
);

// og:url
$html = preg_replace(
    '/(<meta\s+property="og:url"\s+content=")[^"]*(")/i',
    "\${1}{$canonical}\${2}",
    $html
);

// og:title
$html = preg_replace(
    '/(<meta\s+property="og:title"\s+content=")[^"]*(")/i',
    "\${1}{$og_title}\${2}",
    $html
);

// og:description
$html = preg_replace(
    '/(<meta\s+property="og:description"\s+content=")[^"]*(")/i',
    "\${1}{$og_desc}\${2}",
    $html
);

// twitter:url
$html = preg_replace(
    '/(<meta\s+name="twitter:url"\s+content=")[^"]*(")/i',
    "\${1}{$canonical}\${2}",
    $html
);

// twitter:title
$html = preg_replace(
    '/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/i',
    "\${1}{$og_title}\${2}",
    $html
);

// twitter:description
$html = preg_replace(
    '/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/i',
    "\${1}{$og_desc}\${2}",
    $html
);

header('Content-Type: text/html; charset=UTF-8');
echo $html;

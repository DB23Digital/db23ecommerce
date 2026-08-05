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

$pages = [
    '' => [
        'title'          => 'AI Workshops & Digital Systems for Global Businesses | DB23',
        'description'    => 'Practical virtual AI workshops, AI training & Voice AI for businesses. Expert custom website design, digital marketing & outsourced marketing. Book a session today ✓',
        'canonical'      => 'https://db23.co.za/',
        'og_title'       => 'AI Workshops & Voice AI for Modern Businesses Worldwide | DB23',
        'og_description' => 'Book a virtual AI workshop, explore Voice AI, outsourced marketing & website design solutions built for business growth globally. No jargon. Real results.',
    ],
    '/ai-workshops' => [
        'title'          => 'Virtual AI Workshops for Business | Corporate AI Training | DB23',
        'description'    => 'Book a practical virtual AI workshop for your business. Hands-on remote AI training for global teams, owners & leaders. No tech skills needed.',
        'canonical'      => 'https://db23.co.za/ai-workshops/',
        'og_title'       => 'Virtual AI Workshops — Practical AI Training for Modern Businesses',
        'og_description' => 'Hands-on AI workshops for global business teams. Learn AI tools, automate workflows, and identify real opportunities online. Book today.',
    ],
    '/voice-ai' => [
        'title'          => 'Voice AI South Africa | AI Voice Receptionist & Call Handling | DB23',
        'description'    => 'Intelligent Voice AI solutions for South African businesses. AI voice receptionists, lead qualification & 24/7 call handling. Never miss a customer call again ✓',
        'canonical'      => 'https://db23.co.za/voice-ai/',
        'og_title'       => 'Voice AI South Africa — AI Receptionists & Intelligent Call Handling',
        'og_description' => '24/7 AI voice receptionists for South African businesses. Handle calls, qualify leads, and book appointments automatically. DB23 Voice AI solutions.',
    ],
    '/ai-training' => [
        'title'          => 'AI Training for Business Teams South Africa | DB23',
        'description'    => 'Structured AI training programmes for South African business teams. Learn practical AI tools, workflow automation & AI strategy. No tech background needed ✓',
        'canonical'      => 'https://db23.co.za/ai-training/',
        'og_title'       => 'AI Training for Business Teams South Africa | DB23',
        'og_description' => 'Build real AI capability in your team. Practical AI training programmes for South African businesses — from introductory to leadership-level. Enquire today.',
    ],
    '/digital-marketing' => [
        'title'          => 'Digital Marketing Services South Africa | DB23 eCommerce',
        'description'    => 'Practical digital marketing services for South African SMEs. SEO, lead generation, content, and AI-enhanced marketing. Real results, no jargon ✓',
        'canonical'      => 'https://db23.co.za/digital-marketing/',
        'og_title'       => 'Digital Marketing Services South Africa | DB23 eCommerce',
        'og_description' => 'Practical digital marketing for South African businesses. We focus on leads, visibility, and real business growth.',
    ],
    '/website-design' => [
        'title'          => 'Website Design South Africa | Fast, Modern & Conversion-Focused | DB23',
        'description'    => 'Professional website design for South African businesses. We build fast, mobile-friendly, SEO-optimised websites that turn visitors into paying customers. Get a quote ✓',
        'canonical'      => 'https://db23.co.za/website-design/',
        'og_title'       => 'Website Design South Africa | DB23 Web Development',
        'og_description' => 'We build websites that perform. Fast, modern, and built to generate leads for SA businesses.',
    ],
    '/outsourced-marketing' => [
        'title'          => 'Outsourced Marketing South Africa | Fractional CMO | DB23',
        'description'    => 'Your complete outsourced marketing team in South Africa. Expert SEO, content, and strategy without the in-house overhead. Focus on your business today ✓',
        'canonical'      => 'https://db23.co.za/outsourced-marketing/',
        'og_title'       => 'Outsourced Marketing South Africa | Your Remote Digital Team',
        'og_description' => 'Get a full digital marketing team without the hiring overhead. DB23 provides comprehensive outsourced marketing for SA businesses.',
    ],
    '/seo-services' => [
        'title'          => 'SEO Services South Africa | Search Engine Optimisation | DB23',
        'description'    => 'Expert SEO services for South African businesses. We fix technical errors, optimise content, and build authority so you rank higher on Google. Free audit available.',
        'canonical'      => 'https://db23.co.za/seo-services/',
        'og_title'       => 'SEO Services South Africa | Get Found on Google | DB23',
        'og_description' => 'Stop hiding on page 2. DB23 provides practical, results-driven SEO services for South African businesses.',
    ],
    '/blog' => [
        'title'          => 'AI & Digital Marketing Blog | Practical Insights | DB23',
        'description'    => 'Practical AI guides, digital marketing tips, and business insights for South African entrepreneurs and business owners. Read the DB23 blog.',
        'canonical'      => 'https://db23.co.za/blog/',
        'og_title'       => 'AI & Digital Marketing Blog | DB23 eCommerce',
        'og_description' => 'Practical AI and digital marketing insights for South African businesses.',
    ],
    '/blog/roi-remote-corporate-ai-training' => [
        'title'          => 'ROI of Remote Corporate AI Training | Distributed Team Upskilling | DB23',
        'description'    => 'Discover how virtual artificial intelligence training delivers measurable ROI, enhances productivity, and empowers distributed teams to scale business operations.',
        'canonical'      => 'https://db23.co.za/blog/roi-remote-corporate-ai-training/',
        'og_title'       => 'The ROI of Remote Corporate AI Training for Distributed Teams | DB23',
        'og_description' => 'Virtual AI training ROI explained: time savings, burnout reduction, compliance, and step-by-step ROI calculation for business teams.',
    ],
    '/blog/chatgpt-business-global-marketing-guide' => [
        'title'          => 'ChatGPT for Business Training Guide | Global Marketing Teams | DB23',
        'description'    => 'Empower your global marketing teams with remote ChatGPT for business training. Learn steps to scale content production, optimize campaigns, and maintain brand voice.',
        'canonical'      => 'https://db23.co.za/blog/chatgpt-business-global-marketing-guide/',
        'og_title'       => 'ChatGPT for Business: A Training Guide for Global Marketing Teams | DB23',
        'og_description' => 'How to train your global marketing team on ChatGPT: brand voice, research, secure operations, and rollout strategy.',
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
        'og_description' => 'Book an AI workshop or discuss digital services with DB23. We respond within one business day.',
    ],
    '/club-scrub' => [
        'title'          => 'Club Scrub — Golf Club Cleaning Service | DB23 eCommerce',
        'description'    => 'Club Scrub is a professional golf club cleaning and restoration service. DB23 built their digital presence to help them grow online.',
        'canonical'      => 'https://db23.co.za/club-scrub/',
        'og_title'       => 'Club Scrub — Golf Club Cleaning Service | DB23',
        'og_description' => 'Professional golf club cleaning and restoration. A DB23 eCommerce client showcase.',
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
        // Unknown path — proper 404 status, render app with homepage meta
        http_response_code(404);
        $meta = $pages[''];
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

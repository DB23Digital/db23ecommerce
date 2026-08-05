import React from 'react';
import { motion as Motion, useMotionValue, useSpring } from 'framer-motion';
import { Sparkle, ArrowRight, CaretRight, PhoneCall, Code, ChartBar, CheckCircle } from '@phosphor-icons/react';

// DESIGN_VARIANCE: 8 (Asymmetric, minimal, grid focused)
// MOTION_INTENSITY: 6 (Framer spring motion, staggered waterfalls)
// VISUAL_DENSITY: 4 (High breathing room, no rigid cards unless necessary)

const MagneticButton = ({ children, className, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </Motion.button>
  );
};

export default function IndexV2() {
  return (
    <div className="min-h-[100dvh] bg-background text-text-main font-sans selection:bg-accent/30 selection:text-white antialiased overflow-x-hidden">
      
      {/* Navbar: Floating, Minimal */}
      <Motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-none"
      >
        <div className="font-bold text-lg tracking-tighter flex items-center gap-1 pointer-events-auto mix-blend-difference">
          DB<span className="text-white">23</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full pointer-events-auto">
          <a href="#services" className="text-sm text-text-muted hover:text-white transition-colors">Services</a>
          <a href="#ai" className="text-sm text-text-muted hover:text-white transition-colors">AI Agents</a>
          <a href="#training" className="text-sm text-text-muted hover:text-white transition-colors">Training</a>
        </div>

        <MagneticButton className="pointer-events-auto bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-zinc-200 transition-colors">
          Start Project
        </MagneticButton>
      </Motion.nav>

      {/* HERO SECTION: Asymmetric, Left text, Right Bento */}
      <section className="relative min-h-[100dvh] flex flex-col md:flex-row items-center container mx-auto px-6 pt-32 pb-20 md:py-0">
        
        {/* Abstract Background Blur */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-accent/20 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen" />

        <div className="w-full md:w-[55%] flex flex-col justify-center max-w-2xl pr-0 md:pr-12 relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 80, damping: 20 }}
            className="flex items-center gap-2 mb-8 bg-white/5 border border-white/10 w-max px-4 py-2 rounded-full"
          >
            <Sparkle weight="fill" className="text-accent w-4 h-4" />
            <span className="text-xs uppercase tracking-widest text-text-muted font-medium">Digital Agency Version 2.0</span>
          </Motion.div>

          <Motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 80, damping: 20 }}
            className="text-5xl md:text-[5rem] font-medium tracking-tighter leading-[0.95] mb-8"
            style={{ fontFamily: "'Outfit', 'Geist', sans-serif" }}
          >
            Smarter Machines. <br />
            <span className="text-text-muted">Exponential Growth.</span>
          </Motion.h1>

          <Motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-lg md:text-xl text-text-muted leading-relaxed max-w-[45ch] mb-12"
          >
            We implement 24/7 Voice AI, design enterprise-grade platforms, and run data-driven acquisition engines for decisive businesses.
          </Motion.p>

          <Motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 80, damping: 20 }}
            className="flex items-center gap-6"
          >
            <MagneticButton className="bg-accent text-white px-8 py-4 rounded-full text-base font-medium flex items-center gap-3 border border-accent/20 hover:bg-accent/90">
              Deploy Voice AI
              <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center">
                <ArrowRight className="w-3 h-3" />
              </div>
            </MagneticButton>
            
            <a href="#audit" className="group flex items-center gap-2 text-sm font-medium text-text-main">
              <span className="relative overflow-hidden pb-1">
                Explore Capabilities
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
              </span>
            </a>
          </Motion.div>
        </div>

        {/* Dynamic Bento Parallax on Desktop */}
        <div className="w-full md:w-[45%] h-full flex items-center justify-center relative mt-20 md:mt-0 perspective-[1000px]">
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg mx-auto relative transform md:rotate-y-[-5deg] md:rotate-x-[5deg] transition-transform duration-1000 ease-out hover:rotate-y-0 hover:rotate-x-0">
            
            {/* Bento Tile 1: AI Calling */}
            <Motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="col-span-2 md:col-span-1 bg-card border border-white/5 rounded-[2rem] p-6 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mb-16 text-accent border border-accent/30">
                <PhoneCall className="w-5 h-5" weight="duotone" />
              </div>
              <p className="text-2xl font-light tracking-tight mb-2">Voice AI</p>
              <p className="text-sm text-text-muted">Handles inbound calls instantly, 24/7.</p>
            </Motion.div>

            {/* Bento Tile 2: Web Design */}
            <Motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              className="col-span-2 md:col-span-1 bg-card border border-white/5 rounded-[2rem] p-6 group"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-16 border border-white/10">
                <Code className="w-5 h-5" />
              </div>
              <p className="text-2xl font-light tracking-tight mb-2">Platform</p>
              <p className="text-sm text-text-muted">High-converting web architecture.</p>
            </Motion.div>

            {/* Bento Tile 3: Marketing (Wide) */}
            <Motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
              className="col-span-2 bg-[#1c1c1e] border border-white/5 rounded-[2rem] p-6 flex flex-col md:flex-row justify-between items-start md:items-end group"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10">
                  <ChartBar className="w-5 h-5" />
                </div>
                <p className="text-2xl font-light tracking-tight mb-2">Acquisition Engine</p>
                <p className="text-sm text-text-muted max-w-[200px]">Data-driven funnels to scale your MRR predictably.</p>
              </div>
              
              {/* Perpetual Animated Metric */}
              <div className="mt-8 md:mt-0 flex items-center gap-3 bg-black/40 rounded-full pl-3 pr-4 py-2 border border-white/10 font-mono text-sm border-b-accent/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-white">+ 214.2%</span> <span className="text-text-muted ml-[-4px]">YoY</span>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* MINIMALIST LOGO MARQUEE / SOCIAL PROOF */}
      <section className="py-24 border-y border-white/5 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 mb-8 flex items-center justify-between">
            <h3 className="text-sm font-medium text-text-muted tracking-wide uppercase">Trusted by modern operators</h3>
        </div>
        <div className="w-full flex overflow-hidden">
          <Motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            className="flex gap-24 whitespace-nowrap pl-6 items-center flex-nowrap shrink-0 opacity-40 font-bold text-2xl tracking-widest uppercase font-mono"
          >
            <span>LUMEN</span>
            <span>STRATIS</span>
            <span>NEXTGEN LOGISTICS</span>
            <span>APEX MEDICAL</span>
            <span>VERTEX CAPITAL</span>
            <span>ZENITH PROP</span>
            
            {/* Duplicate for infinite loop */}
            <span>LUMEN</span>
            <span>STRATIS</span>
            <span>NEXTGEN LOGISTICS</span>
            <span>APEX MEDICAL</span>
            <span>VERTEX CAPITAL</span>
            <span>ZENITH PROP</span>
          </Motion.div>
        </div>
      </section>

      {/* CORE WORKFLOW: Vertical List with liquid lines (No heavy boxes) */}
      <section className="py-40 container mx-auto px-6 max-w-5xl">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-6 font-['Outfit']">How we modernize your business.</h2>
          <p className="text-lg text-text-muted max-w-xl">We replace fragmented manual tasks with autonomous systems and hyper-optimized funnels. Pure signal, zero noise.</p>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {[
            { tag: "01", title: "Automated Lead Capture", desc: "Our Voice AI agents pick up after 2 rings, answer complex FAQs, and book calendar appointments seamlessly." },
            { tag: "02", title: "Conversion Architecture", desc: "A bespoke website built on Next.js or Vite, designed explicitly to build trust and capture visitor intent." },
            { tag: "03", title: "Scale Ecosystem", desc: "SEO paired with programmatic advertising creates a pipeline of inbound interest." }
          ].map((item, idx) => (
            <div key={idx} className="group py-12 flex flex-col md:flex-row md:items-start justify-between border-b border-white/10 transition-colors hover:bg-white/[0.02]">
              <div className="md:w-1/3 mb-4 md:mb-0 flex gap-6">
                <span className="text-accent font-mono text-sm mt-1 bg-accent/10 px-2 py-0.5 rounded">{item.tag}</span>
                <h3 className="text-2xl font-light tracking-tight">{item.title}</h3>
              </div>
              <div className="md:w-1/2 flex items-center justify-between">
                <p className="text-text-muted leading-relaxed max-w-md">{item.desc}</p>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  <CaretRight weight="bold" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MINIMAL FOOTER CTA */}
      <section className="relative py-40 overflow-hidden bg-accent text-white selection:bg-white/30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMCAwSDhWOFoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPgo8L3N2Zz4=')] opacity-30" />
        <div className="container mx-auto px-6 max-w-3xl text-center relative pointer-events-auto">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 shadow-sm">Ready to scale?</h2>
          <p className="text-lg md:text-xl text-white/80 mb-12">Stop losing leads to missed calls and broken landing pages. Upgrade your digital infrastructure today.</p>
          <MagneticButton className="bg-white text-accent px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:bg-zinc-100 transition inline-flex items-center gap-3">
            Book an Audit <ArrowRight weight="bold" />
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}

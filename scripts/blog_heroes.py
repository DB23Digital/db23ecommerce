"""Render the blog cover images (1200x630 WebP) from one HTML template.

Style: dark blueprint grid, glitch-split headline word, an "AI core" chip with
circuit traces out to five labelled modules. Text is real text (not AI-drawn),
so it stays sharp and spell-checked.

    python scripts/blog_heroes.py              # render all
    python scripts/blog_heroes.py ai_for_smes  # render matching names only

Needs Google Chrome (headless) and Pillow. Fonts load from Google Fonts, so
the machine must be online.
"""
import html
import os
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "assets" / "blog"
CHROME_CANDIDATES = [
    os.environ.get("CHROME_PATH", ""),
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
]

# file stem: eyebrow, line 1, glitch word, subline, chip, core label, [5 x (module, readout)]
# Module order: top-left, top-right, right, bottom-right, bottom-left.
# sa=False drops the flag bars for the two posts written for global teams.
HEROES = {
    "ai_for_smes_south_africa": dict(
        eyebrow="SOUTH AFRICA", l1="AI for", big="SMEs", sub="5 practical starting points", chip="R0–R3,500/mo",
        core=("AI", "SME CORE"),
        mods=[("EMAIL", "−45 min/day"), ("MEETINGS", "auto-summary"), ("SOCIAL", "−65% prod. time"),
              ("CALLS", "24/7 voice AI"), ("INVOICES", "auto-reminders")]),
    "roi_remote_ai_training": dict(
        sa=False, eyebrow="DISTRIBUTED TEAMS", l1="The ROI of", big="AI Training", sub="Remote upskilling that pays back",
        chip="live · virtual", core=("ROI", "TEAM CORE"),
        mods=[("ONBOARD", "skills baseline"), ("PRACTICE", "real workflows"), ("ADOPT", "daily tool use"),
              ("RETAIN", "less burnout"), ("MEASURE", "hours reclaimed")]),
    "chatgpt_marketing_guide": dict(
        sa=False, eyebrow="MARKETING TEAMS", l1="ChatGPT for", big="Marketing", sub="A training guide for content teams",
        chip="on-brand prompts", core=("GPT", "BRAND VOICE"),
        mods=[("BRIEFS", "in minutes"), ("DRAFTS", "on-brand copy"), ("CAMPAIGNS", "variant tests"),
              ("REVIEW", "human sign-off"), ("RESEARCH", "faster insight")]),
    "ai_strategy_south_africa": dict(
        eyebrow="SOUTH AFRICA", l1="The AI", big="Strategy", sub="The complete framework for SA businesses",
        chip="5-stage roadmap", core=("PLAN", "STRATEGY CORE"),
        mods=[("READINESS", "assess"), ("USE CASES", "prioritise"), ("ROADMAP", "sequence"),
              ("MEASURE", "outcomes"), ("CHANGE", "bring people along")]),
    "how_to_implement_ai_south_africa": dict(
        eyebrow="SOUTH AFRICA", l1="How to", big="Implement AI", sub="A step-by-step guide for SA businesses",
        chip="6 steps · POPIA-ready", core=("6", "STEP PLAN"),
        mods=[("MAP", "where time goes"), ("MATCH", "tools to workflows"), ("POPIA", "before go-live"),
              ("MEASURE", "time + quality"), ("PILOT", "30 days, 1 team")]),
    "ai_readiness_south_africa": dict(
        eyebrow="SOUTH AFRICA", l1="Is your business", big="AI Ready?", sub="Score yourself on four dimensions",
        chip="4 dimensions", core=("SCORE", "READINESS"),
        mods=[("DATA", "clean + reachable"), ("PEOPLE", "skills + buy-in"), ("PROCESS", "mapped workflows"),
              ("VERDICT", "go / not yet"), ("TECHNOLOGY", "tools in place")]),
    "best_ai_tools_south_africa": dict(
        eyebrow="SOUTH AFRICA · 2026", l1="Best", big="AI Tools", sub="Rated for SA businesses",
        chip="ZAR · POPIA · load-shedding", core=("TOP", "TOOL STACK"),
        mods=[("WRITING", "drafts + content"), ("MEETINGS", "notes + actions"), ("CUSTOMERS", "calls + chat"),
              ("AUTOMATION", "no-code flows"), ("PRODUCTIVITY", "daily work")]),
    "chatgpt_for_business_south_africa": dict(
        eyebrow="SOUTH AFRICA", l1="ChatGPT for", big="Business", sub="A practical guide for SA teams",
        chip="Plus · Team · Enterprise", core=("GPT", "WORK CORE"),
        mods=[("EMAIL", "clear + fast"), ("PROPOSALS", "first drafts"), ("RESEARCH", "summaries"),
              ("POPIA", "plan + data rules"), ("SOCIAL", "post batches")]),
    "ai_automation_south_africa": dict(
        eyebrow="SOUTH AFRICA", l1="AI", big="Automation", sub="A practical getting-started guide",
        chip="Zapier · Make · n8n", core=("AUTO", "FLOW CORE"),
        mods=[("TRIGGER", "form · email · lead"), ("AI STEP", "classify · draft"), ("ACTION", "CRM · invoice"),
              ("LOG", "audit trail"), ("NOTIFY", "team + client")]),
    "ai_receptionist_south_africa": dict(
        eyebrow="SOUTH AFRICA", l1="AI", big="Receptionist", sub="What it costs and how it works",
        chip="R500–R3,500/mo", core=("VOICE", "CALL CORE"),
        mods=[("ANSWER", "24/7, 2 rings"), ("QUALIFY", "lead questions"), ("BOOK", "diary sync"),
              ("SUMMARISE", "after every call"), ("ROUTE", "complex → human")]),
    "ai_vs_human_receptionist_sa": dict(
        eyebrow="SOUTH AFRICA", l1="AI vs", big="Human", sub="Receptionist costs, honestly compared",
        chip="R500 vs R15,500+/mo", core=("VS", "RECEPTION"),
        mods=[("AI", "24/7 coverage"), ("HUMAN", "judgement + warmth"), ("HYBRID", "most common in SA"),
              ("CHOOSE", "by call type"), ("COST", "per month, real")]),
    "voice_ai_small_business_sa": dict(
        eyebrow="SOUTH AFRICA", l1="Small business", big="Voice AI", sub="A practical guide for SA owners",
        chip="live in 10–14 days", core=("VOICE", "SMALL BIZ"),
        mods=[("CALLS", "never missed"), ("BOOKINGS", "while you work"), ("AFTER-HOURS", "covered"),
              ("SETUP", "same number"), ("LIMITS", "poor fits")]),
    "ai_workshop_cost_sa": dict(
        eyebrow="SOUTH AFRICA · 2026", l1="AI Workshop", big="Cost", sub="What SA businesses pay, and why",
        chip="R3,500–R12,000", core=("ZAR", "PRICE CORE"),
        mods=[("FORMAT", "online vs on-site"), ("DURATION", "90 min → full day"), ("GROUP", "team size"),
              ("ROI", "payback maths"), ("PREP", "your own use cases")]),
    "what_to_expect_ai_workshop": dict(
        eyebrow="SOUTH AFRICA", l1="Inside an AI", big="Workshop", sub="A DB23 session, hour by hour",
        chip="no jargon", core=("LIVE", "SESSION"),
        mods=[("PREP", "before the day"), ("DEMO", "real tools"), ("HANDS-ON", "your own tasks"),
              ("NEXT", "follow-up plan"), ("MAP", "opportunity map")]),
    "ai_workshop_for_employees_sa": dict(
        eyebrow="SOUTH AFRICA", l1="AI for your", big="Team", sub="The complete employee upskilling guide",
        chip="every role", core=("SKILL", "TEAM CORE"),
        mods=[("SALES", "faster follow-up"), ("ADMIN", "less typing"), ("MARKETING", "content at pace"),
              ("MANAGERS", "lead the change"), ("FINANCE", "reports + recon")]),
    "chatgpt_workshop_south_africa": dict(
        eyebrow="SOUTH AFRICA", l1="ChatGPT", big="Workshop", sub="Practical training for business teams",
        chip="5 modules · hands-on", core=("GPT", "WORKSHOP"),
        mods=[("PROMPTS", "frameworks"), ("DRAFTING", "emails + docs"), ("ANALYSIS", "data + notes"),
              ("POLICY", "safe-use rules"), ("CUSTOM GPTs", "your workflows")]),
    "ai_receptionist_medical_practice_sa": dict(
        eyebrow="SOUTH AFRICA", l1="AI Receptionist for", big="Practices", sub="Medical & dental practices",
        chip="POPIA s26 · s32", core=("VOICE", "PRACTICE"),
        mods=[("BOOKINGS", "book + move"), ("AFTER-HOURS", "24/7 cover"), ("URGENT", "always → staff"),
              ("POPIA", "health data rules"), ("RECALLS", "reminders")]),
    "outsourced_marketing_vs_in_house_sa": dict(
        eyebrow="SOUTH AFRICA · 2026", l1="Outsource or", big="Hire?", sub="Marketing team costs for SA businesses",
        chip="~R30k+/mo for one hire", core=("MKT", "TEAM CORE"),
        mods=[("SEO", "specialist"), ("CONTENT", "writers"), ("PAID", "ads manager"),
              ("OWNERSHIP", "your accounts"), ("REPORTING", "leads, not likes")]),
}

TEMPLATE = """<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@500;700&display=block" rel="stylesheet">
<style>
  :root { --bg:#09090b; --lime:#c8ff2e; --mag:#ff2bd6; --vio:#8b5cf6; --line:rgba(255,255,255,.045); }
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1200px; height:630px; overflow:hidden; background:var(--bg); }
  .stage { position:relative; width:1200px; height:630px; overflow:hidden;
    background-image:linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size:30px 30px; background-position:-1px -1px; }
  .glow { position:absolute; border-radius:50%; filter:blur(90px); }
  .g1 { width:420px; height:420px; left:700px; top:110px; background:rgba(200,255,46,.10); }
  .g2 { width:360px; height:360px; left:-80px; top:300px; background:rgba(255,43,214,.10); }
  .scan { position:absolute; inset:0; background:repeating-linear-gradient(0deg, rgba(0,0,0,.18) 0 1px, transparent 1px 3px); }
  svg.circuit { position:absolute; inset:0; }
  .copy { position:absolute; left:90px; top:92px; width:560px; font-family:'Space Grotesk',sans-serif; color:#fafafa; }
  .flag { display:flex; align-items:center; gap:14px; font-weight:700; font-size:19px; letter-spacing:.22em; }
  .bars { display:flex; gap:4px; }
  .bars i { display:block; width:26px; height:8px; transform:skewX(-20deg); }
  .h1 { font-weight:700; font-size:96px; line-height:.95; margin-top:30px; letter-spacing:-.02em; white-space:nowrap; }
  .smes { position:relative; display:inline-block; font-weight:700; font-size:212px; line-height:.9; letter-spacing:-.045em; white-space:nowrap;
    color:var(--lime); text-shadow:-5px 0 var(--mag), 5px 0 var(--vio); }
  .smes::before, .smes::after { content:attr(data-t); position:absolute; left:0; top:0; color:var(--lime); text-shadow:none; }
  .smes::before { clip-path:inset(34% 0 60% 0); transform:translateX(8px); }
  .smes::after  { clip-path:inset(74% 0 19% 0); transform:translateX(-6px); color:#fafafa; }
  .sub { margin-top:34px; display:flex; align-items:center; gap:16px; flex-wrap:nowrap; }
  .sub b { font-size:27px; font-weight:500; white-space:nowrap; }
  .chip { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:17px; color:#09090b; background:var(--lime); padding:7px 12px; white-space:nowrap; }
  .chiprow { margin-top:16px; }
  .mod { position:absolute; width:150px; height:60px; background:#111114; border:1.5px solid; padding:9px 12px; font-family:'Space Grotesk',sans-serif; }
  .mod b { display:block; color:#fafafa; font-size:16px; letter-spacing:.08em; white-space:nowrap; }
  .mod span { display:block; font-family:'JetBrains Mono',monospace; font-size:12.5px; margin-top:4px; white-space:nowrap; }
  .lime { border-color:var(--lime); } .lime span { color:var(--lime); }
  .mag  { border-color:var(--mag); }  .mag span  { color:var(--mag); }
  .core { position:absolute; left:770px; top:235px; width:160px; height:160px; background:#0f0f12; border:2px solid var(--lime);
    box-shadow:0 0 0 8px #09090b, 0 0 0 9px rgba(200,255,46,.35), 0 0 60px rgba(200,255,46,.25);
    display:flex; flex-direction:column; align-items:center; justify-content:center; }
  .core b { font-family:'Space Grotesk',sans-serif; font-size:68px; color:var(--lime); line-height:1; letter-spacing:-.03em; white-space:nowrap; }
  .core span { font-family:'JetBrains Mono',monospace; font-size:12px; color:#a1a1aa; letter-spacing:.2em; margin-top:6px; white-space:nowrap; }
  .tick { position:absolute; width:14px; height:14px; border-color:rgba(255,255,255,.5); border-style:solid; }
</style></head>
<body><div class="stage">
  <div class="glow g1"></div><div class="glow g2"></div>
  <svg class="circuit" width="1200" height="630" viewBox="0 0 1200 630" fill="none">
    <g stroke="rgba(139,92,246,.35)" stroke-width="1.5">
      <path d="M770 280 H720 V250 H660"/><path d="M770 350 H700 V390 H640"/>
      <path d="M930 255 H1000 V200 H1150"/><path d="M930 375 H1010 V420 H1150"/>
      <path d="M850 395 V600"/><path d="M850 235 V30"/>
    </g>
    <g fill="rgba(139,92,246,.6)"><circle cx="660" cy="250" r="3"/><circle cx="640" cy="390" r="3"/><circle cx="1150" cy="200" r="3"/><circle cx="1150" cy="420" r="3"/></g>
    <g fill="#c8ff2e">
      <rect x="784" y="225" width="6" height="10"/><rect x="814" y="225" width="6" height="10"/><rect x="880" y="225" width="6" height="10"/><rect x="910" y="225" width="6" height="10"/>
      <rect x="784" y="395" width="6" height="10"/><rect x="814" y="395" width="6" height="10"/><rect x="880" y="395" width="6" height="10"/><rect x="910" y="395" width="6" height="10"/>
      <rect x="930" y="300" width="10" height="6"/><rect x="930" y="324" width="10" height="6"/>
      <rect x="760" y="300" width="10" height="6"/><rect x="760" y="324" width="10" height="6"/>
    </g>
    <g stroke-width="2.5">
      <path stroke="#c8ff2e" d="M787 225 V180 H765 V130"/>
      <path stroke="#ff2bd6" d="M913 225 V170 H1035 V130"/>
      <path stroke="#c8ff2e" d="M940 315 H965"/>
      <path stroke="#ff2bd6" d="M913 405 V460 H1035 V500"/>
      <path stroke="#c8ff2e" d="M787 405 V450 H765 V500"/>
    </g>
    <g><rect x="760" y="150" width="10" height="10" fill="#fafafa"/><rect x="990" y="165" width="10" height="10" fill="#fafafa"/>
       <rect x="908" y="430" width="10" height="10" fill="#fafafa"/><rect x="782" y="430" width="10" height="10" fill="#fafafa"/></g>
    <g fill="#09090b" stroke-width="2.5">
      <circle cx="765" cy="180" r="4.5" stroke="#c8ff2e"/><circle cx="1035" cy="170" r="4.5" stroke="#ff2bd6"/>
      <circle cx="1035" cy="460" r="4.5" stroke="#ff2bd6"/><circle cx="765" cy="450" r="4.5" stroke="#c8ff2e"/>
    </g>
  </svg>
  <div class="core"><b class="fit" data-max="140">{core0}</b><span>{core1}</span></div>
  <div class="mod lime" style="left:690px;top:70px"><b>{m0}</b><span>{s0}</span></div>
  <div class="mod mag"  style="left:960px;top:70px"><b>{m1}</b><span>{s1}</span></div>
  <div class="mod lime" style="left:965px;top:285px;width:145px"><b>{m2}</b><span>{s2}</span></div>
  <div class="mod mag"  style="left:960px;top:500px"><b>{m3}</b><span>{s3}</span></div>
  <div class="mod lime" style="left:690px;top:500px"><b>{m4}</b><span>{s4}</span></div>
  <div class="copy">
    <div class="flag">{bars}{eyebrow}</div>
    <div class="h1 fit" data-max="560">{l1}</div>
    <div class="smes fit" data-max="560" data-t="{big}">{big}</div>
    <div class="sub"><b class="fit" data-max="560">{sub}</b></div>
    <div class="chiprow"><span class="chip">{chip}</span></div>
  </div>
  <div class="tick" style="left:60px;top:40px;border-width:2px 0 0 2px"></div>
  <div class="tick" style="right:60px;top:40px;border-width:2px 2px 0 0"></div>
  <div class="tick" style="left:60px;bottom:40px;border-width:0 0 2px 2px"></div>
  <div class="tick" style="right:60px;bottom:40px;border-width:0 2px 2px 0"></div>
  <div class="scan"></div>
</div>
<script>
  // Shrink any .fit element until it is no wider than data-max px. Runs after
  // fonts load so the measurement uses Space Grotesk, not the fallback.
  document.fonts.ready.then(() => {
    document.querySelectorAll('.fit').forEach(el => {
      const max = +el.dataset.max;
      let size = parseFloat(getComputedStyle(el).fontSize);
      while (el.scrollWidth > max && size > 10) { size -= 2; el.style.fontSize = size + 'px'; }
    });
    // Modules: shrink readouts that overflow their box.
    document.querySelectorAll('.mod span, .mod b').forEach(el => {
      const max = el.parentElement.clientWidth - 24;
      let size = parseFloat(getComputedStyle(el).fontSize);
      while (el.scrollWidth > max && size > 8) { size -= .5; el.style.fontSize = size + 'px'; }
    });
  });
</script>
</body></html>"""

BARS = '<span class="bars"><i style="background:#007a4d"></i><i style="background:#ffb612"></i><i style="background:#de3831"></i></span>'


def chrome():
    for c in CHROME_CANDIDATES:
        if c and Path(c).exists():
            return c
    sys.exit("Chrome/Edge not found. Set CHROME_PATH.")


def render(name, cfg, exe, tmp):
    e = html.escape
    fields = dict(eyebrow=e(cfg["eyebrow"]), l1=e(cfg["l1"]), big=e(cfg["big"]), sub=e(cfg["sub"]),
                  chip=e(cfg["chip"]), core0=e(cfg["core"][0]), core1=e(cfg["core"][1]),
                  bars=BARS if cfg.get("sa", True) else "")
    for i, (m, s) in enumerate(cfg["mods"]):
        fields[f"m{i}"], fields[f"s{i}"] = e(m), e(s)
    page = TEMPLATE
    for k, v in fields.items():
        page = page.replace("{" + k + "}", v)
    src = tmp / f"{name}.html"
    png = tmp / f"{name}.png"
    src.write_text(page, encoding="utf-8")
    subprocess.run([exe, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
                    "--window-size=1200,630", "--virtual-time-budget=8000", f"--screenshot={png}", src.as_uri()],
                   check=True, capture_output=True)
    dest = OUT / f"{name}.webp"
    Image.open(png).convert("RGB").save(dest, "WEBP", quality=84, method=6)
    print(f"  {dest.relative_to(ROOT)}  {dest.stat().st_size // 1024} KB")


def main():
    exe = chrome()
    wanted = sys.argv[1:]
    with tempfile.TemporaryDirectory() as t:
        for name, cfg in HEROES.items():
            if not wanted or any(w in name for w in wanted):
                render(name, cfg, exe, Path(t))


if __name__ == "__main__":
    main()

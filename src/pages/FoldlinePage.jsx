import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import F, { blankState, SAMPLES, DEFAULT_PLATFORM } from '../foldline';
import '../foldline/foldline.css';

const PLATFORM = DEFAULT_PLATFORM;
const def = F.platform(PLATFORM);
const STORE = `foldline:baseline:${PLATFORM}`;
const MARK = { pass: '✓', warn: '!', fail: '✕' };
const STATUS_WORD = { pass: 'pass', warn: 'warn', fail: 'fail' };

/* which asset controls each format actually uses */
const MEDIA_FIELDS = {
    carousel: ['slides', 'aspect', 'alt', 'coverHook', 'slideIdea'],
    video: ['aspect', 'alt', 'videoLen', 'videoHook', 'captions'],
    image: ['aspect', 'alt', 'imageAdds'],
    newsletter: ['aspect', 'alt'],
    text: [], poll: [], linkout: [],
};

const RATIO = { portrait45: '4 / 5', square: '1 / 1', vertical916: '9 / 16', landscape169: '16 / 9' };

const signed = (n) => `${n > 0 ? '+' : n < 0 ? '−' : '±'}${Math.abs(n)}`;
const tone = (t) => `var(--fl-${t})`;

/* ------------------------------------------------------------------ */

function Item({ r, n, onFix }) {
    return (
        <div className={`fl-item fl-i-${r.status}`}>
            <div className={`fl-dot fl-d-${r.status}`}>{n || MARK[r.status]}</div>
            <div>
                <h5>
                    {r.label}
                    {r.blocking && <span className="fl-crit">Blocking</span>}
                    <em>{r.id} &middot; {r.weight} pts</em>
                </h5>
                <p>{r.note}</p>
                {r.fix && (
                    <button type="button" className="fl-btn fl-btn-quiet fl-btn-sm" onClick={() => onFix(r.fix)}>
                        {def.fixLabels[r.fix] || 'Apply fix'}
                    </button>
                )}
            </div>
        </div>
    );
}

function Dial({ pct, colour }) {
    const CIRC = 2 * Math.PI * 51;
    return (
        <div className="fl-dial">
            <svg width="118" height="118" viewBox="0 0 118 118" aria-hidden="true">
                <circle cx="59" cy="59" r="51" fill="none" stroke="var(--fl-line)" strokeWidth="10" />
                <circle
                    cx="59" cy="59" r="51" fill="none" stroke={colour} strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={CIRC.toFixed(1)}
                    strokeDashoffset={(CIRC * (1 - pct / 100)).toFixed(1)}
                    style={{ transition: 'stroke-dashoffset .45s ease, stroke .3s' }}
                />
            </svg>
            <div className="fl-dial-val"><div><b>{pct}</b><span>score</span></div></div>
        </div>
    );
}

function BeforeAfter({ diff, result, onReset }) {
    if (!diff || (!diff.moved.length && diff.pctDelta === 0 && !diff.verdictChanged)) return null;

    const t = diff.pctDelta > 0 ? 'pass' : diff.pctDelta < 0 ? 'fail' : 'neutral';
    const badge = diff.unblocked ? 'Unblocked'
        : diff.newlyBlocked ? 'Now blocked'
        : diff.pctDelta > 0 ? 'Improved'
        : diff.pctDelta < 0 ? 'Regressed' : 'Changed';

    const reachAfter = result.reach ? result.reach.index : null;
    const summary = [
        diff.gained ? `${diff.gained} test${diff.gained > 1 ? 's' : ''} improved` : '',
        diff.lost ? `${diff.lost} regressed` : '',
        diff.unblocked ? 'blocking cleared' : '',
        diff.newlyBlocked ? 'a blocking test now fails' : '',
        diff.formatChanged ? 'format changed' : '',
    ].filter(Boolean).join(' · ') || 'No net change.';

    return (
        <div className="fl-card fl-pad-lg">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                <h3>Before &rarr; after</h3>
                <span className={`fl-badge fl-b-${t}`}>{badge}</span>
                <button type="button" className="fl-btn fl-btn-quiet fl-btn-sm" style={{ marginLeft: 'auto' }} onClick={onReset}>
                    Reset baseline
                </button>
            </div>
            <p className="fl-small fl-muted" style={{ marginTop: 4 }}>
                Baseline set {new Date(diff.before.at).toLocaleString('en-ZA', {
                    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
                })} &middot; {summary}
            </p>

            <div className="fl-ba" style={{ marginTop: 16 }}>
                <div>
                    <strong>Score</strong>
                    <span className="fl-mono fl-was">{diff.before.pct}</span><em>&rarr;</em>
                    <b className="fl-mono">{result.pct}</b>
                    <span className="fl-mono fl-d" style={{ color: tone(diff.pctDelta > 0 ? 'pass' : diff.pctDelta < 0 ? 'fail' : 'ink-3') }}>
                        {signed(diff.pctDelta)}
                    </span>
                </div>
                <div>
                    <strong>Reach index</strong>
                    <span className="fl-mono fl-was">{diff.before.reach != null ? `${diff.before.reach.toFixed(2)}×` : '—'}</span><em>&rarr;</em>
                    <b className="fl-mono">{reachAfter != null ? `${reachAfter.toFixed(2)}×` : '—'}</b>
                    <span className="fl-mono fl-d" style={{ color: tone(diff.reachDelta > 0 ? 'pass' : diff.reachDelta < 0 ? 'fail' : 'ink-3') }}>
                        {diff.reachRatio != null
                            ? `${diff.reachRatio >= 1 ? '+' : '−'}${Math.round(Math.abs(diff.reachRatio - 1) * 100)}%`
                            : '—'}
                    </span>
                </div>
                <div>
                    <strong>Verdict</strong>
                    <span className="fl-was">{diff.before.verdict.label}</span><em>&rarr;</em>
                    <b>{result.verdict.label}</b><span />
                </div>
            </div>

            <div className="fl-grp" style={{ marginTop: 6 }}>
                <div className="fl-grp-head"><h4>What moved</h4></div>
                {diff.moved.length ? diff.moved.map((m) => {
                    const colour = m.direction === 'up' ? 'pass' : m.direction === 'down' ? 'fail' : 'ink-3';
                    const why = m.direction === 'scope'
                        ? 'no longer scored for this format'
                        : `${STATUS_WORD[m.from]} → ${STATUS_WORD[m.to]}`;
                    return (
                        <div className="fl-dmove" key={m.id}>
                            <span className="fl-mono">{m.id}</span>
                            <span>{m.label}</span>
                            <span className="fl-mono" style={{ color: tone(colour) }}>{why}</span>
                        </div>
                    );
                }) : <p className="fl-small fl-muted">Nothing has moved yet.</p>}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */

export function FoldlinePage() {
    const [state, setState] = useState(() => blankState({ draft: SAMPLES.strong, cadence: 'strong' }));
    const [baseline, setBaseline] = useState(null);
    const [prev, setPrev] = useState(null);
    const [notice, setNotice] = useState(null);
    const [unlocked, setUnlocked] = useState(false);
    const [unicodeBold, setUnicodeBold] = useState(false);
    const [copyLabel, setCopyLabel] = useState({ post: 'Copy post', comment: 'Copy first comment' });

    const result = useMemo(() => F.evaluate(PLATFORM, state), [state]);
    const diff = useMemo(() => F.diff(baseline, result), [baseline, result]);
    const autoKeys = useMemo(() => F.autoFixKeys(PLATFORM, result, state), [result, state]);

    const persist = useCallback((b) => {
        setBaseline(b);
        try {
            if (b) window.localStorage.setItem(STORE, JSON.stringify(b));
            else window.localStorage.removeItem(STORE);
        } catch { /* private mode, blocked storage */ }
    }, []);

    /* Restoring a stored baseline is a genuine subscribe-to-an-external-system
       case: localStorage is browser-only, so it cannot be read during render or
       during the static prerender without breaking hydration. It runs once. */
    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(STORE);
            if (!raw) return;
            const b = JSON.parse(raw);
            // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring persisted state from an external store on mount; runs once
            if (b && b.version === def.version) setBaseline(b);
        } catch { /* private mode, blocked storage */ }
    }, []);

    /* The baseline is the draft as it stood before the first change — captured
       on that change rather than in an effect, so there is no cascading render
       and the comparison is against what the user actually started with. */
    const markBaseline = () => {
        if (!baseline && result.context.words) persist(F.baseline(result, state));
    };

    const set = (patch) => { markBaseline(); setState((s) => ({ ...s, ...patch })); };
    const field = (k) => (e) => { setNotice(null); set({ [k]: e.target.value }); };
    const check = (k) => (e) => set({ [k]: e.target.checked });

    const applyFix = (key) => {
        setPrev(state);
        const out = F.applyFix(PLATFORM, key, state);
        set(out.patch);
        setNotice(out.notice ? { lines: [out.notice] } : null);
    };

    const applyAll = () => {
        setPrev(state);
        markBaseline();
        setState((s) => autoKeys.reduce((acc, k) => ({ ...acc, ...F.applyFix(PLATFORM, k, acc).patch }), s));
        setNotice(null);
    };

    const loadSample = (which, extra) => {
        setPrev(state);
        persist(null);
        setNotice(null);
        setState(blankState({ draft: SAMPLES[which], ...extra }));
    };

    const undo = () => { if (prev) { setState(prev); setPrev(null); setNotice(null); } };

    const copy = (text, which, label) => {
        const done = (msg) => {
            setCopyLabel((c) => ({ ...c, [which]: msg }));
            setTimeout(() => setCopyLabel((c) => ({ ...c, [which]: label })), 1800);
        };
        if (!text) return done('Nothing to copy');
        const plain = () => navigator.clipboard.writeText(text).then(() => done('Copied'), () => done('Copy blocked'));
        /* write text/plain explicitly so no rich-text flavour drags styling in */
        if (window.ClipboardItem && navigator.clipboard?.write) {
            const item = new window.ClipboardItem({ 'text/plain': new Blob([text], { type: 'text/plain' }) });
            return navigator.clipboard.write([item]).then(() => done('Copied'), plain);
        }
        return plain();
    };

    const copyPost = () => {
        if (!unlocked) return;
        const out = F.compose(PLATFORM, state, { unicodeBold });
        copy(out.text, 'post', 'Copy post');
        setNotice(out.changes.length || out.warnings.length ? { changes: out.changes, warnings: out.warnings } : null);
    };

    const copyComment = () => {
        const out = F.compose(PLATFORM, state, { unicodeBold });
        copy(out.comment, 'comment', 'Copy first comment');
    };

    /* ---- derived view data ---- */
    const c = result.context;
    const verdictTone = result.verdict.tone || 'neutral';
    const body = (state.draft || '').trim();
    const folded = body.length > def.fold;
    let cut = def.fold;
    if (folded) { const sp = body.lastIndexOf(' ', def.fold); if (sp > def.fold - 40) cut = sp; }
    const name = (state.authorName || '').trim() || 'Your name';
    const initials = name.split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase() || 'YN';
    const mediaLabel = { carousel: `${state.slideCount}-slide document`, video: 'Native video', image: 'Image', newsletter: 'Newsletter header' }[state.format];
    const shows = MEDIA_FIELDS[state.format] || [];
    const failCount = result.fixes.filter((r) => r.status === 'fail').length;
    const showCrossSell = c.words && (result.blocked || failCount >= 3);

    const cmtStatus = c.bodyUrls.length ? ['Body still contains a link — move it here.', 'fail']
        : (c.cmtUrls.length && c.signposted) ? ['Link parked here and signposted in the body. Post this comment yourself, immediately after publishing.', 'pass']
        : c.cmtUrls.length ? ['Link is here — now add “link in the comments” to the body.', 'warn']
        : c.signposted ? ['The body promises a link in the comments. Paste it here.', 'warn']
        : ['No link anywhere. Fine — only add one if the post genuinely needs it.', 'ink-3'];

    const SIG = { High: 'pass', Medium: 'warn', Low: 'fail' };

    const schema = [
        {
            '@context': 'https://schema.org', '@type': 'SoftwareApplication',
            '@id': 'https://db23.co.za/foldline/#app', name: 'Foldline',
            applicationCategory: 'BusinessApplication', operatingSystem: 'Any modern browser',
            url: 'https://db23.co.za/foldline/', inLanguage: 'en-ZA',
            description: 'Scores a LinkedIn draft against up to 25 weighted tests derived from the 2026 feed ranking model — scoped to text, image, carousel or video — and returns a modelled reach index, a before-and-after comparison, and a composer-ready post.',
            offers: [
                { '@type': 'Offer', name: 'Free score', price: '0', priceCurrency: 'ZAR' },
                { '@type': 'Offer', name: 'Single post report', price: '49', priceCurrency: 'ZAR' },
                { '@type': 'Offer', name: 'Ten-pack', price: '349', priceCurrency: 'ZAR' },
            ],
            publisher: { '@type': 'Organization', name: 'DB23', url: 'https://db23.co.za/' },
            isBasedOn: { '@id': 'https://db23.co.za/foldline/benchmark/#benchmark' },
        },
        {
            '@context': 'https://schema.org', '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'DB23', item: 'https://db23.co.za/' },
                { '@type': 'ListItem', position: 2, name: 'Foldline', item: 'https://db23.co.za/foldline/' },
            ],
        },
        {
            '@context': 'https://schema.org', '@type': 'FAQPage',
            mainEntity: [
                ['Can Foldline predict my LinkedIn reach?', 'No. Foldline returns a relative reach index comparing your draft to a clean baseline post from the same account. It is a diagnosis of what is costing you distribution, not a forecast of impressions.'],
                ['Why does a link in the LinkedIn post body reduce reach?', 'A body link sends the reader off-platform, and the feed is built to keep them on it. Published estimates of the penalty range from roughly a fifth to about half of median reach. Put the link in your own first comment and write "link in the comments" in the post instead.'],
                ['Does Foldline score images, carousels and video?', 'Yes. Eight of the twenty-five tests score the asset: alt text, aspect ratio, whether the image carries meaning, the carousel cover and slide discipline, the video hook, burned-in captions and video length. They apply only to the format being posted, and they score what you declare — Foldline reads text and does not open media files.'],
                ['How do I paste a post into LinkedIn without losing formatting?', 'The LinkedIn composer accepts plain text only. Strip markdown before pasting, because asterisks and hashes render literally; convert dash bullets to real bullet characters; remove non-breaking and zero-width characters; and copy as plain text so no styling rides along. LinkedIn has no bold — the Unicode substitute cannot be read by screen readers and is not indexed by LinkedIn search.'],
                ['How long should a LinkedIn post be in 2026?', 'Roughly 800 to 1,000 characters is the dwell sweet spot: long enough to earn reading time, short enough that readers finish. Only about 210 characters show before the "see more" fold, so the hook must land in the first one or two lines.'],
                ['Is Foldline affiliated with LinkedIn?', 'No. Foldline is an independent tool built by DB23 in Cape Town. It is not affiliated with, endorsed by, or connected to LinkedIn Corporation, and it never connects to your account.'],
            ].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
        },
    ];

    return (
        <PageLayout>
            <SEOHead
                title="Foldline — score your LinkedIn post before you publish | DB23"
                description="Paste a LinkedIn draft and score it against 25 weighted tests from the 2026 feed algorithm — text, image, carousel and video. See where the fold cuts, what costs you reach, and copy a corrected post. Free score, no signup."
                canonical="https://db23.co.za/foldline/"
                keywords="linkedin post checker, linkedin algorithm 2026, linkedin content score, linkedin post analyser south africa"
                schema={schema}
            />

            <div className="fl">
                {/* ---------------- hero ---------------- */}
                <section className="fl-hero">
                    <div className="fl-wrap fl-hero-grid">
                        <div>
                            <span className="fl-pill">LinkedIn benchmark v{def.version} &middot; {def.tests.length} tests</span>
                            <h1 style={{ margin: '18px 0' }}>Know what your post will do before the feed does.</h1>
                            <p className="fl-lede">
                                Paste a draft. Foldline scores it against up to twenty-five weighted tests drawn from how the 2026
                                LinkedIn feed actually ranks &mdash; semantic relevance, dwell, saves, suppression &mdash; and hands back a
                                modelled reach index, the exact lines costing you distribution, a before-and-after as you fix it, and a
                                corrected version that pastes into the composer clean.
                            </p>
                            <div className="fl-bar" style={{ marginTop: 26, gap: 12 }}>
                                <a className="fl-btn" href="#scorer">Score my post free</a>
                                <a className="fl-btn fl-btn-ghost" href="/foldline/benchmark/">Read the benchmark</a>
                            </div>
                            <div className="fl-trust">
                                <div><b>{def.tests.length}</b>weighted tests, scoped by format</div>
                                <div><b>{def.fold}</b>characters before the fold cuts</div>
                                <div><b>R0</b>to score, no signup</div>
                            </div>
                        </div>

                        <div className="fl-card fl-post" aria-label="Preview of how your draft appears in the feed">
                            <div className="fl-post-head">
                                <div className="fl-avatar">{initials}</div>
                                <div>
                                    <div className="fl-post-name">{name}</div>
                                    <div className="fl-post-sub">
                                        {state.profileMatch ? 'Headline aligned to this topic' : "Headline that doesn't match this topic"}
                                    </div>
                                    <div className="fl-post-sub">Now</div>
                                </div>
                            </div>
                            <div className="fl-post-body">
                                {folded ? body.slice(0, cut) : (body || 'Nothing to preview yet.')}
                                {folded && <span className="fl-more">&hellip;see more</span>}
                            </div>
                            {folded && (
                                <div className="fl-foldline">{body.length - cut} characters hidden until they tap</div>
                            )}
                            {mediaLabel && (
                                <div className="fl-post-media" style={{ aspectRatio: RATIO[state.aspect] || '1 / 1' }}>
                                    {mediaLabel} &middot; {state.altText.trim() ? 'alt text set' : 'no alt text'}
                                </div>
                            )}
                            <div className="fl-post-foot"><span>Like</span><span>Comment</span><span>Repost</span><span>Send</span></div>
                        </div>
                    </div>
                </section>

                {/* ---------------- workbench ---------------- */}
                <section className="fl-section" id="scorer">
                    <div className="fl-wrap">
                        <div className="fl-section-head">
                            <div>
                                <span className="fl-eyebrow">The workbench</span>
                                <h2>Paste the draft. Get the verdict.</h2>
                            </div>
                            <p className="fl-muted">
                                The score is free and covers every test that applies. The itemised report, the reach breakdown and the
                                one-click rewrites unlock with a credit. Nothing you paste leaves your browser.
                            </p>
                        </div>

                        <div className="fl-bench">
                            {/* left column */}
                            <div className="fl-stack" style={{ gap: 16 }}>
                                <div className="fl-card fl-pad">
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                                        <h3>The draft</h3>
                                        <span className="fl-small fl-muted fl-mono" style={{ marginLeft: 'auto' }}>
                                            {c.words} words &middot; {c.chars} characters
                                        </span>
                                    </div>
                                    <textarea value={state.draft} onChange={field('draft')} spellCheck aria-label="Your LinkedIn post draft" />
                                    <div className="fl-bar" style={{ marginTop: 12 }}>
                                        <button type="button" className="fl-btn fl-btn-quiet fl-btn-sm" onClick={() => loadSample('weak', { oneIdea: false, replyPlan: false })}>Load a weak example</button>
                                        <button type="button" className="fl-btn fl-btn-quiet fl-btn-sm" onClick={() => loadSample('strong', { cadence: 'strong' })}>Load a strong example</button>
                                        <button type="button" className="fl-btn fl-btn-quiet fl-btn-sm" onClick={() => { setPrev(state); persist(null); set({ draft: '' }); }}>Clear</button>
                                        <button type="button" className="fl-btn fl-btn-quiet fl-btn-sm" onClick={undo} disabled={!prev}>Undo</button>
                                    </div>
                                    {notice && (
                                        <div className="fl-notice" style={{ marginTop: 12 }}>
                                            {notice.lines && notice.lines.map((l, i) => <p key={i}>{l}</p>)}
                                            {notice.changes?.length > 0 && (
                                                <p><b>Cleaned for the composer:</b><br />{notice.changes.join(' ')}</p>
                                            )}
                                            {notice.warnings?.length > 0 && (
                                                <p style={{ marginTop: notice.changes?.length ? 10 : 0 }}>
                                                    <b>Read before posting:</b><br />{notice.warnings.join(' ')}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="fl-card fl-pad">
                                    <h3 style={{ marginBottom: 14 }}>First comment</h3>
                                    <textarea
                                        value={state.comment} onChange={field('comment')} style={{ minHeight: 88 }}
                                        placeholder="Park any external link here, then post it yourself the second the post goes live."
                                        aria-label="First comment"
                                    />
                                    <p className="fl-small" style={{ marginTop: 9, color: tone(cmtStatus[1]) }}>{cmtStatus[0]}</p>
                                </div>

                                <div className="fl-card fl-pad">
                                    <h3 style={{ marginBottom: 14 }}>How it&rsquo;s going out</h3>
                                    <div className="fl-row">
                                        <div>
                                            <label className="fl-f" htmlFor="fl-format">Format</label>
                                            <select id="fl-format" value={state.format} onChange={field('format')}>
                                                <option value="carousel">Document / carousel</option>
                                                <option value="video">Native video</option>
                                                <option value="text">Native text</option>
                                                <option value="image">Single image + text</option>
                                                <option value="newsletter">Newsletter</option>
                                                <option value="poll">Poll</option>
                                                <option value="linkout">Link-out post</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="fl-f" htmlFor="fl-account">Posting as</label>
                                            <select id="fl-account" value={state.account} onChange={field('account')}>
                                                <option value="personal">Personal profile</option>
                                                <option value="page">Company page</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="fl-f" htmlFor="fl-cadence">Your cadence</label>
                                            <select id="fl-cadence" value={state.cadence} onChange={field('cadence')}>
                                                <option value="strong">3+ a week, 8+ weeks</option>
                                                <option value="mid">1&ndash;2 a week</option>
                                                <option value="low">Sporadic</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="fl-f" htmlFor="fl-audience">Who it&rsquo;s for</label>
                                            <input id="fl-audience" type="text" value={state.audience} onChange={field('audience')} placeholder="founders, recruiters, CFOs&hellip;" />
                                        </div>
                                        <div>
                                            <label className="fl-f" htmlFor="fl-author">Your name</label>
                                            <input id="fl-author" type="text" value={state.authorName} onChange={field('authorName')} placeholder="Shown in the preview" />
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 14 }}>
                                        <label className="fl-f" htmlFor="fl-proof">
                                            Your proof point <span style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>&mdash; a number, a result, a date</span>
                                        </label>
                                        <input id="fl-proof" type="text" value={state.proof} onChange={field('proof')} placeholder="We cut onboarding from 11 days to 4 in Q1." />
                                    </div>
                                    <div className="fl-stack" style={{ gap: 9, marginTop: 16 }}>
                                        {[
                                            ['oneIdea', "It's one idea, one audience, one takeaway"],
                                            ['onTheme', "It sits on one of this account's 2–3 defined themes"],
                                            ['profileMatch', 'My headline and experience match this topic'],
                                            ['goodTime', 'Going out on a weekday morning, audience-local'],
                                            ['replyPlan', 'Someone replies to every comment in the first 60–90 minutes'],
                                        ].map(([k, label]) => (
                                            <label className="fl-chk" key={k}>
                                                <input type="checkbox" checked={state[k]} onChange={check(k)} /><span>{label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {shows.length > 0 && (
                                    <div className="fl-card fl-pad">
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                                            <h3>The asset</h3>
                                            <span className="fl-small fl-muted" style={{ marginLeft: 'auto' }}>Scored for this format only</span>
                                        </div>
                                        <p className="fl-small fl-muted" style={{ marginBottom: 14 }}>
                                            Foldline reads text &mdash; it cannot open your file. These are declarations, and the report labels them as such.
                                        </p>
                                        <div className="fl-row">
                                            {shows.includes('slides') && (
                                                <div>
                                                    <label className="fl-f" htmlFor="fl-slides">Slides</label>
                                                    <input id="fl-slides" type="text" inputMode="numeric" value={state.slideCount} onChange={field('slideCount')} />
                                                </div>
                                            )}
                                            {shows.includes('videoLen') && (
                                                <div>
                                                    <label className="fl-f" htmlFor="fl-vlen">Length in seconds</label>
                                                    <input id="fl-vlen" type="text" inputMode="numeric" value={state.videoSeconds} onChange={field('videoSeconds')} />
                                                </div>
                                            )}
                                            {shows.includes('aspect') && (
                                                <div>
                                                    <label className="fl-f" htmlFor="fl-aspect">Aspect ratio</label>
                                                    <select id="fl-aspect" value={state.aspect} onChange={field('aspect')}>
                                                        <option value="portrait45">4:5 portrait</option>
                                                        <option value="square">1:1 square</option>
                                                        <option value="vertical916">9:16 vertical</option>
                                                        <option value="landscape169">16:9 landscape</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                        {shows.includes('alt') && (
                                            <div style={{ marginTop: 14 }}>
                                                <label className="fl-f" htmlFor="fl-alt">Alt text</label>
                                                <input id="fl-alt" type="text" value={state.altText} onChange={field('altText')}
                                                    placeholder="A bar chart showing onboarding time dropping from 11 days to 4." />
                                            </div>
                                        )}
                                        <div className="fl-stack" style={{ gap: 9, marginTop: 16 }}>
                                            {[
                                                ['imageAdds', 'imageAdds', "The image carries information the text doesn't"],
                                                ['coverHook', 'coverHook', 'The cover slide states the claim, not just a title'],
                                                ['slideIdea', 'slidesOneIdea', "One idea per slide, readable at arm's length"],
                                                ['videoHook', 'videoHook3s', 'The claim lands in the first 3 seconds'],
                                                ['captions', 'captions', 'Captions are burned into the file'],
                                            ].filter(([show]) => shows.includes(show)).map(([, k, label]) => (
                                                <label className="fl-chk" key={k}>
                                                    <input type="checkbox" checked={state[k]} onChange={check(k)} /><span>{label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* right column */}
                            <div className="fl-bench-right">
                                <div className="fl-card fl-pad-lg">
                                    <div className="fl-score-top">
                                        <Dial pct={result.pct} colour={verdictTone === 'neutral' ? 'var(--fl-line)' : tone(verdictTone)} />
                                        <div className="fl-verdict">
                                            <span className={`fl-badge fl-b-${verdictTone}`}>
                                                {result.blocked ? 'Blocked' : !c.words ? 'Waiting' : result.pct >= 85 ? 'Clear' : result.pct >= 60 ? 'Close' : 'Below bar'}
                                            </span>
                                            <h3>{result.verdict.label}</h3>
                                            <p className="fl-small fl-muted" style={{ marginTop: 5 }}>{result.verdict.note}</p>
                                            <p className="fl-small fl-mono" style={{ marginTop: 7, color: 'var(--fl-ink-3)' }}>
                                                {result.earned.toFixed(1).replace(/\.0$/, '')} of {result.total} points that apply to a {def.formatNames[state.format]} post
                                            </p>
                                        </div>
                                    </div>

                                    <div className="fl-reach">
                                        <b>{c.words ? `${result.reach.index.toFixed(2)}×` : '—'}</b>
                                        <small>Modelled reach index against a clean baseline post from the same account. Directional, not a guarantee.</small>
                                    </div>

                                    <div className="fl-sig">
                                        {result.signals.map((s) => (
                                            <div key={s.name}>
                                                <strong>{s.name}</strong>
                                                <b style={{ color: tone(SIG[s.level]) }}>{s.level}</b>
                                                <span>{s.why}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="fl-bar" style={{ marginTop: 18 }}>
                                        <button type="button" className="fl-btn" onClick={() => setUnlocked(true)}>Run the full audit</button>
                                        <button type="button" className="fl-btn fl-btn-ghost fl-btn-sm" onClick={copyPost} disabled={!unlocked}>{copyLabel.post}</button>
                                        <button type="button" className="fl-btn fl-btn-quiet fl-btn-sm" onClick={copyComment}>{copyLabel.comment}</button>
                                    </div>
                                    <label className="fl-chk" style={{ marginTop: 12 }}>
                                        <input type="checkbox" checked={unicodeBold} onChange={(e) => setUnicodeBold(e.target.checked)} />
                                        <span className="fl-small">
                                            Convert <b>**bold**</b> to Unicode bold on copy &mdash; LinkedIn has no real bold, and screen
                                            readers cannot read the substitute. Use sparingly, never in the hook.
                                        </span>
                                    </label>

                                    {showCrossSell && (
                                        <div className="fl-crosssell">
                                            <p>
                                                <b>{failCount} test{failCount === 1 ? '' : 's'} failed.</b> Want this done properly every week
                                                instead? DB23 runs LinkedIn content for B2B teams in Cape Town.{' '}
                                                <a href="/contact/">Talk to us &rarr;</a>
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <BeforeAfter diff={diff} result={result} onReset={() => persist(F.baseline(result, state))} />

                                <div className={`fl-card fl-pad-lg fl-lock${unlocked ? '' : ' is-locked'}`}>
                                    {!unlocked && (
                                        <div className="fl-lockpanel">
                                            <h4>Unlock the full report</h4>
                                            <p>
                                                Item-by-item scoring across every applicable test, the reach multiplier breakdown,
                                                one-click rewrites and the copy-ready post. <b>R49</b> for this post.
                                            </p>
                                            <div className="fl-bar">
                                                <button type="button" className="fl-btn" onClick={() => setNotice({ lines: ['Checkout is not connected yet. Use “Try it on this run” to see the full report.'] })}>
                                                    Unlock this post &mdash; R49
                                                </button>
                                                <button type="button" className="fl-btn fl-btn-quiet fl-btn-sm" onClick={() => setUnlocked(true)}>Try it on this run</button>
                                            </div>
                                            <p className="fl-small fl-muted" style={{ marginTop: 12 }}>Credits never expire.</p>
                                        </div>
                                    )}

                                    <div className="fl-lockable">
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                                            <h3>Where the reach goes</h3>
                                            <span className="fl-small fl-mono fl-muted" style={{ marginLeft: 'auto' }}>
                                                {c.words ? `${result.reach.index.toFixed(2)}×` : '—'}
                                            </span>
                                        </div>
                                        <div className="fl-stack" style={{ marginTop: 10, gap: 5 }}>
                                            {c.words ? result.reach.parts.map((p, i) => (
                                                <div className="fl-rp" key={`${p.what}-${i}`}>
                                                    <span>{p.what}</span>
                                                    <span className="fl-mono" style={{ color: tone(p.mult >= 1.05 ? 'pass' : p.mult >= 0.95 ? 'ink-2' : 'fail') }}>
                                                        &times;{p.mult.toFixed(2)}
                                                    </span>
                                                </div>
                                            )) : <p className="fl-small fl-muted">Paste a draft to see the breakdown.</p>}
                                        </div>

                                        {result.groups.map((g) => (
                                            <div className="fl-grp" key={g.id}>
                                                <div className="fl-grp-head">
                                                    <h4>{g.label}</h4>
                                                    <span className="fl-mono">{g.weight} of {result.total} pts</span>
                                                </div>
                                                {g.blurb && <p className="fl-small fl-muted" style={{ margin: '-4px 0 10px' }}>{g.blurb}</p>}
                                                {g.results.map((r) => <Item key={r.id} r={r} onFix={applyFix} />)}
                                            </div>
                                        ))}

                                        <div className="fl-grp">
                                            <div className="fl-grp-head">
                                                <h4>Fix list, in priority order</h4>
                                                <span className="fl-mono">{autoKeys.length} automatic fix{autoKeys.length === 1 ? '' : 'es'}</span>
                                            </div>
                                            {result.fixes.length
                                                ? result.fixes.map((r, i) => <Item key={r.id} r={r} n={i + 1} onFix={applyFix} />)
                                                : <p className="fl-small fl-muted">Nothing left to fix. Copy it out and post it.</p>}
                                            {autoKeys.length > 1 && (
                                                <button type="button" className="fl-btn fl-btn-ghost fl-btn-sm" style={{ marginTop: 10 }} onClick={applyAll}>
                                                    Apply every mechanical fix
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------------- the tests ---------------- */}
                <section className="fl-section" id="tests">
                    <div className="fl-wrap">
                        <div className="fl-section-head">
                            <div>
                                <span className="fl-eyebrow">The benchmark</span>
                                <h2>Every draft clears every test that applies to it.</h2>
                            </div>
                            <p className="fl-muted">
                                Eleven tests cover craft and the suppression behaviours LinkedIn penalises outright. Six come from the
                                2026 interest-graph rebuild, where an in-house ranking model reads the post for meaning and matches it
                                to specific readers. Eight more score the asset &mdash; image, carousel or video &mdash; and apply only to the
                                format you are posting, so a text post is never marked down for lacking a video hook. Two are blocking:
                                fail either and the verdict is <em>Fix before publishing</em> no matter how well the rest scores.{' '}
                                <a href="/foldline/benchmark/">Full benchmark, with weights and evidence grades &rarr;</a>
                            </p>
                        </div>
                        <div className="fl-two">
                            {[0, 1].map((half) => (
                                <div className="fl-stack" key={half}>
                                    {def.tests
                                        .slice(half * Math.ceil(def.tests.length / 2), (half + 1) * Math.ceil(def.tests.length / 2))
                                        .map((t) => (
                                            <div className="fl-test" key={t.id}>
                                                <i>{t.id}</i>
                                                <div><b>{t.label}</b><br /><span>{def.docs[t.id]?.short}</span></div>
                                                <em>{t.weight} pts</em>
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------------- pricing ---------------- */}
                <section className="fl-section" id="pricing">
                    <div className="fl-wrap">
                        <div className="fl-section-head">
                            <div><span className="fl-eyebrow">Pricing</span><h2>Pay per post. No subscription trap.</h2></div>
                            <p className="fl-muted">
                                One credit scores one draft &mdash; unlimited re-runs on that draft while you fix it. Prices in ZAR, VAT included.
                            </p>
                        </div>
                        <div className="fl-tiers">
                            {[
                                { eyebrow: 'Single post', price: '49', per: 'one credit', feature: false, cta: 'Buy one credit', ghost: true,
                                    items: ['Full report on every applicable test', 'Reach index with the multiplier breakdown', 'One-click rewrites and copy-ready output', 'Unlimited re-scores on that draft'] },
                                { eyebrow: 'Ten-pack · most bought', price: '349', per: 'R35 a post · credits never expire', feature: true, cta: 'Buy ten credits', ghost: false,
                                    items: ['Everything in Single post, ten times', 'Saved drafts and score history', 'Carousel slide planner', 'Weekly cadence tracker'] },
                                { eyebrow: 'Agency', price: '1 490', per: 'unlimited posts, up to 10 client profiles', feature: false, cta: 'Start agency plan', ghost: true, suffix: '/mo',
                                    items: ['Unlimited scoring across every client', 'Per-client theme locking and voice profile', 'White-label PDF report for client approval', 'Team seats and shared credit pool'] },
                            ].map((t) => (
                                <div className={`fl-card fl-tier${t.feature ? ' is-feature' : ''}`} key={t.eyebrow}>
                                    <div>
                                        <span className="fl-eyebrow" style={t.feature ? { color: 'var(--fl-blue)' } : undefined}>{t.eyebrow}</span>
                                        <div className="fl-price">
                                            <sup>R</sup>{t.price}
                                            {t.suffix && <span style={{ fontSize: 15, fontFamily: 'inherit', letterSpacing: 0 }}>{t.suffix}</span>}
                                        </div>
                                        <div className="fl-per">{t.per}</div>
                                    </div>
                                    <ul>{t.items.map((i) => <li key={i}><span className="fl-tick">&#10003;</span>{i}</li>)}</ul>
                                    <a className={`fl-btn${t.ghost ? ' fl-btn-ghost' : ''}`} href="/contact/">{t.cta}</a>
                                </div>
                            ))}
                        </div>
                        <p className="fl-small fl-muted" style={{ marginTop: 18 }}>
                            Checkout is not connected yet &mdash; the buttons go to the contact form. <b>Try it on this run</b> in the
                            report panel unlocks the full output so you can see exactly what a credit buys.
                        </p>
                    </div>
                </section>

                {/* ---------------- faq ---------------- */}
                <section className="fl-section" id="faq">
                    <div className="fl-wrap">
                        <div className="fl-section-head">
                            <div><span className="fl-eyebrow">Questions</span><h2>The honest answers.</h2></div>
                        </div>
                        <div style={{ maxWidth: '78ch' }}>
                            {[
                                ['Can you actually predict my reach?', <>No, and anyone selling you a number is guessing. Foldline gives you a <em>relative</em> index: how this draft compares to a clean baseline post from the same account, based on the format, suppression and quality signals that published 2026 breakdowns agree on directionally. The value is the diagnosis &mdash; the specific line costing you the fold, the link halving your distribution &mdash; not the decimal place.</>, true],
                                ['Why does my carousel score out of a different number to my text post?', <>Because eight of the twenty-five tests only apply to the asset. A text post is scored out of 113 points, a carousel out of 135, a video out of 141 &mdash; tests that do not apply are dropped from the denominator as well as the result, so the percentage stays comparable. A text post is never marked down for lacking burned-in captions.</>],
                                ['Can Foldline actually see my image or video?', <>No. It reads text. The asset tests score what you declare &mdash; that captions are burned in, that the cover slide carries the claim, that the alt text is written. They are stated intentions, and the report labels them that way. The one thing it does read is your alt text, which is also the only part of the asset the ranking model reads.</>],
                                ['Will the copied post keep its formatting on LinkedIn?', <>That is what the copy button is for. The composer takes plain text only, so before copying, Foldline strips markdown that would show up literally, converts <code>- </code> bullets to real &bull; characters, removes any unresolved <code>[rewrite:]</code> markers left over from a fix, collapses runs of blank lines, deletes invisible non-breaking and zero-width characters, and writes to the clipboard as plain text so no styling rides along. It tells you everything it changed.</>],
                                ['Why is a link in the post body such a big deal?', <>Because it sends the reader off-platform, and the feed is built to keep them on it. Published estimates for the penalty range from roughly a fifth to about half of median reach. Foldline treats it as blocking and shows the fix: strip it from the body, signpost &ldquo;link in the comments&rdquo;, and park the URL in your own first comment the moment you publish.</>],
                                ['Is this affiliated with LinkedIn?', <>No. Foldline is an independent tool built by DB23 in Cape Town. It is not affiliated with, endorsed by, or connected to LinkedIn Corporation, and it does not connect to your account, read your analytics, or post on your behalf. You paste text; it scores text.</>],
                                ['Do you store my drafts?', <>No. Scoring runs entirely in your browser &mdash; nothing is sent to a server. Only your baseline score is kept, in your own browser&rsquo;s local storage, so the before-and-after survives a refresh.</>],
                            ].map(([q, a, open]) => (
                                <details key={q} open={open || undefined}>
                                    <summary>{q}</summary>
                                    <p>{a}</p>
                                </details>
                            ))}
                        </div>
                        <p className="fl-small fl-muted" style={{ marginTop: 28, maxWidth: '70ch' }}>
                            Foldline is an independent tool by DB23. Not affiliated with, endorsed by, or connected to LinkedIn
                            Corporation. Reach figures are directional models, not guarantees.
                        </p>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
}

export default FoldlinePage;

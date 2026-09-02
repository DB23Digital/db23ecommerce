import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { SEOHead } from '../components/SEOHead';
import F, { DEFAULT_PLATFORM } from '../foldline';
import '../foldline/foldline.css';

/* The whole document is rendered from the platform config, so the published
   standard and the code that runs it cannot drift apart. Prerendered at build
   time, so it ships as static indexable HTML. */
const def = F.platform(DEFAULT_PLATFORM);
const CATALOGUE = def.tests.reduce((s, t) => s + t.weight, 0);
const ALWAYS = def.tests.filter((t) => !t.appliesTo);
const ALWAYS_POINTS = ALWAYS.reduce((s, t) => s + t.weight, 0);
const SCOPED = def.tests.filter((t) => t.appliesTo);
const BLOCKING = def.tests.filter((t) => t.blocking);

/* denominator per format, derived rather than typed */
const FORMATS = ['text', 'newsletter', 'image', 'carousel', 'video'];
const FORMAT_LABEL = {
    text: 'Text-only, poll, link-out', newsletter: 'Newsletter',
    image: 'Image + text', carousel: 'Document / carousel', video: 'Native video',
};
const scopeFor = (format) => {
    const applies = def.tests.filter((t) => !t.appliesTo || t.appliesTo({ format }, {}));
    return {
        format,
        assetIds: applies.filter((t) => t.group === 'media').map((t) => t.id),
        points: applies.reduce((s, t) => s + t.weight, 0),
    };
};
const SCOPES = FORMATS.map(scopeFor);

const SECTIONS = [
    ['s1', 'What this measures'], ['s2', 'How scoring works'], ['s3', 'The tests'],
    ['s4', 'Reach index'], ['s5', 'Signal hierarchy'], ['s6', 'Method and limits'],
    ['s7', 'Benchmark family'], ['s8', 'Changelog'], ['s9', 'How to cite'],
];

const CITE = `DB23. (2026). The Foldline Benchmark — LinkedIn v${def.version}. Retrieved from https://db23.co.za/foldline/benchmark/`;

export function FoldlineBenchmarkPage() {
    const schema = [
        {
            '@context': 'https://schema.org', '@type': 'TechArticle',
            '@id': 'https://db23.co.za/foldline/benchmark/#benchmark',
            headline: `The Foldline Benchmark — LinkedIn v${def.version} (2026)`,
            name: `Foldline Benchmark LI v${def.version}`,
            url: 'https://db23.co.za/foldline/benchmark/',
            description: `An open, versioned standard for LinkedIn content quality: ${def.tests.length} weighted tests scoped by format, ${BLOCKING.length} of them blocking, each with a pass condition, a weight and an evidence grade.`,
            datePublished: '2026-09-01', dateModified: '2026-09-01',
            version: def.version, inLanguage: 'en-ZA',
            license: 'https://creativecommons.org/licenses/by/4.0/',
            isAccessibleForFree: true,
            author: { '@type': 'Organization', name: 'DB23', url: 'https://db23.co.za/' },
            publisher: { '@type': 'Organization', name: 'DB23', url: 'https://db23.co.za/' },
            about: [
                { '@type': 'Thing', name: 'LinkedIn algorithm' },
                { '@type': 'Thing', name: 'Content quality benchmarking' },
            ],
        },
        {
            '@context': 'https://schema.org', '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'DB23', item: 'https://db23.co.za/' },
                { '@type': 'ListItem', position: 2, name: 'Foldline', item: 'https://db23.co.za/foldline/' },
                { '@type': 'ListItem', position: 3, name: 'Benchmark', item: 'https://db23.co.za/foldline/benchmark/' },
            ],
        },
        {
            '@context': 'https://schema.org', '@type': 'FAQPage',
            mainEntity: [
                ['What is the Foldline Benchmark?', `The Foldline Benchmark is an open, versioned standard for judging whether a LinkedIn post is ready to publish. Version LI v${def.version} defines ${def.tests.length} weighted tests. ${ALWAYS.length} apply to every post and are worth ${ALWAYS_POINTS} points; the remaining ${SCOPED.length} are scoped to the format being posted, so a video is scored out of ${scopeFor('video').points} points and a text post out of ${ALWAYS_POINTS}. ${BLOCKING.length} tests are blocking: fail any one and the post is not ready regardless of the score.`],
                ['What are the blocking tests?', 'LI-05, external link discipline: no external link in the post body. LI-06, no engagement bait: no phrasing such as "comment YES" or "agree?". LI-26, character limit: a post over 3,000 characters cannot be published at all. The first two are behaviours LinkedIn suppresses directly; the third is a hard platform limit. No amount of craft elsewhere compensates for any of them.'],
                ['What do the evidence grades A, B and C mean?', 'Grade A means the test measures something directly observable, such as character count before the fold. Grade B means the rule is corroborated across multiple published 2026 breakdowns. Grade C means the rule is directional: the direction is agreed, the magnitude is not.'],
                ['How is the Foldline score calculated?', 'Each applicable test returns pass, warn or fail. A pass earns full weight, a warn earns half, a fail earns none. The total earned is divided by the points that apply to that format, not the whole catalogue, and expressed as a percentage. 85 percent or above is Ship it, 60 to 84 is Tighten it, below 60 is Rework it, and any blocking failure overrides all of them.'],
            ].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
        },
    ];

    return (
        <PageLayout>
            <SEOHead
                title={`The Foldline Benchmark — LinkedIn v${def.version} (2026) | DB23`}
                description={`An open, versioned standard for LinkedIn content quality: ${def.tests.length} weighted tests scoped by format, ${BLOCKING.length} of them blocking, each with a pass condition, a weight and an evidence grade. Free to read, free to cite.`}
                canonical="https://db23.co.za/foldline/benchmark/"
                keywords="linkedin algorithm 2026, linkedin content benchmark, linkedin ranking factors, linkedin post standard"
                schema={schema}
            />

            <div className="fl">
                <main className="fl-wrap fl-doc">
                    <aside className="fl-toc" aria-label="Contents">
                        <span className="fl-eyebrow">Contents</span>
                        <ol>{SECTIONS.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol>
                    </aside>

                    <article>
                        <header className="fl-dochead">
                            <span className="fl-pill">Open standard &middot; free to cite</span>
                            <h1>The Foldline Benchmark &mdash; LinkedIn v{def.version}</h1>
                            <p className="fl-answer">
                                The Foldline Benchmark is an open, versioned standard for judging whether a LinkedIn post is ready to
                                publish. Version LI&nbsp;v{def.version} defines <b>{def.tests.length} weighted tests</b>. {ALWAYS.length} apply to
                                every post; {SCOPED.length} more are scoped to the format you are actually posting.
                                {BLOCKING.length} are <b>blocking</b>: fail any one and the post is not ready, whatever the score.
                            </p>
                            <dl className="fl-meta">
                                {[
                                    ['Version', `LI v${def.version}`], ['Published', '2026-09-01'],
                                    ['Tests', `${def.tests.length} (${ALWAYS.length} always-on)`],
                                    ['Blocking', BLOCKING.map((t) => t.id).join(', ')],
                                    ['Total points', `${ALWAYS_POINTS}–${CATALOGUE} by format`],
                                    ['Engine', `v${F.ENGINE_VERSION}`], ['Licence', 'CC BY 4.0'], ['Maintainer', 'DB23'],
                                ].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                            </dl>
                        </header>

                        <section className="fl-s" id="s1">
                            <h2><span className="fl-n">01</span>What this measures</h2>
                            <p>
                                LinkedIn&rsquo;s 2026 feed does not rank by keywords or hashtags. It ranks with a large language model that
                                reads each post for meaning, intent and topical relevance, and matches it to the specific readers most
                                likely to find it useful. Reach is narrower and more relevant than it was &mdash; by design, not by failure.
                            </p>
                            <p>
                                The benchmark therefore measures one thing: <b>whether a relevant reader will stop, stay, and respond
                                with something real.</b> Every test below serves that outcome. Nothing here measures vanity reach.
                            </p>
                            <div className="fl-keyline">
                                The benchmark is a <b>publishing gate</b>, not a prediction. It tells you whether a draft is ready and
                                what is costing it distribution. It does not forecast impressions, and no honest tool can.
                            </div>
                            <p>
                                Tests split into three groups. <b>Craft and compliance</b> (LI-01 to LI-11) covers how the post is built
                                and the behaviours the platform suppresses outright. <b>Interest graph</b> (LI-12 to LI-17) covers how
                                the ranking model reads the post, its author, and who it should reach. <b>The asset</b> (LI-18 to LI-25)
                                covers the image, document or video attached to it.
                            </p>

                            <h3>Scoping: a test only counts when it applies</h3>
                            <p>
                                The first {ALWAYS.length} tests apply to every post. The {SCOPED.length} asset tests apply only to the
                                format being posted &mdash; a text-only post is never marked down for lacking a video hook, and a video is
                                never asked how many slides it has.
                            </p>
                            <p>
                                Tests that do not apply are excluded from the <em>denominator</em> as well as the result, so the
                                percentage stays comparable across formats.
                            </p>
                            <div className="fl-tablewrap">
                                <table>
                                    <thead><tr><th>Format</th><th>Asset tests that apply</th><th className="fl-num">Points</th></tr></thead>
                                    <tbody>
                                        {SCOPES.map((s) => (
                                            <tr key={s.format}>
                                                <td><b>{FORMAT_LABEL[s.format]}</b></td>
                                                <td className="fl-id">{s.assetIds.length ? s.assetIds.join(', ') : '—'}</td>
                                                <td className="fl-num">{s.points}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="fl-keyline" style={{ marginTop: 14 }}>
                                The asset tests score <b>what you declare</b>, not the file. Foldline reads text; it cannot open your MP4
                                or look at your cover slide. Every asset test is a stated intention, and the report labels it as one. A
                                benchmark that pretended otherwise would be lying about its own reach.
                            </div>
                        </section>

                        <section className="fl-s" id="s2">
                            <h2><span className="fl-n">02</span>How scoring works</h2>
                            <p>Every test returns one of three states, and each earns a fraction of that test&rsquo;s weight:</p>
                            <ul>
                                <li><b>Pass</b> &mdash; full weight.</li>
                                <li><b>Warn</b> &mdash; half weight. The rule is not broken, but reach is being left on the table.</li>
                                <li><b>Fail</b> &mdash; no weight.</li>
                            </ul>
                            <p>
                                Earned points are divided by the points that applied and expressed as a percentage. Weights are not
                                uniform: originality (LI-03, 12 points) carries six times the weight of hashtag discipline (LI-09, 2
                                points), because that is roughly the ratio of their effect.
                            </p>
                            <h3>Verdict bands</h3>
                            <div className="fl-tablewrap">
                                <table>
                                    <thead><tr><th>Verdict</th><th className="fl-num">Score</th><th>Meaning</th></tr></thead>
                                    <tbody>
                                        <tr>
                                            <td><span className="fl-badge fl-b-fail">{def.blockedVerdict.label}</span></td>
                                            <td className="fl-num">any</td>
                                            <td>A blocking test failed. Overrides every other result &mdash; nothing compensates.</td>
                                        </tr>
                                        <tr><td><span className="fl-badge fl-b-pass">Ship it</span></td><td className="fl-num">&ge; 85%</td><td>Both blocking tests pass and the craft rules hold.</td></tr>
                                        <tr><td><span className="fl-badge fl-b-warn">Tighten it</span></td><td className="fl-num">60&ndash;84%</td><td>Publishable, but working the fix list first is worth more than posting sooner.</td></tr>
                                        <tr><td><span className="fl-badge fl-b-fail">Rework it</span></td><td className="fl-num">&lt; 60%</td><td>Below the bar on too many tests. Rebuild around one idea, one reader, one takeaway.</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p style={{ marginTop: 14 }}>
                                Two overrides apply. A <b>blocking failure</b> forces <em>{def.blockedVerdict.label}</em> at any score. A
                                draft under <b>50 words</b> forces <em>Rework it</em>: a clean stub is not a shippable post, and the
                                benchmark refuses to let an empty draft score well by passing the declarative tests.
                            </p>
                        </section>

                        <section className="fl-s" id="s3">
                            <h2><span className="fl-n">03</span>The {def.tests.length} tests</h2>
                            <p>
                                Test IDs are stable and citable. A retired test keeps its ID and is marked retired; new tests take new
                                IDs. Weights may change between minor versions, IDs never do.
                            </p>
                            {def.groups.map((g) => {
                                const members = def.tests.filter((t) => t.group === g.id);
                                if (!members.length) return null;
                                return (
                                    <div key={g.id}>
                                        <h3>{g.label}</h3>
                                        <p className="fl-small">{g.blurb}</p>
                                        {members.map((t) => {
                                            const d = def.docs[t.id] || {};
                                            return (
                                                <div className="fl-testcard" id={t.id.toLowerCase()} key={t.id}>
                                                    <div className="fl-tid">{t.id}</div>
                                                    <div>
                                                        <h4>
                                                            {t.label}
                                                            {t.blocking && <span className="fl-badge fl-b-fail">Blocking</span>}
                                                        </h4>
                                                        <dl>
                                                            <dt>Pass</dt><dd>{d.pass}</dd>
                                                            <dt>Fail</dt><dd>{d.fail}</dd>
                                                            <dt>Why</dt><dd>{d.why}</dd>
                                                        </dl>
                                                    </div>
                                                    <div className="fl-side">
                                                        <span className="fl-wt">{t.weight} pts</span>
                                                        <span className={`fl-grade fl-grade-${t.evidence}`} title={`Evidence grade ${t.evidence}`}>{t.evidence}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </section>

                        <section className="fl-s" id="s4">
                            <h2><span className="fl-n">04</span>Reach index</h2>
                            <p>
                                Alongside the score, Foldline reports a <b>reach index</b>: the product of a set of multipliers, expressed
                                against a clean baseline post from the same account. An index of 1.40&times; means the draft should
                                out-reach that account&rsquo;s own baseline by roughly forty percent. It is not a prediction of impressions,
                                and it is clamped to {def.reach.clamp[0].toFixed(2)}&times;&ndash;{def.reach.clamp[1].toFixed(2)}&times; so it
                                never reads as precision it does not have.
                            </p>
                            <div className="fl-tablewrap">
                                <table>
                                    <thead><tr><th>Class</th><th>Factor</th><th className="fl-num">Multiplier</th><th>Note</th></tr></thead>
                                    <tbody>
                                        {def.reach.table.map((r) => (
                                            <tr key={`${r.group}-${r.what}`}>
                                                <td>{r.group}</td><td><b>{r.what}</b></td>
                                                <td className="fl-num">&times;{r.mult.toFixed(2)}</td><td>{r.note}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p style={{ marginTop: 14 }}>
                                Format multipliers are relative to each other, not absolute. The link-in-body figure of 0.65&times; sits
                                deliberately in the middle of the published range &mdash; estimates run from roughly 0.80&times; to
                                0.50&times;, and the benchmark does not pretend to know which is right.
                            </p>
                        </section>

                        <section className="fl-s" id="s5">
                            <h2><span className="fl-n">05</span>Signal hierarchy</h2>
                            <p>Depth of attention now outweighs volume of taps. The tests are weighted to serve this order:</p>
                            <ol>
                                <li><b>Saves</b> &mdash; the strongest signal, reportedly around five times a like. Frameworks, checklists and reference lists earn them; opinions rarely do.</li>
                                <li><b>Substantive comments</b> &mdash; multi-sentence replies that add a perspective. A handful of real comments beats hundreds of reactions.</li>
                                <li><b>Dwell time</b> &mdash; how long someone reads or watches before scrolling. The core passive signal, and what hooks, white space, carousels and video all ultimately serve.</li>
                                <li><b>Reshares with a genuine take</b> &mdash; a reshare with commentary, not a bare repost.</li>
                                <li><b>Reactions</b> &mdash; baseline only. Do not optimise for these.</li>
                            </ol>
                            <div className="fl-keyline">
                                The <b>first 60&ndash;90 minutes</b> decide distribution. Early meaningful engagement is the test the ranking
                                model runs before widening reach. Plan to reply to every early comment in full sentences &mdash; replies
                                count, and they pull the thread back up.
                            </div>
                        </section>

                        <section className="fl-s" id="s6">
                            <h2><span className="fl-n">06</span>Method, evidence and limits</h2>
                            <p>
                                Every test carries an evidence grade. This is unusual and deliberate: a benchmark that hides its own
                                confidence is worth less than one that states it.
                            </p>
                            <div className="fl-tablewrap">
                                <table>
                                    <thead><tr><th>Grade</th><th>Means</th><th className="fl-num">Tests</th><th>Example</th></tr></thead>
                                    <tbody>
                                        {[
                                            ['A', 'Directly observable in the text or the declaration. Measured, not inferred.', 'LI-01 — characters before the fold.'],
                                            ['B', 'Corroborated across multiple independent published 2026 breakdowns.', 'LI-12 — profile–topic alignment affects distribution.'],
                                            ['C', 'Directional. The direction is agreed; the magnitude is not.', 'LI-15 — the 800–1,000 character dwell band.'],
                                        ].map(([g, means, eg]) => (
                                            <tr key={g}>
                                                <td><span className={`fl-grade fl-grade-${g}`}>{g}</span></td>
                                                <td>{means}</td>
                                                <td className="fl-num">{def.tests.filter((t) => t.evidence === g).length}</td>
                                                <td>{eg}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <h3>What this benchmark cannot do</h3>
                            <ul>
                                <li>It <b>cannot predict impressions.</b> No external tool can. Distribution depends on your specific graph, your history and who happens to be online.</li>
                                <li>It <b>cannot read your images, video or slides.</b> The asset tests score what you declare, not the file.</li>
                                <li>It <b>cannot judge whether your idea is any good.</b> A well-built post about nothing still scores well on craft. LI-03 catches filler, not banality.</li>
                                <li>It <b>cannot see your audience.</b> Timing and theme fit are declared by you, not verified.</li>
                                <li>Multipliers are <b>modelled, not measured.</b> They encode published estimates and are revised as better data arrives.</li>
                            </ul>
                            <h3>Roadmap for evidence</h3>
                            <p>
                                This version is built on published breakdowns of the 2026 ranking changes plus direct observation of the
                                composer. It is not built on a dataset, and it does not claim to be. Foldline is collecting
                                post-publication outcomes &mdash; score against actual reach &mdash; and a correlation study will be published
                                under this benchmark when the sample is large enough to mean anything. Until then, every grade C claim
                                should be read as a working assumption.
                            </p>
                        </section>

                        <section className="fl-s" id="s7">
                            <h2><span className="fl-n">07</span>Benchmark family</h2>
                            <p>
                                The scoring engine is platform-agnostic. A platform is defined by its own test set, weights, fold length
                                and multipliers; the engine that runs them is shared. Test IDs are namespaced by platform, so{' '}
                                <code>LI-05</code> and a future <code>X-05</code> are unrelated tests that never collide.
                            </p>
                            <div className="fl-tablewrap">
                                <table>
                                    <thead><tr><th>Benchmark</th><th>Prefix</th><th className="fl-num">Tests</th><th>Status</th></tr></thead>
                                    <tbody>
                                        <tr>
                                            <td><b>LinkedIn</b></td><td className="fl-id">LI-</td>
                                            <td className="fl-num">{def.tests.length}</td>
                                            <td><span className="fl-badge fl-b-pass">v{def.version} live</span></td>
                                        </tr>
                                        {[['X / Twitter', 'X-'], ['Instagram', 'IG-'], ['Email subject lines', 'EM-'], ['YouTube titles', 'YT-']].map(([n, p]) => (
                                            <tr key={p}>
                                                <td>{n}</td><td className="fl-id">{p}</td><td className="fl-num">&mdash;</td>
                                                <td><span className="fl-badge fl-b-neutral">Planned</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p style={{ marginTop: 14 }}>
                                Planned means exactly that: designed for, not built. No date is promised, and nothing here should be read
                                as available.
                            </p>
                        </section>

                        <section className="fl-s" id="s8">
                            <h2><span className="fl-n">08</span>Changelog and versioning</h2>
                            <p>
                                The benchmark is versioned <code>PLATFORM vMAJOR.MINOR.PATCH</code>. A <b>major</b> bump adds or retires
                                tests. A <b>minor</b> bump changes weights, thresholds or bands. A <b>patch</b> corrects wording or a
                                detector without changing any score. Citations should always name the full version, because scores are
                                not comparable across major versions.
                            </p>
                            <div className="fl-changelog">
                                <div>
                                    <h4>LI v3.0.0 <span>2026-09-01</span></h4>
                                    <ul>
                                        <li>Added <b>LI-26, the character limit</b>, as a third blocking test. LinkedIn refuses a post
                                            over 3,000 characters outright, so an over-long draft can never be publishable however well
                                            it scores elsewhere.</li>
                                        <li>Until this version the limit was only a warning shown when copying, so a 3,500-character
                                            post could return a passing verdict for something the composer would not accept. A defect,
                                            found by a reader running real content through the tool.</li>
                                        <li>LI-26 also warns when the first comment exceeds its own 1,250-character limit.</li>
                                        <li>Major bump: the catalogue gained a test and every denominator moved up by 6 points.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4>LI v2.0.0 <span>2026-09-01</span></h4>
                                    <ul>
                                        <li>Added the <b>asset</b> group: LI-18 to LI-25, covering alt text, aspect ratio, image purpose, carousel cover and slide discipline, video hook, captions and length.</li>
                                        <li>Tests are now <b>scoped by format</b>, and non-applicable tests are excluded from the denominator as well as the result. Text-post scores were unchanged at that version and remained out of 113.</li>
                                        <li>Major bump, per the policy above: the catalogue gained tests, and carousel and video scores from v1.0.0 are not comparable to v2.0.0. Text-only scores are.</li>
                                        <li>Asset tests are marked as declarations throughout. Foldline does not read media files and does not claim to.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4>LI v1.0.0 <span>2026-09-01</span></h4>
                                    <ul>
                                        <li>First public release. 17 tests, 113 points, two blocking.</li>
                                        <li>Reach index introduced, clamped to 0.20&times;&ndash;2.20&times;.</li>
                                        <li>Evidence grades A/B/C published for every test.</li>
                                        <li>Native video corrected to 1.30&times; after review &mdash; an earlier internal draft ranked it below text-only, which contradicted the format guidance.</li>
                                        <li>Link-in-body multiplier set at 0.65&times; with the published range disclosed rather than a single asserted figure.</li>
                                        <li>Substance floor added: drafts under 50 words cannot return a passing verdict.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="fl-s" id="s9">
                            <h2><span className="fl-n">09</span>How to cite this</h2>
                            <p>
                                The benchmark is published under{' '}
                                <a href="https://creativecommons.org/licenses/by/4.0/" rel="license noopener noreferrer" target="_blank">CC BY 4.0</a>.
                                Quote it, table it, teach from it, build on it &mdash; attribution is the only condition. If you extend it,
                                say which version you started from.
                            </p>
                            <div className="fl-cite">{CITE}</div>
                            <h3>Citing a single test</h3>
                            <div className="fl-cite">
                                Foldline Benchmark LI v{def.version}, test LI-05 (External link discipline, blocking, 10 pts).
                            </div>
                            <p style={{ marginTop: 14 }}>
                                For corrections, disputed figures or evidence that would move a grade,{' '}
                                <a href="/contact/">write to DB23</a>. Substantive corrections are credited in the changelog.
                            </p>
                        </section>

                        <section className="fl-s" id="s10">
                            <h2><span className="fl-n">10</span>Run a draft against it</h2>
                            <p>The benchmark is free to read and free to cite. The tool that runs a draft against it is free to score.</p>
                            <p><a className="fl-btn" href="/foldline/#scorer">Score a post free</a></p>
                            <p className="fl-small fl-muted" style={{ marginTop: 28 }}>
                                Independent standard by DB23. Not affiliated with, endorsed by, or connected to LinkedIn Corporation.
                                Reach figures are directional models, not guarantees.
                            </p>
                        </section>
                    </article>
                </main>
            </div>
        </PageLayout>
    );
}

export default FoldlineBenchmarkPage;

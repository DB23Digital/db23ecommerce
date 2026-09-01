#!/usr/bin/env node
/* Foldline engine tests. No framework — node scripts/foldline-test.mjs
 *
 * The engine is plain JS with no DOM dependency, so it is testable directly.
 * The React pages render from the same config, so anything asserted here is
 * what the published benchmark page states. */
import F, { blankState } from '../src/foldline/index.js';

let pass = 0, fail = 0;
const is = (label, actual, expected) => {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    if (ok) { pass++; console.log('  ok   ' + label); }
    else { fail++; console.log(`  FAIL ${label}\n         expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`); }
};
const ok = (label, cond) => is(label, !!cond, true);

const state = (o) => blankState(o);
const run = (o) => F.evaluate('linkedin', state(o));
const byId = (r, id) => r.results.find((x) => x.id === id);

const WEAK = `I'm excited to share that our team has been thinking a lot about the future of work and how AI is a total game changer.

We believe that leveraging the power of digital transformation is the key at the end of the day, and there are many things to consider.

Read the full thing here: https://example.com/x

Agree? Comment YES below if you want the guide.

#AI #FutureOfWork #Leadership #Digital #Innovation #Growth #Strategy`;

const STRONG = `Most posts don't fail because the idea is weak. They fail in line two.

Last quarter I rewrote the openings of 41 client posts and changed nothing else.

Median impressions went from 780 to 2,340.

Three things did the work:

1. Cut the wind-up. The first sentence was never the hook - it was throat-clearing.

2. Put a number in the first line. Specific beats clever.

3. Name the reader's problem, not my topic.

The uncomfortable part: the body copy was fine all along. Nobody was getting far enough to read it.

If you're a founder posting into silence, here's how to check it before you publish.

What's the first line of the last post you published - and would you have clicked "see more" on it?

#linkedinstrategy #b2bmarketing`;

console.log('\nplatform definition');
const def = F.platform('linkedin');
is('25 tests in the catalogue', def.tests.length, 25);
is('161 catalogue points', def.tests.reduce((s, t) => s + t.weight, 0), 161);
is('17 apply to every post', def.tests.filter((t) => !t.appliesTo).length, 17);
is('113 always-on points', def.tests.filter((t) => !t.appliesTo).reduce((s, t) => s + t.weight, 0), 113);
is('two blocking', def.tests.filter((t) => t.blocking).map((t) => t.id), ['LI-05', 'LI-06']);
ok('ids are LI- prefixed and unique', new Set(def.tests.map((t) => t.id)).size === def.tests.length
    && def.tests.every((t) => /^LI-\d\d$/.test(t.id)));
ok('every test documented', def.tests.every((t) => def.docs[t.id]
    && def.docs[t.id].short && def.docs[t.id].pass && def.docs[t.id].fail && def.docs[t.id].why));
ok('every test has a valid evidence grade', def.tests.every((t) => /^[ABC]$/.test(t.evidence)));
ok('every fix key resolves', def.tests.every((t) => typeof t.fix === 'function' || !t.fix || def.fixes[t.fix]));
ok('every fix has a label', Object.keys(def.fixes).every((k) => def.fixLabels[k]));
ok('mechanical order only lists real fixes', def.mechanicalOrder.every((k) => def.fixes[k]));

console.log('\nempty draft');
const e = run({ draft: '' });
is('scores zero', e.pct, 0);
is('verdict is the empty state', e.verdict.key, 'empty');
ok('not blocked', !e.blocked);

console.log('\nweak draft');
const w = run({ draft: WEAK, oneIdea: false, replyPlan: false });
ok('is blocked', w.blocked);
is('blocked verdict', w.verdict.label, 'Fix before publishing');
is('body link fails LI-05', byId(w, 'LI-05').status, 'fail');
is('bait fails LI-06', byId(w, 'LI-06').status, 'fail');
is('hashtag stack fails LI-09', byId(w, 'LI-09').status, 'fail');
ok('reach index below baseline', w.reach.index < 0.5);

console.log('\nstrong draft');
const s = run({ draft: STRONG, cadence: 'strong' });
ok('not blocked', !s.blocked);
ok('scores 85 or better', s.pct >= 85);
is('verdict', s.verdict.label, 'Ship it');
is('no link anywhere passes LI-05', byId(s, 'LI-05').status, 'pass');
is('closing question passes LI-06', byId(s, 'LI-06').status, 'pass');
ok('reach index at or above baseline', s.reach.index >= 1);

console.log('\nsubstance floor');
const stub = run({ draft: 'Short post. Not much here at all really.' });
is('stub is reworked', stub.verdict.label, 'Rework it');
is('LI-03 fails on a stub', byId(stub, 'LI-03').status, 'fail');

console.log('\nlink discipline');
is('parked and signposted passes',
    byId(run({ draft: 'A real post about hiring founders.\n\nWhat would you change?\n\nLink in the comments.', comment: 'https://example.com/x' }), 'LI-05').status, 'pass');
is('promised but missing warns',
    byId(run({ draft: 'A real post.\n\nLink in the comments.\n\nWhat next?' }), 'LI-05').status, 'warn');

console.log('\nformat scoping');
const asText = run({ draft: STRONG });
is('text post is scored out of 113', asText.total, 113);
ok('no media tests on a text post', !asText.results.some((r) => r.group === 'media'));

const asVideo = run({ draft: STRONG, format: 'video', aspect: 'vertical916', altText: 'A founder explaining the fix at a desk.', videoSeconds: '60', videoHook3s: true, captions: true });
is('video adds five media tests', asVideo.results.filter((r) => r.group === 'media').length, 5);
is('video is scored out of 141', asVideo.total, 141);
ok('a fully declared video passes its media tests', asVideo.results.filter((r) => r.group === 'media').every((r) => r.status === 'pass'));

const badVideo = run({ draft: STRONG, format: 'video', aspect: 'landscape169', altText: '', videoSeconds: '400' });
is('no captions fails LI-24', byId(badVideo, 'LI-24').status, 'fail');
is('no alt text fails LI-18', byId(badVideo, 'LI-18').status, 'fail');
is('16:9 fails LI-20', byId(badVideo, 'LI-20').status, 'fail');
is('400s fails LI-25', byId(badVideo, 'LI-25').status, 'fail');
ok('undeclared video scores below a declared one', badVideo.pct < asVideo.pct);

const asCarousel = run({ draft: STRONG, format: 'carousel', slideCount: '8', aspect: 'portrait45', altText: 'Eight slides on rewriting post openings.', coverHook: true, slidesOneIdea: true });
is('carousel adds four media tests', asCarousel.results.filter((r) => r.group === 'media').length, 4);
is('carousel is scored out of 135', asCarousel.total, 135);
ok('carousel has no video tests', !asCarousel.results.some((r) => ['LI-23', 'LI-24', 'LI-25'].includes(r.id)));
is('image is scored out of 127', run({ draft: STRONG, format: 'image' }).total, 127);
is('newsletter is scored out of 121', run({ draft: STRONG, format: 'newsletter' }).total, 121);

console.log('\nbefore / after');
const b0 = state({ draft: WEAK, oneIdea: false, replyPlan: false });
const r0 = F.evaluate('linkedin', b0);
const base = F.baseline(r0, b0);
ok('baseline survives a JSON round-trip', JSON.parse(JSON.stringify(base)).pct === r0.pct);
is('no diff against itself', F.diff(base, r0).moved.length, 0);
is('diff of nothing is null', F.diff(null, r0), null);

let b1 = b0;
F.autoFixKeys('linkedin', r0, b1).forEach((k) => { b1 = { ...b1, ...F.applyFix('linkedin', k, b1).patch }; });
const r1 = F.evaluate('linkedin', b1);
const d = F.diff(base, r1);
ok('score delta is positive', d.pctDelta > 0);
ok('reports unblocked', d.unblocked);
ok('verdict changed', d.verdictChanged);
ok('some tests moved up', d.gained > 0);
ok('every move is classified', d.moved.every((m) => ['up', 'down', 'scope'].includes(m.direction)));
ok('tests entering scope are not counted as regressions',
    F.diff(base, F.evaluate('linkedin', { ...b0, format: 'video' })).moved
        .filter((m) => m.id.startsWith('LI-2')).every((m) => m.direction === 'scope'));

console.log('\ncomposing for the composer');
const ZWSP = String.fromCharCode(0x200B);
const NBSP = String.fromCharCode(160);
const messy = `## Heading\n\n**Bold** and *soft*.\n\n- one\n- two\n\n[rewrite: game changer] stays.\n\nSee [page](https://example.com/x).\n\n\n\nHello${NBSP}world${ZWSP}.`;
const comp = F.compose('linkedin', state({ draft: messy }));
ok('no markdown headings survive', !/^#/m.test(comp.text));
ok('no ** survives', !comp.text.includes('**'));
ok('bullets become real bullets', comp.text.includes('• one'));
ok('annotations are stripped but text kept', !comp.text.includes('[rewrite:') && comp.text.includes('game changer'));
ok('markdown link syntax removed', !comp.text.includes('](') && comp.text.includes('page'));
ok('blank-line runs collapse to one', !/\n{3,}/.test(comp.text));
ok('no non-breaking space', !comp.text.includes(NBSP));
ok('no zero-width characters', !comp.text.includes(ZWSP));
ok('warns about the unresolved annotation', comp.warnings.some((x) => /rewrite/.test(x)));
ok('lists what it changed', comp.changes.length >= 5);

const plain = F.compose('linkedin', state({ draft: 'Line one.\n\nLine two.' }));
is('a clean draft is left alone', plain.text, 'Line one.\n\nLine two.');
is('a clean draft reports no changes', plain.changes.length, 0);

const uni = F.compose('linkedin', state({ draft: '**Bold** here.' }), { unicodeBold: true });
ok('unicode bold converts', uni.text.startsWith('\u{1D5D5}'));
ok('unicode bold warns about screen readers', uni.warnings.some((x) => /screen reader/i.test(x)));
ok('warns past the 3,000 character composer limit',
    F.compose('linkedin', state({ draft: 'x'.repeat(3200) })).warnings.some((x) => /3,000/.test(x)));

console.log('\nfix safety');
ok('will not gut a short post',
    /\[rewrite:/.test(F.applyFix('linkedin', 'stripFiller', state({ draft: 'The future of work is a game changer at the end of the day.' })).patch.draft));
const noProof = F.applyFix('linkedin', 'proof', state({ draft: 'A post.', proof: '' }));
ok('proof fix asks for input rather than acting', !noProof.patch.draft && noProof.notice);
const noAlt = F.applyFix('linkedin', 'altText', state({ draft: 'A post.', altText: '' }));
ok('alt-text fix asks for input rather than acting', !noAlt.patch.altText && noAlt.notice);

const long = 'Sentence one here. '.repeat(200);
const t0 = Date.now();
const trimmed = F.applyFix('linkedin', 'trim', state({ draft: long }));
ok('trim finishes under a second', Date.now() - t0 < 1000);
ok('trim shortens the draft', trimmed.patch.draft.length < long.length);

console.log('\nvalidation');
let threw = false;
try { F.register({ id: 'bad', version: '1', tests: [], bands: [] }); } catch { threw = true; }
ok('rejects a platform with no tests', threw);

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);

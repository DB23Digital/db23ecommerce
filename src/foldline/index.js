/* Foldline — public entry point.
 *
 * Importing this registers every platform and hands back the engine. Adding a
 * network means adding a config file under ./platforms and one import here;
 * nothing in engine.js changes.
 */
import Foldline from './engine.js';
import linkedin from './platforms/linkedin.js';

export const PLATFORMS = { linkedin };
export const DEFAULT_PLATFORM = 'linkedin';
export default Foldline;

/* Blank working state for a platform. The tool page seeds from this, and the
   engine treats any missing key as undeclared. */
export function blankState(overrides = {}) {
    return {
        draft: '', comment: '',
        format: 'text', account: 'personal', cadence: 'mid',
        slideCount: '7', audience: 'founders', proof: '', authorName: '',
        profileMatch: true, oneIdea: true, onTheme: true, goodTime: true, replyPlan: true,
        /* the asset */
        aspect: 'portrait45', altText: '', videoSeconds: '60',
        imageAdds: false, coverHook: false, slidesOneIdea: false,
        videoHook3s: false, captions: false,
        ...overrides,
    };
}

export const SAMPLES = {
    weak: `I'm excited to share that our team has been thinking a lot about the future of work and how AI is a total game changer for everyone in the industry right now.

We believe that leveraging the power of digital transformation is the key to unlocking success at the end of the day, and there are many things to consider when you think about the road ahead for organisations of every size and shape, which is why we put together our thoughts in a long piece that covers everything you need to know.

Read the full thing here: https://example.com/our-big-thoughts

Agree? Comment YES below if you want the guide.

#AI #FutureOfWork #Leadership #DigitalTransformation #Innovation #Growth #Strategy`,

    strong: `Most posts don't fail because the idea is weak. They fail in line two.

Last quarter I rewrote the openings of 41 client posts and changed nothing else.

Median impressions went from 780 to 2,340.

Three things did the work:

1. Cut the wind-up. The first sentence was never the hook - it was throat-clearing before the hook.

2. Put a number in the first line. Specific beats clever.

3. Name the reader's problem, not my topic. "Your posts stall at 400 views" lands; "thoughts on content strategy" doesn't.

The uncomfortable part: the body copy was fine all along. Nobody was getting far enough to read it.

If you're a founder posting into silence, here's how to check it before you publish.

What's the first line of the last post you published - and would you have clicked "see more" on it?

#linkedinstrategy #b2bmarketing`,
};

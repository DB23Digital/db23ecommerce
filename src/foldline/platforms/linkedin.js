/* Foldline — LinkedIn platform definition. Benchmark LI v2.0.0 (2026).
 *
 * Test IDs are stable and citable: LI-01 … LI-25. Never renumber them.
 * A retired test keeps its ID and is marked retired; new tests take new IDs.
 */
import F from "../engine.js";

/* ---------------- detectors ---------------- */
var BAIT = [
  /\bcomment\s+("|')?(yes|me|below|the\s+word|guide)/i,
  /\btype\s+(1|yes|"|')/i,
  /\bdrop\s+(a|an)\s+(1|yes|emoji|heart)/i,
  /\bagree\s*\?/i,
  /\bthoughts\s*\?\s*$/im,
  /\btag\s+(someone|a\s+friend|three)/i,
  /\blike\s+if\b/i,
  /\brepost\s+if\b/i,
  /\bwho\s+else\b[^.!?\n]*\?/i,
  /\bdm\s+me\s+("|')?\w+("|')?\s+(and|for|to)\b/i
];
var THROAT = /^\s*(i'?m\s+(so\s+|really\s+|beyond\s+)?(excited|thrilled|humbled|proud|delighted|happy)|(so\s+)?excited\s+to\s+(share|announce)|happy\s+to\s+(share|announce)|delighted\s+to|it'?s\s+with\s+great|thrilled\s+to)/i;
var FILLER = ["future of work","game changer","game-changer","leverage the power","leveraging the power",
  "at the end of the day","in today's fast-paced","digital transformation","let's dive in",
  "needless to say","synergy","thought leader","many things to consider","everything you need to know"];
var FRAMEWORK = /(\bcheck-?list\b|\bframework\b|\bsteps?\b|\brules?\b|\blessons?\b|\bplaybook\b|\btemplate\b|\bmistakes\b|^\s*\d[.)]\s)/im;
var URLRE = /(https?:\/\/|www\.)\S+/gi;
var HASURL = /(https?:\/\/|www\.)\S+/i;
var TAGRE = /#[\p{L}\d_]+/gu;
var SIGNPOST = /link\s+(is\s+)?(in|below)\s+(the\s+)?(comment|first\s+comment|comments)|comment\s+(one|1)\b|link\s+in\s+comments/i;
var ROLE = /\b(founders?|recruiters?|marketers?|cfos?|ctos?|ceos?|managers?|engineers?|designers?|teachers?|parents?|agenc(y|ies)|agents?|owners?|leaders?|sellers?|buyers?|students?|freelancers?|consultants?|operators?|clients?|teams?)\b/i;
var SECOND = /\byou'?r?e?\b|\byour\b/i;
var PROMO = /\b(we'?re hiring|proud to announce|book a (demo|call)|sign up now|register (now|here)|our new (product|feature|service)|available now|limited spots)\b/i;
var TEACH = /\b(how to|here'?s (how|what|why)|lesson|framework|steps?|mistake|learned|checklist|rule|playbook|what i'?d do)\b/i;
/* Built from code points so this source file contains no invisible characters
   of its own, and no editor or formatter can silently mangle them. */
var CH = String.fromCharCode;
var NBSP_G = new RegExp(CH(160), "g");
var ZERO_WIDTH_G = new RegExp("[" + CH(0x200B) + "-" + CH(0x200D) + CH(0xFEFF) + "]", "g");
var INVISIBLE = new RegExp("[" + CH(160) + CH(0x200B) + "-" + CH(0x200D) + CH(0xFEFF) + "]");
var MODELWORDS = /\b(delve|landscape|seamless|robust|elevate|testament|tapestry|ever-evolving|in today'?s)\b/i;

var FOLD = 210;            /* characters visible before "…see more" */
var DWELL = [800, 1000];   /* character sweet spot */
var DWELL_OK = [500, 1600];

/* ---------------- context ---------------- */
function context(draft, state, text) {
  var d = draft || "";
  var lines = text.lines(d);
  var paras = text.paragraphs(d);
  var meaty = lines.map(function (l) { return l.replace(TAGRE, "").trim(); }).filter(Boolean);
  var bodyUrls = d.match(URLRE) || [];
  var cmtUrls = (state.comment || "").match(URLRE) || [];
  var tags = d.match(TAGRE) || [];
  var words = text.words(d);
  return {
    draft: d, lines: lines, paras: paras,
    words: words, chars: d.trim().length,
    hookLines: lines.slice(0, 2).join(" "),
    firstLine: lines[0] || "",
    longest: text.longestBlock(d),
    bodyUrls: bodyUrls, cmtUrls: cmtUrls, tags: tags,
    stacked: /(#[\p{L}\d_]+[ \t]*){4,}/u.test(d),
    signposted: SIGNPOST.test(d),
    bait: BAIT.filter(function (r) { return r.test(d); }),
    closingQ: /\?\s*$/.test(meaty[meaty.length - 1] || ""),
    firstPerson: /\b(i|my|we|our)\b/i.test(d),
    numbers: (d.match(/\b\d[\d,.%kx]*\b/g) || []).length,
    filler: FILLER.filter(function (f) { return d.toLowerCase().indexOf(f) !== -1; }),
    isFramework: FRAMEWORK.test(d),
    format: state.format,
    slides: parseInt(state.slideCount, 10) || 0,
    videoSeconds: parseInt(state.videoSeconds, 10) || 0,
    altText: (state.altText || "").trim(),
    altWords: text.words(state.altText || ""),
    rhythmSD: text.rhythmSD(d),
    tells: modelTells(d, words, text),
    empty: words < 12
  };
}

function modelTells(d, words, text) {
  var tells = [];
  if ((d.match(/—/g) || []).length >= 3) tells.push("em-dash rhythm");
  if (/\bit'?s not [^.,;]{2,30}[,—] it'?s\b/i.test(d)) tells.push("“not X, it's Y”");
  if (!/\d/.test(d) && words > 40) tells.push("no numbers anywhere");
  if (MODELWORDS.test(d)) tells.push("model vocabulary");
  var sd = text.rhythmSD(d);
  if (sd !== null && sd < 3.5) tells.push("every sentence the same length");
  return tells;
}

var ok = function (note) { return { status: "pass", note: note }; };
var meh = function (note) { return { status: "warn", note: note }; };
var bad = function (note) { return { status: "fail", note: note }; };

/* ---------------- the seventeen tests ---------------- */
var tests = [
  {
    id: "LI-01", n: 1, group: "craft", weight: 10, evidence: "A", fix: "hook",
    label: "Hook lands in the first 1-2 lines",
    run: function (c) {
      if (c.empty) return bad("Nothing to read yet - paste the draft.");
      if (THROAT.test(c.firstLine)) return bad("Opens with throat-clearing (“excited to share…”). The hook is buried below the fold.");
      if (c.hookLines.length > 220) return meh("The opening runs " + c.hookLines.length + " characters - past the “…see more” cut. Tighten to one sharp line.");
      if (!/\d/.test(c.hookLines) && !/\?|\bmost\b|\bnobody\b|\bstop\b|\bwrong\b|\bnever\b|\bdon'?t\b/i.test(c.hookLines))
        return meh("Opening is clear but flat - add a number, a tension, or a contrarian claim.");
      return ok("Opens in " + c.hookLines.length + " characters with tension or specificity.");
    }
  },
  {
    id: "LI-02", n: 2, group: "craft", weight: 5, evidence: "B",
    label: "One clear idea, audience and takeaway",
    fix: function (c, s) { return s.oneIdea ? "stripFiller" : "declareOneIdea"; },
    run: function (c, s) {
      if (!s.oneIdea) return bad("You flagged more than one idea. Split it into separate posts.");
      if (c.words > 320) return meh(c.words + " words is long for one idea - cut to the single takeaway.");
      return ok("One idea, declared and within length.");
    }
  },
  {
    id: "LI-03", n: 3, group: "craft", weight: 12, evidence: "B",
    label: "Original, first-hand insight",
    fix: function (c) { return c.filler.length ? "stripFiller" : "proof"; },
    run: function (c) {
      var sig = (c.firstPerson ? 1 : 0) + (c.numbers >= 2 ? 1 : 0) + (c.isFramework ? 1 : 0);
      if (c.filler.length >= 2 || (sig === 0 && !c.empty)) {
        return bad(c.filler.length
          ? "Reads as generic-AI filler: " + c.filler.slice(0, 3).map(function (f) { return "“" + f + "”"; }).join(", ") + ". Replace with your own example or result."
          : "No first-hand example, number or point of view.");
      }
      if (c.filler.length === 1 || sig < 2) return meh("Partly grounded. Add one concrete result, date or named example.");
      return ok("First-person, specific, and carries a point of view.");
    }
  },
  {
    id: "LI-04", n: 4, group: "craft", weight: 10, evidence: "B", fix: "format",
    label: "Format fits the job",
    run: function (c, s) {
      if (s.format === "linkout") return bad("Link-out posts are throttled. Rebuild as native text, video or a document and put the link in comment 1.");
      if (s.format === "poll") return meh("Poll reach has fallen sharply - use it sparingly, not as an engagement shortcut.");
      if (s.format === "carousel" && (c.slides < 5 || c.slides > 10))
        return meh(c.slides + " slides - documents run 5-10, and 8-10 performs best. One idea per slide, hook on the cover.");
      if (c.isFramework && s.format === "text")
        return meh("This is a framework or step list - documents carry roughly 1.4× the reach of text-only and hold dwell on every swipe.");
      if (s.format === "text") return meh("Text-only is the weakest of the strong formats. It works when it's sharp and short - otherwise carry it as a document or video.");
      return ok(s.format === "carousel" ? c.slides + " slides, inside the band that performs." : "Format matches the content's job.");
    }
  },
  {
    id: "LI-05", n: 5, group: "craft", weight: 10, evidence: "A", blocking: true,
    label: "External link discipline",
    fix: function (c) { return c.bodyUrls.length ? "links" : (c.cmtUrls.length && !c.signposted) ? "signpost" : null; },
    run: function (c) {
      if (c.bodyUrls.length) return bad(c.bodyUrls.length + " link" + (c.bodyUrls.length > 1 ? "s" : "") +
        " in the body. Published estimates put the cost between a fifth and half of median reach. Move it to the first comment.");
      if (c.signposted && !c.cmtUrls.length) return meh("The body promises a link in the comments but the first comment has no URL in it yet.");
      if (c.cmtUrls.length && !c.signposted) return meh("Link is parked in comment 1 - but the body never tells the reader to look there.");
      if (c.cmtUrls.length) return ok("Body clean, link signposted and parked in comment 1 - the cheapest way to carry a link, though not free.");
      return ok("No link anywhere: the highest-reach option in the 2026 data.");
    }
  },
  {
    id: "LI-06", n: 6, group: "craft", weight: 8, evidence: "A", blocking: true,
    label: "No engagement bait",
    fix: function (c) { return c.bait.length ? "bait" : "addQuestion"; },
    run: function (c) {
      if (c.bait.length) return bad("Bait phrasing detected (" + c.bait.length + " instance" + (c.bait.length > 1 ? "s" : "") +
        ") - explicitly suppressed. Close on a real question instead.");
      if (!c.closingQ && !c.empty) return meh("No bait, but it doesn't close on a genuine question either - you're leaving the comment signal on the table.");
      return ok("Closes on a question a real reader could answer.");
    }
  },
  {
    id: "LI-07", n: 7, group: "craft", weight: 5, evidence: "B", fix: "thumb",
    label: "Built for the thumb",
    run: function (c) {
      if (c.empty) return bad("Nothing to assess.");
      if (c.longest > 400) return bad("Longest block is " + c.longest + " characters - a wall of text on a phone. Break at 2-3 lines.");
      if (c.longest > 240 || c.paras.length < 3) return meh("Add line breaks and white space; longest block is " + c.longest + " characters.");
      return ok(c.paras.length + " short blocks, longest " + c.longest + " characters.");
    }
  },
  {
    id: "LI-08", n: 8, group: "craft", weight: 8, evidence: "B", fix: "declareTheme",
    label: "On one of this account's 2-3 themes",
    run: function (c, s) {
      return s.onTheme
        ? ok("Stays on a defined theme, so topical authority compounds.")
        : bad("Off-theme. Topic-hopping stops the model reading this account as an authority.");
    }
  },
  {
    id: "LI-09", n: 9, group: "craft", weight: 2, evidence: "B", fix: "tags",
    label: "0-3 relevant hashtags, no stacks",
    run: function (c) {
      if (c.tags.length > 3 || c.stacked) return bad(c.tags.length + " hashtags. Distribution is semantic now - keep 0-3 for context.");
      return ok(c.tags.length + " hashtag" + (c.tags.length === 1 ? "" : "s") + " - within range.");
    }
  },
  {
    id: "LI-10", n: 10, group: "craft", weight: 5, evidence: "B", fix: "accountTime",
    label: "Right account and posting time",
    run: function (c, s) {
      var acct = s.account === "personal";
      if (!acct && !s.goodTime) return bad("Company page and off-peak. Personal profiles out-reach pages; post weekday mornings, audience-local.");
      if (!acct) return meh("Company page reaches less than a personal profile - use the page for presence, people for reach.");
      if (!s.goodTime) return meh("Move to a weekday morning in the audience's timezone (typically Tue-Thu).");
      return ok("Personal profile, weekday morning.");
    }
  },
  {
    id: "LI-11", n: 11, group: "craft", weight: 7, evidence: "B", fix: "declareReply",
    label: "Present for the first 60-90 minutes",
    run: function (c, s) {
      return s.replyPlan
        ? ok("Early replies of 15+ words carry far more weight than a short one - and they pull the thread back up.")
        : bad("The first 60-90 minutes set the reach trajectory. Block the time before you post, and reply in full sentences.");
    }
  },
  {
    id: "LI-12", n: 12, group: "graph", weight: 6, evidence: "B", fix: "declareProfile",
    label: "Profile matches what you post about",
    run: function (c, s) {
      return s.profileMatch
        ? ok("Headline, experience and topic line up - the model reads author and post together.")
        : bad("The ranking model scores the post against your profile. A headline that doesn't match the topic caps distribution before anyone reads it.");
    }
  },
  {
    id: "LI-13", n: 13, group: "graph", weight: 5, evidence: "B", fix: "nameReader",
    label: "Names the reader it is for",
    run: function (c) {
      var role = ROLE.test(c.draft), second = SECOND.test(c.draft);
      if (role && second) return ok("A specific role, addressed directly - the interest graph needs someone to match it to.");
      if (role || second) return meh("Half-addressed. Name the role in the first three lines, not just “you”.");
      return bad("Nobody is named. Distribution is interest-based now, so an unaddressed post has no audience to be matched to.");
    }
  },
  {
    id: "LI-14", n: 14, group: "graph", weight: 6, evidence: "C", fix: "teach",
    label: "Knowledge and advice, not an update",
    run: function (c) {
      var promo = PROMO.test(c.draft), teach = TEACH.test(c.draft);
      if (promo && !teach) return bad("Reads as an announcement or promo - the class of content the 2026 feed demotes hardest.");
      if (teach) return ok("Teaches something. Advice content is the class that still gets multiples of baseline reach.");
      return meh("Neither clearly teaching nor announcing. Give the reader one thing they can use.");
    }
  },
  {
    id: "LI-15", n: 15, group: "graph", weight: 4, evidence: "C",
    label: "Length in the dwell sweet spot",
    fix: function (c) { return c.chars > DWELL[1] ? "trim" : "proof"; },
    run: function (c) {
      if (!c.words) return bad("Nothing to measure.");
      var note = c.chars + " characters. The 2026 sweet spot is " + DWELL[0] + "-" + DWELL[1].toLocaleString("en-ZA") +
        " - long enough to earn dwell, short enough to finish.";
      if (c.chars >= DWELL[0] && c.chars <= DWELL[1]) return ok(note);
      if (c.chars >= DWELL_OK[0] && c.chars <= DWELL_OK[1]) return meh(note);
      return bad(note);
    }
  },
  {
    id: "LI-16", n: 16, group: "graph", weight: 5, evidence: "B", fix: "flagTells",
    label: "Reads human, not model-generated",
    run: function (c) {
      if (c.tells.length >= 3) return bad(c.tells.length + " AI tells: " + c.tells.join(", ") + ". Generic-model prose earns no dwell, so the feed stops distributing it.");
      if (c.tells.length) return meh(c.tells.length + " AI tell" + (c.tells.length > 1 ? "s" : "") + ": " + c.tells.join(", ") + ". Generic-model prose earns no dwell, so the feed stops distributing it.");
      return ok("No obvious model tells - varied rhythm, concrete detail.");
    }
  },
  {
    id: "LI-17", n: 17, group: "graph", weight: 5, evidence: "B", fix: "declareCadence",
    label: "Cadence builds topic authority",
    run: function (c, s) {
      if (s.cadence === "strong") return ok("3+ posts a week for 8+ weeks on the same pillars - the consistency that lifts baseline reach per post.");
      if (s.cadence === "mid") return meh("1-2 posts a week. Authority compounds from about three a week held for two months.");
      return bad("Sporadic posting keeps resetting the account's topic authority. Consistency is worth more than any single post.");
    }
  }
];

/* ---------------- media tests (LI-18 … LI-25) ----------------
 * Scoped by format. A text-only post never sees them, and they are excluded
 * from its denominator — the score stays comparable across formats.
 *
 * These score the asset you declare, not the asset itself: Foldline reads
 * text, it cannot open your MP4. Every one of them is a declaration, and the
 * benchmark says so rather than pretending to measure.
 */
var HAS_MEDIA = { image: 1, carousel: 1, video: 1, newsletter: 1 };
var only = function (list) {
  return function (s) { return list.indexOf(s.format) !== -1; };
};

var ASPECT_FIT = {
  carousel: { good: ["portrait45"], ok: ["square"], bad: ["landscape169", "vertical916"] },
  image:    { good: ["portrait45", "square"], ok: ["vertical916"], bad: ["landscape169"] },
  video:    { good: ["vertical916", "square"], ok: ["portrait45"], bad: ["landscape169"] },
  newsletter: { good: ["landscape169"], ok: ["square", "portrait45"], bad: ["vertical916"] }
};
var ASPECT_NAME = { portrait45: "4:5 portrait", square: "1:1 square", vertical916: "9:16 vertical", landscape169: "16:9 landscape" };

var mediaTests = [
  {
    id: "LI-18", n: 18, group: "media", weight: 4, evidence: "A", fix: "altText",
    label: "Alt text written for the asset",
    appliesTo: only(["image", "carousel", "video", "newsletter"]),
    run: function (c) {
      if (!c.altText) return bad("No alt text. It is the only part of your asset the ranking model can read, and without it the post is unusable for anyone on a screen reader.");
      if (c.altWords < 5) return meh("Alt text is " + c.altWords + " word" + (c.altWords === 1 ? "" : "s") + " — describe what the asset actually shows, in a sentence.");
      return ok(c.altWords + " words of alt text — readable by both the model and a screen reader.");
    }
  },
  {
    id: "LI-19", n: 19, group: "media", weight: 6, evidence: "B", fix: "declareImageAdds",
    label: "The image carries meaning",
    appliesTo: only(["image"]),
    run: function (c, s) {
      return s.imageAdds
        ? ok("The image adds something the text cannot. That is the only reason to attach one.")
        : bad("A decorative image costs feed height without earning dwell. Either make it carry information, or drop it and post as text.");
    }
  },
  {
    id: "LI-20", n: 20, group: "media", weight: 4, evidence: "B", fix: "aspect",
    label: "Aspect ratio owns feed height",
    appliesTo: only(["image", "carousel", "video", "newsletter"]),
    run: function (c, s) {
      var fit = ASPECT_FIT[s.format];
      var a = s.aspect, name = ASPECT_NAME[a] || a;
      if (!fit) return ok("No ratio constraint for this format.");
      if (fit.good.indexOf(a) !== -1) return ok(name + " — the ratio that takes the most vertical space in the feed for this format.");
      if (fit.ok.indexOf(a) !== -1) return meh(name + " works, but " + ASPECT_NAME[fit.good[0]] + " owns more of the screen on a phone.");
      return bad(name + " wastes feed height on mobile. Use " + ASPECT_NAME[fit.good[0]] + " for this format.");
    }
  },
  {
    id: "LI-21", n: 21, group: "media", weight: 8, evidence: "B", fix: "declareCoverHook",
    label: "Cover slide carries the hook",
    appliesTo: only(["carousel"]),
    run: function (c, s) {
      return s.coverHook
        ? ok("The cover states the promise. It is the thumbnail, the hook and the whole swipe decision in one frame.")
        : bad("A title-card cover wastes the only slide most people see. Put the claim, the number or the tension on it.");
    }
  },
  {
    id: "LI-22", n: 22, group: "media", weight: 6, evidence: "B", fix: "declareSlideDiscipline",
    label: "One idea per slide, legible on a phone",
    appliesTo: only(["carousel"]),
    run: function (c, s) {
      if (!s.slidesOneIdea) return bad("Slides carrying more than one idea each stop the swipe. One idea, a few words, readable at arm's length.");
      if (c.slides < 5 || c.slides > 10) return meh(c.slides + " slides — documents run 5–10, and 8–10 performs best.");
      return ok(c.slides + " slides, one idea each.");
    }
  },
  {
    id: "LI-23", n: 23, group: "media", weight: 8, evidence: "B", fix: "declareVideoHook",
    label: "Hook in the first 3 seconds",
    appliesTo: only(["video"]),
    run: function (c, s) {
      return s.videoHook3s
        ? ok("The claim lands before the viewer decides. Three seconds is the whole audition.")
        : bad("An intro, a logo sting or a slow build spends the only three seconds you are given. Open on the claim.");
    }
  },
  {
    id: "LI-24", n: 24, group: "media", weight: 7, evidence: "A", fix: "declareCaptions",
    label: "Captions burned into the video",
    appliesTo: only(["video"]),
    run: function (c, s) {
      return s.captions
        ? ok("Burned-in captions — the feed autoplays muted, so this is what most viewers actually read.")
        : bad("Video autoplays silently. Without burned-in captions most of the audience watches a mute clip and scrolls.");
    }
  },
  {
    id: "LI-25", n: 25, group: "media", weight: 5, evidence: "C", fix: "videoLength",
    label: "Video length in the retention band",
    appliesTo: only(["video"]),
    run: function (c) {
      if (!c.videoSeconds) return bad("No length declared. Set it — retention is the whole game for video.");
      if (c.videoSeconds >= 30 && c.videoSeconds <= 90) return ok(c.videoSeconds + "s — inside the 30–90s band where completion still holds.");
      if (c.videoSeconds < 30) return meh(c.videoSeconds + "s is short enough to be skipped as filler. 30–90s gives a point room to land.");
      return c.videoSeconds > 180
        ? bad(c.videoSeconds + "s. Past three minutes completion collapses. Cut to the single strongest 60 seconds.")
        : meh(c.videoSeconds + "s is over the 30–90s band. Tighten it or expect completion to drop.");
    }
  }
];

tests = tests.concat(mediaTests);

/* ---------------- fixes ---------------- */
var fixes = {
  hook: function (s, T) {
    var lines = (s.draft || "").split("\n");
    var i = lines.findIndex(function (l) { return l.trim().length; });
    if (i < 0) return {};
    var sent = T.sentences(lines[i]);
    if (THROAT.test(sent[0] || "")) sent = sent.slice(1);
    if (!sent.length) lines.splice(i, 1);
    else {
      lines[i] = sent[0];
      if (sent.length > 1) lines.splice(i + 1, 0, "", sent.slice(1).join(" "));
    }
    return { patch: { draft: lines.join("\n").replace(/^\n+/, "") } };
  },

  stripFiller: function (s, T) {
    var d = s.draft || "", before = T.words(d);
    var out = d.split("\n").map(function (line) {
      if (!line.trim()) return line;
      return T.sentences(line).filter(function (x) {
        return !FILLER.some(function (f) { return x.toLowerCase().indexOf(f) !== -1; });
      }).join(" ");
    }).join("\n").replace(/\n{3,}/g, "\n\n").trim();

    /* never let a fix gut the post: flag in place instead of cutting it hollow */
    if (T.words(out) < Math.max(60, before * 0.6)) {
      out = d;
      FILLER.forEach(function (f) {
        var re = new RegExp("\\b" + f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "gi");
        out = out.replace(re, function (m) { return "[rewrite: " + m + "]"; });
      });
      return { patch: { draft: out }, notice: "Too much of the post ran on filler to cut safely - each phrase is flagged in place for you to rewrite." };
    }
    if (!/\[/.test(out)) out += "\n\n[Your own example here: what you did, the number it moved, and when.]";
    return { patch: { draft: out } };
  },

  links: function (s) {
    var d = s.draft || "";
    var urls = d.match(URLRE) || [];
    var body = d.split("\n").map(function (l) {
      if (!HASURL.test(l)) return l;
      var rest = l.replace(URLRE, "").replace(/\s*(read|see|full|more)[^.:]*[:.]?\s*$/i, "").trim();
      return rest.length > 12 ? rest : "";
    }).join("\n").replace(/\n{3,}/g, "\n\n").trim();
    body += "\n\nLink in the comments.";
    var cmt = ((s.comment || "").trim() ? s.comment.trim() + "\n" : "") + (urls.length ? "Full detail here: " + urls.join(" ") : "");
    return { patch: { draft: body, comment: cmt.trim() } };
  },

  signpost: function (s) {
    return { patch: { draft: (s.draft || "").trim() + "\n\nLink in the comments." } };
  },

  bait: function (s, T) {
    var out = (s.draft || "").split("\n").map(function (line) {
      if (!line.trim()) return line;
      return T.sentences(line).filter(function (x) {
        return !BAIT.some(function (r) { return r.test(x); });
      }).join(" ");
    }).join("\n").replace(/\n{3,}/g, "\n\n").trim();
    var tags = out.match(TAGRE) || [];
    out = out.replace(/(#[\p{L}\d_]+\s*)+$/u, "").trim();
    if (!/\?\s*$/.test(out)) out += "\n\nWhat would you change first?";
    if (tags.length) out += "\n\n" + tags.slice(0, 3).join(" ");
    return { patch: { draft: out } };
  },

  addQuestion: function (s) {
    return { patch: { draft: (s.draft || "").trim() + "\n\nWhat would you change first?" } };
  },

  thumb: function (s, T) {
    var out = T.paragraphs(s.draft || "").map(function (t) {
      if (t.length <= 240 || /^\s*\d[.)]/.test(t)) return t;
      var sent = T.sentences(t), blocks = [];
      for (var i = 0; i < sent.length; i += 2) blocks.push(sent.slice(i, i + 2).join(" "));
      return blocks.join("\n\n");
    }).filter(Boolean).join("\n\n");
    return { patch: { draft: out } };
  },

  tags: function (s) {
    var d = s.draft || "";
    var tags = (d.match(TAGRE) || []).slice(0, 3);
    var out = d.replace(TAGRE, "").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    return { patch: { draft: tags.length ? out + "\n\n" + tags.join(" ") : out } };
  },

  format: function (s) {
    if (s.format === "linkout" || s.format === "poll") return { patch: { format: "text" } };
    if (s.format === "carousel") return { patch: { slideCount: "8" } };
    return { patch: { format: "carousel", slideCount: "8" } };
  },

  nameReader: function (s) {
    var d = s.draft || "";
    var aud = (s.audience || "founders").trim();
    var line = "If you're a " + aud.replace(/s$/i, "") + " running into this, this one's for you.";
    if (d.indexOf(line) !== -1) {
      return { notice: "That reader line is already in the post. Change the audience field and re-apply if it names the wrong role." };
    }
    var lines = d.split("\n");
    var i = lines.findIndex(function (l) { return l.trim().length; });
    lines.splice(i + 1, 0, "", line);
    return {
      patch: { draft: lines.join("\n") },
      notice: "Reader line added for “" + aud + "” - change the audience field and re-apply if that's not who it's for."
    };
  },

  proof: function (s) {
    var p = (s.proof || "").trim();
    if (!p) return { notice: "Add your proof point in the field above - a number, a result, a date - then this button drops it into the post." };
    var line = p.replace(/\s*[.]?\s*$/, ".");
    var d = s.draft || "";
    if (d.indexOf(line) !== -1) return {};
    var paras = d.split(/\n\s*\n/);
    paras.splice(Math.min(2, paras.length), 0, line);
    return { patch: { draft: paras.join("\n\n") }, notice: "Proof point inserted - move it wherever it reads best." };
  },

  teach: function (s, T) {
    var d = s.draft || "";
    if (/here'?s how/i.test(d)) return {};
    var paras = T.paragraphs(d);
    paras.splice(Math.max(1, paras.length - 1), 0, "Here's how to fix it:");
    return {
      patch: { draft: paras.join("\n\n") },
      notice: "Reframed as advice. Follow that line with the actual steps - that's the class of post the feed still rewards."
    };
  },

  trim: function (s, T) {
    var out = T.paragraphs(s.draft || "");
    var guard = 0;
    while (out.join("\n\n").length > DWELL[1] + 50 && guard++ < 400) {
      var longest = 0;
      out.forEach(function (p, i) { if (p.length > out[longest].length) longest = i; });
      var sent = T.sentences(out[longest]);
      if (sent.length <= 1) { if (out.length <= 2) break; out.splice(longest, 1); }
      else out[longest] = sent.slice(0, -1).join(" ");
    }
    return {
      patch: { draft: out.join("\n\n") },
      notice: "Trimmed toward the " + DWELL[0] + "-" + DWELL[1].toLocaleString("en-ZA") + " character dwell band by cutting the last sentence off the longest blocks - read it back before posting."
    };
  },

  flagTells: function (s) {
    var out = (s.draft || "")
      .replace(/\b(delve|landscape|seamless|robust|elevate|testament|tapestry|ever-evolving)\b/gi, function (m) { return "[tell: " + m + "]"; })
      .replace(/\bin today'?s\b/gi, function (m) { return "[tell: " + m + "]"; });
    return {
      patch: { draft: out },
      notice: "Model vocabulary flagged in place. Em-dash rhythm and same-length sentences you have to hear yourself - read it aloud."
    };
  },

  altText: function (s) {
    if (!(s.altText || "").trim()) {
      return { notice: "Write the alt text in the field above — one sentence describing what the asset actually shows — then this button will stop asking." };
    }
    return {};
  },
  aspect: function (s) {
    var fit = ASPECT_FIT[s.format];
    return fit ? { patch: { aspect: fit.good[0] } } : {};
  },
  videoLength: function (s) {
    var n = parseInt(s.videoSeconds, 10) || 0;
    return { patch: { videoSeconds: "60" },
      notice: n > 90 ? "Set to 60s as a target — now cut the actual video to the strongest minute." : "Set to 60s as a target — write to fill it, don't pad it." };
  },
  declareImageAdds: function () { return { patch: { imageAdds: true } }; },
  declareCoverHook: function () { return { patch: { coverHook: true } }; },
  declareSlideDiscipline: function () { return { patch: { slidesOneIdea: true } }; },
  declareVideoHook: function () { return { patch: { videoHook3s: true } }; },
  declareCaptions: function () { return { patch: { captions: true } }; },

  declareProfile: function () { return { patch: { profileMatch: true } }; },
  declareCadence: function () { return { patch: { cadence: "strong" } }; },
  declareOneIdea: function () { return { patch: { oneIdea: true } }; },
  declareTheme: function () { return { patch: { onTheme: true } }; },
  declareReply: function () { return { patch: { replyPlan: true } }; },
  accountTime: function () { return { patch: { account: "personal", goodTime: true } }; }
};

var FIX_LABELS = {
  hook: "Cut the wind-up", stripFiller: "Strip the filler", links: "Move link to first comment",
  signpost: "Signpost the comment", bait: "Remove bait, close on a question", addQuestion: "Add a closing question",
  thumb: "Break into short blocks", tags: "Trim to 3 hashtags", format: "Change the format",
  nameReader: "Add a reader line", proof: "Insert my proof point", teach: "Reframe as advice",
  trim: "Trim toward 1,000 characters", flagTells: "Flag the AI tells",
  declareProfile: "Profile does match", declareCadence: "I post 3+ a week",
  declareOneIdea: "It is one idea", declareTheme: "It is on theme",
  declareReply: "I'll be there for the first hour", accountTime: "Personal profile, weekday morning",
  altText: "Write the alt text", aspect: "Use the right ratio", videoLength: "Target 60 seconds",
  declareImageAdds: "The image carries meaning", declareCoverHook: "The cover has the hook",
  declareSlideDiscipline: "One idea per slide", declareVideoHook: "Hook is in the first 3s",
  declareCaptions: "Captions are burned in"
};

/* ---------------- reach index ---------------- */
var FORMAT_MULT = { carousel: 1.40, video: 1.30, image: 1.05, newsletter: 1.00, poll: 0.95, text: 0.90, linkout: 0.55 };
var FORMAT_NAME = { carousel: "Document carousel", video: "Native video", image: "Image + text",
  newsletter: "Newsletter", poll: "Poll", text: "Text-only", linkout: "Link-out" };

function reachParts(c, s, results) {
  var parts = [{ what: FORMAT_NAME[s.format] || "Unknown format", mult: FORMAT_MULT[s.format] || 1 }];
  if (c.bodyUrls.length) parts.push({ what: "Link in the body", mult: 0.65 });
  if (c.cmtUrls.length) parts.push({ what: "Link in comment 1", mult: 0.95 });
  if (c.bait.length) parts.push({ what: "Engagement bait", mult: 0.55 });

  var ai = results.filter(function (r) { return r.id === "LI-16"; })[0];
  if (ai && ai.status === "fail") parts.push({ what: "Reads model-generated", mult: 0.70 });
  else if (ai && ai.status === "warn") parts.push({ what: "Some AI tells", mult: 0.90 });

  if (!s.profileMatch) parts.push({ what: "Profile-topic mismatch", mult: 0.85 });
  if (!s.onTheme) parts.push({ what: "Off the account's themes", mult: 0.85 });
  if (s.account !== "personal") parts.push({ what: "Company page, not a person", mult: 0.75 });

  parts.push({
    what: s.cadence === "strong" ? "3+/week, 8+ weeks" : s.cadence === "mid" ? "1-2 posts a week" : "Sporadic posting",
    mult: s.cadence === "strong" ? 1.15 : s.cadence === "mid" ? 1.00 : 0.85
  });

  var hook = results.filter(function (r) { return r.id === "LI-01"; })[0];
  if (hook && hook.status === "fail") parts.push({ what: "Hook doesn't hold", mult: 0.75 });
  else if (hook && hook.status === "warn") parts.push({ what: "Soft hook", mult: 0.90 });

  if (s.replyPlan) parts.push({ what: "Author present in hour one", mult: 1.10 });
  return parts;
}

/* ---------------- signals ---------------- */
function signals(c, s) {
  var lvl = function (high, mid) { return high ? "High" : mid ? "Medium" : "Low"; };
  return [
    {
      name: "Saves",
      level: lvl((c.isFramework || s.format === "carousel") && c.words > 60, c.words > 60),
      why: c.isFramework ? "Keepable - framework or list structure" : "Nothing here a reader would keep"
    },
    {
      name: "Comments",
      level: lvl(c.closingQ && c.firstPerson, c.closingQ),
      why: c.closingQ ? "Closes on an answerable question" : "No genuine question to answer"
    },
    {
      name: "Dwell",
      level: lvl(c.words >= 80 && c.words <= 320 && c.paras.length >= 3, c.words >= 50),
      why: c.words ? c.words + " words, " + c.paras.length + " blocks" : "Empty draft"
    }
  ];
}

/* ---------------- composing for the LinkedIn composer ----------------
 * The composer takes plain text only. Markdown does not render, and pasting
 * rich text drags styles in that LinkedIn then strips unpredictably. This
 * turns a working draft into exactly what should land in the box.
 */

/* Unicode mathematical alphanumerics — the only way to fake bold on LinkedIn.
   Off by default: screen readers read these as individual symbols or skip
   them entirely, and LinkedIn's own search does not index them. */
var BOLD_BASE = { upper: 0x1D5D4, lower: 0x1D5EE, digit: 0x1D7EC };
function toUnicodeBold(str) {
  var out = "";
  for (var i = 0; i < str.length; i++) {
    var ch = str[i], code = str.charCodeAt(i);
    if (code >= 65 && code <= 90) out += String.fromCodePoint(BOLD_BASE.upper + (code - 65));
    else if (code >= 97 && code <= 122) out += String.fromCodePoint(BOLD_BASE.lower + (code - 97));
    else if (code >= 48 && code <= 57) out += String.fromCodePoint(BOLD_BASE.digit + (code - 48));
    else out += ch;
  }
  return out;
}

var ANNOTATION = /\[(?:rewrite|tell):\s*([^\]]*)\]/gi;

function composeForLinkedIn(state, opts) {
  var warnings = [], changes = [];
  var count = function (re, s) { return (s.match(re) || []).length; };

  function clean(src, what) {
    var s = String(src || "");

    /* 1. Foldline's own working annotations must never reach the composer. */
    var ann = count(ANNOTATION, s);
    if (ann) {
      s = s.replace(ANNOTATION, "$1");
      changes.push("Removed " + ann + " Foldline annotation" + (ann > 1 ? "s" : "") + " from the " + what + ".");
      warnings.push("You still had " + ann + " unresolved [rewrite:] or [tell:] marker" + (ann > 1 ? "s" : "") +
        " in the " + what + ". The text inside was kept, the brackets were stripped — read it back before posting.");
    }

    /* 2. Markdown headings: LinkedIn shows the hashes literally. */
    if (/^#{1,6}\s+/m.test(s)) {
      s = s.replace(/^#{1,6}[ \t]+/gm, "");
      changes.push("Stripped markdown headings from the " + what + " — LinkedIn renders the # characters literally.");
    }

    /* 3. Emphasis: convert to Unicode bold on request, otherwise unwrap. */
    var bold = /\*\*([^*\n]+)\*\*|__([^_\n]+)__/g;
    if (bold.test(s)) {
      bold.lastIndex = 0;
      if (opts.unicodeBold) {
        s = s.replace(bold, function (m, a, b) { return toUnicodeBold(a || b); });
        changes.push("Converted **bold** to Unicode bold in the " + what + ".");
        warnings.push("Unicode bold is not real formatting. Screen readers announce it as loose symbols or skip it, and LinkedIn search does not index it. Use it sparingly, never for the hook.");
      } else {
        s = s.replace(bold, "$1$2");
        changes.push("Unwrapped **bold** in the " + what + " — LinkedIn has no bold, and the asterisks would show.");
      }
    }
    var ital = /(^|[\s(])[*_]([^*_\n]+)[*_](?=[\s).,!?;:]|$)/g;
    if (ital.test(s)) {
      ital.lastIndex = 0;
      s = s.replace(ital, "$1$2");
      changes.push("Unwrapped italics in the " + what + ".");
    }

    /* 4. Markdown bullets become real bullet characters. */
    if (/^[ \t]*[-*+][ \t]+/m.test(s)) {
      s = s.replace(/^[ \t]*[-*+][ \t]+/gm, "• ");
      changes.push("Converted markdown bullets to • in the " + what + ".");
    }

    /* 5. Inline links: keep the label, drop the syntax. The URL belongs in
          comment 1, and LI-05 has already said so. */
    var mdlink = /\[([^\]\n]+)\]\((https?:\/\/[^)\s]+)\)/g;
    if (mdlink.test(s)) {
      mdlink.lastIndex = 0;
      s = s.replace(mdlink, "$1");
      changes.push("Removed markdown link syntax from the " + what + ".");
      warnings.push("A markdown link was unwrapped to its label. If that URL matters, park it in the first comment.");
    }

    /* 6. Whitespace the composer will otherwise mangle. */
    s = s.replace(/\r\n?/g, "\n");
    s = s.replace(/[ \t]+$/gm, "");
    s = s.replace(/[ \t]{2,}/g, " ");
    var runs = count(/\n{3,}/g, s);
    if (runs) {
      s = s.replace(/\n{3,}/g, "\n\n");
      changes.push("Collapsed " + runs + " run" + (runs > 1 ? "s" : "") + " of blank lines in the " + what + " to a single blank line.");
    }
    /* non-breaking and zero-width characters paste into the composer as invisible junk */
    if (INVISIBLE.test(s)) {
      s = s.replace(NBSP_G, " ").replace(ZERO_WIDTH_G, "");
      changes.push("Removed invisible characters from the " + what + ".");
    }
    return s.replace(/^\n+/, "").replace(/\s+$/, "");
  }

  var body = clean(state.draft, "post");
  var comment = clean(state.comment, "first comment");

  if (body.length > 3000) {
    warnings.push("The post is " + body.length + " characters. LinkedIn cuts the composer off at 3,000 — trim it before pasting.");
  }
  if (comment && comment.length > 1250) {
    warnings.push("The first comment is " + comment.length + " characters; the limit is 1,250.");
  }

  return { text: body, comment: comment, warnings: warnings, changes: changes };
}

/* ---------------- documentation ----------------
 * Single source of truth for the published benchmark page. The build script
 * reads this, so the spec and the running code can never drift apart. */
var DOCS = {
  "LI-01": { short: "Only ~210 characters show before “see more”",
    pass: "The opening 1–2 lines run under 220 characters and carry a number, a tension or a contrarian claim.",
    fail: "The post opens with throat-clearing (“excited to share…”), so the hook falls below the fold.",
    why: "The fold is the only gate that matters. Nothing below it is read unless the reader taps." },
  "LI-02": { short: "Split posts get matched to nobody",
    pass: "One idea, declared by the author, and under 320 words.",
    fail: "The author flags more than one idea in the post.",
    why: "The ranking model matches a post to readers by topic. Two topics halve the match quality of both." },
  "LI-03": { short: "A real example, result or point of view",
    pass: "First-person voice, two or more concrete numbers, or a named framework — and no filler phrases.",
    fail: "Two or more generic-marketing filler phrases, or no first-hand signal at all.",
    why: "Recycled thought-leadership earns no dwell, and repeated low-value posting erodes the account's topical authority." },
  "LI-04": { short: "Documents and video carry the most reach",
    pass: "Format suits the job: a document for a framework, video for a demo or story, text for a sharp opinion.",
    fail: "A link-out post, which is throttled at the format level.",
    why: "Format sets the ceiling before a word is read. Documents and native video hold dwell in a way text cannot." },
  "LI-05": { short: "Blocking — body links cost you distribution",
    pass: "No external link in the body. Any link is parked in the first comment and signposted in the post.",
    fail: "One or more external links in the post body.",
    why: "A body link sends the reader off-platform. Published estimates put the cost between a fifth and half of median reach." },
  "LI-06": { short: "Blocking — explicitly suppressed phrasing",
    pass: "No bait phrasing, and the post closes on a question a real reader could answer.",
    fail: "Bait detected: “comment YES”, “agree?”, “tag someone”, “like if”, and similar.",
    why: "Bait is suppressed directly by the platform. It is one of the few behaviours that is penalised rather than simply ignored." },
  "LI-07": { short: "Short lines, white space, no walls",
    pass: "Three or more blocks, none longer than 240 characters.",
    fail: "A block over 400 characters — a wall of text on a phone.",
    why: "Almost all reading happens on a phone. Density costs dwell before content ever gets a chance." },
  "LI-08": { short: "Topic-hopping resets your authority",
    pass: "The post sits on one of the account's 2–3 defined themes.",
    fail: "Off-theme.",
    why: "Topical authority compounds per account. Hopping stops the model recognising the account as an authority on anything." },
  "LI-09": { short: "Distribution is semantic now",
    pass: "Between zero and three hashtags, not stacked.",
    fail: "Four or more hashtags, or a stack at the end.",
    why: "Hashtags barely affect distribution now that ranking is semantic. Stacks read as spam without buying reach." },
  "LI-10": { short: "People out-reach pages",
    pass: "Personal profile, weekday morning in the audience's timezone.",
    fail: "Company page and off-peak.",
    why: "Personal profiles consistently out-reach company pages, and early engagement is easier to earn when the audience is online." },
  "LI-11": { short: "Early real replies set the trajectory",
    pass: "Someone is committed to replying to every comment in the first 60–90 minutes.",
    fail: "No reply plan.",
    why: "The first 60–90 minutes are the test the model runs before widening reach. Substantive replies count and lift the thread." },
  "LI-12": { short: "Author and post are scored together",
    pass: "Headline and experience line up with the post's topic.",
    fail: "Profile does not match what the post is about.",
    why: "The model scores post and author together. A mismatch caps distribution before anyone reads a word." },
  "LI-13": { short: "The interest graph needs a match",
    pass: "A specific role is named and the reader is addressed directly.",
    fail: "Nobody is named and no second person is used.",
    why: "Distribution is interest-based. An unaddressed post gives the model no audience to match it to." },
  "LI-14": { short: "Announcements are demoted hardest",
    pass: "The post teaches something — a how-to, a lesson, a framework, a mistake.",
    fail: "Pure announcement or promo with nothing to learn.",
    why: "Advice content is the class that still earns multiples of baseline reach; company news is the class demoted hardest." },
  "LI-15": { short: "800–1,000 characters",
    pass: "Between 800 and 1,000 characters.",
    fail: "Under 500 or over 1,600 characters.",
    why: "Long enough to earn dwell, short enough that readers finish. Unfinished posts leak the signal the model is measuring." },
  "LI-16": { short: "Em-dashes, flat rhythm, no numbers",
    pass: "No obvious model tells.",
    fail: "Three or more tells: em-dash rhythm, “not X, it's Y”, model vocabulary, no numbers, uniform sentence length.",
    why: "Generic model prose earns no dwell, so the feed stops distributing it — and the account's authority erodes with it." },
  "LI-18": { short: "Alt text is the only part of the asset the model reads",
    pass: "Alt text of five words or more describing what the asset shows.",
    fail: "No alt text at all.",
    why: "Alt text is the only part of an image or video the ranking model can read, and the only version of it a screen-reader user gets." },
  "LI-19": { short: "Decoration costs feed height and earns nothing",
    pass: "The author confirms the image carries information the text does not.",
    fail: "The image is decorative.",
    why: "A stock photo takes the space a second paragraph could have used and adds no reason to stop." },
  "LI-20": { short: "Portrait and square own the most screen",
    pass: "4:5 for documents and images, 9:16 or 1:1 for video, 16:9 for a newsletter header.",
    fail: "16:9 on a feed post — it wastes vertical space on a phone.",
    why: "Feed height is attention. A landscape asset gives away half the screen it could have held." },
  "LI-21": { short: "The cover is the whole swipe decision",
    pass: "The cover slide states the claim, the number or the tension.",
    fail: "The cover is a title card or a logo.",
    why: "Most people see only the cover. It is the thumbnail and the hook in one frame." },
  "LI-22": { short: "One idea per slide, readable at arm's length",
    pass: "One idea per slide, and 5–10 slides.",
    fail: "Slides carrying more than one idea each.",
    why: "Every swipe is a fresh decision to continue. A crowded slide ends the sequence." },
  "LI-23": { short: "Three seconds is the whole audition",
    pass: "The claim lands inside the first three seconds.",
    fail: "The video opens on an intro, a logo sting or a slow build.",
    why: "Autoplay gives you three seconds before the thumb moves. Spending them on branding spends all of them." },
  "LI-24": { short: "The feed autoplays muted",
    pass: "Captions are burned into the video file.",
    fail: "No burned-in captions.",
    why: "Most video in the feed is watched with no sound. Without captions the audience watches a mute clip and scrolls." },
  "LI-25": { short: "30–90 seconds",
    pass: "Between 30 and 90 seconds.",
    fail: "No length declared, or over three minutes.",
    why: "Completion rate is the signal video is judged on, and it collapses with length." },
  "LI-17": { short: "3+ a week, held for 8+ weeks",
    pass: "Three or more posts a week for eight weeks or more, on the same pillars.",
    fail: "Sporadic posting.",
    why: "Baseline reach per post is an account-level property built by consistency. It is worth more than any single post." }
};

var REACH_TABLE = [
  { group: "Format", what: "Document carousel", mult: 1.40, note: "Highest-reach format; holds dwell on every swipe." },
  { group: "Format", what: "Native video", mult: 1.30, note: "Captions burned in, hook in the first 3 seconds." },
  { group: "Format", what: "Image + text", mult: 1.05, note: "Only when the image adds meaning." },
  { group: "Format", what: "Newsletter", mult: 1.00, note: "Bypasses the feed into the inbox." },
  { group: "Format", what: "Poll", mult: 0.95, note: "Reach has fallen sharply; not an engagement shortcut." },
  { group: "Format", what: "Text-only", mult: 0.90, note: "Works when sharp and short." },
  { group: "Format", what: "Link-out", mult: 0.55, note: "Throttled at the format level." },
  { group: "Penalty", what: "Link in the body", mult: 0.65, note: "Published range runs roughly 0.80×–0.50×." },
  { group: "Penalty", what: "Link in comment 1", mult: 0.95, note: "The cheapest way to carry a link, though not free." },
  { group: "Penalty", what: "Engagement bait", mult: 0.55, note: "Suppressed directly." },
  { group: "Penalty", what: "Reads model-generated", mult: 0.70, note: "Three or more AI tells." },
  { group: "Penalty", what: "Some AI tells", mult: 0.90, note: "One or two tells." },
  { group: "Penalty", what: "Profile–topic mismatch", mult: 0.85, note: "Author and post scored together." },
  { group: "Penalty", what: "Off the account's themes", mult: 0.85, note: "Breaks compounding authority." },
  { group: "Penalty", what: "Company page, not a person", mult: 0.75, note: "Pages under-reach profiles." },
  { group: "Penalty", what: "Hook doesn't hold", mult: 0.75, note: "Throat-clearing above the fold." },
  { group: "Penalty", what: "Soft hook", mult: 0.90, note: "Clear but flat opening." },
  { group: "Account", what: "3+/week, 8+ weeks", mult: 1.15, note: "Consistency lifts baseline reach per post." },
  { group: "Account", what: "1–2 posts a week", mult: 1.00, note: "The baseline." },
  { group: "Account", what: "Sporadic posting", mult: 0.85, note: "Keeps resetting topical authority." },
  { group: "Account", what: "Author present in hour one", mult: 1.10, note: "Replies in the first 60–90 minutes." }
];

/* ---------------- registration ---------------- */
export default F.register({
  docs: DOCS,
  id: "linkedin",
  name: "LinkedIn",
  version: "2.0.0",
  released: "2026-09-01",
  status: "live",
  fold: FOLD,
  dwell: DWELL,
  groups: [
    { id: "craft", label: "Craft & compliance", blurb: "How the post is built, and the behaviours the platform suppresses outright." },
    { id: "graph", label: "2026 interest graph", blurb: "How the ranking model reads the post, its author, and who it should reach." },
    { id: "media", label: "The asset", blurb: "Scored only for the format you are posting. Declared by you — Foldline reads text, it cannot open your file." }
  ],
  tests: tests,
  fixes: fixes,
  fixLabels: FIX_LABELS,
  formatNames: { carousel: "document", video: "video", image: "image", newsletter: "newsletter", poll: "poll", text: "text-only", linkout: "link-out" },
  mechanicalOrder: ["links", "signpost", "bait", "addQuestion", "stripFiller", "hook", "nameReader", "teach", "proof", "trim", "thumb", "tags"],
  fixRequiresInput: function (key, s) {
    if (key === "proof") return !(s.proof || "").trim();
    if (key === "altText") return !(s.altText || "").trim();
    return false;
  },
  context: context,
  compose: composeForLinkedIn,
  signals: signals,
  reach: { clamp: [0.2, 2.2], parts: reachParts, table: REACH_TABLE },

  bands: [
    { key: "ship", min: 85, label: "Ship it", tone: "pass", note: "Both blocking tests pass and the craft rules hold. Post weekday morning and be present for the first 60-90 minutes." },
    { key: "tighten", min: 60, label: "Tighten it", tone: "warn", note: "Publishable, but it's leaving reach on the table. Work the fix list top-down before posting." },
    { key: "rework", min: 0, label: "Rework it", tone: "fail", note: "Below the bar on too many tests. Rebuild around one idea, one reader, one takeaway." }
  ],
  blockedVerdict: { key: "blocked", label: "Fix before publishing", tone: "fail",
    note: "A blocking test failed. Nothing else in the scorecard can compensate - clear it, then re-score." },
  emptyVerdict: { key: "empty", label: "Paste a draft", tone: "neutral", note: "Nothing scored yet." },

  /* a clean stub is not a shippable post */
  overrideVerdict: function (pct, c) {
    if (c.words && c.words < 50) {
      return { key: "rework", label: "Rework it", tone: "fail",
        note: "Under 50 words there is no post to score - a clean stub is not a shippable post. Write the substance in first." };
    }
    return null;
  },

  /* substance floor: a gutted draft must not read as near-shippable */
  postProcess: function (results, c) {
    if (!c.words || c.words >= 50) return;
    var by = {};
    results.forEach(function (r) { by[r.id] = r; });
    by["LI-01"].status = "warn";
    by["LI-01"].note = "Only " + c.words + " words - there isn't enough post here for a hook to carry.";
    by["LI-03"].status = "fail";
    by["LI-03"].note = "Too thin at " + c.words + " words to hold a first-hand insight. Write the substance back in.";
    by["LI-07"].status = "warn";
    by["LI-07"].note = "Nothing to format yet at " + c.words + " words.";
  }
});

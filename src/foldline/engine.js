/* Foldline scoring engine — platform agnostic.
 *
 * Takes a platform definition (see ./platforms/*.js) and a draft, and returns
 * a scored result. Adding a platform means adding a config file, never
 * touching this one.
 */

const Foldline = {};
var platforms = {};

/* ---------- shared text helpers, available to every platform ---------- */
var text = {
  words: function (t) { return t.trim() ? t.trim().split(/\s+/).length : 0; },
  sentences: function (t) { return t.split(/(?<=[.!?])\s+/).filter(function (s) { return s.trim().length; }); },
  paragraphs: function (t) {
    return t.split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean);
  },
  lines: function (t) { return t.split("\n").filter(function (l) { return l.trim().length; }); },
  /* longest unbroken block, the thumb-readability proxy */
  longestBlock: function (t) {
    return text.paragraphs(t).reduce(function (m, p) { return Math.max(m, p.length); }, 0);
  },
  /* sentence-length standard deviation: flat rhythm is a model tell */
  rhythmSD: function (t) {
    var lens = t.split(/(?<=[.!?])\s+/)
      .filter(function (s) { return s.trim().split(/\s+/).length > 2; })
      .map(function (s) { return s.trim().split(/\s+/).length; });
    if (lens.length < 5) return null;
    var mean = lens.reduce(function (a, b) { return a + b; }, 0) / lens.length;
    var v = lens.reduce(function (a, b) { return a + Math.pow(b - mean, 2); }, 0) / lens.length;
    return Math.sqrt(v);
  },
  escape: function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
};

/* ---------- registration ---------- */
function register(def) {
  var problems = validate(def);
  if (problems.length) throw new Error("Invalid platform \"" + def.id + "\": " + problems.join("; "));
  platforms[def.id] = def;
  return def;
}

function validate(def) {
  var out = [];
  if (!def || !def.id) return ["missing id"];
  if (!def.version) out.push("missing version");
  if (!Array.isArray(def.tests) || !def.tests.length) out.push("no tests");
  if (!def.bands || !def.bands.length) out.push("no verdict bands");
  var seen = {};
  (def.tests || []).forEach(function (t, i) {
    if (!t.id) out.push("test " + i + " has no id");
    if (seen[t.id]) out.push("duplicate test id " + t.id);
    seen[t.id] = true;
    if (typeof t.weight !== "number" || t.weight <= 0) out.push(t.id + " has no positive weight");
    if (typeof t.run !== "function") out.push(t.id + " has no run()");
    if (t.fix && typeof t.fix !== "string" && typeof t.fix !== "function")
      out.push(t.id + " fix must be a fix-key string or a function returning one");
  });
  return out;
}

function get(id) {
  var p = platforms[id];
  if (!p) throw new Error("Unknown platform \"" + id + "\". Registered: " + Object.keys(platforms).join(", "));
  return p;
}

function list() {
  return Object.keys(platforms).map(function (k) {
    var p = platforms[k];
    return { id: p.id, name: p.name, version: p.version, tests: p.tests.length, status: p.status || "live" };
  });
}

/* ---------- evaluation ---------- */
function totalWeight(def) {
  return def.tests.reduce(function (s, t) { return s + t.weight; }, 0);
}

/* A status is one of pass | warn | fail. warn earns half weight. */
var CREDIT = { pass: 1, warn: 0.5, fail: 0 };

function evaluate(platformId, input) {
  var def = get(platformId);
  var state = input || {};
  var draft = state.draft || "";

  /* the platform builds its own context object from the draft + settings */
  var ctx = def.context(draft, state, text);

  /* A test may be scoped to certain formats or media. Tests that do not
     apply are excluded from the results AND from the denominator, so a
     text-only post is never marked down for lacking a video hook. */
  var live = def.tests.filter(function (t) {
    return typeof t.appliesTo !== "function" || t.appliesTo(state, ctx);
  });

  var results = live.map(function (t) {
    var r = t.run(ctx, state) || {};
    var status = Object.prototype.hasOwnProperty.call(CREDIT, r.status) ? r.status : "fail";
    return {
      id: t.id,
      n: t.n,
      label: t.label,
      group: t.group || "general",
      weight: t.weight,
      blocking: !!t.blocking,
      evidence: t.evidence || "C",
      status: status,
      note: r.note || "",
      fix: status === "pass" ? null : (typeof t.fix === "function" ? t.fix(ctx, state) : t.fix || null)
    };
  });

  /* the platform may override individual results — e.g. a substance floor
     that stops a gutted draft reading as near-shippable */
  if (typeof def.postProcess === "function") def.postProcess(results, ctx, state);

  /* the denominator is what actually applied to this post, not the catalogue */
  var total = results.reduce(function (s, r) { return s + r.weight; }, 0);
  var earned = results.reduce(function (s, r) { return s + r.weight * CREDIT[r.status]; }, 0);
  /* an empty box scores nothing: declared checkboxes must not carry a phantom score */
  var pct = ctx.words ? Math.round((earned / total) * 100) : 0;
  var blocked = results.some(function (r) { return r.blocking && r.status === "fail"; });

  return {
    platform: { id: def.id, name: def.name, version: def.version },
    results: results,
    groups: groupResults(def, results),
    earned: earned,
    total: total,
    catalogueTotal: totalWeight(def),
    pct: pct,
    blocked: blocked,
    verdict: verdictFor(def, pct, blocked, ctx),
    reach: reachIndex(def, ctx, state, results),
    signals: typeof def.signals === "function" ? def.signals(ctx, state) : [],
    fixes: fixList(results),
    context: ctx
  };
}

function groupResults(def, results) {
  var order = def.groups || [];
  return order.map(function (g) {
    var members = results.filter(function (r) { return r.group === g.id; });
    return {
      id: g.id, label: g.label, blurb: g.blurb || "",
      results: members,
      weight: members.reduce(function (s, r) { return s + r.weight; }, 0)
    };
  }).filter(function (g) { return g.results.length; });
}

function verdictFor(def, pct, blocked, ctx) {
  if (!ctx.words) return def.emptyVerdict || { key: "empty", label: "Paste a draft", note: "Nothing scored yet.", tone: "neutral" };
  if (blocked) return def.blockedVerdict;
  /* platform-level overrides, e.g. a minimum-substance rule */
  if (typeof def.overrideVerdict === "function") {
    var o = def.overrideVerdict(pct, ctx);
    if (o) return o;
  }
  for (var i = 0; i < def.bands.length; i++) {
    if (pct >= def.bands[i].min) return def.bands[i];
  }
  return def.bands[def.bands.length - 1];
}

/* Reach index: a product of multipliers against a clean baseline post
   from the same account. Directional, and clamped so it never reads
   as a precise promise. */
function reachIndex(def, ctx, state, results) {
  if (!def.reach) return null;
  var parts = def.reach.parts(ctx, state, results) || [];
  var raw = parts.reduce(function (m, p) { return m * p.mult; }, 1);
  var clamp = def.reach.clamp || [0.2, 2.2];
  return {
    index: Math.max(clamp[0], Math.min(clamp[1], raw)),
    parts: parts
  };
}

function fixList(results) {
  return results
    .filter(function (r) { return r.status !== "pass"; })
    .sort(function (a, b) {
      if (a.blocking !== b.blocking) return a.blocking ? -1 : 1;
      if (a.status !== b.status) return a.status === "fail" ? -1 : 1;
      return b.weight - a.weight;
    });
}

/* ---------- fixes ---------- */
/* Applying a fix returns a patch of state changes plus an optional notice.
   The caller owns state, so undo is just keeping the previous snapshot. */
function applyFix(platformId, key, state) {
  var def = get(platformId);
  var fn = def.fixes && def.fixes[key];
  if (!fn) return { patch: {}, notice: "" };
  var out = fn(state, text) || {};
  return { patch: out.patch || {}, notice: out.notice || "" };
}

/* Every mechanical fix that currently applies, in a safe running order. */
function autoFixKeys(platformId, result, state) {
  var def = get(platformId);
  var order = def.mechanicalOrder || [];
  var wanted = {};
  result.fixes.forEach(function (r) {
    if (!r.fix) return;
    if (order.indexOf(r.fix) === -1) return;
    if (def.fixRequiresInput && def.fixRequiresInput(r.fix, state)) return;
    wanted[r.fix] = true;
  });
  return order.filter(function (k) { return wanted[k]; });
}

/* ---------- before / after ---------- */
/* A baseline is a frozen, comparable summary of one evaluation. Keep the
   whole result out of it: only what a comparison needs, so it survives
   serialising to storage. */
function baseline(result, state) {
  return {
    at: new Date().toISOString(),
    platform: result.platform.id,
    version: result.platform.version,
    pct: result.pct,
    earned: result.earned,
    total: result.total,
    blocked: result.blocked,
    verdict: { key: result.verdict.key, label: result.verdict.label, tone: result.verdict.tone },
    reach: result.reach ? result.reach.index : null,
    words: result.context.words,
    chars: result.context.chars,
    format: state.format,
    statuses: result.results.reduce(function (m, r) { m[r.id] = r.status; return m; }, {}),
    labels: result.results.reduce(function (m, r) { m[r.id] = r.label; return m; }, {})
  };
}

var RANK = { fail: 0, warn: 1, pass: 2 };

/* Compare a stored baseline against a fresh result. */
function diff(before, after) {
  if (!before) return null;
  var moved = [];
  var ids = Object.keys(after.results.reduce(function (m, r) { m[r.id] = 1; return m; },
    JSON.parse(JSON.stringify(before.statuses))));

  ids.forEach(function (id) {
    var b = before.statuses[id];
    var cur = after.results.filter(function (r) { return r.id === id; })[0];
    var a = cur ? cur.status : null;
    if (b === a) return;
    moved.push({
      id: id,
      label: (cur && cur.label) || before.labels[id] || id,
      from: b || null,
      to: a || null,
      /* a test that stopped applying is neither a gain nor a loss */
      direction: (b == null || a == null) ? "scope" : (RANK[a] > RANK[b] ? "up" : "down")
    });
  });

  var reachBefore = before.reach, reachAfter = after.reach ? after.reach.index : null;
  return {
    before: before,
    pctDelta: after.pct - before.pct,
    reachDelta: (reachBefore != null && reachAfter != null) ? reachAfter - reachBefore : null,
    reachRatio: (reachBefore > 0 && reachAfter != null) ? reachAfter / reachBefore : null,
    unblocked: before.blocked && !after.blocked,
    newlyBlocked: !before.blocked && after.blocked,
    verdictChanged: before.verdict.key !== after.verdict.key,
    charsDelta: after.context.chars - before.chars,
    formatChanged: before.format !== after.context.format,
    moved: moved.sort(function (x, y) {
      var order = { down: 0, up: 1, scope: 2 };
      return order[x.direction] - order[y.direction] || x.id.localeCompare(y.id);
    }),
    gained: moved.filter(function (m) { return m.direction === "up"; }).length,
    lost: moved.filter(function (m) { return m.direction === "down"; }).length
  };
}

/* ---------- composing for the platform's own composer ---------- */
/* Platforms define how their text must actually be pasted. */
function compose(platformId, state, opts) {
  var def = get(platformId);
  if (typeof def.compose !== "function") {
    return { text: state.draft || "", comment: state.comment || "", warnings: [], changes: [] };
  }
  return def.compose(state, opts || {}, text);
}

Foldline.text = text;
Foldline.baseline = baseline;
Foldline.diff = diff;
Foldline.compose = compose;
Foldline.register = register;
Foldline.validate = validate;
Foldline.platform = get;
Foldline.platforms = list;
Foldline.evaluate = evaluate;
Foldline.applyFix = applyFix;
Foldline.autoFixKeys = autoFixKeys;
Foldline.ENGINE_VERSION = "1.0.0";

export default Foldline;

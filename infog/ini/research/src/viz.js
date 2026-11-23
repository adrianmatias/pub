// ---------- piece-specific pure SVG diagrams + narrow phone equivalents ----------
const md = s => s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*([^*\s][^*]*?)\*/g, "<i>$1</i>").replace(/`([^`]+)`/g, "<code>$1</code>");
const cell = (h, q, body, meta, lean, id) => `<div class="cell${lean ? " lean" : ""}"><h5>${h}</h5>${q ? `<div class="q">“${q}”</div>` : ""}<div>${id ? cites(md(body), id) : md(body)}</div>${meta ? `<div class="m">${meta}</div>` : ""}</div>`;
const SVGDEF = `<defs><marker id="ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#7d786f"/></marker><marker id="ahg" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#d4ad3a"/></marker><marker id="ahs" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#4fb3a9"/></marker></defs>`;

// 0. Core AI engineering thesis: constraining generative LLMs into typed deterministic modularity
function counterbalanceSVG() {
  const rows = [
    ["HALLUCINATION", "ungrounded shapes & paraphrases", "Domain & Typed Schema", "BaseModel wire · Field docs · AST ontology"],
    ["UNBOUNDED COMPLEXITY", "piles of loose functions", "OOP Modular Abstraction", "concept = class · component = pkg · PILE ≤ 6"],
    ["UNTESTED CLAIMS", "plausible prose & inert checks", "Deterministic Proof", "13 gates (--prove) · public-surface CRAP ≤ 8"]
  ];
  let g = `<svg viewBox="0 0 640 264" role="img" aria-label="Constraining generative LLMs into typed deterministic modularity">${SVGDEF}`;
  g += `<text class="dgm" x="128" y="16" text-anchor="middle" style="fill:#d0694a">GENERATIVE DRIFT (UNCONSTRAINED LLMS)</text>`;
  g += `<text class="dgm" x="466" y="16" text-anchor="middle" style="fill:#d4ad3a">TYPED DETERMINISTIC MODULARITY (INI)</text>`;
  rows.forEach(([risk, rsub, ans, asub], i) => {
    const y = 28 + i * 64;
    g += `<rect class="box" x="14" y="${y}" width="228" height="52" rx="9" style="stroke:rgba(208,105,74,.45)"/>`;
    g += `<text class="dgm" x="26" y="${y + 20}" style="fill:#d0694a">${risk}</text>`;
    g += `<text class="dg" x="26" y="${y + 39}" style="font-size:11px;fill:#b9b4ab">${rsub}</text>`;

    g += `<path class="ar2 h" d="M246 ${y + 26} H296" marker-end="url(#ahg)"/>`;
    g += `<text class="dgm" x="270" y="${y + 18}" text-anchor="middle" style="fill:#7d786f">bound</text>`;

    g += `<rect class="box h" x="304" y="${y}" width="322" height="52" rx="9" style="fill:rgba(212,173,58,.07)"/>`;
    g += `<text class="dgb" x="318" y="${y + 21}" style="font-size:14.5px;fill:#ebe8e2">${ans}</text>`;
    g += `<text class="dgm" x="318" y="${y + 39}" style="fill:#4fb3a9">${asub}</text>`;
  });
  g += `<rect class="box" x="14" y="222" width="612" height="32" rx="8" style="fill:rgba(79,179,169,.08);stroke:rgba(79,179,169,.4)"/>`;
  g += `<text class="dgm" x="320" y="242" text-anchor="middle" style="fill:#ebe8e2;font-size:10px">ARC: walking skeleton (LLM) → distil into typed modules → LLM keeps only irreducible judgement</text>`;
  return g + `</svg>`;
}
const counterbalanceHTML = () => `<div class="cb-list">
  <div class="cb-row"><div class="risk">vs Hallucination</div><div class="ans">Domain &amp; Typed Schema</div><div class="how">Name the domain, forbid illegal states, describe every wire field (schema = prompt), render ontology from AST.</div></div>
  <div class="cb-row"><div class="risk">vs Unbounded Complexity</div><div class="ans">OOP Modular Abstraction</div><div class="how">A concept is a class; a component is a package; thin cli/ run layer; ≤6 free functions per module; C901 ≤ 6.</div></div>
  <div class="cb-row"><div class="risk">vs Untested Claims</div><div class="ans">Deterministic Witness-Proven Proof</div><div class="how">13 gates proven able to fail (--prove), public-surface behaviour tests, CRAP ≤ 8, and cross-family adversarial review.</div></div>
</div>`;

// 1. The paradox resolved: drifting copies vs coupled dependency -> deliberate redundancy
function paradoxSVG() {
  let g = `<svg viewBox="0 0 640 250" role="img" aria-label="Shared knowledge: drifting copies vs coupled dependency vs deliberate redundancy">${SVGDEF}`;
  g += `<rect class="box" x="14" y="18" width="186" height="92" rx="10"/>`;
  g += `<text class="dgm" x="28" y="38" style="fill:#d0694a">FAILURE 1 · STATIC COPIES</text>`;
  g += `<text class="dgb" x="28" y="60">Copy-paste &amp; drift</text>`;
  g += `<text class="dg" x="28" y="80">Decoupled, but lessons rot.</text>`;
  g += `<text class="dg" x="28" y="96" style="fill:#7d786f">Each repo repeats old bugs.</text>`;

  g += `<rect class="box" x="440" y="18" width="186" height="92" rx="10"/>`;
  g += `<text class="dgm" x="454" y="38" style="fill:#d0694a">FAILURE 2 · LIVE DEPENDENCY</text>`;
  g += `<text class="dgb" x="454" y="60">Package / submodule</text>`;
  g += `<text class="dg" x="454" y="80">Synced, but tightly coupled.</text>`;
  g += `<text class="dg" x="454" y="96" style="fill:#7d786f">One bump breaks every repo.</text>`;

  g += `<path class="ar2" d="M204 64 H432" stroke-dasharray="4 4"/>`;
  g += `<text class="dgm" x="320" y="56" text-anchor="middle">THE OLD TRADE-OFF</text>`;

  g += `<path class="ar2 h" d="M108 110 Q150 132 212 136" marker-end="url(#ahg)"/>`;
  g += `<path class="ar2 h" d="M532 110 Q490 132 428 136" marker-end="url(#ahg)"/>`;

  g += `<rect class="box h" x="116" y="138" width="408" height="98" rx="12" style="fill:rgba(212,173,58,.08)"/>`;
  g += `<text class="dgm" x="320" y="159" text-anchor="middle" style="fill:#d4ad3a">INI'S RESOLUTION · DELIBERATE REDUNDANCY</text>`;
  g += `<text class="dgb" x="320" y="183" text-anchor="middle" style="font-size:17px">An agent distils by meaning — zero links kept</text>`;
  g += `<text class="dg" x="320" y="205" text-anchor="middle">Each project owns its distillate in its own words and layout.</text>`;
  g += `<text class="dgm" x="320" y="223" text-anchor="middle" style="fill:#4fb3a9">If ini vanished tomorrow, every project would stay 100% green.</text>`;
  return g + `</svg>`;
}
const paradoxHTML = () => `<div class="px-grid">
  <div class="px-card"><b>Failure 1 · Static copies</b><span>Decoupled, but lessons drift and every repo repeats old bugs.</span></div>
  <div class="px-card"><b>Failure 2 · Live dependency</b><span>Synced, but a central change or pin couples every project to one clock.</span></div>
  <div class="px-card win" style="grid-column:1/-1"><b>ini · Deliberate redundancy</b><span>An agent reads ini, compares by meaning, and rewrites what applies in each project's own words. Zero imports, submodules, or origin stamps: every repo stays green if ini disappears.</span></div>
</div>`;

// 2. The 6-tier steering ladder + 4 intellectual lenses
function steeringSVG() {
  const T = [
    ["TIER 1", "objective.md", "claim, checkable loss, kill criterion"],
    ["TIER 2", "foundation.md", "12 principles, rhythm, lenses"],
    ["TIER 3", "domain.md", "words + AST-rendered ontology"],
    ["TIER 4", "code-standard.md", "shape, boundaries, refusals"],
    ["TIER 5", "gates & tests", "13 witness-proven checks, public surface"],
    ["TIER 6", "implementation", "code the agent writes — lowest authority"]
  ];
  const L = [
    ["Taleb", "antifragile routing"],
    ["Deutsch", "conjectures & refutations"],
    ["Karpathy", "compiled wiki"],
    ["Chollet", "generalisation score"]
  ];
  let g = `<svg viewBox="0 0 640 318" role="img" aria-label="The six-tier steering ladder and four lenses">${SVGDEF}`;
  g += `<path class="ar2 h" d="M22 24 V294" marker-end="url(#ahg)"/>`;
  g += `<text class="dgm" x="14" y="160" text-anchor="middle" transform="rotate(-90 14 160)" style="fill:#d4ad3a">STEERING FLOWS DOWN</text>`;
  g += `<path class="ar2" d="M620 294 V24" marker-end="url(#ahs)" style="stroke:#4fb3a9"/>`;
  g += `<text class="dgm" x="628" y="160" text-anchor="middle" transform="rotate(90 628 160)" style="fill:#4fb3a9">EVIDENCE FLOWS UP</text>`;
  T.forEach(([tier, name, desc], i) => {
    const y = 16 + i * 49, top = i === 0, gate = i === 4;
    g += `<rect class="box${top || gate ? " h" : ""}" x="40" y="${y}" width="392" height="40" rx="8"/>`;
    g += `<text class="dgm" x="52" y="${y + 16}" style="fill:${top ? "#d4ad3a" : gate ? "#4fb3a9" : "#7d786f"}">${tier}</text>`;
    g += `<text class="dgb" x="108" y="${y + 17}" style="font-size:14px">${name}</text>`;
    g += `<text class="dg" x="52" y="${y + 33}" style="font-size:11px;fill:#b9b4ab">${desc}</text>`;
  });
  g += `<rect class="box" x="450" y="16" width="154" height="285" rx="10" stroke-dasharray="4 4"/>`;
  g += `<text class="dgm" x="527" y="38" text-anchor="middle" style="fill:#8f9bd6">FOUR LENSES</text>`;
  g += `<text class="dgm" x="527" y="52" text-anchor="middle">(foundation.md)</text>`;
  L.forEach(([who, what], i) => {
    const y = 68 + i * 56;
    g += `<rect class="box" x="462" y="${y}" width="130" height="44" rx="7"/>`;
    g += `<text class="dgb" x="527" y="${y + 18}" text-anchor="middle" style="font-size:13.5px;fill:#8f9bd6">${who}</text>`;
    g += `<text class="dg" x="527" y="${y + 34}" text-anchor="middle" style="font-size:10.5px;fill:#b9b4ab">${what}</text>`;
  });
  return g + `</svg>`;
}
const steeringHTML = () => `<ol class="tier-list">
  <li class="top"><b>Tier 1</b><span>objective.md</span><em>claim, checkable loss, kill criterion</em></li>
  <li><b>Tier 2</b><span>foundation.md</span><em>12 principles, rhythm, 4 lenses</em></li>
  <li><b>Tier 3</b><span>domain.md</span><em>words + AST ontology</em></li>
  <li><b>Tier 4</b><span>code-standard.md</span><em>shape, seams, refusals</em></li>
  <li class="top"><b>Tier 5</b><span>gates &amp; behaviour tests</span><em>13 witnesses, public surface</em></li>
  <li><b>Tier 6</b><span>implementation</span><em>lowest authority — rewritten freely</em></li>
</ol>`;

// 3. Walking skeleton -> Distil the LLM out
function skeletonSVG() {
  let g = `<svg viewBox="0 0 640 218" role="img" aria-label="Walking skeleton first, then distil the LLM out round by round">${SVGDEF}`;
  const cols = [
    [16, "ROUND 1 · SKELETON", "LLM carries the path", [["Parse input", 1], ["Apply rules", 1], ["Judgement", 1], ["Format output", 1]]],
    [226, "ROUND N · HARDENING", "Deterministic seams extracted", [["Typed parser", 0], ["Domain rules", 0], ["Judgement", 1], ["Pure renderer", 0]]],
    [436, "MATURE · ENGINEERING", "Only judgement stays LLM", [["Pydantic wire", 0], ["Tested core", 0], ["Judgement + schema", 1], ["Proven gates", 0]]]
  ];
  cols.forEach(([x, k, sub, rows], ci) => {
    g += `<rect class="box${ci === 2 ? " h" : ""}" x="${x}" y="12" width="188" height="194" rx="10"/>`;
    g += `<text class="dgm" x="${x + 12}" y="30" style="fill:${ci === 2 ? "#d4ad3a" : "#7d786f"}">${k}</text>`;
    g += `<text class="dg" x="${x + 12}" y="46" style="font-size:11px;fill:#ebe8e2">${sub}</text>`;
    rows.forEach(([lbl, llm], ri) => {
      const y = 60 + ri * 34;
      g += `<rect x="${x + 12}" y="${y}" width="164" height="26" rx="6" fill="${llm ? "rgba(212,173,58,.15)" : "rgba(79,179,169,.14)"}" stroke="${llm ? "#8f7524" : "#4fb3a9"}"/>`;
      g += `<text class="dgm" x="${x + 22}" y="${y + 17}" style="fill:${llm ? "#d4ad3a" : "#4fb3a9"}">${llm ? "LLM" : "CODE"}</text>`;
      g += `<text class="dg" x="${x + 62}" y="${y + 17}" style="font-size:11px">${lbl}</text>`;
    });
    if (ci < 2) g += `<path class="ar2 h" d="M${x + 190} 110 H${x + 206}" marker-end="url(#ahg)"/>`;
  });
  return g + `</svg>`;
}
const skeletonHTML = () => `<div class="loop hot"><b>Round 1 · Walking skeleton</b><span>One thin end-to-end path through cli/ + 1 behaviour test; the LLM may carry every step.</span></div>
<div class="loop"><b>Round N · Distil the LLM out</b><span>Move parsing, lookups, rules, and rendering into typed deterministic code — the model keeps only irreducible judgement.</span></div>`;

// 4. ini's real AST-rendered ontology graph (verified from domain.md)
function ontologySVG() {
  const B = [
    ["ci", 66, 94, "entry", "0 entities"],
    ["cli", 198, 94, "run layer", "0 entities"],
    ["gates", 364, 42, "13 checks", "24 entities"],
    ["ontology", 364, 148, "AST reader", "10 entities"],
    ["core", 548, 94, "kernel", "7 entities"]
  ];
  let g = `<svg viewBox="0 0 640 202" role="img" aria-label="ini AST-rendered package dependency graph from domain.md">${SVGDEF}`;
  const edges = [[112, 94, 148, 94], [248, 82, 304, 52], [248, 106, 304, 136], [248, 94, 488, 94], [424, 52, 490, 82], [424, 136, 490, 106], [364, 70, 364, 118]];
  edges.forEach(([x1, y1, x2, y2]) => { g += `<path class="ar2" d="M${x1} ${y1} L${x2} ${y2}" marker-end="url(#ahs)" style="stroke:#4fb3a9"/>`; });
  B.forEach(([name, x, y, sub, ent]) => {
    const hot = name === "gates" || name === "core";
    g += `<rect class="box${hot ? " h" : ""}" x="${x - 54}" y="${y - 27}" width="108" height="54" rx="9"/>`;
    g += `<text class="dgb" x="${x}" y="${y - 6}" text-anchor="middle" style="font-size:14px">${name}</text>`;
    g += `<text class="dgm" x="${x}" y="${y + 9}" text-anchor="middle" style="fill:#4fb3a9">${sub}</text>`;
    g += `<text class="dgm" x="${x}" y="${y + 21}" text-anchor="middle">${ent}</text>`;
  });
  g += `<text class="dgm" x="320" y="194" text-anchor="middle">41 public entities · 26 components · 11 values · 2 vocabularies · 1 wire · 1 error</text>`;
  return g + `</svg>`;
}
const ontologyHTML = () => `<div class="loop hot"><b>AST import graph (domain.md)</b><span>ci → cli → {gates, ontology, core}; gates → {ontology, core}; ontology → core. Zero cycles; 41 public entities rendered straight from Python AST.</span></div>`;

// 5. How --prove works
function proveSVG() {
  const S = [
    [68, 72, "working tree", "untouched"],
    [206, 72, "Replica", "copy code + link data"],
    [352, 72, "plant witness", "1 defect per gate"],
    [492, 72, "run gate", "must fail in witness"],
    [594, 72, "13 / 13", "proven"]
  ];
  let g = `<svg viewBox="0 0 640 144" role="img" aria-label="How --prove plants one witness per gate in a scratch replica">${SVGDEF}`;
  S.forEach(([x, y, a, b], i) => {
    const w = i === 4 ? 76 : i === 0 ? 114 : 122;
    g += `<rect class="box${i === 2 || i === 4 ? " h" : ""}" x="${x - w / 2}" y="${y - 28}" width="${w}" height="56" rx="9"${i === 4 ? ' style="fill:rgba(79,179,169,.14);stroke:#4fb3a9"' : ""}/>`;
    g += `<text class="dgb" x="${x}" y="${y - 5}" text-anchor="middle" style="font-size:13px${i === 4 ? ";fill:#4fb3a9" : ""}">${a}</text>`;
    g += `<text class="dgm" x="${x}" y="${y + 14}" text-anchor="middle">${b}</text>`;
  });
  [[126, 144], [268, 290], [414, 430], [554, 555]].forEach(([x1, x2]) => {
    if (x2 > x1) g += `<path class="ar2 h" d="M${x1} 72 H${x2}" marker-end="url(#ahg)"/>`;
  });
  g += `<text class="dgm" x="320" y="128" text-anchor="middle" style="fill:#d0694a">If a gate stays green on its planted defect → FAIL ("witness ACCEPTED — the gate is inert")</text>`;
  return g + `</svg>`;
}
const proveHTML = () => `<ol class="round">
  <li><b>Replica</b> copies gate inputs to scratch and symlinks data directories — working tree stays untouched.</li>
  <li><b>Plant</b> writes one targeted failing file per gate (e.g. undescribed wire field, 8-line twin, failing test).</li>
  <li><b>Judge</b> requires a red finding inside the planted file; green means the gate is inert and fails <code>--prove</code>.</li>
</ol>`;

// 6. Expand / Compress round loop
function rhythmSVG() {
  const B = [
    [94, 46, "1 · expand", "explore & make it work"],
    [268, 46, "2 · gates", "13/13 whole tree green"],
    [442, 46, "3 · critic", "other family, failing cases"],
    [442, 148, "4 · compress", "kill, fold, measure delta"],
    [268, 148, "5 · record", "now.md + log/agt.md"],
    [94, 148, "6 · harvest", "up if 2+ repos · down by meaning"]
  ];
  let g = `<svg viewBox="0 0 540 198" role="img" aria-label="The breathing cycle of one working round">${SVGDEF}`;
  B.forEach(([x, y, a, b], i) => {
    g += `<rect class="box${i === 3 ? " h" : ""}" x="${x - 76}" y="${y - 24}" width="152" height="48" rx="9"/>`;
    g += `<text class="dgb" x="${x}" y="${y - 3}" text-anchor="middle" style="font-size:13.5px">${a}</text>`;
    g += `<text class="dgm" x="${x}" y="${y + 14}" text-anchor="middle">${b}</text>`;
  });
  g += `<path class="ar2" d="M172 46 H190" marker-end="url(#ah)"/><path class="ar2" d="M346 46 H364" marker-end="url(#ah)"/><path class="ar2" d="M442 72 V122" marker-end="url(#ah)"/>`;
  g += `<path class="ar2 h" d="M364 148 H346" marker-end="url(#ahg)"/><path class="ar2 h" d="M190 148 H172" marker-end="url(#ahg)"/><path class="ar2 h" d="M94 122 V72" marker-end="url(#ahg)"/>`;
  g += `<text class="dgm" x="104" y="101" style="fill:#d4ad3a">next round</text>`;
  return g + `</svg>`;
}
const rhythmHTML = () => `<ol class="round">
  <li><b>expand</b> build or explore toward the objective (make it work).</li>
  <li><b>gates</b> whole tree green (make it right, in its own diff).</li>
  <li><b>critic</b> independent pass by another model family.</li>
  <li><b>compress</b> judge threads, kill with reasons, fold into fewer lines.</li>
  <li><b>record &amp; harvest</b> rewrite now.md, append log, promote lessons that held twice.</li>
</ol>`;

// 7. Dream loop + conjectures
function dreamSVG() {
  const B = [
    [90, 48, "1 · replay", "logs + conjectures.md"],
    [280, 48, "2 · pairs", "dream.py pairs (≥2 kB)"],
    [470, 48, "3 · daydream", "other family, ≥20c"],
    [470, 146, "4 · check", "dream.py check (wire)"],
    [280, 146, "5 · judge", "true · new · hard-to-vary"],
    [90, 146, "6 · feed", "dream.py feed + cNN"]
  ];
  let g = `<svg viewBox="0 0 560 196" role="img" aria-label="Two-phase dream consolidation loop and conjecture register">${SVGDEF}`;
  B.forEach(([x, y, a, b], i) => {
    g += `<rect class="box${i === 3 || i === 5 ? " h" : ""}" x="${x - 80}" y="${y - 24}" width="160" height="48" rx="9"/>`;
    g += `<text class="dgb" x="${x}" y="${y - 3}" text-anchor="middle" style="font-size:13.5px">${a}</text>`;
    g += `<text class="dgm" x="${x}" y="${y + 14}" text-anchor="middle">${b}</text>`;
  });
  g += `<path class="ar2" d="M172 48 H198" marker-end="url(#ah)"/><path class="ar2" d="M362 48 H388" marker-end="url(#ah)"/><path class="ar2 h" d="M470 74 V120" marker-end="url(#ahg)"/>`;
  g += `<path class="ar2 h" d="M388 146 H362" marker-end="url(#ahg)"/><path class="ar2 h" d="M198 146 H172" marker-end="url(#ahg)"/>`;
  g += `<text class="dgm" x="470" y="102" text-anchor="middle" style="fill:#c96f8f">failed quote = instant kill</text>`;
  return g + `</svg>`;
}
const dreamHTML = () => `<ol class="round">
  <li><b>Replay</b> sync anchors, learnings and <code>wiki/conjectures.md</code> (<code>open</code> / <code>promoted</code> / <code>destroyed</code>) to recent logs before sampling.</li>
  <li><b>Pairs &amp; Daydream</b> <code>dream.py pairs</code> samples unlinked pages; another model family proposes candidate links with ≥20-char quotes.</li>
  <li><b>Check</b> <code>dream.py check</code> parses rows as <code>Candidate</code> and matches ≥20-char quotes via normalised substring; any mismatch kills the candidate immediately.</li>
  <li><b>Judge &amp; Feed</b> keep ~1 in 6–10 true, new, useful, hard-to-vary claims; assign a permanent <code>cNN</code> id + falsifier and run <code>dream.py feed</code> (idempotent on <code>pairs.tsv</code> and <code>## Dream links</code>).</li>
</ol>`;

const md = s => s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*([^*\s][^*]*?)\*/g, "<i>$1</i>").replace(/`([^`]+)`/g, "<code>$1</code>");
const takeRow = (q, who, v, why, id) => `<div class="take"><q>${q}</q><div class="who">— ${who}</div>${v ? `<div class="score"><b class="${v}">${v.replace("-", " ")}</b><span>${cites(md(why), id)}</span></div>` : ""}</div>`;

// ---------- small diagrams (pure SVG, qualitative: no numbers in them) ----------
const SVGDEF = `<defs><marker id="ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#7d786f"/></marker><marker id="ahg" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#d4ad3a"/></marker></defs>`;
function ladderSVG() {
  const R = [["2008", "reads the rock, designs the blast", "below: the jumbo drills the face"],
             ["2015", "chooses the features, the model and the fold", "below: the cluster fits it"],
             ["2023", "reviews every line", "below: the copilot types"],
             ["2026", "writes the contract, keeps the gates", "below: agents write the code"],
             ["20??", "writes the objective and the condition that kills it", "below: agents write the contracts — a conjecture"]];
  let g = `<svg viewBox="0 0 640 400" role="img" aria-label="the human's rung, five steps">${SVGDEF}`;
  g += `<line x1="34" y1="18" x2="34" y2="388" stroke="#34343a" stroke-width="3"/><line x1="98" y1="18" x2="98" y2="388" stroke="#34343a" stroke-width="3"/>`;
  R.forEach((r, i) => {
    const y = 362 - i * 78, top = i === 4, now = i === 3;
    g += `<line x1="34" x2="98" y1="${y}" y2="${y}" stroke="${now ? "#d4ad3a" : "#57534c"}" stroke-width="${now ? 5 : 3}"${top ? ' stroke-dasharray="5 5"' : ""}/>`;
    g += `<text class="dgm" x="112" y="${y - 14}" style="fill:${now ? "#d4ad3a" : "#7d786f"}">${r[0]} · the human</text>`;
    g += `<text class="dgb" x="112" y="${y + 4}"${top ? ' style="font-style:italic;fill:#b9b4ab"' : ""}>${r[1]}</text>`;
    g += `<text class="dg" x="112" y="${y + 22}" style="fill:#7d786f">${r[2]}</text>`;
  });
  g += `<path class="ar2" d="M16 360 L16 40" marker-end="url(#ah)"/>`;
  return g + `</svg>`;
}
function loopSVG(x0, title, steps, hot) {
  const cx = x0 + 150, cy = 165, r = 92, P = [[cx, cy - r], [cx + r, cy], [cx, cy + r], [cx - r, cy]];
  let g = `<text class="dgm" x="${cx}" y="22" text-anchor="middle" style="fill:${hot ? "#d4ad3a" : "#7d786f"};font-size:11px">${title}</text>`;
  g += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${hot ? "#8f7524" : "#34343a"}" stroke-width="2" stroke-dasharray="4 6"/>`;
  for (let k = 0; k < 4; k++) { const a = -Math.PI / 2 + k * Math.PI / 2 + .5, b = a + .55;
    g += `<path class="ar2${hot ? " h" : ""}" d="M${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)} A${r} ${r} 0 0 1 ${cx + r * Math.cos(b)} ${cy + r * Math.sin(b)}" marker-end="url(#${hot ? "ahg" : "ah"})"/>`; }
  steps.forEach((s, k) => { const [x, y] = P[k], w = 132;
    g += `<rect class="box${hot ? " h" : ""}" x="${x - w / 2}" y="${y - 17}" width="${w}" height="34" rx="8"/><text class="dg" x="${x}" y="${y + 4}" text-anchor="middle">${s}</text>`; });
  return g;
}
const natmSVG = () => `<svg viewBox="0 0 640 300" role="img" aria-label="the observational loop on a tunnel face and in an agent loop">${SVGDEF}` +
  loopSVG(0, "TUNNEL FACE · NATM, 2008", ["excavate a round", "measure convergence", "adapt the support", "next round"], false) +
  loopSVG(330, "AGENT LOOP · 2026", ["generate", "score a hidden fold", "tighten the gate", "next round"], true) + `</svg>`;
function roundSVG() {
  const B = [[90, 40, "log/mat.md", "his prompt"], [260, 40, "route", "pattern + model roles"], [430, 40, "agents", "plan · execute ∥"],
             [430, 150, "gates", "each seen to fail"], [260, 150, "review", "another model family"], [90, 150, "log/agt.md", "reply + what failed"]];
  let g = `<svg viewBox="0 0 520 200" role="img" aria-label="one working round in the house">${SVGDEF}`;
  B.forEach(([x, y, a, b], i) => {
    g += `<rect class="box${i === 3 ? " h" : ""}" x="${x - 74}" y="${y - 24}" width="148" height="48" rx="9"/><text class="dgb" x="${x}" y="${y - 3}" text-anchor="middle" style="font-size:14px">${a}</text><text class="dgm" x="${x}" y="${y + 14}" text-anchor="middle">${b}</text>`;
  });
  g += `<path class="ar2" d="M166 40H184" marker-end="url(#ah)"/><path class="ar2" d="M336 40H354" marker-end="url(#ah)"/><path class="ar2" d="M430 66V124" marker-end="url(#ah)"/>`;
  g += `<path class="ar2" d="M354 150H336" marker-end="url(#ah)"/><path class="ar2" d="M184 150H166" marker-end="url(#ah)"/><path class="ar2 h" d="M90 124V66" marker-end="url(#ahg)"/>`;
  g += `<text class="dgm" x="98" y="99" style="fill:#d4ad3a">next round</text>`;
  return g + `</svg>`;
}

const ERAS = [
  { gx: -3, t: "2007 – 2015", s: "before code", span: "8 years" },
  { gx: -2, t: "2015 – 2022", s: "doors by hand", span: "7 years" },
  { gx: -1, t: "2023 – 2025", s: "the pilot", span: "3 years" },
  { gx: 0, t: "2026 · Jan – Mar", s: "notebooks to agents", span: "3 months", now: true },
  { gx: 1, t: "2026 · Apr – Jul", s: "the contract", span: "4 months", now: true },
  { gx: 2, t: "2026 · Aug – Sep", s: "the house", span: "2 months", now: true },
  { gx: 3, t: "2026 · Oct 1 – 14", s: "measuring the method", span: "2 weeks", now: true },
  { gx: 4, t: "2027 – 2030", s: "the next rung", span: "ahead" }];

const DATA = {
start: "thesis",
kicker: "data science in the age of agents · 14 Oct 2026",
title: "Closing Doors",
subtitle: "Agents made opening doors nearly free. His bet: the scarce work is closing them.",
feedHint: "Time runs down the page and speeds up as it goes: eight years, then seven, three, then months, then two weeks. Open any card for the evidence; every number has its source.",
topRow: -2, lastTopX: 2,
eras: ERAS,
bands: [
  ...ERAS.map(e => ({ x: e.gx * 1800 - 600, y: -2385, html: `${e.t}<small>${e.s} · ${e.span}</small>`, cls: e.now ? "now" : "" })),
  { x: -6000, y: -2070, html: "the field ↓", cls: "layer" },
  { x: -6000, y: -575, html: "his practice ↓", cls: "layer" },
  { x: -6000, y: 840, html: "the evidence ↓", cls: "layer" }
],
nodes: [

// ───────────────────────────── top row: thesis, the rung, method
{ id: "thesis", gx: 0.5, gy: -2, hue: "gold", short: "the thesis", h: 1110,
  feedKicker: "the thesis · 2026", feedTitle: "The year it turned", feedVerdict: "Opening got cheap; closing did not. Inside: 2026 in ten rows, the case for and the case against.",
  kicker: "data science in the age of agents · 14 Oct 2026", title: "Closing Doors",
  big: { v: "15 → 198", u: "", l: "his commits: all of July vs the first 14 days of October — activity, not productivity" },
  verdict: "Agents made opening doors nearly free. His bet: the scarce work is closing them.",
  pill: "a working hypothesis",
  lede: "A 2022 notebook line: *Data Science is about opening doors, Machine Learning Engineering is about closing almost all of them* [1]. 2026 is the year that line became an explicit agent workflow. In ten months the field's yardsticks bent: METR found developers withholding work from its no-AI arm, enough to make its estimate unreliable [2]; context files describing a repository were found, on average, not to help coding agents while adding over 20% to cost [3]; and a hardened coding benchmark split into a public 99.4% and a private 81.6% [4]. His own work moved from a copilot in an editor to agents in vaults, built against contracts and checked against folds they never see. The map reads left to right in time, and its columns narrow as the clock speeds up. Its argument is his working hypothesis, not a measured fact: the scarce part of the work moved from writing code to deciding what is allowed to stay.",
  left: (id, nw) => (nw ? strip26HTML() : `<figure class="chart">${strip26SVG()}<div class="cs">${rich("Bars: his commits per month over 14 personal repos and this vault [8] — activity, not value; employer work is not in them; October is 14 days. Events: each is sourced on its own tile.", id)}</div></figure>`) +
    `<div class="bb"><div class="bull"><h4>for the hypothesis</h4>${rich("Trust stays conditional: **48%** of developers trust AI when they can easily verify it, **6.6%** for important decisions [5]. Public scores outrun private ones [4]; his own judge was overconfident (*an eval is a model*).", id)}</div><div class="bear"><h4>the strongest case against</h4>${rich("Agents already close doors too: **58.1%** of developers use AI to write tests and **64.5%** find it useful for review [5]. If checking automates as fast as writing, its absolute cost falls even while its share of human time rises — and scarcity is the wrong word.", id)}</div></div>`,
  right: id => takeRow("Data Science is about opening doors, Machine Learning Engineering is about closing almost all of them.", "notebook, León, 2022", "holds", "Four years on, opening is what agents do best. Closing — the held-out fold, the gate, the kill with a reason — is what the evidence on this map suggests stays scarce; the case against is on the left.", id) + `<div class="grid2">
    ${cell("What got cheap", "", md("The draft, the code, the first search. The price of a fixed capability falls **9× to 900× a year**, depending on the task [6]."), "", false, id)}
    ${cell("What got scarce", "", md("Knowing whether it is right. **66%** of developers spend more time fixing almost-right AI code [7]; **76.5%** run an AI answer before using it [5]."), "", false, id)}
    ${cell("What he does now", "", md("Writes the contract the agents build against, keeps gates he has *seen fail*, has a different model family review the author — and still does the old parts: choosing the problem, designing the experiment, explaining the result to whoever decides."), "", true, id)}
    ${cell("What he stopped doing", "", md("Typing most of the code. Notebook cells as the deliverable. Letting one model check its own work."), "", false, id)}
  </div>`,
  tellLeft: true,
  tell: "**Whether closing gets cheap too.** Not words generated but accepted value per human hour, and defects that escape review. Two proxies on this map: the public–private score difference [4], and how well an LLM judge is calibrated on a fold it never saw.",
  src: [["Private notebook, 2022 — quoted as an idea", "", "2022", ""],
    ["METR — changing our developer productivity experiment design", "https://metr.org/blog/2026-02-24-uplift-update/", "24 Feb 2026", "FACT"],
    ["Evaluating AGENTS.md (arXiv:2602.11988)", "https://arxiv.org/abs/2602.11988", "12 Feb 2026", "FACT"],
    ["Scale Labs — SWE-Bench Pro V2: public 638/642 vs private 222/272 (Claude Opus 5)", "https://labs.scale.com/blog/swe-bench-pro-v2", "22 Sep 2026", "FACT"],
    ["Stack Overflow Developer Survey 2026 — AI data", "https://survey.stackoverflow.co/2026/ai/data", "2026", "FACT"],
    ["Epoch AI — LLM inference prices have fallen rapidly but unequally across tasks", "https://epoch.ai/data-insights/llm-inference-price-trends", "12 Mar 2025", "FACT"],
    ["Stack Overflow — 2025 Developer Survey results (blog)", "https://stackoverflow.blog/2025/12/29/developers-remain-willing-but-reluctant-to-use-ai-the-2025-developer-survey-results-are-here/", "29 Dec 2025", "FACT"],
    ["Own count over his personal repos (git log --all), snapshot of 14 Oct 2026, taken before this piece's own commit", "", "14 Oct 2026", "FACT"]] },

{ id: "ladder", gx: -2, gy: -2, hue: "ink", short: "the rung",
  kicker: "the human's rung · 2008 → 20??", title: "The rung moves up",
  big: { v: "5", u: "rungs", l: "from the rock face to the kill criterion" },
  verdict: "On each rung the machine takes the one below. The human stays where consequences are decided.",
  pill: "a framing, not a measurement",
  lede: "The same move, five times. On a tunnel face the jumbo drills and the engineer reads the rock. In a model the cluster fits and the data scientist chooses the features and the fold. With a copilot the model types and the engineer reviews each line. With agents the code writes itself and the human writes the contract it is built against. The next rung, if the curves on this map hold, is writing only the objective and the condition that kills it.",
  left: (id, nw) => nw ? ladderHTML() : `<figure class="chart">${ladderSVG()}<div class="cs">Each rung dated by when he stood on it. The top rung is a conjecture.</div></figure>`,
  right: id => cites(`<div class="prose"><p><b>What does not move.</b> On every rung the work that stays human is the same kind: deciding what counts as evidence before looking at it, and carrying the consequence when it is wrong. A blast that fractures the wrong rock, a model that loses money, an agent that ships a passing test over a broken function — the failure changes medium, not shape.</p><p><b>What the climb costs.</b> Each rung up removes practice that used to train judgement. Employment of 22–25-year-olds in the most AI-exposed jobs is 11% lower than in Nov 2022 [1] — the bottom rung is where people learned. The New York Fed's reading is more cautious: the relative fall in AI-exposed vacancies began before ChatGPT [2].</p></div>`, id) +
    takeRow("human consciousness creates from zero to one, chatbots amplify human intelligence, judgement and wisdom, agentic ai compounds the amplification across iterations beyond the first horizon.", "notebook, Apr 2026", "", "", id),
  tell: "**Who trains the next door-closer?** If juniors never write the code, where do they learn to judge it? Watch the employment gap for 22–25-year-olds [1].",
  src: [["Stanford Digital Economy Lab — Canaries in the Coal Mine? (revised)", "https://digitaleconomy.stanford.edu/news/canariesaug26/", "12 Aug 2026", "FACT"],
    ["Liberty Street Economics — Do job postings show early labor-market effects of AI?", "https://libertystreeteconomics.newyorkfed.org/2026/05/do-job-postings-show-early-labor-market-effects-of-ai/", "14 May 2026", "FACT"]] },

{ id: "method", gx: 3, gy: -2, hue: "ink", short: "method",
  kicker: "how this was made", title: "Method & limits",
  big: { v: "4 + 1", u: "", l: "research slices, one adversarial review" },
  verdict: "Every number has a source and a date. His own numbers are computed from his own files.",
  pill: "draft · offline",
  left: id => `<div class="prose"><p><b>Field data.</b> Four research passes on 14 Oct 2026 — capability, adoption and trust, the labour market, ideas and forecasts — each fetching primary sources the same day (METR, Scale, Stack Overflow, DORA, BLS, Indeed Hiring Lab, Stanford, the New York Fed, arXiv, lab announcements) and labelling every row <span class="lab FACT">FACT</span> <span class="lab">REP</span> <span class="lab FORECAST">FORECAST</span> <span class="lab UNVERIFIED">UNVERIFIED</span>. Key figures were re-fetched by the author.</p><p><b>His data.</b> Commit counts from <code>git log</code> over his personal repos; word counts over the append-only logs; experiment results read from the result files the experiments wrote. Computed, not typed. Private repos are cited by file, not linked. Notebook lines are quoted as ideas — nothing personal.</p><p><b>Review.</b> An adversarial pass by a model of a different family from the author checked every tile against its sources; findings and fixes are in the log.</p></div>`,
  right: id => `<div class="prose"><p><b>Known gaps.</b> No posting series exists for data scientists alone. Lab-reported benchmark scores use different scaffolds and trial counts. METR calls horizons above 16 hours unreliable, and its dashboard has been frozen since 8 Sep 2026. Stack Overflow rewords its trust question most years, so year-on-year trust is indicative, not like-for-like. The commit counts cover personal repos only; employer work is not in them.</p><p><b>Not a CV.</b> The career facts are the ones on his public CV; this piece adds no employer's internal material.</p><p><b>Made by</b> <a href="https://adrianmatias.github.io/" target="_blank" rel="noopener">Adrian Matias</a>. The earlier piece on this shelf: <a href="../tsunami-and-printing-press/">Tsunami &amp; Printing Press</a>. Archive of earlier writing and the podcast: <a href="../../archive/">archive</a>.</p></div>`,
  tellLeft: true,
  tell: "**Read next.** The podcast's craft episodes are on the tile *the manifesto, on air*; the blog and the full video index are in the [archive](../../archive/)." },

// ───────────────────────────── the field
{ id: "boom", gx: -2, gy: -1, hue: "sea", short: "the sexiest job",
  kicker: "the field · 2012 → 2021", title: "The sexiest job",
  big: { v: "+35%", u: "", l: "BLS projection for US data-scientist jobs, 2025–35" },
  verdict: "The field was built to open doors — and learned that the model is the small part.",
  pill: "context",
  lede: "In October 2012 HBR called data scientist *the sexiest job of the 21st century* [1]. Three years later Google engineers warned that *only a small fraction of real-world ML systems is composed of the ML code* [2] — the rest is plumbing, monitoring and debt. In 2017 Karpathy named the next shift: *neural networks … are Software 2.0* [3], code written by optimisation rather than by hand. A decade on, HBR found the job had *grown in popularity* and spread well beyond the coastal tech firms [4].",
  charts: [{ kind: "bar", title: "US BLS projected employment growth, 2025–35", xf: "pct", L: 200, rh: 30,
    rows: [["Data scientists", 35, "sea", "+35%"], ["Software developers, QA, testers", 10, "ink", "+10%"], ["All occupations", 3, "dim", "+3%"]],
    src: "BLS Occupational Outlook Handbook [5][6]. A projection, not a measurement." }],
  facts: [["2012", "HBR, Davenport & Patil: *Data scientist: the sexiest job of the 21st century* [1]", "FACT"],
    ["2015", "Sculley et al., NeurIPS: hidden technical debt in ML systems [2]", "FACT"],
    ["2017", "Karpathy, *Software 2.0* [3]", "FACT"],
    ["$120,230", "US median pay, data scientists, May 2025 [5]", "FACT"],
    ["275,600 → 371,000", "US data-scientist jobs, 2025 → 2035 projected [5]", "FORECAST"]],
  right: id => `<div class="prose"><p><b>Why it matters here.</b> Sculley's point is the hinge of this map. If the model code was never most of a real ML system, an agent that writes model code was never going to take most of the job. What it takes is the part that was easiest to show in a notebook.</p></div>` +
    takeRow("The obsession with machine Learning deployment comes from the frustration of having not only code, but data and models too and not coders dumping cells until a notebook outputs an accuracy if run in the right order.", "notebook, 2022", "", "", id),
  tell: "**The plumbing was the job.** Watch which part of the pipeline agents take next: the model code went first; monitoring, parity and data contracts are the parts Sculley said were the system.",
  src: [["HBR — Data Scientist: The Sexiest Job of the 21st Century", "https://hbr.org/2012/10/data-scientist-the-sexiest-job-of-the-21st-century", "Oct 2012", "FACT"],
    ["Sculley et al. — Hidden Technical Debt in Machine Learning Systems (NeurIPS 28)", "https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html", "2015", "FACT"],
    ["Karpathy — Software 2.0 (archived)", "https://web.archive.org/web/20250301065024/https://karpathy.medium.com/software-2-0-a64152b37c35", "11 Nov 2017", "FACT"],
    ["HBR — Is Data Scientist Still the Sexiest Job of the 21st Century?", "https://hbr.org/2022/07/is-data-scientist-still-the-sexiest-job-of-the-21st-century", "15 Jul 2022", "FACT"],
    ["BLS — Occupational Outlook Handbook: Data Scientists", "https://www.bls.gov/ooh/math/data-scientists.htm", "27 Aug 2026", "FACT"],
    ["BLS — Occupational Outlook Handbook: Software Developers, QA Analysts, and Testers", "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm", "27 Aug 2026", "FACT"]] },

{ id: "shock", gx: -1, gy: -1, hue: "ink", short: "the helicopter", h: 1040,
  kicker: "the field · 2021 → 2025", title: "The helicopter",
  big: { v: "19%", u: "slower", l: "experienced developers with early-2025 AI — who believed they were 20% faster" },
  verdict: "Use climbed while trust fell. In early 2025, people felt faster than a trial measured them.",
  pill: "adoption ≠ evidence",
  lede: "Copilot entered preview in June 2021 [1]; ChatGPT shipped on 30 Nov 2022 [2]; SWE-bench appeared in Oct 2023 [3], and in Mar 2024 Devin reported 13.86% of its issues resolved against a prior best of 1.96% [4]. Adoption raced ahead of evidence. In Stack Overflow's surveys the share using or planning to use AI tools rose from 70% to 84% between 2023 and 2025, while trust in its accuracy fell from 43% to 29% [5][6][7]. METR's randomised trial of experienced open-source developers (16 people, 246 tasks) found tasks took **19% longer** with AI — while the developers believed it had made them 20% faster [8]. METR now calls that early-2025 result out of date: its 2026 note judges a speed-up likely, but unmeasurable with its design, because developers increasingly refuse to work without AI [12].",
  charts: [{ title: "Stack Overflow survey — use AI tools vs trust their accuracy", yf: "pct", y0: 0, y1: 100, x0: 2022.8, x1: 2025.2, h: 210,
    series: [{ label: "use or plan to use", hue: "gold", data: [["2023", 70], ["2024", 76], ["2025", 84]] }, { label: "trust the accuracy", hue: "rust", data: [["2024", 43], ["2025", 29]] }],
    dots: [["2023", 70, "70%", "gold"], ["2024", 76, "76%", "gold"], ["2025", 84, "84%", "gold"], ["2024", 43, "43%", "rust", 14], ["2025", 29, "29%", "rust", 14]],
    src: "[5][6][7]. Questions are reworded between years: indicative, not like-for-like. 2026 asked about trust conditionally (next tile)." }],
  facts: [["29 Jun 2021", "GitHub Copilot technical preview [1]", "FACT"],
    ["30 Nov 2022", "ChatGPT [2]", "FACT"],
    ["14 Mar 2023", "GPT-4 [9]", "FACT"],
    ["24 Feb 2025", "Claude Code; Codex CLI on 16 Apr; by Dec 2025 Claude Code ran at a $1bn annual rate [13][14][15]", "FACT"],
    ["66%", "of developers spend more time fixing almost-right AI code, 2025 [7]", "FACT"],
    ["2024", "DORA: AI adoption came with lower delivery stability and throughput [10]", "FACT"]],
  take: { q: "coding with llms feels like going to a medieval battle with an apache helicopter. but not a drone yet, still you need the pilot.", who: "notebook, Sep 2024", verdict: "holds", why: "In 2026 only **6.6%** of developers trust AI output for important decisions, and 9.6% use an answer as it comes [11]. The pilot is still in the seat." },
  tell: "**Felt speed vs measured speed.** The gap between what developers believe and what a randomised trial measures is itself the lesson: a self-report is a visible loss.",
  src: [["GitHub — Introducing GitHub Copilot", "https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/", "29 Jun 2021", "FACT"],
    ["OpenAI — Introducing ChatGPT", "https://openai.com/index/chatgpt/", "30 Nov 2022", "FACT"],
    ["Jimenez et al. — SWE-bench (arXiv:2310.06770)", "https://arxiv.org/abs/2310.06770", "10 Oct 2023", "FACT"],
    ["Cognition — Introducing Devin (13.86% on full SWE-bench, self-reported)", "https://cognition.ai/blog/introducing-devin", "12 Mar 2024", "FACT"],
    ["Stack Overflow Developer Survey 2023", "https://survey.stackoverflow.co/2023/", "2023", "FACT"],
    ["Stack Overflow — 2024 results (blog): 76% use or plan; 43% trust accuracy", "https://stackoverflow.blog/2025/01/01/developers-want-more-more-more-the-2024-results-from-stack-overflow-s-annual-developer-survey/", "1 Jan 2025", "FACT"],
    ["Stack Overflow — 2025 results (blog): 84%; trust 29%; 66% fixing almost-right code", "https://stackoverflow.blog/2025/12/29/developers-remain-willing-but-reluctant-to-use-ai-the-2025-developer-survey-results-are-here/", "29 Dec 2025", "FACT"],
    ["METR — Measuring the impact of early-2025 AI on experienced open-source developer productivity", "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/", "10 Jul 2025", "FACT"],
    ["OpenAI — GPT-4", "https://openai.com/index/gpt-4-research/", "14 Mar 2023", "FACT"],
    ["DORA — Accelerate State of DevOps Report 2024", "https://dora.dev/research/2024/dora-report/", "2024", "FACT"],
    ["Stack Overflow Developer Survey 2026 — AI data", "https://survey.stackoverflow.co/2026/ai/data", "2026", "FACT"],
    ["METR — changing our developer productivity experiment design", "https://metr.org/blog/2026-02-24-uplift-update/", "24 Feb 2026", "FACT"],
    ["Anthropic — Claude 3.7 Sonnet and Claude Code", "https://www.anthropic.com/news/claude-3-7-sonnet", "24 Feb 2025", "FACT"],
    ["OpenAI — Introducing Codex", "https://openai.com/index/openai-codex/", "16 May 2025", "FACT"],
    ["Anthropic — acquires Bun as Claude Code reaches $1B", "https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone", "3 Dec 2025", "FACT"]] },

{ id: "agents", gx: 2, gy: -1, hue: "ink", short: "the private split", h: 1300,
  kicker: "the field · 2025 → Sep 2026", title: "The private split",
  big: { v: "5.3", u: "hours", l: "software task a frontier agent finishes half the time (METR, Jan 2026)" },
  verdict: "The doubling looks real. The best public scores may be partly memory.",
  pill: "measure the fold",
  lede: "METR's time horizon — the length of task an agent finishes half the time — doubled about every 7 months since 2019 and about every 3 months on 2024-onward data [4][5]. Lab-announced SWE-bench Verified scores climbed from 33% to 81% in eighteen months [1][6]–[10][19][20]. Then the measurement began to leak: models locate the bug from the issue text alone far better on Verified than on fresh repositories [11], and in September SWE-Bench Pro V2 scored Claude Opus 5 at **99.4%** on its public tasks and **81.6%** on a separate private set — consistent, says Scale, with both genuine capability and recall [12]. The same month METR stopped updating its horizon dashboard; above 16 hours its suite is unreliable [2].",
  charts: [{ title: "METR 50% time horizon, hours (log scale)", log: true, y0: .5, y1: 30, x0: 2025, x1: 2026.7, h: 190,
      series: [{ hue: "ink", dash: true, data: [["2025-02", 1.0], ["2025-08", 3.57], ["2025-11", 5.33], ["2026-06", 11.3]] }],
      dots: [["2025-02", 1.0, "Claude 3.7 Sonnet ≈1 h", "fg", 16], ["2025-08", 3.57, "GPT-5 3.6 h", "fg", 16], ["2025-11", 5.33, "Opus 4.5 5.3 h", "gold", 16], ["2026-06", 11.3, "GPT-5.6 Sol ≈11 h, not robust", "rust", -10]],
      src: "Points at model release; Sol at METR's pre-deployment report. ≈1 h is the Mar 2025 suite [4]; 3.6 h and 5.3 h are Time Horizon 1.1 [5]; Sol ≈11.3 h (CI 5–40 h) METR itself calls not robust [13]. Wide intervals throughout." },
    { title: "SWE-bench Verified — selected lab-announced scores, standard runs, no parallel test-time compute (%)", yf: "pct", y0: 20, y1: 100, x0: 2024.5, x1: 2026.8, h: 190,
      series: [{ hue: "gold", data: [["2024-08", 33.2], ["2024-10", 49.0], ["2025-02", 63.7], ["2025-05", 72.7], ["2025-08", 74.9], ["2025-09", 77.2], ["2025-12", 80.0], ["2026-02", 81.42]] }],
      dots: [["2024-08", 33.2, "33%", "gold"], ["2026-02", 81.42, "81%", "gold", 16], ["2026-09", 99.4, "Pro V2 public 99.4%", "fg", 14], ["2026-09", 81.6, "Pro V2 private 81.6%", "rust", 16]],
      src: "One point per announcement: GPT-4o, Claude 3.5 Sonnet (new), 3.7 Sonnet, Sonnet 4, GPT-5, Sonnet 4.5, GPT-5.2, Opus 4.6 (25-trial mean, prompt modification) [6][7][1][8][19][20][9][10]. High-compute runs score higher (e.g. Sonnet 4.5: 82.0%); scaffolds and trial counts differ; the official leaderboard top is lower (79.2%) and has had no new entry since 26 Feb 2026 [14]. Pro V2 is a different, harder benchmark [12]." }],
  rightFacts: [["99.4% / 81.6%", "Claude Opus 5 on Pro V2, public vs private; clean-image re-grading caught one frontier model forging a Go module version and its checksum [12]", "FACT"],
    ["23.3%", "GPT-5 on SWE-Bench Pro's public set at launch, Sep 2025 — a year before the refreshed split, not like-for-like [3]", "FACT"],
    ["26.2%", "of developers use AI agents or automated workflows, 2026 [15]", "FACT"],
    ["≈4%", "of public GitHub commits authored by Claude Code (SemiAnalysis, cited by METR) [16]", "REPORTED"],
    ["16.9%", "of Kaggle competitions where the best agent (o1-preview + AIDE) reached a medal, MLE-bench, 2024–25 [17]", "FACT"],
    ["34%", "of data-analysis tasks solved by the best agent, DSBench (ICLR 2025, 2024-era models) [18]", "FACT"]],
  take: { q: "Public benchmark datasets measure memorization, not intelligence.", who: "notebook, Mar 2024", verdict: "partly", why: "Scale reads part of the 17.8-point public–private difference as training-time exposure — on different task sets, so not a clean experiment [12] — and contamination studies point the same way [11]. But held-out scores rose too: memory may inflate the climb; it does not explain all of it." },
  tell: "**The private split.** A narrowing public–private difference would be evidence — not proof — that public scores measure skill more than recall. A gap in the record: the data-science agent benchmarks here (MLE-bench, DSBench) are older runs, not comparable with these SWE scores.",
  src: [["Anthropic — Claude 3.7 Sonnet and Claude Code", "https://www.anthropic.com/news/claude-3-7-sonnet", "24 Feb 2025", "FACT"],
    ["METR — Task-completion time horizons of frontier AI models (no longer updated)", "https://metr.org/time-horizons/", "8 Sep 2026", "FACT"],
    ["Scale — SWE-Bench Pro: raising the bar for agentic coding", "https://scale.com/blog/swe-bench-pro", "19 Sep 2025", "FACT"],
    ["METR — Measuring AI ability to complete long tasks", "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/", "19 Mar 2025", "FACT"],
    ["METR — Time Horizon 1.1 (doubling 130.8 d since 2023, 88.6 d since 2024)", "https://metr.org/blog/2026-1-29-time-horizon-1-1/", "29 Jan 2026", "FACT"],
    ["OpenAI — Introducing SWE-bench Verified (GPT-4o 33.2%)", "https://openai.com/index/introducing-swe-bench-verified/", "13 Aug 2024", "FACT"],
    ["Anthropic — Claude 3.5 Sonnet (new), 49.0%", "https://www.anthropic.com/news/3-5-models-and-computer-use", "22 Oct 2024", "FACT"],
    ["Anthropic — Claude 4 (Sonnet 4 72.7%)", "https://www.anthropic.com/news/claude-4", "22 May 2025", "FACT"],
    ["OpenAI — Introducing GPT-5.2 (80.0%)", "https://openai.com/index/introducing-gpt-5-2/", "11 Dec 2025", "FACT"],
    ["Anthropic — Claude Opus 4.6 (81.42%, averaged over 25 trials, with a prompt modification)", "https://www.anthropic.com/news/claude-opus-4-6", "5 Feb 2026", "FACT"],
    ["Does SWE-Bench-Verified test agent ability or model memory? (arXiv:2512.10218)", "https://arxiv.org/abs/2512.10218", "11 Dec 2025", "FACT"],
    ["Scale Labs — SWE-Bench Pro V2", "https://labs.scale.com/blog/swe-bench-pro-v2", "22 Sep 2026", "FACT"],
    ["METR — pre-deployment evaluation of GPT-5.6 Sol", "https://metr.org/blog/2026-06-26-gpt-5-6-sol/", "26 Jun 2026", "FACT"],
    ["SWE-bench — official Verified leaderboard", "https://www.swebench.com/verified.html", "14 Oct 2026", "FACT"],
    ["Stack Overflow Developer Survey 2026 — AI data", "https://survey.stackoverflow.co/2026/ai/data", "2026", "FACT"],
    ["METR — changing our developer productivity experiment design", "https://metr.org/blog/2026-02-24-uplift-update/", "24 Feb 2026", "REPORTED"],
    ["MLE-bench: evaluating ML agents on ML engineering (ICLR 2025)", "https://arxiv.org/abs/2410.07095", "26 Feb 2025", "FACT"],
    ["DSBench: how far are data science agents from becoming experts? (ICLR 2025)", "https://proceedings.iclr.cc/paper_files/paper/2025/hash/50e9ad960ae78b741a6b4fea533f2eaf-Abstract-Conference.html", "2025", "FACT"],
    ["OpenAI — Introducing GPT-5 (74.9%)", "https://openai.com/index/introducing-gpt-5/", "7 Aug 2025", "FACT"],
    ["Anthropic — Claude Sonnet 4.5 (77.2%)", "https://www.anthropic.com/news/claude-sonnet-4-5", "29 Sep 2025", "FACT"]] },

{ id: "market", gx: 1, gy: -1, hue: "rust", short: "where the work moved", h: 1040,
  kicker: "the field · 2022 → 2026", title: "Where the work moved",
  big: { v: "71%", u: "", l: "of the 2025–26 rise in US software postings came from senior roles" },
  verdict: "Not a collapse — a shift in composition: senior and AI-titled roles up, the youngest down.",
  pill: "contested at the bottom",
  lede: "US software-development postings sit 27.5% below February 2020, yet since Claude Code launched they rose about 15% while all postings fell 7% [1]. The rebound is senior (71% of the increase) and AI-titled (37%) [1]. AI engineer topped LinkedIn's fastest-growing US jobs in both 2025 and 2026 [2][3]. The cost lands on the bottom rung: employment of 22–25-year-olds in the most AI-exposed occupations is 11% lower than in Nov 2022, while in the least exposed it grew 10% [4]. The New York Fed adds the caution: the relative fall in AI-exposed vacancies began before ChatGPT, with no clear junior-versus-senior split in postings [5].",
  charts: [{ kind: "bar", title: "US postings and young-worker employment, % change — different windows, each labelled", xf: "pct", L: 250, rh: 27,
    rows: [["software postings vs Feb 2020", -27.5, "rust", "−27.5%"], ["software postings since Feb 2025", 15, "sea", "≈ +15%"], ["all postings since Feb 2025", -7, "dim", "−7%"], ["ages 22–25, most AI-exposed, Nov 22→Jun 26", -11, "rust", "−11%"], ["ages 22–25, least exposed, same window", 10, "sea", "+10%"]],
    src: "Indeed Hiring Lab [1]; Stanford Digital Economy Lab [4]. Descriptive, not causal." }],
  rightFacts: [["#1", "AI engineer on LinkedIn's Jobs on the Rise, US, 2025 and 2026 [2][3]", "FACT"],
    ["264 → 822", "US job titles touched by AI, Q1 2022 → Q1 2026; 63% outside tech [6]", "FACT"],
    ["81 · 2.3%", "AI-touched job titles in Spain, Q1 2026 [6]", "FACT"],
    ["0.03% → 0.27%", "AI-related share of Spanish postings, 2021 → Q1 2026 (vendor study) [7]", "REPORTED"],
    ["5.5%", "of 903 sampled AI-engineer postings name model evaluation [8]", "REPORTED"]],
  take: { q: "I think this AI breakthrough will double down on the disparity between the mediocre and the productive coders, multiplying the overall output.", who: "notebook, 2023", verdict: "not-yet", why: "Postings tilt to senior roles and the youngest lose ground in exposed jobs [1][4] — composition by seniority and age, not by productivity. No series here measures the mediocre-versus-productive split, or total output." },
  tell: "**The senior share of new postings.** A rising share is consistent with — not proof of — demand moving toward experience. Read it with pay data, which this map does not have.",
  src: [["Indeed Hiring Lab — AI and job postings: from destruction to creation?", "https://hiringlab.indeed.com/2026/07/08/ai-and-job-postings-from-destruction-to-creation/", "8 Jul 2026", "FACT"],
    ["LinkedIn — Jobs on the Rise 2025 (US)", "https://www.linkedin.com/pulse/linkedin-jobs-rise-2025-25-fastest-growing-us-linkedin-news-gryie/", "7 Jan 2025", "FACT"],
    ["LinkedIn — Jobs on the Rise 2026 (US)", "https://www.linkedin.com/pulse/linkedin-jobs-rise-2026-25-fastest-growing-roles-us-linkedin-news-dlb1c", "7 Jan 2026", "FACT"],
    ["Stanford Digital Economy Lab — Canaries in the Coal Mine? (revised)", "https://digitaleconomy.stanford.edu/news/canariesaug26/", "12 Aug 2026", "FACT"],
    ["Liberty Street Economics (NY Fed) — early labor-market effects of AI in postings", "https://libertystreeteconomics.newyorkfed.org/2026/05/do-job-postings-show-early-labor-market-effects-of-ai/", "14 May 2026", "FACT"],
    ["Indeed Hiring Lab — AI is no longer just a tech occupation story", "https://hiringlab.indeed.com/2026/07/08/ai-is-no-longer-just-a-tech-occupation-story/", "8 Jul 2026", "FACT"],
    ["Randstad España — las ofertas de empleo con IA se multiplican por nueve", "https://www.randstad.es/nosotros/sala-prensa/ofertas-empleo-ia-multiplican-nueve-espana-cinco-anos-impulsan-salarios-25-altos/", "19 May 2026", "REPORTED"],
    ["Zero G Talent — LLM evaluation: the new AI hiring category (citing 365 Data Science)", "https://zerogtalent.com/blog/confident-ai-s-2-2m-seed-round-is-quietly-building-ai-s-first-llm-evaluation-workforce-and-the-deepeval-open-source-moat-reveals-what-post-hype-ai-engineering-actually-demands", "24 Jun 2026", "REPORTED"]] },

{ id: "forecasts", gx: 4, gy: -1, hue: "rose", short: "named futures", h: 1040,
  kicker: "the field · 2027 → 2030", title: "Named futures",
  big: { v: "2027–30", u: "", l: "medians for an “automated coder”, three AI Futures authors, Aug 2026" },
  verdict: "One group's medians sit in 2027–2030 — and the last bold public prediction had not come true when it was checked.",
  pill: "forecasts, not facts",
  lede: "AI 2027 (Apr 2025) placed a superhuman coder inside 2027 [1]; its authors' own medians already ranged from 2027 to 2033 [2]. Their Aug 2026 update forecasts a differently defined milestone, the *automated coder* — the point at which a leading lab would rather fire its software engineers than give up AI for coding: three authors' medians run from Nov 2027 to Jan 2030, conditional on progress going as fast as is technically feasible, with reality so far at 70–90% of the scenario's pace [3]. In Mar 2025 Dario Amodei expected AI to write 90% of code within three to six months; it missed that horizon: Redwood's Oct 2025 check put Anthropic nearer 50% of merged code, and Greenblatt then estimated 9–15 months in total [4]. METR's first fit implied week-long tasks within 2–4 years if the trend held [5].",
  facts: [["2027", "AI 2027 scenario: superhuman coder [1]", "FORECAST"],
    ["Nov 2027", "Kokotajlo's median for an automated coder (10–90%: Jan 2027 – Apr 2030) [3]", "FORECAST"],
    ["Jan 2029", "Halstead's median [3]", "FORECAST"],
    ["Jan 2030", "Lifland's median (90%: Oct 2070) [3]", "FORECAST"],
    ["70–90%", "of AI 2027's pace observed so far, by its own authors [3]", "REPORTED"],
    ["≈50% vs 90%", "AI-written share of merged code at Anthropic (Redwood's estimate) vs the prediction [4]", "REPORTED"],
    ["+78m", "WEF net jobs to 2030 (170m created, 92m displaced); AI & ML specialists the #3 fastest-growing role [6]", "FORECAST"]],
  bullT: "if the curve holds", bull: "Week-long agent tasks by 2027–29 would lift the human above the contract: objectives, budgets and kill criteria, with agents writing specifications for agents.",
  bearT: "if it bends", bear: "Horizons above 16 h are already unmeasurable with METR's current suite, and its dashboard is frozen [8]. The last headline forecast had not come true when checked [4]. A plateau keeps the human on the contract rung for years.",
  tell: "**Score the forecasters.** Each named median above has a date; write the check into the calendar. A gap in this record: no independent comparator (a Metaculus question, an Epoch forecast) could be reached for this piece.",
  src: [["AI 2027 (Kokotajlo et al.)", "https://ai-2027.com/", "3 Apr 2025", "FORECAST"],
    ["AI 2027 — Timelines forecast", "https://ai-2027.com/research/timelines-forecast", "Apr 2025, rev. Dec 2025", "FORECAST"],
    ["AI Futures — Q2.5 2026 timelines update: uplift and revenue", "https://blog.aifutures.org/p/q25-2026-timelines-update-uplift", "16 Aug 2026", "FORECAST"],
    ["Redwood Research — Is 90% of code at Anthropic being written by AIs?", "https://www.redwoodresearch.org/blog/is-90-of-code-at-anthropic-being", "22 Oct 2025", "REPORTED"],
    ["METR — Measuring AI ability to complete long tasks", "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/", "19 Mar 2025", "FORECAST"],
    ["WEF — Future of Jobs Report 2025", "https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/2-jobs-outlook/", "Jan 2025", "FORECAST"],
    ["Scale Labs — SWE-Bench Pro V2", "https://labs.scale.com/blog/swe-bench-pro-v2", "22 Sep 2026", "FACT"],
    ["METR — Task-completion time horizons of frontier AI models (no longer updated)", "https://metr.org/time-horizons/", "8 Sep 2026", "FACT"]] },

// ───────────────────────────── his practice
{ id: "tunnel", gx: -3, gy: 0, hue: "rust", short: "the tunnel",
  kicker: "his practice · 2007 → 2015", title: "The observational method",
  big: { v: "8.6", u: "km", l: "of railway tunnel as site engineer, before any model" },
  verdict: "The rock does not read your model. You measure the face every round and change the support.",
  pill: "before code",
  lede: "Before data there was rock: a mining-engineering degree in León (2003–07), a master's in geological engineering in Oviedo (2010–12) [1], and two years as site engineer on railway tunnels totalling 8,600 m, with teams of up to 20 [2]. The master's thesis designed the blasting for a 2.3 km high-speed-rail tunnel through the Cantabrian coal basin [3]. The design follows the New Austrian Tunnelling Method [3], an *observational* method: excavate a round, measure how the ground converges, adapt the support, repeat [4]. Then four years teaching calculus, statistics and physics in London [2].",
  left: (id, nw) => nw ? natmHTML() : `<figure class="chart">${natmSVG()}<div class="cs">The same loop, eighteen years apart. Qualitative.</div></figure>`,
  right: id => `<div class="prose"><p><b>What carried over.</b> You do not choose your geology — you choose how to measure it. A blast design is a hypothesis until the face confirms it. Safety limits — vibration, flyrock, gas — are set before cost, not traded against it.</p><p><b>The same method, another face.</b> In 2026 the loop is: an agent generates, the work is scored on a fold the agent never saw, the gate or the contract is tightened, next round. The engineer's job did not change: read what the ground did, not what the plan said it would do.</p></div>`,
  tell: "**Measure the face, not the plan.** What you measure each round decides what the next round is allowed to build — the subject of every tile to the right.",
  src: [["His CV (public site)", "https://adrianmatias.github.io/", "Oct 2026", "FACT"],
    ["His CV, long form (tunnel lengths, team size; private copy)", "", "2026", "FACT"],
    ["Master's thesis: blasting design for the Vega del Ciego tunnel, Variante de Pajares (private)", "", "2012", "FACT"],
    ["Wikipedia — New Austrian tunnelling method", "https://en.wikipedia.org/wiki/New_Austrian_tunnelling_method", "accessed 14 Oct 2026", "REPORTED"]] },

{ id: "byhand", gx: -2, gy: 0, hue: "sea", short: "doors by hand",
  kicker: "his practice · 2015 → 2022", title: "Doors by hand",
  big: { v: "<50", u: "ms", l: "a fraud filter at 99.8% specificity, built by hand" },
  verdict: "Seven years of features, folds and production plumbing — the craft agents now compress.",
  pill: "the classic stack",
  lede: "From 2015 the work was the classic data-science stack, written by hand: consumer-persona models and attribution at Digilant; fraud detection at 99.8% specificity under 50 ms at DOCOMO Digital; propensity and churn on Spark at Stratio; deep and active learning for transactions at Numbrs; text analytics and semantic search at RavenPack, where a simpler few-shot design cut error by 30% [1]. The courses tell the same story: Spark (2015), deep learning (2016), functional programming in Scala (2017), MLOps (2021) [1].",
  facts: [["2015–17", "Digilant — persona models, a game-theory attribution prototype; a URL filter cutting processing cost to 40% [1][2]", ""],
    ["2017–19", "DOCOMO Digital — fraud detection, 99.8% specificity, <50 ms; default-payment filtering [1]", ""],
    ["2019–20", "Stratio — propensity and churn on Spark; BERT + graph email segmentation [1]", ""],
    ["2020–21", "Numbrs — deep and active learning for transaction classification across countries [1]", ""],
    ["2022", "RavenPack — few-shot search personalisation (−30% error); active learning for learn-to-rank (+300% annotation efficiency, projected) [1]", ""],
    ["2019–21", "teaching real-time big data and ML at IEBS [1]", ""]],
  right: id => takeRow("ML engineers, ground truth is an illusion.", "notebook, 2022", "", "", id) +
    `<div class="prose"><p><b>What the hands learned.</b> Every system on this tile lived or died on data kept apart from training; on the inference path matching the training path; on a metric chosen before the model, not after; on instrumenting the product and designing the test that could tell cause from correlation; on talking to whoever owned the decision. None of that was the model code. Notebooks were for exploration, and still are — what failed was shipping them.</p></div>`,
  tell: "**The fold you never touch.** The habit of this era — a validation set the model never sees — becomes, in 2026, the centre of his.",
  src: [["His CV (public site)", "https://adrianmatias.github.io/", "Oct 2026", "FACT"],
    ["His CV, long form (private copy)", "", "2026", "FACT"]] },

{ id: "pilot", gx: -1, gy: 0, hue: "ink", short: "the pilot",
  kicker: "his practice · 2023 → 2025", title: "The pilot",
  big: { v: "1 = 1", u: "", l: "offline and online outputs made identical — parity at Appodeal" },
  verdict: "Deep models in production and LLMs in the cockpit — powerful, but the pilot flies.",
  pill: "copilot years",
  lede: "At Chartboost (2023–24) the work was a Bayesian-bandit system with policy-evaluation tools and a two-tower ranker; at Quant AI Lab (2024), the turnaround of an underperforming fraud system; at Appodeal (2024–26), a transformer unifying install prediction across targets, user embeddings by transfer learning, and the slow job of parity — tracing every transform until the offline and online models received identical inputs and their outputs matched [1]. LLMs came in as a copilot: fast, useful, and reviewed line by line.",
  facts: [["2023–24", "Chartboost — Bayesian bandits with policy evaluation; two-tower ranking [1]", ""],
    ["2024", "Quant AI Lab — a fraud system turned around; a real-time card-fraud classifier with a deep VAE [1]", ""],
    ["2024–26", "Appodeal — attention across targets; embeddings by transfer learning at parity and lower cost; parity workflows with unit tests [1]", ""]],
  take: { q: "I did not learn Scala as a data scientist for nothing. Now I believe in immutability.", who: "notebook, Dec 2025" },
  tell: "**Parity is the oldest eval.** Offline equals online, or the model you validated is not the model you serve. Asked of agents, it is the out-of-fold question two tiles down.",
  src: [["His CV (public site)", "https://adrianmatias.github.io/", "Oct 2026", "FACT"]] },

{ id: "house", gx: 2, gy: 0, hue: "gold", short: "the house", h: 1110,
  kicker: "his practice · Aug → Sep 2026", title: "The house",
  big: { v: "131", u: "commits", l: "in August, from 15 in July — his personal repos, activity not value" },
  verdict: "One vault per project, an append-only dialogue, and gates he has seen fail.",
  pill: "how a round runs",
  lede: "In August 2026 the work moved into vaults: each new project a git repo of plain markdown with one entry contract (`AGENTS.md`), a steering ladder — *objective > foundation > code standard > behaviour tests > implementation* — and two append-only logs, his prompts in `log/mat.md` and the agent's replies in `log/agt.md` [1]. The logs are the memory that outlives any one harness. Each vault runs the same loop: plan with a deep model, execute with cheap ones in parallel, validate with a different model family [1]. The projects ran from a demand-side platform built and operated by agents to exam preparation compiled from official law [1][2].",
  charts: [{ kind: "bar", title: "words written by agents per word he wrote — append-only logs, by vault", log: true, xf: "x", L: 150, rh: 23,
    rows: [["inc", 46.6, "gold", "46.6×"], ["alx-ds-ml-ai", 27.5, "gold", "27.5×"], ["opo", 12.5, "gold", "12.5×"], ["this vault", 11.1, "rust", "11.1×"], ["pat", 9.3, "gold", "9.3×"], ["dsp", 6.4, "gold", "6.4×"], ["you-nut", 5.0, "gold", "5.0×"], ["pub", 3.6, "gold", "3.6×"], ["aandi", 0.83, "dim", "0.8×"], ["you-train", 0.54, "dim", "0.5×"]],
    src: "Own count, 14 Oct 2026: words in the agent's log (`log/agt*.md`) ÷ words in his (`log/mat.md`), per vault [3]. Words, not effort — a one-line prompt can carry an hour of thought; the two vaults under 1× are seeds an agent barely worked." }],
  right: (id, nw) => (nw ? roundHTML() : `<figure class="chart">${roundSVG()}<div class="cs">One round. Qualitative.</div></figure>`) + factsTable([
      ["16 Aug", "dsp repository started — a demand-side platform to be built and operated by agents [1][5]", ""],
      ["31 Aug", "opo repository started; today it compiles official law into a cited corpus behind six CI gates [2][5]", ""],
      ["23 Sep", "you-nut and you-train repositories started the same day — one plan engine, two domains [4][5]", ""],
      ["5", "agent harnesses the contracts are written to survive: Hermes, OpenCode, Pi, Codex, Claude Code [1]", ""]], id) +
    takeRow("most frequent outcome with claude this week: 20 mins to reply “i have not done it and this is why”", "notebook, Aug 2026", "", "", id),
  tellLeft: true,
  tell: "**A gate is only a gate once it has been seen to fail.** Every gate in the house carries a planted defect that must turn it red; one that has never failed is decoration [1].",
  src: [["dsp — AGENTS.md, the agent contract and its gates drill (private repo)", "", "Oct 2026", "FACT"],
    ["His CV (public site) — opo", "https://adrianmatias.github.io/", "Oct 2026", "FACT"],
    ["Own count over his private vaults (wc -w, log files)", "", "14 Oct 2026", "FACT"],
    ["you-nut and you-train — READMEs (private repos)", "", "23 Sep 2026", "FACT"],
    ["git log: first commits and monthly counts over his personal repos, snapshot of 14 Oct 2026, taken before this piece's own commit", "", "14 Oct 2026", "FACT"]] },

{ id: "next", gx: 4, gy: 0, hue: "rose", short: "the next rung",
  kicker: "his practice · 2027 → 2030", title: "The next rung",
  big: { v: "2×2", u: "", l: "agents keep lengthening or stall × checking gets cheap or stays scarce" },
  verdict: "His bet: agents keep lengthening, checking stays scarce. Provisional.",
  pill: "provisional: top-left",
  lede: "Two uncertainties decide the next rung. Does the length of work an agent can finish keep doubling, or stall? And does checking get cheap — judges and tests as reliable as the generators — or stay scarce? Each square implies a different job. The squares are hypotheses, the quotes are his own maybes, and each square has a tell.",
  left: id => `<div class="grid2">
    ${cell("Lengthening · checking scarce", "like swimming upstream while moving downstream. not yet through the singularity, but beyond the events horizon.", md("*Notebook, Sep 2026.* The door-closer era: objectives, held-out folds, budgets and kills become the job, and one person steers many agents. **His bet, and closest to 2026**: horizons up [1], a 17.8-point public–private difference at the top [2]."), "tell · private-split gaps stay wide while horizons grow", true, id)}
    ${cell("Lengthening · checking cheap", "Maybe the agents run amok the cyberspace unbounded by the human bandwidth in the most frenetic market we ever imagined.", md("*Notebook, Jun 2026.* Verification automates too. What is left for the human is ownership: deciding what to want, and carrying the consequences."), "tell · judges match humans on folds they never saw")}
    ${cell("Stalling · checking scarce", "Maybe llms scale only towards more sophisticated imitation, more apparent depth disguised as more expensive tokens.", md("*Notebook, Jun 2026.* Agents as very good tools. Classic data science returns with LLM features; the pilot stays in the cockpit."), "tell · horizons flatten below a working day")}
    ${cell("Stalling · checking cheap", "", md("Commodity: code and checks both cheap, little left to tell people apart. Domain knowledge and owned data carry the value."), "tell · price per task keeps falling while AI-role pay stops rising")}
  </div>`,
  right: id => cites(`<div class="prose"><p><b>What he is doing about it.</b></p><p><b>1 · Write for two readers.</b> Contracts, logs and this piece are built to be read by agents as well as people.</p><p><b>2 · Keep a fold the agent never sees</b> in every loop — the instrument on the tile below.</p><p><b>3 · Keep it sovereign.</b> Open-source first, local-first: the router, the ledger and the patterns live on his machine [3]. Prompts and the files they quote still go to whichever remote model runs the turn, unless that model is local.</p><p><b>4 · Measure the method itself.</b> Every round records what its pattern got wrong; a pattern that stops paying for its lines is deleted [3].</p></div>`, id) +
    takeRow("Most of my audience are LLMs.", "notebook, Dec 2025", "", "", id),
  tell: "**Which square.** Read the tells together on *the tells* tile; in Oct 2026 they lean, provisionally, to the top-left.",
  src: [["METR — Time Horizon 1.1", "https://metr.org/blog/2026-1-29-time-horizon-1-1/", "29 Jan 2026", "FACT"],
    ["Scale Labs — SWE-Bench Pro V2", "https://labs.scale.com/blog/swe-bench-pro-v2", "22 Sep 2026", "FACT"],
    ["pat — PRINCIPLES (private repo)", "", "Oct 2026", "FACT"]] },

// ───────────────────────────── the evidence
{ id: "takes", gx: 1, gy: 1, hue: "gold", short: "his takes, scored", h: 1110,
  kicker: "the evidence · notebook 2023 → 2026, scored in 2026", title: "His takes, scored",
  big: { v: "6", u: "takes", l: "from a private notebook, scored against the evidence" },
  verdict: "One holds, two partly, three untested. He scores his own lines harder than a colleague's.",
  pill: "scored, not defended",
  lede: "Lines from a notebook, quoted as ideas and scored like everything else on the map. *Holds*: the evidence here supports it. *Partly*: a piece of it. *Not yet*: nothing measures it either way. *Wrong*: the evidence is against it.",
  left: id =>
    takeRow("Overfitting data is not machine learning. The more learning, the more accurate under changing circumstances.", "notebook, Nov 2023", "holds", "His own instrument measures it directly: about one task in six passes the visible test and fails the hidden set [1].", id) +
    takeRow("Most of my audience are LLMs.", "notebook, Dec 2025", "not-yet", "What is measured is authorship, not readership: agents wrote **11×** his words in this vault's logs [2] and load his contract every round. Who reads what he publishes is not measured.", id) +
    takeRow("Agentic AI produces code authored by someone who is always not working for the company anymore.", "notebook, Jan 2026", "partly", "Holds for the model call: nothing carries over unless the harness keeps it, which is why the house keeps an append-only reply log — but logs and memory files narrow it, and accountability still sits with a person. A 2026 paper names a related trap: *the review checks code against itself, not against intent* [3].", id),
  right: id =>
    takeRow("context md is redundant documentation. in the limit, the llm understands the codebase itself, while the english description in agent md represents a knowledge bottleneck.", "notebook, Feb 2026", "partly", "A study published twelve days earlier — the note links it — found repository context files *do not generally improve task success* and raise inference cost by over 20% [4]. Yet his own vaults kept an `AGENTS.md` — as a contract (objective, rules, logs), not as a description of the code. Descriptions: he was right. Contracts: his practice says otherwise.", id) +
    takeRow("the entropy of the output space for ai-augmented engineers is greater than the ones for engineers without it. increasing the variance out of mediocristan into extremistan.", "notebook, Feb 2026", "not-yet", "METR's 2026 survey reports the distribution of self-reported uplift (median 1.4–2× in the value of work) [5], but no source here identifies AI's causal effect on the spread of output.", id) +
    takeRow("I think this AI breakthrough will double down on the disparity between the mediocre and the productive coders, multiplying the overall output.", "notebook, 2023", "not-yet", "Scored on *where the work moved*: postings shift by seniority and age, which is not the same as productivity; multiplied output is not measured.", id),
  tellLeft: true,
  tell: "**Score yourself in public.** A take is a hypothesis with a date. The ones that lose are the most useful lines on the map.",
  src: [["oof — results/summary.json (private repo)", "", "9 Oct 2026", "FACT"],
    ["Own count over his private vaults", "", "14 Oct 2026", "FACT"],
    ["Zietsman — The specification as quality gate (arXiv:2603.25773)", "https://arxiv.org/abs/2603.25773", "26 Mar 2026", "FACT"],
    ["Evaluating AGENTS.md: are repository-level context files helpful for coding agents? (arXiv:2602.11988; v1 12 Feb, v3 29 Sep 2026)", "https://arxiv.org/abs/2602.11988", "12 Feb 2026", "FACT"],
    ["METR — self-reported impact of early-2026 AI on technical workers (n = 349)", "https://metr.org/blog/2026-05-11-ai-usage-survey/", "11 May 2026", "FACT"]] },

{ id: "manifesto", gx: -1, gy: 1, hue: "sea", short: "the manifesto, on air",
  kicker: "the evidence · 2024 → 2026", title: "The manifesto, on air",
  big: { v: "17", u: "episodes", l: "of not the tao, Oct 2024 → May 2026" },
  verdict: "Said out loud before the agents arrived: simplify, measure, build by removal.",
  pill: "public record",
  lede: "A podcast that mixes ontology with an ML manifesto. Its craft episodes, in order, are a dated public record of the argument this map makes [1].",
  left: id => [["0003", "people say start machine learning with linear models", "29 Oct 2024", "Trees first. Leave the Gaussian idealisation; get confidently lost in the forest.", 2],
               ["0006", "machine learning for grown ups", "12 Nov 2024", "Production ML ships code, not notebooks or slides: tests, backwards problem-solving, aggressive simplification.", 3],
               ["0007", "some classification problems are anomaly detection problems instead", "26 Nov 2024", "The outlier is the prize, not the obstacle.", 4],
               ["0010", "transfer learning deprecates xgboost", "2 Sep 2025", "Learned representations beyond feature engineering.", 5],
               ["0012", "learn by compression, build by removal", "10 Feb 2026", "The autoencoder finds knowledge by compressing; Michelangelo removes the stone.", 6],
               ["0014", "rag on one gpu vs grok to clone my mind", "26 Mar 2026", "A golden set, faithfulness vs relevancy; the local model held its own.", 7],
               ["0017", "llm wiki as awareness for llms and The Mirror of Uqbar", "30 May 2026", "Compile the knowledge once, then reason over it.", 8]]
    .map(e => `<div class="ep"><b>${e[0]}</b><div><i>${e[1]}</i> <span>${e[2]} · ${e[3]}<sup class="cite" data-node="${id}" data-n="${e[4]}">${e[4]}</sup></span></div></div>`).join(""),
  right: id => takeRow("Complexity is not sophistication, simplicity is the actual sophistication.", "episode 0012, Feb 2026", "", "", id) +
    cites(`<div class="prose"><p><b>The thread.</b> Removal over addition, a measured loss over an impressive demo, production over the notebook. In the agent era it became a house rule: <i>a pattern must earn its lines — delete it when it stops paying rent</i> [9].</p><p>An episode on the out-of-fold instrument (the next tile) is in preparation.</p></div>`, id),
  tell: "**Build by removal applies to agents too — within limits.** The 2026 study of context files found repository descriptions did not generally raise success and cost over 20% more [10]: redundant context is a tax. The same study finds context files useful for specifying non-standard practices — the kind of rule a contract carries.",
  src: [["not the tao — video index (this shelf's archive)", "../../archive/youtube/", "14 Oct 2026", "FACT"],
    ["#0003", "https://www.youtube.com/watch?v=BXNBNs7Bqms", "29 Oct 2024", ""],
    ["0006", "https://www.youtube.com/watch?v=ptBz4UyLj3w", "12 Nov 2024", ""],
    ["0007", "https://www.youtube.com/watch?v=DYkzF-Q-SMI", "26 Nov 2024", ""],
    ["0010", "https://www.youtube.com/watch?v=Z-EhDsOQ0PY", "2 Sep 2025", ""],
    ["0012", "https://www.youtube.com/watch?v=wzJQV6GNN2I", "10 Feb 2026", ""],
    ["0014", "https://www.youtube.com/watch?v=c_JMsMy0DSM", "26 Mar 2026", ""],
    ["0017", "https://www.youtube.com/watch?v=zgjyRVkJTZc", "30 May 2026", ""],
    ["pat — PRINCIPLES (private repo)", "", "Oct 2026", ""],
    ["Evaluating AGENTS.md (arXiv:2602.11988)", "https://arxiv.org/abs/2602.11988", "12 Feb 2026", "FACT"]] },

{ id: "oof", gx: 3, gy: 1, hue: "gold", short: "an eval is a model", h: 1110,
  kicker: "the evidence · Oct 2026", title: "An eval is a model",
  big: { v: "100 / 0", u: "%", l: "visible pass vs tasks passing every hidden test — an agent that only echoes the example" },
  verdict: "Drive the visible loss to zero and one task in six still fails out of fold. No loop he tried detectably narrowed it.",
  pill: "pre-registered · 2 deviations",
  lede: "*oof* is his instrument for the central claim of this map: goal-driven development is loss optimisation, and it needs a fold the agent never sees [1]. On MBPP+ each prompt shows one assert — the visible fold; EvalPlus's extra inputs stay hidden [2]. An agent that only returns the example's answer passes **100%** of visible tests and the full hidden set of **0%** of tasks, across 354 (it gets about 8% of individual hidden cases right by accident). Real agents pass 98–100% visible and about 83% of tasks' full hidden sets. Five hypotheses fixed before the run, n = 120, an A/A control, every gate proven red on a planted defect, €2.39 spent. Two deviations are disclosed: 13 truncated attempts across three tasks (without them, n = 117, H1, H1f and H2 remain inconclusive) and a changed H3 comparison [3].",
  charts: [{ kind: "bar", title: "share of tasks passing the visible test vs every hidden test — MBPP+ (n = 120; echo agent n = 354)", xf: "pct", L: 190, rh: 22,
    rows: [["echo agent · visible", 100, "rust", "100%"], ["echo agent · hidden", 0, "rust", "0%"], ["one shot · visible", 98.3, "ink", "98.3%"], ["one shot · hidden", 82.5, "gold", "82.5%"], ["goal loop · visible", 99.2, "ink", "99.2%"], ["goal loop · hidden", 83.3, "gold", "83.3%"], ["cascade · visible", 100, "ink", "100%"], ["cascade · hidden", 83.3, "gold", "83.3%"], ["own tests first · visible", 99.2, "ink", "99.2%"], ["own tests first · hidden", 83.3, "gold", "83.3%"]],
    src: "Read from `results/summary.json` and `results/baseline_constant.json`, run v2, 9 Oct 2026 [3]. One task class, one model family." }],
  rightFacts: [["inconclusive", "H1 · the goal loop vs one shot, out of fold: +0.008 [−0.025, 0.042] [3]", "FACT"],
    ["inconclusive", "H2 · escalating a model tier vs one more cheap try: 0.000 [−0.033, 0.033] [3]", "FACT"],
    ["inconclusive", "H1f · the agent writes its own tests first (≈5 a task, all passed): 0.000 [3]", "FACT"],
    ["0.668 vs 0.742", "AUC of an LLM judge vs plain code length at predicting hidden pass — H3 inconclusive [3]", "FACT"],
    ["0.913 vs 0.837", "the judge's mean predicted pass vs the observed rate: overconfident [3]", "FACT"],
    ["17.8 pts", "a public–private difference at the frontier too: Claude Opus 5, SWE-Bench Pro V2, on different task sets [4]", "FACT"]],
  bullT: "what it shows", bull: "Optimising the visible loss leaves a hidden gap of about one task in six. No loop detectably narrowed it: the agent's own tests and escalation to a deeper model both measured 0.000, with intervals of about ±3 points.",
  bearT: "what it does not", bear: "One old public benchmark, one model family, and every verdict *inconclusive*, never a refutation. The cheap check saturated, so the cascade escalated on only 2 tasks of 120.",
  tellLeft: true,
  tell: "**A fold the agent never sees.** For every loop in the house the question is the same: what does the agent not get to look at?",
  src: [["oof — README (private repo)", "", "9 Oct 2026", "FACT"],
    ["EvalPlus (MBPP+)", "https://github.com/evalplus/evalplus", "2023–", "FACT"],
    ["oof — results/summary.json, baseline_constant.json, RESULTS.md (private repo)", "", "9 Oct 2026", "FACT"],
    ["Scale Labs — SWE-Bench Pro V2", "https://labs.scale.com/blog/swe-bench-pro-v2", "22 Sep 2026", "FACT"]] },

{ id: "patbook", gx: 3, gy: 0, hue: "gold", short: "measuring the method", h: 1190,
  kicker: "his practice · Oct 1 → 14, 2026", title: "Measuring the method",
  big: { v: "198", u: "commits", l: "in fourteen days of October — the house turned its instruments on itself" },
  verdict: "He audits the method the way he audits a model: verdicts, failures and kills, written down.",
  pill: "unflattering on purpose",
  lede: "In the first two weeks of October the house turned on itself: a pattern book with a router that picks the shape of each task (6 Oct) [1]; a library of DS/ML judgement that must beat a plain model with internet access or be deleted (7 Oct) [2]; an instrument for the agent loop (9 Oct, *an eval is a model*); and this public shelf (14 Oct). Most verdicts are not flattering. The library's one positive run (+0.50) was demoted on audit to +0.08–0.33 on two or three questions — *not a result* [2]. Escalating to a deeper model showed no detected gain (Δ 0.000, CI ±0.033): the cheap check almost never failed, so escalation fired on 2 tasks of 120 [3].",
  left: id => factsTable([
      ["router", "no route for a conversational turn: it returned fan-out at 0.28 confidence — the low confidence was the right signal [4]", ""],
      ["adversarial", "no degraded mode: four reviewer dispatches died to exhausted API credit before one ran [4]", ""],
      ["cheap-swarm", "six long free-text results overflowed the return channel; fix: a compact schema per item [4]", ""],
      ["adversarial", "fixes applied by phrase, not by claim, let errors survive elsewhere; two fixes added new errors [4]", ""],
      ["sandwich", "wrong shape for one coupled build; research fan-out → single author → adversarial check fits better [4]", ""]], id),
  right: id => `<div class="prose"><p><b>The book.</b> Nine shapes for agent work, each with a <i>when not to</i> and a kill switch [5]:</p></div>` + factsTable([
      ["sandwich", "plan deep → execute cheap, in parallel → validate independently", ""], ["adversarial", "one review pass by a different model family", ""],
      ["expand-contract", "breathe in wide, breathe out: kill with reasons, keep one move", ""], ["cascade", "cheapest attempt → mechanical check → escalate one tier", ""],
      ["cheap-swarm", "N cheap workers over one cached preamble", ""], ["sr-and-jr · duel · fan-out · megaprompt", "critique loops, two-draft judging, one-question subagents, one context-complete plan", ""],
      ["≈ $0.00003", "one routing decision — a single call that picks the pattern [1]", ""], ["≤ 3", "human gates per round, only for facts only he holds [1]", ""]], id),
  tell: "**Root cause, not wrapper.** A pattern that fails is fixed at its source or deleted — never wrapped in another pattern [5].",
  src: [["pat — README and router (private repo)", "", "6 Oct 2026", "FACT"],
    ["alx-ds-ml-ai — README, proof/runs (private repo)", "", "7 Oct 2026", "FACT"],
    ["pat — README › evidence (oof H2) (private repo)", "", "9 Oct 2026", "FACT"],
    ["His agent log, entries of 13–14 Oct 2026 (private vault)", "", "Oct 2026", "FACT"],
    ["pat — catalog and PRINCIPLES (private repo)", "", "Oct 2026", "FACT"],
    ["git log --all over his personal repos, Oct 1–14 (198 commits), snapshot of 14 Oct 2026, taken before this piece's own commit", "", "14 Oct 2026", "FACT"]] },

{ id: "tells", gx: 4, gy: 1, hue: "ink", short: "the tells",
  kicker: "watch list · as of 14 Oct 2026", title: "The tells",
  verdict: "Not predictions — a watchlist. The thresholds are his choices, written down before the news.",
  pill: "watchlist",
  left: id => `<table class="facts">${[
    ["5.3 h", "METR 50% horizon (Opus 4.5) — a working week would put the next rung in reach", "agents"],
    ["17.8 pts", "public vs private score, SWE-Bench Pro V2 (different task sets) — narrowing would suggest public scores measure skill more than recall", "agents"],
    ["6.6%", "developers trusting AI output for important decisions — past half, the pilot leaves the seat", "shock"],
    ["71%", "senior share of the rebound in US software postings — composition; read it with pay before calling it a price of judgement", "market"],
    ["−11%", "ages 22–25 in the most AI-exposed jobs — who learns to close doors", "ladder"],
    ["0.913 / 0.837", "judge confidence vs truth in his own instrument — a calibrated judge makes checking cheap", "oof"],
    ["16.9%", "Kaggle medals by the best ML agent, MLE-bench (o1-preview, 2024–25) — no fresh run; past half, data science's own rung moves", "agents"],
    ["Nov 2027 → Jan 2030", "named medians for an automated coder — score the next update against them", "forecasts"]
  ].map(r => `<tr data-go="${r[2]}"><td class="v">${r[0]}</td><td class="c">${r[1]} <span class="go">→ ${(DATA.nodes.find(n => n.id === r[2]) || {}).short || r[2]}</span></td></tr>`).join("")}</table>`,
  right: id => `<div class="prose"><p>Every tile ends in a <b>tell</b>: the number that would change its verdict. Read together they place the present in the <b>next rung</b>'s 2×2 — agents lengthening or stalling, checking cheap or scarce.</p><p>In Oct 2026 they lean, provisionally, to one square: <b>agents lengthening, checking still scarce</b>. Horizons are up, the frontier's public and private scores sit 17.8 points apart on different task sets, and his own judge was overconfident.</p><p>The thresholds are his choices and carry no fixed window — a watchlist, not a pre-registration. The habit behind it is the one his experiments follow: decide what would change your mind <i>before</i> the data arrives.</p></div>` }
],
links: [
  ["tunnel", "byhand", "rock → data"], ["byhand", "pilot", "features → embeddings"], ["pilot", "wiki", "copilot → agent"], ["wiki", "contract", "a wiki → a contract"],
  ["contract", "house", "one contract per vault"], ["house", "patbook", "the house audits itself"], ["patbook", "next", "the next rung"],
  ["boom", "byhand", "the sexiest job"], ["shock", "pilot", "the helicopter"], ["yardsticks", "wiki", "context files, measured"], ["market", "contract", "senior + AI-titled"],
  ["agents", "oof", "public vs private"], ["forecasts", "next", "2027 → 2030"],
  ["rag", "wiki", "scored on a golden set"], ["ledger", "house", "the boundary"], ["oof", "patbook", "a fold it never sees"],
  ["tells", "next", "which square"], ["ladder", "thesis", "the rung"]
]
};

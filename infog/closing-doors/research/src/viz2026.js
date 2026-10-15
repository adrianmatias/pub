// ---------- 2026, month by month: his commits as bars, the field's events above, his below ----------
// [month, commits, field events [short, long], his events [short, long]]; every event is sourced on its own tile
const Y26 = [
  ["Jan", 0, [["TH1.1: 5.3 h", "METR Time Horizon 1.1: Opus 4.5 at 5.3 h"]], []],
  ["Feb", 22, [["AGENTS.md study", "context files: no general gain, >20% cost"], ["selection bias", "METR: some work withheld from the no-AI arm"]], [["ep 0012", "episode 0012: build by removal"]]],
  ["Mar", 23, [["spec as gate", "review checks code against itself, not intent"]], [["RAG on 1 GPU", "local RAG over his blog, scored"]]],
  ["Apr", 15, [], [["Uqbar", "Uqbar: an LLM-wiki an agent keeps"]]],
  ["May", 28, [["self-report", "METR survey: 1.4–2× self-reported value"]], [["contract", "contract work: agents built against a spec"], ["Mirror", "The Mirror, the wiki's public method"]]],
  ["Jun", 18, [["Sol ≈11 h", "GPT-5.6 Sol ≈11 h, not robust"]], []],
  ["Jul", 15, [["71% senior", "71% of the posting rebound is senior"]], []],
  ["Aug", 131, [["−11% at 22–25", "young workers in exposed jobs −11%"], ["AI Futures", "automated-coder medians 2027–30"]], [["the house", "the house: one vault per project"]]],
  ["Sep", 124, [["Pro V2 split", "Pro V2: 99.4% public, 81.6% private"]], [["ledger bench", "ledger bench: the boundary, not the language"], ["you-nut", "one plan engine, two domains"]]],
  ["Oct", 198, [], [["pat · alx · oof", "pattern book, library, instrument, this shelf"]]]];
function strip26SVG() {
  const W0 = 44, cw = 59, base = 196, top = 116;
  let g = `<svg viewBox="0 0 640 300" role="img" aria-label="2026 month by month">`;
  g += `<text class="dgm" x="0" y="12" style="fill:#8f9bd6">THE FIELD ↑</text><text class="dgm" x="0" y="296" style="fill:#d4ad3a">HIS WORK ↓</text>`;
  g += `<line class="ax" x1="${W0}" x2="${W0 + cw * 10}" y1="${base}" y2="${base}"/>`;
  Y26.forEach(([m, c, f, p], i) => {
    const cx = W0 + i * cw + cw / 2, h = c / 198 * (base - top), late = i >= 7;
    g += `<rect x="${cx - 13}" y="${base - h}" width="26" height="${Math.max(h, 1)}" rx="3" fill="${late ? "#d4ad3a" : "#57534c"}" opacity=".9"/>`;
    g += `<text class="tk" x="${cx}" y="${base - h - 4}" text-anchor="middle" style="fill:${late ? "#ebe8e2" : "#7d786f"}">${c}${i === 9 ? " in 14 d" : ""}</text>`;
    g += `<text class="tk" x="${cx}" y="${base + 13}" text-anchor="middle" style="fill:#b9b4ab">${m}</text>`;
    f.forEach((e, k) => { const y = 32 + (i % 2) * 13 + k * 28; g += `<circle cx="${cx - 26}" cy="${y - 3}" r="2.2" fill="#8f9bd6"/><text class="ml" x="${cx - 21}" y="${y}" style="fill:#b9b4ab">${esc(e[0])}</text>`; });
    p.forEach((e, k) => { const y = 228 + (i % 2) * 13 + k * 28; g += `<circle cx="${cx - 26}" cy="${y - 3}" r="2.2" fill="#d4ad3a"/><text class="ml" x="${cx - 21}" y="${y}" style="fill:#ebe8e2">${esc(e[0])}</text>`; });
  });
  return g + `</svg>`;
}
function strip26HTML() {
  return `<div class="m26"><div class="m26h"><span>2026</span><span>his commits</span><span class="f">the field</span><span class="p">his work</span></div>` +
    Y26.map(([m, c, f, p], i) => `<div class="m26r${i >= 7 ? " late" : ""}"><b>${m}</b><div class="m26b"><i style="width:${Math.max(c / 198 * 100, 1)}%"></i><span>${c}${i === 9 ? " (14 days)" : ""}</span></div>` +
      `${f.map(e => `<div class="ev f">${esc(e[1])}</div>`).join("")}${p.map(e => `<div class="ev p">${esc(e[1])}</div>`).join("")}</div>`).join("") + `</div>`;
}
// narrow (phone) versions of the diagrams: the same content as text, readable at 340 px
const ladderHTML = () => `<ol class="rungs">${[["20??", "writes the objective and the condition that kills it", "agents write the contracts — a conjecture"],
  ["2026", "writes the contract, keeps the gates", "agents write the code"], ["2023", "reviews every line", "the copilot types"],
  ["2015", "chooses the features, the model and the fold", "the cluster fits it"], ["2008", "reads the rock, designs the blast", "the jumbo drills the face"]]
  .map((r, i) => `<li class="${i === 1 ? "now" : i === 0 ? "next" : ""}"><b>${r[0]}</b><span>${r[1]}</span><em>below: ${r[2]}</em></li>`).join("")}</ol>`;
const loopHTML = (t, steps, hot) => `<div class="loop${hot ? " hot" : ""}"><b>${t}</b><span>${steps.join(" → ")} → repeat</span></div>`;
const natmHTML = () => loopHTML("tunnel face · NATM, 2008", ["excavate a round", "measure convergence", "adapt the support"]) + loopHTML("agent loop · 2026", ["generate", "score a hidden fold", "tighten the gate"], true);
const roundHTML = () => `<ol class="round">${[["log/mat.md", "his prompt"], ["route", "pattern + model roles"], ["agents", "plan · execute in parallel"], ["gates", "each seen to fail"], ["review", "another model family"], ["log/agt.md", "reply + what failed → next round"]]
  .map(r => `<li><b>${r[0]}</b> ${r[1]}</li>`).join("")}</ol>`;

"use strict";
// ---------- tiny helpers ----------
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const NS = "http://www.w3.org/2000/svg";
const W = 1200, H = 960, GX = 1800, GY = 1480;
const nodeRect = n => ({ x: n.gx * GX - W / 2, y: n.gy * GY - (n.h || H) / 2, w: W, h: n.h || H });          // tile size and grid pitch, world px
const HUE = { gold: "#d4ad3a", sea: "#4fb3a9", rust: "#d0694a", ink: "#8f9bd6", rose: "#c96f8f", fg: "#ebe8e2", dim: "#7d786f" };

// inline rich text: **b**, [n] cites → superscripts linked to the node's source list
function cites(s, node) {   // superscript [n] in trusted HTML
  return String(s).replace(/\[(\d+(?:,\d+)*)\]/g, (_, ns) => ns.split(",").map(n => `<sup class="cite" data-node="${node}" data-n="${n}">${n}</sup>`).join(""));
}
function rich(s, node) {
  return esc(s).replace(/\[([^\]]+?)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>').replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*([^*\s][^*]*?)\*/g, "<i>$1</i>").replace(/\[(\d+(?:,\d+)*)\]/g, (_, ns) =>
    ns.split(",").map(n => `<sup class="cite" data-node="${node}" data-n="${n}">${n}</sup>`).join(""));
}

// ---------- charts (pure SVG, world-px sized) ----------
function scale(d0, d1, r0, r1, log) {
  if (log) { const a = Math.log10(d0), b = Math.log10(d1); return v => r0 + (Math.log10(v) - a) / (b - a) * (r1 - r0); }
  return v => r0 + (v - d0) / (d1 - d0) * (r1 - r0);
}
const parseT = t => { const [y, m = 1, d = 1] = String(t).split("-").map(Number); return y + (m - 1) / 12 + (d - 1) / 365; };
function niceTicks(lo, hi, n, log) {
  if (log) { const out = []; for (let e = Math.floor(Math.log10(lo)); e <= Math.ceil(Math.log10(hi)); e++) for (const m of [1, 3]) { const v = +(m * 10 ** e).toPrecision(6); if (v >= lo && v <= hi) out.push(v); } return out; }
  const step0 = (hi - lo) / n, mag = 10 ** Math.floor(Math.log10(step0)), step = [1, 2, 2.5, 5, 10].map(k => k * mag).find(s => s >= step0);
  const out = []; for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(+v.toFixed(10)); return out;
}
function fmt(v, f) {
  if (f === "pct") return v + "%";
  if (f === "usd") return v >= 1000 ? "$" + (v >= 1e6 ? v / 1e6 + "M" : v / 1000 + "k") : "$" + v;
  if (f === "x") return v + "×";
  if (f === "h") return v + " h";
  if (f === "k") return v >= 1000 ? v / 1000 + "k" : v;
  return v;
}
function lineChart(c) {
  const w = c.w || 640, h = c.h || 250, L = 44, R = 12, T = 10, B = 22;
  const all = c.series.flatMap(s => s.data);
  const xs = all.map(p => parseT(p[0])), x0 = c.x0 ?? Math.min(...xs), x1 = c.x1 ?? Math.max(...xs);
  const ys = all.map(p => p[1]).filter(v => v != null);
  const y0 = c.y0 ?? (c.log ? Math.min(...ys) * 0.8 : Math.min(0, Math.min(...ys))), y1 = c.y1 ?? Math.max(...ys) * (c.log ? 1.4 : 1.08);
  const X = scale(x0, x1, L, w - R), Y = scale(y0, y1, h - B, T, c.log);
  let g = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(c.title)}">`;
  for (const t of niceTicks(y0, y1, 4, c.log)) g += `<line class="gl" x1="${L}" x2="${w - R}" y1="${Y(t)}" y2="${Y(t)}"/><text class="tk" x="${L - 6}" y="${Y(t) + 3}" text-anchor="end">${fmt(t, c.yf)}</text>`;
  const span = x1 - x0, step = span > 16 ? 4 : span > 8 ? 2 : 1;
  if (span < 1.5) { const M = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "); for (let t = Math.ceil(x0 * 12) / 12; t <= x1 + 1e-6; t += 1 / 12) g += `<text class="tk" x="${X(t)}" y="${h - 6}" text-anchor="middle">${M[Math.round((t % 1) * 12) % 12]}</text>`; }
  else for (let yr = Math.ceil(x0); yr <= x1; yr += step) g += `<text class="tk" x="${X(yr)}" y="${h - 6}" text-anchor="middle">${yr}</text>`;
  g += `<line class="ax" x1="${L}" x2="${w - R}" y1="${h - B}" y2="${h - B}"/>`;
  for (const m of c.marks || []) {
    const mx = X(parseT(m[0]));
    g += `<line class="mk" x1="${mx}" x2="${mx}" y1="${T}" y2="${h - B}"/><text class="ml" x="${mx + 3}" y="${T + 9 + (m[2] || 0) * 11}">${esc(m[1])}</text>`;
  }
  c.series.forEach((s, i) => {
    const col = HUE[s.hue] || s.hue || HUE.gold, pts = s.data.filter(p => p[1] != null).map(p => [X(parseT(p[0])), Y(p[1])]);
    const d = pts.map((p, j) => (j ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join("");
    if (s.area) g += `<path class="ar" fill="${col}" d="${d}L${pts.at(-1)[0]} ${h - B}L${pts[0][0]} ${h - B}Z"/>`;
    g += `<path class="ln" stroke="${col}" d="${d}"${s.dash ? ' stroke-dasharray="4 4"' : ""}/>`;
    if (s.label) g += `<text class="lg" fill="${col}" x="${L + 8}" y="${T + 12 + i * 13}">${esc(s.label)}</text>`;
  });
  for (const p of c.dots || []) { const px = X(parseT(p[0])), py = Y(p[1]), r = px > w * .62;   // labels near the right edge grow leftwards
    g += `<circle cx="${px}" cy="${py}" r="3.5" fill="${HUE[p[3]] || HUE.fg}"/><text class="ml" x="${r ? px - 6 : px + 6}" y="${py + (p[4] || -6)}" fill="${HUE.fg}"${r ? ' text-anchor="end"' : ""}>${esc(p[2])}</text>`; }
  return g + "</svg>";
}
function barChart(c) {   // horizontal bars; c.rows = [[label, value, hue, note]]; signed values supported (linear)
  const w = c.w || 640, rh = c.rh || 26, L = c.L || 210, R = 92, h = c.rows.length * rh + 22;
  const vs = c.rows.map(r => r[1]), neg = Math.min(...vs) < 0;
  const lo = c.log ? Math.min(...vs) / 2 : Math.min(0, Math.min(...vs)) * 1.04, hi = Math.max(...vs) * (c.log ? 2 : 1.06);
  const X = scale(lo, hi, L, w - R, c.log), base = c.log ? L : X(0);
  let g = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(c.title)}">`;
  for (const t of niceTicks(c.log ? lo : lo, hi, neg ? 6 : 4, c.log)) g += `<line class="gl" x1="${X(t)}" x2="${X(t)}" y1="0" y2="${h - 20}"/><text class="tk" x="${X(t)}" y="${h - 6}" text-anchor="middle">${fmt(t, c.xf)}</text>`;
  if (neg) g += `<line class="ax" x1="${base}" x2="${base}" y1="0" y2="${h - 20}"/>`;
  c.rows.forEach((r, i) => {
    const y = i * rh + 4, col = HUE[r[2]] || HUE.dim, xv = X(r[1]), x0 = Math.min(base, xv), bw = Math.max(2, Math.abs(xv - base));
    g += `<text class="tk" x="${L - 8}" y="${y + rh / 2 + 2}" text-anchor="end" style="fill:var(--fg2);font-size:10.5px">${esc(r[0])}</text>`;
    g += `<rect x="${x0}" y="${y + 3}" width="${bw}" height="${rh - 9}" rx="3" fill="${col}" opacity=".85"/>`;
    g += r[1] < 0 ? `<text class="bv" x="${xv + 6}" y="${y + rh / 2 + 2}" style="fill:var(--bg)">${esc(r[3] ?? fmt(r[1], c.xf))}</text>`
                  : `<text class="bv" x="${xv + 6}" y="${y + rh / 2 + 2}">${esc(r[3] ?? fmt(r[1], c.xf))}</text>`;
  });
  return g + "</svg>";
}
function spark(series, log) {
  const d = series.filter(p => p[1] != null), xs = d.map(p => parseT(p[0])), ys = d.map(p => p[1]);
  const X = scale(Math.min(...xs), Math.max(...xs), 0, 420), lo = Math.min(...ys), hi = Math.max(...ys);
  const Y = scale(log ? lo : Math.min(0, lo), hi, 150, 0, log);
  const p = d.map((q, i) => (i ? "L" : "M") + X(xs[i]).toFixed(1) + " " + Y(q[1]).toFixed(1)).join("");
  return `<svg class="spark" viewBox="0 0 420 150"><path class="a" d="${p}L420 150L0 150Z"/><path d="${p}"/></svg>`;
}
function barNarrow(c) {   // phone: the label on its own line, the bar under it
  const w = 340, rh = 36, h = c.rows.length * rh + 6, vs = c.rows.map(r => r[1]), neg = Math.min(...vs) < 0;
  const lo = c.log ? Math.min(...vs) / 2 : Math.min(0, Math.min(...vs)) * 1.04, hi = Math.max(...vs) * (c.log ? 2 : 1.06);
  const X = scale(lo, hi, 4, w - 70, c.log), base = c.log ? 4 : X(0);
  let g = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(c.title)}">`;
  if (neg) g += `<line class="ax" x1="${base}" x2="${base}" y1="14" y2="${h}"/>`;
  c.rows.forEach((r, i) => {
    const y = i * rh, col = HUE[r[2]] || HUE.dim, xv = X(r[1]), x0 = Math.min(base, xv), bw = Math.max(2, Math.abs(xv - base));
    g += `<text class="nl" x="4" y="${y + 12}">${esc(r[0])}</text><rect x="${x0}" y="${y + 17}" width="${bw}" height="11" rx="3" fill="${col}" opacity=".85"/><text class="nv" x="${Math.max(xv, base) + 6}" y="${y + 27}">${esc(r[3] ?? fmt(r[1], c.xf))}</text>`;
  });
  return g + "</svg>";
}
function chartBlock(c, node, nw) {
  const body = c.kind === "bar" ? (nw ? barNarrow(c) : barChart(c)) : lineChart(nw ? { ...c, w: 340, h: 236 } : c);
  return `<figure class="chart"${nw ? "" : " data-zoom"}><div class="ct">${esc(c.title)}</div>${body}<div class="cs">${rich(c.src || "", node)}</div></figure>`;
}

// ---------- render ----------
function factsTable(rows, node) {
  return `<table class="facts">${rows.map(r => `<tr><td class="v">${esc(r[0])}</td><td class="c">${rich(r[1], node)}${r[2] && r[2] !== "REPORTED" ? `<span class="lab ${r[2]}">${r[2]}</span>` : r[2] ? `<span class="lab">REP</span>` : ""}</td></tr>`).join("")}</table>`;
}
function takeBlock(t, node) {
  if (!t) return "";
  return `<div class="take"><q>${esc(t.q)}</q>${t.tr ? `<div class="tr">${esc(t.tr)}</div>` : ""}<div class="who">— ${esc(t.who)}</div>${t.verdict ? `<div class="score"><b class="${t.verdict}">${t.verdict.replace("-", " ")}</b><span>${rich(t.why, node)}</span></div>` : ""}</div>`;
}
function srcList(n, nw) {
  if (!n.src) return "";
  const li = n.src.map((s, i) => `<li${nw ? "" : ` id="${n.id}-s${i + 1}"`}><b>${i + 1}</b> ${s[3] ? `<span class="lab ${s[3] === "REPORTED" ? "" : s[3]}">${s[3] === "REPORTED" ? "REP" : s[3]}</span> ` : ""}${s[1] ? `<a href="${esc(s[1])}" target="_blank" rel="noopener">${esc(s[0])}</a>` : `<span class="priv">${esc(s[0])}</span>`}${s[2] ? " · " + esc(s[2]) : ""}</li>`).join("");
  return nw ? `<details class="fs"><summary>sources · ${n.src.length}</summary><ol class="src">${li}</ol></details>` : `<ol class="src" data-zoom>${li}</ol>`;
}
function bodyHTML(n, nw) {   // the reading face; nw = narrow (phone feed)
  let h = n.lede ? `<p class="lede">${rich(n.lede, n.id)}</p>` : "";
  h += `<div class="cols"><div class="col">`;
  for (const c of n.charts || []) h += chartBlock(c, n.id, nw);
  if (n.facts) h += factsTable(n.facts, n.id);
  if (n.left) h += n.left(n.id, nw);
  if (n.tell && n.tellLeft) h += `<div class="tell"><h4>the tell</h4>${rich(n.tell, n.id)}</div>`;
  h += `</div><div class="col">`;
  for (const t of [].concat(n.take || [])) h += takeBlock(t, n.id);
  if (n.rightFacts) h += factsTable(n.rightFacts, n.id);
  if (n.right) h += n.right(n.id, nw);
  if (n.bull || n.bear) h += `<div class="bb"><div class="bull"><h4>${esc(n.bullT || "bull")}</h4>${rich(n.bull, n.id)}</div><div class="bear"><h4>${esc(n.bearT || "bear")}</h4>${rich(n.bear, n.id)}</div></div>`;
  if (n.tell && !n.tellLeft) h += `<div class="tell"><h4>the tell</h4>${rich(n.tell, n.id)}</div>`;
  return h + `</div></div>` + srcList(n, nw);
}
function renderNode(n) {
  const el = document.createElement("article");
  el.className = "node"; el.id = n.id; el.tabIndex = 0; el.dataset.hue = n.hue;
  el.style.left = n.gx * GX - W / 2 + "px"; el.style.top = n.gy * GY - (n.h || H) / 2 + "px"; if (n.h) el.style.height = n.h + "px";
  const b = n.big || {};
  let h = `<div class="l0"><div class="k">${esc(n.kicker)}</div><h2>${esc(n.title)}</h2>${n.spark ? spark(n.spark, n.sparkLog) : ""}`;
  if (b.v) h += `<div class="big">${esc(b.v)}<small>${esc(b.u || "")}</small></div><div class="bl">${esc(b.l || "")}</div>`;
  h += `<div class="v">${esc(n.verdict)}</div></div>`;
  h += `<div class="l1"><header><span class="k">${esc(n.kicker)}</span><h3>${esc(n.title)}</h3>${n.pill ? `<span class="pill">${esc(n.pill)}</span>` : ""}</header>`;
  el.innerHTML = h + bodyHTML(n, false) + "</div>";
  return el;
}
const world = $("#world"), vp = $("#vp");
const nodes = DATA.nodes, byId = Object.fromEntries(nodes.map(n => [n.id, n]));
const gxs = nodes.map(n => n.gx), gys = nodes.map(n => n.gy);
const BOUNDS = { x: Math.min(...gxs) * GX - W / 2 - 300, y: Math.min(...gys) * GY - H / 2 - 300 };
BOUNDS.w = Math.max(...gxs) * GX + W / 2 + 300 - BOUNDS.x; BOUNDS.h = Math.max(...gys) * GY + H / 2 + 300 - BOUNDS.y;
const grid = $("#grid"); Object.assign(grid.style, { left: BOUNDS.x - 3000 + "px", top: BOUNDS.y - 3000 + "px", width: BOUNDS.w + 6000 + "px", height: BOUNDS.h + 6000 + "px" });
for (const n of nodes) world.appendChild(renderNode(n));
// era and layer bands: large quiet labels on the open ground between tiles
for (const b of DATA.bands || []) {
  const el = document.createElement("div"); el.className = "band " + (b.cls || "");
  el.style.left = b.x + "px"; el.style.top = b.y + "px"; el.innerHTML = b.html;
  world.insertBefore(el, grid.nextSibling);
}

// links: soft curves between tile centres, label at the midpoint
const svg = $("#links");
Object.assign(svg.style, { left: BOUNDS.x + "px", top: BOUNDS.y + "px", width: BOUNDS.w + "px", height: BOUNDS.h + "px" });
svg.setAttribute("viewBox", `${BOUNDS.x} ${BOUNDS.y} ${BOUNDS.w} ${BOUNDS.h}`);
let linkSvg = ""; const CHIPS = [];
DATA.links.forEach(([a, b, label]) => {
  const A = byId[a], B = byId[b]; if (!A || !B) return;
  const ax = A.gx * GX, ay = A.gy * GY, bx = B.gx * GX, by = B.gy * GY, mx = (ax + bx) / 2, my = (ay + by) / 2;
  const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy), px = -dy / len, py = dx / len;
  // choose the bend that puts the label (curve midpoint) on open ground: off every tile, clear of other labels
  let best = null, bs = 1e18;
  for (const c of [0, 300, -300, 600, -600, 1000, -1000, GY, -GY, 1800, -1800, 2400, -2400]) {
    const x = mx + px * c / 2, y = my + py * c / 2;
    let sc = Math.abs(c);
    for (const n of nodes) { const r = nodeRect(n), m = 60; if (x > r.x - m && x < r.x + r.w + m && y > r.y - m && y < r.y + r.h + m) sc += 1e7; }
    for (const k of CHIPS) if (Math.abs(k.x - x) < 700 && Math.abs(k.y - y) < 260) sc += 1e6;
    if (sc < bs) { bs = sc; best = { c, x, y }; }
  }
  const cx = mx + px * best.c, cy = my + py * best.c;
  linkSvg += `<path data-a="${a}" data-b="${b}" d="M${ax} ${ay}Q${cx} ${cy} ${bx} ${by}"/>`;
  CHIPS.push({ a, b, x: best.x, y: best.y, label });
});
svg.innerHTML = linkSvg;
const chipBox = $("#chips");
for (const c of CHIPS) {
  const el = document.createElement("button");
  el.textContent = c.label; el.title = `${byId[c.a].short} ↔ ${byId[c.b].short}`;
  el.addEventListener("click", () => {   // fly to both ends of the link
    const A = nodeRect(byId[c.a]), B = nodeRect(byId[c.b]), x = Math.min(A.x, B.x), y = Math.min(A.y, B.y);
    setFocus(null); flyTo({ x, y, w: Math.max(A.x + A.w, B.x + B.w) - x, h: Math.max(A.y + A.h, B.y + B.h) - y }, 750, .9);
  });
  c.el = el; chipBox.appendChild(el);
}
function placeChips(o1) {
  for (const c of CHIPS) {
    const hot = focus && (focus.id === c.a || focus.id === c.b);
    c.el.classList.toggle("hot", !!hot);
    c.el.classList.toggle("off", o1 > .55 && !hot);
    c.el.style.transform = `translate(${c.x * cam.s + cam.x}px,${c.y * cam.s + cam.y}px) translate(-50%,-50%)`;
  }
}

// ---------- camera ----------
let cam = { x: 0, y: 0, s: .2 }, anim = null, focus = null;
const vw = () => vp.clientWidth, vh = () => vp.clientHeight;
function apply() {
  world.style.transform = `translate(${cam.x}px,${cam.y}px) scale(${cam.s})`;
  const o1 = Math.min(1, Math.max(0, (W * cam.s / vw() - .38) / .2));
  world.style.setProperty("--o1", o1.toFixed(3));
  document.body.classList.toggle("z0", o1 < .5);
  placeChips(o1);
  mini();
}
function fitRect(r, pad = .9) {
  const s = Math.min(vw() * pad / r.w, vh() * pad / r.h);
  return { s, cx: r.x + r.w / 2, cy: r.y + r.h / 2 };
}
function flyTo(r, ms = 750, pad) {
  const t = fitRect(r, pad), c0 = { cx: (vw() / 2 - cam.x) / cam.s, cy: (vh() / 2 - cam.y) / cam.s, s: cam.s };
  const dist = Math.hypot(t.cx - c0.cx, t.cy - c0.cy), dip = Math.min(.9, dist / 6000);
  const t0 = performance.now(); cancelAnimationFrame(anim);
  const step = now => {
    let k = Math.min(1, (now - t0) / ms); const e = k < .5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2;
    const ls = Math.log(c0.s) + (Math.log(t.s) - Math.log(c0.s)) * e - dip * Math.sin(Math.PI * e);
    cam.s = Math.exp(ls);
    const cx = c0.cx + (t.cx - c0.cx) * e, cy = c0.cy + (t.cy - c0.cy) * e;
    cam.x = vw() / 2 - cx * cam.s; cam.y = vh() / 2 - cy * cam.s; apply();
    if (k < 1) anim = requestAnimationFrame(step);
  };
  anim = requestAnimationFrame(step);
}
function elRect(el) {   // world rect of any element inside the world
  const b = el.getBoundingClientRect(), v = vp.getBoundingClientRect();
  return { x: (b.left - v.left - cam.x) / cam.s, y: (b.top - v.top - cam.y) / cam.s, w: b.width / cam.s, h: b.height / cam.s };
}
function setFocus(n, sub) {
  focus = n;
  $$(".node.cur").forEach(e => e.classList.remove("cur"));
  $$("#links .hot").forEach(e => e.classList.remove("hot"));
  if (n) {
    $("#" + n.id).classList.add("cur");
    $$(`#links [data-a="${n.id}"],#links [data-b="${n.id}"]`).forEach(e => e.classList.add("hot"));
  }
  $("#crumbTail").innerHTML = n ? ` › <a data-act="node">${esc(n.short || n.title)}</a>${sub ? " › <b>" + esc(sub) + "</b>" : ""}` : "";
  history.replaceState(null, "", n ? "#" + n.id : location.pathname + location.search);
}
function home(ms) { setFocus(null); flyTo(BOUNDS, ms, .96); }
function goNode(n, ms) { setFocus(n); flyTo(nodeRect(n), ms, .94); }

// ---------- input ----------
let ptrs = new Map(), downAt = null, moved = 0, pinch0 = null;
vp.addEventListener("wheel", e => {
  e.preventDefault(); cancelAnimationFrame(anim);
  const f = Math.exp(-(e.ctrlKey ? e.deltaY * 3 : e.deltaY) * .0016), s = Math.min(9, Math.max(.03, cam.s * f)), k = s / cam.s;
  const r = vp.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
  cam.x = mx - (mx - cam.x) * k; cam.y = my - (my - cam.y) * k; cam.s = s; apply(); fade();
}, { passive: false });
vp.addEventListener("pointerdown", e => {
  if (document.body.classList.contains("read")) return;
  ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY }); downAt = { x: e.clientX, y: e.clientY }; moved = 0;
  if (ptrs.size === 2) { const [p, q] = [...ptrs.values()]; pinch0 = { d: Math.hypot(p.x - q.x, p.y - q.y), s: cam.s }; }
  vp.setPointerCapture(e.pointerId); cancelAnimationFrame(anim);
});
vp.addEventListener("pointermove", e => {
  if (!ptrs.has(e.pointerId)) return;
  const p0 = ptrs.get(e.pointerId), dx = e.clientX - p0.x, dy = e.clientY - p0.y;
  ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
  moved += Math.abs(dx) + Math.abs(dy);
  if (ptrs.size === 2 && pinch0) {
    const [p, q] = [...ptrs.values()], d = Math.hypot(p.x - q.x, p.y - q.y), mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2;
    const s = Math.min(9, Math.max(.03, pinch0.s * d / pinch0.d)), k = s / cam.s;
    cam.x = mx - (mx - cam.x) * k + dx / 2; cam.y = my - (my - cam.y) * k + dy / 2; cam.s = s;
  } else if (moved > 4) { cam.x += dx; cam.y += dy; vp.classList.add("drag"); }
  apply(); if (moved > 4) fade();
});
const up = e => {
  ptrs.delete(e.pointerId); vp.classList.remove("drag"); if (ptrs.size < 2) pinch0 = null;
  if (moved <= 4 && downAt && ptrs.size === 0) click(e);
};
vp.addEventListener("pointerup", up); vp.addEventListener("pointercancel", e => { ptrs.delete(e.pointerId); pinch0 = null; });
function click(e) {
  const t = document.elementFromPoint(e.clientX, e.clientY);
  if (!t || t.closest("a")) return;
  const cite = t.closest(".cite"); if (cite) return jumpCite(cite);
  const go = t.closest("[data-go]"); if (go && focus && focus.id === go.closest(".node").id) return goNode(byId[go.dataset.go]);
  const nodeEl = t.closest(".node"); if (!nodeEl) return;
  const n = byId[nodeEl.id], z = t.closest("[data-zoom]");
  const o1 = parseFloat(world.style.getPropertyValue("--o1")) || 0;
  if (focus !== n || o1 < .9 || !z) return goNode(n);
  setFocus(n, z.classList.contains("src") ? "sources" : "chart"); flyTo(elRect(z), 650, .92);
}
function jumpCite(c) {
  if (document.body.classList.contains("read")) {   // feed: open this card's sources and flash the line
    const card = c.closest(".fc"), fs = card && card.querySelector(".fs"); if (!fs) return;
    fs.open = true; const li = fs.querySelectorAll("li")[c.dataset.n - 1]; if (!li) return;
    li.classList.add("flash"); setTimeout(() => li.classList.remove("flash"), 2200);
    return li.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  const n = byId[c.dataset.node], li = $(`#${n.id}-s${c.dataset.n}`); if (!li) return;
  li.classList.add("flash"); setTimeout(() => li.classList.remove("flash"), 2200);
  setFocus(n, "sources"); flyTo(elRect(li.parentElement), 650, .92);
}
function openCard(id, smooth = true) {
  const d = $("#c-" + id); if (!d) return;
  d.open = true; requestAnimationFrame(() => d.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" }));
}
document.addEventListener("click", e => {
  const a = e.target.closest("[data-act]"); if (a) { e.preventDefault(); act(a.dataset.act); }
  const c = e.target.closest(".cite"); if (c && document.body.classList.contains("read")) { e.preventDefault(); jumpCite(c); }
  if (e.target.id === "help") act("help");
  const g = e.target.closest("[data-go]"); if (g && document.body.classList.contains("read")) openCard(g.dataset.go);
});
function act(a) {
  if (a === "home") { if (document.body.classList.contains("read")) act("read"); home(); }
  if (a === "node" && focus) goNode(focus);
  if (a === "help") $("#help").classList.toggle("on");
  if (a === "read") {
    const on = document.body.classList.toggle("read");
    $$("#tools [data-act=read]")[0].textContent = on ? "map" : "read";
    if (on) { buildFeed(); focus ? openCard(focus.id, false) : window.scrollTo(0, 0); }
    else { window.scrollTo(0, 0); requestAnimationFrame(() => focus ? goNode(focus, 1) : home(1)); }
  }
}
// arrows walk the grid: nearest tile in that direction
function walk(dx, dy) {
  const from = focus || byId[DATA.start];
  if (!focus) return goNode(from);
  let best = null, bd = 1e9;
  for (const n of nodes) {
    const ddx = n.gx - from.gx, ddy = n.gy - from.gy; if (n === from) continue;
    const along = ddx * dx + ddy * dy, across = Math.abs(ddx * dy - ddy * dx); if (along <= 0) continue;
    const d = along + across * 2; if (d < bd) { bd = d; best = n; }
  }
  if (best) goNode(best);
}
document.addEventListener("keydown", e => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key;
  if (k === "?" ) return act("help");
  if (k === "r" || k === "R") return act("read");
  if (document.body.classList.contains("read")) return;
  if (k === "Escape") { if ($("#help").classList.contains("on")) return act("help"); return focus && cam.s > (fitRect(nodeRect(focus), .94).s * 1.2) ? goNode(focus) : home(); }
  if (k === "0" || k === "Home") return home();
  const dir = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[k];
  if (dir) { e.preventDefault(); walk(...dir); }
  if (k === "Enter" && document.activeElement?.classList.contains("node")) goNode(byId[document.activeElement.id]);
});
let fadeT; function fade() { $("#hint").style.opacity = 0; clearTimeout(fadeT); }

// ---------- minimap ----------
const mm = $("#mini"), mk = 190 / BOUNDS.w, mh = 120 / BOUNDS.h, mkk = Math.min(mk, mh);
const mox = (190 - BOUNDS.w * mkk) / 2, moy = (120 - BOUNDS.h * mkk) / 2;
mm.innerHTML = nodes.map(n => { const r = nodeRect(n); return `<i data-id="${n.id}" style="left:${mox + (r.x - BOUNDS.x) * mkk}px;top:${moy + (r.y - BOUNDS.y) * mkk}px;width:${W * mkk}px;height:${r.h * mkk}px"></i>`; }).join("") + "<u></u>";
function mini() {
  const u = mm.lastChild, x = -cam.x / cam.s, y = -cam.y / cam.s, w = vw() / cam.s, h = vh() / cam.s;
  Object.assign(u.style, { left: mox + (x - BOUNDS.x) * mkk + "px", top: moy + (y - BOUNDS.y) * mkk + "px", width: w * mkk + "px", height: h * mkk + "px" });
  $$("i", mm).forEach(i => i.classList.toggle("cur", focus?.id === i.dataset.id));
}
mm.addEventListener("click", e => {
  const r = mm.getBoundingClientRect(), wx = (e.clientX - r.left - mox) / mkk + BOUNDS.x, wy = (e.clientY - r.top - moy) / mkk + BOUNDS.y;
  let best = nodes[0], bd = 1e18; for (const n of nodes) { const d = (n.gx * GX - wx) ** 2 + (n.gy * GY - wy) ** 2; if (d < bd) { bd = d; best = n; } }
  goNode(best);
});
$$(".node").forEach(el => el.addEventListener("focus", () => { if (!document.body.classList.contains("read") && focus?.id !== el.id && !ptrs.size) goNode(byId[el.id]); }));


// ---------- the feed: the same tiles as a chronological column (phones, read mode, print) ----------
let feedBuilt = false;
function cardHTML(n, open) {
  const b = n.big || {}, lane = n.lane || "";
  return `<details class="fc" data-hue="${n.hue}" id="c-${n.id}"${open ? " open" : ""}><summary>` +
    `<div class="fk"><span>${esc(n.feedKicker ?? n.kicker.replace(/^(the field|his practice|the evidence) · /, ""))}</span>${lane ? `<i class="lane ${lane}">${lane}</i>` : ""}</div><h3>${esc(n.feedTitle || n.title)}</h3>` +
    (b.v ? `<div class="fbig">${esc(b.v)}<small>${esc(b.u || "")}</small></div><div class="fbl">${esc(b.l || "")}</div>` : "") +
    `<p class="fv">${esc(n.feedVerdict ?? n.verdict)}</p><span class="fm"></span></summary><div class="l1 fl1">${n.pill ? `<span class="pill">${esc(n.pill)}</span>` : ""}${bodyHTML(n, true)}</div></details>`;
}
function buildFeed() {
  if (feedBuilt) return; feedBuilt = true;
  const top = nodes.filter(n => n.gy === DATA.topRow), first = top.filter(n => n.gx < DATA.lastTopX), last = top.filter(n => n.gx >= DATA.lastTopX);
  first.sort((a, b) => (a.id === DATA.start ? -1 : b.id === DATA.start ? 1 : a.gx - b.gx));
  let h = `<header class="fh"><div class="k">${esc(DATA.kicker)}</div><h1>${esc(DATA.title)}</h1><p>${esc(DATA.subtitle)}</p><p class="fhint">${esc(DATA.feedHint)}</p></header>`;
  h += first.map(n => cardHTML(n, n.id === DATA.start)).join("");
  for (const e of DATA.eras) {
    const ns = nodes.filter(n => n.gy !== DATA.topRow && Math.round(n.gx) === e.gx).sort((a, b) => a.gy - b.gy);
    if (ns.length) h += `<section class="era${e.now ? " now" : ""}"><div class="eh"><b>${esc(e.t)}</b><span>${esc(e.s)}</span><em>${esc(e.span)}</em></div>${ns.map(n => cardHTML(n)).join("")}</section>`;
  }
  h += last.map(n => cardHTML(n)).join("");
  $("#feed").innerHTML = h;
}

addEventListener("beforeprint", () => { if (!document.body.classList.contains("read")) act("read"); $$("#feed details").forEach(d => d.open = true); });
// ---------- boot ----------
addEventListener("resize", () => focus ? goNode(focus, 1) : home(1));
const h0 = location.hash.slice(1);
const phone = matchMedia("(max-width: 700px)").matches;
if (phone) { document.body.classList.add("read"); $$("#tools [data-act=read]")[0].textContent = "map"; buildFeed(); if (byId[h0]) openCard(h0, false); }
cam.s = fitRect(BOUNDS, .96).s * .6; cam.x = vw() / 2 - (BOUNDS.x + BOUNDS.w / 2) * cam.s; cam.y = vh() / 2 - (BOUNDS.y + BOUNDS.h / 2) * cam.s; apply();
if (!phone) byId[h0] ? goNode(byId[h0], 900) : home(900);
setTimeout(() => $("#hint").style.opacity = .0, 9000);

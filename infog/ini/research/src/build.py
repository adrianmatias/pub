#!/usr/bin/env python3
"""Assemble the self-contained piece: shared CSS/engine + ini CSS/viz/data → index.html."""
import pathlib
import sys

D = pathlib.Path(__file__).parent
SHARED = D.parent.parent.parent / "closing-doors" / "research" / "src"
OUT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else D.parent.parent / "index.html"

URL = "https://taoaieng.io/pub/infog/ini/"
TITLE = "ini: Constraining the Generative | typed modular AI engineering"
DESC = (
    "Domain modelling, object orientation, and typed deterministic modularity to counterbalance "
    "hallucination, untested claims, and unbounded complexity. Adrian Matias's AI engineering "
    "standard coalesced in ini v0.3.0 on one zoomable map."
)

head = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{TITLE}</title>
<meta name="description" content="{DESC}">
<meta name="theme-color" content="#0b0b0c">
<link rel="canonical" href="{URL}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="tao · ai · eng">
<meta property="og:title" content="{TITLE}">
<meta property="og:description" content="{DESC}">
<meta property="og:url" content="{URL}">
<meta property="og:image" content="{URL}og.png">
<meta property="og:image:secure_url" content="{URL}og.png">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="The zoomable map of ini: Constraining the Generative">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{TITLE}">
<meta name="twitter:description" content="{DESC}">
<meta name="twitter:image" content="{URL}og.png">
<meta name="author" content="Adrian Matias">
<meta property="article:published_time" content="2026-11-20">
<meta property="article:modified_time" content="2026-11-25">
<style>
"""

body = """</style>
</head>
<body class="z0">
<noscript>This piece is a zoomable map drawn by a small inline script. Enable JavaScript, or read the repository directly at https://github.com/adrianmatias/ini.</noscript>
<div id="chips"></div>
<div id="vp"><div id="world"><div id="grid"></div><svg id="links"></svg></div></div>
<main id="feed"></main>
<nav id="crumb" class="hud"><a href="../../" title="taoaieng.io/pub: all pieces and the archive">pub</a><span>›</span><a data-act="home">ini</a><span id="crumbTail"></span></nav>
<div id="tools" class="hud"><button data-act="zout" title="zoom out (−)">−</button><button data-act="zin" title="zoom in (+)">+</button><button data-act="home" title="whole map (0)">map</button><button data-act="read" title="read as an article (R)">read</button><button data-act="help" title="how to move (?)">?</button></div>
<div id="hint" class="hud">scroll or pinch to zoom · drag to pan · click a tile · ← → walk · −/+ zoom · R read · ? help</div>
<div id="mini" class="hud"></div>
<div id="help"><div>
  <h4>How to move</h4>
  <p>Five pillars run left to right around a central gold spine: <b>I · Direction</b> (objective &amp; distilling the LLM out), <b>II · Proof</b> (13 witness-proven gates), <b>III · Domain &amp; OOP</b> (the center spine: domain schema, OOP modular abstraction, public-surface CRAP contracts), <b>IV · Rhythm</b> (expand/compress, 3 families, Deutsch conjectures &amp; deterministic dream loop), and <b>V · Flow</b> (distil don't link, 8 budgeted skills, field proof). Three layers run top to bottom: <b>the principles</b>, <b>the machinery</b>, and <b>the evidence</b>. Four depths: <b>overview</b>, <b>far</b>, <b>near</b> (click a tile), and <b>closer</b> (click a chart or source list).</p>
  <p style="margin-top:10px"><kbd>scroll</kbd> / <kbd>−</kbd> <kbd>+</kbd> zoom · <kbd>drag</kbd> pan · <kbd>click</kbd> dive · <kbd>Esc</kbd> rise · <kbd>← ↑ → ↓</kbd> walk the map · <kbd>0</kbd> whole map · <kbd>R</kbd> read as an article · a superscript number jumps to its source.</p>
  <p style="margin-top:10px">Labels: <span class="lab FACT">FACT</span> verified directly from <code>ini</code> v0.3.0 or a primary source · <span class="lab">REP</span> single or second-hand · <span class="lab FORECAST">FORECAST</span> a dated target or open test · <span class="lab UNVERIFIED">UNVERIFIED</span> could not be confirmed. Verified as of 23 November 2026.</p>
</div></div>

<script>
"""

parts = [
    head,
    (SHARED / "style.css").read_text(),
    "\n",
    (SHARED / "extra.css").read_text(),
    "\n",
    (D / "ini.css").read_text(),
    body,
    (D / "viz.js").read_text(),
    "\n",
    (D / "data.js").read_text(),
    "\n</script>\n<script>\n",
    (SHARED / "engine.js").read_text(),
    "</script>\n</body>\n</html>\n",
]

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text("".join(parts))
print(OUT, OUT.stat().st_size, "bytes")

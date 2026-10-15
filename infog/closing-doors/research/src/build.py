#!/usr/bin/env python3
"""Assemble the self-contained piece: head + CSS + body + data + engine → index.html."""
import pathlib, sys

D = pathlib.Path(__file__).parent
OUT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else D / "index.html"
URL = "https://taoaieng.io/pub/infog/closing-doors/"
TITLE = "Closing Doors — data science in the age of agents"
DESC = ("Agents made opening doors nearly free; his bet is that the scarce work is closing them. One data scientist's "
        "work from the tunnel face (2007) to agent orchestration (2026) and the next rung (2030), on one zoomable "
        "map — every number sourced.")

head = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{TITLE} · October 2026</title>
<meta name="description" content="{DESC}">
<meta name="theme-color" content="#0b0b0c">
<meta name="robots" content="noindex">
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
<meta property="og:image:alt" content="The zoomable map of Closing Doors">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{TITLE}">
<meta name="twitter:description" content="{DESC}">
<meta name="twitter:image" content="{URL}og.png">
<meta name="author" content="Adrian Matias">
<meta property="article:published_time" content="2026-10-14">
<style>
"""
body = """</style>
</head>
<body class="z0">
<noscript>This piece is a zoomable map drawn by a small inline script. Enable JavaScript, or read the sources in the repository.</noscript>
<div id="chips"></div>
<div id="vp"><div id="world"><div id="grid"></div><svg id="links"></svg></div></div>
<main id="feed"></main>
<nav id="crumb" class="hud"><a href="../../" title="taoaieng.io/pub — all pieces and the archive">pub</a><span>›</span><a data-act="home">closing doors</a><span id="crumbTail"></span></nav>
<div id="tools" class="hud"><button data-act="home" title="whole map (0)">map</button><button data-act="read" title="read as an article (R)">read</button><button data-act="help" title="how to move (?)">?</button></div>
<div id="hint" class="hud">scroll or pinch to zoom · drag to pan · click a tile · ← → walk · R read · ? help</div>
<div id="mini" class="hud"></div>
<div id="help"><div>
  <h4>How to move</h4>
  <p>Time runs left to right, 2007 → 2030, and speeds up: the columns span eight years, seven, three, then months of 2026, then two weeks. Three layers run top to bottom: <b>the field</b> (what happened to everyone), <b>his practice</b> (how one data scientist worked), <b>the evidence</b> (his takes and experiments, scored). The map has three depths: <b>far</b>, one line and one number per tile; <b>near</b> (click a tile), the chart, the facts and the take; <b>closer</b> (click a chart or the source list), every number's source, date and label.</p>
  <p style="margin-top:10px"><kbd>scroll</kbd> zoom · <kbd>drag</kbd> pan · <kbd>click</kbd> dive · <kbd>Esc</kbd> rise · <kbd>← ↑ → ↓</kbd> walk the map · <kbd>0</kbd> whole map · <kbd>R</kbd> read as an article · a superscript number jumps to its source.</p>
  <p style="margin-top:10px">Labels: <span class="lab FACT">FACT</span> primary or high-quality source · <span class="lab">REP</span> single or second-hand · <span class="lab FORECAST">FORECAST</span> a named projection · <span class="lab UNVERIFIED">UNVERIFIED</span> could not be confirmed. Sources without a link are his own private files. Data as of 14 October 2026.</p>
</div></div>

<script>
"""
parts = [head, (D / "style.css").read_text(), (D / "extra.css").read_text(), body,
         (D / "helpers.js").read_text(), "\n", (D / "viz2026.js").read_text(), "\n", (D / "data.js").read_text(), "\n", (D / "tiles2026.js").read_text(), "\n", (D / "finalize.js").read_text(), "\n</script>\n<script>\n",
         (D / "engine.js").read_text(), "</script>\n</body>\n</html>\n"]
OUT.write_text("".join(parts))
print(OUT, OUT.stat().st_size, "bytes")

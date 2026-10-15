#!/usr/bin/env python3
"""Give Tsunami & Printing Press the shared engine and its phone feed. Reads the published piece, keeps its
head, CSS and DATA byte-for-byte, appends the feed CSS, adds the feed's section order, swaps in engine.js."""
import pathlib, sys
D = pathlib.Path(__file__).parent
src = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2])
L = src.read_text().split("\n")
i_style_end = L.index("</style>"); i_vp = next(i for i, l in enumerate(L) if l.startswith('<div id="vp">'))
i_s1 = L.index("<script>"); i_s1_end = L.index("</script>")
assert L[i_s1_end + 1] == "<script>"
head, style, body = L[:i_style_end], (D / "extra.css").read_text(), L[i_style_end:i_s1]
body.insert(i_vp - i_style_end + 1, '<main id="feed"></main>')
data = "\n".join(L[i_s1 + 1:i_s1_end])
FEED = '''const DATA = {
kicker: "money in the age of AI · 14 Oct 2026",
title: "Tsunami & Printing Press",
subtitle: "AI is deflationary in what it sells and inflationary in what it buys. The press has not been called — yet.",
feedHint: "The map, read in the order of its argument: the two forces, the hard money between them, what else they move, and where that leaves us. Open any card for the chart, the facts and every source.",
lead: ["thesis"], tail: ["method"],
sections: [
  { t: "The two forces", s: "tsunami · printing press", ids: ["aidefl", "aisink", "bonds", "austrian"] },
  { t: "Hard money", s: "bitcoin · zcash · quantum", ids: ["btc", "y2013", "zec", "quantum"] },
  { t: "What else they move", s: "equity · housing · the yen", ids: ["equity", "realestate", "carry"] },
  { t: "Where it leaves us", s: "four futures · the tells", ids: ["scen", "tells"] }],
'''
assert data.count("const DATA = {\n") == 1
data = data.replace("const DATA = {\n", FEED)
html = "\n".join(head) + "\n" + style + "\n".join(body) + "\n<script>\n" + data + "\n</script>\n<script>\n" + (D / "engine.js").read_text() + "</script>\n</body>\n</html>\n"
out.write_text(html); print(out, len(html))

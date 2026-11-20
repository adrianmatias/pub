#!/usr/bin/env python3
"""Update Tsunami & Printing Press with the shared CSS, HUD zoom controls, and engine.js.
Reads the published piece, keeps its head, S and DATA untouched, and writes the shared engine/CSS."""
import pathlib, sys

D = pathlib.Path(__file__).parent
src = pathlib.Path(sys.argv[1])
out = pathlib.Path(sys.argv[2])
text = src.read_text()

style_start = text.index("<style>\n") + len("<style>\n")
style_end = text.index("</style>")
head = text[:style_start]

body_start = style_end
s1_start = text.index("<script>\n")
body = text[body_start:s1_start]
old_tools = '<div id="tools" class="hud"><button data-act="home" title="whole map (0)">map</button>'
new_tools = '<div id="tools" class="hud"><button data-act="zout" title="zoom out (−)">−</button><button data-act="zin" title="zoom in (+)">+</button><button data-act="home" title="whole map (0)">map</button>'
if 'data-act="zout"' not in body:
    assert old_tools in body
    body = body.replace(old_tools, new_tools, 1)
body = body.replace(
    "scroll or pinch to zoom · drag to pan · click a tile · ← → walk · R read · ? help",
    "scroll or pinch to zoom · drag to pan · click a tile · ← → walk · −/+ zoom · R read · ? help",
)
body = body.replace(
    "<kbd>scroll</kbd> zoom · <kbd>drag</kbd>",
    "<kbd>scroll</kbd> / <kbd>−</kbd> <kbd>+</kbd> zoom · <kbd>drag</kbd>",
)

s1_end = text.index("</script>\n<script>\n", s1_start)
data_script = text[s1_start:s1_end + len("</script>\n<script>\n")]

css = (D / "style.css").read_text().rstrip() + "\n" + (D / "extra.css").read_text().rstrip() + "\n"
engine = (D / "engine.js").read_text().rstrip() + "\n"

html = head + css + body + data_script + engine + "</script>\n</body>\n</html>\n"
out.write_text(html)
print(out, len(html))

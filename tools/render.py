"""Render the archive's markdown to plain static HTML, so the website can be read without a build service.

Every README.md under archive/ becomes index.html beside it; every other *.md becomes <same name>.html. The markdown stays the archival copy; the HTML is derived and can be deleted and
re-rendered at any time. Links to *.md inside the archive are rewritten to *.html.
Run from the repo root: uv run --no-project --with markdown python tools/render.py
"""

import html
import re
from pathlib import Path

import markdown

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://taoaieng.io/pub/"  # absolute only for link previews (crawlers need it); page links stay relative
PAGE = """<!DOCTYPE html>
<html lang="{lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title><meta name="theme-color" content="#0b0b0c">
{social}
<style>
:root{{--bg:#0b0b0c;--fg:#ebe8e2;--fg2:#b9b4ab;--fg3:#7d786f;--line:#26262a;--gold:#d4ad3a}}
*{{box-sizing:border-box}} body{{margin:0;background:var(--bg);color:var(--fg2);font:17px/1.65 "Iowan Old Style",Palatino,Georgia,serif;-webkit-font-smoothing:antialiased}}
main{{max-width:720px;margin:0 auto;padding:56px 22px 90px}}
nav{{font:12px ui-monospace,Menlo,monospace;letter-spacing:.06em;color:var(--fg3);margin-bottom:34px}} nav a{{color:var(--fg3)}}
h1,h2,h3{{color:var(--fg);font-weight:500;line-height:1.2}} h1{{font-size:34px}} h2{{font-size:24px;margin-top:2em}}
a{{color:var(--gold);text-decoration:none}} a:hover{{text-decoration:underline}}
img{{max-width:100%;height:auto;border-radius:6px;margin:12px 0}}
table{{border-collapse:collapse;width:100%;font:14px/1.45 system-ui,sans-serif}} td,th{{border-bottom:1px solid var(--line);padding:7px 8px 7px 0;text-align:left;vertical-align:top}}
th{{color:var(--fg3);font-weight:500}} code{{font:13px ui-monospace,Menlo,monospace;color:var(--fg)}}
blockquote{{border-left:3px solid var(--gold);margin:0;padding-left:16px;color:var(--fg)}}
.meta{{font:12px ui-monospace,Menlo,monospace;color:var(--fg3)}}
</style></head><body><main><nav>{crumbs}</nav>
{meta}{body}
</main></body></html>
"""


def front_matter(text: str) -> tuple[dict, str]:
    if not text.startswith("---\n"):
        return {}, text
    head, _, rest = text[4:].partition("\n---\n")
    meta = {}
    for line in head.splitlines():
        k, _, v = line.partition(":")
        meta[k.strip()] = v.strip().strip('"')
    return meta, rest


def crumbs(path: Path) -> str:
    rel = path.relative_to(ROOT)
    up = "../" * (len(rel.parts) - 1)
    parts = [f'<a href="{up}index.html">pub</a>']
    for i, part in enumerate(rel.parts[:-1]):
        depth = len(rel.parts) - 2 - i
        has_index = (ROOT.joinpath(*rel.parts[: i + 1]) / "README.md").exists()
        parts.append(f'<a href="{"../" * depth}index.html">{html.escape(part)}</a>' if has_index else html.escape(part))
    return " / ".join(parts)


def social(title: str, text: str, dest: Path) -> str:
    """Open Graph / Twitter tags so shared links render a card (LinkedIn, Telegram, X)."""
    plain = re.sub(r"!\[[^\]]*\]\([^)]*\)|\[([^\]]*)\]\([^)]*\)|[#*_>`]", lambda m: m.group(1) or "", text)
    plain = re.sub(r"\||-{3,}|(?m:^\s*-\s)", " ", plain)
    plain = re.sub(r"\s+", " ", plain).strip()
    plain = plain[len(title):].strip() if plain.startswith(title) else plain
    desc = (plain[:197] + "…") if len(plain) > 200 else plain
    rel = dest.relative_to(ROOT).as_posix()
    url = BASE + (rel[: -len("index.html")] if rel.endswith("index.html") else rel)
    t, d, img = html.escape(title, quote=True), html.escape(desc, quote=True), BASE + "og.png"
    return (f'<link rel="canonical" href="{url}">\n<meta name="description" content="{d}">\n'
            f'<meta property="og:type" content="article"><meta property="og:site_name" content="tao · ai · eng">\n'
            f'<meta property="og:title" content="{t}"><meta property="og:description" content="{d}">\n'
            f'<meta property="og:url" content="{url}"><meta property="og:image" content="{img}">\n'
            f'<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">\n'
            f'<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="{img}">')


def render(src: Path, dest: Path) -> None:
    meta, text = front_matter(src.read_text(encoding="utf-8"))
    body = markdown.markdown(text, extensions=["tables"])
    body = re.sub(r'href="([^":]+?)\.md(#[^"]*)?"', lambda m: f'href="{m.group(1)}.html{m.group(2) or ""}"', body)
    body = body.replace('href="README.html"', 'href="index.html"').replace('/README.html"', '/index.html"')
    title = meta.get("title") or (re.search(r"^# (.+)$", text, re.M) or [None, "pub"])[1]
    info = ""
    if meta.get("source"):
        info = (f'<p class="meta">{html.escape(meta.get("date", ""))} · originally published at '
                f'<a href="{html.escape(meta["source"])}">{html.escape(meta["source"])}</a></p>')
    lang = "es" if "/posts/" in str(src) else "en"
    dest.write_text(PAGE.format(lang=lang, title=html.escape(title), crumbs=crumbs(dest), meta=info, body=body,
                                social=social(title, text, dest)),
                    encoding="utf-8")


def main() -> None:
    n = 0
    for src in (ROOT / "archive").rglob("*.md"):
        render(src, src.with_name("index.html") if src.name == "README.md" else src.with_suffix(".html"))
        n += 1
    print(n, "pages rendered")


if __name__ == "__main__":
    main()

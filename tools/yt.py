"""Index the public YouTube channel @notTheTaoWithAdrianMatias (titles, links, dates, descriptions).

Sources: the channel's /videos and /shorts pages (ytInitialData) + the public RSS feed (last 15,
which carries full descriptions and exact publish dates). Videos themselves are linked, not copied.
Run: python3 yt.py <out_dir> [<in_dir>]
  <in_dir> holds yt.html (/videos page), yt_shorts.html (/shorts page) and yt_feed.xml
  (https://www.youtube.com/feeds/videos.xml?channel_id=UCjJCIkiDd4M4M7hr7tFpRCA); default: beside this script.
  Fetch the pages with a consent cookie: curl -L -b "CONSENT=YES+1; SOCS=CAI" ...
"""

import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

HERE = Path(sys.argv[2]) if len(sys.argv) > 2 else Path(__file__).parent
CHANNEL = "https://www.youtube.com/@notTheTaoWithAdrianMatias"
KNOWN_DATES = {"W9m29a8pnAs": "2024-10-29", "MS-FfEgeOcQ": "2024-10-28"}


def initial_data(path: Path) -> dict:
    html = path.read_text(encoding="utf-8", errors="replace")
    m = re.search(r"var ytInitialData = (\{.*?\});</script>", html, re.S)
    return json.loads(m.group(1)) if m else {}


def walk(node, key):
    if isinstance(node, dict):
        if key in node:
            yield node[key]
        for v in node.values():
            yield from walk(v, key)
    elif isinstance(node, list):
        for v in node:
            yield from walk(v, key)


def text(t) -> str:
    if not t:
        return ""
    if "simpleText" in t:
        return t["simpleText"]
    if "runs" in t:
        return "".join(r.get("text", "") for r in t["runs"])
    if "content" in t:
        return t["content"]
    return ""


def main(out: Path) -> None:
    items: dict[str, dict] = {}
    for v in walk(initial_data(HERE / "yt.html"), "videoRenderer"):
        items[v["videoId"]] = {"id": v["videoId"], "kind": "video", "title": text(v.get("title")),
                               "when": text(v.get("publishedTimeText")), "length": text(v.get("lengthText"))}
    for v in walk(initial_data(HERE / "yt.html"), "lockupViewModel"):  # 2026 channel-grid shape
        vid, md = v.get("contentId"), v.get("metadata", {}).get("lockupMetadataViewModel", {})
        if vid and vid not in items:
            items[vid] = {"id": vid, "kind": "video", "title": md.get("title", {}).get("content", ""),
                          "when": "", "length": ""}
    sd = initial_data(HERE / "yt_shorts.html")
    for v in walk(sd, "shortsLockupViewModel"):
        vid = v.get("onTap", {}).get("innertubeCommand", {}).get("reelWatchEndpoint", {}).get("videoId")
        if vid and vid not in items:
            title = v.get("overlayMetadata", {}).get("primaryText", {}).get("content", "")
            items[vid] = {"id": vid, "kind": "short", "title": title, "when": "", "length": ""}
    for v in walk(sd, "reelItemRenderer"):
        items.setdefault(v["videoId"], {"id": v["videoId"], "kind": "short", "title": text(v.get("headline")),
                                        "when": "", "length": ""})
    ns = {"a": "http://www.w3.org/2005/Atom", "m": "http://search.yahoo.com/mrss/",
          "yt": "http://www.youtube.com/xml/schemas/2015"}
    for e in ET.parse(HERE / "yt_feed.xml").getroot().findall("a:entry", ns):
        vid = e.find("yt:videoId", ns).text
        it = items.setdefault(vid, {"id": vid, "kind": "video", "title": "", "when": "", "length": ""})
        it["title"] = it["title"] or e.find("a:title", ns).text
        it["date"] = e.find("a:published", ns).text[:10]
        d = e.find("m:group/m:description", ns)
        it["description"] = (d.text or "").strip() if d is not None else ""
    for vid, date in KNOWN_DATES.items():  # not in the 15-item feed; read from each watch page
        if vid in items:
            items[vid].setdefault("date", date)
    rows = sorted(items.values(), key=lambda r: r.get("date", "0000"), reverse=True)
    out.mkdir(parents=True, exist_ok=True)
    (out / "videos.json").write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding="utf-8")
    lines = ["# not the tao — video index", "",
             f"Public channel: [{CHANNEL}]({CHANNEL}). Linked, not re-hosted. Exact dates come from the "
             "channel feed (last 15); older items carry YouTube's relative date.", "",
             "| date | kind | title | link |", "|---|---|---|---|"]
    for r in rows:
        url = f"https://www.youtube.com/{'shorts/' if r['kind'] == 'short' else 'watch?v='}{r['id']}"
        title = r["title"].replace("|", "·")
        lines.append(f"| {r.get('date') or r['when'] or '—'} | {r['kind']} | {title} | [watch]({url}) |")
    described = [r for r in rows if r.get("description")]
    if described:
        lines += ["", "## descriptions", ""]
        for r in described:
            lines += [f"### {r['title']}", f"*{r.get('date', '')}*", "", r["description"], ""]
    (out / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(len(rows), "items;", sum(r["kind"] == "short" for r in rows), "shorts")


if __name__ == "__main__":
    main(Path(sys.argv[1]))

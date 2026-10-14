"""Archive delightfulobservaciones.blogspot.com from its public Blogger JSON feed.

One markdown file per post (front matter + body), images pulled next to them.
Run: uv run --no-project --with markdownify --with beautifulsoup4 python blog.py <out_dir>
"""

import hashlib
import json
import re
import sys
import urllib.request
from pathlib import Path

from bs4 import BeautifulSoup
from markdownify import markdownify

FEED = "https://delightfulobservaciones.blogspot.com/feeds/posts/default?alt=json&max-results=500"
UA = {"User-Agent": "Mozilla/5.0 (archive of own blog)"}


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def slug(url: str) -> str:
    return Path(url.rstrip("/")).stem


def pull_images(soup: BeautifulSoup, img_dir: Path, rel: str) -> int:
    n = 0
    for tag in soup.find_all("img"):
        src = tag.get("src", "")
        if not src.startswith("http"):
            continue
        ext = Path(src.split("?")[0]).suffix.lower()
        ext = ext if ext in {".jpg", ".jpeg", ".png", ".gif", ".webp"} else ".jpg"
        name = hashlib.sha1(src.encode()).hexdigest()[:12] + ext
        dest = img_dir / name
        if not dest.exists():
            try:
                dest.write_bytes(fetch(src))
            except Exception as e:  # keep the remote link when the image is gone
                print(f"  img miss {src[:80]} ({e})")
                continue
        tag["src"] = f"{rel}/{name}"
        parent = tag.parent  # blogger wraps images in a link to the full-size file
        if parent.name == "a" and "googleusercontent" in parent.get("href", "") + "blogspot":
            parent.unwrap()
        n += 1
    return n


def main(out: Path) -> None:
    posts, img_dir = out / "posts", out / "posts" / "img"
    img_dir.mkdir(parents=True, exist_ok=True)
    feed = json.loads(fetch(FEED))["feed"]
    index = []
    for e in feed.get("entry", []):
        url = next(link["href"] for link in e["link"] if link["rel"] == "alternate")
        date = e["published"]["$t"][:10]
        title = e["title"]["$t"].strip() or slug(url)
        labels = [c["term"] for c in e.get("category", [])]
        soup = BeautifulSoup(e["content"]["$t"], "html.parser")
        for bad in soup(["script", "style"]):
            bad.decompose()
        n_img = pull_images(soup, img_dir, "img")
        body = markdownify(str(soup), heading_style="ATX", strip=["span", "font"])
        body = re.sub(r"\n{3,}", "\n\n", body).strip()
        fname = f"{date}-{slug(url)}.md"
        fm = {"title": title, "date": date, "source": url, "labels": labels}
        (posts / fname).write_text(
            "---\n" + "\n".join(f"{k}: {json.dumps(v, ensure_ascii=False)}" for k, v in fm.items())
            + "\n---\n\n# " + title + "\n\n" + body + "\n",
            encoding="utf-8",
        )
        index.append((date, title, fname, url, len(body.split()), n_img))
        print(f"{date} {len(body.split()):>6}w {n_img:>3}img {title[:60]}")
    index.sort(reverse=True)
    lines = ["# delightful observaciones — archive", "",
             "Every post of [delightfulobservaciones.blogspot.com](https://delightfulobservaciones.blogspot.com/),"
             " pulled from its public feed. Text as published; images stored beside the posts.", "",
             "| date | post | words | original |", "|---|---|---|---|"]
    lines += [f"| {d} | [{t}](posts/{f}) | {w} | [link]({u}) |" for d, t, f, u, w, _ in index]
    (out / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"{len(index)} posts")


if __name__ == "__main__":
    main(Path(sys.argv[1]))

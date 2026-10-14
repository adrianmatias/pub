# archive — the source map

Everything Adrian Matias published in public, pulled into one place on **2026-10-14**. What a
platform can lose is copied; what is already its own durable repo is linked.

| source | status 2026-10-14 | kept here |
|---|---|---|
| [delightfulobservaciones.blogspot.com](https://delightfulobservaciones.blogspot.com/) — the blog, 2011–2026 | live, 59 posts | **full copy**: [blog/](blog/) — every post as markdown, images beside it (`tools/blog.py`) |
| [youtube.com/@notTheTaoWithAdrianMatias](https://youtube.com/@notTheTaoWithAdrianMatias) — *not the tao*, 17 videos | live | **index**: [youtube/](youtube/) — titles, dates, links, descriptions (`tools/yt.py`); the videos stay on YouTube |
| [adrianmatias.github.io](https://adrianmatias.github.io/) — CV + portfolio | live | linked only (it is its own git repo) |
| [github.com/adrianmatias/the-mirror](https://github.com/adrianmatias/the-mirror) | live | README snapshot: [github/the-mirror.md](github/the-mirror.md) |
| [ml-sandbox/ragblog](https://github.com/adrianmatias/ml-sandbox/tree/master/ragblog) | live | README snapshot: [github/ragblog.md](github/ragblog.md) |
| [ml-sandbox/tx_class](https://github.com/adrianmatias/ml-sandbox/tree/master/tx_class) | live | README snapshot: [github/tx_class.md](github/tx_class.md) |
| [github.com/adrianmatias/ml-sandbox](https://github.com/adrianmatias/ml-sandbox) | live | README snapshot: [github/ml-sandbox.md](github/ml-sandbox.md) |
| `github.com/adrianmatias/the-real-mle-challenge-adrianmatias` (as linked from the CV site) | **404** — the repo is [the-real-mle-challenge](https://github.com/adrianmatias/the-real-mle-challenge) | README snapshot of the live one: [github/the-real-mle-challenge.md](github/the-real-mle-challenge.md) |
| `github.com/adrianmatias/seedtag-doc-classification` (as linked from the CV site) | **404** — private or deleted | nothing to keep |
| [opo.taoaieng.io](https://opo.taoaieng.io/) — product site | live | linked only |
| [x.com/adrian2mat](https://x.com/adrian2mat) — *notMat*, 561 posts since 2014 | live | linked only — X serves no public timeline without login; the durable path is X's own *Download an archive* |
| [linkedin.com/in/adrianmatiasdiez](https://linkedin.com/in/adrianmatiasdiez) | live | linked only (login wall) |

Re-pull: `uv run --no-project --with markdownify --with beautifulsoup4 python tools/blog.py archive/blog`
and, after saving the channel pages, `python3 tools/yt.py archive/youtube <dir-with-pages>`; then
`uv run --no-project --with markdown python tools/render.py` to regenerate the HTML.

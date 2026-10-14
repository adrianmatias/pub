# 2026-10-14

## reply — pub is born: the archive pulled in, and Tsunami & Printing Press shipped after a 40-finding adversarial review

- **Repo.** `pub` — the public shelf, served as a static site (GitHub Pages, `.nojekyll`, no build). README (why / layout / rules / publish), AGENTS (public-only, cite-or-omit, one self-contained file per piece, no trackers), `log/`, CC BY 4.0.
- **Archive** (`archive/`, source map in `archive/README.md`): the blog in full — 59 posts, 2011–2026, markdown + images, re-rendered to static HTML by `tools/render.py`; the *not the tao* channel indexed (17 videos, dates, descriptions); READMEs of the repos the CV links to. Two dead links found on the CV site: `seedtag-doc-classification` (404) and `the-real-mle-challenge-adrianmatias` (404 — the repo is `the-real-mle-challenge`). X and LinkedIn are linked only (login walls).
- **Piece** `infog/tsunami-and-printing-press/`: one HTML file, 15 tiles on a pan-and-zoom map with three depths (map face → chart, facts, takes, bull/bear, tell → sources), read mode for phones and print, deep links (`#btc`), keyboard walk, minimap. Thesis: *AI is deflationary in what it sells and inflationary in what it buys*; the four futures are the author's own June maybes sorted into a 2×2 (boom holds or busts × the press runs or not), provisionally top-left. Each take is scored against the evidence; several score against him.
- **Evidence:** six research slices fetched on 14 Oct (`research/`), each row labelled FACT / REPORTED / FORECAST / UNVERIFIED. BTC–Nasdaq-100 daily correlation 2026 YTD computed here (r = 0.415, n = 196) and independently reproduced by the reviewer.
- **Review:** a different-family model read every node against the research: FAIL, 40 findings (24 blocking) — wrong valuation arithmetic, a false warning chronology, a rebased index read as a level, omnibus citations, positive real yields treated as proof that nothing is being printed, a byline disclosing city and profession. All fixed; the re-check found 16 partly open (mostly repeated wording and split citations) plus 2 new blockers introduced by the fixes; those were repaired and verified mechanically. Full report and dispositions in `research/review.md`.

## reply — taoaieng.io/pub comes from the user site's domain, not from this repo; the apex was taken off pub, the last step waits on DNS

- The prompt: *«serve https://adrianmatias.github.io/pub/ from https://taoaieng.io/pub»*. GitHub serves a project site under its owner's custom domain, so the path `/pub` appears only when `taoaieng.io` is set on `adrianmatias.github.io` (the CV site then answers at `taoaieng.io/`). A `cname` on this repo claims the apex instead and drops the path.
- Done: `cname` removed from this repo (`gh api -X PUT repos/adrianmatias/pub/pages -F cname=null`); `adrianmatias.github.io/pub/` serves again. README › publish and AGENTS now say how it works and that this repo carries no domain.
- Waiting on DNS: `taoaieng.io` still resolves to the Squarespace page through Cloudflare. Setting the domain on the user site before DNS moves would redirect the CV site to that page, so it was not set.

## reply — the root of taoaieng.io still pointed to Squarespace; the domain was taken off the user site until the DNS was fixed (done by mat, now live)

- The four apex `A` records were still Squarespace's (proxied), and `_domainconnect` had been changed instead of them. With the domain on the user site, both the CV site and pub redirected to "Coming Soon", so I removed it again (`-F cname=null`) until the apex pointed to GitHub. mat then fixed the apex and set the domain: `taoaieng.io` → `185.199.108–111.153`, `taoaieng.io/` serves the CV site, `taoaieng.io/pub/` serves pub.

## reply — link previews: every page now carries Open Graph + Twitter-card tags, and the two front pages have their own 1200×630 card

- Why there was no preview: the pages had a `<title>` and nothing else. LinkedIn and Telegram build the card from `og:title`, `og:description` and `og:image`, and the image needs an **absolute** URL.
- Added: `og:*`, `twitter:*` (`summary_large_image`) and `canonical` on the home page, the piece and all 68 archive pages (`tools/render.py` now writes them; descriptions come from each page's opening text). New images: `og.png` (the pub card) and `infog/tsunami-and-printing-press/og.png` (the map with the title over it), both 1200×630 PNG. AGENTS records the one exception to relative links (preview metadata is absolute, `https://taoaieng.io/pub/…`).
- Caches: LinkedIn and Telegram keep the first, empty result they fetched. Refresh LinkedIn at https://www.linkedin.com/post-inspector/ (paste the URL, *Inspect*), and Telegram by sending the URL to @WebpageBot. Sharing `https://taoaieng.io/pub/` with the trailing slash skips one redirect.

# pub

**The public shelf.** What Adrian Matias makes to be read by strangers — infographics, essays, the
archive of what he already published elsewhere — in one repo that is also the website
[taoaieng.io/pub](https://taoaieng.io/pub/).

3-char, like the rest of the house (`pat`, `oof`, `opo`, `dsp`): `pub` is the outward half. The
vaults stay private and breathe in; `pub` breathes out.

## why

Things published on borrowed platforms rot: a blog host changes its feed, a video platform buries an
upload, a link on a CV goes 404. A plain git repo of static files outlives all of them. Every piece
here is a single self-contained file — no build step, no tracker, no external font or script — so
it opens from disk in twenty years exactly as it opens today.

## layout

```
index.html                  the home page (taoaieng.io/pub): pieces, archive, links
infog/<slug>/index.html     one infographic per folder, self-contained (data, charts and sources inline)
archive/                    what was published elsewhere, pulled and kept
  blog/                     delightfulobservaciones.blogspot.com — every post as markdown + its images
  youtube/                  not the tao — index of every video (linked, not re-hosted)
  github/                   READMEs of the repos the CV links to, snapshotted
  README.md                 the source map: every public link, its status, what was kept
tools/                      blog.py + yt.py pull the archive; render.py turns its markdown into static HTML
log/                        mat.md + agt.md — the append-only trail
AGENTS.md                   agent contract
```

## pieces

| date | piece | what |
|---|---|---|
| 2026-10-14 | [Closing Doors](infog/closing-doors/) | data science in the age of agents — the tunnel face, classic ML, the copilot years, agent orchestration and the next rung on one zoomable map, his own experiments and takes scored |
| 2026-10-14 | [Tsunami & Printing Press](infog/tsunami-and-printing-press/) | money in the age of AI — bitcoin, zcash, bonds, equity, housing, the yen carry trade, quantum FUD and the AI capex sink, on one zoomable map with every number sourced |

## rules

- **Public only.** Nothing private, nothing personal: no holdings, no positions, no addresses, no
  family. A take may be quoted; the person's affairs never are.
- **Cite or omit.** Every number carries its source and its date. A gap is drawn as a gap.
- **Self-contained.** One file per piece. Inline CSS/JS/SVG. No CDN, no analytics, no cookies.
- **Not advice.** Pieces are arguments with evidence, not recommendations.

## publish

GitHub Pages serves the repo root (`master`, `/`, `.nojekyll` — no build). Push to `master` and it is
live at `adrianmatias.github.io/pub/`.

`taoaieng.io/pub/` comes from the **user site**, not from this repo: a project site is served under
its owner's custom domain, so setting `taoaieng.io` on `adrianmatias.github.io` maps this repo to
`taoaieng.io/pub/` (and the CV site to `taoaieng.io/`). This repo must keep **no** custom domain of
its own — a `cname` here would claim the apex and drop the `/pub` path. Order matters:

1. DNS first (Cloudflare, zone `taoaieng.io`): replace the apex records that point to Squarespace with
   `CNAME @ → adrianmatias.github.io`, **DNS only** (grey cloud); same for `www`. `opo` is untouched.
2. Then `gh api -X PUT repos/adrianmatias/adrianmatias.github.io/pages -f cname=taoaieng.io`, and
   *Enforce HTTPS* once the certificate is issued. Doing step 2 before step 1 redirects the CV site
   to the Squarespace page.

## license

[CC BY 4.0](LICENSE) — reuse anything with attribution.

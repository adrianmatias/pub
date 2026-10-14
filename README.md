# pub

**The public shelf.** What Adrian Matias makes to be read by strangers — infographics, essays, the
archive of what he already published elsewhere — in one repo that is also the website
[taoaieng.io](https://taoaieng.io).

3-char, like the rest of the house (`pat`, `oof`, `opo`, `dsp`): `pub` is the outward half. The
vaults stay private and breathe in; `pub` breathes out.

## why

Things published on borrowed platforms rot: a blog host changes its feed, a video platform buries an
upload, a link on a CV goes 404. A plain git repo of static files outlives all of them. Every piece
here is a single self-contained file — no build step, no tracker, no external font or script — so
it opens from disk in twenty years exactly as it opens today.

## layout

```
index.html                  the home page (taoaieng.io): pieces, archive, links
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
| 2026-10-14 | [Tsunami & Printing Press](infog/tsunami-and-printing-press/) | money in the age of AI — bitcoin, zcash, bonds, equity, housing, the yen carry trade, quantum FUD and the AI capex sink, on one zoomable map with every number sourced |

## rules

- **Public only.** Nothing private, nothing personal: no holdings, no positions, no addresses, no
  family. A take may be quoted; the person's affairs never are.
- **Cite or omit.** Every number carries its source and its date. A gap is drawn as a gap.
- **Self-contained.** One file per piece. Inline CSS/JS/SVG. No CDN, no analytics, no cookies.
- **Not advice.** Pieces are arguments with evidence, not recommendations.

## publish

GitHub Pages serves the repo root (`master`, `/`, `.nojekyll` — no build). Push to `master` and it is
live at `adrianmatias.github.io/pub/`; with the DNS step below it is also `taoaieng.io`.

Custom domain, once: in Cloudflare (DNS for `taoaieng.io`) replace the apex records that point to
Squarespace with `CNAME @ → adrianmatias.github.io`, **DNS only** (grey cloud); then
`gh api -X PUT repos/adrianmatias/pub/pages -f cname=taoaieng.io` and tick *Enforce HTTPS* once the
certificate is issued. `opo.taoaieng.io` is a separate record and is not affected.

## license

[CC BY 4.0](LICENSE) — reuse anything with attribution.

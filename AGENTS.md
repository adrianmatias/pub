# PUB — agent contract

Portable project rules. Auto-loaded when cwd is this repo root. This repo is **public** and is
served as a website: everything committed is published the moment it is pushed.

## entry (every session)

1. Read `README.md` (why, layout, rules).
2. Read the **latest prompt at the bottom of `log/mat.md`** — that is the task.
3. Do the work. Validate. Append `log/agt.md`.

## log

- `log/mat.md` — mat's log. Append-only. The task is the latest prompt at the bottom.
- `log/agt.md` — the agent's replies. Append-only, one entry per round, **H1 = `# YYYY-MM-DD`**,
  topic subsections under `##`. Never rewrite, reorder or delete earlier entries.

## do

- One piece = one folder = one self-contained `index.html` (inline CSS/JS/SVG, data embedded). It
  must open from `file://` with the network off.
- Cite or omit: every number has a source URL and an as-of date inside the piece. Label evidence
  (FACT / REPORTED / FORECAST / UNVERIFIED). Never interpolate a number.
- Load-bearing pieces get an adversarial review by a **different model family** than the author
  before they ship; the findings and their fixes go in `log/agt.md`.
- Archive by re-running `tools/` scripts, not by hand-editing `archive/`. Archived text stays as
  published.
- Relative links only: the site is served at `adrianmatias.github.io/pub/` and `taoaieng.io/pub/`.
  The one exception is link-preview metadata (`og:*`, `twitter:*`, `canonical`): crawlers need
  absolute URLs, so those point at `https://taoaieng.io/pub/…`. Every page carries them; a piece
  ships an `og.png` (1200×630) beside its `index.html`.
- Pieces share one map engine (`infog/closing-doors/research/src/engine.js`). On phones (≤ 700 px) and in read mode a piece renders as a feed: an ordered column of cards (`DATA.eras` or `DATA.sections`), each opening to its evidence. Check both: no clipped tile on desktop, nothing past the right edge on a 390 px phone with every card open.
- Never set a custom domain on this repo; `taoaieng.io` belongs to the user site (see README › publish).
- English for pieces and logs; quotes keep their original language with a translation beside them.

## don't

- Don't commit anything private: holdings, positions, amounts, addresses, phone numbers, family
  members, health, employers' internal material, or anything from a private vault that is not an
  idea. When in doubt, leave it out. The one exception is `archive/`: it keeps, as published, what
  mat already chose to publish himself (his blog names his daughters; that stays his choice, and
  no new piece adds to it).
- Don't add trackers, analytics, cookies, external fonts or CDNs.
- Don't present a piece as financial advice or a forecast as a fact.
- Don't copy the CV here: it lives in `adrianmatias.github.io` and is linked.

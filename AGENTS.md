# PUB: agent contract

Portable project rules. Auto-loaded when cwd is this repo root. This repo is **public** and is
served as a website: everything committed is published the moment it is pushed.

## entry (every session)

1. Read `README.md` (why, layout, rules).
2. Read the **latest prompt at the bottom of `log/mat.md`**: that is the task.
3. Load any matching skill from `skills/` (table below), then only the files the task needs.
4. Do the work, verify mechanically, compress the round, and append `log/agt.md`.

## log

- `log/mat.md`: mat's log. Append-only. The task is the latest prompt at the bottom.
- `log/agt.md`: the agent's replies. Append-only, one entry per round, **H1 = `# YYYY-MM-DD`**,
  topic subsections under `##`. Never rewrite, reorder or delete earlier entries.

## rhythm & proof

- **Expand, then compress.** Build or research wide, then fold what survived into fewer lines and
  concepts. Every round ends compressed (`skills/compress`); one fact lives in one home.
- **Proof over prose.** Verify counts in code, URLs against sources, and rendered HTML in headless
  Chromium before claiming done. Every review finding gets an explicit disposition (accept, defer,
  or reject with counter-evidence) in `log/agt.md`.

## writing

- **No AI watermark or AI smell** in any authored page, essay, map tile, doc, or log entry. Avoid
  em-dashes (`—`), en-dashes (`–`) in prose, rhetorical "not X, but Y" contrasts, catchy or salesy
  phrasing ("beyond demos", "thin wrappers", "high-agency", "seam", "lightning-strike",
  "rare leverage", "compare notes"), and filler listicles.
- **Voice:** plain, direct, calm, detached (Zen). Use simple ASCII punctuation (periods, commas,
  colons, parentheses) and clear, grounded sentences closer to mat's own prose. State facts and
  arguments plainly without pitching. (`archive/` is exempt: archived text stays as published.)

## roles and models

| role | model (2026-11) | effort |
|---|---|---|
| director | mat | - |
| integrator | `claude-opus` (plan, fixed cost) or `gemini-4` (pay-per-token complement) | high |
| lane | `deepseek-v4.1-flash` on the DeepSeek API | max |
| critic | distinct family from author (`claude-opus` <-> `gemini-4` <-> `deepseek-v4.1-flash`) | high |

## skills

| skill | use when |
|---|---|
| `review` | a piece or major change needs an independent critic from another family |
| `delegate` | research slices or checks fan out to subagents |
| `compress` | a round ends, or pieces, docs or skills have grown |
| `dream` | logs outpace docs or pieces: replay, pair, judge |
| `harvest` | distilling shared rules into `pub` or promoting a general lesson up |

## do

- One piece = one folder = one self-contained `index.html` (inline CSS/JS/SVG, data embedded). It
  must open from `file://` with the network off.
- Cite or omit: every number has a source URL and an as-of date inside the piece. Label evidence
  (FACT / REPORTED / FORECAST / UNVERIFIED). Never interpolate a number.
- Load-bearing pieces get an adversarial review by a **different model family** than the author
  before they ship (`skills/review`); the findings and their dispositions go in `log/agt.md`.
- Archive by re-running `tools/` scripts, not by hand-editing `archive/`. Archived text stays as
  published.
- Relative links only: the site is served at `adrianmatias.github.io/pub/` and `taoaieng.io/pub/`.
  The one exception is link-preview metadata (`og:*`, `twitter:*`, `canonical`): crawlers need
  absolute URLs, so those point at `https://taoaieng.io/pub/...`. Every page carries them; a piece
  ships an `og.png` (1200x630) beside its `index.html`.
- Pieces share one map engine (`infog/closing-doors/research/src/engine.js`). Every device opens
  on the zoomable map (phones land on `z-far` whole-graph overview and can zoom out one extra level
  via `-` or pinch; a second tap on a focused `l0` tile, `read`, or `#read` switches to the feed of
  `DATA.eras` or `DATA.sections`). Check desktop (no clipped tile), landscape/portrait phone
  (`z-far` -> `l0` -> `read`), and 390 px feed with every card open (no horizontal overflow).
- Never set a custom domain on this repo; `taoaieng.io` belongs to the user site (see README).
- English for pieces and logs; quotes keep their original language with a translation beside them.
- Do not push unless mat says so.

## don't

- Don't commit anything private: holdings, positions, amounts, addresses, phone numbers, family
  members, health, employers' internal material, or anything from a private vault that is not an
  idea. When in doubt, leave it out. The one exception is `archive/`: it keeps, as published, what
  mat already chose to publish himself (his blog names his daughters; that stays his choice, and
  no new piece adds to it).
- Don't add trackers, analytics, cookies, external fonts or CDNs.
- Don't present a piece as financial advice or a forecast as a fact.
- Don't copy the CV here: it lives in `adrianmatias.github.io` and is linked.

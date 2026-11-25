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

## reply — the piece links back to pub, and the map's link labels are readable at every zoom

- **Parent link:** the breadcrumb now starts with `pub ›` (→ `../../`, i.e. `taoaieng.io/pub/`), on the map and in read mode.
- **Readable links:** the labels were SVG text inside the world, 34 world-px — about 6 screen-px on the whole-map view. They are now screen-space chips (10 px mono on a dark pill) that follow the map and stay the same size at any zoom. When you zoom into a tile, only that tile's links stay lit. Clicking a chip flies to the two tiles it connects.
- **Placement:** each label sits where its curve crosses open ground. For every link the bend is chosen so the midpoint lands off every tile and clear of other labels. The grid pitch went from 1500 × 1200 to 1800 × 1480, so the gaps can hold a label; the lines got a little more contrast. Long links now arc around the tiles instead of running under them.
- `og.png` re-rendered on the new layout. Checked headless on the whole-map, tile and link-click views.

## reply — Closing Doors, built and reviewed, kept offline on branch `draft/closing-doors` (not pushed)

- **Piece:** `infog/closing-doors/` — 18 tiles on the same zoomable engine. Columns are eras (2007 → 2030); rows are the field, his practice and the evidence. Each tile has sources inline. `research/` holds what the four research slices could not establish, the adversarial review, and `src/` (the readable data plus `build.py`).
- **Review:** `openai/gpt-6.1-sol`, a different model family from the author. Round 1 FAIL: 11 blockers and 14 should-fix. Round 2 (re-check of the fixes only): 21 resolved, 4 partly, 1 new; all five were then fixed. See `research/review.md`.
- **Offline:** only the branch exists, nothing is pushed, and the piece carries `noindex` and a "draft · offline" pill. To publish: drop both, merge into `master`, push.

## reply — Closing Doors rebuilt: chronology drives the map, the clock speeds up, 2026 gets four columns, and phones get a chronological feed instead of a shrunken map

- **Map:** columns are eras whose spans shrink — 8 years, 7, 3, then Jan–Mar, Apr–Jul and Aug–Sep 2026, then Oct 1–14, then 2027–30. The rows stay field / practice / evidence. There are five new 2026 tiles (*the yardsticks bend*, *one GPU, one wiki*, *relevant or faithful*, *the contract*, *the boundary, not the language*), and the thesis carries a month-by-month 2026 strip.
- **Phone:** under 700 px (and in read mode) the same tiles become a chronological feed. Each era has a sticky header showing its span; each card shows its headline number and opens to the evidence. Charts and diagrams are redrawn narrow, and sources fold away.
- **Review:** the same reviewer as before, different family from the author. Round 3 FAIL with 9 blockers; round 4 PASS, 15 of 15 resolved. See `research/review.md`.
- Still offline: this branch is not pushed.

# 2026-10-15

## reply — both pieces live with the phone feed: Tsunami & Printing Press ported to the shared engine, Closing Doors published

- **Tsunami:** the same engine as *Closing Doors*. On phones it reads as a feed in the order of its argument: the two forces → hard money → what else they move → where it leaves us. The content, data and sources are byte-identical, and the desktop map is unchanged.
- **Closing Doors:** `noindex` and the "draft · offline" pill removed; merged into `master` with its two draft commits.
- Home page card and meta updated; AGENTS records the shared engine and the two checks (desktop clipping, 390 px phone overflow).

# 2026-11-20

## reply — mobile extra zoom-out on the map for both pieces; Closing Doors updated with Oct–Nov engineering learnings

- **Mobile map & extra zoom-out (`style.css`, `extra.css`, `engine.js`, `build.py`, `port_tsunami.py`, `AGENTS.md`):**
  - Removed the forced phone redirect into scroll-only `body.read`; every viewport now opens on the zoomable graph map (`#read` or the `read` button still opens the feed directly).
  - Lowered `minScale()` to `Math.min(0.008, fitRect(BOUNDS, .96).s * 0.42)` (was clamped at `0.03`), added `−` / `+` zoom buttons in `#tools` (plus `-`/`+` shortcuts), and added a `z-far` overview layer (`.lm` short title + metric, hue-colored borders, thickened edges, non-hot chips hidden, boosted `.band` contrast) when `W * cam.s < 78px` so the whole graph structure reads cleanly on 390 px phones and at one extra zoom-out level.
  - Switched `o1` from viewport fraction to screen-pixel tile width (`(tilePx - 480) / 180`), added synchronous snap when `flyTo` has `ms <= 1`, enlarged chip clearance + arc candidates (`±2800/3200`) so desktop chips stop overlapping, and added a second-tap fallback on focused `l0` tiles when `o1 < 0.5` (covering both portrait `390×844` and landscape `844×390`).
  - Propagated the shared CSS, `#tools`/`#hint`/`#help` updates, and `engine.js` to `infog/tsunami-and-printing-press/index.html` via `port_tsunami.py` (`S` and `DATA` untouched).
- **Closing Doors Nov 20 update (`data.js`, `tiles2026.js`, `index.html`):**
  - Added column `gx: 4` (`2026 · Oct 15 – Nov 20 · distil & prove`, shifting `2027 – 2030` to `gx: 5`) with two tiles: *Distil, don't link* (router retired, walking skeleton → distil the LLM out, AST ontology, schema as prompt, deliberate redundancy under line budgets, expand/compress + dream loop + 3-family routing) and *Proven gates, public surface* (witness-proven gates `--prove`, public-surface tests + CRAP vs helper unit suites, inert checks, detached-worktree pre-push). Zero closed-repo, client, or internal count details disclosed.
  - Corrected `contract` (`tiles2026.js`): aligned strictly with the public CV (two separate lanes — expert scoring sheets vs unstructured document ingestion with quoted provenance, quoted requirements as a contract artifact, typed schema) and kept rubric scoring distinct from a label-calibrated judge.
- **Adversarial review (`claude-opus-5-5`, cross-family from author `gemini-4-hydrogen`):** 7 findings (1 blocker, 5 should-fix, 1 note), all 7 accepted and fixed:
  1. *(blocks)* `contract` cited non-public engagement details under the public CV — trimmed back to public CV claims + unattributed general lessons.
  2. *(should-fix)* `contract` verdict compared unmeasured calibration and misstated baseline/replacement claims — rewritten non-comparatively.
  3. *(should-fix)* `distil`/`gates` exposed closed-repo internal counts, line budgets, and incident specifics — stripped internal figures and standardized private-note sources to `20 Nov 2026`.
  4. *(should-fix)* `house` `data.js` named a specific gate count on a private project — neutralized to `"deterministic gates"` (pre-existing Oct 14 published vault-log labels retained).
  5. *(should-fix)* Landscape `844×390` tapped tiles stayed at `o1 = 0` without read fallback — removed `vw() <= 700` gate on `focus === n && o1 < .5` and added `(max-height:560px)` cue.
  6. *(should-fix)* `AGENTS.md` still documented phone feed-first boot — updated to match the map-first contract.
  7. *(note)* `port_tsunami.py` missed `−/+` in `#hint` and `#help` — updated both strings.
- **Verification (headless Chromium, local `file://`):** `closing-doors` (`1440×900` `z0` `s=0.0853`, `390×844` `z-far` `s=0.0231` → extra `−` `s=0.0134` → `l0` `s=0.3055` → `read` `scrollW=390`, `844×390` tap-2 `read` open); `tsunami-and-printing-press` (`1440×900` `z0` `s=0.1536`, `390×844` `z-far` `s=0.0416` → extra `−` `s=0.0241` → `l0` `s=0.3055` → `read` `scrollW=390`, `844×390` tap-2 `read` open); closed-repo/client privacy scan clean.

## reply — harvested down from ini into pub; new infographic `infog/ini/` built, reviewed, and held locally for inspection

- **Harvest down (`AGENTS.md`, `skills/{review,delegate,compress,dream,harvest}/SKILL.md`):**
  - Distilled into `pub`'s own terms with no dependency, symlink, or pointer back: expand/compress rhythm, proof-over-prose checks, three-family role routing, and a 1:1 `## skills` table in `AGENTS.md` (78/120 lines). Five plain-file skills added under `skills/`: `review` (51/150), `delegate` (53/150), `compress` (36/150), `dream` (41/150), `harvest` (29/150), all descriptions 54–58/60 chars starting with `"Use when"`.
  - Declined (do not apply to a static HTML site with no Python package): `ci/`, `pyproject.toml`, `uv.lock`, `.githooks/pre-push`, `code-standard.md`, `domain.md`, `skills/{kickoff,mode,restructure}`. Preserved every `pub` invariant.
- **New piece `infog/ini/` (*ini: Distil, Don't Link*):**
  - Built via `infog/ini/research/src/build.py` reusing the shared CSS and `engine.js` from `infog/closing-doors/research/src/` into one self-contained offline HTML (`infog/ini/index.html`, 133 KB) plus a 1200×630 Open Graph card (`infog/ini/og.png`).
  - Architecture: 18 tiles across 5 pillars (**I · Direction**, **II · Shape**, **III · Proof**, **IV · Rhythm**, **V · Flow**) × 3 layers (**principles**, **machinery**, **evidence**) + crown row (*the steering ladder*, *the thesis*, *method & limits*), 21 screen-space links, 7 custom inline SVG diagrams with narrow phone equivalents, and argument-order `DATA.sections` feed. Every count, quote, gate threshold, and date verified directly from `ini` v0.3.0 on disk (`uv run pytest` 16 passed; `uv run python -m ci gates` 13/13 green).
  - Updated `index.html` (new top piece card, `.piece + .piece` spacing, OG/Twitter descriptions) and `README.md` (`skills/` layout row + pieces table).
- **Adversarial review (`claude-opus-5-5`, cross-family from author `gemini-4-neon`):** 13 findings (0 blockers, 6 should-fix, 7 notes); 12 accepted and fixed, 1 repo-hygiene note deferred to director before push:
  1. *(should-fix · accept)* CRAP coverage threshold for complexity 6 was `~56%` (yields 9.07 > 8) — fixed to `~62%` (`1 − (2/36)^(1/3) = 61.8%`).
  2. *(should-fix · accept)* `arXiv:2602.11988` evaluated SWE-bench + 12 repos, not 60,000+ (60,000+ is public adoption) — split adoption clause from study sample.
  3. *(should-fix · accept)* Gate split was `9 + 4` with `docs` counted as custom; `docs` runs ruff — fixed to `10 tool-backed + 3 custom AST/file` (`shape`, `domain`, `harness`) and matched README's four highlighted areas (`domain`, `shape`, AST `ontology`, `docs`).
  4. *(should-fix · accept)* Evolution span (`48 hours`) and `0.2.0` `origin` timing inaccurate — fixed to `18 Nov 2026` with `origin` as a short-lived step between `0.2.0` and `0.3.0`.
  5. *(should-fix · accept)* Ledger wording (`0 extra defects` → `prevented no defect`) and stray `[5]` citation on chart — fixed both.
  6. *(should-fix · accept)* `log/agt.md` entry added in this close; 18 Nov critic no longer attributed to `claude-opus-5-5` (author/critic cross-family confirmed: `gemini-4-neon` vs `claude-opus-5-5`).
  7. *(note · accept)* `non-Python repos` cited `ini/skills/harvest` — re-cited to `ini/log/agt.md` (non-code vault evidence) + `pub/AGENTS.md`.
  8. *(note · accept)* `dream` sampling unit `files` → `pairs` in both `data.js` and `viz.js`.
  9. *(note · accept)* `PYTHONPATH` `stripped`/`cleared` → `inherited PYTHONPATH replaced by the project's src`.
  10. *(note · accept)* Restored full verbatim quote from `foundation.md` §1 on `objective` tile.
  11. *(note · accept)* Uncoupled the 4 lenses from specific tiers in `steeringSVG()`/`steeringHTML()` into a separate `FOUR LENSES` box matching `foundation.md`.
  12. *(note · accept)* Tightened three overstatements: `empty exit-1` → `empty failure`, `16 copy-based behaviour tests` → `16 behaviour tests, most starting a fresh copy of ini`, `now propagating` → `queued to propagate`.
  13. *(note · accept-and-defer)* Untracked root symlink `pat -> ../pat` and local path `~/pro/ini` in `log/mat.md` flagged for director before staging/pushing (nothing committed or pushed).
- **Verification (headless Chromium, local `file://`, post-fixes):** `1440×900` `z0` `s=0.138` (`18` tiles, `21` chips, `0` clipped tiles, `0` chip-chip overlaps, `0` band overlaps, `0` `l1` vertical overflows, `0` bad cites, `0` raw brackets, `0` console/page errors); `390×844` `z-far` `s=0.0416` → `−` `s=0.0241` → `l0` `s=0.3055` → `read` all 18 cards + sources open `scrollW=390` (`0` overflow); `844×390` tap-2 `read` open; `og.png` visually verified at 1200×630.
- **Pre-push flags for mat:** (a) `https://github.com/adrianmatias/ini` still returns `PRIVATE` / HTTP 404 on GitHub — flip it to public before pushing `pub` so source links resolve; (b) confirm whether to ignore/exclude the untracked `pat` symlink and whether to keep or redact `~/pro/ini` in `log/mat.md` before pushing.

# 2026-11-23

## reply — cleaned `pat` symlink; recentered `infog/ini/` on domain & OOP modular abstraction

- **Cleaned `pat/` (`unlink /home/mat/pro/pub/pat`):** removed the untracked root symlink (`pat -> ../pat`); `/home/mat/pro/pat` untouched, no git hooks, `.git/info/exclude` entries, or tracked `pat` installation files in `pub`.
- **Recentered `infog/ini/` (*ini: Constraining the Generative*):**
  - Elevated the core AI engineering thesis to the title, hero tile (`thesis`), OG card (`og.png`), `index.html`, and `README.md`: constraining the generative nature of LLMs into typed, deterministic, modular abstractions — via domain modelling, object orientation, and witness-proven gates — to counterbalance hallucination, untested claims, and unbounded complexity.
  - Reordered the 5-pillar map so **III · Domain & OOP** forms a continuous central gold spine (`thesis` → `domain` *vs hallucination* → `shape` *OOP modular abstraction vs unbounded complexity* → `testing` *public-surface & CRAP contracts*), flanked by **II · Proof** (`proof` → `gates` → `ratchet`) on the left and **IV · Rhythm** (`rhythm` → `delegate` → `dream`) on the right. Added `counterbalanceSVG()` / `counterbalanceHTML()` on `thesis`, moved `paradoxSVG()` / `paradoxHTML()` onto `distil` (`V · Flow`), and put **III · Domain & OOP** first in the mobile feed (`DATA.sections`).
- **Resolved pre-push flag:** verified `https://github.com/adrianmatias/ini` is now `PUBLIC` (HTTP 200).
- **Adversarial review (`claude-opus-5-5`, cross-family from author `gemini-4-neon`):** 10 findings (0 blockers, 3 should-fix, 7 notes); 9 accepted and fixed, 1 outside-diff hygiene note logged:
  1. *(should-fix · accept)* `domain` tell extended `wiki/learnings.md:34–35` — aligned to source wording (*"kept the codebase from a pile of functions correcting one another"*).
  2. *(should-fix · accept)* `thesis` lede cited `[1][2]` on the 3-axis framing — removed `[1][2]` from the framing sentence and kept citations on `ini`'s mechanisms.
  3. *(should-fix · accept)* `distil` & `tells` version labels (`0.1`, `origin` under `0.2.0`) didn't match git — fixed to *"a first package draft, then `0.2.0` (`base/`); `origin` drafted next, both cut in `0.3.0`"*.
  4. *(note · accept)* `thesis` *"vs Untested Claims"* cell mentioned critic under `[1][3]` — dropped critic from that cell (covered on `delegate`).
  5. *(note · accept)* `shape` lede now cites `[5]` (Python 3.14 What's New) on the 3.14 feature clause.
  6. *(note · accept)* `shape` ledger chart relabelled 1,384 LOC row to `"Python + pydantic + beartype"` (`1,384 · 2 deps`) and aligned caption to `"gates and the boundary"`.
  7. *(note · accept)* `testing` chart caption separated the two `learnings.md §4` bullets (74→45 files vs 41 unit files / 367 private names on 6 Nov 2026).
  8. *(note · accept)* `testing` tell kept verbatim `code-standard.md:65` (*delete*) and `code-standard.md:68` (*must not rewrite the suite*).
  9. *(note · accept)* `thesis` `.big` unit spelled out `"3 drifts → 1 discipline"`.
  10. *(note · accept-and-defer)* `log/mat.md:11,61` still holds `~/pro/pub` and `~/pro/ini` (mat's own prompt text, confirm before push); `ini/now.md:26` (*"Make the repository public"*) is now stale in `~/pro/ini`.
- **Verification (headless Chromium, local `file://`, post-fixes):** `1440×900` `z0` `s=0.138` (`18` tiles, `21` chips, `0` clipped tiles, `0` chip overlaps, `0` band overlaps, `0` `l1` overflows, `0` bad cites, `0` raw brackets, `0` errors); `390×844` `z-far` `s=0.0416` → `−` `s=0.0241` → `l0` `s=0.3055` → `read` all 18 cards + sources open `scrollW=390`; `844×390` tap-2 `read` open; `og.png` rebuilt (1200×630) and visually verified. Held locally, nothing pushed.

## reply — updated `infog/ini/` with Deutsch conjectures (`c1–c8`) and `dream.py`

- **Synced `infog/ini/` with `ini` commit `8b4d424` (`2026-11-23`):**
  - Updated `dream` tile (*Conjectures & dream loop*, `c1–c8` · `3 open · 2 promoted · 3 destroyed`), `dreamSVG()`/`dreamHTML()` in `viz.js` (including widened `560`-px diagram boxes for clean label padding), and the `31 Dec` scorecard + `c1–c3` row in `tells` (`data.js`).
  - Updated every shifted count and rule verified from `ini` on disk: knowledge `830 → 848` lines (`foundation.md` `95`, `code-standard.md` `104`, `wiki/learnings.md` `99`, 8 skills `550`), `35` lessons in `wiki/learnings.md` (`9/4/5/8/5/4`, adding *Record negative knowledge* and *conjectures stall*), `14` `.tmpl` files (adding `wiki/conjectures.md.tmpl`), `18` behaviour tests (`test_skills.py` + `test_gates.py`), `ci/tests` `462` lines (`1,764` prod + `462` test = `2,226` total), `AGENTS.md` `76/120`, and all 8 individual skill budget bars (`56–89/150`). Fixed literal backticks in `kickoff` box on `skills` tile.
  - Updated `pub/index.html`, `pub/README.md`, and `build.py` (`help` date `23 Nov 2026`); rebuilt `infog/ini/index.html` (140.7 KB) and `infog/ini/og.png` (1200×630).
- **Adversarial review (`claude-opus-5-5`, cross-family from author `gemini-4-hydrogen`):** 5 findings (0 blockers, 2 should-fix, 3 notes); 3 accepted and fixed, 2 accepted-and-deferred/noted:
  1. *(should-fix · accept)* `tells` `31 Dec` row misstated `c2` as `empty ci/ceilings.json` — fixed to match `c1–c3` (`distil-vs-link refresh cost (c1)`, `compounding within budget (c2)`, `pre-3.14 gate transfer (c3)`).
  2. *(should-fix · accept)* `gates` chart had stale `369` test lines from `20 Nov` — verified `wc -l ci/tests/*.py = 462` on disk (`1,764 + 462 = 2,226`) and updated chart + caption to `23 Nov 2026`.
  3. *(note · accept)* `dream` & `viz.js` credited Pydantic for the quote check itself — clarified `Candidate` parses rows while `Wiki.grounded` runs a normalised substring match (`≥20` chars).
  4. *(note · accept-and-defer)* `infog/ini/` still carries `20 Nov 2026 · updated 23 Nov 2026` before first push — confirm whether to collapse to the push date when pushing `pub`.
  5. *(note · defer to ini)* `ini`'s own `c5` row still says *"two cross-family passes"* — no edit to `ini` from `pub`; flag for next `ini` round.
- **Verification (headless Chromium, local `file://`, post-fixes):** `1440×900` `z0` `s=0.1376` (`18` tiles, `21` chips, `0` clipped tiles, `0` chip overlaps, `0` band overlaps, `0` `l1` overflows, `0` bad cites, `0` raw brackets, `0` errors); `390×844` `z-far` `s=0.0416` → `−` `s=0.0241` → `l0` `s=0.3055` → `read` all 18 cards + sources open `scrollW=390`; `844×390` tap-2 `read` open; `dreamSVG()`, `skills`, and `og.png` visually inspected. Held locally, nothing pushed.

## reply — commit, push, publish

- **Committed and pushed** the harvest-down (`AGENTS.md` + 5 distilled skills), the new `infog/ini/` piece (*ini: Constraining the Generative*, `20 Nov 2026 · updated 23 Nov 2026`), the `pat` symlink removal, and the `2026-11-23` round logs.
- **Verified on the live site** (GitHub Pages, `master`): `https://taoaieng.io/pub/` lists the three pieces and `https://taoaieng.io/pub/infog/ini/` (plus `og.png`) returns the built HTML with the conjectures/dream additions.


# 2026-11-25

## reply — `pub` v2 staged locally: 90-second shelf upgrade + two essays (`ambiguity-to-production`, `sovereign-ai`) + map cross-links

- **Shelf upgrade (`index.html`, `README.md`):**
  - Updated lede around framing ML/agentic systems, proving boundaries red, and measuring what holds when models commoditize.
  - Added a 4-row `start here (90-second path)` guide above `essays & playbooks` and `zoomable maps`.
  - Updated `elsewhere` links (`taoaieng.io`, `taoaieng.io/principles/`, `github.com/adrianmatias/ini`).
- **New essay `essays/ambiguity-to-production/` (`index.html` + `og.png`, 1200×630):**
  - Six-stage ML & agentic deployment playbook (*Decision & error cost → Rules/ML/DL/LLM rung → Typed wire & provenance → Hidden fold & HITL eval → Red gates & parity → Handover & kill rule*), inline qualitative SVG distillation diagram, 6 sourced citations (`arXiv:2603.25773`, `ini` v0.3.0, `Closing Doors` `#oof`, Scale Labs SWE-Bench Pro V2, Stack Overflow 2026, `taoaieng.io/principles/`). Zero client names or confidential employer material.
- **New essay `essays/sovereign-ai/` (`index.html` + `og.png`, 1200×630):**
  - Geopolitical, industrial, silicon, and monetary critique of the closed-AI capture thesis — **strictly anonymized** (zero mention of any private PDF/report, zero verbatim quotes or proprietary figures from it) — paired with lived local-first practice across three public layers: **Layer 1** `ragblog` on one 16 GB consumer GPU (52 posts / 904 chunks, Ragas 16-case scores, Ep 0014), **Layer 2** `The Mirror` / public Uqbar compiled-memory architecture (Ep 0017; zero private Uqbar details disclosed), and **Layer 3** `ini` portable harness, bridging directly to `infog/tsunami-and-printing-press/`.
- **Cross-links:**
  - `infog/ini/research/src/data.js` (`method` tile) → rebuilt `infog/ini/index.html` (`140,878` bytes) with link to `../../essays/ambiguity-to-production/` (`article:modified_time` `2026-11-25`).
  - `infog/tsunami-and-printing-press/index.html` (`method` tile) → link to `../../essays/sovereign-ai/`.
- **Verification (headless Chromium, local `file://`, mechanical audit):**
  - Privacy/PDF-leak/client-name/external-asset/relative-link checks: **0 errors**.
  - Headless Chromium (`1440×900` & `390×844`): all 5 pages (`pub/index.html`, `ambiguity-to-production`, `sovereign-ai`, `infog/ini`, `infog/tsunami-and-printing-press`) passed `scrollW <= clientW` and `0` console/runtime errors; both `og.png` cards (1200×630) and desktop/mobile renders visually inspected.
- **Cross-family adversarial review status:** **pending before push.** Author is `gemini-4`; this session has only Gemini family available (`skills/delegate` forbids same-family masquerade and forbids shelling out to another LLM CLI). Held locally in `~/pro/pub` — **not committed or pushed** (`AGENTS.md`: do not push unless mat says so).


## reply — added DDD/ontology/Uncle Bob/Matt Pocock and Druckenmiller tokens→tasks upgrades; commit, push, publish

- **`essays/ambiguity-to-production/` (`index.html` + `og.png`):** expanded Stage 03 (*Model the domain, render the ontology, freeze the boundary*) with explicit focus on Domain-Driven Design (Eric Evans's ubiquitous language & bounded contexts), Matt Pocock's agentic domain-modeling/grilling skills (`mattpocock/skills`), Robert C. Martin's («Uncle Bob») Clean Architecture Dependency Rule & OOP boundaries at agent speed, and AST-rendered `domain.md` ontology parity in `ini`. Updated SVG (`03 · DOMAIN · Ontology, DDD & wire`), meta tags, `og.png`, `index.html`, and `README.md`.
- **`essays/sovereign-ai/` (`index.html` + `og.png`):** elevated Stanley Druckenmiller's November 2026 TomorrowX Summit observation (frontier labs moving up the value chain from low-margin tokens to completed tasks in verticals like cybersecurity and healthcare, `REPORTED`) into the Core Frame, Part 01, the IP-exposure collision, the *Tsunami & Printing Press* bridge, `og.png`, `index.html`, and `README.md`.
- **Re-verified (headless Chromium, local `file://`, mechanical audit):** 0 privacy/PDF/client/link errors; 10/10 viewport PASS (`1440×900` & `390×844`, `scrollW <= clientW`, 0 console errors); both regenerated `1200×630` `og.png` cards visually checked.
- **Committed & pushed** on mat's explicit approval (`log/mat.md`, 2026-11-25: *"i verified the content is great... with that, commit-push-publish"*).

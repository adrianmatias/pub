---
name: dream
description: Use when logs outpace docs or pieces. Replay and pair.
---

# dream

Consolidation pass for the public shelf: **replay** brings `README.md`, `index.html`, `AGENTS.md`,
and piece metadata up to date with `log/`; **daydream** pairs unlinked pieces, archive entries,
and docs across time to catch silent drift, stale counts, broken links, and contradictions.

## the rule that protects the record

**A dream adds a verified link or surfaces a drift, never an unverified fact.** Every finding
quotes verbatim text (`path:line`). Never rewrite `log/mat.md` or `log/agt.md`, and never hand-edit
archived posts under `archive/`.

## 1 · replay (logs since last consolidation)

1. Read `log/agt.md` entries since the last consolidation and compare against `README.md`,
   `index.html`, `AGENTS.md`, and every piece's `index.html` / `og.png`.
2. Fix stale piece tables, outdated counts (posts, videos, pieces), missing OG descriptions, or
   drifted engine versions in place.
3. Replay finishes before daydream starts: judging a pair against stale docs wastes the pass.

## 2 · daydream (cross-family)

1. **Sample** 10-20 unlinked pairs across pieces, `archive/` summaries, `README.md`, and `AGENTS.md`
   (e.g. a new piece's claim paired against an older piece's take or an archived talk).
2. **Generate** via a read-only lane in a **different model family** (`skills/delegate`), asking
   for `contradiction | drift | link | gap | none` with verbatim quotes (≥ 20 chars). Expect `none`
   for most pairs.
3. **Ground** every quote verbatim against disk with a scratch script. Kill any ungrounded item
   immediately, with no repair.
4. **Judge** from the session's family. Keep only items that are *true* in full context, *new*,
   and *useful* (change a concrete line, link, or watchlist tell today).

## 3 · close

Apply verified fixes, re-verify headless if HTML changed, run `skills/compress`, and record kept
and killed items in `log/agt.md`.

---
name: compress
description: Use when a round ends or docs grow. Judge, fold, check.
---

# compress

Expansion builds; compression is where the shelf stays sharp. Apply it to pieces, docs, and
agent instructions at the end of every round so context stays lean and every line earns its place.

## the cycle

1. **Judge against `pub`'s purpose.** For every thread opened in the round: does it belong on the
   public shelf, cited and self-contained? Keep, cut with a reason, or note as a known gap.
2. **Fold what survived** into fewer concepts, tighter prose, and shared assets (one map engine,
   one CSS base, zero copy-pasted boilerplate).
3. **Measure** before finishing: tile counts, source counts, HTML size, `AGENTS.md` lines (budget
   ≤ 120), each skill's lines (budget ≤ 150), desktop/mobile/390 px overflow (0 px).
4. **Close cleanly** in `log/agt.md` with what changed, what was verified, and what waits on mat.

## pieces & engine

- **One shared engine**: fix map/mobile bugs once in `infog/closing-doors/research/src/engine.js`
  and propagate — never let pieces diverge into incompatible forks.
- **No filler**: cut adjectives, throat-clearing, and unverified numbers. A gap drawn honestly beats
  a padded paragraph.
- **Reproducible builds**: keep each piece's readable sources and `build.py` under
  `infog/<slug>/research/src/`, assembling one standalone `infog/<slug>/index.html`.

## docs & skills

- **One fact, one home**: `README.md` owns why/layout/pieces/publish; `AGENTS.md` owns agent rules,
  roles, and the skill table; `index.html` owns the public shelf listing. Keep them in sync.
- **Logs stay append-only**: never rewrite, reorder, or compress `log/mat.md` or `log/agt.md`.
- **Budget discipline**: keep `AGENTS.md` ≤ 120 lines and every `skills/*/SKILL.md` ≤ 150 lines with
  a ≤ 60-char trigger description. Pay for added lines by pruning weaker ones.

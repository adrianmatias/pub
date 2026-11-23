---
name: harvest
description: Use when distilling shared rules into pub or promoting up.
---

# harvest

Shared engineering knowledge moves between repositories by **deliberate redundancy**: an agent
reads the shared knowledge source, compares by meaning against `pub`, and writes what fits in
`pub`'s own terms. `pub` owns its distillate outright — no dependency, no symlink, no back-pointer.

## down — distil into pub

1. Compare shared principles, skills, and lessons by meaning against `pub`'s `AGENTS.md` and
   `skills/` (never blindly diff).
2. **Keep** what fits a public static-site shelf: rhythm (expand/compress), evidence & proof
   discipline, cross-family `review`, billing-aware `delegate`, `compress`, `dream`, and `harvest`.
3. **Drop** what does not apply to a static HTML repo with no Python package: package harnesses,
   `pyproject.toml` toolchains, AST ontologies, and Python-code scaffolding skills.
4. **Preserve `pub`'s invariants**: public-only rule, cite-or-omit, single-file offline pieces,
   shared map engine, relative links (except OG/canonical), no custom domain, append-only `log/`.
5. Verify line budgets (`AGENTS.md` ≤ 120, skills ≤ 150, descriptions ≤ 60 chars, 1:1 skills table)
   and record what came in and what was declined in `log/agt.md`.

## up — promote from pub

When a publishing, review, citation, or visual-verification lesson holds in `pub` and at least one
other repository, generalise it (strip repo-specific paths, pay for added lines by pruning weaker
ones) and promote only with mat's word.

---
name: delegate
description: Use when work fans out to subagents. Roles and briefs.
---

# delegate

Delegation trades focus against fragmentation and speed against cost. **The default is one
session, direct.** Use subagents for parallel research slices, heavy verification, or an
independent cross-family critic. `AGENTS.md` maps roles to concrete models.

## roles

| role | who | does | never |
|---|---|---|---|
| director | mat | sets direction, judges taste, approves pushes | is asked what files already say |
| integrator | session, strong model, high effort | plans, writes final pieces, verifies, judges | runs parallel lanes on plan quota |
| lane | cheap API model, max effort, fresh context | one research slice or bounded check | decides piece thesis or edits shared files |
| critic | distinct model family, high effort | reads contract + artifact, returns checkable findings | sees author's reasoning |

Keep bulk work on cheap APIs; meter pay-per-token strong models for targeted synthesis or review;
never run parallel lanes on a plan quota or two strong families on the same job.

## patterns

- **direct** (default): one session closes tasks under ~10 tool calls without delegation overhead.
- **fan-out**: one research slice per read-only lane (e.g. primary sources + dates + labels),
  integrator verifies and writes the single piece.
- **adversarial**: one critic pass by another model family (`skills/review`).
- **expand / compress**: lanes may gather evidence; compression and voice belong to the integrator.

Never split one piece's argument or voice across multiple writing lanes.

## before dispatching

- **Confirm the active model and family** before spawning. Never report a same-family review as
  cross-family; never shell out to another LLM CLI inside a session.
- **Restore temporary model overrides immediately** after spawning, before children finish.
- Send independent lanes in one batch; do not poll transcripts while waiting.

## the brief

A child knows nothing. Pass absolute paths, the contract, the boundary, and what to return.

- **Cite or omit**: instruct every lane «omit and report the gap; never invent or interpolate».
- **Evidence**: require exact URLs, dates, quotes, or `path:line` the integrator can verify.
- **Privacy**: never pass private vault details, credentials, or PII into a brief.
- **Shared files**: `AGENTS.md`, `README.md`, `index.html`, and `log/*` belong to the integrator.

## integrate

A child's summary is a claim, not a fact. Re-check key URLs, recompute counts in code, run
headless browser verification on the built artifact, and record in `log/agt.md` which roles ran.

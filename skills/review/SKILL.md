---
name: review
description: Use when a piece or major change needs another family.
---

# review

The author's model family shares its blind spots: self-review confirms. Every load-bearing piece
or substantive update gets one independent pass by a **different model family** before it ships.
Verify the critic's family differs from the author's before dispatching.

## what the critic gets

- **The contract**: `pub`'s rules (public-only privacy, cite-or-omit with URL + date + label,
  self-contained offline HTML, shared map engine + desktop/mobile/390 px feed checks, no trackers).
- **The artifact**: the piece source / built HTML, `index.html` / `README.md` diffs, and any
  claimed counts or external source URLs.
- **The verification delta**: headless browser checks, overflow checks, and source counts run.
- **Not** the author's reasoning, plan, or conversation: fresh context is the point.

## what the critic returns

Findings, each checkable without trusting the critic:

- `severity`: `blocks` / `should-fix` / `note`;
- `claim`: one sentence;
- `evidence`: a quote with `path:line`, or a failing input / URL / rendered defect;
- `fix`: the smallest change that resolves it, or «unknown».

Tell the critic that «no finding» is acceptable, findings without evidence are discarded, and
style preferences are not findings unless a rule in `AGENTS.md` names them.

## judge the findings

The integrator judges; the critic does not merge.

1. **Reproduce** each blocking finding against the quoted lines, source files, or headless browser.
   Kill any finding that does not reproduce, with its reason.
2. **Give every finding an explicit disposition**: accept (fix and re-verify), accept-and-defer
   (scope and reason), or reject (one-line counter-evidence). Never repair silently.
3. **Narrow, do not inflate**: keep the true part of an overstated claim.
4. When several findings share a premise, fix the premise once.

## record

In `log/agt.md`: critic model, finding counts by severity, kept and killed with one-line reasons.

## when not to review

Typos, mechanical archive re-renders (`tools/render.py`), or scratch probes. Review is for what
ships publicly and anything a stranger or employer could read on `taoaieng.io/pub`.

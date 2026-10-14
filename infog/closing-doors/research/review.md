# Closing Doors — adversarial review

Reviewer: `openai/gpt-6.1-sol` (a different model family from the author, Claude). 14 Oct 2026. It
re-fetched 12 primary sources and recomputed every number of his own: the word ratios, the monthly commits,
the oof results, the career facts and the notebook dates.

**Round 1: FAIL. 11 blockers and 14 should-fix.** Every finding was fixed at each place the claim appeared,
not only where the flagged phrase was.

| # | finding | fix |
|---|---|---|
| 1 | Redwood's "9–15 months" read as how late the prediction was; it is Greenblatt's estimate of the total time | "missed that horizon … Greenblatt then estimated 9–15 months in total" |
| 2 | SWE-bench chart titled "best lab-reported"; the high-compute runs score higher (70.3, 80.2, 82.0) | retitled "selected lab-announced, standard runs"; one source per point |
| 3 | the 17.8-point public/private gap treated as proof of memorisation; the two sets are different tasks | "different task sets; consistent with both capability and recall"; the "same gap" wording removed everywhere |
| 4 | "0% of hidden ones" mixed up tasks with test cases | "the full hidden set of 0% of tasks (≈8% of individual cases right by accident)" |
| 5 | inconclusive results written up as "bought nothing" | "no detected gain (Δ 0.000, CI ±0.033)" |
| 6 | "Most hold" when 3 of 6 held | recounted after the downgrades: one holds, two partly, three not yet |
| 7 | a note dated after the paper was presented as anticipating it | "a study published twelve days earlier — the note links it" |
| 8 | words agents wrote taken as evidence of who reads him | downgraded to not yet: "authorship, not readership" |
| 9 | seniority in postings used as a stand-in for productivity and judgement | downgraded to not yet; "price of judgement" now labelled as interpretation |
| 10 | the thesis stated as a fact about the occupation | stated as "his working hypothesis"; the strongest case against it added to the thesis tile |
| 11 | repo count off by one | "14 personal repos and this vault" |
| 12–25 | conditional forecasts from one group; milestone definitions that changed; METR's update on its own 2025 result; old data-science agent runs shown as the current ceiling; prereg deviations hidden; deletion advice stretched too far; claimed absence of variance data; a model call treated as a whole harness; a watchlist called a pre-registration; the "only tokens travel" privacy claim; no steelman; "every project"; notebook quotes with no source in their tile; dismissive notebook language | each fixed in place (see `log/agt.md`) |

**Round 2 (re-check of the fixes only): 21 resolved, 4 partly, 1 new.** The surviving pieces were an
unconditional "partly memory" headline, a misread of the context-file paper's positive finding, an
unqualified "no notebooks", and a sensitivity claim covering three hypotheses written as if it covered all
five. All were fixed and checked by phrase search against the built file. No clipped tile, no JS error.

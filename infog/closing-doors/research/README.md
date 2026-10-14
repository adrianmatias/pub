# Closing Doors — research trail

Retrieved 14 Oct 2026. Four research slices, each run by a fresh worker told to fetch primary sources the
same day, label every row (FACT / REPORTED / FORECAST / UNVERIFIED) and list its gaps. The tiles cite the
sources directly; this file keeps what the slices could **not** establish, so nobody re-adds it as fact.

| slice | what it covered | rows |
|---|---|---|
| capability | launch dates (Copilot → GPT-6), SWE-bench Verified by date, SWE-Bench Pro V2 public vs private, Terminal-Bench, METR time horizons (Mar 2025, TH1.1, GPT-5.6 Sol), METR RCT and its 2026 redesign | 28 |
| adoption & trust | Stack Overflow 2023–2026, DORA 2024–2025, Anthropic Economic Index, Anaconda 2025, MLE-bench, DSBench, LLM-as-judge reliability | 26 |
| labour market | HBR 2012/2022, BLS 2025–35, Indeed Hiring Lab, LinkedIn Jobs on the Rise 2025–26, Stanford *Canaries*, NY Fed, WEF 2025, Randstad Spain, evals in postings | 28 |
| ideas & forecasts | Sculley 2015, Software 2.0, contamination (GSM1k, SWE-Bench-Verified memory), *Evaluating AGENTS.md*, a16z LLMflation, Epoch prices; AI 2027 and its Aug 2026 update, Amodei's 90% and Redwood's check, METR extrapolation, *The specification as quality gate* | 13 + 16 |

Re-fetched by the author before use: Scale's SWE-Bench Pro V2 post (public 638/642 vs private 222/272 for
Claude Opus 5; the forged Go-module checksum caught by clean-image re-grading; *"pick the harness for the
bill, not the score"*) and METR's Feb 2026 redesign note (−18% [−38%, +9%] for returning developers; METR
calls the data unreliable because developers now refuse to work without AI).

## gaps (not on the map, on purpose)

- No posting series for data scientists alone; Indeed's series is software development.
- No standalone SWE-bench Verified score from Anthropic for Opus 4.5; lab scores use different scaffolds.
  The official leaderboard has had no new entry since 26 Feb 2026 and no retirement notice.
- No METR horizon for Opus 5.5, GPT-6 or GPT-6.1. The dashboard stopped updating on 8 Sep 2026.
- Karpathy's *vibe coding* post and the Software 3.0 talk text could not be retrieved — left out.
- No Metaculus question page or Epoch quantitative forecast for automated software engineering reached.
- Stack Overflow's 2023 trust figure (≈40%) appears only second-hand in the 2025 blog — not plotted.
- No WEF Future of Jobs 2026 edition exists (checked).
- The share of AI-engineer postings naming evaluation (5.5%) is vendor/secondary — labelled REPORTED.

## caveats that shape the wording

- Stack Overflow rewords its trust question most years; the chart is indicative, not like-for-like.
- Stanford's employment gap is descriptive, not causal; the NY Fed finds the AI-exposed decline began
  before ChatGPT and no junior/senior split in postings. Both are on the map.
- METR calls horizons above 16 h unreliable and the GPT-5.6 Sol figure not robust.
- His own numbers (word ratios, commits, oof) are computed from his files; commit counts exclude employer
  work and measure activity, not value.

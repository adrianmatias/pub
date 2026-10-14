# Quantum computing vs cryptographic signatures — REAL vs HALLUCINATED / FUD
2026-10-14 (CEST). Sources fetched today unless noted. **FACT** = primary · **REPORTED** = second-hand/single ·
**FORECAST** = named institution + date · **UNVERIFIED** = not confirmed. Rows: value · as-of · label · source.

## headline
- **The decisive 2026 result is an estimate, not a machine.** Google Quantum AI (30 Mar 2026) prices breaking 256-bit
  ECDLP on **secp256k1** at **≤1,200 logical qubits/≤90M Toffoli** or **≤1,450/≤70M**: **<500,000 physical qubits**,
  ~**9–12 min** per key. ECDSA.Fail then cut the point-addition cost **86.1%**.
- **Hardware is 3–5 orders of magnitude away.** Largest verified logical qubits: **96** (QuEra, Jan 2026). Largest
  hardware-verified ECDLP break: **18-bit** (preprint, Jun 2026), before it **6-bit** (Sep 2025). Crypto systems broken
  by quantum computers to date: **0**.
- **"Bitcoin broken in 9 minutes" is about a non-existent machine.** Google withheld the circuit and attested to it with a
  ZK proof whose soundness was itself buggy — v2 patches "a software bug enabling exploit against ZKP soundness."
- **Exposure is real; the number is contested ~600×:** **6.04M–6.9M BTC (30–35%)** (Glassnode; Caltech/Oratomic) vs
  **~1.6M BTC (8%)**, of which CoinShares says only **10,200 BTC** could move the market. Definitional, not factual.
- **Physics is not the binding constraint — governance is.** BIP-360 is **Draft** with **no Bitcoin Core implementation**;
  BIP-361 (Lopp sunset) is **Draft** and was called "authoritarian and confiscatory." Ethereum has a dated **2029** plan;
  Zcash has **no PQ signature plan**, only NU7's "quantum-resistant transaction record function."

## facts

**A. Hardware 2026 — exists vs promised**
| item | as-of | label | source |
|---|---|---|---|
| **Largest verified logical qubits: 96** — QuEra [[16,6,4]], 448 atoms (4.7:1); then Quantinuum **Helios 48** from 98 ions (2.0:1, 99.92% 2-qubit fidelity, Nov 2025); Atom+Microsoft **24** (Nov 2024); Infleqtion 12; **Google Willow 1** | Jan 2026 | REPORTED | quantumzeitgeist.com/quantum-logical-qubit-leaderboard |
| **Google Willow: 105 physical / 1 logical**, surface code **below threshold** (d=7); T1 ≈100 µs; 1-/2-qubit fidelity ≈99.97%/99.88%; logical memory outlived best physical qubit **2.4×** | 9 Dec 2024 | FACT | quantumzeitgeist.com/google-quantum-computing · postquantum.com/post-quantum/quantum-factored-only-15-21 |
| Google **added neutral atoms** as a 2nd modality (Boulder CO, 24 Mar 2026); roadmap targets ~**1,000,000-qubit** error-corrected machine; Pichai goal "useful error-corrected computer by **2029**" | 24 Mar 2026 | FACT | quantumzeitgeist.com/google-quantum-computing |
| **IBM Starling: 200 logical / 100M gates**, clients **2029**; Blue Jay **2,000 logical / 1B gates by 2033+**; `[[144,12,12]]` gross code = 12 logical per 144 data qubits, ~10× better than surface code | 10 Jun 2025 (rev. Mar 2026) | FACT | ibm.com/quantum/blog/large-scale-ftqc · ibm.com/roadmaps/quantum/2030 |
| **Quantinuum + JPMorgan**: 97 physical, Steane `[[7,1,3]]`, **12 logical / 2,132 two-qubit gates**, logical T infidelity **2.6(4)×10⁻³** — first end-to-end logical algorithms from **only** fault-tolerant components | 12 Oct 2026 | FACT (DOI 10.1103/gnq3-c2df) | quantumzeitgeist.com/quantinuum-quantum-algorithms-scale-physical-qubits |
| **Microsoft Majorana 1**: peer-reviewed Nature Comment (Legge, St Andrews) alleges the topological-gap analysis showed only the region meeting the criteria and inverted data by **array position, not voltage**; Microsoft calls it "minor." Chip contributes **zero** verified logical qubits | 24–25 Jun 2026 | FACT | nature.com/articles/s41586-026-10567-8 · reply …/s41586-026-10568-6 · gigazine.net/gsc_news/en/20260625-microsoft-quantum-leap-topological-gap |
| **PsiQuantum**: ~$1B Series E, million-qubit photonic target, **no** verified logical qubits. **IonQ**: connecting a 256-qubit QPU to an NVIDIA supercomputer | 2026 | REPORTED | leaderboard link above · forklog.com/en/ionq-estimates-quantum-computer-power-needed-to-attack-bitcoin |

**Gap:** 96 verified logical vs 1,200–1,450 needed (≈13–15×); ~105 physical vs <500,000 (≈3.4 orders); 18-bit vs 256-bit (≈14 orders).

**B. Resource estimates**
| item | as-of | label | source |
|---|---|---|---|
| **Gidney 2025, RSA-2048: <1M noisy qubits / <1 week** (vs 20M/8 h, Gidney+Ekerå 2019). Assumptions: square grid, nearest-neighbour, **0.1% gate error**, 1 µs cycle, 10 µs reaction; gains from approximate residue arithmetic, yoked surface codes, magic-state cultivation | 21 May 2025 | FACT | arxiv.org/abs/2505.15917 |
| **Google 2026, secp256k1: ≤1,200 logical + ≤90M Toffoli** or **≤1,450 + ≤70M**; **<500,000 physical** on planar degree-4 superconducting at 10⁻³ error; **18/23 min**, or **~9/~12 min** from a primed state. Prior best logical count 1,100 (Chevignard) but >100bn Toffoli; prior best Toffoli ~200M (Litinski) | 30 Mar 2026 (v2 15 Apr) | FACT | arxiv.org/abs/2603.28846 · eprint.iacr.org/2026/625 |
| **ECDSA.Fail**: score **S = Q × T** down **86.1%** in ~2 months. Best circuit **1,151 qubits × 1,299,453 Toffoli ≈ 1.496bn**; windowed-Shor variant **1,162/1,684,161, p̂ = 0.99809 → 1.961bn**; post-cutoff **1.259bn**, **813 qubits**. **No error correction, not end-to-end, never on hardware.** 100+ entrants + AI agents | 9 Sep 2026 (v2 19 Sep) | FACT | arxiv.org/abs/2609.09582 · starkware.co/blog/seven-of-our-researchers-helped-halve-googles-quantum-attack-estimate |
| **Schrottenloher 2026**: independent matching circuit — ~1.5% more qubits, **6.5–10% fewer Toffoli** | 1 Jun 2026 | FACT | arxiv.org/abs/2606.02235 |
| **IonQ**: **19,397 physical, 1,457 logical, ~39M Toffoli, ~25.7 days**, trapped-ion "Walking Cat"; roadmap ~2028 | 8 Sep 2026 | REPORTED | forklog.com/en/ionq-estimates-quantum-computer-power-needed-to-attack-bitcoin |
| **Caltech / Oratomic**: ~**26,000 qubits → ECC-256 in ~10 days** (neutral atom, reusing Google's circuits, ~1/50 of Google's count); RSA-2048 ≈**102,000 qubits/~3 months**. **All nine authors are Oratomic shareholders, six employed there** | 30–31 Mar 2026 | REPORTED (conflicted) | coindesk.com/markets/2026/03/31/quantum-computers-could-break-crypto-wallet-encryption-with-just-10-000-qubits-researchers-say |
| 14-year trend: Shor physical-qubit estimates **~1bn (2012) → ~10,000 (2026)**. Threat-sceptic: a pubkey in **a day** needs ~**13M physical qubits ≈100,000×** the largest machine; **in an hour ~3,000,000×** | Mar 2026 / Feb 2026 | REPORTED / FACT | CoinDesk link above · coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk |
| Gidney on the curve: **10% probability by 2030**; doubts another 10× algorithmic cut | 2026 | REPORTED | htx.com.gl/news/the-real-quantum-threat-to-bitcoin-99-of-people-get-it-wrong-7fmdGkh0 |

**C. What Shor-style algorithms have actually done**
| item | as-of | label | source |
|---|---|---|---|
| Hardware-verified ECDLP record: **18-bit (n = 130,579)** on IBM Quantum — 14 runs n=7…130,579, >300,000 layers on 77 qubits, all job IDs published. **Preprint** | 17 Jun 2026 | REPORTED | zenodo.org/records/20736911 |
| Prior record: **6-bit** ECC key on IBM Torino (133 qubits), 340,000-layer circuit. **Project Eleven "Q-Day Prize"** then paid **1 BTC** for a **15-bit** key ("512× improvement"); 256-bit is ~**2.2×10⁷²** harder | 2 Sep 2025 / 24 Apr 2026 | REPORTED | forklog.com/en/quantum-computer-cracks-tiny-cryptographic-key · tech.yahoo.com/cybersecurity/articles/quantum-hacker-gets-closer-ever-153851665.html |
| Largest integers ever factored by Shor: **N = 15** (Vandersypen et al., 7 spin-1/2 nuclei, *Nature* 2001) and a later **compiled photonic N = 21**. Smolin–Smith–Vargo (2013): early demos relied on simplifications requiring **prior knowledge of the factors**. Crypto systems broken by quantum computers to date: **0** | 2001–2013 / Oct 2026 | FACT | postquantum.com/post-quantum/quantum-factored-only-15-21 |

**D. FUD catalogue — claim → what was shown and the debunk**
| claim | what was shown, and the debunk |
|---|---|
| **"Chinese researchers broke RSA with D-Wave"** (Oct 2024) | A **22-bit** key by **annealing** (an optimiser, not Shor). Ex-NSA Rob Joyce: "totally overblown." DigiCert: 22-bit vs 2048/4096-bit is "misleading." D-Wave: "no threat to encryption for many years" — techtarget.com/cybersecurity/news/366613737/Experts-slam-Chinese-research-on-quantum-encryption-attack · newatlas.com/quantum-computing/chinese-quantum-computer-hack-rsa-aes-military-grade-encryption |
| **Schnorr 2022 "sublinear resources" = "destroys RSA"** | A theoretical sublinear-resource factoring claim that never became an RSA break; its assumptions (random lattice, near-orthogonal size-ordered basis) don't hold for RSA moduli. **No canonical refutation located** — unsettled theory, and "RSA broken" is hallucinated — **UNVERIFIED**, lead journals.aps.org/pra/pdf/10.1103/d9dl-ctt4 |
| **"Willow breaks Bitcoin"** (Dec 2024) | Willow = **105 physical / 1 logical** doing below-threshold memory; contemporary estimates needed ~**1,500 qubits × 15–20 years**. The same-day BTC dip (~$95K) was risk-off plus Microsoft shareholders voting down a BTC treasury proposal — wccftech.com/no-google-quantum-computing-breakthrough-via-the-willow-chip-is-not-a-threat-to-bitcoin-btc |
| **"Google says Bitcoin breaks in 9 minutes"** (Mar–Apr 2026) | A genuine **~9–12 min circuit runtime** for a hypothetical ~500,000-qubit machine that doesn't exist; Google withheld the circuit and claimed no date or break. Documented headline-vs-body gap (59% of shared links never clicked) — htx.com.gl/news/the-real-quantum-threat-to-bitcoin-99-of-people-get-it-wrong-7fmdGkh0 · digitaltoday.co.kr/en/view/49018/bitcoin-private-key-quantum-computer-9-minutes-google-quantum-ai-paper |
| **"Google has cracked Bitcoin's encryption"** / **"the ZK proof proves the circuit exists"** | No key recovered — a lower resource estimate plus a ZK proof of a withheld circuit. **v2 of Google's own paper patches "a software bug enabling exploit against ZKP soundness"**: estimates stand, the attestation needed a fix. Substantiation came from Schrottenloher instead — coinmarketcap.com/community/articles/69cc49bf075e2a152c1ba0f7 · eprint.iacr.org/2026/625 · arxiv.org/abs/2606.02235 |
| **Oratomic: "10,000 qubits empties your wallet"** | Real paper, real conflict: all nine authors shareholders; reuses Google's circuits; unverified ~**101:1** physical:logical ratio; the task Google does in 9 min would take ~**10²⁶⁴ days** on the neutral-atom hardware assumed — CoinDesk link in §B · HTX link above |

**E. Bitcoin exposure**
| item | as-of | label | source |
|---|---|---|---|
| **BIP-361's own figure: >34% of all bitcoin have revealed a public key on-chain** | 1 Mar 2026 | FACT | bips.dev/361 |
| **Glassnode: 6.04M BTC (30.2%)** — **1.92M structural** (P2PK + P2TR) + **4.12M operational** (reuse/partial spend), **1.66M** on exchanges. Coinbase ~**5%** vulnerable, Binance ~**85%**, Bitfinex & Robinhood ~**100%**; US/UK/El Salvador state funds protected | 20–22 May 2026 | REPORTED | forklog.com/en/glassnode-6-million-btc-at-risk-from-quantum-attacks |
| **Caltech/Oratomic: ~6.9M BTC** tied to early wallets and reused addresses | 31 Mar 2026 | REPORTED | CoinDesk link in §B |
| **Chaincode Labs** (Milton & Schickelmann, 55 pp.): **20–50% (4–10M BTC)** potentially vulnerable; most precise figure **6,262,905 BTC** (Project Eleven, 17 Jan 2025). P2PK = **0.025% of UTXOs but 8.68% of supply**; P2TR = 32.5% of UTXOs / 0.74% of supply (**146,715 BTC**); migrating all UTXOs = **76–568 days** of block space. Mining safe | May 2025 | FACT | chaincode.com/bitcoin-post-quantum.pdf · forklog.com/en/chaincode-labs-sizes-up-the-quantum-threat-to-bitcoin |
| **Deloitte's "~25%"**: "About 25% of Bitcoins in circulation are vulnerable… over 4 million BTC… over $40bn" (P2PK ≈2M + reused P2PKH ≈2.5M). Same piece concludes an 8-hour key derivation vs a 10-minute block makes Bitcoin "in principle resistant" | **~2020** | REPORTED — **stale** | insidequantumtechnology.com/news-archive/deloitte-about-25-of-bitcoins-in-circulation-are-vulnerable-to-a-quantum-attack |
| **CoinShares counter**: P2PK ≈**1.6M BTC (8%)** genuinely at risk; only **10,200 BTC** big enough to matter; the rest is **32,607 separate ~50-BTC UTXOs** that would "take millennia" to extract. Calls 25% claims overstated — they bundle *temporary* exposures | 6 Feb 2026 | FACT | coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk |
| **Satoshi's coins: ~1.1M BTC** in P2PK, keys exposed, **not migratable** (no one holds them; no knowledge asymmetry → no rescue protocol). Grayscale puts the P2PK pool at ~1.7M BTC (~1M Satoshi's); at $83,322 that is **~$92bn** | Apr 2026 | REPORTED | forklog.com/en/radical-plan-to-shield-bitcoin-from-quantum-computers-sparks-outrage · forklog.com/en/grayscale-bitcoins-quantum-challenge-is-more-social-than-technical |
| **BIP-360 (P2MR, ex-P2QRH/P2TSH)**: **Draft**, soft fork, v**0.12.1** (3 Aug 2026); new `bc1z` output (SegWit v2) = **P2TR with the key-path spend removed**. **Mitigates only long-exposure attacks**; short-exposure "may require post-quantum signatures." P2QRH → P2TSH (Sep 2025) → **P2MR (10 Feb 2026)**. **No Bitcoin Core implementation** — BTQ shipped a P2MR + Dilithium testnet (v0.3.0, 19 Mar 2026, >100,000 blocks) instead | 3 Aug 2026 | FACT | bips.xyz/360 · forklog.com/en/btq-technologies-launches-quantum-protected-bitcoin-testnet |
| **BIP-361 (Lopp sunset)**: **Draft, Informational**, 11 Feb 2026. **Phase A**: 160,000 blocks (~3 yrs) after activation — no sends to quantum-vulnerable addresses. **Phase B**: 2 years later — ECDSA/Schnorr spends encumbered by a quantum-safe rescue protocol (BIP-32 hardened derivation / ZK-STARK proofs). Lopp: "not yet ready for integration." Reaction: **"highly authoritarian and confiscatory"**; "Upgrade should be 100% voluntary." Grayscale frames the choice as burn / throttle / do nothing | 11 Feb / 14–15 Apr 2026 | FACT / REPORTED | bips.dev/361 · forklog.com/en/radical-plan-to-shield-bitcoin-from-quantum-computers-sparks-outrage |
| **Quantum-resistant mainnet tx, no soft fork**: StarkWare's Avihu Levy "QSB" hash-based signature-grinding tx mined **26 Aug 2026** via MARA Slipstream. **Hours and hundreds of dollars per operation**; does **not** help already-exposed keys. Starknet later cut the cost estimate **79%** | 26–27 Aug 2026 | REPORTED | forklog.com/en/starkware-executes-first-quantum-resistant-bitcoin-transaction |
| Timeline debate 2026: **Back 20–40 yrs · Huang 15–30 yrs · ARK long-term · Gidney 10% by 2030 · EF devs 8–12 yrs · BSI (DE) 15 yrs, maybe 10 · Heilman ~7 yrs for a full BIP-360 cycle · Bernstein (Chhugani, to FT): 3–5 yrs, "several billion, if not hundreds of billions of dollars."** No Bitcoin soft fork in over four years | 2026 | REPORTED / FORECAST | HTX link in §B · Chaincode + Glassnode links above |
| **Coinbase** holds **~5% of all bitcoin in custody**; on 13 Oct 2026 recommended P2MR (BIP-360) and "P2TRv2", hybrid classical+PQ authorisation, and evaluation of **ML-DSA, SLH-DSA, FN-DSA, SHRINCS** | 13 Oct 2026 | REPORTED | incrypted.com/en/coinbase-called-for-starting-preparations-to-protect-bitcoin-from-quantum-threats · thequantuminsider.com/2026/10/13/coinbase-urges-early-work-on-bitcoins-post-quantum-transition |
| Reference prices: BTC **$83,322** (mcap $1.674tn) · ETH **$2,500** · ZEC **$1,237.66** (mcap $21.0bn) → 1.1M BTC ≈ **$91.7bn**; 6.04M ≈ **$503bn** | 14 Oct 2026 | FACT | api.coingecko.com/api/v3/simple/price?ids=bitcoin,zcash,ethereum&vs_currencies=usd&include_market_cap=true |

**F. Ethereum / Zcash**
| item | as-of | label | source |
|---|---|---|---|
| **Ethereum Foundation roadmap**: four forks — **I** panic PQ validator key activatable if a quantum computer appears suddenly; **J** cheaper PQ signature verification; **L** compress state into ZK proofs; **M** protect L2s. Consensus → replace **BLS** with hash-based **leanXMSS** + SNARK aggregation; data → PQ BLOBs. **Overhaul by 2029**; first two possibly in the coming **Hegota** fork | 24–25 Mar 2026 | REPORTED | forklog.com/en/ethereum-foundation-to-implement-quantum-security-by-2029 |
| Ethereum's **hash-only** turn — Vitalik: lean Ethereum uses **no lattices, no ML-DSA, no Falcon, no lattice commitments in ZK proofs**; signatures are **WOTS or SPHINCS-**. Rationale: ECC's structure (associativity, Schoof, pairings) is what superintelligence attacks. If lattices degrade, **multiply key sizes ×10** | 7 Oct 2026 | FACT (primary post) | forklog.com/en/justin-drake-says-ai-could-break-ecdsa-before-quantum-computers |
| **Zcash shielded crypto**: Orchard/Ironwood use **Halo 2** recursive zk-SNARKs; the **discrete-log assumption sits inside the proof system** (Pedersen/EC commitments), so shielded balances are **not** PQ-safe even though notes are hidden | 2026 | REPORTED (structural — see `## gaps`) | zecstats.org/ironwood · vault notes `.dsh-research/crypto/zcash.md` |
| **Zcash PQ roadmap**: **no post-quantum signature scheme scheduled.** What exists is weaker — Ironwood "added quantum-resistant transaction record functionality"; **NU7** (testnet **5 Oct 2026**, mainnet targeted **Nov 2026**) adds **75s → 25s blocks**, V4 disable, Sprout deprecation, and that same function. Haseeb Qureshi (Dragonfly) lists "Tachyon, quantum resistance, formal verification" as pre-ossification priorities | 5 Oct 2026 | REPORTED | zelcore.io/academy/news-explained/zcash-nu7-upgrade-testnet-wallet-confirmations · vault notes |
| Zcash's real 2026 emergency — an **implementation** bug: **Taylor Hornby found a critical Orchard soundness bug on 29 May 2026 using Claude Opus 4.8**, one day after the model's release; fix **1 Jun 2026**. Live from Orchard activation **May 2022**; would have allowed **undetectable unlimited counterfeit ZEC**. "There is no definitive way to determine, using only cryptography, whether such exploitation occurred." ZEC fell **43%**, wicking to **$250**. The fix (Ironwood turnstile + sealed Orchard) activated **block 3,428,143 on 28 Jul 2026**; **87–88.8% of Orchard migrated** by mid-Sep, with **~405–470K ZEC** stranded = the outstanding falsification test | 29 May–Sep 2026 | FACT / REPORTED | securityaffairs.com/193224/hacking/claude-opus-found-a-four-year-old-hole-in-zcashs-privacy-layer-nobody-knows-if-someone-already-used-it.html · vault notes (ZecStats 2026-09-21) |

**G. Standards, HNDL, expert surveys**
| item | as-of | label | source |
|---|---|---|---|
| **FIPS 203/204/205 finalized 13 Aug 2024** — 203 = **ML-KEM** (Kyber, general encryption), 204 = **ML-DSA** (Dilithium, primary signatures), 205 = **SLH-DSA** (SPHINCS+, hash-based backup). **FIPS 206 = FN-DSA** (FALCON) still draft | 13 Aug 2024 | FACT | nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards |
| **HQC selected 11 Mar 2025** as **fifth** algorithm / **ML-KEM backup** (code-based, different math); **final expected 2027**. **No HQC standard exists as of Oct 2026** | 11 Mar 2025 | FACT | nist.gov/news-events/news/2025/03/nist-selects-hqc-fifth-algorithm-post-quantum-encryption |
| **CNSA 2.0**: firmware signing **2025**; networking equipment and browsers/OS **2030** and **2033**; **NIST IR 8547 plans to disallow ECC in the US federal government after 2035** (hybrid excepted). *(Dates via BIP-360's citation — the NSA page returned 403.)* Other mandates: **Canada** plans by **Apr 2026** / high-priority **2031**; **EU** deployment from **2026** / critical infrastructure **2030**; **UK NCSC** identify 2028, full migration 2031–35 | Mar 2026 | FACT (as cited, GRI) | bips.xyz/360 · globalriskinstitute.org/mp-files/pdf-quantum-threat-timeline-report-2025-exec-sum.pdf |
| **Why signatures ≠ encryption under HNDL**: **HNDL does not apply to signature-protected assets** — Bitcoin's chain is public, there is no ciphertext to harvest, the keys are already published. That kills the "decrypting your Bitcoin" framing but *strengthens* the long-exposure case: every exposed pubkey is a permanently cached target. HNDL **is** real for recorded ciphertext — one simulation puts **~9.56bn** Australian NPP payment records (2026–2029) retroactively exposed under a 2030-arrival HNDL scenario | Aug 2024 / 4 May 2026 | FACT / REPORTED | NIST link above · arxiv.org/abs/2605.02276 |
| **GRI / evolutionQ Quantum Threat Timeline 2025** (latest edition, published Mar 2026): **26 experts**; mean likelihood of a CRQC **28–49% within 10 years**, **51–70% within 15 years** — "a remarkable shift towards a higher likelihood compared to recent similar surveys." Contrast 2024: **10 of 32** experts at ≥50% within 10 years. GRI also flags **covert research** as a concrete possibility | Mar 2026 | FACT (primary PDF) | globalriskinstitute.org/mp-files/pdf-quantum-threat-timeline-report-2025-exec-sum.pdf · coinmarketcap.com/community/articles/69d6214d4bc999076b891ea9 |

**H. AI × quantum**
| item | as-of | label | source |
|---|---|---|---|
| **AI accelerating the math break: no demonstrated case.** The strongest real result is ECDSA.Fail — **algorithmic engineering, not a new attack**: AI agents + 100 humans cut a compiled-circuit cost metric **86.1%** in ~2 months. The authors: "ECDSA.fail measured circuits; it did not run them on quantum hardware because no such hardware exists yet." AI compresses the *cost estimate* | 9–10 Sep 2026 | FACT | arxiv.org/abs/2609.09582 · starkware.co/blog/seven-of-our-researchers-helped-halve-googles-quantum-attack-estimate |
| **AI finds implementation bugs fast**: the Zcash Orchard soundness bug was found with **Claude Opus 4.8 within ~24 h of release**, after surviving **4 years** of expert review — the sharpest AI×crypto data point of 2026, and an **implementation bug in a ZK circuit**, not a break of discrete log | 29 May–6 Jun 2026 | FACT | Security Affairs link in §F |
| **The "AI breaks ECDSA classically" thesis**: **Justin Drake (EF), 7 Oct 2026 — "it is now reasonable to brace for the possibility that ECDSA breaks before qday, in the worst case in months not years"** (fast private-key recovery, ~1 week, on a large GPU cluster). Cites AI math progress (OpenAI's **722** published proofs, the Erdős unit-distance disproof) and claims **US government censorship of academic quantum cryptanalysis**. **Opinion; no demonstrated break.** Buterin's counter: don't panic-migrate; **lattices are the new risk area** *because* they are the PQ defence — "the concrete security of lattices will take serious hits"; **multiply key sizes ×10**, prefer hash-only, keep encrypted notes offchain | 7 Oct 2026 | FACT / REPORTED (primary posts) | forklog.com/en/justin-drake-says-ai-could-break-ecdsa-before-quantum-computers |
| **The distinction that matters**: four things get conflated — **Google's withheld circuit + a buggy ZK proof** (soundness bug in the *evidence*); **Zcash Orchard** (soundness bug in an *implementation's* circuit); **ECDSA.Fail** (cost optimisation of an unimplementable circuit); **Drake's thesis** (a *conjecture* that a classical break exists). The only category that would end Bitcoin-as-we-know-it — an **algorithmic** break of secp256k1 — has **not** occurred | Oct 2026 | — | synthesis of the above |

## bull
1. **The estimate really did collapse; 2026 is when ECC caught RSA on the cost curve.** secp256k1 went from Litinski's
   ~9M-photonic-qubit class to **<500,000 physical qubits / ~9 min**, then an open AI-assisted challenge cut the
   arithmetic **86.1%** — and Schrottenloher published an independent circuit, so it no longer hinges on "trust our ZK
   proof." Physical-qubit estimates for a real attack fell **five orders of magnitude in 14 years**.
2. **Migration started at the right layer.** FIPS 203/204/205 final since Aug 2024; the EF has a dated **2029** four-fork
   roadmap; Coinbase (**~5% of all BTC in custody**) published recommendations on 13 Oct 2026; StarkWare mined a
   **quantum-resistant Bitcoin tx on mainnet, 26 Aug 2026**, with no consensus change; BTQ runs a BIP-360 testnet with
   **>100,000 blocks**.
3. **The best critique of the scariest number is quantitative.** CoinShares: **~1.6M BTC** truly exposed, only
   **10,200 BTC** large enough to matter, the rest in **32,607 separate ~50-BTC UTXOs** — a multi-decade extraction
   campaign even for a working CRQC.
4. **Quantum computers still break nothing.** Zero systems broken; the hardware record for the actual attack class is
   **18-bit**, on a preprint. Every "RSA/ECC broken" headline traces to annealing, a toy key, or an estimate for a machine
   that does not exist.
5. **The field names the failure mode itself.** Google's paper opens by calling FUD a threat vector and corrects the
   record: proof-of-work is quantum-immune, and Zcash's newest shielded pool has PQ-resilient protocol parameters.

## bear
1. **Distance is a bad comfort.** Google, IonQ and Oratomic all land at **20,000–500,000 physical qubits** for secp256k1;
   Willow is **105**; verified logical is **96** against **1,200–1,450** needed. **Estimates have fallen faster than
   hardware has grown for 14 years, uninterrupted.**
2. **Bitcoin has no activated mitigation and the process is hostile.** BIP-360 is Draft with **no Core implementation**;
   BIP-361 was branded **"authoritarian and confiscatory"** on sight; no soft fork in over four years. A full BIP-360
   cycle is estimated at **~7 years**, the bill "several billion, if not hundreds of billions." The constraint is
   coordination, not physics.
3. **"Long exposure" is the unhedgeable part — exactly what no PQ signature fixes.** Satoshi's **~1.1M BTC** is P2PK with
   no knowledge asymmetry, hence no rescue protocol: **~$92bn** of permanently un-migratable, permanently targeted supply
   that neither BIP-360 nor QSB touches. And "$10,200 BTC that matters" assumes an attacker who wants to *sell*, not a
   state or destructive actor who wants to prove a point.
4. **The most-quoted number in mainstream coverage is stale toward false comfort.** Deloitte's "~25%" is a **~2020**
   analysis on **20M qubits / 8 hours**, since improved ~40×. The scariest 2026 paper (Oratomic, ~10,000 qubits) has
   **all nine authors as shareholders**. Both ends of the discourse are conflicted.
5. **The real 2026 loss event was not quantum.** A four-year-old Orchard soundness bug — undetectable unlimited
   counterfeiting, undiscoverable whether it was ever exploited — was found by **Claude Opus 4.8 within 24 h of release**,
   and ZEC fell **43%**. Implementation and classical maths are where value will be lost, and AI just collapsed the
   discovery cost. Drake's "ECDSA breaks before qday, in months not years" is unproven but comes from the EF's own
   researcher.

## verdict table
| claim | verdict | why |
|---|---|---|
| Google RSA-2048: <1M qubits / <1 week | REAL | arXiv paper, stated assumptions, 20× cut vs 2019. |
| Google secp256k1: <500k physical / ~9 min | REAL (estimate) | Two release channels; matched by an independent open circuit. |
| Google "proved the circuit via ZK proof" | PARTLY | v2 patches a bug "enabling exploit against ZKP soundness." |
| ECDSA.Fail cut cost >50% | REAL | Evaluator-verified; no hardware run, no full Shor. |
| AI agents accelerating the break | PARTLY | Real for cost estimation and bug-finding; no algorithmic break. |
| Oratomic: ~10,000 qubits empties wallets | PARTLY (conflicted) | All nine authors are shareholders; ~101:1 ratio unverified. |
| Chinese researchers broke RSA with D-Wave | HALLUCINATED | 22-bit key by annealing, not Shor. |
| Schnorr 2022 destroys RSA | HALLUCINATED | Never became an RSA break; unsettled theory. |
| Willow breaks Bitcoin (Dec 2024) | HALLUCINATED | 105 physical / 1 logical vs ~1,500 qubits × 15–20 yrs. |
| Google says Bitcoin breaks in 9 minutes | PARTLY (real number) | Genuine figure, but for a hypothetical ~500,000-qubit machine. |
| Google has cracked Bitcoin's encryption | HALLUCINATED | No key recovered. |
| "They've only factored 15" | HALLUCINATED (metric) | Rewards pre-compiled circuits; QEC milestones are the scoreboard. |
| "Quantum has broken nothing" | REAL | Hardware ECDLP record 18-bit (preprint) vs 256-bit in use. |
| Deloitte's "~25% of BTC vulnerable" | PARTLY, STALE | ~2020 analysis on a 20M-qubit / 8 h assumption. |
| Glassnode 6.04M / Chaincode 4–10M / Project Eleven 6.26M BTC | REAL (definitions) | The spread vs CoinShares' 1.6M is definitional, not factual. |
| CoinShares: only ~10,200 BTC is market-relevant | REAL, caveat | Does not price a destructive or state actor. |
| Satoshi's ~1.1M BTC is un-migratable | REAL | Exposed P2PK keys, no knowledge asymmetry → no rescue path. |
| BIP-360 (P2QRH→P2TSH→P2MR) is shipped | HALLUCINATED | Still Draft, long-exposure only, no Bitcoin Core implementation. |
| Lopp is pushing to freeze/burn coins | REAL | BIP-361 Draft, Phases A/B; publicly called confiscatory. |
| Bitcoin can be made PQ-safe with no soft fork | PARTLY | StarkWare's mainnet QSB tx is real but hours / hundreds of dollars each. |
| "Harvest now, decrypt later" threatens your Bitcoin | HALLUCINATED (assets) | No ciphertext to harvest; the analogue is exposed public keys. |
| NIST standards are done | PARTLY | HQC selected but unstandardized (final 2027); FN-DSA draft. |
| Ethereum is behind on PQ | HALLUCINATED | Dated four-fork roadmap, complete by 2029 — ahead of Bitcoin. |
| Zcash is post-quantum | HALLUCINATED | No PQ signatures scheduled; still ECC inside Halo 2. |
| AI found the 2026 Zcash Orchard bug | REAL | Claude Opus 4.8, ~24 h after release; ZEC −43%. |
| AI broke ECDSA | HALLUCINATED | Drake's "bunker mode" is a conjecture about a future break. |
| GRI: 28–49% CRQC chance within 10 years | REAL (survey mean) | 26 experts, Mar 2026; 51–70% within 15 years. |
| "Q-Day" has a date | HALLUCINATED | Forecasts span 2027 to the 2040s and "never." |

## gaps
- **No GRI 2026 edition found.** Latest is the "Quantum Threat Timeline Report **2025**" (Mar 2026); a 2026 edition would
  supersede the 28–49% / 51–70% figures.
- **Schnorr 2022 has no located canonical debunk.** No fetchable authoritative refutation; unsettled, not debunked.
- **No 2026 Chinese D-Wave story found.** The viral episode I could source is the **Oct 2024** one (22-bit, annealing).
- **Oratomic primary paper not fetched** — only CoinDesk's account plus a secondary critique; its 101:1 ratio and
  neutral-atom assumptions are unverified here.
- **Zcash PQ-signature roadmap has no primary source.** I could not fetch a Zcash/ECC/ZODL document stating a
  post-quantum *signature* plan. Also **not verified today**: the precise ECC surface inside Halo 2 — stated as structure.
- **NSA CNSA 2.0 page returned HTTP 403**; the 2025/2030/2033/2035 dates come from BIP-360's citation of CNSA 2.0 and
  NIST IR 8547.
- **Nasdaq, Benzinga and the Deloitte-hosted originals were blocked** (403 / Cloudflare); those pieces are
  **headline-only** here and WCCFtech's Dec-2024 debunk is the sourced instance.
- **No distinct 2026 viral hoax found beyond** the "9 minutes" and "Google cracked Bitcoin" waves.
- **QuEra's 96 logical qubits** rests on a single secondary aggregator (Quantum Zeitgeist); treat as REPORTED, not FACT.

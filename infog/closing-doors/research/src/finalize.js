// lanes (the row a tile sits in) and a tile-local source for every notebook quote (private; quoted as ideas, dated by entry)
const LANES = { "-1": "field", "0": "practice", "1": "evidence" };
const NOTEBOOK = { ladder: "Apr 2026", boom: "2022", byhand: "2022", shock: "Sep 2024", yardsticks: "Feb 2026", market: "2023",
  pilot: "Dec 2025", wiki: "Apr 2026", house: "Aug 2026", next: "Dec 2025 · Jun, Sep 2026", takes: "Nov 2023 · 2023 · Dec 2025 · Jan, Feb 2026" };
for (const n of DATA.nodes) {
  n.lane = LANES[n.gy] || "";
  if (NOTEBOOK[n.id]) (n.src = n.src || []).push(["Private notebook — the quoted lines, as ideas only", "", NOTEBOOK[n.id], ""]);
}

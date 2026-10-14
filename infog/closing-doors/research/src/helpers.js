const cell = (h, q, body, meta, lean, id) => `<div class="cell${lean ? " lean" : ""}"><h5>${h}</h5>${q ? `<div class="q">“${q}”</div>` : ""}<div>${id ? cites(body, id) : body}</div>${meta ? `<div class="m">${meta}</div>` : ""}</div>`;
const scoreRow = (v, t, id) => `<div class="score"><b class="${v}">${v.replace("-", " ")}</b><span>${id ? cites(t, id) : t}</span></div>`;

/* ============================================================
   knowledge.js — load research.json, render Post-it cards,
   live search + sort. Pure client-side, no build step.
   ============================================================ */

let KB_DATA = [];
const POSTIT_COLORS = ["green", "purple", "orange", "blue", "yellow", "teal", "red"];

async function loadKnowledge() {
  const host = document.getElementById("kb-grid");
  try {
    const res = await fetch("data/research.json", { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    const json = await res.json();
    KB_DATA = Array.isArray(json) ? json : (json.topics || []);
  } catch (e) {
    const lang = getLang();
    host.innerHTML = `<p class="chalk-sub">${STRINGS[lang]["kb.loaderr"]}</p>`;
    return;
  }
  buildCategoryOptions();
  wireControls();
  renderKB();
}

/* fill #kb-cat with the categories actually present in the data */
function buildCategoryOptions() {
  const sel = document.getElementById("kb-cat");
  if (!sel) return;
  const lang = getLang();
  const prev = sel.value;
  const cats = [...new Set(KB_DATA.map(r => r.category).filter(Boolean))]
    .sort((a, b) => labelFor(a, lang).localeCompare(labelFor(b, lang)));
  sel.innerHTML =
    `<option value="">${STRINGS[lang]["kb.cat.all"]}</option>` +
    cats.map(c => `<option value="${c}">${labelFor(c, lang)}</option>`).join("");
  sel.value = prev;
}

function labelFor(cat, lang) {
  return (STRINGS[lang] && STRINGS[lang]["cat." + cat]) || cat;
}

function currentView() {
  const q = (document.getElementById("kb-search").value || "").toLowerCase().trim();
  const sort = document.getElementById("kb-sort").value;
  const cat = (document.getElementById("kb-cat") || {}).value || "";
  let rows = KB_DATA.filter(r => {
    if (cat && r.category !== cat) return false;
    if (!q) return true;
    return (r.title + " " + (r.covers || "") + " " + (r.tier || "")).toLowerCase().includes(q);
  });
  rows.sort((a, b) => {
    if (sort === "title") return a.title.localeCompare(b.title);
    const da = a.extracted || "", db = b.extracted || "";
    return sort === "oldest" ? da.localeCompare(db) : db.localeCompare(da);
  });
  return rows;
}

function renderKB() {
  const host = document.getElementById("kb-grid");
  const lang = getLang();
  const rows = currentView();
  const cnt = document.getElementById("kb-count");
  if (cnt) cnt.textContent = `${rows.length} ${STRINGS[lang]["kb.count"]}`;

  if (!rows.length) {
    host.innerHTML = `<p class="chalk-sub">${STRINGS[lang]["kb.empty"]}</p>`;
    return;
  }

  host.innerHTML = rows.map((r, i) => {
    const color = POSTIT_COLORS[i % POSTIT_COLORS.length];
    const covers = (r.covers || "").slice(0, 180);
    const ellipsis = (r.covers || "").length > 180 ? "…" : "";
    const tierClass = /quality/i.test(r.tier || "") ? "tier-quality" : "";
    return `
      <article class="postit ${color} fade-up in">
        <h3>${escapeHtml(r.title)}</h3>
        <div class="meta">${r.extracted || ""} · ${r.sources || "?"} ${STRINGS[lang]["kb.sources"]}</div>
        <p>${escapeHtml(covers)}${ellipsis}</p>
        ${r.tier ? `<span class="badge ${tierClass}">${escapeHtml(r.tier)}</span>` : ""}
      </article>`;
  }).join("");
}

function wireControls() {
  const search = document.getElementById("kb-search");
  const sort = document.getElementById("kb-sort");
  const cat = document.getElementById("kb-cat");
  if (search) search.addEventListener("input", renderKB);
  if (sort) sort.addEventListener("change", renderKB);
  if (cat) cat.addEventListener("change", renderKB);
  // rebuild category labels (keep selection) then re-render on language switch
  document.addEventListener("langchange", () => { buildCategoryOptions(); renderKB(); });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

document.addEventListener("DOMContentLoaded", loadKnowledge);

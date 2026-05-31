/* ============================================================
   main.js — language toggle, nav, shared renders, motion
   ============================================================ */

const LANG_KEY = "mt-lang";

function getLang() {
  return localStorage.getItem(LANG_KEY) || "th";
}

function applyLang(lang) {
  document.documentElement.lang = lang;
  const dict = STRINGS[lang] || STRINGS.th;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] != null) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
  });
  // let page modules re-render their language-dependent content
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  const btn = document.querySelector(".lang-toggle");
  if (btn) btn.textContent = dict["lang.toggle"];
}

function toggleLang() {
  const next = getLang() === "th" ? "en" : "th";
  localStorage.setItem(LANG_KEY, next);
  applyLang(next);
}

/* highlight active nav link by filename */
function markActiveNav() {
  const here = (location.pathname.split("/").pop() || "index.html") || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === here || (here === "" && href === "index.html")) a.classList.add("active");
  });
}

/* render agent roster into #agent-grid (agents.html + home preview) */
function renderAgents(targetSel, limit) {
  const host = document.querySelector(targetSel);
  if (!host) return;
  const lang = getLang();
  const list = limit ? AGENTS.slice(0, limit) : AGENTS;
  host.innerHTML = list.map((a, i) => `
    <article class="postit ${a.color}" data-agent="${a.id}" tabindex="0" role="button">
      <div style="display:flex;align-items:center;gap:12px">
        <span class="agent-emoji">${a.emoji}</span>
        <div>
          <h3>${a.name[lang]}</h3>
          <span class="agent-model">${a.model}</span>
        </div>
      </div>
      <p>${a.role[lang]}</p>
      <div class="agent-when"><strong data-when>${STRINGS[lang]["agents.when"]}</strong> ${a.when[lang]}</div>
    </article>`).join("");

  host.querySelectorAll("[data-agent]").forEach(card => {
    const open = () => openAgentModal(card.getAttribute("data-agent"));
    card.addEventListener("click", open);
    card.addEventListener("keypress", e => { if (e.key === "Enter") open(); });
  });
}

function openAgentModal(id) {
  const a = AGENTS.find(x => x.id === id);
  if (!a) return;
  const lang = getLang();
  const m = document.getElementById("modal");
  if (!m) return;
  m.querySelector(".modal-body").innerHTML = `
    <span class="close" aria-label="close">×</span>
    <h3>${a.emoji} ${a.name[lang]}</h3>
    <p class="meta"><span class="agent-model">${a.model}</span> · ${a.role[lang]}</p>
    <p style="margin-top:14px">${a.desc[lang]}</p>
    <p class="agent-when" style="margin-top:16px"><strong>${STRINGS[lang]["agents.when"]}</strong> ${a.when[lang]}</p>`;
  m.classList.add("open");
  m.querySelector(".close").onclick = closeModal;
}

function closeModal() {
  const m = document.getElementById("modal");
  if (m) m.classList.remove("open");
}

/* render pipeline steps into #flow */
function renderPipeline(targetSel) {
  const host = document.querySelector(targetSel);
  if (!host) return;
  const lang = getLang();
  host.innerHTML = PIPELINE.map((s, i) => `
    <div class="flow-step">
      <span class="step-num">${s.n}</span>
      <div>
        <h3>${s.title[lang]}</h3>
        <p>${s.body[lang]}</p>
      </div>
    </div>
    ${i < PIPELINE.length - 1 ? '<div class="flow-arrow">↓</div>' : ''}`).join("");
}

/* scroll-reveal */
function initReveal() {
  const els = document.querySelectorAll(".fade-up");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(e => io.observe(e));
}

/* boot */
document.addEventListener("DOMContentLoaded", () => {
  markActiveNav();
  applyLang(getLang());

  const toggle = document.querySelector(".lang-toggle");
  if (toggle) toggle.addEventListener("click", toggleLang);

  const backdrop = document.getElementById("modal");
  if (backdrop) backdrop.addEventListener("click", e => { if (e.target === backdrop) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  // initial renders (only fire on pages that have the targets)
  renderAgents("#agent-grid");
  renderAgents("#agent-preview", 6);
  renderPipeline("#flow");

  // re-render shared data on language change
  document.addEventListener("langchange", () => {
    renderAgents("#agent-grid");
    renderAgents("#agent-preview", 6);
    renderPipeline("#flow");
  });

  initReveal();
});

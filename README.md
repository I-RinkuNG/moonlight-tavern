# 🌙 Moonlight Tavern — โรงเตี๊ยมแสงจันทร์

A static field-guide site for the **Cawfee agent crew** — pipeline flow, agent roster,
and an auto-updating research knowledge browser. No build step, no framework: plain
HTML + CSS + vanilla JS, served from GitHub Pages.

## Pages
| File | What |
|---|---|
| `index.html` | Home — pipeline diagram, vault stats, flow + agent previews |
| `agents.html` | Agent roster (6 Post-it cards, click → detail modal) |
| `pipeline.html` | Full pipeline flow, step by step |
| `knowledge.html` | Research browser — search/sort over `data/research.json` |

## Theme
Blackboard (`#1a1a2e`) + chalk text, **Caveat** handwriting font, Post-it note cards.
TH / EN toggle (persisted in `localStorage`, key `mt-lang`).

## Data
`data/research.json` is generated from the NotebookLM research index:

```powershell
./scripts/generate_research_json.ps1
```

Parses `notebooklm_research_index.md` → `{ title, notebook_id, sources, tier, extracted, covers }[]`.
Re-run before each push (the JSON is committed so the site works without the index present).

## Local preview
Any static server works, e.g.:

```powershell
python -m http.server 8080    # then open http://localhost:8080
```

(Open via a server, not `file://` — `knowledge.html` fetches `data/research.json`.)

## Deploy
GitHub Actions (`.github/workflows/deploy.yml`) deploys to GitHub Pages on push to `main`.
**One-time setup:** repo → Settings → Pages → Source = **GitHub Actions**.

---
Built by the Moonlight Tavern crew · Cawfee · Mint · Oz · Iicsa · Evan · Validator

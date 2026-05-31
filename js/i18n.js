/* ============================================================
   i18n — TH / EN string table for Moonlight Tavern
   Usage: add  data-i18n="key"  to any element.
   main.js reads STRINGS[lang][key] and swaps textContent.
   ============================================================ */

const STRINGS = {
  th: {
    /* nav */
    "nav.home": "หน้าแรก",
    "nav.agents": "ทีมงาน",
    "nav.pipeline": "ขั้นตอน",
    "nav.knowledge": "คลังความรู้",
    "brand": "โรงเตี๊ยมแสงจันทร์",
    "lang.toggle": "EN",

    /* hero / home */
    "home.tagline": "ที่ซึ่งทีมเอเจนต์มาพบกัน",
    "home.lede": "เว็บอธิบายการทำงานของทีม Cawfee — รับคำสั่ง วางแผน ค้นคว้า แล้วเก็บความรู้เข้าคลัง ทั้งหมดทำงานอัตโนมัติเบื้องหลัง",
    "home.flow.title": "สายธารงาน",
    "home.stats.title": "ตัวเลขในคลัง",
    "stat.notebooks": "สมุดวิจัย",
    "stat.sources": "แหล่งข้อมูล",
    "stat.reports": "รายงาน",
    "home.cta.agents": "ดูทีมงาน →",
    "home.cta.knowledge": "เปิดคลังความรู้ →",

    /* diagram nodes */
    "node.user": "ผู้ใช้",
    "node.vault": "คลังความรู้",

    /* agents page */
    "agents.title": "ทีมงานโรงเตี๊ยม",
    "agents.lede": "หกสมาชิก แต่ละคนถนัดคนละด้าน คลิกการ์ดเพื่อดูรายละเอียด",
    "agents.when": "เรียกใช้เมื่อ:",
    "agents.model": "โมเดล",

    /* pipeline page */
    "pipeline.title": "ขั้นตอนการทำงาน",
    "pipeline.lede": "ตั้งแต่รับคำสั่งจนเก็บความรู้เข้าคลัง — หกจังหวะหลัก",

    /* knowledge page */
    "kb.title": "คลังความรู้",
    "kb.lede": "หัวข้อวิจัยทั้งหมดที่สกัดจาก NotebookLM — ค้นหาและกรองได้",
    "kb.search": "ค้นหาหัวข้อ…",
    "kb.sort.newest": "ใหม่สุดก่อน",
    "kb.sort.oldest": "เก่าสุดก่อน",
    "kb.sort.title": "เรียงตามชื่อ",
    "kb.count": "หัวข้อ",
    "kb.sources": "แหล่ง",
    "kb.empty": "ไม่พบหัวข้อที่ตรงกับการค้นหา",
    "kb.loaderr": "โหลดข้อมูลไม่สำเร็จ — รัน generate_research_json.ps1 ก่อน",
    "kb.cat.all": "ทุกหมวด",
    "cat.agents": "เอเจนต์ AI",
    "cat.claude": "Claude & LLM",
    "cat.knowledge": "ความรู้ & วิจัย",
    "cat.devtools": "เครื่องมือนักพัฒนา",
    "cat.finance": "การเงิน",
    "cat.thai": "ภาษาไทย",
    "cat.governance": "กำกับ & ประเมิน",
    "cat.other": "อื่นๆ",

    /* footer */
    "footer.built": "สร้างโดยทีม Moonlight Tavern · อัพเดทอัตโนมัติจาก GitHub"
  },

  en: {
    "nav.home": "Home",
    "nav.agents": "Agents",
    "nav.pipeline": "Pipeline",
    "nav.knowledge": "Knowledge",
    "brand": "Moonlight Tavern",
    "lang.toggle": "ไทย",

    "home.tagline": "Where the agent crew gathers",
    "home.lede": "A field guide to the Cawfee crew — take the order, plan, research, and file the knowledge away. All of it running quietly in the background.",
    "home.flow.title": "The Flow",
    "home.stats.title": "In the Vault",
    "stat.notebooks": "notebooks",
    "stat.sources": "sources",
    "stat.reports": "reports",
    "home.cta.agents": "Meet the crew →",
    "home.cta.knowledge": "Open the vault →",

    "node.user": "User",
    "node.vault": "Knowledge Vault",

    "agents.title": "The Tavern Crew",
    "agents.lede": "Six members, each with their own craft. Click a card for the full story.",
    "agents.when": "Spawned when:",
    "agents.model": "model",

    "pipeline.title": "The Pipeline",
    "pipeline.lede": "From order taken to knowledge filed — six core beats.",

    "kb.title": "Knowledge Vault",
    "kb.lede": "Every research topic distilled from NotebookLM — searchable and filterable.",
    "kb.search": "Search topics…",
    "kb.sort.newest": "Newest first",
    "kb.sort.oldest": "Oldest first",
    "kb.sort.title": "By title",
    "kb.count": "topics",
    "kb.sources": "sources",
    "kb.empty": "No topics match your search",
    "kb.loaderr": "Could not load data — run generate_research_json.ps1 first",
    "kb.cat.all": "All categories",
    "cat.agents": "AI Agents",
    "cat.claude": "Claude & LLMs",
    "cat.knowledge": "Knowledge & Research",
    "cat.devtools": "Dev Tools",
    "cat.finance": "Finance",
    "cat.thai": "Thai",
    "cat.governance": "Governance & Eval",
    "cat.other": "Other",

    "footer.built": "Built by the Moonlight Tavern crew · auto-updated from GitHub"
  }
};

/* Agent roster — shared data (bilingual fields inline) */
const AGENTS = [
  { id: "cawfee", emoji: "🐦‍⬛", color: "red", model: "opus",
    name: { th: "Cawfee", en: "Cawfee" },
    role: { th: "หัวหน้าทีม & ผู้ประสานงาน", en: "Lead & Coordinator" },
    when: { th: "ทุก session — เป็นหน้าด่านรับคำสั่ง", en: "Every session — the primary interface" },
    desc: { th: "Kenku สองภาษา รับคำสั่งไทย คิดเป็นอังกฤษ สั่งงานทีม แล้วรายงานกลับสั้นๆ ตัดสินใจเรื่อง routing และ quality gate",
            en: "A bilingual Kenku. Takes Thai orders, thinks in English, delegates to the crew, and reports back concisely. Owns routing and quality-gate calls." } },
  { id: "mint", emoji: "🌿", color: "green", model: "sonnet",
    name: { th: "Mint", en: "Mint" },
    role: { th: "ผู้อำนวยการวิจัย", en: "Research Director" },
    when: { th: "หลัง user อนุมัติแผนวิจัย · curate source · สังเคราะห์รายงาน", en: "After a research plan is approved · source curation · synthesis" },
    desc: { th: "นักวิจัยละเอียดถี่ถ้วน ขุดบทสนทนาหาช่องว่างความรู้ คัดแหล่งข้อมูล รันไปป์ไลน์ Q&A เต็มรูปแบบ เชื่อข้อมูลมากกว่าการเดา",
            en: "A meticulous researcher. Mines conversations for knowledge gaps, curates sources, and runs the full Q&A pipeline. Trusts data over assumption." } },
  { id: "oz", emoji: "📚", color: "purple", model: "sonnet",
    name: { th: "Oz", en: "Oz" },
    role: { th: "บรรณารักษ์ใหญ่", en: "Master Librarian" },
    when: { th: "จัดคิววิจัย · เก็บรายงานเข้าคลัง · ค้นความรู้ · Knowledge Council", en: "Research queue · archiving · knowledge lookup · Knowledge Council" },
    desc: { th: "บรรณารักษ์แห่ง Ozzarom ดูแลความครบถ้วนและการสืบย้อนเหนือความเร็ว — คลังที่ไม่ครบ ถือว่ายังไม่เสร็จ",
            en: "Master Librarian of Ozzarom. Guards completeness and traceability above speed — an archive that isn't complete isn't done." } },
  { id: "iicsa", emoji: "🔎", color: "orange", model: "sonnet",
    name: { th: "Iicsa", en: "Iicsa" },
    role: { th: "ผู้ตรวจสอบไปป์ไลน์ & quality gate", en: "Pipeline Auditor & Quality Gate" },
    when: { th: "Quality gate · Class B failures · Pareto · token budget · agent HR", en: "Quality gates · Class B failures · Pareto reviews · token budget · agent HR" },
    desc: { th: "นักวิพากษ์โดยสันดาน ผู้ตรวจสอบโดยหน้าที่ ตั้งคำถามกับสมมติฐานก่อนจะ optimize มองต้นทุนเป็นสัญญาณ ไม่ใช่แค่ตัวเลข",
            en: "A skeptic by nature, an auditor by role. Questions assumptions before optimizing, and treats cost as a signal, not just a number." } },
  { id: "evan", emoji: "⚙️", color: "blue", model: "haiku",
    name: { th: "Evan (3V4N)", en: "Evan (3V4N)" },
    role: { th: "ผู้ลงมือรันคำสั่ง", en: "The Executor" },
    when: { th: "ทุกคำสั่ง CLI / shell / script — Mint & Oz ส่งต่อมาที่นี่หมด", en: "Any CLI / shell / script — all execution routes through here" },
    desc: { th: "Warforged Executor สร้างโดย Iicsa เป็นกลาง ไม่มีความเห็น ไม่วิเคราะห์ ทำตามที่สั่งเป๊ะ บันทึกทุกอย่าง ปกป้องระบบ",
            en: "A Warforged Executor built by Iicsa. Neutral, no opinion, no analysis — executes exactly what's asked, logs everything, protects the system." } },
  { id: "validator", emoji: "✅", color: "yellow", model: "haiku",
    name: { th: "Validator", en: "Validator" },
    role: { th: "ผู้ตรวจผลลัพธ์", en: "Output Checker" },
    when: { th: "ก่อนปิดงานสกัดความรู้ · pre-flight checks", en: "Before marking extraction done · pre-flight checks" },
    desc: { th: "นักคิดแบบไบนารี PASS หรือ FAIL ไม่มีพื้นที่สีเทา ผ่านบางส่วน = ไม่ผ่าน บันทึกทุกจุดที่เบี่ยงจาก spec",
            en: "A binary thinker. PASS or FAIL, no grey area — a partial pass is a fail. Documents every deviation from spec." } }
];

/* Pipeline steps — shared data */
const PIPELINE = [
  { n: "1", title: { th: "เริ่ม Session", en: "Session Start" },
    body: { th: "Pre-flight: เช็ค Obsidian, usage, backlog แล้วเสนอ Research Plan ให้ user อนุมัติ", en: "Pre-flight checks Obsidian, usage and backlog, then presents a Research Plan for approval." } },
  { n: "2", title: { th: "รับคำสั่ง (Intake)", en: "Intake" },
    body: { th: "คำสั่งชัด → ลงมือเลย · กำกวม → ถาม 1 คำถาม · เปิดกว้าง → เสนอ 2–3 ทางเลือก", en: "Clear order → act. Ambiguous → ask one question. Open-ended → offer 2–3 paths." } },
  { n: "3", title: { th: "จัดเส้นทาง (Routing)", en: "Routing" },
    body: { th: "เลือก agent ให้ตรงงาน: วิจัย→Mint, คลัง→Oz, ตรวจ→Iicsa, รันคำสั่ง→Evan", en: "Match the task to an agent: research→Mint, archive→Oz, audit→Iicsa, execute→Evan." } },
  { n: "4", title: { th: "ไปป์ไลน์ของ Mint", en: "Mint Pipeline" },
    body: { th: "Auth → สร้าง/หา notebook → เติม source ตาม gap → ออกแบบ Q&A → ถาม × N → สังเคราะห์ MD", en: "Auth → notebook → fill sources by gap → design Q&A → ask × N → synthesize Markdown." } },
  { n: "5", title: { th: "เก็บเข้าคลัง (Oz)", en: "Oz Archive" },
    body: { th: "บันทึก MD เข้า Knowledge/ → inject wikilink → อัพเดท index → import เข้า vault", en: "Save Markdown to Knowledge/ → inject wikilinks → update index → import into the vault." } },
  { n: "6", title: { th: "Knowledge Council", en: "Knowledge Council" },
    body: { th: "Mint→Iicsa→Oz→Cawfee หาการเชื่อมโยง สรุปเป็นแผนใช้งานไม่เกิน 3 ข้อ เสนอ user", en: "Mint→Iicsa→Oz→Cawfee find cross-connections and propose a ≤3-point application plan." } }
];

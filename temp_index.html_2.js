

// ==================== RESILIENT DATA STORAGE & AUTO-RECOVERY ENGINE ====================
function loadData(key, def){
  try {
    // 1. Direct key lookup
    const direct = localStorage.getItem(key);
    if(direct){
      try { return JSON.parse(direct); } catch(e){}
    }

    // 2. Extract base prefix (e.g. 'rana_gallery' from 'rana_gallery_v35' or 'rana_gallery_data')
    const prefix = key.replace(/_(?:data|v\d+|bw)$/, '');
    
    // 3. Scan all keys in localStorage to auto-recover from any previous version
    let bestKey = null;
    let maxVer = -1;
    
    for(let i = 0; i < localStorage.length; i++){
      const k = localStorage.key(i);
      if(k && (k.startsWith(prefix) || (prefix==='rana_experience' && k.startsWith('rana_exp')))){
        const match = k.match(/_v(\d+)$/);
        const ver = match ? parseInt(match[1], 10) : 0;
        if(ver >= maxVer){
          maxVer = ver;
          bestKey = k;
        }
      }
    }

    if(bestKey){
      const saved = localStorage.getItem(bestKey);
      if(saved){
        const parsed = JSON.parse(saved);
        // Automatically migrate forward to the standard key
        localStorage.setItem(key, saved);
        console.log(`[Auto-Recovered] Restored data for ${key} from ${bestKey}`);
        return parsed;
      }
    }

    return def;
  } catch(e) {
    console.error('Storage load error:', e);
    return def;
  }
}

function saveData(key, val){
  try {
    const json = JSON.stringify(val);
    localStorage.setItem(key, json);
    const prefix = key.replace(/_(?:data|v\d+|bw)$/, '');
    localStorage.setItem(prefix + '_data', json);
    if(window.scheduleGitHubAutoSync) window.scheduleGitHubAutoSync();
  } catch(e) {
    console.error('Storage save error:', e);
  }
}
NOVELS_DATA = [{"id": "childs-world-1", "title": "The Child's World: How Family and the Earliest Relationships Shape the Human Mind", "cover": "Novels/Amazon_B0H4NV4494/cover.jpg", "genre": "Psychology & Attachment", "year": "Published", "tagline": "How family dynamics and early attachment shape cognitive and emotional growth.", "desc": "An authoritative developmental psychology study exploring how initial familial attachments, parental responsiveness, and early relational environments create the foundational neurobiological architecture of the human mind.", "excerpt": "We are built from the first hands that hold us.\n\nLong before language forms, the infant brain is mapping the predictability of the world through the micro-attunements of its caregivers. This volume provides a deep clinical and observational inquiry into primary attachment bonds, emotional co-regulation, and the lifelong cognitive scaffolding erected in the earliest years of childhood.", "amazonUrl": "https://www.amazon.co.uk/dp/B0H4NV4494", "amzLink": "https://www.amazon.co.uk/dp/B0H4NV4494"}, {"id": "childs-world-2", "title": "The Child's World: How Harm and Healing in Childhood Shape the Human Mind", "cover": "Novels/Amazon_B0H4WT1JZY/cover.jpg", "genre": "Trauma & Resilience", "year": "Published", "tagline": "Understanding developmental adversity, neurological resilience, and restorative pathways.", "desc": "A rigorous examination of childhood adversity, traumatic stress responses, neuroplasticity, and the clinical mechanisms through which psychological healing and restorative resilience take place.", "excerpt": "Adversity writes itself into the nervous system, but biology is not destiny.\n\nThis volume examines developmental trauma through an integrated neurobiological and relational lens. Exploring how the brain adapts to threat and how targeted relational safety, therapeutic attunement, and restorative environments allow children to reclaim emotional equilibrium and thriving futures.", "amazonUrl": "https://www.amazon.co.uk/dp/B0H4WT1JZY", "amzLink": "https://www.amazon.co.uk/dp/B0H4WT1JZY"}, {"id": "childs-world-3", "title": "The Child's World: How Teachers, Classrooms, and the World Beyond the Family Shape the Human Mind", "cover": "Novels/Amazon_B0H57BNZGQ/cover.jpg", "genre": "Educational Psychology", "year": "Published", "tagline": "Exploring classroom environments, pedagogical impact, and social development.", "desc": "A deep dive into the educational ecosystem, examining how school culture, peer dynamics, teacher-student relationships, and pedagogical frameworks shape executive function, motivation, and character.", "excerpt": "When a child steps across the threshold of the school gate, the circle of the world expands.\n\nHere, beyond the domestic sphere, the developing mind confronts institutional expectations, peer hierarchies, and pedagogical models. This volume unpacks the psychology of classroom belonging, academic self-concept, and the transformative power of educators who see beyond curriculum to the human being.", "amazonUrl": "https://www.amazon.co.uk/dp/B0H57BNZGQ", "amzLink": "https://www.amazon.co.uk/dp/B0H57BNZGQ"}, {"id": "childs-world-4", "title": "The Child's World: On Screens, Social Media, and the Childhood That Changed", "cover": "Novels/Amazon_B0HFK6LWPG/cover.jpg", "genre": "Digital Psychology", "year": "Published", "tagline": "An essential inquiry into attention, social media, and digital childhood.", "desc": "An urgent, evidence-based exploration of how ubiquitous connectivity, algorithmic media feeds, and digital interfaces are transforming childhood development, attention spans, social competence, and adolescent mental health.", "excerpt": "For the first time in human history, an entire generation has been raised inside an algorithmic environment engineered to capture and monetize their attention.\n\nThis volume offers a lucid, data-grounded analysis of digital media immersion: from neural reward loops and sleep architecture disruption to peer comparison dynamics and actionable strategies for preserving real-world cognitive play.", "amazonUrl": "https://www.amazon.co.uk/dp/B0HFK6LWPG", "amzLink": "https://www.amazon.co.uk/dp/B0HFK6LWPG"}, {"id": "childs-world-5", "title": "The Child's World: Adolescence and After \u2014 On Growing Up, Loss, and the Search for Yourself", "cover": "Novels/The Child's World Book Five/cover.jpg", "genre": "Adolescent Psychology", "year": "Published", "tagline": "On growing up, identity formation, loss, and the search for authentic selfhood.", "desc": "A profound exploration of the transitional crucible from puberty to early adulthood. Investigates identity individuation, existential grief, social pressure, and the courage required to author an authentic life.", "excerpt": "Adolescence is the great threshold between the inherited world and the authored self.\n\nThis volume delves into the psychological and neurodevelopmental storms of teenage life: the dismantling of childhood certainties, the intensity of peer validation, the bittersweet ache of individuation from parents, and the forging of personal values and purposeful adulthood.", "amazonUrl": "", "amzLink": ""}, {"id": "childs-world-6", "title": "The Child's World: The Adult That Emerges \u2014 On Relationships, Patterns, and Breaking What Was Broken", "cover": "Novels/The Child's World Book Six/cover.jpg", "genre": "Adult Psychology & Legacy", "year": "Published", "tagline": "On relationships, lifelong behavioural patterns, and breaking generational trauma.", "desc": "The culminating volume in The Child's World series. Analyzes how early developmental blueprints govern adult relationships, career decisions, and emotional habits, and provides a roadmap for conscious generational healing.", "excerpt": "We carry childhood not as a memory, but as a framework.\n\nIn this final masterwork, the series brings its full psychological inquiry into adulthood. Examining how childhood coping strategies manifest in romantic partnerships, workplace dynamics, and parenting styles\u2014and illustrating how adults can consciously dismantle outdated survival mechanisms to live with presence, intimacy, and integrity.", "amazonUrl": "", "amzLink": ""}, {"id": "first-light", "title": "First Light: Ten Days to a Quieter Mind and a Sharper Life", "cover": "Novels/Amazon_B0H4LSVSYP/cover.jpg", "genre": "Mindfulness & Psychology", "year": "Published", "tagline": "Ten days to a quieter mind, unbreakable focus, and a sharper life.", "desc": "A focused ten-day manual designed to eliminate mental clutter, dissolve chronic overthinking, restore natural circadian energy, and reclaim deep cognitive focus in an overstimulated world.", "excerpt": "The modern mind is not tired from working; it is exhausted from endless distraction.\n\nFirst Light provides a structured 10-day cognitive reset program. By recalibrating digital consumption, mastering micro-refocusing rituals, restoring morning clarity, and establishing intentional energy boundaries, you systematically strip away cognitive noise to discover unprecedented sharpness and daily peace.", "amazonUrl": "https://www.amazon.co.uk/dp/B0H4LSVSYP", "amzLink": "https://www.amazon.co.uk/dp/B0H4LSVSYP"}, {"id": "crooked-canon", "title": "The Crooked Canon", "cover": "Novels/The Crooked Canon/The Crooked Canon.png", "genre": "Literary Fiction", "year": "Published", "tagline": "For every boy who finished in the middle and kept going anyway.", "desc": "Set against the rigid discipline of an uncompromising Pakistani boarding school, The Crooked Canon follows Zaid Mirza and a classroom of twenty-three boys navigating harsh authority, quiet defiance, the weight of family expectations, and the unyielding pursuit of self-identity.", "excerpt": "He arrived at Cadet College Hasan Abdal fat, last, and unable to climb a rope.\n\nThe boy in the next bed had been training since he was eight. The boy across the hall had a Brigadier for a father. The boy everyone kept watching without knowing they were watching him had already done everything the college rewarded before the college asked him to.\n\nZaid had a First Prize essay nobody here would ever read, a biscuit wrapper at the bottom of his locker, and a brain that built maps of things other people simply memorised.\n\nHe had four years to become the highest-ranked cadet in the college.\n\nHe had none of the four things it required.\n\nThis is how he got there.", "amazonUrl": "", "amzLink": ""}, {"id": "the-later-hand", "title": "The Later Hand", "cover": "Novels/The Later Hand/The Later Hand.jpg", "genre": "Literary Fiction", "year": "Published", "tagline": "We spend enormous portions of our lives moving through beauty we have pre-decided is ordinary.", "desc": "A deeply moving literary novel exploring art, grief, emotional safety, and redemption. Follows Tariq, an artist living between routine and awakening in a layered city, who must confront the fractures of his past to discover the living presence behind genuine craft and human connection.", "excerpt": "There is a specific quality to the light in this city at half past nine in the morning, when the sky cannot decide between grey and gold and the streets carry the smell of last night's rain drying against warm stone. I have walked these pavements for years without truly noticing them. This is the first real thing I learned: we spend enormous portions of our lives moving through beauty we have pre-decided is ordinary.\n\nMy name is Tariq. My name was not important to me for a long time. Names are given at the start of things and this story, like most stories worth telling, begins somewhere in the middle \u2014 on a Tuesday in February, in the year I turned twenty-nine, in the hour I finally stopped mistaking routine for wisdom.\n\nI was a concept artist, or trying to become one. A concept artist makes worlds that do not exist. What I made were technically proficient reproductions of the gestures of world-making \u2014 correct anatomies, properly calibrated perspectives, competently rendered light sources \u2014 without any world actually inside them. Architecture without habitation is only a shell. I had studied the architecture. I had forgotten to put anything inside it.", "amazonUrl": "", "amzLink": ""}, {"id": "buffalo", "title": "What the Buffalo Carry", "cover": "Novels/What the Buffalo Carry/What the Buffalo Carry.png", "genre": "Literary Fiction", "year": "Published", "tagline": "The first stories we are told become the rooms we live in.", "desc": "A lyrical, atmospheric rural epic set in the agricultural heartland of Punjab, exploring memory, land inheritance, ancient folklore, and the quiet sacrifices of rural life.", "excerpt": "The night my great-grandmother first told me about the buffalo, the sky was doing something I had never seen it do before.\n\nIt was burning.\n\nNot the way things burn in fires \u2014 not with smoke and heat and the panicked smell of something lost \u2014 but quietly, with a twinkling persistence, as though each star had decided long ago to commit to its small brightness and had been faithfully keeping that promise ever since. I was seven years old, and I had recently learned to count past a hundred, so I lay on my back on the flat roof of our house and tried to count them.\n\nThe roof was our family's second living room, unspoken and understood. In summer, when the heat pressed down into the rooms below like a warm hand that would not lift, we carried our thin mattresses up the narrow stairs and slept there, under the open sky, with the city breathing around us and the stars breathing above.\n\n'The first stories we are told become the rooms we live in for the rest of our lives.'", "amazonUrl": "", "amzLink": ""}, {"id": "shavings", "title": "Shavings", "cover": "Novels/Shavings/shavings_cover.png", "genre": "Literary Fiction & Allegory", "year": "Published", "tagline": "Of Lines, of Love, and of What Is Left Behind.", "desc": "A poetic, allegorical novella in eight chapters exploring creativity, mortality, craftsmanship, and the cost of making your mark. Follows Pascal Graphite, Vera Rowe, and Sienna Hollow across the White Expanse.", "excerpt": "He was born in a box that smelled of cedar and quiet. It was not an unpleasant way to begin. Twelve of them lay in there like brothers \u2014 neat, unused, parallel \u2014 and Pascal had always known that this arrangement, like most comfortable arrangements, was temporary.\n\nThe box was made of yellow cardboard with red lettering on the lid: HB. MEDIUM. FOR GENERAL USE. He had always hated that last part. For general use. As though he were a spoon. As though he were a thing without interiority.\n\nIn the cedar dark, he dreamed of the White Expanse. An enormous blankness that asked nothing of him and everything of him at once. He took one step. Behind him, a dark line appeared. Thin. Imperfect. His.\n\n'We are not diminished by what we give. We are only diminished by what we withhold.'", "amazonUrl": "", "amzLink": "", "readUrl": "shavings.html"}, {"id": "veil", "title": "The Veil of Shadows", "cover": "Novels/The Veil of Shadows/ChatGPT Image May 4, 2026, 11_41_39 PM.png", "genre": "Epic Fantasy", "year": "Published", "tagline": "They say silence is peace. But I've seen what festers in silence.", "desc": "A sweeping dark epic fantasy following an exiled realm scholar who uncovers a decaying ancient magic that threatens to dissolve the boundary between reality and the void.", "excerpt": "They say silence is peace. But I've seen what festers in silence.\n\nWhen the celestial towers began to dim across the northern ridge, only the outcast order of chroniclers understood the truth: the ancient wards were not falling to an army, but to the forgotten memories of the world itself.", "amazonUrl": "", "amzLink": ""}, {"id": "record", "title": "The Record Survives", "cover": "Novels/The Record Survives/The Record Survives.png", "genre": "Historical Fiction", "year": "Published", "tagline": "Witnessing matters. Because what is recorded outlives what is destroyed.", "desc": "A rich historical drama exploring the preservation of manuscripts, forgotten architectural blueprints, and dangerous truths across revolutionary turmoil in 19th-century Eurasia.", "excerpt": "Witnessing matters. Because what is recorded outlives what is destroyed.\n\nThrough crumbling archives, covert printing presses, and perilous border crossings, The Record Survives traces the perilous journey of an underground archivist determined to save a culture's collective memory from deliberate erasure.", "amazonUrl": "", "amzLink": ""}, {"id": "beacon", "title": "The Last Beacon", "cover": "Novels/The Last Beacon/The Last Beacon.png", "genre": "Speculative Fiction", "year": "Published", "tagline": "To carry something is to change it.", "desc": "A poignant speculative odyssey set along a remote coastal archipelago where the keeper of an automated atmospheric beacon receives a signal long thought impossible.", "excerpt": "To carry something is to change it.\n\nSurrounded by crashing surf and endless horizons, the lighthouse at the edge of the world was meant to stand as a solitary sentinel. But when an impossible transmission echoes across the radio frequencies, everything changes.", "amazonUrl": "", "amzLink": ""}, {"id": "ten-days", "title": "Ten Days in Heaven", "cover": "Novels/Ten Days in Heaven/20260407_1207_Image Generation_simple_compose_01knksznadeb291cpy5nqgw13c.png", "genre": "Psychological Thriller", "year": "Published", "tagline": "Memory is not a record. It is a weapon.", "desc": "A taut, claustrophobic psychological thriller about identity manipulation, fabricated grief, and the ten days that shattered an architect's perception of reality.", "excerpt": "Memory is not a record. It is a weapon.\n\nAwakening in an immaculate mountain estate with no recollection of how he arrived, Nathan is told he has survived a catastrophic trauma. But with each passing hour, the fractures in his surroundings begin to reveal a chilling truth.", "amazonUrl": "", "amzLink": ""}];
TECH_PROJECTS_DATA = [{"id": "velra", "title": "Vel Ra Perfumes 3D Twin & Handover Dossier", "subtitle": "Interactive Architectural Spatial Twin (Capel Street, Dublin 1)", "status": "Live", "badgeClass": "badge-live", "num": "01", "liveUrl": "https://velra-viewer.ranakaharian1.workers.dev/", "desc": "An interactive architectural photographic handover dossier and real-time WebGL 3D digital twin platform for a bespoke luxury fragrance boutique on Capel Street, Dublin 1. Built with millimetric CAD blueprint matrices, master materials board, high-CRI retail lighting compliance engine (CIBSE SLL), bespoke joinery passes, and digital client sign-off authorization.", "features": ["Interactive WebGL 3D space orbit & inspection", "Millimeter-accurate CAD blueprints & dimension matrix", "High-CRI 3000K retail lighting & photometric simulation", "Stage 04 fabrication-ready joinery & client sign-off"], "tech": ["Cloudflare Workers", "WebGL / 3D Twin", "Interactive CAD Engine", "Photometrics / Lighting", "Edge Runtime", "Vanilla ES6+"], "buttons": [{"label": "Launch 3D Handover Dossier \u2197", "url": "https://velra-viewer.ranakaharian1.workers.dev/", "primary": true}], "hasLinks": true, "links": [{"label": "Launch 3D Handover Dossier \u2197", "url": "https://velra-viewer.ranakaharian1.workers.dev/", "primary": true}]}, {"id": "launcher", "title": "DreamsLab Cyber Launcher", "subtitle": "Chrome Multi-Profile Link Vault", "status": "Live", "badgeClass": "badge-live", "num": "02", "liveUrl": "https://abdullahinayat24-lang.github.io/link-launcher/", "desc": "A standalone Windows desktop app that acts as an encrypted personal link vault with full multi-account Chrome profile management. Save your important links, notes and account context per Google profile, then launch any Chrome account in one click. Protected with AES-256-GCM encryption.", "features": ["Modular application dock & launcher", "Real-time system telemetry monitor", "Encrypted local vault storage", "Low-overhead native resource pipeline"], "tech": ["Electron", "Node.js", "AES-256-GCM", "Web Crypto API", "Chrome API", "Windows", "GitHub Pages"], "buttons": [{"label": "Download for Windows \u2197", "url": "https://github.com/abdullahinayat24-lang/link-launcher/releases/download/v1.0.0/DreamsLab-Cyber-Launcher-Setup.exe", "primary": true}, {"label": "Live Web App \u2197", "url": "https://abdullahinayat24-lang.github.io/link-launcher/", "primary": false}], "hasLinks": true, "links": [{"label": "Download for Windows \u2197", "url": "https://github.com/abdullahinayat24-lang/link-launcher/releases/download/v1.0.0/DreamsLab-Cyber-Launcher-Setup.exe", "primary": true}, {"label": "Live Web App \u2197", "url": "https://abdullahinayat24-lang.github.io/link-launcher/", "primary": false}]}, {"id": "mythos", "title": "Mythos Encyclopedia & Gods App", "subtitle": "Global Gods, World Myths & Folklore Platform", "status": "Live Web & Mobile", "badgeClass": "badge-live", "num": "03", "liveUrl": "https://mythos-mythology-app.vercel.app/", "desc": "A deep cross-platform encyclopedia cataloging 50+ world mythologies and thousands of deities from Greek, Norse, and Egyptian to Hindu, Celtic, Aztec, Japanese, African, and urban folklore. Features rich mythological dossiers, daily deity notifications, interactive world mythology atlas, sacred objects collection, and a 4-tier mythology quiz with global leaderboards.", "features": ["200+ authenticated mythological entities & pantheons", "Interactive world mythology map & sacred objects atlas", "Daily deity notifications & offline search indexing", "4-tier interactive mythology quiz engine with leaderboards"], "tech": ["Vercel", "Vue.js / Vite", "Ionic / Capacitor", "Android SDK / Google Play", "TypeScript", "SQLite", "Wikipedia API"], "buttons": [{"label": "Launch Web App \u2197", "url": "https://mythos-mythology-app.vercel.app/", "primary": true}, {"label": "Google Play Store \u2197", "url": "https://play.google.com/store/apps/details?id=com.mythos.app", "primary": false}], "hasLinks": true, "links": [{"label": "Launch Web App \u2197", "url": "https://mythos-mythology-app.vercel.app/", "primary": true}, {"label": "Google Play Store \u2197", "url": "https://play.google.com/store/apps/details?id=com.mythos.app", "primary": false}]}, {"id": "stock-manager", "title": "Supplier Ledger & Stock Management Engine", "subtitle": "Multi-Supplier Purchase Orders, OCR Invoicing & Excel/PDF Suite", "status": "Live", "badgeClass": "badge-live", "num": "04", "liveUrl": "https://stock-manager.idigitalfun.workers.dev/", "desc": "A comprehensive commercial supplier and inventory management web application. Features multi-supplier purchase order tracking, real-time stock required calculations, return/faulty item logging, OCR invoice parsing with Tesseract.js, and automated XLSX/PDF export capabilities.", "features": ["Multi-supplier purchase order tracking & status monitoring", "Automated stock required calculations and priority matrix", "Built-in OCR invoice scanner (Tesseract.js) and PDF engine", "Full Excel (.xlsx) and JSON cloud backup synchronization"], "tech": ["Cloudflare Workers", "JavaScript (ES6+)", "Tesseract.js OCR", "jsPDF", "SheetJS / XLSX", "Edge Storage"], "buttons": [{"label": "Launch Supplier Manager \u2197", "url": "https://stock-manager.idigitalfun.workers.dev/", "primary": true}], "hasLinks": true, "links": [{"label": "Launch Supplier Manager \u2197", "url": "https://stock-manager.idigitalfun.workers.dev/", "primary": true}]}, {"id": "phone-count", "title": "StockLine Multi-Branch Device Inventory", "subtitle": "Real-Time Retail Phone Count & Hardware Audit Platform", "status": "Live", "badgeClass": "badge-live", "num": "05", "liveUrl": "https://phone-count.idigitalfun.workers.dev/", "desc": "A high-speed multi-location device inventory and phone stock audit web application deployed on Cloudflare Workers. Enables retail branches to perform rapid live device counts, track IMEI/serial hardware states, reconcile discrepancies in real time, and export consolidated audit sheets.", "features": ["Multi-shop live device count and hardware reconciliation", "Real-time stock discrepancy audit and validation", "Category and model filtering with rapid barcode/search indexing", "Instant Cloudflare Edge sync with zero latency"], "tech": ["Cloudflare Workers", "JavaScript (ES6+)", "Edge Storage", "HTML5 Canvas / DOM"], "buttons": [{"label": "Launch Device Inventory \u2197", "url": "https://phone-count.idigitalfun.workers.dev/", "primary": true}], "hasLinks": true, "links": [{"label": "Launch Device Inventory \u2197", "url": "https://phone-count.idigitalfun.workers.dev/", "primary": true}]}, {"id": "holidays", "title": "Staff Holidays & Hours Management Portal", "subtitle": "Automated Staff Hours, Accruals & Official PDF Statement Engine", "status": "Live", "badgeClass": "badge-live", "num": "06", "liveUrl": "https://idfl-holidays.idigitalfun.workers.dev/", "desc": "An enterprise staff attendance, hours tracking, and leave management system deployed on Cloudflare Workers. Features automated holiday accrual calculations, weekly timesheet logging, single-employee official PDF statement generation, multi-branch summary reporting, and one-click GitHub cloud synchronization.", "features": ["Automated holiday & sick pay accrual calculation engine", "One-click official PDF statement generation for individual staff", "Multi-shop weekly hours breakdown & executive summary tables", "Real-time GitHub cloud sync with instant mobile worker deployment"], "tech": ["Cloudflare Workers", "JavaScript (ES6+)", "jsPDF / PDF Generation", "GitHub API Sync", "Edge Runtime"], "buttons": [{"label": "Launch Staff Portal \u2197", "url": "https://idfl-holidays.idigitalfun.workers.dev/", "primary": true}], "hasLinks": true, "links": [{"label": "Launch Staff Portal \u2197", "url": "https://idfl-holidays.idigitalfun.workers.dev/", "primary": true}]}, {"id": "timeline", "title": "World History & Mythology Timeline", "subtitle": "Chronological Multi-Track Engine (10,000 BCE \u2013 1800 CE)", "status": "Web Platform", "badgeClass": "badge-outline", "num": "07", "liveUrl": "", "desc": "An interactive, high-contrast, multi-track chronological timeline connecting global civilizations, founding epics, and legendary writers across 12 millennia. Features cross-epoch zoom navigation, civilization filter matrices, epoch-anchored historical narratives, and instant literature cross-referencing.", "features": ["12,000-year multi-track chronological canvas", "Civilization filter matrices & cross-epoch zooming", "Epic literature cross-referencing & author dossiers", "Fluid 60fps pan/zoom visual engine"], "tech": ["JavaScript (ES6+)", "HTML5 Canvas / DOM", "CSS Grid", "JSON Data Engine"], "buttons": [], "hasLinks": false, "links": []}, {"id": "psych", "title": "Psychology Lecture Knowledge Platform", "subtitle": "University Research & Student Educational Portal", "status": "Production-Ready", "badgeClass": "badge-outline", "num": "08", "liveUrl": "", "desc": "A specialized academic portal built for university psychology students and researchers. Combines structured modular lecture pathways, clinical case study dossiers, interactive self-assessment quizzes, and downloadable PDF research summaries.", "features": ["Modular lecture pathway curriculum engine", "Clinical case study dossiers & diagnostic trees", "Interactive self-assessment quizzing system", "Responsive reading mode & bibliography manager"], "tech": ["JavaScript (ES6+)", "HTML5 / CSS3", "Local Storage", "PDF Generation"], "buttons": [], "hasLinks": false, "links": []}, {"id": "onboardflow", "title": "OnboardFlow", "subtitle": "Automated Client Onboarding & Intake System", "status": "Full-Stack SaaS", "badgeClass": "badge-outline", "num": "09", "liveUrl": "", "desc": "An enterprise client onboarding automation platform that eliminates administrative friction through dynamic multi-step intake flows, automated document collection, digital e-signatures, and instant client workspace provisioning.", "features": ["Dynamic conditional intake questionnaires", "Secure encrypted document upload pipeline", "Automated client milestone progress tracking", "Webhook integrations for CRM and billing systems"], "tech": ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"], "buttons": [], "hasLinks": false, "links": []}, {"id": "medicare", "title": "MediCare AI Companion", "subtitle": "Intelligent Patient Health Assistant", "status": "Healthcare Web App", "badgeClass": "badge-outline", "num": "10", "liveUrl": "", "desc": "A privacy-first healthcare web application designed to support patient wellness through intelligent symptom tracking, medication scheduling with reminders, medical report summarization, and emergency contact coordination.", "features": ["Natural-language health query assistant", "Medication schedule & adherence tracking", "Medical report plain-English summarizer", "Encrypted local health journal"], "tech": ["TypeScript", "Next.js", "Tailwind CSS", "Web Speech API", "IndexedDB"], "buttons": [], "hasLinks": false, "links": []}, {"id": "repair", "title": "Retail Repair Price Matrix", "subtitle": "Real-Time Repair Quoting & Device Diagnostic Engine", "status": "Live Engine", "badgeClass": "badge-outline", "num": "11", "liveUrl": "", "desc": "A multi-branch commercial repair price catalog and service quoting matrix. Features real-time part cost lookups, labor rate calculation, customer ticket generation, and automated WhatsApp/SMS quotation exports.", "features": ["Instant multi-brand device repair pricing engine", "Real-time part margin & labor calculation", "Customer receipt & printable service tickets", "Multi-store branch synchronization"], "tech": ["JavaScript (ES6+)", "Cloudflare Workers", "HTML5", "CSS3"], "buttons": [], "hasLinks": false, "links": []}];

const GALLERY_DATA = [
  {
    "title": "Children's Creative Studio & Art Illustration Study",
    "cat": "environment",
    "pillar": "Personal",
    "path": "Photos & to upload/Instagram/Childrens_Room_Art_Study.jpg",
    "images": [
      "Photos & to upload/Instagram/Childrens_Room_Art_Study.jpg"
    ],
    "desc": "Rich spatial concept study capturing a warm sunlit creative room with children's pinboard illustrations, drawing table studies, and classical framed portrait artwork.",
    "youtubeUrl": ""
  },
  {
    "title": "Japanese Traditional Estate & Shinjuku Architecture Study",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Comprehensive 3D architectural study combining traditional wooden joinery, Zen estate pavilions, tea house interiors, and Tokyo Shinjuku street elevations.",
    "path": "Photos & to upload/Japanese Building/All Work (26).jpg",
    "images": [
      "Photos & to upload/Japanese Building/All Work (26).jpg",
      "Photos & to upload/Japanese Building/All Work (7).png",
      "Photos & to upload/Japanese Building/All Work (9).png",
      "Photos & to upload/Exterior/All Work (3).jpg"
    ]
  },
  {
    "title": "Egyptian Mythology, Temple of Anubis & Osiris Sanctum",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "High-detail cinematic Egyptian mythology collection featuring monumental sandstone monoliths, hieroglyphic reliefs, Pharaonic sanctums, and god sculptures.",
    "path": "Photos & to upload/Egyptian Mythology/All Work (102).jpg",
    "images": [
      "Photos & to upload/Egyptian Mythology/All Work (102).jpg",
      "Photos & to upload/Egyptian Mythology/All Work (103).jpg",
      "Photos & to upload/Egyptian Mythology/All Work (104).jpg",
      "Photos & to upload/Egyptian Mythology/All Work (105).jpg",
      "Photos & to upload/Egyptian Mythology/All Work (140).jpg",
      "Photos & to upload/Sculptures/All Work (180).jpg"
    ]
  },
  {
    "title": "Eskimo Pizza: Commercial Dining Suite & Interior Fit-Out",
    "pillar": "Client",
    "cat": "environment",
    "desc": "Complete commercial architectural visualization and interior design presentation for Eskimo Pizza dining floor, service counter, and rustic brickwork.",
    "path": "Photos & to upload/Client/Eskimo/Interior/Final1.jpg",
    "images": [
      "Photos & to upload/Client/Eskimo/Interior/Final1.jpg",
      "Photos & to upload/Client/Eskimo/Interior/Final3.jpg",
      "Photos & to upload/Client/Eskimo/Interior/Final4.jpg",
      "Photos & to upload/Client/Eskimo/Interior/Final6.jpg"
    ]
  },
  {
    "title": "IDFL Kiosk: Retail Hardware & Service Center Architectural Visual",
    "pillar": "Client",
    "cat": "environment",
    "desc": "Modular shopping mall service kiosk and repair diagnostic reception station designed with custom acrylic display cases and LED backlighting.",
    "path": "Photos & to upload/Client/IDFL/IDFL Kiosk/Final1.jpg",
    "images": [
      "Photos & to upload/Client/IDFL/IDFL Kiosk/Final1.jpg",
      "Photos & to upload/Client/IDFL/IDFL Kiosk/Final 2.jpg"
    ]
  },
  {
    "title": "Get Connected: Executive Commercial Workspace & Acoustic Pods (Blender 3D)",
    "pillar": "Client",
    "cat": "environment",
    "desc": "Full-scale modern corporate interior fit-out modeled in Blender 3D featuring acoustic breakout booths, open-plan workstations, and executive boardrooms.",
    "path": "Photos & to upload/Get Connected Interior/abdullahinayatart_1670237709_2986492823343839673_1538841423_8.webp",
    "images": [
      "Photos & to upload/Get Connected Interior/abdullahinayatart_1670237709_2986492823343839673_1538841423_8.webp",
      "Photos & to upload/Get Connected Interior/abdullahinayatart_1670237709_2986492823352218021_1538841423_4.webp",
      "Photos & to upload/Get Connected Interior/abdullahinayatart_1670237709_2986492823520009597_1538841423_6.webp",
      "Photos & to upload/Get Connected Interior/abdullahinayatart_1670237709_2986492823570403632_1538841423_5.webp",
      "Photos & to upload/Get Connected Interior/abdullahinayatart_1670237709_2986492823528350189_1538841423_9.webp",
      "Photos & to upload/Get Connected Interior/abdullahinayatart_1670237709_2986492823536846267_1538841423_1.webp"
    ]
  },
  {
    "title": "Rizpros: Commercial Workspace & Operations Logistics",
    "pillar": "Client",
    "cat": "3d",
    "desc": "Dual-space 3D architectural renders exploring modern administrative office flow, warehouse inventory sorting zones, and delivery staging bays.",
    "path": "Photos & to upload/Client/Rizpros/Image_0010008.png",
    "images": [
      "Photos & to upload/Client/Rizpros/Image_0010008.png",
      "Photos & to upload/Client/Rizpros/4.png"
    ]
  },
  {
    "title": "Luxury Fragrance & Noir Perfume Product Visualizations",
    "pillar": "Personal",
    "cat": "product",
    "desc": "Commercial perfume bottle visualization series featuring glass caustic simulations, frosted flacons, liquid meniscus, and studio rim lighting.",
    "path": "Photos & to upload/Product Render/Perfume (1).png",
    "images": [
      "Photos & to upload/Product Render/Perfume (1).png",
      "Photos & to upload/Product Render/Perfume (2).png",
      "Photos & to upload/Product Render/Perfume (3).png"
    ]
  },
  {
    "title": "Interior Volumes: A Study in Architectural Light & Materiality",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Clean contemporary kitchen interior exploration highlighting monolithic marble island counters, recessed task lighting, and matte cabinetry finishes.",
    "path": "Photos & to upload/Kitchen/67748729_2470650796319052_4466508233967665152_o.jpg",
    "images": [
      "Photos & to upload/Kitchen/67748729_2470650796319052_4466508233967665152_o.jpg",
      "Photos & to upload/Kitchen/All Work (160).jpg",
      "Photos & to upload/Kitchen/All Work (167).jpg"
    ],
    "subVideos": {},
    "youtubeUrl": ""
  },
  {
    "title": "Urban Rain & Historic Street Corridor Study",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Atmospheric moody street scene with wet cobblestone puddles, reflective store windows, and warm street lamp illumination.",
    "path": "Photos & to upload/Streets/Street (1).jpg",
    "images": [
      "Photos & to upload/Streets/Street (1).jpg",
      "Photos & to upload/Streets/Street (2).jpg",
      "Photos & to upload/Corridor/69316092_2489664787750986_3027960263031652352_o.jpg"
    ]
  },
  {
    "title": "Norse Fortress & Viking Longhouse Great Hall",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Hand-hewn timber longhouse with central stone hearth, authentic shields, volumetric wood smoke, and historic Nordic architectural details.",
    "path": "Photos & to upload/Viking/All Work (14).jpg",
    "images": [
      "Photos & to upload/Viking/All Work (14).jpg",
      "Photos & to upload/Viking/All Work (62).png",
      "Photos & to upload/Viking/All Work (65).png"
    ]
  },
  {
    "title": "Surreal Geometric Dreamscape & Abstract Spatial Horizons",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Mind-bending metaphysical compositions exploring impossible geometries, floating monoliths, and infinite perspective horizon lines.",
    "path": "Photos & to upload/Surrealism/All Work (34).png",
    "images": [
      "Photos & to upload/Surrealism/All Work (34).png",
      "Photos & to upload/Surrealism/All Work (35).png",
      "Photos & to upload/Surrealism/All Work (36).png"
    ]
  },
  {
    "title": "The Kinetic Figure: Character Studies in Anatomy, Gesture, and Form",
    "pillar": "Personal",
    "cat": "character",
    "desc": "Traditional hand-drawn anatomical studies examining dynamic silhouette weight distribution, skull plane transitions, and gestural momentum.",
    "path": "Photos & to upload/Sketch/11053043_919157774801703_4563455775003564932_n.jpg",
    "images": [
      "Photos & to upload/Sketch/11053043_919157774801703_4563455775003564932_n.jpg",
      "Photos & to upload/Sketch/11202825_919018721482275_3884168732202231454_o.jpg",
      "Photos & to upload/Sketch/12.jpg"
    ],
    "subVideos": {},
    "youtubeUrl": ""
  },
  {
    "title": "Speculative Worldbuilding: Environmental Architecture & Hard Surface Design",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Massive monolithic desert metropolis and orbital transport vessel navigating atmospheric sand haze and harsh desert sunlight.",
    "path": "Photos & to upload/Scifi/All Work (175).jpg",
    "images": [
      "Photos & to upload/Scifi/All Work (175).jpg",
      "Photos & to upload/Plane/25542788_1949128395101535_7558624210513976664_o.jpg"
    ],
    "subVideos": {},
    "youtubeUrl": ""
  },
  {
    "title": "Organic Ecosystems: Photorealistic Biomes & Natural Landscapes",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "High-fidelity Unreal Engine 5 forest biome and architectural cabin featuring Nanite geometry, Lumen sunbeams, and dynamic wind foliage.",
    "path": "Photos & to upload/YouTube/jN-SOF7No1Q.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=jN-SOF7No1Q",
    "images": [
      "Photos & to upload/YouTube/jN-SOF7No1Q.jpg",
      "Photos & to upload/Nature/All Work (113).jpg",
      "Photos & to upload/YouTube/L6NKHuSGThA.jpg",
      "Photos & to upload/Nature/All Work (122).jpg"
    ],
    "subVideos": {
      "0": "https://www.youtube.com/watch?v=jN-SOF7No1Q"
    }
  },
  {
    "title": "The Built Exterior: Architectural Form & Daylighting Studies",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Architectural homage exploring poured-in-place concrete textures, dramatic clerestory lightwells, and minimalist geometric proportions.",
    "path": "Photos & to upload/Exterior/All Work (128).jpg",
    "images": [
      "Photos & to upload/Exterior/All Work (128).jpg",
      "Photos & to upload/Exterior/All Work (132).jpg"
    ],
    "subVideos": {},
    "youtubeUrl": ""
  },
  {
    "title": "Autumn Woodland Vista & Whisper of the Heart Scenery",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Scenic anime-inspired natural environment depicting golden autumn foliage, quiet forest clearings, and atmospheric depth of field.",
    "path": "Photos & to upload/Nature/All Work (123).jpg",
    "images": [
      "Photos & to upload/Nature/All Work (123).jpg"
    ],
    "subVideos": {},
    "youtubeUrl": ""
  },
  {
    "title": "Riverside Cottage & Wooden Boat Mooring",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Peaceful lakefront cabin scene featuring realistic water surface ripples, weathered wooden pier planks, and a handcrafted rowboat.",
    "path": "Photos & to upload/Exterior/All Work (134).jpg",
    "images": [
      "Photos & to upload/Exterior/All Work (134).jpg",
      "Photos & to upload/Nature/All Work (145).jpg"
    ]
  },
  {
    "title": "Sci-Fi Command Chamber: Modular Hard-Surface Environment (Evolution Study)",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Side-by-side progression analysis showcasing modern re-topology workflows, emissive interface terminals, and modular sci-fi interior architecture.",
    "path": "Photos & to upload/YouTube/Tkke1L5bGyM.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=Tkke1L5bGyM",
    "images": [
      "Photos & to upload/YouTube/Tkke1L5bGyM.jpg",
      "Photos & to upload/Scifi Living Room/27356343_1713224235395049_6194616003068163822_o.jpg",
      "Photos & to upload/Scifi/All Work (13).jpg"
    ]
  },
  {
    "title": "Eskimo Graystown: Retail Storefront Facade & Interior",
    "pillar": "Client",
    "cat": "environment",
    "desc": "Exterior street-level commercial branding and customer counter fit-out for Eskimo Pizza's Graystown hospitality branch.",
    "path": "Photos & to upload/Client/Eskimo/Eskimo Graystown/1.jpg",
    "images": [
      "Photos & to upload/Client/Eskimo/Eskimo Graystown/1.jpg",
      "Photos & to upload/Client/Eskimo/Eskimo Graystown/2.jpg",
      "Photos & to upload/Client/Eskimo/Interior 2/1.jpg"
    ]
  },
  {
    "title": "Contemporary Architectural Visualization (SketchUp & Unreal Engine)",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Modern multi-storey residential building visualization analyzing exterior louvers, glass reflectivity, and real-time environment lighting.",
    "path": "Photos & to upload/Exterior/All Work (135).jpg",
    "images": [
      "Photos & to upload/Exterior/All Work (135).jpg",
      "Photos & to upload/Exterior/All Work (147).jpg"
    ]
  },
  {
    "title": "Atmospheric Interior Lighting & Volumetric Illumination Study",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Deep dive into indirect bounce light, volumetric dust rays, dynamic color temperature calibration, and physical camera exposure in 3D interiors.",
    "path": "Photos & to upload/Interior/10.jpg",
    "images": [
      "Photos & to upload/Interior/10.jpg",
      "Photos & to upload/Living Room/Living Room (1).jpg",
      "Photos & to upload/Living Room/All Work (157).jpg"
    ]
  },
  {
    "title": "Stone & Travertine Luxury Bathroom Visualization",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Spa-inspired residential bathroom with custom stone basin joinery, recessed wall niches, brass fixtures, and soft diffuse window lighting.",
    "path": "Photos & to upload/Bathroom/All Work (2).jpg",
    "images": [
      "Photos & to upload/Bathroom/All Work (2).jpg",
      "Photos & to upload/Bathroom/All Work (13).png",
      "Photos & to upload/Bathroom/Toilet 2.png"
    ]
  },
  {
    "title": "Complete: Emotional Short Animated Film",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Complete character animation short exploring human memory, emotional connection, and poignant cinematic pacing.",
    "path": "Photos & to upload/YouTube/b8_h72abWqM.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=b8_h72abWqM",
    "images": [
      "Photos & to upload/YouTube/b8_h72abWqM.jpg"
    ]
  },
  {
    "title": "Timeless: Sci-Fi Short Animated Film",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Cinematic sci-fi narrative short film crafted with Unreal Engine and Blender, featuring custom hard-surface rigs, volumetric atmospheres, and orchestral scoring.",
    "path": "Photos & to upload/YouTube/sc7N1vtVA8M.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=sc7N1vtVA8M"
  },
  {
    "title": "3D Visual Art & Environments Showreel",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Comprehensive 3D environment, lighting, and hard-surface modeling showreel combining Blender and Unreal Engine 5 production pipelines.",
    "path": "Photos & to upload/YouTube/8zlzhEICw-w.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=8zlzhEICw-w"
  },
  {
    "title": "Mythology Researcher Study & Lab | UE5",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Intricate Unreal Engine 5 interior scene filled with ancient occult artifacts, leather-bound tomes, brass astrolabes, and atmospheric candle illumination.",
    "path": "Photos & to upload/YouTube/PJ1i1nk43Zo.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=PJ1i1nk43Zo"
  },
  {
    "title": "Hobbit Dwelling Concept",
    "cat": "environment",
    "pillar": "Personal",
    "path": "Photos & to upload/Hobbit House.png",
    "desc": "Organic fantasy earth-sheltered home"
  },
  {
    "title": "Stream & Ancient Temple Ruins | Unreal Engine 5",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Lush mossy ancient ruins beside a dynamic mountain stream with Nanite geometry, Lumen global illumination, and high-fidelity Megascans assets.",
    "path": "Photos & to upload/YouTube/XbsGhjGriEE.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=XbsGhjGriEE"
  },
  {
    "title": "Ann's Delight Sweet Paradise: Commercial Store",
    "pillar": "Client",
    "cat": "animation",
    "desc": "Unreal Engine 5 virtual walkthrough and 3D architectural retail visualization for Ann's Delight confectionary brand.",
    "path": "Photos & to upload/YouTube/aniBOlBF1Ow.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=aniBOlBF1Ow"
  },
  {
    "title": "The Tunnel Of Love: Romance & Lighting Walkthrough",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Romantic green foliage tunnel surrounding overgrown railway tracks, featuring cinematic camera dolly movements and golden-hour sun flares.",
    "path": "Photos & to upload/YouTube/yEWTwD7XMjw.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=yEWTwD7XMjw"
  },
  {
    "title": "Modern Architectural Interior: Cinematic Walkthrough",
    "pillar": "Client",
    "cat": "environment",
    "desc": "High-end luxury residential interior animation with dynamic exposure transitions, realistic fabric physics, and architectural finish details.",
    "path": "Photos & to upload/YouTube/wvJ3n61oNlQ.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=wvJ3n61oNlQ"
  },
  {
    "title": "Windy Storm Coastline: Dynamic Ocean Simulation",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Dramatic coastal storm environment in Unreal Engine 5 with turbulent wave physics, sea spray particles, and stormy atmospheric overcast.",
    "path": "Photos & to upload/YouTube/x9p50UJI_NU.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=x9p50UJI_NU"
  },
  {
    "title": "Eskimo Pizza Brand Environment",
    "cat": "3d",
    "pillar": "Client",
    "path": "Photos & to upload/Client/Eskimo/Final/1.png",
    "desc": "Client commercial restaurant 3D architectural visualization"
  },
  {
    "title": "Eskimo Restaurant Dining Suite",
    "cat": "3d",
    "pillar": "Client",
    "path": "Photos & to upload/Client/Eskimo/Final/2.png",
    "desc": "Interior architectural lighting and materials"
  },
  {
    "title": "Eskimo Commercial Service Counter",
    "cat": "3d",
    "pillar": "Client",
    "path": "Photos & to upload/Client/Eskimo/Final/3.png",
    "desc": "Client hospitality visual design"
  },
  {
    "title": "Eskimo Architectural Interior",
    "cat": "3d",
    "pillar": "Client",
    "path": "Photos & to upload/Client/Eskimo/Final/5.png",
    "desc": "Photorealistic restaurant interior rendering"
  },
  {
    "title": "Cyber Coupe: Hard-Surface Automotive",
    "pillar": "Personal",
    "cat": "product",
    "desc": "Aerodynamic futuristic sports car concept modeled with precision subdivision surfaces and automotive clearcoat shaders.",
    "path": "Photos & to upload/Car/550237818_18527373967025424_2167346014008595452_n.jpeg"
  },
  {
    "title": "Subway Express: Industrial Locomotive",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Atmospheric underground train carriage interior with distressed stainless steel textures and fluorescent flicker.",
    "path": "Photos & to upload/Train/All Work (183).jpg"
  },
  {
    "title": "Gothic Cathedral: Volumetric Godrays",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "High vaulted arches and rose window stained-glass lighting study with atmospheric dust motes and volumetric haze.",
    "path": "Photos & to upload/Church/4.jpg"
  },
  {
    "title": "Micro Diorama: Architectural Scale Model",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Charming isometric miniature building block with tilt-shift depth of field and soft ambient occlusion.",
    "path": "Photos & to upload/Miniature/Miniature.png"
  },
  {
    "title": "Luxury Penthouse Interior Design | ArchViz",
    "pillar": "Client",
    "cat": "environment",
    "desc": "Minimalist Scandinavian architectural visualization render exploring indirect bounce lighting, wood grain reflections, and urban skyline backdrops.",
    "path": "Photos & to upload/YouTube/AYk-BZrP6D0.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=AYk-BZrP6D0"
  },
  {
    "title": "Cinematic UE5 Sequence & Camera Breakdown",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Technical breakdown of multi-camera sequencing, depth of field control, and cinematic framing techniques in Unreal Engine 5.",
    "path": "Photos & to upload/YouTube/NOFS6gQ8Zfk.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=NOFS6gQ8Zfk"
  },
  {
    "title": "Make Whatever You Want: Blender 3D Concept Showreel",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "High-octane concept art montage demonstrating creative speed-modeling, hard-surface detailing, and stylistic shader experimentation.",
    "path": "Photos & to upload/YouTube/IYL4UTTOkdk.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=IYL4UTTOkdk"
  },
  {
    "title": "The Tunnel Of Love: Technical Environment Tutorial",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Comprehensive step-by-step masterclass demonstrating procedural ivy scattering, lighting placement, and post-process color grading.",
    "path": "Photos & to upload/YouTube/UYgf9MlZ2iY.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=UYgf9MlZ2iY"
  },
  {
    "title": "Cinematic Environment Art Reel",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Dynamic visual montage of real-time environments, architectural flythroughs, and particle effects produced across 2023-2026.",
    "path": "Photos & to upload/YouTube/BWPjtiNJSr4.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=BWPjtiNJSr4"
  },
  {
    "title": "Get Connected Customer Lounge",
    "cat": "3d",
    "pillar": "Client",
    "path": "Photos & to upload/Get Connected Interior/abdullahinayatart_1670237709_2986492823553459052_1538841423_2.webp",
    "desc": "Retail showroom lighting and cabinetry"
  },
  {
    "title": "Modern Residential Interior",
    "cat": "3d",
    "pillar": "Personal",
    "path": "Photos & to upload/Living Room/Final1.png",
    "desc": "Clean architectural furniture and lighting"
  },
  {
    "title": "Morning Light Bedroom",
    "cat": "environment",
    "pillar": "Personal",
    "path": "Photos & to upload/Bedroom/All Work (67).jpg",
    "desc": "Soft diffuse lighting and linen shaders"
  },
  {
    "title": "Geometric Staircase Helix",
    "cat": "3d",
    "pillar": "Personal",
    "path": "Photos & to upload/Stairs/All Work (44).jpg",
    "desc": "Geometric concrete spiral staircase"
  },
  {
    "title": "Sci-Fi Command Chamber",
    "cat": "environment",
    "pillar": "Personal",
    "path": "Photos & to upload/Scifi/All Work (6).png",
    "desc": "Speculative sci-fi interior with glowing conduits"
  },
  {
    "title": "Sci-Fi Orbital Hub",
    "cat": "environment",
    "pillar": "Personal",
    "path": "Photos & to upload/Scifi/All Work (11).png",
    "desc": "Hard-surface modeling and atmospheric glow"
  },
  {
    "title": "Sci-Fi Laboratory Interior",
    "cat": "environment",
    "pillar": "Personal",
    "path": "Photos & to upload/Scifi/All Work (45).png",
    "desc": "Modular sci-fi environmental assets"
  },
  {
    "title": "Subsurface Deep Sea Atmosphere",
    "cat": "environment",
    "pillar": "Personal",
    "path": "Photos & to upload/Underwater/All Work (27).png",
    "desc": "Underwater illumination and caustics simulation"
  },
  {
    "title": "Underground Metro Tunnel",
    "cat": "environment",
    "pillar": "Personal",
    "path": "Photos & to upload/Underground/7.jpg",
    "desc": "Subterranean corridor and moody fixtures"
  },
  {
    "title": "Fantasy Mountain Valley",
    "cat": "environment",
    "pillar": "Personal",
    "path": "Photos & to upload/Nature/All Work (16).png",
    "desc": "Expansive landscape and atmospheric mist"
  },
  {
    "title": "Autumn Woodland Vista",
    "cat": "environment",
    "pillar": "Personal",
    "path": "Photos & to upload/Nature/All Work (39).png",
    "desc": "Volumetric sunlight through forest canopy"
  },
  {
    "title": "Alpine Wilderness Study",
    "cat": "environment",
    "pillar": "Personal",
    "path": "Photos & to upload/Nature/All Work (41).png",
    "desc": "Foliage simulation and terrain shaders"
  },
  {
    "title": "Abstract Figurative Sculpture",
    "cat": "character",
    "pillar": "Personal",
    "path": "Photos & to upload/Sculptures/All Work (52).png",
    "desc": "Monochrome sculptural character study"
  },
  {
    "title": "Classical Heroic Sculpture",
    "cat": "character",
    "pillar": "Personal",
    "path": "Photos & to upload/Sculptures/All Work (55).PNG",
    "desc": "Digital clay anatomy and drapery study"
  },
  {
    "title": "Brand Identity Visual",
    "cat": "logo",
    "pillar": "Client",
    "path": "Photos & to upload/Logo/All Work (17).png",
    "desc": "Commercial typography and mark design"
  },
  {
    "title": "Brand Emblem Concept",
    "cat": "logo",
    "pillar": "Client",
    "path": "Photos & to upload/Logo/2.PNG",
    "desc": "Vector identity and corporate symbol"
  },
  {
    "title": "Anatomical Sketch Study",
    "cat": "character",
    "pillar": "Personal",
    "path": "Photos & to upload/Sketch/All Work (2).jpeg",
    "desc": "Traditional and digital drawing technique study"
  },
  {
    "title": "Atmospheric Sketch Concept",
    "cat": "environment",
    "pillar": "Personal",
    "path": "Photos & to upload/Sketch/All Work (63).jpg",
    "desc": "Expressive compositional value drawing"
  },
  {
    "title": "Concept Sketch: Hero Silhouette & Posture",
    "pillar": "Personal",
    "cat": "character",
    "desc": "Expressive ink sketch exploring character weight distribution, dynamic silhouette balance, and gesture.",
    "path": "Photos & to upload/Sketch/10519193_752125604838255_4807372730966501183_o.jpg"
  },
  {
    "title": "Architectural Perspective: Line & Vanishing Grid",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Freehand spatial drawing mapping multi-point perspective grids, orthogonal depth, and structural framing.",
    "path": "Photos & to upload/Sketch/118810718_3409648209085968_5021566996847498841_o.jpg"
  },
  {
    "title": "Some houses aren't empty when the people leave.",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Some houses aren't empty when the people leave. The chairs remain.",
    "path": "Photos & to upload/Instagram/17970979794109163.jpg"
  },
  {
    "title": "Because witnessing matters. Because if you look at s...",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Because witnessing matters. Because if you look at something and then record that you looked, you\u2019ve done something to it.\u201d A quiet passage from my...",
    "path": "Photos & to upload/Instagram/18134535064492978.webp"
  },
  {
    "title": "This novel is about a boy who learns to see before h...",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "This novel is about a boy who learns to see before he learns to speak. It is about what happens when the thing that saves you. The capacity to obse...",
    "path": "Photos & to upload/Instagram/18099304982030601.webp"
  },
  {
    "title": "A visit to Japan",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "A visit to Japan",
    "path": "Photos & to upload/Instagram/17861239659097287.jpg"
  },
  {
    "title": "A little test render with Nvidia Canvas",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "A little test render with Nvidia Canvas",
    "path": "Photos & to upload/Instagram/17845421031111594.jpg"
  },
  {
    "title": "Inspiration from a post, I saw on Instagram",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Inspiration from a post, I saw on Instagram",
    "path": "Photos & to upload/Instagram/18065207518458125.jpg"
  },
  {
    "title": "New Story",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "New Story Origin",
    "path": "Photos & to upload/Instagram/18039197083541844.jpg"
  },
  {
    "title": "Lighthouse render",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Lighthouse render",
    "path": "Photos & to upload/Instagram/18015665518901571.jpg"
  },
  {
    "title": "The multiverse is depicted as tree branches.",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "The multiverse is depicted as tree branches.",
    "path": "Photos & to upload/Instagram/18002318024475867.jpg"
  },
  {
    "title": "A red table with artifacts",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "A red table with artifacts",
    "path": "Photos & to upload/Instagram/17973355136364556.jpg"
  },
  {
    "title": "A Still Life render in Blender 3D",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "A Still Life render in Blender 3D",
    "path": "Photos & to upload/Instagram/17949189482562838.jpg"
  },
  {
    "title": "A 3D door inspired by a photo taken by a friend",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "A 3D door inspired by a photo taken by a friend",
    "path": "Photos & to upload/Instagram/18036113920542329.jpg"
  },
  {
    "title": "Childhood Dreams Come True! \u2728\ud83c\udf1f",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Childhood Dreams Come True! \u2728\ud83c\udf1f Swipe left to witness the magic! \ud83d\udc49",
    "path": "Photos & to upload/Instagram/17987574743510340.jpg"
  },
  {
    "title": "Painting to 3D",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Painting to 3D Created in Blender",
    "path": "Photos & to upload/Instagram/18276847624148108.jpg"
  },
  {
    "title": "A bathroom made in Blender",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "A bathroom made in Blender",
    "path": "Photos & to upload/Instagram/17842254753061661.jpg"
  },
  {
    "title": "Roaring in the heart of nature's beauty! \ud83c\udf3f\ud83c\udfde\ufe0f Immerse...",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Roaring in the heart of nature's beauty! \ud83c\udf3f\ud83c\udfde\ufe0f Immerse yourself in the enchanting world of this fiery red dragon amidst lush greenery, ancient ruins,...",
    "path": "Photos & to upload/Instagram/17971821890589186.jpg"
  },
  {
    "title": "Stepping into a world where nature embraces craftsma...",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Stepping into a world where nature embraces craftsmanship \ud83c\udf3f\ud83d\udeaa\u2728 Loving how this 3D masterpiece turned out! \ud83c\udfde\ufe0f\ud83e\ude9f Bringing the charm of a village door s...",
    "path": "Photos & to upload/Instagram/17880861773865566.jpg"
  },
  {
    "title": "Scifi Room",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Scifi Room Made in Blender",
    "path": "Photos & to upload/Instagram/18292951363191483.jpg"
  },
  {
    "title": "Castle made in Blender 3D",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Castle made in Blender 3D",
    "path": "Photos & to upload/Instagram/17982912593132329.jpg"
  },
  {
    "title": "Castle made in Blender and edited in Photoshop",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Castle made in Blender and edited in Photoshop",
    "path": "Photos & to upload/Instagram/17979484217163045.jpg"
  },
  {
    "title": "Spaceship",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Spaceship",
    "path": "Photos & to upload/Instagram/18019952902627974.jpg"
  },
  {
    "title": "City in the desert",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "City in the desert",
    "path": "Photos & to upload/Instagram/17966647691361917.jpg"
  },
  {
    "title": "Monumental Marvel - 3D Minar-e-Pakistan Tribute \ud83c\udff0",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Monumental Marvel - 3D Minar-e-Pakistan Tribute \ud83c\udff0 Witness the splendor of my latest creation - a meticulous 3D rendition of Minar-e-Pakistan, an ic...",
    "path": "Photos & to upload/Instagram/17987288981035521.jpg"
  },
  {
    "title": "Strange house in a forest - 3D Render - Unreal Engin...",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Strange house in a forest - 3D Render - Unreal Engine 5 #unrealengine5 #Blender3DRender #forest",
    "path": "Photos & to upload/Instagram/18022650475542477.jpg"
  },
  {
    "title": "Yasuyo Building at Shinjuku, Tokyo, built by Nobumic...",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Yasuyo Building at Shinjuku, Tokyo, built by Nobumichi Akashi with amazing original interiors by Yoshiro Taniguchi, 1969. #modernism #modernarchite...",
    "path": "Photos & to upload/Instagram/18046110724462208.jpg"
  },
  {
    "title": "Architecture",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Architecture",
    "path": "Photos & to upload/Instagram/18004810399897282.jpg"
  },
  {
    "title": "Scifi Room",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Scifi Room",
    "path": "Photos & to upload/Instagram/18025581433512587.jpg"
  },
  {
    "title": "Which one are you?",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Which one are you?",
    "path": "Photos & to upload/Instagram/17892336767838958.jpg"
  },
  {
    "title": "Step into the neon-lit future of my cyberpunk dreams...",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Step into the neon-lit future of my cyberpunk dreams \u2728\ud83c\udf03 Immerse yourself in the breathtaking intricacies of this meticulously crafted cityscape, wh...",
    "path": "Photos & to upload/Instagram/18372087865057475.jpg"
  },
  {
    "title": "A forest scene made in Blender",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "A forest scene made in Blender",
    "path": "Photos & to upload/Instagram/18001925125897000.jpg"
  },
  {
    "title": "Serene Sandstone Mosque: A Tranquil Oasis \ud83c\udf3e\u2728",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Serene Sandstone Mosque: A Tranquil Oasis \ud83c\udf3e\u2728 Escape to tranquility with this stunning sandstone 3D render featuring a white mosque that exudes peac...",
    "path": "Photos & to upload/Instagram/18183854143282940.jpg"
  },
  {
    "title": "Step into the enchanting world of the Arabian bazaar...",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Step into the enchanting world of the Arabian bazaar! \u2728\ud83c\udf34 Immerse yourself in the rich colors, intricate textures, and vibrant atmosphere of this 3D...",
    "path": "Photos & to upload/Instagram/17925974102712346.jpg"
  },
  {
    "title": "Bus station",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Bus station",
    "path": "Photos & to upload/Instagram/17932527950695918.jpg"
  },
  {
    "title": "Japanese Shoji",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Japanese Shoji",
    "path": "Photos & to upload/Instagram/17918320694746097.jpg"
  },
  {
    "title": "Yale Center for British Art Exterior",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Yale Center for British Art Exterior Made in Blender 3D",
    "path": "Photos & to upload/Instagram/18012089863639845.jpg"
  },
  {
    "title": "Yale center for British Art",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Yale center for British Art Made in Blender",
    "path": "Photos & to upload/Instagram/18295629523108479.jpg"
  },
  {
    "title": "One Piece Wallpaper",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "One Piece Wallpaper Made in Blender",
    "path": "Photos & to upload/Instagram/18291521089116027.jpg"
  },
  {
    "title": "Painting to 3D",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Painting to 3D",
    "path": "Photos & to upload/Instagram/17948723546505741.jpg"
  },
  {
    "title": "Whisper of the heart scenery",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Whisper of the heart scenery Demon Slayer - Inspiration from Artstation",
    "path": "Photos & to upload/Instagram/18029192512488307.webp"
  },
  {
    "title": "From painting to 3d in unreal engine 5",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "From painting to 3d in unreal engine 5",
    "path": "Photos & to upload/Instagram/18348098413062091.webp"
  },
  {
    "title": "A nuclear family",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "A nuclear family",
    "path": "Photos & to upload/Instagram/17987753311837309.webp"
  },
  {
    "title": "The last of us inspired",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "The last of us inspired",
    "path": "Photos & to upload/Instagram/17886144434731868.webp"
  },
  {
    "title": "A sculpture with a painting",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "A sculpture with a painting Which art medium do you prefer?",
    "path": "Photos & to upload/Instagram/17875494869798035.webp"
  },
  {
    "title": "Rendered in Blender 3D, inspired by \"Spirited Away\",...",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Rendered in Blender 3D, inspired by \"Spirited Away\", Rendered in 1080 x 1080, 1000 frames. Smoke simulation, fog and clouds in @blender.official . ...",
    "path": "Photos & to upload/Instagram/18027156172444171.jpg"
  },
  {
    "title": "Created a random render of a cyberpunk corridor",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Created a random render of a cyberpunk corridor",
    "path": "Photos & to upload/Instagram/18267657793129426.webp"
  },
  {
    "title": "Fields of dreams \ud83c\udf3e\ud83c\udf3b\"",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Fields of dreams \ud83c\udf3e\ud83c\udf3b\" Rendered in Blender 3D",
    "path": "Photos & to upload/Instagram/18006495826522628.jpg"
  },
  {
    "title": "Year 2022",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Year 2022 Artworks",
    "path": "Photos & to upload/Instagram/17965931513090724.webp"
  },
  {
    "title": "Made in Blender",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Made in Blender Interior for a shop",
    "path": "Photos & to upload/Instagram/17988884707656692.webp"
  },
  {
    "title": "If you are living a colorless life, it doesn't matte...",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "If you are living a colorless life, it doesn't matter whether the world is colorful or not!\u201d - Some Random Person Created in Blender 3D with heart...",
    "path": "Photos & to upload/Instagram/17929421876558831.jpg"
  },
  {
    "title": "Saw this photo captured by @zakia_takreem",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Saw this photo captured by @zakia_takreem There were hundreds of images came to my mind. This monochromatic photo with just a single light source i...",
    "path": "Photos & to upload/Instagram/17942425073390425.jpg"
  },
  {
    "title": "Saw this amazing photograph (2nd photo) by @zakia_ta...",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Saw this amazing photograph (2nd photo) by @zakia_takreem So I created this render (1st photo) in Blender",
    "path": "Photos & to upload/Instagram/18328297867051721.webp"
  },
  {
    "title": "The Stairways to Heaven",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "The Stairways to Heaven",
    "path": "Photos & to upload/Instagram/18266166148100937.jpg"
  },
  {
    "title": "I had a dream where I was in a jungle and a tiger wa...",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "I had a dream where I was in a jungle and a tiger was watching me from afar. He didn't attack but the image was stuck in my mind. So, I used Blende...",
    "path": "Photos & to upload/Instagram/17971009390877238.jpg"
  },
  {
    "title": "Sambrial Canal",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Sambrial Canal Made in Blender 3D",
    "path": "Photos & to upload/Instagram/18049081636363176.webp"
  },
  {
    "title": "Viking ship passing through a gap",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Viking ship passing through a gap",
    "path": "Photos & to upload/Instagram/17948748053224548.webp"
  },
  {
    "title": "Underwater Temple",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Underwater Temple Made in Blender and edited in Photoshop",
    "path": "Photos & to upload/Instagram/17942528642351143.jpg"
  },
  {
    "title": "Mystical creature in a forest",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Mystical creature in a forest It's just a 3D forest created with saplings Addon in Blender and used grass from Megascans.",
    "path": "Photos & to upload/Instagram/17956250800952809.webp"
  },
  {
    "title": "Shop Interior",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Shop Interior Made in Blender",
    "path": "Photos & to upload/Instagram/17946121076087543.webp"
  },
  {
    "title": "Lighthouse render",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Lighthouse render Made in Blender 3D",
    "path": "Photos & to upload/Instagram/17885028770695263.webp"
  },
  {
    "title": "House with a boat",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "House with a boat",
    "path": "Photos & to upload/Instagram/18310428316003251.webp"
  },
  {
    "title": "House near a water stream with a boat",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "House near a water stream with a boat",
    "path": "Photos & to upload/Instagram/17908074617621289.webp"
  },
  {
    "title": "Recreating my old artwork",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Recreating my old artwork",
    "path": "Photos & to upload/Instagram/17935797755485339.webp"
  },
  {
    "title": "Just a castle",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Just a castle",
    "path": "Photos & to upload/Instagram/17989732810479951.webp"
  },
  {
    "title": "Abstract architecture",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Abstract architecture",
    "path": "Photos & to upload/Instagram/17924379833335959.webp"
  },
  {
    "title": "Forest Render",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Forest Render",
    "path": "Photos & to upload/Instagram/17938940090277064.webp"
  },
  {
    "title": "City in the sky",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "City in the sky Challenge by @cg_boost",
    "path": "Photos & to upload/Instagram/17943628076142996.webp"
  },
  {
    "title": "City in the Sky",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "City in the Sky Challenge by @cg_boost",
    "path": "Photos & to upload/Instagram/17951123800970317.webp"
  },
  {
    "title": "Zombie Apocalypse scene",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Zombie Apocalypse scene With a new concept what if a robot instead of a human needs to survive in a zombie apocalypse.",
    "path": "Photos & to upload/Instagram/17945249119965026.webp"
  },
  {
    "title": "Apartments",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Apartments @blenderartists",
    "path": "Photos & to upload/Instagram/18030720565372249.webp"
  },
  {
    "title": "Blue door",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Blue door From painting to 3d",
    "path": "Photos & to upload/Instagram/17936559101230824.webp"
  },
  {
    "title": "From painting to 3d",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "From painting to 3d",
    "path": "Photos & to upload/Instagram/17930158619202544.webp"
  },
  {
    "title": "From Sketch to 3D",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "From Sketch to 3D",
    "path": "Photos & to upload/Instagram/17927177324251710.webp"
  },
  {
    "title": "From Drawing to 3D",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "From Drawing to 3D Drawing by @djanedimotte",
    "path": "Photos & to upload/Instagram/17911261604543261.webp"
  },
  {
    "title": "From Painting to 3D",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "From Painting to 3D @blenderartists",
    "path": "Photos & to upload/Instagram/17926111835458141.webp"
  },
  {
    "title": "Insects collage",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Insects collage Made in Blender",
    "path": "Photos & to upload/Instagram/17934767282102397.webp"
  },
  {
    "title": "Make WHATEVER you want!!! Live Stream on YouTube \"En...",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Make WHATEVER you want!!! Live Stream on YouTube \"Entertaindo\" @blender.official @blender.community @blenderartists",
    "path": "Photos & to upload/Instagram/17843690153794060.webp"
  },
  {
    "title": "Created artwork for a challenge by @phase_runner and...",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Created artwork for a challenge by @phase_runner and @huioncanada. After many years, I participated in any challenge. #phaserunnercommunity @photoshop",
    "path": "Photos & to upload/Instagram/17944114145061519.jpg"
  },
  {
    "title": "Checkout full video on",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Checkout full video on https://youtu.be/NOFS6gQ8Zfk",
    "path": "Photos & to upload/Instagram/18201618208088220.webp"
  },
  {
    "title": "Ancient Ruins",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Ancient Ruins",
    "path": "Photos & to upload/Instagram/17937922127129796.webp"
  },
  {
    "title": "Scifi scene",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Scifi scene",
    "path": "Photos & to upload/Instagram/17945758312966190.jpg"
  },
  {
    "title": "From Sketch to 3d render",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "From Sketch to 3d render",
    "path": "Photos & to upload/Instagram/17921090666306065.webp"
  },
  {
    "title": "Different versions",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Different versions",
    "path": "Photos & to upload/Instagram/18161220241244824.webp"
  },
  {
    "title": "Art is a line around your thoughts\u201d",
    "pillar": "Personal",
    "cat": "character",
    "desc": "Art is a line around your thoughts\u201d",
    "path": "Photos & to upload/Instagram/17952722794855779.jpg"
  },
  {
    "title": "Look at usual things with unusual eyes.\u201d \u2013Vico Magis...",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Look at usual things with unusual eyes.\u201d \u2013Vico Magistretti \ud83d\ude2c\ud83e\udee1",
    "path": "Photos & to upload/Instagram/18123427993286303.webp"
  },
  {
    "title": "Animal hunting",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Animal hunting",
    "path": "Photos & to upload/Instagram/17963484634584183.webp"
  },
  {
    "title": "Norse Mythology- Valkyrie Created and Rendered in Bl...",
    "pillar": "Personal",
    "cat": "character",
    "desc": "Norse Mythology- Valkyrie Created and Rendered in Blender #blender #artwork #bhfyp #digitalart #gaming #graphicdesign #fortnite #photoshop #cinema ...",
    "path": "Photos & to upload/Instagram/17967146002602452.jpg"
  },
  {
    "title": "Today I was working on a secret project. I was bored...",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Today I was working on a secret project. I was bored so I thought maybe I could make something. Yesterday, I was in another city and I saw a water ...",
    "path": "Photos & to upload/Instagram/17948203363843416.webp"
  },
  {
    "title": "Bathroom made in Unreal Engine, Blender and Megascan...",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Bathroom made in Unreal Engine, Blender and Megascans #blender #d #dart #art #render #digitalart #dmodeling #blendercommunity #animation #design #c...",
    "path": "Photos & to upload/Instagram/17972403880526915.jpg"
  },
  {
    "title": "The horrors and an unpredictable life is like a ghos...",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "The horrors and an unpredictable life is like a ghost in the darkness. #blender #d #dart #art #render #digitalart #dmodeling #blendercommunity #ani...",
    "path": "Photos & to upload/Instagram/17958012526650381.jpg"
  },
  {
    "title": "A warrior standing in a cave waiting for the enemy t...",
    "pillar": "Personal",
    "cat": "character",
    "desc": "A warrior standing in a cave waiting for the enemy to pass",
    "path": "Photos & to upload/Instagram/17991230494423171.webp"
  },
  {
    "title": "Moon Knight made in Procreate #likes #like #follow #...",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Moon Knight made in Procreate #likes #like #follow #likeforlikes #love #instagood #instagram #followforfollowback #followme #photooftheday #photogr...",
    "path": "Photos & to upload/Instagram/17916153383255212.jpg"
  },
  {
    "title": "Street Art in Blender",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Street Art in Blender",
    "path": "Photos & to upload/Instagram/17944520716748771.webp"
  },
  {
    "title": "Dark Street #blender #d #dart #art #render #digitala...",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Dark Street #blender #d #dart #art #render #digitalart #dmodeling #blendercommunity #animation #design #cgi #dmodel #cinema #dartist #rendering #dr...",
    "path": "Photos & to upload/Instagram/17939292163943085.webp"
  },
  {
    "title": "Valkyrie in Norse Mythology #render #d #3dart #3dmod...",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Valkyrie in Norse Mythology #render #d #3dart #3dmodeling #concept #blender3d #robot #vfx #cgi #3dsmax #motiondesign #3dmodel #3drender #cinema4d #...",
    "path": "Photos & to upload/Instagram/17933423207010554.jpg"
  },
  {
    "title": "Thor from Norse Mythology #render #d #3dart #3dmodel...",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Thor from Norse Mythology #render #d #3dart #3dmodeling #concept #blender3d #robot #vfx #cgi #3dsmax #motiondesign #3dmodel #3drender #cinema4d #3d...",
    "path": "Photos & to upload/Instagram/17901243131461875.jpg"
  },
  {
    "title": "The era beyond wars #render #d #3dart #3dmodeling #c...",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "The era beyond wars #render #d #3dart #3dmodeling #concept #blender3d #robot #vfx #cgi #3dsmax #motiondesign #3dmodel #3drender #cinema4d #3dartist...",
    "path": "Photos & to upload/Instagram/17917385177186112.jpg"
  },
  {
    "title": "Make love not war",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Make love not war Made in Blender 3d",
    "path": "Photos & to upload/Instagram/17919733238255779.webp"
  },
  {
    "title": "Girl kissing a child",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Girl kissing a child",
    "path": "Photos & to upload/Instagram/17908652861307783.jpg"
  },
  {
    "title": "House artwork",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "House artwork",
    "path": "Photos & to upload/Instagram/17983747621451648.webp"
  },
  {
    "title": "Stylized house",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Stylized house",
    "path": "Photos & to upload/Instagram/17961822577553154.webp"
  },
  {
    "title": "Underwater Betta Fish",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Underwater Betta Fish",
    "path": "Photos & to upload/Instagram/17883073064599924.jpg"
  },
  {
    "title": "Night Owl 3d render",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Night Owl 3d render",
    "path": "Photos & to upload/Instagram/17959157011526618.jpg"
  },
  {
    "title": "Bear statue",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Bear statue Made in Blender",
    "path": "Photos & to upload/Instagram/17943123175663796.jpg"
  },
  {
    "title": "Blender 3.0 Render",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Blender 3.0 Render",
    "path": "Photos & to upload/Instagram/17908107983332904.jpg"
  },
  {
    "title": "Tower Render",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Tower Render Made in Blender",
    "path": "Photos & to upload/Instagram/18137175004219843.jpg"
  },
  {
    "title": "As they say, light is everything",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "As they say, light is everything",
    "path": "Photos & to upload/Instagram/17992328569397170.jpg"
  },
  {
    "title": "Some shots from my incomplete latest work",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Some shots from my incomplete latest work",
    "path": "Photos & to upload/Instagram/17918832755036879.jpg"
  },
  {
    "title": "Architecture",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Architecture",
    "path": "Photos & to upload/Instagram/17910612287185587.jpg"
  },
  {
    "title": "Architecture render in Sketchup, Unreal Engine and B...",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Architecture render in Sketchup, Unreal Engine and Blender. Used @quixelofficial",
    "path": "Photos & to upload/Instagram/17915849900104283.jpg"
  },
  {
    "title": "Statue Render",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Statue Render",
    "path": "Photos & to upload/Instagram/17914716772998399.jpg"
  },
  {
    "title": "Robot & a creature",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Robot & a creature Blender Exercise",
    "path": "Photos & to upload/Instagram/17960877817493647.jpg"
  },
  {
    "title": "Robot in a cave",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Robot in a cave",
    "path": "Photos & to upload/Instagram/17930139391772432.jpg"
  },
  {
    "title": "Rendering",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Rendering",
    "path": "Photos & to upload/Instagram/18254561107034242.webp"
  },
  {
    "title": "Indoor lighting need to be fixed",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Indoor lighting need to be fixed What do you suggest?",
    "path": "Photos & to upload/Instagram/18017367577330879.webp"
  },
  {
    "title": "Unreal Engine 5 WIP",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Unreal Engine 5 WIP Animation coming soon",
    "path": "Photos & to upload/Instagram/17945737477514793.jpg"
  },
  {
    "title": "Practising",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Practising",
    "path": "Photos & to upload/Instagram/17937269368567565.jpg"
  },
  {
    "title": "Interior Design",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Interior Design Made in 3ds Max, Unreal Engine and Blender",
    "path": "Photos & to upload/Instagram/17889489539305832.jpg"
  },
  {
    "title": "Which looks better?",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Which looks better?",
    "path": "Photos & to upload/Instagram/17915681896934511.jpg"
  },
  {
    "title": "New video coming...",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "New video coming... Follow my youtube channel for updates...",
    "path": "Photos & to upload/Instagram/18247370446047156.jpg"
  },
  {
    "title": "Resting tower",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Resting tower All the models are made in Blender but the statue is made with photogrammetry downloaded from Sketchfab.",
    "path": "Photos & to upload/Instagram/17911473037897064.jpg"
  },
  {
    "title": "Home made in Blender with a pre-made model from Sket...",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Home made in Blender with a pre-made model from Sketchfab. Showing how sculpting and details captures the focus over modern architecture.",
    "path": "Photos & to upload/Instagram/17844828329636556.jpg"
  },
  {
    "title": "Ship Render #blender #d #dart #art #render #digitala...",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Ship Render #blender #d #dart #art #render #digitalart #animation #dmodeling #blendercommunity #design #cgi #dmodel #rendering #cinema #dartist #dr...",
    "path": "Photos & to upload/Instagram/17883650021416002.jpg"
  },
  {
    "title": "Forest barn #blender #d #dart #art #render #digitala...",
    "pillar": "Personal",
    "cat": "environment",
    "desc": "Forest barn #blender #d #dart #art #render #digitalart #animation #blendercommunity #dmodeling #design #cgi #blendermurah #rendering #dmodel #gfx #...",
    "path": "Photos & to upload/Instagram/17914216750884681.jpg"
  },
  {
    "title": "Low poly artwork. Made in blender.",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Low poly artwork. Made in blender.",
    "path": "Photos & to upload/Instagram/17912983441871207.jpg"
  },
  {
    "title": "Which one looks better?",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Which one looks better?",
    "path": "Photos & to upload/Instagram/17899949645096486.jpg"
  },
  {
    "title": "Finally, uploaded my story after the hardwork of 5 y...",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Finally, uploaded my story after the hardwork of 5 years. Go checkout the link below, https://www.amazon.co.uk/dp/B096H8G52Y",
    "path": "Photos & to upload/Instagram/17978168416366635.jpg"
  },
  {
    "title": "Story cover - Took inspiration from Natalia Drepina ...",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Story cover - Took inspiration from Natalia Drepina \"Insomnia\" artwork",
    "path": "Photos & to upload/Instagram/18173685229138105.jpg"
  },
  {
    "title": "Concept #blender #d #dart #art #render #digitalart #...",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Concept #blender #d #dart #art #render #digitalart #animation #blendercommunity #dmodeling #design #cgi #blendermurah #rendering #dmodel #gfx #robl...",
    "path": "Photos & to upload/Instagram/17854398092569660.jpg"
  },
  {
    "title": "Story Images",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Story Images",
    "path": "Photos & to upload/Instagram/17857249232533945.jpg"
  },
  {
    "title": "3drender #blender #d #dart #art #render #digitalart ...",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "3drender #blender #d #dart #art #render #digitalart #animation #blendercommunity #dmodeling #design #cgi #blendermurah #rendering #dmodel #gfx #rob...",
    "path": "Photos & to upload/Instagram/17886878243076992.jpg"
  },
  {
    "title": "Nun & Apep, a giant serpent",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Nun & Apep, a giant serpent",
    "path": "Photos & to upload/Instagram/17938299772463929.jpg"
  },
  {
    "title": "My father's likeness",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "My father's likeness",
    "path": "Photos & to upload/Instagram/17860934531409034.jpg"
  },
  {
    "title": "Hope and Resilience",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Hope and Resilience",
    "path": "Photos & to upload/Instagram/17875278170181393.jpg"
  },
  {
    "title": "Trio #marvel #movies #moonknight",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Trio #marvel #movies #moonknight",
    "path": "Photos & to upload/Instagram/17881760798115414.jpg"
  },
  {
    "title": "Osiris Sculpture",
    "pillar": "Personal",
    "cat": "character",
    "desc": "Osiris Sculpture",
    "path": "Photos & to upload/Instagram/17858904386497517.jpg"
  },
  {
    "title": "Bye \ud83d\udc4b\ud83d\udc4b 2020...",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Bye \ud83d\udc4b\ud83d\udc4b 2020...",
    "path": "Photos & to upload/Instagram/17920280221509612.jpg"
  },
  {
    "title": "The flare - The monk who absorbs light",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "The flare - The monk who absorbs light",
    "path": "Photos & to upload/Instagram/18131148718177645.jpg"
  },
  {
    "title": "Just 1864 pandas left in the world",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Just 1864 pandas left in the world",
    "path": "Photos & to upload/Instagram/17860437881274324.jpg"
  },
  {
    "title": "Save the whales",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Save the whales",
    "path": "Photos & to upload/Instagram/17860277381321133.jpg"
  },
  {
    "title": "Sing to the cosmos",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Sing to the cosmos",
    "path": "Photos & to upload/Instagram/18089210236209355.jpg"
  },
  {
    "title": "My effort to create an art which showcased the proce...",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "My effort to create an art which showcased the process of purchasing a slave in Paris",
    "path": "Photos & to upload/Instagram/17878470466970028.jpg"
  },
  {
    "title": "Red Alert",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Red Alert",
    "path": "Photos & to upload/Instagram/18128080651083957.jpg"
  },
  {
    "title": "Enjoying weekend",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Enjoying weekend",
    "path": "Photos & to upload/Instagram/18177267772010132.jpg"
  },
  {
    "title": "A small project",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "A small project",
    "path": "Photos & to upload/Instagram/17913534727512064.jpg"
  },
  {
    "title": "Concept Art course - Day 2",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Concept Art course - Day 2",
    "path": "Photos & to upload/Instagram/17880509302844034.jpg"
  },
  {
    "title": "Concept Art course - Day 1",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Concept Art course - Day 1",
    "path": "Photos & to upload/Instagram/17858022551271196.jpg"
  },
  {
    "title": "Complete\" A short film..",
    "pillar": "Personal",
    "cat": "animation",
    "desc": "Complete\" A short film.. https://youtu.be/b8_h72abWqM",
    "path": "Photos & to upload/Instagram/17903299933565896.jpg"
  },
  {
    "title": "Futuristic Hall",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Futuristic Hall",
    "path": "Photos & to upload/Instagram/18031520548280063.jpg"
  },
  {
    "title": "Amazing Aurora",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Amazing Aurora",
    "path": "Photos & to upload/Instagram/17881130971770142.jpg"
  },
  {
    "title": "People covered in their beliefs",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "People covered in their beliefs",
    "path": "Photos & to upload/Instagram/17855680640176315.jpg"
  },
  {
    "title": "An old client's sketch",
    "pillar": "Client",
    "cat": "3d",
    "desc": "An old client's sketch",
    "path": "Photos & to upload/Instagram/17847916043272721.jpg"
  },
  {
    "title": "Now, they can talk for eternity",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Now, they can talk for eternity",
    "path": "Photos & to upload/Instagram/17847875717203035.jpg"
  },
  {
    "title": "Red in Green",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Red in Green",
    "path": "Photos & to upload/Instagram/17846848604218243.jpg"
  },
  {
    "title": "Futuristic Art",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Futuristic Art",
    "path": "Photos & to upload/Instagram/17853368626922088.jpg"
  },
  {
    "title": "Anyone remember this... made in blender",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Anyone remember this... made in blender",
    "path": "Photos & to upload/Instagram/18136824679035503.jpg"
  },
  {
    "title": "A friend's picture into concept art.",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "A friend's picture into concept art.",
    "path": "Photos & to upload/Instagram/17983044850207328.jpg"
  },
  {
    "title": "Render - Learning something new...",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Render - Learning something new...",
    "path": "Photos & to upload/Instagram/17908642864269519.jpg"
  },
  {
    "title": "Scifi Substance Designer Practice",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Scifi Substance Designer Practice",
    "path": "Photos & to upload/Instagram/17940129337081173.jpg"
  },
  {
    "title": "Substance Designer Practice",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Substance Designer Practice",
    "path": "Photos & to upload/Instagram/17934013207186131.jpg"
  },
  {
    "title": "Happy Family..",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Happy Family..",
    "path": "Photos & to upload/Instagram/17935025272142875.jpg"
  },
  {
    "title": "Museum in NY . Render",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Museum in NY . Render",
    "path": "Photos & to upload/Instagram/17915254156167498.jpg"
  },
  {
    "title": "Exterior Render",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Exterior Render",
    "path": "Photos & to upload/Instagram/17930780848117326.jpg"
  },
  {
    "title": "Spaceship... blender file render online",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Spaceship... blender file render online",
    "path": "Photos & to upload/Instagram/17916258841067694.jpg"
  },
  {
    "title": "My niece got first position in All Pakistan Arts Com...",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "My niece got first position in All Pakistan Arts Competition. May the legacy continues.",
    "path": "Photos & to upload/Instagram/17867472817198892.jpg"
  },
  {
    "title": "Other 2 minutes",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Other 2 minutes",
    "path": "Photos & to upload/Instagram/17849280781115328.jpg"
  },
  {
    "title": "Draw in 2 minutes...",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Draw in 2 minutes...",
    "path": "Photos & to upload/Instagram/17858479444014704.jpg"
  },
  {
    "title": "Second painting!!!",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Second painting!!!",
    "path": "Photos & to upload/Instagram/17842171510025424.jpg"
  },
  {
    "title": "Illustration..",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "Illustration..",
    "path": "Photos & to upload/Instagram/17842094971025424.jpg"
  },
  {
    "title": "My first painting!!!",
    "pillar": "Personal",
    "cat": "3d",
    "desc": "My first painting!!!",
    "path": "Photos & to upload/Instagram/17842085092025424.jpg"
  }
];
const SOFTWARE_DATA = [{"id": 1, "name": "1-Click Product Render Setup", "cat": "Blender Add-on", "price": "$23.49", "desc": "Automated studio lighting rigs, multi-HDRI management, turntable camera paths, backdrop generators, and 1-click commercial batch rendering pipeline for Blender.", "link": "https://superhivemarket.com/products/1-click-product-render-setup", "img": "Photos & to upload/Superhive/1-click-product-render.jpg"}, {"id": 2, "name": "Pro Camera Tools for Blender", "cat": "Blender Add-on", "price": "$19.99", "desc": "Professional cinematic camera system featuring real-world lens presets, sensor format profiles, handheld camera shake simulation, multi-cam rigs, and focal distance controls.", "link": "https://superhivemarket.com/products/pro-camera-tools-for-blender--realistic-cinematic-camera-system", "img": "Photos & to upload/Superhive/pro-camera-tools.jpg"}, {"id": 3, "name": "1-Click LOD Generator", "cat": "Blender Add-on", "price": "$14.49", "desc": "Automatic Level of Detail generator for game development and real-time pipelines. Instantly creates LOD0 to LOD3 with smart mesh decimation preserving UVs and materials.", "link": "https://superhivemarket.com/products/1-click-lod-generator", "img": "Photos & to upload/Superhive/1-click-lod-generator.jpg"}, {"id": 4, "name": "Auto Documentation Generator", "cat": "Blender Add-on", "price": "$14.99", "desc": "Automated documentation tool that parses Blender add-ons, node trees, and Python operators into clean markdown and print-ready technical references.", "link": "https://superhivemarket.com/products/auto-documentation-generator-for-blender", "img": "Photos & to upload/Superhive/auto-documentation-generator.jpg"}, {"id": 5, "name": "Unity Bridge Exporter", "cat": "Blender Add-on", "price": "$13.99", "desc": "One-click seamless FBX asset export and material binding pipeline from Blender directly into active Unity project directories.", "link": "https://superhivemarket.com/products/unity-bridge-exporter--one-click-blender-to-unity-fbx-pipeline", "img": "Photos & to upload/Superhive/unity-bridge-exporter.jpg"}, {"id": 6, "name": "Stable Dropper", "cat": "Blender Add-on", "price": "$13.99", "desc": "Physics-based asset scattering and gravity settling tool for natural clutter and environment dressing without manual positioning.", "link": "https://superhivemarket.com/products/stable-dropper", "img": "Photos & to upload/Superhive/stable-dropper.jpg"}, {"id": 7, "name": "Smart Scene Optimizer", "cat": "Blender Add-on", "price": "$13.99", "desc": "Advanced memory and geometry analyzer that cleans redundant textures, purges orphan data blocks, and reduces viewport lag by up to 60%.", "link": "https://superhivemarket.com/products/smart-scene-optimizer-for-blender", "img": "Photos & to upload/Superhive/smart-scene-optimizer.jpg"}, {"id": 8, "name": "Quick Decimator & Optimizer", "cat": "Blender Add-on", "price": "$11.49", "desc": "Automated mesh cleanup, polygon reduction, non-manifold geometry fixing, and batch asset export pipeline designed for real-time game engines.", "link": "https://superhivemarket.com/products/quick-decimator--optimizer", "img": "Photos & to upload/Superhive/quick-decimator-optimizer.jpg"}];
const EXPERIENCE_DATA = [{"id": 1, "company": "IDFL International Ltd", "role": "Software Engineer", "start": "Sep 2023", "end": "Present", "tags": ["Python", "JavaScript", "Software", "3D Automation"]}, {"id": 2, "company": "Hashage Ireland", "role": "Senior Video Editor & Motion Designer", "start": "Feb 2023", "end": "Present", "tags": ["Video", "Post-Production", "Brand Strategy"]}, {"id": 3, "company": "Dublin Branding Agency", "role": "Video & Creative Specialist", "start": "Jun 2020", "end": "Present", "tags": ["Video", "Creative Direction", "Motion"]}, {"id": 4, "company": "RizPros LTD", "role": "Supply Chain Manager", "start": "Nov 2021", "end": "Aug 2023", "tags": ["Supply Chain", "Inventory Ops", "Process Automation"]}, {"id": 5, "company": "Digiworld Ireland", "role": "Digital Media Manager", "start": "Feb 2021", "end": "Aug 2022", "tags": ["Digital Media", "Content", "Marketing"]}, {"id": 6, "company": "GH Industry", "role": "Assistant Procurement Manager", "start": "May 2016", "end": "Jun 2018", "tags": ["Procurement", "Operations", "Logistics"]}, {"id": 7, "company": "UET Taxila", "role": "Graphic Design & Visualization Freelance", "start": "Jun 2012", "end": "Sep 2016", "tags": ["3D Modeling", "Graphic Design", "Illustration"]}];
const ARTICLES_DATA = [
  {
    "id": 1,
    "title": "My Father Said One Word. He Left the Kitchen. I Spent Fifteen Years Inside It.",
    "slug": "my-father-said",
    "cat": "Personal Essay",
    "category": "Personal Essay",
    "date": "August 2026",
    "readTime": "7 min read",
    "desc": "A meditation on inheritance, labour, and the unspoken language of fathers who communicate through work rather than words.",
    "url": "https://medium.com/@rana.abdullah.inayat/my-father-said-one-word-he-left-the-kitchen-i-spent-fifteen-years-inside-it-b0a793a3bb07",
    "tags": [
      "Writing",
      "Personal Essay",
      "Memory"
    ]
  },
  {
    "id": 2,
    "title": "Project Concept: Contract Killers",
    "slug": "contract-killers",
    "cat": "Game Design & Tactics",
    "category": "Game Design & Tactics",
    "date": "May 3, 2026",
    "readTime": "6 min read",
    "desc": "A top-down real-time tactics and strategy game inspired by Commandos and cyberpunk stealth infiltration mechanics. Managing specialist operatives across high-stakes tactical contracts.",
    "url": "HTML/blog-contract-killers.html",
    "tags": [
      "Unreal Engine",
      "Tactics",
      "Game Design",
      "Story Branching"
    ]
  },
  {
    "id": 3,
    "title": "Why Every Aspiring Game Developer Should Start Small",
    "slug": "start-small",
    "cat": "Development Philosophy",
    "category": "Development Philosophy",
    "date": "June 3, 2026",
    "readTime": "5 min read",
    "desc": "Starting small allows developers to focus on core mechanics, finish rapidly, build confidence, and discover gameplay viability before investing months or years into complex systems.",
    "url": "HTML/blog-start-small.html",
    "tags": [
      "Game Dev",
      "Philosophy",
      "Prototyping",
      "Scope Control"
    ]
  },
  {
    "id": 4,
    "title": "Why I Started Writing and Creating Games and Apps",
    "slug": "why-i-started",
    "cat": "Creative Origins",
    "category": "Creative Origins",
    "date": "May 31, 2026",
    "readTime": "7 min read",
    "desc": "From playing classic PC games in childhood to exploring the fascination with how interactive worlds work behind the scenes. On why blending narrative fiction, 3D art, and software forms a unified creative drive.",
    "url": "HTML/blog-why-i-started-writing.html",
    "tags": [
      "Creative Journey",
      "Origins",
      "Cross-Disciplinary",
      "Technology"
    ]
  },
  {
    "id": 5,
    "title": "The Architecture of Solitude: Lighting & Spatial Emotion in Digital Worlds",
    "slug": "architecture-of-solitude",
    "cat": "3D & Design",
    "category": "3D & Design",
    "date": "June 2026",
    "readTime": "5 min read",
    "desc": "How volumetric daylighting, concrete brut textures, and negative space evoke visceral psychological resonance in digital environments.",
    "url": "https://medium.com",
    "tags": [
      "3D Art",
      "Unreal Engine 5",
      "Environment Design"
    ]
  }
];

const CLIENTS_DATA = ["IDFL", "Hashage", "Rizpros", "Eskimo Pizza", "Subway", "Wayback Burgers", "Get Connected", "Digiworld", "Apache", "IPPA", "Zouq", "Dera", "Chick City", "Chickn Lickn", "Biryani Box", "R24 News", "IT-Fix", "FSK Solicitors", "I&C Law", "IMK Law", "IK & Co", "QR Accounting", "FAMS", "Fast Premium", "Wonderlicious", "Eurasia", "Laura Dowling", "Madia Street", "Quality Food", "Motokraft", "Chronic Pain"];

let novels = loadData('rana_novels_data', NOVELS_DATA);
let techProjects = loadData('rana_tech_data', TECH_PROJECTS_DATA);
let articles = loadData('rana_articles_data', ARTICLES_DATA);
let galleryItems = loadData('rana_gallery_data', GALLERY_DATA);
let software = loadData('rana_software_data', SOFTWARE_DATA);
let experience = loadData('rana_experience_data', EXPERIENCE_DATA);
let clients = loadData('rana_clients_data', CLIENTS_DATA);

// CURSOR
const cur = document.getElementById('cur');
const curRing = document.getElementById('curRing');
let mx=-100,my=-100,rx=-100,ry=-100,curActive=false;
document.addEventListener('mousemove',e=>{
  if(!curActive){
    curActive = true;
    cur.classList.add('active');
    curRing.classList.add('active');
    rx = e.clientX;
    ry = e.clientY;
  }
  mx=e.clientX;
  my=e.clientY;
  cur.style.left=mx+'px';
  cur.style.top=my+'px';
});
function animRing(){rx+=(mx-rx)*.14;ry+=(my-ry)*.14;curRing.style.left=rx+'px';curRing.style.top=ry+'px';requestAnimationFrame(animRing)}
animRing();
function setupCursorHover(){
  document.querySelectorAll('a,button,.novel-cover,.nv-cover,.g-card,.proj-card,.tech-spotlight-card,.dls-card,.article-card,.sw-item').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cur.classList.add('hover');curRing.classList.add('hover')});
    el.addEventListener('mouseleave',()=>{cur.classList.remove('hover');curRing.classList.remove('hover')});
  });
}

// PAGE ROUTING
function showPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  const targetPage = document.getElementById('page-'+name);
  if(targetPage) targetPage.classList.add('active');
  const targetNav = document.getElementById('nav-'+name);
  if(targetNav) targetNav.classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
  renderPage(name);

  if(name === 'backend'){
    beCheckAuthOnNav();
  }
  if(window.isHeroVisible !== undefined){
    window.isHeroVisible = (name === 'home');
  }

  setTimeout(function(){
    if(window.refreshColorSpotlight) window.refreshColorSpotlight();
  }, 180);
}

function renderPage(name){
  if(name==='home'){ renderHome(); }
  else if(name==='novels'){ renderNovels(); }
  else if(name==='technical-projects'){ renderTechProjects(); }
  else if(name==='gallery'){ renderGallery('all'); }
  else if(name==='software'){ renderSoftware(); }
  else if(name==='articles'){ renderArticles(); }
  else if(name==='about'){ renderAbout(); }
  else if(name==='backend'){ renderBackend(); beLoadTokenToVaultInput(); }
  setupCursorHover();
}

// 1. HOME RENDERING
let novelSlideIdx=0, projSlideIdx=0;
// ==================== MASTER MULTI-COLOR RAINBOW SYSTEM ====================
// ==================== MASTER MULTI-COLOR RAINBOW PALETTE ====================
const RAINBOW_PALETTE = [
  // 1. Electric Cyan
  { border: 'rgba(0, 229, 255, 0.45)', glow: 'rgba(0, 229, 255, 0.18)', ambient: 'rgba(0, 229, 255, 0.09)', soft: 'rgba(0, 229, 255, 0.04)', borderHover: 'rgba(0, 229, 255, 0.95)', glowHover: 'rgba(0, 229, 255, 0.45)', ambientHover: 'rgba(0, 229, 255, 0.24)', softHover: 'rgba(0, 229, 255, 0.12)', accent: '#00bcd4' },
  // 2. Emerald Mint Green
  { border: 'rgba(0, 230, 118, 0.45)', glow: 'rgba(0, 230, 118, 0.18)', ambient: 'rgba(0, 230, 118, 0.09)', soft: 'rgba(0, 230, 118, 0.04)', borderHover: 'rgba(0, 230, 118, 0.95)', glowHover: 'rgba(0, 230, 118, 0.45)', ambientHover: 'rgba(0, 230, 118, 0.24)', softHover: 'rgba(0, 230, 118, 0.12)', accent: '#00c853' },
  // 3. Royal Amethyst Purple
  { border: 'rgba(179, 136, 255, 0.45)', glow: 'rgba(179, 136, 255, 0.18)', ambient: 'rgba(179, 136, 255, 0.09)', soft: 'rgba(179, 136, 255, 0.04)', borderHover: 'rgba(179, 136, 255, 0.95)', glowHover: 'rgba(179, 136, 255, 0.45)', ambientHover: 'rgba(179, 136, 255, 0.24)', softHover: 'rgba(179, 136, 255, 0.12)', accent: '#9c27b0' },
  // 4. Golden Amber
  { border: 'rgba(255, 179, 0, 0.45)', glow: 'rgba(255, 179, 0, 0.18)', ambient: 'rgba(255, 179, 0, 0.09)', soft: 'rgba(255, 179, 0, 0.04)', borderHover: 'rgba(255, 179, 0, 0.95)', glowHover: 'rgba(255, 179, 0, 0.45)', ambientHover: 'rgba(255, 179, 0, 0.24)', softHover: 'rgba(255, 179, 0, 0.12)', accent: '#d97706' },
  // 5. Vivid Coral Rose
  { border: 'rgba(255, 64, 129, 0.45)', glow: 'rgba(255, 64, 129, 0.18)', ambient: 'rgba(255, 64, 129, 0.09)', soft: 'rgba(255, 64, 129, 0.04)', borderHover: 'rgba(255, 64, 129, 0.95)', glowHover: 'rgba(255, 64, 129, 0.45)', ambientHover: 'rgba(255, 64, 129, 0.24)', softHover: 'rgba(255, 64, 129, 0.12)', accent: '#e91e63' },
  // 6. Cobalt Sapphire Blue
  { border: 'rgba(68, 138, 255, 0.45)', glow: 'rgba(68, 138, 255, 0.18)', ambient: 'rgba(68, 138, 255, 0.09)', soft: 'rgba(68, 138, 255, 0.04)', borderHover: 'rgba(68, 138, 255, 0.95)', glowHover: 'rgba(68, 138, 255, 0.45)', ambientHover: 'rgba(68, 138, 255, 0.24)', softHover: 'rgba(68, 138, 255, 0.12)', accent: '#2563eb' },
  // 7. Sunset Tangerine
  { border: 'rgba(255, 109, 0, 0.45)', glow: 'rgba(255, 109, 0, 0.18)', ambient: 'rgba(255, 109, 0, 0.09)', soft: 'rgba(255, 109, 0, 0.04)', borderHover: 'rgba(255, 109, 0, 0.95)', glowHover: 'rgba(255, 109, 0, 0.45)', ambientHover: 'rgba(255, 109, 0, 0.24)', softHover: 'rgba(255, 109, 0, 0.12)', accent: '#ea580c' },
  // 8. Neon Lavender
  { border: 'rgba(224, 64, 251, 0.45)', glow: 'rgba(224, 64, 251, 0.18)', ambient: 'rgba(224, 64, 251, 0.09)', soft: 'rgba(224, 64, 251, 0.04)', borderHover: 'rgba(224, 64, 251, 0.95)', glowHover: 'rgba(224, 64, 251, 0.45)', ambientHover: 'rgba(224, 64, 251, 0.24)', softHover: 'rgba(224, 64, 251, 0.12)', accent: '#8b5cf6' }
];

function getCardGlowStyle(index){
  const col = RAINBOW_PALETTE[index % RAINBOW_PALETTE.length];
  return `--card-border:${col.border};--card-glow:${col.glow};--card-glow-ambient:${col.ambient};--card-glow-soft:${col.soft};--card-border-hover:${col.borderHover};--card-glow-hover:${col.glowHover};--card-glow-ambient-hover:${col.ambientHover};--card-glow-soft-hover:${col.softHover};--card-accent:${col.accent};`;
}
window.getCardGlowStyle = getCardGlowStyle;

function renderHome(){
  // 1. Home Tech Spotlight
  const hTech = document.getElementById('homeTechSpotlight');
  if(hTech){
    hTech.innerHTML = techProjects.slice(0,3).map((p,i)=>{
      const col = RAINBOW_PALETTE[i % RAINBOW_PALETTE.length];
      const hasLive = Boolean(p.liveUrl && p.liveUrl.trim());
      return `
        <div class="tech-spotlight-card" onclick="showPage('technical-projects')" style="${getCardGlowStyle(i)}">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
            <span style="font-family:var(--mono);font-size:11px;color:var(--ink4)">[ ${p.num || ('0' + (i+1))} ]</span>
            <span class="badge-pill ${p.badgeClass || 'badge-live'}">${p.status || 'Live'}</span>
          </div>
          <h3 style="color:${col.accent} !important;font-size:21px;font-weight:600;margin-bottom:4px;font-family:var(--serif);line-height:1.3">${p.title}</h3>
          <div style="font-family:var(--mono);font-size:11px;color:var(--ink4);margin-bottom:12px">${p.subtitle || ''}</div>
          <p style="font-size:13px;color:var(--ink3);line-height:1.6;margin-bottom:16px">${(p.desc||'').substring(0,130)}...</p>
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
            <div class="tech-tags-wrap">
              ${(Array.isArray(p.tags) ? p.tags : (p.tech||[])).slice(0,3).map(t=>`<span class="tech-tag">${t}</span>`).join('')}
            </div>
            ${hasLive ? `<span style="font-family:var(--mono);font-size:10px;color:${col.accent};text-decoration:underline">View Live &rarr;</span>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  // 2. Novels Slider
  const nSlider = document.getElementById('novelSlider');
  if(nSlider){
    nSlider.innerHTML = novels.map((n,i)=>{
      const col = RAINBOW_PALETTE[i % RAINBOW_PALETTE.length];
      return `
        <div class="novel-card" onclick="openNovelModal(${i})" style="${getCardGlowStyle(i)}">
          <div class="novel-cover">
            <img src="${n.cover}" alt="${n.title}" loading="lazy" decoding="async" onerror="this.style.display='none'">
          </div>
          <div class="novel-info">
            <div class="novel-genre" style="font-family:var(--mono);font-size:9.5px;color:var(--ink4);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">${n.genre || 'Book'} &middot; ${n.year || 'Published'}</div>
            <div class="novel-name" style="font-family:var(--serif);font-size:16px;font-weight:600;color:${col.accent} !important;margin:0 0 4px;line-height:1.25;word-break:break-word">${n.title}</div>
            <div class="novel-sub" style="font-size:11.5px;color:var(--ink2);line-height:1.5;margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${n.tagline || n.desc || ''}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 3. Home Software Slider
  const swSlider = document.getElementById('swSlider');
  if(swSlider){
    swSlider.innerHTML = software.slice(0,3).map((s,i)=>{
      const col = RAINBOW_PALETTE[i % RAINBOW_PALETTE.length];
      return `
        <div class="sw-product-card" onclick="showPage('software')" style="margin-bottom:16px;${getCardGlowStyle(i)}">
          <div class="sw-product-meta">
            <span class="sw-product-type">${s.type || 'Blender Add-on'}</span>
            <span class="sw-product-price" style="color:${col.accent}">${s.price || 'Free'}</span>
          </div>
          <div class="sw-product-name" style="color:${col.accent} !important;font-size:18px;font-weight:600;margin-bottom:6px">${s.name}</div>
          <div class="sw-product-desc" style="font-size:12px;color:var(--ink3);line-height:1.5">${s.tagline || s.desc || ''}</div>
        </div>
      `;
    }).join('');
  }

  // 4. Home Visual Works (Projects) Grid / Slider
  const projGrid = document.getElementById('projGrid');
  if(projGrid){
    projGrid.innerHTML = galleryItems.slice(0,8).map((g,i)=>{
      const col = RAINBOW_PALETTE[i % RAINBOW_PALETTE.length];
      return `
        <div class="g-card" onclick="showPage('gallery')" style="position:relative;${getCardGlowStyle(i)}">
          <div style="position:relative;overflow:hidden;border-radius:4px">
            <img src="${g.path}" alt="${g.title}" loading="lazy" decoding="async" onerror="this.parentElement.style.background='#e2e6eb';this.style.display='none'" style="width:100%;height:220px;object-fit:cover">
          </div>
          <div class="g-info" style="padding:12px 8px 8px">
            <div class="g-cat" style="font-family:var(--mono);font-size:9.5px;color:var(--ink4);text-transform:uppercase">${g.cat}</div>
            <div class="g-title" style="color:${col.accent} !important;font-weight:600;font-size:16px;margin-top:2px;line-height:1.3">${g.title}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 5. Home Essays & Articles Grid
  const artGrid = document.getElementById("homeArticlesGrid") || document.getElementById("articleGrid");
  if(artGrid){
    artGrid.innerHTML = articles.slice(0,3).map((a,i)=>{
      const col = RAINBOW_PALETTE[i % RAINBOW_PALETTE.length];
      return `
        <div class="article-card" style="${getCardGlowStyle(i)}" onclick="if('${a.url}'.startsWith('http')){window.open('${a.url}','_blank')}else{location.href='${a.url}'}">
          <div class="article-meta" style="font-family:var(--mono);font-size:10px;color:var(--ink4);margin-bottom:8px">${a.pub || 'Published'} &middot; ${a.date || ''}</div>
          <h3 class="article-title" style="color:${col.accent} !important;font-weight:600;font-size:19px;margin-bottom:8px;line-height:1.35">${a.title}</h3>
          <p class="article-desc" style="font-size:13px;color:var(--ink3);line-height:1.6">${(a.excerpt || a.desc || '').substring(0,140)}...</p>
        </div>
      `;
    }).join('');
  }

  // 6. Area of Mastery (Expertise)
  const expGrid = document.querySelector('.expertise-grid');
  if(expGrid){
    Array.from(expGrid.children).forEach((child, i) => {
      const col = RAINBOW_PALETTE[i % RAINBOW_PALETTE.length];
      child.style.setProperty('--card-border', col.border);
      child.style.setProperty('--card-glow', col.glow);
      child.style.setProperty('--card-glow-ambient', col.ambient);
      child.style.setProperty('--card-accent', col.accent);
    });
  }
}

// 2. NOVELS PAGE
function renderNovels(){
  const c = document.getElementById('novelsGrid');
  if(!c) return;
  c.innerHTML = novels.map((n,i)=>{
    const col = RAINBOW_PALETTE[i % RAINBOW_PALETTE.length];
    return `
      <div class="novel-page-card" onclick="openNovelModal(${i})" style="${getCardGlowStyle(i)}">
        <div class="novel-page-cover">
          <img src="${n.cover}" alt="${n.title}" loading="lazy" decoding="async" onerror="this.parentElement.style.background='#e2e6eb';this.style.display='none'">
          ${n.readUrl ? `<span style="position:absolute;top:10px;right:10px;background:rgba(37,99,235,0.92);color:#fff;font-family:var(--mono);font-size:9px;padding:3px 7px;border-radius:3px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;box-shadow:0 2px 6px rgba(0,0,0,0.3)">Reader Available</span>` : (n.amazonUrl ? `<span style="position:absolute;top:10px;right:10px;background:rgba(17,20,26,0.92);color:#fff;font-family:var(--mono);font-size:9px;padding:3px 7px;border-radius:3px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;box-shadow:0 2px 6px rgba(0,0,0,0.3)">${n.amazonUrl.includes('docs.google.com') ? 'Google Docs' : (n.amazonUrl.includes('drive.google.com') ? 'Google Drive' : 'Amazon UK')} &#8599;</span>` : '')}
        </div>
        <div class="novel-page-genre">${n.genre} &middot; ${n.type || 'Published Book'}</div>
        <div class="novel-page-title" style="color:${col.accent} !important;font-weight:600;font-size:18px;line-height:1.35;margin-bottom:8px">${n.title}</div>
        <div class="novel-page-tagline">${n.tagline || n.desc || ''}</div>
        <div class="novel-actions" style="display:flex;gap:8px;flex-wrap:wrap">
          <span class="novel-read-btn">Read Excerpt &rarr;</span>
          ${n.readUrl ? `<a href="${n.readUrl}" target="_blank" onclick="event.stopPropagation()" class="novel-amz-btn" style="background:var(--accent,#2563eb);color:#fff !important;border-color:var(--accent,#2563eb)">Open Reader &#8599;</a>` : ''}
          ${n.amazonUrl ? `<a href="${n.amazonUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()" class="novel-amz-btn">${n.amazonUrl.includes('docs.google.com') ? 'Read Doc &#8599;' : (n.amazonUrl.includes('drive.google.com') ? 'Google Drive &#8599;' : 'Buy on Amazon &#8599;')}</a>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function openNovelModal(idx){
  const n = novels[idx];
  document.getElementById('modalCoverImg').src = n.cover;
  document.getElementById('modalGenre').textContent = (n.genre || '') + (n.type ? ' · ' + n.type : '');
  document.getElementById('modalTitle').textContent = n.title;
  document.getElementById('modalSub').textContent = n.tagline || '';
  
  // Format body text: clean raw \n and split into clean paragraphs
  const rawText = (n.excerpt || n.desc || '').replace(/\\n/g, '\n');
  const paragraphs = rawText.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 0);
  const formattedHtml = paragraphs.map(p => `<p style="margin-bottom:18px;line-height:1.85">${p.replace(/\n/g, '<br>')}</p>`).join('');
  document.getElementById('modalBody').innerHTML = formattedHtml;

  // Links (Reader / Amazon / Google Drive)
  const amzWrap = document.getElementById('modalAmazonWrap');
  if(amzWrap){
    let btns = '';
    if(n.readUrl){
      btns += `<a href="${n.readUrl}" target="_blank" class="dls-btn dls-btn-primary" style="display:inline-flex;align-items:center;gap:8px;text-decoration:none;padding:12px 24px;border-radius:4px;font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase"><span>Open Standalone Reader 📖</span></a>`;
    }
    const extLink = n.gdriveUrl || n.amazonUrl || n.amzLink || n.amazon || '';
    if(extLink){
      let label = 'Buy on Amazon UK ↗';
      if(extLink.includes('docs.google.com')) label = 'Read on Google Docs ↗';
      else if(extLink.includes('drive.google.com')) label = 'Open Google Drive ↗';
      btns += `<a href="${extLink}" target="_blank" rel="noopener" class="dls-btn dls-btn-ghost" style="display:inline-flex;align-items:center;gap:8px;text-decoration:none;padding:12px 24px;border-radius:4px;font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase"><span>${label}</span></a>`;
    }
    if(btns){
      amzWrap.innerHTML = `<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">${btns}</div>`;
      amzWrap.style.display = 'block';
    } else {
      amzWrap.style.display = 'none';
    }
  }

  document.getElementById('nvModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeNovelModal(){
  document.getElementById('nvModal').classList.remove('open');
  document.body.style.overflow = '';
}

// 3. TECHNICAL PROJECTS PAGE (CLEAN B&W)
function renderTechProjects(){
  const c = document.getElementById('techCardsGrid');
  if(!c) return;
  c.innerHTML = techProjects.map(p=>`
    <div class="dls-card-holder">
      <div class="dls-card" id="card-${p.id}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:16px">
          <div>
            <div style="font-family:var(--mono);font-size:11px;color:var(--ink4);margin-bottom:4px">[ ${p.num} ]</div>
            <h2 >${p.title}</h2>
            <div style="font-family:var(--mono);font-size:12px;color:var(--ink3)">${p.subtitle}</div>
          </div>
          <span class="badge-pill ${p.badgeClass}">${p.status}</span>
        </div>

        <p style="color:var(--ink2);font-size:14px;line-height:1.75;margin-bottom:20px">${p.desc}</p>

        <div style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:16px 20px;margin-bottom:20px">
          <div style="font-family:var(--mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink4);margin-bottom:10px">KEY FEATURES</div>
          <div class="feature-grid">
            ${(p.features||[]).map(f=>`<div class="feature-item">${f}</div>`).join('')}
          </div>
        </div>

        <div style="margin-bottom:${p.hasLinks ? '22px' : '4px'}">
          <div style="font-family:var(--mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink4);margin-bottom:8px">TECH STACK</div>
          <div class="tech-tags-wrap">
            ${(p.tech||[]).map(t=>`<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>

        ${(p.links && p.links.length > 0) ? `
        <div style="display:flex;gap:10px;flex-wrap:wrap;padding-top:8px">
          ${p.links.map(l=>`<a href="${l.url}" target="_blank" rel="noopener" class="dls-btn ${l.primary ? 'dls-btn-primary' : 'dls-btn-outline'}">${l.label}</a>`).join('')}
        </div>` : ''}
      </div>
    </div>
  `).join('');
}

// 4. GALLERY PAGE & IMMERSIVE ARCHITECTURAL SHOWCASE
function safeImgSrc(p){
  if(!p) return '';
  if(p.startsWith('data:') || p.startsWith('http://') || p.startsWith('https://')) return p;
  return encodeURI(p).replace(/&/g, '%26').replace(/#/g, '%23');
}
window.safeImgSrc = safeImgSrc;

function getYouTubeId(url){
  if(!url) return null;
  const str = String(url).trim();
  const m = str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i);
  if(m && m[1]) return m[1];
  if(/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;
  return null;
}
window.getYouTubeId = getYouTubeId;

function getSubVideo(g, idx){
  if(!g) return '';
  // 1. Explicit subVideos
  if(g.subVideos){
    if(Array.isArray(g.subVideos) && g.subVideos[idx]) return g.subVideos[idx];
    if(typeof g.subVideos === 'object'){
      if(g.subVideos[String(idx)]) return g.subVideos[String(idx)];
      if(g.subVideos[idx]) return g.subVideos[idx];
    }
  }
  // 2. Check if the specific photo file path is a YouTube thumbnail (Photos & to upload/YouTube/VIDEO_ID.jpg)
  const allImgs = (g.images && g.images.length > 0) ? g.images : (g.path ? [g.path] : []);
  const curImg = allImgs[idx] || (idx === 0 ? g.path : '');
  if(curImg){
    const m = String(curImg).match(/YouTube\/([a-zA-Z0-9_-]{11})\./i);
    if(m && m[1]) return 'https://www.youtube.com/watch?v=' + m[1];
  }
  // 3. Only the first photo (index 0) defaults to root youtubeUrl if no subVideos dict is defined
  if(idx === 0 && g.youtubeUrl && (!g.subVideos || Object.keys(g.subVideos).length === 0)){
    return g.youtubeUrl;
  }
  return '';
}
window.getSubVideo = getSubVideo;

function getSubTitle(g, idx){
  if(!g) return '';
  if(g.subTitles){
    if(Array.isArray(g.subTitles) && g.subTitles[idx]) return g.subTitles[idx];
    if(typeof g.subTitles === 'object'){
      if(g.subTitles[String(idx)]) return g.subTitles[String(idx)];
      if(g.subTitles[idx]) return g.subTitles[idx];
    }
  }
  return g.title || '';
}
window.getSubTitle = getSubTitle;

function getSubDesc(g, idx){
  if(!g) return '';
  if(g.subDescriptions){
    if(Array.isArray(g.subDescriptions) && g.subDescriptions[idx]) return g.subDescriptions[idx];
    if(typeof g.subDescriptions === 'object'){
      if(g.subDescriptions[String(idx)]) return g.subDescriptions[String(idx)];
      if(g.subDescriptions[idx]) return g.subDescriptions[idx];
    }
  }
  return g.desc || '';
}
window.getSubDesc = getSubDesc;

let showcaseProjIdx = 0, showcasePhotoIdx = 0;

function renderGallery(filter){
  const c = document.getElementById('galleryGrid');
  if(!c) return;
  const activeFilter = filter || 'all';
  const filtered = activeFilter === 'all' ? galleryItems : galleryItems.filter(g => g.cat === activeFilter || g.pillar?.toLowerCase() === activeFilter);
  lbImages = filtered;

  if(showcaseProjIdx >= filtered.length) showcaseProjIdx = 0;
  showcasePhotoIdx = 0;
  renderShowcaseViewer();

  c.innerHTML = filtered.map((g,i)=>{
    const hasAnyVid = g.youtubeUrl || (g.images && g.images.some((_, sI)=>Boolean(getSubVideo(g, sI))));
    return `
    <div class="g-card ${i === showcaseProjIdx ? 'active-showcase-card' : ''}" id="gcard-${i}" onclick="selectShowcaseProject(${i})" style="position:relative">
      <div style="position:relative;overflow:hidden">
        <img src="${safeImgSrc(g.path)}" alt="${g.title}" loading="lazy" decoding="async" onerror="this.parentElement.style.background='#e2e6eb';this.style.display='none'">
        ${(g.images && g.images.length > 1) ? `<span style="position:absolute;bottom:10px;left:10px;background:rgba(17,20,26,0.85);color:#fff;font-family:var(--mono);font-size:9.5px;padding:3px 8px;border-radius:3px;font-weight:600;display:flex;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(0,0,0,0.3)">⊞ ${g.images.length} Photos</span>` : ''}
        ${hasAnyVid ? `<span class="g-video-badge" style="position:absolute;top:10px;right:10px;background:#e50914;color:#fff;font-family:var(--mono);font-size:9.5px;padding:3px 8px;border-radius:3px;font-weight:700;box-shadow:0 2px 6px rgba(0,0,0,0.4)">▶ Video</span>` : ''}
      </div>
      <div class="g-card-info">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
          <div class="g-cat-label">${g.cat || '3D'} · ${g.pillar || 'Personal'}</div>
          <button onclick="event.stopPropagation(); openLightbox(${i})" style="background:transparent;border:none;color:var(--ink3);cursor:pointer;font-family:var(--mono);font-size:10px;padding:0" title="Open Lightbox">⤢ View ↗</button>
        </div>
        <div class="g-title">${g.title}</div>
      </div>
    </div>
  `;}).join('');
}

function selectShowcaseProject(projIdx){
  showcaseProjIdx = projIdx;
  showcasePhotoIdx = 0;
  stopShowcaseVideo();
  renderShowcaseViewer();

  // Scroll smoothly to showcase top
  const sc = document.getElementById('galleryShowcase');
  if(sc){
    sc.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Highlight active grid card
  document.querySelectorAll('.g-card').forEach(c => {
    c.classList.remove('active-showcase-card');
    c.style.borderColor = '';
  });
  const activeCard = document.getElementById('gcard-' + projIdx);
  if(activeCard){
    activeCard.classList.add('active-showcase-card');
    activeCard.style.borderColor = 'var(--ink)';
  }
}
window.selectShowcaseProject = selectShowcaseProject;

function stepShowcaseProject(dir){
  if(lbImages.length <= 1) return;
  showcaseProjIdx = (showcaseProjIdx + dir + lbImages.length) % lbImages.length;
  showcasePhotoIdx = 0;
  stopShowcaseVideo();
  renderShowcaseViewer();
}
window.stepShowcaseProject = stepShowcaseProject;

function handleShowcaseImgClick(){
  const g = lbImages[showcaseProjIdx];
  if(!g) return;
  const vidUrl = getSubVideo(g, showcasePhotoIdx);
  if(vidUrl){
    playShowcaseVideo();
  } else {
    openShowcaseInLightbox();
  }
}
window.handleShowcaseImgClick = handleShowcaseImgClick;

function renderShowcaseViewer(){
  const g = lbImages[showcaseProjIdx];
  if(!g) return;
  const allImgs = (g.images && g.images.length > 0) ? g.images : (g.path ? [g.path] : []);

  if(showcasePhotoIdx >= allImgs.length) showcasePhotoIdx = 0;
  const activeSrc = allImgs[showcasePhotoIdx];
  const vidUrl = getSubVideo(g, showcasePhotoIdx);

  // 1. Update Main Stage Image & Play Overlay
  const imgEl = document.getElementById('showcaseImg');
  const playOverlay = document.getElementById('showcasePlayOverlay');
  if(imgEl){
    imgEl.src = safeImgSrc(activeSrc);
    imgEl.title = vidUrl ? "Click to play video on website" : "Click to view fullscreen lightbox";
  }
  if(playOverlay){
    playOverlay.style.display = vidUrl ? 'flex' : 'none';
  }

  // 2. Build Dedicated Photo Cards Strip (for multiple photos)
  const stripBar = document.getElementById('showcaseThumbstripBar');
  if(stripBar){
    if(allImgs.length > 1){
      stripBar.style.display = 'block';
      stripBar.innerHTML = `
        <div class="sc-strip-container">
          <button onclick="stepShowcasePhoto(-1)" class="sc-strip-arrow" title="Previous Photo">&lsaquo;</button>
          <div class="sc-strip-scroll" id="scStripScroll">
            ${allImgs.map((imgSrc, sIdx) => {
              const subV = getSubVideo(g, sIdx);
              const subT = getSubTitle(g, sIdx) || `Photo #${sIdx+1}`;
              const subD = getSubDesc(g, sIdx);
              const isActive = (sIdx === showcasePhotoIdx);
              return `
                <div onclick="switchShowcasePhoto(${sIdx})"
                     class="sc-photo-card ${isActive ? 'active' : ''}"
                     id="scCard-${sIdx}"
                     title="${subT}">
                  <div style="position:relative">
                    <img src="${safeImgSrc(imgSrc)}" class="sc-card-thumb" alt="Photo ${sIdx+1}" loading="lazy">
                    ${subV ? `<span class="sc-card-vidbadge" style="position:absolute;bottom:4px;right:4px">▶ Video</span>` : ''}
                  </div>
                  <div class="sc-card-body">
                    <div class="sc-card-header">
                      <span class="sc-card-num">#${sIdx+1}</span>
                    </div>
                    <div class="sc-card-title">${subT}</div>
                    ${subD ? `<div class="sc-card-desc">${subD}</div>` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          <button onclick="stepShowcasePhoto(1)" class="sc-strip-arrow" title="Next Photo">&rsaquo;</button>
          <span class="sc-strip-counter">
            ${showcasePhotoIdx + 1} / ${allImgs.length}
          </span>
        </div>
      `;
    } else {
      stripBar.style.display = 'none';
      stripBar.innerHTML = '';
    }
  }

  // 3. Update Title, Category, Description, and Video Action Button
  const activeTitle = getSubTitle(g, showcasePhotoIdx) || g.title;
  const activeDesc = getSubDesc(g, showcasePhotoIdx) || g.desc || '';

  const catEl = document.getElementById('showcaseCategory');
  const titleEl = document.getElementById('showcaseTitle');
  const descEl = document.getElementById('showcaseDesc');
  const vidBtnWrap = document.getElementById('showcaseVideoBtnWrap');

  if(catEl) catEl.textContent = `${(g.cat || '3D').toUpperCase()} • ${(g.pillar || 'PERSONAL').toUpperCase()} [ PROJECT ${showcaseProjIdx+1} OF ${lbImages.length} ]`;
  if(titleEl) titleEl.textContent = activeTitle;
  if(descEl) descEl.textContent = activeDesc;
  if(vidBtnWrap){
    vidBtnWrap.style.display = vidUrl ? 'inline-block' : 'none';
  }
}
window.renderShowcaseViewer = renderShowcaseViewer;

function switchShowcasePhoto(sIdx){
  const g = lbImages[showcaseProjIdx];
  if(!g) return;
  const allImgs = (g.images && g.images.length > 0) ? g.images : (g.path ? [g.path] : []);
  if(sIdx < 0 || sIdx >= allImgs.length) return;

  showcasePhotoIdx = sIdx;
  stopShowcaseVideo();
  const targetSrc = allImgs[sIdx];
  const vidUrl = getSubVideo(g, sIdx);

  const imgEl = document.getElementById('showcaseImg');
  const playOverlay = document.getElementById('showcasePlayOverlay');
  if(imgEl){
    imgEl.style.opacity = '0.35';
    setTimeout(() => {
      imgEl.src = safeImgSrc(targetSrc);
      imgEl.style.opacity = '1';
      imgEl.title = vidUrl ? "Click to play video on website" : "Click to view fullscreen lightbox";
    }, 60);
  }
  if(playOverlay){
    playOverlay.style.display = vidUrl ? 'flex' : 'none';
  }

  // Update active photo card highlight
  document.querySelectorAll('#showcaseThumbstripBar .sc-photo-card').forEach(c => c.classList.remove('active'));
  const activeCard = document.getElementById('scCard-' + sIdx);
  if(activeCard){
    activeCard.classList.add('active');
    activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  // Update Photo Counter
  const counterEl = document.querySelector('#showcaseThumbstripBar .sc-strip-counter');
  if(counterEl){
    counterEl.textContent = `${sIdx + 1} / ${allImgs.length}`;
  }

  // Update Title, Desc, and Video Button
  const activeTitle = getSubTitle(g, sIdx) || g.title;
  const activeDesc = getSubDesc(g, sIdx) || g.desc || '';

  const titleEl = document.getElementById('showcaseTitle');
  const descEl = document.getElementById('showcaseDesc');
  const vidBtnWrap = document.getElementById('showcaseVideoBtnWrap');

  if(titleEl) titleEl.textContent = activeTitle;
  if(descEl) descEl.textContent = activeDesc;
  if(vidBtnWrap){
    vidBtnWrap.style.display = vidUrl ? 'inline-block' : 'none';
  }
}
window.switchShowcasePhoto = switchShowcasePhoto;

function stepShowcasePhoto(dir){
  const g = lbImages[showcaseProjIdx];
  if(!g) return;
  const allImgs = (g.images && g.images.length > 0) ? g.images : (g.path ? [g.path] : []);
  if(allImgs.length <= 1) return;

  const nextIdx = (showcasePhotoIdx + dir + allImgs.length) % allImgs.length;
  switchShowcasePhoto(nextIdx);
}
window.stepShowcasePhoto = stepShowcasePhoto;

function playShowcaseVideo(){
  const g = lbImages[showcaseProjIdx];
  if(!g) return;
  const vidUrl = getSubVideo(g, showcasePhotoIdx);
  if(!vidUrl) return;

  const ytid = getYouTubeId(vidUrl);
  const wrap = document.getElementById('showcaseVideoWrap');
  const iframe = document.getElementById('showcaseVideoIframe');
  const closeBtn = document.getElementById('showcaseCloseVideoBtn');
  const playOverlay = document.getElementById('showcasePlayOverlay');

  if(wrap && iframe){
    if(ytid){
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + ytid + '?autoplay=1&rel=0&modestbranding=1&enablejsapi=1';
    } else {
      iframe.src = vidUrl;
    }
    wrap.style.display = 'block';
    if(closeBtn) closeBtn.style.display = 'block';
    if(playOverlay) playOverlay.style.display = 'none';
  }
}
window.playShowcaseVideo = playShowcaseVideo;

function stopShowcaseVideo(){
  const wrap = document.getElementById('showcaseVideoWrap');
  const iframe = document.getElementById('showcaseVideoIframe');
  const closeBtn = document.getElementById('showcaseCloseVideoBtn');
  const playOverlay = document.getElementById('showcasePlayOverlay');
  if(iframe) iframe.src = '';
  if(wrap) wrap.style.display = 'none';
  if(closeBtn) closeBtn.style.display = 'none';

  const g = lbImages[showcaseProjIdx];
  if(g){
    const vidUrl = getSubVideo(g, showcasePhotoIdx);
    if(playOverlay) playOverlay.style.display = vidUrl ? 'flex' : 'none';
  }
}
window.stopShowcaseVideo = stopShowcaseVideo;

function openShowcaseInLightbox(){
  openLightbox(showcaseProjIdx);
  if(showcasePhotoIdx > 0){
    switchLbSubImg(showcasePhotoIdx);
  }
}
window.openShowcaseInLightbox = openShowcaseInLightbox;

function filterGallery(cat, btn){
  document.querySelectorAll('.gf-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  showcaseProjIdx = 0;
  showcasePhotoIdx = 0;
  stopShowcaseVideo();
  renderGallery(cat);
  setupCursorHover();
  setTimeout(function(){
    if(window.refreshColorSpotlight) window.refreshColorSpotlight();
  }, 100);
  setTimeout(function(){
    if(window.refreshColorSpotlight) window.refreshColorSpotlight();
  }, 350);
}

function handleLbImgClick(){
  const g = lbImages[lbIdx];
  if(!g) return;
  const vidUrl = getSubVideo(g, curSubImgIdx);
  if(vidUrl){
    playLightboxVideo();
  }
}
window.handleLbImgClick = handleLbImgClick;

function openLightbox(i){
  lbIdx = i;
  curSubImgIdx = 0;
  stopLightboxVideo();
  const g = lbImages[i];
  if(!g) return;
  const allImgs = (g.images && g.images.length > 0) ? g.images : (g.path ? [g.path] : []);

  const lbColors = [
    { glow: 'rgba(0, 229, 255, 0.4)', border: '#00e5ff' },
    { glow: 'rgba(255, 64, 129, 0.4)', border: '#ff4081' },
    { glow: 'rgba(255, 179, 0, 0.4)', border: '#ffb300' },
    { glow: 'rgba(105, 240, 174, 0.4)', border: '#69f0ae' },
    { glow: 'rgba(179, 136, 255, 0.4)', border: '#b388ff' },
    { glow: 'rgba(68, 138, 255, 0.4)', border: '#448aff' }
  ];
  const activeColor = lbColors[i % lbColors.length];
  const lbEl = document.getElementById('lightbox');
  if(lbEl){
    lbEl.style.setProperty('--lb-glow', activeColor.glow);
    lbEl.style.setProperty('--lb-border', activeColor.border);
  }

  const lbImg = document.getElementById('lbImg');
  const lbPlayOverlay = document.getElementById('lbPlayOverlay');
  const vidUrl = getSubVideo(g, 0);

  if(lbImg){
    lbImg.src = safeImgSrc(allImgs[0]);
    lbImg.style.boxShadow = `0 0 35px ${activeColor.glow}, 0 20px 60px rgba(0,0,0,0.8)`;
    lbImg.style.borderColor = activeColor.border;
    lbImg.title = vidUrl ? "Click to play video on website" : "";
  }
  if(lbPlayOverlay){
    lbPlayOverlay.style.display = vidUrl ? 'flex' : 'none';
  }

  renderLightboxDockAndInfo(g, allImgs, 0, activeColor);

  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.openLightbox = openLightbox;

function playLightboxVideo(){
  const g = lbImages[lbIdx];
  if(!g) return;
  const vidUrl = getSubVideo(g, curSubImgIdx);
  if(!vidUrl) return;

  const ytid = getYouTubeId(vidUrl);
  const wrap = document.getElementById('lbVideoPlayerWrap');
  const iframe = document.getElementById('lbVideoIframe');
  const closeBtn = document.getElementById('lbCloseVideoBtn');
  const lbPlayOverlay = document.getElementById('lbPlayOverlay');

  if(wrap && iframe){
    if(ytid){
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + ytid + '?autoplay=1&rel=0&modestbranding=1&enablejsapi=1';
    } else {
      iframe.src = vidUrl;
    }
    wrap.style.display = 'block';
    if(closeBtn) closeBtn.style.display = 'block';
    if(lbPlayOverlay) lbPlayOverlay.style.display = 'none';
  }
}
window.playLightboxVideo = playLightboxVideo;

function stopLightboxVideo(){
  const wrap = document.getElementById('lbVideoPlayerWrap');
  const iframe = document.getElementById('lbVideoIframe');
  const closeBtn = document.getElementById('lbCloseVideoBtn');
  const lbPlayOverlay = document.getElementById('lbPlayOverlay');
  if(iframe) iframe.src = '';
  if(wrap) wrap.style.display = 'none';
  if(closeBtn) closeBtn.style.display = 'none';

  const g = lbImages[lbIdx];
  if(g){
    const vidUrl = getSubVideo(g, curSubImgIdx);
    if(lbPlayOverlay) lbPlayOverlay.style.display = vidUrl ? 'flex' : 'none';
  }
}
window.stopLightboxVideo = stopLightboxVideo;

function renderLightboxDockAndInfo(g, allImgs, activeSubIdx, activeColor){
  const captionEl = document.getElementById('lbCaption');
  if(!captionEl) return;

  // 1. Build Floating Dock Filmstrip with Left/Right arrow controls
  let dockHtml = '';
  if(allImgs.length > 1){
    dockHtml = `
      <div class="lb-dock-container" onclick="event.stopPropagation()">
        <button class="lb-dock-arrow" onclick="lbStepSubImg(-1)" title="Previous photo in project">&lsaquo;</button>
        <div class="lb-dock-strip" id="lbDockStrip">
          ${allImgs.map((imgSrc, sIdx) => {
            const hasVid = getSubVideo(g, sIdx);
            const subT = getSubTitle(g, sIdx) || `Photo #${sIdx+1}`;
            const isActive = sIdx === activeSubIdx;
            return `
              <div onclick="switchLbSubImg(${sIdx})"
                   class="lb-dock-thumb ${isActive ? 'active' : ''}"
                   id="lbThumb-${sIdx}"
                   title="${subT}">
                <img src="${safeImgSrc(imgSrc)}" alt="Thumbnail ${sIdx+1}" loading="lazy">
                ${hasVid ? `<span style="position:absolute;bottom:2px;right:2px;background:#e50914;color:#fff;font-size:8px;padding:1px 3px;border-radius:2px;font-weight:bold">▶</span>` : ''}
              </div>
            `;
          }).join('')}
        </div>
        <button class="lb-dock-arrow" onclick="lbStepSubImg(1)" title="Next photo in project">&rsaquo;</button>
        <span id="lbPhotoCounter" style="font-family:var(--mono);font-size:11px;color:#94a3b8;margin-left:4px;font-weight:600;white-space:nowrap">
          ${activeSubIdx + 1} / ${allImgs.length}
        </span>
      </div>
    `;
  }

  // 2. Active Metadata
  const activeTitle = getSubTitle(g, activeSubIdx) || g.title;
  const activeDesc = getSubDesc(g, activeSubIdx) || g.desc || '';
  const vidUrl = getSubVideo(g, activeSubIdx);
  const activePath = safeImgSrc(allImgs[activeSubIdx]);

  const metaBadge = (g.cat || g.pillar) ? `
    <div style="margin-top:6px;margin-bottom:6px">
      <span style="font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:#94a3b8;padding:3px 10px;border-radius:12px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14)">
        ${(g.cat || '3D').toUpperCase()} &bull; ${(g.pillar || 'Personal').toUpperCase()}
      </span>
    </div>
  ` : '';

  captionEl.innerHTML = `
    ${dockHtml}
    ${metaBadge}
    <div id="lbActiveTitle" style="font-family:var(--serif);font-size:23px;font-weight:500;margin-top:4px;margin-bottom:6px;color:#ffffff;letter-spacing:0.01em">
      ${activeTitle}
    </div>
    <div id="lbActiveDesc" style="font-size:13.5px;color:rgba(240,246,252,0.85);max-width:720px;margin:0 auto;line-height:1.6">
      ${activeDesc}
    </div>
    <div id="lbActionButtons" style="margin-top:14px;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap">
      ${vidUrl ? `
        <button onclick="event.stopPropagation(); playLightboxVideo();"
                style="display:inline-flex;align-items:center;gap:6px;color:#fff;background:#e50914;padding:7px 20px;border-radius:20px;border:none;cursor:pointer;font-family:var(--mono);font-size:11.5px;font-weight:700;box-shadow:0 4px 14px rgba(229,9,20,0.45);transition:all .2s">
          ▶ Play Video on Website
        </button>
        <a href="${vidUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()"
           style="display:inline-flex;align-items:center;gap:6px;color:#f87171;background:rgba(229,9,20,0.12);border:1px solid rgba(229,9,20,0.3);padding:7px 16px;border-radius:20px;text-decoration:none;font-family:var(--mono);font-size:11.5px;font-weight:600;transition:all .2s">
          Watch on YouTube &nearr;
        </a>
      ` : ''}
      <a id="lbFullBtn" href="${activePath}" target="_blank" rel="noopener" onclick="event.stopPropagation()"
         style="display:inline-flex;align-items:center;gap:6px;color:#cbd5e1;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);padding:7px 18px;border-radius:20px;text-decoration:none;font-family:var(--mono);font-size:11.5px;font-weight:600;transition:all .2s">
        &cudarrl; Full Image &nearr;
      </a>
    </div>
  `;
}

function switchLbSubImg(sIdx){
  const g = lbImages[lbIdx];
  if(!g) return;
  const allImgs = (g.images && g.images.length > 0) ? g.images : (g.path ? [g.path] : []);
  if(sIdx < 0 || sIdx >= allImgs.length) return;

  curSubImgIdx = sIdx;
  stopLightboxVideo();
  const targetSrc = safeImgSrc(allImgs[sIdx]);
  const vidUrl = getSubVideo(g, sIdx);

  const lbImg = document.getElementById('lbImg');
  const lbPlayOverlay = document.getElementById('lbPlayOverlay');

  if(lbImg){
    lbImg.style.opacity = '0.4';
    setTimeout(() => {
      lbImg.src = targetSrc;
      lbImg.style.opacity = '1';
      lbImg.title = vidUrl ? "Click to play video on website" : "";
    }, 60);
  }
  if(lbPlayOverlay){
    lbPlayOverlay.style.display = vidUrl ? 'flex' : 'none';
  }

  // Highlight thumbnail in dock
  document.querySelectorAll('.lb-dock-thumb').forEach(t => t.classList.remove('active'));
  const activeT = document.getElementById('lbThumb-' + sIdx);
  if(activeT){
    activeT.classList.add('active');
    activeT.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  // Update Photo Counter
  const counterEl = document.getElementById('lbPhotoCounter');
  if(counterEl){
    counterEl.textContent = `${sIdx + 1} / ${allImgs.length}`;
  }

  // Update Dynamic Title & Description per photo
  const activeTitle = getSubTitle(g, sIdx) || g.title;
  const activeDesc = getSubDesc(g, sIdx) || g.desc || '';
  const titleEl = document.getElementById('lbActiveTitle');
  const descEl = document.getElementById('lbActiveDesc');
  if(titleEl) titleEl.textContent = activeTitle;
  if(descEl) descEl.textContent = activeDesc;

  // Re-render Action Buttons for this photo
  const actionWrap = document.getElementById('lbActionButtons');
  if(actionWrap){
    actionWrap.innerHTML = `
      ${vidUrl ? `
        <button onclick="event.stopPropagation(); playLightboxVideo();"
                style="display:inline-flex;align-items:center;gap:6px;color:#fff;background:#e50914;padding:7px 20px;border-radius:20px;border:none;cursor:pointer;font-family:var(--mono);font-size:11.5px;font-weight:700;box-shadow:0 4px 14px rgba(229,9,20,0.45);transition:all .2s">
          ▶ Play Video on Website
        </button>
        <a href="${vidUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()"
           style="display:inline-flex;align-items:center;gap:6px;color:#f87171;background:rgba(229,9,20,0.12);border:1px solid rgba(229,9,20,0.3);padding:7px 16px;border-radius:20px;text-decoration:none;font-family:var(--mono);font-size:11.5px;font-weight:600;transition:all .2s">
          Watch on YouTube &nearr;
        </a>
      ` : ''}
      <a id="lbFullBtn" href="${targetSrc}" target="_blank" rel="noopener" onclick="event.stopPropagation()"
         style="display:inline-flex;align-items:center;gap:6px;color:#cbd5e1;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);padding:7px 18px;border-radius:20px;text-decoration:none;font-family:var(--mono);font-size:11.5px;font-weight:600;transition:all .2s">
        &cudarrl; Full Image &nearr;
      </a>
    `;
  }
}
window.switchLbSubImg = switchLbSubImg;

function lbStepSubImg(dir){
  const g = lbImages[lbIdx];
  if(!g) return;
  const allImgs = (g.images && g.images.length > 0) ? g.images : (g.path ? [g.path] : []);
  if(allImgs.length <= 1) return;

  const nextSub = (curSubImgIdx + dir + allImgs.length) % allImgs.length;
  switchLbSubImg(nextSub);
}
window.lbStepSubImg = lbStepSubImg;

function lbNav(dir){
  const g = lbImages[lbIdx];
  if(!g) return;
  const allImgs = (g.images && g.images.length > 0) ? g.images : (g.path ? [g.path] : []);

  // If project has multiple photos, step through photos first
  if(allImgs.length > 1){
    const nextSub = curSubImgIdx + dir;
    if(nextSub >= 0 && nextSub < allImgs.length){
      switchLbSubImg(nextSub);
      return;
    }
  }

  // Otherwise navigate to previous/next project
  lbIdx = (lbIdx + dir + lbImages.length) % lbImages.length;
  openLightbox(lbIdx);
}
window.lbNav = lbNav;

function openLightboxDirect(path, title){
  document.getElementById('lbImg').src = safeImgSrc(path);
  document.getElementById('lbCaption').innerHTML = `<div style="font-family:var(--serif);font-size:20px;color:#fff;margin-top:10px">${title}</div>`;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.openLightboxDirect = openLightboxDirect;

function closeLightbox(){
  stopLightboxVideo();
  const lb = document.getElementById('lightbox');
  if(lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}
window.closeLightbox = closeLightbox;

document.addEventListener('keydown', function(e){
  const lb = document.getElementById('lightbox');
  if(lb && lb.classList.contains('open')){
    if(e.key === 'ArrowLeft') lbNav(-1);
    else if(e.key === 'ArrowRight') lbNav(1);
    else if(e.key === 'Escape') closeLightbox();
  }
});


// 5. SOFTWARE PAGE (B&W WITH IMAGES)
function renderSoftware(){
  const c = document.getElementById('softwareContainer') || document.getElementById('softwareContent');
  if(!c) return;
  c.innerHTML = `
    <div class="software-cat-section" style="padding:48px;background:var(--bg)">
      <div class="sw-products-grid">${software.map((s,i)=>swCard(s,i)).join('')}</div>
    </div>
  `;
}

function swCard(s, i){
  return `
    <div class="sw-product-card" style="${getCardGlowStyle(i !== undefined ? i : 0)}">
      <div>
        ${s.img ? `<img class="sw-img-banner" src="${s.img}" alt="${s.name}" loading="lazy" decoding="async" onerror="this.style.display='none'">` : ''}
        <div class="sw-product-meta">
          <span class="sw-product-type">${s.cat}</span>
          <span class="sw-product-price">${s.price}</span>
        </div>
        <div class="sw-product-name" >${s.name}</div>
        <div class="sw-product-desc">${s.desc}</div>
      </div>
      ${s.link && s.link !== '#' ? `<a class="sw-product-link" href="${s.link}" target="_blank">View Product →</a>` : `<span class="sw-product-link" style="color:var(--ink4)">Active Production Tool</span>`}
    </div>
  `;
}

// 6. ARTICLES PAGE
function renderArticles(){
  const c = document.getElementById('articlesPageGrid');
  if(!c) return;
  c.innerHTML = articles.map(a=>`
    <div class="article-card" onclick="if('${a.url}'.startsWith('http')){window.open('${a.url}','_blank')}else{location.href='${a.url}'}">
      <div>
        <div class="article-meta">${a.category} · ${a.date}</div>
        <h3 class="article-title" >${a.title}</h3>
        <p class="article-desc">${a.desc}</p>
        <div class="tech-tags-wrap" style="margin-bottom:20px">
          ${(a.tags||[]).map(t=>`<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
      <a class="article-btn" href="${a.url}" target="${a.url.startsWith('http')?'_blank':'_self'}">Read Article &rarr;</a>
    </div>
  `).join('');
}

// 7. ABOUT PAGE
function renderAbout(){
  const el = document.getElementById('expList');
  if(el){
    el.innerHTML = experience.map(e=>`
      <div class="exp-row">
        <div class="exp-dates">${e.start} — ${e.end}</div>
        <div>
          <div class="exp-company">${e.company}</div>
          <div class="exp-role">${e.role}</div>
          <div class="exp-tags">${(e.tags||[]).map(t=>`<span class="exp-tag">${t}</span>`).join('')}</div>
        </div>
      </div>
    `).join('');
  }
  const cg = document.getElementById('clientsGrid');
  if(cg){
    cg.innerHTML = clients.map(c=>`<div class="client-tag">${c}</div>`).join('');
  }
}

// 8. BACKEND PAGE




function showToast(msg){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2500);
}

// ==================== MASTER COMPLETE BACKEND CONTROLLER ====================

// 1. NOVELS BACKEND
// ==================== AUTH & SECURITY ====================
async function autoFetchCloudDatabaseOnBoot(){
  try {
    const res = await fetch('portfolio_data.json?_t=' + Date.now());
    if(res.ok){
      const data = await res.json();
      if(data.novels && Array.isArray(data.novels)) novels = data.novels;
      if(data.tech && Array.isArray(data.tech)) techProjects = data.tech;
      if(data.gallery && Array.isArray(data.gallery)) galleryItems = data.gallery;
      if(data.software && Array.isArray(data.software)) software = data.software;
      if(data.experience && Array.isArray(data.experience)) experience = data.experience;
      if(data.clients && Array.isArray(data.clients)) clients = data.clients;
      if(data.articles && Array.isArray(data.articles)) articles = data.articles;
      const activePage = document.querySelector('.page.active');
      const pageName = activePage ? activePage.id.replace('page-', '') : 'home';
      if(typeof renderPage === 'function') renderPage(pageName);
    }
  } catch(e){
    // Silent failover to local data on boot
  }
}
window.autoFetchCloudDatabaseOnBoot = autoFetchCloudDatabaseOnBoot;

// Instant Real-Time Cross-Tab Live Sync
window.addEventListener('storage', function(e){
  if(e.key && e.key.startsWith('rana_')){
    if(typeof loadData === 'function'){
      novels = loadData('rana_novels_data', novels);
      techProjects = loadData('rana_tech_data', techProjects);
      galleryItems = loadData('rana_gallery_data', galleryItems);
      software = loadData('rana_software_data', software);
      experience = loadData('rana_experience_data', experience);
      clients = loadData('rana_clients_data', clients);
      articles = loadData('rana_articles_data', articles);
    }
    const activePage = document.querySelector('.page.active');
    const pageName = activePage ? activePage.id.replace('page-', '') : 'home';
    if(typeof renderPage === 'function') renderPage(pageName);
  }
});

function downloadDataJson(){
  const fullBackup = {
    updatedAt: new Date().toISOString(),
    version: '4.5',
    novels,
    tech: techProjects,
    gallery: galleryItems,
    software,
    experience,
    clients,
    articles
  };
  const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `rana_portfolio_backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Downloaded complete JSON backup file');
}
window.downloadDataJson = downloadDataJson;
function downloadBackupJsonFile(){ return downloadDataJson(); }
window.downloadBackupJsonFile = downloadBackupJsonFile;

function restoreDataJson(e){
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(evt){
    try {
      const data = JSON.parse(evt.target.result);
      if(data.novels) { novels = data.novels; saveData('rana_novels_data', novels); }
      if(data.tech) { techProjects = data.tech; saveData('rana_tech_data', techProjects); }
      if(data.gallery) { galleryItems = data.gallery; saveData('rana_gallery_data', galleryItems); }
      if(data.software) { software = data.software; saveData('rana_software_data', software); }
      if(data.experience) { experience = data.experience; saveData('rana_experience_data', experience); }
      if(data.clients) { clients = data.clients; saveData('rana_clients_data', clients); }
      if(data.articles) { articles = data.articles; saveData('rana_articles_data', articles); }
      renderBackend(); beLoadTokenToVaultInput();
      renderHome();
      scheduleGitHubAutoSync();
      showToast('Database restored successfully from JSON file');
    } catch(err){
      alert('Invalid JSON file format: ' + err.message);
    }
  };
  reader.readAsText(file);
}
window.restoreDataJson = restoreDataJson;
function restoreFromFile(e){ return restoreDataJson(e); }
window.restoreFromFile = restoreFromFile;

async function saveDataToCloud(){
  return saveAllDataToGitHub();
}
window.saveDataToCloud = saveDataToCloud;
async function saveToCloudOnline(){ return saveDataToCloud(); }
window.saveToCloudOnline = saveToCloudOnline;

async function loadDataFromCloud(){
  return pullDataFromGitHub();
}
window.loadDataFromCloud = loadDataFromCloud;
async function loadFromCloudOnline(){ return loadDataFromCloud(); }
window.loadFromCloudOnline = loadFromCloudOnline;

// ==================== MASTER 3-COLOR THEME & HERO ENGINE ====================
const GLOBAL_THEMES = {
  light: { label: 'WHITE STUDY', color: '#e6a100', bodyClass: 'theme-light' },
  evening: { label: 'BLUE EVENING STUDY', color: '#ff9800', bodyClass: 'theme-evening' },
  dark: { label: 'BLACK NOCTURNAL STUDY', color: '#00e5ff', bodyClass: 'theme-dark' }
};

let activeTheme = 'light';
let starCanvasCtx = null;
let starsArray = [];
let starAnimationId = null;

function setGlobalTheme(theme, manual = true){
  if(!GLOBAL_THEMES[theme]) return;
  activeTheme = theme;
  if(manual){
    try { localStorage.setItem('rana_preferred_theme', theme); } catch(e){}
  }

  // 1. Update body theme class (triggers global CSS variable and header color updates)
  if(document.body){
    document.body.classList.remove('theme-light', 'theme-evening', 'theme-dark');
    document.body.classList.add(GLOBAL_THEMES[theme].bodyClass);
  }

  // 2. Crossfade Hero Image layers cleanly (Full Visibility, No Masks)
  const lLight = document.getElementById('heroLayerLight');
  const lEve = document.getElementById('heroLayerEvening');
  const lDark = document.getElementById('heroLayerDark');
  const ind = document.getElementById('heroColorIndicator');
  const lbl = document.getElementById('heroTimeLabel');

  if(lLight && lEve && lDark){
    lLight.style.opacity = theme === 'light' ? '1' : '0';
    lEve.style.opacity = theme === 'evening' ? '1' : '0';
    lDark.style.opacity = theme === 'dark' ? '1' : '0';
  }

  const info = GLOBAL_THEMES[theme];
  if(ind && info){
    ind.style.background = info.color;
    ind.style.boxShadow = `0 0 8px ${info.color}`;
  }
  if(lbl && info){
    lbl.textContent = info.label;
    lbl.style.color = 'var(--ink)';
  }

  // 3. Update theme buttons UI
  ['light', 'evening', 'dark'].forEach(st => {
    const btn = document.getElementById('btnTheme' + st.charAt(0).toUpperCase() + st.slice(1));
    if(btn){
      if(st === theme){
        btn.style.background = 'var(--ink)';
        btn.style.color = 'var(--bg)';
        btn.style.borderColor = 'var(--ink)';
        btn.style.fontWeight = '600';
      } else {
        btn.style.background = 'var(--bg-card)';
        btn.style.color = 'var(--ink)';
        btn.style.borderColor = 'var(--border)';
        btn.style.fontWeight = '400';
      }
    }
  });
}
window.setGlobalTheme = setGlobalTheme;

// ==================== TWINKLING BACKGROUND STARS ====================
function initGlobalStarsCanvas(){
  const canvas = document.getElementById('globalStarsCanvas');
  if(!canvas) return;
  starCanvasCtx = canvas.getContext('2d');

  function resizeStars(){
    canvas.width = window.innerWidth || 1920;
    canvas.height = window.innerHeight || 1080;
  }
  resizeStars();
  window.addEventListener('resize', resizeStars);

  starsArray = [];
  const STAR_COUNT = 90;
  for(let i = 0; i < STAR_COUNT; i++){
    starsArray.push({
      x: Math.random() * (window.innerWidth || 1920),
      y: Math.random() * (window.innerHeight || 1080),
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      hue: Math.random() > 0.6 ? '#ffd166' : '#a0c4ff'
    });
  }

  function renderStars(){
    if((activeTheme === 'evening' || activeTheme === 'dark') && starCanvasCtx && canvas.width > 0){
      starCanvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      for(let i = 0; i < starsArray.length; i++){
        const s = starsArray[i];
        s.alpha += Math.sin(Date.now() * s.twinkleSpeed * 0.1) * 0.015;
        const curAlpha = Math.max(0.1, Math.min(1, s.alpha));
        starCanvasCtx.beginPath();
        starCanvasCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        starCanvasCtx.fillStyle = s.hue === '#ffd166' ? `rgba(255, 209, 102, ${curAlpha})` : `rgba(160, 196, 255, ${curAlpha})`;
        starCanvasCtx.fill();
      }
    }
    starAnimationId = requestAnimationFrame(renderStars);
  }
  renderStars();
}

// ==================== SEAMLESS CLOUD AUTO-SYNC ON INITIAL BOOT ====================


function setupGlobalThemeEngine(){
  initGlobalStarsCanvas();
  let saved = 'light';
  try { saved = localStorage.getItem('rana_preferred_theme') || 'light'; } catch(e){}
  setGlobalTheme(saved, false);
}

// Final Boot Sequence on Window Load
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', function(){
    setupGlobalThemeEngine();
    autoFetchCloudDatabaseOnBoot();
    renderHome();
  });
} else {
  setupGlobalThemeEngine();
  autoFetchCloudDatabaseOnBoot();
  renderHome();
}












// ==================== MASTER TRUE 360-DEGREE CHROMATIC RAINBOW PALETTES ====================
(function initTrue360Glow(){
  const palette = [
    { border: 'rgba(0, 229, 255, 0.9)', glow: 'rgba(0, 229, 255, 0.45)', ambient: 'rgba(0, 229, 255, 0.25)', soft: 'rgba(0, 229, 255, 0.12)', accent: '#00e5ff' },   // Electric Cyan
    { border: 'rgba(0, 230, 118, 0.9)', glow: 'rgba(0, 230, 118, 0.45)', ambient: 'rgba(0, 230, 118, 0.25)', soft: 'rgba(0, 230, 118, 0.12)', accent: '#00e676' },   // Emerald Mint
    { border: 'rgba(179, 136, 255, 0.9)', glow: 'rgba(179, 136, 255, 0.45)', ambient: 'rgba(179, 136, 255, 0.25)', soft: 'rgba(179, 136, 255, 0.12)', accent: '#b388ff' }, // Amethyst Violet
    { border: 'rgba(255, 215, 64, 0.9)', glow: 'rgba(255, 215, 64, 0.45)', ambient: 'rgba(255, 215, 64, 0.25)', soft: 'rgba(255, 215, 64, 0.12)', accent: '#ffd740' },  // Golden Amber
    { border: 'rgba(255, 64, 129, 0.9)', glow: 'rgba(255, 64, 129, 0.45)', ambient: 'rgba(255, 64, 129, 0.25)', soft: 'rgba(255, 64, 129, 0.12)', accent: '#ff4081' },  // Vivid Coral/Pink
    { border: 'rgba(68, 138, 255, 0.9)', glow: 'rgba(68, 138, 255, 0.45)', ambient: 'rgba(68, 138, 255, 0.25)', soft: 'rgba(68, 138, 255, 0.12)', accent: '#448aff' }   // Cobalt Sapphire
  ];

  const CARD_SELECTOR = '.g-card, .novel-card, .novel-page-card, .proj-card, .sw-product-card, .tech-spotlight-card, .dls-card, .article-card, .expertise-grid > div, .exp-item';

  function apply360GlowToCards(){
    document.querySelectorAll(CARD_SELECTOR).forEach((card, i) => {
      const col = palette[i % palette.length];
      card.style.setProperty('--card-border', col.border);
      card.style.setProperty('--card-glow', col.glow);
      card.style.setProperty('--card-glow-ambient', col.ambient);
      card.style.setProperty('--card-glow-soft', col.soft);
      card.style.setProperty('--card-accent', col.accent);
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', apply360GlowToCards);
  } else {
    apply360GlowToCards();
  }

  window.refreshAllCardGlows = function(){
    setTimeout(apply360GlowToCards, 30);
  };
})();

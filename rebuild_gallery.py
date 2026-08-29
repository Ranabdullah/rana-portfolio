import os
import re

html_path = r'f:\AntiGravity\Apps Data\Website Portfolio Work\rana_galaxy_portfolio_v3.html'
with open(html_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the start of the script section and CATS array
script_start = -1
cats_start = -1
for i, line in enumerate(lines):
    if '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js' in line:
        script_start = i
    if 'const CATS = [' in line:
        cats_start = i

if script_start == -1 or cats_start == -1:
    print("Could not find script or CATS start")
    exit(1)

# We want to keep everything before line 777 (CATS start)
# and then inject a clean CATS array and the correct functions.
# Wait, let's look at the original file structure.
# The functions should be AFTER CATS or BEFORE? 
# In the current file, they are mixed.

# I'll rebuild the entire script tag from scratch.
# Everything from script_start to the end of the file.

new_script = r"""<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
window.onerror = function(msg, url, line) { console.error("JS Error: " + msg + " at " + line); };

const TABS = ['home', 'stories', 'software', 'gallery', 'work', 'clients', 'social'];
const PBASE = 'Photos %26 to upload/';
const NOVEL_LINKS = {
    "Children of Pain": "https://docs.google.com/document/d/1ykCFTL430Gxn3IiQDUIVh-6bxdF-2WcEz8hC1-9eJR8/edit?usp=sharing",
    "Shavings": "https://drive.google.com/file/d/1QSF-nl5vBgRO0GTFnYDVOtiD_nm5xeES/view?usp=sharing",
    "The Last Beacon": "https://docs.google.com/document/d/1Vay40nA5vp0C1XGL0FQb7M1SrslvJOTD/edit?usp=sharing",
    "The Record Survives": "https://docs.google.com/document/d/1y2j4iKLtMu2j9i9GjW476ObwiSYSbC6Z/edit?usp=sharing",
    "The Veil of Shadows": "https://docs.google.com/document/d/10ZAEuxvSZFqViBpQUDcmWPKdDuoHQZsz/edit?usp=sharing",
    "What the Buffalo Carry": "https://docs.google.com/document/d/1zFb6Ul0jzMpeyWC3jaSv6pGRnyY4GIrBh0_A0YDbe6s/edit?usp=sharing",
    "Ten Days in Heaven": "https://docs.google.com/document/d/1-HYEEwrUe0ZnU1JTJ4ewyqi9TI7qGaei/edit?usp=sharing",
    "The Quiet Reset": "https://docs.google.com/document/d/1_9iE-9A5Z8_8vP_A4Jk_Y9L_A_Z_P_X/edit" 
};

function go(id) {
    const target = document.getElementById('s-' + id);
    if (!target) return console.warn('Section missing:', id);
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('on'));
    document.querySelectorAll('.nt').forEach(t => t.classList.remove('on'));
    target.classList.add('on');
    const tabIdx = TABS.indexOf(id);
    if (tabIdx !== -1) {
        const tab = document.querySelectorAll('.nt')[tabIdx];
        if (tab) tab.classList.add('on');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openBook(title, genre, c1, c2, content) {
    const bmod = document.getElementById('bmod');
    if (!bmod) return;
    document.getElementById('bgen').textContent = genre;
    document.getElementById('btit').textContent = title;
    document.getElementById('bmg').textContent = genre;
    document.getElementById('bh').style.background = `linear-gradient(155deg, ${c1}, ${c2})`;
    document.getElementById('bcnt').innerHTML = content.split('\n\n').map(p => `<p>${p}</p>`).join('');
    let link = NOVEL_LINKS[title] || '';
    const rb = document.getElementById('bmod-read');
    if (rb) {
        if (link) {
            rb.style.display = '';
            rb.onclick = () => window.open(link, '_blank');
        } else {
            rb.style.display = 'none';
        }
    }
    bmod.classList.add('on');
}
function closeBook() { document.getElementById('bmod').classList.remove('on') }

function openSWDetail(title, desc, feats, link) {
    const mod = document.getElementById('swmod');
    if (!mod) return;
    document.getElementById('swmtit').textContent = title;
    document.getElementById('swmdesc').textContent = desc;
    document.getElementById('swmfeats').innerHTML = feats.split('\n').map(f => `<div class="swmfi">✦ ${f}</div>`).join('');
    const btn = document.getElementById('swmlink');
    if (btn) btn.onclick = () => window.open(link, '_blank');
    mod.classList.add('on');
}
function closeSW() { document.getElementById('swmod').classList.remove('on'); }

function openLB(cat, title, desc, img) {
    const mod = document.getElementById('lbox');
    if (!mod) return;
    document.getElementById('lbcat').textContent = cat;
    document.getElementById('lbtit').textContent = title;
    document.getElementById('lbdesc').textContent = desc;
    document.getElementById('lbimg').style.backgroundImage = `url('${img}')`;
    mod.classList.add('on');
}
function closeLB() { document.getElementById('lbox').classList.remove('on'); }

function openA() { document.getElementById('amod').classList.add('on') }
function closeA() { document.getElementById('amod').classList.remove('on') }
function swA(btn, id) {
    document.querySelectorAll('.anav').forEach(n => n.classList.remove('on'));
    document.querySelectorAll('.apnl').forEach(p => p.classList.remove('on'));
    btn.classList.add('on'); document.getElementById('pad-' + id).classList.add('on');
}

const WORK_DATA = [
    { "y": "Sep 2023 — Present", "c": "IDFL International Ltd", "r": "Software Engineer", "d": "Contributing to software development projects at IDFL International Ltd. Leveraging background in digital content workflows to build efficient, scalable software solutions." },
    { "y": "Feb 2023 — Present", "c": "Hashage Ireland", "r": "Senior Video Editor", "d": "Vlogs editor, 3D architecture renders, intro videos, videography, and 3D animations." },
    { "y": "Jun 2020 — Present", "c": "Dublin Branding Agency", "r": "Video Editor", "d": "Senior Video Editor responsible for end-to-end video production for branding, marketing, and digital campaigns." },
    { "y": "Nov 2021 — Aug 2023", "c": "RizPros LTD", "r": "Supply Chain Manager", "d": "Improved the website and social media management for better sales." },
    { "y": "Feb 2021 — Aug 2022", "c": "Digiworld Ireland", "r": "Digital Media Manager", "d": "Oversaw digital content strategy and media workflows." },
    { "y": "May 2016 — Jun 2018", "c": "GH Industry", "r": "Assistant Procurement Manager", "d": "Hiring and training staff. Monitoring inventory and ordering merchandise based on demand." },
    { "y": "Jun 2012 — Sep 2016", "c": "UET Taxila", "r": "Graphic Designing (Freelance)", "d": "Events designing head. Designed student cards, invitations, posters, and banners." }
];

const CLIENT_DATA = [
    { "n": "Hospitality & Dining", "r": "Visuals & Branding", "d": "Eskimo Pizza, Subway, Wayback Burgers, Zouq, Dera, Chick City, Chickn Lickn, Biryani Box, Madia Street Food, Quality Food and Beverages.", "img": "Client/Eskimo/Interior/Final1.jpg" },
    { "n": "Technology & Media", "r": "Systems & Content", "d": "IDFL, Rizpros, Get Connected, Digiworld, Hashage, IT-Fix, R24 News, Markhor.", "img": "Client/Clients/4.jpg" },
    { "n": "Legal & Professional", "r": "Solutions & Management", "d": "FSK Solicitors, I&C Law, IMK Law, IK & Co. Solicitors, QR Accounting, FAMS.", "img": "Client/Clients/3.jpg" },
    { "n": "Retail & Lifestyle", "r": "Creative Partner", "d": "Apache, IPPA, FAst Premium Products, Wonderlicious, Eurasia, Laura Dowling Studio, Chronic Pain Consulting, Motokraf.", "img": "Client/Clients/1.jpg" }
];

const LOGOS = ["IDFL", "HASHAGE", "RIZPROS", "ESKIMO PIZZA", "SUBWAY", "WAYBACK BURGERS", "GET CONNECTED", "DIGIWORLD", "APACHE", "IPPA", "ZOUQ", "DERA", "CHICK CITY", "CHICKN LICKN", "BIRYANI BOX", "R24 NEWS", "IT-FIX", "FSK SOLICITORS", "I&C LAW", "IMK LAW", "IK & CO", "QR ACCOUNTING", "FAMS", "FAST PREMIUM", "WONDERLICIOUS", "EURASIA", "LAURA DOWLING", "MADIA STREET", "QUALITY FOOD", "MOTOKRAFT", "CHRONIC PAIN"];

"""

# Now I need to get the CATS array.
# I'll re-run the scanning logic in this script to get the proper CATS array.

root = r'f:\AntiGravity\Apps Data\Website Portfolio Work\Photos & to upload'
cats_dict = {}

# Pillar map (simplified)
pillar_map = {
    'Client': 'client',
    'Exterior': 'client',
    'Interior': 'client',
    'Get Connected Interior': 'client',
    'Product Render': 'client',
    'Logo': 'client',
    'Rizpros': 'client',
    'Eskimo': 'client',
    'IDFL': 'client'
}

for item in os.listdir(root):
    item_path = os.path.join(root, item)
    if os.path.isdir(item_path):
        cat_name = item
        pillar = pillar_map.get(cat_name, 'personal')
        if 'Client/' in cat_name: pillar = 'client'
        
        files = []
        for f in os.listdir(item_path):
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.mp4', '.mov', '.gif')):
                f_path = os.path.join(item_path, f)
                f_type = 'video' if f.lower().endswith(('.mp4', '.mov')) else 'image'
                size = os.path.getsize(f_path)
                files.append({"n": os.path.splitext(f)[0], "e": f, "t": f_type, "s": size})
        
        if files:
            cats_dict[cat_name] = {
                "name": cat_name,
                "pillar": pillar,
                "fe": cat_name,
                "files": files
            }

# Add top level files to a "Daily Art Flow" category
top_files = []
for f in os.listdir(root):
    f_path = os.path.join(root, f)
    if os.path.isfile(f_path) and f.lower().endswith(('.png', '.jpg', '.jpeg', '.mp4', '.mov', '.gif')):
        f_type = 'video' if f.lower().endswith(('.mp4', '.mov')) else 'image'
        size = os.path.getsize(f_path)
        top_files.append({"n": os.path.splitext(f)[0], "e": f, "t": f_type, "s": size})

if top_files:
    cats_dict['Daily Art Flow'] = {
        "name": "Daily Art Flow",
        "pillar": "personal",
        "fe": "",
        "files": top_files
    }

import json
cats_json = json.dumps(list(cats_dict.values()), indent=2)

new_script += f"const CATS = {cats_json};\n"

new_script += r"""
let glbCi = 0, glbFi = 0;

function initDynamicContent() {
    const tw = document.getElementById('work-timeline');
    if (tw) tw.innerHTML = WORK_DATA.map((w, i) => `<div class="tw"><div class="td" style="background:rgba(255,255,255,0.05);color:var(--t2)">0${i + 1}</div><div class="tc"><div class="tco">${w.r}</div><div class="tr">${w.c}</div><div class="tp">📍 ${w.y}</div><div class="tdsc">${w.d}</div></div></div>`).join('');

    const cc = document.getElementById('clients-container');
    if (cc) cc.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px;">` + CLIENT_DATA.map(c => `<div class="gc" style="padding:20px;display:flex;flex-direction:column;gap:12px;"><div style="width:100%;height:140px;border-radius:12px;background:url('${PBASE}${c.img}') center/cover no-repeat;border:1px solid rgba(255,255,255,0.05);"></div><div><div class="cnn" style="font-size:16px;color:#fff">${c.n}</div><div class="crole" style="color:var(--pu2);font-size:12px;margin-bottom:8px;">${c.r}</div><div class="cdsc" style="font-size:13px;color:var(--t2);line-height:1.6">${c.d}</div></div></div>`).join('') + `</div>`;

    const s1 = document.getElementById('logos-strip1');
    const s2 = document.getElementById('logos-strip2');
    if (s1 && s2) {
        const items = LOGOS.map(l => `<div style="font-size:13px; font-weight:800; color:var(--t3); text-transform:uppercase; letter-spacing:2px; white-space:nowrap; padding:0 20px;">✦ ${l} ✦</div>`).join('');
        s1.innerHTML = items; s2.innerHTML = items;
    }
}

function buildCatGrid() {
    const gc = document.getElementById('gcat-client');
    const gp = document.getElementById('gcat-personal');
    const hg = document.getElementById('home-gallery-preview');
    if (!gc && !gp && !hg) return;
    if (gc) gc.innerHTML = ''; if (gp) gp.innerHTML = ''; if (hg) hg.innerHTML = '';
    CATS.forEach((cat, i) => {
        const card = document.createElement('div');
        card.className = 'gcat-card gc';
        const th = cat.files[0];
        if (th) {
            const folder = cat.fe ? cat.fe + '/' : '';
            card.style.backgroundImage = `url("${PBASE}${folder}${th.e}")`;
        }
        const itemCount = cat.files.length;
        card.innerHTML = `<div class="gcat-ovl"></div><div class="gcat-info"><div class="gcat-name">${cat.name}</div><div class="gcat-meta">${itemCount} items</div></div>`;
        card.onclick = () => glbOpen(i);
        if (cat.pillar === 'client' && gc) gc.appendChild(card.cloneNode(true)).onclick = () => glbOpen(i);
        else if (cat.pillar === 'personal' && gp) gp.appendChild(card.cloneNode(true)).onclick = () => glbOpen(i);
        if (hg && i < 6) hg.appendChild(card.cloneNode(true)).onclick = () => glbOpen(i);
    });
}

function glbOpen(ci) {
    glbCi = ci; glbFi = 0;
    const cat = CATS[ci];
    document.getElementById('glb-title').textContent = cat.name;
    const strip = document.getElementById('glb-strip');
    strip.innerHTML = '';
    cat.files.forEach((f, i) => {
        const t = document.createElement('div');
        t.className = 'glb-side-th';
        const folder = cat.fe ? cat.fe + '/' : '';
        if (f.t === 'image') t.style.backgroundImage = `url('${PBASE}${folder}${f.e}')`;
        else t.innerHTML = '<div class="glb-th-play">&#9654;</div>';
        t.onclick = () => glbShow(i);
        strip.appendChild(t);
    });
    glbShow(0);
    document.getElementById('glb').classList.add('on');
}

function glbShow(fi) {
    glbFi = fi;
    const cat = CATS[glbCi];
    const f = cat.files[fi];
    const main = document.getElementById('glb-main');
    const prev = main.querySelector('.glb-prev');
    const next = main.querySelector('.glb-next');
    main.innerHTML = '';
    main.appendChild(prev); main.appendChild(next);
    const folder = cat.fe ? cat.fe + '/' : '';
    const fullPath = PBASE + folder + f.e;
    if (f.t === 'video') {
        const v = document.createElement('video'); v.src = fullPath; v.controls = true; v.autoplay = true; main.appendChild(v);
    } else {
        const img = document.createElement('img'); img.src = fullPath; img.style.cssText = 'max-width:100%;max-height:100%;object-fit:contain;border-radius:8px'; main.appendChild(img);
    }
    document.getElementById('glb-sub').textContent = `${fi + 1} of ${cat.files.length} · ${f.n}`;
    document.querySelectorAll('.glb-side-th').forEach((t, i) => {
        t.classList.toggle('on', i === fi);
        if (i === fi) t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
}

function glbNav(d) { const cat = CATS[glbCi]; glbShow((glbFi + d + cat.files.length) % cat.files.length); }
function glbClose() { document.getElementById('glb').classList.remove('on'); const v = document.querySelector('#glb-main video'); if (v) { v.pause(); v.src = ''; } }

document.addEventListener('keydown', e => {
    if (!document.getElementById('glb').classList.contains('on')) return;
    if (e.key === 'ArrowRight') glbNav(1);
    if (e.key === 'ArrowLeft') glbNav(-1);
    if (e.key === 'Escape') glbClose();
});

window.addEventListener('DOMContentLoaded', () => {
    initDynamicContent();
    buildCatGrid();
    go('home');
});

function fillForm(type) {
    const T = {
        wk: { c: 'IDFL International Ltd', r: 'Software Engineer', d: 'Contributing to scalable web solutions.' },
        cl: { n: 'Hospitality & Dining', r: 'Visuals & Branding', d: 'Complete identity for Eskimo Pizza.' },
        st: { t: 'The Record Survives', g: 'Literary Novel', d: 'A story of quiet survival.' },
        gl: { t: 'Egyptian Mythology', d: 'Exploring ancient deities in 3D.' }
    };
    const d = T[type]; if (!d) return;
    if (type === 'wk') { document.getElementById('wk-comp').value = d.c; document.getElementById('wk-role').value = d.r; document.getElementById('wk-desc').value = d.d; }
    if (type === 'cl') { document.getElementById('cl-name').value = d.n; document.getElementById('cl-role').value = d.r; document.getElementById('cl-desc').value = d.d; }
    if (type === 'st') { document.getElementById('st-title').value = d.t; document.getElementById('st-genre').value = d.g; document.getElementById('st-desc').value = d.d; }
    if (type === 'gl') { document.getElementById('gl-title').value = d.t; document.getElementById('gl-desc').value = d.d; }
}
</script></body></html>
"""

# Reassemble the file
final_lines = lines[:script_start]
final_content = "".join(final_lines) + new_script

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(final_content)

print("HTML file rebuilt successfully.")

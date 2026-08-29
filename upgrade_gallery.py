import re, sys
sys.stdout.reconfigure(encoding='utf-8')

f = r'F:\AntiGravity\Apps Data\Website Portfolio Work\rana_galaxy_portfolio_v3.html'
content = open(f, encoding='utf-8').read()

# ── 1. ADD NEW CSS (insert before </style>) ─────────────────────────────────
new_css = """
/* FOCUS GALLERY */
.fgal{display:grid;grid-template-columns:1fr 220px;gap:0;height:420px;padding:0 22px 22px}
.fmain{position:relative;border-radius:12px 0 0 12px;overflow:hidden;cursor:default;background:#06030f}
.fmi{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .6s cubic-bezier(.23,1,.32,1),background-image .1s}
.fmain:hover .fmi{transform:scale(1.03)}
.fmovl{position:absolute;inset:0;background:linear-gradient(to top,rgba(4,0,18,.97) 0%,rgba(4,0,18,.25) 55%,transparent 100%)}
.fminfo{position:absolute;bottom:0;left:0;right:0;padding:26px 26px 22px}
.fmcat{font-size:9.5px;color:var(--pu2);letter-spacing:.16em;text-transform:uppercase;font-weight:600;margin-bottom:9px;display:flex;align-items:center;gap:6px}
.fmcat-dot{width:5px;height:5px;border-radius:50%;background:var(--pu2);flex-shrink:0}
.fmtit{font-size:28px;font-weight:700;color:#fff;line-height:1.1;letter-spacing:-.02em;margin-bottom:10px;transition:all .35s ease}
.fmdesc{font-size:12px;color:rgba(240,235,255,.68);line-height:1.8;max-width:500px;transition:all .35s ease}
.fmcount{position:absolute;top:16px;right:16px;font-size:9.5px;padding:4px 11px;border-radius:6px;background:rgba(0,0,0,.5);border:.5px solid rgba(255,255,255,.1);color:rgba(255,255,255,.6);backdrop-filter:blur(8px);letter-spacing:.04em}
/* THUMB STRIP */
.ftstrip{display:flex;flex-direction:column;gap:5px;overflow-y:auto;padding-left:5px;scrollbar-width:thin;scrollbar-color:rgba(167,139,250,.15) transparent}
.fthumb{border-radius:0 9px 9px 0;overflow:hidden;cursor:pointer;position:relative;flex:1;min-height:40px;background-size:cover;background-position:center;border:.5px solid rgba(167,139,250,.08);transition:all .32s cubic-bezier(.23,1,.32,1);flex-shrink:1}
.fthumb:first-child{border-top-left-radius:0;border-top-right-radius:12px}
.fthumb:last-child{border-bottom-left-radius:0;border-bottom-right-radius:12px}
.fthumb:hover:not(.fta){border-color:rgba(167,139,250,.3);transform:translateX(-3px)}
.fta{flex:2.8 !important;border-color:rgba(167,139,250,.5) !important;transform:translateX(-5px);box-shadow:-4px 0 22px rgba(139,92,246,.28)}
.fto{position:absolute;inset:0;background:linear-gradient(to right,rgba(0,0,0,.72) 0%,rgba(0,0,0,.08) 100%);transition:background .3s}
.fta .fto{background:linear-gradient(to right,rgba(120,80,250,.35) 0%,rgba(0,0,0,.05) 100%)}
.ftlbl{position:absolute;bottom:7px;left:10px;right:4px;font-size:9.5px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:.9}
.ftbdg{position:absolute;top:5px;right:6px;font-size:8px;padding:1px 6px;border-radius:3px;background:rgba(0,0,0,.5);color:rgba(255,255,255,.6);letter-spacing:.04em}
"""

content = content.replace('.addsub{', new_css + '\n.addsub{', 1)

# ── 2. REPLACE GALLERY SECTION HTML ─────────────────────────────────────────
old_gallery = re.search(
    r'<!-- GALLERY -->\s*<div class="sec" id="s-gallery">.*?</div>\s*\n\s*\n<!-- WORK -->',
    content, re.DOTALL
)

new_gallery = """<!-- GALLERY -->
<div class="sec" id="s-gallery">
  <div class="sh"><span class="st">Gallery</span><span class="ss">Click a thumbnail to explore</span></div>
  <div class="fgal">
    <div class="fmain">
      <div class="fmi" id="fg-img"></div>
      <div class="fmovl"></div>
      <div class="fminfo">
        <div class="fmcat" id="fg-cat"><span class="fmcat-dot"></span>Architecture · 3D Render</div>
        <div class="fmtit" id="fg-tit">Exterior Architecture</div>
        <div class="fmdesc" id="fg-desc">Dramatic architectural exteriors built with cinematic lighting. From brutalist facades to organic modern structures, every frame is a world in itself.</div>
      </div>
      <div class="fmcount" id="fg-num">1 / 9</div>
    </div>
    <div class="ftstrip" id="fg-strip"></div>
  </div>
</div>

<!-- WORK -->"""

if old_gallery:
    content = content[:old_gallery.start()] + new_gallery + content[old_gallery.end():]
    print("Gallery HTML replaced")
else:
    print("WARNING: Gallery HTML pattern not found")

# ── 3. REPLACE openLB call in lightbox (already updated) ────────────────────

# ── 4. ADD GALLERY JS (before closing </script>) ─────────────────────────────
gallery_js = """
// ── FOCUS GALLERY ──────────────────────────────────────────────────
const FG=[
  {src:"Photos & to upload/Exterior/All Work (165).jpg",title:"Exterior Architecture",cat:"Architecture · 3D Render · 25 pieces",desc:"Dramatic architectural exteriors built with cinematic lighting. From brutalist facades to organic modern structures, every frame is a world in itself.",badge:"3D Render"},
  {src:"Photos & to upload/Scifi/27504008_1712440705473402_575554148592729872_o.jpg",title:"Sci-Fi Worlds",cat:"Sci-Fi · Environment · 26 pieces",desc:"Futuristic environments and otherworldly spaces. Hard-surface design meets atmospheric lighting in science fiction worlds built from imagination.",badge:"Environment"},
  {src:"Photos & to upload/Egyptian Mythology/All Work (102).jpg",title:"Egyptian Mythology",cat:"Mythology · 3D · 8 pieces",desc:"Ancient Egyptian gods, temples, and sacred geometry reimagined through 3D art with historical precision and artistic vision.",badge:"3D Render"},
  {src:"Photos & to upload/Interior/10.jpg",title:"Interior Design",cat:"Interior · Architecture · 3 pieces",desc:"Carefully composed interior spaces — each room tells a story through light, texture, and proportion.",badge:"Interior"},
  {src:"Photos & to upload/Product Render/Perfume (3).png",title:"Product Renders",cat:"Commercial · 3D · Studio",desc:"Studio-quality product visualisation for commercial use. Clean, precise, and beautifully lit renders that showcase products at their absolute best.",badge:"Commercial"},
  {src:"Photos & to upload/Viking/All Work (62).png",title:"Viking World",cat:"Viking · Fantasy · 3 pieces",desc:"Norse mythology and Viking-era environments rendered with brutal beauty and deep historical atmosphere.",badge:"Fantasy"},
  {src:"Photos & to upload/Living Room/Final1.png",title:"Living Spaces",cat:"Interior · Living Room · 3 pieces",desc:"Premium living room environments with meticulous attention to material, light, and spatial flow.",badge:"Interior"},
  {src:"Photos & to upload/Japanese Building/Japanese (1).png",title:"Japanese Architecture",cat:"Architecture · Cultural · 3 pieces",desc:"Serene Japanese architectural studies that balance tradition with light, nature, and spatial harmony.",badge:"Cultural"},
  {src:"Photos & to upload/Streets/Street (1).jpg",title:"Streets",cat:"Urban · Environment · 2 pieces",desc:"Urban streetscapes charged with mood, depth, and a cinematic sense of place.",badge:"Urban"},
];
let fgIdx=0;
function fgSet(i,init){
  fgIdx=i;
  const d=FG[i];
  const img=document.getElementById('fg-img');
  if(!init){img.style.opacity='0';setTimeout(()=>{img.style.backgroundImage=`url('${d.src}')`;img.style.opacity='1'},180);}
  else{img.style.backgroundImage=`url('${d.src}')`;img.style.opacity='1';}
  img.style.transition='opacity .32s ease';
  document.getElementById('fg-tit').textContent=d.title;
  document.getElementById('fg-cat').innerHTML=`<span class="fmcat-dot"></span>${d.cat}`;
  document.getElementById('fg-desc').textContent=d.desc;
  document.getElementById('fg-num').textContent=`${i+1} / ${FG.length}`;
  document.querySelectorAll('.fthumb').forEach((t,j)=>t.classList.toggle('fta',j===i));
}
(function fgInit(){
  const strip=document.getElementById('fg-strip');
  if(!strip)return;
  strip.innerHTML='';
  FG.forEach((d,i)=>{
    const t=document.createElement('div');
    t.className='fthumb'+(i===0?' fta':'');
    t.style.backgroundImage=`url('${d.src}')`;
    t.innerHTML=`<div class="fto"></div><div class="ftlbl">${d.title}</div><div class="ftbdg">${d.badge}</div>`;
    t.onclick=()=>fgSet(i);
    strip.appendChild(t);
  });
  fgSet(0,true);
})();
"""

content = content.replace('</script>', gallery_js + '\n</script>', 1)

open(f, 'w', encoding='utf-8').write(content)
print("SUCCESS: Gallery upgraded to focus layout")

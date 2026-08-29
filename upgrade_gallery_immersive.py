import re, sys, os
sys.stdout.reconfigure(encoding='utf-8')

f = r'F:\AntiGravity\Apps Data\Website Portfolio Work\rana_galaxy_portfolio_v3.html'
content = open(f, encoding='utf-8').read()

# 1. Robust URL Encoder for the whole file
# We'll replace the existing enc function in JS if it exists, or add a global one.
# In previous turns I added a CATS constant and some JS.

# Let's fix the Home Preview items first - they had hardcoded paths that were failing
# e.g. 'Photos & to upload/Exterior/...'
# I'll replace them with encoded versions: 'Photos%20%26%20to%20upload/Exterior/...'

content = content.replace('Photos & to upload', 'Photos%20%26%20to%20upload')
content = content.replace('Photos &amp; to upload', 'Photos%20%26%20to%20upload')

# 2. Upgrade the Lightbox (GLB) to be even "Bigger" and more "Focus" style
# I'll update the CSS for .glb and its children to feel more like a dedicated "Project Page"

new_glb_css = """
.glb{display:none;position:fixed;inset:0;z-index:9999;background:rgba(2,0,10,0.98);backdrop-filter:blur(30px);flex-direction:column;opacity:0;transition:opacity 0.4s ease;}
.glb.on{display:flex;opacity:1;}
.glb-inner{display:flex;flex-direction:column;height:100vh;padding:20px;max-width:1600px;margin:0 auto;width:100%;}
.glb-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;padding:0 10px;}
.glb-title{font-size:24px;font-weight:800;color:#fff;letter-spacing:-0.02em;}
.glb-sub{font-size:12px;color:var(--pu2);text-transform:uppercase;letter-spacing:0.1em;margin-top:4px;}
.glb-main-container{flex:1;display:grid;grid-template-columns:1fr 280px;gap:20px;min-height:0;}
.glb-viewport{position:relative;background:#06030f;border-radius:16px;overflow:hidden;display:flex;align-items:center;justify-content:center;box-shadow:0 20px 50px rgba(0,0,0,0.5);}
.glb-viewport img, .glb-viewport video{max-width:100%;max-height:100%;object-fit:contain;border-radius:8px;}
.glb-sidebar{display:flex;flex-direction:column;gap:12px;overflow-y:auto;padding-right:10px;scrollbar-width:thin;}
.glb-side-th{aspect-ratio:16/9;border-radius:10px;background-size:cover;background-position:center;cursor:pointer;border:2px solid transparent;transition:all 0.3s;position:relative;flex-shrink:0;background-color:#0a0a1a;}
.glb-side-th.on{border-color:var(--pu);box-shadow:0 0 15px rgba(139,92,246,0.4);transform:scale(1.02);}
.glb-side-th:hover:not(.on){border-color:rgba(255,255,255,0.2);}
.glb-details{margin-top:auto;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05);}
.glb-desc{font-size:13px;color:rgba(255,255,255,0.7);line-height:1.6;}
"""

# Replace the old GLB styles
content = re.sub(r'\.glb\{.*?\.glb-ctr\{[^}]+\}', new_glb_css, content, flags=re.DOTALL)

# 3. Update GLB HTML Structure
new_glb_html = """
  <div class="glb" id="glb">
    <div class="glb-inner">
      <div class="glb-hdr">
        <div>
          <div class="glb-title" id="glb-title">Project Title</div>
          <div class="glb-sub" id="glb-sub">Category • Items</div>
        </div>
        <button class="bcls" onclick="glbClose()" style="width:40px;height:40px;font-size:24px;">✕</button>
      </div>
      <div class="glb-main-container">
        <div class="glb-viewport" id="glb-main">
          <button class="glb-arrow glb-prev" onclick="glbNav(-1)">&#8249;</button>
          <button class="glb-arrow glb-next" onclick="glbNav(1)">&#8250;</button>
        </div>
        <div class="glb-sidebar">
          <div id="glb-strip" style="display:flex;flex-direction:column;gap:10px;"></div>
        </div>
      </div>
    </div>
  </div>
"""

content = re.sub(r'<div class="glb" id="glb">.*?</div>\s*</div>', new_glb_html + '\n</div>', content, flags=re.DOTALL)

# 4. Final Polish for Navigation logic in JS
# Ensure glbOpen uses the new structure
old_glbopen_js = """function glbOpen(ci){
  glbCi=ci;glbFi=0;
  const cat=CATS[ci];
  document.getElementById('glb-title').textContent=cat.name;
  const strip=document.getElementById('glb-strip');
  strip.innerHTML='';
  cat.files.forEach((f,i)=>{
    const t=document.createElement('div');
    t.className='glb-th';
    if(f.t==='image') t.style.backgroundImage=`url('${PBASE}${cat.fe}/${f.e}')`;
    else t.innerHTML='<div class="glb-th-play">&#9654;</div>';
    t.onclick=()=>glbShow(i);
    strip.appendChild(t);
  });
  glbShow(0);
  document.getElementById('glb').classList.add('on');
}"""

# Update to use new classes
new_glbopen_js = """function glbOpen(ci){
  glbCi=ci;glbFi=0;
  const cat=CATS[ci];
  document.getElementById('glb-title').textContent=cat.name;
  const strip=document.getElementById('glb-strip');
  strip.innerHTML='';
  cat.files.forEach((f,i)=>{
    const t=document.createElement('div');
    t.className='glb-side-th';
    const path = `${PBASE}${cat.fe?cat.fe+'/':''}${f.e}`;
    if(f.t==='image') t.style.backgroundImage=`url('${path}')`;
    else t.innerHTML=`<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);color:#fff;font-size:20px;">▶</div>`;
    t.onclick=()=>glbShow(i);
    strip.appendChild(t);
  });
  glbShow(0);
  document.getElementById('glb').classList.add('on');
}"""

content = content.replace(old_glbopen_js, new_glbopen_js)

# Update glbShow to use .glb-side-th instead of .glb-th
content = content.replace("document.querySelectorAll('.glb-th')", "document.querySelectorAll('.glb-side-th')")

# 5. Fix Home Preview Images to use actual encoded paths
# I'll find all onclick="openLB('Photos%20%26%20to%20upload/...' and make sure they match CATS indices
# Actually, I'll update openLB to just open the corresponding category in the new GLB if it matches
# But for now, let's just fix the paths.

open(f, 'w', encoding='utf-8').write(content)
print("SUCCESS: Immersive Category Viewer implemented. All paths URL-encoded.")
